import { DEFAULT_TERRAIN_CONFIG, type TerrainConfig } from '../sim/types';

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * Planet configs author terrain in game units (seaLevel 4..26, amplitude 14..36),
 * while the camera, props and weather FX are built for a radius of ~1. Convert
 * once at the render boundary so the simulation data and DNA stay untouched.
 */
export function normalizeTerrainForRender(config: TerrainConfig = DEFAULT_TERRAIN_CONFIG): TerrainConfig {
  const amplitude = Number.isFinite(config.amplitude) ? config.amplitude : DEFAULT_TERRAIN_CONFIG.amplitude;
  const frequency = Number.isFinite(config.frequency) ? config.frequency : DEFAULT_TERRAIN_CONFIG.frequency;
  const ridge = Number.isFinite(config.ridge) ? config.ridge : DEFAULT_TERRAIN_CONFIG.ridge;
  const seaLevel = Number.isFinite(config.seaLevel) ? config.seaLevel : DEFAULT_TERRAIN_CONFIG.seaLevel;

  // Already in render units: legacy saves, defaults, or a repeated normalization.
  if (seaLevel < 2 || amplitude < 1) {
    const renderAmplitude = clamp(amplitude, 0.012, 0.06);
    return {
      amplitude: renderAmplitude,
      frequency: clamp(frequency, 0.6, 2.4),
      ridge: clamp(ridge, 0, renderAmplitude * 0.6),
      seaLevel: clamp(seaLevel, 0.92, 1.08),
    };
  }

  const amplitudeRatio = clamp((amplitude - 14) / 22, 0, 1);
  const seaRatio = clamp((seaLevel - 4) / 22, 0, 1);
  const renderAmplitude = 0.018 + amplitudeRatio * 0.034;
  return {
    amplitude: renderAmplitude,
    frequency: clamp(frequency * 24, 0.9, 2.0),
    ridge: clamp(ridge, 0, 1) * renderAmplitude * 0.6,
    seaLevel: 0.94 + seaRatio * 0.12,
  };
}

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
