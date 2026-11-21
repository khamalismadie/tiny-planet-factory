import { chromium } from 'playwright';

const base = process.env.URL ?? 'http://127.0.0.1:4173/';
const url = new URL(base);
url.searchParams.set('debug', '1');

const browser = await chromium.launch({ headless: true, args: [] });
const failures = [];
const viewports = [
  { name: '360x640', width: 360, height: 640 },
  { name: '390x844', width: 390, height: 844 },
  { name: '844x390', width: 844, height: 390 },
];
const report = {};

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.goto(url.toString(), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
  await page.waitForTimeout(400);

  const data = await page.evaluate(() => {
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x), y: Math.round(r.y),
        w: Math.round(r.width), h: Math.round(r.height),
        right: Math.round(r.right), bottom: Math.round(r.bottom),
      };
    };
    const buttons = [...document.querySelectorAll('button')]
      .filter((b) => b.offsetParent !== null)
      .map((b) => ({ text: b.textContent.trim().slice(0, 18), ...rect(b) }));
    return {
      vw: innerWidth,
      vh: innerHeight,
      topbar: rect(document.getElementById('topbar')),
      buildPanel: rect(document.getElementById('build-panel')),
      objective: rect(document.getElementById('objective-strip')),
      inventory: rect(document.getElementById('inventory')),
      buttons,
      smallButtons: buttons.filter((b) => b.w < 48 || b.h < 48).map((b) => b.text),
      scrollW: document.documentElement.scrollWidth,
      center: document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.tagName ?? null,
    };
  });

  const check = (name, value) => {
    if (!value) failures.push(`${vp.name}: ${name}`);
  };
  check('tanpa page error', errors.length === 0);
  check('tanpa horizontal overflow', data.scrollW <= data.vw + 1);
  check('semua tombol >= 48dp', data.smallButtons.length === 0);
  check('objective strip terlihat', !!data.objective && data.objective.h >= 48 && data.objective.bottom <= data.vh && data.objective.y >= 0);
  check('objective tidak menimpa inventory', !!data.objective && !!data.inventory && data.objective.bottom <= data.inventory.y + 1);
  check('topbar tidak menimpa panel', !!data.topbar && !!data.buildPanel && data.topbar.bottom <= data.buildPanel.y + 1);

  report[vp.name] = {
    vw: data.vw,
    vh: data.vh,
    buttons: data.buttons.length,
    smallButtons: data.smallButtons,
    objective: data.objective,
    inventory: data.inventory,
    topbarBottom: data.topbar?.bottom,
    buildTop: data.buildPanel?.y,
    center: data.center,
    errors,
  };
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
if (failures.length) {
  console.error('FAIL: layout audit');
  for (const failure of failures) console.error(` - ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: layout audit');
}
