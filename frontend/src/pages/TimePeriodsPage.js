import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

function TimePeriodsPage() {
  const { mainCategoryId } = useParams();
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/maincategories/${mainCategoryId}/timeperiods`, {
      cache: "no-store"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load time periods: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPeriods(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.log(err);
        setPeriods([]);
      });
  }, [mainCategoryId]);

  return (
    <Container className="app-page main-categories-page">
      <div className="app-page-header">
        <span className="app-kicker">Real Life Activities</span>
        <h2>اختر الفترة</h2>
      </div>

      <Row className="g-4">
        {Array.isArray(periods) &&
          periods.map((period, index) => (
            <Col key={period.id} xs={6} sm={4} md={3} lg={2}>
              <Card
                className="category-card h-100"
                onClick={() => navigate(`/timeperiods/${period.id}/icons`)}
              >
                <Card.Body>
                  <span className="category-card-mark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Card.Title>{period.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default TimePeriodsPage;
