import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'mycelia';

const MUSHROOM_HABITAT = habitat(['mushroom-forest', 'spore-fields'], {
  temperature: range(16, 8),
  humidity: range(90, 12),
  water: range(74, 16),
  vegetation: range(70, 20),
  fertility: range(78, 16),
});

const GLOW_HABITAT = habitat(['glowing-plains', 'alien-wetlands'], {
  temperature: range(19, 7),
  humidity: range(88, 14),
  water: range(68, 20),
  vegetation: range(58, 22),
  aquatic: true,
  depth: range(3, 3),
  dissolvedOxygen: range(7, 2),
});

const WETLAND_HABITAT = habitat(['alien-wetlands', 'mushroom-forest'], {
  temperature: range(17, 6),
  humidity: range(96, 8),
  water: range(88, 10),
  vegetation: range(62, 20),
  aquatic: true,
  depth: range(5, 4),
  dissolvedOxygen: range(6, 2),
});

const SPECIES = [
  species(PLANET_ID, 'mycelia_giant_mushroom', 'Jamur Raksasa', 'producer', ['mushroom-forest', 'spore-fields'],
    [food('sunlight', 1), food('nutrients', 0.6)], {
      habitatPreferences: [MUSHROOM_HABITAT], lifespan: 300, populationCapacity: 130,
      geneticTraits: ['bioluminescence'],
    }),
  species(PLANET_ID, 'mycelia_glow_fern', 'Pakuis Bercahaya', 'producer', ['glowing-plains', 'alien-wetlands'],
    [food('sunlight', 1)], {
      habitatPreferences: [GLOW_HABITAT], lifespan: 150, reproductionRate: 0.14,
      geneticTraits: ['day-night-glow'],
    }),
  species(PLANET_ID, 'mycelia_spore_tree', 'Pohon Spora', 'producer', ['mushroom-forest', 'spore-fields', 'glowing-plains'],
    [food('sunlight', 1)], {
      habitatPreferences: [MUSHROOM_HABITAT], lifespan: 380, populationCapacity: 120,
      geneticTraits: ['spore-propagation'],
    }),

  species(PLANET_ID, 'mycelia_spore_deer', 'Kijang Spora', 'primary-consumer', ['mushroom-forest', 'glowing-plains'],
    [food('mycelia_giant_mushroom', 0.9, ['grazing']), food('mycelia_spore_tree', 0.5, ['grazing'])], {
      habitatPreferences: [MUSHROOM_HABITAT], migrationBehavior: 'seasonal',
      predatorSpecies: ['mycelia_night_stalker'], populationCapacity: 50,
      geneticTraits: ['spore-dispersal'], reproductionRate: 0.12, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'mycelia_glow_rabbit', 'Kelinci Bercahaya', 'primary-consumer', ['glowing-plains', 'spore-fields'],
    [food('mycelia_glow_fern', 1, ['grazing'])], {
      habitatPreferences: [GLOW_HABITAT], activitySchedule: 'nocturnal', reproductionRate: 0.11,
      predatorSpecies: ['mycelia_night_stalker', 'mycelia_crystal_spider'], populationCapacity: 76,
    }),
  species(PLANET_ID, 'mycelia_mushroom_grazer', 'Penggembala Jamur', 'primary-consumer', ['mushroom-forest', 'alien-wetlands'],
    [food('mycelia_giant_mushroom', 1, ['grazing']), food('mycelia_glow_fern', 0.35, ['grazing'])], {
      habitatPreferences: [WETLAND_HABITAT], activitySchedule: 'crepuscular', populationCapacity: 58,
      geneticTraits: ['spore-dispersal'], reproductionRate: 0.12, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'mycelia_spore_bat', 'Kelelawar Spora', 'secondary-consumer', ['mushroom-forest', 'spore-fields'],
    [food('plankton', 0.7, ['grazing']), food('mycelia_spore_moth', 0.8, ['hunting'])], {
      habitatPreferences: [MUSHROOM_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'nomadic',
      populationCapacity: 62, geneticTraits: ['echolocation', 'spore-dispersal'], reproductionRate: 0.1, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'mycelia_crystal_spider', 'Laba-Laba Kristal', 'secondary-consumer', ['glowing-plains', 'alien-wetlands'],
    [food('mycelia_glow_rabbit', 0.9, ['hunting']), food('mycelia_spore_moth', 0.5, ['hunting'])], {
      habitatPreferences: [GLOW_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'none',
      preySpecies: ['mycelia_glow_rabbit'], populationCapacity: 30,
      geneticTraits: ['fungal-network'], reproductionRate: 0.12, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'mycelia_spore_moth', 'Ngengat Spora', 'pollinator', ['spore-fields', 'mushroom-forest'],
    [food('mycelia_spore_tree', 1, ['pollination']), food('nectar', 0.5, ['pollination'])], {
      habitatPreferences: [MUSHROOM_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'nomadic',
      lifespan: 80, populationCapacity: 110, geneticTraits: ['spore-dispersal'], reproductionRate: 0.14, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'mycelia_night_stalker', 'Pemburu Malam', 'apex-predator', ['mushroom-forest', 'glowing-plains'],
    [food('mycelia_spore_deer', 0.9, ['hunting']), food('mycelia_glow_rabbit', 0.7, ['hunting'])], {
      habitatPreferences: [MUSHROOM_HABITAT], activitySchedule: 'nocturnal', rarity: 'rare',
      preySpecies: ['mycelia_spore_deer', 'mycelia_glow_rabbit'], populationCapacity: 12,
      geneticTraits: ['fungal-network'], reproductionRate: 0.14, mortalityRate: 0.012,
    }),

  species(PLANET_ID, 'mycelia_network', 'Jaringan Miselium', 'decomposer', ['mushroom-forest', 'alien-wetlands', 'glowing-plains', 'spore-fields'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [WETLAND_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      populationCapacity: 220, reproductionRate: 0.15,
      geneticTraits: ['nutrient-exchange', 'fungal-network'],
    }),
];

export const myceliaConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Mycelia',
  subtitle: 'Dunia jamur bercahaya dan jaringan akar',
  biomeTags: ['mushroom-forest', 'glowing-plains', 'alien-wetlands', 'spore-fields'],
  climate: {
    baseTemperature: 17,
    baseHumidity: 86,
    baseWater: 78,
    variability: 0.32,
    seasons: [
      { id: 'spore-spring', name: 'Musim Spora', durationTicks: 85, temperatureModifier: 2, humidityModifier: 10, waterModifier: 12, vegetationModifier: 0.3, migrationModifier: 0.25 },
      { id: 'glow-summer', name: 'Musim Cahaya', durationTicks: 95, temperatureModifier: 6, humidityModifier: 4, waterModifier: 2, vegetationModifier: 0.2, migrationModifier: 0.15 },
      { id: 'damp-autumn', name: 'Musim Lembap', durationTicks: 90, temperatureModifier: -3, humidityModifier: 12, waterModifier: 14, vegetationModifier: -0.1, migrationModifier: 0.3 },
      { id: 'quiet-winter', name: 'Musim Tenang', durationTicks: 90, temperatureModifier: -8, humidityModifier: -6, waterModifier: -8, vegetationModifier: -0.25, migrationModifier: -0.2 },
    ],
    hazards: ['spora-beracun', 'kelembapan-ekstrem', 'gangguan-jaringan-miselium'],
  },
  terrain: { amplitude: 18, frequency: 0.055, ridge: 0.3, seaLevel: 14 },
  startingEnvironment: {
    temperature: 17, water: 78, humidity: 86, oxygen: 68,
    fertility: 84, biodiversity: 76, energy: 58, stability: 70,
  },
  flora: ['mycelia_giant_mushroom', 'mycelia_glow_fern', 'mycelia_spore_tree'],
  fauna: [
    'mycelia_spore_deer', 'mycelia_glow_rabbit', 'mycelia_mushroom_grazer', 'mycelia_spore_bat',
    'mycelia_crystal_spider', 'mycelia_spore_moth', 'mycelia_night_stalker',
  ],
  decomposers: ['mycelia_network'],
  species: SPECIES,
  foodWeb: [
    link('mycelia_spore_deer', 'mycelia_giant_mushroom', 'grazing', 0.85, 'Kijang spora memakan jamur raksasa'),
    link('mycelia_glow_rabbit', 'mycelia_glow_fern', 'grazing', 0.9, 'Kelinci bercahaya memakan pakuis bercahaya'),
    link('mycelia_mushroom_grazer', 'mycelia_giant_mushroom', 'grazing', 0.8, 'Penggembala jamur memakan tubuh buah jamur'),
    link('mycelia_spore_moth', 'mycelia_spore_tree', 'pollination', 0.85, 'Ngengat spora menyebarkan spora pohon'),
    link('mycelia_crystal_spider', 'mycelia_glow_rabbit', 'hunting', 0.75, 'Laba-laba kristal menjerat kelinci'),
    link('mycelia_spore_bat', 'mycelia_spore_moth', 'hunting', 0.7, 'Kelelawar spora memangsa ngengat'),
    link('mycelia_night_stalker', 'mycelia_spore_deer', 'hunting', 0.85, 'Pemburu malam menyerang kijang spora'),
    link('mycelia_night_stalker', 'mycelia_glow_rabbit', 'hunting', 0.65, 'Pemburu malam memangsa kelinci bercahaya'),
    link('mycelia_network', 'mycelia_spore_tree', 'decomposition', 0.9, 'Miselium mengurai akar pohon spora'),
    link('mycelia_network', 'mycelia_spore_deer', 'decomposition', 0.7, 'Miselium mengurai bangkai kijang spora'),
    link('mycelia_network', 'mycelia_giant_mushroom', 'symbiosis', 0.9, 'Jaringan miselium bertukar nutrisi dengan jamur raksasa'),
  ],
  specialSystems: [
    'fungal-network', 'spore-propagation', 'bioluminescence',
    'nutrient-exchange', 'day-night-glow',
  ],
  palette: {
    background: 0x120f22, primary: 0x8a6cd6, secondary: 0x4fbfa8,
    accent: 0xd7f27a, water: 0x2f6b8a,
  },
};
