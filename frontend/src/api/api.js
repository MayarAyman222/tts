const EXPLICIT_API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  "";

const LOCAL_HOSTNAME_RE =
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/;

const DEFAULT_REMOTE_API_BASE_URL = "/backend";

const normalizeBaseUrl = (value) => String(value || "").replace(/\/+$/, "");

const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return DEFAULT_REMOTE_API_BASE_URL;
  }

  const { hostname } = window.location;

  if (LOCAL_HOSTNAME_RE.test(hostname)) {
    return `http://${hostname}:5551`;
  }

  return DEFAULT_REMOTE_API_BASE_URL;
};

const rawApiBaseUrl = EXPLICIT_API_BASE_URL || getDefaultApiBaseUrl();

export const API_BASE_URL = normalizeBaseUrl(rawApiBaseUrl);

export const translateText = async (text, targetLang) => {
  const res = await fetch(`${API_BASE_URL}/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang })
  });
  return await res.json();
};

export const speakText = async (text, language) => {
  const res = await fetch(`${API_BASE_URL}/api/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language })
  });
  return await res.json();
};

export const normalizeMediaUrl = (url) => {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    try {
      const parsedUrl = new URL(url);
      if (
        LOCAL_HOSTNAME_RE.test(parsedUrl.hostname) ||
        url.startsWith("http://168.231.101.20:5551")
      ) {
        return `${API_BASE_URL}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }
    } catch (err) {
      console.log(err);
    }

    return url;
  }

  if (url.startsWith("/")) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
};
