import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { normalizeMediaUrl } from "../api/api";

function SubIconsPage() {
  const { iconId } = useParams();
  const navigate = useNavigate();

  const [mainIcon, setMainIcon] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeOption, setTimeOption] = useState("الآن");
  const [connector, setConnector] = useState("و");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio());
  const BACKEND_URL = "http://168.231.101.20:5551";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://168.231.101.20:5551/icons/${iconId}`);
        const data = await res.json();
        setMainIcon(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [iconId]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const generateSentence = () => {
    if (!mainIcon) return "";
    const subIcons = mainIcon.subIcons || [];
    const expressions = selectedIds
      .map((id) => {
        const sub = subIcons.find((s) => s.id === id);
        return sub ? sub.expression : "";
      })
      .filter(Boolean);

    if (expressions.length === 0) return "";
    return `${timeOption} ${mainIcon.expression} ${connector} ${expressions.join(
      ` ${connector} `
    )}`;
  };

  const playSelectedSounds = async () => {
    if (!mainIcon) return;
    const subIcons = mainIcon.subIcons || [];
    const selectedSubs = selectedIds
      .map((id) => subIcons.find((s) => s.id === id))
      .filter(Boolean);

    if (selectedSubs.length === 0) return;

    setIsPlaying(true);

    for (let sub of selectedSubs) {
      if (!sub.audioUrl) continue;  
      audioRef.current.src =`${BACKEND_URL}${sub.audioUrl}`;

      await audioRef.current.play();

      await new Promise((resolve) => {
        audioRef.current.onended = resolve;
      });
    }

    setIsPlaying(false);
  };

  if (!mainIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

  const subIcons = mainIcon.subIcons || [];

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">{mainIcon.title}</h2>

      {/* Controls */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <select
          className="form-select w-auto"
          value={timeOption}
          onChange={(e) => setTimeOption(e.target.value)}
        >
          <option value="الآن">الآن</option>
          <option value="بعد شوية">بعد شوية</option>
          <option value="غدًا">غدًا</option>
        </select>

        <select
          className="form-select w-auto"
          value={connector}
          onChange={(e) => setConnector(e.target.value)}
        >
          <option value="و">و</option>
          <option value="ثم">ثم</option>
          <option value="أو">أو</option>
        </select>

        <Button
          variant="primary"
          onClick={playSelectedSounds}
          disabled={isPlaying || selectedIds.length === 0}
        >
          {isPlaying ? "جاري التشغيل..." : "Speak"}
        </Button>
      </div>

      {/* Dynamic sentence */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-light border rounded shadow-sm text-center">
          <strong>الجملة:</strong>
          <div className="mt-2 fs-5 text-primary">{generateSentence()}</div>
        </div>
      )}

      {/* SubIcons Grid */}
      <Row className="g-4">
        {subIcons.map((sub) => (
          <Col key={sub.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`text-center shadow h-100 ${
                selectedIds.includes(sub.id) ? "border-primary border-3" : ""
              }`}
              style={{ cursor: "pointer", position: "relative" }}
              onClick={(e) => {
                if (e.target.type !== "checkbox") {
                  navigate(`/icons/${iconId}/subicons/${sub.id}`);
                }
              }}
            >
              <Card.Img
                variant="top"
                src={`${BACKEND_URL}${sub.imageUrl}`}
                style={{ height: "300px", width: "100%" }}
              />
              <Card.Body>
                <Form.Check
                  type="checkbox"
                  checked={selectedIds.includes(sub.id)}
                  onChange={() => toggleSelect(sub.id)}
                />
                <Card.Title>{sub.title}</Card.Title>
                <Card.Text className="text-muted">{sub.expression}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SubIconsPage;