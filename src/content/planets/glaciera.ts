import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'glaciere';

const SNOW_HABITAT = habitat(['snow-fields', 'glaciers'], {
  temperature: range(-16, 9),
  humidity: range(58, 18),
  water: range(54, 22),
  vegetation: range(24, 16),
  fertility: range(26, 16),
});

const ICE_MOUNTAIN_HABITAT = habitat(['ice-mountains', 'glaciers'], {
  temperature: range(-22, 10),
  humidity: range(48, 18),
  water: range(46, 20),
  vegetation: range(14, 12),
});

const FROZEN_LAKE_HABITAT = habitat(['frozen-lakes', 'glaciers'], {
  temperature: range(-6, 5),
  humidity: range(70, 14),
  water: range(86, 12),
  vegetation: range(18, 14),
  aquatic: true,
  depth: range(24, 18),
  dissolvedOxygen: range(9, 2),
});

const SPECIES = [
  species(PLANET_ID, 'glaciere_arctic_moss', 'Lumut Arktik', 'producer', ['snow-fields', 'glaciers'],
    [food('sunlight', 1)], {
      habitatPreferences: [SNOW_HABITAT], environmentalTolerance: 30, lifespan: 260,
      geneticTraits: ['freeze-tolerance'],
    }),
  species(PLANET_ID, 'glaciere_ice_grass', 'Rumput Es', 'producer', ['frozen-lakes', 'snow-fields'],
    [food('sunlight', 1)], {
      habitatPreferences: [FROZEN_LAKE_HABITAT], lifespan: 140, reproductionRate: 0.12,
      geneticTraits: ['cold-dormancy'],
    }),
  species(PLANET_ID, 'glaciere_frozen_pine', 'Pinus Beku', 'producer', ['ice-mountains', 'glaciers'],
    [food('sunlight', 1)], {
      habitatPreferences: [ICE_MOUNTAIN_HABITAT], lifespan: 420, environmentalTolerance: 32,
    }),

  species(PLANET_ID, 'glaciere_reindeer', 'Rusa Kutub', 'primary-consumer', ['snow-fields', 'ice-mountains'],
    [food('glaciere_arctic_moss', 1, ['grazing']), food('glaciere_frozen_pine', 0.4, ['grazing'])], {
      habitatPreferences: [SNOW_HABITAT], migrationBehavior: 'seasonal', predatorSpecies: ['glaciere_polar_bear'],
      populationCapacity: 52, environmentalTolerance: 28,
    }),
  species(PLANET_ID, 'glaciere_arctic_hare', 'Kelinci Arktik', 'primary-consumer', ['snow-fields', 'glaciers'],
    [food('glaciere_ice_grass', 1, ['grazing']), food('glaciere_arctic_moss', 0.6, ['grazing'])], {
      habitatPreferences: [SNOW_HABITAT], activitySchedule: 'cathemeral', predatorSpecies: ['glaciere_arctic_fox', 'glaciere_snow_owl'],
      reproductionRate: 0.1, populationCapacity: 78,
    }),
  species(PLANET_ID, 'glaciere_musk_ox', 'Sapi Musk', 'primary-consumer', ['snow-fields', 'ice-mountains'],
    [food('glaciere_arctic_moss', 0.9, ['grazing']), food('glaciere_frozen_pine', 0.5, ['grazing'])], {
      habitatPreferences: [ICE_MOUNTAIN_HABITAT], migrationBehavior: 'nomadic', predatorSpecies: ['glaciere_polar_bear'],
      populationCapacity: 30, environmentalTolerance: 30,
    }),
  species(PLANET_ID, 'glaciere_ice_fish', 'Ikan Es', 'primary-consumer', ['frozen-lakes'],
    [food('plankton', 1, ['grazing']), food('glaciere_ice_grass', 0.3, ['grazing'])], {
      habitatPreferences: [FROZEN_LAKE_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      predatorSpecies: ['glaciere_seal'], populationCapacity: 88,
    }),

  species(PLANET_ID, 'glaciere_arctic_fox', 'Rubah Arktik', 'secondary-consumer', ['snow-fields', 'ice-mountains'],
    [food('glaciere_arctic_hare', 1, ['hunting'])], {
      habitatPreferences: [SNOW_HABITAT], preySpecies: ['glaciere_arctic_hare'],
      migrationBehavior: 'nomadic', activitySchedule: 'crepuscular', populationCapacity: 28,
    }),
  species(PLANET_ID, 'glaciere_seal', 'Anjing Laut Es', 'secondary-consumer', ['frozen-lakes', 'glaciers'],
    [food('glaciere_ice_fish', 1, ['hunting'])], {
      habitatPreferences: [FROZEN_LAKE_HABITAT], migrationBehavior: 'seasonal',
      activitySchedule: 'cathemeral', preySpecies: ['glaciere_ice_fish'], predatorSpecies: ['glaciere_polar_bear'],
      populationCapacity: 36,
    }),
  species(PLANET_ID, 'glaciere_snow_owl', 'Burung Hantu Salju', 'tertiary-consumer', ['snow-fields', 'ice-mountains'],
    [food('glaciere_arctic_hare', 0.9, ['hunting']), food('glaciere_arctic_fox', 0.3, ['hunting'])], {
      habitatPreferences: [SNOW_HABITAT], activitySchedule: 'nocturnal', rarity: 'uncommon',
      preySpecies: ['glaciere_arctic_hare'], populationCapacity: 14,
    }),

  species(PLANET_ID, 'glaciere_polar_bear', 'Beruang Kutub', 'apex-predator', ['snow-fields', 'frozen-lakes', 'glaciers'],
    [food('glaciere_seal', 1, ['hunting']), food('glaciere_musk_ox', 0.4, ['hunting'])], {
      habitatPreferences: [FROZEN_LAKE_HABITAT], preySpecies: ['glaciere_seal', 'glaciere_musk_ox'],
      migrationBehavior: 'nomadic', rarity: 'rare', populationCapacity: 8, lifespan: 300,
    }),
  species(PLANET_ID, 'glaciere_cold_fungi', 'Jamur Dingin', 'decomposer', ['glaciers', 'snow-fields', 'frozen-lakes'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [SNOW_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      environmentalTolerance: 34, populationCapacity: 70, reproductionRate: 0.06,
    }),
];

export const glaciereConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Glaciera',
  subtitle: 'Dunia es abadi dan danau beku',
  biomeTags: ['snow-fields', 'ice-mountains', 'frozen-lakes', 'glaciers'],
  climate: {
    baseTemperature: -14,
    baseHumidity: 58,
    baseWater: 62,
    variability: 0.48,
    seasons: [
      { id: 'polar-night', name: 'Malam Kutub', durationTicks: 37, temperatureModifier: -12, humidityModifier: -8, waterModifier: 8, vegetationModifier: -0.35, migrationModifier: -0.4 },
      { id: 'thaw', name: 'Musim Cair', durationTicks: 27, temperatureModifier: 6, humidityModifier: 14, waterModifier: 20, vegetationModifier: 0.3, migrationModifier: 0.35 },
      { id: 'short-summer', name: 'Musim Panas Singkat', durationTicks: 23, temperatureModifier: 10, humidityModifier: 8, waterModifier: 12, vegetationModifier: 0.4, migrationModifier: 0.3 },
      { id: 'freeze-up', name: 'Musim Pembekuan', durationTicks: 33, temperatureModifier: -9, humidityModifier: -4, waterModifier: -10, vegetationModifier: -0.25, migrationModifier: -0.2 },
    ],
    hazards: ['badai-salju', 'pencairan-glasial', 'gelombang-dingin-ekstrem'],
  },
  terrain: { amplitude: 30, frequency: 0.05, ridge: 0.62, seaLevel: 10 },
  startingEnvironment: {
    temperature: -14, water: 64, humidity: 56, oxygen: 70,
    fertility: 32, biodiversity: 48, energy: 46, stability: 58,
  },
  flora: ['glaciere_arctic_moss', 'glaciere_ice_grass', 'glaciere_frozen_pine'],
  fauna: [
    'glaciere_reindeer', 'glaciere_arctic_hare', 'glaciere_musk_ox', 'glaciere_ice_fish',
    'glaciere_arctic_fox', 'glaciere_snow_owl', 'glaciere_seal', 'glaciere_polar_bear',
  ],
  decomposers: ['glaciere_cold_fungi'],
  species: SPECIES,
  foodWeb: [
    link('glaciere_reindeer', 'glaciere_arctic_moss', 'grazing', 0.9, 'Rusa kutub menggali lumut di bawah salju'),
    link('glaciere_reindeer', 'glaciere_frozen_pine', 'grazing', 0.35, 'Rusa kutub memakan ranting pinus beku'),
    link('glaciere_arctic_hare', 'glaciere_ice_grass', 'grazing', 0.85, 'Kelinci arktik memakan rumput es'),
    link('glaciere_musk_ox', 'glaciere_arctic_moss', 'grazing', 0.8, 'Sapi musk merumputi lumut arktik'),
    link('glaciere_ice_fish', 'glaciere_ice_grass', 'grazing', 0.4, 'Ikan es memakan tumbuhan danau beku'),
    link('glaciere_arctic_fox', 'glaciere_arctic_hare', 'hunting', 0.9, 'Rubah arktik berburu kelinci salju'),
    link('glaciere_snow_owl', 'glaciere_arctic_hare', 'hunting', 0.85, 'Burung hantu salju menyambar kelinci'),
    link('glaciere_seal', 'glaciere_ice_fish', 'hunting', 0.9, 'Anjing laut menangkap ikan di celah es'),
    link('glaciere_polar_bear', 'glaciere_seal', 'hunting', 0.95, 'Beruang kutub berburu anjing laut'),
    link('glaciere_polar_bear', 'glaciere_musk_ox', 'hunting', 0.3, 'Beruang kutub memakan sapi musk yang lemah'),
    link('glaciere_cold_fungi', 'glaciere_frozen_pine', 'decomposition', 0.7, 'Jamur dingin mengurai kayu pinus beku'),
    link('glaciere_cold_fungi', 'glaciere_reindeer', 'decomposition', 0.6, 'Jamur dingin mengurai bangkai rusa kutub'),
  ],
  specialSystems: [
    'freeze-thaw', 'seasonal-migration', 'ice-habitat-loss',
    'temperature-survival', 'frozen-aquatic',
  ],
  palette: {
    background: 0x0b1622, primary: 0xbcd8e8, secondary: 0x7fa8c9,
    accent: 0x9ad7ef, water: 0x3a7fa5,
  },
  aquatic: { depth: 60, dissolvedOxygen: 9.2, waterQuality: 90, current: 0.18, reefCoverage: 2 },
};
