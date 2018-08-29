const CACHE_NAME = "mlfilter";
const CACHE_VERSION = "v1";
const FULL_CACHE_NAME = `${CACHE_NAME}_${CACHE_VERSION}`;

// Fundamental assets for when the page loads
const CRITICAL_ASSETS = [
  ".",
  "index.html",
  "index.bundle.js",
  "css/index.css"
];

// While installing seize the opportunity to request and cache the critical assets
self.addEventListener("install", event =>
  event.waitUntil(
    caches.open(FULL_CACHE_NAME).then(cache => cache.addAll(CRITICAL_ASSETS))
  )
);

// On SW activation delete old caches of this application
self.addEventListener("activate", event =>
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(
              key => key.startsWith(CACHE_NAME) && key !== FULL_CACHE_NAME
            )
            .map(key => caches.delete(key))
        )
      )
  )
);

// Return the response stored in the cache. If it was not previously in the cache
// fetch the request and store the response in the cache
self.addEventListener("fetch", event => {
  const response = caches.open(FULL_CACHE_NAME).then(cache =>
    cache.match(event.request).then(cacheResponse => {
      if (cacheResponse) {
        return cacheResponse;
      }

      return fetch(event.request).then(networkResponse => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
    })
  );

  return event.respondWith(response);
});
