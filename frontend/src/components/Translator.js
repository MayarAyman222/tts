/*import { useState } from "react";
import { translateText } from "../api/api";
import SpeakButton from "./SpeakButton";

const Translator = () => {
  const [text, setText] = useState("Hello, how are you?");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("ar"); // default Arabic
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    const res = await translateText(text, targetLang);
    if (res.ok) setTranslatedText(res.translatedText);
    else alert("Translation failed");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Translator + TTS Demo</h2>
      
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <label>Choose language: </label>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <button
        onClick={handleTranslate}
        style={{ marginTop: "10px", padding: "10px 20px" }}
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translatedText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>

          <SpeakButton text={translatedText} language={targetLang} />
        </div>
      )}
    </div>
  );
};

export default Translator;*/
