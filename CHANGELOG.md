# Changelog

Ringkasan user-facing. Detail teknis dan bukti ada di `docs/11-RELEASE-DEPLOYMENT/RELEASE.md`.

## Unreleased — v0.21.0

- Kampanye 100 level / 10 era, 100 misi utama, enam tipe quest, HUD kampanye, dan progresi XP.
- Fitur perawatan planet lokal: kompendium, insight habitat/cuaca, tren restorasi, jurnal, milestone, advisory risiko-respons, ekspor jurnal, pratinjau dampak objek, panel offline, lencana ekologi, dan Indeks Kesehatan Planet. Semua derived dari state yang sudah ada.
- UI colorful dengan palet per planet, panel paper di atas panggung malam, dan panduan satu modal kanonik.
- Aset low-poly colorful: palet prop/terrain/cuaca lebih terang, varian gunung limestone/basalt, glint mata, dan bayangan kontak lebih ringan.
- Mode FPS menjadi kamera spherical bebas: planet diam, kamera mengitari dengan yaw/pitch dan zoom `1,15`–`6`.
- Gunung menjadi massif segitiga tak beraturan deterministik tanpa tekstur atau draw call baru.

Status: **belum dirilis**. Issue #5–#8 masih terbuka; bundle `index-DJTYXXt9.js`.

## v0.16.0 — produksi saat ini

- 49 pilihan aset (39 prop + 10 fauna) dari 43 builder unik, dipilih deterministik dari `seed + planetId`.
- Sembilan planet aktif dengan bias visual per planet, tanpa perubahan DNA/schema.
- Satu geometri aktif per tipe; draw call cerah `≤ 18` dan cuaca `≤ 20`.

Bundle produksi: `index-Cl2SK4zO.js`, service worker `tpf-shell-v0-16-0`.

## v0.15.x — fondasi

- Arsitektur sim renderer-agnostic dan deterministik.
- Low-poly satu merged geometry per tipe, vertex colors, AO per facet, bayangan kontak baked.
- Cuaca hujan/badai/salju dan 8 gate otomatis.
- PWA installable/offline dengan anggaran muat `< 5 s`.

Catatan: perubahan di atas tidak menaikkan target gate. Migrasi struktur dokumen `00`–`13` pada 2026-11-25 tidak mengubah kode game atau status QA.
