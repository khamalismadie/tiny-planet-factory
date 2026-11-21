import { speciesRegistry } from './registry';
import type {
  HabitatContext,
  HabitatPreference,
  HabitatScore,
  Range,
  SpeciesDefinition,
} from './types';

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function rangeScore(value: number, target: Range | undefined, tolerance: number): number {
  if (!target) return 1;
  const center = (target.min + target.max) / 2;
  const spread = Math.max(1e-6, (target.max - target.min) / 2 + tolerance);
  return clamp01(1 - Math.abs(value - center) / spread);
}

function preferenceFor(definition: SpeciesDefinition, context: HabitatContext): HabitatPreference | null {
  if (definition.habitatPreferences.length === 0) return null;
  let best: HabitatPreference | null = null;
  let bestScore = -Infinity;
  for (const preference of definition.habitatPreferences) {
    const biomeScore = preference.biomes.length === 0
      ? 1
      : preference.biomes.filter((biome) => context.biomeTags.includes(biome)).length / preference.biomes.length;
    if (biomeScore > bestScore) {
      best = preference;
      bestScore = biomeScore;
    }
  }
  return best;
}

function biomeMatch(preference: HabitatPreference, context: HabitatContext): number {
  if (preference.biomes.length === 0) return 1;
  const matched = preference.biomes.filter((biome) => context.biomeTags.includes(biome)).length;
  return matched / preference.biomes.length;
}

export class HabitatManager {
  constructor(private readonly registry = speciesRegistry) {}

  score(speciesId: string, context: HabitatContext): HabitatScore | null {
    const definition = this.registry.get(speciesId);
    if (!definition) return null;
    const preference = preferenceFor(definition, context);
    if (!preference) {
      return { suitability: 0, factors: {}, limitingFactor: 'habitat-preference' };
    }

    const tolerance = definition.environmentalTolerance;
    const factors: Record<string, number> = {
      biome: biomeMatch(preference, context),
      temperature: rangeScore(context.environment.temperature, preference.temperature, tolerance),
      humidity: rangeScore(context.environment.humidity, preference.humidity, tolerance),
      water: rangeScore(context.environment.water, preference.water, tolerance),
      vegetation: rangeScore(context.ecosystem.vegetation, preference.vegetation, tolerance),
      fertility: rangeScore(context.environment.fertility, preference.fertility, tolerance),
      stability: clamp01(context.environment.stability / 100),
    };

    if (preference.aquatic) {
      const aquatic = context.aquatic;
      factors.aquatic = aquatic ? clamp01(aquatic.depth / Math.max(1, preference.depth?.max ?? aquatic.depth)) : 0;
      factors.oxygen = aquatic
        ? rangeScore(aquatic.dissolvedOxygen, preference.dissolvedOxygen, tolerance)
        : 0;
    }

    if (context.hazard) {
      const tolerant = definition.geneticTraits.includes('hazard-tolerant')
        || definition.trophicLevel === 'decomposer'
        || definition.trophicLevel === 'microorganism';
      factors.hazard = tolerant ? 0.75 : 0.25;
    }

    let limitingFactor: string | null = null;
    let lowest = Infinity;
    for (const [key, value] of Object.entries(factors)) {
      if (value < lowest) {
        lowest = value;
        limitingFactor = key;
      }
    }

    const weights: Record<string, number> = {
      biome: 1.4,
      temperature: 1.2,
      humidity: 1,
      water: 1.2,
      vegetation: definition.speciesType === 'flora' ? 1.3 : 0.9,
      fertility: definition.speciesType === 'flora' || definition.speciesType === 'decomposer' ? 1.1 : 0.6,
      stability: 0.7,
      aquatic: 1.5,
      oxygen: 1.3,
      hazard: 1.2,
    };
    let total = 0;
    let weight = 0;
    for (const [key, value] of Object.entries(factors)) {
      const currentWeight = weights[key] ?? 1;
      total += value * currentWeight;
      weight += currentWeight;
    }

    return {
      suitability: clamp01(total / Math.max(1e-6, weight)),
      factors,
      limitingFactor,
    };
  }

  scorePlanet(planetId: string, context: HabitatContext): Record<string, HabitatScore> {
    const result: Record<string, HabitatScore> = {};
    for (const definition of this.registry.byPlanet(planetId)) {
      const score = this.score(definition.id, context);
      if (score) result[definition.id] = score;
    }
    return result;
  }
}

export const habitatManager = new HabitatManager();
