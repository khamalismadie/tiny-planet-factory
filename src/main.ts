import { Game } from './app/Game';

const bootStart = performance.now();

function fail(message: string): void {
  const box = document.getElementById('error')!;
  box.classList.remove('hidden');
  box.textContent = message;
}

if (typeof WebGL2RenderingContext === 'undefined') {
  fail('Browser tidak mendukung WebGL2. Tiny Planet Factory memerlukan WebGL2.');
} else {
  Game.create(document.getElementById('app')!, bootStart).catch((error: unknown) => {
    fail(`Gagal memulai: ${String(error)}`);
    console.error(error);
  });
}
