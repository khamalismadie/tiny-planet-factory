import { SPECIES_DEFS, SPECIES_ORDER } from '../content/species';
import { WEATHER_DEFS } from '../content/weather';
import { scoreHabitat } from './eco/habitat';
import { ecosystemConfigOf, guildStatus } from './eco/guilds';
import { habitatContextFor } from './eco/manager';
import { weatherTendencies, type WeatherTendency } from './engine';
import type { PlanetState, SpeciesId } from './types';

export interface HabitatAdvice {
  factor: string;
  label: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
}

export interface SpeciesInsight {
  id: SpeciesId;
  label: string;
  agents: number;
  discovered: boolean;
  extinct: boolean;
  estimate: number;
  capacity: number;
  foodFactor: number;
  limitingFactor: string | null;
  suggestion: string;
}

export interface WeatherInsight {
  currentLabel: string;
  remainingTicks: number;
  intensityPercent: number;
  effects: string[];
  tendencies: Array<WeatherTendency & { label: string }>;
  caution: string | null;
}

const FACTOR_LABELS: Record<string, string> = {
  biome: 'Bioma',
  temperature: 'Suhu',
  humidity: 'Kelembapan',
  water: 'Air',
  vegetation: 'Vegetasi',
  fertility: 'Kesuburan',
  stability: 'Stabilitas',
  aquatic: 'Kedalaman air',
  oxygen: 'Oksigen terlarut',
  hazard: 'Bahaya musiman',
  'habitat-preference': 'Preferensi habitat',
};

function severityForScore(score: number): HabitatAdvice['severity'] {
  if (score < 0.35) return 'high';
  if (score < 0.65) return 'medium';
  return 'low';
}

function suggestionForFactor(factor: string, planet: PlanetState): string {
  const e = planet.environment;
  switch (factor) {
    case 'temperature':
      if (e.temperature > 30) return 'Suhu tinggi: tambah area air atau vegetasi untuk menstabilkan iklim.';
      if (e.temperature < 10) return 'Suhu rendah: tambah vegetasi dan lindungi area dari cuaca dingin.';
      return 'Jaga suhu dekat rentang ideal spesies.';
    case 'humidity':
      return e.humidity < 40
        ? 'Kelembapan rendah: tambah laut/danau dan vegetasi.'
        : 'Kelembapan tinggi: seimbangkan dengan area terbuka dan stabilitas.';
    case 'water':
      return 'Air terbatas: tempatkan laut, danau, atau sumber air sesuai planet.';
    case 'vegetation':
      return 'Vegetasi kurang: tanam rumput, semak, bunga, atau pohon.';
    case 'fertility':
      return 'Kesuburan rendah: tambah vegetasi, jaga kelembapan, dan biarkan siklus nutrisi pulih.';
    case 'stability':
      return 'Stabilitas rendah: kurangi tekanan ekstrem, tambah vegetasi, dan jaga keseimbangan lingkungan.';
    case 'aquatic':
      return 'Habitat air belum memadai: tambah laut/danau dan jaga kualitas air.';
    case 'oxygen':
      return 'Oksigen/air kurang baik: tambah vegetasi atau perbaiki kualitas air.';
    case 'hazard':
      return 'Bahaya musiman tinggi: tingkatkan populasi yang tahan, jaga makanan, dan tunggu musim lebih aman sebelum ekspansi besar.';
    case 'biome':
      return 'Bioma belum cocok: tempatkan objek habitat yang sesuai spesies ini.';
    default:
      return 'Periksa kebutuhan habitat spesies dan tambah objek pendukung.';
  }
}

export function habitatAdvice(planet: PlanetState): HabitatAdvice[] {
  const config = ecosystemConfigOf(planet);
  if (!config) return [];
  const context = habitatContextFor(planet, config);
  const worstByFactor = new Map<string, number>();

  for (const definition of config.species) {
    const score = scoreHabitat(definition, context);
    for (const [factor, value] of Object.entries(score.factors)) {
      const prev = worstByFactor.get(factor);
      if (prev === undefined || value < prev) worstByFactor.set(factor, value);
    }
  }

  return [...worstByFactor.entries()]
    .filter(([, score]) => score < 0.75)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 4)
    .map(([factor, score]) => ({
      factor,
      label: FACTOR_LABELS[factor] ?? factor,
      severity: severityForScore(score),
      suggestion: suggestionForFactor(factor, planet),
    }));
}

export function speciesInsights(planet: PlanetState): SpeciesInsight[] {
  const fauna = planet.fauna;
  const config = ecosystemConfigOf(planet);
  const context = config ? habitatContextFor(planet, config) : null;

  return SPECIES_ORDER.map((id) => {
    const agents = fauna?.agents.filter((agent) => agent.species === id).length ?? 0;
    const discovered = fauna?.discovered.includes(id) ?? false;
    const extinct = fauna?.extinct.includes(id) ?? false;
    const status = guildStatus(planet, id);

    let limitingFactor: string | null = null;
    if (config && context) {
      // Representative: worst limiting factor among all configured species for this planet,
      // then bias with guild status. Keeps it deterministic and cheap.
      let worst: { factor: string; score: number } | null = null;
      for (const definition of config.species) {
        const score = scoreHabitat(definition, context);
        if (score.limitingFactor && (worst === null || score.factors[score.limitingFactor] < worst.score)) {
          worst = { factor: score.limitingFactor, score: score.factors[score.limitingFactor] ?? 1 };
        }
      }
      limitingFactor = worst?.factor ?? null;
    }

    let suggestion = 'Habitat dasar belum terbaca untuk planet ini.';
    const env = planet.environment;
    const eco = planet.ecosystem;
    if (!discovered && agents === 0) {
      if (id === 'fish') {
        limitingFactor = env.water < 35 ? 'water' : limitingFactor;
        suggestion = env.water < 35 ? 'Tambah laut/danau sampai air memadai untuk habitat ikan.' : 'Buat habitat air dan jaga oksigen/stabilitas.';
      } else if (id === 'deer') {
        limitingFactor = eco.vegetation < 10 ? 'vegetation' : limitingFactor;
        suggestion = 'Tanam rumput/pohon/semak untuk makanan dan tutupan kijang.';
      } else if (id === 'fox') {
        limitingFactor = (fauna?.agents.filter((a) => a.species === 'deer').length ?? 0) < 1 ? 'biome' : limitingFactor;
        suggestion = 'Rubah butuh rantai makanan: pastikan kijang stabil dan ada tutupan pohon/semak.';
      } else if (id === 'bird') {
        limitingFactor = env.oxygen < 22 ? 'oxygen' : limitingFactor;
        suggestion = 'Tambah pohon, bunga, atau semak; jaga oksigen cukup.';
      } else {
        limitingFactor = eco.vegetation < 10 ? 'vegetation' : limitingFactor;
        suggestion = 'Tambah bunga/semak/rumput untuk mendukung serangga penyerbuk.';
      }
    } else if (status) {
      if (status.foodFactor < 0.45) limitingFactor = 'vegetation';
      else if (status.availability < 0.35) limitingFactor = 'stability';
      suggestion = status.foodFactor < 0.45
        ? `Pangan rendah (${Math.round(status.foodFactor * 100)}%). Tambah sumber makanan/habitat ${SPECIES_DEFS[id].label.toLowerCase()}.`
        : status.availability < 0.35
          ? `Populasi tertekan (${Math.round(status.availability * 100)}% kapasitas). Jaga stabilitas dan kurangi bahaya musiman.`
          : `Habitat ${SPECIES_DEFS[id].label.toLowerCase()} cukup stabil. Pertahankan keseimbangan pangan.`;
    }

    return {
      id,
      label: SPECIES_DEFS[id].label,
      agents,
      discovered,
      extinct,
      estimate: status?.estimate ?? 0,
      capacity: status?.capacity ?? 0,
      foodFactor: status?.foodFactor ?? 0,
      limitingFactor,
      suggestion,
    };
  });
}

export function weatherInsight(planet: PlanetState): WeatherInsight {
  const weather = WEATHER_DEFS[planet.weather.type];
  const effects: string[] = [];
  if (weather.rain > 0) effects.push(`Hujan +${Math.round(weather.rain * planet.weather.intensity * 100)}% presipitasi`);
  if (weather.sunlight !== 1) effects.push(`Cahaya ${Math.round(weather.sunlight * 100)}%`);
  if (weather.tempDelta !== 0) effects.push(`Suhu ${weather.tempDelta > 0 ? '+' : ''}${weather.tempDelta.toFixed(2)}/tick`);
  if (weather.stabilityDelta !== 0) effects.push(`Stabilitas ${weather.stabilityDelta > 0 ? '+' : ''}${weather.stabilityDelta.toFixed(2)}/tick`);

  const tendencies = weatherTendencies(planet).map((entry) => ({
    ...entry,
    label: WEATHER_DEFS[entry.type].label,
  }));

  let caution: string | null = null;
  const stormPct = tendencies.find((t) => t.type === 'storm')?.percent ?? 0;
  const snowPct = tendencies.find((t) => t.type === 'snow')?.percent ?? 0;
  if (planet.weather.type === 'storm') caution = 'Setelah badai, game memberi 2 tick cerah sebagai recovery beat.';
  else if (stormPct >= 20) caution = 'Risiko badai meningkat; stabilitas rendah membuat badai lebih mungkin.';
  else if (snowPct >= 35) caution = 'Suhu rendah menaikkan peluang salju; lindungi vegetasi muda.';

  return {
    currentLabel: weather.label,
    remainingTicks: planet.weather.remainingTicks,
    intensityPercent: Math.round(planet.weather.intensity * 100),
    effects,
    tendencies,
    caution,
  };
}

export function weatherLabel(type: WeatherTendency['type']): string {
  return WEATHER_DEFS[type].label;
}

export function describeHabitatFactor(factor: string): string {
  return FACTOR_LABELS[factor] ?? factor;
}

export interface RestorationMilestone {
  id: string;
  label: string;
  achieved: boolean;
  detail: string;
}

export function restorationMilestones(planet: PlanetState): RestorationMilestone[] {
  const env = planet.environment;
  const eco = planet.ecosystem;
  const discovered = planet.fauna?.discovered.length ?? 0;
  const objects = planet.objects.length;
  return [
    { id: 'first-green', label: 'Hijau Pertama', achieved: eco.vegetation >= 10, detail: 'Vegetasi mencapai 10.' },
    { id: 'water-balance', label: 'Air Seimbang', achieved: env.water >= 40, detail: 'Ketersediaan air mencapai 40.' },
    { id: 'fertile-soil', label: 'Tanah Pulih', achieved: env.fertility >= 55, detail: 'Kesuburan mencapai 55.' },
    { id: 'clean-air', label: 'Udara Bersih', achieved: env.oxygen >= 55, detail: 'Oksigen mencapai 55.' },
    { id: 'biodiverse', label: 'Biodiversitas Tumbuh', achieved: env.biodiversity >= 45, detail: 'Biodiversitas mencapai 45.' },
    { id: 'species-5', label: 'Penemu Spesies', achieved: discovered >= 5, detail: 'Menemukan 5 spesies.' },
    { id: 'stable', label: 'Ekosistem Stabil', achieved: env.stability >= 70 && eco.health >= 60, detail: 'Stabilitas 70 dan kesehatan 60.' },
    { id: 'builder', label: 'Arsitek Planet', achieved: objects >= 30, detail: 'Menempatkan 30 objek.' },
  ];
}

export interface EnvironmentRisk {
  id: string;
  label: string;
  severity: 'low' | 'medium' | 'high';
  signal: string;
  response: string;
}

export function environmentRisks(planet: PlanetState): EnvironmentRisk[] {
  const env = planet.environment;
  const eco = planet.ecosystem;
  const weather = planet.weather.type;
  const risks: EnvironmentRisk[] = [];

  if (env.water < 25) {
    risks.push({
      id: 'drought',
      label: 'Kekeringan',
      severity: env.water < 15 ? 'high' : 'medium',
      signal: `Air ${Math.round(env.water)}.`,
      response: 'Tambah danau/laut, tanam vegetasi penahan kelembapan, dan hindari ekspansi yang menaikkan suhu.',
    });
  }
  if (env.water > 80 && (weather === 'rain' || weather === 'storm')) {
    risks.push({
      id: 'flood',
      label: 'Banjir / Kelebihan Air',
      severity: env.water > 92 ? 'high' : 'medium',
      signal: `Air ${Math.round(env.water)} dengan cuaca ${WEATHER_DEFS[weather].label.toLowerCase()}.`,
      response: 'Jaga stabilitas medan, hindari menambah sumber air, dan prioritaskan vegetasi/struktur penyeimbang.',
    });
  }
  if (env.temperature > 35) {
    risks.push({
      id: 'heat',
      label: 'Panas Ekstrem',
      severity: env.temperature > 42 ? 'high' : 'medium',
      signal: `Suhu ${env.temperature.toFixed(1)}°C.`,
      response: 'Tambah badan air, tingkatkan vegetasi, dan pantau stres spesies.',
    });
  }
  if (env.temperature < 5) {
    risks.push({
      id: 'cold',
      label: 'Dingin Ekstrem',
      severity: env.temperature < 0 ? 'high' : 'medium',
      signal: `Suhu ${env.temperature.toFixed(1)}°C.`,
      response: 'Fokus pada stabilitas dan vegetasi tahan iklim; hindari perubahan besar saat salju.',
    });
  }
  if (env.fertility < 30) {
    risks.push({
      id: 'soil',
      label: 'Degradasi Tanah',
      severity: env.fertility < 18 ? 'high' : 'medium',
      signal: `Kesuburan ${Math.round(env.fertility)}.`,
      response: 'Tanam rumput/semak/pohon/bunga untuk memulihkan nutrisi dan tutupan tanah.',
    });
  }
  if (env.stability < 35 || weather === 'storm') {
    risks.push({
      id: 'storm',
      label: 'Ketidakstabilan Badai',
      severity: env.stability < 20 || weather === 'storm' ? 'high' : 'medium',
      signal: weather === 'storm' ? `Badai aktif, stabilitas ${Math.round(env.stability)}.` : `Stabilitas ${Math.round(env.stability)}.`,
      response: 'Perkuat stabilitas dengan vegetasi/struktur, hindari aksi ekstrem, dan manfaatkan recovery beat setelah badai.',
    });
  }
  if (eco.health < 40) {
    risks.push({
      id: 'ecosystem',
      label: 'Kesehatan Ekosistem Rendah',
      severity: eco.health < 25 ? 'high' : 'medium',
      signal: `Kesehatan ${Math.round(eco.health)}.`,
      response: 'Prioritaskan oksigen, vegetasi, dan stabilitas sebelum ekspansi.',
    });
  }

  return risks.slice(0, 4);
}
