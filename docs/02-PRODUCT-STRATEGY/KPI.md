# KPI & Telemetri

Telemetri di Tiny Planet Factory **opt-in**, tersimpan lokal di `localStorage` dengan kunci `tpf.telemetry.v1`, dan tidak pernah dikirim ke server secara otomatis. Pemain bisa menyalin atau menghapus datanya lewat tombol **Telemetri**. Ekspor JSON menyertakan `app`, `version` (`0.21.0` pada `main`; produksi masih `0.16.0`), dan maksimal 250 event terakhir.

## Event yang dicatat

| Event | Data | Pertanyaan yang dijawab |
|---|---|---|
| `boot` | `bootMs`, `quality`, `dpr`, `viewport` | Berapa lama app sampai frame pertama? Apakah cold start < 5 s? |
| `session_start` | `tick`, `planetId`, `stage`, `level`, `seed`, `elapsedMs` | Sesi baru dimulai dari planet/seed mana? |
| `session_end` | `tick`, `planetId`, `stage`, `level`, `seed`, `elapsedMs` | Berapa lama sesi bertahan dan tahap apa yang tercapai? |
| `objective_shown` | `context` | Objective strip mana yang sedang dipandu pemain? |
| `placement` | `type`, `total`, `tick` | Alat mana yang dipakai pemain? Berapa objek sebelum misi selesai? |
| `mission_complete` | `tick` | Berapa lama (dalam tick) misi utama selesai? Target: 90–150 tick (~3–5 menit). |
| `event_complete` | `id`, `tick` | Event opsional mana yang menarik pemain? |
| `stage_reached` | `from`, `to` | Berapa lama pemain naik tahap evolusi? |
| `level_reached` | `from`, `to` | Apakah kurva level bisa dicapai dalam 3–5 menit? |
| `season_change` | `from`, `to` | Apakah siklus musim 100–120 tick terasa jelas? |
| `planet_switch` | `from` | Apakah pemain memakai pemilih 9 planet di menu? |
| `quality_change` | `tier` | Kapan pemain mengubah kualitas secara manual? |
| `menu_open` | `tick` | Kapan menu utama dibuka kembali? |
| `context_loss` | `tick` | Seberapa sering konteks GPU hilang di perangkat nyata? |
| `quality_downgrade` | `from`, `to`, `p95ms` | Kapan adaptive quality turun dan pada ambang berapa? |
| `qa_report` | `p50ms`, `p95ms`, `fps`, `bootMs`, `tier`, `frames` | Ringkasan benchmark dari `?qa=1`. |
| `dna_import` | `objects`, `tick` | Berapa sering kode DNA dipakai untuk memuat planet? |
| `dna_preview` | `objects` | Apakah pemain memakai pratinjau sebelum mengimpor? |
| `dna_duplicate` | `objects` | Apakah duplikasi dipakai sebagai titik awal eksperimen? |
| `dna_remix` | `objects` | Seberapa sering pemain membuat variasi dari DNA yang sudah ada? |
| `species_discovered` | `id`, `tick` | Spesies mana yang pertama kali muncul, dan berapa lama pemain butuh membangun habitatnya? |
| `species_extinct` | `id`, `tick` | Apakah habitat pemain cukup stabil untuk mempertahankan rantai makanan? |

## KPI turunan

- **Time-to-first-frame (TTFF)**: median `boot.bootMs`. Target < 5 s pada 4G.
- **Frame health**: median `qa_report.p50ms` dan p95 `qa_report.p95ms`. Target Android menengah: p95 ≤ 33 ms; status terkini baseline device 33,40 ms (**belum lulus**). Adaptive turun bila p95 > 34 ms selama 120 frame; gate headless memakai ≤ 33 ms.
- **Core-loop completion**: persentase sesi dengan `mission_complete`. Target vertical slice: ≥ 60% sesi yang aktif ≥ 3 menit.
- **Tool adoption**: distribusi `placement.type`. Dipakai untuk melihat apakah pemain menemukan satwa dan alat air.
- **Stability**: jumlah `context_loss` per 100 sesi. Target 0 pada perangkat target.
- **Adaptive rate**: persentase sesi dengan `quality_downgrade`. Jika > 30% di Android menengah, turunkan budget default tier medium.
- **Ecosystem depth**: jumlah `species_discovered` per sesi dan rasio `species_extinct`. Target: 5 spesies ditemukan sebelum misi selesai, 0 kepunahan pada sesi sehat.
- **Fauna load**: `wildlifeAgents` dan `discoveredSpecies` dari laporan `?qa=1`. Dipakai untuk mengoreksi budget quality tier tanpa mengorbankan FPS.

## Privasi

- Tidak menyimpan nama, email, IP, lokasi, nomor perangkat, atau identitas iklan.
- `userAgent`, cores/hardwareConcurrency, `deviceMemory`/`memoryGb`, `standalone`, `serviceWorker`, dan `installPromptSeen` hanya muncul di laporan `?qa=1`. `dpr` dan `viewport` juga muncul di event `boot` telemetri rutin.
- Telemetri tidak aktif bila pemain tidak mencentang setuju.
- Save game (IndexedDB) dan telemetri (localStorage) adalah dua penyimpanan terpisah.

## Contoh screenshot/ekspor

Gunakan `?debug=1&qa=1&qaSeconds=45&seed=1&qaObjects=94&quality=medium` untuk laporan deterministik: `seed` mengunci cuaca/penempatan, `qaObjects` maks 96, dan `qaSeconds` dipotong aplikasi ke maks 180. Laporan dapat disalin lewat tombol **Salin hasil QA** lalu ditempel ke issue tracker QA.
