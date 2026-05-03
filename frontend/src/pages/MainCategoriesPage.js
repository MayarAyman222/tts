import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

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
    fetch(`${API_BASE_URL}/maincategories`)
      .then((res) => res.json())
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

  const getCategoryTitle = (cat) =>
    isDrawingCategory(cat)
      ? "Express Your Feelings By Drawing"
      : isChatCategory(cat)
        ? "AAC Assistant"
        : isDailyRoutineCategory(cat)
          ? "Daily Routine"
          : cat.name;

  return (
    <Container className="app-page main-categories-page">
      <div className="app-page-header">
        <span className="app-kicker">Voxi</span>
        <h2>Main Categories</h2>
      </div>

      <Row className="g-4 w-100 justify-content-center">
        {visibleCategories.map((cat, index) => {
          const title = getCategoryTitle(cat);

          return (
            <Col key={cat.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="category-card h-100"
                onClick={() => goCategory(cat)}
              >
                <Card.Body>
                  <span className="category-card-mark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Card.Title>{title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default MainCategoriesPage;
