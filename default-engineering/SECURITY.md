# SECURITY

## Aturan

- Token Netlify, API key, dan kredensial apa pun **tidak boleh** masuk repo, issue, PR, atau laporan QA.
- Environment variable rahasia hanya tersedia di workflow GitHub Actions dan tidak dicetak ke log.
- Preview/deploy harus memakai draft atau alias PR. Deploy produksi memerlukan approval dan bukti #5–#8.
- `window.__game.qaReport()` adalah satu-satunya export bukti QA. Ekspor telemetry dengan `sessionId` atau `events` ditolak.
- Telemetri/KPI tidak menyimpan IP, nama perangkat, identitas, atau event mentah.
- Save game lokal berisi state ekosistem; tidak ada akun atau sinkronisasi pihak ketiga saat ini.
- Laporan bug tidak boleh menempelkan `.env`, log penuh dengan token, atau URL dengan query rahasia.

## Insiden yang sudah tercatat

Draft produksi sempat berubah ke `v0.21.0` lalu dikembalikan ke `v0.16.0` (commit `e71e6c1`, bundle `index-Cl2SK4zO.js`, `stop_builds: true`). Detail ada di `docs/12-OPERATIONS/OPERATIONS.md`.
