# Terra Core — v0.5

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
