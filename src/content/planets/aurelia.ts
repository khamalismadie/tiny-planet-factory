import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'aurelia';

const AUTUMN_HABITAT = habitat(['autumn-forest', 'misty-mountains'], {
  temperature: range(14, 8),
  humidity: range(66, 16),
  water: range(60, 18),
  vegetation: range(74, 18),
  fertility: range(72, 18),
});

const GOLDEN_HABITAT = habitat(['golden-grassland', 'autumn-forest'], {
  temperature: range(17, 8),
  humidity: range(54, 18),
  water: range(52, 20),
  vegetation: range(66, 20),
});

const LAKE_HABITAT = habitat(['seasonal-lakes', 'misty-mountains'], {
  temperature: range(12, 7),
  humidity: range(78, 14),
  water: range(80, 16),
  vegetation: range(46, 20),
  aquatic: true,
  depth: range(10, 8),
  dissolvedOxygen: range(8, 2),
});

const SPECIES = [
  species(PLANET_ID, 'aurelia_golden_maple', 'Maple Keemas', 'producer', ['autumn-forest', 'golden-grassland'],
    [food('sunlight', 1)], {
      habitatPreferences: [AUTUMN_HABITAT], lifespan: 380, populationCapacity: 140,
      geneticTraits: ['leaf-fall'],
    }),
  species(PLANET_ID, 'aurelia_amber_oak', 'Pohon Ek Amber', 'producer', ['autumn-forest', 'misty-mountains'],
    [food('sunlight', 1)], {
      habitatPreferences: [AUTUMN_HABITAT], lifespan: 440, environmentalTolerance: 22,
    }),
  species(PLANET_ID, 'aurelia_autumn_grass', 'Rumput Musim Gugur', 'producer', ['golden-grassland', 'seasonal-lakes'],
    [food('sunlight', 1)], {
      habitatPreferences: [GOLDEN_HABITAT], reproductionRate: 0.15, lifespan: 100,
    }),

  species(PLANET_ID, 'aurelia_squirrel', 'Tupai Emas', 'primary-consumer', ['autumn-forest', 'misty-mountains'],
    [food('aurelia_golden_maple', 0.7, ['grazing']), food('aurelia_amber_oak', 0.6, ['grazing'])], {
      habitatPreferences: [AUTUMN_HABITAT], activitySchedule: 'diurnal', migrationBehavior: 'none',
      predatorSpecies: ['aurelia_red_fox', 'aurelia_forest_owl'], populationCapacity: 88,
      geneticTraits: ['food-storage'],
    }),
  species(PLANET_ID, 'aurelia_deer', 'Kijang Musim Gugur', 'primary-consumer', ['golden-grassland', 'autumn-forest'],
    [food('aurelia_autumn_grass', 1, ['grazing']), food('aurelia_golden_maple', 0.4, ['grazing'])], {
      habitatPreferences: [GOLDEN_HABITAT], migrationBehavior: 'seasonal',
      predatorSpecies: ['aurelia_lynx'], populationCapacity: 54,
    }),
  species(PLANET_ID, 'aurelia_wild_boar', 'Babi Hutan', 'primary-consumer', ['autumn-forest', 'golden-grassland'],
    [food('aurelia_autumn_grass', 0.7, ['grazing']), food('aurelia_amber_oak', 0.5, ['grazing'])], {
      habitatPreferences: [GOLDEN_HABITAT], activitySchedule: 'crepuscular', migrationBehavior: 'nomadic',
      populationCapacity: 40, environmentalTolerance: 26,
    }),
  species(PLANET_ID, 'aurelia_rabbit', 'Kelinci Emas', 'primary-consumer', ['golden-grassland', 'seasonal-lakes'],
    [food('aurelia_autumn_grass', 1, ['grazing'])], {
      habitatPreferences: [LAKE_HABITAT], reproductionRate: 0.12, predatorSpecies: ['aurelia_red_fox', 'aurelia_lynx'],
      populationCapacity: 80,
    }),
  species(PLANET_ID, 'aurelia_red_fox', 'Rubah Merah', 'secondary-consumer', ['autumn-forest', 'golden-grassland'],
    [food('aurelia_rabbit', 1, ['hunting']), food('aurelia_squirrel', 0.6, ['hunting'])], {
      habitatPreferences: [AUTUMN_HABITAT], activitySchedule: 'crepuscular',
      preySpecies: ['aurelia_rabbit', 'aurelia_squirrel'], populationCapacity: 28,
    }),
  species(PLANET_ID, 'aurelia_forest_owl', 'Burung Hantu Hutan', 'tertiary-consumer', ['autumn-forest', 'misty-mountains'],
    [food('aurelia_squirrel', 0.9, ['hunting']), food('aurelia_rabbit', 0.5, ['hunting'])], {
      habitatPreferences: [AUTUMN_HABITAT], activitySchedule: 'nocturnal', rarity: 'uncommon',
      preySpecies: ['aurelia_squirrel'], populationCapacity: 16,
    }),
  species(PLANET_ID, 'aurelia_lynx', 'Lynx Hutan', 'apex-predator', ['misty-mountains', 'autumn-forest'],
    [food('aurelia_deer', 0.9, ['hunting']), food('aurelia_rabbit', 0.6, ['hunting'])], {
      habitatPreferences: [AUTUMN_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'seasonal',
      preySpecies: ['aurelia_deer', 'aurelia_rabbit'], rarity: 'uncommon', populationCapacity: 10,
    }),

  species(PLANET_ID, 'aurelia_leaf_fungi', 'Jamur Daun', 'decomposer', ['autumn-forest', 'golden-grassland', 'seasonal-lakes'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [AUTUMN_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      populationCapacity: 110, reproductionRate: 0.12,
      geneticTraits: ['leaf-litter-digestion'],
    }),
];

export const aureliaConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Aurelia',
  subtitle: 'Hutan musim gugur dengan daun keemasan',
  biomeTags: ['autumn-forest', 'golden-grassland', 'misty-mountains', 'seasonal-lakes'],
  climate: {
    baseTemperature: 14,
    baseHumidity: 66,
    baseWater: 62,
    variability: 0.42,
    seasons: [
      { id: 'spring', name: 'Musim Semi', durationTicks: 85, temperatureModifier: 3, humidityModifier: 10, waterModifier: 12, vegetationModifier: 0.3, migrationModifier: 0.25 },
      { id: 'summer', name: 'Musim Panas', durationTicks: 95, temperatureModifier: 8, humidityModifier: -4, waterModifier: -8, vegetationModifier: 0.2, migrationModifier: 0.15 },
      { id: 'autumn', name: 'Musim Gugur', durationTicks: 90, temperatureModifier: -2, humidityModifier: 6, waterModifier: 4, vegetationModifier: -0.2, migrationModifier: 0.4 },
      { id: 'winter', name: 'Musim Dingin', durationTicks: 90, temperatureModifier: -11, humidityModifier: -6, waterModifier: -6, vegetationModifier: -0.35, migrationModifier: -0.4 },
    ],
    hazards: ['embun-beku', 'kekeringan-musim-panas', 'badai-daun'],
  },
  terrain: { amplitude: 22, frequency: 0.055, ridge: 0.42, seaLevel: 13 },
  startingEnvironment: {
    temperature: 14, water: 62, humidity: 66, oxygen: 76,
    fertility: 74, biodiversity: 74, energy: 64, stability: 72,
  },
  flora: ['aurelia_golden_maple', 'aurelia_amber_oak', 'aurelia_autumn_grass'],
  fauna: [
    'aurelia_squirrel', 'aurelia_deer', 'aurelia_wild_boar', 'aurelia_rabbit',
    'aurelia_red_fox', 'aurelia_lynx', 'aurelia_forest_owl',
  ],
  decomposers: ['aurelia_leaf_fungi'],
  species: SPECIES,
  foodWeb: [
    link('aurelia_squirrel', 'aurelia_golden_maple', 'grazing', 0.8, 'Tupai memakan biji maple keemas'),
    link('aurelia_deer', 'aurelia_autumn_grass', 'grazing', 0.85, 'Kijang merumputi rumput musim gugur'),
    link('aurelia_wild_boar', 'aurelia_amber_oak', 'grazing', 0.5, 'Babi hutan memakan buah ek amber'),
    link('aurelia_rabbit', 'aurelia_autumn_grass', 'grazing', 0.9, 'Kelinci emas memakan rumput kering'),
    link('aurelia_red_fox', 'aurelia_rabbit', 'hunting', 0.9, 'Rubah merah berburu kelinci'),
    link('aurelia_red_fox', 'aurelia_squirrel', 'hunting', 0.55, 'Rubah merah memangsa tupai'),
    link('aurelia_forest_owl', 'aurelia_squirrel', 'hunting', 0.7, 'Burung hantu hutan menangkap tupai'),
    link('aurelia_lynx', 'aurelia_deer', 'hunting', 0.85, 'Lynx berburu kijang di hutan kabut'),
    link('aurelia_leaf_fungi', 'aurelia_golden_maple', 'decomposition', 0.9, 'Jamur daun mengurai daun maple yang gugur'),
    link('aurelia_leaf_fungi', 'aurelia_deer', 'decomposition', 0.6, 'Jamur daun mengurai bangkai kijang'),
    link('aurelia_golden_maple', 'aurelia_squirrel', 'seed-dispersal', 0.7, 'Tupai menyimpan biji maple untuk musim dingin'),
  ],
  specialSystems: [
    'four-seasons', 'leaf-fall', 'food-storage',
    'hibernation', 'seasonal-population',
  ],
  palette: {
    background: 0x1c140d, primary: 0xd98a32, secondary: 0xb4472f,
    accent: 0xf2c85b, water: 0x3f7f8f,
  },
};
