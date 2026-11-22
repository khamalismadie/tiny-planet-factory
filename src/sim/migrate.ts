import { ensureEventState } from '../content/missions';
import { OBJECT_ORDER } from '../content/objects';
import { SPECIES_ORDER } from '../content/species';
import { BIOMES, inferBiome } from './biome';
import { campaignMissionForLevel } from './campaignRules';
import { isSupportedPlanet } from './eco/guilds';
import { initializeEcosystem } from './eco/manager';
import { CURRENT_ECOSYSTEM_VERSION, normalizeEcoState } from './eco/state';
import { createPlanet, planetNameFromSeed } from './engine';
import { preserveLegacyProgression } from './progression';
import type {
  Biome,
  Environment,
  EnvKey,
  EventProgress,
  FaunaState,
  ObjectType,
  PlanetEvent,
  PlanetState,
  PlacedObject,
  SpeciesId,
  TerrainConfig,
  WildlifeAgent,
  WeatherType,
} from './types';
import { DEFAULT_TERRAIN_CONFIG } from './types';

export const CURRENT_SCHEMA_VERSION = 3;

const ENV_KEYS: EnvKey[] = [
  'temperature', 'water', 'humidity', 'oxygen',
  'fertility', 'biodiversity', 'energy', 'stability',
];
const WEATHER_TYPES: WeatherType[] = ['sunny', 'rain', 'snow', 'storm'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function num(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

function mergeEnvironment(value: unknown, fallback: Environment): Environment {
  const raw = isRecord(value) ? value : {};
  return Object.fromEntries(ENV_KEYS.map((key) => [key, num(raw[key], fallback[key])])) as Environment;
}

function mergeTerrain(value: unknown): TerrainConfig {
  const raw = isRecord(value) ? value : {};
  return {
    amplitude: num(raw.amplitude, DEFAULT_TERRAIN_CONFIG.amplitude),
    frequency: num(raw.frequency, DEFAULT_TERRAIN_CONFIG.frequency),
    ridge: num(raw.ridge, DEFAULT_TERRAIN_CONFIG.ridge),
    seaLevel: num(raw.seaLevel, DEFAULT_TERRAIN_CONFIG.seaLevel),
  };
}

function normalizeObject(value: unknown, index: number, seed: number): PlacedObject | null {
  if (!isRecord(value)) return null;
  if (!OBJECT_ORDER.includes(value.type as ObjectType)) return null;
  const rawDir = Array.isArray(value.dir) ? value.dir : [];
  const dir = rawDir.slice(0, 3).map((component) => num(component, 0)) as [number, number, number];
  while (dir.length < 3) dir.push(0);
  const length = Math.hypot(...dir) || 1;
  return {
    id: str(value.id, `obj-migrated-${seed}-${index}`),
    type: value.type as ObjectType,
    dir: [dir[0] / length, dir[1] / length, dir[2] / length],
    scale: num(value.scale, 1),
    rotation: num(value.rotation, 0),
  };
}

function normalizeEvent(value: unknown): PlanetEvent | null {
  if (!isRecord(value)) return null;
  const type = value.type;
  if (type !== 'planet.created' && type !== 'object.placed' && type !== 'clock.tick') return null;
  if (!isRecord(value.payload)) return null;
  const payload = value.payload;
  if (type === 'object.placed' && !OBJECT_ORDER.includes(payload.objectType as ObjectType)) return null;
  return JSON.parse(JSON.stringify({
    id: str(value.id, `evt-migrated-${num(value.tick, 0)}-${num(value.index, 0)}`),
    tick: num(value.tick, 0),
    index: num(value.index, 0),
    type,
    payload,
    actor: str(value.actor, 'local'),
  })) as PlanetEvent;
}

function normalizeSpeciesList(value: unknown): SpeciesId[] {
  if (!Array.isArray(value)) return [];
  return value.filter((species): species is SpeciesId => SPECIES_ORDER.includes(species as SpeciesId));
}

function normalizeAgent(value: unknown, index: number): WildlifeAgent | null {
  if (!isRecord(value) || !SPECIES_ORDER.includes(value.species as SpeciesId)) return null;
  const rawDir = Array.isArray(value.dir) ? value.dir : [];
  const dir = rawDir.slice(0, 3).map((component) => num(component, 0)) as [number, number, number];
  while (dir.length < 3) dir.push(0);
  const length = Math.hypot(...dir) || 1;
  return {
    id: str(value.id, `fauna-migrated-${index}`),
    species: value.species as SpeciesId,
    dir: [dir[0] / length, dir[1] / length, dir[2] / length],
    energy: Math.max(0, Math.min(100, num(value.energy, 50))),
    age: Math.max(0, num(value.age, 0)),
    cooldown: Math.max(0, num(value.cooldown, 0)),
    generation: Math.max(0, num(value.generation, 0)),
  };
}

function normalizeFauna(value: unknown): FaunaState {
  const raw = isRecord(value) ? value : {};
  const agents = Array.isArray(raw.agents)
    ? raw.agents.map(normalizeAgent).filter((agent): agent is WildlifeAgent => agent !== null)
    : [];
  const zeroRaw = isRecord(raw.zeroTicks) ? raw.zeroTicks : {};
  const zeroTicks = Object.fromEntries(
    SPECIES_ORDER.map((species) => [species, Math.max(0, num(zeroRaw[species], 0))]),
  ) as Record<SpeciesId, number>;
  return {
    agents,
    discovered: normalizeSpeciesList(raw.discovered),
    extinct: normalizeSpeciesList(raw.extinct),
    zeroTicks,
    nextId: Math.max(0, Math.floor(num(raw.nextId, agents.length))),
  };
}

export function migratePlanet(raw: unknown, fallbackPlanetId = 'terra'): PlanetState | null {
  if (!isRecord(raw)) return null;
  const seed = num(raw.seed, 1) >>> 0;
  const name = str(raw.name, planetNameFromSeed(seed));
  const rawPlanetId = str(raw.planetId, fallbackPlanetId);
  const planetId = isSupportedPlanet(rawPlanetId) ? rawPlanetId : 'terra';
  const base = createPlanet(seed, name, planetId);
  const eco = normalizeEcoState(raw.eco, planetId);
  const rawEnvironment = mergeEnvironment(raw.environment, base.environment);
  const rawEcosystem = isRecord(raw.ecosystem) ? raw.ecosystem : {};
  const rawAtmosphere = isRecord(raw.atmosphere) ? raw.atmosphere : {};
  const rawWeather = isRecord(raw.weather) ? raw.weather : {};
  const rawProgression = isRecord(raw.progression) ? raw.progression : {};
  const progression = preserveLegacyProgression(
    num(rawProgression.level, base.progression.level),
    num(rawProgression.xp, base.progression.xp),
  );
  const rawMission = isRecord(raw.mission) ? raw.mission : {};
  const rawMissionId = str(rawMission.id, campaignMissionForLevel(progression.level).id);
  const missionId = rawMissionId.startsWith('era') ? rawMissionId : campaignMissionForLevel(progression.level).id;
  const terrainConfig = mergeTerrain(raw.terrainConfig);
  const weatherType = WEATHER_TYPES.includes(rawWeather.type as WeatherType)
    ? (rawWeather.type as WeatherType)
    : 'sunny';
  const biome = BIOMES.includes(raw.biome as Biome)
    ? (raw.biome as Biome)
    : inferBiome(rawEnvironment, {
        vegetation: num(rawEcosystem.vegetation, base.ecosystem.vegetation),
        wildlife: num(rawEcosystem.wildlife, base.ecosystem.wildlife),
        population: num(rawEcosystem.population, base.ecosystem.population),
        health: num(rawEcosystem.health, base.ecosystem.health),
      });
  const objects = Array.isArray(raw.objects)
    ? raw.objects
        .map((object, index) => normalizeObject(object, index, seed))
        .filter((object): object is PlacedObject => object !== null)
    : [];
  const eventLog = Array.isArray(raw.eventLog)
    ? raw.eventLog.map(normalizeEvent).filter((event): event is PlanetEvent => event !== null)
    : base.eventLog;

  const migratedState: PlanetState = {
    ...base,
    id: str(raw.id, base.id),
    planetId,
    ecosystemVersion: Math.max(1, Math.floor(num(raw.ecosystemVersion, CURRENT_ECOSYSTEM_VERSION))),
    eco,
    seed,
    name,
    tick: Math.max(0, Math.floor(num(raw.tick, 0))),
    objects,
    environment: rawEnvironment,
    startingEnvironment: mergeEnvironment(raw.startingEnvironment, base.startingEnvironment),
    terrainConfig,
    biome,
    fauna: normalizeFauna(raw.fauna),
    eventLog,
    ecosystem: {
      vegetation: num(rawEcosystem.vegetation, base.ecosystem.vegetation),
      wildlife: num(rawEcosystem.wildlife, base.ecosystem.wildlife),
      population: num(rawEcosystem.population, base.ecosystem.population),
      health: num(rawEcosystem.health, base.ecosystem.health),
    },
    atmosphere: {
      cloudCoverage: num(rawAtmosphere.cloudCoverage, base.atmosphere.cloudCoverage),
      windStrength: num(rawAtmosphere.windStrength, base.atmosphere.windStrength),
      precipitation: num(rawAtmosphere.precipitation, base.atmosphere.precipitation),
    },
    weather: {
      type: weatherType,
      intensity: num(rawWeather.intensity, base.weather.intensity),
      remainingTicks: num(rawWeather.remainingTicks, base.weather.remainingTicks),
    },
    progression: {
      level: progression.level,
      xp: progression.xp,
      unlockedObjects: Array.isArray(rawProgression.unlockedObjects)
        ? rawProgression.unlockedObjects.filter((type): type is ObjectType => OBJECT_ORDER.includes(type as ObjectType))
        : base.progression.unlockedObjects,
    },
    mission: {
      id: missionId,
      status: rawMission.status === 'complete' ? 'complete' : 'active',
      holdTicks: num(rawMission.holdTicks, base.mission.holdTicks),
    },
    events: ensureEventState(
      isRecord(raw.events) ? (raw.events as unknown as Record<string, EventProgress>) : undefined,
    ),
    warning: typeof raw.warning === 'string' ? raw.warning : null,
    stage: Math.max(1, Math.floor(num(raw.stage, base.stage))),
    updatedAt: num(raw.updatedAt, base.updatedAt),
    revision: Math.max(0, Math.floor(num(raw.revision, 0))),
    schemaVersion: CURRENT_SCHEMA_VERSION,
  };
  initializeEcosystem(migratedState);
  return migratedState;
}
