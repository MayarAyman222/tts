/*import { useState } from "react";
import { speakText } from "../api/api";

const SpeakButton = ({ text, language }) => {
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    setLoading(true);
    const res = await speakText(text, language);
    if (res.ok) {
      const audio = new Audio(res.url);
      audio.play();
    } else {
      alert("TTS failed");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleSpeak}
      style={{ padding: "10px 20px", marginTop: "10px" }}
      disabled={loading}
    >
      {loading ? "Speaking..." : "Speak"}
    </button>
  );
};

export default SpeakButton;
*/