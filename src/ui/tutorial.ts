import type { WeatherType } from '../sim/types';

const STORAGE_KEY = 'tpf.tutorial.v1';

export type TutorialFocus = 'tree' | 'objective' | null;

export interface TutorialSignals {
  objects: number;
  tick: number;
  missionStatus: 'active' | 'complete';
  level: number;
  weather: WeatherType;
  faunaAgents: number;
}

export interface TutorialView {
  active: boolean;
  step: number;
  total: number;
  label: string;
  instruction: string;
  focus: TutorialFocus;
}

interface TutorialState {
  version: 1;
  started: boolean;
  completed: boolean;
  seenTips: string[];
}

type AutoTipId = 'weather' | 'agents' | 'unlock' | 'advanced';
type TipId = AutoTipId | 'dna';

const STEPS: Array<{ instruction: string; focus: TutorialFocus }> = [
  { instruction: 'Pilih Pohon, lalu ketuk planet.', focus: 'tree' },
  { instruction: 'Geser putar · zoom · tunggu 10 tick.', focus: null },
  { instruction: 'Selesaikan misi pertama sekarang.', focus: 'objective' },
];

const AUTO_TIPS: Record<AutoTipId, { text: string; when: (signals: TutorialSignals) => boolean }> = {
  weather: {
    text: 'Cuaca berubah. Cek panel Ekosistem.',
    when: (signals) => signals.weather !== 'sunny' && signals.tick > 20,
  },
  agents: {
    text: 'Agen mulai bergerak. Lihat jumlah fauna di kanan.',
    when: (signals) => signals.faunaAgents > 0,
  },
  unlock: {
    text: 'Alat baru terbuka di bawah.',
    when: (signals) => signals.level >= 2,
  },
  advanced: {
    text: 'Misi lanjutan memakai skor sistem.',
    when: (signals) => signals.level >= 61,
  },
};

const DNA_TIP = 'Kode DNA siap dibagikan atau dimuat ulang.';

function defaultState(): TutorialState {
  return { version: 1, started: false, completed: false, seenTips: [] };
}

function loadState(): TutorialState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<TutorialState>;
    if (parsed.version !== 1) return defaultState();
    return {
      version: 1,
      started: parsed.started === true,
      completed: parsed.completed === true,
      seenTips: Array.isArray(parsed.seenTips) ? parsed.seenTips.filter((id): id is string => typeof id === 'string') : [],
    };
  } catch {
    return defaultState();
  }
}

/** UI-only state machine. Tidak menulis ke PlanetState, DNA, atau schemaVersion. */
export class Tutorial {
  private state = loadState();
  private active = false;
  private step = 0;
  private stepTick = 0;
  private disabled = false;

  get isCompleted(): boolean {
    return this.state.completed;
  }

  get isStarted(): boolean {
    return this.state.started && !this.state.completed;
  }

  get view(): TutorialView {
    if (!this.active || this.disabled) {
      return { active: false, step: 0, total: STEPS.length, label: '', instruction: '', focus: null };
    }
    const index = Math.min(STEPS.length - 1, Math.max(0, this.step));
    return {
      active: true,
      step: index + 1,
      total: STEPS.length,
      label: `Panduan ${index + 1}/${STEPS.length}`,
      instruction: STEPS[index].instruction,
      focus: STEPS[index].focus,
    };
  }

  start(): void {
    if (this.disabled || this.state.completed) return;
    this.active = true;
    this.state.started = true;
    this.step = 0;
    this.stepTick = 0;
    this.persist();
  }

  disable(): void {
    this.disabled = true;
    this.active = false;
  }

  reset(): void {
    this.disabled = false;
    this.state.started = true;
    this.state.completed = false;
    this.state.seenTips = [];
    this.active = true;
    this.step = 0;
    this.stepTick = 0;
    this.persist();
  }

  update(signals: TutorialSignals): string | null {
    if (this.disabled) return null;

    if (this.active) {
      if (this.step === 0 && signals.objects >= 1) {
        this.step = 1;
        this.stepTick = signals.tick;
      }
      if (this.step === 1 && signals.tick >= this.stepTick + 10) {
        this.step = 2;
      }
      if (
        this.step === 2 &&
        (signals.missionStatus === 'complete' || signals.level >= 2)
      ) {
        this.active = false;
        this.state.completed = true;
        this.persist();
        return 'Panduan selesai. Buka Menu → Cara pakai UI untuk mengulang.';
      }
      return null;
    }

    if (!this.state.completed) return null;
    for (const id of Object.keys(AUTO_TIPS) as AutoTipId[]) {
      if (this.state.seenTips.includes(id)) continue;
      if (!AUTO_TIPS[id].when(signals)) continue;
      return this.markTip(id);
    }
    return null;
  }

  markTip(id: TipId): string | null {
    if (this.disabled || this.state.seenTips.includes(id)) return null;
    this.state.seenTips.push(id);
    this.persist();
    return id === 'dna' ? DNA_TIP : AUTO_TIPS[id].text;
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage may be unavailable (private mode / disabled cookies); tutorial stays in memory.
    }
  }
}
