import { SPECIES_DEFS, SPECIES_ORDER } from '../content/species';
import { guildAgentCapacity, guildFoodDirs, guildPreyAgents, guildStatus, type GuildStatus } from './eco/guilds';
import { hashString, mulberry32 } from './rng';
import type {
  FaunaState,
  ObjectType,
  PlanetState,
  SpeciesId,
  WildlifeAgent,
} from './types';

export const MAX_AGENTS = 48;

export interface WildlifeContribution {
  wildlife: number;
  population: number;
  grazing: number;
  pollination: number;
  predation: number;
  messages: string[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function emptyZeroTicks(): Record<SpeciesId, number> {
  return { deer: 0, fox: 0, bird: 0, fish: 0, insect: 0 };
}

export function createFauna(): FaunaState {
  return { agents: [], discovered: [], extinct: [], zeroTicks: emptyZeroTicks(), nextId: 0 };
}

function normalizeDir(dir: [number, number, number]): [number, number, number] {
  const length = Math.hypot(...dir) || 1;
  return [dir[0] / length, dir[1] / length, dir[2] / length];
}

function randomUnit(random: () => number): [number, number, number] {
  const z = random() * 2 - 1;
  const angle = random() * Math.PI * 2;
  const radius = Math.sqrt(Math.max(0, 1 - z * z));
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, z];
}

function habitatDirs(planet: PlanetState, species: SpeciesId): Array<[number, number, number]> {
  const map: Record<SpeciesId, ObjectType[]> = {
    deer: ['grass', 'tree', 'bush', 'flower', 'deer'],
    fox: ['deer', 'fox', 'tree', 'bush'],
    bird: ['tree', 'bush', 'flower', 'bird'],
    fish: ['ocean', 'lake'],
    insect: ['flower', 'bush', 'grass'],
  };
  const valid = map[species];
  return planet.objects.filter((object) => valid.includes(object.type)).map((object) => [...object.dir]);
}

function speciesCount(agents: WildlifeAgent[], species: SpeciesId): number {
  let count = 0;
  for (const agent of agents) if (agent.species === species) count++;
  return count;
}

export function simulateWildlife(
  planet: PlanetState,
  counts: Record<ObjectType, number>,
): WildlifeContribution {
  const fauna = planet.fauna ?? createFauna();
  planet.fauna = fauna;
  const random = mulberry32(hashString(`${planet.seed}:wildlife:${planet.tick}`));
  const env = planet.environment;
  const eco = planet.ecosystem;
  const deerAgents = speciesCount(fauna.agents, 'deer');
  const messages: string[] = [];
  const statuses: Record<SpeciesId, GuildStatus | null> = {
    deer: guildStatus(planet, 'deer'),
    fox: guildStatus(planet, 'fox'),
    bird: guildStatus(planet, 'bird'),
    fish: guildStatus(planet, 'fish'),
    insect: guildStatus(planet, 'insect'),
  };
  const foodDirsByGuild = Object.fromEntries(
    SPECIES_ORDER.map((species) => [species, guildFoodDirs(planet, species)]),
  ) as Record<SpeciesId, Array<[number, number, number]>>;

  const capacities: Record<SpeciesId, number> = {
    deer: Math.min(12, counts.grass * 0.8 + counts.tree * 0.4 + counts.bush * 0.6 + eco.vegetation * 0.06 + counts.deer * 4)
      * (env.oxygen >= 18 ? 1 : counts.deer > 0 ? 0.8 : 0.2),
    fox: Math.min(6, deerAgents * 0.25 + counts.tree * 0.3 + counts.fox * 3)
      * (deerAgents > 0 || counts.deer > 0 ? 1 : 0.25),
    bird: Math.min(10, counts.tree * 0.7 + counts.flower * 0.5 + counts.bush * 0.3 + counts.bird * 3)
      * (env.oxygen >= 22 ? 1 : counts.bird > 0 ? 0.8 : 0.2),
    fish: Math.min(10, (counts.ocean * 2 + counts.lake * 2) * (env.water >= 35 ? 1 : 0.2)),
    insect: Math.min(14, counts.flower * 1.2 + counts.bush * 0.6 + counts.grass * 0.3 + eco.vegetation * 0.04)
      * (env.temperature > 4 && env.temperature < 38 ? 1 : 0.2),
  };
  for (const species of SPECIES_ORDER) {
    capacities[species] = Math.max(0, Math.floor(guildAgentCapacity(planet, species, capacities[species])));
  }

  const spawn = (species: SpeciesId, dir: [number, number, number], energy: number, generation = 0): WildlifeAgent => {
    const agent: WildlifeAgent = {
      id: `fauna-${fauna.nextId++}`,
      species,
      dir: normalizeDir(dir),
      energy: clamp(energy, 0, 100),
      age: 0,
      cooldown: SPECIES_DEFS[species].cooldown,
      generation,
    };
    fauna.agents.push(agent);
    return agent;
  };

  let grazing = 0;
  let pollination = 0;
  let predation = 0;
  const dead = new Set<string>();

  for (const agent of [...fauna.agents]) {
    const def = SPECIES_DEFS[agent.species];
    const status = statuses[agent.species];
    const supply = status ? clamp(status.foodFactor, 0, 1.2) : 1;
    const presence = status ? clamp(status.availability, 0, 1.2) : 1;
    const preySpecies = guildPreyAgents(planet, agent.species);
    const prey = preySpecies.length
      ? fauna.agents
          .filter((candidate) => preySpecies.includes(candidate.species) && candidate.id !== agent.id && !dead.has(candidate.id))
          .sort((a, b) => a.energy - b.energy)[0]
      : undefined;
    const dirs = foodDirsByGuild[agent.species].length
      ? foodDirsByGuild[agent.species]
      : habitatDirs(planet, agent.species);

    if (prey && supply > 0.1) {
      const step = 0.06 + random() * 0.05;
      agent.dir = normalizeDir([
        agent.dir[0] + (prey.dir[0] - agent.dir[0]) * step,
        agent.dir[1] + (prey.dir[1] - agent.dir[1]) * step,
        agent.dir[2] + (prey.dir[2] - agent.dir[2]) * step,
      ]);
    } else if (dirs.length) {
      const target = dirs[Math.floor(random() * dirs.length)];
      const step = 0.06 + random() * 0.05;
      agent.dir = normalizeDir([
        agent.dir[0] + (target[0] - agent.dir[0]) * step,
        agent.dir[1] + (target[1] - agent.dir[1]) * step,
        agent.dir[2] + (target[2] - agent.dir[2]) * step,
      ]);
    } else {
      const drift = randomUnit(random);
      agent.dir = normalizeDir([
        agent.dir[0] + drift[0] * 0.02,
        agent.dir[1] + drift[1] * 0.02,
        agent.dir[2] + drift[2] * 0.02,
      ]);
    }

    agent.energy -= def.metabolism;
    const canForage = presence > 0.02 && supply > 0.08;

    if (agent.species === 'deer' && (eco.vegetation > 8 || counts.deer > 0) && canForage) {
      agent.energy += 2.6 * supply;
      grazing += 0.025 * supply;
    } else if (agent.species === 'bird') {
      if (prey && supply > 0.1 && random() < clamp(supply, 0, 1)) {
        prey.energy -= 7;
        agent.energy += 3.4;
        predation += 1;
      } else if (canForage && counts.tree + counts.flower + counts.bird > 0) {
        agent.energy += 2.1 * supply;
      }
    } else if (agent.species === 'fish' && env.water >= 35 && canForage) {
      agent.energy += 2.5 * supply;
    } else if (agent.species === 'insect' && eco.vegetation > 12 && canForage) {
      agent.energy += 2.2 * supply;
      pollination += 0.03 * supply;
    } else if (agent.species === 'fox') {
      if (prey && random() < clamp(supply, 0, 1)) {
        prey.energy -= 7;
        agent.energy += 3.4;
        predation += 1;
      } else if (canForage && (counts.deer > 0 || (status?.foodFactor ?? 0) > 0.2)) {
        agent.energy += 2.8 * supply;
        predation += 0.5 * supply;
      }
    }

    agent.energy = clamp(agent.energy, 0, 100);
    agent.age += 1;
    agent.cooldown = Math.max(0, agent.cooldown - 1);

    const current = speciesCount(fauna.agents, agent.species);
    if (
      agent.energy > 66 &&
      agent.cooldown === 0 &&
      current < capacities[agent.species] &&
      fauna.agents.length < MAX_AGENTS
    ) {
      agent.energy *= 0.6;
      agent.cooldown = def.cooldown;
      const jitter = randomUnit(random);
      spawn(
        agent.species,
        [
          agent.dir[0] + jitter[0] * 0.12,
          agent.dir[1] + jitter[1] * 0.12,
          agent.dir[2] + jitter[2] * 0.12,
        ],
        def.baseEnergy * 0.6,
        agent.generation + 1,
      );
    }

    if (agent.energy <= 0 || agent.age >= def.lifespan) dead.add(agent.id);
  }

  fauna.agents = fauna.agents.filter((agent) => !dead.has(agent.id));

  for (const species of SPECIES_ORDER) {
    if (speciesCount(fauna.agents, species) >= capacities[species]) continue;
    if (fauna.agents.length >= MAX_AGENTS) break;
    if (random() > 0.42) continue;
    const dirs = habitatDirs(planet, species);
    const dir = dirs.length ? dirs[Math.floor(random() * dirs.length)] : randomUnit(random);
    spawn(species, dir, SPECIES_DEFS[species].baseEnergy);
    if (!fauna.discovered.includes(species)) {
      fauna.discovered.push(species);
      messages.push(`Spesies ${SPECIES_DEFS[species].label} ditemukan!`);
    }
    if (fauna.extinct.includes(species)) {
      fauna.extinct = fauna.extinct.filter((id) => id !== species);
      messages.push(`Spesies ${SPECIES_DEFS[species].label} kembali ke planet.`);
    }
  }

  for (const species of SPECIES_ORDER) {
    const extinctNow = speciesCount(fauna.agents, species) === 0 && capacities[species] < 1;
    fauna.zeroTicks[species] = extinctNow ? fauna.zeroTicks[species] + 1 : 0;
    if (fauna.zeroTicks[species] >= 8 && fauna.discovered.includes(species) && !fauna.extinct.includes(species)) {
      fauna.extinct.push(species);
      messages.push(`Spesies ${SPECIES_DEFS[species].label} punah di planet ini.`);
    }
  }

  eco.vegetation = clamp(eco.vegetation - grazing + pollination * 0.4, 0, 100);
  env.fertility = clamp(env.fertility + pollination * 0.3, 0, 100);

  let wildlife = 0;
  for (const agent of fauna.agents) {
    wildlife += SPECIES_DEFS[agent.species].weight * (0.6 + agent.energy / 250);
  }

  return {
    wildlife,
    population: fauna.agents.length,
    grazing,
    pollination,
    predation,
    messages,
  };
}
