import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { API_BASE_URL } from "../api/api";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

const NO_SPEECH_GRACE_MS = 900;

const normalizeText = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[^\p{L}\p{N} ]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
};

const levenshteinDistance = (a, b) => {
  const s = normalizeText(a);
  const t = normalizeText(b);
  if (!s && !t) return 0;
  if (!s) return t.length;
  if (!t) return s.length;

  const dp = Array.from({ length: s.length + 1 }, () =>
    new Array(t.length + 1).fill(0)
  );

  for (let i = 0; i <= s.length; i++) dp[i][0] = i;
  for (let j = 0; j <= t.length; j++) dp[0][j] = j;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[s.length][t.length];
};

const calcScore = (target, transcript) => {
  const s = normalizeText(target);
  const t = normalizeText(transcript);
  if (!s && !t) return 100;
  if (!s || !t) return 0;
  const dist = levenshteinDistance(s, t);
  const maxLen = Math.max(s.length, t.length);
  const ratio = maxLen === 0 ? 1 : 1 - dist / maxLen;
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
};

const LineChart = ({ data }) => {
  if (!data.length) return <p className="text-center">لا توجد محاولات بعد.</p>;

  const width = 600;
  const height = 220;
  const padding = 20;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = data.length === 1 ? 0 : (idx / (data.length - 1)) * usableW;
    const y = usableH - (val / 100) * usableH;
    return `${x + padding},${y + padding}`;
  });

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="#f7f7f7" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
      <polyline fill="none" stroke="#dc3545" strokeWidth="3" points={points.join(" ")} />
      {points.map((pt, idx) => {
        const [cx, cy] = pt.split(",").map(Number);
        return <circle key={idx} cx={cx} cy={cy} r="4" fill="#dc3545" />;
      })}
    </svg>
  );
};

function TrainingPage() {
  const [targetWord, setTargetWord] = useState("");
  const [language, setLanguage] = useState("ar-EG");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");
  const [improvement, setImprovement] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const hadErrorRef = useRef(false);
  const gotResultRef = useRef(false);
  const userStopRef = useRef(false);
  const startTimeRef = useRef(0);

  const loadAttempts = async (word) => {
    const trimmed = String(word || "").trim();
    if (!trimmed) {
      setAttempts([]);
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE_URL}/speech/attempts?word=${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();
      setAttempts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAttempts(targetWord);
  }, [targetWord]);

  const startRecording = async () => {
    setError("");
    const host = window.location.hostname;
    const allowInsecure =
      host === "localhost" || host === "127.0.0.1" || host === "[::1]";
    if (!window.isSecureContext && !allowInsecure) {
      setError("افتح التطبيق من http://localhost:3000 أو استخدم HTTPS.");
      return;
    }
    if (!SpeechRecognition) {
      setError("المتصفح لا يدعم التعرف على الصوت. استخدم Chrome.");
      return;
    }
    if (!targetWord.trim()) {
      setError("اكتب الكلمة أولا.");
      return;
    }

    setTranscript("");
    setScore(null);
    setMessage("");
    setImprovement(null);
    hadErrorRef.current = false;
    gotResultRef.current = false;
    userStopRef.current = false;
    startTimeRef.current = Date.now();

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error(err);
      if (err.name === "NotAllowedError") {
        setError("الرجاء السماح بالوصول للميكروفون من إعدادات المتصفح.");
      } else {
        setError("تعذر الوصول للميكروفون. تأكد من السماح في المتصفح وويندوز.");
      }
      return;
    }

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      stream.getTracks().forEach((track) => track.stop());
    };
    recorder.start();

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript || "";
      gotResultRef.current = true;
      setTranscript(text);

      const newScore = calcScore(targetWord, text);
      setScore(newScore);

      if (newScore >= 70) {
        setMessage("تم");
      } else {
        setMessage("Fail and try again");
      }

      const lastScore = attempts.length ? attempts[attempts.length - 1].score : null;
      if (lastScore !== null) {
        const delta = newScore - lastScore;
        if (delta > 0) {
          setImprovement(`تحسنت بنسبة ${delta}% عن آخر مرة`);
        } else if (delta < 0) {
          setImprovement(`قلت بنسبة ${Math.abs(delta)}% عن آخر مرة`);
        } else {
          setImprovement("لم تتحسن عن آخر مرة");
        }
      }

      fetch(`${API_BASE_URL}/speech/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: targetWord.trim(),
          transcript: text,
          score: newScore
        })
      })
        .then(() => loadAttempts(targetWord))
        .catch((err) => console.log(err));
    };

    recognition.onerror = (event) => {
      const reason = event?.error || "unknown";
      hadErrorRef.current = true;
      if (reason === "no-speech") {
        setError("لم يتم سماع صوت. اقترب من الميكروفون وتكلم بوضوح.");
      } else if (reason === "audio-capture") {
        setError("الميكروفون غير متاح أو مشغول.");
      } else if (reason === "not-allowed") {
        setError("الرجاء السماح بالوصول للميكروفون من المتصفح.");
      } else if (reason === "aborted") {
        setError("تم إيقاف التعرف على الصوت.");
      } else if (reason === "network") {
        setError("مشكلة في الشبكة أثناء التعرف على الصوت (Chrome يحتاج إنترنت).");
      } else if (reason === "service-not-allowed") {
        setError("خدمة التعرف على الصوت غير مسموح بها.");
      } else {
        setError(`تعذر التعرف على الصوت. السبب: ${reason}`);
      }
    };

    recognition.onend = () => {
      setListening(false);
      const elapsed = Date.now() - startTimeRef.current;
      if (
        !gotResultRef.current &&
        !hadErrorRef.current &&
        !userStopRef.current &&
        elapsed >= NO_SPEECH_GRACE_MS
      ) {
        setError("لم يتم التقاط أي كلام. جرّب التحدث أقرب للميكروفون.");
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };

    recognitionRef.current = recognition;
    setListening(true);

    try {
      recognition.start();
    } catch (err) {
      console.error(err);
      hadErrorRef.current = true;
      setError("تعذر بدء التعرف على الصوت.");
      setListening(false);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    }
  };

  const stopRecording = () => {
    userStopRef.current = true;
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "1100px" }}>
      <h2 className="mb-4 text-center">Try and Train to Speak</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col xs={12} md={5}>
              <Form.Group>
                <Form.Label>الكلمة أو الجملة</Form.Label>
                <Form.Control
                  value={targetWord}
                  onChange={(e) => setTargetWord(e.target.value)}
                  placeholder="اكتب الكلمة هنا"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>اللغة</Form.Label>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="ar-EG">العربية (مصر)</option>
                  <option value="ar-SA">العربية (السعودية)</option>
                  <option value="en-US">English</option>
                  <option value="fr-FR">Français</option>
                  <option value="es-ES">Español</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="d-flex gap-2">
              <Button variant="danger" onClick={startRecording} disabled={listening}>
                Start Recording
              </Button>
              <Button variant="secondary" onClick={stopRecording} disabled={!listening}>
                Stop
              </Button>
            </Col>
          </Row>

          {error && (
            <Alert variant="warning" className="mt-3">
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Row className="g-3">
        <Col xs={12} md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>النتيجة</Card.Title>
              <p>
                <strong>النص:</strong> {transcript || "-"}
              </p>
              <p>
                <strong>النسبة:</strong> {score === null ? "-" : `${score}%`}
              </p>
              {message && <Alert variant={score >= 70 ? "success" : "danger"}>{message}</Alert>}
              {improvement && <p>{improvement}</p>}
              {audioUrl && (
                <div className="mt-3">
                  <p>
                    <strong>التسجيل:</strong>
                  </p>
                  <audio controls src={audioUrl} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>التقدم</Card.Title>
              <LineChart data={attempts.map((a) => a.score)} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TrainingPage;
