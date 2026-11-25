# Project Charter

Tiny Planet Factory adalah simulasi ekosistem mini berbahasa Indonesia yang dimainkan sebagai diorama planet, berjalan offline lewat PWA, dan dibangun di atas PixiJS 3D.

## Tujuan

- Pemain merawat planet kecil, menanam objek, mengamati fauna/cuaca, dan mengikuti misi kampanye.
- Dunia terasa seperti “ada di dalam planet”: kamera FPS mengitari planet yang tetap diam.
- Semua perilaku penting dapat diuji ulang dari seed yang sama.

## Status saat ini (2026-11-25)

- Kandidat lokal: `v0.21.0`, bundle `index-DJTYXXt9.js`, unreleased.
- Produksi: `v0.16.0`, bundle `index-Cl2SK4zO.js`.
- Issue #5–#8 masih OPEN; bukti untuk bundle kandidat belum lengkap.
- Preview hosted belum tersedia karena Netlify Drop kena limit harian.

## Non-goal

- Tidak menjadi open-world 3D penuh atau game online.
- Tidak menambah planet/biome baru sebelum P0 QA selesai.
- Tidak mengubah sim hanya demi efek visual.
- Tidak mengumpulkan data pribadi atau membuat statistik buatan.

Konstitusi teknis ada di `default-engineering/CORE.md`.
