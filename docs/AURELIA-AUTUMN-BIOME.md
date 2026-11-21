# Aurelia + Autumn Biome — v0.13.0

Tujuan: menambahkan planet kedelapan dengan hutan musim gugur, serasah daun, penyimpanan makanan, dan hibernasi tanpa menambah draw call atau object type baru.

## Status planet

| Planet | Status | Spesies | Sistem khusus |
|---|---|---|---|
| Terra | aktif | 12 | legacy climate (tidak berubah sejak v0.7) |
| Dune | aktif | 12 | desert climate baseline |
| Glaciera | aktif | 12 | `freeze-thaw`, empat musim, danau beku |
| Inferna | aktif | 12 | `volcanic-eruption`, empat musim, lava/abu |
| Aquaria | aktif | 12 | `coral-health`, empat musim, arus/plankton |
| Mycelia | aktif | 11 | `fungal-network`, empat musim, spora/cahaya |
| Sakura | aktif | 11 | `floating-connectivity`, empat musim, mekar/angin |
| Aurelia | aktif di v0.13 | 11 | `leaf-fall`, empat musim, simpanan/hibernasi |
| Cosmos | data-only | — | — |

`isSupportedPlanet()` sekarang menerima `terra`, `dune`, `glaciere`, `inferna`, `aquaria`, `mycelia`, `sakura`, `aurelia`.

## Musim dan hutan

Total durasi Aurelia 360 tick. `eco.forest` adalah ringkasan turunan dari `planet.tick`, cuaca, dan populasi.

| Musim | Tick | Modifikasi utama | Efek |
|---|---|---|---|
| Musim Semi | 0–84 | suhu +3, kelembapan +10, air +12 | simpanan rendah, hibernasi turun |
| Musim Panas | 85–179 | suhu +8, air −8 | simpanan naik |
| Musim Gugur | 180–269 | suhu −2, kelembapan +6 | serasah dan simpanan maksimal |
| Musim Dingin | 270–359 | suhu −11 | hibernasi dan stres embun naik |

`eco.forest` berisi:

- `seasonId`, `seasonName`, `phase`
- `leafLitter` 0–100 — serasah daun kering
- `storage` 0–100 — cadangan makanan
- `hibernation` 0–100 — aktivitas hibernasi
- `frostStress` 0–100 — stres embun beku

Rumus ringkas:

```text
leafLitterTarget  = base musim (15/15/80/55)
storageTarget     = base musim (30/65/85/55)
hibernationTarget = base musim (40/5/15/85)
frostStressTarget = max(0, 8-temperature)*6 + (winter ? 14 : 0)
```

## Dampak ekologis

- Faktor vegetasi Aurelia: `1 + (leafLitter-50)*0.002 + storage*0.001 - frostStress*0.001`.
- Fertilitas Aurelia: `+ leafLitter*0.006 + storage*0.004 - hibernation*0.002`.
- `frostStress` menambah mortalitas; trait `leaf-fall`, `food-storage`, `hibernation`, dan `leaf-litter-digestion` menurunkan faktor menjadi sekitar sepertiga.
- Hazard prioritas: badai hujan → dingin → kriogenik → vulkanik → laut → fungal → langit → **embun beku → badai daun → kekeringan musim panas** → kekeringan musiman.
- Tidak ada object type baru; maple, ek, dan rumput memakai `tree`/`bush`/`grass`.

## Guild Aurelia

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `aurelia_deer`, `aurelia_wild_boar`, `aurelia_squirrel`, `aurelia_rabbit` |
| `fox` | `aurelia_red_fox`, `aurelia_lynx` |
| `bird` | `aurelia_forest_owl` |
| `fish` | — (danau musiman tidak berisi ikan) |
| `insect` | `aurelia_leaf_fungi` (proksi detritivor) |

Jamur daun memakai proksi serangga untuk agen visual.

## Cara mengakses

- `?planet=aurelia`
- `window.__game.setPlanet('aurelia', 8765)`
- Hook: `state()`, `eco()`, `forest()`, `foodWeb()`, `ecoScore('aurelia_deer')`
- Panel `?eco=1` menampilkan `Ekologi Aurelia` dan baris serasah/simpanan/hibernasi/embun.

## Gate

- 11 populasi Aurelia; tidak ada kebocoran spesies planet lain.
- Empat musim deterministik selama 360 tick.
- Simpanan naik saat Panas/Gugur, serasah naik saat Gugur, hibernasi dan embun naik saat Dingin.
- 11 spesies tetap hidup setelah satu siklus penuh.
- Guild Aurelia memetakan kijang, rubah, lynx, dan burung hantu; predator terhubung ke food web.
- Save/load mempertahankan `planetId`, `eco.forest`, dan populasi.
- DNA lengkap mempertahankan `aurelia`.
- Tujuh planet sebelumnya tidak berubah secara numerik dari gate v0.12.
- App chunk <100 kB.

## Batas

- Belum ada partikel daun gugur atau warna kanopi dinamis.
- Tidak ada UI selector planet permanen; akses lewat query param/debug hook untuk QA.
- Cosmos masih data-only.
