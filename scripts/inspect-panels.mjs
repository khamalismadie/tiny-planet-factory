import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: [] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto('http://127.0.0.1:4173/?debug=1', { waitUntil: 'networkidle' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
await page.waitForTimeout(600);
const r = await page.evaluate(() => {
  const info = (id) => { const e = document.getElementById(id); if (!e) return null; const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), bottom: Math.round(b.bottom), clientH: e.clientHeight, scrollH: e.scrollHeight, overflow: s.overflowY }; };
  const stats = document.getElementById('stats-panel');
  const mission = document.getElementById('mission');
  const list = document.getElementById('object-list');
  const mb = mission.getBoundingClientRect();
  const lb = list.getBoundingClientRect();
  return { stats: info('stats-panel'), inventory: info('inventory'), missionTopVisible: mb.top >= stats.getBoundingClientRect().top && mb.bottom <= stats.getBoundingClientRect().bottom, missionRect: info('mission'), listRect: info('list'), missionClippedByStats: mb.bottom > stats.getBoundingClientRect().bottom };
});
console.log(JSON.stringify(r, null, 2));
await browser.close();
