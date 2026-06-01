import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, fetchJson } from "../api/api";

const periodPalette = {
  morning: "#ffb84d",
  noon: "#67c64a",
  afternoon: "#ff8f43",
  evening: "#5f6ee8",
};

const fallbackPeriodColors = ["#ffb84d", "#67c64a", "#ff8f43", "#5f6ee8"];
const fallbackPeriodIcons = ["morning", "noon", "afternoon", "evening"];

const periodIcons = {
  morning: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5V3" />
      <path d="M5.6 7.6 4.2 6.2" />
      <path d="M18.4 7.6 19.8 6.2" />
      <path d="M4 14h16" />
      <path d="M7 14a5 5 0 0 1 10 0" />
      <path d="M3 18h18" />
      <path d="M6 21h12" />
    </svg>
  ),
  noon: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </svg>
  ),
  afternoon: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17h16" />
      <path d="M7 17a5 5 0 0 1 10 0" />
      <path d="M12 9V5" />
      <path d="m8.5 10.5-2-2" />
      <path d="m15.5 10.5 2-2" />
      <path d="M3 21h18" />
    </svg>
  ),
  evening: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
      <path d="M16 4h.01" />
      <path d="M20 8h.01" />
    </svg>
  ),
};

function TimePeriodsPage() {
  const { mainCategoryId } = useParams();
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();

  const normalizePeriodName = (name) =>
    String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

  const getPeriodMeta = (period, index) => {
    const key = normalizePeriodName(period?.name);

    if (key.includes("morning")) {
      return {
        title: "Morning",
        caption: "Start the day",
        icon: "morning",
        color: periodPalette.morning,
      };
    }
    if (key.includes("afternoon")) {
      return {
        title: "Afternoon",
        caption: "Open board",
        icon: "afternoon",
        color: periodPalette.afternoon,
      };
    }
    if (key.includes("noon")) {
      return {
        title: "Noon",
        caption: "Midday board",
        icon: "noon",
        color: periodPalette.noon,
      };
    }
    if (key.includes("evening") || key.includes("night")) {
      return {
        title: "Evening",
        caption: "End the day",
        icon: "evening",
        color: periodPalette.evening,
      };
    }

    return {
      title: period?.name,
      caption: "Open board",
      icon: fallbackPeriodIcons[index % fallbackPeriodIcons.length],
      color: fallbackPeriodColors[index % fallbackPeriodColors.length],
    };
  };

  useEffect(() => {
    fetchJson(`${API_BASE_URL}/maincategories/${mainCategoryId}/timeperiods`, {
      cache: "no-store",
    })
      .then((data) => setPeriods(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.log(err);
        setPeriods([]);
      });
  }, [mainCategoryId]);

  return (
    <Container className="app-page main-categories-page aac-main-categories aac-time-periods-page">
      <div className="aac-home-shell">
        <header className="aac-home-topbar">
          <strong>AAC</strong>
          <span className="aac-profile-dot" aria-hidden="true" />
        </header>

        <section className="aac-home-greeting" dir="rtl">
          <h1>اختر الفترة</h1>
          <p>حدد وقت اليوم المناسب</p>
        </section>

        <div className="aac-category-grid">
          {Array.isArray(periods) &&
            periods.map((period, index) => {
              const meta = getPeriodMeta(period, index);

              return (
                <button
                  key={period.id}
                  type="button"
                  className="aac-category-card"
                  style={{ "--aac-card-color": meta.color }}
                  onClick={() => navigate(`/timeperiods/${period.id}/icons`)}
                >
                  <span className="aac-category-icon">
                    {periodIcons[meta.icon]}
                  </span>
                  <span className="aac-category-copy">
                    <strong>{meta.title}</strong>
                    <small>{meta.caption}</small>
                  </span>
                </button>
              );
            })}
        </div>
      </div>
    </Container>
  );
}

export default TimePeriodsPage;
