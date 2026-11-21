# Release Checklist — Tiny Planet Factory

Gunakan checklist ini sebelum publish build produksi.

## 1. Prasyarat

- [ ] Node 20+ dan dependency terpasang (`npm install`).
- [ ] Version di `package.json` sudah dinaikkan.
- [ ] Host PWA mendukung **HTTPS** dan melayani `sw.js` pada scope aplikasi (root atau subpath).
- [ ] Ikon `icons/icon-192.png`, `icons/icon-512.png`, dan `icons/icon.svg` tersedia di scope aplikasi.
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

## 2n. Aurelia + Autumn Biome (v0.13)

- [ ] `?planet=aurelia` dan `setPlanet('aurelia')` menghasilkan 11 populasi Aurelia.
- [ ] Empat musim berjalan deterministik: spring → summer → autumn → winter.
- [ ] Simpanan naik saat Panas/Gugur, serasah naik saat Gugur, hibernasi dan embun naik saat Dingin.
- [ ] 11 spesies tetap hidup setelah satu siklus 360 tick.
- [ ] Guild Aurelia memetakan kijang, rubah, lynx, dan burung hantu; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.forest`.
- [ ] DNA lengkap mempertahankan `planetId` Aurelia.
- [ ] Tujuh planet sebelumnya tidak berubah secara numerik dari gate v0.12.
- [ ] App chunk <100 kB.

## 2o. Cosmos + Crystal Biome (v0.14)

- [ ] `?planet=cosmos` dan `setPlanet('cosmos')` menghasilkan 10 populasi Cosmos.
- [ ] Empat fase berjalan deterministik: luminous-phase → crystal-resonance → void-tide → meteor-shower.
- [ ] Kisi menguat saat Resonansi Kristal; radiasi/gravitasi naik saat Pasang Hampa; radiasi puncak saat Hujan Meteor.
- [ ] 10 spesies tetap hidup setelah satu siklus 360 tick.
- [ ] Guild Cosmos memetakan kelinci bintang, elang astral, dan ngengat komet; predator terhubung ke food web.
- [ ] Save/load mempertahankan `eco.sky` dengan mapping kosmik.
- [ ] DNA lengkap mempertahankan `planetId` Cosmos.
- [ ] Delapan planet sebelumnya tidak berubah secara numerik dari gate v0.13.
- [ ] App chunk <100 kB.

## 2p. Deploy HTTPS & PWA portability (v0.14.1–v0.14.3)

- [x] Build memakai `base: './'` sehingga asset bisa di-root LAN maupun subpath host.
- [x] Manifest memakai `start_url`/`scope` `./` dan ikon relatif.
- [x] `sw.js` menghitung cache path dari `self.registration.scope`.
- [x] Registrasi service worker memakai URL relatif terhadap `document.baseURI`.
- [x] Plugin `pwa-precache` menyuntik seluruh chunk hasil build ke `SHELL`.
- [x] `caches.match(request, { ignoreVary: true })` menangani header `Vary: Origin` dari Vite preview.
- [x] Verifikasi localhost secure-context: manifest installable shape, SW control, shell + chunk ter-cache, offline reload sukses, tanpa page error.
- [ ] GitHub Pages ditunda: repo masih private dan akun free tidak mendukung Pages untuk repo privat.
- [ ] Host HTTPS produksi: verifikasi manifest dan `sw.js` mengembalikan 200.
- [ ] Install prompt, offline, dan update di perangkat nyata.

## 2q. Main Menu & Instrument UI (v0.15)

- [x] Menu utama muncul saat boot normal; dilewati oleh `debug`, `qa`, `planet`, atau `menu=0`.
- [x] Aksi menu: lanjutkan save, planet baru, buka Planet DNA, ganti kualitas grafis, kembali ke planet.
- [x] Menu menghentikan simulasi dan mengembalikan status jeda saat ditutup.
- [x] Tombol `Menu` di topbar, Escape untuk menutup, fokus awal pada aksi utama.
- [x] Bahasa visual “peta kebun planet”: panel catatan lapangan, aksen hijau hayati/amber, tipografi display + data monospace.
- [x] Tidak ada pemilih planet permanen di UI; `?planet=` tetap merupakan hook QA/deeplink.
- [x] Gate baru `npm run test:menu` untuk desktop + mobile, overflow, fokus, kualitas, pause, dan DNA.

## 2r. Habitat Proportion Balance (v0.15.1)

- [x] Gunung dinaikkan dan pohon dirapikan: minimum gunung ≈1.45× pohon maksimal pada oksigen sehat.
- [x] Bunga dinaikkan ±29% agar silhouette tidak menyatu dengan rumput.
- [x] `spacingRadius` ditambahkan ke `OBJECT_DEFS` sebagai data sim renderer-agnostic.
- [x] `placeObject()` memakai soft spacing deterministik berbasis sudut emas; objek tetap diterima.
- [x] Event `object.placed` menyimpan arah final hasil spacing agar replay sesuai.
- [x] Gate `test:sim` memeriksa margin spacing dan determinisme penumpukan 39 objek.
- [x] Budget tetap lolos: 18–200 triangle per prop, 0 tekstur.

## 2s. First-Visit SW Fix (v0.15.2)

- [x] `registerPwa()` hanya reload saat `controllerchange` jika sudah ada controller sebelumnya.
- [x] Install PWA pertama kali tidak memicu reload yang menutup/open ulang menu utama.
- [x] Gate `test:menu` menghitung navigasi first-load dan menggagalkan reload tak sengaja.
- [x] Deploy HTTPS produksi aktif di <https://tinyplanetfactory.netlify.app/> via auto-deploy Netlify dari `main`.
- [x] Deploy produksi diverifikasi melalui smoke, device, menu, dan offline PWA check.

## 2t. Balanced World Scale (v0.15.3)

- [x] Hierarki final: gunung > bukit > pohon > semak > rusa > rubah > batu ≈ bunga > rumput > burung.
- [x] Tinggi dunia: gunung `0.115`, bukit `0.060`, pohon `0.045`, rusa `0.0105`, rubah `0.007`, burung `0.004`.
- [x] Gunung minimum ≈1.46× pohon maksimal pada vegetasi sehat.
- [x] Rasio kunci: bukit/pohon `1.33`, pohon/rusa `4.29`, rusa/rubah `1.49`, rusa/burung `2.64`.
- [x] Wildlife memakai `SPECIES_SCALE`; fauna wildlife seukuran prop fauna dan tidak lagi melebihi gunung.
- [x] `spacingRadius` dihitung ulang dari footprint baru; spacing deterministik tetap lolos.
- [x] Gate `test:scale` memeriksa target tinggi, urutan, rasio, wildlife, dan budget aset.

## 2u. Reachable Progression & Mobile UX (v0.15.4)

- [x] Stage 4/5/6 tidak lagi terkunci oleh early return di `computeStage()`; stage 6 terbukti reachable.
- [x] Off-by-one `LEVEL_XP` diperbaiki; 260 XP sekarang benar-benar membuka level 6.
- [x] Semua tombol yang terlihat minimal 48×48 dp di 360×640, 390×844, dan 844×390.
- [x] Objective strip menampilkan stage, tujuan berikutnya, dan progres misi tanpa scroll.
- [x] Siklus musim seluruh planet dipangkas menjadi 106–120 tick (≈3,5–4 menit) dengan proporsi relatif terjaga.
- [x] Badai selalu diikuti 2 tick cerah sebagai recovery beat.
- [x] Telemetri lokal menambah `session_start`, `session_end`, `objective_shown`, `stage_reached`, `level_reached`, `season_change`, dan `planet_switch`.
- [x] `test:layout` masuk ke `npm test` sebagai gate 48 dp + objective strip + tanpa horizontal overflow.
- [x] Gate determinisme 50 seed × 9 planet masuk ke `test:sim`.
- [x] Semua test lokal lolos: sim, art scale, smoke, device, menu, layout. App chunk 58,77 kB / gzip 19,23 kB.

## 2v. Device QA Load Harness (v0.15.5)

- [x] Parameter `?qa=1&qaObjects=N` menanam hingga 96 objek sebelum QaProbe mulai mengukur.
- [x] Objek mengikuti urutan `OBJECT_ORDER` dan sebaran spiral deterministik, tanpa mengubah sim atau gameplay normal.
- [x] Dipakai untuk mengulang checklist #2 dengan beban 25+ objek di Android nyata (terukur hingga 94 objek).

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

Catatan 2026-11-21: lima run QA nyata di **Itel S686LN / Android 15**, termasuk tiga run dengan **94 objek** dan durasi hingga **180 s**, menghasilkan p50 **16,90–33,20 ms**, p95 **33,40 ms**, FPS **30,1–59,2**, draw call **6–18**, boot **0,24–2,03 s**, tier medium tanpa downgrade, service worker aktif, dan tidak ada context loss. p95 masih 0,40 ms di atas ambang 33 ms, sehingga checklist #1–#2 belum dicentang lulus penuh; rincian ada di `docs/QA-DEVICE.md`.

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
