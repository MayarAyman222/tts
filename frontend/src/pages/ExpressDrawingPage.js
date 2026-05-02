import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { recognizeDrawing, speakDrawingText } from "../api/api";
import "./ExpressDrawingPage.css";

const LANGUAGES = [
  { value: "ar-EG", label: "العربية (مصر)" },
  { value: "ar-SA", label: "العربية (السعودية)" },
  { value: "en-US", label: "English (US)" },
  { value: "fr-FR", label: "Francais" },
  { value: "es-ES", label: "Espanol" },
];

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 360;

const getCanvasPoint = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const source = event.touches?.[0] || event.changedTouches?.[0] || event;
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (source.clientX - rect.left) * scaleX,
    y: (source.clientY - rect.top) * scaleY,
  };
};

const paintCanvasBackground = (canvas) => {
  const context = canvas.getContext("2d");
  context.save();
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
};

function ExpressDrawingPage() {
  const canvasRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const drawingRef = useRef(false);
  const hasDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const audioRef = useRef(null);

  const [language, setLanguage] = useState("ar-EG");
  const [recognizedText, setRecognizedText] = useState("");
  const [editableText, setEditableText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [hasDrawing, setHasDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#111827";
    context.lineWidth = 10;
  }, []);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, []);

  const syncPreview = () => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas || !previewCanvas) return;

    const context = previewCanvas.getContext("2d");
    context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
    context.drawImage(canvas, 0, 0, previewCanvas.width, previewCanvas.height);
  };

  const startDrawing = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    setError("");
    drawingRef.current = true;
    hasDrawingRef.current = true;
    setHasDrawing(true);
    lastPointRef.current = getCanvasPoint(event, canvas);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const point = getCanvasPoint(event, canvas);
    const previous = lastPointRef.current || point;

    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(point.x, point.y);
    context.stroke();

    lastPointRef.current = point;
    syncPreview();
  };

  const stopDrawing = (event) => {
    if (event?.preventDefault) event.preventDefault();
    drawingRef.current = false;
    lastPointRef.current = null;
    syncPreview();
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (previewCanvas) {
      const previewContext = previewCanvas.getContext("2d");
      previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      previewContext.fillStyle = "#ffffff";
      previewContext.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
    }

    hasDrawingRef.current = false;
    setHasDrawing(false);
    setError("");
  };

  const handleRecognize = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawingRef.current) {
      setError("Draw something first.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      paintCanvasBackground(canvas);
      const imageDataUrl = canvas.toDataURL("image/png");
      const result = await recognizeDrawing({ imageDataUrl, language });
      const nextText = String(result?.text || "").trim();

      setRecognizedText(nextText);
      setEditableText(nextText);

      if (!nextText) {
        setError("No text or feeling was recognized. Try drawing larger and clearer.");
      }
    } catch (err) {
      setError(err.message || "Drawing recognition failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSpeak = async () => {
    const text = editableText.trim();
    if (!text) {
      setError("Type or recognize text first.");
      return;
    }

    setSpeaking(true);
    setError("");

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      const result = await speakDrawingText(text, language);
      if (!result?.ok || !result?.url) {
        throw new Error(result?.message || "TTS failed.");
      }

      const audio = new Audio(result.url);
      audioRef.current = audio;
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
      await audio.play();
    } catch (err) {
      setError(err.message || "TTS failed.");
      setSpeaking(false);
    }
  };

  return (
    <Container className="express-drawing-page">
      <div className="express-drawing-header">
        <h1>Express Your Feelings By Drawing</h1>
        <p>Draw text or a simple feeling, let the app recognize it, edit the phrase, then play it as speech.</p>
      </div>

      <Row className="g-3">
        <Col xs={12} lg={8}>
          <Card className="express-drawing-card">
            <Card.Body>
              <div className="express-drawing-toolbar">
                <Form.Group className="express-drawing-language">
                  <Form.Label>Language</Form.Label>
                  <Form.Select value={language} onChange={(event) => setLanguage(event.target.value)}>
                    {LANGUAGES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="express-drawing-actions">
                  <Button variant="outline-danger" onClick={clearDrawing} disabled={!hasDrawing}>
                    Clear
                  </Button>
                  <Button variant="primary" onClick={handleRecognize} disabled={processing}>
                    {processing ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Recognizing...
                      </>
                    ) : (
                      "Run OCR"
                    )}
                  </Button>
                </div>
              </div>

              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="express-drawing-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="express-drawing-card h-100">
            <Card.Body>
              <Card.Title>Image Preview</Card.Title>
              <canvas
                ref={previewCanvasRef}
                width={CANVAS_WIDTH}
                height={220}
                className="express-drawing-preview"
              />

              <Form.Group className="mt-3">
                <Form.Label>Recognized phrase</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={editableText}
                  onChange={(event) => setEditableText(event.target.value)}
                  placeholder="Recognized text will appear here."
                />
              </Form.Group>

              {recognizedText ? (
                <p className="express-drawing-raw">Raw OCR: {recognizedText}</p>
              ) : null}

              <div className="express-drawing-actions mt-3">
                <Button variant="success" onClick={handleSpeak} disabled={speaking}>
                  {speaking ? "Speaking..." : "Speak Text"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setRecognizedText("");
                    setEditableText("");
                    setError("");
                  }}
                >
                  Clear Text
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error ? (
        <Alert variant="warning" className="mt-3">
          {error}
        </Alert>
      ) : null}
    </Container>
  );
}

export default ExpressDrawingPage;
