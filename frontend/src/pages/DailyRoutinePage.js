import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isElevenLabsVoiceMode,
  normalizeMediaUrl,
  speakWithBrowserVoice,
  speakWithElevenLabsVoice,
} from "../api/api";
import {
  DAILY_ROUTINE_THRESHOLD,
  clearDailyRoutineItems,
  getDailyRoutineItems,
  removeDailyRoutineItem,
} from "../utils/dailyRoutine";
import "./SubSubIconsPage.css";
import "./DailyRoutinePage.css";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
const VOICE_MODE_OPTIONS = [
  { value: "human", label: "Human Records" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "ai-male", label: "Records with AI - Male" },
  { value: "ai-female", label: "Records with AI - Female" },
];

function DailyRoutinePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [items, setItems] = useState([]);
  const [voiceMode, setVoiceMode] = useState("human");
  const [isPlaying, setIsPlaying] = useState(false);

  const refreshItems = () => {
    setItems(getDailyRoutineItems());
  };

  useEffect(() => {
    refreshItems();
  }, []);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, []);

  const groupedItems = useMemo(
    () =>
      items.reduce((groups, item) => {
        const groupName = item.parentTitle || item.category || "Daily Routine";
        return {
          ...groups,
          [groupName]: [...(groups[groupName] || []), item],
        };
      }, {}),
    [items],
  );

  const removeItem = (key) => {
    removeDailyRoutineItem(key);
    refreshItems();
  };

  const clearAll = () => {
    clearDailyRoutineItems();
    refreshItems();
  };

  const getRoutineSpeechText = (item) =>
    String(item?.expression || item?.title || "").trim();

  const playSource = (src) =>
    new Promise((resolve) => {
      if (!src) {
        resolve(false);
        return;
      }

      const audio = audioRef.current || new Audio();
      audioRef.current = audio;
      audio.pause();
      audio.src = src;
      audio.currentTime = 0;
      audio.onended = () => resolve(true);
      audio.onerror = () => resolve(false);

      const playPromise = audio.play();
      if (playPromise?.catch) {
        playPromise.catch(() => resolve(false));
      }
    });

  const speakRoutineItem = async (item) => {
    const text = getRoutineSpeechText(item);
    const audioUrl = normalizeMediaUrl(item?.audioUrl);

    if (isElevenLabsVoiceMode(voiceMode)) {
      return speakWithElevenLabsVoice(text, voiceMode);
    }

    if (voiceMode === "human" && audioUrl) {
      const played = await playSource(audioUrl);
      if (played) return true;
    }

    return speakWithBrowserVoice(text, voiceMode === "human" ? "female" : voiceMode);
  };

  const speakItems = async (routineItems) => {
    if (!routineItems.length || isPlaying) return;

    setIsPlaying(true);

    try {
      for (const item of routineItems) {
        const played = await speakRoutineItem(item);
        if (!played) {
          throw new Error("Speech is not available for this item");
        }
      }
    } catch (error) {
      console.log("Daily routine TTS error:", error);
      alert(error.message || "TTS failed");
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="subsub-page daily-routine-page">
      <div className="subsub-hero daily-routine-hero">
        <button
          type="button"
          className="subsub-back"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>

        <p className="daily-routine-kicker">Daily Routine</p>
        <h1 className="subsub-title">روتيني اليومي</h1>
        <p className="subsub-subtitle">
          أي عنصر يتم تشغيله {DAILY_ROUTINE_THRESHOLD} مرات أو أكثر يظهر هنا تلقائيا.
        </p>

        <div className="daily-routine-stats">
          <span>{items.length} عناصر ثابتة</span>
          <button type="button" onClick={clearAll} disabled={!items.length}>
            مسح الروتين
          </button>
        </div>

        <div className="subsub-controls daily-routine-controls">
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
            onClick={() => speakItems(items)}
            disabled={!items.length || isPlaying}
          >
            {isPlaying ? "جاري التشغيل..." : "تشغيل الروتين"}
          </button>
        </div>
      </div>

      {items.length ? (
        <div className="daily-routine-sections">
          {Object.entries(groupedItems).map(([groupName, groupItems]) => (
            <section key={groupName} className="daily-routine-section">
              <h2>{groupName}</h2>

              <div className="subsub-grid daily-routine-grid">
                {groupItems.map((item) => (
                  <div key={item.key} className="subsub-card daily-routine-card">
                    <span className="daily-routine-count">
                      {item.speakCount} مرات
                    </span>

                    <button
                      type="button"
                      className="subsub-card-body"
                      onClick={() => item.sourcePath && navigate(item.sourcePath)}
                    >
                      <img
                        src={normalizeMediaUrl(item.imageUrl) || DEFAULT_IMAGE}
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

                    <div className="daily-routine-card-actions">
                      <button
                        type="button"
                        className="daily-routine-speak"
                        onClick={() => speakItems([item])}
                        disabled={isPlaying}
                      >
                        تشغيل
                      </button>

                      <button
                        type="button"
                        className="daily-routine-remove"
                        onClick={() => removeItem(item.key)}
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="daily-routine-empty">
          <h2>لسه مفيش روتين محفوظ</h2>
          <p>
            اختاري أي SubIcon أو SubSubIcon واضغطي Speak / تشغيل التسجيلات 3 مرات.
            بعدها هيظهر هنا تلقائيا.
          </p>
          <button type="button" onClick={() => navigate("/main-categories")}>
            ابدأي من التصنيفات
          </button>
        </div>
      )}
    </div>
  );
}

export default DailyRoutinePage;
