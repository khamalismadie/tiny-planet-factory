# CORE

Konstitusi teknis Tiny Planet Factory. Aturan di sini mengikat semua tahap `00`–`13`.

## Non-negotiable

1. `src/sim/` tetap renderer-agnostic dan deterministik. Perubahan visual tidak boleh mengubah sim, DNA, atau `schemaVersion`.
2. Game tetap offline-capable dan installable. Inti loop harus jalan dari ikon PWA dalam airplane mode.
3. WebGL2 + PixiJS 3D adalah baseline. Tanpa GLB/GLTF, R3F, tekstur aset, atau 1 unit = 1 meter literal.
4. Delapan gate `npm test` tidak boleh ditambah, dilemahkan, atau diganti. Target tetap: p95 `≤ 33 ms`, boot `< 5 s`, 30 FPS Android menengah / 60 FPS desktop, draw call `≤ 18` cerah dan `≤ 20` cuaca.
5. App chunk harus `< 100 kB`. Setiap perubahan harus mengukur ulang ukuran bundle.
6. UI dan misi berbahasa Indonesia. Fitur DB tingkat lanjut harus derived-only dari state sim yang sudah ada.
7. Tidak ada dark pattern, streak hukuman, monetisasi eksploitatif, atau statistik buatan.
8. Produksi tetap `v0.16.0` sampai issue #5–#8 ditutup dengan bukti perangkat nyata.
9. Bukti QA hanya boleh berasal dari `JSON.stringify(window.__game.qaReport(), null, 2)`. Ekspor telemetry dengan `sessionId`/`events` ditolak.
10. Arsip bukti tidak boleh ditimpa. Laporan baru masuk folder baru, misalnya `qa-evidence/wave10/`.

Detail prosedur ada di `docs/12-OPERATIONS/OPERATIONS.md` dan `docs/10-QA-TESTING/QA-EVIDENCE-POLICY.md`.
