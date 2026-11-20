import { DEFAULT_TERRAIN_CONFIG, type TerrainConfig } from '../sim/types';

export function terrainRadius(
  nx: number,
  ny: number,
  nz: number,
  seed: number,
  config: TerrainConfig = DEFAULT_TERRAIN_CONFIG,
): number {
  const frequency = config.frequency;
  const noise =
    (Math.sin(nx * 3.1 * frequency + seed * 0.11) * Math.cos(ny * 2.7 * frequency - seed * 0.07) +
      Math.sin(ny * 5.3 * frequency + nz * 2.1 * frequency + seed * 0.13) +
      Math.cos(nz * 7.7 * frequency - nx * 1.9 * frequency + seed * 0.05)) /
    3;
  const ridge = Math.max(0, noise - 0.35) * config.ridge;
  return config.seaLevel + noise * config.amplitude + ridge;
}
