import { terraConfig } from '../../content/planets/terra';
import type { ObjectType, PlanetState, SpeciesId } from '../types';

/** Visual fauna are legacy 5 species; each one represents a slice of Terra's 12-species ecology. */
export const TERRA_GUILDS: Record<SpeciesId, readonly string[]> = {
  deer: ['terra_deer', 'terra_rabbit'],
  fox: ['terra_fox', 'terra_wolf'],
  bird: ['terra_eagle'],
  fish: ['terra_fish'],
  insect: ['terra_bee'],
};

const GUILD_DIVISOR: Record<SpeciesId, number> = {
  deer: 8,
  fox: 4,
  bird: 2,
  fish: 8,
  insect: 10,
};

/** Legacy agent species that each guild can visually chase. */
export const GUILD_PREY_AGENTS: Partial<Record<SpeciesId, SpeciesId[]>> = {
  fox: ['deer'],
  bird: ['fish', 'insect'],
};

const FOOD_INTERACTIONS = new Set(['grazing', 'hunting', 'scavenging', 'pollination']);

const FOOD_OBJECTS: Record<string, ObjectType[]> = {
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
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function guildFoodSourceIds(guild: SpeciesId): string[] {
  const guildIds = TERRA_GUILDS[guild];
  const sources = terraConfig.foodWeb
    .filter((link) => guildIds.includes(link.source) && FOOD_INTERACTIONS.has(link.interaction))
    .map((link) => link.target)
    .filter((target) => !guildIds.includes(target));
  return [...new Set(sources)];
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
  if (planet.planetId !== 'terra') return null;
  const speciesIds = TERRA_GUILDS[guild];
  const population = aggregate(planet, speciesIds);
  if (!population.capacity && !population.estimate) return null;
  const foodSources = guildFoodSourceIds(guild);
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
  const dirs: Array<[number, number, number]> = [];
  for (const foodId of guildFoodSourceIds(guild)) {
    const valid = FOOD_OBJECTS[foodId] ?? [];
    for (const object of planet.objects) {
      if (valid.includes(object.type)) dirs.push([...object.dir]);
    }
  }
  return dirs;
}

export function guildAgentCapacity(planet: PlanetState, guild: SpeciesId, habitatCapacity: number): number {
  const status = guildStatus(planet, guild);
  if (!status) return habitatCapacity;
  const ecological = Math.floor(status.estimate / GUILD_DIVISOR[guild]);
  const supplied = Math.floor(ecological * (0.25 + 0.75 * clamp(status.foodFactor, 0, 1)));
  return Math.min(habitatCapacity, Math.max(0, supplied));
}
