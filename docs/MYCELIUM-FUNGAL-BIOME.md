# Mycelia + Fungal Biome — v0.11.0

Tujuan: menambahkan planet keenam dengan jaringan miselium, spora, bioluminesensi, dan pertukaran nutrisi tanpa menambah draw call atau objek baru.

## Status planet

| Planet | Status | Spesies | Sistem khusus |
|---|---|---|---|
| Terra | aktif | 12 | legacy climate (tidak berubah sejak v0.7) |
| Dune | aktif | 12 | desert climate baseline |
| Glaciera | aktif | 12 | `freeze-thaw`, empat musim, danau beku |
| Inferna | aktif | 12 | `volcanic-eruption`, empat musim, lava/abu |
| Aquaria | aktif | 12 | `coral-health`, empat musim, arus/plankton |
| Mycelia | aktif di v0.11 | 11 | `fungal-network`, empat musim, spora/cahaya |
| tiga planet lain | data-only | — | — |

`isSupportedPlanet()` sekarang menerima `terra`, `dune`, `glaciere`, `inferna`, `aquaria`, `mycelia`.

## Musim dan jaringan

Total durasi Mycelia 360 tick. `eco.fungal` adalah ringkasan turunan dari `planet.tick`, cuaca, dan populasi, bukan state musim tersimpan.

| Musim | Tick | Modifikasi utama | Efek |
|---|---|---|---|
| Musim Spora | 0–84 | suhu +2, kelembapan +10 | spora tinggi, jaringan tumbuh |
| Musim Cahaya | 85–179 | suhu +6 | bioluminesensi maksimal |
| Musim Lembap | 180–269 | kelembapan +12, air +14 | nutrisi dan jaringan naik |
| Musim Tenang | 270–359 | suhu −8, air −8 | stres jaringan naik, aktivitas turun |

`eco.fungal` berisi:

- `seasonId`, `seasonName`, `phase`
- `network` 0–100 — konektivitas jaringan miselium
- `spores` 0–100 — tekanan/spora udara
- `glow` 0–100 — bioluminesensi
- `nutrients` 0–100 — nutrisi yang tersedia lewat pertukaran
- `networkStress` 0–100 — gangguan jaringan

Rumus ringkas:

```text
sporesTarget         = base musim + populasi_jaringan*0.12 - kelembapan*0.05
glowTarget           = base musim + populasi_bercahaya*0.15
nutrientsTarget      = fertility*0.6 + detritus*0.35 + populasi_jaringan*0.2 + bonusMusim
networkStressTarget  = max(0, humidity-96)*1.5 + max(0, 55-humidity)*1.5 + bonusMusim
networkTarget        = base musim + populasi_jaringan*0.15 + fertility*0.1 - networkStress*0.25
```

Bonus musim: nutrisi +14 saat Musim Lembap, −4 saat Musim Tenang; stres +12 saat Musim Lembap, +22 saat Musim Tenang.

## Dampak ekologis

- Faktor vegetasi Mycelia: `1 + (network-50)*0.003 - networkStress*0.002`, dikalikan modifier musim.
- Fertilitas Mycelia mendapat tambahan `nutrients*0.02 + (network-50)*0.01` setelah target dasar.
- `networkStress` menambah mortalitas; trait `nutrient-exchange`, `fungal-network`, `spore-dispersal`, `bioluminescence`, dan `day-night-glow` menurunkan faktor menjadi sekitar sepertiga.
- Habitat kelembapan config Mycelia dilebarkan sampai ~100% karena iklim dasar 86% plus modifier musim.
- Hazard prioritas: badai hujan → dingin → kriogenik → vulkanik → laut → **gangguan jaringan → spora beracun → kelembapan ekstrem** → kekeringan.
- Tidak ada object type baru; jamur, pakuis, dan pohon spora tetap memakai `tree`/`bush`/`grass`.

## Guild Mycelia

| Guild visual | Populasi ekologis |
|---|---|
| `deer` | `mycelia_spore_deer`, `mycelia_glow_rabbit`, `mycelia_mushroom_grazer` |
| `fox` | `mycelia_night_stalker`, `mycelia_crystal_spider` |
| `bird` | `mycelia_spore_bat` |
| `fish` | — (tidak ada fauna ikan) |
| `insect` | `mycelia_spore_moth` |

Kelelawar spora memakai proksi guild burung; ngengat spora memakai proksi serangga. `mycelia_network` tetap sebagai dekomposer dan tidak membuat agen visual.

## Cara mengakses

- `?planet=mycelia`
- `window.__game.setPlanet('mycelia', 4321)`
- Hook: `state()`, `eco()`, `fungal()`, `foodWeb()`, `ecoScore('mycelia_spore_deer')`
- Panel `?eco=1` menampilkan `Ekologi Mycelia` dan baris musim/jaringan/spora/cahaya/stres.

## Gate

- 11 populasi Mycelia; tidak ada kebocoran spesies planet lain.
- Empat musim deterministik selama 360 tick.
- Spora naik saat Musim Spora, cahaya naik saat Musim Cahaya, nutrisi naik saat Musim Lembap, stres naik saat Musim Tenang.
- Jaringan tetap >0 dan 11 spesies tetap hidup setelah satu siklus penuh.
- Agen deer/fox/bird/inset muncul; predator terhubung ke kijang spora melalui food web.
- Save/load mempertahankan `planetId`, `eco.fungal`, dan populasi.
- Fauna + ekosistem deterministik untuk seed sama.
- DNA lengkap mempertahankan `mycelia`; DNA v2 lawas tetap Terra.
- Terra, Dune, Glaciera, Inferna, dan Aquaria tidak berubah secara numerik dari gate v0.10.
- App chunk <100 kB.

## Batas

- Belum ada warna bercahaya khusus di renderer; `fungal` saat ini memengaruhi sim/HUD.
- Tidak ada partikel spora atau jaringan visual antar-prop.
- Tidak ada UI selector planet permanen; akses lewat query param/debug hook untuk QA.
- Sakura, Aurelia, dan Cosmos masih data-only.
