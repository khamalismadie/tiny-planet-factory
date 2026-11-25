# Repository Map

```text
project-root/
├── .github/
│   ├── ISSUE_TEMPLATE/       # 11 template lifecycle 01–11
│   ├── workflows/            # CI, QA evidence, preview, release
│   └── PULL_REQUEST_TEMPLATE.md
├── default-engineering/      # konstitusi teknis (9 doc)
├── docs/
│   ├── 00-PROJECT-INITIALIZATION/
│   ├── 01-PRODUCT-DISCOVERY/
│   ├── 02-PRODUCT-STRATEGY/
│   ├── 03-PRD/
│   ├── 04-TECHNICAL-ARCHITECTURE/
│   ├── 05-ENGINEERING-BLUEPRINT/
│   ├── 06-PRODUCT-BACKLOG/
│   ├── 07-SPRINT-PLANNING/
│   ├── 08-DEVELOPMENT/
│   ├── 09-CODE-REVIEW/
│   ├── 10-QA-TESTING/
│   ├── 11-RELEASE-DEPLOYMENT/
│   ├── 12-OPERATIONS/
│   └── 13-PRODUCT-EVOLUTION/
├── AGENTS.md
├── README.md
└── CHANGELOG.md
```

## Yang sengaja tetap di root

- `src/`, `scripts/`, `public/`, `index.html`, `vite.config.ts`, `tsconfig.json` — kode aplikasi.
- `qa-evidence/` — bukti mentah QA. Tidak dipindah atau ditulis ulang.
- `dist/`, `node_modules/`, `*.zip`, `core*` — diabaikan git.

## Peta cepat dokumen

| Pertanyaan | Buka |
|---|---|
| Apa yang tidak boleh diubah? | `default-engineering/CORE.md` |
| Arsitektur sistem | `docs/04-TECHNICAL-ARCHITECTURE/ARCHITECTURE.md` |
| Backlog aktif | `docs/06-PRODUCT-BACKLOG/BACKLOG.md` |
| Cara lanjut QA | `docs/10-QA-TESTING/QA-ISSUE-PLAYBOOK.md` |
| Status rilis | `docs/11-RELEASE-DEPLOYMENT/RELEASE.md` |
| Insiden & produksi | `docs/12-OPERATIONS/OPERATIONS.md` |
| Yang ditunda | `docs/13-PRODUCT-EVOLUTION/EVOLUTION.md` |
