const EXPLICIT_API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  "";

const LOCAL_HOSTNAME_RE =
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/;

const LOCAL_API_PORT = process.env.REACT_APP_BACKEND_PORT || "5551";
const PUBLIC_API_BASE_URL = "https://tts-production-6e70.up.railway.app";
const LEGACY_API_BASE_URLS = [
  "http://168.231.101.20:5551",
  "https://tts-production-77b9.up.railway.app",
];
const ELEVENLABS_VOICE_MODE_MAP = {
  ai: "female",
  "ai-record": "female",
  "ai-records": "female",
  "ai-male": "male",
  "ai-female": "female",
  ai_male: "male",
  ai_female: "female",
  "records-with-ai": "female",
};

const normalizeBaseUrl = (value) => String(value || "").replace(/\/+$/, "");

const isLocalHostname = (hostname) =>
  LOCAL_HOSTNAME_RE.test(String(hostname || "")) ||
  hostname === "::1" ||
  hostname === "[::1]";

const normalizeLocalHostnameForUrl = (hostname) => {
  if (!hostname || hostname === "0.0.0.0" || hostname === "::1" || hostname === "[::1]") {
    return "localhost";
  }

  return hostname;
};

const getUrlHostname = (value) => {
  try {
    return new URL(value).hostname;
  } catch (err) {
    return "";
  }
};

const getExplicitApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return EXPLICIT_API_BASE_URL;
  }

  const { hostname, protocol } = window.location;
  const explicitHostname = getUrlHostname(EXPLICIT_API_BASE_URL);

  if (
    protocol === "https:" &&
    /^http:\/\//i.test(EXPLICIT_API_BASE_URL)
  ) {
    return "";
  }

  if (
    EXPLICIT_API_BASE_URL &&
    isLocalHostname(explicitHostname) &&
    !isLocalHostname(hostname)
  ) {
    return "";
  }

  return EXPLICIT_API_BASE_URL;
};

const getDefaultApiBaseUrl = () => {
  if (typeof window !== "undefined" && isLocalHostname(window.location.hostname)) {
    return `http://${normalizeLocalHostnameForUrl(window.location.hostname)}:${LOCAL_API_PORT}`;
  }

  return PUBLIC_API_BASE_URL;
};

const rawApiBaseUrl = getExplicitApiBaseUrl() || getDefaultApiBaseUrl();

export const API_BASE_URL = normalizeBaseUrl(rawApiBaseUrl);

const getBrowserSpeechVoices = () =>
  new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }

    const timeoutId = setTimeout(() => resolve(synth.getVoices()), 1000);
    synth.onvoiceschanged = () => {
      clearTimeout(timeoutId);
      resolve(synth.getVoices());
    };
  });

const isArabicVoice = (voice) => {
  const lang = String(voice?.lang || "").toLowerCase();
  const name = String(voice?.name || "").toLowerCase();

  return lang.startsWith("ar") || name.includes("arabic") || name.includes("العربية");
};

const selectArabicVoice = (voices, voiceMode) => {
  const arabicVoices = voices.filter(isArabicVoice);
  const normalizedVoiceMode = String(voiceMode || "").toLowerCase();

  if (normalizedVoiceMode === "male") {
    return (
      arabicVoices.find((voice) => /male|maged|naayf|tarik/i.test(voice.name)) ||
      arabicVoices[0] ||
      voices[0] ||
      null
    );
  }

  return (
    arabicVoices.find((voice) => /female|hoda|mona|laila|salma/i.test(voice.name)) ||
    arabicVoices[0] ||
    voices[0] ||
    null
  );
};

const getBrowserVoiceSettings = (voiceMode) => {
  const normalizedVoiceMode = String(voiceMode || "").toLowerCase();

  if (normalizedVoiceMode === "male") {
    return { pitch: 0.75, rate: 0.85 };
  }

  return { pitch: 1.08, rate: 0.9 };
};

const clampNumber = (value, min, max, fallback) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) return fallback;
  return Math.min(Math.max(nextValue, min), max);
};

export const speakWithBrowserVoice = async (text, voiceMode = "female", options = {}) => {
  const cleanText = String(text || "").trim();
  if (!cleanText || typeof window === "undefined") return false;

  const synth = window.speechSynthesis;
  const Utterance = window.SpeechSynthesisUtterance;
  if (!synth || !Utterance) return false;

  const voices = await getBrowserSpeechVoices();
  const utterance = new Utterance(cleanText);
  const selectedVoice = selectArabicVoice(voices, voiceMode);
  const settings = getBrowserVoiceSettings(voiceMode);

  utterance.lang = selectedVoice?.lang || "ar-SA";
  utterance.voice = selectedVoice;
  utterance.pitch = settings.pitch;
  utterance.rate = clampNumber(options.rate, 0.1, 10, settings.rate);
  utterance.volume = clampNumber(options.volume, 0, 1, 1);

  return new Promise((resolve) => {
    let settled = false;
    const settle = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    utterance.onend = () => settle(true);
    utterance.onerror = () => settle(false);

    try {
      synth.cancel();
      synth.speak(utterance);
      setTimeout(() => settle(true), Math.min(Math.max(cleanText.length * 90, 1500), 20000));
    } catch (err) {
      settle(false);
    }
  });
};

export const isElevenLabsVoiceMode = (voiceMode) => {
  const normalizedVoiceMode = String(voiceMode || "").trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(ELEVENLABS_VOICE_MODE_MAP, normalizedVoiceMode);
};

export const resolveElevenLabsVoiceMode = (voiceMode) => {
  const normalizedVoiceMode = String(voiceMode || "").trim().toLowerCase();
  return ELEVENLABS_VOICE_MODE_MAP[normalizedVoiceMode] || "female";
};

export const translateText = async (text, targetLang) => {
  const res = await fetch(`${API_BASE_URL}/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang })
  });
  return await res.json();
};

export const sendChatMessage = async ({ message, language = "en", history = [] }) => {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language, history })
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = { message: text };
  }

  if (!res.ok) {
    throw new Error(data?.message || "Chat failed");
  }

  return data;
};

export const recognizeDrawing = async ({ imageDataUrl, language }) => {
  const res = await fetch(`${API_BASE_URL}/api/drawing/recognize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageDataUrl, language })
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = { message: text };
  }

  if (!res.ok) {
    const detailsMessage = typeof data?.details === "string"
      ? data.details
      : data?.details?.error?.message;

    throw new Error(
      res.status === 429
        ? data?.message || detailsMessage || "Drawing recognition failed"
        : detailsMessage || data?.message || "Drawing recognition failed",
    );
  }

  return data;
};

export const generateTtsAudioUrl = async ({ text, voice, language }) => {
  const res = await fetch(`${API_BASE_URL}/api/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice, language })
  });

  if (!res.ok) {
    let message = "TTS failed";
    const errorText = await res.text();
    try {
      const data = JSON.parse(errorText);
      message = data?.message || data?.details || message;
    } catch (err) {
      message = errorText || message;
    }

    throw new Error(message);
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const generateGoogleTtsAudioUrl = async ({ text, language }) => {
  const res = await fetch(`${API_BASE_URL}/api/tts/gtts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language })
  });

  if (!res.ok) {
    let message = "Google TTS failed";
    const errorText = await res.text();
    try {
      const data = JSON.parse(errorText);
      message = data?.message || data?.details || message;
    } catch (err) {
      message = errorText || message;
    }

    throw new Error(message);
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const speakText = async (text, voice = "male", language) => {
  try {
    const url = await generateTtsAudioUrl({ text, voice, language });
    return { ok: true, url };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const speakDrawingText = async (text, language) => {
  try {
    const url = await generateGoogleTtsAudioUrl({ text, language });
    return { ok: true, url };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const speakWithElevenLabsVoice = async (text, voiceMode = "ai-female", options = {}) => {
  const cleanText = String(text || "").trim();
  if (!cleanText) return false;

  const url = await generateTtsAudioUrl({
    text: cleanText,
    voice: resolveElevenLabsVoiceMode(voiceMode),
  });

  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.volume = clampNumber(options.volume, 0, 1, 1);
    audio.playbackRate = clampNumber(options.rate, 0.25, 4, 1);
    let settled = false;

    const finish = (value) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      resolve(value);
    };

    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);

    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch((error) => {
        if (settled) return;
        settled = true;
        URL.revokeObjectURL(url);
        reject(error);
      });
    }
  });
};

export const normalizeMediaUrl = (url) => {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    try {
      const parsedUrl = new URL(url);
      if (
        isLocalHostname(parsedUrl.hostname) ||
        LEGACY_API_BASE_URLS.some((baseUrl) => url.startsWith(baseUrl))
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
