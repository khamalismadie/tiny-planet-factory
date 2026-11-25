# Operations

## Pin produksi

- Produksi saat ini: **v0.16.0**.
- Bundle produksi: `index-Cl2SK4zO.js`.
- SW produksi: `tpf-shell-v0-16-0`.
- Netlify produksi memakai `stop_builds: true` sampai keputusan rilis berikutnya.

Kandidat lokal `v0.21.0` (`index-DJTYXXt9.js`) **belum** boleh deploy produksi karena #5–#8 masih OPEN.

## Insiden tercatat

Draft produksi sempat berubah ke `v0.21.0` pada deploy `6b0442c23292ad856e452a13`, lalu dikembalikan ke commit `e71e6c1` / bundle `index-Cl2SK4zO.js`. Setelah insiden, auto deploy produksi dihentikan dan bukti lama dinyatakan stale untuk bundle baru.

## Preview

- Netlify Drop hanya untuk preview sementara, ber-password, unclaimed, dan kedaluwarsa ±1 jam. Bukan produksi.
- Limit harian Drop pernah membuat deploy ulang gagal; jangan menganggap URL lama masih menyajikan bundle terbaru.
- Token Netlify tidak pernah disimpan di repo. Workflow preview wajib memakai alias draft, bukan `--prod`.

## Rollback

1. Pastikan commit produksi terakhir yang diketahui baik: `e71e6c1`.
2. Kembalikan deploy ke commit/bundle `index-Cl2SK4zO.js`.
3. Verifikasi `/manifest.webmanifest` dan `/sw.js` mengembalikan 200.
4. Jalankan 8 gate dari URL produksi.
5. Catat insiden di dokumen ini dan detail di `docs/11-RELEASE-DEPLOYMENT/RELEASE.md`.

## Rilis berikutnya

Hanya boleh setelah:

- #6, #7, #8 PASS dengan bukti untuk bundle yang sama.
- #5 ditutup terakhir dengan cold start, pinch/drag, dan context/restore lengkap.
- Human approval rilis tercatat.
