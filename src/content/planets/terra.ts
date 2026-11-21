import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'terra';

const FOREST_HABITAT = habitat(['temperate-forest', 'pine-forest'], {
  temperature: range(16, 10),
  humidity: range(72, 32),
  water: range(78, 38),
  vegetation: range(70, 30),
  fertility: range(60, 28),
});

const GRASSLAND_HABITAT = habitat(['grassland', 'temperate-forest'], {
  temperature: range(18, 12),
  humidity: range(60, 32),
  water: range(70, 38),
  vegetation: range(62, 32),
});

const RIVER_HABITAT = habitat(['river', 'lake'], {
  temperature: range(14, 9),
  humidity: range(78, 25),
  water: range(84, 30),
  vegetation: range(60, 35),
  aquatic: true,
  depth: range(6, 5),
  dissolvedOxygen: range(8, 4),
});

const SPECIES = [
  species(PLANET_ID, 'terra_oak', 'Pohon Ek', 'producer', ['temperate-forest', 'grassland'],
    [food('sunlight', 1)], { habitatPreferences: [FOREST_HABITAT], lifespan: 420, populationCapacity: 150 }),
  species(PLANET_ID, 'terra_pine', 'Pinus Hutan', 'producer', ['pine-forest', 'mountain'],
    [food('sunlight', 1)], { habitatPreferences: [FOREST_HABITAT], environmentalTolerance: 24, lifespan: 460 }),
  species(PLANET_ID, 'terra_wildflower', 'Bunga Liar', 'producer', ['grassland', 'temperate-forest'],
    [food('sunlight', 1)], { habitatPreferences: [GRASSLAND_HABITAT], lifespan: 90, reproductionRate: 0.14 }),
  species(PLANET_ID, 'terra_river_reed', 'Alang-Alang Sungai', 'producer', ['river', 'lake', 'beach'],
    [food('sunlight', 1, ['grazing'])], { habitatPreferences: [RIVER_HABITAT], lifespan: 120 }),

  species(PLANET_ID, 'terra_deer', 'Kijang Hutan', 'primary-consumer', ['temperate-forest', 'grassland'],
    [food('terra_oak', 1, ['grazing']), food('terra_wildflower', 0.8, ['grazing'])], {
      habitatPreferences: [GRASSLAND_HABITAT], predatorSpecies: ['terra_wolf', 'terra_fox'],
      preySpecies: [], migrationBehavior: 'seasonal', populationCapacity: 70,
    }),
  species(PLANET_ID, 'terra_rabbit', 'Kelinci Liar', 'primary-consumer', ['grassland', 'temperate-forest'],
    [food('terra_wildflower', 1, ['grazing']), food('terra_river_reed', 0.5, ['grazing'])], {
      habitatPreferences: [GRASSLAND_HABITAT], predatorSpecies: ['terra_fox', 'terra_eagle'],
      reproductionRate: 0.09, populationCapacity: 85,
    }),

  species(PLANET_ID, 'terra_fox', 'Rubah Hutan', 'secondary-consumer', ['temperate-forest', 'grassland'],
    [food('terra_rabbit', 1, ['hunting']), food('terra_deer', 0.3, ['scavenging'])], {
      habitatPreferences: [FOREST_HABITAT], preySpecies: ['terra_rabbit'], predatorSpecies: ['terra_wolf'],
      activitySchedule: 'crepuscular', populationCapacity: 30,
    }),
  species(PLANET_ID, 'terra_fish', 'Ikan Sungai', 'secondary-consumer', ['river', 'lake'],
    [food('terra_river_reed', 0.6, ['grazing']), food('plankton', 0.8, ['grazing'])], {
      habitatPreferences: [RIVER_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      populationCapacity: 90,
    }),

  species(PLANET_ID, 'terra_wolf', 'Serigabus Hutan', 'apex-predator', ['temperate-forest', 'pine-forest', 'mountain'],
    [food('terra_deer', 1, ['hunting']), food('terra_fox', 0.4, ['hunting'])], {
      habitatPreferences: [FOREST_HABITAT], preySpecies: ['terra_deer', 'terra_fox'],
      rarity: 'uncommon', populationCapacity: 14, lifespan: 260,
    }),
  species(PLANET_ID, 'terra_eagle', 'Elang Gunung', 'apex-predator', ['mountain', 'temperate-forest', 'river'],
    [food('terra_rabbit', 1, ['hunting']), food('terra_fish', 0.7, ['hunting'])], {
      habitatPreferences: [RIVER_HABITAT], preySpecies: ['terra_rabbit', 'terra_fish'],
      rarity: 'uncommon', populationCapacity: 10,
    }),

  species(PLANET_ID, 'terra_bee', 'Lebah Madu', 'pollinator', ['grassland', 'temperate-forest'],
    [food('terra_wildflower', 1, ['pollination']), food('nectar', 0.9, ['pollination'])], {
      habitatPreferences: [GRASSLAND_HABITAT], migrationBehavior: 'nomadic',
      lifespan: 70, populationCapacity: 120,
    }),
  species(PLANET_ID, 'terra_mushroom', 'Jamur Pengurai', 'decomposer', ['temperate-forest', 'pine-forest'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [FOREST_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      populationCapacity: 100, reproductionRate: 0.1,
    }),
];

export const terraConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Terra',
  subtitle: 'Dunia hutan hijau dan danau tenang',
  biomeTags: ['temperate-forest', 'pine-forest', 'grassland', 'river', 'lake', 'mountain', 'beach'],
  climate: {
    baseTemperature: 18,
    baseHumidity: 62,
    baseWater: 60,
    variability: 0.35,
    seasons: [
      { id: 'spring', name: 'Musim Semi', durationTicks: 30, temperatureModifier: 2, humidityModifier: 8, waterModifier: 10, vegetationModifier: 0.25, migrationModifier: 0.2 },
      { id: 'summer', name: 'Musim Panas', durationTicks: 33, temperatureModifier: 7, humidityModifier: -6, waterModifier: -12, vegetationModifier: 0.1, migrationModifier: 0.1 },
      { id: 'autumn', name: 'Musim Gugur', durationTicks: 28, temperatureModifier: -3, humidityModifier: 4, waterModifier: 2, vegetationModifier: -0.15, migrationModifier: 0.35 },
      { id: 'winter', name: 'Musim Dingin', durationTicks: 28, temperatureModifier: -9, humidityModifier: -4, waterModifier: 6, vegetationModifier: -0.3, migrationModifier: -0.2 },
    ],
    hazards: ['badai-hujan', 'kekeringan-musiman', 'gelombang-dingin'],
  },
  terrain: { amplitude: 20, frequency: 0.06, ridge: 0.35, seaLevel: 12 },
  startingEnvironment: {
    temperature: 18, water: 62, humidity: 60, oxygen: 78,
    fertility: 68, biodiversity: 72, energy: 66, stability: 74,
  },
  flora: ['terra_oak', 'terra_pine', 'terra_wildflower', 'terra_river_reed'],
  fauna: ['terra_deer', 'terra_rabbit', 'terra_fox', 'terra_fish', 'terra_wolf', 'terra_eagle', 'terra_bee'],
  decomposers: ['terra_mushroom'],
  species: SPECIES,
  foodWeb: [
    link('terra_deer', 'terra_oak', 'grazing', 0.8, 'Kijang memakan daun pohon ek'),
    link('terra_deer', 'terra_wildflower', 'grazing', 0.55, 'Kijang merumput di bunga liar'),
    link('terra_rabbit', 'terra_wildflower', 'grazing', 0.75, 'Kelinci memakan bunga liar'),
    link('terra_rabbit', 'terra_river_reed', 'grazing', 0.4, 'Kelinci memakan alang-alang muda'),
    link('terra_fish', 'terra_river_reed', 'grazing', 0.35, 'Ikan memakan akar alang-alang'),
    link('terra_bee', 'terra_wildflower', 'pollination', 0.9, 'Lebah menyerbuki bunga liar'),
    link('terra_bee', 'terra_oak', 'pollination', 0.4, 'Lebah membantu penyerbukan ek'),
    link('terra_fox', 'terra_rabbit', 'hunting', 0.8, 'Rubah berburu kelinci'),
    link('terra_fox', 'terra_deer', 'scavenging', 0.25, 'Rubah memakan bangkai kijang'),
    link('terra_wolf', 'terra_deer', 'hunting', 0.9, 'Serigala berburu kijang'),
    link('terra_eagle', 'terra_rabbit', 'hunting', 0.7, 'Elang menyambar kelinci'),
    link('terra_eagle', 'terra_fish', 'hunting', 0.5, 'Elang menangkap ikan di danau'),
    link('terra_mushroom', 'terra_oak', 'decomposition', 0.85, 'Jamur menguraikan kayu ek mati'),
    link('terra_mushroom', 'terra_pine', 'decomposition', 0.7, 'Jamur menguraikan serasah pinus'),
  ],
  specialSystems: [
    'forest-regeneration', 'pollination', 'predator-prey-balance',
    'river-lake-ecosystem', 'seasonal-migration',
  ],
  palette: {
    background: 0x0e1b24, primary: 0x4f9d69, secondary: 0x8abf7a,
    accent: 0xe8c86a, water: 0x2f7fa8,
  },
  aquatic: { depth: 18, dissolvedOxygen: 8.4, waterQuality: 82, current: 0.35, reefCoverage: 8 },
};
