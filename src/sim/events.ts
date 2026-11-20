import { hashString } from './rng';
import type { PlanetEvent, PlanetState } from './types';

export const MAX_EVENT_LOG = 1000;

export function nextEventIndex(state: PlanetState): number {
  return state.eventLog?.length ?? 0;
}

export function makePlanetEvent(
  type: PlanetEvent['type'],
  tick: number,
  index: number,
  payload: PlanetEvent['payload'],
  actor = 'local',
): PlanetEvent {
  const id = `evt-${tick}-${index}-${hashString(`${type}:${tick}:${index}:${JSON.stringify(payload)}`).toString(36)}`;
  return { id, tick, index, type, payload, actor } as PlanetEvent;
}

export function appendEvent(state: PlanetState, event: PlanetEvent): void {
  if (!Array.isArray(state.eventLog)) state.eventLog = [];
  state.eventLog.push(event);

  if (state.eventLog.length > MAX_EVENT_LOG) {
    const created = state.eventLog.find((entry) => entry.type === 'planet.created');
    const recent = state.eventLog.slice(-(MAX_EVENT_LOG - 1));
    state.eventLog = created && !recent.includes(created) ? [created, ...recent] : recent;
  }
  state.revision = (state.revision ?? 0) + 1;
}
