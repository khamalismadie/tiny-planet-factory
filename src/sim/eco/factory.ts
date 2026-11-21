import type {
  BiomeTag,
  EcoSpeciesId,
  FoodInteraction,
  FoodRequirement,
  FoodWebLink,
  HabitatPreference,
  Range,
  SpeciesDefinition,
  SpeciesType,
  TrophicLevel,
} from './types';

export function range(center: number, spread = 10): Range {
  return { min: center - spread, max: center + spread };
}

export function habitat(
  biomes: BiomeTag[],
  options: Partial<Omit<HabitatPreference, 'biomes'>> = {},
): HabitatPreference {
  return {
    biomes,
    temperature: options.temperature ?? range(18, 12),
    humidity: options.humidity ?? range(55, 20),
    water: options.water ?? range(50, 25),
    vegetation: options.vegetation ?? range(40, 30),
    fertility: options.fertility,
    aquatic: options.aquatic,
    depth: options.depth,
    dissolvedOxygen: options.dissolvedOxygen,
  };
}

export function food(
  resource: FoodRequirement['resource'],
  amount = 1,
  interactions: FoodInteraction[] = [],
): FoodRequirement {
  return { resource, amount, interactions };
}

function speciesTypeFor(trophicLevel: TrophicLevel): SpeciesType {
  if (trophicLevel === 'producer') return 'flora';
  if (trophicLevel === 'decomposer' || trophicLevel === 'microorganism') return 'decomposer';
  return 'fauna';
}

function defaultFood(trophicLevel: TrophicLevel): FoodRequirement[] {
  if (trophicLevel === 'producer') return [food('sunlight', 1)];
  if (trophicLevel === 'decomposer' || trophicLevel === 'microorganism') {
    return [food('detritus', 1, ['decomposition'])];
  }
  if (trophicLevel === 'pollinator') return [food('nectar', 1, ['pollination'])];
  return [food('prey', 1, ['hunting'])];
}

function defaultCapacity(trophicLevel: TrophicLevel): number {
  switch (trophicLevel) {
    case 'producer': return 140;
    case 'primary-consumer': return 60;
    case 'secondary-consumer': return 36;
    case 'tertiary-consumer': return 22;
    case 'apex-predator': return 12;
    case 'pollinator': return 48;
    case 'decomposer':
    case 'microorganism': return 80;
    default: return 40;
  }
}

function defaultReproduction(trophicLevel: TrophicLevel): number {
  switch (trophicLevel) {
    case 'producer': return 0.08;
    case 'primary-consumer': return 0.05;
    case 'secondary-consumer': return 0.035;
    case 'apex-predator': return 0.03;
    case 'pollinator': return 0.045;
    case 'decomposer':
    case 'microorganism': return 0.07;
    default: return 0.03;
  }
}

function midpoint(value: Range | undefined, fallback: number): number {
  if (!value) return fallback;
  return (value.min + value.max) / 2;
}

export interface SpeciesOptions extends Partial<Omit<SpeciesDefinition, 'id' | 'name' | 'planetId' | 'trophicLevel'>> {}

export function species(
  planetId: string,
  id: EcoSpeciesId,
  name: string,
  trophicLevel: TrophicLevel,
  biomes: BiomeTag[],
  diet: Array<EcoSpeciesId | FoodRequirement> = [],
  options: SpeciesOptions = {},
): SpeciesDefinition {
  const preferences = options.habitatPreferences?.length
    ? options.habitatPreferences
    : [habitat(biomes)];
  const first = preferences[0];
  const foodRequirements: FoodRequirement[] = diet.length
    ? diet.map((entry) => typeof entry === 'string' ? food(entry, 1, ['grazing']) : entry)
    : defaultFood(trophicLevel);

  return {
    id,
    name,
    planetId,
    speciesType: speciesTypeFor(trophicLevel),
    trophicLevel,
    habitatPreferences: preferences,
    preferredTemperature: options.preferredTemperature ?? midpoint(first.temperature, 18),
    preferredHumidity: options.preferredHumidity ?? midpoint(first.humidity, 55),
    waterRequirement: options.waterRequirement ?? midpoint(first.water, 50),
    foodRequirements,
    predatorSpecies: options.predatorSpecies ?? [],
    preySpecies: options.preySpecies ?? [],
    reproductionRate: options.reproductionRate ?? defaultReproduction(trophicLevel),
    lifespan: options.lifespan ?? (speciesTypeFor(trophicLevel) === 'flora' ? 320 : 220),
    mortalityRate: options.mortalityRate ?? 0.02,
    migrationBehavior: options.migrationBehavior ?? (speciesTypeFor(trophicLevel) === 'fauna' ? 'seasonal' : 'none'),
    activitySchedule: options.activitySchedule ?? 'diurnal',
    populationCapacity: options.populationCapacity ?? defaultCapacity(trophicLevel),
    environmentalTolerance: options.environmentalTolerance ?? 18,
    rarity: options.rarity ?? 'common',
    geneticTraits: options.geneticTraits ?? [],
    visualAsset: options.visualAsset ?? id,
    animationProfile: options.animationProfile ?? speciesTypeFor(trophicLevel),
  };
}

export function link(
  source: EcoSpeciesId,
  target: EcoSpeciesId,
  interaction: FoodInteraction,
  strength = 1,
  description?: string,
): FoodWebLink {
  return { id: `${source}:${target}:${interaction}`, source, target, interaction, strength, description };
}
