const CACHE_NAME = "voxi-offline-cache-v1";
const OFFLINE_MODE_KEY = "voxi:offline-mode";
const OFFLINE_META_KEY = "voxi:offline-cache-meta";
const OFFLINE_WORKER_PATH = "/offline-sw.js";

let serviceWorkerRegistrationPromise = null;

const safeLocalStorage = {
  get(key) {
    if (typeof window === "undefined") return null;

    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  },
  set(key, value) {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  },
  remove(key) {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  },
};

const normalizeBaseUrl = (value) => String(value || "").replace(/\/+$/, "");

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value || ""));

const isCurrentOrigin = (url) =>
  typeof window !== "undefined" && url.origin === window.location.origin;

export const getOfflineModePreference = () =>
  safeLocalStorage.get(OFFLINE_MODE_KEY) === "offline";

export const getOfflineCacheMeta = () => {
  const value = safeLocalStorage.get(OFFLINE_META_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (err) {
    return null;
  }
};

const writeOfflineCacheMeta = (meta) => {
  safeLocalStorage.set(OFFLINE_META_KEY, JSON.stringify(meta));
};

export const isConnectionOffline = () =>
  typeof navigator !== "undefined" && navigator.onLine === false;

export const isOfflineRuntime = () =>
  getOfflineModePreference() || isConnectionOffline();

const postOfflineModeToWorker = (enabled) => {
  if (typeof navigator === "undefined" || !navigator.serviceWorker) return;

  const message = {
    type: "SET_OFFLINE_MODE",
    enabled: Boolean(enabled),
  };

  navigator.serviceWorker.controller?.postMessage(message);

  serviceWorkerRegistrationPromise
    ?.then((registration) => {
      registration.active?.postMessage(message);
      registration.waiting?.postMessage(message);
      registration.installing?.postMessage(message);
    })
    .catch(() => {});
};

export const setOfflineModePreference = (enabled) => {
  if (enabled) {
    safeLocalStorage.set(OFFLINE_MODE_KEY, "offline");
  } else {
    safeLocalStorage.remove(OFFLINE_MODE_KEY);
  }

  postOfflineModeToWorker(enabled);
};

export const registerOfflineWorker = () => {
  if (
    typeof window === "undefined" ||
    typeof navigator === "undefined" ||
    !("serviceWorker" in navigator)
  ) {
    return Promise.resolve(null);
  }

  if (!serviceWorkerRegistrationPromise) {
    serviceWorkerRegistrationPromise = navigator.serviceWorker
      .register(OFFLINE_WORKER_PATH)
      .then((registration) => {
        postOfflineModeToWorker(getOfflineModePreference());
        return registration;
      })
      .catch((err) => {
        console.log("Offline worker registration failed:", err);
        return null;
      });
  }

  return serviceWorkerRegistrationPromise;
};

const getCache = async () => {
  if (typeof caches === "undefined") return null;
  return caches.open(CACHE_NAME);
};

export const toAbsoluteUrl = (url, baseUrl) => {
  const value = String(url || "").trim();
  if (!value) return "";
  if (isAbsoluteUrl(value) || value.startsWith("blob:") || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${normalizeBaseUrl(baseUrl || window.location.origin)}${value}`;
  }

  try {
    return new URL(value, baseUrl || window.location.origin).toString();
  } catch (err) {
    return value;
  }
};

const createRequest = (url, init = {}) => {
  const requestInit = {
    method: "GET",
    credentials: "same-origin",
  };

  if (init.mode) requestInit.mode = init.mode;
  if (init.credentials) requestInit.credentials = init.credentials;

  return new Request(url, requestInit);
};

const putInCache = async (request, response) => {
  if (!response || (response.type !== "opaque" && !response.ok)) return false;

  try {
    const cache = await getCache();
    if (!cache) return false;
    await cache.put(request, response.clone());
    return true;
  } catch (err) {
    console.log("Offline cache write failed:", err);
    return false;
  }
};

const matchCache = async (request) => {
  try {
    const cache = await getCache();
    if (!cache) return null;
    return cache.match(request);
  } catch (err) {
    return null;
  }
};

export const cachedFetch = async (input, init = {}) => {
  const method = String(init.method || input?.method || "GET").toUpperCase();
  if (method !== "GET") {
    return fetch(input, init);
  }

  const url = typeof input === "string" ? input : input.url;
  const request = createRequest(url, init);
  const offlineFirst = isOfflineRuntime();

  if (offlineFirst) {
    const cachedResponse = await matchCache(request);
    if (cachedResponse) return cachedResponse.clone();
  }

  try {
    const networkResponse = await fetch(input, init);
    await putInCache(request, networkResponse);
    return networkResponse;
  } catch (err) {
    const cachedResponse = await matchCache(request);
    if (cachedResponse) return cachedResponse.clone();
    throw err;
  }
};

export const fetchJson = async (url, init = {}) => {
  const response = await cachedFetch(url, init);
  const text = await response.text();

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || text || `Request failed with status ${response.status}`);
  }

  return data;
};

const cacheJsonResponse = async (url, data) => {
  const request = createRequest(url);
  const response = new Response(JSON.stringify(data ?? null), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Voxi-Offline-Cache": "1",
    },
  });

  return putInCache(request, response);
};

const isCrossOriginMedia = (url) => {
  try {
    const parsedUrl = new URL(url);
    return !isCurrentOrigin(parsedUrl);
  } catch (err) {
    return false;
  }
};

const cacheMediaUrl = async (url) => {
  const request = createRequest(url, {
    mode: isCrossOriginMedia(url) ? "no-cors" : "cors",
    credentials: isCrossOriginMedia(url) ? "omit" : "same-origin",
  });

  const cachedResponse = await matchCache(request);
  if (cachedResponse) return true;

  const response = await fetch(request);
  return putInCache(request, response);
};

const runPool = async (items, limit, worker, onProgress) => {
  let index = 0;
  let completed = 0;
  let failed = 0;

  const total = items.length;
  const runners = Array.from({ length: Math.min(limit, total) }, async () => {
    while (index < total) {
      const currentIndex = index;
      index += 1;
      const current = items[currentIndex];

      try {
        await worker(current, currentIndex);
      } catch (err) {
        failed += 1;
      } finally {
        completed += 1;
        onProgress?.({ completed, total, failed, current });
      }
    }
  });

  await Promise.all(runners);
  return { total, completed, failed };
};

export const syncOfflineCache = async ({
  apiBaseUrl,
  normalizeMediaUrl,
  onProgress,
} = {}) => {
  const baseUrl = normalizeBaseUrl(apiBaseUrl || window.location.origin);
  await registerOfflineWorker();

  const manifestUrl = `${baseUrl}/offline-manifest`;
  const manifestFetchUrl = isConnectionOffline()
    ? manifestUrl
    : `${manifestUrl}?sync=${Date.now()}`;
  const manifestResponse = await fetch(manifestFetchUrl, { cache: "no-store" });

  if (!manifestResponse.ok) {
    throw new Error(`Offline manifest failed: ${manifestResponse.status}`);
  }

  const manifest = await manifestResponse.json();
  await cacheJsonResponse(manifestUrl, manifest);
  await cacheJsonResponse(`${baseUrl}/api/offline-manifest`, manifest);

  const responses = manifest?.responses || {};
  const endpointEntries = Object.entries(responses);

  for (const [path, data] of endpointEntries) {
    await cacheJsonResponse(`${baseUrl}${path}`, data);
  }

  const mediaUrls = Array.from(new Set(manifest?.mediaUrls || []))
    .map((url) => {
      const isFrontendAsset = /^\/(?:images|favicon\.ico|logo\d+\.png|manifest\.json|index\.html)(?:\/|$)/.test(
        String(url || ""),
      );
      if (isFrontendAsset) {
        return toAbsoluteUrl(url, window.location.origin);
      }

      const normalized = normalizeMediaUrl ? normalizeMediaUrl(url) : url;
      return toAbsoluteUrl(normalized, baseUrl);
    })
    .filter(Boolean)
    .filter((url) => !url.startsWith("blob:") && !url.startsWith("data:"));

  const mediaResult = await runPool(mediaUrls, 6, cacheMediaUrl, onProgress);
  const meta = {
    syncedAt: new Date().toISOString(),
    apiEndpointCount: endpointEntries.length,
    mediaTotal: mediaResult.total,
    mediaFailed: mediaResult.failed,
    version: manifest?.version || "",
  };

  writeOfflineCacheMeta(meta);
  postOfflineModeToWorker(getOfflineModePreference());

  return meta;
};
