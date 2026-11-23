const CACHE = 'tpf-shell-v0-21-0';
// Replaced at build time by the pwa-precache Vite plugin.
const PRECACHE = [
  "",
  "index.html",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "assets/ecopediaView-DTZb7bom.js",
  "assets/index-BnlhvdGl.js",
  "assets/meshopt_decoder-Dz7S8YZg.js",
  "assets/pixi-3d-txJ64NjT.js",
  "assets/pixi-core-DXQFmL6O.js",
  "assets/planet-configs-DJR3I4Wu.js",
];
const SCOPE = new URL('.', self.registration.scope);
const asset = (path) => new URL(path, SCOPE).href;
const SHELL = PRECACHE.map(asset);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(asset('index.html'), copy));
          return response;
        })
        .catch(() => caches.match(asset('index.html'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreVary: true }).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
