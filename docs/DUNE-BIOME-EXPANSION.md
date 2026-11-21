# Dune + Biome Expansion — v0.7.0

Tujuan: mengaktifkan planet kedua dengan ekosistemnya sendiri tanpa mengubah format DNA, renderer fauna, atau ritual build.

## Planet aktif

| Planet | Status | Spesies ekologis |
|---|---|---|
| Terra | aktif sejak v0.5 | 12 |
| Dune | aktif di v0.7 | 12 |
| Glaciera | aktif di v0.8 | 12 (lihat dokumen sendiri) |
| Inferna | aktif di v0.9 | 12 (lihat dokumen sendiri) |
| Aquaria | aktif di v0.10 | 12 (lihat dokumen sendiri) |
| Mycelia | aktif di v0.11 | 11 (lihat dokumen sendiri) |
| Sakura | aktif di v0.12 | 11 (lihat dokumen sendiri) |
| dua planet lain | config/data saja, belum disimulasikan | — |

Daftar aktif berada di `GUILD_PROFILES`. `isSupportedPlanet()` dipakai oleh `createPlanet()` dan QA hook supaya planet yang belum aktif tidak menghasilkan state ekologis palsu.

## Generalisasi yang dilakukan

- `EcosystemManager` tidak lagi singleton Terra. `ecosystemFor(planetId)` memilih manager Terra atau Dune.
- `initializeEcosystem()` dan `stepEcosystem()` dipanggil oleh engine/migrasi tanpa peduli planet.
- `guilds.ts` memetakan guild visual per planet, termasuk food source dan objek target.
- `Hud` dan `ecoScore()` mengambil config dari planet saat ini, bukan `terraConfig` tetap.
- `reset()` dan tombol planet baru mempertahankan `planetId` aktif.
- `vite.config.ts` memisahkan `planet-configs` chunk agar app chunk kembali <100 kB.

## Iklim Dune

Dune memakai `startingEnvironment` dan `climate` dari `duneConfig`:

- suhu awal 34°C, air 20, kelembapan 22, oksigen 64, kesuburan 30.
- target suhu dan kelembapan mengikuti `climate.baseTemperature` / `baseHumidity`.
- air ditarik pelan ke `climate.baseWater` supaya oasis tidak mengering total.
- toleransi IDEAL untuk Dune berbasis kondisi awalnya, sehingga suhu 34°C dan air 20 bukan dianggap "buruk" secara absolut.
- Terra sengaja mempertahankan tuning lama supaya seluruh gate v0.5/v0.6 tidak berubah.

## Guild Dune

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `dune_camel`, `dune_desert_hare`, `dune_gazelle` |
| `fox` | `dune_fennec_fox`, `dune_snake` |
| `bird` | `dune_vulture` |
| `fish` | tidak ada — kapasitas agen dipaksa 0 |
| `insect` | `dune_lizard`, `dune_dung_beetle` |

Rubah visual mengejar `deer`/`insect`; nasar mengejar `deer`. Kadal dan kumbang memakai model serangga; ini adalah proksi visual, bukan klaim taksonomi.

## Cara mengakses

- URL: `?planet=dune` (save lama Terra tetap dipakai jika tanpa parameter ini).
- Debug: `window.__game.setPlanet('dune', 6161)`.
- Hook terkait: `state()`, `eco()`, `foodWeb()`, `ecoScore('dune_camel')`.
- Panel `?eco=1` menampilkan judul `Ekologi Dune` dan 12 spesies Dune.

## Gate

- Dune punya 12 populasi, tidak ada kebocoran spesies Terra.
- Suhu >25°C dan air <45 setelah 200 tick.
- Fauna dan ekosistem Dune deterministik untuk seed sama.
- Save/load Dune mempertahankan `planetId` dan populasi.
- Tidak ada agen ikan di Dune.
- App chunk <100 kB; config planet berada di chunk terpisah.

## Batas

- Ini bukan editor biome penuh; tujuh planet lain masih data-only.
- Tidak ada pilihan planet di UI utama saat ini; akses lewat query param/debug hook untuk QA.
- CUACA Dune masih memakai empat tipe cuaca global, belum `badai-pasir` khusus.
- Palette warna Dune belum dipakai renderer; terrain tetap memakai bentuk generik dengan `terrainConfig` Dune.
