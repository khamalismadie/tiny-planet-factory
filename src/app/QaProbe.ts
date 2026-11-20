export interface QaContext {
  bootMs: number;
  qualityTier: string;
  downgrades: number;
  drawCalls: number;
  objects: number;
  contextLost: boolean;
  stage: number;
  missionStatus: string;
  completedEvents: number;
  wildlifeAgents: number;
  discoveredSpecies: number;
  extinctSpecies: number;
}

export interface QaReport {
  app: 'Tiny Planet Factory';
  collectedAt: string;
  durationMs: number;
  frames: number;
  p50ms: number;
  p95ms: number;
  fps: number;
  bootMs: number;
  quality: {
    tier: string;
    downgrades: number;
  };
  scene: {
    drawCalls: number;
    objects: number;
    stage: number;
    mission: string;
    completedEvents: number;
    wildlifeAgents: number;
    discoveredSpecies: number;
    extinctSpecies: number;
    contextLost: boolean;
  };
  device: {
    userAgent: string;
    cores: number;
    memoryGb: number | null;
    dpr: number;
    viewport: string;
    standalone: boolean;
    serviceWorker: boolean;
    installPromptSeen: boolean;
  };
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))];
}

export class QaProbe {
  private readonly samples: number[] = [];
  private readonly startedAt = performance.now();
  private finishedAt = 0;
  private installPromptSeen = false;

  constructor(
    private readonly durationMs: number,
    private readonly context: () => QaContext,
  ) {
    window.addEventListener('beforeinstallprompt', () => {
      this.installPromptSeen = true;
    }, { once: true });
  }

  add(ms: number): void {
    if (!this.finishedAt) this.samples.push(ms);
  }

  tick(now: number): QaReport | null {
    if (this.finishedAt || now - this.startedAt < this.durationMs) return null;
    this.finishedAt = now;
    return this.report();
  }

  report(): QaReport {
    const sorted = [...this.samples].sort((a, b) => a - b);
    const p50ms = percentile(sorted, 0.5);
    const nav = navigator as Navigator & { deviceMemory?: number };
    return {
      app: 'Tiny Planet Factory',
      collectedAt: new Date().toISOString(),
      durationMs: Math.round((this.finishedAt || performance.now()) - this.startedAt),
      frames: sorted.length,
      p50ms: Number(p50ms.toFixed(2)),
      p95ms: Number(percentile(sorted, 0.95).toFixed(2)),
      fps: Number((p50ms > 0 ? 1000 / p50ms : 0).toFixed(1)),
      bootMs: Math.round(this.context().bootMs),
      quality: {
        tier: this.context().qualityTier,
        downgrades: this.context().downgrades,
      },
      scene: {
        drawCalls: this.context().drawCalls,
        objects: this.context().objects,
        stage: this.context().stage,
        mission: this.context().missionStatus,
        completedEvents: this.context().completedEvents,
        wildlifeAgents: this.context().wildlifeAgents,
        discoveredSpecies: this.context().discoveredSpecies,
        extinctSpecies: this.context().extinctSpecies,
        contextLost: this.context().contextLost,
      },
      device: {
        userAgent: nav.userAgent,
        cores: nav.hardwareConcurrency ?? 0,
        memoryGb: nav.deviceMemory ?? null,
        dpr: window.devicePixelRatio,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        standalone: matchMedia('(display-mode: standalone)').matches,
        serviceWorker: !!navigator.serviceWorker?.controller,
        installPromptSeen: this.installPromptSeen,
      },
    };
  }
}
