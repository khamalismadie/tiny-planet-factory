import { GUILD_PROFILES } from '../../content/planets/guild-profiles';
import type { GuildProfile } from '../../content/planets/guild-profiles';
import type { FoodWebLink, PlanetConfig } from './types';
import type { PlanetState, SpeciesId } from '../types';

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
