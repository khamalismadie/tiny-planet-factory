import type { PlanetConfig } from '../../sim/eco/types';
import { terraConfig } from './terra';
import { duneConfig } from './dune';
import { glaciereConfig } from './glaciera';
import { infernaConfig } from './inferna';
import { aquariaConfig } from './aquaria';
import { myceliaConfig } from './mycelia';
import { sakuraConfig } from './sakura';
import { aureliaConfig } from './aurelia';
import { cosmosConfig } from './cosmos';

export const PLANET_CONFIGS: PlanetConfig[] = [
  terraConfig,
  duneConfig,
  glaciereConfig,
  infernaConfig,
  aquariaConfig,
  myceliaConfig,
  sakuraConfig,
  aureliaConfig,
  cosmosConfig,
];

export { PLANET_IDS } from './ids';
