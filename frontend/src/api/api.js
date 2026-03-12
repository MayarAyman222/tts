export const translateText = async (text, targetLang) => {
  const res = await fetch("http://168.231.101.20:5551/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang })
  });
  return await res.json();
};

export const speakText = async (text, language) => {
  const res = await fetch("http://168.231.101.20:5551/api/tts/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language })
  });
  return await res.json();
};
const BASE_URL = "http://168.231.101.20:5551";
//const BASE_URL = "http://192.168.0.103:5551";

export const normalizeMediaUrl = (url) => {
  if (!url) return "";

  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return url.replace(/http:\/\/(localhost|127\.0\.0\.1):\d+/, BASE_URL);
  }

  if (url.startsWith("/")) {
    return `${BASE_URL}${url}`;
  }

  return url;
};