import { version } from '../../package.json';

export interface QaLayoutRect {
  x: number;
  y: number;
  w: number;
  h: number;
  right: number;
  bottom: number;
}

export interface QaLayout {
  topbarBottom: number | null;
  buildTop: number | null;
  objective: QaLayoutRect | null;
  inventory: QaLayoutRect | null;
  centerElement: string | null;
  planetCenterVisible: boolean;
  objectiveOverlapsInventory: boolean | null;
  topbarOverlapsBuild: boolean | null;
}

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
  save: {
    tick: number;
    objects: number;
    level: number;
    persistent: boolean;
  };
  network: {
    online: boolean;
    visibility: string;
  };
  orientation: {
    type: string;
    angle: number;
  };
  layout: QaLayout;
  scriptSrc: string | null;
  sw: {
    controller: boolean;
    scriptUrl: string | null;
  };
}

export interface QaReport {
  app: 'Tiny Planet Factory';
  appVersion: string;
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
  save: QaContext['save'];
  network: QaContext['network'];
  orientation: QaContext['orientation'];
  layout: QaLayout;
  runtime: {
    scriptSrc: string | null;
    serviceWorker: {
      controller: boolean;
      scriptUrl: string | null;
    };
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
    const ctx = this.context();
    return {
      app: 'Tiny Planet Factory',
      appVersion: version,
      collectedAt: new Date().toISOString(),
      durationMs: Math.round((this.finishedAt || performance.now()) - this.startedAt),
      frames: sorted.length,
      p50ms: Number(p50ms.toFixed(2)),
      p95ms: Number(percentile(sorted, 0.95).toFixed(2)),
      fps: Number((p50ms > 0 ? 1000 / p50ms : 0).toFixed(1)),
      bootMs: Math.round(ctx.bootMs),
      quality: {
        tier: ctx.qualityTier,
        downgrades: ctx.downgrades,
      },
      scene: {
        drawCalls: ctx.drawCalls,
        objects: ctx.objects,
        stage: ctx.stage,
        mission: ctx.missionStatus,
        completedEvents: ctx.completedEvents,
        wildlifeAgents: ctx.wildlifeAgents,
        discoveredSpecies: ctx.discoveredSpecies,
        extinctSpecies: ctx.extinctSpecies,
        contextLost: ctx.contextLost,
      },
      save: ctx.save,
      network: ctx.network,
      orientation: ctx.orientation,
      layout: ctx.layout,
      runtime: {
        scriptSrc: ctx.scriptSrc,
        serviceWorker: {
          controller: ctx.sw.controller,
          scriptUrl: ctx.sw.scriptUrl,
        },
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
