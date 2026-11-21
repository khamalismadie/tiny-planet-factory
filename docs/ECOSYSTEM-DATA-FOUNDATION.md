# Ecosystem Data Foundation — v0.4

Dokumen ini mencatat fondasi data untuk program **Nine Worlds** sebelum simulasi ekosistem penuh diimplementasikan.

## Tujuan

- Menyiapkan schema data yang bisa menampung 9 planet tanpa mengubah renderer.
- Menjaga kompatibilitas save v1/v2 dan DNA format lama.
- Menyediakan registry spesies data-driven dan penghitungan habitat yang deterministik.
- Membuat fondasi bagi `FoodWebManager`, `PopulationManager`, dan modul ekosistem berikutnya.

## Perubahan schema

`PlanetState` sekarang memiliki:

```ts
schemaVersion: 3;
planetId: string;
ecosystemVersion: number;
eco: EcoStateV3;
```

`EcoStateV3` berisi:

- `populations`: estimasi, trend, births, deaths, capacity per spesies.
- `traits`: genetic traits per spesies.
- `discovered`: daftar spesies yang sudah ditemukan.
- `eventHistory`: kejadian ekologis dengan severity dan affected species/biomes.
- `metrics`: metrik turunan simulasi, bukan angka hardcode.

Migrasi v2 → v3 mengisi `planetId = 'terra'`, `ecosystemVersion = 1`, dan `eco` default bila field belum ada. Save yang lebih lama tetap bisa dibaca.

Rilisan ini memuat 9 `PlanetConfig` dan 103 definisi spesies unik. Agar tidak menaikkan app chunk, `migrate.ts` hanya mengimpor `PLANET_IDS` dari modul ringan `content/planets/ids.ts`; seluruh config tetap berada di jalur registry yang tidak dimuat oleh app saat boot.

## Modul baru

```text
src/sim/eco/types.ts     Schema: SpeciesDefinition, PlanetConfig, FoodWebLink, dll.
src/sim/eco/factory.ts   Helper definisi spesies dan food web.
src/sim/eco/state.ts     EcoStateV3 + normalisasi migrasi.
src/sim/eco/registry.ts  SpeciesRegistry + validasi 9 PlanetConfig.
src/sim/eco/habitat.ts   HabitatManager (pure, deterministik).
src/content/planets/     9 konfigurasi planet.
```

## Prinsip

1. `sim/` tetap renderer-agnostic.
2. Satu renderer untuk semua planet; config hanya mengubah data.
3. Untuk menjaga dampak performa: subset spesies kunci dipakai lebih dulu, registry siap untuk daftar penuh.
4. Tidak ada angka dashboard yang tidak berasal dari state simulasi.
5. DNA binary tidak diubah di rilisan ini; evolution/DNA v3 menyusul.

## Gate rilisan

Lihat `docs/RELEASE.md` bagian **2d**. Gate utama: 9 config valid, migrasi lolos, save/load eco lolos, habitat deterministik, dan seluruh test suite tetap hijau.
