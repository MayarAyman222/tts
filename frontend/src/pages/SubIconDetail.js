import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  API_BASE_URL,
  isElevenLabsVoiceMode,
  normalizeMediaUrl,
  speakWithBrowserVoice,
  speakWithElevenLabsVoice,
} from "../api/api";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
const VOICE_MODE_OPTIONS = [
  { value: "human", label: "Human Records" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "ai-male", label: "Records with AI - Male" },
  { value: "ai-female", label: "Records with AI - Female" },
];

function SubIconDetail() {
  const { iconId, subIconId } = useParams();
  const [subIcon, setSubIcon] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [voiceMode, setVoiceMode] = useState("human");

  useEffect(() => {
    const fetchSubIcon = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}`);
        const data = await res.json();
        setSubIcon(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (iconId && subIconId) fetchSubIcon();
  }, [iconId, subIconId]);

  const audioUrl = normalizeMediaUrl(subIcon?.recordingUrl || subIcon?.audioUrl);
  const speechText = String(subIcon?.expression || subIcon?.title || "").trim();
  const canSpeak = voiceMode !== "human" ? Boolean(speechText) : Boolean(audioUrl);

  const playAudioUrl = (url) =>
    new Promise((resolve) => {
      const audio = new Audio(url);
      audio.onended = () => resolve(true);
      audio.onerror = () => resolve(false);

      const playPromise = audio.play();
      if (playPromise?.catch) {
        playPromise.catch((error) => {
          console.log("SubIcon audio error:", error);
          resolve(false);
        });
      }
    });

  const handleSpeak = async () => {
    if (!canSpeak) return;

    setLoadingAudio(true);

    try {
      let audioPlayed = false;

      if (isElevenLabsVoiceMode(voiceMode)) {
        audioPlayed = await speakWithElevenLabsVoice(speechText, voiceMode);
      } else if (voiceMode !== "human") {
        audioPlayed = await speakWithBrowserVoice(speechText, voiceMode);
      } else {
        audioPlayed = await playAudioUrl(audioUrl);
      }

      if (!audioPlayed) {
        throw new Error("TTS failed");
      }
    } catch (error) {
      console.log("SubIcon audio error:", error);
      alert(error.message || "TTS failed");
    } finally {
      setLoadingAudio(false);
    }
  };

  if (!subIcon) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 p-7">
      <Row className="align-items-center w-300 " style={{ Width: "1000px" }}>
        <Col md={5} className="text-center mb-4 mb-md-0">
          <img
            src={normalizeMediaUrl(subIcon.imageUrl)}
            alt={subIcon.title}
            className="img-fluid rounded shadow"
            style={{ height: "300px", width: "600px" }}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </Col>

        <Col md={7} className="text-center text-md-start">
          <h2>{subIcon.title}</h2>
          <p className="text-muted fs-5">{subIcon.expression}</p>
          <Form.Select
            className="mb-3"
            value={voiceMode}
            onChange={(event) => setVoiceMode(event.target.value)}
          >
            {VOICE_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
          <Button onClick={handleSpeak} disabled={loadingAudio || !canSpeak}>
            {loadingAudio ? "Playing..." : "Speak"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SubIconDetail;
