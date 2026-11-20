import type { EventProgress, PlanetState } from '../sim/types';

export interface EventDef {
  id: string;
  title: string;
  description: string;
  target: number;
  rewardXp: number;
  update: (planet: PlanetState, current: number) => number;
  progressLabel: (current: number, target: number) => string;
}

export const EVENT_DEFS: EventDef[] = [
  {
    id: 'first-rain',
    title: 'Hujan Pertama',
    description: 'Saksikan hujan turun di planetmu.',
    target: 1,
    rewardXp: 10,
    update: (planet, current) => (planet.weather.type === 'rain' ? 1 : current),
    progressLabel: (current, target) => `${Math.min(current, target)}/${target}`,
  },
  {
    id: 'storm-tested',
    title: 'Uji Badai',
    description: 'Pertahankan stabilitas ≥ 35 selama 3 tick badai.',
    target: 3,
    rewardXp: 18,
    update: (planet, current) =>
      planet.weather.type === 'storm' && planet.environment.stability >= 35
        ? current + 1
        : current,
    progressLabel: (current, target) => `${Math.min(current, target)}/${target} tick`,
  },
  {
    id: 'drought-recovery',
    title: 'Pulih dari Kekeringan',
    description: 'Biarkan air turun < 25, lalu pulihkan ke ≥ 45.',
    target: 2,
    rewardXp: 25,
    update: (planet, current) => {
      if (current === 0 && planet.environment.water < 25) return 1;
      if (current === 1 && planet.environment.water >= 45) return 2;
      return current;
    },
    progressLabel: (current, target) => {
      if (current >= target) return 'selesai';
      if (current === 1) return 'pulihkan air ke ≥ 45';
      return 'tunggu air < 25';
    },
  },
];

export function createEventState(): Record<string, EventProgress> {
  return Object.fromEntries(
    EVENT_DEFS.map((event) => [event.id, { status: 'active', progress: 0 } as EventProgress]),
  );
}

export function ensureEventState(events: Record<string, EventProgress> | undefined): Record<string, EventProgress> {
  const state = createEventState();
  if (!events) return state;
  for (const event of EVENT_DEFS) {
    if (events[event.id]) state[event.id] = { ...events[event.id] };
  }
  return state;
}
