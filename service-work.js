// service-worker.js
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('kk-music-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          // Add other files you want to cache for offline access
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  