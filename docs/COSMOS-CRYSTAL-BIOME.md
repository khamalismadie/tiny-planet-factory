# Cosmos + Crystal Biome — v0.14.0

## Status saat ini (v0.15.9)

- Spesifikasi v0.14 tetap berlaku untuk pemakaian ulang slot `eco.sky`, kristal, radiasi, gravitasi, dan fase meteor.
- Siklus aktual Cosmos adalah **110 tick**: 0–29, 30–57, 58–84, 85–109. Angka 360 tick di bawah adalah spec historis dan tidak konsisten dengan tabelnya sendiri.
- Kesembilan planet aktif; Cosmos bukan data-only.
- Sejak v0.15.7, pemilih 9 planet tersedia permanen di menu utama. `?planet=` tetap hook QA.
- Partikel meteor dan shader kristal belum diimplementasikan.


Tujuan: menutup Nine Worlds dengan planet kesembilan bertema kristal, nebula, meteor, dan anomali gravitasi tanpa menambah draw call atau object type baru.

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
| Aurelia | aktif | 11 | `leaf-fall`, empat musim, simpanan/hibernasi |
| Cosmos | aktif di v0.14 | 10 | `crystal-storage`, empat fase, radiasi/gravitasi |

`isSupportedPlanet()` sekarang menerima kesembilan `PLANET_IDS`.

## Slot telemetri `eco.sky` untuk Cosmos

Untuk menjaga app chunk <100 kB, Cosmos **tidak** menambah substate baru. Cosmos memakai slot `eco.sky` yang sudah ada dengan mapping berikut:

| Field `eco.sky` | Arti di Sakura | Arti di Cosmos |
|---|---|---|
| `connectivity` | konektivitas pulau | kisi kristal |
| `wind` | angin | radiasi kosmik |
| `blossom` | mekar | fluks cahaya nebula |
| `uplift` | ketinggian pulau | anomali gravitasi |
| `isolationStress` | stres isolasi | stres hampa |

`seasonId`, `seasonName`, dan `phase` tetap dipakai. Reset `eco.sky` dinonaktifkan saat `planetId === 'cosmos'` agar nilai tidak terhapus setiap tick.

## Fase kosmik

Total durasi 360 tick pada spec v0.14; aktual v0.15.9 adalah 110 tick.

| Fase | Tick | Modifikasi utama | Efek |
|---|---|---|---|
| Fase Cahaya | 0–89 | suhu +5, air +10 | fluks cahaya maksimal |
| Resonansi Kristal | 90–174 | suhu +2, air −4 | kisi kristal menguat |
| Pasang Hampa | 175–254 | suhu −9, air −12 | radiasi & gravitasi naik |
| Hujan Meteor | 255–329 | suhu −3, air +8 | radiasi puncak |

Rumus ringkas:

```text
lightTarget       = base fase (90/65/20/35)
radiationTarget   = base fase (25/40/55/85) + bonus badai 10
latticeTarget     = base fase (70/85/35/55) + jumlah_batu*1.5
gravityTarget     = base fase (45/45/85/65)
voidStressTarget  = max(0, radiation-60)*1.2 + max(0, 50-lattice)*0.8
```

## Dampak ekologis

- Faktor vegetasi Cosmos memakai `skyFactor` yang sama: `1 + (lattice-50)*0.003 - radiation*0.0015`.
- Fertilitas: `+ light*0.005 - gravity*0.002`.
- Energi: `+ light*0.01 - radiation*0.004`.
- `voidStress` menambah mortality; trait `energy-organisms`, `crystal-storage`, `cosmic-anomaly`, `gravity-zones`, dan `energy-recycling` menurunkan faktor.
- Hazard prioritas: badai hujan → dingin → kriogenik → vulkanik → laut → fungal → **badai radiasi → anomali gravitasi → hujan meteor** → stres pulau → angin → kekeringan awan → kekeringan.
- Tidak ada object type baru; bintang mekar, rumput hampa, dan pohon nebula memakai `flower`/`grass`/`tree`.

## Guild Cosmos

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `cosmos_crystal_grazer`, `cosmos_star_rabbit`, `cosmos_nebula_stag` |
| `fox` | `cosmos_void_panther` |
| `bird` | `cosmos_astral_hawk` |
| `fish` | — |
| `insect` | `cosmos_comet_moth`, `cosmos_void_fungi` (proksi detritivor) |

## Cara mengakses

- `?planet=cosmos`
- `window.__game.setPlanet('cosmos', 9987)`
- Hook: `state()`, `eco()`, `sky()`, `foodWeb()`, `ecoScore('cosmos_star_rabbit')`
- Panel `?eco=1` menampilkan `Ekologi Cosmos` dengan label kisi/radiasi/cahaya/gravitasi.

## Gate

- 10 populasi Cosmos; tidak ada kebocoran spesies planet lain.
- Empat fase deterministik selama 110 tick pada v0.15.9 (spec historis: 360 tick).
- Kisi menguat saat Resonansi Kristal; radiasi dan gravitasi naik saat Pasang Hampa; radiasi puncak saat Hujan Meteor.
- 10 spesies tetap hidup setelah satu siklus penuh.
- Guild Cosmos memetakan kelinci bintang, elang astral, dan ngengat komet; predator terhubung ke food web.
- Save/load mempertahankan `planetId`, `eco.sky`, dan populasi.
- DNA lengkap mempertahankan `cosmos`.
- Delapan planet sebelumnya tidak berubah secara numerik dari gate v0.13.
- App chunk <100 kB.

## Batas

- Tidak ada partikel meteor atau shader kristal khusus; `sky` memengaruhi sim/HUD.
- Slot `eco.sky` dipakai bersama Sakura dan Cosmos; pemisahan substate baru bisa dilakukan jika anggaran chunk naik.
- Pemilih 9 planet tersedia permanen di menu utama sejak v0.15.7; `?planet=` tetap hook QA.
