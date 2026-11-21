import { PLANET_CONFIGS } from '../../content/planets';
import type { PlanetConfig, SpeciesDefinition, TrophicLevel } from './types';

const CONSUMER_LEVELS: TrophicLevel[] = [
  'primary-consumer',
  'secondary-consumer',
  'tertiary-consumer',
  'apex-predator',
  'omnivore',
];

function unique(values: string[]): boolean {
  return new Set(values).size === values.length;
}

export function validatePlanetConfig(config: PlanetConfig): string[] {
  const errors: string[] = [];
  const ids = config.species.map((entry) => entry.id);

  if (!config.id) errors.push(`${config.id || '<anonymous>'}: id kosong`);
  if (!unique(ids)) errors.push(`${config.id}: species id duplikat`);
  if (config.species.some((entry) => entry.planetId !== config.id)) {
    errors.push(`${config.id}: planetId species tidak konsisten`);
  }

  const idSet = new Set(ids);
  const referenced = [...config.flora, ...config.fauna, ...config.decomposers];
  for (const id of referenced) {
    if (!idSet.has(id)) errors.push(`${config.id}: referensi species "${id}" tidak ditemukan`);
  }

  const trophic = new Set(config.species.map((entry) => entry.trophicLevel));
  if (!trophic.has('producer')) errors.push(`${config.id}: tidak ada producer`);
  if (!CONSUMER_LEVELS.some((level) => trophic.has(level))) errors.push(`${config.id}: tidak ada consumer`);
  if (!trophic.has('decomposer') && !trophic.has('microorganism')) {
    errors.push(`${config.id}: tidak ada decomposer/microorganism`);
  }

  for (const relation of config.foodWeb) {
    if (!idSet.has(relation.source)) errors.push(`${config.id}: food web source "${relation.source}" invalid`);
    if (!idSet.has(relation.target)) errors.push(`${config.id}: food web target "${relation.target}" invalid`);
    if (relation.strength < 0 || relation.strength > 1) {
      errors.push(`${config.id}: food web strength "${relation.id}" di luar 0..1`);
    }
  }

  if (config.climate.seasons.length === 0) errors.push(`${config.id}: tidak ada season config`);
  if (config.climate.seasons.some((season) => season.durationTicks <= 0)) {
    errors.push(`${config.id}: durationTicks season harus > 0`);
  }
  if (config.terrain.seaLevel <= 0) errors.push(`${config.id}: seaLevel harus > 0`);
  for (const [key, value] of Object.entries(config.startingEnvironment)) {
    if (!Number.isFinite(value)) errors.push(`${config.id}: startingEnvironment.${key} bukan angka`);
  }

  return errors;
}

export class SpeciesRegistry {
  private readonly species = new Map<string, SpeciesDefinition>();
  private readonly planets = new Map<string, PlanetConfig>();

  constructor(configs: PlanetConfig[] = PLANET_CONFIGS) {
    for (const config of configs) {
      if (this.planets.has(config.id)) throw new Error(`Planet config duplikat: ${config.id}`);
      this.planets.set(config.id, config);
      for (const definition of config.species) {
        if (this.species.has(definition.id)) throw new Error(`Species id duplikat: ${definition.id}`);
        this.species.set(definition.id, definition);
      }
    }
  }

  get(id: string): SpeciesDefinition | undefined {
    return this.species.get(id);
  }

  require(id: string): SpeciesDefinition {
    const definition = this.species.get(id);
    if (!definition) throw new Error(`Species tidak terdaftar: ${id}`);
    return definition;
  }

  list(): SpeciesDefinition[] {
    return [...this.species.values()];
  }

  byPlanet(planetId: string): SpeciesDefinition[] {
    return this.list().filter((entry) => entry.planetId === planetId);
  }

  planet(planetId: string): PlanetConfig | undefined {
    return this.planets.get(planetId);
  }

  planetsList(): PlanetConfig[] {
    return [...this.planets.values()];
  }

  foodWeb(planetId: string) {
    return this.planet(planetId)?.foodWeb ?? [];
  }

  validate(): string[] {
    const errors: string[] = [];
    for (const config of this.planetsList()) errors.push(...validatePlanetConfig(config));
    return errors;
  }
}

export const speciesRegistry = new SpeciesRegistry();

export function validateAllPlanetConfigs(): string[] {
  return speciesRegistry.validate();
}
