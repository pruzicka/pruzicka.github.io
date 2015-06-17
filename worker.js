importScripts('/assets/js/serviceworker-cache-polyfill.js');

// example usage:
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pr-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/blog/podcasty-co-vas-zvednou-ze-zidle/',
        '/assets/js/search.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});