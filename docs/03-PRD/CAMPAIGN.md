# Tiny Planet Factory — Campaign & Leveling

> **Versi:** v0.21.0 (unreleased di `main`; produksi masih v0.16.0)  
> **Source of truth:** `src/sim/progression.ts`, `src/sim/campaignRules.ts`, `src/content/campaignCopy.ts`

## Core loop

**CREATE → DISCOVER → EVOLVE → EXPAND → MASTER**

Pemain membangun planet dari organisme sederhana menuju ekosistem mandiri. Sistem ini tidak menambah planet, biome, tipe objek, atau schema DNA.

## Kurva level

Rumus XP untuk naik dari level `L` ke `L+1`:

```text
XP(L) = 100 + 25(L - 1) + 5(L - 1)^2
```

| Transisi | XP |
|---|---:|
| 1 → 2 | 100 |
| 10 → 11 | 730 |
| 25 → 26 | 3580 |
| 50 → 51 | 13330 |
| 99 → 100 | 50570 |

Total XP untuk mencapai level 100: **1.723.920** — masih muat di field DNA `u32`.

> Catatan: angka 3.200 / 12.100 / 48.620 pada draft awal tidak cocok dengan rumus. Dokumen ini memakai hasil hitung rumus.

## Tiga jalur progresi

| Mata uang | Status v0.21.0 | Sumber |
|---|---|---|
| Planet XP | Tersimpan di state/DNA | Aksi simulasi + reward misi |
| DNA Points | **Derived, belum disimpan** | Jumlah spesies ditemukan |
| Bio Energy | **Derived, belum disimpan** | Kesehatan/stabilitas ekosistem |

DNA Points dan Bio Energy sengaja belum menjadi field DNA baru sampai P0 QA perangkat nyata ditutup.

## Sumber XP

| Aktivitas | XP |
|---|---:|
| Menemukan spesies baru | 50 |
| Menanam tumbuhan | 10 |
| Menemukan biome | 100 |
| Menyelesaikan misi | 100–500 |
| Membuat rantai makanan | 150 |
| Menyeimbangkan ekosistem | 250 |
| Menemukan spesies langka | 300 |
| Membuka era baru | 500 |
| Membuat ekosistem mandiri | 1.000 |
| Menyelesaikan milestone planet | 2.000 |

### Reward saat XP pasif melompat level

XP pasif ditambahkan setiap tick dari kondisi lingkungan aktual:
`jumlah metrik ideal × 0,12 + 0,08` jika vegetasi di atas 20. Level dihitung ulang dari total XP memakai `levelForXp()`, sehingga satu tick dapat menaikkan beberapa level sekaligus.

Perilaku resminya:

- `syncCampaignMission()` langsung memindahkan misi aktif ke misi level terbaru.
- Reward misi yang terlewat **tidak dibayar mundur** dan tidak dibackfill.
- Hanya misi aktif di level terbaru yang memberi reward, setelah progres penuh bertahan 3 tick.
- XP event dan reward misi masuk ke pool XP yang sama, lalu level dihitung ulang lagi di akhir tick.
- Tidak ada unlock objek yang terlewat: semua 12 tipe objek sudah tersedia sejak level 1.

`test:sim` memverifikasi dua kondisi: lompat level lewat XP pasif tidak menambah reward misi yang dilewati, dan misi aktif di level tujuan tetap memberi reward seperti biasa.

## Jenis quest

- **Penemuan** (`discovery`)
- **Ekosistem** (`ecosystem`)
- **Produksi** (`production`)
- **Eksplorasi** (`exploration`)
- **Peradaban** (`civilization`)
- **Legendaris** (`legendary`)

Daily, weekly, monthly, seasonal, hidden, dan achievement collection **belum diimplementasikan**; ini bukan fitur rilis v0.21.0.

## 10 era · 100 main mission

Misi 1–60 dievaluasi dari state simulator yang sudah ada. Misi 61–100 juga **aktif** sejak v0.18.0, tetapi memakai skor sistem lanjutan yang diturunkan dari sim yang sama. Tidak ada entitas manusia, pabrik, AI, atau alien literal yang ditambahkan; target era 7–10 adalah proxy yang jujur dari populasi, energi, biodiversitas, dan tahap planet.

> **Kalibrasi reachability:** `test:sim` membangun state nyata lewat `createPlanet`, `placeObject`, dan `simulateTick` untuk membuktikan semua 100 misi bisa mencapai progres 1. Target fauna disesuaikan dengan kapasitas aktual simulator (state teruji mencapai 21 agen dan 9 ikan). Sejak v0.21.0, copy target wajib menyebut angka dan kata kunci check yang sama: `species` = jumlah spesies ditemukan, `agents`/`fishAgents` = jumlah agen, `web` = jumlah jaring, `stage` = tahap. Label tematik seperti “jamur” atau “reptil” ditulis sebagai proxy, bukan klaim mechanic baru.

### Sistem lanjutan (era 7–10)

Skor sistem lanjutan berkisar 0–100 dan sengaja **derived-only**: tidak disimpan di DNA, tidak mengubah `schemaVersion: 3`, dan tidak menambah objek/planet/biome.

| Sistem | Input skor | Tampilan |
|---|---|---|
| Peradaban | populasi 30%, stabilitas 20%, air 15%, jaring makanan 15%, level 20% | `Sistem Peradaban: <skor>/100` |
| Industri | energi 30%, objek terbangun 25%, populasi 15%, level 30% | `Sistem Industri: <skor>/100` |
| AI | biodiversitas 25%, agen 20%, jaring makanan 20%, stabilitas 15%, level 20% | `Sistem AI: <skor>/100` |
| Kosmik | tahap 25%, energi 15%, biodiversitas 20%, level 40% | `Sistem Kosmik: <skor>/100` |

Tier sistem adalah `min(5, floor(skor / 20) + 1)`. Hook QA `window.__game.campaign().systems` mengembalikan `{ scores, tiers }` untuk keperluan verifikasi.

### Era 1 — Genesis (Level 1–10)

Tema: Planet baru terbentuk.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 1 | era1-01 | Dunia Baru | Ciptakan planet pertama. | Ekosistem | 100 | aktif |
| 2 | era1-02 | Daratan Pertama | Bentuk 3 pulau/bukit. | Ekosistem | 100 | aktif |
| 3 | era1-03 | Planet Biru | Isi 30% planet dengan air. | Ekosistem | 120 | aktif |
| 4 | era1-04 | Pembentuk Gunung | Bangun 3 gunung. | Produksi | 120 | aktif |
| 5 | era1-05 | Sungai Pertama | Buat 2 aliran sungai/danau. | Ekosistem | 140 | aktif |
| 6 | era1-06 | Tanah Subur | Ciptakan 5 area rumput subur. | Produksi | 140 | aktif |
| 7 | era1-07 | Sinar Matahari | Capai energi 45. | Ekosistem | 160 | aktif |
| 8 | era1-08 | Atmosfer Pertama | Capai kondisi atmosfer stabil (oksigen ≥ 45). | Ekosistem | 180 | aktif |
| 9 | era1-09 | Siklus Air | Aktifkan hujan. | Penemuan | 200 | aktif |
| 10 | era1-10 | Planet Selesai | Capai planet layak huni (tahap 5). | Legendaris | 500 | aktif |

### Era 2 — Primordial (Level 11–20)

Tema: Mikroorganisme pertama.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 11 | era2-01 | Awal Kecil | Temukan 3 spesies pertama. | Penemuan | 200 | aktif |
| 12 | era2-02 | Ledakan Mikroba | Miliki populasi 100. | Ekosistem | 180 | aktif |
| 13 | era2-03 | Sel Hijau | Temukan 4 spesies (proxy alga). | Penemuan | 200 | aktif |
| 14 | era2-04 | Produsen Oksigen | Bangun populasi fotosintetik (oksigen ≥ 55). | Ekosistem | 220 | aktif |
| 15 | era2-05 | Dunia Mikroba | Temukan 5 spesies (proxy mikroba). | Penemuan | 240 | aktif |
| 16 | era2-06 | Rantai Makanan Pertama | Buat 1 jaring makanan. | Ekosistem | 260 | aktif |
| 17 | era2-07 | Penguraian | Capai kesehatan ekosistem 55. | Ekosistem | 240 | aktif |
| 18 | era2-08 | Siklus Nutrisi | Seimbangkan nutrisi tanah (kesuburan ≥ 60). | Ekosistem | 260 | aktif |
| 19 | era2-09 | Keanekaragaman Mikroba | Miliki 12 agen fauna. | Penemuan | 280 | aktif |
| 20 | era2-10 | Asal Usul Kehidupan | Capai tahap 5. | Legendaris | 500 | aktif |

### Era 3 — Green Age (Level 21–30)

Tema: Tumbuhan dan hutan.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 21 | era3-01 | Benih Pertama | Tanam 10 pohon. | Produksi | 240 | aktif |
| 22 | era3-02 | Rumput Hijau | Tanam 20 rumput. | Produksi | 260 | aktif |
| 23 | era3-03 | Kekuatan Bunga | Tanam 5 bunga. | Penemuan | 280 | aktif |
| 24 | era3-04 | Arsitek Hutan | Tumbuhkan 15 pohon. | Produksi | 300 | aktif |
| 25 | era3-05 | Perluasan Hutan | Ciptakan hutan dengan 25 pohon. | Produksi | 320 | aktif |
| 26 | era3-06 | Surga Buah | Tanam 8 pohon berbunga/berbuah. | Produksi | 300 | aktif |
| 27 | era3-07 | Taman Lahan Basah | Buat 4 danau. | Ekosistem | 320 | aktif |
| 28 | era3-08 | Penemuan Botani | Temukan 5 spesies (proxy botani). | Penemuan | 340 | aktif |
| 29 | era3-09 | Biodiversitas Hutan | Capai vegetasi 70. | Ekosistem | 360 | aktif |
| 30 | era3-10 | Hutan Agung | Capai tahap 6. | Legendaris | 500 | aktif |

### Era 4 — Wildlife Age (Level 31–40)

Tema: Hewan dan rantai makanan.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 31 | era4-01 | Makhluk Pertama | Temukan 3 spesies (proxy fauna). | Penemuan | 320 | aktif |
| 32 | era4-02 | Surga Herbivora | Miliki 12 agen fauna. | Penemuan | 340 | aktif |
| 33 | era4-03 | Kedatangan Predator | Introduksi predator pertama (1 jaring makanan). | Ekosistem | 360 | aktif |
| 34 | era4-04 | Keluarga Hewan | Miliki 18 agen fauna. | Penemuan | 380 | aktif |
| 35 | era4-05 | Penghuni Langit | Miliki 20 agen hewan. | Penemuan | 400 | aktif |
| 36 | era4-06 | Perayap Kecil | Miliki 20 agen hewan aktif. | Penemuan | 380 | aktif |
| 37 | era4-07 | Kerajaan Reptil | Temukan 5 spesies (proxy reptil). | Penemuan | 400 | aktif |
| 38 | era4-08 | Keseimbangan Alam | Bentuk 2 jaring predator-mangsa. | Ekosistem | 420 | aktif |
| 39 | era4-09 | Suaka Satwa | Capai 20 agen satwa stabil. | Ekosistem | 440 | aktif |
| 40 | era4-10 | Kerajaan Hewan | Capai tahap 6. | Legendaris | 500 | aktif |

### Era 5 — Aquatic Age (Level 41–50)

Tema: Kehidupan air.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 41 | era5-01 | Masuk Laut | Bangun 1 samudra. | Penemuan | 400 | aktif |
| 42 | era5-02 | Ikan Pertama | Introduksi 5 ikan. | Penemuan | 420 | aktif |
| 43 | era5-03 | Taman Karang | Bangun 5 samudra. | Produksi | 440 | aktif |
| 44 | era5-04 | Pembangun Terumbu | Bangun 8 samudra. | Ekosistem | 460 | aktif |
| 45 | era5-05 | Laut Dalam | Bangun 12 samudra. | Eksplorasi | 480 | aktif |
| 46 | era5-06 | Raksasa Laut | Miliki 8 ikan. | Penemuan | 500 | aktif |
| 47 | era5-07 | Rantai Makanan Laut | Buat rantai makanan laut (2 jaring). | Ekosistem | 480 | aktif |
| 48 | era5-08 | Kehidupan Pesisir | Bangun 6 danau. | Ekosistem | 460 | aktif |
| 49 | era5-09 | Keanekaragaman Laut | Miliki 9 ikan di ekosistem laut. | Penemuan | 500 | aktif |
| 50 | era5-10 | Penguasa Samudra | Bangun 15 samudra. | Legendaris | 500 | aktif |

### Era 6 — Biodiversity Age (Level 51–60)

Tema: Ekosistem kompleks.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 51 | era6-01 | Kerajaan Jamur | Temukan 5 spesies (proxy jamur). | Penemuan | 500 | aktif |
| 52 | era6-02 | Jaringan Pengurai | Capai kesehatan ekosistem 70. | Ekosistem | 500 | aktif |
| 53 | era6-03 | Surga Penyerbuk | Miliki 20 agen fauna. | Ekosistem | 500 | aktif |
| 54 | era6-04 | Kehidupan Gurun | Bangun 20 area pasir. | Eksplorasi | 500 | aktif |
| 55 | era6-05 | Dunia Beku | Aktifkan salju. | Eksplorasi | 500 | aktif |
| 56 | era6-06 | Surga Tropis | Tanam 40 pohon. | Ekosistem | 500 | aktif |
| 57 | era6-07 | Hubungan Bioma | Capai tahap 6. | Ekosistem | 500 | aktif |
| 58 | era6-08 | Spesies Langka | Temukan 5 spesies. | Eksplorasi | 500 | aktif |
| 59 | era6-09 | Ledakan Biodiversitas | Capai 20 agen fauna aktif. | Ekosistem | 500 | aktif |
| 60 | era6-10 | Alam Sempurna | Capai tahap 6. | Legendaris | 500 | aktif |

### Era 7 — Civilization Age (Level 61–70)

Tema: Manusia dan desa.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 61 | era7-01 | Manusia Pertama | Capai skor Peradaban 30. | Peradaban | 500 | aktif |
| 62 | era7-02 | Desa Kecil | Capai skor Peradaban 35. | Peradaban | 500 | aktif |
| 63 | era7-03 | Ladang Pertama | Capai skor Peradaban 40. | Produksi | 500 | aktif |
| 64 | era7-04 | Pasokan Makanan | Capai skor Peradaban 45. | Produksi | 500 | aktif |
| 65 | era7-05 | Peternakan | Capai skor Peradaban 50. | Peradaban | 500 | aktif |
| 66 | era7-06 | Pertumbuhan Komunitas | Capai skor Peradaban 55. | Peradaban | 500 | aktif |
| 67 | era7-07 | Pengelolaan Air | Capai skor Peradaban 60. | Produksi | 500 | aktif |
| 68 | era7-08 | Ekonomi Desa | Capai skor Peradaban 65. | Peradaban | 500 | aktif |
| 69 | era7-09 | Masyarakat Berkembang | Capai skor Peradaban 68. | Peradaban | 500 | aktif |
| 70 | era7-10 | Peradaban Dimulai | Capai skor Peradaban 70. | Legendaris | 500 | aktif |

### Era 8 — Industrial Age (Level 71–80)

Tema: Teknologi dan industri.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 71 | era8-01 | Workshop Pertama | Capai skor Industri 50. | Peradaban | 500 | aktif |
| 72 | era8-02 | Operasi Pertambangan | Capai skor Industri 52. | Produksi | 500 | aktif |
| 73 | era8-03 | Penemuan Energi | Capai skor Industri 54. | Produksi | 500 | aktif |
| 74 | era8-04 | Tenaga Angin | Capai skor Industri 56. | Produksi | 500 | aktif |
| 75 | era8-05 | Revolusi Surya | Capai skor Industri 58. | Produksi | 500 | aktif |
| 76 | era8-06 | Pertumbuhan Industri | Capai skor Industri 60. | Peradaban | 500 | aktif |
| 77 | era8-07 | Sistem Transportasi | Capai skor Industri 62. | Peradaban | 500 | aktif |
| 78 | era8-08 | Dampak Lingkungan | Capai skor Industri 64. | Ekosistem | 500 | aktif |
| 79 | era8-09 | Teknologi Hijau | Capai skor Industri 66. | Produksi | 500 | aktif |
| 80 | era8-10 | Peradaban Berkelanjutan | Capai skor Industri 68. | Legendaris | 500 | aktif |

### Era 9 — Advanced Age (Level 81–90)

Tema: Ekosistem futuristik.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 81 | era9-01 | Riset Lanjutan | Capai skor AI 65. | Peradaban | 500 | aktif |
| 82 | era9-02 | Penemuan Genetik | Capai skor AI 67. | Penemuan | 500 | aktif |
| 83 | era9-03 | Pertanian Cerdas | Capai skor AI 69. | Produksi | 500 | aktif |
| 84 | era9-04 | Perlindungan Satwa | Capai skor AI 71. | Ekosistem | 500 | aktif |
| 85 | era9-05 | Kendali Iklim | Capai skor AI 73. | Ekosistem | 500 | aktif |
| 86 | era9-06 | Ekosistem Otomatis | Capai skor AI 75. | Ekosistem | 500 | aktif |
| 87 | era9-07 | Kecerdasan Buatan | Capai skor AI 77. | Peradaban | 500 | aktif |
| 88 | era9-08 | Evolusi Genetik | Capai skor AI 79. | Penemuan | 500 | aktif |
| 89 | era9-09 | Optimasi Planet | Capai skor AI 81. | Ekosistem | 500 | aktif |
| 90 | era9-10 | Peradaban Sempurna | Capai skor AI 83. | Legendaris | 500 | aktif |

### Era 10 — Cosmic Age (Level 91–100)

Tema: Planet legendaris.

| Level | ID | Misi | Target | Tipe | Reward XP | Status |
|---:|---|---|---|---|---:|---|
| 91 | era10-01 | Penemuan Kosmik | Capai skor Kosmik 55. | Eksplorasi | 500 | aktif |
| 92 | era10-02 | Kehidupan Alien | Capai skor Kosmik 57. | Penemuan | 500 | aktif |
| 93 | era10-03 | Dunia Kristal | Capai skor Kosmik 59. | Eksplorasi | 500 | aktif |
| 94 | era10-04 | Pulau Melayang | Capai skor Kosmik 61. | Eksplorasi | 500 | aktif |
| 95 | era10-05 | Makhluk Purba | Capai skor Kosmik 63. | Penemuan | 500 | aktif |
| 96 | era10-06 | Jaringan Planet | Capai skor Kosmik 65. | Peradaban | 500 | aktif |
| 97 | era10-07 | Evolusi Kosmik | Capai skor Kosmik 67. | Penemuan | 500 | aktif |
| 98 | era10-08 | Planet Hidup | Capai skor Kosmik 69. | Legendaris | 1000 | aktif |
| 99 | era10-09 | Penjaga Semesta | Capai skor Kosmik 71. | Legendaris | 2000 | aktif |
| 100 | era10-10 | Dewa Pencipta | Capai skor Kosmik 73. | Legendaris | 2000 | aktif |

## Hook QA

- `?debug=1` → `window.__game.campaign()` (level, era, misi aktif, progress, total misi, `systems.scores`, `systems.tiers`) dan `window.__game.tutorial()`.
- `?campaign=1` → panel 10 era/100 misi; status aktif/selesai tanpa kunci.
- `?tutorial=1` → paksa ulang FTUE dari langkah 1; `?tutorial=0` mematikan panduan.
- `?menu=0` → lewat menu saat menguji panel campaign.

Buka panel campaign tidak mengubah sim, DNA, atau draw call.

