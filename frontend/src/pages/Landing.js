import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Landing = () => {
  const navigate = useNavigate();

  // النصوص بالعربي فقط
  const t = {
    home: "الرئيسية",
    features: "الميزات",
    how: "كيف تعمل",
    users: "المستخدمون",
    about: "من نحن",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    welcome: "مرحبا",
    heroTitle: "التواصل للجميع.",
    heroDesc:
      "فوكسى يساعد الأفراد الذين يواجهون صعوبات في التواصل مثل الزهايمر، السكتة الدماغية، التوحد، أو صعوبات النطق على التعبير عن أفكارهم بوضوح وثقة.",
    startBtn: "ابدأ مع فوكسى →",
    featuresTitle: "الميزات",
    feature1: {
      title: "تواصل سهل",
      desc: "عبّر عن احتياجاتك ومشاعرك باستخدام رموز بصرية بديهية.",
      img: "/images/communication.jpg",
    },
    feature2: {
      title: "مكتبة أيقونات كبيرة",
      desc: "مئات الأيقونات المصنفة للتواصل اليومي.",
      img: "/images/R.jpg",
    },
    feature3: {
      title: "سريع وبسيط",
      desc: "واجهة نظيفة مصممة لكبار السن والأطفال.",
      img: "/images/OIP.jpg",
    },
    usersTitle: "من يمكنه استخدام فوكسى؟",
    usersList: [
      {
        img: "/images/autism.jpg",
        title: "الأطفال ذوي الاحتياجات الخاصة",
        desc: "لدى الأطفال المصابين بالتوحد أو الإعاقة الذهنية أو متلازمة داون أو ضعف السمع، تساعد الدعامات البصرية على تطوير اللغة ومهارات الحياة.",
      },
      {
        img: "/images/cerebral palsy.jpg",
        title: "الأطفال والبالغون ذوي الصعوبات البدنية الشديدة",
        desc: "للأشخاص المصابين بالشلل الدماغي أو إصابات الرأس أو السكتة الدماغية، الرموز تصبح نظام تواصل بديل للتعبير عن الاحتياجات والمشاعر والأفكار.",
      },
      {
        img: "/images/Elderly.jpg",
        title: "كبار السن",
        desc: "يمكن أن تتطلب الإعاقات الإدراكية الناتجة عن الأفازيا أو الزهايمر أو الخرف أو الأمراض النفسية استخدام أنظمة تواصل بديلة أو داعمة.",
      },
      {
        img: "/images/emergency.jpg",
        title: "حالات الطوارئ أو الطبية",
        desc: "عندما يكون المرضى مخدرين أو في صدمة أو غير قادرين على الكلام، تسمح الرموز بالتواصل مع الأطباء لتلبية الاحتياجات والمشاعر والحصول على موافقة مستنيرة.",
      },
      {
        img: "/images/beginning to read.jpg",
        title: "الأطفال المبتدئون في القراءة",
        desc: "تساعد الرموز الأطفال على فهم النصوص المكتوبة وفك الشيفرة وتحسين مهارات القراءة، مع ضرورة وضع النص بجانب الرموز.",
      },
      {
        img: "/images/Learning.jpg",
        title: "تعلم لغة ثانية",
        desc: "تساعد الدعامات البصرية المتحدثين الأصليين وغير الأصليين على فهم النصوص والتواصل في المراحل الأولى لتعلم لغة جديدة.",
      },
      {
        img: "/images/Tourist .jpg",
        title: "السياح والزوار",
        desc: "تسهل الرموز الوصول إلى الثقافة والمتاجر والمطاعم والإجراءات الإدارية للمقيمين أو الزوار المؤقتين.",
      },
      {
        img: "/images/everyone.jpg",
        title: "للجميع",
        desc: "تساعد الوسائل البصرية أي شخص على التنقل في أماكن غير معروفة والتواصل بسهولة والتكيف مع العالم البصري المحيط به.",
      },
    ],
    aboutTitle: "عن فوكسى",
    aboutDesc1:
      "فوكسى مصمم لجعل التواصل سلسًا ومتاحًا ومركزًا على الإنسان. يوفر التطبيق أيقونات وعبارات جاهزة لتسهيل التفاعلات اليومية.",
    aboutDesc2:
      "سواء كانت المشاعر أو الاحتياجات أو الأنشطة اليومية — فوكسى يساعد في سد فجوة التواصل.",
    footer: "© 2025 فوكسى — التواصل للجميع",
  };

    const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", paddingTop: "100px" }}>
      {/* NAVBAR */}
      <Navbar expand="lg" bg="white" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} className="d-flex align-items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/512/892/892781.png" alt="Voxi Logo" width="40" />
            <span style={{ fontSize: "22px", fontWeight: "700" }}>Voxi</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="ms-auto">
            <Nav className="ms-auto align-items-lg-center gap-2 gap-lg-3 flex-column flex-lg-row">
              {[{ text: t.home, id: "home" }, { text: t.features, id: "features" }, { text: t.how, id: "how" }, { text: t.users, id: "users" }, { text: t.about, id: "about" }].map((link, i) => (
                <Nav.Link key={i} onClick={() => scrollTo(link.id)} className="btn btn-link fw-semibold p-0">{link.text}</Nav.Link>
              ))}
              <Button variant="dark" size="sm" onClick={() => navigate("/main-categories")}>{t.startBtn}</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO */}
      <header id="home" className="d-flex align-items-center" style={{ height: "100vh", background: "linear-gradient(to right, #f8f9fa, #ffffff)" }}>
        <Container>
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
              <h1 style={{ fontSize: "2.8rem", fontWeight: "800" }}>{t.heroTitle}</h1>
              <p className="mt-3" style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>{t.heroDesc}</p>
              <Button variant="dark" className="mt-4 px-4 py-2 fw-bold" style={{ borderRadius: "12px", fontSize: "1.1rem" }} onClick={() => navigate("/main-categories")}>
                {t.startBtn}
              </Button>
            </div>
            <div className="col-lg-6 text-center">
              <img src="" alt="" className="img-fluid" style={{ maxHeight: "300px" }} />
            </div>
          </div>
        </Container>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-5 bg-light">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">{t.featuresTitle}</h2>
          <div className="row g-4 mt-1">
            {[t.feature1, t.feature2, t.feature3].map((f, i) => (
              <div key={i} className="col-sm-12 col-md-6 col-lg-4">
                <div className="p-4 shadow-sm rounded h-100">
                  <img src={f.img} className="mb-3 w-100 rounded" alt={f.title} />
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* USERS */}
      <section id="users" className="py-5">
        <Container>
          <h2 className="fw-bold text-center mb-5">{t.usersTitle}</h2>
          <div className="row g-4">
            {t.usersList.map((u, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="p-4 rounded shadow-sm h-100 text-center">
                  <img src={u.img} alt={u.title} className="img-fluid mb-2 rounded-circle" />
                  <h5 className="fw-bold mt-2">{u.title}</h5>
                  <p style={{ fontSize: "0.9rem" }}>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-5 bg-light">
        <Container>
          <div className="row align-items-center">
            <div className="col-lg-6 text-center mb-4 mb-lg-0">
              <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" alt="About Voxi" className="img-fluid" style={{ maxHeight: "250px" }} />
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <h2 className="fw-bold mb-3" style={{ fontSize: "1.8rem" }}>{t.aboutTitle}</h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>{t.aboutDesc1}</p>
              <p style={{ fontSize: "1rem" }}>{t.aboutDesc2}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-4" style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
        <h5 className="fw-bold mb-0">{t.footer}</h5>
      </footer>
    </div>
  );
};

export default Landing;