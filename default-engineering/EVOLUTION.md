# EVOLUTION

Cara aman mengubah sistem dari waktu ke waktu.

## Siklus

`00 initialization → 01 discovery → 02 strategy → 03 PRD → 04 architecture → 05 engineering → 06 backlog → 07 sprint → 08 development → 09 review → 10 QA → 11 release → 12 operations → 13 evolution`

Setiap perubahan besar harus punya jejak di tahap yang sesuai. Ini tidak berarti birokrasi tambahan; cukup tautan dari doc yang sudah ada.

## Versioning

- `v0.21.0` saat ini adalah kandidat **unreleased**.
- `v0.16.0` adalah produksi yang dipin sampai QA fisik selesai.
- Perubahan schema/contract menaikkan minor; fix/QA tidak menaikkan minor tanpa keputusan eksplisit.
- Bundle hash adalah identitas bukti. Jika hash berubah, semua bukti lama menjadi stale.

## Aturan evolusi

- Fitur P2 baru masuk backlog hanya setelah P0 QA PASS.
- Planet/biome baru tidak masuk build sebelum checklist P0 selesai.
- Arsip QA tidak ditulis ulang; buat folder wave baru.
- Gate dan target tidak dinegosiasi lewat PR; perubahan perlu keputusan eksplisit dan doc alasan.
- Setelah rilis, tulis ringkasan di `CHANGELOG.md` dan detail di `docs/11-RELEASE-DEPLOYMENT/RELEASE.md`.

## Status saat ini

Lihat `docs/06-PRODUCT-BACKLOG/BACKLOG.md` dan `docs/13-PRODUCT-EVOLUTION/EVOLUTION.md` untuk daftar yang ditahan dan alasannya.
