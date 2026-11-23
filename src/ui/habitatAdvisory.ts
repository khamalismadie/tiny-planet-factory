import type { PlanetState } from '../sim/types';

type AdviceTone = 'ok' | 'warn';

export interface HabitatAdvisory {
  id: string;
  label: string;
  score: number;
  status: string;
  tone: AdviceTone;
  detail: string;
  advice: string;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

function countObjects(planet: PlanetState, type: string): number {
  return planet.objects.reduce((sum, entry) => sum + (entry.type === type ? 1 : 0), 0);
}

export function pollinatorGardenAdvisory(planet: PlanetState): HabitatAdvisory {
  const flowers = countObjects(planet, 'flower');
  const unlocked = new Set<string>(planet.progression.unlockedObjects);
  const score = Math.round(clamp(flowers * 15 + planet.environment.biodiversity * 0.25));
  const status = flowers === 0 ? 'Belum ada' : flowers < 3 ? 'Awal' : flowers < 6 ? 'Berkembang' : 'Stabil';
  const tone: AdviceTone = flowers >= 3 ? 'ok' : 'warn';
  const detail = `Bunga ${flowers} · biodiversitas ${Math.round(planet.environment.biodiversity)} · skor turunan ${score}/100.`;
  const advice = flowers === 0
    ? unlocked.has('flower')
      ? 'Tanam beberapa bunga untuk memulai habitat penyerbuk.'
      : 'Bunga belum terbuka; fokus dulu pada vegetasi dasar.'
    : flowers < 3
      ? 'Tambah bunga sampai minimal 3 agar dukungan penyerbuk lebih merata.'
      : planet.environment.biodiversity < 40
        ? 'Bunga sudah cukup; tingkatkan variasi tanaman untuk menguatkan biodiversitas.'
        : 'Kebun penyerbuk cukup stabil. Pertahankan variasi bunga dan jaga air.';

  return { id: 'pollinator', label: 'Kebun Penyerbuk (#34)', score, status, tone, detail, advice };
}

export function forestManagementAdvisory(planet: PlanetState): HabitatAdvisory {
  const trees = countObjects(planet, 'tree');
  const bushes = countObjects(planet, 'bush');
  const unlocked = new Set<string>(planet.progression.unlockedObjects);
  const score = Math.round(clamp(trees * 10 + bushes * 4 + planet.environment.stability * 0.2));
  const status = trees === 0 ? 'Belum ada' : trees < 3 ? 'Jarang' : trees < 8 ? 'Bertumbuh' : trees < 15 ? 'Stabil' : 'Rapat';
  const tone: AdviceTone = trees >= 3 && planet.environment.stability >= 45 ? 'ok' : 'warn';
  const detail = `Pohon ${trees} · semak ${bushes} · stabilitas ${Math.round(planet.environment.stability)} · skor turunan ${score}/100.`;
  const advice = trees === 0
    ? unlocked.has('tree')
      ? 'Mulai tanam pohon sebagai kerangka hutan.'
      : 'Pohon belum terbuka; tanam rumput/semak dulu untuk menyiapkan tanah.'
    : trees < 3
      ? 'Tambah pohon sampai minimal 3 untuk membentuk kanopi awal.'
      : bushes < 2 && unlocked.has('bush')
        ? 'Tambah semak untuk mengisi lapisan bawah hutan.'
        : planet.environment.stability < 45
          ? 'Kanopi mulai terbentuk; tambah vegetasi penstabil atau bukit sebelum ekspansi.'
          : 'Struktur hutan cukup seimbang. Pantau kesehatan dan biodiversitas.';

  return { id: 'forest', label: 'Pengelolaan Hutan (#3)', score, status, tone, detail, advice };
}
