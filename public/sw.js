// // self.addEventListener("install", e => {
// //     // console.log("Installed  ")
// //     e.waitUntil(
// //         caches.open("static").then(cache => {
// //             return cache.addAll([`/`, `/index.html`,`/image.png`,  `./src/master.css`, `./images/logo192.png`]);
// //         }).then(() => self.skipWaiting())
// //     );
// // });


// // const OFFLINE_URL = 'offline.html';


// self.addEventListener('install', function (event) {
//     console.log("Installed  ")
//     // alert("ooppo")
//     event.waitUntil(
//         caches.open("cacheName").then(function (cache) {
//             return cache.addAll(
//                 [
//                     '/',
//                     '/src/master.css',
//                     '/images/logo192.png',
//                     '/image.png',
//                     '/index.html',
//                     '/offline.html'
//                 ]
//             );
//         })
//     );
// });

// // document.querySelector('.cache-article').addEventListener('click', function (event) {
// //     event.preventDefault();
// //     var id = this.dataset.articleId;
// //     caches.open('mysite-article-' + id).then(function (cache) {
// //         fetch('/get-article-urls?id=' + id).then(function (response) {
// //             // /get-article-urls returns a JSON-encoded array of
// //             // resource URLs that a given article depends on
// //             return response.json();
// //         }).then(function (urls) {
// //             cache.addAll(urls);
// //         });
// //     });
// // });


// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 return response || fetchAndCache(event.request);
//             })
//     );
// });

// function fetchAndCache(url) {
//     return fetch(url)
//         .then(function (response) {
//             // Check if we received a valid response
//             if (!response.ok) {
//                 throw Error(response.statusText);
//             }
//             return caches.open("cacheName")
//                 .then(function (cache) {
//                     cache.put(url, response.clone());
//                     return response;
//                 });
//         })
//         .catch(function (error) {
//             console.log("PAWRI HORI HAI")
//             // res.send("offline.html")
//             // alert("uuuuuuuuuuuuuu")
//             console.log('Request failed:', error);
//             // const cachedResponse = cache.match(OFFLINE_URL);
//             // return cachedResponse;

//         });
// }


// 'use strict';
// const applicationServerPublicKey = 'BITMLtDRuyhrTc-DJjnMq_uahpmTMgt53iSuv1ZaoNXeujDATQyi3hkHaa4s8fQicZiVBJwdk1Omn9-A7kfvJhY';
// var cacheVersion = 1;
// var currentCache = {
//     offline: 'offline-cache' + cacheVersion
// };
// const offlineUrl = 'offline-page.html';

// this.addEventListener('install', event => {
//     console.log("install");
//     event.waitUntil(
//         caches.open(currentCache.offline).then(function (cache) {
//             return cache.addAll([
//                 '/', '/src/master.css', '/src/index.js', '/sw.js',
//                 offlineUrl
//             ]);
//         })
//     );
// });


// this.addEventListener('fetch', event => {
//     // request.mode = navigate isn't supported in all browsers
//     // so include a check for Accept: text/html header.
//     if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
//         event.respondWith(
//             fetch(event.request.url).catch(error => {
//                 // Return the offline page
//                 return caches.match(offlineUrl);
//             })
//         );
//     }
//     else {
//         // Respond with everything else if we can
//         event.respondWith(caches.match(event.request)
//             .then(function (response) {
//                 return response || fetch(event.request);
//             })
//         );
//     }
// });

// function urlB64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }

// self.addEventListener('push', function (event) {
//     console.log('[Service Worker] Push Received.');
//     console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//     const title = 'Push Codelab';
//     const options = {
//         body: 'Yay it works.',
//         icon: 'images/icon.png',
//         badge: 'images/badge.png'
//     };
//     console.log("Yay it works.")
//     event.waitUntil(self.registration.showNotification(title, options));
// });



// self.addEventListener('notificationclick', function (event) {
//     console.log('[Service Worker] Notification click Received.');

//     event.notification.close();

//     event.waitUntil(
//         clients.openWindow('https://function-akss.herokuapp.com/')
//     );
// });

// self.addEventListener('pushsubscriptionchange', function (event) {
//     console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
//     const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//     event.waitUntil(
//         self.registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: applicationServerKey
//         })
//             .then(function (newSubscription) {
//                 // TODO: Send to application server
//                 console.log('[Service Worker] New subscription: ', newSubscription);
//             })
//     );
// });

////////////////////////////////////////FROM COURSE/////////////////////////////////////////////////

// var CACHE_STATIC_NAME = 'static-v4';
var CACHE_DYNAMIC_NAME = 'dynamic-v3';

// self.addEventListener('install', function(event) {
//   console.log('[Service Worker] Installing Service Worker ...', event);
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME)
//       .then(function(cache) {
//         console.log('[Service Worker] Precaching App Shell');
//         cache.addAll([
//           '/',
//           '/index.html',
//           '/src/index.js',
//           '/src/feed.js',
//           '/src/promise.js',
//           '/src/fetch.js',
//           '/src/material.min.js',
//           '/src/css/app.css',
//           '/src/css/feed.css',
//         //   'https://fonts.googleapis.com/css?family=Roboto:400,700',
//         //   'https://fonts.googleapis.com/icon?family=Material+Icons',
//         //   'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
//         ]);
//       })
//   )
// });
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