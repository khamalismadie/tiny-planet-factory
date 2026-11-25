# Sakura + Floral Biome — v0.12.0

## Status saat ini (v0.16.0)

- Spesifikasi v0.12 tetap berlaku untuk sky, mekar, angin, dan konektivitas vertikal.
- Siklus aktual Sakura adalah **120 tick**: 0–26, 27–51, 52–84, 85–119 (360 tick di bawah adalah spec historis).
- Faktor mortalitas sky-adapted aktual `0,004` vs `0,014` ≈ **0,29**, bukan tepat sepertiga.
- Sejak v0.15.7, pemilih 9 planet tersedia permanen di menu utama. `?planet=` tetap hook QA.
- Partikel kelopak dan shader mekar belum diimplementasikan.


Tujuan: menambahkan planet ketujuh dengan pulau melayang, siklus mekar, angin langit, dan konektivitas vertikal tanpa menambah draw call atau object type baru.

## Status planet

| Planet | Status | Spesies | Sistem khusus |
|---|---|---|---|
| Terra | aktif | 12 | legacy climate (tidak berubah sejak v0.7) |
| Dune | aktif | 12 | desert climate baseline |
| Glaciera | aktif | 12 | `freeze-thaw`, empat musim, danau beku |
| Inferna | aktif | 12 | `volcanic-eruption`, empat musim, lava/abu |
| Aquaria | aktif | 12 | `coral-health`, empat musim, arus/plankton |
| Mycelia | aktif | 11 | `fungal-network`, empat musim, spora/cahaya |
| Sakura | aktif di v0.12 | 11 | `floating-connectivity`, empat musim, mekar/angin |
| Aurelia | aktif di v0.13 | 11 | `leaf-fall`, empat musim, simpanan/hibernasi |
| Cosmos | aktif di v0.14 | 10 | `crystal-storage`, empat fase, radiasi/gravitasi |

`isSupportedPlanet()` sekarang menerima kesembilan `PLANET_IDS`.

## Musim dan pulau melayang

Total durasi Sakura 360 tick pada spec v0.12; aktual v0.15.9 adalah 120 tick. `eco.sky` adalah ringkasan turunan dari `planet.tick`, cuaca, dan populasi.

| Musim | Tick | Modifikasi utama | Efek |
|---|---|---|---|
| Musim Mekar | 0–79 | humidity +8, water +6 | mekar maksimal, konektivitas sehat |
| Gugur Kelopak | 80–154 | wind +10 | mekar turun |
| Angin Langit | 155–254 | humidity −12, water −12 | angin kuat, konektivitas turun |
| Langit Tenang | 255–359 | temperature −5 | konektivitas pulih |

`eco.sky` berisi:

- `seasonId`, `seasonName`, `phase`
- `connectivity` 0–100 — jembatan/konektivitas pulau melayang
- `wind` 0–100 — kekuatan angin
- `blossom` 0–100 — intensitas mekar
- `uplift` 0–100 — ketinggian relatif ekosistem
- `isolationStress` 0–100 — stres isolasi pulau

Rumus ringkas:

```text
windTarget           = base musim + bonus badai 12
blossomTarget        = base musim
connectivityTarget   = base musim + jumlah_pohon*1.5
upliftTarget         = base musim
isolationStressTarget = max(0, wind-65)*1.8 + max(0, 55-connectivity)
```

## Dampak ekologis

- Faktor vegetasi Sakura: `1 + (connectivity-50)*0.003 - wind*0.0015`, dikalikan modifier musim.
- Mekar menambah `blossom*0.01` pada fertilitas dan oksigen setelah target dasar.
- `isolationStress` menambah mortalitas; trait `wind-dispersal`, `blossom-season`, `vertical-growth`, dan `seed-dispersal` menurunkan faktor menjadi `0,004` vs `0,014` (≈0,29, bukan tepat sepertiga).
- Hazard prioritas: badai hujan → dingin → kriogenik → vulkanik → laut → fungal → **putusnya pulau melayang → angin kencang → kekeringan awan** → kekeringan musiman.
- Tidak ada object type baru; pohon sakura, rumput awan, dan anggrek langit memakai `tree`/`grass`/`flower`.

## Guild Sakura

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `sakura_blossom_deer`, `sakura_sky_rabbit`, `sakura_cloud_goat` |
| `fox` | `sakura_wind_fox` |
| `bird` | `sakura_sky_hawk`, `sakura_hummingbird` |
| `fish` | — (danau langit tidak berisi ikan) |
| `insect` | `sakura_petal_butterfly` |

Elang langit dan kolibri memakai proksi guild burung. `sakura_sky_mushroom` tetap dekomposer dan tidak membuat agen visual.

## Cara mengakses

- `?planet=sakura`
- `window.__game.setPlanet('sakura', 5678)`
- Hook: `state()`, `eco()`, `sky()`, `foodWeb()`, `ecoScore('sakura_blossom_deer')`
- Panel `?eco=1` menampilkan `Ekologi Sakura` dan baris konektivitas/angin/mekar/stres.

## Gate

- 11 populasi Sakura; tidak ada kebocoran spesies planet lain.
- Empat musim deterministik selama 120 tick pada v0.15.9 (spec historis: 360 tick).
- Mekar turun saat Gugur Kelopak; angin dan stres isolasi naik saat Angin Langit; konektivitas pulih saat Langit Tenang.
- 11 spesies tetap hidup setelah satu siklus penuh.
- Guild Sakura memetakan kijang bunga, elang, dan kupu-kupu; predator terhubung ke food web.
- Save/load mempertahankan `planetId`, `eco.sky`, dan populasi.
- DNA lengkap mempertahankan `sakura`.
- Enam planet sebelumnya tidak berubah secara numerik dari gate v0.11.
- App chunk <100 kB.

## Batas

- Belum ada partikel kelopak atau jembatan visual antar-pulau.
- Tidak ada shader warna dinamis untuk mekar; `sky` saat ini memengaruhi sim/HUD.
- Pemilih 9 planet tersedia permanen di menu utama sejak v0.15.7; `?planet=` tetap hook QA.
- Nine Worlds lengkap; lihat dokumen Cosmos.
