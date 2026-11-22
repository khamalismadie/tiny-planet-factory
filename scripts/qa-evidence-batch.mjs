import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
let dir;
const passthrough = [];

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg.startsWith('--')) {
    passthrough.push(arg);
    if (arg === '--expect-version' || arg === '--expect-bundle') {
      const value = args[i + 1];
      if (!value || value.startsWith('--')) {
        console.error(`${arg} butuh nilai.`);
        process.exit(1);
      }
      passthrough.push(value);
      i += 1;
    }
    continue;
  }
  if (!dir) dir = arg;
}

dir ??= 'qa-evidence';
const here = dirname(fileURLToPath(import.meta.url));
const validator = join(here, 'qa-evidence.mjs');

const flagRules = [
  [/^report-offline\.json$/, ['--standalone', '--offline']],
  [/^report-update\.json$/, ['--standalone']],
  [/^report-landscape\.json$/, ['--landscape']],
  [/^report-(portrait|p95|context-loss)/, []],
];

let files;
try {
  files = (await readdir(dir))
    .filter((name) => /^report-.*\.json$/.test(name))
    .sort();
} catch (error) {
  console.error(`Gagal membaca folder ${dir}: ${String(error)}`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`Tidak ada report-*.json di ${dir}.`);
  process.exit(1);
}

const pad = (value, width) => String(value).padEnd(width);
const rows = [];

for (const name of files) {
  const rule = flagRules.find(([pattern]) => pattern.test(name));
  const flags = rule?.[1] ?? [];
  const file = join(dir, name);
  const result = spawnSync(process.execPath, [validator, file, ...flags, ...passthrough], {
    encoding: 'utf8',
  });

  let summary = null;
  const stdout = result.stdout ?? '';
  const start = stdout.indexOf('{');
  const end = stdout.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try {
      summary = JSON.parse(stdout.slice(start, end + 1));
    } catch {
      summary = null;
    }
  }

  rows.push({
    name,
    flags,
    ok: result.status === 0,
    p95: summary?.budgets?.p95?.actual ?? null,
    telemetry: summary?.telemetryHint != null,
    stderr: (result.stderr ?? '').trim(),
    fallbackFlags: rule == null,
  });
}

console.log(pad('FILE', 34) + pad('FLAGS', 28) + pad('P95', 9) + 'STATUS');
console.log('-'.repeat(80));
for (const row of rows) {
  const flagText = row.flags.length ? row.flags.join(' ') : '-';
  const p95Text = row.p95 == null ? '-' : `${row.p95} ms`;
  const status = row.ok ? 'OK' : row.telemetry ? 'REVIEW (telemetry)' : 'REVIEW';
  console.log(pad(row.name, 34) + pad(flagText, 28) + pad(p95Text, 9) + status);
  if (!row.ok && row.stderr) {
    console.log(row.stderr.split('\n').map((line) => `  ${line}`).join('\n'));
  }
  if (row.fallbackFlags) {
    console.log(`  Nama file tidak dikenal; divalidasi tanpa flag. Periksa manual pedoman di docs/QA-EVIDENCE-TEMPLATE.md.`);
  }
}

const okCount = rows.filter((row) => row.ok).length;
const failCount = rows.length - okCount;
console.log('-'.repeat(80));
console.log(`BATCH QA EVIDENCE: ${okCount} OK, ${failCount} REVIEW, ${rows.length} file dari ${dir}`);

if (failCount > 0) {
  console.error('BATCH REVIEW: perbaiki laporan yang gagal. Validator tidak menutup issue #5-#8.');
  process.exit(1);
}
console.log('BATCH OK: format laporan konsisten. Tetap lampirkan JSON dan screenshot asli ke issue terkait.');
