/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

function SubIconsPage() {
  const { iconId } = useParams();
  const [subIcons, setSubIcons] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/icons/${iconId}/subicons`)
      .then(res => res.json())
      .then(data => setSubIcons(data))
      .catch(err => console.log(err));
  }, [iconId]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Sub Icons</h2>
      <Row className="g-4">
        {subIcons.map(sub => (
          <Col key={sub.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow h-100">
              <Card.Img 
                variant="top" 
                src={sub.imageUrl} 
                style={{ height: "150px", objectFit: "cover" }} 
              />
              <Card.Body>
                <Card.Title>{sub.title}</Card.Title>
                <Card.Text className="text-muted">
                  {sub.expression}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SubIconsPage;*/

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

function SubIconsPage() {
  const { iconId } = useParams();
  const [subIcons, setSubIcons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ subicons الخاصة بالـ icon المختار
        const resIcon = await fetch(
          `http://localhost:5000/icons/${iconId}/subicons`
        );
        const iconSubIcons = await resIcon.json();

        // 2️⃣ subicons العامة (verbs + tools + times)
        const resCommon = await fetch(
          `http://localhost:5000/subicons?category=Verbs`
        );
        const verbs = await resCommon.json();

        const tools = await fetch(
          `http://localhost:5000/subicons?category=Tools`
        ).then(r => r.json());

        const times = await fetch(
          `http://localhost:5000/subicons?category=Times`
        ).then(r => r.json());

        // 3️⃣ دمج الكل
        setSubIcons([
          ...iconSubIcons,
          ...verbs,
          ...tools,
          ...times
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [iconId]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Sub Icons</h2>

      <Row className="g-4">
        {subIcons.map(sub => (
          <Col key={sub.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center shadow h-100">
              <Card.Img
                variant="top"
                src={sub.imageUrl}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{sub.title}</Card.Title>
                <Card.Text className="text-muted">
                  {sub.expression}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SubIconsPage;
*/
/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

function SubIconsPage() {
  const { iconId } = useParams();

  const [subIcons, setSubIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // اختيارات الجملة
  const [timeOption, setTimeOption] = useState("الآن");
  const [connector, setConnector] = useState("و");

  useEffect(() => {
    fetch(`http://localhost:5000/icons/${iconId}/subicons`)
      .then(res => res.json())
      .then(data => setSubIcons(data))
      .catch(err => console.log(err));
  }, [iconId]);

  // اختيار / إلغاء اختيار subIcon
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // تكوين الجملة الديناميكية
  const generateSentence = () => {
    const expressions = selectedIds
      .map(id => {
        const sub = subIcons.find(s => s.id === id);
        return sub ? sub.expression : "";
      })
      .filter(Boolean);

    if (expressions.length === 0) return "";

    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  return (
    <Container className="mt-5">

      <h2 className="mb-4 text-center">الاختيارات</h2>

      {/* sentence controls *}
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
      </div>

      {/* Dynamic sentence *}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-light border rounded shadow-sm text-center">
          <strong>الجملة:</strong>
          <div className="mt-2 fs-5 text-primary">
            {generateSentence()}
          </div>
        </div>
      )}

      {/* SubIcons Grid *}
      <Row className="g-4">
        {subIcons.map(sub => (
          <Col key={sub.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`text-center shadow h-100 ${
                selectedIds.includes(sub.id)
                  ? "border-primary border-3"
                  : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleSelect(sub.id)}
            >
              <Card.Img
                variant="top"
                src={sub.imageUrl}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{sub.title}</Card.Title>
                <Card.Text className="text-muted">
                  {sub.expression}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
}

export default SubIconsPage;*/

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

function SubIconsPage() {
  const { iconId } = useParams();

  const [mainIcon, setMainIcon] = useState(null); // بيانات main icon
  const [selectedIds, setSelectedIds] = useState([]);

  // اختيارات الجملة
  const [timeOption, setTimeOption] = useState("الآن");
  const [connector, setConnector] = useState("و");

  // جلب بيانات الـ main icon مع الـ subicons مرة واحدة
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/icons/${iconId}`);
        const data = await res.json();

        setMainIcon(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [iconId]);

  // اختيار / إلغاء اختيار subIcon
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // تكوين الجملة الديناميكية
  const generateSentence = () => {
    if (!mainIcon) return "";

    const subIcons = mainIcon.subIcons || [];

    const expressions = selectedIds
      .map(id => {
        const sub = subIcons.find(s => s.id === id);
        return sub ? sub.expression : "";
      })
      .filter(Boolean);

    // إذا ما فيش اختيار لأي subIcon، الجملة مخفية
    if (expressions.length === 0) return "";

    // الجملة تبدأ بـ expression الخاص بالـ main icon
    return `${timeOption} ${mainIcon.expression} ${connector} ${expressions.join(` ${connector} `)}`;
  };

  if (!mainIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

  const subIcons = mainIcon.subIcons || [];

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">{mainIcon.title}</h2>

      {/* sentence controls *}
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
      </div>

      {/* Dynamic sentence تظهر فقط لو فيه اختيار *}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-light border rounded shadow-sm text-center">
          <strong>الجملة:</strong>
          <div className="mt-2 fs-5 text-primary">
            {generateSentence()}
          </div>
        </div>
      )}

      {/* SubIcons Grid *}
      <Row className="g-4">
        {subIcons.map(sub => (
          <Col key={sub.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`text-center shadow h-100 ${selectedIds.includes(sub.id) ? "border-primary border-3" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleSelect(sub.id)}
            >
              <Card.Img
                variant="top"
                src={sub.imageUrl}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
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

*/
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

function SubIconsPage() {
  const { iconId } = useParams();
  const navigate = useNavigate(); // جديد

  const [mainIcon, setMainIcon] = useState(null); // بيانات main icon
  const [selectedIds, setSelectedIds] = useState([]);

  // اختيارات الجملة
  const [timeOption, setTimeOption] = useState("الآن");
  const [connector, setConnector] = useState("و");

  // جلب بيانات الـ main icon مع الـ subicons مرة واحدة
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/icons/${iconId}`);
        const data = await res.json();

        setMainIcon(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [iconId]);

  // اختيار / إلغاء اختيار subIcon
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // تكوين الجملة الديناميكية
  const generateSentence = () => {
    if (!mainIcon) return "";

    const subIcons = mainIcon.subIcons || [];

    const expressions = selectedIds
      .map(id => {
        const sub = subIcons.find(s => s.id === id);
        return sub ? sub.expression : "";
      })
      .filter(Boolean);

    if (expressions.length === 0) return "";

    return `${timeOption} ${mainIcon.expression} ${connector} ${expressions.join(` ${connector} `)}`;
  };

  if (!mainIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

  const subIcons = mainIcon.subIcons || [];

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">{mainIcon.title}</h2>

      {/* sentence controls */}
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
      </div>

      {/* Dynamic sentence */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-light border rounded shadow-sm text-center">
          <strong>الجملة:</strong>
          <div className="mt-2 fs-5 text-primary">
            {generateSentence()}
          </div>
        </div>
      )}

      {/* SubIcons Grid */}
      <Row className="g-4">
        {subIcons.map(sub => (
          <Col key={sub.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`text-center shadow h-100 ${selectedIds.includes(sub.id) ? "border-primary border-3" : ""}`}
              style={{ cursor: "pointer", position: "relative" }}
              onClick={(e) => {
                // جديد: لو ضغط على checkbox ما يروحش للـ detail
                if (e.target.type !== "checkbox") {
                  navigate(`/icons/${iconId}/subicons/${sub.id}`);
                }
              }}
            >
              <Card.Img
                variant="top"
                src={sub.imageUrl}
                style={{ height: "300px" ,width:"100%"}}// objectFit: "cover" }}
              />
              <Card.Body>
                {/* جديد: Checkbox */}
                <Form.Check
                  type="checkbox"
                  //label="اختيار"
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
