// ================================================================
// MANDIR SERVICE WORKER — PWA Offline + Cache + Notifications
// ================================================================
const CACHE_NAME = 'mandir-v3';
const OFFLINE_URLS = [
  '/public/index.html',
  '/public/deities.html',
  '/public/events.html',
  '/public/ekadashi.html',
  '/public/past-events.html',
  '/public/about.html',
  '/public/committee.html',
  '/public/organization.html',
  '/public/payment.html',
  '/public/css/style.css',
  '/public/js/main.js',
  '/public/js/animations.js',
  '/database/db.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS.map(u => {
      try { return new Request(u); } catch(err) { return null; }
    }).filter(Boolean))).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || '🕌 মন্দির', {
      body: data.body || 'নতুন বার্তা আছে।',
      icon: '/public/icons/icon-192.png',
      badge: '/public/icons/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/public/index.html' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/public/index.html'));
});
