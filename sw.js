// ============================================================
// AdminSheet – Service Worker
// Cache-Version wird automatisch als Timestamp gesetzt
// ============================================================
const CACHE_VERSION = '20260524-1146'onst CACHE_NAME = `adminsheet-${CACHE_VERSION}`;

const ASSETS = [
  './index.html',
  './exchange.html',
  './forti.html',
  './scripts.html',
  './mitmachen.html',
  './nav.js',
  './manifest.json',
  './sw.js',
  './eventlog.html',
  './eventlog-rules.json',
  './powershell/Get-EventLogCollector-Client.ps1',
  './powershell/Get-EventLogCollector-Server.ps1',
  './powershell/Get-SystemInventory.ps1',
  './powershell/Get-LocalAdmins.ps1',
  './powershell/Test-NetworkConnectivity.ps1',
  './powershell/Get-InstalledSoftware.ps1',
  './powershell/Set-PowerPlan-Win11.ps1',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap',
];

// Install: cache everything
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.allSettled(ASSETS.map(url => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches + notify clients that update is ready
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => {
        // Broadcast update info to all open tabs
        self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(client => client.postMessage({
            type: 'SW_UPDATED',
            version: CACHE_VERSION
          }));
        });
      })
  );
});

// Fetch: cache-first for local, network-first for fonts
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      fetch(e.request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
        return res;
      });
    })
  );
});

// Manual update trigger from client
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
