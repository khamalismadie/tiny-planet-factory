# Glaciera + Cold Biome — v0.8.0

Tujuan: menambahkan planet ketiga dengan musim, pembekuan, dan food web sendiri tanpa mengubah format DB/SDK yang sudah dipakai pemain.

## Status planet

| Planet | Status | Spesies | Sistem khusus |
|---|---|---|---|
| Terra | aktif | 12 | legacy climate (sengaja tidak berubah sejak v0.7) |
| Dune | aktif | 12 | desert climate baseline |
| Glaciera | aktif di v0.8 | 12 | `freeze-thaw`, empat musim, danau beku |
| Inferna | aktif di v0.9 | 12 | `volcanic-eruption`, empat musim, lava/abu |
| lima planet lain | data-only | — | — |

`isSupportedPlanet()` sekarang menerima `terra`, `dune`, `glaciere`, `inferna`.

## Musim dan kryosfer

`activeSeason()` menghitung musim secara deterministik dari `planet.tick % totalDurasi` memakai `climate.seasons` pada config. Tidak ada state musim tersimpan selain `eco.cryo`, sehingga seed + tick selalu cukup untuk mereplay.

Urutan musim Glaciera:

| Musim | Tick | Temperatur | Efek |
|---|---|---|---|
| Malam Kutub | 0–109 | −12 | freeze naik, vegetasi turun |
| Musim Cair | 110–189 | +6 | freeze turun, stres cair naik |
| Musim Panas Singkat | 190–259 | +10 | freeze terendah |
| Musim Pembekuan | 260–359 | −9 | es kembali terbentuk |

`eco.cryo` berisi:

- `seasonId`, `seasonName`, `phase`
- `freeze` 0–100
- `iceCoverage` 0–100
- `snowCover` 0–100
- `thawStress` 0–100

Rumus ringkas:

```text
freezeTarget = clamp(50 - temperature * 2.5 + season.temperatureModifier * -1.5)
freeze       = approach(previousFreeze, freezeTarget, 0.08)
thawStress   = approach(|freeze - previousFreeze| * 4, 0.3)
```

`iceCoverage` juga bertambah dengan `ocean`/`lake` yang ditempatkan. `snowCover` mengikuti freeze + humidity. Keduanya dibatasi 0–100.

## Dampak ekologis

- Vegetasi Glaciera tidak lagi kena penalty generik `temperature < 0`; ia memakai `1 - freeze*0.3` dan `season.vegetationModifier`.
- `thawStress` menambah mortalitas. Spesies dengan trait `freeze-tolerance` atau `cold-dormancy` mendapat faktor lebih kecil.
- `habitatContextFor()` menandai `pencairan-glasial` saat `thawStress > 55`.
- Misi memakai batas ideal per planet, bukan angka absolut Terra. Desert dan tundra kini punya target misi sendiri.
- Terra sengaja tetap memakai jalur lama supaya seluruh angka gate v0.5–v0.7 tidak berubah.

## Guild Glaciera

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `glaciere_reindeer`, `glaciere_arctic_hare`, `glaciere_musk_ox` |
| `fox` | `glaciere_arctic_fox`, `glaciere_polar_bear` |
| `bird` | `glaciere_snow_owl` |
| `fish` | `glaciere_ice_fish`, `glaciere_seal` |
| `insect` | `glaciere_cold_fungi` |

Rubah mengejar `deer`/`fish`; burung hantu mengejar `deer`. Beruang kutub dan anjing laut memakai proksi visual yang sudah ada, bukan aset baru.

## Perbaikan DNA

DNA lengkap kini menyimpan `planetId` sebagai **byte tambahan di akhir payload**, sebelum CRC. Kode lama tanpa byte itu tetap dibaca sebagai Terra. Kode pendek tetap seed-only dan tidak berubah.

```text
TPF-... | payload v2 | [planetId] | CRC16
```

`encodePlanetDnaLegacy()` dipakai sim-test untuk memastikan kompatibilitas mundur.

## Cara mengakses

- `?planet=glaciere`
- `window.__game.setPlanet('glaciere', 7777)`
- Hook: `state()`, `eco()`, `cryo()`, `foodWeb()`, `ecoScore('glaciere_ice_fish')`
- Panel `?eco=1` menampilkan judul `Ekologi Glaciera`, 12 spesies, dan baris musim/es/salju/stres.

## Gate

- 12 populasi Glaciera; tidak ada kebocoran Terra/Dune.
- Suhu awal <0°C, air >55, empat musim terurut.
- Freeze turun dari Malam Kutub ke Musim Cair ke Musim Panas Singkat.
- `iceCoverage > 0` bila danau/samudra ditempatkan.
- Agen akuatik ≤10.
- Save/load mempertahankan `planetId`, musim, dan populasi.
- Fauna + ekosistem deterministik untuk seed sama.
- DNA v2 lawas tetap terbaca sebagai Terra; DNA baru mempertahankan `dune`/`glaciere`.

## Batas

- Belum ada cuaca khusus `badai-salju`; cuaca global tetap empat tipe.
- Palette Glaciera belum dipakai renderer.
- Enam planet lain masih data-only.
- Tidak ada UI selector planet permanen; akses lewat query param/debug hook untuk QA.
