import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'dune';

const DUNE_HABITAT = habitat(['sand-dunes', 'dry-plains'], {
  temperature: range(34, 8),
  humidity: range(18, 12),
  water: range(16, 12),
  vegetation: range(24, 16),
  fertility: range(28, 16),
});

const OASIS_HABITAT = habitat(['oasis', 'rocky-canyon'], {
  temperature: range(30, 7),
  humidity: range(48, 16),
  water: range(72, 18),
  vegetation: range(58, 22),
});

const ROCK_HABITAT = habitat(['rocky-canyon', 'sand-dunes'], {
  temperature: range(33, 9),
  humidity: range(22, 12),
  water: range(20, 14),
  vegetation: range(18, 14),
});

const SPECIES = [
  species(PLANET_ID, 'dune_cactus', 'Kaktus Gurun', 'producer', ['sand-dunes', 'dry-plains'],
    [food('sunlight', 1), food('water', 0.4)], {
      habitatPreferences: [DUNE_HABITAT], environmentalTolerance: 30, lifespan: 380,
      geneticTraits: ['water-storage', 'spine-defense'],
    }),
  species(PLANET_ID, 'dune_desert_grass', 'Rumput Gurun', 'producer', ['dry-plains', 'sand-dunes'],
    [food('sunlight', 1)], {
      habitatPreferences: [DUNE_HABITAT], reproductionRate: 0.16, lifespan: 80,
      geneticTraits: ['drought-dormancy'],
    }),
  species(PLANET_ID, 'dune_acacia', 'Akasia Gurun', 'producer', ['dry-plains', 'rocky-canyon'],
    [food('sunlight', 1)], {
      habitatPreferences: [ROCK_HABITAT], lifespan: 340, environmentalTolerance: 26,
      geneticTraits: ['deep-roots'],
    }),
  species(PLANET_ID, 'dune_date_palm', 'Pohon Kurma', 'producer', ['oasis'],
    [food('sunlight', 1), food('water', 0.9)], {
      habitatPreferences: [OASIS_HABITAT], lifespan: 400, populationCapacity: 90,
      geneticTraits: ['oasis-dependency'],
    }),

  species(PLANET_ID, 'dune_camel', 'Unta Gurun', 'primary-consumer', ['sand-dunes', 'dry-plains', 'oasis'],
    [food('dune_cactus', 0.8, ['grazing']), food('dune_desert_grass', 1, ['grazing'])], {
      habitatPreferences: [DUNE_HABITAT], waterRequirement: 26, environmentalTolerance: 32,
      migrationBehavior: 'nomadic', activitySchedule: 'crepuscular', populationCapacity: 34,
      geneticTraits: ['fat-reserves'],
    }),
  species(PLANET_ID, 'dune_desert_hare', 'Kelinci Gurun', 'primary-consumer', ['dry-plains', 'sand-dunes'],
    [food('dune_desert_grass', 1, ['grazing']), food('dune_acacia', 0.4, ['grazing'])], {
      habitatPreferences: [DUNE_HABITAT], activitySchedule: 'nocturnal', waterRequirement: 22,
      predatorSpecies: ['dune_fennec_fox', 'dune_snake'], populationCapacity: 70,
    }),
  species(PLANET_ID, 'dune_gazelle', 'Gazel Gurun', 'primary-consumer', ['dry-plains', 'oasis', 'rocky-canyon'],
    [food('dune_acacia', 0.9, ['grazing']), food('dune_desert_grass', 0.7, ['grazing'])], {
      habitatPreferences: [OASIS_HABITAT], migrationBehavior: 'nomadic', waterRequirement: 32,
      predatorSpecies: ['dune_snake', 'dune_vulture'], populationCapacity: 46,
    }),
  species(PLANET_ID, 'dune_lizard', 'Kadal Pasir', 'secondary-consumer', ['sand-dunes', 'rocky-canyon'],
    [food('dune_desert_grass', 0.4, ['grazing']), food('dune_dung_beetle', 0.8, ['hunting'])], {
      habitatPreferences: [ROCK_HABITAT], activitySchedule: 'nocturnal', waterRequirement: 18,
      predatorSpecies: ['dune_fennec_fox', 'dune_snake'], populationCapacity: 55,
    }),
  species(PLANET_ID, 'dune_fennec_fox', 'Rubah Fennec', 'secondary-consumer', ['sand-dunes', 'dry-plains'],
    [food('dune_desert_hare', 1, ['hunting']), food('dune_lizard', 0.7, ['hunting'])], {
      habitatPreferences: [DUNE_HABITAT], activitySchedule: 'nocturnal', preySpecies: ['dune_desert_hare', 'dune_lizard'],
      waterRequirement: 20, populationCapacity: 24,
    }),
  species(PLANET_ID, 'dune_snake', 'Ular Gurun', 'tertiary-consumer', ['rocky-canyon', 'sand-dunes'],
    [food('dune_gazelle', 0.8, ['hunting']), food('dune_lizard', 1, ['hunting'])], {
      habitatPreferences: [ROCK_HABITAT], activitySchedule: 'nocturnal', preySpecies: ['dune_gazelle', 'dune_lizard'],
      populationCapacity: 18, environmentalTolerance: 28,
    }),
  species(PLANET_ID, 'dune_vulture', 'Burung Nasar Gurun', 'apex-predator', ['dry-plains', 'rocky-canyon'],
    [food('dune_gazelle', 0.6, ['scavenging']), food('dune_camel', 0.4, ['scavenging'])], {
      habitatPreferences: [ROCK_HABITAT], migrationBehavior: 'nomadic', rarity: 'uncommon',
      populationCapacity: 9, activitySchedule: 'diurnal',
    }),

  species(PLANET_ID, 'dune_dung_beetle', 'Kumbang Kotoran', 'decomposer', ['dry-plains', 'sand-dunes', 'oasis'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [DUNE_HABITAT], migrationBehavior: 'none', activitySchedule: 'nocturnal',
      populationCapacity: 95, reproductionRate: 0.12,
      geneticTraits: ['water-conservation'],
    }),
];

export const duneConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Dune',
  subtitle: 'Lautan pasir dengan oasis yang langka',
  biomeTags: ['sand-dunes', 'rocky-canyon', 'oasis', 'dry-plains'],
  climate: {
    baseTemperature: 34,
    baseHumidity: 20,
    baseWater: 18,
    variability: 0.55,
    seasons: [
      { id: 'cool-season', name: 'Musim Sejuk', durationTicks: 32, temperatureModifier: -7, humidityModifier: 9, waterModifier: 12, vegetationModifier: 0.2, migrationModifier: 0.3 },
      { id: 'dry-season', name: 'Musim Kering', durationTicks: 43, temperatureModifier: 8, humidityModifier: -12, waterModifier: -14, vegetationModifier: -0.35, migrationModifier: 0.45 },
      { id: 'sandstorm-season', name: 'Musim Badai Pasir', durationTicks: 23, temperatureModifier: 5, humidityModifier: -8, waterModifier: -6, vegetationModifier: -0.25, migrationModifier: -0.3 },
      { id: 'oasis-bloom', name: 'Musim Mekar Oasis', durationTicks: 22, temperatureModifier: -2, humidityModifier: 14, waterModifier: 18, vegetationModifier: 0.3, migrationModifier: 0.2 },
    ],
    hazards: ['badai-pasir', 'kekeringan-ekstrem', 'gelombang-panas'],
  },
  terrain: { amplitude: 26, frequency: 0.045, ridge: 0.5, seaLevel: 4 },
  startingEnvironment: {
    temperature: 34, water: 20, humidity: 22, oxygen: 64,
    fertility: 30, biodiversity: 44, energy: 58, stability: 48,
  },
  flora: ['dune_cactus', 'dune_desert_grass', 'dune_acacia', 'dune_date_palm'],
  fauna: ['dune_camel', 'dune_desert_hare', 'dune_gazelle', 'dune_lizard', 'dune_fennec_fox', 'dune_snake', 'dune_vulture'],
  decomposers: ['dune_dung_beetle'],
  species: SPECIES,
  foodWeb: [
    link('dune_camel', 'dune_cactus', 'grazing', 0.7, 'Unta memakan kaktus saat air langka'),
    link('dune_camel', 'dune_desert_grass', 'grazing', 0.85, 'Unta merumputi rumput gurun'),
    link('dune_desert_hare', 'dune_desert_grass', 'grazing', 0.9, 'Kelinci gurun memakan rumput kering'),
    link('dune_gazelle', 'dune_acacia', 'grazing', 0.8, 'Gazel memakan daun akasia'),
    link('dune_gazelle', 'dune_date_palm', 'grazing', 0.4, 'Gazel memakan buah kurma di oasis'),
    link('dune_lizard', 'dune_dung_beetle', 'hunting', 0.65, 'Kadal memangsa kumbang kotoran'),
    link('dune_fennec_fox', 'dune_desert_hare', 'hunting', 0.9, 'Rubah fennec berburu kelinci gurun'),
    link('dune_fennec_fox', 'dune_lizard', 'hunting', 0.6, 'Rubah fennec memangsa kadal'),
    link('dune_snake', 'dune_gazelle', 'hunting', 0.5, 'Ular gurun menyergap gazel muda'),
    link('dune_snake', 'dune_lizard', 'hunting', 0.8, 'Ular gurun memangsa kadal pasir'),
    link('dune_vulture', 'dune_gazelle', 'scavenging', 0.7, 'Nasar memakan bangkai gazel'),
    link('dune_vulture', 'dune_camel', 'scavenging', 0.45, 'Nasar memakan bangkai unta'),
    link('dune_dung_beetle', 'dune_date_palm', 'decomposition', 0.6, 'Kumbang mengurai sisa buah kurma'),
    link('dune_dung_beetle', 'dune_camel', 'decomposition', 0.8, 'Kumbang mengurai kotoran unta'),
  ],
  specialSystems: [
    'water-scarcity', 'oasis-dependency', 'sandstorm',
    'nocturnal-activity', 'drought-adaptation',
  ],
  palette: {
    background: 0x2a1d12, primary: 0xd9a441, secondary: 0xc97b3c,
    accent: 0x6fb7a1, water: 0x2b8ba0,
  },
};
