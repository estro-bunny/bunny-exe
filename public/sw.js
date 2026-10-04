// Bump VERSION to push an update to installed copies.
const VERSION = 'ebx-v1'
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'img/hero.jpg', 'img/wall.jpg', 'img/skin-0.jpg', 'img/skin-1.jpg', 'img/skin-2.jpg', 'img/skin-3.jpg', 'img/skin-4.jpg', 'img/skin-5.jpg', 'img/skin-6.jpg', 'img/skin-7.jpg', 'img/skin-8.jpg', 'img/skin-9.jpg', 'img/skin-10.jpg', 'img/skin-11.jpg', 'img/skin-12.jpg']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return
  // Pages: network first so updates arrive, fall back to cache when offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((r) => { caches.open(VERSION).then((c) => c.put('./', r.clone())); return r })
        .catch(() => caches.match('./'))
    )
    return
  }
  // Everything else: cache first, fill the cache as we go (hashed JS/CSS included).
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      const copy = r.clone()
      caches.open(VERSION).then((c) => c.put(req, copy))
      return r
    }))
  )
})
