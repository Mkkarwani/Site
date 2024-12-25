const CACHE_NAME = 'studyfriends-pwa-cache-v2';
const OFFLINE_URL = '/Site/offline.html';
const urlsToCache = [
  '/',
  '/Site/',
  '/Site/home.html',
  '/Site/offline.html',
  '/Site/index.html',
  '/Site/viewer.html',
  '/Site/pdfjs/pdf.mjs',
  '/Site/pdfjs/pdf.mjs.map',
  '/Site/pdfjs/pdf.worker.mjs',
  '/Site/pdfjs/pdf.worker.mjs.map',
  '/Site/assets/icon.png',
  '/Site/styles/style.css'
];

// Install service worker and cache necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event to serve cached assets or show offline page
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available, otherwise fetch from the network
      return cachedResponse || fetch(event.request).catch(() => {
        // Show offline page if network is unavailable
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
  caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
