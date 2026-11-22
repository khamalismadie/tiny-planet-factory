import { ADVANCED_SYSTEMS, advancedSystemScore, type AdvancedSystem } from './advanced';
import { campaignMissionForLevel, type CampaignMission } from './campaignRules';
import { foodWebLinks } from './eco/guilds';
import type { PlanetState } from './types';

export interface MissionCompletion {
  id: string;
  title: string;
  rewardXp: number;
}

function ratio(value: number, target: number): number {
  if (target <= 0) return 1;
  return Math.max(0, Math.min(1, value / target));
}

/** Progres 0..1 dari sebuah misi, dihitung hanya dari state sim yang ada. */
export function missionProgress(planet: PlanetState, mission: CampaignMission): number {
  const check = mission.check;
  switch (check.kind) {
    case 'always':
      return 1;
    case 'object':
      return ratio(planet.objects.filter((object) => object.type === check.type).length, check.target);
    case 'env':
      return ratio(planet.environment[check.key], check.target);
    case 'eco':
      return ratio(planet.ecosystem[check.key], check.target);
    case 'species':
      return ratio(planet.fauna?.discovered.length ?? 0, check.target);
    case 'agents':
      return ratio(planet.fauna?.agents.length ?? 0, check.target);
    case 'fishAgents':
      return ratio(planet.fauna?.agents.filter((agent) => agent.species === 'fish').length ?? 0, check.target);
    case 'weather':
      return planet.weather.type === check.type ? 1 : 0;
    case 'web':
      return ratio(foodWebLinks(planet).length, check.target);
    case 'stage':
      return ratio(planet.stage, check.target);
    case 'civilization':
    case 'industry':
    case 'ai':
    case 'cosmic':
      return ratio(advancedSystemScore(planet, check.kind), check.target);
  }
}

function systemForCheck(check: CampaignMission['check']): AdvancedSystem | null {
  switch (check.kind) {
    case 'civilization':
    case 'industry':
    case 'ai':
    case 'cosmic':
      return check.kind;
    default:
      return null;
  }
}

/** Misi campaign linear: level menentukan misi aktif, tanpa field DNA baru. */
export function syncCampaignMission(planet: PlanetState): void {
  const mission = campaignMissionForLevel(planet.progression.level);
  if (planet.mission.id === mission.id) return;
  planet.mission.id = mission.id;
  planet.mission.status = 'active';
  planet.mission.holdTicks = 0;
}

export function completeCampaignMission(planet: PlanetState): MissionCompletion | null {
  if (planet.mission.status !== 'active') return null;
  const mission = campaignMissionForLevel(planet.progression.level);
  if (mission.locked) return null;
  planet.mission.status = 'complete';
  planet.progression.xp += mission.rewardXp;
  return { id: mission.id, title: mission.title, rewardXp: mission.rewardXp };
}

export interface MissionView {
  id: string;
  title: string;
  type: CampaignMission['type'];
  status: PlanetState['mission']['status'];
  progress: number;
  holdTicks: number;
  rewardXp: number;
  locked: boolean;
  system: string | null;
  systemScore: number | null;
}

export function missionView(planet: PlanetState): MissionView {
  const mission = campaignMissionForLevel(planet.progression.level);
  const system = systemForCheck(mission.check);
  return {
    id: mission.id,
    title: mission.title,
    type: mission.type,
    status: planet.mission.status,
    progress: missionProgress(planet, mission),
    holdTicks: planet.mission.holdTicks,
    rewardXp: mission.rewardXp,
    locked: mission.locked,
    system: system ? ADVANCED_SYSTEMS[system].label : null,
    systemScore: system ? Math.round(advancedSystemScore(planet, system)) : null,
  };
}
