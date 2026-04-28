import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API_BASE_URL, normalizeMediaUrl } from "../api/api";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
function SubIconDetail() {
  const { iconId, subIconId } = useParams();
  const [subIcon, setSubIcon] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  useEffect(() => {
    const fetchSubIcon = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}`);
        const data = await res.json();
        setSubIcon(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (iconId && subIconId) fetchSubIcon();
  }, [iconId, subIconId]);

  const audioUrl = normalizeMediaUrl(subIcon?.recordingUrl || subIcon?.audioUrl);

  const handleSpeak = async () => {
    if (!audioUrl) return;

    setLoadingAudio(true);
    const audio = new Audio(audioUrl);
    audio.onended = () => setLoadingAudio(false);
    audio.onerror = () => setLoadingAudio(false);

    try {
      await audio.play();
    } catch (error) {
      console.log("SubIcon audio error:", error);
      setLoadingAudio(false);
    }
  };

  if (!subIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 p-7">
      <Row className="align-items-center w-300 " style={{ Width: "1000px" }}>
        {/* الصورة على الشمال */}
        <Col md={5} className="text-center mb-4 mb-md-0">
          <img
            src={normalizeMediaUrl(subIcon.imageUrl)}
            alt={subIcon.title}
            className="img-fluid rounded shadow"
            style={{ height: "300px" ,width:"600px"}}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </Col>

        {/* العنوان + التعبير + زر Speak */}
        <Col md={7} className="text-center text-md-start">
          <h2>{subIcon.title}</h2>
          <p className="text-muted fs-5">{subIcon.expression}</p>
          <Button onClick={handleSpeak} disabled={loadingAudio || !audioUrl}>
            {audioUrl ? (loadingAudio ? "جارٍ التشغيل..." : "Speak") : "لا يوجد تسجيل"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SubIconDetail;
