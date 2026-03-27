import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { API_BASE_URL } from "../api/api";

function normalizePhoneForWhatsApp(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) return `20${digits.slice(1)}`;
  if (digits.startsWith("20")) return digits;
  return digits;
}

function EmergencyPage() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newLabelAr, setNewLabelAr] = useState("");
  const [newLabelFr, setNewLabelFr] = useState("");
  const [newLabelEs, setNewLabelEs] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/emergency-numbers`);
        const data = await res.json();
        setNumbers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddNumber = async () => {
    const trimmed = newNumber.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/emergency-numbers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: trimmed,
          label_en: newLabel.trim(),
          label_ar: newLabelAr.trim(),
          label_fr: newLabelFr.trim(),
          label_es: newLabelEs.trim()
        })
      });
      const created = await res.json();
      setNumbers((prev) => {
        const exists = prev.some((n) => n.number === created.number);
        return exists ? prev : [...prev, created];
      });

      // Reset fields
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

  const getLabel = (item) =>
    item.label_en || item.label_ar || item.label_fr || item.label_es || "Emergency Number";

  return (
    <Container className="mt-5" style={{ maxWidth: "1000px" }}>
      <h2 className="mb-4 text-center">Emergency</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button variant="danger" onClick={() => setShowAdd(true)}>
          Add Emergency Number
        </Button>
        <Button variant="warning" onClick={() => setShowMessage(true)}>
          Send Urgent Message
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row className="g-3">
          {numbers.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{getLabel(item)}</Card.Title>
                  <Card.Text>{item.number}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add Number Modal */}
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

      {/* Send Message Modal */}
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