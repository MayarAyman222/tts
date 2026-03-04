import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function SubIconDetail() {
  const { iconId, subIconId } = useParams();
  const [subIcon, setSubIcon] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  useEffect(() => {
    const fetchSubIcon = async () => {
      try {
        const res = await fetch(`http://localhost:5000/icons/${iconId}/subicons/${subIconId}`);
        const data = await res.json();
        setSubIcon(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (iconId && subIconId) fetchSubIcon();
  }, [iconId, subIconId]);

  const handleSpeak = () => {
    if (!subIcon || !subIcon.audioUrl) return;

    setLoadingAudio(true);
    const audio = new Audio(subIcon.audioUrl); // استخدمي URL كامل من backend
    audio.play();
    audio.onended = () => setLoadingAudio(false);
  };

  if (!subIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 p-7">
      <Row className="align-items-center w-300 " style={{ Width: "1000px" }}>
        {/* الصورة على الشمال */}
        <Col md={5} className="text-center mb-4 mb-md-0">
          <img
            src={subIcon.imageUrl}
            alt={subIcon.title}
            className="img-fluid rounded shadow"
            style={{ height: "300px" ,width:"600px"}}
          />
        </Col>

        {/* العنوان + التعبير + زر Speak */}
        <Col md={7} className="text-center text-md-start">
          <h2>{subIcon.title}</h2>
          <p className="text-muted fs-5">{subIcon.expression}</p>
          <Button onClick={handleSpeak} disabled={loadingAudio}>
            {loadingAudio ? "جارٍ التشغيل..." : "Speak"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SubIconDetail;
