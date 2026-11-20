import { createPlanet, placeObject, simulateTick } from './engine';
import type { PlanetEvent, PlanetState } from './types';

function cloneEvent(event: PlanetEvent): PlanetEvent {
  return JSON.parse(JSON.stringify(event)) as PlanetEvent;
}

export function replayEvents(events: PlanetEvent[]): PlanetState | null {
  const created = events.find((event) => event.type === 'planet.created');
  if (!created || created.type !== 'planet.created') return null;

  let state = createPlanet(created.payload.seed, created.payload.name);
  for (const event of events) {
    if (event.type === 'planet.created') {
      state = createPlanet(event.payload.seed, event.payload.name);
      continue;
    }
    if (event.type === 'object.placed') {
      placeObject(state, event.payload.objectType, [...event.payload.dir] as [number, number, number], false);
      continue;
    }
    if (event.type === 'clock.tick') {
      for (let i = 0; i < event.payload.count; i++) simulateTick(state, false);
    }
  }
  state.eventLog = events.map(cloneEvent);
  state.revision = events.length;
  return state;
}
