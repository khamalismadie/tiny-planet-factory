import type { Biome, EcosystemState, Environment } from './types';

export function inferBiome(environment: Environment, ecosystem?: EcosystemState): Biome {
  if (environment.temperature < 5) return 'frozen';
  if (environment.water < 30 && environment.humidity < 40) return 'dry';
  if (environment.biodiversity >= 45 && environment.oxygen >= 50) return 'lush';
  if ((ecosystem?.vegetation ?? 0) >= 25 || environment.oxygen >= 35) return 'temperate';
  return 'barren';
}

export const BIOMES: Biome[] = ['barren', 'dry', 'temperate', 'lush', 'frozen'];
