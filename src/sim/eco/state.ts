import type { CryosphereState, EcoEventRecord, EcoStateV3, PopulationRecord } from './types';

export const CURRENT_ECOSYSTEM_VERSION = 1;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function finite(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function nonNegative(value: unknown, fallback: number): number {
  return Math.max(0, finite(value, fallback));
}

function bounded(value: unknown, fallback: number): number {
  return Math.max(0, Math.min(100, finite(value, fallback)));
}

function normalizeCryosphere(raw: unknown): CryosphereState {
  const record = isRecord(raw) ? raw : {};
  return {
    seasonId: typeof record.seasonId === 'string' ? record.seasonId : 'none',
    seasonName: typeof record.seasonName === 'string' ? record.seasonName : '',
    phase: Math.max(0, Math.min(1, finite(record.phase, 0))),
    freeze: bounded(record.freeze, 0),
    iceCoverage: bounded(record.iceCoverage, 0),
    snowCover: bounded(record.snowCover, 0),
    thawStress: bounded(record.thawStress, 0),
  };
}

function normalizePopulation(raw: unknown, capacity: number): PopulationRecord {
  const record = isRecord(raw) ? raw : {};
  return {
    estimate: nonNegative(record.estimate, 0),
    trend: finite(record.trend, 0),
    births: nonNegative(record.births, 0),
    deaths: nonNegative(record.deaths, 0),
    capacity: Math.max(1, finite(record.capacity, capacity)),
  };
}

function normalizeEvent(raw: unknown, index: number): EcoEventRecord | null {
  if (!isRecord(raw)) return null;
  const id = typeof raw.id === 'string' && raw.id ? raw.id : `eco-event-${index}`;
  return {
    id,
    tick: nonNegative(raw.tick, 0),
    type: typeof raw.type === 'string' ? raw.type : 'unknown',
    severity: Math.max(0, Math.min(1, finite(raw.severity, 0))),
    affectedBiomes: Array.isArray(raw.affectedBiomes)
      ? raw.affectedBiomes.filter((value): value is string => typeof value === 'string')
      : [],
    affectedSpecies: Array.isArray(raw.affectedSpecies)
      ? raw.affectedSpecies.filter((value): value is string => typeof value === 'string')
      : [],
    description: typeof raw.description === 'string' ? raw.description : '',
  };
}

export function createEcoState(planetId = 'terra'): EcoStateV3 {
  return {
    planetId,
    ecosystemVersion: CURRENT_ECOSYSTEM_VERSION,
    populations: {},
    detritus: 0,
    traits: {},
    discovered: [],
    eventHistory: [],
    metrics: {
      speciesCount: 0,
      totalPopulation: 0,
      biodiversityIndex: 0,
      habitatHealth: 0,
      vegetationCoverage: 0,
      waterAvailability: 0,
      soilFertility: 0,
      foodAvailability: 0,
      predatorPreyBalance: 0,
      stability: 0,
    },
    cryo: {
      seasonId: 'none',
      seasonName: '',
      phase: 0,
      freeze: 0,
      iceCoverage: 0,
      snowCover: 0,
      thawStress: 0,
    },
  };
}

export function normalizeEcoState(raw: unknown, planetId: string): EcoStateV3 {
  const base = createEcoState(planetId);
  if (!isRecord(raw)) return base;

  const rawPopulations = isRecord(raw.populations) ? raw.populations : {};
  const populations: Record<string, PopulationRecord> = {};
  for (const [id, entry] of Object.entries(rawPopulations)) {
    populations[id] = normalizePopulation(entry, 40);
  }

  const traits: Record<string, string[]> = {};
  if (isRecord(raw.traits)) {
    for (const [id, entry] of Object.entries(raw.traits)) {
      traits[id] = Array.isArray(entry)
        ? entry.filter((value): value is string => typeof value === 'string')
        : [];
    }
  }

  const discovered = Array.isArray(raw.discovered)
    ? raw.discovered.filter((value): value is string => typeof value === 'string')
    : [];

  const eventHistory = Array.isArray(raw.eventHistory)
    ? raw.eventHistory
        .map(normalizeEvent)
        .filter((event): event is EcoEventRecord => event !== null)
    : [];

  const rawMetrics = isRecord(raw.metrics) ? raw.metrics : {};
  const metrics = { ...base.metrics };
  for (const key of Object.keys(metrics) as Array<keyof typeof metrics>) {
    metrics[key] = nonNegative(rawMetrics[key], base.metrics[key]);
  }

  return {
    planetId: typeof raw.planetId === 'string' && raw.planetId ? raw.planetId : planetId,
    ecosystemVersion: Math.max(1, Math.floor(finite(raw.ecosystemVersion, CURRENT_ECOSYSTEM_VERSION))),
    populations,
    detritus: nonNegative(raw.detritus, base.detritus),
    traits,
    discovered,
    eventHistory,
    metrics,
    cryo: normalizeCryosphere(raw.cryo),
  };
}
