# Product Backlog

Status per 2026-11-25. Sumber: `docs/02-PRODUCT-STRATEGY/PRODUCT-TO-PRODUCTION.md` §3.2, `docs/10-QA-TESTING/QA-ISSUE-PLAYBOOK.md`, dan `docs/11-RELEASE-DEPLOYMENT/RELEASE.md`.

## P0 — terbuka

| ID | Item | Status | Catatan |
|---|---|---|---|
| #5 | QA Android nyata: p50/p95, cold start 4G, pinch/drag, context loss/restore | OPEN | Umbrella; ditutup terakhir setelah #6–#8 |
| #6 | PWA install → offline boot/save/place → update | OPEN | Sub-langkah update belum terverifikasi; laporan `standalone:false` tidak valid |
| #7 | p95 `33,4 ms → ≤ 33 ms` | OPEN | Run valid Wave 9 masih `33,4 ms` dan stale untuk bundle kini |
| #8 | Landscape 844×390, planet tidak tertutup panel | OPEN | Belum ada laporan lulus `planetCenterVisible:true` |
| VIS | Human sign-off visual real-device (shape/weather/facet/gunung/FPS) | OPEN | Tidak bisa diklaim dari screenshot model |

## P2 — ditunda

| Item | Status |
|---|---|
| Cloud save / gallery / social via Supabase | Deferred |
| Planet atau biome baru | Ditahan sampai P0 selesai |
| Katalog referensi 1.000 aset aktif + wind sway | Deferred |

## Stretch — gated

- Discovery cloud/gallery/social: requirement, KPI, privasi. **Discovery only**, bukan implementasi.
- Draft desain biome berikutnya. Tidak boleh masuk build sebelum sprint berikutnya dan P0 selesai.

## Urutan penutupan aman

1. #7 p95 dengan margin, idealnya `≤ 32 ms`.
2. #6 install/offline/update.
3. #8 landscape.
4. #5 terakhir, setelah checklist cold start/pinch/drag/context loss lengkap.

## Catatan drift

`docs/07-SPRINT-PLANNING/SPRINT.md` masih memakai kerangka Sprint 09 v0.15/v0.16 dan beberapa checklist belum diperbarui ke v0.21.0. Ini sengaja dicatat sebagai drift, bukan diubah menjadi PASS. Referensi `docs/qa/sprint-09/device.json` juga belum ada; jangan membuat file bukti kosong hanya untuk menutup referensi.
