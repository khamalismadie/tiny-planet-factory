import { speciesInsights } from '../sim/insights';
import type { PlanetState } from '../sim/types';

type AdvisoryTone = 'ok' | 'warn';

export interface WildlifeAdvisory {
  id: string;
  label: string;
  score: number;
  status: string;
  tone: AdvisoryTone;
  detail: string;
  advice: string;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

export function wildlifeAdvisories(planet: PlanetState): WildlifeAdvisory[] {
  const insights = speciesInsights(planet);
  const relevant = insights.filter((entry) => entry.discovered || entry.agents > 0 || entry.extinct);
  const scored = relevant.map((entry) => {
    const capacity = Math.max(1, entry.capacity);
    const occupancy = (entry.estimate / capacity) * 100;
    const penalty = entry.limitingFactor ? 8 : 0;
    const score = entry.extinct ? 0 : clamp(occupancy * 0.55 + entry.foodFactor * 100 * 0.45 - penalty);
    return { entry, score };
  });

  const protectionScore = scored.length
    ? Math.round(scored.reduce((sum, entry) => sum + entry.score, 0) / scored.length)
    : 0;
  const atRisk = scored.filter((entry) => entry.entry.extinct || entry.score < 45);
  const worst = [...scored].sort((a, b) => a.score - b.score)[0]?.entry;
  const protectionTone: AdvisoryTone = !scored.length || protectionScore < 50 || atRisk.length > 0 ? 'warn' : 'ok';
  const protectionStatus = !scored.length
    ? 'Belum ada satwa'
    : atRisk.length > 0
      ? `${atRisk.length} perlu perhatian`
      : protectionScore >= 75 ? 'Stabil' : 'Berkembang';
  const protectionAdvice = worst
    ? `${worst.label}: ${worst.suggestion}`
    : 'Belum ada spesies aktif. Tempatkan objek habitat dasar seperti rumput, semak, atau air untuk menarik satwa.';

  const env = planet.environment;
  const eco = planet.ecosystem;
  const sanctuaryScore = Math.round(clamp(
    eco.vegetation * 0.3 + env.water * 0.2 + env.biodiversity * 0.3 + env.stability * 0.2,
  ));
  const sanctuaryTone: AdvisoryTone = sanctuaryScore >= 55 ? 'ok' : 'warn';
  const sanctuaryStatus = sanctuaryScore < 35 ? 'Dasar' : sanctuaryScore < 55 ? 'Berkembang' : sanctuaryScore < 75 ? 'Layak' : 'Kuat';
  const sanctuaryAdvice = sanctuaryScore < 45
    ? 'Perkuat dukungan area: tambah vegetasi, jaga air, dan naikkan stabilitas sebelum menambah satwa.'
    : sanctuaryScore < 70
      ? 'Area konservasi cukup. Lanjutkan variasi habitat dan pantau faktor pembatas spesies.'
      : 'Dukungan habitat kuat. Pertahankan keseimbangan air, vegetasi, biodiversitas, dan stabilitas.';

  return [
    {
      id: 'protection',
      label: 'Perlindungan Satwa (#6)',
      score: protectionScore,
      status: protectionStatus,
      tone: protectionTone,
      detail: `${scored.length} spesies relevan · ${atRisk.length} perlu perhatian · skor turunan dari kapasitas dan pangan.`,
      advice: protectionAdvice,
    },
    {
      id: 'sanctuary',
      label: 'Area Konservasi (#45)',
      score: sanctuaryScore,
      status: sanctuaryStatus,
      tone: sanctuaryTone,
      detail: `Vegetasi ${Math.round(eco.vegetation)} · air ${Math.round(env.water)} · biodiversitas ${Math.round(env.biodiversity)} · stabilitas ${Math.round(env.stability)}.`,
      advice: `${sanctuaryAdvice} Ini advisori; tidak ada zona konservasi fisik baru.`,
    },
  ];
}
