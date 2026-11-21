import { EVENT_DEFS } from '../content/missions';
import { CATEGORY_LABELS, OBJECT_DEFS, OBJECT_ORDER, UNLOCK_LEVEL } from '../content/objects';
import { SPECIES_DEFS, SPECIES_ORDER } from '../content/species';
import { WEATHER_DEFS } from '../content/weather';
import { STAGE_NAMES } from '../sim/engine';
import { scoreHabitat } from '../sim/eco/habitat';
import { ecosystemConfigOf, guildStatus } from '../sim/eco/guilds';
import { habitatContextFor } from '../sim/eco/manager';
import type { EnvKey, ObjectType, PlanetState } from '../sim/types';

export interface HudCallbacks {
  onSelect: (type: ObjectType) => void;
  onPause: (paused: boolean) => void;
  onMenu: () => void;
  onCopyDna: () => { short: string; full: string };
  onLoadDna: (code: string) => void;
  onPreviewDna: (code: string) => void;
  onCloseDna: () => void;
  onDuplicateDna: () => void;
  onRemixDna: () => void;
  onNewPlanet: () => void;
  onTelemetryChange: (enabled: boolean) => void;
  onTelemetryExport: () => string;
  onTelemetryClear: () => void;
}

const ENV_LABELS: Record<EnvKey, string> = {
  temperature: 'Suhu',
  water: 'Air',
  humidity: 'Kelembapan',
  oxygen: 'Oksigen',
  fertility: 'Kesuburan',
  biodiversity: 'Biodiversitas',
  energy: 'Energi',
  stability: 'Stabilitas',
};

const ENV_KEYS = Object.keys(ENV_LABELS) as EnvKey[];
const CATEGORIES = Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>;

export class Hud {
  private readonly callbacks: HudCallbacks;
  private readonly categoryRoot = document.getElementById('categories')!;
  private readonly objectList = document.getElementById('object-list')!;
  private readonly statsRoot = document.getElementById('stats')!;
  private readonly ecosystem = document.getElementById('ecosystem')!;
  private readonly ecoDetail = document.getElementById('eco-detail')!;
  private readonly ecoVisible = new URLSearchParams(location.search).has('eco');
  private readonly weatherRoot = document.getElementById('weather')!;
  private readonly eventsRoot = document.getElementById('events')!;
  private readonly mission = document.getElementById('mission')!;
  private readonly nameLabel = document.getElementById('planet-name')!;
  private readonly stageLabel = document.getElementById('stage-label')!;
  private readonly levelLabel = document.getElementById('level-label')!;
  private readonly pauseButton = document.getElementById('pause-btn') as HTMLButtonElement;
  private readonly toast = document.getElementById('toast')!;
  private readonly modal = document.getElementById('dna-modal')!;
  private readonly dnaInput = document.getElementById('dna-input') as HTMLInputElement;
  private readonly dnaFull = document.getElementById('dna-full') as HTMLTextAreaElement;
  private readonly dnaStatus = document.getElementById('dna-status')!;
  private readonly telemetryModal = document.getElementById('telemetry-modal')!;
  private readonly telemetryCheckbox = document.getElementById('telemetry-optin') as HTMLInputElement;
  private toastTimer = 0;

  constructor(callbacks: HudCallbacks) {
    this.callbacks = callbacks;
    this.ecoDetail.classList.toggle('hidden', !this.ecoVisible);
    this.buildBuildPanel();
    this.buildStats();
    this.bindTopBar();
  }

  private buildBuildPanel(): void {
    for (const category of CATEGORIES) {
      const section = document.createElement('div');
      section.className = 'category';
      const title = document.createElement('span');
      title.textContent = CATEGORY_LABELS[category];
      section.appendChild(title);
      const items = document.createElement('div');
      items.className = 'items';
      for (const type of OBJECT_ORDER.filter((candidate) => OBJECT_DEFS[candidate].category === category)) {
        const button = document.createElement('button');
        button.dataset.type = type;
        button.textContent = OBJECT_DEFS[type].label;
        button.addEventListener('click', () => this.callbacks.onSelect(type));
        items.appendChild(button);
      }
      section.appendChild(items);
      this.categoryRoot.appendChild(section);
    }
    for (const type of OBJECT_ORDER) {
      const button = document.createElement('button');
      button.dataset.object = type;
      button.textContent = OBJECT_DEFS[type].label;
      button.addEventListener('click', () => this.callbacks.onSelect(type));
      this.objectList.appendChild(button);
    }
  }

  private buildStats(): void {
    for (const key of ENV_KEYS) {
      const row = document.createElement('div');
      row.className = 'stat';
      row.innerHTML = `<div class="row"><span>${ENV_LABELS[key]}</span><span data-value="${key}">0</span></div><div class="bar"><i data-bar="${key}"></i></div>`;
      this.statsRoot.appendChild(row);
    }
  }

  private bindTopBar(): void {
    this.pauseButton.addEventListener('click', () => {
      const paused = this.pauseButton.textContent === 'Jeda';
      this.callbacks.onPause(paused);
      this.pauseButton.textContent = paused ? 'Lanjut' : 'Jeda';
    });
    document.getElementById('menu-btn')!.addEventListener('click', () => this.callbacks.onMenu());
    document.getElementById('dna-btn')!.addEventListener('click', () => this.openDna());
    document.getElementById('dna-close')!.addEventListener('click', () => {
      this.callbacks.onCloseDna();
      this.modal.classList.add('hidden');
    });
    const copy = async (text: string, label: string): Promise<void> => {
      try {
        await navigator.clipboard.writeText(text);
        this.notify(`${label} disalin.`);
      } catch {
        this.notify('Gagal menyalin; pilih teks secara manual.', true);
      }
    };
    document.getElementById('dna-copy')!.addEventListener('click', () => void copy(this.dnaInput.value, 'Kode pendek'));
    document.getElementById('dna-copy-full')!.addEventListener('click', () => void copy(this.dnaFull.value, 'Kode lengkap'));
    document.getElementById('dna-share')!.addEventListener('click', async () => {
      const share = (navigator as Navigator & {
        share?: (data: { title: string; text: string }) => Promise<void>;
      }).share;
      if (share) {
        try {
          await share.call(navigator, { title: 'Planet DNA', text: this.dnaInput.value });
          return;
        } catch {
          // User cancelled or the browser denied sharing; fall back to clipboard.
        }
      }
      await copy(this.dnaInput.value, 'Kode DNA');
    });
    const inputCode = (): string => this.dnaInput.value.trim() || this.dnaFull.value.trim();
    document.getElementById('dna-load')!.addEventListener('click', () => {
      this.callbacks.onLoadDna(inputCode());
      this.modal.classList.add('hidden');
    });
    document.getElementById('dna-preview')!.addEventListener('click', () => {
      this.callbacks.onPreviewDna(inputCode());
      this.setPreviewing(true);
    });
    document.getElementById('dna-duplicate')!.addEventListener('click', () => {
      this.callbacks.onDuplicateDna();
      this.modal.classList.add('hidden');
    });
    document.getElementById('dna-remix')!.addEventListener('click', () => {
      this.callbacks.onRemixDna();
      this.modal.classList.add('hidden');
    });
    document.getElementById('new-btn')!.addEventListener('click', () => this.callbacks.onNewPlanet());

    document.getElementById('telemetry-btn')!.addEventListener('click', () => {
      this.telemetryModal.classList.remove('hidden');
    });
    this.telemetryCheckbox.addEventListener('change', () => {
      this.callbacks.onTelemetryChange(this.telemetryCheckbox.checked);
      this.notify(this.telemetryCheckbox.checked ? 'Telemetri diaktifkan.' : 'Telemetri dimatikan.');
    });
    document.getElementById('telemetry-export')!.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this.callbacks.onTelemetryExport());
        this.notify('Data telemetri disalin.');
      } catch {
        this.notify('Gagal menyalin; periksa izin clipboard.', true);
      }
    });
    document.getElementById('telemetry-clear')!.addEventListener('click', () => {
      this.callbacks.onTelemetryClear();
      this.notify('Data telemetri dihapus.');
    });
    document.getElementById('telemetry-close')!.addEventListener('click', () => this.telemetryModal.classList.add('hidden'));
  }

  openDna(): void {
    const codes = this.callbacks.onCopyDna();
    this.dnaInput.value = codes.short;
    this.dnaFull.value = codes.full;
    this.setPreviewing(false);
    this.modal.classList.remove('hidden');
    this.dnaInput.focus();
    this.dnaInput.select();
  }

  setTelemetryEnabled(enabled: boolean): void {
    this.telemetryCheckbox.checked = enabled;
  }

  setPreviewing(active: boolean): void {
    this.dnaStatus.textContent = active
      ? 'Pratinjau aktif — planet asli belum berubah. Tutup panel untuk kembali.'
      : '';
    this.dnaStatus.classList.toggle('hidden', !active);
  }

  update(planet: PlanetState, selected: ObjectType | null): void {
    this.nameLabel.textContent = planet.name;
    this.stageLabel.textContent = `Tahap ${planet.stage} — ${STAGE_NAMES[planet.stage]}`;
    this.levelLabel.textContent = `Level ${planet.progression.level} · ${Math.floor(planet.progression.xp)} XP`;

    for (const key of ENV_KEYS) {
      const value = planet.environment[key];
      const display = key === 'temperature' ? `${value.toFixed(1)}°` : Math.round(value).toString();
      (this.statsRoot.querySelector(`[data-value="${key}"]`) as HTMLElement).textContent = display;
      (this.statsRoot.querySelector(`[data-bar="${key}"]`) as HTMLElement).style.width = `${Math.max(0, Math.min(100, value))}%`;
    }

    const eco = planet.ecosystem;
    const fauna = planet.fauna;
    const extinctLabels = (fauna?.extinct ?? []).map((id) => SPECIES_DEFS[id].label).join(', ');
    this.ecosystem.innerHTML =
      `<strong>Ekosistem</strong><br>` +
      `Vegetasi ${Math.round(eco.vegetation)} · Satwa ${Math.round(eco.wildlife)}<br>` +
      `Populasi ${eco.population} · Kesehatan ${eco.health}<br>` +
      `Fauna ${fauna?.agents.length ?? 0} agen · ${fauna?.discovered.length ?? 0} spesies ditemukan` +
      (extinctLabels ? `<br>Punah: ${extinctLabels}` : '');
    this.renderEcoDetail(planet);

    const weather = WEATHER_DEFS[planet.weather.type];
    this.weatherRoot.innerHTML =
      `<strong>Cuaca: ${weather.label}</strong><br>` +
      `Intensitas ${Math.round(planet.weather.intensity * 100)}% · ${planet.weather.remainingTicks} tick lagi`;

    if (!planet.events) planet.events = {};
    this.eventsRoot.innerHTML =
      '<strong>Event Opsional</strong>' +
      EVENT_DEFS.map((event) => {
        const progress = planet.events[event.id] ?? { status: 'active', progress: 0 };
        const done = progress.status === 'complete';
        return `<div class="event${done ? ' done' : ''}" data-event="${event.id}">${done ? '✓' : '○'} ${event.title} <span>${event.progressLabel(progress.progress, event.target)}</span></div>`;
      }).join('');

    const e = planet.environment;
    const missionDone = planet.mission.status === 'complete';
    this.mission.innerHTML = missionDone
      ? '<strong>Misi selesai</strong><br>Hijaukan Planet ✓'
      : `<strong>Misi: Hijaukan Planet</strong><br>Oksigen ≥ 45 (${Math.round(e.oxygen)}) · Air ≥ 40 (${Math.round(e.water)}) · Stabilitas ≥ 60 (${Math.round(e.stability)})<br>Tahan ${planet.mission.holdTicks}/3 tick`;

    for (const button of this.categoryRoot.querySelectorAll<HTMLButtonElement>('[data-type]')) {
      const type = button.dataset.type as ObjectType;
      const locked = !planet.progression.unlockedObjects.includes(type);
      button.disabled = locked;
      button.title = locked ? `Terbuka di level ${UNLOCK_LEVEL[type]}` : OBJECT_DEFS[type].label;
      button.classList.toggle('active', !locked && selected === type);
    }
    for (const button of this.objectList.querySelectorAll<HTMLButtonElement>('[data-object]')) {
      const type = button.dataset.object as ObjectType;
      const locked = !planet.progression.unlockedObjects.includes(type);
      button.disabled = locked;
      button.title = locked ? `Terbuka di level ${UNLOCK_LEVEL[type]}` : OBJECT_DEFS[type].label;
      button.classList.toggle('active', !locked && selected === type);
    }
  }

  private renderEcoDetail(planet: PlanetState): void {
    if (!this.ecoVisible) return;
    const config = ecosystemConfigOf(planet);
    if (!config) {
      this.ecoDetail.innerHTML = '<strong>Ekologi</strong><br>Belum tersedia untuk planet ini.';
      return;
    }
    const context = habitatContextFor(planet, config);
    const metrics = planet.eco.metrics;
    const rows = config.species.map((definition) => {
      const population = planet.eco.populations[definition.id];
      const score = scoreHabitat(definition, context);
      if (!population) return '';
      const percent = Math.max(0, Math.min(100, (population.estimate / Math.max(1, population.capacity)) * 100));
      const trend = population.trend > 0.05 ? '▲' : population.trend < -0.05 ? '▼' : '•';
      const limit = score?.limitingFactor ?? '-';
      return (
        `<div class="eco-name"><span>${definition.name}</span><span>${Math.round(population.estimate)}/${Math.round(population.capacity)} ${trend}</span></div>` +
        `<div class="eco-bar"><i style="width:${percent.toFixed(0)}%"></i></div>` +
        `<div class="eco-limit">batas: ${limit}</div>`
      );
    }).join('');
    const guildRows = SPECIES_ORDER.map((species) => {
      const status = guildStatus(planet, species);
      const agents = planet.fauna?.agents.filter((agent) => agent.species === species).length ?? 0;
      return (
        `<div class="eco-name"><span>${SPECIES_DEFS[species].label} (agen)</span><span>${agents} agen</span></div>` +
        `<div class="eco-limit">pop ${Math.round(status?.estimate ?? 0)} · pangan ${Math.round((status?.foodFactor ?? 0) * 100)}%</div>`
      );
    }).join('');
    this.ecoDetail.innerHTML =
      `<strong>Ekologi ${config.name}</strong><br>` +
      (planet.eco.cryo.seasonId !== 'none'
        ? `Musim ${planet.eco.cryo.seasonName} · es ${planet.eco.cryo.iceCoverage.toFixed(0)}% · salju ${planet.eco.cryo.snowCover.toFixed(0)}% · stres ${planet.eco.cryo.thawStress.toFixed(0)}%<br>`
        : '') +
      (planet.eco.volcano.seasonId !== 'none'
        ? `Musim ${planet.eco.volcano.seasonName} · panas ${planet.eco.volcano.heat.toFixed(0)}% · lava ${planet.eco.volcano.lavaFlow.toFixed(0)}% · abu ${planet.eco.volcano.ash.toFixed(0)}% · stres ${planet.eco.volcano.eruptionStress.toFixed(0)}%<br>`
        : '') +
      (planet.eco.ocean.seasonId !== 'none'
        ? `Musim ${planet.eco.ocean.seasonName} · arus ${planet.eco.ocean.current.toFixed(0)}% · karang ${planet.eco.ocean.reefHealth.toFixed(0)}% · plankton ${planet.eco.ocean.plankton.toFixed(0)}% · pemutihan ${planet.eco.ocean.bleaching.toFixed(0)}%<br>`
        : '') +
      (planet.eco.fungal.seasonId !== 'none'
        ? `Musim ${planet.eco.fungal.seasonName} · jaringan ${planet.eco.fungal.network.toFixed(0)}% · spora ${planet.eco.fungal.spores.toFixed(0)}% · cahaya ${planet.eco.fungal.glow.toFixed(0)}% · stres ${planet.eco.fungal.networkStress.toFixed(0)}%<br>`
        : '') +
      (planet.eco.sky.seasonId !== 'none'
        ? planet.planetId === 'cosmos'
          ? `Fase ${planet.eco.sky.seasonName} · kisi ${planet.eco.sky.connectivity.toFixed(0)}% · radiasi ${planet.eco.sky.wind.toFixed(0)}% · cahaya ${planet.eco.sky.blossom.toFixed(0)}% · gravitasi ${planet.eco.sky.uplift.toFixed(0)}%<br>`
          : `Musim ${planet.eco.sky.seasonName} · konektivitas ${planet.eco.sky.connectivity.toFixed(0)}% · angin ${planet.eco.sky.wind.toFixed(0)}% · mekar ${planet.eco.sky.blossom.toFixed(0)}% · stres ${planet.eco.sky.isolationStress.toFixed(0)}%<br>`
        : '') +
      (planet.eco.forest.seasonId !== 'none'
        ? `Musim ${planet.eco.forest.seasonName} · serasah ${planet.eco.forest.leafLitter.toFixed(0)}% · simpanan ${planet.eco.forest.storage.toFixed(0)}% · hibernasi ${planet.eco.forest.hibernation.toFixed(0)}% · embun ${planet.eco.forest.frostStress.toFixed(0)}%<br>`
        : '') +
      `Spesies ${metrics.speciesCount} · Populasi ${metrics.totalPopulation}<br>` +
      `Habitat ${Math.round(metrics.habitatHealth)} · Pangan ${Math.round(metrics.foodAvailability)} · Detritus ${planet.eco.detritus.toFixed(1)}<br>` +
      `<div class="eco-list">${rows}</div>` +
      '<div class="eco-title">Rantai makanan &amp; agen</div>' +
      `<div class="eco-list">${guildRows}</div>`;
  }

  notify(message: string, warn = false): void {
    window.clearTimeout(this.toastTimer);
    this.toast.textContent = message;
    this.toast.classList.toggle('warn', warn);
    this.toast.classList.add('show');
    this.toastTimer = window.setTimeout(() => this.toast.classList.remove('show'), 3200);
  }
}
