import { version } from '../../package.json';

export type TelemetryName =
  | 'boot'
  | 'placement'
  | 'mission_complete'
  | 'event_complete'
  | 'context_loss'
  | 'quality_downgrade'
  | 'quality_change'
  | 'menu_open'
  | 'qa_report'
  | 'dna_import'
  | 'dna_preview'
  | 'dna_duplicate'
  | 'dna_remix'
  | 'species_discovered'
  | 'species_extinct';

export interface TelemetryEvent {
  name: TelemetryName;
  at: number;
  data?: Record<string, string | number | boolean | null>;
}

interface TelemetryData {
  optedIn: boolean;
  sessionId: string;
  events: TelemetryEvent[];
}

const KEY = 'tpf.telemetry.v1';
const MAX_EVENTS = 250;

function emptyData(): TelemetryData {
  return {
    optedIn: false,
    sessionId: `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    events: [],
  };
}

export class Telemetry {
  private data: TelemetryData;

  constructor() {
    this.data = this.read();
  }

  private read(): TelemetryData {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return emptyData();
      const parsed = JSON.parse(raw) as Partial<TelemetryData>;
      return {
        optedIn: parsed.optedIn === true,
        sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : emptyData().sessionId,
        events: Array.isArray(parsed.events) ? parsed.events.slice(-MAX_EVENTS) : [],
      };
    } catch {
      return emptyData();
    }
  }

  private write(): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data));
    } catch {
      // Telemetry is best-effort and never blocks gameplay.
    }
  }

  get optedIn(): boolean {
    return this.data.optedIn;
  }

  setOptIn(enabled: boolean): void {
    this.data.optedIn = enabled;
    if (enabled) this.record('boot', { source: 'opt-in' });
    this.write();
  }

  record(name: TelemetryName, data?: TelemetryEvent['data']): void {
    if (!this.data.optedIn) return;
    this.data.events.push({ name, at: Date.now(), data });
    if (this.data.events.length > MAX_EVENTS) this.data.events.shift();
    this.write();
  }

  exportJson(): string {
    return JSON.stringify(
      {
        app: 'Tiny Planet Factory',
        version,
        ...this.data,
      },
      null,
      2,
    );
  }

  clear(): void {
    this.data = { ...emptyData(), optedIn: this.data.optedIn };
    this.write();
  }
}
