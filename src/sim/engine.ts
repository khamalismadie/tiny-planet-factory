import { EVENT_DEFS, createEventState } from '../content/missions';
import { OBJECT_DEFS, OBJECT_ORDER, UNLOCK_LEVEL } from '../content/objects';
import { WEATHER_DEFS } from '../content/weather';
import { inferBiome } from './biome';
import { appendEvent, makePlanetEvent, nextEventIndex } from './events';
import { initializeEcosystem, stepEcosystem } from './eco/manager';
import { ecosystemConfigFor, ecosystemConfigOf, isSupportedPlanet } from './eco/guilds';
import { CURRENT_ECOSYSTEM_VERSION, createEcoState } from './eco/state';
import type { PlanetConfig, SeasonConfig } from './eco/types';
import { hashString, mulberry32 } from './rng';
import { createFauna, simulateWildlife } from './wildlife';
import type {
  EnvKey,
  Environment,
  ObjectType,
  PlanetState,
  PlacedObject,
  WeatherType,
} from './types';
import { DEFAULT_TERRAIN_CONFIG } from './types';

export const TICK_MS = 2000;

const IDEAL: Record<EnvKey, [number, number]> = {
  temperature: [12, 30],
  water: [40, 78],
  humidity: [38, 72],
  oxygen: [45, 85],
  fertility: [38, 82],
  biodiversity: [30, 90],
  energy: [35, 80],
  stability: [60, 100],
};

const IDEAL_TOLERANCE: Record<EnvKey, number> = {
  temperature: 10,
  water: 18,
  humidity: 18,
  oxygen: 20,
  fertility: 20,
  biodiversity: 20,
  energy: 20,
  stability: 20,
};

const LEVEL_XP = [0, 0, 40, 100, 160, 260];

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function approach(value: number, target: number, rate: number): number {
  return clamp(value + (target - value) * rate);
}

function idealFor(planet: PlanetState, key: EnvKey): [number, number] {
  const base = ecosystemConfigOf(planet)?.startingEnvironment[key];
  if (base === undefined || planet.planetId === 'terra') return IDEAL[key];
  const spread = IDEAL_TOLERANCE[key];
  return [clamp(base - spread, 0, 100), clamp(base + spread, 0, 100)];
}

function inIdeal(planet: PlanetState, key: EnvKey): boolean {
  const [min, max] = idealFor(planet, key);
  const value = planet.environment[key];
  return value >= min && value <= max;
}

function activeSeason(
  planet: PlanetState,
  config: PlanetConfig | null,
): { season: SeasonConfig; phase: number } | null {
  const seasons = config?.climate.seasons ?? [];
  if (!seasons.length) return null;
  const total = seasons.reduce((sum, entry) => sum + entry.durationTicks, 0);
  let cursor = planet.tick % total;
  for (const season of seasons) {
    if (cursor < season.durationTicks) return { season, phase: cursor / season.durationTicks };
    cursor -= season.durationTicks;
  }
  return null;
}

export function createPlanet(seed: number, name = 'Planet Baru', planetId = 'terra'): PlanetState {
  const level = 1;
  const resolvedPlanetId = isSupportedPlanet(planetId) ? planetId : 'terra';
  const config = ecosystemConfigFor(resolvedPlanetId);
  const useLegacyStart = resolvedPlanetId === 'terra' || !config;
  const environment: Environment = useLegacyStart
    ? {
        temperature: 18,
        water: 22,
        humidity: 25,
        oxygen: 10,
        fertility: 20,
        biodiversity: 5,
        energy: 50,
        stability: 38,
      }
    : { ...config.startingEnvironment };
  const displayName = useLegacyStart || !config ? name : `${config.name} · ${name}`;
  const state: PlanetState = {
    schemaVersion: 3,
    revision: 0,
    id: `planet-${seed}-${Date.now().toString(36)}`,
    planetId: resolvedPlanetId,
    ecosystemVersion: CURRENT_ECOSYSTEM_VERSION,
    eco: createEcoState(resolvedPlanetId),
    seed,
    name: displayName,
    tick: 0,
    objects: [],
    environment: { ...environment },
    startingEnvironment: { ...environment },
    terrainConfig: useLegacyStart || !config ? { ...DEFAULT_TERRAIN_CONFIG } : { ...config.terrain },
    biome: 'barren',
    fauna: createFauna(),
    eventLog: [],
    ecosystem: { vegetation: 2, wildlife: 0, population: 0, health: 40 },
    atmosphere: { cloudCoverage: 15, windStrength: 20, precipitation: 10 },
    weather: { type: 'sunny', intensity: 0.6, remainingTicks: 14 },
    progression: { level, xp: 0, unlockedObjects: unlockedForLevel(level) },
    mission: { id: 'mission-hijaukan', status: 'active', holdTicks: 0 },
    events: createEventState(),
    warning: null,
    stage: 1,
    updatedAt: Date.now(),
  };
  initializeEcosystem(state);
  appendEvent(state, makePlanetEvent('planet.created', 0, 0, { seed, name }));
  return state;
}

export function unlockedForLevel(level: number): ObjectType[] {
  return OBJECT_ORDER.filter((type) => UNLOCK_LEVEL[type] <= level);
}

function refreshProgression(planet: PlanetState): string[] {
  const events: string[] = [];
  let level = 1;
  for (let candidate = 6; candidate >= 1; candidate--) {
    if (planet.progression.xp >= LEVEL_XP[candidate]) {
      level = candidate;
      break;
    }
  }
  if (level > planet.progression.level) {
    events.push(`Level ${level} tercapai! Objek baru terbuka.`);
    planet.progression.level = level;
    planet.progression.unlockedObjects = unlockedForLevel(level);
  }
  return events;
}

export function placeObject(
  planet: PlanetState,
  type: ObjectType,
  dir: [number, number, number],
  record = true,
): PlacedObject | null {
  if (!planet.progression.unlockedObjects.includes(type)) return null;
  const length = Math.hypot(...dir) || 1;
  const normalized: [number, number, number] =
    Math.abs(length - 1) < 1e-12 ? [dir[0], dir[1], dir[2]] : [dir[0] / length, dir[1] / length, dir[2] / length];
  const random = mulberry32(hashString(`${planet.seed}:${planet.tick}:${planet.objects.length}:${type}`));
  const object: PlacedObject = {
    id: `obj-${Math.floor(random() * 0xffffffff).toString(36)}`,
    type,
    dir: normalized,
    scale: 0.85 + random() * 0.3,
    rotation: random() * Math.PI * 2,
  };
  planet.objects.push(object);
  planet.updatedAt = Date.now();
  if (record) {
    appendEvent(
      planet,
      makePlanetEvent('object.placed', planet.tick, nextEventIndex(planet), {
        objectType: type,
        dir: [...object.dir] as [number, number, number],
      }),
    );
  }
  return object;
}

export function computeStage(planet: PlanetState): number {
  const { environment: e, ecosystem: eco, objects } = planet;
  if (objects.length === 0) return 1;
  const terrainAndWater = objects.filter((o) => ['grass', 'sand', 'rock', 'hill', 'mountain', 'ocean', 'lake'].includes(o.type)).length;
  if (terrainAndWater < 3) return 2;
  if (eco.vegetation >= 25 && e.oxygen >= 25) return 3;
  if (e.oxygen >= 45 && e.biodiversity >= 30 && e.water >= 35) return 4;
  if (e.stability >= 68 && e.biodiversity >= 45 && e.oxygen >= 55) return 5;
  if (
    e.stability >= 82 &&
    (Object.keys(IDEAL) as EnvKey[]).every((key) => inIdeal(planet, key))
  ) {
    return 6;
  }
  return 4;
}

export const STAGE_NAMES = ['', 'Tandus', 'Formasi', 'Vegetasi', 'Ekosistem', 'Peradaban', 'Surga'];

function chooseWeather(planet: PlanetState, random: () => number): WeatherStateLike {
  const { environment: e, weather } = planet;
  const weights: Array<[WeatherType, number]> = [
    ['sunny', 3 + Math.max(0, 20 - e.humidity) * 0.04],
    ['rain', 2 + e.humidity * 0.05 + e.water * 0.02],
    ['snow', e.temperature < 12 ? 4 : 0.5],
    ['storm', 0.6 + (100 - e.stability) * 0.03],
  ];
  if (weather.type === 'storm') weights[3][1] *= 0.4;
  const total = weights.reduce((sum, entry) => sum + entry[1], 0);
  let pick = random() * total;
  for (const [type, weight] of weights) {
    pick -= weight;
    if (pick <= 0) {
      const intensity = 0.5 + random() * 0.5;
      return { type, intensity, remainingTicks: 12 + Math.floor(random() * 8) };
    }
  }
  return { type: 'sunny', intensity: 0.6, remainingTicks: 14 };
}

type WeatherStateLike = PlanetState['weather'];

export interface TickEvents {
  events: string[];
  weatherChanged: boolean;
}

export function simulateTick(planet: PlanetState, record = true): TickEvents {
  const events: string[] = [];
  const e = planet.environment;
  const eco = planet.ecosystem;
  const atm = planet.atmosphere;
  const planetConfig = ecosystemConfigOf(planet);
  const legacyClimate = planet.planetId === 'terra' || !planetConfig;
  const seasonInfo = legacyClimate ? null : activeSeason(planet, planetConfig);
  const season = seasonInfo?.season ?? null;
  const cryo = planet.eco.cryo;
  const random = mulberry32((planet.seed ^ (planet.tick * 2654435761)) >>> 0);
  const counts = Object.fromEntries(OBJECT_ORDER.map((type) => [type, 0])) as Record<ObjectType, number>;
  for (const object of planet.objects) counts[object.type] += 1;
  const wildlife = simulateWildlife(planet, counts);
  events.push(...wildlife.messages);

  const weather = WEATHER_DEFS[planet.weather.type];
  const intensity = planet.weather.intensity;
  const sunlight = weather.sunlight * (0.9 + intensity * 0.2);

  // Object effects are simplified game rules, not a scientific climate model.
  for (const type of OBJECT_ORDER) {
    const def = OBJECT_DEFS[type];
    if (!counts[type]) continue;
    for (const [key, value] of Object.entries(def.effects) as Array<[EnvKey, number]>) {
      e[key] += value * def.strength * counts[type];
    }
    if (def.ecoEffects) {
      for (const [key, value] of Object.entries(def.ecoEffects) as Array<[keyof PlanetState['ecosystem'], number]>) {
        if (key === 'population' || key === 'health') continue;
        eco[key] = clamp(eco[key] + value * def.strength * counts[type]);
      }
    }
  }

  const tempShift = legacyClimate || !planetConfig ? 0 : planetConfig.climate.baseTemperature - 18;
  const targetTemp = 12 + sunlight * 7 + tempShift + (season?.temperatureModifier ?? 0)
    + counts.sand * 0.08 - counts.mountain * 0.12 - counts.ocean * 0.08;
  e.temperature = clamp(
    approach(e.temperature, targetTemp, 0.04) + weather.tempDelta * intensity,
    legacyClimate ? -10 : -20,
    50,
  );

  const evaporation = 0.1 + Math.max(0, e.temperature - 18) * 0.012 - atm.cloudCoverage * 0.001;
  const rainfall = weather.rain * intensity * 1.4 + atm.precipitation * 0.004;
  e.water = clamp(e.water + rainfall - evaporation);
  if (!legacyClimate && planetConfig) {
    e.water = approach(e.water, planetConfig.climate.baseWater + (season?.waterModifier ?? 0), 0.025);
  }

  const humidityBase = (legacyClimate || !planetConfig ? 18 : planetConfig.climate.baseHumidity)
    + (season?.humidityModifier ?? 0);
  const humidityTarget = humidityBase + e.water * 0.42 + counts.ocean * 1.2 + counts.lake * 0.7 + counts.tree * 0.4 - e.temperature * 0.25;
  e.humidity = approach(e.humidity, humidityTarget, 0.06);

  if (planetConfig?.specialSystems.includes('freeze-thaw')) {
    const previousFreeze = cryo.freeze;
    const freezeTarget = clamp(50 - e.temperature * 2.5 + (season?.temperatureModifier ?? 0) * -1.5);
    cryo.freeze = approach(previousFreeze, freezeTarget, 0.08);
    const waterObjects = counts.ocean + counts.lake;
    const iceTarget = clamp(cryo.freeze * 0.55 + waterObjects * 3 + (season?.id === 'freeze-up' ? 8 : 0));
    cryo.iceCoverage = approach(cryo.iceCoverage, iceTarget, 0.06);
    const snowTarget = clamp(cryo.freeze * 0.75 + e.humidity * 0.18 - 8);
    cryo.snowCover = approach(cryo.snowCover, snowTarget, 0.06);
    cryo.thawStress = approach(cryo.thawStress, clamp(Math.abs(cryo.freeze - previousFreeze) * 4), 0.3);
    cryo.seasonId = season?.id ?? 'none';
    cryo.seasonName = season?.name ?? '';
    cryo.phase = seasonInfo?.phase ?? 0;
  } else if (cryo.seasonId !== 'none' || cryo.freeze || cryo.iceCoverage || cryo.snowCover || cryo.thawStress) {
    cryo.seasonId = 'none';
    cryo.seasonName = '';
    cryo.phase = 0;
    cryo.freeze = 0;
    cryo.iceCoverage = 0;
    cryo.snowCover = 0;
    cryo.thawStress = 0;
  }

  const seasonalVegetation = clamp(1 + (season?.vegetationModifier ?? 0), 0.25, 1.6);
  const coldFactor = cryo.seasonId !== 'none'
    ? 1 - cryo.freeze / 100 * 0.3
    : e.temperature < 0 || e.temperature > 40 || e.water < 15 ? 0.5 : 1;
  const vegetationTarget = clamp(
    Math.min(100, counts.grass * 2 + counts.tree * 4 + counts.bush * 2 + e.water * 0.28 + e.fertility * 0.2) *
      seasonalVegetation * coldFactor,
  );
  eco.vegetation = approach(eco.vegetation, vegetationTarget, 0.035);

  const oxygenTarget = clamp(
    6 + eco.vegetation * 0.52 + counts.tree * 0.9 + counts.bush * 0.35 + counts.grass * 0.15 - eco.wildlife * 0.12,
  );
  e.oxygen = approach(e.oxygen, oxygenTarget, 0.05);

  const fertilityTarget = clamp(14 + e.water * 0.26 + eco.vegetation * 0.28 + counts.grass * 0.4 - counts.sand * 0.35);
  e.fertility = approach(e.fertility, fertilityTarget, 0.05);

  const distinct = new Set(planet.objects.map((o) => o.type)).size;
  const discoveredSpecies = planet.fauna?.discovered.length ?? 0;
  e.biodiversity = approach(
    e.biodiversity,
    clamp(distinct * 5 + discoveredSpecies * 1.5 + eco.vegetation * 0.22 + eco.wildlife * 0.2),
    0.06,
  );

  e.energy = approach(e.energy, clamp(sunlight * 55 + (planet.weather.type === 'storm' ? -12 : 0)), 0.08);

  const deviations = (Object.keys(IDEAL) as EnvKey[])
    .filter((key) => key !== 'stability')
    .map((key) => {
      const [min, max] = idealFor(planet, key);
      const value = e[key];
      return value < min ? (min - value) / Math.max(1, min) : value > max ? (value - max) / Math.max(1, 100 - max) : 0;
    });
  const avgDeviation = deviations.reduce((sum, value) => sum + value, 0) / deviations.length;
  const stabilityTarget = clamp(100 - avgDeviation * 150 + weather.stabilityDelta * 20 + counts.rock * 0.4);
  e.stability = approach(e.stability, stabilityTarget, 0.06);

  const placedWildlife = counts.deer * 2 + counts.fox + counts.bird * 1.5;
  eco.wildlife = approach(
    eco.wildlife,
    clamp((e.biodiversity - 20) * 0.8 + (e.oxygen - 30) * 0.4 + placedWildlife * 0.4 + wildlife.wildlife * 0.6),
    0.02,
  );
  eco.population = Math.round(eco.wildlife * 1.25 + placedWildlife * 0.5 + wildlife.population);
  eco.health = Math.round(e.stability * 0.6 + e.oxygen * 0.25 + eco.vegetation * 0.15);

  atm.cloudCoverage = approach(atm.cloudCoverage, clamp(12 + e.humidity * 0.55 + (weather.type === 'storm' ? 30 : 0)), 0.08);
  atm.windStrength = approach(atm.windStrength, clamp(15 + counts.mountain * 2 + counts.hill + (weather.type === 'storm' ? 35 : 0)), 0.08);
  atm.precipitation = approach(atm.precipitation, clamp(weather.rain * intensity * 100), 0.12);

  let weatherChanged = false;
  planet.weather.remainingTicks -= 1;
  if (planet.weather.remainingTicks <= 0) {
    planet.weather = chooseWeather(planet, random);
    weatherChanged = true;
    events.push(`Cuaca berubah menjadi ${WEATHER_DEFS[planet.weather.type].label}.`);
  }

  if (e.water < 25) {
    planet.warning = 'Kekeringan: persediaan air rendah!';
  } else if (e.stability < 35) {
    planet.warning = 'Ekosistem tidak stabil. Seimbangkan parameter!';
  } else {
    planet.warning = null;
  }

  events.push(...stepEcosystem(planet));

  const healthy = (Object.keys(IDEAL) as EnvKey[]).filter((key) => inIdeal(planet, key)).length;
  planet.progression.xp += healthy * 0.12 + (eco.vegetation > 20 ? 0.08 : 0);
  events.push(...refreshProgression(planet));

  const missionTarget = e.oxygen >= 45 && e.water >= 40 && e.stability >= 60;
  if (planet.mission.status === 'active') {
    planet.mission.holdTicks = missionTarget ? planet.mission.holdTicks + 1 : 0;
    if (planet.mission.holdTicks >= 3) {
      planet.mission.status = 'complete';
      planet.progression.xp += 25;
      events.push('Misi “Hijaukan Planet” selesai! +25 XP');
    }
  }

  if (!planet.events) planet.events = createEventState();
  for (const event of EVENT_DEFS) {
    const progress = planet.events[event.id];
    if (!progress || progress.status === 'complete') continue;
    const next = clamp(event.update(planet, progress.progress), 0, event.target);
    progress.progress = next;
    if (next >= event.target) {
      progress.status = 'complete';
      planet.progression.xp += event.rewardXp;
      events.push(`Event “${event.title}” selesai! +${event.rewardXp} XP`);
    }
  }
  events.push(...refreshProgression(planet));

  planet.stage = computeStage(planet);
  planet.biome = inferBiome(planet.environment, planet.ecosystem);
  planet.tick += 1;
  planet.updatedAt = Date.now();
  if (record) {
    appendEvent(planet, makePlanetEvent('clock.tick', planet.tick, nextEventIndex(planet), { count: 1 }));
  }
  return { events, weatherChanged };
}

export interface DnaPayload {
  seed: number;
  name: string;
  version: 1;
}

export function encodeDna(planet: PlanetState): string {
  const payload: DnaPayload = { seed: planet.seed, name: planet.name, version: 1 };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function decodeDna(code: string): PlanetState | null {
  try {
    const normalized = code.trim().replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(normalized)));
    const payload = JSON.parse(json) as DnaPayload;
    if (payload.version !== 1 || !Number.isFinite(payload.seed)) return null;
    return createPlanet(payload.seed >>> 0, payload.name || 'Planet DNA');
  } catch {
    return null;
  }
}

export function planetNameFromSeed(seed: number): string {
  return `Planet-${hashString(String(seed)).toString(36).slice(0, 6)}`;
}
