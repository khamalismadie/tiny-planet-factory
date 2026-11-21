import { chromium } from 'playwright';

const base = process.env.URL ?? 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true, args: [] });
const failures = [];
const check = (name, value) => {
  if (!value) failures.push(name);
};

for (const c of [
  { name: 'desktop', viewport: { width: 1280, height: 800 }, mobile: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, mobile: true },
]) {
  const context = await browser.newContext({ viewport: c.viewport, deviceScaleFactor: 1, hasTouch: c.mobile, isMobile: c.mobile });
  const page = await context.newPage();
  const errors = [];
  const navigations = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('framenavigated', (frame) => {
    if (frame === page.mainFrame()) navigations.push(frame.url());
  });
  await page.goto(`${base}${base.includes('?') ? '&' : '?'}quality=low`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#main-menu:not(.hidden)', { timeout: 30_000 });
  await page.waitForTimeout(500);
  check(`${c.name}: first load not reloaded by SW`, navigations.length === 1);

  const menu = await page.evaluate(() => {
    const sheet = document.querySelector('.menu-sheet').getBoundingClientRect();
    const buttons = [...document.querySelectorAll('.menu-actions button, .menu-close')].map((button) => {
      const r = button.getBoundingClientRect();
      return r.left >= sheet.left - 1 && r.right <= sheet.right + 1 && r.top >= sheet.top - 1 && r.bottom <= sheet.bottom + 1;
    });
    return {
      fits: sheet.top >= 0 && sheet.bottom <= innerHeight && sheet.left >= 0 && sheet.right <= innerWidth,
      buttonsInside: buttons.every(Boolean),
      focused: document.activeElement?.id,
      bodyLocked: document.body.classList.contains('menu-open'),
    };
  });
  check(`${c.name}: menu fits viewport`, menu.fits);
  check(`${c.name}: menu buttons inside sheet`, menu.buttonsInside);
  check(`${c.name}: continue focused`, menu.focused === 'menu-continue');
  check(`${c.name}: body locked`, menu.bodyLocked);

  await page.click('[data-quality="high"]');
  const quality = await page.evaluate(() => ({
    note: document.getElementById('menu-quality-note').textContent,
    active: document.querySelector('[data-quality="high"]').classList.contains('active'),
  }));
  check(`${c.name}: quality note`, quality.note === 'Tinggi');
  check(`${c.name}: quality active`, quality.active);

  await page.keyboard.press('Escape');
  check(`${c.name}: escape closes menu`, await page.evaluate(() => document.getElementById('main-menu').classList.contains('hidden')));
  await page.click('#menu-btn');
  check(`${c.name}: menu button reopens`, await page.evaluate(() => !document.getElementById('main-menu').classList.contains('hidden')));

  await page.click('#menu-continue');
  await page.waitForFunction(() => document.getElementById('main-menu').classList.contains('hidden'));
  await page.waitForTimeout(350);
  const game = await page.evaluate(() => ({
    topbarOverflow: [...document.querySelectorAll('#topbar button')].some((button) => button.getBoundingClientRect().right > innerWidth + 1),
    bodyUnlocked: !document.body.classList.contains('menu-open'),
  }));
  check(`${c.name}: no topbar overflow`, !game.topbarOverflow);
  check(`${c.name}: body unlocked`, game.bodyUnlocked);

  await page.click('#pause-btn');
  await page.click('#menu-btn');
  await page.click('#menu-close');
  check(`${c.name}: pause preserved`, (await page.textContent('#pause-btn')) === 'Lanjut');

  await page.click('#menu-btn');
  await page.click('#menu-dna');
  const dna = await page.evaluate(() => ({
    menuHidden: document.getElementById('main-menu').classList.contains('hidden'),
    modalVisible: !document.getElementById('dna-modal').classList.contains('hidden'),
  }));
  check(`${c.name}: DNA opens from menu`, dna.menuHidden && dna.modalVisible);
  check(`${c.name}: no page errors`, errors.length === 0);
  await context.close();
}

await browser.close();
if (failures.length) {
  console.error('FAIL: menu check');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: menu check');
}
