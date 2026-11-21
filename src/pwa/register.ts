export function registerPwa(onUpdate: (message: string) => void): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  // On a first visit there is no controller yet. clients.claim() still fires
  // controllerchange, but that must not reload the freshly opened game.
  const hadController = !!navigator.serviceWorker.controller;

  const register = () => {
    navigator.serviceWorker
      .register(new URL('sw.js', document.baseURI).href)
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          installing?.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              onUpdate('Versi baru tersedia. Muat ulang untuk memperbarui.');
            }
          });
        });
      })
      .catch(() => onUpdate('PWA tidak dapat diaktifkan; game tetap bisa dimainkan online.'));

    let refreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || refreshed) return;
      refreshed = true;
      window.location.reload();
    });
  };

  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
