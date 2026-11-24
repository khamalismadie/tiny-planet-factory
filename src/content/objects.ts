import type { EcoKey, EnvKey, ObjectType } from '../sim/types';

export type ObjectCategory = 'terrain' | 'geography' | 'water' | 'vegetation' | 'wildlife';

export interface ObjectDef {
  type: ObjectType;
  label: string;
  category: ObjectCategory;
  color: number;
  scale: number;
  /** Normalized footprint radius used for deterministic soft spacing on the planet surface. */
  spacingRadius: number;
  effects: Partial<Record<EnvKey, number>>;
  ecoEffects?: Partial<Record<EcoKey, number>>;
  strength: number;
}

export const OBJECT_DEFS: Record<ObjectType, ObjectDef> = {
  grass: {
    type: 'grass',
    label: 'Rumput',
    category: 'terrain',
    color: 0x8fc15c,
    scale: 0.045,
    spacingRadius: 0.002,
    effects: { oxygen: 0.035, fertility: 0.05, water: -0.01 },
    strength: 1,
  },
  sand: {
    type: 'sand',
    label: 'Pasir',
    category: 'terrain',
    color: 0xd8c389,
    scale: 0.08,
    spacingRadius: 0.004,
    effects: { fertility: -0.03, temperature: 0.02 },
    strength: 1,
  },
  rock: {
    type: 'rock',
    label: 'Batu',
    category: 'terrain',
    color: 0x9aa0a6,
    scale: 0.0735,
    spacingRadius: 0.005,
    effects: { stability: 0.03, temperature: 0.01 },
    strength: 1,
  },
  hill: {
    type: 'hill',
    label: 'Bukit',
    category: 'geography',
    color: 0x7d9a62,
    scale: 0.351,
    spacingRadius: 0.037,
    effects: { water: 0.02, fertility: 0.02, stability: 0.02 },
    strength: 1,
  },
  mountain: {
    type: 'mountain',
    label: 'Gunung',
    category: 'geography',
    color: 0x7c828a,
    scale: 0.228,
    spacingRadius: 0.07,
    effects: { temperature: -0.04, water: 0.05, biodiversity: 0.02 },
    strength: 1,
  },
  ocean: {
    type: 'ocean',
    label: 'Laut',
    category: 'water',
    color: 0x3f8fd0,
    scale: 0.22,
    spacingRadius: 0.052,
    effects: { water: 0.3, humidity: 0.22, fertility: 0.02 },
    strength: 1,
  },
  lake: {
    type: 'lake',
    label: 'Danau',
    category: 'water',
    color: 0x63b7d8,
    scale: 0.13,
    spacingRadius: 0.019,
    effects: { water: 0.15, humidity: 0.11 },
    strength: 1,
  },
  tree: {
    type: 'tree',
    label: 'Pohon',
    category: 'vegetation',
    color: 0x3f8f4a,
    scale: 0.15,
    spacingRadius: 0.014,
    effects: { oxygen: 0.16, humidity: 0.07, water: -0.07, fertility: 0.05, biodiversity: 0.12 },
    strength: 1,
  },
  bush: {
    type: 'bush',
    label: 'Semak',
    category: 'vegetation',
    color: 0x5aa85a,
    scale: 0.09,
    spacingRadius: 0.010,
    effects: { oxygen: 0.08, humidity: 0.03, water: -0.03, biodiversity: 0.06 },
    strength: 1,
  },
  flower: {
    type: 'flower',
    label: 'Bunga',
    category: 'vegetation',
    color: 0xe28ab0,
    scale: 0.045,
    spacingRadius: 0.002,
    effects: { biodiversity: 0.1, oxygen: 0.03, fertility: 0.02 },
    strength: 1,
  },
  deer: {
    type: 'deer',
    label: 'Kijang',
    category: 'wildlife',
    color: 0xc08a55,
    scale: 0.0715,
    spacingRadius: 0.007,
    effects: { oxygen: -0.04, biodiversity: 0.1, fertility: 0.02 },
    ecoEffects: { vegetation: -0.3, wildlife: 1.5, population: 2 },
    strength: 1,
  },
  fox: {
    type: 'fox',
    label: 'Rubah',
    category: 'wildlife',
    color: 0xd9733f,
    scale: 0.065,
    spacingRadius: 0.007,
    effects: { oxygen: -0.03, biodiversity: 0.12, stability: 0.04 },
    ecoEffects: { wildlife: 0.5, population: 1 },
    strength: 1,
  },
  bird: {
    type: 'bird',
    label: 'Burung',
    category: 'wildlife',
    color: 0x6fc5e8,
    scale: 0.0516,
    spacingRadius: 0.004,
    effects: { biodiversity: 0.16, oxygen: 0.01 },
    ecoEffects: { wildlife: 1, population: 1.5 },
    strength: 1,
  },
};

export const OBJECT_ORDER: ObjectType[] = [
  'grass',
  'sand',
  'rock',
  'hill',
  'mountain',
  'ocean',
  'lake',
  'tree',
  'bush',
  'flower',
  'deer',
  'fox',
  'bird',
];

export const CATEGORY_LABELS: Record<ObjectCategory, string> = {
  terrain: 'Permukaan',
  geography: 'Bentuk Bumi',
  water: 'Air',
  vegetation: 'Tumbuhan',
  wildlife: 'Satwa',
};

// Semua alat inti tersedia sejak awal agar transformasi 3–5 menit tidak
// terhalang progression gate. Level tetap bertambah lewat XP dan misi.
export const UNLOCK_LEVEL: Record<ObjectType, number> = {
  grass: 1,
  sand: 1,
  rock: 1,
  hill: 1,
  mountain: 1,
  ocean: 1,
  lake: 1,
  tree: 1,
  bush: 1,
  flower: 1,
  deer: 1,
  fox: 1,
  bird: 1,
};
