import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  API_BASE_URL,
  isElevenLabsVoiceMode,
  normalizeMediaUrl,
  speakWithBrowserVoice,
  speakWithElevenLabsVoice,
} from "../api/api";
import { trackRoutinePlayback } from "../utils/dailyRoutine";
import "./SubSubIconDetail.css";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
const VOICE_MODE_OPTIONS = [
  { value: "human", label: "Human Records" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "ai-male", label: "Records with AI - Male" },
  { value: "ai-female", label: "Records with AI - Female" },
];

function SubSubIconDetail() {
  const { iconId, subIconId, subSubIconId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);

  const [subSubIcon, setSubSubIcon] = useState(location.state?.subSubIcon || null);
  const [parentSubIcon, setParentSubIcon] = useState(location.state?.parentSubIcon || null);
  const [parentIcon, setParentIcon] = useState(location.state?.parentIcon || null);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [pressed, setPressed] = useState(false);
  const [voiceMode, setVoiceMode] = useState("human");

  useEffect(() => {
    const fetchSubSubIcon = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons/${subSubIconId}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error(`Failed to load sub-sub-icon: ${res.status}`);
        }

        const data = await res.json();
        setSubSubIcon(data);
        setParentSubIcon(data?.subIcon || location.state?.parentSubIcon || null);
        setParentIcon(
          data?.subIcon?.icon ||
            location.state?.parentIcon ||
            location.state?.parentSubIcon?.icon ||
            null,
        );
      } catch (error) {
        console.log(error);
        setSubSubIcon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubSubIcon();
  }, [iconId, subIconId, subSubIconId, location.state?.parentIcon, location.state?.parentSubIcon]);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [speed, volume]);

  const audioUrl = useMemo(
    () => normalizeMediaUrl(subSubIcon?.recordingUrl || subSubIcon?.audioUrl),
    [subSubIcon],
  );

  const imageUrl = useMemo(
    () => normalizeMediaUrl(subSubIcon?.imageUrl || subSubIcon?.imgUrl) || DEFAULT_IMAGE,
    [subSubIcon],
  );

  const speechText = useMemo(
    () => String(subSubIcon?.expression || subSubIcon?.title || "").trim(),
    [subSubIcon],
  );

  const canSpeak = voiceMode !== "human" ? Boolean(speechText) : Boolean(audioUrl);

  const playRecording = () =>
    new Promise((resolve, reject) => {
      const audio = audioRef.current || new Audio();
      audioRef.current = audio;

      audio.pause();
      audio.src = audioUrl;
      audio.currentTime = 0;
      audio.volume = volume;
      audio.playbackRate = speed;

      audio.onended = resolve;
      audio.onerror = () => reject(new Error("Recording playback failed"));

      const playPromise = audio.play();
      if (playPromise?.catch) {
        playPromise.catch(reject);
      }
    });

  const handleSpeak = async () => {
    if (!canSpeak) return;

    try {
      setSpeaking(true);

      const markRoutineItem = () => {
        trackRoutinePlayback({
          ...subSubIcon,
          type: "subsubicon",
          parentTitle: parentSubIcon?.title || "",
          parentCategory: parentIcon?.category || parentSubIcon?.category || "",
          sourcePath: `/icons/${iconId}/subicons/${subIconId}/subsubicons/${subSubIconId}`,
        });
      };

      if (isElevenLabsVoiceMode(voiceMode)) {
        const audioPlayed = await speakWithElevenLabsVoice(speechText, voiceMode);
        if (!audioPlayed) {
          throw new Error("ElevenLabs TTS failed");
        }
        markRoutineItem();
        return;
      }

      if (voiceMode !== "human") {
        const audioPlayed = await speakWithBrowserVoice(speechText, voiceMode);
        if (!audioPlayed) {
          throw new Error("Browser speech is not available");
        }
        markRoutineItem();
        return;
      }

      await playRecording();
      markRoutineItem();
    } catch (error) {
      console.log("SubSubIcon detail audio error:", error);
      alert(error.message || "TTS failed");
    } finally {
      setSpeaking(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (!subSubIcon) {
    return <p className="text-center mt-5">No data.</p>;
  }

  return (
    <div className="subsub-detail-page">
      <div className="subsub-detail-shell">
        <button
          type="button"
          className="subsub-detail-back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div className="subsub-detail-card">
          <button
            type="button"
            className={`subsub-detail-image-button ${pressed ? "is-pressed" : ""}`}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
          >
            <img
              src={imageUrl}
              alt={subSubIcon.title}
              className="subsub-detail-image"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
          </button>

          <div className="subsub-detail-content">
            <h1>{subSubIcon.title}</h1>

            {(parentIcon?.title || parentSubIcon?.title) && (
              <p className="subsub-detail-path">
                {[parentIcon?.title, parentSubIcon?.title].filter(Boolean).join(" / ")}
              </p>
            )}

            <p className="subsub-detail-expression">{subSubIcon.expression}</p>

            <select
              className="subsub-detail-select"
              value={voiceMode}
              onChange={(event) => setVoiceMode(event.target.value)}
            >
              {VOICE_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="subsub-detail-speak"
              onClick={handleSpeak}
              disabled={speaking || !canSpeak}
            >
              {speaking ? "Playing..." : "Speak"}
            </button>

            <div className="subsub-detail-controls">
              <label className="subsub-detail-slider">
                <span>Volume - {Math.round(volume * 100)}%</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
              </label>

              <label className="subsub-detail-slider">
                <span>Speed - {speed.toFixed(2)}x</span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubSubIconDetail;
