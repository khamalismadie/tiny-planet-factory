# AGENTS

Peta cepat untuk agen dan kontributor. Baca `default-engineering/CORE.md` sebelum mengubah apa pun.

## Invariant

- Sim deterministik dan renderer-agnostic; tidak ada import render/DOM di `src/sim/`.
- Delapan gate `npm test` tidak boleh diubah. Target tetap: chunk `< 100 kB`, draw call `≤ 18`/`≤ 20`, p95 `≤ 33 ms`, boot `< 5 s`.
- Produksi `v0.16.0`; kandidat `v0.21.0` belum rilis sampai #5–#8 PASS dengan bukti nyata.
- Bukti QA hanya `JSON.stringify(window.__game.qaReport(), null, 2)`. Tolak `sessionId`/`events`.
- Jangan menimpa arsip `qa-evidence/`. Jangan membuat bukti palsu.
- Tanpa GLB/GLTF, R3F, tekstur, `schemaVersion: 4`, planet/biome/unlock baru, dark pattern, atau statistik buatan.

## Command

```bash
npm ci
npm test
npm run build
npm run qa:evidence -- <file> --expect-version 0.21.0 --expect-bundle <hash>
```

## Dokumen

| Kebutuhan | File |
|---|---|
| Aturan inti | `default-engineering/CORE.md` |
| Arsitektur | `docs/04-TECHNICAL-ARCHITECTURE/ARCHITECTURE.md` |
| Backlog | `docs/06-PRODUCT-BACKLOG/BACKLOG.md` |
| Development | `docs/08-DEVELOPMENT/DEVELOPMENT-GUIDE.md` |
| Review | `docs/09-CODE-REVIEW/CODE-REVIEW.md` |
| QA | `docs/10-QA-TESTING/QA-ISSUE-PLAYBOOK.md` |
| Rilis | `docs/11-RELEASE-DEPLOYMENT/RELEASE.md` |
| Operasi/insiden | `docs/12-OPERATIONS/OPERATIONS.md` |
| Peta lengkap | `docs/00-PROJECT-INITIALIZATION/REPOSITORY-MAP.md` |

Setelah mengubah kode, ukur ulang bundle hash dan perbarui dokumen yang menyebut bundle lama. Jangan deploy produksi dari sesi ini.
