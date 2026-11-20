export type EnvKey =
  | 'temperature'
  | 'water'
  | 'humidity'
  | 'oxygen'
  | 'fertility'
  | 'biodiversity'
  | 'energy'
  | 'stability';

export type Environment = Record<EnvKey, number>;

export type WeatherType = 'sunny' | 'rain' | 'snow' | 'storm';

export type ObjectType =
  | 'grass'
  | 'sand'
  | 'rock'
  | 'hill'
  | 'mountain'
  | 'ocean'
  | 'lake'
  | 'tree'
  | 'bush'
  | 'flower'
  | 'deer'
  | 'fox'
  | 'bird';

export type EcoKey = 'vegetation' | 'wildlife' | 'population' | 'health';

export type Biome = 'barren' | 'dry' | 'temperate' | 'lush' | 'frozen';

export type SpeciesId = 'deer' | 'fox' | 'bird' | 'fish' | 'insect';

export interface TerrainConfig {
  amplitude: number;
  frequency: number;
  ridge: number;
  seaLevel: number;
}

export const DEFAULT_TERRAIN_CONFIG: TerrainConfig = {
  amplitude: 0.045,
  frequency: 1,
  ridge: 0.55,
  seaLevel: 1,
};

export interface PlacedObject {
  id: string;
  type: ObjectType;
  dir: [number, number, number];
  scale: number;
  rotation: number;
}

export interface AtmosphereState {
  cloudCoverage: number;
  windStrength: number;
  precipitation: number;
}

export interface EcosystemState {
  vegetation: number;
  wildlife: number;
  population: number;
  health: number;
}

export interface WeatherState {
  type: WeatherType;
  intensity: number;
  remainingTicks: number;
}

export interface ProgressionState {
  level: number;
  xp: number;
  unlockedObjects: ObjectType[];
}

export interface MissionState {
  id: string;
  status: 'active' | 'complete';
  holdTicks: number;
}

export interface EventProgress {
  status: 'active' | 'complete';
  progress: number;
}

export interface WildlifeAgent {
  id: string;
  species: SpeciesId;
  dir: [number, number, number];
  energy: number;
  age: number;
  cooldown: number;
  generation: number;
}

export interface FaunaState {
  agents: WildlifeAgent[];
  discovered: SpeciesId[];
  extinct: SpeciesId[];
  zeroTicks: Record<SpeciesId, number>;
  nextId: number;
}

export type PlanetEvent =
  | {
      id: string;
      tick: number;
      index: number;
      type: 'planet.created';
      payload: { seed: number; name: string };
      actor?: string;
    }
  | {
      id: string;
      tick: number;
      index: number;
      type: 'object.placed';
      payload: { objectType: ObjectType; dir: [number, number, number] };
      actor?: string;
    }
  | {
      id: string;
      tick: number;
      index: number;
      type: 'clock.tick';
      payload: { count: number };
      actor?: string;
    };

export interface PlanetState {
  schemaVersion: number;
  revision: number;
  id: string;
  seed: number;
  name: string;
  tick: number;
  objects: PlacedObject[];
  environment: Environment;
  startingEnvironment: Environment;
  terrainConfig: TerrainConfig;
  biome: Biome;
  fauna: FaunaState;
  eventLog: PlanetEvent[];
  ecosystem: EcosystemState;
  atmosphere: AtmosphereState;
  weather: WeatherState;
  progression: ProgressionState;
  mission: MissionState;
  events: Record<string, EventProgress>;
  warning: string | null;
  stage: number;
  updatedAt: number;
}
