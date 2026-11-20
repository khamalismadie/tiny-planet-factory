import type { SpeciesId } from '../sim/types';

export interface SpeciesDef {
  id: SpeciesId;
  label: string;
  color: number;
  lifespan: number;
  metabolism: number;
  baseEnergy: number;
  cooldown: number;
  weight: number;
  habitat: string;
}

export const SPECIES_ORDER: SpeciesId[] = ['deer', 'fox', 'bird', 'fish', 'insect'];

export const SPECIES_DEFS: Record<SpeciesId, SpeciesDef> = {
  deer: {
    id: 'deer',
    label: 'Kijang',
    color: 0xc99464,
    lifespan: 240,
    metabolism: 1.1,
    baseEnergy: 58,
    cooldown: 24,
    weight: 2,
    habitat: 'rumput, pohon, semak, dan bunga',
  },
  fox: {
    id: 'fox',
    label: 'Rubah',
    color: 0xe06b3a,
    lifespan: 190,
    metabolism: 2,
    baseEnergy: 52,
    cooldown: 34,
    weight: 1.5,
    habitat: 'hutan dengan populasi kijang',
  },
  bird: {
    id: 'bird',
    label: 'Burung',
    color: 0x74c7e8,
    lifespan: 280,
    metabolism: 0.9,
    baseEnergy: 56,
    cooldown: 28,
    weight: 1,
    habitat: 'pohon, semak, dan bunga',
  },
  fish: {
    id: 'fish',
    label: 'Ikan',
    color: 0x4fb3d9,
    lifespan: 170,
    metabolism: 0.8,
    baseEnergy: 60,
    cooldown: 30,
    weight: 0.8,
    habitat: 'laut dan danau',
  },
  insect: {
    id: 'insect',
    label: 'Serangga',
    color: 0xf2d24b,
    lifespan: 70,
    metabolism: 0.5,
    baseEnergy: 48,
    cooldown: 16,
    weight: 0.5,
    habitat: 'bunga, semak, dan vegetasi',
  },
};

export const SPECIES_INDEX = Object.fromEntries(
  SPECIES_ORDER.map((species, index) => [species, index]),
) as Record<SpeciesId, number>;
