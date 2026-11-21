# Inferna + Volcanic Biome — v0.9.0

Tujuan: menambahkan planet keempat dengan musim letusan, panas ekstrem, lava, abu, dan food web sendiri tanpa mengubah ritual build atau format save.

## Status planet

| Planet | Status | Spesies | Sistem khusus |
|---|---|---|---|
| Terra | aktif | 12 | legacy climate (tidak berubah sejak v0.7) |
| Dune | aktif | 12 | desert climate baseline |
| Glaciera | aktif | 12 | `freeze-thaw`, empat musim, danau beku |
| Inferna | aktif di v0.9 | 12 | `volcanic-eruption`, empat musim, lava/abu |
| lima planet lain | data-only | — | — |

`isSupportedPlanet()` sekarang menerima `terra`, `dune`, `glaciere`, `inferna`.

## Musim dan gunung berapi

`activeSeason()` tetap menghitung fase dari `planet.tick % totalDurasi` memakai `climate.seasons` pada config. Inferna tidak menyimpan state musim terpisah; `eco.volcano` hanya menjadi ringkasan Turunan.

Urutan musim Inferna:

| Musim | Tick | Modifikasi suhu | Efek |
|---|---|---|---|
| Masa Tenang | 0–99 | −8 | abu rendah, vegetasi pulih |
| Musim Hujan Abu | 100–174 | −4 | abu naik, vegetasi turun |
| Masa Letusan | 175–229 | +16 | panas/lava/stres melonjak |
| Musim Tumbuh Kembali | 230–319 | −5 | abu dan stres mereda |

Batas suhu non-legacy dinaikkan dari 50 menjadi 120 derajat supaya letusan tidak terpotong; Terra tetap memakai batas 50 sehingga seluruh angka gate v0.5–v0.8 tidak berubah.

`eco.volcano` berisi:

- `seasonId`, `seasonName`, `phase`
- `heat` 0–100
- `lavaFlow` 0–100
- `ash` 0–100
- `eruptionStress` 0–100

Rumus ringkas:

```text
heatTarget        = clamp((temperature - 40) / 50 * 100)
heat              = approach(previousHeat, heatTarget, 0.08)
lavaTarget        = clamp(heat * 0.55 + mountainCount * 4 + eruptionBonus)
ashTarget         = clamp(ashBase + mountainCount * 2 - regrowthBonus)
eruptionStress    = approach(|heat - previousHeat| * 3 + lavaFlow * 0.2
                            + ash * 0.25 + phaseBoost, 0.25)
```

`eruptionBonus` = 25 saat letusan. `ashBase` = 75 saat letusan, 55 saat hujan abu, 10 di musim lain. `phaseBoost` = 45 saat letusan, 12 saat hujan abu, 0 di musim lain.

Karena pendekatan memakai caching suhu, `heat` masih bisa tinggi beberapa tick setelah memasuki Musim Tumbuh Kembali; abu dan stres yang lebih dulu turun menjadi indikator pemulihan.

## Dampak ekologis

- Vegetasi Inferna memakai faktor panas `1 - heat*0.35` dan modifier musim, bukan penalty generik `temperature > 40`.
- `eruptionStress` menambah mortalitas. Trait `heat-resistance`, `heat-shield`, `thermophilic-enzymes`, `ash-deposition-recovery`, dan `post-eruption-regrowth` mengurangi faktor mortalities menjadi sepertiga.
- Hazard di `habitatContextFor()` mengikuti prioritas: erupsi gunung berapi → aliran lava → hujan abu → gelombang panas → kekeringan musiman.
- Predator puncak diberi trait tahan panas dan reproduksi lebih cepat supaya siklus letusan tidak memusnahkan guild dalam satu putaran musim.
- Misi tetap memakai batas ideal per planet; target Inferna tidak menyamakan suhu 72°C dengan standar Terra.

## Guild Inferna

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `inferna_ash_grazer`, `inferna_rock_tortoise` |
| `fox` | `inferna_magma_lizard`, `inferna_ash_jackal`, `inferna_ash_wolf` |
| `bird` | `inferna_fire_hawk` |
| `fish` | tidak ada |
| `insect` | `inferna_ember_beetle`, `inferna_lava_crab`, `inferna_heat_fungi` |

Elang api, serigala abu, dan kadal magma memakai proksi visual yang sudah ada. Kumbang bara dan kepiting lava masuk guild serangga; jamur panas menjadi dekomposer. Tidak ada objek `fish` dan tidak ada ikan yang muncul.

## Cara mengakses

- `?planet=inferna`
- `window.__game.setPlanet('inferna', 8888)`
- Hook: `state()`, `eco()`, `volcano()`, `foodWeb()`, `ecoScore('inferna_fire_hawk')`
- Panel `?eco=1` menampilkan `Ekologi Inferna` dan baris musim/panas/lava/abu/stres.

## Gate

- 12 populasi Inferna; tidak ada kebocoran Terra/Dune/Glaciera.
- Suhu awal >60°C, air <25, empat musim terurut.
- Abu naik di `ash-fall`, panas/lava/stres naik di `eruption-phase`, abu/stres turun di `regrowth`.
- Suhu letusan >75°C; 12 spesies tetap hidup hingga tick 235.
- `guildStatus('fish')` bernilai `null` dan jumlah agen ikan nol.
- Save/load mempertahankan `planetId`, `eco.volcano`, dan populasi.
- Fauna + ekosistem deterministik untuk seed sama.
- DNA lengkap mempertahankan `inferna`; DNA v2 lawas tetap Terra.
- Terra, Dune, dan Glaciera tidak berubah secara numerik dari gate v0.8.

## Batas

- Belum ada palette renderer khusus Inferna; warna lava masih memakai primary/accent config.
- Belum ada partikel abu atau aliran lava visual; `volcano` saat ini memengaruhi sim/HUD.
- Tidak ada UI selector planet permanen; akses lewat query param/debug hook untuk QA.
- Aquaria, Mycelia, Sakura, Aurelia, dan Cosmos masih data-only.
