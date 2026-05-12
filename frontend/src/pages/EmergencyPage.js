import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import {
  API_BASE_URL,
  fetchJson,
  getAacMessages,
  speakWithBrowserVoice,
  speakWithElevenLabsVoice,
} from "../api/api";
import { AppContext } from "../context/AppContext";

function normalizePhoneForWhatsApp(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) return `20${digits.slice(1)}`;
  if (digits.startsWith("20")) return digits;
  return digits;
}

function formatMessageTime(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getAacAnnouncement(item) {
  const readableAnnouncement = `${item.senderName} sent you a message: ${item.message}`;
  if (readableAnnouncement) return readableAnnouncement;

  return `${item.senderName} بعتلك رسالة: ${item.message}`;
}

function getMessageTitle(item) {
  const readableTitle =
    item.source === "whatsapp"
      ? `${item.senderName} replied on WhatsApp`
      : `${item.senderName} sent you a message`;
  if (readableTitle) return readableTitle;

  if (item.source === "whatsapp") {
    return `${item.senderName} replied on WhatsApp`;
  }

  return `${item.senderName} بعتلك رسالة`;
}

function getNotificationTitle(item) {
  return item.source === "whatsapp" ? "New WhatsApp reply" : "New message for you";
}

const getDisplayName = (account) =>
  [account?.firstName, account?.lastName].filter(Boolean).join(" ").trim() ||
  account?.email ||
  "User";

function EmergencyPage() {
  const { user } = useContext(AppContext);
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [aacMessages, setAacMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState("");
  const [incomingNotice, setIncomingNotice] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);
  const [autoSpeakStatus, setAutoSpeakStatus] = useState("");
  const seenMessageIdsRef = useRef(new Set());
  const messagesReadyRef = useRef(false);
  const autoSpeakEnabledRef = useRef(false);
  const currentUserName = getDisplayName(user);

  const [showAdd, setShowAdd] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newLabelAr, setNewLabelAr] = useState("");
  const [newLabelFr, setNewLabelFr] = useState("");
  const [newLabelEs, setNewLabelEs] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [message, setMessage] = useState("");

  const speakIncomingMessage = useCallback(async (item, { alertOnError = false } = {}) => {
    const text = getAacAnnouncement(item);
    if (!text.trim()) return;

    setSpeakingMessageId(item.id);
    try {
      let played = false;

      try {
        played = await speakWithElevenLabsVoice(text, "ai-female");
      } catch (err) {
        played = false;
      }

      if (!played) {
        await speakWithBrowserVoice(text, "female");
      }
    } catch (err) {
      if (alertOnError) {
        alert(err.message || "TTS failed");
      }
    } finally {
      setSpeakingMessageId(null);
    }
  }, []);

  const loadEmergencyNumbers = useCallback(async () => {
    try {
      const data = await fetchJson(`${API_BASE_URL}/emergency-numbers`, {
        cache: "no-store",
      });
      setNumbers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setNumbers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadIncomingMessages = useCallback(async ({ silent = false } = {}) => {
    if (!user?.id) {
      if (!silent) {
        setMessagesLoading(false);
        setMessagesError("");
      }
      setAacMessages([]);
      return;
    }

    if (!silent) {
      setMessagesLoading(true);
      setMessagesError("");
    }

    try {
      const data = await getAacMessages({ limit: 20, receiverId: user.id });
      const messages = Array.isArray(data) ? data : [];
      const newMessages = messages.filter((item) => !seenMessageIdsRef.current.has(item.id));

      if (messagesReadyRef.current && newMessages.length) {
        const newestMessage = newMessages[0];
        setIncomingNotice(newestMessage);

        if (autoSpeakEnabledRef.current) {
          speakIncomingMessage(newestMessage);
        }
      }

      messages.forEach((item) => seenMessageIdsRef.current.add(item.id));
      messagesReadyRef.current = true;
      setAacMessages(messages);
    } catch (err) {
      if (!silent) {
        setAacMessages([]);
        setMessagesError(err.message || "Failed to load AAC messages.");
      }
    } finally {
      if (!silent) {
        setMessagesLoading(false);
      }
    }
  }, [speakIncomingMessage, user?.id]);

  useEffect(() => {
    seenMessageIdsRef.current = new Set();
    messagesReadyRef.current = false;
    setIncomingNotice(null);
    setAacMessages([]);
    setMessagesLoading(Boolean(user?.id));
    autoSpeakEnabledRef.current = false;
    setAutoSpeakEnabled(false);
    setAutoSpeakStatus("");
  }, [user?.id]);

  useEffect(() => {
    loadEmergencyNumbers();
    loadIncomingMessages();

    const intervalId = window.setInterval(() => {
      loadIncomingMessages({ silent: true });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [loadEmergencyNumbers, loadIncomingMessages]);

  const handleAddNumber = async () => {
    const trimmed = newNumber.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/emergency-numbers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: trimmed,
          label: newLabel.trim() || newLabelAr.trim() || newLabelFr.trim() || newLabelEs.trim(),
          label_en: newLabel.trim(),
          label_ar: newLabelAr.trim(),
          label_fr: newLabelFr.trim(),
          label_es: newLabelEs.trim(),
        }),
      });
      if (!res.ok) {
        throw new Error(`Failed to save emergency number: ${res.status}`);
      }
      const created = await res.json();
      setNumbers((prev) => {
        const exists = prev.some((n) => n.number === created.number);
        return exists ? prev : [...prev, created];
      });

      setShowAdd(false);
      setNewNumber("");
      setNewLabel("");
      setNewLabelAr("");
      setNewLabelFr("");
      setNewLabelEs("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = () => {
    const phone = normalizePhoneForWhatsApp(selectedNumber);
    if (!phone) return;
    const text = encodeURIComponent(message || "");
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
    setShowMessage(false);
  };

  const handleSpeakIncomingMessage = async (item) => {
    await speakIncomingMessage(item, { alertOnError: true });
  };

  const handleEnableAutoSpeak = async () => {
    autoSpeakEnabledRef.current = true;
    setAutoSpeakEnabled(true);
    setAutoSpeakStatus("Auto speak is on. New messages sent to your account will be spoken automatically.");

    try {
      const autoSpeakPreview = "Auto speak is on";
      if (autoSpeakPreview) {
        await speakWithBrowserVoice(autoSpeakPreview, "female");
        return;
      }

      await speakWithBrowserVoice("تم تشغيل قراءة الرسائل", "female");
    } catch (err) {
      console.log(err);
    }
  };

  const getLabel = (item) =>
    item.label_en || item.label_ar || item.label_fr || item.label_es || item.label || "Emergency Number";

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: "1000px" }}>
      <h2 className="mb-4 text-center">Emergency</h2>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <Button variant="danger" onClick={() => setShowAdd(true)}>
          Add Emergency Number
        </Button>
        <Button variant="warning" onClick={() => setShowMessage(true)}>
          Send Urgent Message
        </Button>
        <Button variant="outline-primary" href="/message">
          AAC Message Page
        </Button>
        <Button
          variant={autoSpeakEnabled ? "success" : "outline-success"}
          onClick={handleEnableAutoSpeak}
          disabled={autoSpeakEnabled || !user}
        >
          {autoSpeakEnabled ? "Auto Speak On" : "Enable Auto Speak"}
        </Button>
      </div>

      {user ? (
        <Alert variant="light" className="border">
          Receiving emergency messages for <strong>{currentUserName}</strong>.
        </Alert>
      ) : (
        <Alert variant="warning" className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <span>Login to receive messages sent specifically to your account.</span>
          <Button variant="outline-dark" size="sm" href="/login">
            Login
          </Button>
        </Alert>
      )}

      {autoSpeakStatus && <Alert variant="success">{autoSpeakStatus}</Alert>}

      {incomingNotice && (
        <Alert
          variant={incomingNotice.source === "whatsapp" ? "success" : "info"}
          dismissible
          onClose={() => setIncomingNotice(null)}
        >
          <div className="fw-semibold">{getNotificationTitle(incomingNotice)}</div>
          <div>{getMessageTitle(incomingNotice)}</div>
          <div style={{ whiteSpace: "pre-wrap" }}>{incomingNotice.message}</div>
        </Alert>
      )}

      <section className="mb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h4 className="mb-0">Incoming Messages</h4>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={loadIncomingMessages}
            disabled={messagesLoading || !user}
          >
            {messagesLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {messagesError && <Alert variant="warning">{messagesError}</Alert>}

        {!user ? (
          <Alert variant="info" className="mb-0">
            Login first, then this inbox will show messages that other users send to you.
          </Alert>
        ) : messagesLoading ? (
          <p className="text-center mb-0">Loading messages...</p>
        ) : aacMessages.length ? (
          <Row className="g-3">
            {aacMessages.map((item) => (
              <Col key={item.id} xs={12} md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{getMessageTitle(item)}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {formatMessageTime(item.createdAt)}
                    </Card.Subtitle>
                    <Card.Text style={{ whiteSpace: "pre-wrap" }}>{item.message}</Card.Text>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleSpeakIncomingMessage(item)}
                      disabled={speakingMessageId === item.id}
                    >
                      {speakingMessageId === item.id ? "Speaking..." : "Speak"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info" className="mb-0">
            No messages yet. Ask another logged-in user to choose your account from the AAC Message page.
          </Alert>
        )}
      </section>

      <section>
        <h4 className="mb-3">Emergency Numbers</h4>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Row className="g-3">
            {numbers.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{getLabel(item)}</Card.Title>
                    <Card.Text>{item.number}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Emergency Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Number</Form.Label>
            <Form.Control
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="010XXXXXXXX"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Label (English)</Form.Label>
            <Form.Control
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Fire"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Label (Arabic)</Form.Label>
            <Form.Control
              value={newLabelAr}
              onChange={(e) => setNewLabelAr(e.target.value)}
              placeholder="إطفاء"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Label (French)</Form.Label>
            <Form.Control
              value={newLabelFr}
              onChange={(e) => setNewLabelFr(e.target.value)}
              placeholder="Feu"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Label (Spanish)</Form.Label>
            <Form.Control
              value={newLabelEs}
              onChange={(e) => setNewLabelEs(e.target.value)}
              placeholder="Fuego"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleAddNumber}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Urgent Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Choose Number</Form.Label>
            <Form.Select
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
            >
              <option value="">Select</option>
              {numbers.map((item) => (
                <option key={item.id} value={item.number}>
                  {getLabel(item)} - {item.number}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your urgent message here..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMessage(false)}>
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={handleSendMessage}
            disabled={!selectedNumber}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EmergencyPage;
