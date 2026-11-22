# Sprint 09 — Production QA Closure

> **Status:** active plan  \n> **Periode:** 23 Nov – 6 Des 2026 · 10 hari kerja  \n> **Versi awal:** `v0.15.9`  \n> **Target rilis:** `v0.15.10` bila hanya fix/QA; `v0.16.0` bila ada perubahan schema atau kontrak  \n> **Sprint goal:** Menutup blocker QA perangkat nyata dan PWA sebelum fitur baru masuk backlog.  \n> **Referensi:** `docs/PRODUCT-TO-PRODUCTION.md`, `docs/QA-DEVICE.md`, `docs/RELEASE.md`

Nomor sprint ini adalah sprint pertama yang didokumentasikan formal. Tidak ada sprint sebelumnya dalam repo; penomoran mengikuti phase rilis `v0.15.x`.

---

## 1. Sprint goal

**“Production QA closed, not just deployed.”**

Di akhir sprint ini, status produk harus bisa dikatakan salah satu dari:

1. **QA CLOSED** — semua P0 lulus, rilis patch bisa ditandai production-ready.
2. **QA FAILED with fix** — ada temuan, sudah diperbaiki, dan diverifikasi ulang.
3. **QA BLOCKED** — misalnya tidak ada perangkat fisik; status ini harus ditulis jujur dan tidak boleh dianggap lulus.

Yang **tidak** boleh terjadi:

- menambah planet/biome baru;
- mengklaim PWA install/offline terverifikasi hanya dari headless;
- mengklaim p95 lulus hanya dari angka Chromium;
- menutup sprint dengan checklist P0 masih open tanpa status blocker.

---

## 2. Snapshot awal sprint

| Area | Kondisi awal | Sumber |
|---|---|---|
| Versi | `v0.15.9` | `package.json` |
| Deploy | Netlify produksi aktif, commit `ea8f9b9` | `README.md`, `docs/RELEASE.md` |
| Test lokal | 8/8 PASS | log lokal 2026-11-22 |
| Test remote | 8/8 PASS | log produksi 2026-11-22 |
| PWA headless | manifest/sw 200, offline reload PASS | QA remote 2026-11-22 |
| QA device | **OPEN** — terakhir tercatat v0.15.5 | `docs/QA-DEVICE.md` |
| p95 device | **33,40 ms**, target ≤33 ms | `docs/QA-DEVICE.md` |
| Draw call | 20 saat Hujan, sama dengan baseline; ≤18 saat Cerah | `test:qa-load`, baseline |
| Fitur baru | Ditahan | keputusan Nine Worlds QA-first |

---

## 3. Kapasitas & asumsi

Kapasitas di bawah adalah **asumsi perencanaan**, bukan data historis.

| Peran | Beban | Catatan |
|---|---|---|
| QA lead | 10 hari | Eksekusi matrix device + PWA |
| Developer render/UI | 6 hari | Siap memperbaiki temuan visual/landscape/p95 |
| Developer PWA/build | 3 hari | Service worker, offline, update |
| PM/dokumentasi | 3 hari | Sprint log, release note, decision log |

**Total kapasitas rencana:** 24 story points.

Jika perangkat fisik tidak tersedia, SPR-01, SPR-02, SPR-03, dan SPR-08 berubah menjadi **BLOCKED**, bukan PASS.

---

## 4. Sprint backlog

| ID | Task | Poin | Prioritas | Owner peran | Status |
|---|---|---:|---|---|---|
| SPR-01 | Eksekusi QA device nyata: p50/p95, cold start 4G, pinch, context loss | 5 | P0 | QA lead | To Do |
| SPR-02 | Verifikasi PWA fisik: install → airplane mode → boot/save/place → update | 4 | P0 | QA lead + PWA dev | To Do |
| SPR-03 | Verifikasi visual real-device: shape fix v0.15.6, weather v0.15.8, facet v0.15.9 | 3 | P0 | QA lead + render dev | To Do |
| SPR-04 | Landscape check & perbaikan panel yang menutup planet | 3 | P0 | UI dev | To Do |
| SPR-05 | Tutup gap p95 device `33,40 ms → ≤33 ms` bila terreproduksi | 4 | P0 | Render dev | To Do |
| SPR-06 | Audit draw call seed-identik pasca-facet; pastikan tidak ada regresi | 2 | P1 | Render dev | To Do |
| SPR-07 | Sinkronisasi documentation drift ke doc sumber | 2 | P1 | PM/dok | To Do |
| SPR-08 | Release gate `v0.15.10` + remote verify + ZIP artefak | 1 | P0 | PM + QA | To Do |

**Total:** 24 poin.

### Stretch goal — hanya jika semua P0 PASS

| ID | Task | Poin | Catatan |
|---|---|---:|---|
| SPR-S1 | Discovery cloud/gallery/social: requirement, KPI, privasi | 2 | **Discovery only**, bukan implementasi |
| SPR-S2 | Draft desain biome berikutnya | 2 | Tidak boleh masuk build sebelum sprint berikutnya |

---

## 5. Detail acceptance criteria

### SPR-01 — QA device nyata

- [ ] Perangkat: Itel S686LN, Android 15, DPR 3, viewport 360×678, atau Android menengah sekelas.
- [ ] Build diambil dari produksi, bukan dev server.
- [ ] Skenario `?qa=1&qaObjects=94&qaSeconds=300&quality=medium&seed=1` berjalan penuh.
- [ ] p50 ≥30 FPS.
- [ ] p95 ≤33 ms.
- [ ] Boot cold-start <5 s dari ikon PWA pada 4G.
- [ ] Drag 360° dan pinch dengan jari tidak macet.
- [ ] Background 30 s → foreground → render lanjut tanpa crash.
- [ ] `context_loss` dicatat; bila ada, dicatat sebagai temuan terpisah.
- [ ] QA report disalin/disimpan ke `docs/qa/sprint-09/device.json`.

**Exit:** PASS / FAILED / BLOCKED dengan bukti.

### SPR-02 — PWA fisik

- [ ] Install prompt muncul di Chrome Android dari HTTPS produksi.
- [ ] Ikon PWA muncul di home screen.
- [ ] Buka dari ikon saat airplane mode: canvas + menu tampil.
- [ ] Save IndexedDB lama terbaca.
- [ ] Menanam objek saat offline berhasil.
- [ ] Kembali online → update prompt muncul bila versi baru tersedia.
- [ ] Terima update → save tetap utuh.
- [ ] `sw.js` versi `tpf-shell-v0-15-9` atau versi rilis sprint terlihat di Application panel.
- [ ] Tidak ada error undefined service worker.

**Exit:** PASS / FAILED / BLOCKED dengan screenshot langkah install dan airplane mode.

### SPR-03 — Visual real-device

- [ ] Screenshot before/after v0.15.9 dibuka berdampingan pada perangkat.
- [ ] Silhouette planet terbaca di 360 px.
- [ ] Prop tidak tenggelam, tidak melayang, dan tidak menutup fauna.
- [ ] Fauna tetap terlihat pada jarak kamera default.
- [ ] Cuaca Hujan/Badai/Salju terbaca tanpa menutup UI.
- [ ] Pohon, batu, gunung, dan awan tidak berubah jadi primitif saat quality turun.
- [ ] Catatan human review ditulis; jika model tidak bisa melihat gambar, nyatakan eksplisit.

**Exit:** human sign-off atau temuan dengan severity.

### SPR-04 — Landscape

- [ ] Uji 780×360 dan 844×390.
- [ ] Planet tetap terlihat di tengah.
- [ ] Panel bawah/kiri tidak menutup lebih dari 25% area planet.
- [ ] Tombol aksi tetap ≥48 dp.
- [ ] Tidak ada scroll horizontal.
- [ ] Tidak ada overlap dengan safe area/notch.

**Exit:** screenshot portrait + landscape, passed layout audit.

### SPR-05 — Gap p95

- [ ] Temuan SPR-01 direproduksi minimal 3 kali.
- [ ] Jika p95 ≤33 ms pada 3 run, tandai **resolved-by-recheck**, bukan perbaikan kode.
- [ ] Jika masih >33 ms, identifikasi penyebab: GPU, layout, weather, atau adaptive.
- [ ] Perbaikan tidak boleh mengubah determinisme sim atau batching.
- [ ] Ulang `test:qa-load` dan QA device setelah fix.
- [ ] Sebelum/after p95 dicatat di `docs/QA-DEVICE.md`.

**Exit:** PASS dengan angka baru atau FAILED + issue baru.

### SPR-06 — Draw call audit

- [ ] Seed `1`, `2`, dan `15` diuji.
- [ ] Cerah ≤18 draw call.
- [ ] Hujan/Badai/Salju ≤20 draw call.
- [ ] Hasil dibandingkan dengan baseline seed-identik, bukan seed acak.
- [ ] Jika ada regresi, buat issue baru; jangan menaikkan budget tanpa keputusan eksplisit.

**Exit:** tabel perbandingan current vs baseline.

### SPR-07 — Documentation drift

Doc sumber yang perlu disentuh bila masih tertinggal:

| File | Koreksi |
|---|---|
| `docs/ART-DIRECTION.md` | target sentuh 48 dp, orbit awan 1,08, radius 0,045 |
| `README.md` | app chunk 65,43 kB, 8 gate test, deploy aktif |
| `docs/RELEASE.md` | status p95 device masih open |
| `docs/QA-DEVICE.md` | hasil v0.15.9 lokal/remote vs device |

**Exit:** tidak ada nilai lama yang bertentangan dengan `docs/PRODUCT-TO-PRODUCTION.md`.

### SPR-08 — Release gate

- [ ] Semua P0 SPR-01…SPR-05 berstatus PASS.
- [ ] Versi ditentukan: `v0.15.10` atau `v0.16.0`.
- [ ] `package.json`, `package-lock.json`, `public/sw.js`, README, RELEASE, QA-DEVICE sinkron.
- [ ] Build lokal PASS.
- [ ] `npm test` lokal 8/8 PASS.
- [ ] Push `main`, Netlify auto-deploy.
- [ ] Hash bundle produksi sesuai build lokal.
- [ ] Remote `npm test` 8/8 PASS.
- [ ] PWA check produksi PASS.
- [ ] ZIP `tiny-planet-factory-dist.zip` di-build ulang.
- [ ] `docs/RELEASE.md` berisi status akhir sprint.

**Exit:** rilis ditandai **QA CLOSED** atau sprint berakhir dengan status blocker.

---

## 6. Rencana eksekusi 10 hari

| Hari | Fokus | Deliverable |
|---|---|---|
| Senin 23 Nov | Planning + setup device, lock build | Checklist QA siap, seed & URL final |
| Selasa 24 Nov | SPR-01 bagian 1: performa & cold start | Angka p50/p95/boot awal |
| Rabu 25 Nov | SPR-01 bagian 2: input & context loss | Input/context report |
| Kamis 26 Nov | SPR-02: PWA fisik | Screenshot install/offline/update |
| Jumat 27 Nov | SPR-03 + mid-sprint review | Visual sign-off atau temuan |
| Senin 30 Nov | SPR-04 landscape | Screenshot portrait/landscape |
| Selasa 1 Des | SPR-05 bila perlu; SPR-06 | p95 fix/verification + draw call table |
| Rabu 2 Des | SPR-07 doc drift | Doc sinkron |
| Kamis 3 Des | SPR-08 release gate | Remote 8/8 + PWA check |
| Jumat 4 Des | Buffer, retrospektif, sprint review | Sprint report + next sprint |

Hari 7–10 adalah buffer. Jika P0 belum PASS, buffer dipakai untuk iterasi QA, bukan untuk fitur baru.

---

## 7. Burndown rencana

| Hari | Pois tersisa (rencana) |
|---|---:|
| Senin | 24 |
| Selasa | 19 |
| Rabu | 14 |
| Kamis | 10 |
| Jumat | 7 |
| Senin | 5 |
| Selasa | 3 |
| Rabu | 2 |
| Kamis | 1 |
| Jumat | 0 |

Ini adalah garis rencana, bukan burndown aktual. Burndown aktual diisi di sprint report.

---

## 8. Definition of Done sprint

Sprint selesai jika:

- [ ] Semua task P0 berstatus PASS atau BLOCKED dengan alasan valid.
- [ ] Tidak ada task yang ditandai PASS tanpa bukti.
- [ ] `npm test` lokal dan remote 8/8 PASS.
- [ ] PWA check produksi PASS.
- [ ] Semua angka device dicatat di `docs/QA-DEVICE.md`.
- [ ] Documentation drift tersisa tercatat, bukan disembunyikan.
- [ ] Status akhir ditulis: **QA CLOSED**, **QA FAILED with fix**, atau **QA BLOCKED**.
- [ ] Sprint review dan retro selesai.

---

## 9. Metrics keberhasilan sprint

| Metrik | Target | Bukti |
|---|---|---|
| P0 closure | 5/5 PASS | Checklist SPR-01…SPR-05 |
| p95 Android | ≤33 ms | QA report 300 s |
| Boot cold-start | <5 s | Stopwatch/video 4G |
| PWA offline | PASS | Screenshot airplane mode |
| Landscape | PASS | Screenshot 780×360 |
| Remote test | 8/8 PASS | Log remote |
| Draw call regresi | 0 | Tabel seed-identik |
| Fitur baru masuk build | 0 | Git diff |

---

## 10. Risk register

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Tidak ada perangkat fisik | P0 tidak bisa ditutup | Tandai BLOCKED; jangan pakai headless sebagai pengganti |
| p99/p95 tidak stabil | Sprint meleset | Ulang 3×; bedakan noise vs regresi |
| Service worker cache lama | Update tidak muncul | Cek versi cache; deskripsi update; hard reload terkontrol |
| Error shader saat context loss | QA gagal | Catat hanya bila `contextLost === true`; buat issue terpisah |
| Netlify deploy delay | Remote test tertunda | Verifikasi hash bundle, bukan asumsi |
| Drift doc makin banyak | Salah keputusan | Perbarui doc sumber di SPR-07 |
| Godaan tambah planet | Fokus hilang | Aturan QA-first dari product pipeline |

---

## 11. Dependencies

| Task | Bergantung pada |
|---|---|
| SPR-01 | Build produksi `v0.15.9`, perangkat Android, QA URL |
| SPR-02 | SPR-01 install prompt dasar, HTTPS produksi |
| SPR-03 | Screenshot before/after v0.15.9 |
| SPR-04 | Build dengan layout v0.15.4+ |
| SPR-05 | Data SPR-01 |
| SPR-06 | Baseline worktree atau build `8f878f1` |
| SPR-08 | SPR-01…SPR-05 PASS |

---

## 12. Sprint review agenda

1. Status sprint goal: PASS / FAIL / BLOCKED.
2. Demo bukti: QA report, PWA screenshot, landscape screenshot.
3. Angka sebelum/sesudah: p95, boot, draw call.
4. Task yang tidak selesai dan alasannya.
5. Keputusan: rilis `v0.15.10`, rilis `v0.16.0`, atau tunda.
6. Prioritas sprint berikutnya.
7. Retro: apa yang dipertahankan, diubah, dihentikan.

---

## 13. Retrospektif template

```md
## Sprint 09 Retro — 2026-11-22/2026-12-04

### Apa yang berjalan baik
- ...

### Apa yang gagal / lambat
- ...

### Apa yang harus diubah
- ...

### Keputusan
- ...

### Action item sprint berikutnya
- [ ] ...
```

---

## 14. Sprint report template

```md
# Sprint 09 Report

Status akhir:
- [ ] QA CLOSED
- [ ] QA FAILED with fix
- [ ] QA BLOCKED

Versi rilis:
Commit aplikasi:
Commit docs:

Poin rencana: 24
Poin selesai:
Poin blocked:

| ID | Status | Bukti |
|---|---|---|
| SPR-01 | | |
| SPR-02 | | |
| SPR-03 | | |
| SPR-04 | | |
| SPR-05 | | |
| SPR-06 | | |
| SPR-07 | | |
| SPR-08 | | |

Metrik:
- p50:
- p95:
- Boot:
- Draw call cerah/hujan:
- Remote test: /8
- PWA check:

Catatan:
```

---

## 15. Sprint berikutnya — prakiraan

Hanya dibuka jika Sprint 09 berstatus **QA CLOSED**.

| Prioritas | Calon item | Catatan |
|---|---|---|
| P1 | Implementasi Supabase cloud save | Butuh decision doc privasi & schema |
| P1 | Gallery DNA lokal | Bisa dimulai local-only dulu |
| P2 | Social share feed | Bergantung cloud/gallery |
| P2 | Biome/planet baru | Butuh doc biome + gate test baru |
| P2 | Monetisasi | Tidak boleh memakai dark pattern; butuh KPI review |

Jika Sprint 09 masih **QA BLOCKED**, sprint berikutnya tetap QA closure, tanpa item baru.

---

## 16. Aturan perubahan sprint

- Perubahan scope hanya lewat sprint review atau keputusan tertulis.
- Menambah task harus menghapus task dengan poin setara.
- Task P0 tidak boleh ditukar dengan P1/P2.
- Jika ada temuan baru P0, ia masuk sprint ini dan mengganti stretch goal.
- Semua perubahan status wajib punya bukti: log, screenshot, atau commit hash.
