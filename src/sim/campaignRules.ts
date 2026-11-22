import { missionIdForLevel } from './progression';
import type { EcoKey, EnvKey, ObjectType, WeatherType } from './types';

export type MissionType =
  | 'discovery'
  | 'ecosystem'
  | 'production'
  | 'exploration'
  | 'civilization'
  | 'legendary';

export type MissionCheck =
  | { kind: 'object'; type: ObjectType; target: number }
  | { kind: 'env'; key: EnvKey; target: number }
  | { kind: 'eco'; key: EcoKey; target: number }
  | { kind: 'species'; target: number }
  | { kind: 'agents'; target: number }
  | { kind: 'fishAgents'; target: number }
  | { kind: 'weather'; type: WeatherType }
  | { kind: 'web'; target: number }
  | { kind: 'stage'; target: number }
  | { kind: 'always' };

export interface CampaignMission {
  level: number;
  id: string;
  title: string;
  type: MissionType;
  check: MissionCheck;
  rewardXp: number;
  locked: boolean;
}

interface MissionSeed {
  title: string;
  type: MissionType;
  check: MissionCheck;
  xp: number;
}

const obj = (type: ObjectType, target: number): MissionCheck => ({ kind: 'object', type, target });
const env = (key: EnvKey, target: number): MissionCheck => ({ kind: 'env', key, target });
const eco = (key: EcoKey, target: number): MissionCheck => ({ kind: 'eco', key, target });
const species = (target: number): MissionCheck => ({ kind: 'species', target });
const agents = (target: number): MissionCheck => ({ kind: 'agents', target });
const fishAgents = (target: number): MissionCheck => ({ kind: 'fishAgents', target });
const weather = (type: WeatherType): MissionCheck => ({ kind: 'weather', type });
const web = (target: number): MissionCheck => ({ kind: 'web', target });
const stage = (target: number): MissionCheck => ({ kind: 'stage', target });
const always: MissionCheck = { kind: 'always' };

// Misi 61-100 tetap dikatalogkan, tetapi terkunci sampai mekanik manusia,
// industri, AI, dan kosmik tersedia. Tidak ada klaim fitur palsu.
const ERA_SEEDS: MissionSeed[][] = [
  [
    { title: 'Dunia Baru', type: 'ecosystem', check: always, xp: 100 },
    { title: 'Daratan Pertama', type: 'ecosystem', check: obj('hill', 3), xp: 100 },
    { title: 'Planet Biru', type: 'ecosystem', check: env('water', 30), xp: 120 },
    { title: 'Pembentuk Gunung', type: 'production', check: obj('mountain', 3), xp: 120 },
    { title: 'Sungai Pertama', type: 'ecosystem', check: obj('lake', 2), xp: 140 },
    { title: 'Tanah Subur', type: 'production', check: obj('grass', 5), xp: 140 },
    { title: 'Sinar Matahari', type: 'ecosystem', check: env('energy', 45), xp: 160 },
    { title: 'Atmosfer Pertama', type: 'ecosystem', check: env('oxygen', 45), xp: 180 },
    { title: 'Siklus Air', type: 'discovery', check: weather('rain'), xp: 200 },
    { title: 'Planet Selesai', type: 'legendary', check: stage(5), xp: 500 },
  ],
  [
    { title: 'Awal Kecil', type: 'discovery', check: species(3), xp: 200 },
    { title: 'Ledakan Mikroba', type: 'ecosystem', check: eco('population', 100), xp: 180 },
    { title: 'Sel Hijau', type: 'discovery', check: species(4), xp: 200 },
    { title: 'Produsen Oksigen', type: 'ecosystem', check: env('oxygen', 55), xp: 220 },
    { title: 'Dunia Mikroba', type: 'discovery', check: species(5), xp: 240 },
    { title: 'Rantai Makanan Pertama', type: 'ecosystem', check: web(1), xp: 260 },
    { title: 'Penguraian', type: 'ecosystem', check: eco('health', 55), xp: 240 },
    { title: 'Siklus Nutrisi', type: 'ecosystem', check: env('fertility', 60), xp: 260 },
    { title: 'Keanekaragaman Mikroba', type: 'discovery', check: agents(12), xp: 280 },
    { title: 'Asal Usul Kehidupan', type: 'legendary', check: stage(5), xp: 500 },
  ],
  [
    { title: 'Benih Pertama', type: 'production', check: obj('tree', 10), xp: 240 },
    { title: 'Rumput Hijau', type: 'production', check: obj('grass', 20), xp: 260 },
    { title: 'Kekuatan Bunga', type: 'discovery', check: obj('flower', 5), xp: 280 },
    { title: 'Arsitek Hutan', type: 'production', check: obj('tree', 15), xp: 300 },
    { title: 'Perluasan Hutan', type: 'production', check: obj('tree', 25), xp: 320 },
    { title: 'Surga Buah', type: 'production', check: obj('flower', 8), xp: 300 },
    { title: 'Taman Lahan Basah', type: 'ecosystem', check: obj('lake', 4), xp: 320 },
    { title: 'Penemuan Botani', type: 'discovery', check: species(5), xp: 340 },
    { title: 'Biodiversitas Hutan', type: 'ecosystem', check: eco('vegetation', 70), xp: 360 },
    { title: 'Hutan Agung', type: 'legendary', check: stage(6), xp: 500 },
  ],
  [
    { title: 'Makhluk Pertama', type: 'discovery', check: species(3), xp: 320 },
    { title: 'Surga Herbivora', type: 'discovery', check: agents(12), xp: 340 },
    { title: 'Kedatangan Predator', type: 'ecosystem', check: web(1), xp: 360 },
    { title: 'Keluarga Hewan', type: 'discovery', check: agents(18), xp: 380 },
    { title: 'Penghuni Langit', type: 'discovery', check: agents(20), xp: 400 },
    { title: 'Perayap Kecil', type: 'discovery', check: agents(20), xp: 380 },
    { title: 'Kerajaan Reptil', type: 'discovery', check: species(5), xp: 400 },
    { title: 'Keseimbangan Alam', type: 'ecosystem', check: web(2), xp: 420 },
    { title: 'Suaka Satwa', type: 'ecosystem', check: agents(20), xp: 440 },
    { title: 'Kerajaan Hewan', type: 'legendary', check: stage(6), xp: 500 },
  ],
  [
    { title: 'Masuk Laut', type: 'discovery', check: obj('ocean', 1), xp: 400 },
    { title: 'Ikan Pertama', type: 'discovery', check: fishAgents(5), xp: 420 },
    { title: 'Taman Karang', type: 'production', check: obj('ocean', 5), xp: 440 },
    { title: 'Pembangun Terumbu', type: 'ecosystem', check: obj('ocean', 8), xp: 460 },
    { title: 'Laut Dalam', type: 'exploration', check: obj('ocean', 12), xp: 480 },
    { title: 'Raksasa Laut', type: 'discovery', check: fishAgents(8), xp: 500 },
    { title: 'Rantai Makanan Laut', type: 'ecosystem', check: web(2), xp: 480 },
    { title: 'Kehidupan Pesisir', type: 'ecosystem', check: obj('lake', 6), xp: 460 },
    { title: 'Keanekaragaman Laut', type: 'discovery', check: fishAgents(9), xp: 500 },
    { title: 'Penguasa Samudra', type: 'legendary', check: obj('ocean', 15), xp: 500 },
  ],
  [
    { title: 'Kerajaan Jamur', type: 'discovery', check: species(5), xp: 500 },
    { title: 'Jaringan Pengurai', type: 'ecosystem', check: eco('health', 70), xp: 500 },
    { title: 'Surga Penyerbuk', type: 'ecosystem', check: agents(20), xp: 500 },
    { title: 'Kehidupan Gurun', type: 'exploration', check: obj('sand', 20), xp: 500 },
    { title: 'Dunia Beku', type: 'exploration', check: weather('snow'), xp: 500 },
    { title: 'Surga Tropis', type: 'ecosystem', check: obj('tree', 40), xp: 500 },
    { title: 'Hubungan Bioma', type: 'ecosystem', check: stage(6), xp: 500 },
    { title: 'Spesies Langka', type: 'exploration', check: species(5), xp: 500 },
    { title: 'Ledakan Biodiversitas', type: 'ecosystem', check: agents(20), xp: 500 },
    { title: 'Alam Sempurna', type: 'legendary', check: stage(6), xp: 500 },
  ],
  [
    { title: 'Manusia Pertama', type: 'civilization', check: always, xp: 500 },
    { title: 'Desa Kecil', type: 'civilization', check: always, xp: 500 },
    { title: 'Ladang Pertama', type: 'production', check: always, xp: 500 },
    { title: 'Pasokan Makanan', type: 'production', check: always, xp: 500 },
    { title: 'Peternakan', type: 'civilization', check: always, xp: 500 },
    { title: 'Pertumbuhan Komunitas', type: 'civilization', check: always, xp: 500 },
    { title: 'Pengelolaan Air', type: 'production', check: always, xp: 500 },
    { title: 'Ekonomi Desa', type: 'civilization', check: always, xp: 500 },
    { title: 'Masyarakat Berkembang', type: 'civilization', check: always, xp: 500 },
    { title: 'Peradaban Dimulai', type: 'legendary', check: always, xp: 500 },
  ],
  [
    { title: 'Workshop Pertama', type: 'civilization', check: always, xp: 500 },
    { title: 'Operasi Pertambangan', type: 'production', check: always, xp: 500 },
    { title: 'Penemuan Energi', type: 'production', check: always, xp: 500 },
    { title: 'Tenaga Angin', type: 'production', check: always, xp: 500 },
    { title: 'Revolusi Surya', type: 'production', check: always, xp: 500 },
    { title: 'Pertumbuhan Industri', type: 'civilization', check: always, xp: 500 },
    { title: 'Sistem Transportasi', type: 'civilization', check: always, xp: 500 },
    { title: 'Dampak Lingkungan', type: 'ecosystem', check: always, xp: 500 },
    { title: 'Teknologi Hijau', type: 'production', check: always, xp: 500 },
    { title: 'Peradaban Berkelanjutan', type: 'legendary', check: always, xp: 500 },
  ],
  [
    { title: 'Riset Lanjutan', type: 'civilization', check: always, xp: 500 },
    { title: 'Penemuan Genetik', type: 'discovery', check: always, xp: 500 },
    { title: 'Pertanian Cerdas', type: 'production', check: always, xp: 500 },
    { title: 'Perlindungan Satwa', type: 'ecosystem', check: always, xp: 500 },
    { title: 'Kendali Iklim', type: 'ecosystem', check: always, xp: 500 },
    { title: 'Ekosistem Otomatis', type: 'ecosystem', check: always, xp: 500 },
    { title: 'Kecerdasan Buatan', type: 'civilization', check: always, xp: 500 },
    { title: 'Evolusi Genetik', type: 'discovery', check: always, xp: 500 },
    { title: 'Optimasi Planet', type: 'ecosystem', check: always, xp: 500 },
    { title: 'Peradaban Sempurna', type: 'legendary', check: always, xp: 500 },
  ],
  [
    { title: 'Penemuan Kosmik', type: 'exploration', check: always, xp: 500 },
    { title: 'Kehidupan Alien', type: 'discovery', check: always, xp: 500 },
    { title: 'Dunia Kristal', type: 'exploration', check: always, xp: 500 },
    { title: 'Pulau Melayang', type: 'exploration', check: always, xp: 500 },
    { title: 'Makhluk Purba', type: 'discovery', check: always, xp: 500 },
    { title: 'Jaringan Planet', type: 'civilization', check: always, xp: 500 },
    { title: 'Evolusi Kosmik', type: 'discovery', check: always, xp: 500 },
    { title: 'Planet Hidup', type: 'legendary', check: always, xp: 1000 },
    { title: 'Penjaga Semesta', type: 'legendary', check: always, xp: 2000 },
    { title: 'Dewa Pencipta', type: 'legendary', check: always, xp: 2000 },
  ],
];

export const CAMPAIGN: CampaignMission[] = ERA_SEEDS.flatMap((missions, eraIndex) =>
  missions.map((mission, index) => ({
    level: eraIndex * 10 + index + 1,
    id: missionIdForLevel(eraIndex * 10 + index + 1),
    title: mission.title,
    type: mission.type,
    check: mission.check,
    rewardXp: mission.xp,
    locked: eraIndex >= 6,
  })),
);

export const CAMPAIGN_BY_LEVEL: CampaignMission[] = CAMPAIGN.map((mission) => mission);
export const MISSION_TYPE_LABELS: Record<MissionType, string> = {
  discovery: 'Penemuan',
  ecosystem: 'Ekosistem',
  production: 'Produksi',
  exploration: 'Eksplorasi',
  civilization: 'Peradaban',
  legendary: 'Legendaris',
};

export function campaignMissionForLevel(level: number): CampaignMission {
  const safe = Math.max(1, Math.min(CAMPAIGN.length, Math.floor(level)));
  return CAMPAIGN_BY_LEVEL[safe - 1];
}
