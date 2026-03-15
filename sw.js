const CACHE = 'mylist-v6';
const STATIC = ['/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Never intercept Google API calls
  if (e.request.url.includes('googleapis.com') || e.request.url.includes('accounts.google.com')) return;

  // Never cache index.html — always fetch fresh from network
  if (e.request.destination === 'document' ||
      e.request.url.endsWith('/') ||
      e.request.url.endsWith('index.html')) {
    e.respondWith(fetch(e.request, { cache: 'no-store' }));
    return;
  }

  // Static assets — cache first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp.ok && e.request.method === 'GET') {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});
