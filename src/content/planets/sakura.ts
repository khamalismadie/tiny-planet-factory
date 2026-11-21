import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'sakura';

const CHERRY_HABITAT = habitat(['cherry-forest', 'flower-fields'], {
  temperature: range(20, 7),
  humidity: range(66, 16),
  water: range(62, 18),
  vegetation: range(78, 16),
  fertility: range(70, 18),
});

const SKY_HABITAT = habitat(['floating-islands', 'sky-lakes'], {
  temperature: range(18, 8),
  humidity: range(72, 16),
  water: range(58, 22),
  vegetation: range(52, 22),
  aquatic: true,
  depth: range(8, 7),
  dissolvedOxygen: range(8, 2),
});

const FLOWER_HABITAT = habitat(['flower-fields', 'cherry-forest'], {
  temperature: range(22, 6),
  humidity: range(62, 16),
  water: range(56, 18),
  vegetation: range(80, 14),
});

const SPECIES = [
  species(PLANET_ID, 'sakura_tree', 'Pohon Sakura', 'producer', ['cherry-forest', 'floating-islands'],
    [food('sunlight', 1), food('water', 0.5)], {
      habitatPreferences: [CHERRY_HABITAT], lifespan: 400, populationCapacity: 140,
      geneticTraits: ['blossom-season'],
    }),
  species(PLANET_ID, 'sakura_cloud_grass', 'Rumput Awan', 'producer', ['floating-islands', 'sky-lakes'],
    [food('sunlight', 1)], {
      habitatPreferences: [SKY_HABITAT], reproductionRate: 0.15, lifespan: 120,
      geneticTraits: ['wind-dispersal'],
    }),
  species(PLANET_ID, 'sakura_sky_orchid', 'Anggrek Langit', 'producer', ['flower-fields', 'floating-islands'],
    [food('sunlight', 1)], {
      habitatPreferences: [FLOWER_HABITAT], rarity: 'uncommon', lifespan: 200,
      geneticTraits: ['vertical-growth'],
    }),

  species(PLANET_ID, 'sakura_blossom_deer', 'Kijang Bunga', 'primary-consumer', ['cherry-forest', 'flower-fields'],
    [food('sakura_tree', 0.8, ['grazing']), food('sakura_cloud_grass', 0.6, ['grazing'])], {
      habitatPreferences: [CHERRY_HABITAT], migrationBehavior: 'seasonal',
      predatorSpecies: ['sakura_wind_fox'], populationCapacity: 52,
      geneticTraits: ['blossom-season'], reproductionRate: 0.1, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'sakura_sky_rabbit', 'Kelinci Langit', 'primary-consumer', ['floating-islands', 'flower-fields'],
    [food('sakura_cloud_grass', 1, ['grazing']), food('sakura_sky_orchid', 0.35, ['grazing'])], {
      habitatPreferences: [SKY_HABITAT], migrationBehavior: 'vertical', reproductionRate: 0.14,
      predatorSpecies: ['sakura_wind_fox', 'sakura_sky_hawk'], populationCapacity: 72,
      geneticTraits: ['blossom-season'], mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'sakura_cloud_goat', 'Kambing Awan', 'primary-consumer', ['floating-islands', 'sky-lakes'],
    [food('sakura_cloud_grass', 0.9, ['grazing']), food('sakura_tree', 0.3, ['grazing'])], {
      habitatPreferences: [SKY_HABITAT], migrationBehavior: 'vertical', environmentalTolerance: 30,
      populationCapacity: 40, geneticTraits: ['wind-dispersal'], reproductionRate: 0.16, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'sakura_wind_fox', 'Rubah Angin', 'secondary-consumer', ['cherry-forest', 'floating-islands'],
    [food('sakura_sky_rabbit', 1, ['hunting']), food('sakura_blossom_deer', 0.3, ['hunting'])], {
      habitatPreferences: [CHERRY_HABITAT], migrationBehavior: 'vertical', activitySchedule: 'crepuscular',
      preySpecies: ['sakura_sky_rabbit'], populationCapacity: 24,
      geneticTraits: ['wind-dispersal'], reproductionRate: 0.12, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'sakura_sky_hawk', 'Elang Langit', 'apex-predator', ['floating-islands', 'sky-lakes', 'cherry-forest'],
    [food('sakura_sky_rabbit', 0.9, ['hunting']), food('sakura_cloud_goat', 0.4, ['hunting'])], {
      habitatPreferences: [SKY_HABITAT], migrationBehavior: 'vertical', rarity: 'uncommon',
      preySpecies: ['sakura_sky_rabbit', 'sakura_cloud_goat'], populationCapacity: 16,
      geneticTraits: ['wind-dispersal'], reproductionRate: 0.16, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'sakura_petal_butterfly', 'Kupu-Kupu Kelopak', 'pollinator', ['flower-fields', 'cherry-forest'],
    [food('sakura_sky_orchid', 1, ['pollination']), food('nectar', 0.8, ['pollination'])], {
      habitatPreferences: [FLOWER_HABITAT], migrationBehavior: 'seasonal', lifespan: 70,
      populationCapacity: 120, geneticTraits: ['wind-dispersal'],
    }),
  species(PLANET_ID, 'sakura_hummingbird', 'Burung Kolibri', 'pollinator', ['flower-fields', 'floating-islands'],
    [food('sakura_sky_orchid', 0.9, ['pollination']), food('sakura_tree', 0.5, ['pollination'])], {
      habitatPreferences: [FLOWER_HABITAT], migrationBehavior: 'vertical', activitySchedule: 'diurnal',
      populationCapacity: 60, rarity: 'uncommon',
    }),

  species(PLANET_ID, 'sakura_sky_mushroom', 'Jamur Langit', 'decomposer', ['cherry-forest', 'floating-islands', 'sky-lakes'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [SKY_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      populationCapacity: 80, reproductionRate: 0.1,
    }),
];

export const sakuraConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Sakura',
  subtitle: 'Pulau melayang yang diselimuti bunga',
  biomeTags: ['cherry-forest', 'floating-islands', 'flower-fields', 'sky-lakes'],
  climate: {
    baseTemperature: 20,
    baseHumidity: 68,
    baseWater: 62,
    variability: 0.3,
    seasons: [
      { id: 'blossom-season', name: 'Musim Mekar', durationTicks: 27, temperatureModifier: 3, humidityModifier: 10, waterModifier: 10, vegetationModifier: 0.4, migrationModifier: 0.35 },
      { id: 'petal-fall', name: 'Musim Gugur Kelopak', durationTicks: 25, temperatureModifier: 1, humidityModifier: 4, waterModifier: 2, vegetationModifier: -0.1, migrationModifier: 0.3 },
      { id: 'sky-winds', name: 'Musim Angin Langit', durationTicks: 33, temperatureModifier: -3, humidityModifier: -8, waterModifier: -10, vegetationModifier: -0.2, migrationModifier: -0.35 },
      { id: 'quiet-sky', name: 'Musim Langit Tenang', durationTicks: 35, temperatureModifier: -5, humidityModifier: 6, waterModifier: 8, vegetationModifier: 0.1, migrationModifier: 0.1 },
    ],
    hazards: ['angin-kencang', 'putusnya-pulau-melayang', 'kekeringan-awan'],
  },
  terrain: { amplitude: 34, frequency: 0.075, ridge: 0.58, seaLevel: 16 },
  startingEnvironment: {
    temperature: 20, water: 64, humidity: 68, oxygen: 76,
    fertility: 72, biodiversity: 78, energy: 64, stability: 68,
  },
  flora: ['sakura_tree', 'sakura_cloud_grass', 'sakura_sky_orchid'],
  fauna: [
    'sakura_blossom_deer', 'sakura_sky_rabbit', 'sakura_cloud_goat', 'sakura_wind_fox',
    'sakura_sky_hawk', 'sakura_petal_butterfly', 'sakura_hummingbird',
  ],
  decomposers: ['sakura_sky_mushroom'],
  species: SPECIES,
  foodWeb: [
    link('sakura_blossom_deer', 'sakura_tree', 'grazing', 0.8, 'Kijang bunga memakan daun sakura'),
    link('sakura_sky_rabbit', 'sakura_cloud_grass', 'grazing', 0.85, 'Kelinci langit memakan rumput awan'),
    link('sakura_cloud_goat', 'sakura_sky_orchid', 'grazing', 0.35, 'Kambing awan memakan anggrek langit'),
    link('sakura_petal_butterfly', 'sakura_sky_orchid', 'pollination', 0.9, 'Kupu-kupu kelopak menyerbuki anggrek'),
    link('sakura_hummingbird', 'sakura_tree', 'pollination', 0.7, 'Kolibri menyerbuki bunga sakura'),
    link('sakura_wind_fox', 'sakura_sky_rabbit', 'hunting', 0.85, 'Rubah angin berburu kelinci langit'),
    link('sakura_sky_hawk', 'sakura_cloud_goat', 'hunting', 0.6, 'Elang langit menyambar kambing awan'),
    link('sakura_sky_hawk', 'sakura_sky_rabbit', 'hunting', 0.75, 'Elang langit memangsa kelinci langit'),
    link('sakura_tree', 'sakura_petal_butterfly', 'seed-dispersal', 0.6, 'Kelopak sakura terbawa angin bersama kupu-kupu'),
    link('sakura_sky_mushroom', 'sakura_tree', 'decomposition', 0.8, 'Jamur langit mengurai dahan sakura yang patah'),
    link('sakura_sky_mushroom', 'sakura_blossom_deer', 'decomposition', 0.6, 'Jamur langit mengurai bangkai kijang bunga'),
  ],
  specialSystems: [
    'floating-connectivity', 'wind-dispersal', 'blossom-season',
    'island-migration', 'vertical-ecosystem',
  ],
  palette: {
    background: 0x1b1630, primary: 0xf0a8c8, secondary: 0xa8d8f0,
    accent: 0xffe6a0, water: 0x5aa8cf,
  },
};
