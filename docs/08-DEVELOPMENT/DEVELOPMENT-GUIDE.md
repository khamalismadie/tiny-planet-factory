# Development Guide

## Setup

```bash
npm ci
npm run dev       # http://localhost:5173
npm test          # delapan gate
npm run build     # tsc + vite
npm run preview   # menyajikan dist/
```

## Menambah/mengubah properti

1. Gunakan builder yang sudah ada di `src/render/assetGeometry.ts`.
2. Ambil warna dari palet yang ada atau `PlanetConfig`; jangan buat modul palet baru.
3. Tetapkan tinggi, footprint, triangle, dan facet agar lolos `scripts/art-scale-check.ts`.
4. Jangan menambah tekstur, GLB/GLTF, atau draw call baru.
5. Jika menambah variant, daftarkan di `ASSET_BUILDERS`, `PROP_VARIANT_LABELS`, dan `docs/05-ENGINEERING-BLUEPRINT/ASSET-CATALOG.md`.
6. Ukur ulang chunk. App chunk harus tetap `< 100 kB`.

## Mengubah UI

- Teks dan misi tetap bahasa Indonesia.
- Palet per planet memakai `body[data-planet]` dan token CSS yang sudah ada.
- Popup galeri dan panduan tetap bottom-anchored; panduan tetap satu modal kanonik.
- Cek portrait 360×678 dan landscape 844×390 dengan `npm run test:layout`.

## Mengubah kamera/QA debug

- Planet tidak boleh berputar saat FPS aktif.
- Debug API hanya untuk verifikasi; jangan menambah telemetry `sessionId`/`events`.
- Perubahan bundle hash membuat semua bukti lama stale; catat di `docs/11-RELEASE-DEPLOYMENT/RELEASE.md` dan `qa-evidence/README.md`.

## Sebelum PR

```bash
npm test
npm run build
git diff --check
```

Lalu isi `PULL_REQUEST_TEMPLATE.md` dengan gate, bundle hash, dan status QA.
