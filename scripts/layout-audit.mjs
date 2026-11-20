import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: [] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto('http://127.0.0.1:4173/?debug=1', { waitUntil: 'networkidle' });
await page.waitForFunction(() => !!window.__game, { timeout: 30_000 });
await page.waitForTimeout(800);
const report = await page.evaluate(() => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right), bottom: Math.round(r.bottom) };
  };
  const ids = ['topbar', 'mission', 'weather', 'ecosystem', 'events', 'object-list', 'toast', 'app'];
  const boxes = Object.fromEntries(ids.map((id) => [id, rect(document.getElementById(id))]));
  const buttons = [...document.querySelectorAll('header button, #topbar button')].map((b) => ({ text: b.textContent?.trim(), ...rect(b) }));
  const overflow = buttons.filter((b) => b.right > vw + 1 || b.x < -1).map((b) => b.text);
  const overlaps = [];
  const keys = Object.keys(boxes);
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const a = boxes[keys[i]];
      const b = boxes[keys[j]];
      if (!a || !b) continue;
      const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
      const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
      if (ix > 4 && iy > 4) overlaps.push(`${keys[i]}~${keys[j]} ${ix}x${iy}`);
    }
  }
  const center = document.elementFromPoint(vw / 2, vh / 2)?.tagName;
  return { vw, vh, boxes, buttons, overflow, overlaps, center, scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight };
});
console.log(JSON.stringify(report, null, 2));
await browser.close();
