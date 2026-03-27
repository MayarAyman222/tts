export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5551";

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

  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return url.replace(/http:\/\/(localhost|127\.0\.0\.1):\d+/, API_BASE_URL);
  }

  if (url.startsWith("/")) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
};
