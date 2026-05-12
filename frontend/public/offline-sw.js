const CACHE_NAME = "voxi-offline-cache-v1";

let forcedOfflineMode = false;

const API_PATH_RE =
  /^\/(?:api\/offline-manifest|offline-manifest|maincategories|timeperiods|icons|subicons|emergency-numbers|aac-messages)(?:\/|\?|$)/;
const MEDIA_PATH_RE =
  /^\/(?:public|images|static)(?:\/|$)|^\/(?:favicon\.ico|logo192\.png|manifest\.json|index\.html)$/;

const isCacheableResponse = (response) =>
  response && (response.ok || response.type === "opaque");

const shouldHandleRequest = (request) => {
  if (request.method !== "GET") return false;

  const url = new URL(request.url);
  if (API_PATH_RE.test(url.pathname) || MEDIA_PATH_RE.test(url.pathname)) {
    return true;
  }

  return ["image", "audio", "font", "script", "style"].includes(request.destination);
};

const putInCache = async (request, response) => {
  if (!isCacheableResponse(response)) return;

  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  } catch (err) {
    // Cache writes can fail for opaque or no-store responses in some browsers.
  }
};

const cacheFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  const networkResponse = await fetch(request);
  await putInCache(request, networkResponse);
  return networkResponse;
};

const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    await putInCache(request, networkResponse);
    return networkResponse;
  } catch (err) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    throw err;
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SET_OFFLINE_MODE") {
    forcedOfflineMode = Boolean(event.data.enabled);
  }
});

self.addEventListener("fetch", (event) => {
  if (!shouldHandleRequest(event.request)) return;

  event.respondWith(
    forcedOfflineMode ? cacheFirst(event.request) : networkFirst(event.request),
  );
});

