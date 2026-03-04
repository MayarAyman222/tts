/*import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MainCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/maincategories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Main Categories</h2>
      <Row className="g-4">
        {categories.map(cat => (
          <Col key={cat.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              className="text-center shadow-lg h-100"
             onClick={() => navigate(`/icons/${cat.id}`)}

              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MainCategoriesPage;*/
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MainCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://168.231.101.20:5551/maincategories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container 
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="mb-5 text-center" style={{ fontWeight: "700", fontSize: "2.5rem" }}>
        Main Categories
      </h2>
      <Row className="g-4 w-100 justify-content-center">
        {categories.map(cat => (
          <Col key={cat.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              className="text-center shadow-lg h-100"
              onClick={() => navigate(`/icons/${cat.id}`)}
              style={{ 
                cursor: "pointer", 
                transition: "transform 0.3s, box-shadow 0.3s",
                borderRadius: "15px",
                padding: "1rem"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600" }}>{cat.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MainCategoriesPage;
