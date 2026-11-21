export type EcoSpeciesId = string;

export type TrophicLevel =
  | 'producer'
  | 'primary-consumer'
  | 'secondary-consumer'
  | 'tertiary-consumer'
  | 'apex-predator'
  | 'omnivore'
  | 'pollinator'
  | 'decomposer'
  | 'microorganism';

export type SpeciesType = 'flora' | 'fauna' | 'decomposer';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type ActivitySchedule = 'diurnal' | 'nocturnal' | 'crepuscular' | 'cathemeral';
export type MigrationBehavior = 'none' | 'seasonal' | 'nomadic' | 'vertical';
export type BiomeTag = string;

export type FoodInteraction =
  | 'grazing'
  | 'hunting'
  | 'scavenging'
  | 'pollination'
  | 'seed-dispersal'
  | 'decomposition'
  | 'competition'
  | 'symbiosis'
  | 'parasitism';

export interface Range {
  min: number;
  max: number;
}

export type EnvironmentValues = Record<
  'temperature' | 'water' | 'humidity' | 'oxygen' | 'fertility' | 'biodiversity' | 'energy' | 'stability',
  number
>;

export type EcosystemValues = Record<'vegetation' | 'wildlife' | 'population' | 'health', number>;

export type TerrainValues = { amplitude: number; frequency: number; ridge: number; seaLevel: number };

export interface HabitatPreference {
  biomes: BiomeTag[];
  temperature: Range;
  humidity: Range;
  water: Range;
  vegetation: Range;
  fertility?: Range;
  aquatic?: boolean;
  depth?: Range;
  dissolvedOxygen?: Range;
}

export interface FoodRequirement {
  resource: EcoSpeciesId | 'sunlight' | 'water' | 'detritus' | 'nutrients' | 'plankton';
  amount: number;
  interactions: FoodInteraction[];
}

export interface SpeciesDefinition {
  id: EcoSpeciesId;
  name: string;
  planetId: string;
  speciesType: SpeciesType;
  trophicLevel: TrophicLevel;
  habitatPreferences: HabitatPreference[];
  preferredTemperature: number;
  preferredHumidity: number;
  waterRequirement: number;
  foodRequirements: FoodRequirement[];
  predatorSpecies: EcoSpeciesId[];
  preySpecies: EcoSpeciesId[];
  reproductionRate: number;
  lifespan: number;
  mortalityRate: number;
  migrationBehavior: MigrationBehavior;
  activitySchedule: ActivitySchedule;
  populationCapacity: number;
  environmentalTolerance: number;
  rarity: Rarity;
  geneticTraits: string[];
  visualAsset: string;
  animationProfile: string;
}

export interface FoodWebLink {
  id: string;
  source: EcoSpeciesId;
  target: EcoSpeciesId;
  interaction: FoodInteraction;
  strength: number;
  description?: string;
}

export interface SeasonConfig {
  id: string;
  name: string;
  durationTicks: number;
  temperatureModifier: number;
  humidityModifier: number;
  waterModifier: number;
  vegetationModifier: number;
  migrationModifier: number;
}

export interface ClimateProfile {
  baseTemperature: number;
  baseHumidity: number;
  baseWater: number;
  variability: number;
  seasons: SeasonConfig[];
  hazards: string[];
}

export interface AquaticProfile {
  depth: number;
  dissolvedOxygen: number;
  waterQuality: number;
  current: number;
  reefCoverage: number;
}

export interface PlanetPalette {
  background: number;
  primary: number;
  secondary: number;
  accent: number;
  water: number;
}

export interface PlanetConfig {
  id: string;
  name: string;
  subtitle: string;
  biomeTags: BiomeTag[];
  climate: ClimateProfile;
  terrain: TerrainValues;
  startingEnvironment: EnvironmentValues;
  flora: EcoSpeciesId[];
  fauna: EcoSpeciesId[];
  decomposers: EcoSpeciesId[];
  species: SpeciesDefinition[];
  foodWeb: FoodWebLink[];
  specialSystems: string[];
  palette: PlanetPalette;
  aquatic?: AquaticProfile;
}

export interface PopulationRecord {
  estimate: number;
  trend: number;
  births: number;
  deaths: number;
  capacity: number;
}

export interface EcoEventRecord {
  id: string;
  tick: number;
  type: string;
  severity: number;
  affectedBiomes: BiomeTag[];
  affectedSpecies: EcoSpeciesId[];
  description: string;
}

export interface EcoMetrics {
  speciesCount: number;
  totalPopulation: number;
  biodiversityIndex: number;
  habitatHealth: number;
  vegetationCoverage: number;
  waterAvailability: number;
  soilFertility: number;
  foodAvailability: number;
  predatorPreyBalance: number;
  stability: number;
}

export interface CryosphereState {
  seasonId: string;
  seasonName: string;
  phase: number;
  freeze: number;
  iceCoverage: number;
  snowCover: number;
  thawStress: number;
}

export interface VolcanoState {
  seasonId: string;
  seasonName: string;
  phase: number;
  heat: number;
  lavaFlow: number;
  ash: number;
  eruptionStress: number;
}

export interface OceanState {
  seasonId: string;
  seasonName: string;
  phase: number;
  current: number;
  reefHealth: number;
  plankton: number;
  bleaching: number;
  dissolvedOxygen: number;
}

export interface FungalState {
  seasonId: string;
  seasonName: string;
  phase: number;
  network: number;
  spores: number;
  glow: number;
  nutrients: number;
  networkStress: number;
}

export interface SkyState {
  seasonId: string;
  seasonName: string;
  phase: number;
  connectivity: number;
  wind: number;
  blossom: number;
  uplift: number;
  isolationStress: number;
}

export interface ForestState {
  seasonId: string;
  seasonName: string;
  phase: number;
  leafLitter: number;
  storage: number;
  hibernation: number;
  frostStress: number;
}

export interface EcoStateV3 {
  planetId: string;
  ecosystemVersion: number;
  populations: Record<EcoSpeciesId, PopulationRecord>;
  detritus: number;
  traits: Record<EcoSpeciesId, string[]>;
  discovered: EcoSpeciesId[];
  eventHistory: EcoEventRecord[];
  metrics: EcoMetrics;
  cryo: CryosphereState;
  volcano: VolcanoState;
  ocean: OceanState;
  fungal: FungalState;
  sky: SkyState;
  forest: ForestState;
}

export interface HabitatContext {
  environment: EnvironmentValues;
  ecosystem: EcosystemValues;
  biomeTags: BiomeTag[];
  aquatic?: AquaticProfile;
  hazard?: string | null;
}

export interface HabitatScore {
  suitability: number;
  factors: Record<string, number>;
  limitingFactor: string | null;
}
