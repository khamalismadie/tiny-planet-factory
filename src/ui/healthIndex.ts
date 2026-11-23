import type { PlanetState } from '../sim/types';

export type HealthTone = 'ok' | 'warn';

export interface HealthComponent {
  id: string;
  label: string;
  value: number;
  weight: number;
  contribution: number;
}

export interface PlanetHealthIndex {
  score: number;
  label: string;
  tone: HealthTone;
  summary: string;
  components: HealthComponent[];
  deltaFromStart: number;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

export function planetHealthIndex(planet: PlanetState): PlanetHealthIndex {
  const env = planet.environment;
  const eco = planet.ecosystem;

  const definitions: Array<{ id: string; label: string; value: number; weight: number }> = [
    { id: 'health', label: 'Kesehatan ekosistem', value: eco.health, weight: 25 },
    { id: 'water', label: 'Air', value: env.water, weight: 15 },
    { id: 'oxygen', label: 'Oksigen', value: env.oxygen, weight: 15 },
    { id: 'fertility', label: 'Kesuburan', value: env.fertility, weight: 15 },
    { id: 'biodiversity', label: 'Biodiversitas', value: env.biodiversity, weight: 15 },
    { id: 'stability', label: 'Stabilitas', value: env.stability, weight: 10 },
    { id: 'vegetation', label: 'Vegetasi', value: eco.vegetation, weight: 5 },
  ];

  const components = definitions.map((entry) => {
    const value = clamp(entry.value);
    return {
      id: entry.id,
      label: entry.label,
      value,
      weight: entry.weight,
      contribution: (value * entry.weight) / 100,
    };
  });

  const score = Math.round(components.reduce((sum, entry) => sum + entry.contribution, 0));
  const label = score < 35 ? 'Kritis' : score < 55 ? 'Pemulihan' : score < 75 ? 'Stabil' : 'Sejahtera';
  const tone: HealthTone = score < 55 ? 'warn' : 'ok';
  const summary = score < 35
    ? 'Indikator utama masih lemah. Fokus pada air, vegetasi, dan stabilitas sebelum ekspansi.'
    : score < 55
      ? 'Pemulihan berjalan. Lanjutkan aksi restorasi yang menaikkan indikator terbobot terendah.'
      : score < 75
        ? 'Kondisi stabil. Pertahankan keseimbangan dan pantau cuaca ekstrem.'
        : 'Ekosistem sejahtera. Jaga variasi habitat dan hindari perubahan ekstrem.';

  const deltaKeys = ['water', 'oxygen', 'fertility', 'biodiversity', 'stability'] as const;
  const deltaFromStart = deltaKeys.reduce(
    (sum, key) => sum + (planet.environment[key] - (planet.startingEnvironment?.[key] ?? planet.environment[key])),
    0,
  ) / deltaKeys.length;

  return { score, label, tone, summary, components, deltaFromStart };
}
