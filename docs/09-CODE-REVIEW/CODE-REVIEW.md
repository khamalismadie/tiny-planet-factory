# Code Review Checklist

Reviewer wajib menandai semua sebelum approve.

## Gate & budget

- [ ] `npm test` 8/8 PASS; tidak ada gate baru/dihapus/dilemahkan.
- [ ] `npm run build` PASS; app chunk `< 100 kB`.
- [ ] Draw call cerah `≤ 18`, cuaca `≤ 20`, diuji dengan seed identik.
- [ ] p95 target tetap `≤ 33 ms`; tidak ada threshold yang diturunkan.
- [ ] Tidak ada perubahan `schemaVersion` tanpa keputusan eksplisit.

## Determinism & sim

- [ ] Tidak ada `Math.random()` untuk konten yang masuk ke save.
- [ ] `src/sim/` tidak mengimpor render/DOM.
- [ ] Perubahan visual tidak mengubah state sim, DNA, atau misi.

## Render & aset

- [ ] Satu geometri gabungan per tipe; tidak ada tekstur/GLB/R3F.
- [ ] Footprint/tinggi/facet/triangle lolos gate.
- [ ] Variant baru terdaftar di builder, label, dan katalog.
- [ ] Tidak ada draw call baru.

## UI & bahasa

- [ ] Semua string baru bahasa Indonesia.
- [ ] Kontras dan palet per planet terbaca.
- [ ] Portrait/landscape tidak menutup planet.

## Bukti & dokumen

- [ ] Bundle hash baru dicatat di dokumen bila berubah.
- [ ] Tidak ada klaim PASS tanpa bukti.
- [ ] Arsip QA tidak ditimpa.
- [ ] Tidak ada token/kredensial di diff.
- [ ] Doc lifecycle yang relevan diperbarui.
