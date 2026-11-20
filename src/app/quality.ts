export type QualityTier = 'low' | 'medium' | 'high';

export interface QualitySettings {
  tier: QualityTier;
  label: string;
  planetDetail: number;
  propCapacity: number;
  wildlifeCapacity: number;
  maxClouds: number;
  maxDrops: number;
}

export const QUALITY: Record<QualityTier, QualitySettings> = {
  low: {
    tier: 'low',
    label: 'Hemat',
    planetDetail: 2,
    propCapacity: 32,
    wildlifeCapacity: 6,
    maxClouds: 6,
    maxDrops: 24,
  },
  medium: {
    tier: 'medium',
    label: 'Menengah',
    planetDetail: 3,
    propCapacity: 64,
    wildlifeCapacity: 12,
    maxClouds: 10,
    maxDrops: 48,
  },
  high: {
    tier: 'high',
    label: 'Tinggi',
    planetDetail: 4,
    propCapacity: 96,
    wildlifeCapacity: 24,
    maxClouds: 14,
    maxDrops: 80,
  },
};

const ORDER: QualityTier[] = ['low', 'medium', 'high'];

export function nextLower(tier: QualityTier): QualityTier {
  return ORDER[Math.max(0, ORDER.indexOf(tier) - 1)];
}

export function nextHigher(tier: QualityTier): QualityTier {
  return ORDER[Math.min(ORDER.length - 1, ORDER.indexOf(tier) + 1)];
}

export function detectQuality(): QualityTier {
  const override = new URLSearchParams(location.search).get('quality');
  if (override === 'low' || override === 'medium' || override === 'high') return override;

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  const mobile = /Android|iPhone|iPad|iPod/i.test(nav.userAgent);

  if ((mobile && cores <= 4) || cores <= 2 || memory <= 2) return 'low';
  if (mobile || coarse || cores <= 6 || memory <= 4) return 'medium';
  return 'high';
}

/** Pure helper used by the frame monitor and its unit test. */
export function suggestQuality(p95ms: number, current: QualityTier, baseline: QualityTier): QualityTier | null {
  if (p95ms > 34 && current !== 'low') return nextLower(current);
  // Never upgrade past the tier chosen at boot: that tier reflects device capability.
  if (p95ms < 18 && current !== baseline && current !== 'high') return nextHigher(current);
  return null;
}
