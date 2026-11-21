import { Application, UPDATE_PRIORITY } from 'pixi.js';
import { ensureEventState } from '../content/missions';
import { OBJECT_DEFS, OBJECT_ORDER, UNLOCK_LEVEL } from '../content/objects';
import { SPECIES_ORDER } from '../content/species';
import { WEATHER_DEFS } from '../content/weather';
import { scoreHabitat } from '../sim/eco/habitat';
import { ecosystemConfigOf, foodWebLinks, guildStatus, isSupportedPlanet } from '../sim/eco/guilds';
import { habitatContextFor } from '../sim/eco/manager';
import { placeObject, createPlanet, planetNameFromSeed, simulateTick, STAGE_NAMES, TICK_MS } from '../sim/engine';
import { decodePlanetDna, encodePlanetDna, type PlanetDnaCodes } from '../sim/dna';
import { migratePlanet } from '../sim/migrate';
import type { ObjectType, PlanetState } from '../sim/types';
import { detectQuality, QUALITY, type QualitySettings, type QualityTier } from './quality';
import { PerfMonitor } from './PerfMonitor';
import { QaProbe, type QaReport } from './QaProbe';
import { Hud } from '../ui/Hud';
import { MainMenu, type MainMenuInfo } from '../ui/MainMenu';
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
  private menu!: MainMenu;
  private menuOpen = false;
  private menuWasPaused = false;
  private hadSave = false;
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
  private sessionEnded = false;

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
    const params = new URLSearchParams(location.search);
    const requestedPlanet = params.get('planet');
    const planetId = isSupportedPlanet(requestedPlanet) ? requestedPlanet : 'terra';
    const usableSave = saved && (!requestedPlanet || saved.planetId === planetId) ? saved : null;
    this.hadSave = !!usableSave;
    this.state = usableSave ?? createPlanet(seed, planetNameFromSeed(seed), planetId);
    this.state.events = ensureEventState(this.state.events);
    if (params.has('qa')) {
      const qaObjects = Number(params.get('qaObjects') ?? 0);
      if (Number.isFinite(qaObjects) && qaObjects > 0) {
        this.populateQaObjects(Math.min(96, Math.floor(qaObjects)));
      }
    }
    this.settings = QUALITY[detectQuality()];
    this.perf = new PerfMonitor(this.settings.tier);
    this.perfOverlay = document.getElementById('perf');
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
    this.buildMenu();
    this.buildInput();
    this.instrument();
    this.bindLifecycle();

    if (!this.store.persistent) this.hud.notify('Penyimpanan tidak tersedia; progres hanya di memori.', true);
    this.hud.notify('Pilih objek, lalu ketuk permukaan planet untuk meletakkannya.');

    registerPwa((message) => this.hud.notify(message, true));

    const skipMenu = params.has('debug') || params.has('qa') || params.has('planet') || params.get('menu') === '0';
    if (skipMenu) this.menu.hide();
    else this.openMenu();
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
    this.scene.syncWildlife(this.state.fauna?.agents ?? []);
    this.scene.setWeather(this.state.weather.type, this.state.weather.intensity);
  }

  private populateQaObjects(count: number): void {
    const angle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - 2 * (i + 0.5) / count;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = angle * i;
      placeObject(this.state, OBJECT_ORDER[i % OBJECT_ORDER.length], [
        Math.cos(theta) * radius,
        y,
        Math.sin(theta) * radius,
      ]);
    }
  }

  private buildHud(): void {
    this.hud = new Hud({
      onSelect: (type) => this.select(type),
      onPause: (paused) => {
        this.paused = paused;
        this.hud.notify(paused ? 'Simulasi dijeda.' : 'Simulasi dilanjutkan.');
      },
      onMenu: () => this.openMenu(),
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

  private buildMenu(): void {
    this.menu = new MainMenu({
      onContinue: () => {
        if (!this.hadSave) this.newPlanet();
        this.closeMenu();
      },
      onNew: () => {
        this.newPlanet();
        this.closeMenu();
      },
      onDna: () => {
        this.closeMenu();
        this.hud.openDna();
      },
      onQuality: (tier) => this.setQuality(tier),
      onClose: () => this.closeMenu(),
    });
  }

  private menuInfo(): MainMenuInfo {
    return {
      hasSave: this.hadSave,
      planetName: this.state.name,
      stageLabel: `Tahap ${this.state.stage} — ${STAGE_NAMES[this.state.stage]}`,
      objects: this.state.objects.length,
      tick: this.state.tick,
      quality: this.settings.tier,
    };
  }

  private openMenu(): void {
    if (this.menuOpen) return;
    this.menuWasPaused = this.paused;
    this.menuOpen = true;
    this.menu.show(this.menuInfo());
    this.telemetry.record('menu_open', { tick: this.state.tick });
  }

  private closeMenu(): void {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    this.menu.hide();
    this.paused = this.menuWasPaused;
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
      if (!this.paused && !this.menuOpen) {
        this.accumulator += ticker.deltaMS;
        let guard = 0;
        while (this.accumulator >= TICK_MS && guard++ < 5) {
          this.accumulator -= TICK_MS;
          this.tickOnce();
        }
      }
      if (!this.bootMs) {
        this.bootMs = performance.now() - this.bootStart;
        const bootData = {
          bootMs: Math.round(this.bootMs),
          quality: this.settings.tier,
          dpr: window.devicePixelRatio,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        };
        this.telemetry.record('boot', bootData);
        this.telemetry.record('session_start', bootData);
        this.telemetry.record('objective_shown', this.telemetryContext());
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
        cryo: () => this.state.eco.cryo,
        volcano: () => this.state.eco.volcano,
        ocean: () => this.state.eco.ocean,
        fungal: () => this.state.eco.fungal,
        sky: () => this.state.eco.sky,
        forest: () => this.state.eco.forest,
        foodWeb: () => ({
          guilds: SPECIES_ORDER.map((species) => ({
            species,
            agents: this.state.fauna?.agents.filter((agent) => agent.species === species).length ?? 0,
            status: guildStatus(this.state, species),
          })),
          links: foodWebLinks(this.state),
        }),
        ecoScore: (id: string) => {
          const config = ecosystemConfigOf(this.state);
          const definition = config?.species.find((entry) => entry.id === id);
          return config && definition ? scoreHabitat(definition, habitatContextFor(this.state, config)) : null;
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
        setQuality: (tier: QualityTier) => this.setQuality(tier),
        menuOpen: () => this.menuOpen,
        openMenu: () => this.openMenu(),
        closeMenu: () => this.closeMenu(),
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
          this.state = createPlanet(seed >>> 0, planetNameFromSeed(seed >>> 0), this.state.planetId);
          this.selected = 'grass';
          this.rebuildScene();
          this.hud.update(this.state, this.selected);
          this.queueSave();
        },
        setPlanet: (planetId: string, seed?: number) => this.switchPlanet(planetId, seed),
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
    const stageBefore = this.state.stage;
    const levelBefore = this.state.progression.level;
    const seasonBefore = this.currentSeasonId();
    const result = simulateTick(this.state);
    this.refreshScene();
    this.hud.update(this.state, this.selected);
    if (this.state.warning) this.hud.notify(this.state.warning, true);
    else if (result.events.length) this.hud.notify(result.events[result.events.length - 1]);
    if (missionBefore === 'active' && this.state.mission.status === 'complete') {
      this.telemetry.record('mission_complete', this.telemetryContext());
    }
    if (this.state.stage !== stageBefore) {
      this.telemetry.record('stage_reached', this.telemetryContext({ from: stageBefore, to: this.state.stage }));
      this.telemetry.record('objective_shown', this.telemetryContext());
    }
    if (this.state.progression.level !== levelBefore) {
      this.telemetry.record('level_reached', this.telemetryContext({ from: levelBefore, to: this.state.progression.level }));
    }
    const seasonAfter = this.currentSeasonId();
    if (seasonAfter !== seasonBefore) {
      this.telemetry.record('season_change', this.telemetryContext({ from: seasonBefore, to: seasonAfter }));
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
    this.hadSave = true;
    window.clearTimeout(this.saveHandle);
    this.saveHandle = window.setTimeout(() => void this.store.save(this.state), 400);
  }

  private telemetryContext(extra: Record<string, string | number | boolean | null> = {}) {
    return {
      tick: this.state.tick,
      planetId: this.state.planetId,
      stage: this.state.stage,
      level: this.state.progression.level,
      seed: this.state.seed,
      elapsedMs: Math.round(performance.now() - this.bootStart),
      ...extra,
    };
  }

  private currentSeasonId(): string {
    const eco = this.state.eco;
    for (const id of [
      eco.cryo.seasonId,
      eco.volcano.seasonId,
      eco.ocean.seasonId,
      eco.fungal.seasonId,
      eco.sky.seasonId,
      eco.forest.seasonId,
    ]) {
      if (id && id !== 'none') return id;
    }
    return 'none';
  }

  private bindLifecycle(): void {
    const end = () => {
      if (this.sessionEnded) return;
      this.sessionEnded = true;
      this.telemetry.record('session_end', this.telemetryContext());
      void this.store.save(this.state);
    };
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') end();
    });
    window.addEventListener('pagehide', end);
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

  private switchPlanet(planetId: string, seed = Math.floor(Math.random() * 0xffffffff)): void {
    if (!isSupportedPlanet(planetId)) return;
    const from = this.state.planetId;
    this.state = createPlanet(seed >>> 0, planetNameFromSeed(seed >>> 0), planetId);
    this.selected = 'grass';
    this.rebuildScene();
    this.hud.update(this.state, this.selected);
    this.telemetry.record('planet_switch', this.telemetryContext({ from }));
    this.queueSave();
    this.hud.notify(`Planet ${planetId} siap dibangun.`);
  }

  private setQuality(tier: QualityTier): void {
    this.perf.disableAdaptive();
    this.perf.setTier(tier);
    this.settings = QUALITY[tier];
    this.scene.setQuality(this.settings);
    this.menu?.setQuality(tier);
    this.telemetry.record('quality_change', { tier });
    this.hud?.notify(`Kualitas grafis: ${QUALITY[tier].label}.`);
  }

  private newPlanet(): void {
    const seed = Math.floor(Math.random() * 0xffffffff);
    this.state = createPlanet(seed, planetNameFromSeed(seed), this.state.planetId);
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
