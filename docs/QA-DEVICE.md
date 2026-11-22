# QA Perangkat — Checklist & Baseline (Sprint 09)

Target: **Android menengah** (30 FPS, p95 frame time ≤ 33 ms), desktop 60 FPS.

## Instrumentasi

Tambahkan query string saat membuka build produksi:

```
https://<host>/?debug=1&perf=1&quality=medium
```

- `perf=1` menampilkan overlay FPS/p50/p95/draw call/quality.
- `quality=low|medium|high` mengunci tier awal (default terdeteksi otomatis).
- `eco=1` menampilkan panel diagnostic ekosistem + guild food web di stats panel.
- `menu=0` melewati menu utama; menu otomatis dilewati juga oleh `debug`, `qa`, dan `planet`.
- `planet=terra|dune|glaciere|inferna|aquaria|mycelia|sakura|aurelia|cosmos` mengaktifkan planet tersebut; tanpa parameter ini save Terra dipakai bila ada.
- `debug=1` membuka `window.__game`:
  - `metrics()` — frame stats, quality tier, adaptive downgrade count, context loss state, orbit distance
  - `camera()`, `orbitDebug()`
  - `place(type, dir)`, `tick(n)`, `reset(seed)`
  - `setQuality(tier)`, `loseContext()`, `restoreContext()` — **hati-hati, hanya untuk QA**
  - `menuOpen()`, `openMenu()`, `closeMenu()` — inspeksi alur menu utama
  - `wildlife()` — jumlah agen, spesies ditemukan/punah, dan breakdown per spesies
  - `eco()`, `ecoScore(id)` — state ekosistem dan faktor habitat spesies planet aktif
  - `cryo()` — musim, freeze, es, salju, dan thaw stress (Glaciera)
  - `volcano()` — musim, panas, lava, abu, dan eruption stress (Inferna)
  - `ocean()` — musim, arus, kesehatan terumbu, plankton, pemutihan, dan oksigen terlarut (Aquaria)
  - `fungal()` — musim, jaringan, spora, cahaya, nutrisi, dan stres jaringan (Mycelia)
  - `sky()` — musim, konektivitas, angin, mekar, uplift, dan stres isolasi (Sakura)
  - `forest()` — musim, serasah, simpanan, hibernasi, dan stres embun (Aurelia)
  - `sky()` juga dipakai Cosmos — fase, kisi, radiasi, cahaya, dan gravitasi
  - `foodWeb()` — status 5 guild visual, jumlah agen, dan link food web planet aktif
  - `setPlanet(id, seed?)` — pindah ke planet aktif (`terra`, `dune`, `glaciere`, `inferna`, `aquaria`, `mycelia`, `sakura`, `aurelia`, atau `cosmos`)
  - `qaReport()` — laporan performa + status fauna terbaru
- `qaObjects=N` — saat `qa=1`, menanam hingga 96 objek dengan sebaran spiral sebelum pengukuran; dipakai untuk beban 25+ objek
- `seed=N` — mengunci seed planet agar cuaca dan penempatan QA deterministik; dipakai `test:qa-load` dengan `seed=1`
- `qaSeconds=N` — durasi probe, dipotong aplikasi ke maksimal **180 s**

### Paket bukti v0.20.0+ (berlaku juga di v0.21.0)

Laporan yang disalin tombol **Salin hasil QA** kini membawa:
`appVersion`, `save` (tick/objek/level + ketersediaan penyimpanan), `network` (`online`, visibilitas), `orientation`, `layout` (posisi topbar/build/objective/inventory, `centerElement`, flag overlap), dan `runtime` (`scriptSrc` + SW controller/script URL). Paket ini dipakai untuk membuktikan #5, #6, #7, dan #8 tanpa menambah gate `npm test`.

Validator manual (tidak masuk `npm test`):

```bash
npm run qa:evidence -- laporan-dari-perangkat.json --standalone --offline --landscape
```

Flag opsional: `--standalone` menuntut `device.standalone === true`, `--offline` menuntut `network.online === false`, `--landscape` menuntut orientasi landscape dan `layout.planetCenterVisible === true` tanpa overlap panel. Validator tetap mengingatkan bahwa laporan harus dilampirkan ke issue; ia tidak menutup issue.

Gunakan `docs/QA-EVIDENCE-TEMPLATE.json` sebagai wadah isi laporan dan `docs/QA-EVIDENCE-TEMPLATE.md` sebagai checklist lampiran #5–#8. Template sengaja gagal divalidasi sampai diisi dengan data perangkat nyata.

Quality tier:

| Tier | Icosphere detail | Prop capacity | Fauna capacity | Cloud | Drop |
|---|---:|---:|---:|---:|---:|
| low | 2 | 32 | 6 | 6 | 24 |
| medium | 3 | 64 | 12 | 10 | 48 |
| high | 4 | 96 | 24 | 14 | 80 |

Adaptive quality otomatis menurunkan tier bila p95 > 34 ms selama 120 frame. Tidak pernah naik melewati tier saat boot.

## Matriks pengujian

| # | Skenario | Cara | Lulus jika |
|---|---|---|---|
| 1 | Cold start | Buka PWA dari ikon, catat waktu sampai canvas interaktif | < 5 s pada jaringan 4G |
| 2 | Frame budget | Total 5 menit (2× `qaSeconds=180`), 25+ objek, cuaca hujan/badai | p50 frame time ≤ 33,3 ms / `fps ≥ 30`, p95 ≤ 33 ms Android; desktop p95 ≤ 16,7 ms |
| 3 | Adaptive quality | Paksa beban berat; amati overlay | Tier turun otomatis, tidak error, game tetap bisa dimainkan |
| 4 | Pinch zoom | Dua jari pinch in/out di permukaan planet | `camera().distance` berubah; tidak ada rotasi liar |
| 5 | Drag 360° | Geser satu jari melewati kutub | Kamera tidak terbalik; batas polar bekerja |
| 6 | Context loss | Background aplikasi 30 s / ganti app / GPU reset | Tidak crash; `webglcontextrestored` terjadi; render lanjut |
| 7 | PWA offline | Install → airplane mode → buka kembali | App shell tampil, save terbaca, bisa menanam objek |
| 8 | Update PWA | Deploy build baru, buka app lama | Prompt update muncul; save IndexedDB tetap utuh |
| 9 | Save/load | Tanam objek, tunggu 1 s, reload | Objek & tick kembali sama |
| 10 | DNA | Salin DNA, planet baru, muat DNA | Seed & nama kembali sama |
| 11 | Satwa | Tempatkan kijang/rubah/burung, amati panel ekosistem | Nilai satwa & populasi naik; tidak ada error batch |
| 12 | Event opsional | Picu hujan/badai/kekeringan lalu pulihkan | Progress event di HUD bertambah dan XP bertambah saat selesai |
| 13 | Responsive | Portrait → landscape → portrait saat bermain | Tidak ada panel yang menutupi planet sepenuhnya |
| 14 | Konsol | Seluruh sesi | Tidak ada error aplikasi (error shader saat context loss dicatat terpisah) |
| 15 | Fauna otonom | Bangun laut/danau/pohon/bunga, tunggu 60–120 tick; cek `wildlife()` | Kijang, ikan, serangga, burung muncul; agen bergerak; draw call < 150; tidak ada error batch |

## Runbook bukti fisik #5–#8 (v0.20.0+, dipakai v0.21.0)

Semua langkah berikut wajib dilakukan di perangkat nyata. Headless hanya dipakai sebagai smoke, bukan bukti.

1. **Siapkan build.** Install PWA dari HTTPS, buka dari ikon, lalu buka  
   `?debug=1&perf=1&quality=medium&qa=1&qaObjects=94&qaSeconds=180`.
2. **Sesi A — portrait #5/#7.** Biarkan probe 180 s. Salin laporan QA, simpan sebagai `report-portrait.json`, dan lampirkan ke #5. Jika `p95ms > 33`, lampirkan juga ke #7; jangan tutup #7.
3. **Sesi B — landscape #8.** Putar ke `844×390`, ulangi probe lebih singkat (`qaSeconds=45`), salin sebagai `report-landscape.json`. Lampirkan screenshot yang menampilkan planet di tengah. Periksa `layout.planetCenterVisible === true`, `objectiveOverlapsInventory === false`, dan `topbarOverlapsBuild === false`.
4. **Sesi C — offline #6.** Catat `save.tick`/`save.objects` sebelum airplane mode. Aktifkan airplane mode, buka ulang dari ikon PWA, tunggu canvas interaktif, tanam satu objek, lalu salin laporan. Expected: `device.standalone === true`, `runtime.serviceWorker.controller === true`, `network.online === false`, dan `save` terbaca.
5. **Sesi D — update #6.** Kembali online, deploy build baru, buka aplikasi lama dari ikon, catat apakah prompt update muncul, lalu pastikan `save.tick`/`save.objects` tidak hilang setelah aplikasi dimuat ulang.
6. **Validasi lokal.** Jalankan `npm run qa:evidence -- <file> --standalone --offline --landscape` sesuai konteks sesi. `EVIDENCE OK` berarti format bukti konsisten, bukan pengganti lampiran perangkat.
7. **Context loss (#5).** Background aplikasi 30 s / ganti aplikasi / paksa GPU reset, lalu buka lagi. Catat apakah render lanjut tanpa crash. Hook `loseContext()`/`restoreContext()` di `?debug=1` hanya alat bantu, bukan bukti.

Status ditutup hanya bila laporan + screenshot asli ada di issue terkait dan angka p95 memenuhi target.

## Perangkat minimum yang disarankan

- Android menengah: Snapdragon 6-series / Dimensity 700, RAM 4 GB, Android 10+, Chrome terbaru.
- Desktop: Chrome/Edge terbaru dengan WebGL2.
- Low-end (opsional): RAM 2 GB → paksa `quality=low`; terima detail geometri lebih rendah.

## Gate beban deterministik

`npm run test:qa-load` membuka `?debug=1&qa=1&qaObjects=94&qaSeconds=12&quality=medium&seed=1`, memajukan 16 tick agar cuaca Hujan aktif, lalu mengunci p95 ≤ 33,40 ms, tier medium tanpa downgrade, 94 objek, dan draw call ≤ 20 pada cuaca **Hujan/Badai/Salju** (≤ 18 saat Cerah). Tidak ada weather state “Berawan”. Angka 20 adalah baseline seed 1 pra-facet; jangan disamakan dengan 18 pada run cerah.

Untuk mengukur ulang p95 pada kandidat v0.21.0, gunakan `docs/QA-P95-REMEASURE.md`. Target issue #7 tetap **≤ 33 ms**; angka 33,40 ms pada gate beban hanyalah baseline headless, bukan kriteria lulus perangkat nyata.

## Catatan headless

`npm run test:device` sudah menguji pinch sintetis, quality override, adaptive downgrade, dan hook `loseContext()`/`restoreContext()` di Chromium headless. Namun Chromium headless tidak bisa mengembalikan konteks WebGL sungguhan setelah `WEBGL_lose_context.restoreContext()`, jadi **checklist #6 tetap wajib** dilakukan di perangkat nyata.

> Catatan (v0.14.3): verifikasi localhost secure-context sudah lolos untuk manifest installable shape, service worker control, precache shell + chunk, offline reload, dan tanpa page error. Ini **bukan** pengganti verifikasi HTTPS + Android nyata pada baris 7–8 di atas.

## Hasil perangkat nyata — v0.15.4/0.15.5 (2026-11-21)

Perangkat: **Itel S686LN**, Android 15, 8 core, RAM 8 GB, DPR 3, viewport 360×678. Sumber: produksi `https://tinyplanetfactory.netlify.app/`; laporan otomatis tersalin ke clipboard saat selesai. Run C–E memakai build v0.15.5 dengan beban objek dari `qaObjects`/save lokal.

| Run | Durasi | Frame | p50 | p95 | FPS | Boot | Tier | Draw call | Objek | Context lost | SW | Standalone |
|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---|---|---|
| A | 45,0 s | 1777 | 33,20 ms | 33,40 ms | 30,1 | 243 ms | medium | 7 | 15 | false | true | false |
| B | 60,0 s | 2387 | 16,90 ms | 33,40 ms | 59,2 | 2031 ms | medium | 6 | 4 | false | true | false |
| C | 10,0 s | 387 | 33,20 ms | 33,40 ms | 30,1 | 653 ms | medium | 18 | 94 | false | true | false |
| D | 60,0 s | 2389 | 16,90 ms | 33,40 ms | 59,2 | 305 ms | medium | 18 | 94 | false | true | false |
| E | 180,0 s | 7175 | 33,20 ms | 33,40 ms | 30,1 | 635 ms | medium | 18 | 94 | false | true | false |

Catatan interpretasi:

- Run C–E membawa **94 objek** (jauh di atas target 25+) dan draw call **18**, tanpa adaptive downgrade dan tanpa context loss. `qaSeconds` dibatasi aplikasi ke maksimal **180 s**, sehingga run E adalah pengganti praktis checklist 5 menit.
- Frame rate **30,1–59,2 FPS** memenuhi target minimum 30 FPS, termasuk pada beban 94 objek. Namun p95 **33,40 ms** konsisten **0,40 ms di atas** ambang 33 ms, sehingga baris #2 pada matriks di atas **belum dicentang lulus penuh**.
- Boot yang dilaporkan QaProbe adalah **0,24–2,03 s** sejak hook mulai, bukan cold-start 4G penuh dari ikon PWA; baris #1 masih memerlukan pengukuran terpisah.
- Service worker aktif pada semua run. `installPromptSeen` terlihat pada sebagian run; `standalone: false` karena aplikasi dibuka dari browser, bukan dari ikon yang sudah dipasang. Baris #7–#8 (install → airplane mode, update) **masih belum terverifikasi**.
- Tidak ada context loss pada semua run; ini melengkapi tetapi tidak menggantikan checklist #6 untuk background/GPU reset nyata.
- Catatan v0.15.6–v0.15.9: normalisasi bentuk planet, perubahan cuaca, facet/contact shadow, dan layout landscape mengubah apa yang harus diamati. Angka di atas adalah baseline pra-v0.15.6 dan wajib diulang; lihat `docs/SPRINT.md` SPR-03.

## Hasil lokal v0.15.9 (2026-11-22)

- `npm test` lokal: 8/8 PASS (termasuk `test:qa-load`).
- QA deterministik seed 1, 94 objek, medium, Hujan: p50 16,70 ms, p95 16,80 ms, 59,9 FPS, draw call 20, boot **359 ms** pada run lokal terakhir (run lokal sebelumnya 463 ms; remote 345 ms), tanpa downgrade. Angka 335 ms berasal dari laporan `test:device` remote dan bukan hasil `test:qa-load`.
- Ini hasil Chromium headless; checklist perangkat nyata #1–#15 belum dinyatakan lulus hanya dari angka ini. Sebagian (#9 save/load, #13 responsive) hanya teruji di headless.

Remote produksi v0.15.9 (`https://tinyplanetfactory.netlify.app/`, commit `ea8f9b9`): `npm test` 8/8 PASS; manifest/sw 200, cache `tpf-shell-v0-15-9`, offline reload menampilkan canvas + menu. Ini bukan pengganti install fisik → airplane mode → update pada Android.

## Hasil lokal v0.16.0 — asset variants (2026-11-22)

- `npm test` lokal: 8/8 PASS; `test:scale` mengaudit 39 varian prop + 10 varian fauna (43 builder unik), tinggi ±5%, triangle/facet, tekstur 0, spacing, dan determinisme resolver untuk seed 1/1337 di 9 planet.
- `test:qa-load` seed 1, 94 objek, medium, Hujan: p50 16,70 ms, p95 16,80 ms, 59,9 FPS, draw call 20, boot 386–561 ms bergantung run, tanpa downgrade. Tidak ada perubahan draw call dibanding baseline v0.15.9.
- Varian aktif seed 1: Terra = Oak/Granite/Tropical/Clear, Dune = Dune/Sandstone/Oak/Cactus, Aquaria = Coastal/Oak/Reef/Lotus. Bisa diverifikasi dengan `?debug=1` → `window.__game.variants()` (indices + labels).

### Verifikasi cepat varian

1. Buka `?debug=1&seed=1&planet=dune&menu=0&quality=medium`.
2. Di konsol, jalankan `window.__game.variants()` dan cocokkan `labels.props` dengan `sand: Dune`, `rock: Sandstone`, `tree: Oak`, `bush: Cactus`.
3. Panggil `window.__game.setPlanet('sakura', 1)`, lalu ulangi. `tree` harus berubah menjadi `Sakura` dan `bush` menjadi `Lavender`.
4. Simpan screenshot bila ada perbedaan siluet/visibilitas. Jangan anggap langkah ini sebagai pengganti QA perangkat nyata.
- Build lokal: app chunk 73,33 kB (gzip 23,96 kB); cache SW `tpf-shell-v0-16-0`.
- **Belum diklaim lulus:** p95 device nyata masih 33,40 ms, install/offline fisik, landscape, cold start 4G, dan context loss/restore. Semua angka di atas Chromium headless.
- Screenshot lokal seed 1: `/tmp/opencode/v016-terra.png`, `/tmp/opencode/v016-dune.png`, `/tmp/opencode/v016-aquaria.png`. Sudah dihasilkan dari build v0.16.0, tetapi belum diverifikasi secara visual oleh manusia; bukan artefak rilis.
- Remote produksi v0.16.0 (`https://tinyplanetfactory.netlify.app/`, commit `e71e6c1`, bundle `index-Cl2SK4zO.js`): `npm test` **8/8 PASS** pada attempt ke-2 (attempt pertama smoke timeout 30 s karena kondisi jaringan sesaat, bukan error aplikasi). Manifest/sw 200, cache `tpf-shell-v0-16-0` dengan 12 entri, controller aktif, dan offline reload menampilkan canvas tanpa error. Ini bukan pengganti install fisik → airplane mode → update pada Android.

## Hasil lokal v0.17.0 — campaign & leveling (2026-11-22)

- Build lokal `main`: app chunk 75,00 kB (gzip 24,55 kB), cache SW `tpf-shell-v0-17-0`, tanpa circular chunk warning.
- `npm test` lokal 8/8 PASS. `test:sim` menambah cek 100 misi unik, kurva kuadratik, batas era, migrasi level lama, reward misi pertama, progres ocean, dan penolakan misi locked.
- `test:smoke` memakai hook `window.__game.campaign()` untuk memverifikasi 100 misi/10 era dan progres misi aktif; `test:menu` memeriksa label `Level x/100` dan panel campaign tertutup saat normal play.
- `?debug=1&campaign=1&menu=0` menampilkan 10 era dan 100 baris misi tanpa error konsol; 40 baris bertanda locked.
- **Belum di-deploy dan belum diuji di perangkat nyata.** Semua angka di atas berasal dari Chromium headless/local build; P0 Sprint 09 tetap OPEN.
