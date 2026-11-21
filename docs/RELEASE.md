# Release Checklist — Tiny Planet Factory

Gunakan checklist ini sebelum publish build produksi.

## 1. Prasyarat

- [ ] Node 20+ dan dependency terpasang (`npm install`).
- [ ] Version di `package.json` sudah dinaikkan.
- [ ] Host PWA mendukung **HTTPS** dan melayani `/sw.js` dari root dengan `Service-Worker-Allowed: /`.
- [ ] Ikon `/icons/icon-192.png`, `/icons/icon-512.png`, dan `/icons/icon.svg` tersedia.
- [ ] `manifest.webmanifest` masih valid (name, short_name, start_url, display, icons).

## 2. Build & test

```bash
npm run build
PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npm test
```

- [ ] `npm run build` tanpa error. Chunk vendor: `pixi-core` + `pixi-3d`, app chunk < 100 kB.
- [ ] `PASS: sim`
- [ ] `PASS: vertical slice smoke`
- [ ] `PASS: device-check`
- [ ] Tidak ada error konsol aplikasi di smoke/device check.
- [ ] Unit test mencakup DNA v1/v2 round-trip (termasuk fauna), checksum rusak, migrasi save lama, replay event deterministik, kemunculan fauna, determinisme fauna, dan kepunahan.
- [ ] Smoke test memakai **kode DNA lengkap** (`#dna-full`), bukan hanya kode pendek, saat verifikasi round-trip, termasuk jumlah agen fauna.

## 2b. Data & DNA (v0.1.1 / v0.2)

- [ ] Save lama tanpa `schemaVersion` tetap terbuka setelah update.
- [ ] Kode DNA v1 (base64) lama masih bisa diimpor.
- [ ] Kode pendek berformat `TPF-XXXX-XXXX-XXXX`; kode lengkap diawali `TPF-` dan lebih panjang.
- [ ] Checksum rusak ditolak dengan pesan, bukan crash.
- [ ] Panel DNA menampilkan kode pendek + lengkap, Web Share, pratinjau, duplikat, remix, dan status pratinjau.
- [ ] Menutup panel saat pratinjau aktif mengembalikan planet asli tanpa menimpa save.
- [ ] `terrainConfig` dari DNA mengubah bentuk permukaan dan posisi prop secara konsisten.

## 2c. Living Planet (v0.3)

- [ ] Agen fauna muncul dari habitat: herba dari vegetasi, rubah dari kijang, burung dari pohon/bunga, ikan dari laut/danau, serangga dari bunga/semak.
- [ ] Fauna bergerak mengikuti `seed + tick`; dua planet dengan seed sama menghasilkan agen identik.
- [ ] Rantai makanan berjalan: kijang merumput, rubah berburu, serangga menyerbuki, ikan bergantung pada air.
- [ ] Penemuan spesies dan kepunahan tercatat di HUD, telemetri, dan laporan QA.
- [ ] Kode DNA lengkap mempertahankan agen fauna saat diimpor/diduplikat/remix.
- [ ] Quality tier membatasi jumlah fauna yang dirender (`low` 6, `medium` 12, `high` 24).
- [ ] Draw call total masih di bawah 150 dengan fauna aktif.

## 2d. Ecosystem Data Foundation (v0.4)

- [ ] `schemaVersion` = 3 dengan field `planetId`, `ecosystemVersion`, dan `eco`.
- [ ] Save lama v1/v2 tetap terbuka dan mendapat `eco` state default tanpa kehilangan objek/event/fauna.
- [ ] Semua 9 `PlanetConfig` lolos validasi: species unik, referensi flora/fauna/decomposer valid, food web valid, minimal satu season.
- [ ] `SpeciesRegistry` berisi subset spesies kunci untuk 9 planet dengan id global unik.
- [ ] `HabitatManager` menghasilkan skor deterministik untuk input yang sama.
- [ ] `eco.discovered`, `eco.populations`, dan `eco.eventHistory` bertahan setelah save/load.
- [ ] DNA format lama masih bisa dibaca; schema v3 baru belum mengubah binary DNA sampai phase evolution.

## 2e. Terra Core (v0.5)

- [ ] 12 spesies kunci Terra memiliki populasi awal dan metrik turunan di `eco`.
- [ ] Producer bereproduksi dan populasi tetap berada dalam kapasitas dinamis.
- [ ] Decomposer mengubah detritus menjadi fertility yang terukur.
- [ ] Habitat suitability memengaruhi kelahiran, kematian, dan kapasitas.
- [ ] Long-run test 10.000 tick: semua spesies bertahan, tidak ada nilai negatif/non-finite, detritus terikat.
- [ ] Dua planet dengan seed sama menghasilkan `eco` identik setelah 10.000 tick.
- [ ] App chunk tetap di bawah 100 kB meskipun profile Terra ikut ter-bundle.

## 2f. Observability & Stress Tests (v0.5.1)

- [ ] Debug hook `eco()` mengembalikan state ekosistem Terra dengan 12 populasi.
- [ ] Debug hook `ecoScore(id)` mengembalikan skor dan limiting factor habitat.
- [ ] Panel `?eco=1` menampilkan populasi, kapasitas, trend, detritus, dan metrik turunan.
- [ ] Panel eco tersembunyi secara default sehingga HUD normal tidak berubah.
- [ ] Skenario overpopulasi herbivora tetap bounded dan vegetasi bertahan.
- [ ] Skenario predator punah menaikkan herbivora tetapi tetap dalam kapasitas.
- [ ] Skenario kelangkaan makanan menurunkan food availability lalu produsen pulih.
- [ ] Skenario kekeringan dan kerusakan habitat menurunkan habitat health lalu pulih setelah restorasi.

## 2g. Food Web + Wildlife AI (v0.6)

- [ ] `guildStatus()` memetakan 5 guild visual ke 12 spesies Terra.
- [ ] `foodWeb()` debug hook mengembalikan 5 guild dan link food web Terra.
- [ ] Panel `?eco=1` menampilkan ringkasan agen dan suplai makanan per guild.
- [ ] Kapasitas agen dibatasi oleh habitat **dan** populasi ekologis.
- [ ] Runtuhnya produsen menurunkan suplai herbivora; runtuhnya mangsa menurunkan suplai predator.
- [ ] Predasi agen tidak dihitung dua kali sebagai mortalitas ekologis.
- [ ] DNA fauna dan seed-identik determinisme tidak berubah.

## 2h. Dune + Biome Expansion (v0.7)

- [ ] Hanya Terra dan Dune yang dilaporkan aktif oleh `isSupportedPlanet()`.
- [ ] `?planet=dune` dan `setPlanet('dune')` menghasilkan planet dengan 12 populasi Dune.
- [ ] Suhu/air Dune tetap dalam rentang gurun setelah 200 tick.
- [ ] Guild Dune memetakan unta, kelinci, gazel, kadal, rubah fennec, ular, nasar, dan kumbang.
- [ ] Tidak ada agen ikan di Dune.
- [ ] Save/load dan determinisme seed Dune lolos.
- [ ] App chunk <100 kB dengan `planet-configs` sebagai chunk terpisah.

## 2i. Glaciera + Cold Biome (v0.8)

- [ ] `?planet=glaciere` dan `setPlanet('glaciere')` menghasilkan 12 populasi Glaciera.
- [ ] Empat musim berjalan deterministik dari tick: polar-night → thaw → short-summer → freeze-up.
- [ ] `freeze` turun dari polar-night ke thaw ke short-summer.
- [ ] `iceCoverage > 0` saat danau/samudra ditempatkan.
- [ ] DNA lengkap mempertahankan `planetId` untuk Dune dan Glaciera; DNA v2 lawas tetap Terra.
- [ ] Save/load mempertahankan `eco.cryo`.
- [ ] Terra tidak berubah secara numerik dari gate v0.7.
- [ ] App chunk <100 kB.

## 2j. Inferna + Volcanic Biome (v0.9)

- [ ] `?planet=inferna` dan `setPlanet('inferna')` menghasilkan 12 populasi Inferna.
- [ ] Empat musim berjalan deterministik dari tick: quiet-phase → ash-fall → eruption-phase → regrowth.
- [ ] `heat`, `lavaFlow`, `ash`, dan `eruptionStress` naik saat letusan lalu turun saat regrowth.
- [ ] Suhu letusan >75°C dan air tetap <25.
- [ ] Tidak ada guild atau agen ikan di Inferna.
- [ ] Save/load mempertahankan `eco.volcano`.
- [ ] DNA lengkap mempertahankan `planetId` Inferna.
- [ ] Terra, Dune, dan Glaciera tidak berubah secara numerik dari gate v0.8.
- [ ] App chunk <100 kB.

## 2k. Aquaria + Aquatic Biome (v0.10)

- [ ] `?planet=aquaria` dan `setPlanet('aquaria')` menghasilkan 12 populasi Aquaria.
- [ ] Empat musim berjalan deterministik dari tick: calm-current → warm-water → plankton-bloom → storm-surge.
- [ ] Plankton naik saat bloom, pemutihan naik saat air hangat, arus naik saat badai laut.
- [ ] Air >80, terumbu tetap sehat setelah satu siklus 360 tick, dan 12 spesies tetap hidup.
- [ ] Guild laut memetakan ikan terumbu, kepiting, lumba-lumba, dan bakteri; agen ikan/mikroba muncul.
- [ ] Save/load mempertahankan `eco.ocean`.
- [ ] DNA lengkap mempertahankan `planetId` Aquaria.
- [ ] Terra, Dune, Glaciera, dan Inferna tidak berubah secara numerik dari gate v0.9.
- [ ] App chunk <100 kB.

## 2l. Mycelia + Fungal Biome (v0.11)

- [ ] `?planet=mycelia` dan `setPlanet('mycelia')` menghasilkan 11 populasi Mycelia.
- [ ] Empat musim berjalan deterministik: spore-spring → glow-summer → damp-autumn → quiet-winter.
- [ ] Spora naik saat Musim Spora, cahaya naik saat Musim Cahaya, nutrisi naik saat Musim Lembap, stres naik saat Musim Tenang.
- [ ] Jaringan tetap >0 dan 11 spesies tetap hidup setelah satu siklus 360 tick.
- [ ] Guild Mycelia memetakan kijang spora, kelelawar, dan ngengat; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.fungal`.
- [ ] DNA lengkap mempertahankan `planetId` Mycelia.
- [ ] Terra, Dune, Glaciera, Inferna, dan Aquaria tidak berubah secara numerik dari gate v0.10.
- [ ] App chunk <100 kB.

## 2m. Sakura + Floral Biome (v0.12)

- [ ] `?planet=sakura` dan `setPlanet('sakura')` menghasilkan 11 populasi Sakura.
- [ ] Empat musim berjalan deterministik: blossom-season → petal-fall → sky-winds → quiet-sky.
- [ ] Mekar turun saat Gugur Kelopak, angin/stres isolasi naik saat Angin Langit, konektivitas pulih saat Langit Tenang.
- [ ] 11 spesies tetap hidup setelah satu siklus 360 tick.
- [ ] Guild Sakura memetakan kijang bunga, elang, dan kupu-kupu; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.sky`.
- [ ] DNA lengkap mempertahankan `planetId` Sakura.
- [ ] Enam planet sebelumnya tidak berubah secara numerik dari gate v0.11.
- [ ] App chunk <100 kB.

## 3. QA perangkat nyata

Jalankan seluruh baris di `docs/QA-DEVICE.md`, minimal untuk:

- [ ] Android menengah: p50 ≥ 30 FPS, p95 ≤ 33 ms selama 5 menit bermain.
- [ ] Cold start < 5 s pada 4G.
- [ ] Pinch zoom, drag 360°, dan long-press berfungsi dengan jari.
- [ ] Context loss/restore: background 30 s → kembali → render lanjut tanpa crash.
- [ ] Install PWA → airplane mode → buka → save terbaca → bisa menanam objek.
- [ ] Update PWA: prompt muncul, save IndexedDB tetap utuh.
- [ ] Portrait/landscape tidak menutupi planet.

Opsional untuk QA cepat: buka `?qa=1&qaSeconds=45` di perangkat. Panel hasil QA akan muncul dan tombol **Salin hasil QA** menghasilkan JSON berisi p50/p95, boot time, quality tier, device info, status PWA, serta jumlah agen/spesies fauna.

## 4. Telemetri

- [ ] Telemetri **mati secara default**.
- [ ] Tombol **Telemetri** membuka modal dengan penjelasan bahwa data tidak dikirim ke server.
- [ ] Saat diaktifkan, peristiwa tercatat di localStorage (`tpf.telemetry.v1`).
- [ ] **Salin data** menghasilkan JSON; **Hapus data** mengosongkan event tetapi tidak menghapus save game.
- [ ] Tidak ada data pribadi/IP/nama perangkat yang dikirim atau disimpan telemetri. Lihat `docs/KPI.md`.

## 5. Rollback & monitoring

- [ ] Simpan artefak `dist/` dari build sebelumnya.
- [ ] Catat commit/tag build di release notes.
- [ ] Service worker versi lama masih bisa melayani app shell bila update gagal.
- [ ] Jika crash pasca-update: matikan service worker lama lewat mekanisme hosting/CDN, lalu deploy ulang artefak sebelumnya.

## 6. Publish

Deploy cepat tanpa akun:

1. Buka `https://app.netlify.com/drop`.
2. Tarik folder `dist/` (atau ekstrak `tiny-planet-factory-dist.zip`) ke halaman tersebut.
3. Netlify akan memberi URL HTTPS acak, misalnya `https://random-name.netlify.app`.
4. Buka URL tersebut di Android dan jalankan `?qa=1&qaSeconds=45`.

Untuk produksi yang stabil, gunakan Cloudflare Pages / Vercel / hosting sendiri dengan HTTPS dan `sw.js` di root.

- [ ] Upload `dist/` ke host HTTPS.
- [ ] Verifikasi `https://<host>/manifest.webmanifest` dan `https://<host>/sw.js` mengembalikan 200.
- [ ] Buka URL produksi di desktop + Android, cek install prompt.
- [ ] Lakukan satu transaksi penuh: tanam objek → tunggu save → reload → objek kembali.
- [ ] Tandai rilis selesai.
