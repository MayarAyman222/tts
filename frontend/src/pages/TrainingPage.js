import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

const NO_SPEECH_GRACE_MS = 900;
const ATTEMPTS_STORAGE_KEY = "training_attempts_v1";
const PASSING_SCORE = 70;
const NON_SCORABLE_RECOGNITION_ERRORS = new Set([
  "network",
  "service-not-allowed",
  "not-allowed",
  "audio-capture",
  "aborted"
]);

const getScoreMessage = (value) =>
  value >= PASSING_SCORE ? "تم" : "النسبة أقل من المطلوب، حاولي مرة أخرى";

const getBrowserName = () => {
  const userAgent = navigator.userAgent || "";
  if (/Edg\//.test(userAgent)) return "Microsoft Edge";
  if (/OPR\//.test(userAgent)) return "Opera";
  if (/Brave\//.test(userAgent) || navigator.brave) return "Brave";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Chrome\//.test(userAgent)) return "Google Chrome";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "المتصفح الحالي";
};

const getNetworkRecognitionMessage = () => {
  const browserName = getBrowserName();

  if (navigator.onLine === false) {
    return "الجهاز غير متصل بالإنترنت. التعرف على الصوت في Chrome يحتاج اتصال إنترنت.";
  }

  if (browserName !== "Google Chrome") {
    return `أنت تستخدم ${browserName}. التعرف على الصوت في هذه الصفحة يعتمد على خدمة Google Chrome، فافتح localhost:3000/training من Google Chrome مع اتصال إنترنت واسمح بالميكروفون.`;
  }

  return "تعذر الاتصال بخدمة التعرف على الصوت في Google Chrome. تأكد من اتصال الإنترنت، وأوقف VPN أو Proxy إن وجد، واسمح بالميكروفون من إعدادات الموقع.";
};

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

const readStoredAttempts = () => {
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getStoredAttemptsForWord = (word) => {
  const normalizedWord = String(word || "").trim();
  if (!normalizedWord) return [];

  return readStoredAttempts()
    .filter(
      (attempt) =>
        attempt.word === normalizedWord && String(attempt.transcript || "").trim()
    )
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

const clearStoredAttemptsForWord = (word) => {
  const normalizedWord = String(word || "").trim();
  if (!normalizedWord) return;

  const nextAttempts = readStoredAttempts().filter(
    (attempt) => attempt.word !== normalizedWord
  );

  try {
    window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(nextAttempts));
  } catch (err) {
    console.log(err);
  }
};

const saveAttemptForWord = (word, transcript, score) => {
  const normalizedWord = String(word || "").trim();
  const normalizedTranscript = String(transcript || "").trim();
  if (!normalizedWord || !normalizedTranscript) {
    return getStoredAttemptsForWord(normalizedWord);
  }

  const nextAttempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    word: normalizedWord,
    transcript: normalizedTranscript,
    score: Number(score) || 0,
    createdAt: new Date().toISOString()
  };

  const nextAttempts = [...readStoredAttempts(), nextAttempt];

  try {
    window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(nextAttempts));
  } catch (err) {
    console.log(err);
  }

  return getStoredAttemptsForWord(normalizedWord);
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

const AttemptsHistory = ({ attempts }) => {
  if (!attempts.length) {
    return <p className="text-muted mb-0">لا توجد نسب محفوظة بعد.</p>;
  }

  return (
    <div className="table-responsive mt-3">
      <table className="table table-sm align-middle mb-0">
        <thead>
          <tr>
            <th>المحاولة</th>
            <th>النص المسموع</th>
            <th>النسبة</th>
            <th>الوقت</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt, index) => (
            <tr key={attempt.id || `${attempt.createdAt}-${index}`}>
              <td>{index + 1}</td>
              <td>{attempt.transcript}</td>
              <td>{attempt.score}%</td>
              <td>
                {attempt.createdAt
                  ? new Date(attempt.createdAt).toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  const recognitionErrorReasonRef = useRef("");
  const startTimeRef = useRef(0);

  const loadAttempts = async (word) => {
    const trimmed = String(word || "").trim();
    if (!trimmed) {
      setAttempts([]);
      return;
    }
    setAttempts(getStoredAttemptsForWord(trimmed));
  };

  const shouldShowNoResultMessage = (elapsed) => {
    if (gotResultRef.current || !targetWord.trim() || elapsed < NO_SPEECH_GRACE_MS) {
      return false;
    }

    if (NON_SCORABLE_RECOGNITION_ERRORS.has(recognitionErrorReasonRef.current)) {
      return false;
    }

    return (
      userStopRef.current ||
      !hadErrorRef.current ||
      recognitionErrorReasonRef.current === "no-speech"
    );
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
      setError("افتح التطبيق من https://tts-production-77b9.up.railway.app أو استخدم HTTPS.");
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
    if (navigator.onLine === false) {
      setError(getNetworkRecognitionMessage());
      return;
    }

    setTranscript("");
    setScore(null);
    setMessage("");
    setImprovement(null);
    hadErrorRef.current = false;
    gotResultRef.current = false;
    userStopRef.current = false;
    recognitionErrorReasonRef.current = "";
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
      const text = String(event.results?.[0]?.[0]?.transcript || "").trim();
      gotResultRef.current = true;

      if (!text) {
        setTranscript("");
        setScore(null);
        setMessage("");
        setError("المتصفح لم يحول الصوت إلى كلام واضح. جرّبي كلمة أو جملة أوضح.");
        return;
      }

      setTranscript(text);
      setError("");

      const newScore = calcScore(targetWord, text);
      setScore(newScore);
      setMessage(getScoreMessage(newScore));

      const previousAttempts = getStoredAttemptsForWord(targetWord);
      const lastScore = previousAttempts.length
        ? previousAttempts[previousAttempts.length - 1].score
        : null;
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

      const updatedAttempts = saveAttemptForWord(targetWord, text, newScore);
      setAttempts(updatedAttempts);
    };

    recognition.onerror = (event) => {
      const reason = event?.error || "unknown";
      hadErrorRef.current = true;
      recognitionErrorReasonRef.current = reason;
      if (reason === "no-speech") {
        setTranscript("");
        setScore(null);
        setMessage("");
        setError("لم يتم سماع صوت. اقترب من الميكروفون وتكلم بوضوح.");
      } else if (reason === "audio-capture") {
        setError("الميكروفون غير متاح أو مشغول.");
      } else if (reason === "not-allowed") {
        setError("الرجاء السماح بالوصول للميكروفون من المتصفح.");
      } else if (reason === "aborted") {
        setError("تم إيقاف التعرف على الصوت.");
      } else if (reason === "network") {
        setTranscript("");
        setScore(null);
        setMessage("");
        setError(getNetworkRecognitionMessage());
      } else if (reason === "service-not-allowed") {
        setError("خدمة التعرف على الصوت غير مسموح بها.");
      } else {
        setError(`تعذر التعرف على الصوت. السبب: ${reason}`);
      }
    };

    recognition.onend = () => {
      setListening(false);
      const elapsed = Date.now() - startTimeRef.current;
      if (shouldShowNoResultMessage(elapsed)) {
        setTranscript("");
        setScore(null);
        setMessage("");
        setError(
          userStopRef.current
            ? "تم إيقاف التسجيل قبل التقاط كلام واضح."
            : "لم يتم التقاط أي كلام. جرّبي التحدث أقرب للميكروفون وبكلمة واضحة."
        );
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

  const resetCurrentWordAttempts = () => {
    clearStoredAttemptsForWord(targetWord);
    setAttempts([]);
    setScore(null);
    setMessage("");
    setImprovement(null);
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
              <div className="d-flex justify-content-between gap-2 align-items-center mb-2">
                <Card.Title className="mb-0">التقدم</Card.Title>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={resetCurrentWordAttempts}
                  disabled={!targetWord.trim() || attempts.length === 0}
                >
                  مسح المحاولات
                </Button>
              </div>
              <LineChart data={attempts.map((a) => a.score)} />
              <h6 className="mt-3">النسبة في كل محاولة</h6>
              <AttemptsHistory attempts={attempts} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TrainingPage;
