import { aquariaConfig } from './aquaria';
import { aureliaConfig } from './aurelia';
import { duneConfig } from './dune';
import { glaciereConfig } from './glaciera';
import { infernaConfig } from './inferna';
import { myceliaConfig } from './mycelia';
import { sakuraConfig } from './sakura';
import { terraConfig } from './terra';
import type { PlanetConfig } from '../../sim/eco/types';
import type { ObjectType, SpeciesId } from '../../sim/types';

/**
 * Visual fauna are the legacy five species. Each planet maps its own population
 * list onto those guilds so the renderer stays unchanged while ecology expands.
 */
export interface GuildProfile {
  config: PlanetConfig;
  guilds: Record<SpeciesId, readonly string[]>;
  divisors: Record<SpeciesId, number>;
  prey: Partial<Record<SpeciesId, SpeciesId[]>>;
  foodObjects: Record<string, ObjectType[]>;
}

const TERRA_PROFILE: GuildProfile = {
  config: terraConfig,
  guilds: {
    deer: ['terra_deer', 'terra_rabbit'],
    fox: ['terra_fox', 'terra_wolf'],
    bird: ['terra_eagle'],
    fish: ['terra_fish'],
    insect: ['terra_bee'],
  },
  divisors: { deer: 8, fox: 4, bird: 2, fish: 8, insect: 10 },
  prey: { fox: ['deer'], bird: ['fish', 'insect'] },
  foodObjects: {
    terra_oak: ['tree'],
    terra_pine: ['tree'],
    terra_wildflower: ['flower'],
    terra_river_reed: ['grass'],
    terra_deer: ['deer'],
    terra_rabbit: ['deer', 'grass', 'bush'],
    terra_fox: ['fox'],
    terra_wolf: ['fox'],
    terra_fish: ['ocean', 'lake'],
    terra_bee: ['flower'],
  },
};

const DUNE_PROFILE: GuildProfile = {
  config: duneConfig,
  guilds: {
    deer: ['dune_camel', 'dune_desert_hare', 'dune_gazelle'],
    fox: ['dune_fennec_fox', 'dune_snake'],
    bird: ['dune_vulture'],
    fish: [],
    insect: ['dune_lizard', 'dune_dung_beetle'],
  },
  divisors: { deer: 10, fox: 6, bird: 3, fish: 10, insect: 10 },
  prey: { fox: ['deer', 'insect'], bird: ['deer'] },
  foodObjects: {
    dune_cactus: ['sand', 'bush'],
    dune_desert_grass: ['grass', 'sand'],
    dune_acacia: ['tree', 'bush'],
    dune_date_palm: ['tree', 'ocean', 'lake'],
    dune_camel: ['deer', 'bush'],
    dune_desert_hare: ['deer', 'grass'],
    dune_gazelle: ['deer', 'tree'],
    dune_lizard: ['rock', 'sand'],
    dune_dung_beetle: ['rock', 'sand', 'bush'],
    dune_fennec_fox: ['fox', 'sand'],
    dune_snake: ['fox', 'rock'],
    dune_vulture: ['bird', 'rock', 'hill'],
  },
};

const GLACIERE_PROFILE: GuildProfile = {
  config: glaciereConfig,
  guilds: {
    deer: ['glaciere_reindeer', 'glaciere_arctic_hare', 'glaciere_musk_ox'],
    fox: ['glaciere_arctic_fox', 'glaciere_polar_bear'],
    bird: ['glaciere_snow_owl'],
    fish: ['glaciere_ice_fish', 'glaciere_seal'],
    insect: ['glaciere_cold_fungi'],
  },
  divisors: { deer: 10, fox: 6, bird: 3, fish: 8, insect: 10 },
  prey: { fox: ['deer', 'fish'], bird: ['deer'] },
  foodObjects: {
    glaciere_arctic_moss: ['rock', 'sand', 'bush'],
    glaciere_ice_grass: ['grass', 'ocean', 'lake'],
    glaciere_frozen_pine: ['tree', 'mountain'],
    glaciere_reindeer: ['deer', 'bush'],
    glaciere_arctic_hare: ['deer', 'grass'],
    glaciere_musk_ox: ['deer', 'rock'],
    glaciere_ice_fish: ['ocean', 'lake'],
    glaciere_arctic_fox: ['fox', 'rock'],
    glaciere_seal: ['ocean', 'lake'],
    glaciere_snow_owl: ['bird', 'mountain'],
    glaciere_polar_bear: ['fox', 'deer', 'lake'],
    glaciere_cold_fungi: ['rock', 'sand', 'bush'],
  },
};

const INFERNA_PROFILE: GuildProfile = {
  config: infernaConfig,
  guilds: {
    deer: ['inferna_ash_grazer', 'inferna_rock_tortoise'],
    fox: ['inferna_magma_lizard', 'inferna_ash_jackal', 'inferna_ash_wolf'],
    bird: ['inferna_fire_hawk'],
    fish: [],
    insect: ['inferna_ember_beetle', 'inferna_lava_crab', 'inferna_heat_fungi'],
  },
  divisors: { deer: 8, fox: 6, bird: 2, fish: 10, insect: 12 },
  prey: { fox: ['deer', 'insect'], bird: ['insect'] },
  foodObjects: {
    inferna_ember_moss: ['rock', 'sand', 'bush'],
    inferna_ash_fern: ['grass', 'bush'],
    inferna_lava_grass: ['grass', 'sand'],
    inferna_ash_grazer: ['deer', 'grass'],
    inferna_ember_beetle: ['flower', 'bush', 'grass'],
    inferna_rock_tortoise: ['deer', 'rock'],
    inferna_magma_lizard: ['fox', 'rock', 'sand'],
    inferna_lava_crab: ['rock', 'sand', 'bush'],
    inferna_ash_jackal: ['fox', 'deer'],
    inferna_ash_wolf: ['fox', 'deer'],
    inferna_fire_hawk: ['bird', 'mountain'],
    inferna_heat_fungi: ['rock', 'sand', 'bush'],
  },
};

const AQUARIA_PROFILE: GuildProfile = {
  config: aquariaConfig,
  guilds: {
    deer: ['aquaria_sea_turtle', 'aquaria_manatee'],
    fox: ['aquaria_octopus', 'aquaria_shark'],
    bird: ['aquaria_dolphin'],
    fish: ['aquaria_reef_fish', 'aquaria_crab'],
    insect: ['aquaria_marine_bacteria'],
  },
  divisors: { deer: 8, fox: 3, bird: 0.5, fish: 5, insect: 12 },
  prey: { fox: ['fish', 'deer'], bird: ['fish'] },
  foodObjects: {
    aquaria_kelp: ['ocean', 'lake'],
    aquaria_seagrass: ['grass', 'ocean'],
    aquaria_coral_algae: ['ocean', 'lake', 'rock'],
    aquaria_mangrove: ['tree', 'ocean'],
    aquaria_reef_fish: ['ocean', 'lake'],
    aquaria_sea_turtle: ['ocean', 'lake'],
    aquaria_manatee: ['ocean', 'lake'],
    aquaria_crab: ['rock', 'ocean'],
    aquaria_octopus: ['rock', 'ocean'],
    aquaria_dolphin: ['ocean', 'lake'],
    aquaria_shark: ['ocean', 'lake'],
    aquaria_marine_bacteria: ['rock', 'ocean', 'lake'],
  },
};

const MYCELIA_PROFILE: GuildProfile = {
  config: myceliaConfig,
  guilds: {
    deer: ['mycelia_spore_deer', 'mycelia_glow_rabbit', 'mycelia_mushroom_grazer'],
    fox: ['mycelia_night_stalker', 'mycelia_crystal_spider'],
    bird: ['mycelia_spore_bat'],
    fish: [],
    insect: ['mycelia_spore_moth'],
  },
  divisors: { deer: 10, fox: 4, bird: 3, fish: 10, insect: 8 },
  prey: { fox: ['deer', 'insect'], bird: ['insect'] },
  foodObjects: {
    mycelia_giant_mushroom: ['tree', 'bush', 'grass'],
    mycelia_glow_fern: ['grass', 'bush'],
    mycelia_spore_tree: ['tree'],
    mycelia_spore_deer: ['deer', 'bush'],
    mycelia_glow_rabbit: ['deer', 'grass', 'bush'],
    mycelia_mushroom_grazer: ['deer', 'bush'],
    mycelia_spore_bat: ['bird', 'mountain'],
    mycelia_crystal_spider: ['fox', 'rock', 'bush'],
    mycelia_spore_moth: ['flower', 'bush', 'grass'],
    mycelia_night_stalker: ['fox', 'deer', 'tree'],
    mycelia_network: ['rock', 'bush', 'grass'],
  },
};

const SAKURA_PROFILE: GuildProfile = {
  config: sakuraConfig,
  guilds: {
    deer: ['sakura_blossom_deer', 'sakura_sky_rabbit', 'sakura_cloud_goat'],
    fox: ['sakura_wind_fox'],
    bird: ['sakura_sky_hawk', 'sakura_hummingbird'],
    fish: [],
    insect: ['sakura_petal_butterfly'],
  },
  divisors: { deer: 10, fox: 3, bird: 4, fish: 10, insect: 8 },
  prey: { fox: ['deer'], bird: ['deer', 'insect'] },
  foodObjects: {
    sakura_tree: ['tree', 'bush'],
    sakura_cloud_grass: ['grass'],
    sakura_sky_orchid: ['flower', 'bush'],
    sakura_blossom_deer: ['deer', 'bush'],
    sakura_sky_rabbit: ['deer', 'grass'],
    sakura_cloud_goat: ['deer', 'grass', 'bush'],
    sakura_wind_fox: ['fox', 'deer'],
    sakura_sky_hawk: ['bird', 'mountain'],
    sakura_petal_butterfly: ['flower', 'bush'],
    sakura_hummingbird: ['bird', 'flower'],
    sakura_sky_mushroom: ['rock', 'bush'],
  },
};

const AURELIA_PROFILE: GuildProfile = {
  config: aureliaConfig,
  guilds: {
    deer: ['aurelia_deer', 'aurelia_wild_boar', 'aurelia_squirrel', 'aurelia_rabbit'],
    fox: ['aurelia_red_fox', 'aurelia_lynx'],
    bird: ['aurelia_forest_owl'],
    fish: [],
    insect: ['aurelia_leaf_fungi'],
  },
  divisors: { deer: 10, fox: 4, bird: 2, fish: 10, insect: 8 },
  prey: { fox: ['deer'], bird: ['deer', 'insect'] },
  foodObjects: {
    aurelia_golden_maple: ['tree', 'bush'],
    aurelia_amber_oak: ['tree'],
    aurelia_autumn_grass: ['grass'],
    aurelia_squirrel: ['deer', 'bush'],
    aurelia_deer: ['deer', 'bush'],
    aurelia_wild_boar: ['deer', 'bush'],
    aurelia_rabbit: ['deer', 'grass'],
    aurelia_red_fox: ['fox', 'deer'],
    aurelia_forest_owl: ['bird', 'mountain'],
    aurelia_lynx: ['fox', 'deer'],
    aurelia_leaf_fungi: ['rock', 'bush', 'grass'],
  },
};

export const GUILD_PROFILES: Record<string, GuildProfile> = {
  terra: TERRA_PROFILE,
  dune: DUNE_PROFILE,
  glaciere: GLACIERE_PROFILE,
  inferna: INFERNA_PROFILE,
  aquaria: AQUARIA_PROFILE,
  mycelia: MYCELIA_PROFILE,
  sakura: SAKURA_PROFILE,
  aurelia: AURELIA_PROFILE,
};
