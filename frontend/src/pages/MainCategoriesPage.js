import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, fetchJson } from "../api/api";

const categoryPalette = [
  "#8d5cf6",
  "#67c64a",
  "#ff9f43",
  "#2f86c9",
  "#36bec6",
  "#ed5c97",
];

const categoryIcons = {
  mic: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" />
      <path d="M18 11a6 6 0 0 1-12 0" />
      <path d="M12 17v4" />
      <path d="M9 21h6" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h5v5H4z" />
      <path d="M15 4h5v5h-5z" />
      <path d="M4 15h5v5H4z" />
      <path d="M15 15h5v5h-5z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-5 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M8 11h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8h8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z" />
      <path d="M12 4v4" />
      <path d="M9 13h.01" />
      <path d="M15 13h.01" />
      <path d="M10 16h4" />
      <path d="M3 13H1" />
      <path d="M23 13h-2" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7h2l1.5-2h3L15 7h2a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z" />
      <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 3h16Z" />
      <path d="M10 21h4" />
    </svg>
  ),
};

function MainCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const normalizeCategoryName = (name) =>
    String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

  const isDrawingCategory = (cat) =>
    normalizeCategoryName(cat?.name) === "expressyourfeelingsbydrawing";
  const isChatCategory = (cat) =>
    normalizeCategoryName(cat?.name) === "aacassistant" || cat?.route === "/chat";
  const isDailyRoutineCategory = (cat) =>
    normalizeCategoryName(cat?.name) === "dailyroutine" || cat?.route === "/daily-routine";

  useEffect(() => {
    fetchJson(`${API_BASE_URL}/maincategories`)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const goCategory = (cat) => {
    const name = cat.name || "";
    if (cat.route) {
      navigate(cat.route);
      return;
    }
    if (isDrawingCategory(cat)) {
      navigate("/express-drawing");
      return;
    }
    if (isChatCategory(cat)) {
      navigate("/chat");
      return;
    }
    if (isDailyRoutineCategory(cat)) {
      navigate("/daily-routine");
      return;
    }
    if (name === "Real Life Activities") {
      navigate(`/maincategories/${cat.id}/timeperiods`);
      return;
    }
    if (name === "Emergency") {
      navigate("/emergency");
      return;
    }
    if (name === "Try and Train to Speak") {
      navigate("/training");
      return;
    }
    navigate(`/icons/${cat.id}`);
  };

  const visibleCategories = Array.isArray(categories) ? [...categories] : [];
  if (!visibleCategories.some(isDrawingCategory)) {
    visibleCategories.push({
      id: "express-drawing",
      name: "Express Your Feelings By Drawing",
      route: "/express-drawing",
    });
  }
  if (!visibleCategories.some(isChatCategory)) {
    visibleCategories.push({
      id: "aac-assistant",
      name: "AAC Assistant",
      route: "/chat",
    });
  }
  if (!visibleCategories.some(isDailyRoutineCategory)) {
    visibleCategories.push({
      id: "daily-routine",
      name: "Daily Routine",
      route: "/daily-routine",
    });
  }

  const getCategoryMeta = (cat, index) => {
    const name = cat.name || "";
    const key = normalizeCategoryName(name);

    if (key.includes("tryandtrain")) {
      return {
        title: "Try and Train to Speak",
        caption: "Open board",
        icon: "mic",
        color: "#8d5cf6",
      };
    }
    if (key.includes("reallife")) {
      return {
        title: "Real Life Activities",
        caption: "Open board",
        icon: "grid",
        color: "#67c64a",
      };
    }
    if (key.includes("reminder")) {
      return {
        title: "Reminder Me",
        caption: "Open board",
        icon: "chat",
        color: "#ff9f43",
      };
    }
    if (isChatCategory(cat)) {
      return {
        title: "Chatbot",
        caption: "AAC Assistant",
        icon: "robot",
        color: "#2f86c9",
      };
    }
    if (isDrawingCategory(cat)) {
      return {
        title: "Express By Drawing",
        caption: "Open board",
        icon: "camera",
        color: "#36bec6",
      };
    }
    if (key.includes("emergency")) {
      return {
        title: "Emergency",
        caption: "Open board",
        icon: "bell",
        color: "#ed5c97",
      };
    }
    if (key === "all") {
      return {
        title: "All",
        caption: "AAC board",
        icon: "grid",
        color: "#67c64a",
      };
    }
    if (key.includes("favourite") || key.includes("favorite")) {
      return {
        title: "Favourites",
        caption: "Saved symbols",
        icon: "chat",
        color: "#ff9f43",
      };
    }
    if (isDailyRoutineCategory(cat)) {
      return {
        title: "Daily Routine",
        caption: "Open board",
        icon: "grid",
        color: "#67c64a",
      };
    }

    return {
      title: name,
      caption: "Open board",
      icon: "grid",
      color: categoryPalette[index % categoryPalette.length],
    };
  };

  return (
    <Container className="app-page main-categories-page aac-main-categories">
      <div className="aac-home-shell">
        <header className="aac-home-topbar">
          <strong>AAC</strong>
          <span className="aac-profile-dot" aria-hidden="true" />
        </header>

        <section className="aac-home-greeting" dir="rtl">
          <h1>صباح الخير!</h1>
          <p>كيف يمكنني مساعدتك اليوم؟</p>
        </section>

        <div className="aac-category-grid">
          {visibleCategories.map((cat, index) => {
            const meta = getCategoryMeta(cat, index);

            return (
              <button
                key={cat.id}
                type="button"
                className="aac-category-card"
                style={{ "--aac-card-color": meta.color }}
                onClick={() => goCategory(cat)}
              >
                <span className="aac-category-icon">
                  {categoryIcons[meta.icon]}
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

export default MainCategoriesPage;
