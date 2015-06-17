importScripts('/assets/js/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'pr-cache-v1';
var url_to_cache = [
'/',
'/blog/podcasty-co-vas-zvednou-ze-zidle/index.html',
'/assets/js/search.min.js'
]

// example usage:
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(url_to_cache);
    })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response)  {
        console.log('Served from cache');
        return response;
      }
      return fetch(event.request);
    })
    );
});