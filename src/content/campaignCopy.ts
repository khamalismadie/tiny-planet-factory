import { ADVANCED_SYSTEMS, type AdvancedSystem } from '../sim/advanced';
import { campaignMissionForLevel } from '../sim/campaignRules';

// Teks panjang dipisah dari aturan agar tidak masuk app chunk utama.
// Diimpor secara lazy oleh panel `?campaign=1`.
export const CAMPAIGN_TARGETS: string[] = [
  'Ciptakan planet pertama.',
  'Bentuk 3 pulau/bukit.',
  'Isi 30% planet dengan air.',
  'Bangun 3 gunung.',
  'Buat 2 aliran sungai/danau.',
  'Ciptakan 5 area tanah subur.',
  'Aktifkan siklus siang dan malam lewat energi.',
  'Capai kondisi atmosfer stabil (oksigen ≥ 45).',
  'Aktifkan hujan dan penguapan.',
  'Capai planet layak huni (tahap 5).',

  'Introduksi 3 makhluk pertama.',
  'Miliki populasi 100.',
  'Temukan 4 spesies sebagai proxy alga.',
  'Bangun populasi fotosintetik (oksigen ≥ 55).',
  'Miliki 5 spesies mikroorganisme.',
  'Buat rantai makanan 2 tingkat.',
  'Aktifkan sistem penguraian (kesehatan ≥ 55).',
  'Seimbangkan nutrisi tanah (kesuburan ≥ 60).',
  'Miliki 12 agen mikroba.',
  'Capai ekosistem mikroba stabil (tahap 5).',

  'Tanam 10 tanaman/pohon.',
  'Tutupi daratan dengan 20 rumput.',
  'Tanam 5 jenis bunga.',
  'Tumbuhkan 15 pohon.',
  'Ciptakan hutan dengan 25 pohon.',
  'Tanam 8 pohon berbunga/berbuah.',
  'Ciptakan lahan basah (4 danau).',
  'Temukan 5 spesies tanaman.',
  'Capai vegetasi 70.',
  'Ciptakan hutan 3 lapisan (tahap 6).',

  'Introduksi 3 spesies hewan.',
  'Miliki 12 agen herbivora.',
  'Introduksi predator pertama (1 jaring makanan).',
  'Miliki 18 agen mamalia.',
  'Miliki 20 agen hewan.',
  'Miliki 20 agen hewan aktif.',
  'Miliki 5 spesies reptil.',
  'Bentuk 3 hubungan predator-mangsa.',
  'Capai 20 agen satwa stabil.',
  'Capai 25 spesies hewan (tahap 6).',

  'Buka biome laut (1 samudra).',
  'Introduksi 5 ikan.',
  'Tanam 5 jenis koral (proxy samudra).',
  'Bangun 1 ekosistem terumbu karang.',
  'Buka laut dalam (12 samudra).',
  'Introduksi hewan laut besar (8 ikan).',
  'Buat rantai makanan laut (2 jaring).',
  'Bangun mangrove dan pesisir (6 danau).',
  'Miliki 9 ikan di ekosistem laut.',
  'Stabilkan 3 habitat perairan (15 samudra).',

  'Temukan 5 spesies jamur.',
  'Aktifkan penguraian organik (kesehatan 70).',
  'Dukung 20 agen penyerbuk dan fauna terkait.',
  'Bangun biome gurun (20 pasir).',
  'Bangun biome tundra (salju).',
  'Bangun biome tropis (40 pohon).',
  'Hubungkan 3 biome (tahap 6).',
  'Temukan 3 spesies langka.',
  'Capai 20 agen fauna aktif.',
  'Miliki 5 biome stabil (tahap 6).',

  'Capai skor Peradaban 30.',
  'Capai skor Peradaban 35.',
  'Capai skor Peradaban 40.',
  'Capai skor Peradaban 45.',
  'Capai skor Peradaban 50.',
  'Capai skor Peradaban 55.',
  'Capai skor Peradaban 60.',
  'Capai skor Peradaban 65.',
  'Capai skor Peradaban 68.',
  'Capai skor Peradaban 70.',

  'Capai skor Industri 50.',
  'Capai skor Industri 52.',
  'Capai skor Industri 54.',
  'Capai skor Industri 56.',
  'Capai skor Industri 58.',
  'Capai skor Industri 60.',
  'Capai skor Industri 62.',
  'Capai skor Industri 64.',
  'Capai skor Industri 66.',
  'Capai skor Industri 68.',

  'Capai skor AI 65.',
  'Capai skor AI 67.',
  'Capai skor AI 69.',
  'Capai skor AI 71.',
  'Capai skor AI 73.',
  'Capai skor AI 75.',
  'Capai skor AI 77.',
  'Capai skor AI 79.',
  'Capai skor AI 81.',
  'Capai skor AI 83.',

  'Capai skor Kosmik 55.',
  'Capai skor Kosmik 57.',
  'Capai skor Kosmik 59.',
  'Capai skor Kosmik 61.',
  'Capai skor Kosmik 63.',
  'Capai skor Kosmik 65.',
  'Capai skor Kosmik 67.',
  'Capai skor Kosmik 69.',
  'Capai skor Kosmik 71.',
  'Capai skor Kosmik 73.',
];

export interface CampaignCopy {
  target: string;
  note: string;
}

function advancedSystemOf(check: ReturnType<typeof campaignMissionForLevel>['check']): AdvancedSystem | null {
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

export function campaignCopy(level: number): CampaignCopy {
  const index = Math.max(1, Math.min(CAMPAIGN_TARGETS.length, Math.floor(level))) - 1;
  const mission = campaignMissionForLevel(level);
  const system = advancedSystemOf(mission.check);
  return {
    target: CAMPAIGN_TARGETS[index],
    note: mission.locked
      ? 'Terkunci — mekanik era ini belum tersedia.'
      : system
        ? `Skor ${ADVANCED_SYSTEMS[system].label} diturunkan dari ${ADVANCED_SYSTEMS[system].inputs}.`
        : 'Dapat diselesaikan dengan sistem saat ini.',
  };
}
