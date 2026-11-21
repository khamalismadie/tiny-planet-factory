import { aquariaConfig } from '../../content/planets/aquaria';
import { duneConfig } from '../../content/planets/dune';
import { glaciereConfig } from '../../content/planets/glaciera';
import { infernaConfig } from '../../content/planets/inferna';
import { myceliaConfig } from '../../content/planets/mycelia';
import { terraConfig } from '../../content/planets/terra';
import { hashString, mulberry32 } from '../rng';
import type { PlanetState } from '../types';
import { scoreHabitat } from './habitat';
import type {
  EcoEventRecord,
  EcoStateV3,
  HabitatContext,
  PlanetConfig,
  PopulationRecord,
  SpeciesDefinition,
} from './types';

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function initialFraction(definition: SpeciesDefinition): number {
  switch (definition.trophicLevel) {
    case 'producer': return 0.36;
    case 'primary-consumer': return 0.24;
    case 'secondary-consumer': return 0.2;
    case 'apex-predator': return 0.18;
    case 'pollinator': return 0.2;
    case 'decomposer':
    case 'microorganism': return 0.28;
    default: return 0.18;
  }
}

function makePopulation(definition: SpeciesDefinition): PopulationRecord {
  const capacity = Math.max(1, definition.populationCapacity);
  return {
    estimate: capacity * initialFraction(definition),
    trend: 0,
    births: 0,
    deaths: 0,
    capacity,
  };
}

function ensurePopulations(eco: EcoStateV3, config: PlanetConfig): void {
  for (const definition of config.species) {
    if (!eco.populations[definition.id]) {
      eco.populations[definition.id] = makePopulation(definition);
    }
  }
}

function sumEstimates(config: PlanetConfig, eco: EcoStateV3, predicate: (definition: SpeciesDefinition) => boolean): number {
  let total = 0;
  for (const definition of config.species) {
    if (predicate(definition)) total += eco.populations[definition.id]?.estimate ?? 0;
  }
  return total;
}

function resourceAvailability(
  definition: SpeciesDefinition,
  config: PlanetConfig,
  eco: EcoStateV3,
  context: HabitatContext,
): number {
  const producerPopulation = sumEstimates(config, eco, (entry) => entry.speciesType === 'flora');
  const producerCapacity = config.species.reduce(
    (total, entry) => total + (entry.speciesType === 'flora' ? entry.populationCapacity : 0),
    0,
  );

  let weighted = 0;
  let weight = 0;
  for (const requirement of definition.foodRequirements) {
    const amount = Math.max(0.01, requirement.amount);
    let available = 0;
    switch (requirement.resource) {
      case 'sunlight':
        available = context.environment.energy / 45;
        break;
      case 'water':
        available = context.environment.water / 55;
        break;
      case 'detritus':
        available = eco.detritus / 20;
        break;
      case 'nutrients':
        available = context.environment.fertility / 55;
        break;
      case 'plankton':
        available = eco.ocean.seasonId !== 'none'
          ? eco.ocean.plankton / 70 + (context.aquatic?.waterQuality ?? 50) / 400
          : context.environment.water / 70 + (config.aquatic?.waterQuality ?? 50) / 200;
        break;
      case 'nectar':
        available = producerPopulation / Math.max(1, producerCapacity * 0.25) + 0.2;
        break;
      default: {
        const source = eco.populations[requirement.resource];
        available = source ? source.estimate / Math.max(1, source.capacity * 0.35) : 0;
        break;
      }
    }
    weighted += clamp(available, 0, 1.4) * amount;
    weight += amount;
  }
  return weight > 0 ? weighted / weight : 1;
}

function predationPressure(
  definition: SpeciesDefinition,
  config: PlanetConfig,
  eco: EcoStateV3,
  capacity: number,
): number {
  let pressure = 0;
  for (const relation of config.foodWeb) {
    if (relation.target !== definition.id) continue;
    if (relation.interaction !== 'hunting' && relation.interaction !== 'grazing' && relation.interaction !== 'scavenging') continue;
    const predator = eco.populations[relation.source];
    if (predator) pressure += predator.estimate * relation.strength;
  }
  return clamp(pressure / Math.max(1, capacity * 3), 0, 0.03);
}

function pollinationBoost(definition: SpeciesDefinition, config: PlanetConfig, eco: EcoStateV3): number {
  if (definition.speciesType !== 'flora') return 0;
  const hasLink = config.foodWeb.some(
    (relation) => relation.target === definition.id && relation.interaction === 'pollination',
  );
  if (!hasLink) return 0;
  const pollinators = sumEstimates(config, eco, (entry) => entry.trophicLevel === 'pollinator');
  return clamp(pollinators / 300, 0, 0.3);
}

function pushEcoEvent(eco: EcoStateV3, record: EcoEventRecord): void {
  const duplicate = eco.eventHistory.some(
    (entry) => entry.type === record.type && entry.affectedSpecies.includes(record.affectedSpecies[0] ?? ''),
  );
  if (duplicate) return;
  eco.eventHistory.push(record);
  if (eco.eventHistory.length > 50) eco.eventHistory.splice(0, eco.eventHistory.length - 50);
}

function recomputeMetrics(
  planet: PlanetState,
  config: PlanetConfig,
  scores: Record<string, number>,
  resources: Record<string, number>,
): void {
  const eco = planet.eco;
  const entries = config.species.map((definition) => ({
    definition,
    population: eco.populations[definition.id],
  }));
  const total = entries.reduce((sum, entry) => sum + entry.population.estimate, 0);
  const living = entries.filter((entry) => entry.population.estimate >= 1);
  const proportions = living.map((entry) => entry.population.estimate / Math.max(1, total));
  const shannon = proportions.length > 1
    ? -proportions.reduce((sum, value) => sum + value * Math.log(value), 0) / Math.log(proportions.length)
    : 0;

  const producerCapacity = entries.reduce(
    (sum, entry) => sum + (entry.definition.speciesType === 'flora' ? entry.population.capacity : 0),
    0,
  );
  const producerEstimate = sumEstimates(config, eco, (entry) => entry.speciesType === 'flora');
  const predatorEstimate = sumEstimates(config, eco, (entry) => entry.trophicLevel === 'apex-predator');
  const preyEstimate = sumEstimates(config, eco, (entry) => entry.trophicLevel === 'primary-consumer');
  const predatorRatio = predatorEstimate / Math.max(1, preyEstimate);
  const consumerResources = entries
    .filter((entry) => entry.definition.speciesType === 'fauna')
    .map((entry) => resources[entry.definition.id] ?? 1);
  const averageResource = consumerResources.length
    ? consumerResources.reduce((sum, value) => sum + value, 0) / consumerResources.length
    : 1;
  const averageScore = entries.reduce((sum, entry) => sum + (scores[entry.definition.id] ?? 0), 0) / Math.max(1, entries.length);

  eco.metrics = {
    speciesCount: living.length,
    totalPopulation: Math.round(total),
    biodiversityIndex: clamp(shannon * 100),
    habitatHealth: clamp(averageScore * 100),
    vegetationCoverage: clamp((producerEstimate / Math.max(1, producerCapacity)) * 100),
    waterAvailability: clamp(planet.environment.water),
    soilFertility: clamp(planet.environment.fertility),
    foodAvailability: clamp(averageResource * 100),
    predatorPreyBalance: clamp(100 - Math.abs(predatorRatio - 0.15) / 0.15 * 60),
    stability: clamp(planet.environment.stability),
  };
}

export function habitatContextFor(planet: PlanetState, config: PlanetConfig): HabitatContext {
  const hazard = planet.weather.type === 'storm'
    ? 'badai-hujan'
    : planet.weather.type === 'snow'
      ? 'gelombang-dingin'
      : (planet.eco.cryo?.thawStress ?? 0) > 55
        ? 'pencairan-glasial'
        : (planet.eco.volcano?.eruptionStress ?? 0) > 60
          ? 'erupsi-gunung-berapi'
          : (planet.eco.volcano?.lavaFlow ?? 0) > 50
            ? 'aliran-lava'
            : (planet.eco.volcano?.ash ?? 0) > 50
              ? 'hujan-abu'
              : (planet.eco.volcano?.heat ?? 0) > 70
                ? 'gelombang-panas'
                : (planet.eco.ocean?.bleaching ?? 0) > 55
                  ? 'pemutihan-karang'
                  : (planet.eco.ocean?.current ?? 0) > 75
                    ? 'badai-laut'
                    : (planet.eco.ocean?.seasonId !== 'none' && planet.environment.temperature > 34)
                      ? 'gelombang-panas-laut'
                      : (planet.eco.fungal?.networkStress ?? 0) > 60
                        ? 'gangguan-jaringan'
                        : (planet.eco.fungal?.spores ?? 0) > 82
                          ? 'spora-beracun'
                          : (planet.eco.fungal?.seasonId !== 'none' && planet.environment.humidity > 95)
                            ? 'kelembapan-ekstrem'
                            : planet.environment.water < 25
                        ? 'kekeringan-musiman'
                        : null;
  return {
    environment: planet.environment,
    ecosystem: planet.ecosystem,
    biomeTags: config.biomeTags,
    aquatic: planet.eco.ocean.seasonId !== 'none' && config.aquatic
      ? {
          ...config.aquatic,
          dissolvedOxygen: planet.eco.ocean.dissolvedOxygen / 10,
          waterQuality: clamp(50 + planet.eco.ocean.reefHealth * 0.4 - planet.eco.ocean.bleaching * 0.3),
          current: planet.eco.ocean.current / 100,
          reefCoverage: planet.eco.ocean.reefHealth,
        }
      : config.aquatic,
    hazard,
  };
}

export class EcosystemManager {
  constructor(private readonly config: PlanetConfig) {}

  initialize(planet: PlanetState): void {
    if (planet.planetId !== this.config.id) return;
    ensurePopulations(planet.eco, this.config);
    const context = habitatContextFor(planet, this.config);
    const scores: Record<string, number> = {};
    const resources: Record<string, number> = {};
    for (const definition of this.config.species) {
      scores[definition.id] = scoreHabitat(definition, context).suitability;
      resources[definition.id] = resourceAvailability(definition, this.config, planet.eco, context);
    }
    recomputeMetrics(planet, this.config, scores, resources);
  }

  step(planet: PlanetState): string[] {
    if (planet.planetId !== this.config.id) return [];
    const config = this.config;
    const eco = planet.eco;
    const random = mulberry32(hashString(`${planet.seed}:eco:${planet.tick}`));
    const messages: string[] = [];
    ensurePopulations(eco, config);
    const context = habitatContextFor(planet, config);

    const scores: Record<string, number> = {};
    const resources: Record<string, number> = {};
    for (const definition of config.species) {
      scores[definition.id] = scoreHabitat(definition, context).suitability;
      resources[definition.id] = resourceAvailability(definition, config, eco, context);
    }

    for (const definition of config.species) {
      const population = eco.populations[definition.id];
      const score = scores[definition.id];
      const resource = resources[definition.id];
      const capacity = Math.max(1, definition.populationCapacity * (0.55 + score * 0.45));
      population.capacity = capacity;

      const space = clamp(1 - population.estimate / capacity, 0, 1);
      const growthNoise = 0.92 + random() * 0.16;
      const mortalityNoise = 0.92 + random() * 0.16;
      const births = Math.max(
        0,
        population.estimate
          * definition.reproductionRate
          * score
          * resource
          * (1 + pollinationBoost(definition, config, eco))
          * space
          * growthNoise,
      );
      const starvation = resource < 0.4 ? (0.4 - resource) * 0.08 : 0;
      const coldStress = (planet.eco.cryo?.thawStress ?? 0) / 100;
      const coldAdapted = definition.geneticTraits.some(
        (trait) => trait === 'freeze-tolerance' || trait === 'cold-dormancy',
      );
      const coldMortality = coldStress * (coldAdapted ? 0.003 : 0.015);
      const heatStress = (planet.eco.volcano?.eruptionStress ?? 0) / 100;
      const heatAdapted = definition.geneticTraits.some((trait) =>
        trait === 'heat-resistance' ||
        trait === 'heat-shield' ||
        trait === 'thermophilic-enzymes' ||
        trait === 'ash-deposition-recovery' ||
        trait === 'post-eruption-regrowth',
      );
      const heatMortality = heatStress * (heatAdapted ? 0.003 : 0.015);
      const bleachingStress = (planet.eco.ocean?.bleaching ?? 0) / 100;
      const reefAdapted = definition.geneticTraits.some((trait) =>
        trait === 'reef-building' ||
        trait === 'salt-filter' ||
        trait === 'current-anchoring' ||
        trait === 'nutrient-recycling',
      );
      const reefMortality = bleachingStress * (reefAdapted ? 0.003 : 0.012);
      const networkStress = (planet.eco.fungal?.networkStress ?? 0) / 100;
      const fungalAdapted = definition.geneticTraits.some((trait) =>
        trait === 'nutrient-exchange' ||
        trait === 'fungal-network' ||
        trait === 'spore-dispersal' ||
        trait === 'bioluminescence' ||
        trait === 'day-night-glow',
      );
      const networkMortality = networkStress * (fungalAdapted ? 0.004 : 0.014);
      const mortalityRate = definition.mortalityRate * 0.4
        + (1 - score) * 0.02
        + starvation
        + coldMortality
        + heatMortality
        + reefMortality
        + networkMortality
        + predationPressure(definition, config, eco, capacity);
      const deaths = Math.min(
        population.estimate,
        population.estimate * mortalityRate * mortalityNoise,
      );
      const next = clamp(population.estimate + births - deaths, 0, capacity);

      population.trend = next - population.estimate;
      population.births += births;
      population.deaths += deaths;
      population.estimate = next;
      eco.detritus = clamp(eco.detritus + deaths * 0.35, 0, 500);

      if (population.estimate >= 1 && !eco.discovered.includes(definition.id)) {
        eco.discovered.push(definition.id);
        pushEcoEvent(eco, {
          id: `discovery:${definition.id}:${planet.tick}`,
          tick: planet.tick,
          type: 'discovery',
          severity: 0,
          affectedBiomes: config.biomeTags,
          affectedSpecies: [definition.id],
          description: `${definition.name} teramati di ekosistem.`,
        });
        messages.push(`${definition.name} teramati di ekosistem.`);
      } else if (population.estimate < 1 && population.trend < 0) {
        pushEcoEvent(eco, {
          id: `extinction:${definition.id}:${planet.tick}`,
          tick: planet.tick,
          type: 'extinction',
          severity: 1,
          affectedBiomes: config.biomeTags,
          affectedSpecies: [definition.id],
          description: `${definition.name} punah secara lokal.`,
        });
      }
    }

    const decomposers = sumEstimates(config, eco, (entry) => entry.speciesType === 'decomposer');
    const recycled = Math.min(eco.detritus, decomposers * 0.06);
    eco.detritus = clamp(eco.detritus - recycled, 0, 500);
    planet.environment.fertility = clamp(planet.environment.fertility + recycled * 0.012);
    eco.detritus = clamp(eco.detritus * 0.998, 0, 500);

    recomputeMetrics(planet, config, scores, resources);
    return messages;
  }
}

const ECOSYSTEM_MANAGERS = new Map<string, EcosystemManager>([
  [terraConfig.id, new EcosystemManager(terraConfig)],
  [duneConfig.id, new EcosystemManager(duneConfig)],
  [glaciereConfig.id, new EcosystemManager(glaciereConfig)],
  [infernaConfig.id, new EcosystemManager(infernaConfig)],
  [aquariaConfig.id, new EcosystemManager(aquariaConfig)],
  [myceliaConfig.id, new EcosystemManager(myceliaConfig)],
]);

export function ecosystemFor(planetId: string): EcosystemManager | null {
  return ECOSYSTEM_MANAGERS.get(planetId) ?? null;
}

export function initializeEcosystem(planet: PlanetState): void {
  ecosystemFor(planet.planetId)?.initialize(planet);
}

export function stepEcosystem(planet: PlanetState): string[] {
  return ecosystemFor(planet.planetId)?.step(planet) ?? [];
}
