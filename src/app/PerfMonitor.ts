import type { QualityTier } from './quality';
import { suggestQuality } from './quality';

export interface PerfSnapshot {
  frames: number;
  p50ms: number;
  p95ms: number;
  fps: number;
  qualityTier: QualityTier;
  adaptive: boolean;
}

export class PerfMonitor {
  private readonly samples: number[] = [];
  private readonly baseline: QualityTier;
  private current: QualityTier;
  private adaptive = true;
  private downgrades = 0;

  constructor(tier: QualityTier) {
    this.baseline = tier;
    this.current = tier;
  }

  get tier(): QualityTier {
    return this.current;
  }

  get enabled(): boolean {
    return this.adaptive;
  }

  disableAdaptive(): void {
    this.adaptive = false;
  }

  setTier(tier: QualityTier): void {
    this.current = tier;
  }

  add(ms: number): void {
    this.samples.push(ms);
    if (this.samples.length > 240) this.samples.shift();
  }

  snapshot(): PerfSnapshot {
    const sorted = [...this.samples].sort((a, b) => a - b);
    const at = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))] ?? 0;
    const p50ms = at(0.5);
    const p95ms = at(0.95);
    return {
      frames: sorted.length,
      p50ms,
      p95ms,
      fps: p50ms > 0 ? 1000 / p50ms : 0,
      qualityTier: this.current,
      adaptive: this.adaptive,
    };
  }

  /** Call every ~120 real frames. Returns true when the tier changed. */
  evaluate(): boolean {
    if (!this.adaptive || this.samples.length < 120) return false;
    const next = suggestQuality(this.snapshot().p95ms, this.current, this.baseline);
    if (!next || next === this.current) return false;
    this.current = next;
    this.downgrades++;
    return true;
  }

  get downgradeCount(): number {
    return this.downgrades;
  }
}
