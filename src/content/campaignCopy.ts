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
  'Miliki 24 agen burung.',
  'Miliki 30 agen serangga.',
  'Miliki 5 spesies reptil.',
  'Bentuk 3 hubungan predator-mangsa.',
  'Capai 24 agen satwa stabil.',
  'Capai 25 spesies hewan (tahap 6).',

  'Buka biome laut (1 samudra).',
  'Introduksi 5 ikan.',
  'Tanam 5 jenis koral (proxy samudra).',
  'Bangun 1 ekosistem terumbu karang.',
  'Buka laut dalam (12 samudra).',
  'Introduksi 2 hewan laut besar (12 ikan).',
  'Buat rantai makanan laut (2 jaring).',
  'Bangun mangrove dan pesisir (6 danau).',
  'Miliki 30 spesies laut (20 ikan).',
  'Stabilkan 3 habitat perairan (15 samudra).',

  'Temukan 5 spesies jamur.',
  'Aktifkan penguraian organik (kesehatan 70).',
  'Miliki 5 spesies penyerbuk (30 agen).',
  'Bangun biome gurun (20 pasir).',
  'Bangun biome tundra (salju).',
  'Bangun biome tropis (40 pohon).',
  'Hubungkan 3 biome (tahap 6).',
  'Temukan 3 spesies langka.',
  'Capai 60 spesies hidup (45 agen).',
  'Miliki 5 biome stabil (tahap 6).',

  'Introduksi manusia pertama.',
  'Bangun 5 rumah.',
  'Bangun 3 lahan pertanian.',
  'Produksi 5 jenis bahan pangan.',
  'Introduksi 3 hewan ternak.',
  'Capai 20 penduduk.',
  'Bangun sistem distribusi air.',
  'Aktifkan pertukaran sumber daya.',
  'Capai 50 penduduk.',
  'Bangun desa mandiri.',

  'Bangun workshop.',
  'Ekstrak 3 jenis mineral.',
  'Produksi energi pertama.',
  'Bangun 3 turbin angin.',
  'Bangun 5 panel surya.',
  'Bangun 2 fasilitas industri.',
  'Buka sistem transportasi.',
  'Kelola polusi industri.',
  'Gunakan 50% energi terbarukan.',
  'Stabilkan ekonomi dan lingkungan.',

  'Bangun research center.',
  'Buka 5 upgrade DNA.',
  'Otomatiskan pertanian.',
  'Buat 3 sanctuary.',
  'Kelola perubahan iklim.',
  'Bangun ekosistem otomatis.',
  'Buka AI planet management.',
  'Evolusikan 5 spesies.',
  'Capai 90% planet health.',
  'Bangun peradaban berkelanjutan.',

  'Temukan energi kosmik.',
  'Temukan 3 spesies alien.',
  'Bangun crystal biome.',
  'Ciptakan 5 pulau melayang.',
  'Bangkitkan 3 spesies purba.',
  'Hubungkan 5 biome.',
  'Evolusikan 10 spesies.',
  'Capai ekosistem mandiri.',
  'Selesaikan semua milestone utama.',
  'Selesaikan seluruh campaign.',
];

export interface CampaignCopy {
  target: string;
  note: string;
}

export function campaignCopy(level: number): CampaignCopy {
  const index = Math.max(1, Math.min(CAMPAIGN_TARGETS.length, Math.floor(level))) - 1;
  const mission = campaignMissionForLevel(level);
  return {
    target: CAMPAIGN_TARGETS[index],
    note: mission.locked ? 'Terkunci — mekanik era ini belum tersedia.' : 'Dapat diselesaikan dengan sistem saat ini.',
  };
}
