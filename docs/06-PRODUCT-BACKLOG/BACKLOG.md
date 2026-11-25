# Product Backlog

Status per 2026-11-25. Sumber: `docs/02-PRODUCT-STRATEGY/PRODUCT-TO-PRODUCTION.md` §3.2, `docs/10-QA-TESTING/QA-ISSUE-PLAYBOOK.md`, dan `docs/11-RELEASE-DEPLOYMENT/RELEASE.md`. Paket pengumpulan bukti untuk bundle saat ini ada di `docs/10-QA-TESTING/QA-HANDOFF-WAVE10.md`.

## P0 — terbuka

| ID | Item | Status | Catatan |
|---|---|---|---|
| #5 | QA Android nyata: p50/p95, cold start 4G, pinch/drag, context loss/restore | OPEN | Umbrella; ditutup terakhir setelah #6–#8. Perangkat Itel S686LN / Android 15 terhubung. `context-before.json` LULUS: `p95 16,8 ms`, 45 s, 94 objek, `contextLost:false`, `serviceWorker.controller:true`, boot `1143 ms`. Skenario 4G/pinch/drag dan background 30 s + restore masih wajib manual |
| #6 | PWA install → offline boot/save/place → update | OPEN | `serviceWorker.controller:true` dan shell `tpf-shell-v0-21-0` terlihat di run #1, namun `standalone:false` di kedua run; offline/update belum diverifikasi |
| #7 | p95 `33,4 ms → ≤ 33 ms` | OPEN — 1/2 valid | `report-p95-run1.json` LULUS: `16,8 ms`, 180 s, 94 objek, draw call 20, validator OK. Run #2 juga `16,8 ms` tetapi `pwaControllerAktif:false` karena origin tunnel berganti, jadi belum bisa dipakai sebagai bukti penutup |
| #8 | Landscape 844×390, planet tidak tertutup panel | OPEN | Run portrait `360×678` bersih (`planetCenterVisible:true`, tanpa overlap), tapi belum ada laporan landscape dari perangkat |
| VIS | Human sign-off visual real-device (shape/weather/facet/gunung/FPS) | OPEN | Tidak bisa diklaim dari screenshot model; perlu konfirmasi pengguna di perangkat |

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

## Bukti Wave 10 yang sudah masuk

| File | Hasil |
|---|---|
| `qa-evidence/wave10/report-p95-run1.json` | LULUS validator: `p95 16,8 ms`, `180014 ms`, 94 objek, draw call 20, `serviceWorker.controller:true`, bundle `index-DJTYXXt9.js` |
| `qa-evidence/wave10/attempt-p95-origin-change.json` | `p95 16,8 ms`, `180010 ms`, tetapi `serviceWorker.controller:false` karena origin tunnel berganti. Ini catatan percobaan, **bukan** bukti penutup; sengaja tidak memakai prefix `report-` agar tidak ikut batch validator |
| `qa-evidence/wave10/context-before.json` | LULUS validator: `p95 16,8 ms`, 45 s, 94 objek, `contextLost:false`, `serviceWorker.controller:true`. Ini baseline sebelum percobaan context loss; **bukan** bukti restore |

Kedua run berasal dari perangkat Itel S686LN / Android 15 lewat preview HTTPS sementara. Tidak ada production deploy; produksi tetap `v0.16.0`.

## Catatan drift

`docs/07-SPRINT-PLANNING/SPRINT.md` masih memakai kerangka Sprint 09 v0.15/v0.16 dan beberapa checklist belum diperbarui ke v0.21.0. Ini sengaja dicatat sebagai drift, bukan diubah menjadi PASS. Referensi `docs/qa/sprint-09/device.json` juga belum ada; jangan membuat file bukti kosong hanya untuk menutup referensi.
