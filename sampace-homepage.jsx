import { useState, useEffect, useRef } from "react";

/* ─── SCHOOL DATA ─── */
const schools = [
  {
    id: 1, num: "01", emoji: "🎓",
    name: "School College",
    short: "Secondary School",
    tagline: "JSS · SSS · Virtual & Physical Campus",
    desc: "Nigeria's premier online secondary school. Full JSS1–SS3 curriculum, virtual labs, blended learning and globally competitive academic standards.",
    gradient: "linear-gradient(135deg, #0B2A5E 0%, #1565C0 50%, #42A5F5 100%)",
    accent: "#64B5F6",
    tags: ["JSS1–SS3", "Virtual Lab", "WAEC/NECO", "Report Cards"],
    cta: "Apply for Admission",
    link: "#school-college",
  },
  {
    id: 2, num: "02", emoji: "📝",
    name: "Tutorial & Local Exam",
    short: "Exam Prep Center",
    tagline: "BECE · WAEC · NECO · GCE · JAMB",
    desc: "Intensive exam preparation for every major Nigerian examination. CBT practice, past questions, monthly mock tests and personalized study plans.",
    gradient: "linear-gradient(135deg, #003D2E 0%, #00695C 50%, #4DB6AC 100%)",
    accent: "#80CBC4",
    tags: ["BECE", "WAEC", "JAMB/UTME", "CBT Practice"],
    cta: "Enroll Now",
    link: "#tutorial",
  },
  {
    id: 3, num: "03", emoji: "💻",
    name: "School of Technology",
    short: "Tech & Digital Skills",
    tagline: "Code · Design · Cybersecurity · Data",
    desc: "Future-proof tech education. From software engineering to cybersecurity and digital marketing — cohort-based, industry-aligned, job-ready.",
    gradient: "linear-gradient(135deg, #1A0040 0%, #4A148C 50%, #9C27B0 100%)",
    accent: "#CE93D8",
    tags: ["Software Dev", "Cybersecurity", "Data Science", "UI/UX"],
    cta: "Join a Cohort",
    link: "#technology",
  },
  {
    id: 4, num: "04", emoji: "🏛️",
    name: "Pre-University College",
    short: "Pre-Degree Programs",
    tagline: "IJMB · JUPEB · Diploma · Pre-Degree",
    desc: "University-standard pre-degree education. IJMB, JUPEB and Diploma programs designed to qualify you for direct university entry at 200 level.",
    gradient: "linear-gradient(135deg, #3E1A00 0%, #BF360C 50%, #FF7043 100%)",
    accent: "#FFAB91",
    tags: ["IJMB", "JUPEB", "Diploma", "200 Level Entry"],
    cta: "Apply Now",
    link: "#pre-university",
  },
  {
    id: 5, num: "05", emoji: "🌍",
    name: "Advanced & International",
    short: "International Exams",
    tagline: "SAT · IELTS · A-Level · TOEFL",
    desc: "World-class preparation for global examinations. Expert tutors, proven strategies and immersive practice for internationally recognised qualifications.",
    gradient: "linear-gradient(135deg, #3E0020 0%, #880E4F 50%, #EC407A 100%)",
    accent: "#F48FB1",
    tags: ["SAT", "IELTS", "A-Level", "TOEFL/GRE"],
    cta: "Book a Session",
    link: "#international",
  },
  {
    id: 6, num: "06", emoji: "📊",
    name: "Business & Professional",
    short: "Professional Certifications",
    tagline: "PMP · ACCA · ICAN · CFA · CIMA",
    desc: "Globally recognised professional certifications taught by industry experts. Advance your career with the qualifications that employers demand worldwide.",
    gradient: "linear-gradient(135deg, #003040 0%, #00607A 50%, #00ACC1 100%)",
    accent: "#80DEEA",
    tags: ["PMP", "ACCA", "ICAN", "CFA/CIMA"],
    cta: "Start Certification",
    link: "#business",
  },
  {
    id: 7, num: "07", emoji: "🎤",
    name: "Communication & Diction",
    short: "Speech & Communication",
    tagline: "Speak · Present · Lead · Influence",
    desc: "Master the art of communication. Public speaking, diction, presentation mastery and professional communication skills for every stage of life.",
    gradient: "linear-gradient(135deg, #0D3040 0%, #01579B 50%, #29B6F6 100%)",
    accent: "#81D4FA",
    tags: ["Public Speaking", "Diction", "Presentation", "Media Training"],
    cta: "Find Your Voice",
    link: "#communication",
  },
  {
    id: 8, num: "08", emoji: "🌐",
    name: "School of Languages",
    short: "Language Programs",
    tagline: "French · Spanish · Arabic · Mandarin",
    desc: "Become multilingual. Immersive language programs from beginner to advanced, with native speakers and internationally recognised language certifications.",
    gradient: "linear-gradient(135deg, #1A003E 0%, #311B92 50%, #7986CB 100%)",
    accent: "#C5CAE9",
    tags: ["French", "Spanish", "Arabic", "Mandarin +"],
    cta: "Choose a Language",
    link: "#languages",
  },
  {
    id: 9, num: "09", emoji: "🤝",
    name: "Professional Services",
    short: "Consulting & Advisory",
    tagline: "CV · Admissions · Consulting · Advisory",
    desc: "Expert professional services tailored to your goals. CV writing, university admission support, educational consulting and career advisory — no fixed price, fully personalised.",
    gradient: "linear-gradient(135deg, #1A1A00 0%, #4E4200 50%, #F9A825 100%)",
    accent: "#FFE082",
    tags: ["CV Writing", "Admission Help", "Consulting", "Study Abroad"],
    cta: "Make an Inquiry",
    link: "#services",
  },
];

const stats = [
  { num: "9", label: "Schools & Divisions" },
  { num: "20+", label: "Programs Offered" },
  { num: "100%", label: "Online Delivery" },
  { num: "AUG '26", label: "Launch Date" },
];

/* ─── HOOKS ─── */
function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function FadeIn({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity .75s ${delay}s cubic-bezier(.4,0,.2,1), transform .75s ${delay}s cubic-bezier(.4,0,.2,1)`,
      ...style
    }}>{children}</div>
  );
}

/* ─── PARTICLES ─── */
function Particles() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.2,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,181,246,${d.a})`;
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(100,181,246,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

/* ─── SCHOOL CARD ─── */
function SchoolCard({ school, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const inView = useInView(ref, 0.1);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity .7s ${index * 0.07}s ease, transform .7s ${index * 0.07}s ease`,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow: hovered ? "0 32px 72px rgba(0,0,0,0.45)" : "0 8px 32px rgba(0,0,0,0.25)",
        transform: inView ? (hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(40px) scale(0.97)",
        transition: `all .4s cubic-bezier(.4,0,.2,1), opacity .7s ${index * 0.07}s ease`,
      }}>
      {/* Gradient Background */}
      <div style={{ background: school.gradient, padding: "32px 28px 28px", position: "relative", minHeight: 340 }}>
        {/* Decorative circle */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          transition: "transform .4s ease",
          transform: hovered ? "scale(1.3)" : "scale(1)",
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: -20,
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }} />

        {/* Number + icon */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, position: "relative", zIndex: 2 }}>
          <span style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: 52, lineHeight: 1,
            color: "rgba(255,255,255,0.15)", letterSpacing: 2,
          }}>{school.num}</span>
          <span style={{
            fontSize: 36,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            borderRadius: 12, padding: "8px 12px",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "transform .3s ease",
            transform: hovered ? "scale(1.15) rotate(5deg)" : "scale(1)",
            display: "block",
          }}>{school.emoji}</span>
        </div>

        {/* School name */}
        <div style={{ position: "relative", zIndex: 2, marginBottom: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: school.accent, textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{school.short}</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 6 }}>{school.name}</h3>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 1.5, fontStyle: "italic" }}>{school.tagline}</div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7,
          marginTop: 16, position: "relative", zIndex: 2,
          maxHeight: hovered ? 200 : 60,
          overflow: "hidden",
          transition: "max-height .4s ease",
        }}>{school.desc}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16, position: "relative", zIndex: 2 }}>
          {school.tags.map(t => (
            <span key={t} style={{
              background: "rgba(255,255,255,0.12)",
              border: `1px solid ${school.accent}40`,
              color: school.accent,
              padding: "3px 10px", borderRadius: 100,
              fontSize: 10, letterSpacing: 0.5, fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 24, position: "relative", zIndex: 2,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "all .3s ease",
        }}>
          <button style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${school.accent}`,
            color: "#fff",
            padding: "10px 24px", borderRadius: 6,
            fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
            cursor: "pointer", width: "100%",
            transition: "background .2s",
          }}>{school.cta} →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = ["School College", "Tutorial & Exam Prep", "School of Technology", "Pre-University College", "Advanced & International", "Business & Professional", "Communication & Diction", "School of Languages", "Professional Services"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", background: "rgba(201,168,76,0.08)", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "12px 0" }}>
      <div style={{ display: "flex", gap: 0, animation: "marquee 30s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(201,168,76,0.7)", paddingRight: 48, whiteSpace: "nowrap", fontWeight: 500 }}>
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: "Adaeze O.", school: "School College", text: "The virtual classes and lab sessions are just like being in a physical school. My daughter loves it.", role: "Parent" },
  { name: "Emeka T.", school: "Tutorial & Exam", text: "I scored 298 in JAMB after just 3 months on the CBT practice platform. The mock tests are incredibly accurate.", role: "Student" },
  { name: "Fatima K.", school: "Business & Professional", text: "I passed my ACCA Paper F3 on first attempt. The tutors here know their stuff inside out.", role: "Professional" },
  { name: "David A.", school: "School of Technology", text: "Got a remote job 2 weeks after completing the cybersecurity cohort. The portfolio projects made all the difference.", role: "Graduate" },
];

/* ─── MAIN COMPONENT ─── */
export default function SampaceHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#060E1A", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#060E1A;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#1565C0,#C9A84C);border-radius:2px;}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes heroFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(2deg)}}
        @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .nav-link{transition:color .2s;cursor:pointer;border:none;background:transparent;}
        .nav-link:hover{color:#C9A84C !important;}
        .hero-title{animation:fadeSlideUp .9s .1s both;}
        .hero-sub{animation:fadeSlideUp .9s .25s both;}
        .hero-desc{animation:fadeSlideUp .9s .4s both;}
        .hero-btns{animation:fadeSlideUp .9s .55s both;}
        .hero-stats{animation:fadeSlideUp .9s .7s both;}
        .float1{animation:heroFloat 5s ease-in-out infinite;}
        .float2{animation:heroFloat 7s ease-in-out infinite reverse;}
        .float3{animation:heroFloat 6s 1s ease-in-out infinite;}
        .pulse-ring{animation:pulse 2s ease-in-out infinite;}
        @media(max-width:768px){
          .schools-grid{grid-template-columns:1fr !important;}
          .hero-stats-inner{flex-wrap:wrap !important;gap:24px !important;}
          .nav-links-desktop{display:none !important;}
          .hero-btns-inner{flex-direction:column !important;align-items:center !important;}
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 68,
        background: scrolled ? "rgba(6,14,26,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(100,181,246,0.1)" : "none",
        transition: "all .4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44,
            background: "linear-gradient(135deg, #1565C0, #42A5F5)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 1,
            boxShadow: "0 4px 16px rgba(21,101,192,0.5)",
          }}>SI</div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 3, background: "linear-gradient(90deg, #64B5F6, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>SAMPACE</div>
            <div style={{ fontSize: 9, letterSpacing: 2.5, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Institute · sampacecampus.com.ng</div>
          </div>
        </div>

        {/* Nav links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["Schools", "#schools"], ["About", "#about"], ["Admissions", "#admissions"], ["Contact", "#contact"]].map(([label, href]) => (
            <a key={label} href={href} className="nav-link" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, letterSpacing: 0.5, fontWeight: 500 }}>{label}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="nav-link" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", letterSpacing: 0.5 }}>
            Student Login
          </button>
          <button style={{
            background: "linear-gradient(135deg, #1565C0, #42A5F5)",
            color: "#fff", border: "none", padding: "8px 20px",
            borderRadius: 6, fontSize: 13, fontWeight: 600, letterSpacing: 0.5, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(21,101,192,0.4)",
          }}>Apply Now</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(160deg, #060E1A 0%, #0B1F3A 40%, #0D2855 70%, #081830 100%)",
        backgroundSize: "400% 400%",
      }}>
        <Particles />

        {/* Floating school bubbles */}
        <div className="float1" style={{ position: "absolute", top: "18%", left: "6%", zIndex: 2 }}>
          <div style={{ background: "linear-gradient(135deg, #0B2A5E, #1565C0)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(100,181,246,0.3)", backdropFilter: "blur(8px)" }}>
            <div style={{ fontSize: 24 }}>🎓</div>
            <div style={{ fontSize: 11, color: "#64B5F6", marginTop: 4, letterSpacing: 1 }}>School College</div>
          </div>
        </div>
        <div className="float2" style={{ position: "absolute", top: "25%", right: "5%", zIndex: 2 }}>
          <div style={{ background: "linear-gradient(135deg, #003040, #00607A)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(0,172,193,0.3)" }}>
            <div style={{ fontSize: 24 }}>📊</div>
            <div style={{ fontSize: 11, color: "#80DEEA", marginTop: 4, letterSpacing: 1 }}>Business & Pro</div>
          </div>
        </div>
        <div className="float3" style={{ position: "absolute", bottom: "28%", left: "4%", zIndex: 2 }}>
          <div style={{ background: "linear-gradient(135deg, #003D2E, #00695C)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(77,182,172,0.3)" }}>
            <div style={{ fontSize: 24 }}>📝</div>
            <div style={{ fontSize: 11, color: "#80CBC4", marginTop: 4, letterSpacing: 1 }}>Exam Prep</div>
          </div>
        </div>
        <div className="float2" style={{ position: "absolute", bottom: "22%", right: "6%", zIndex: 2 }}>
          <div style={{ background: "linear-gradient(135deg, #1A0040, #4A148C)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(206,147,216,0.3)" }}>
            <div style={{ fontSize: 24 }}>💻</div>
            <div style={{ fontSize: 11, color: "#CE93D8", marginTop: 4, letterSpacing: 1 }}>Technology</div>
          </div>
        </div>

        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "30%", left: "25%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,101,192,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: 860, padding: "120px 48px 80px" }}>
          <div className="hero-title" style={{ marginBottom: 4 }}>
            <div style={{ display: "inline-block", border: "1px solid rgba(100,181,246,0.4)", borderRadius: 100, padding: "6px 20px", fontSize: 11, letterSpacing: 3, color: "#64B5F6", textTransform: "uppercase", marginBottom: 28, background: "rgba(21,101,192,0.1)" }}>
              🚀 Launching August 2026 · sampacecampus.com.ng
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(54px, 9vw, 104px)",
              fontWeight: 700, lineHeight: 0.9, letterSpacing: -2,
            }}>
              <span style={{ background: "linear-gradient(135deg, #fff 0%, #64B5F6 50%, #fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SAMPACE</span>
              <br />
              <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #FFD54F 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Institute</span>
            </h1>
          </div>

          <div className="hero-sub" style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(14px, 2vw, 20px)", letterSpacing: 8, color: "rgba(100,181,246,0.7)", margin: "20px 0 8px" }}>
            WHERE EXCELLENCE BEGINS
          </div>

          <p className="hero-desc" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 580, margin: "20px auto 44px" }}>
            Nine world-class schools. One powerful platform. From secondary school to professional certifications — your complete educational journey, entirely online.
          </p>

          <div className="hero-btns">
            <div className="hero-btns-inner" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => document.getElementById("schools")?.scrollIntoView({ behavior: "smooth" })} style={{
                background: "linear-gradient(135deg, #1565C0, #42A5F5)",
                color: "#fff", border: "none", padding: "15px 40px",
                borderRadius: 8, fontSize: 14, fontWeight: 700, letterSpacing: 1,
                cursor: "pointer", boxShadow: "0 8px 32px rgba(21,101,192,0.5)",
                transition: "all .2s ease",
              }}>Explore Our Schools →</button>
              <button style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
                padding: "15px 40px", borderRadius: 8, fontSize: 14,
                letterSpacing: 1, cursor: "pointer",
              }}>Apply for Admission</button>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ marginTop: 72, paddingTop: 48, borderTop: "1px solid rgba(100,181,246,0.12)" }}>
            <div className="hero-stats-inner" style={{ display: "flex", gap: 56, justifyContent: "center" }}>
              {stats.map((s, i) => (
                <div key={i} onMouseEnter={() => setHoveredStat(i)} onMouseLeave={() => setHoveredStat(null)}
                  style={{ textAlign: "center", cursor: "default" }}>
                  <div style={{
                    fontFamily: "'Bebas Neue'", fontSize: 46, letterSpacing: 2, lineHeight: 1,
                    background: hoveredStat === i ? "linear-gradient(135deg, #C9A84C, #FFD54F)" : "linear-gradient(135deg, #64B5F6, #fff)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    transition: "all .3s",
                  }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 3, textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(100,181,246,0.5), transparent)", margin: "0 auto", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <Marquee />

      {/* ─── SCHOOLS GRID ─── */}
      <section id="schools" style={{ padding: "100px 48px", background: "linear-gradient(180deg, #060E1A 0%, #080F1E 100%)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#64B5F6", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Our Academic Portfolio</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, lineHeight: 1,
              background: "linear-gradient(135deg, #fff 0%, #64B5F6 60%, #C9A84C 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 20,
            }}>Nine Schools.<br /><em>One Vision.</em></h2>
            <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Each school is a fully independent portal with its own identity, faculty, and student system — united under the SAMPACE INSTITUTE banner of excellence.
            </p>
          </div>
        </FadeIn>

        <div className="schools-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
          {schools.map((s, i) => <SchoolCard key={s.id} school={s} index={i} />)}
        </div>
      </section>

      {/* ─── WHY SAMPACE ─── */}
      <section id="about" style={{ padding: "100px 48px", background: "#080F1E" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 4, color: "#C9A84C", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Why SAMPACE Institute</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24, color: "#fff" }}>
                  Education That<br /><em style={{ color: "#64B5F6", fontStyle: "italic" }}>Moves</em> With You
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
                  SAMPACE INSTITUTE was built for the modern Nigerian student — flexible, powerful, and world-class. Whether you are in secondary school, preparing for JAMB, earning a professional certification, or learning a new language, there is a school here for you.
                </p>
                {[
                  ["🎯", "All Online, All Flexible", "100% virtual delivery. Learn from anywhere, at any time."],
                  ["🏆", "Nigeria Curriculum Aligned", "All academic schools follow the official NERDC curriculum."],
                  ["🤖", "AI-Powered Learning", "Built-in AI assistant helps you study smarter, not harder."],
                  ["📜", "Certified & Recognised", "Certificates and qualifications respected by employers and institutions."],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                    <div style={{ width: 42, height: 42, flexShrink: 0, background: "rgba(21,101,192,0.15)", border: "1px solid rgba(100,181,246,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#fff", marginBottom: 3, fontSize: 14 }}>{title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature boxes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "🧪", title: "Virtual Labs", desc: "Simulate real science experiments online", color: "#4DB6AC" },
                  { icon: "📚", title: "Digital Library", desc: "Thousands of resources at your fingertips", color: "#7986CB" },
                  { icon: "📱", title: "Mobile-First", desc: "Study comfortably from your phone", color: "#64B5F6" },
                  { icon: "🏅", title: "Certifications", desc: "Earn recognised digital certificates", color: "#FFB74D" },
                  { icon: "👩‍👩‍👧", title: "Parent Portal", desc: "Parents track progress in real-time", color: "#F48FB1" },
                  { icon: "💬", title: "Live Classes", desc: "Interactive sessions with expert tutors", color: "#A5D6A7" },
                ].map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.06}>
                    <div style={{
                      padding: "24px 20px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12,
                      borderTop: `2px solid ${f.color}40`,
                      transition: "all .3s",
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "80px 48px", background: "linear-gradient(135deg, #060E1A 0%, #0B1F3A 100%)", borderTop: "1px solid rgba(100,181,246,0.08)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#64B5F6", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>Student Stories</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff" }}>What Our Students Say</h2>
          </div>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(100,181,246,0.15)",
              borderRadius: 16, padding: "48px",
              minHeight: 200,
            }}>
              <div style={{ fontSize: 40, color: "#1565C0", marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>"</div>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>
                {testimonials[activeTestimonial].text}
              </p>
              <div style={{ fontWeight: 700, color: "#64B5F6", fontSize: 14 }}>{testimonials[activeTestimonial].name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].school}</div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
              {testimonials.map((_, i) => (
                <div key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, background: i === activeTestimonial ? "#1565C0" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all .3s" }} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── INQUIRY / CONTACT ─── */}
      <section id="contact" style={{ padding: "100px 48px", background: "#080F1E" }}>
        <FadeIn>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 4, color: "#C9A84C", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Get In Touch</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
                Start Your<br /><em style={{ color: "#64B5F6", fontStyle: "italic" }}>Journey Today</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 32 }}>
                Not sure which school is right for you? Send us a message and our admissions team will guide you to the perfect program.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <a href="mailto:info@sampacecampus.com.ng" style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "rgba(21,101,192,0.12)", border: "1px solid rgba(100,181,246,0.2)",
                  borderRadius: 10, padding: "16px 20px", textDecoration: "none",
                }}>
                  <span style={{ fontSize: 24 }}>📧</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#64B5F6", letterSpacing: 1, marginBottom: 2 }}>EMAIL US</div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>info@sampacecampus.com.ng</div>
                  </div>
                </a>
                <a href="https://wa.me/" style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "rgba(0,150,136,0.12)", border: "1px solid rgba(77,182,172,0.2)",
                  borderRadius: 10, padding: "16px 20px", textDecoration: "none",
                }}>
                  <span style={{ fontSize: 24 }}>💬</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#4DB6AC", letterSpacing: 1, marginBottom: 2 }}>WHATSAPP COMMUNITY</div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Join our WhatsApp Community →</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick inquiry form */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(100,181,246,0.12)", borderRadius: 16, padding: "36px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Quick Inquiry</h3>
              {["Full Name", "Email Address", "Phone Number"].map(placeholder => (
                <input key={placeholder} placeholder={placeholder} style={{
                  width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14,
                  marginBottom: 12, outline: "none", fontFamily: "'DM Sans', sans-serif",
                }} />
              ))}
              <select style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "12px 16px", color: "rgba(255,255,255,0.7)", fontSize: 14,
                marginBottom: 12, outline: "none", fontFamily: "'DM Sans', sans-serif",
              }}>
                <option value="" disabled selected>Select a School</option>
                {schools.map(s => <option key={s.id} style={{ background: "#0B1F3A" }}>{s.name}</option>)}
              </select>
              <textarea placeholder="Your message or question..." rows={3} style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14,
                marginBottom: 16, outline: "none", fontFamily: "'DM Sans', sans-serif", resize: "none",
              }} />
              <button style={{
                width: "100%", background: "linear-gradient(135deg, #1565C0, #42A5F5)",
                color: "#fff", border: "none", padding: "13px", borderRadius: 8,
                fontSize: 14, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer",
                boxShadow: "0 6px 24px rgba(21,101,192,0.4)",
              }}>Send Inquiry →</button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{
        padding: "100px 48px", textAlign: "center",
        background: "linear-gradient(160deg, #0B1F3A 0%, #1565C0 50%, #0B2A5E 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <FadeIn style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px,7vw,80px)", letterSpacing: 3, lineHeight: 1, marginBottom: 16, color: "#fff" }}>
            YOUR FUTURE STARTS<br />
            <span style={{ background: "linear-gradient(90deg, #C9A84C, #FFD54F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>THIS AUGUST</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.8 }}>
            Nine schools. Unlimited potential. SAMPACE INSTITUTE opens its doors in August 2026 — be among the first.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(135deg, #C9A84C, #FFD54F)", color: "#0B1F3A",
              border: "none", padding: "16px 44px", borderRadius: 8,
              fontWeight: 800, fontSize: 15, letterSpacing: 1, cursor: "pointer",
              boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
            }}>🎓 Apply for Admission</button>
            <button style={{
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)", color: "#fff",
              padding: "16px 44px", borderRadius: 8,
              fontSize: 15, letterSpacing: 1, cursor: "pointer",
            }}>💬 Talk to an Advisor</button>
          </div>
        </FadeIn>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#03080F", padding: "64px 48px 32px", borderTop: "1px solid rgba(100,181,246,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #1565C0, #42A5F5)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: 16 }}>SI</div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 3, background: "linear-gradient(90deg, #64B5F6, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SAMPACE INSTITUTE</div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>sampacecampus.com.ng</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 260 }}>Nine world-class schools. One powerful platform. Where excellence begins.</p>
            </div>
            {[
              { title: "Our Schools", links: ["School College", "Tutorial & Exam", "School of Technology", "Pre-University", "Advanced & International"] },
              { title: "More Schools", links: ["Business & Professional", "Communication & Diction", "School of Languages", "Professional Services"] },
              { title: "Quick Links", links: ["Apply for Admission", "Student Login", "Parent Portal", "Contact Us", "About SAMPACE"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#64B5F6", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 SAMPACE INSTITUTE · All rights reserved · Launching August 2026</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Built with 💙 for Nigerian excellence</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
