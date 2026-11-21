import { food, habitat, link, range, species } from '../../sim/eco/factory';
import type { PlanetConfig } from '../../sim/eco/types';

const PLANET_ID = 'aquaria';

const REEF_HABITAT = habitat(['coral-reefs', 'shallow-water'], {
  temperature: range(26, 5),
  humidity: range(80, 12),
  water: range(92, 8),
  vegetation: range(60, 20),
  aquatic: true,
  depth: range(12, 10),
  dissolvedOxygen: range(7, 2),
});

const DEEP_HABITAT = habitat(['deep-ocean'], {
  temperature: range(14, 6),
  humidity: range(86, 10),
  water: range(98, 4),
  vegetation: range(16, 14),
  aquatic: true,
  depth: range(180, 120),
  dissolvedOxygen: range(6, 2),
});

const COAST_HABITAT = habitat(['beach', 'mangroves', 'tropical-islands'], {
  temperature: range(28, 6),
  humidity: range(82, 12),
  water: range(84, 14),
  vegetation: range(66, 22),
  aquatic: true,
  depth: range(6, 5),
  dissolvedOxygen: range(8, 2),
});

const SPECIES = [
  species(PLANET_ID, 'aquaria_kelp', 'Rumput Laut Raksasa', 'producer', ['deep-ocean', 'shallow-water'],
    [food('sunlight', 1)], {
      habitatPreferences: [REEF_HABITAT], lifespan: 240, populationCapacity: 160,
      geneticTraits: ['current-anchoring'],
    }),
  species(PLANET_ID, 'aquaria_seagrass', 'Padang Rumput Laut', 'producer', ['shallow-water', 'beach'],
    [food('sunlight', 1)], {
      habitatPreferences: [COAST_HABITAT], reproductionRate: 0.16, populationCapacity: 170,
    }),
  species(PLANET_ID, 'aquaria_coral_algae', 'Alga Karang', 'producer', ['coral-reefs', 'shallow-water'],
    [food('sunlight', 1), food('nutrients', 0.4)], {
      habitatPreferences: [REEF_HABITAT], lifespan: 300, environmentalTolerance: 14,
      geneticTraits: ['reef-building'],
    }),
  species(PLANET_ID, 'aquaria_mangrove', 'Pohon Mangrove', 'producer', ['mangroves', 'beach', 'tropical-islands'],
    [food('sunlight', 1), food('water', 0.6)], {
      habitatPreferences: [COAST_HABITAT], lifespan: 380, populationCapacity: 110,
      geneticTraits: ['salt-filter'],
    }),

  species(PLANET_ID, 'aquaria_reef_fish', 'Ikan Terumbu', 'primary-consumer', ['coral-reefs', 'shallow-water'],
    [food('plankton', 1, ['grazing']), food('aquaria_coral_algae', 0.5, ['grazing'])], {
      habitatPreferences: [REEF_HABITAT], migrationBehavior: 'none', activitySchedule: 'diurnal',
      predatorSpecies: ['aquaria_shark', 'aquaria_octopus', 'aquaria_dolphin'], populationCapacity: 140,
    }),
  species(PLANET_ID, 'aquaria_sea_turtle', 'Penyu Laut', 'primary-consumer', ['coral-reefs', 'shallow-water', 'beach'],
    [food('aquaria_seagrass', 1, ['grazing']), food('aquaria_coral_algae', 0.6, ['grazing'])], {
      habitatPreferences: [COAST_HABITAT], migrationBehavior: 'seasonal', lifespan: 360,
      predatorSpecies: ['aquaria_shark'], populationCapacity: 28, rarity: 'uncommon',
    }),
  species(PLANET_ID, 'aquaria_manatee', 'Manatee', 'primary-consumer', ['mangroves', 'shallow-water'],
    [food('aquaria_seagrass', 1, ['grazing']), food('aquaria_mangrove', 0.35, ['grazing'])], {
      habitatPreferences: [COAST_HABITAT], migrationBehavior: 'seasonal', activitySchedule: 'cathemeral',
      populationCapacity: 22, rarity: 'uncommon',
    }),
  species(PLANET_ID, 'aquaria_crab', 'Kepiting Karang', 'secondary-consumer', ['coral-reefs', 'beach', 'mangroves'],
    [food('aquaria_coral_algae', 0.6, ['grazing']), food('detritus', 0.5, ['scavenging'])], {
      habitatPreferences: [REEF_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'none',
      predatorSpecies: ['aquaria_octopus', 'aquaria_sea_turtle'], populationCapacity: 80,
      geneticTraits: ['current-anchoring'], reproductionRate: 0.09, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'aquaria_octopus', 'Gurita Karang', 'secondary-consumer', ['coral-reefs', 'deep-ocean'],
    [food('aquaria_crab', 1, ['hunting']), food('aquaria_reef_fish', 0.6, ['hunting'])], {
      habitatPreferences: [REEF_HABITAT], activitySchedule: 'nocturnal', migrationBehavior: 'none',
      preySpecies: ['aquaria_crab', 'aquaria_reef_fish'], populationCapacity: 26,
      geneticTraits: ['current-anchoring'], reproductionRate: 0.1, mortalityRate: 0.012,
    }),
  species(PLANET_ID, 'aquaria_dolphin', 'Lumba-Lumba', 'tertiary-consumer', ['shallow-water', 'deep-ocean', 'coral-reefs'],
    [food('aquaria_reef_fish', 1, ['hunting']), food('aquaria_octopus', 0.4, ['hunting'])], {
      habitatPreferences: [DEEP_HABITAT], migrationBehavior: 'nomadic', activitySchedule: 'cathemeral',
      preySpecies: ['aquaria_reef_fish'], populationCapacity: 16, rarity: 'uncommon',
    }),
  species(PLANET_ID, 'aquaria_shark', 'Hiu Karang', 'apex-predator', ['deep-ocean', 'coral-reefs', 'shallow-water'],
    [food('aquaria_reef_fish', 0.9, ['hunting']), food('aquaria_sea_turtle', 0.5, ['hunting'])], {
      habitatPreferences: [DEEP_HABITAT], migrationBehavior: 'nomadic', preySpecies: ['aquaria_reef_fish', 'aquaria_sea_turtle'],
      populationCapacity: 8, rarity: 'rare', lifespan: 320,
    }),

  species(PLANET_ID, 'aquaria_marine_bacteria', 'Bakteri Laut', 'microorganism', ['deep-ocean', 'coral-reefs', 'shallow-water', 'mangroves'],
    [food('detritus', 1, ['decomposition'])], {
      habitatPreferences: [DEEP_HABITAT], migrationBehavior: 'none', activitySchedule: 'cathemeral',
      populationCapacity: 200, reproductionRate: 0.2, geneticTraits: ['nutrient-recycling'],
    }),
];

export const aquariaConfig: PlanetConfig = {
  id: PLANET_ID,
  name: 'Aquaria',
  subtitle: 'Dunia samudra dengan terumbu yang berkilau',
  biomeTags: ['deep-ocean', 'tropical-islands', 'coral-reefs', 'beach', 'shallow-water', 'mangroves'],
  climate: {
    baseTemperature: 25,
    baseHumidity: 84,
    baseWater: 92,
    variability: 0.28,
    seasons: [
      { id: 'calm-current', name: 'Musim Arus Tenang', durationTicks: 33, temperatureModifier: 1, humidityModifier: 4, waterModifier: 6, vegetationModifier: 0.2, migrationModifier: 0.1 },
      { id: 'warm-water', name: 'Musim Air Hangat', durationTicks: 32, temperatureModifier: 5, humidityModifier: 8, waterModifier: 4, vegetationModifier: 0.15, migrationModifier: 0.25 },
      { id: 'plankton-bloom', name: 'Musim Ledakan Plankton', durationTicks: 27, temperatureModifier: -1, humidityModifier: 6, waterModifier: 10, vegetationModifier: 0.3, migrationModifier: 0.3 },
      { id: 'storm-surge', name: 'Musim Badai Laut', durationTicks: 28, temperatureModifier: -4, humidityModifier: 10, waterModifier: 14, vegetationModifier: -0.2, migrationModifier: -0.25 },
    ],
    hazards: ['badai-laut', 'pemutihan-karang', 'gelombang-panas-laut'],
  },
  terrain: { amplitude: 14, frequency: 0.04, ridge: 0.2, seaLevel: 26 },
  startingEnvironment: {
    temperature: 25, water: 92, humidity: 84, oxygen: 74,
    fertility: 64, biodiversity: 82, energy: 70, stability: 76,
  },
  flora: ['aquaria_kelp', 'aquaria_seagrass', 'aquaria_coral_algae', 'aquaria_mangrove'],
  fauna: [
    'aquaria_reef_fish', 'aquaria_sea_turtle', 'aquaria_manatee', 'aquaria_crab',
    'aquaria_octopus', 'aquaria_dolphin', 'aquaria_shark',
  ],
  decomposers: ['aquaria_marine_bacteria'],
  species: SPECIES,
  foodWeb: [
    link('aquaria_reef_fish', 'aquaria_coral_algae', 'grazing', 0.7, 'Ikan terumbu memakan alga karang'),
    link('aquaria_sea_turtle', 'aquaria_seagrass', 'grazing', 0.9, 'Penyu merumputi padang rumput laut'),
    link('aquaria_manatee', 'aquaria_mangrove', 'grazing', 0.4, 'Manatee memakan daun mangrove muda'),
    link('aquaria_crab', 'aquaria_coral_algae', 'grazing', 0.55, 'Kepiting karang memakan alga'),
    link('aquaria_octopus', 'aquaria_crab', 'hunting', 0.9, 'Gurita berburu kepiting karang'),
    link('aquaria_octopus', 'aquaria_reef_fish', 'hunting', 0.6, 'Gurita menyergap ikan terumbu'),
    link('aquaria_dolphin', 'aquaria_reef_fish', 'hunting', 0.8, 'Lumba-lumba menangkap ikan terumbu'),
    link('aquaria_shark', 'aquaria_reef_fish', 'hunting', 0.85, 'Hiu memangsa ikan terumbu'),
    link('aquaria_shark', 'aquaria_sea_turtle', 'hunting', 0.4, 'Hiu menyerang penyu yang lemah'),
    link('aquaria_marine_bacteria', 'aquaria_kelp', 'decomposition', 0.8, 'Bakteri laut mengurai rumput laut mati'),
    link('aquaria_marine_bacteria', 'aquaria_shark', 'decomposition', 0.6, 'Bakteri laut mengurai bangkai hiu'),
    link('aquaria_coral_algae', 'aquaria_reef_fish', 'symbiosis', 0.6, 'Alga karang dan ikan saling menguntungkan'),
  ],
  specialSystems: [
    'coral-health', 'ocean-food-web', 'plankton-population',
    'water-temperature', 'currents',
  ],
  palette: {
    background: 0x061a2b, primary: 0x2fa4a8, secondary: 0x1e6f8c,
    accent: 0xff9c6e, water: 0x1b7fb3,
  },
  aquatic: { depth: 240, dissolvedOxygen: 7.6, waterQuality: 88, current: 0.55, reefCoverage: 64 },
};
