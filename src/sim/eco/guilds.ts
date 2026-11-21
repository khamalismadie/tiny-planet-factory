import { duneConfig } from '../../content/planets/dune';
import { glaciereConfig } from '../../content/planets/glaciera';
import { infernaConfig } from '../../content/planets/inferna';
import { terraConfig } from '../../content/planets/terra';
import type { FoodWebLink, PlanetConfig } from './types';
import type { ObjectType, PlanetState, SpeciesId } from '../types';

/**
 * Visual fauna are the legacy five species. Each planet maps its own population
 * list onto those guilds so the renderer stays unchanged while ecology expands.
 */
interface GuildProfile {
  config: PlanetConfig;
  guilds: Record<SpeciesId, readonly string[]>;
  divisors: Record<SpeciesId, number>;
  prey: Partial<Record<SpeciesId, SpeciesId[]>>;
  foodObjects: Record<string, ObjectType[]>;
}

const TERRA_PROFILE: GuildProfile = {
  config: terraConfig,
  guilds: {
    deer: ['terra_deer', 'terra_rabbit'],
    fox: ['terra_fox', 'terra_wolf'],
    bird: ['terra_eagle'],
    fish: ['terra_fish'],
    insect: ['terra_bee'],
  },
  divisors: { deer: 8, fox: 4, bird: 2, fish: 8, insect: 10 },
  prey: { fox: ['deer'], bird: ['fish', 'insect'] },
  foodObjects: {
    terra_oak: ['tree'],
    terra_pine: ['tree'],
    terra_wildflower: ['flower'],
    terra_river_reed: ['grass'],
    terra_deer: ['deer'],
    terra_rabbit: ['deer', 'grass', 'bush'],
    terra_fox: ['fox'],
    terra_wolf: ['fox'],
    terra_fish: ['ocean', 'lake'],
    terra_bee: ['flower'],
  },
};

const DUNE_PROFILE: GuildProfile = {
  config: duneConfig,
  guilds: {
    deer: ['dune_camel', 'dune_desert_hare', 'dune_gazelle'],
    fox: ['dune_fennec_fox', 'dune_snake'],
    bird: ['dune_vulture'],
    fish: [],
    insect: ['dune_lizard', 'dune_dung_beetle'],
  },
  divisors: { deer: 10, fox: 6, bird: 3, fish: 10, insect: 10 },
  prey: { fox: ['deer', 'insect'], bird: ['deer'] },
  foodObjects: {
    dune_cactus: ['sand', 'bush'],
    dune_desert_grass: ['grass', 'sand'],
    dune_acacia: ['tree', 'bush'],
    dune_date_palm: ['tree', 'ocean', 'lake'],
    dune_camel: ['deer', 'bush'],
    dune_desert_hare: ['deer', 'grass'],
    dune_gazelle: ['deer', 'tree'],
    dune_lizard: ['rock', 'sand'],
    dune_dung_beetle: ['rock', 'sand', 'bush'],
    dune_fennec_fox: ['fox', 'sand'],
    dune_snake: ['fox', 'rock'],
    dune_vulture: ['bird', 'rock', 'hill'],
  },
};

const GLACIERE_PROFILE: GuildProfile = {
  config: glaciereConfig,
  guilds: {
    deer: ['glaciere_reindeer', 'glaciere_arctic_hare', 'glaciere_musk_ox'],
    fox: ['glaciere_arctic_fox', 'glaciere_polar_bear'],
    bird: ['glaciere_snow_owl'],
    fish: ['glaciere_ice_fish', 'glaciere_seal'],
    insect: ['glaciere_cold_fungi'],
  },
  divisors: { deer: 10, fox: 6, bird: 3, fish: 8, insect: 10 },
  prey: { fox: ['deer', 'fish'], bird: ['deer'] },
  foodObjects: {
    glaciere_arctic_moss: ['rock', 'sand', 'bush'],
    glaciere_ice_grass: ['grass', 'ocean', 'lake'],
    glaciere_frozen_pine: ['tree', 'mountain'],
    glaciere_reindeer: ['deer', 'bush'],
    glaciere_arctic_hare: ['deer', 'grass'],
    glaciere_musk_ox: ['deer', 'rock'],
    glaciere_ice_fish: ['ocean', 'lake'],
    glaciere_arctic_fox: ['fox', 'rock'],
    glaciere_seal: ['ocean', 'lake'],
    glaciere_snow_owl: ['bird', 'mountain'],
    glaciere_polar_bear: ['fox', 'deer', 'lake'],
    glaciere_cold_fungi: ['rock', 'sand', 'bush'],
  },
};

const INFERNA_PROFILE: GuildProfile = {
  config: infernaConfig,
  guilds: {
    deer: ['inferna_ash_grazer', 'inferna_rock_tortoise'],
    fox: ['inferna_magma_lizard', 'inferna_ash_jackal', 'inferna_ash_wolf'],
    bird: ['inferna_fire_hawk'],
    fish: [],
    insect: ['inferna_ember_beetle', 'inferna_lava_crab', 'inferna_heat_fungi'],
  },
  divisors: { deer: 8, fox: 6, bird: 2, fish: 10, insect: 12 },
  prey: { fox: ['deer', 'insect'], bird: ['insect'] },
  foodObjects: {
    inferna_ember_moss: ['rock', 'sand', 'bush'],
    inferna_ash_fern: ['grass', 'bush'],
    inferna_lava_grass: ['grass', 'sand'],
    inferna_ash_grazer: ['deer', 'grass'],
    inferna_ember_beetle: ['flower', 'bush', 'grass'],
    inferna_rock_tortoise: ['deer', 'rock'],
    inferna_magma_lizard: ['fox', 'rock', 'sand'],
    inferna_lava_crab: ['rock', 'sand', 'bush'],
    inferna_ash_jackal: ['fox', 'deer'],
    inferna_ash_wolf: ['fox', 'deer'],
    inferna_fire_hawk: ['bird', 'mountain'],
    inferna_heat_fungi: ['rock', 'sand', 'bush'],
  },
};

export const GUILD_PROFILES: Record<string, GuildProfile> = {
  terra: TERRA_PROFILE,
  dune: DUNE_PROFILE,
  glaciere: GLACIERE_PROFILE,
  inferna: INFERNA_PROFILE,
};

const FOOD_INTERACTIONS = new Set(['grazing', 'hunting', 'scavenging', 'pollination']);

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function profileFor(planet: PlanetState): GuildProfile | null {
  return GUILD_PROFILES[planet.planetId] ?? null;
}

export function isSupportedPlanet(planetId: string | null | undefined): planetId is string {
  return typeof planetId === 'string' && Object.prototype.hasOwnProperty.call(GUILD_PROFILES, planetId);
}

export function supportedPlanetIds(): string[] {
  return Object.keys(GUILD_PROFILES);
}

export function ecosystemConfigFor(planetId: string): PlanetConfig | null {
  return isSupportedPlanet(planetId) ? GUILD_PROFILES[planetId].config : null;
}

export function ecosystemConfigOf(planet: PlanetState): PlanetConfig | null {
  return profileFor(planet)?.config ?? null;
}

export function foodWebLinks(planet: PlanetState): FoodWebLink[] {
  return ecosystemConfigOf(planet)?.foodWeb ?? [];
}

export function guildFoodSourceIds(planet: PlanetState, guild: SpeciesId): string[] {
  const profile = profileFor(planet);
  if (!profile) return [];
  const guildIds = profile.guilds[guild] ?? [];
  if (!guildIds.length) return [];
  const speciesIds = new Set(profile.config.species.map((entry) => entry.id));
  const fromWeb = profile.config.foodWeb
    .filter((link) => guildIds.includes(link.source) && FOOD_INTERACTIONS.has(link.interaction))
    .map((link) => link.target);
  const fromRequirements = profile.config.species
    .filter((entry) => guildIds.includes(entry.id))
    .flatMap((entry) => entry.foodRequirements.map((requirement) => requirement.resource))
    .filter((resource) => speciesIds.has(resource));
  return [...new Set([...fromWeb, ...fromRequirements])].filter((id) => !guildIds.includes(id));
}

function aggregate(planet: PlanetState, ids: readonly string[]): { estimate: number; capacity: number; trend: number } {
  let estimate = 0;
  let capacity = 0;
  let trend = 0;
  for (const id of ids) {
    const population = planet.eco.populations[id];
    if (!population) continue;
    estimate += population.estimate;
    capacity += population.capacity;
    trend += population.trend;
  }
  return { estimate, capacity, trend };
}

export interface GuildStatus {
  guild: SpeciesId;
  speciesIds: readonly string[];
  foodSources: string[];
  estimate: number;
  capacity: number;
  availability: number;
  foodFactor: number;
  trend: number;
}

export function guildStatus(planet: PlanetState, guild: SpeciesId): GuildStatus | null {
  const profile = profileFor(planet);
  if (!profile) return null;
  const speciesIds = profile.guilds[guild] ?? [];
  if (!speciesIds.length) return null;
  const population = aggregate(planet, speciesIds);
  if (!population.capacity && !population.estimate) return null;
  const foodSources = guildFoodSourceIds(planet, guild);
  const food = aggregate(planet, foodSources);
  return {
    guild,
    speciesIds,
    foodSources,
    estimate: population.estimate,
    capacity: population.capacity,
    availability: clamp(population.estimate / Math.max(1, population.capacity), 0, 1.2),
    foodFactor: clamp(food.estimate / Math.max(1, food.capacity * 0.25), 0, 1.2),
    trend: population.trend,
  };
}

export function guildFoodDirs(planet: PlanetState, guild: SpeciesId): Array<[number, number, number]> {
  const profile = profileFor(planet);
  if (!profile) return [];
  const dirs: Array<[number, number, number]> = [];
  for (const foodId of guildFoodSourceIds(planet, guild)) {
    const valid = profile.foodObjects[foodId] ?? [];
    for (const object of planet.objects) {
      if (valid.includes(object.type)) dirs.push([...object.dir]);
    }
  }
  return dirs;
}

export function guildPreyAgents(planet: PlanetState, guild: SpeciesId): SpeciesId[] {
  return profileFor(planet)?.prey[guild] ?? [];
}

export function guildAgentCapacity(planet: PlanetState, guild: SpeciesId, habitatCapacity: number): number {
  const profile = profileFor(planet);
  if (!profile) return habitatCapacity;
  if (!(profile.guilds[guild]?.length)) return 0;
  const status = guildStatus(planet, guild);
  if (!status) return 0;
  const ecological = Math.floor(status.estimate / profile.divisors[guild]);
  const supplied = Math.floor(ecological * (0.25 + 0.75 * clamp(status.foodFactor, 0, 1)));
  return Math.min(habitatCapacity, Math.max(0, supplied));
}
