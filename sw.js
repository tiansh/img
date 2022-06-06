const cacheKey = 'ver-20220606';

const resourceList = [
  './icon.svg',
  './main.css',
  './main.js',
  './',
  './manifest.webmanifest',
];

const cacheFiles = async function () {
  const cache = await caches.open(cacheKey);
  await cache.addAll(resourceList);
  const keys = await caches.keys();
  await Promise.all(keys.map(async key => {
    if (key === cacheKey) return;
    await caches.delete(key);
  }));
};

self.addEventListener('install', function (event) {
  event.waitUntil(cacheFiles());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request));
});

