import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'cosmos';

const CRYSTAL_HABITAT = habitat(['crystal-fields', 'meteor-craters'], {
  temperature: range(6, 12),
  humidity: range(30, 18),
  water: range(28, 18),
  vegetation: range(34, 20),
  fertility: range(38, 18),
});

const NEBULA_HABITAT = habitat(['nebula-valleys', 'cosmic-plains'], {
  temperature: range(10, 10),
  humidity: range(46, 20),
  water: range(44, 20),
  vegetation: range(48, 22),
});

const PLAIN_HABITAT = habitat(['cosmic-plains', 'crystal-fields'], {
  temperature: range(8, 9),
  humidity: range(38, 18),
  water: range(36, 18),
  vegetation: range(44, 20),
});

const SPECIES = [
  species(PLANET_ID, 'cosmos_star_bloom', 'Bintang Mekar', 'producer', ['cosmic-plains', 'nebula-valleys'],
    [food('sunlight', 1), food('energy', 0.6)], {
      habitatPreferences: [NEBULA_HABITAT], lifespan: 280, populationCapacity: 120,
      geneticTraits: ['energy-organisms'],
    }),
  species(PLANET_ID, 'cosmos_void_grass', 'Rumput Hampa', 'producer', ['crystal-fields', 'meteor-craters'],
    [food('sunlight', 1), food('nutrients', 0.3)], {
      habitatPreferences: [CRYSTAL_HABITAT], reproductionRate: 0.14, environmentalTolerance: 30,
      geneticTraits: ['gravity-zones'],
    }),
  species(PLANET_ID, 'cosmos_nebula_tree', 'Pohon Nebula', 'producer', ['nebula-valleys', 'meteor-craters'],
    [food('sunlight', 1)], {
      habitatPreferences: [NEBULA_HABITAT], lifespan: 420, populationCapacity: 100,
      geneticTraits: ['crystal-storage'],
    }),

  species(PLANET_ID, 'cosmos_crystal_grazer', 'Penggembala Kristal', 'primary-consumer', ['crystal-fields', 'cosmic-plains'],
    [food('cosmos_void_grass', 1, ['grazing']), food('cosmos_star_bloom', 0.4, ['grazing'])], {
      habitatPreferences: [CRYSTAL_HABITAT], migrationBehavior: 'nomadic', populationCapacity: 56,
      predatorSpecies: ['cosmos_void_panther'],
    }),
  species(PLANET_ID, 'cosmos_star_rabbit', 'Kelinci Bintang', 'primary-consumer', ['cosmic-plains', 'nebula-valleys'],
    [food('cosmos_star_bloom', 1, ['grazing'])], {
      habitatPreferences: [PLAIN_HABITAT], activitySchedule: 'cathemeral', reproductionRate: 0.1,
      predatorSpecies: ['cosmos_astral_hawk', 'cosmos_void_panther'], populationCapacity: 74,
    }),
  species(PLANET_ID, 'cosmos_nebula_stag', 'Rusa Nebula', 'primary-consumer', ['nebula-valleys', 'meteor-craters'],
    [food('cosmos_nebula_tree', 0.9, ['grazing']), food('cosmos_star_bloom', 0.5, ['grazing'])], {
      habitatPreferences: [NEBULA_HABITAT], migrationBehavior: 'seasonal', populationCapacity: 38,
      predatorSpecies: ['cosmos_void_panther'], rarity: 'uncommon',
    }),
  species(PLANET_ID, 'cosmos_comet_moth', 'Ngengat Komet', 'pollinator', ['nebula-valleys', 'cosmic-plains'],
    [food('cosmos_star_bloom', 1, ['pollination']), food('nectar', 0.4, ['pollination'])], {
      habitatPreferences: [NEBULA_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'nomadic',
      lifespan: 90, populationCapacity: 96, geneticTraits: ['cosmic-anomaly'],
    }),
  species(PLANET_ID, 'cosmos_astral_hawk', 'Elang Astral', 'tertiary-consumer', ['cosmic-plains', 'nebula-valleys'],
    [food('cosmos_star_rabbit', 1, ['hunting']), food('cosmos_comet_moth', 0.5, ['hunting'])], {
      habitatPreferences: [PLAIN_HABITAT], migrationBehavior: 'nomadic', rarity: 'rare',
      preySpecies: ['cosmos_star_rabbit'], populationCapacity: 12,
    }),
  species(PLANET_ID, 'cosmos_void_panther', 'Panther Hampa', 'apex-predator', ['crystal-fields', 'nebula-valleys', 'meteor-craters'],
    [food('cosmos_crystal_grazer', 0.9, ['hunting']), food('cosmos_nebula_stag', 0.7, ['hunting'])], {
      habitatPreferences: [CRYSTAL_HABITAT], activitySchedule: 'nocturnal', rarity: 'rare',
      preySpecies: ['cosmos_crystal_grazer', 'cosmos_nebula_stag'], populationCapacity: 7,
    }),

  species(PLANET_ID, 'cosmos_void_fungi', 'Jamur Hampa', 'decomposer', ['meteor-craters', 'crystal-fields', 'nebula-valleys'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [CRYSTAL_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      environmentalTolerance: 34, populationCapacity: 72, reproductionRate: 0.08,
      geneticTraits: ['energy-recycling'],
    }),
];

export const cosmosConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Cosmos',
  subtitle: 'Dunia kristal di lembah nebula',
  biomeTags: ['crystal-fields', 'cosmic-plains', 'nebula-valleys', 'meteor-craters'],
  climate: {
    baseTemperature: 8,
    baseHumidity: 38,
    baseWater: 34,
    variability: 0.52,
    seasons: [
      { id: 'luminous-phase', name: 'Fase Cahaya', durationTicks: 90, temperatureModifier: 5, humidityModifier: 8, waterModifier: 10, vegetationModifier: 0.3, migrationModifier: 0.25 },
      { id: 'crystal-resonance', name: 'Resonansi Kristal', durationTicks: 85, temperatureModifier: 2, humidityModifier: -4, waterModifier: -4, vegetationModifier: 0.15, migrationModifier: 0.1 },
      { id: 'void-tide', name: 'Pasang Hampa', durationTicks: 80, temperatureModifier: -9, humidityModifier: -12, waterModifier: -12, vegetationModifier: -0.3, migrationModifier: -0.4 },
      { id: 'meteor-shower', name: 'Hujan Meteor', durationTicks: 75, temperatureModifier: -3, humidityModifier: 6, waterModifier: 8, vegetationModifier: -0.1, migrationModifier: 0.35 },
    ],
    hazards: ['hujan-meteor', 'anomali-gravitasi', 'badai-radiasi'],
  },
  terrain: { amplitude: 28, frequency: 0.065, ridge: 0.55, seaLevel: 8 },
  startingEnvironment: {
    temperature: 8, water: 36, humidity: 38, oxygen: 56,
    fertility: 42, biodiversity: 52, energy: 84, stability: 54,
  },
  flora: ['cosmos_star_bloom', 'cosmos_void_grass', 'cosmos_nebula_tree'],
  fauna: [
    'cosmos_crystal_grazer', 'cosmos_star_rabbit', 'cosmos_nebula_stag',
    'cosmos_comet_moth', 'cosmos_astral_hawk', 'cosmos_void_panther',
  ],
  decomposers: ['cosmos_void_fungi'],
  species: SPECIES,
  foodWeb: [
    link('cosmos_crystal_grazer', 'cosmos_void_grass', 'grazing', 0.9, 'Penggembala kristal memakan rumput hampa'),
    link('cosmos_star_rabbit', 'cosmos_star_bloom', 'grazing', 0.85, 'Kelinci bintang memakan bintang mekar'),
    link('cosmos_nebula_stag', 'cosmos_nebula_tree', 'grazing', 0.8, 'Rusa nebula memakan daun pohon nebula'),
    link('cosmos_comet_moth', 'cosmos_star_bloom', 'pollination', 0.9, 'Ngengat komet menyerbuki bintang mekar'),
    link('cosmos_astral_hawk', 'cosmos_star_rabbit', 'hunting', 0.85, 'Elang astral menyambar kelinci bintang'),
    link('cosmos_void_panther', 'cosmos_crystal_grazer', 'hunting', 0.8, 'Panther hampa berburu penggembala kristal'),
    link('cosmos_void_panther', 'cosmos_nebula_stag', 'hunting', 0.65, 'Panther hampa menyerang rusa nebula'),
    link('cosmos_void_fungi', 'cosmos_nebula_tree', 'decomposition', 0.75, 'Jamur hampa mengurai kayu nebula'),
    link('cosmos_void_fungi', 'cosmos_void_panther', 'decomposition', 0.6, 'Jamur hampa mengurai bangkai panther'),
    link('cosmos_star_bloom', 'cosmos_void_fungi', 'symbiosis', 0.55, 'Bintang mekar menyerap energi dari jamur hampa'),
  ],
  specialSystems: [
    'energy-organisms', 'crystal-storage', 'cosmic-anomaly',
    'gravity-zones', 'alien-food-web',
  ],
  palette: {
    background: 0x080616, primary: 0x8f7ce8, secondary: 0x4ad0c0,
    accent: 0xf2e07a, water: 0x2b3f8a,
  },
};
