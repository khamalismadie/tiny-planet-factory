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
- `planet=terra|dune|glaciere|inferna|aquaria|mycelia|sakura` mengaktifkan planet tersebut; tanpa parameter ini save Terra dipakai bila ada.
- `debug=1` membuka `window.__game`:
  - `metrics()` — frame stats, quality tier, adaptive downgrade count, context loss state, orbit distance
  - `camera()`, `orbitDebug()`
  - `place(type, dir)`, `tick(n)`, `reset(seed)`
  - `setQuality(tier)`, `loseContext()`, `restoreContext()` — **hati-hati, hanya untuk QA**
  - `wildlife()` — jumlah agen, spesies ditemukan/punah, dan breakdown per spesies
  - `eco()`, `ecoScore(id)` — state ekosistem dan faktor habitat spesies planet aktif
  - `cryo()` — musim, freeze, es, salju, dan thaw stress (Glaciera)
  - `volcano()` — musim, panas, lava, abu, dan eruption stress (Inferna)
  - `ocean()` — musim, arus, kesehatan terumbu, plankton, pemutihan, dan oksigen terlarut (Aquaria)
  - `fungal()` — musim, jaringan, spora, cahaya, nutrisi, dan stres jaringan (Mycelia)
  - `sky()` — musim, konektivitas, angin, mekar, uplift, dan stres isolasi (Sakura)
  - `foodWeb()` — status 5 guild visual, jumlah agen, dan link food web planet aktif
  - `setPlanet(id, seed?)` — pindah ke planet aktif (`terra`, `dune`, `glaciere`, `inferna`, `aquaria`, `mycelia`, atau `sakura`)
  - `qaReport()` — laporan performa + status fauna terbaru

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

## Catatan headless

`npm run test:device` sudah menguji pinch sintetis, quality override, adaptive downgrade, dan handler context loss/restore di Chromium headless. Namun Chromium headless tidak bisa mengembalikan konteks WebGL sungguhan setelah `WEBGL_lose_context.restoreContext()`, jadi **checklist #6 tetap wajib** dilakukan di perangkat nyata.
