import type { PlanetState } from '../sim/types';

export interface LocalAchievement {
  id: string;
  label: string;
  detail: string;
  achieved: boolean;
  value: number;
  target: number;
}

function badge(id: string, label: string, detail: string, value: number, target: number): LocalAchievement {
  return { id, label, detail, achieved: value >= target, value, target };
}

export function localAchievements(planet: PlanetState): LocalAchievement[] {
  const env = planet.environment;
  const objects = planet.objects.length;
  const discovered = planet.fauna?.discovered.length ?? 0;
  const completedEvents = Object.values(planet.events ?? {}).filter((event) => event.status === 'complete').length;

  return [
    badge('first-object', 'Langkah Pertama', 'Letakkan objek pertama di permukaan planet.', objects, 1),
    badge('green-corner', 'Sudut Hijau', 'Capai vegetasi 20 untuk memulihkan tutupan hijau.', planet.ecosystem.vegetation, 20),
    badge('water-keeper', 'Penjaga Air', 'Jaga ketersediaan air minimal 45.', env.water, 45),
    badge('clean-air', 'Udara Bersih', 'Capai oksigen minimal 45.', env.oxygen, 45),
    badge('species-spotter', 'Pengamat Spesies', 'Temukan 3 spesies fauna.', discovered, 3),
    badge('web-of-life', 'Jaring Kehidupan', 'Capai biodiversitas minimal 40.', env.biodiversity, 40),
    badge('steady-ground', 'Tapak Kokoh', 'Jaga stabilitas minimal 60.', env.stability, 60),
    badge('small-architect', 'Arsitek Kecil', 'Bangun 25 objek di planet ini.', objects, 25),
    badge('new-stage', 'Fase Baru', 'Majukan planet ke tahap 2.', planet.stage, 2),
    badge('mission-done', 'Misi Selesai', 'Selesaikan misi aktif saat ini.', planet.mission.status === 'complete' ? 1 : 0, 1),
    badge('event-experienced', 'Pengalaman Alam', 'Selesaikan satu event opsional.', completedEvents, 1),
  ];
}
