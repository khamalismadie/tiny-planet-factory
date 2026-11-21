import { Application, UPDATE_PRIORITY } from 'pixi.js';
import { ensureEventState } from '../content/missions';
import { OBJECT_DEFS, UNLOCK_LEVEL } from '../content/objects';
import { SPECIES_ORDER } from '../content/species';
import { WEATHER_DEFS } from '../content/weather';
import { terraConfig } from '../content/planets/terra';
import { scoreHabitat } from '../sim/eco/habitat';
import { habitatContextFor } from '../sim/eco/manager';
import { placeObject, createPlanet, planetNameFromSeed, simulateTick, TICK_MS } from '../sim/engine';
import { decodePlanetDna, encodePlanetDna, type PlanetDnaCodes } from '../sim/dna';
import { migratePlanet } from '../sim/migrate';
import type { ObjectType, PlanetState } from '../sim/types';
import { detectQuality, QUALITY, type QualitySettings, type QualityTier } from './quality';
import { PerfMonitor } from './PerfMonitor';
import { QaProbe, type QaReport } from './QaProbe';
import { Hud } from '../ui/Hud';
import { SurfaceInput } from '../input/SurfaceInput';
import { SaveStore } from '../persistence/SaveStore';
import { GameScene } from '../render/Scene';
import { registerPwa } from '../pwa/register';
import { Telemetry } from '../telemetry';

export class Game {
  private readonly app: Application;
  private readonly store = new SaveStore();
  private readonly telemetry = new Telemetry();
  private scene!: GameScene;
  private hud!: Hud;
  private state!: PlanetState;
  private settings!: QualitySettings;
  private perf!: PerfMonitor;
  private selected: ObjectType | null = 'grass';
  private paused = false;
  private accumulator = 0;
  private saveHandle = 0;
  private drawCalls = 0;
  private lastDraws = 0;
  private frameCount = 0;
  private perfTimer = 0;
  private perfOverlay: HTMLElement | null = null;
  private contextLost = false;
  private gl: WebGL2RenderingContext | null = null;
  private contextExt: { loseContext(): void; restoreContext(): void } | null = null;
  private readonly bootStart: number;
  private bootMs = 0;
  private qa: QaProbe | null = null;
  private qaReport: QaReport | null = null;
  private qaPanel: HTMLElement | null = null;
  private previewBackup: PlanetState | null = null;

  private constructor(app: Application, bootStart: number) {
    this.app = app;
    this.bootStart = bootStart;
  }

  static async create(container: HTMLElement, bootStart = performance.now()): Promise<Game> {
    const app = new Application();
    await app.init({
      resizeTo: window,
      backgroundColor: 0x0d1117,
      antialias: QUALITY[detectQuality()].tier !== 'low',
    });
    container.appendChild(app.canvas);

    const game = new Game(app, bootStart);
    await game.bootstrap();
    return game;
  }

  private async bootstrap(): Promise<void> {
    const saved = await this.store.load();
    const seed = Math.floor(Math.random() * 0xffffffff);
    this.state = saved ?? createPlanet(seed, planetNameFromSeed(seed));
    this.state.events = ensureEventState(this.state.events);
    this.settings = QUALITY[detectQuality()];
    this.perf = new PerfMonitor(this.settings.tier);
    this.perfOverlay = document.getElementById('perf');
    const params = new URLSearchParams(location.search);
    if (params.has('perf') || import.meta.env.DEV) {
      this.perfOverlay?.classList.add('show');
    }
    if (params.has('qa')) {
      const seconds = Number(params.get('qaSeconds') ?? 45);
      const duration = Math.max(1, Math.min(180, Number.isFinite(seconds) ? seconds : 45));
      this.qa = new QaProbe(duration * 1000, () => this.qaContext());
      this.qaPanel = document.getElementById('qa');
      this.qaPanel?.classList.add('show');
      document.getElementById('qa-copy')?.addEventListener('click', () => {
        void this.copyQaReport().then((copied) => {
          const status = document.getElementById('qa-status');
          if (status) status.textContent = copied ? 'Hasil QA tersalin ke clipboard.' : 'Salin gagal; pilih teks secara manual.';
        });
      });
      document.getElementById('qa-close')?.addEventListener('click', () => this.qaPanel?.classList.remove('show'));
    }
    this.buildScene();
    this.buildHud();
    this.buildInput();
    this.instrument();

    if (!this.store.persistent) this.hud.notify('Penyimpanan tidak tersedia; progres hanya di memori.', true);
    this.hud.notify('Pilih objek, lalu ketuk permukaan planet untuk meletakkannya.');

    registerPwa((message) => this.hud.notify(message, true));
  }

  private buildScene(): void {
    this.scene = new GameScene(this.state.seed, this.settings, this.state.terrainConfig);
    this.app.stage.addChild(this.scene.view);
    this.scene.setEnvironment(this.state.environment);
    this.scene.syncObjects(this.state.objects, this.state.environment, false);
    this.scene.setWeather(this.state.weather.type, this.state.weather.intensity);
    this.app.canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      this.contextLost = true;
      this.telemetry.record('context_loss', { tick: this.state?.tick ?? 0 });
    });
    this.app.canvas.addEventListener('webglcontextrestored', () => {
      this.contextLost = false;
      this.hud?.notify('Konteks grafis pulih.');
    });
  }

  private rebuildScene(): void {
    // Reuse the renderer and GPU buffers: recreating View3D during a context
    // loss can invalidate shader resources on constrained devices.
    this.scene.reseed(this.state.seed, this.state.terrainConfig);
    this.refreshScene();
  }

  private refreshScene(): void {
    this.scene.setEnvironment(this.state.environment);
    this.scene.syncObjects(this.state.objects, this.state.environment, false);
    this.scene.syncWildlife(this.state.fauna?.agents ?? [], this.state.terrainConfig);
    this.scene.setWeather(this.state.weather.type, this.state.weather.intensity);
  }

  private buildHud(): void {
    this.hud = new Hud({
      onSelect: (type) => this.select(type),
      onPause: (paused) => {
        this.paused = paused;
        this.hud.notify(paused ? 'Simulasi dijeda.' : 'Simulasi dilanjutkan.');
      },
      onCopyDna: () => this.dnaCodes(),
      onLoadDna: (code) => this.loadDna(code),
      onPreviewDna: (code) => this.previewDna(code),
      onCloseDna: () => this.restorePreview(),
      onDuplicateDna: () => this.duplicatePlanet(),
      onRemixDna: () => this.remixPlanet(),
      onNewPlanet: () => this.newPlanet(),
      onTelemetryChange: (enabled) => this.telemetry.setOptIn(enabled),
      onTelemetryExport: () => this.telemetry.exportJson(),
      onTelemetryClear: () => this.telemetry.clear(),
    });
    this.hud.setTelemetryEnabled(this.telemetry.optedIn);
    this.hud.update(this.state, this.selected);
  }

  private buildInput(): void {
    new SurfaceInput(this.scene.view, this.scene.planet.mesh, {
      getSelectedType: () => this.selected,
      onPlace: (type, dir) => this.place(type, dir),
      onInspect: (dir) => {
        const count = this.state.objects.filter((object) =>
          Math.hypot(object.dir[0] - dir[0], object.dir[1] - dir[1], object.dir[2] - dir[2]) < 0.2,
        ).length;
        this.hud.notify(
          `Suhu ${this.state.environment.temperature.toFixed(1)}° · Air ${Math.round(this.state.environment.water)} · Objek di area: ${count}`,
        );
      },
    });
  }

  private instrument(): void {
    this.gl = (this.app.renderer as unknown as { gl?: WebGL2RenderingContext }).gl ?? null;
    const gl = this.gl;
    if (gl) {
      this.contextExt = gl.getExtension('WEBGL_lose_context') as typeof this.contextExt;
      for (const name of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced'] as const) {
        const original = gl[name].bind(gl);
        (gl as unknown as Record<string, unknown>)[name] = (...args: unknown[]) => {
          this.drawCalls++;
          return (original as (...a: unknown[]) => unknown)(...args);
        };
      }
    }
    this.app.ticker.add((ticker) => {
      this.scene.updateCamera();
      this.scene.update(ticker.deltaMS / 1000);
      if (!this.paused) {
        this.accumulator += ticker.deltaMS;
        let guard = 0;
        while (this.accumulator >= TICK_MS && guard++ < 5) {
          this.accumulator -= TICK_MS;
          this.tickOnce();
        }
      }
      if (!this.bootMs) {
        this.bootMs = performance.now() - this.bootStart;
        this.telemetry.record('boot', {
          bootMs: Math.round(this.bootMs),
          quality: this.settings.tier,
          dpr: window.devicePixelRatio,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        });
      }
      this.perf.add(ticker.deltaMS);
      this.qa?.add(ticker.deltaMS);
      const qaReport = this.qa?.tick(performance.now());
      if (qaReport) this.finishQa(qaReport);
      this.frameCount++;
      if (this.frameCount % 120 === 0 && this.perf.evaluate()) {
        const from = this.settings.tier;
        this.settings = QUALITY[this.perf.tier];
        this.scene.setQuality(this.settings);
        this.telemetry.record('quality_downgrade', { from, to: this.settings.tier, p95ms: Number(this.perf.snapshot().p95ms.toFixed(1)) });
      }
      this.perfTimer += ticker.deltaMS;
      if (this.perfTimer >= 500 && this.perfOverlay?.classList.contains('show')) {
        this.perfTimer = 0;
        const snap = this.perf.snapshot();
        this.perfOverlay.textContent =
          `FPS ${snap.fps.toFixed(0)} · p50 ${snap.p50ms.toFixed(1)}ms · p95 ${snap.p95ms.toFixed(1)}ms\n` +
          `Quality ${this.settings.label}${snap.adaptive ? ' (auto)' : ''} · draws ${this.lastDraws}`;
      }
      this.lastDraws = this.drawCalls;
      this.drawCalls = 0;
    }, undefined, UPDATE_PRIORITY.HIGH);

    const debug = import.meta.env.DEV || new URLSearchParams(location.search).has('debug');
    if (debug) {
      (window as unknown as Record<string, unknown>).__game = {
        state: () => this.state,
        eco: () => this.state.eco,
        ecoScore: (id: string) => {
          const definition = terraConfig.species.find((entry) => entry.id === id);
          return definition ? scoreHabitat(definition, habitatContextFor(this.state, terraConfig)) : null;
        },
        metrics: () => this.metrics(),
        qaReport: () => this.qaReport ?? this.qa?.report() ?? null,
        telemetry: () => this.telemetry.exportJson(),
        camera: () => ({
          azimuth: this.scene.orbit.azimuthAngle,
          polar: this.scene.orbit.polarAngle,
          distance: this.scene.orbit.distance,
        }),
        orbitDebug: () => {
          const orbit = this.scene.orbit as unknown as { _gesture?: string; _pointers?: unknown[] };
          return { gesture: orbit._gesture, pointers: orbit._pointers?.length ?? 0 };
        },
        gl: () => this.gl,
        loseContext: () => this.contextExt?.loseContext(),
        restoreContext: () => this.contextExt?.restoreContext(),
        setQuality: (tier: QualityTier) => {
          this.perf.disableAdaptive();
          this.perf.setTier(tier);
          this.settings = QUALITY[tier];
          this.scene.setQuality(this.settings);
        },
        tick: (count = 1) => {
          this.perf.disableAdaptive();
          for (let i = 0; i < count; i++) this.tickOnce();
        },
        place: (type: ObjectType, dir: [number, number, number]) => {
          this.perf.disableAdaptive();
          this.place(type, dir);
        },
        placement: () => this.scene.placementState(),
        select: (type: ObjectType) => this.select(type),
        reset: (seed: number) => {
          this.state = createPlanet(seed >>> 0, planetNameFromSeed(seed >>> 0));
          this.selected = 'grass';
          this.rebuildScene();
          this.hud.update(this.state, this.selected);
          this.queueSave();
        },
        dna: () => this.dnaCodes(),
        previewDna: (code: string) => this.previewDna(code),
        commitDna: (code: string) => this.loadDna(code),
        restoreDna: () => this.restorePreview(),
        wildlife: () => ({
          agents: this.state.fauna?.agents.length ?? 0,
          discovered: [...(this.state.fauna?.discovered ?? [])],
          extinct: [...(this.state.fauna?.extinct ?? [])],
          bySpecies: Object.fromEntries(
            SPECIES_ORDER.map((species) => [
              species,
              (this.state.fauna?.agents ?? []).filter((agent) => agent.species === species).length,
            ]),
          ),
        }),
      };
    }
  }

  private select(type: ObjectType): void {
    if (!this.state.progression.unlockedObjects.includes(type)) {
      this.hud.notify(`${OBJECT_DEFS[type].label} terbuka di level ${UNLOCK_LEVEL[type]}.`, true);
      return;
    }
    this.selected = type;
    this.hud.update(this.state, this.selected);
    this.hud.notify(`${OBJECT_DEFS[type].label} dipilih. Ketuk permukaan planet.`);
  }

  private place(type: ObjectType, dir: [number, number, number]): void {
    const object = placeObject(this.state, type, dir);
    if (!object) {
      this.hud.notify('Objek ini belum terbuka.', true);
      return;
    }
    this.scene.syncObjects(this.state.objects, this.state.environment);
    this.scene.flashPlacement(dir);
    this.hud.update(this.state, this.selected);
    this.telemetry.record('placement', { type, total: this.state.objects.length, tick: this.state.tick });
    this.queueSave();
  }

  private tickOnce(): void {
    const missionBefore = this.state.mission.status;
    const completedBefore = new Set(
      Object.entries(this.state.events ?? {})
        .filter(([, progress]) => progress.status === 'complete')
        .map(([id]) => id),
    );
    const discoveredBefore = new Set(this.state.fauna?.discovered ?? []);
    const extinctBefore = new Set(this.state.fauna?.extinct ?? []);
    const result = simulateTick(this.state);
    this.refreshScene();
    this.hud.update(this.state, this.selected);
    if (this.state.warning) this.hud.notify(this.state.warning, true);
    else if (result.events.length) this.hud.notify(result.events[result.events.length - 1]);
    if (missionBefore === 'active' && this.state.mission.status === 'complete') {
      this.telemetry.record('mission_complete', { tick: this.state.tick });
    }
    for (const [id, progress] of Object.entries(this.state.events ?? {})) {
      if (progress.status === 'complete' && !completedBefore.has(id)) {
        this.telemetry.record('event_complete', { id, tick: this.state.tick });
      }
    }
    for (const id of this.state.fauna?.discovered ?? []) {
      if (!discoveredBefore.has(id)) this.telemetry.record('species_discovered', { id, tick: this.state.tick });
    }
    for (const id of this.state.fauna?.extinct ?? []) {
      if (!extinctBefore.has(id)) this.telemetry.record('species_extinct', { id, tick: this.state.tick });
    }
    this.queueSave();
  }

  private queueSave(): void {
    window.clearTimeout(this.saveHandle);
    this.saveHandle = window.setTimeout(() => void this.store.save(this.state), 400);
  }

  private dnaCodes(): PlanetDnaCodes {
    return encodePlanetDna(this.state);
  }

  private decodeDnaCode(code: string): PlanetState | null {
    const planet = decodePlanetDna(code);
    return planet ? migratePlanet(planet) : null;
  }

  private commitState(planet: PlanetState, message: string): void {
    this.previewBackup = null;
    this.state = planet;
    this.selected = 'grass';
    this.rebuildScene();
    this.hud.update(this.state, this.selected);
    this.hud.setPreviewing(false);
    this.queueSave();
    this.hud.notify(message);
  }

  private loadDna(code: string): void {
    const planet = this.decodeDnaCode(code);
    if (!planet) {
      this.hud.notify('Kode DNA tidak valid atau checksum tidak cocok.', true);
      return;
    }
    this.telemetry.record('dna_import', { objects: planet.objects.length, tick: planet.tick });
    this.commitState(planet, `Planet DNA dimuat: ${planet.name}`);
  }

  private previewDna(code: string): void {
    const planet = this.decodeDnaCode(code);
    if (!planet) {
      this.hud.notify('Kode DNA tidak valid atau checksum tidak cocok.', true);
      return;
    }
    if (!this.previewBackup) {
      this.previewBackup = migratePlanet(JSON.parse(JSON.stringify(this.state)) as unknown);
    }
    this.state = planet;
    this.selected = 'grass';
    this.rebuildScene();
    this.hud.update(this.state, this.selected);
    this.hud.setPreviewing(true);
    this.telemetry.record('dna_preview', { objects: planet.objects.length });
    this.hud.notify('Pratinjau aktif. Tutup panel untuk kembali ke planet asli.');
  }

  private restorePreview(): void {
    if (!this.previewBackup) return;
    this.state = this.previewBackup;
    this.previewBackup = null;
    this.rebuildScene();
    this.hud.update(this.state, this.selected);
    this.hud.setPreviewing(false);
    this.hud.notify('Pratinjau ditutup; planet asli dikembalikan.');
  }

  private duplicatePlanet(): void {
    const planet = this.decodeDnaCode(this.dnaCodes().full);
    if (!planet) return;
    this.telemetry.record('dna_duplicate', { objects: planet.objects.length });
    this.commitState(planet, 'Planet berhasil diduplikat.');
  }

  private remixPlanet(): void {
    const planet = this.decodeDnaCode(this.dnaCodes().full);
    if (!planet) return;
    const seed = (planet.seed ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
    planet.seed = seed;
    planet.name = `${planet.name} Remix`;
    planet.eventLog = createPlanet(seed, planet.name).eventLog;
    planet.revision = 0;
    this.telemetry.record('dna_remix', { objects: planet.objects.length });
    this.commitState(planet, 'Remix dibuat dengan bentuk permukaan baru.');
  }

  private newPlanet(): void {
    const seed = Math.floor(Math.random() * 0xffffffff);
    this.state = createPlanet(seed, planetNameFromSeed(seed));
    this.selected = 'grass';
    this.rebuildScene();
    this.hud.update(this.state, this.selected);
    this.queueSave();
    this.hud.notify('Planet baru siap dibangun.');
  }

  private qaContext() {
    return {
      bootMs: this.bootMs,
      qualityTier: this.settings.tier,
      downgrades: this.perf.downgradeCount,
      drawCalls: this.lastDraws,
      objects: this.state.objects.length,
      contextLost: this.contextLost || (this.gl?.isContextLost() ?? false),
      stage: this.state.stage,
      missionStatus: this.state.mission.status,
      completedEvents: Object.values(this.state.events ?? {}).filter((event) => event.status === 'complete').length,
      wildlifeAgents: this.state.fauna?.agents.length ?? 0,
      discoveredSpecies: this.state.fauna?.discovered.length ?? 0,
      extinctSpecies: this.state.fauna?.extinct.length ?? 0,
    };
  }

  private finishQa(report: QaReport): void {
    this.qaReport = report;
    this.telemetry.record('qa_report', {
      p50ms: report.p50ms,
      p95ms: report.p95ms,
      fps: report.fps,
      bootMs: report.bootMs,
      tier: report.quality.tier,
      frames: report.frames,
    });
    const output = document.getElementById('qa-output') as HTMLTextAreaElement | null;
    if (output) output.value = JSON.stringify(report, null, 2);
    const status = document.getElementById('qa-status');
    if (status) status.textContent = 'Pengukuran selesai. Menyalin hasil ke clipboard...';
    void this.copyQaReport().then((copied) => {
      if (status) {
        status.textContent = copied
          ? 'Selesai & tersalin. Hasil siap dibagikan.'
          : 'Selesai. Ketuk “Salin hasil QA” untuk menyalin.';
      }
    });
  }

  private async copyQaReport(): Promise<boolean> {
    if (!this.qaReport) return false;
    const text = JSON.stringify(this.qaReport, null, 2);
    const area = document.getElementById('qa-output') as HTMLTextAreaElement | null;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to textarea selection, which works on non-secure origins.
      }
    }
    if (!area) return false;
    area.value = text;
    area.focus();
    area.select();
    area.setSelectionRange(0, area.value.length);
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    }
  }

  private metrics() {
    const perf = this.perf.snapshot();
    return {
      ...perf,
      bootMs: Math.round(this.bootMs),
      drawCalls: this.lastDraws,
      objects: this.state.objects.length,
      tick: this.state.tick,
      weather: WEATHER_DEFS[this.state.weather.type].label,
      contextLost: this.contextLost || (this.gl?.isContextLost() ?? false),
      contextEventLost: this.contextLost,
      glContextLost: this.gl?.isContextLost() ?? false,
      downgrades: this.perf.downgradeCount,
      orbit: {
        azimuth: this.scene.orbit.azimuthAngle,
        polar: this.scene.orbit.polarAngle,
        distance: this.scene.orbit.distance,
      },
    };
  }
}
