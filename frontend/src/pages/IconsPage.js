import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

function IconsPage() {
  const { mainCategoryId } = useParams();
  const [icons, setIcons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/maincategories/${mainCategoryId}/icons`)
      .then(res => res.json())
      .then(data => setIcons(data))
      .catch(err => console.log(err));
  }, [mainCategoryId]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">choose your category</h2>
      <Row className="g-4">
        {icons.map(icon => (
          <Col key={icon.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="text-center shadow h-100"
              onClick={() => navigate(`/subicons/${icon.id}`)}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Card.Img 
                variant="top" 
                src={icon.imageUrl} 
                style={{ height: "300px", width: "100%" }} 
              />
              <Card.Body>
                <Card.Title>{icon.title}</Card.Title>
                <Card.Text>{icon.expression} </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default IconsPage;
