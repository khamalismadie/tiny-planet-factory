# Decision Log

Keputusan yang mengikat. Ubah hanya dengan alasan tertulis dan evaluasi ulang gate.

| ID | Keputusan | Alasan |
|---|---|---|
| ADR-001 | Sim renderer-agnostic & deterministik | QA harus reproducible; render boleh berganti tanpa mengubah aturan dunia |
| ADR-002 | PixiJS 3D + WebGL2 baseline | Bundle lebih kecil dan cocok untuk perangkat menengah |
| ADR-003 | Satu geometri gabungan per tipe, vertex colors, tanpa tekstur/GLB | Menjaga draw call `≤ 18`/`≤ 20` dan chunk `< 100 kB` |
| ADR-004 | PWA offline-first dengan shell version | Into loop tetap bisa dimainkan tanpa jaringan |
| ADR-005 | App chunk `< 100 kB` | Anggaran muat `< 5 s` dan perangkat menengah |
| ADR-006 | UI colorful per planet dari `PlanetConfig`, UI phase sebelum asset phase | Tidak menambah modul palet; warna tetap konsisten |
| ADR-007 | Kamera FPS = orbit spherical, planet diam | Sesuai ekspektasi kamera ala GTA; planet tidak ikut berputar saat mouse digerakkan |
| ADR-008 | Gunung = massif segitiga tak beraturan deterministik | Low-poly match dataran tanpa tekstur atau draw call baru |
| ADR-009 | Produksi dipin di `v0.16.0` sampai #5–#8 PASS | Tidak ada bukti perangkat nyata untuk `v0.21.0` |
| ADR-010 | Bukti QA hanya `qaReport()` | Menolak telemetry `sessionId`/`events` sebagai bukti |
| ADR-011 | Migrasi dokumen lifecycle `00`–`13` dengan `default-engineering/` | Menyatukan product/engineering trail tanpa menyentuh kode game |

Detail sejarah implementasi ada di `docs/11-RELEASE-DEPLOYMENT/RELEASE.md`.
