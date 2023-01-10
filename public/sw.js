var CACHE_DYNAMIC_NAME = 'dynamic-v3';


if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(({
        usage,
        quota
    }) => {
        console.log(`Using ${usage} out of ${quota} bytes.`);
    });

}

var cacheVersion = 1;
var currentCache = {
    offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
    console.log("install");
    event.waitUntil(
        caches.open(currentCache.offline).then(function (cache) {
            return cache.addAll([
                '/', '/src/master.css', '/src/index.js', '/sw.js',
                offlineUrl
            ]);
        })
    );
});


self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    console.log("Service worker activation log isijs");
    event.waitUntil(
        caches.keys()
        .then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== currentCache.offline && key !== CACHE_DYNAMIC_NAME) {
                    console.log('[Service Worker] Removing old cache.', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function (res) {
                        return caches.open(CACHE_DYNAMIC_NAME)
                            .then(function (cache) {
                                cache.put(event.request.url, res.clone());
                                return res;
                            })
                    })
                    .catch(function (err) {
                        return caches.open(currentCache.offline)
                            .then(function (cache) {
                                return cache.match('/offline-page.html');
                            });
                    });
            }
        })
    );
});