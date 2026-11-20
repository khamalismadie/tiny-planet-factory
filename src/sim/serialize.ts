import { CURRENT_SCHEMA_VERSION, migratePlanet } from './migrate';
import type { PlanetState } from './types';

export interface SerializedPlanet {
  format: 'tpf-planet';
  version: number;
  state: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function serializePlanet(state: PlanetState): SerializedPlanet {
  return {
    format: 'tpf-planet',
    version: CURRENT_SCHEMA_VERSION,
    state: JSON.parse(JSON.stringify(state)) as unknown,
  };
}

export function deserializePlanet(raw: unknown): PlanetState | null {
  if (isRecord(raw) && raw.format === 'tpf-planet' && isRecord(raw.state)) {
    return migratePlanet(raw.state);
  }
  return migratePlanet(raw);
}
