import { habitatAdvice, speciesInsights, weatherInsight, describeHabitatFactor, restorationMilestones, environmentRisks } from '../sim/insights';
import type { PlanetState } from '../sim/types';

type EcoSnapshot = { tick: number; stage: number; level: number; fertility: number; water: number; biodiversity: number; health: number; objects: number; species: number } | null;
type EnvHistory = Array<{ tick: number; fertility: number; water: number; biodiversity: number; health: number }>;
type Journal = Array<{ tick: number; text: string }>;

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] ?? ch));
}

export function renderEcopediaHtml(planet: PlanetState, ecoSnapshot: EcoSnapshot, envHistory: EnvHistory, journal: Journal): string {
  const advice = habitatAdvice(planet);
  const species = speciesInsights(planet);
  const weather = weatherInsight(planet);

  const speciesHtml = species.map((entry) => {
    const status = entry.extinct ? '<span class="ecopedia-pill warn">punah</span>' : entry.discovered ? '<span class="ecopedia-pill ok">ditemukan</span>' : '<span class="ecopedia-pill">belum terlihat</span>';
    const limit = entry.limitingFactor ? describeHabitatFactor(entry.limitingFactor) : 'stabil';
    const cap = Math.max(1, entry.capacity);
    const pct = Math.max(0, Math.min(100, (entry.estimate / cap) * 100));
    return `<div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${esc(entry.label)}</strong><span>${status}</span></div>
      <div class="ecopedia-kv"><span>Agen ${entry.agents} · Pop ${Math.round(entry.estimate)}/${Math.round(entry.capacity)}</span><span>Pangan ${Math.round(entry.foodFactor * 100)}%</span></div>
      <div class="ecopedia-bar"><i style="width:${pct.toFixed(0)}%"></i></div>
      <div style="font-size:11px;color:#72869a">Faktor pembatas: ${esc(limit)}</div>
      <div style="font-size:11px">${esc(entry.suggestion)}</div>
    </div>`;
  }).join('');

  const adviceHtml = advice.length
    ? advice.map((item) => {
        const pill = item.severity === 'high' ? 'warn' : item.severity === 'medium' ? 'warn' : 'ok';
        return `<div class="ecopedia-item">
          <div class="ecopedia-kv"><strong>${esc(item.label)}</strong><span class="ecopedia-pill ${pill}">${item.severity}</span></div>
          <div style="font-size:11px">${esc(item.suggestion)}</div>
        </div>`;
      }).join('')
    : '<div class="ecopedia-item"><strong>Stabil</strong><div style="font-size:11px">Tidak ada faktor pembatas kritis yang terdeteksi. Pertahankan keseimbangan saat ini.</div></div>';

  const tendencyHtml = weather.tendencies.map((entry) =>
    `<div class="ecopedia-kv"><span>${esc(entry.label)}</span><span>${entry.percent.toFixed(0)}%</span></div>`
  ).join('');

  const prev = envHistory.length > 1 ? envHistory[0] : null;
  const curr = envHistory.length ? envHistory[envHistory.length - 1] : null;
  const delta = (key: 'fertility' | 'water' | 'biodiversity' | 'health'): number =>
    prev && curr ? curr[key] - prev[key] : 0;
  const trendRow = (label: string, value: number, d: number, hint: string): string => {
    const sign = d > 0.05 ? '+' : d < -0.05 ? '' : '±';
    const color = d > 0.05 ? 'var(--mint)' : d < -0.05 ? '#ffd479' : 'var(--muted)';
    const dText = Math.abs(d) <= 0.05 ? 'stabil' : `${sign}${d.toFixed(1)}`;
    return `<div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${esc(label)}</strong><span style="color:${color}">${Math.round(value)} · ${dText}</span></div>
      <div style="font-size:11px">${esc(hint)}</div>
    </div>`;
  };
  const recoveryHtml = [
    trendRow('Kesuburan tanah', planet.environment.fertility, delta('fertility'),
      planet.environment.fertility < 45 ? 'Pulihkan dengan rumput, semak, pohon, atau bunga untuk menambah nutrisi.' : 'Kesuburan cukup baik; jaga vegetasi agar tidak turun.'),
    trendRow('Ketersediaan air', planet.environment.water, delta('water'),
      planet.environment.water < 35 ? 'Konservasi air: tambah danau/laut dan jaga vegetasi penahan kelembapan.' : 'Air cukup; pantau saat cuaca panas/badai.'),
    trendRow('Biodiversitas', planet.environment.biodiversity, delta('biodiversity'),
      planet.environment.biodiversity < 35 ? 'Tingkatkan dengan variasi tanaman dan habitat satwa.' : 'Biodiversitas berkembang; hindari menekan satu parameter saja.'),
    trendRow('Kesehatan ekosistem', planet.ecosystem.health, delta('health'),
      planet.ecosystem.health < 55 ? 'Fokus pada stabilitas, oksigen, dan vegetasi untuk menaikkan kesehatan.' : 'Kesehatan baik; pertahankan keseimbangan.'),
  ].join('');

  const env = planet.environment;
  const unlocked = new Set(planet.progression.unlockedObjects);
  const can = (type: string): boolean => unlocked.has(type as any);
  const quickActions: Array<{ label: string; why: string }> = [];
  if (env.water < 35 && can('lake')) quickActions.push({ label: 'Danau', why: 'Menaikkan air dan kelembapan dengan cepat.' });
  if (env.water < 35 && can('ocean')) quickActions.push({ label: 'Laut', why: 'Cadangan air besar untuk area kering.' });
  if (env.fertility < 45 && can('grass')) quickActions.push({ label: 'Rumput', why: 'Memulihkan kesuburan dan dasar vegetasi.' });
  if (env.fertility < 45 && can('tree')) quickActions.push({ label: 'Pohon', why: 'Meningkatkan oksigen, kesuburan, dan stabilitas jangka panjang.' });
  if (env.biodiversity < 35 && can('flower')) quickActions.push({ label: 'Bunga', why: 'Menaikkan biodiversitas dan mendukung penyerbuk.' });
  if (env.oxygen < 30 && can('tree')) quickActions.push({ label: 'Pohon', why: 'Sumber oksigen paling kuat.' });
  if (env.stability < 45 && can('hill')) quickActions.push({ label: 'Bukit', why: 'Membantu menstabilkan bentuk medan.' });
  if (env.temperature > 35 && can('lake')) quickActions.push({ label: 'Danau', why: 'Membantu mendinginkan area panas.' });
  if (!quickActions.length) quickActions.push({ label: 'Pertahankan', why: 'Parameter utama cukup stabil. Lanjutkan misi aktif dan pantau cuaca.' });
  const seen = new Set<string>();
  const quickHtml = quickActions.filter((a) => (seen.has(a.label) ? false : (seen.add(a.label), true))).slice(0, 4).map((a) =>
    `<div class="ecopedia-item"><div class="ecopedia-kv"><strong>${esc(a.label)}</strong><span class="ecopedia-pill ok">aksi cepat</span></div><div style="font-size:11px">${esc(a.why)}</div></div>`
  ).join('');

  const risks = environmentRisks(planet);
  const risksHtml = risks.length
    ? risks.map((risk) => `<div class="ecopedia-item">
        <div class="ecopedia-kv"><strong>${esc(risk.label)}</strong><span class="ecopedia-pill warn">${risk.severity}</span></div>
        <div style="font-size:11px;color:#72869a">${esc(risk.signal)}</div>
        <div style="font-size:11px">${esc(risk.response)}</div>
      </div>`).join('')
    : '<div class="ecopedia-item"><div class="ecopedia-kv"><strong>Risiko rendah</strong><span class="ecopedia-pill ok">stabil</span></div><div style="font-size:11px">Tidak ada sinyal kekeringan, banjir, panas/dingin ekstrem, atau degradasi kritis saat ini.</div></div>';

  const milestones = restorationMilestones(planet);
  const achieved = milestones.filter((m) => m.achieved).length;
  const milestoneHtml = milestones.map((m) => `
    <div class="ecopedia-item">
      <div class="ecopedia-kv"><strong>${esc(m.label)}</strong><span class="ecopedia-pill ${m.achieved ? 'ok' : ''}">${m.achieved ? 'tercapai' : 'belum'}</span></div>
      <div style="font-size:11px">${esc(m.detail)}</div>
    </div>`).join('');

  const snap = ecoSnapshot;
  const snapHtml = snap ? (() => {
    const row = (label: string, before: number, after: number, suffix = ''): string => {
      const d = after - before;
      const sign = d > 0 ? '+' : '';
      const color = d > 0 ? 'var(--mint)' : d < 0 ? '#ffd479' : 'var(--muted)';
      return `<div class="ecopedia-kv"><span>${esc(label)}</span><span>${before.toFixed(0)}${suffix} → ${after.toFixed(0)}${suffix} <span style="color:${color}">(${sign}${d.toFixed(0)})</span></span></div>`;
    };
    return `<div class="ecopedia-item">
      <div style="font-size:11px;color:#72869a;margin-bottom:6px">Snapshot tick ${snap.tick} · stage ${snap.stage} · Lv ${snap.level}</div>
      ${row('Kesuburan', snap.fertility, planet.environment.fertility)}
      ${row('Air', snap.water, planet.environment.water)}
      ${row('Biodiversitas', snap.biodiversity, planet.environment.biodiversity)}
      ${row('Kesehatan', snap.health, planet.ecosystem.health)}
      ${row('Objek', snap.objects, planet.objects.length)}
      ${row('Spesies ditemukan', snap.species, planet.fauna?.discovered.length ?? 0)}
    </div>`;
  })() : '<div class="ecopedia-item"><div style="font-size:11px">Belum ada snapshot. Tekan “Simpan snapshot” untuk membandingkan kondisi sebelum/sesudah aksi restorasi.</div></div>';

  const journalHtml = journal.length
    ? journal.slice(-8).reverse().map((entry) =>
        `<div class="ecopedia-item"><div class="ecopedia-kv"><span>${esc(entry.text)}</span><span style="color:var(--muted)">tick ${entry.tick}</span></div></div>`
      ).join('')
    : '<div class="ecopedia-item"><div style="font-size:11px">Belum ada catatan. Jurnal akan mencatat milestone, level, tahap, dan penemuan spesies.</div></div>';

  return `
    <section class="ecopedia-section">
      <h3>Kompendium Spesies</h3>
      <div class="ecopedia-list">${speciesHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Faktor Pembatas &amp; Saran Habitat</h3>
      <div class="ecopedia-list">${adviceHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Status Pemulihan</h3>
      <div style="font-size:11px;color:#72869a;margin-bottom:8px">Delta dibanding sampel awal riwayat sesi ini (maks. ~2 menit).</div>
      <div class="ecopedia-list">${recoveryHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Aksi Restorasi Cepat</h3>
      <div class="ecopedia-list">${quickHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Risiko &amp; Respons</h3>
      <div class="ecopedia-list">${risksHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Milestone Restorasi</h3>
      <div style="font-size:11px;color:#72869a;margin-bottom:8px">${achieved}/${milestones.length} tercapai. Milestone bersifat lokal dan non-punitif.</div>
      <div class="ecopedia-list">${milestoneHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Before / After Snapshot</h3>
      <div class="ecopedia-list">${snapHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Jurnal Ekologi</h3>
      <div style="font-size:11px;color:#72869a;margin-bottom:8px">Lokal di perangkat ini. Maks. 50 catatan, menampilkan 8 terbaru.</div>
      <div class="ecopedia-list">${journalHtml}</div>
    </section>
    <section class="ecopedia-section">
      <h3>Cuaca &amp; Dampak</h3>
      <div class="ecopedia-list">
        <div class="ecopedia-item">
          <div class="ecopedia-kv"><strong>${esc(weather.currentLabel)}</strong><span>${weather.intensityPercent}% · ${weather.remainingTicks} tick</span></div>
          <div style="font-size:11px">${esc(weather.effects.join(' · ') || 'Tidak ada efek khusus.')}</div>
          ${weather.caution ? `<div style="font-size:11px;color:#ffd479">${esc(weather.caution)}</div>` : ''}
        </div>
        <div class="ecopedia-item">
          <strong>Kecenderungan cuaca berikutnya</strong>
          <div style="font-size:11px;color:#72869a;margin:4px 0">Persentase dihitung dari kondisi lingkungan saat ini, bukan jaminan RNG.</div>
          ${tendencyHtml}
        </div>
      </div>
    </section>`;
}
