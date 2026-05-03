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
import "./SubSubIconsPage.css";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
const TIME_OPTIONS = ["اليوم", "أمس", "غدًا"];
const CONNECTOR_OPTIONS = ["و", "أو", "ثم"];
const VOICE_MODE_OPTIONS = [
  { value: "human", label: "Human Records" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "ai-male", label: "Records with AI - Male" },
  { value: "ai-female", label: "Records with AI - Female" },
];

function SubSubIconsPage() {
  const { iconId, subIconId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeOption, setTimeOption] = useState(TIME_OPTIONS[0]);
  const [connector, setConnector] = useState(CONNECTOR_OPTIONS[0]);
  const [voiceMode, setVoiceMode] = useState("human");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parentSubIcon, setParentSubIcon] = useState(location.state?.parentSubIcon || null);
  const [parentIcon, setParentIcon] = useState(location.state?.parentIcon || null);

  useEffect(() => {
    const fetchSubIcon = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`Failed to load sub icon: ${res.status}`);
        }

        const data = await res.json();
        setParentSubIcon(data);
        setParentIcon(data?.icon || location.state?.parentIcon || null);
      } catch (error) {
        console.log(error);
        setParentSubIcon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubIcon();
  }, [iconId, subIconId, location.state?.parentIcon]);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, []);

  const subSubIcons = useMemo(
    () => (Array.isArray(parentSubIcon?.subSubIcons) ? parentSubIcon.subSubIcons : []),
    [parentSubIcon],
  );

  const filteredSubSubIcons = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return subSubIcons;

    return subSubIcons.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const expression = String(item?.expression || "").toLowerCase();
      return title.includes(normalizedSearch) || expression.includes(normalizedSearch);
    });
  }, [searchTerm, subSubIcons]);

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((currentId) => currentId !== id)
        : [...previous, id],
    );
  };

  const generateSentence = () => {
    const selectedExpressions = subSubIcons
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => String(item?.expression || item?.title || "").trim())
      .filter(Boolean);

    if (!selectedExpressions.length) {
      return "";
    }

    const parentExpression = String(parentSubIcon?.expression || parentSubIcon?.title || "").trim();
    const sentenceStart = [timeOption, parentExpression].filter(Boolean).join(" ");
    return [sentenceStart, selectedExpressions.join(` ${connector} `)]
      .filter(Boolean)
      .join(` ${connector} `)
      .trim();
  };

  const selectedSubSubIcons = useMemo(
    () =>
      selectedIds
        .map((id) => subSubIcons.find((item) => item.id === id))
        .filter(Boolean),
    [selectedIds, subSubIcons],
  );

  const handleSpeak = async () => {
    if (!selectedIds.length) return;

    const audio = audioRef.current || new Audio();
    audioRef.current = audio;

    const playSource = (src) =>
      new Promise((resolve) => {
        audio.pause();
        audio.src = src;
        audio.currentTime = 0;
        audio.onended = resolve;
        audio.onerror = resolve;

        const playPromise = audio.play();
        if (playPromise?.catch) {
          playPromise.catch(() => resolve());
        }
      });

    const markSelectedRoutineItems = () => {
      trackRoutinePlayback(
        selectedSubSubIcons.map((item) => ({
          ...item,
          type: "subsubicon",
          parentTitle: parentSubIcon?.title || "",
          parentCategory: parentIcon?.category || parentSubIcon?.category || "",
          sourcePath: `/icons/${iconId}/subicons/${subIconId}/subsubicons/${item.id}`,
        })),
      );
    };

    setIsPlaying(true);

    try {
      if (isElevenLabsVoiceMode(voiceMode)) {
        const audioPlayed = await speakWithElevenLabsVoice(generateSentence(), voiceMode);
        if (!audioPlayed) {
          throw new Error("ElevenLabs TTS failed");
        }
        markSelectedRoutineItems();
        return;
      }

      if (voiceMode !== "human") {
        const audioPlayed = await speakWithBrowserVoice(generateSentence(), voiceMode);
        if (!audioPlayed) {
          alert("Speech is not available in this browser");
          return;
        }
        markSelectedRoutineItems();
        return;
      }

      const queue = [];
      const parentAudio = parentSubIcon?.recordingUrl || parentSubIcon?.audioUrl;

      if (parentAudio) {
        queue.push(normalizeMediaUrl(parentAudio));
      }

      selectedSubSubIcons.forEach((item) => {
        const audioUrl = item?.recordingUrl || item?.audioUrl;
        if (audioUrl) {
          queue.push(normalizeMediaUrl(audioUrl));
        }
      });

      if (!queue.length) {
        throw new Error("No recording available for the selected items");
      }

      for (const src of queue) {
        await playSource(src);
      }
      markSelectedRoutineItems();
    } catch (error) {
      console.log("TTS playback error:", error);
      alert(error.message || "TTS failed");
    } finally {
      setIsPlaying(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">جاري التحميل...</p>;
  }

  if (!parentSubIcon) {
    return <p className="text-center mt-5">لا توجد بيانات.</p>;
  }

  return (
    <div className="subsub-page">
      <div className="subsub-hero">
        <button
          type="button"
          className="subsub-back"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>

        <h1 className="subsub-title">{parentSubIcon.title}</h1>
        <p className="subsub-subtitle">
          {parentIcon?.title ? `${parentIcon.title} / ${parentSubIcon.title}` : parentSubIcon.expression}
        </p>
      </div>

      <div className="subsub-controls">
        <input
          type="text"
          className="subsub-input"
          placeholder="بحث"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="subsub-select"
          value={connector}
          onChange={(event) => setConnector(event.target.value)}
        >
          {CONNECTOR_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="subsub-select"
          value={timeOption}
          onChange={(event) => setTimeOption(event.target.value)}
        >
          {TIME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="subsub-select"
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
          className="subsub-action"
          onClick={handleSpeak}
          disabled={isPlaying || selectedIds.length === 0}
        >
          {isPlaying ? "جاري التشغيل..." : "تشغيل التسجيلات"}
        </button>
      </div>

      {selectedIds.length > 0 ? (
        <div className="subsub-sentence-box">
          <p className="subsub-sentence-text">{generateSentence()}</p>
          <div className="subsub-preview-row">
            {selectedSubSubIcons.map((item) => (
              <div key={item.id} className="subsub-preview-item">
                <img
                  src={normalizeMediaUrl(item?.imageUrl || item?.imgUrl) || DEFAULT_IMAGE}
                  alt={item.title}
                  className="subsub-preview-image"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {filteredSubSubIcons.length ? (
        <div className={`subsub-grid ${selectedIds.length ? "has-selection" : ""}`}>
          {filteredSubSubIcons.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`subsub-card ${selected ? "is-selected" : ""}`}
              >
                <button
                  type="button"
                  className="subsub-check"
                  onClick={() => toggleSelect(item.id)}
                >
                  {selected ? "✔" : "○"}
                </button>

                <button
                  type="button"
                  className="subsub-card-body"
                  onClick={() =>
                    navigate(
                      `/icons/${iconId}/subicons/${subIconId}/subsubicons/${item.id}`,
                      {
                        state: {
                          subSubIcon: item,
                          parentSubIcon,
                          parentIcon,
                        },
                      },
                    )
                  }
                >
                  <img
                    src={normalizeMediaUrl(item?.imageUrl || item?.imgUrl) || DEFAULT_IMAGE}
                    alt={item.title}
                    className="subsub-card-image"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />

                  <div className="subsub-card-footer">
                    <h3>{item.title}</h3>
                    <p>{item.expression}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-4">لا توجد عناصر فرعية إضافية.</p>
      )}
    </div>
  );
}

export default SubSubIconsPage;
