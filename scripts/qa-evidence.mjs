import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const file = args.find((arg) => !arg.startsWith('--'));

if (!file) {
  console.error('Usage: npm run qa:evidence -- <laporan-qa.json> [--offline] [--standalone] [--landscape]');
  process.exit(1);
}

let report;
try {
  report = JSON.parse(await readFile(file, 'utf8'));
} catch (error) {
  console.error(`Gagal membaca ${file}: ${String(error)}`);
  process.exit(1);
}

const checks = {
  reportShape: report.app === 'Tiny Planet Factory' && typeof report.appVersion === 'string',
  probeSelesai: report.frames > 0 && report.p95ms > 0,
  thereIsSaveSnapshot:
    Number.isFinite(report.save?.tick) &&
    Number.isFinite(report.save?.objects) &&
    Number.isFinite(report.save?.level),
  pwaControllerAktif:
    report.device?.serviceWorker === true && report.runtime?.serviceWorker?.controller === true,
  drawCallSesuaiBudget: report.scene?.drawCalls <= 20,
  tanpaContextLoss: report.scene?.contextLost === false,
};

const telemetryHint = typeof report.appVersion !== 'string' && Array.isArray(report.events)
  ? 'Input tampak seperti telemetry opt-in, bukan qaReport(). Jalankan JSON.stringify(window.__game.qaReport(), null, 2).'
  : null;

if (flags.has('--standalone')) {
  checks.standaloneDariIkon = report.device?.standalone === true;
}
if (flags.has('--offline')) {
  checks.offlineSaatLaporan = report.network?.online === false;
}
if (flags.has('--landscape')) {
  checks.orientasiLandscape = String(report.orientation?.type ?? '').includes('landscape');
  checks.planetTidakTertutup = report.layout?.planetCenterVisible === true
    && report.layout?.objectiveOverlapsInventory === false
    && report.layout?.topbarOverlapsBuild === false;
}

const budgets = {
  p95: {
    actual: report.p95ms,
    target: 33,
    ok: report.p95ms <= 33,
    issue: 7,
  },
};

console.log(JSON.stringify({
  file,
  appVersion: report.appVersion ?? null,
  collectedAt: report.collectedAt ?? null,
  viewport: report.device?.viewport ?? null,
  orientation: report.orientation ?? null,
  online: report.network?.online ?? null,
  standalone: report.device?.standalone ?? null,
  save: report.save ?? null,
  layout: report.layout ?? null,
  budgets,
  checks,
  telemetryHint,
}, null, 2));

const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length || !budgets.p95.ok) {
  if (telemetryHint) console.error(telemetryHint);
  console.error(`EVIDENCE REVIEW: ${[...failed, budgets.p95.ok ? '' : 'p95MasihDiAtas33ms'].filter(Boolean).join(', ')}`);
  console.error('Validator hanya membaca bukti; jangan menutup issue #5-#8 tanpa verifikasi perangkat nyata.');
  process.exit(1);
}
console.log('EVIDENCE OK: format laporan valid. Tetap lampirkan screenshot/report asli ke issue terkait.');
