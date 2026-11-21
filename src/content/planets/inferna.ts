import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'inferna';

const LAVA_HABITAT = habitat(['lava-fields', 'obsidian'], {
  temperature: range(78, 20),
  humidity: range(14, 10),
  water: range(12, 10),
  vegetation: range(20, 14),
  fertility: range(34, 18),
});

const ASH_HABITAT = habitat(['ash-plains', 'volcanic-mountains'], {
  temperature: range(60, 18),
  humidity: range(22, 14),
  water: range(20, 14),
  vegetation: range(32, 18),
});

const VOLCANIC_HABITAT = habitat(['volcanic-mountains', 'obsidian'], {
  temperature: range(70, 22),
  humidity: range(16, 12),
  water: range(14, 12),
  vegetation: range(14, 12),
});

const SPECIES = [
  species(PLANET_ID, 'inferna_ember_moss', 'Lumut Bara', 'producer', ['lava-fields', 'obsidian'],
    [food('sunlight', 1), food('nutrients', 0.5)], {
      habitatPreferences: [LAVA_HABITAT], environmentalTolerance: 40, lifespan: 180,
      geneticTraits: ['heat-resistance'], reproductionRate: 0.14,
    }),
  species(PLANET_ID, 'inferna_ash_fern', 'Pakuis Abu', 'producer', ['ash-plains', 'volcanic-mountains'],
    [food('sunlight', 1)], {
      habitatPreferences: [ASH_HABITAT], lifespan: 220, reproductionRate: 0.13,
      geneticTraits: ['ash-deposition-recovery'],
    }),
  species(PLANET_ID, 'inferna_lava_grass', 'Rumput Lava', 'producer', ['lava-fields', 'ash-plains'],
    [food('sunlight', 1)], {
      habitatPreferences: [LAVA_HABITAT], lifespan: 120, reproductionRate: 0.18,
      geneticTraits: ['post-eruption-regrowth'],
    }),

  species(PLANET_ID, 'inferna_ash_grazer', 'Penggembala Abu', 'primary-consumer', ['ash-plains', 'lava-fields'],
    [food('inferna_ash_fern', 1, ['grazing']), food('inferna_lava_grass', 0.6, ['grazing'])], {
      habitatPreferences: [ASH_HABITAT], environmentalTolerance: 36, predatorSpecies: ['inferna_ash_wolf', 'inferna_fire_hawk'],
      populationCapacity: 56,
    }),
  species(PLANET_ID, 'inferna_ember_beetle', 'Kumbang Bara', 'pollinator', ['lava-fields', 'ash-plains'],
    [food('inferna_lava_grass', 1, ['pollination']), food('nectar', 0.4, ['pollination'])], {
      habitatPreferences: [LAVA_HABITAT], activitySchedule: 'crepuscular',
      migrationBehavior: 'nomadic', populationCapacity: 100, reproductionRate: 0.11,
    }),
  species(PLANET_ID, 'inferna_rock_tortoise', 'Kura-Kura Batu', 'primary-consumer', ['obsidian', 'ash-plains'],
    [food('inferna_ember_moss', 1, ['grazing']), food('inferna_ash_fern', 0.4, ['grazing'])], {
      habitatPreferences: [VOLCANIC_HABITAT], activitySchedule: 'nocturnal', lifespan: 420,
      environmentalTolerance: 38, populationCapacity: 26,
    }),
  species(PLANET_ID, 'inferna_magma_lizard', 'Kadal Magma', 'secondary-consumer', ['lava-fields', 'obsidian'],
    [food('inferna_ember_beetle', 1, ['hunting']), food('inferna_ash_grazer', 0.35, ['hunting'])], {
      habitatPreferences: [LAVA_HABITAT], activitySchedule: 'cathemeral',
      environmentalTolerance: 42, preySpecies: ['inferna_ember_beetle'], populationCapacity: 44,
    }),
  species(PLANET_ID, 'inferna_lava_crab', 'Kepiting Lava', 'secondary-consumer', ['lava-fields', 'volcanic-mountains'],
    [food('inferna_ember_moss', 0.8, ['grazing']), food('inferna_rock_tortoise', 0.3, ['scavenging'])], {
      habitatPreferences: [LAVA_HABITAT], activitySchedule: 'nocturnal', populationCapacity: 40,
      geneticTraits: ['heat-shield'],
    }),
  species(PLANET_ID, 'inferna_ash_jackal', 'Serigala Abu', 'tertiary-consumer', ['ash-plains', 'obsidian'],
    [food('inferna_ash_grazer', 1, ['hunting']), food('inferna_rock_tortoise', 0.5, ['hunting'])], {
      habitatPreferences: [ASH_HABITAT], activitySchedule: 'crepuscular',
      preySpecies: ['inferna_ash_grazer'], migrationBehavior: 'nomadic', populationCapacity: 20,
      geneticTraits: ['heat-shield'], reproductionRate: 0.09,
    }),
  species(PLANET_ID, 'inferna_ash_wolf', 'Serigala Abu Besar', 'apex-predator', ['ash-plains', 'volcanic-mountains'],
    [food('inferna_ash_grazer', 0.9, ['hunting']), food('inferna_ash_jackal', 0.5, ['hunting'])], {
      habitatPreferences: [ASH_HABITAT], preySpecies: ['inferna_ash_grazer', 'inferna_ash_jackal'],
      rarity: 'uncommon', populationCapacity: 12,
      geneticTraits: ['heat-resistance'], reproductionRate: 0.07,
    }),
  species(PLANET_ID, 'inferna_fire_hawk', 'Elang Api', 'apex-predator', ['volcanic-mountains', 'lava-fields'],
    [food('inferna_magma_lizard', 1, ['hunting']), food('inferna_lava_crab', 0.6, ['hunting'])], {
      habitatPreferences: [VOLCANIC_HABITAT], preySpecies: ['inferna_magma_lizard', 'inferna_lava_crab'],
      rarity: 'rare', populationCapacity: 8,
      geneticTraits: ['heat-shield'], reproductionRate: 0.18, mortalityRate: 0.01,
    }),

  species(PLANET_ID, 'inferna_heat_fungi', 'Jamur Panas', 'decomposer', ['ash-plains', 'obsidian', 'lava-fields'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [ASH_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      environmentalTolerance: 44, populationCapacity: 76, reproductionRate: 0.09,
      geneticTraits: ['thermophilic-enzymes'],
    }),
];

export const infernaConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Inferna',
  subtitle: 'Dunia gunung berapi dan daratan lava',
  biomeTags: ['lava-fields', 'volcanic-mountains', 'ash-plains', 'obsidian'],
  climate: {
    baseTemperature: 72,
    baseHumidity: 18,
    baseWater: 14,
    variability: 0.65,
    seasons: [
      { id: 'quiet-phase', name: 'Masa Tenang', durationTicks: 100, temperatureModifier: -8, humidityModifier: 6, waterModifier: 8, vegetationModifier: 0.3, migrationModifier: 0.2 },
      { id: 'ash-fall', name: 'Musim Hujan Abu', durationTicks: 75, temperatureModifier: -4, humidityModifier: 10, waterModifier: 4, vegetationModifier: -0.2, migrationModifier: -0.2 },
      { id: 'eruption-phase', name: 'Masa Letusan', durationTicks: 55, temperatureModifier: 16, humidityModifier: -10, waterModifier: -8, vegetationModifier: -0.45, migrationModifier: -0.5 },
      { id: 'regrowth', name: 'Musim Tumbuh Kembali', durationTicks: 90, temperatureModifier: -5, humidityModifier: 8, waterModifier: 12, vegetationModifier: 0.45, migrationModifier: 0.4 },
    ],
    hazards: ['erupsi-gunung-berapi', 'aliran-lava', 'hujan-abu', 'gelombang-panas'],
  },
  terrain: { amplitude: 36, frequency: 0.07, ridge: 0.72, seaLevel: 6 },
  startingEnvironment: {
    temperature: 72, water: 16, humidity: 20, oxygen: 52,
    fertility: 42, biodiversity: 40, energy: 82, stability: 42,
  },
  flora: ['inferna_ember_moss', 'inferna_ash_fern', 'inferna_lava_grass'],
  fauna: [
    'inferna_ash_grazer', 'inferna_ember_beetle', 'inferna_rock_tortoise', 'inferna_magma_lizard',
    'inferna_lava_crab', 'inferna_ash_jackal', 'inferna_ash_wolf', 'inferna_fire_hawk',
  ],
  decomposers: ['inferna_heat_fungi'],
  species: SPECIES,
  foodWeb: [
    link('inferna_ash_grazer', 'inferna_ash_fern', 'grazing', 0.85, 'Penggembala abu memakan pakuis'),
    link('inferna_ash_grazer', 'inferna_lava_grass', 'grazing', 0.6, 'Penggembala abu merumputi rumput lava'),
    link('inferna_rock_tortoise', 'inferna_ember_moss', 'grazing', 0.8, 'Kura-kura batu memakan lumut bara'),
    link('inferna_ember_beetle', 'inferna_lava_grass', 'pollination', 0.8, 'Kumbang bara menyerbuki rumput lava'),
    link('inferna_lava_crab', 'inferna_ember_moss', 'grazing', 0.65, 'Kepiting lava memakan lumut bara'),
    link('inferna_magma_lizard', 'inferna_ember_beetle', 'hunting', 0.8, 'Kadal magma memangsa kumbang bara'),
    link('inferna_ash_jackal', 'inferna_ash_grazer', 'hunting', 0.85, 'Serigala abu berburu penggembala'),
    link('inferna_ash_wolf', 'inferna_ash_jackal', 'hunting', 0.6, 'Serigala abu besar memangsa serigala abu'),
    link('inferna_fire_hawk', 'inferna_magma_lizard', 'hunting', 0.35, 'Elang api menyambar kadal magma'),
    link('inferna_fire_hawk', 'inferna_lava_crab', 'hunting', 0.25, 'Elang api memangsa kepiting lava'),
    link('inferna_heat_fungi', 'inferna_ash_fern', 'decomposition', 0.75, 'Jamur panas mengurai pakuis yang hangus'),
    link('inferna_heat_fungi', 'inferna_ash_wolf', 'decomposition', 0.6, 'Jamur panas mengurai bangkai serigala'),
  ],
  specialSystems: [
    'volcanic-eruption', 'heat-resistance', 'ash-deposition',
    'post-eruption-regeneration', 'dynamic-hazards',
  ],
  palette: {
    background: 0x1a0c0a, primary: 0xd8542a, secondary: 0x8c2f1f,
    accent: 0xffa23a, water: 0x6c2f1a,
  },
};
