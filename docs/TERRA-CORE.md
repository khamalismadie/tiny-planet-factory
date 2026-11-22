# Terra Core — v0.5

## Status saat ini (v0.16.0)

- Dokumen ini adalah spesifikasi historis v0.5.
- Engine kini memanggil `stepEcosystem(planet)` → `ecosystemFor(planetId)` untuk **9 manager**, bukan `terraEcosystem.step()`.
- Mortalitas juga mencakup `cold`, `heat`, `reef`, `network`, `isolation`, dan `frost`; births memakai faktor `(1 + pollinationBoost)`.
- Kunci RNG populasi adalah `seed:eco:tick`.
- `ecoScore(id)` memakai config planet aktif dan hanya tersedia di DEV atau `?debug=1`.
- Config planet berada di chunk `planet-configs`, tetapi tetap diimpor saat boot lewat Hud/migrate; klaim lama “tidak dimuat saat boot” tidak berlaku.


Phase ini mengubah `eco` dari container data menjadi simulasi population-level yang hidup untuk 12 spesies kunci Terra.

## Modul

`src/sim/eco/manager.ts` berisi `EcosystemManager`. `sim/engine.ts` memanggil `terraEcosystem.step(planet)` setiap tick setelah cuaca dan environment diperbarui.

`HabitatManager` sudah dipecah menjadi:
- `scoreHabitat(definition, context)`: pure scorer tanpa registry.
- `HabitatManager`: wrapper untuk lookup by id/planet.

Ini mencegah seluruh 9 PlanetConfig masuk ke app chunk saat boot.

## Model population-level

Untuk setiap spesies:

- Kapasitas dinamis: `populationCapacity * (0.55 + 0.45 * habitatScore)`.
- Resource factor dihitung dari `foodRequirements`: species resource, sunlight, water, detritus, nutrients, plankton, nectar.
- Pollination memberi boost maksimal +30% untuk flora yang punya link pollination.
- Predation pressure dihitung dari food web dengan interaction `hunting`, `grazing`, atau `scavenging`, dibatasi maksimal 0.03.
- Births: `estimate * reproductionRate * habitatScore * resourceFactor * pollinationBoost * space * jitter`.
- Deaths: `estimate * (baseMortality + habitatStress + starvation + predationPressure) * jitter`.
- Jitter deterministik dari `hashString(seed:tick:eco)` via `mulberry32`.

Kematian menyumbang detritus. Decomposer mengonsumsi detritus dan mengembalikan sebagian ke `environment.fertility`.

## Metrik

Semua `eco.metrics` dihitung dari state simulasi:

- `speciesCount`, `totalPopulation`: agregat populasi.
- `biodiversityIndex`: Shannon diversity ternormalisasi.
- `habitatHealth`: rata-rata `scoreHabitat`.
- `vegetationCoverage`: producer estimate / producer capacity.
- `foodAvailability`: rata-rata resource factor fauna.
- `predatorPreyBalance`: rasio predator/prey terhadap rasio ideal 0.15.
- `waterAvailability`, `soilFertility`, `stability`: dari environment aktual.

## Gate

`scripts/sim-test.ts` menjalankan dua planet seed-identik selama 10.000 tick dan memastikan:

- 12 populasi tetap positif dan tidak melebihi kapasitas.
- Tidak ada nilai non-finite.
- Producer dan decomposer memiliki `births > 0`.
- Detritus tetap dalam `[0, 500]`.
- Fertility akhir lebih tinggi dari fertility awal.
- `eco` identik untuk dua seed yang sama.

## Observability (v0.5.1)

- `window.__game.eco()` mengembalikan `PlanetState.eco`.
- `window.__game.ecoScore(id)` menghitung `scoreHabitat()` untuk spesies Terra pada kondisi saat ini.
- `?eco=1` menampilkan panel ringkas di stats panel: populasi/kapasitas, trend, limiting factor, detritus, dan metrik.
- Panel tersembunyi di build normal; smoke test memastikan default tetap bersih.

## Stress scenarios (v0.5.1)

Lima skenario dijalankan tanpa rendering:

1. Overpopulasi herbivora — rabbit dipaksa ke 220, lalu 300 tick.
2. Predator punah — wolf/fox = 0, lalu 300 tick.
3. Kelangkaan makanan — semua producer = 0.2, lalu 300 tick.
4. Kekeringan — water = 5 selama 100 tick, lalu water = 85 selama 300 tick.
5. Kerusakan habitat — fertility/vegetation/stability direndahkan, lalu dikembalikan.

Semua skenario wajib tetap bounded. Kekeringan dan kerusakan habitat wajib menunjukkan penurunan `habitatHealth` lalu pemulihan yang terukur.

## Lanjutan

Koupling antara populasi ini dan agen fauna visual ada di `docs/FOOD-WEB-WILDLIFE-AI.md`.
