import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

function TimePeriodsPage() {
  const { mainCategoryId } = useParams();
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/maincategories/${mainCategoryId}/timeperiods`)
      .then((res) => res.json())
      .then((data) => setPeriods(data))
      .catch((err) => console.log(err));
  }, [mainCategoryId]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">اختر الفترة</h2>
      <Row className="g-4">
        {Array.isArray(periods) &&
          periods.map((period) => (
            <Col key={period.id} xs={6} sm={4} md={3} lg={2}>
              <Card
                className="text-center shadow h-100"
                onClick={() => navigate(`/timeperiods/${period.id}/icons`)}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Body>
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
