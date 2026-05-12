import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { createAacMessage, getUsers, speakWithBrowserVoice } from "../api/api";
import { AppContext } from "../context/AppContext";

const QUICK_PHRASES = [
  "Don't worry, I'm on my way",
  "I saw your message and I'll be there in 5 minutes",
  "I'm coming to you now",
  "I'll bring your medicine right away",
  "It's okay, I'm with you",
  "Message me if you need anything",
  "I'm nearby and coming immediately",
  "I received your message and I'm handling it now",
  "Take a deep breath, I'm coming",
  "I'm checking on you regularly"
];

const getDisplayName = (account) =>
  [account?.firstName, account?.lastName].filter(Boolean).join(" ").trim() ||
  account?.email ||
  "User";

function Message() {
  const { user } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) {
      setUsers([]);
      setReceiverId("");
      setUsersLoading(false);
      return undefined;
    }

    let cancelled = false;
    setUsersLoading(true);
    setUsersError("");

    getUsers({ excludeUserId: user.id })
      .then((data) => {
        if (cancelled) return;
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setUsers([]);
        setUsersError(err.message || "Failed to load users.");
      })
      .finally(() => {
        if (!cancelled) setUsersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const cleanName = getDisplayName(user);
  const cleanMessage = message.trim();
  const selectedReceiver = useMemo(
    () => users.find((item) => String(item.id) === String(receiverId)) || null,
    [receiverId, users],
  );
  const receiverName = getDisplayName(selectedReceiver);
  const canSend = Boolean(user?.id && selectedReceiver && cleanMessage && !sending);
  const previewText = useMemo(() => {
    if (!user?.id || !selectedReceiver || !cleanMessage) return "";
    return `${cleanName} sent you a message: ${cleanMessage}`;
  }, [cleanMessage, cleanName, selectedReceiver, user?.id]);

  const appendPhrase = (phrase) => {
    setSuccess("");
    setError("");
    setMessage((current) => {
      const trimmed = current.trim();
      return trimmed ? `${trimmed} ${phrase}` : phrase;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (!user?.id) {
      setError("Please login first, then send the message.");
      return;
    }

    if (!selectedReceiver) {
      setError("Please choose who should receive the message.");
      return;
    }

    if (!cleanMessage) {
      setError("Please write or choose a message.");
      return;
    }

    setSending(true);
    try {
      await createAacMessage({
        senderId: user.id,
        senderName: cleanName,
        receiverId: selectedReceiver.id,
        message: cleanMessage,
      });
      setSuccess(`Message sent to ${receiverName}'s emergency page.`);
      setMessage("");
    } catch (err) {
      setError(err.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const handleSpeakPreview = async () => {
    if (!previewText) return;

    setSpeaking(true);
    try {
      await speakWithBrowserVoice(previewText, "female");
    } catch (err) {
      setError(err.message || "TTS failed.");
    } finally {
      setSpeaking(false);
    }
  };

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: "980px" }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">AAC Message</h2>
          <p className="text-muted mb-0">Choose a logged-in user and send a message to their Emergency page.</p>
        </div>
        <Button variant="outline-danger" href="/emergency">
          Emergency
        </Button>
      </div>

      {!user && (
        <Alert variant="warning" className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <span>Please login first so the app knows who is sending the message.</span>
          <Button variant="outline-dark" size="sm" href="/login">
            Login
          </Button>
        </Alert>
      )}

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {usersError && <Alert variant="warning">{usersError}</Alert>}
      {user && !usersLoading && !users.length && !usersError && (
        <Alert variant="info">No other users found yet. Create another account to receive messages.</Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Sender</Form.Label>
              <Form.Control value={user ? cleanName : "Login required"} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Send To</Form.Label>
              <Form.Select
                value={receiverId}
                disabled={!user || usersLoading}
                onChange={(event) => {
                  setSuccess("");
                  setError("");
                  setReceiverId(event.target.value);
                }}
              >
                <option value="">{usersLoading ? "Loading users..." : "Choose receiver"}</option>
                {users.map((account) => (
                  <option key={account.id} value={account.id}>
                    {getDisplayName(account)} ({account.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(event) => {
                  setSuccess("");
                  setError("");
                  setMessage(event.target.value);
                }}
                placeholder="Write your message or choose from AAC phrases"
                maxLength={1000}
                disabled={!user}
              />
            </Form.Group>

            <div className="mb-4">
              <div className="fw-semibold mb-2">AAC Phrases</div>
              <Row className="g-2">
                {QUICK_PHRASES.map((phrase) => (
                  <Col key={phrase} xs={6} md={4} lg={3}>
                    <Button
                      type="button"
                      variant="outline-primary"
                      className="w-100 h-100"
                      onClick={() => appendPhrase(phrase)}
                      disabled={!user}
                    >
                      {phrase}
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>

            {previewText && (
              <Alert variant="light" className="border">
                <div className="fw-semibold mb-1">Preview for receiver</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{previewText}</div>
              </Alert>
            )}

            <div className="d-flex flex-wrap gap-2 justify-content-end">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={handleSpeakPreview}
                disabled={!previewText || speaking}
              >
                {speaking ? "Speaking..." : "Speak Preview"}
              </Button>
              <Button type="submit" variant="danger" disabled={!canSend}>
                {sending ? "Sending..." : "Send to Emergency"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Message;
