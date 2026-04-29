const EXPLICIT_API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  "";

const LOCAL_HOSTNAME_RE =
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/;

const PUBLIC_API_BASE_URL = "http://168.231.101.20:5551";
const REMOTE_PROXY_API_BASE_URL = "/backend";

const normalizeBaseUrl = (value) => String(value || "").replace(/\/+$/, "");

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

  const { hostname, port, protocol } = window.location;
  const explicitHostname = getUrlHostname(EXPLICIT_API_BASE_URL);

  if (
    protocol === "https:" &&
    /^http:\/\//i.test(EXPLICIT_API_BASE_URL)
  ) {
    return "";
  }

  if (hostname === "168.231.101.20" && port === "5551") {
    return "";
  }

  if (
    EXPLICIT_API_BASE_URL &&
    LOCAL_HOSTNAME_RE.test(explicitHostname) &&
    !LOCAL_HOSTNAME_RE.test(hostname)
  ) {
    return "";
  }

  return EXPLICIT_API_BASE_URL;
};

const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return REMOTE_PROXY_API_BASE_URL;
  }

  const { hostname, port, protocol } = window.location;

  if (hostname === "168.231.101.20" && port === "5551") {
    return "";
  }

  if (protocol === "https:" || !LOCAL_HOSTNAME_RE.test(hostname)) {
    return REMOTE_PROXY_API_BASE_URL;
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

export const speakWithBrowserVoice = async (text, voiceMode = "female") => {
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
  utterance.rate = settings.rate;
  utterance.volume = 1;

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

export const translateText = async (text, targetLang) => {
  const res = await fetch(`${API_BASE_URL}/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang })
  });
  return await res.json();
};

export const generateTtsAudioUrl = async ({ text, voice }) => {
  const res = await fetch(`${API_BASE_URL}/api/tts/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice })
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

export const speakText = async (text, voice = "male") => {
  try {
    const url = await generateTtsAudioUrl({ text, voice });
    return { ok: true, url };
  } catch (error) {
    return { ok: false, message: error.message };
  }
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
