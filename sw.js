let cacheName = "SmartGym";

let filesToCache = [
    "sw.js",
    "static/js/App.js",
    "static/css/ContactStyle.css",
    "static/css/FormStyle.css",
    "static/css/normalize.css",
    "manifest.json",
    "static/js/jquery.min.js",
    "static/css/style.css",
    "static/js/Register.js",
    "static/js/script.js",
    "static/js/jquery.js"
];

// Start the service worker and cache all of the static app's content.
self.addEventListener("install", event => {
    event.waitUntil(caches.open(cacheName).then(cache => {
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return fetch(event.request).then(response => {
                if (response.ok && event.request.method !== 'POST') {
                    cache.put(event.request, response.clone());
                }
                return response;
            })
        }).catch(error => {
            caches.match(event.request).then(response => {
                return response;
            })
        })
    )
})