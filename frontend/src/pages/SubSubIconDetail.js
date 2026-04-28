import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, normalizeMediaUrl } from "../api/api";
import "./SubSubIconDetail.css";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");

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

  const handleSpeak = async () => {
    if (!audioUrl) return;

    const audio = audioRef.current || new Audio();
    audioRef.current = audio;

    try {
      setSpeaking(true);
      audio.pause();
      audio.src = audioUrl;
      audio.currentTime = 0;
      audio.volume = volume;
      audio.playbackRate = speed;

      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);

      await audio.play();
    } catch (error) {
      console.log("SubSubIcon detail audio error:", error);
      setSpeaking(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">جاري التحميل...</p>;
  }

  if (!subSubIcon) {
    return <p className="text-center mt-5">لا توجد بيانات.</p>;
  }

  return (
    <div className="subsub-detail-page">
      <div className="subsub-detail-shell">
        <button
          type="button"
          className="subsub-detail-back"
          onClick={() => navigate(-1)}
        >
          رجوع
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

            <button
              type="button"
              className="subsub-detail-speak"
              onClick={handleSpeak}
              disabled={speaking || !audioUrl}
            >
              {audioUrl ? (speaking ? "جاري التشغيل..." : "تشغيل التسجيل") : "لا يوجد تسجيل"}
            </button>

            <div className="subsub-detail-controls">
              <label className="subsub-detail-slider">
                <span>الصوت - {Math.round(volume * 100)}%</span>
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
                <span>السرعة - {speed.toFixed(2)}x</span>
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
