# Aquaria + Aquatic Biome — v0.10.0

## Status saat ini (v0.15.9)

- Spesifikasi v0.10 tetap berlaku untuk ocean, arus, terumbu, plankton, dan guild laut.
- Siklus aktual Aquaria adalah **120 tick**: 0–32, 33–64, 65–91, 92–119 (360 tick di bawah adalah spec historis).
- Faktor mortalitas reef-adapted aktual `0,003` = **1/4** dari baseline `0,012`, bukan 1/3.
- Kesembilan planet aktif; tidak ada lagi planet “data-only”.
- Sejak v0.15.7, pemilih 9 planet tersedia permanen di menu utama. `?planet=` tetap hook QA.


Tujuan: menambahkan planet kelima dengan arus, terumbu, plankton, pemutihan, dan food web laut tanpa mengubah renderer fauna atau ritual build.

## Status planet

| Planet | Status | Spesies | Sistem khusus |
|---|---|---|---|
| Terra | aktif | 12 | legacy climate (tidak berubah sejak v0.7) |
| Dune | aktif | 12 | desert climate baseline |
| Glaciera | aktif | 12 | `freeze-thaw`, empat musim, danau beku |
| Inferna | aktif | 12 | `volcanic-eruption`, empat musim, lava/abu |
| Aquaria | aktif di v0.10 | 12 | `coral-health`, empat musim, arus/plankton |
| empat planet lain | aktif di v0.15.9 | — | — |

`isSupportedPlanet()` sekarang menerima kesembilan `PLANET_IDS`.

## Musim dan laut

`activeSeason()` tetap menghitung fase dari `planet.tick % totalDurasi`. Total durasi Aquaria 360 tick pada spec v0.10; aktual v0.15.9 adalah 120 tick. `eco.ocean` adalah ringkasan turunan, bukan state musim tersimpan.

| Musim | Tick | Modifikasi suhu | Efek |
|---|---|---|---|
| Musim Arus Tenang | 0–99 | +1 | arus rendah, terumbu pulih |
| Musim Air Hangat | 100–194 | +5 | pemutihan naik |
| Musim Ledakan Plankton | 195–274 | −1 | plankton melimpah, pemutihan turun |
| Musim Badai Laut | 275–359 | −4 | arus kuat, air naik, vegetasi turun |

`eco.ocean` berisi:

- `seasonId`, `seasonName`, `phase`
- `current` 0–100
- `reefHealth` 0–100
- `plankton` 0–100
- `bleaching` 0–100
- `dissolvedOxygen` 0–100

Rumus ringkas:

```text
currentTarget   = 30 / 45 / 60 / 85 sesuai musim + objek ocean/lake
planktonTarget  = 65 / 55 / 95 / 42 sesuai musim + fertility*0.06 + bakteri*0.1
bleachTarget    = clamp((temperature - 30) * 7 + phaseBonus + current*0.08)
reefTarget      = clamp(100 - bleaching*0.75 + coral_algae*0.12 + reefCoverage*0.12)
oxygenTarget    = dissolvedOxygen*10 + plankton*0.15 - temperature*0.6 - bleaching*0.2
```

`phaseBonus` = +12 saat air hangat, +18 saat badai laut, −10 saat ledakan plankton, 0 saat arus tenang. Arus dan pemutihan memakai inersia, sehingga arus masih bisa tinggi beberapa tick setelah badai berakhir; penurunan pemutihan dan pemulihan terumbu menjadi penanda transisi.

## Dampak ekologis

- `habitatContext.aquatic` Aquaria dinamis: `dissolvedOxygen`, `waterQuality`, `current`, dan `reefCoverage` mengikuti `eco.ocean`, bukan konstanta config.
- Sumber `plankton` untuk ikan terumbu sekarang memakai `eco.ocean.plankton`; planet lain tetap memakai rumus lama sehingga angka Terra/Dune/Glaciera/Inferna tidak berubah.
- Vegetasi memakai faktor `1 - bleaching*0.25` dan modifier musim.
- `bleaching` menambah mortalitas. Trait `reef-building`, `salt-filter`, `current-anchoring`, dan `nutrient-recycling` mengurangi faktor menjadi `0,003` (1/4 dari baseline `0,012`, bukan 1/3).
- Hazard prioritas: badai laut → pemutihan karang → gelombang panas laut → kekeringan musiman, setelah hazard cuaca/kryosfer/volkanik.
- Kapasitas agen visual untuk `bird` dan `insect` mendapat bonus dari objek `ocean`/`lake` hanya saat planet akuatik aktif.

## Guild Aquaria

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `aquaria_sea_turtle`, `aquaria_manatee` |
| `fox` | `aquaria_octopus`, `aquaria_shark` |
| `bird` | `aquaria_dolphin` |
| `fish` | `aquaria_reef_fish`, `aquaria_crab` |
| `insect` | `aquaria_marine_bacteria` |

Lumba-lumba memakai proksi guild burung permukaan; bakteri laut memakai proksi serangga. Tidak ada objek `fish`, tetapi agen guild ikan muncul dari `ocean`/`lake`.

## Cara mengakses

- `?planet=aquaria`
- `window.__game.setPlanet('aquaria', 9999)`
- Hook: `state()`, `eco()`, `ocean()`, `foodWeb()`, `ecoScore('aquaria_reef_fish')`
- Panel `?eco=1` menampilkan `Ekologi Aquaria` dan baris musim/arus/karang/plankton/pemutihan.

## Gate

- 12 populasi Aquaria; tidak ada kebocoran Terra/Dune/Glaciera/Inferna.
- Suhu awal tropis 20–32°C, air >80, empat musim terurut selama 120 tick pada v0.15.9 (spec historis: 360 tick).
- Plankton naik saat bloom, pemutihan naik saat air hangat, arus naik saat badai laut.
- Terumbu tetap >0 dan 12 spesies tetap hidup setelah satu siklus penuh.
- Agen ikan dan mikroba muncul; guild predator terhubung ke ikan terumbu via food web.
- Save/load mempertahankan `planetId`, `eco.ocean`, dan populasi.
- Fauna + ekosistem deterministik untuk seed sama.
- DNA lengkap mempertahankan `aquaria`; DNA v2 lawas tetap Terra.
- Terra, Dune, Glaciera, dan Inferna tidak berubah secara numerik dari gate v0.9.

## Batas

- Belum ada animasi arus, partikel gelembung, atau shade terumbu khusus; `ocean` saat ini memengaruhi sim/HUD.
- Palette Aquaria belum dipakai renderer secara khusus.
- Pemilih 9 planet tersedia permanen di menu utama sejak v0.15.7; `?planet=` tetap hook QA.
- Mycelia, Sakura, Aurelia, dan Cosmos aktif sejak v0.11–v0.14.
