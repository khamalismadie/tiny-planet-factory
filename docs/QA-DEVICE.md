# QA Perangkat — Tahap 8

Target: **Android menengah** (30 FPS, p95 frame time ≤ 33 ms), desktop 60 FPS.

## Instrumentasi

Tambahkan query string saat membuka build produksi:

```
http://<host>/?debug=1&perf=1&quality=medium
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
  - `qaObjects=N` — saat `qa=1`, menanam N objek (maks 96) dengan sebaran spiral sebelum pengukuran; dipakai untuk beban 25+ objek
- `seed=N` — mengunci seed planet agar cuaca dan penempatan QA deterministik; dipakai `test:qa-load` dengan `seed=1`

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
| 2 | Frame budget | Main 5 menit, 25+ objek, cuaca hujan/badai | p50 ≥ 30 FPS, p95 ≤ 33 ms Android; desktop p95 ≤ 16,7 ms |
| 3 | Adaptive quality | Paksa beban berat; amati overlay | Tier turun otomatis, tidak error, game tetap bisa dimainkan |
| 4 | Pinch zoom | Dua jari pinch in/out di permukaan planet | `camera().distance` berubah; tidak ada rotasi liar |
| 5 | Drag 360° | Geser satu jari melewati kutub | Kamera tidak terbalik; batas polar bekerja |
| 6 | Context loss | Background aplikasi 30 s / ganti app / GPU reset | Tidak crash; `webglcontextrestored` terjadi; render lanjut |
| 7 | PWA offline | Install → airplane mode → buka again | App shell tampil, save terbaca, bisa menanam objek |
| 8 | Update PWA | Deploy build baru, buka app lama | Prompt update muncul; save IndexedDB tetap utuh |
| 9 | Save/load | Tanam objek, tunggu 1 s, reload | Objek & tick kembali sama |
| 10 | DNA | Salin DNA, planet baru, muat DNA | Seed & nama kembali sama |
| 11 | Satwa | Tempatkan kijang/rubah/burung, amati panel ekosistem | Nilai satwa & populasi naik; tidak ada error batch |
| 12 | Event opsional | Picu hujan/badai/kekeringan lalu pulihkan | Progress event di HUD bertambah dan XP bertambah saat selesai |
| 13 | Responsive | Portrait → landscape → portrait saat bermain | Tidak ada panel yang menutupi planet sepenuhnya |
| 14 | Konsol | Seluruh sesi | Tidak ada error aplikasi (error shader saat context loss dicatat terpisah) |
| 15 | Fauna otonom | Bangun laut/danau/pohon/bunga, tunggu 60–120 tick; cek `wildlife()` | Kijang, ikan, serangga, burung muncul; agen bergerak; draw call < 150; tidak ada error batch |

## Perangkat minimum yang disarankan

- Android menengah: Snapdragon 6-series / Dimensity 700, RAM 4 GB, Android 10+, Chrome terbaru.
- Desktop: Chrome/Edge terbaru dengan WebGL2.
- Low-end (opsional): RAM 2 GB → paksa `quality=low`; terima detail geometri lebih rendah.

## Gate beban deterministik

`npm run test:qa-load` membuka `?debug=1&qa=1&qaObjects=94&qaSeconds=12&quality=medium&seed=1`, memajukan 16 tick agar cuaca Hujan aktif, lalu mengunci p95 ≤ 33,40 ms, tier medium tanpa downgrade, 94 objek, dan draw call ≤ 20 pada cuaca berawan/hujan (≤ 18 saat cerah). Angka 20 adalah baseline yang sama sebelum perubahan facet; jangan disamakan dengan 18 pada run cerah.

## Catatan headless

`npm run test:device` sudah menguji pinch sintetis, quality override, adaptive downgrade, dan handler context loss/restore di Chromium headless. Namun Chromium headless tidak bisa mengembalikan konteks WebGL sungguhan setelah `WEBGL_lose_context.restoreContext()`, jadi **checklist #6 tetap wajib** dilakukan di perangkat nyata.

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
- Catatan v0.15.6: normalisasi bentuk planet mengubah skala kontak prop. Angka di atas adalah baseline sebelum perbaikan dan perlu diulang setelah build v0.15.6.

## Hasil lokal v0.15.9 (2026-11-22)

- `npm test` lokal: 8/8 PASS (termasuk `test:qa-load`).
- QA deterministik seed 1, 94 objek, medium, Hujan: p50 16,70 ms, p95 16,80 ms, 59,9 FPS, draw call 20, boot 335 ms, tanpa downgrade.
- Ini hasil Chromium headless; checklist perangkat nyata #1–#8 dan #13 belum dinyatakan lulus hanya dari angka ini.

Remote produksi v0.15.9 (`https://tinyplanetfactory.netlify.app/`, commit `ea8f9b9`): `npm test` 8/8 PASS; manifest/sw 200, cache `tpf-shell-v0-15-9`, offline reload menampilkan canvas + menu. Ini bukan pengganti install fisik → airplane mode → update pada Android.
