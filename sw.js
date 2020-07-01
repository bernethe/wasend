const VERSION = '1.0.0';
const CACHE_STATIC_NAME = 'static-v'+VERSION;
const CACHE_DINAMIC_NAME = 'dynamic-v'+VERSION;
const CACHE_INMUTABLE_NAME = 'inmutable-v'+VERSION;

const clearCache = (cacheName, itemsNum) => {
    caches.open(cacheName)
        .then( cache => {
            cache.keys().then( keys => {
                //console.log(keys);
                if(keys.length > itemsNum) {
                    cache.delete( keys[0] )
                        .then( clearCache(cacheName, itemsNum) );
                }
            });
        });
};

self.addEventListener('install', e => {
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then( cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/wasend.css',
                '/wasend.js',
                '/img/icos.svg',
                '/manifest.json'
            ]);
        });
        const cacheInm = caches.open(CACHE_INMUTABLE_NAME)
            .then( cache => {
                return cache.addAll([
                    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap'
                ]);
            });
    e.waitUntil( Promise.all([cacheProm, cacheInm]) );
});

self.addEventListener('fetch', e => {
    const respuesta = caches.match( e.request )
        .then( res => {
            if(res) {
                return res;
            } else {
                return fetch( e.request )
                            .then( newResp => {
                                caches.open(CACHE_DINAMIC_NAME)
                                    .then( cache => {
                                        cache.put(e.request, newResp);
                                        clearCache(CACHE_DINAMIC_NAME, 1);
                                    });
                                return newResp.clone();
                            } );
            }
        });

    e.respondWith(respuesta);
});