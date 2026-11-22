import { foodWebLinks } from './eco/guilds';
import type { PlanetState } from './types';

export type AdvancedSystem = 'civilization' | 'industry' | 'ai' | 'cosmic';

export const ADVANCED_SYSTEMS: Record<AdvancedSystem, { label: string; inputs: string }> = {
  civilization: {
    label: 'Peradaban',
    inputs: 'populasi, stabilitas, air, jaring makanan, level',
  },
  industry: {
    label: 'Industri',
    inputs: 'energi, objek terbangun, populasi, level',
  },
  ai: {
    label: 'AI',
    inputs: 'biodiversitas, agen, jaring makanan, stabilitas, level',
  },
  cosmic: {
    label: 'Kosmik',
    inputs: 'tahap, energi, biodiversitas, level',
  },
};

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Skor sistem lanjutan 0..100. Semua nilai diturunkan dari state sim yang sudah
 * ada, sehingga tidak menambah field DNA dan tidak mengubah schemaVersion 3.
 */
export function advancedSystemScore(planet: PlanetState, system: AdvancedSystem): number {
  const e = planet.environment;
  const levelScore = clamp(((planet.progression.level - 1) / 99) * 100);
  const populationScore = clamp(planet.ecosystem.population / 2);
  const foodScore = clamp((foodWebLinks(planet).length / 14) * 100);
  const agentScore = clamp(((planet.fauna?.agents.length ?? 0) / 20) * 100);
  const objectScore = clamp((planet.objects.length / 60) * 100);
  const stageScore = clamp(((planet.stage - 1) / 5) * 100);

  switch (system) {
    case 'civilization':
      return clamp(
        populationScore * 0.3 + e.stability * 0.2 + e.water * 0.15 + foodScore * 0.15 + levelScore * 0.2,
      );
    case 'industry':
      return clamp(
        e.energy * 0.3 + objectScore * 0.25 + populationScore * 0.15 + levelScore * 0.3,
      );
    case 'ai':
      return clamp(
        e.biodiversity * 0.25 + agentScore * 0.2 + foodScore * 0.2 + e.stability * 0.15 + levelScore * 0.2,
      );
    case 'cosmic':
      return clamp(
        stageScore * 0.25 + e.energy * 0.15 + e.biodiversity * 0.2 + levelScore * 0.4,
      );
  }
}

export interface AdvancedSnapshot {
  scores: Record<AdvancedSystem, number>;
  tiers: Record<AdvancedSystem, number>;
}

export function advancedSnapshot(planet: PlanetState): AdvancedSnapshot {
  const systems: AdvancedSystem[] = ['civilization', 'industry', 'ai', 'cosmic'];
  const scores = Object.fromEntries(
    systems.map((system) => [system, advancedSystemScore(planet, system)]),
  ) as Record<AdvancedSystem, number>;
  const tiers = Object.fromEntries(
    systems.map((system) => [system, Math.min(5, Math.floor(scores[system] / 20) + 1)]),
  ) as Record<AdvancedSystem, number>;
  return { scores, tiers };
}
