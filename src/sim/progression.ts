export const MAX_LEVEL = 100;

export interface EraDef {
  index: number;
  name: string;
  theme: string;
  start: number;
  end: number;
}

export const ERAS: EraDef[] = [
  { index: 0, name: 'Genesis', theme: 'Planet baru terbentuk', start: 1, end: 10 },
  { index: 1, name: 'Primordial', theme: 'Mikroorganisme pertama', start: 11, end: 20 },
  { index: 2, name: 'Green Age', theme: 'Tumbuhan dan hutan', start: 21, end: 30 },
  { index: 3, name: 'Wildlife Age', theme: 'Hewan dan rantai makanan', start: 31, end: 40 },
  { index: 4, name: 'Aquatic Age', theme: 'Kehidupan air', start: 41, end: 50 },
  { index: 5, name: 'Biodiversity Age', theme: 'Ekosistem kompleks', start: 51, end: 60 },
  { index: 6, name: 'Civilization Age', theme: 'Manusia dan desa', start: 61, end: 70 },
  { index: 7, name: 'Industrial Age', theme: 'Teknologi dan industri', start: 71, end: 80 },
  { index: 8, name: 'Advanced Age', theme: 'Ekosistem futuristik', start: 81, end: 90 },
  { index: 9, name: 'Cosmic Age', theme: 'Planet legendaris', start: 91, end: 100 },
];

export function sanitizeLevel(level: number): number {
  if (!Number.isFinite(level)) return 1;
  return Math.max(1, Math.min(MAX_LEVEL, Math.floor(level)));
}

/** XP yang dibutuhkan untuk naik dari `level` ke `level + 1`. */
export function xpStep(level: number): number {
  const n = sanitizeLevel(level) - 1;
  return 100 + 25 * n + 5 * n * n;
}

// cumulative[level - 1] = total XP minimum untuk mencapai `level`.
const cumulative: number[] = [0];
for (let level = 1; level < MAX_LEVEL; level++) {
  cumulative[level] = cumulative[level - 1] + xpStep(level);
}

export function cumulativeXp(level: number): number {
  return cumulative[sanitizeLevel(level) - 1];
}

export function levelForXp(xp: number): number {
  const value = Number.isFinite(xp) ? Math.max(0, xp) : 0;
  for (let level = MAX_LEVEL; level >= 1; level--) {
    if (value >= cumulative[level - 1]) return level;
  }
  return 1;
}

export function eraForLevel(level: number): EraDef {
  const safe = sanitizeLevel(level);
  return ERAS[Math.min(ERAS.length - 1, Math.floor((safe - 1) / 10))];
}

/**
 * Save/DNA lama menyimpan level 2..6 dengan XP di bawah tangga baru.
 * Naikkan XP ke ambang level tersebut agar level tidak turun setelah migrasi.
 */
export function preserveLegacyProgression(level: number, xp: number): { level: number; xp: number } {
  const safeLevel = sanitizeLevel(level);
  const safeXp = Number.isFinite(xp) ? Math.max(0, xp) : 0;
  const floor = cumulativeXp(safeLevel);
  return { level: safeLevel, xp: Math.max(safeXp, floor) };
}
