import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

// ─── CONFIG ───
const WA = "https://chat.whatsapp.com/HLWOIKvXhjqIjYAfOFjvTp";
const EMAIL = "info@sampacecampus.com.ng";

// Demo credentials
const DEMO = {
  admin:   { email: "admin@sampacecampus.com.ng",   pass: "admin2026"   },
  staff:   { email: "staff@sampacecampus.com.ng",    pass: "staff2026"   },
  student: { email: "student@sampacecampus.com.ng",  pass: "student2026" },
  parent:  { email: "parent@sampacecampus.com.ng",   pass: "parent2026"  },
};

// ─── GLOBAL CSS ───
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Syne:wght@400;600;700;800&family=Space+Mono&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Syne',sans-serif;background:#050A14;color:#fff;overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#050A14;}
  ::-webkit-scrollbar-thumb{background:linear-gradient(#C9A84C,#1565C0);border-radius:2px;}
  input,textarea,select,button{font-family:'Syne',sans-serif;}
  input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3);}
  input:focus,textarea:focus,select:focus{outline:none;border-color:#C9A84C!important;}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes spinSlowR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  @keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.2)}50%{box-shadow:0 0 60px rgba(201,168,76,0.55)}}
  @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scanLine{0%{top:-2px}100%{top:100%}}
  @keyframes particleRise{0%{transform:translateY(100vh) scale(0);opacity:0}10%{opacity:.8}90%{opacity:.8}100%{transform:translateY(-80px) scale(1.2);opacity:0}}
  @keyframes borderPulse{0%,100%{border-color:rgba(201,168,76,0.2)}50%{border-color:rgba(201,168,76,0.7)}}
  @keyframes modalIn{from{opacity:0;transform:translateY(80px)}to{opacity:1;transform:translateY(0)}}
  .shimmer{background:linear-gradient(90deg,#C9A84C 0%,#FFD54F 30%,#fff 50%,#FFD54F 70%,#C9A84C 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;}
  .hover-lift{transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s ease;cursor:pointer;}
  .hover-lift:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 28px 56px rgba(0,0,0,0.4);}
  .page-in{animation:slideUp .5s cubic-bezier(.4,0,.2,1) both;}
  .inp{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:11px 14px;color:#fff;font-size:13px;}
  .card{background:#fff;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;}
`;

// ─── PARTICLES ───
function Particles({ n = 18 }) {
  const pts = Array.from({ length: n }, (_, i) => ({
    id: i, left: Math.random() * 100, sz: Math.random() * 3 + 1,
    dur: Math.random() * 14 + 7, delay: Math.random() * 10,
    col: i % 3 === 0 ? "#C9A84C" : i % 3 === 1 ? "#42A5F5" : "rgba(255,255,255,.18)",
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {pts.map(p => (
        <div key={p.id} style={{ position: "absolute", bottom: -10, left: `${p.left}%`, width: p.sz, height: p.sz, borderRadius: "50%", background: p.col, boxShadow: `0 0 ${p.sz * 3}px ${p.col}`, animation: `particleRise ${p.dur}s ${p.delay}s linear infinite` }} />
      ))}
    </div>
  );
}

// ─── 3D ORBIT ───
function Orbit3D() {
  return (
    <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,.2),transparent 70%)", animation: "pulse 3s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#C9A84C,#FFD54F,#1565C0)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 900, color: "#0B1F3A", boxShadow: "0 0 50px rgba(201,168,76,.6)", animation: "glow 3s ease-in-out infinite", zIndex: 10 }}>SI</div>
      {[{ s: 120, c: "rgba(201,168,76,.2)", d: "10s" }, { s: 155, c: "rgba(66,165,245,.15)", d: "16s", r: true }, { s: 190, c: "rgba(255,255,255,.06)", d: "22s" }].map((r, i) => (
        <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: r.s, height: r.s, marginLeft: -r.s / 2, marginTop: -r.s / 2, borderRadius: "50%", border: `1px solid ${r.c}`, animation: `${r.r ? "spinSlowR" : "spinSlow"} ${r.d} linear infinite` }}>
          <div style={{ position: "absolute", top: -3, left: "50%", marginLeft: -3, width: 7, height: 7, borderRadius: "50%", background: i === 0 ? "#C9A84C" : i === 1 ? "#42A5F5" : "rgba(255,255,255,.4)" }} />
        </div>
      ))}
      {[["🎓", 0], ["📝", 72], ["💻", 144], ["🏛️", 216], ["🤝", 288]].map(([e, angle], i) => {
        const rad = (angle * Math.PI) / 180, x = Math.cos(rad) * 78, y = Math.sin(rad) * 78;
        return <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`, width: 26, height: 26, borderRadius: 8, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, animation: `floatY ${3 + i * .4}s ease-in-out infinite`, animationDelay: `${i * .5}s`, zIndex: 5 }}>{e}</div>;
      })}
    </div>
  );
}

// ─── COUNT UP ───
function CountUp({ to, suf = "", label }) {
  const [v, setV] = useState(0), ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const num = parseInt(to), step = Math.max(1, Math.ceil(num / 40));
        let cur = 0;
        const t = setInterval(() => { cur += step; if (cur >= num) { setV(num); clearInterval(t); } else setV(cur); }, 40);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <div ref={ref} style={{ textAlign: "center" }}><div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "#C9A84C", lineHeight: 1, textShadow: "0 0 24px rgba(201,168,76,.4)" }}>{v}{suf}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div></div>;
}

// ─── SCHOOLS DATA ───
const SCHOOLS = [
  { id: "school-college", num: "01", emoji: "🎓", name: "School College", short: "JSS1–SS3 · Virtual Campus", color: "#1565C0", accent: "#64B5F6", g1: "#0B2A5E", g2: "#1565C0", desc: "Nigeria's premier online secondary school. Full JSS1–SS3 curriculum, virtual labs, CBT exams and globally competitive academic standards.", tags: ["JSS1–SS3", "Virtual Lab", "WAEC·NECO", "CBT", "Report Cards"], applyType: "parent-student", depts: ["Sciences", "Humanities", "Business/Commercial"], classes: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"], features: [{ icon: "🧪", t: "Virtual Science Lab", d: "Physics, Chemistry, Biology simulations via PhET — free, no install needed" }, { icon: "📚", t: "Digital Library", d: "Textbooks, past questions, e-resources and video lessons" }, { icon: "📝", t: "CBT Exam Engine", d: "Objective, theory, fill-in-gap and diagram questions with timer" }, { icon: "📊", t: "Report Cards", d: "CA1(10) + CA2(10) + Project(10) + Exam(70) per term" }, { icon: "🎬", t: "Live Classes", d: "BigBlueButton virtual classroom — free, record, whiteboard, attendance" }, { icon: "👨‍👩‍👧", t: "Parent Dashboard", d: "Auto-created on admission — track progress, attendance, reports" }] },
  { id: "tutorial", num: "02", emoji: "📝", name: "Tutorial & Local Exam", short: "BECE · WAEC · NECO · GCE · JAMB", color: "#00897B", accent: "#4DB6AC", g1: "#003D2E", g2: "#00695C", desc: "Intensive exam preparation for every major Nigerian examination — CBT simulators, virtual labs and monthly ranked mock tests.", tags: ["BECE", "WAEC", "NECO", "JAMB/UTME", "CBT", "Virtual Lab"], applyType: "student-only", tracks: ["BECE", "WAEC", "NECO", "GCE", "JAMB/UTME"], features: [{ icon: "🎯", t: "5 Exam Tracks", d: "BECE, WAEC, NECO, GCE and JAMB — pick your track" }, { icon: "💻", t: "JAMB CBT Simulator", d: "Exact JAMB interface — 160 questions, 2-hour countdown" }, { icon: "📅", t: "Monthly Mock Tests", d: "Scheduled, auto-graded, ranked — see your position" }, { icon: "🧪", t: "Virtual Lab", d: "Science practicals for Biology, Chemistry, Physics tracks" }, { icon: "🏆", t: "Leaderboard", d: "Monthly top performers celebrated with digital badges" }, { icon: "📜", t: "Certificate", d: "Digital Certificate of Participation for all candidates" }] },
  { id: "digital-campus", num: "03–08", emoji: "🏫", name: "SAMPACE Digital Campus", short: "Technology · Business · Languages · Communication · International", color: "#7B1FA2", accent: "#CE93D8", g1: "#1A0040", g2: "#4A148C", desc: "Six specialist schools — cohort-based professional learning with live classes, community and career-focused digital certification.", tags: ["Technology", "PMP·ACCA·ICAN", "IELTS·SAT", "Languages", "Certificates"], applyType: "individual", subSchools: [{ id: "technology", name: "School of Technology", emoji: "💻", color: "#4A148C", courses: ["Full-Stack Web Dev", "Cybersecurity", "Data Science", "UI/UX", "Mobile App", "Cloud/AWS"] }, { id: "business", name: "Business & Professional", emoji: "📊", color: "#006064", courses: ["ACCA", "ICAN", "PMP", "CFA", "CIMA", "CIPM"] }, { id: "international", name: "Advanced & International", emoji: "🌍", color: "#880E4F", courses: ["IELTS", "SAT", "A-Level", "TOEFL", "GRE", "GMAT"] }, { id: "communication", name: "Communication & Diction", emoji: "🎤", color: "#0277BD", courses: ["Public Speaking", "Diction", "Presentation", "Debate", "Media Training"] }, { id: "languages", name: "School of Languages", emoji: "🌐", color: "#311B92", courses: ["French", "Spanish", "Arabic", "Mandarin", "German", "Yoruba"] }], features: [{ icon: "💻", t: "School of Technology", d: "Web Dev, Cybersecurity, Data Science, UI/UX" }, { icon: "📊", t: "Business & Professional", d: "PMP, ACCA, ICAN, CFA certifications" }, { icon: "🌍", t: "Advanced & International", d: "SAT, IELTS, A-Level, TOEFL" }, { icon: "🎤", t: "Communication & Diction", d: "Public speaking, diction, media training" }, { icon: "🌐", t: "School of Languages", d: "French, Spanish, Arabic, Mandarin" }, { icon: "🏆", t: "Certificates", d: "Digital certificates on course completion" }] },
  { id: "pre-university", num: "04", emoji: "🏛️", name: "Pre-University College", short: "IJMB · JUPEB · Pre-Degree · Diploma", color: "#BF360C", accent: "#FFAB91", g1: "#3E1A00", g2: "#BF360C", desc: "Your gateway to 200-level university admission. IJMB, JUPEB, Pre-Degree and Diploma — university-standard, fully online with official transcripts and certificates.", tags: ["IJMB", "JUPEB", "Diploma", "200 Level", "Transcripts"], applyType: "parent-student", programs: ["IJMB", "JUPEB", "Pre-Degree", "Diploma"], classes: ["IJMB — Year 1", "IJMB — Year 2", "JUPEB — Year 1", "JUPEB — Year 2", "Pre-Degree", "Diploma"], features: [{ icon: "🎓", t: "IJMB Programme", d: "Direct 200-level university entry without JAMB — 2 years" }, { icon: "🏛️", t: "JUPEB Programme", d: "University-affiliated advanced level qualification" }, { icon: "📘", t: "Pre-Degree", d: "1-year foundation programme for 100-level university entry" }, { icon: "📜", t: "Diploma", d: "Professional diploma in specialist fields — 1 year" }, { icon: "📋", t: "Official Transcript", d: "Semester transcript auto-generated for each student" }, { icon: "🎯", t: "University Placement", d: "Advisory and support for admission into top universities" }] },
  { id: "services", num: "09", emoji: "🤝", name: "Professional Services", short: "CV · Admissions · Consulting · Study Abroad", color: "#E65100", accent: "#FFD180", g1: "#1A1000", g2: "#E65100", desc: "Expert personalised services — CV writing, university admission support, scholarship research, study abroad guidance and corporate training. All custom-priced.", tags: ["CV Writing", "Admission Help", "Scholarships", "Study Abroad", "Corporate"], applyType: "inquiry", services: ["CV & Resume Writing", "University Admission Support", "Scholarship Research", "Study Abroad Guidance", "Corporate Training", "SOP Writing", "Educational Counselling", "Document Attestation"], features: [{ icon: "📄", t: "CV & Resume Writing", d: "ATS-optimised, industry-targeted CVs that get interviews" }, { icon: "🎓", t: "University Admissions", d: "Nigerian and international university applications" }, { icon: "🏆", t: "Scholarship Research", d: "Find and apply for scholarships worldwide" }, { icon: "🌍", t: "Study Abroad", d: "UK, USA, Canada, Australia complete guidance" }, { icon: "🏢", t: "Corporate Training", d: "Bespoke training for organisations and NGOs" }, { icon: "✍️", t: "SOP Writing", d: "Personal statements for postgraduate entry" }] },
];

// ─── INPUT STYLE ───
const inp = { width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8, padding: "11px 13px", color: "#fff", fontSize: 13, marginBottom: 10, outline: "none", boxSizing: "border-box" };
const sel = { ...inp, background: "rgba(11,20,40,.92)" };
const lbl = (c) => ({ fontSize: 10, color: c, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 5 });

// ─── LOGIN SCREEN ───
function LoginScreen({ type, onLogin, onBack }) {
  const [email, setEmail] = useState(""), [pass, setPass] = useState(""), [err, setErr] = useState(""), [loading, setLoading] = useState(false);
  const isAdmin = type === "admin", isStaff = type === "staff";
  const color = isAdmin ? "#1565C0" : isStaff ? "#00897B" : type === "student" ? "#7B1FA2" : "#BF360C";
  const creds = isAdmin ? DEMO.admin : isStaff ? DEMO.staff : type === "student" ? DEMO.student : DEMO.parent;
  const icon = isAdmin ? "⚙️" : isStaff ? "👔" : type === "student" ? "🎓" : "👨‍👩‍👧";
  const title = isAdmin ? "Admin Dashboard" : isStaff ? "Staff Portal" : type === "student" ? "Student Portal" : "Parent Portal";

  const handle = () => {
    setErr(""); setLoading(true);
    setTimeout(() => {
      if (email === creds.email && pass === creds.pass) { onLogin(type); }
      else { setErr("Invalid email or password. Check demo credentials below."); setLoading(false); }
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,#060E1A,${color}40,#060E1A)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <Particles n={12} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="page-in" style={{ background: "rgba(5,10,20,.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "40px 28px", width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.6)", padding: "6px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", marginBottom: 24 }}>← Back to Site</button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, background: `linear-gradient(135deg,${color},${color}cc)`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 14px", boxShadow: `0 8px 28px ${color}50`, animation: "glow 3s ease-in-out infinite" }}>{icon}</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>SAMPACE INSTITUTE</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl(color)}>Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder={creds.email} style={{ ...inp, marginBottom: 0 }} onKeyDown={e => e.key === "Enter" && handle()} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl(color)}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter password" style={{ ...inp, marginBottom: 0 }} onKeyDown={e => e.key === "Enter" && handle()} />
        </div>
        {err && <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)", color: "#EF4444", padding: "8px 12px", borderRadius: 7, fontSize: 12, marginBottom: 10 }}>{err}</div>}
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: "10px 13px", marginBottom: 16, fontSize: 11, color: "rgba(255,255,255,.4)" }}>
          📋 Demo — Email: <span style={{ color, fontFamily: "monospace" }}>{creds.email}</span><br />Password: <span style={{ color, fontFamily: "monospace" }}>{creds.pass}</span>
        </div>
        <button onClick={handle} disabled={loading} style={{ width: "100%", background: loading ? `${color}80` : `linear-gradient(135deg,${color},${color}cc)`, color: "#fff", border: "none", padding: "13px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Signing in..." : "Login to " + title + " →"}
        </button>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: "rgba(255,255,255,.25)" }}>
          Forgot password? Contact <a href={`mailto:${EMAIL}`} style={{ color, textDecoration: "none" }}>admin</a>
        </div>
      </div>
    </div>
  );
}

// ─── APPLY MODAL ───
function ApplyModal({ school, onClose }) {
  const [step, setStep] = useState(1), [appType, setAppType] = useState("parent"), [done, setDone] = useState(false);
  const ac = lbl(school.accent);
  if (done) return (
    <div style={{ textAlign: "center", padding: "36px 16px" }}>
      <div style={{ fontSize: 56, marginBottom: 12, animation: "floatY 2s ease-in-out infinite" }}>🎉</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{school.applyType === "inquiry" ? "Inquiry Received!" : "Application Submitted!"}</div>
      <p style={{ color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 16, fontSize: 13 }}>{school.applyType === "inquiry" ? "Our consultant will respond within 48 hours." : "Our admissions team will review within 72 hours. Check your email and WhatsApp."}</p>
      <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "13px 16px", marginBottom: 14, textAlign: "left" }}>
        <div style={{ fontSize: 10, color: school.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>Reference Number</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 17, color: "#fff" }}>{school.num.replace("–", "-")}-{Math.floor(Math.random() * 9000 + 1000)}</div>
      </div>
      <div style={{ background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.18)", borderRadius: 9, padding: "11px 14px", marginBottom: 14, fontSize: 11, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>
        💡 Admin reviews → sends payment details → student and parent portals activate after payment confirmation
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <a href={WA} style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>💬 Join Community</a>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Close</button>
      </div>
    </div>
  );
  if (school.applyType === "inquiry") return (
    <div>
      {step === 1 && <div>
        <label style={ac}>Full Name *</label><input style={inp} placeholder="Your full name" />
        <label style={ac}>Email *</label><input style={inp} placeholder="email@example.com" />
        <label style={ac}>Phone / WhatsApp *</label><input style={inp} placeholder="+234..." />
        <label style={ac}>Service Needed *</label>
        <select style={sel}><option value="">Select service...</option>{school.services && school.services.map(s => <option key={s}>{s}</option>)}</select>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <a href={WA} style={{ flex: 1, background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>💬 WhatsApp</a>
          <button onClick={() => setStep(2)} style={{ flex: 1, background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Via Form →</button>
        </div>
      </div>}
      {step === 2 && <div>
        <label style={ac}>Describe What You Need *</label>
        <textarea style={{ ...inp, minHeight: 90, resize: "vertical" }} placeholder="Your goals and what you need..." />
        <label style={ac}>Preferred Contact</label>
        <select style={sel}><option>WhatsApp</option><option>Email</option><option>Either</option></select>
        <label style={ac}>Timeline</label>
        <select style={sel}><option>As soon as possible</option><option>Within 1 week</option><option>Within 1 month</option><option>Flexible</option></select>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>← Back</button>
          <button onClick={() => setDone(true)} style={{ flex: 2, background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✅ Submit</button>
        </div>
      </div>}
    </div>
  );
  if (school.applyType === "student-only") return (
    <div>
      {step === 1 && <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={ac}>First Name *</label><input style={inp} placeholder="First" /></div>
          <div><label style={ac}>Last Name *</label><input style={inp} placeholder="Last" /></div>
        </div>
        <label style={ac}>Email *</label><input style={inp} placeholder="email@example.com" />
        <label style={ac}>Phone / WhatsApp *</label><input style={inp} placeholder="+234..." />
        <label style={ac}>Date of Birth *</label><input type="date" style={inp} />
        <label style={ac}>State of Origin *</label><input style={inp} placeholder="State" />
        <button onClick={() => setStep(2)} style={{ width: "100%", background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "12px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Next →</button>
      </div>}
      {step === 2 && <div>
        <label style={ac}>Exam Track *</label>
        <select style={sel}><option value="">Select track...</option>{school.tracks && school.tracks.map(t => <option key={t}>{t}</option>)}</select>
        <label style={ac}>Package</label>
        <select style={sel}><option>Full Package — All Subjects</option><option>Bundle — 2–4 Subjects</option><option>Single Subject</option></select>
        <label style={ac}>How Did You Hear About Us?</label>
        <select style={sel}><option>Social Media</option><option>Friend/Referral</option><option>Google</option><option>School</option><option>Other</option></select>
        <div style={{ background: "rgba(77,182,172,.07)", border: "1px solid rgba(77,182,172,.2)", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
          💳 Payment details sent after submission. Access enabled by admin after payment confirmation.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>← Back</button>
          <button onClick={() => setDone(true)} style={{ flex: 2, background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Submit ✓</button>
        </div>
      </div>}
    </div>
  );
  return (
    <div>
      {step === 1 && <div>
        <label style={ac}>Application Type *</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[["parent", "👨‍👩‍👧 Parent/Guardian"], ["self", "🎓 Self-Sponsored"]].map(([v, l]) => (
            <div key={v} onClick={() => setAppType(v)} style={{ border: `2px solid ${appType === v ? school.color : "rgba(255,255,255,.1)"}`, borderRadius: 8, padding: "11px 10px", cursor: "pointer", background: appType === v ? `${school.color}18` : "rgba(255,255,255,.03)", textAlign: "center", fontSize: 12, color: appType === v ? "#fff" : "rgba(255,255,255,.5)", fontWeight: appType === v ? 700 : 400, transition: "all .2s" }}>{l}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={ac}>First Name *</label><input style={inp} placeholder="First" /></div>
          <div><label style={ac}>Last Name *</label><input style={inp} placeholder="Last" /></div>
        </div>
        <label style={ac}>Date of Birth *</label><input type="date" style={inp} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={ac}>Gender *</label><select style={sel}><option>Male</option><option>Female</option></select></div>
          <div><label style={ac}>State *</label><input style={inp} placeholder="State" /></div>
        </div>
        <label style={ac}>Email / Phone *</label><input style={inp} placeholder="Email or phone" />
        {appType === "parent" && <div style={{ background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.15)", borderRadius: 8, padding: "9px 12px", marginBottom: 10, fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>👨‍👩‍👧 Parent portal auto-created on admission. Can register multiple children under one account.</div>}
        <button onClick={() => setStep(2)} style={{ width: "100%", background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "12px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Next →</button>
      </div>}
      {step === 2 && <div>
        {appType === "parent" ? <div>
          <label style={ac}>Guardian Full Name *</label><input style={inp} placeholder="Guardian name" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><label style={ac}>Relationship *</label><select style={sel}><option>Father</option><option>Mother</option><option>Uncle</option><option>Aunt</option><option>Guardian</option></select></div>
            <div><label style={ac}>Guardian Phone *</label><input style={inp} placeholder="+234..." /></div>
          </div>
          <label style={ac}>Guardian Email *</label><input style={inp} placeholder="guardian@email.com" />
        </div> : <div>
          <label style={ac}>Your Email *</label><input style={inp} placeholder="email@example.com" />
          <label style={ac}>Your Phone *</label><input style={inp} placeholder="+234..." />
          <label style={ac}>Occupation</label><input style={inp} placeholder="Current occupation" />
        </div>}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>← Back</button>
          <button onClick={() => setStep(3)} style={{ flex: 2, background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Academic Info →</button>
        </div>
      </div>}
      {step === 3 && <div>
        {school.programs && <><label style={ac}>Programme *</label><select style={sel}><option value="">Select...</option>{school.programs.map(p => <option key={p}>{p}</option>)}</select></>}
        {school.depts && <><label style={ac}>Department (SSS) *</label><select style={sel}><option value="">Select...</option>{school.depts.map(d => <option key={d}>{d}</option>)}</select></>}
        {school.classes && <><label style={ac}>Class / Level *</label><select style={sel}><option value="">Select...</option>{school.classes.map(c => <option key={c}>{c}</option>)}</select></>}
        <label style={ac}>Previous School</label><input style={inp} placeholder="Previous school name" />
        <label style={ac}>How Did You Hear About Us?</label>
        <select style={sel}><option>Social Media</option><option>Friend/Referral</option><option>Google</option><option>School Partnership</option><option>WhatsApp</option><option>Other</option></select>
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "10px 12px", marginBottom: 12, fontSize: 11, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
          💳 Admin reviews → payment details sent → student + parent portals activated after payment confirmation.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(2)} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>← Back</button>
          <button onClick={() => setDone(true)} style={{ flex: 2, background: `linear-gradient(135deg,${school.g2},${school.color})`, border: "none", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🎓 Submit Application</button>
        </div>
      </div>}
    </div>
  );
}

// ─── SCHOOL PAGE ───
function SchoolPage({ school, onBack, onLogin }) {
  const [showForm, setShowForm] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  return (
    <div className="page-in" style={{ fontFamily:"'Syne',sans-serif", background:"#050A14", minHeight:"100vh" }}>
      <div style={{ padding:"12px 18px", background:"rgba(5,10,20,.96)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:200 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)", color:"#fff", padding:"7px 16px", borderRadius:7, fontSize:12, cursor:"pointer", fontWeight:600 }}>← Back</button>
        <div style={{ flex:1, fontSize:11, color:"rgba(255,255,255,.35)", fontFamily:"'Space Mono',monospace" }}>SAMPACE › {school.name}</div>
        <button onClick={()=>setShowForm(true)} style={{ background:`linear-gradient(135deg,${school.g2},${school.color})`, border:"none", color:"#fff", padding:"7px 16px", borderRadius:7, fontSize:12, cursor:"pointer", fontWeight:700 }}>{school.applyType==="inquiry"?"✉️ Inquire":"Apply Now"}</button>
      </div>
      <div style={{ background:`linear-gradient(160deg,${school.g1} 0%,${school.g2} 55%,${school.color} 100%)`, padding:"52px 18px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <Particles n={10} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize:"36px 36px" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ width:72, height:72, borderRadius:20, background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)", border:`1px solid ${school.accent}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, margin:"0 auto 13px", animation:"floatY 4s ease-in-out infinite", boxShadow:`0 0 40px ${school.color}50` }}>{school.emoji}</div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(255,255,255,.4)", letterSpacing:4, marginBottom:5, textTransform:"uppercase" }}>SCHOOL {school.num}</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,5vw,46px)", fontWeight:900, color:"#fff", margin:"0 0 7px", lineHeight:1.05 }}>{school.name}</h1>
          <div style={{ fontSize:12, color:school.accent, marginBottom:13, letterSpacing:1, fontWeight:600 }}>{school.short}</div>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.65)", lineHeight:1.8, maxWidth:480, margin:"0 auto 22px" }}>{school.desc}</p>
          <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap", marginBottom:22 }}>{school.tags.map(t=><span key={t} style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", color:"#fff", padding:"3px 11px", borderRadius:100, fontSize:10, fontWeight:500 }}>{t}</span>)}</div>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setShowForm(true)} style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"12px 26px", borderRadius:8, fontSize:13, fontWeight:800, cursor:"pointer" }}>{school.applyType==="inquiry"?"✉️ Make Inquiry":"📋 Apply Now"}</button>
            <a href={WA} style={{ background:"rgba(37,211,102,.14)", border:"1px solid rgba(37,211,102,.3)", color:"#fff", padding:"12px 20px", borderRadius:8, fontSize:13, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, fontWeight:600 }}>💬 Join Community</a>
          </div>
        </div>
      </div>
      <div style={{ padding:"28px 16px", maxWidth:660, margin:"0 auto" }}>
        <div style={{ background:"rgba(21,101,192,.08)", border:"1px solid rgba(21,101,192,.2)", borderRadius:12, padding:"16px 18px", marginBottom:22, display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ fontSize:28, flexShrink:0 }}>🎓</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:12, color:"#fff", marginBottom:3 }}>Live Classes · Virtual Labs · CBT Exams · All on this platform</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", lineHeight:1.5 }}>All lessons, classes, labs and exams accessible after enrollment and payment confirmation.</div>
          </div>
        </div>
        {school.subSchools && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:school.accent, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:13, textAlign:"center" }}>Tap a School to Explore</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {school.subSchools.map(sub=>(
                <div key={sub.id} className="hover-lift" onClick={()=>setOpenSub(openSub===sub.id?null:sub.id)} style={{ background:`${sub.color}18`, border:`2px solid ${openSub===sub.id?sub.color:"rgba(255,255,255,.07)"}`, borderRadius:12, padding:"16px 13px", transition:"all .3s" }}>
                  <div style={{ fontSize:22, marginBottom:7 }}>{sub.emoji}</div>
                  <div style={{ fontWeight:700, fontSize:12, color:"#fff", marginBottom:4, lineHeight:1.2 }}>{sub.name}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>
                    {sub.courses.slice(0,2).map(c=><span key={c} style={{ background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.4)", padding:"1px 6px", borderRadius:100, fontSize:9 }}>{c}</span>)}
                    <span style={{ background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.3)", padding:"1px 6px", borderRadius:100, fontSize:9 }}>+{sub.courses.length-2}</span>
                  </div>
                  {openSub===sub.id && (
                    <div style={{ paddingTop:10, borderTop:"1px solid rgba(255,255,255,.07)", marginTop:8 }}>
                      {sub.courses.map(c=><div key={c} style={{ fontSize:11, color:"rgba(255,255,255,.55)", padding:"3px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>→ {c}</div>)}
                      <button onClick={e=>{e.stopPropagation();setShowForm(true);}} style={{ width:"100%", background:`linear-gradient(135deg,${sub.color},${sub.color}cc)`, border:"none", color:"#fff", padding:"9px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer", marginTop:10 }}>Enroll in {sub.name} →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,3.5vw,28px)", color:"#fff", textAlign:"center", marginBottom:18, fontWeight:700 }}>What We <span className="shimmer">Offer</span></h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11, marginBottom:24 }}>
          {school.features.map((f,i)=>(
            <div key={i} className="hover-lift" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:11, padding:"17px 13px", borderTop:`3px solid ${school.color}` }}>
              <div style={{ fontSize:24, marginBottom:7 }}>{f.icon}</div>
              <div style={{ fontWeight:700, fontSize:12, color:"#fff", marginBottom:3 }}>{f.t}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", lineHeight:1.5 }}>{f.d}</div>
            </div>
          ))}
        </div>
        {(school.applyType==="parent-student"||school.applyType==="student-only") && (
          <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:13, padding:"20px 16px", marginBottom:20 }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"#fff", fontWeight:700, marginBottom:4 }}>Already Enrolled? Login Here</h3>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:14 }}>Access your classes, timetable, CBT exams, virtual labs and report cards.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
              <div><div style={{ fontSize:10, color:school.accent, fontWeight:700, letterSpacing:1.5, marginBottom:5, textTransform:"uppercase" }}>Student ID</div><input style={{ ...inp, marginBottom:0, fontFamily:"'Space Mono',monospace" }} placeholder="e.g. SC/2026/0001"/></div>
              <div><div style={{ fontSize:10, color:school.accent, fontWeight:700, letterSpacing:1.5, marginBottom:5, textTransform:"uppercase" }}>Password</div><input type="password" style={{ ...inp, marginBottom:0 }} placeholder="••••••••"/></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
              <button onClick={()=>onLogin("student")} style={{ background:`linear-gradient(135deg,${school.g2},${school.color})`, border:"none", color:"#fff", padding:"11px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>🎓 Student Login</button>
              <button onClick={()=>onLogin("parent")} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:"#fff", padding:"11px", borderRadius:8, fontSize:12, cursor:"pointer" }}>👨‍👩‍👧 Parent Login</button>
            </div>
            <div style={{ textAlign:"center", fontSize:10, color:"rgba(255,255,255,.22)" }}>Login credentials sent via email after admission and payment confirmation</div>
          </div>
        )}
        <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:11, padding:"16px", textAlign:"center" }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", marginBottom:10 }}>Questions? Contact us directly</div>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={WA} style={{ background:"rgba(37,211,102,.1)", border:"1px solid rgba(37,211,102,.2)", color:"#fff", padding:"8px 16px", borderRadius:7, fontSize:11, textDecoration:"none", fontWeight:600 }}>💬 WhatsApp Community</a>
            <a href={`mailto:${EMAIL}`} style={{ background:"rgba(21,101,192,.1)", border:"1px solid rgba(21,101,192,.2)", color:"#fff", padding:"8px 16px", borderRadius:7, fontSize:11, textDecoration:"none", fontWeight:600 }}>📧 Email Us</a>
          </div>
        </div>
      </div>
      {showForm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.88)", backdropFilter:"blur(10px)", zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={()=>setShowForm(false)}>
          <div style={{ background:"#0C1828", borderRadius:"18px 18px 0 0", width:"100%", maxWidth:540, maxHeight:"88vh", overflow:"auto", padding:"22px 18px 40px", border:"1px solid rgba(255,255,255,.08)", borderBottom:"none", animation:"slideUp .4s ease" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#fff" }}>{school.applyType==="inquiry"?"Make an Inquiry":`Apply — ${school.name}`}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginTop:2 }}>SAMPACE INSTITUTE</div>
              </div>
              <button onClick={()=>setShowForm(false)} style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", color:"#fff", width:34, height:34, borderRadius:"50%", cursor:"pointer", fontSize:16 }}>×</button>
            </div>
            <ApplyModal school={school} onClose={()=>setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOMEPAGE ───
function Homepage({ onSelect, onLogin }) {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => { const fn=()=>setScrollY(window.scrollY); window.addEventListener("scroll",fn,{passive:true}); return ()=>window.removeEventListener("scroll",fn); }, []);
  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:"#050A14", minHeight:"100vh" }}>
      <nav style={{ padding:"12px 18px", position:"fixed", top:0, left:0, right:0, zIndex:300, background:scrollY>50?"rgba(5,10,20,.97)":"transparent", backdropFilter:scrollY>50?"blur(20px)":"none", borderBottom:scrollY>50?"1px solid rgba(255,255,255,.06)":"none", transition:"all .4s ease", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:34, height:34, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:900, color:"#0B1F3A", animation:"glow 4s ease-in-out infinite" }}>SI</div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:"#C9A84C", letterSpacing:2 }}>SAMPACE</div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,.28)", letterSpacing:2, textTransform:"uppercase" }}>INSTITUTE</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:7, alignItems:"center", position:"relative" }}>
          <a href={WA} style={{ background:"rgba(37,211,102,.1)", border:"1px solid rgba(37,211,102,.2)", color:"#fff", padding:"7px 12px", borderRadius:6, fontSize:11, textDecoration:"none", fontWeight:600 }}>💬 Community</a>
          <div style={{ position:"relative" }}>
            <button onClick={()=>setShowMenu(m=>!m)} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)", color:"#fff", padding:"7px 12px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer" }}>🔐 Login ▾</button>
            {showMenu && (
              <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"rgba(11,20,40,.98)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,.1)", borderRadius:10, padding:"8px", minWidth:190, zIndex:400 }}>
                {[["admin","⚙️","Admin Dashboard","#1565C0"],["staff","👔","Staff Portal","#00897B"],["student","🎓","Student Portal","#7B1FA2"],["parent","👨‍👩‍👧","Parent Portal","#BF360C"]].map(([type,icon,label,color])=>(
                  <button key={type} onClick={()=>{setShowMenu(false);onLogin(type);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:7, border:"none", background:"transparent", color:"#fff", fontSize:12, cursor:"pointer", fontWeight:600, textAlign:"left" }} onMouseEnter={e=>e.currentTarget.style.background=`${color}25`} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{ fontSize:16 }}>{icon}</span><span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={()=>onSelect(SCHOOLS[0])} style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"7px 15px", borderRadius:6, fontSize:11, fontWeight:800, cursor:"pointer" }}>Apply Now</button>
        </div>
      </nav>

      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 16px 60px", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 20% 50%,rgba(21,101,192,.12),transparent 60%),radial-gradient(ellipse at 80% 30%,rgba(201,168,76,.07),transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(123,31,162,.1),transparent 60%)" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(201,168,76,.05) 1px,transparent 1px)", backgroundSize:"38px 38px" }} />
        <div style={{ position:"absolute", left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,.25),transparent)", animation:"scanLine 7s linear infinite", pointerEvents:"none", zIndex:2 }} />
        <Particles n={22} />
        <div style={{ position:"relative", zIndex:3, maxWidth:720 }}>
          <div style={{ marginBottom:22 }}><Orbit3D /></div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(201,168,76,.3)", background:"rgba(201,168,76,.05)", backdropFilter:"blur(8px)", borderRadius:100, padding:"5px 16px", fontSize:10, color:"#C9A84C", letterSpacing:2, textTransform:"uppercase", marginBottom:18, animation:"borderPulse 3s ease-in-out infinite" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"pulse 2s ease-in-out infinite" }} />
            Live · sampaceinstitute.netlify.app
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(38px,9vw,82px)", fontWeight:900, lineHeight:.9, marginBottom:13, letterSpacing:-2 }}>
            <span style={{ display:"block", background:"linear-gradient(135deg,#fff,#64B5F6,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>SAMPACE</span>
            <span className="shimmer" style={{ fontStyle:"italic" }}>Institute</span>
          </h1>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(8px,1.5vw,11px)", letterSpacing:6, color:"rgba(255,255,255,.25)", marginBottom:16, textTransform:"uppercase" }}>Where Excellence Begins</div>
          <p style={{ fontSize:"clamp(12px,2vw,14px)", color:"rgba(255,255,255,.5)", lineHeight:1.85, maxWidth:480, margin:"0 auto 26px" }}>Nine world-class schools. Virtual Labs · CBT Exams · Live Classes · Parent Portals. Everything online.</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:44 }}>
            <button onClick={()=>document.getElementById("schools-sec").scrollIntoView({behavior:"smooth"})} style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", border:"none", padding:"12px 26px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 8px 28px rgba(21,101,192,.4)" }}>Explore Schools →</button>
            <button onClick={()=>onSelect(SCHOOLS[0])} style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"12px 26px", borderRadius:8, fontSize:13, fontWeight:800, cursor:"pointer" }}>Apply Now</button>
            <a href={WA} style={{ background:"rgba(37,211,102,.12)", border:"1px solid rgba(37,211,102,.25)", color:"#fff", padding:"12px 20px", borderRadius:8, fontSize:13, textDecoration:"none", fontWeight:600, display:"inline-flex", alignItems:"center", gap:6 }}>💬 Community</a>
          </div>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", paddingTop:32, borderTop:"1px solid rgba(255,255,255,.06)" }}>
            <CountUp to="9" suf="" label="Schools" /><CountUp to="20" suf="+" label="Programmes" /><CountUp to="100" suf="%" label="Online" /><CountUp to="2026" suf="" label="Est. Year" />
          </div>
        </div>
      </section>

      <div style={{ background:"linear-gradient(135deg,rgba(21,101,192,.1),rgba(201,168,76,.05))", borderTop:"1px solid rgba(21,101,192,.18)", borderBottom:"1px solid rgba(21,101,192,.18)", padding:"14px 16px" }}>
        <div style={{ maxWidth:660, margin:"0 auto", display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ fontSize:24, flexShrink:0 }}>🎓</div>
          <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:12, color:"#fff", marginBottom:3 }}>Virtual Labs · Live Classes · CBT Engine · Digital Certificates</div><div style={{ fontSize:10, color:"rgba(255,255,255,.4)", lineHeight:1.5 }}>All SAMPACE classes, labs and exams run on our platform. Admin enables student access after payment confirmation.</div></div>
        </div>
      </div>

      <section id="schools-sec" style={{ padding:"64px 16px" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#C9A84C", letterSpacing:4, textTransform:"uppercase", marginBottom:10 }}>Our Academic Portfolio</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,5vw,46px)", fontWeight:900, color:"#fff", lineHeight:1.05 }}>Nine <span className="shimmer" style={{ fontStyle:"italic" }}>Schools.</span><br/>One Vision.</h2>
        </div>
        <div style={{ maxWidth:660, margin:"0 auto", display:"flex", flexDirection:"column", gap:11 }}>
          {SCHOOLS.map((s,i)=>(
            <div key={s.id} className="hover-lift" onMouseEnter={()=>setHovered(s.id)} onMouseLeave={()=>setHovered(null)} onClick={()=>onSelect(s)} style={{ background:`linear-gradient(135deg,${s.g1}40,${s.color}20)`, border:`1px solid ${hovered===s.id?s.color:"rgba(255,255,255,.07)"}`, borderLeft:`4px solid ${s.color}`, borderRadius:13, padding:"18px 15px", transition:"all .3s ease", boxShadow:hovered===s.id?`0 8px 36px ${s.color}28`:"none", animation:`fadeUp .55s ${i*.07}s ease both` }}>
              <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                <div style={{ width:48, height:48, borderRadius:13, background:`${s.color}22`, border:`1px solid ${s.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:23, flexShrink:0, transition:"transform .3s", transform:hovered===s.id?"scale(1.12) rotate(6deg)":"scale(1)" }}>{s.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:s.accent, letterSpacing:2, marginBottom:2, textTransform:"uppercase", fontWeight:700 }}>School {s.num}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,3vw,17px)", fontWeight:700, color:"#fff", marginBottom:3, lineHeight:1.2 }}>{s.name}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", lineHeight:1.4, marginBottom:7 }}>{s.short}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{s.tags.slice(0,3).map(t=><span key={t} style={{ background:`${s.color}18`, border:`1px solid ${s.color}28`, color:s.accent, padding:"2px 8px", borderRadius:100, fontSize:9, fontWeight:600 }}>{t}</span>)}</div>
                </div>
                <div style={{ color:s.color, fontSize:20, transition:"transform .3s", transform:hovered===s.id?"translateX(5px)":"translateX(0)", flexShrink:0 }}>›</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:"40px 16px 64px", maxWidth:520, margin:"0 auto" }}>
        <div style={{ background:"linear-gradient(135deg,rgba(21,101,192,.07),rgba(201,168,76,.04))", border:"1px solid rgba(255,255,255,.07)", borderRadius:18, padding:"26px 20px", textAlign:"center", animation:"borderPulse 5s ease-in-out infinite" }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,3.5vw,26px)", color:"#fff", fontWeight:700, marginBottom:7 }}>Not sure where to start?</h3>
          <p style={{ fontSize:12, color:"rgba(255,255,255,.4)", lineHeight:1.7, marginBottom:18 }}>Our admissions team will guide you to the right school and programme.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            <a href={WA} style={{ display:"flex", alignItems:"center", gap:13, background:"rgba(37,211,102,.1)", border:"1px solid rgba(37,211,102,.18)", borderRadius:11, padding:"12px 16px", textDecoration:"none" }}>
              <span style={{ fontSize:22 }}>💬</span>
              <div style={{ textAlign:"left" }}><div style={{ fontSize:10, color:"#10B981", fontWeight:800, letterSpacing:1, textTransform:"uppercase" }}>WhatsApp Community</div><div style={{ fontSize:12, color:"#fff", fontWeight:500 }}>Join our student community</div></div>
            </a>
            <a href={`mailto:${EMAIL}`} style={{ display:"flex", alignItems:"center", gap:13, background:"rgba(21,101,192,.1)", border:"1px solid rgba(21,101,192,.18)", borderRadius:11, padding:"12px 16px", textDecoration:"none" }}>
              <span style={{ fontSize:22 }}>📧</span>
              <div style={{ textAlign:"left" }}><div style={{ fontSize:10, color:"#64B5F6", fontWeight:800, letterSpacing:1, textTransform:"uppercase" }}>Email</div><div style={{ fontSize:12, color:"#fff", fontWeight:500 }}>{EMAIL}</div></div>
            </a>
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:32, paddingTop:18, borderTop:"1px solid rgba(255,255,255,.04)" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"rgba(201,168,76,.45)", fontWeight:700, marginBottom:5 }}>SAMPACE INSTITUTE</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,.16)", lineHeight:1.8 }}>School College · Tutorial & Exam · Digital Campus · Pre-University · Professional Services<br/>© 2026 SAMPACE INSTITUTE · Grand Opening August 2026</div>
          <div style={{ marginTop:16, display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>onLogin("admin")} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"rgba(255,255,255,.35)", padding:"6px 14px", borderRadius:6, fontSize:10, cursor:"pointer" }}>⚙️ Admin Login</button>
            <button onClick={()=>onLogin("staff")} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"rgba(255,255,255,.35)", padding:"6px 14px", borderRadius:6, fontSize:10, cursor:"pointer" }}>👔 Staff Login</button>
            <button onClick={()=>onLogin("student")} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"rgba(255,255,255,.35)", padding:"6px 14px", borderRadius:6, fontSize:10, cursor:"pointer" }}>🎓 Student Login</button>
            <button onClick={()=>onLogin("parent")} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"rgba(255,255,255,.35)", padding:"6px 14px", borderRadius:6, fontSize:10, cursor:"pointer" }}>👨‍👩‍👧 Parent Login</button>
          </div>
        </div>
      </section>

      <a href={WA} style={{ position:"fixed", bottom:22, right:18, width:50, height:50, background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, zIndex:999, boxShadow:"0 6px 22px rgba(37,211,102,.45)", animation:"glow 3s ease-in-out infinite", textDecoration:"none" }}>💬</a>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───
function AdminDashboard({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [sideOpen, setSideOpen] = useState(true);
  const C = { navy:"#0B1F3A", blue:"#1565C0", sky:"#42A5F5", gold:"#C9A84C", cream:"#F8FAFF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", red:"#EF4444", amber:"#F59E0B", purple:"#7C3AED" };
  const NAV = [
    {id:"overview",icon:"⊞",label:"Overview"},
    {id:"applications",icon:"📋",label:"Applications",badge:65},
    {id:"students",icon:"👥",label:"Students"},
    {id:"staff",icon:"👔",label:"Staff"},
    {id:"payments",icon:"💰",label:"Payments"},
    {id:"inquiries",icon:"💬",label:"Inquiries",badge:8},
    {id:"timetable",icon:"📅",label:"Timetable"},
    {id:"announcements",icon:"📣",label:"Announcements"},
    {id:"schools",icon:"🏫",label:"Schools"},
    {id:"settings",icon:"⚙️",label:"Settings"},
  ];
  const APPS = [
    {id:"APP-2601",name:"Adaeze Okonkwo",school:"School College",program:"SS1 Sciences",date:"Today 9:14am",status:"pending"},
    {id:"APP-2600",name:"Emeka Nwosu",school:"Tutorial & Exam",program:"WAEC Track",date:"Today 8:52am",status:"approved"},
    {id:"APP-2599",name:"Fatima Abdullahi",school:"Digital Campus",program:"ACCA",date:"Yesterday",status:"pending"},
    {id:"APP-2598",name:"David Adeleke",school:"Pre-University",program:"IJMB",date:"Yesterday",status:"approved"},
    {id:"APP-2597",name:"Grace Obi",school:"School College",program:"JSS1",date:"2 days ago",status:"rejected"},
  ];
  const STUDS_INIT = [
    {id:"SC/2026/001",name:"Adaeze Okonkwo",school:"School College",cls:"SS1 Sciences",fees:"paid",status:"active",enabled:true},
    {id:"SC/2026/002",name:"Emeka Nwosu",school:"Tutorial",cls:"WAEC Track",fees:"paid",status:"active",enabled:true},
    {id:"SC/2026/003",name:"Fatima Abdullahi",school:"Digital Campus",cls:"ACCA",fees:"pending",status:"pending",enabled:false},
    {id:"SC/2026/004",name:"David Adeleke",school:"Pre-University",cls:"IJMB",fees:"paid",status:"active",enabled:false},
  ];
  const PAYS_INIT = [
    {name:"Emeka Nwosu",school:"Tutorial",amount:45000,date:"Today",status:"confirmed",enabled:true},
    {name:"David Adeleke",school:"Pre-University",amount:120000,date:"Today",status:"confirmed",enabled:false},
    {name:"Adaeze Okonkwo",school:"School College",amount:85000,date:"Yesterday",status:"confirmed",enabled:true},
    {name:"Fatima Abdullahi",school:"Digital Campus",amount:65000,date:"Yesterday",status:"pending",enabled:false},
  ];
  const [studs, setStuds] = useState(STUDS_INIT);
  const [pays, setPays] = useState(PAYS_INIT);
  const fmt = n => "₦" + n.toLocaleString();
  const badge = (s) => {
    const m = { pending:{bg:"rgba(245,158,11,.1)",c:"#F59E0B"}, approved:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, rejected:{bg:"rgba(239,68,68,.1)",c:"#EF4444"}, active:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, paid:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, confirmed:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, overdue:{bg:"rgba(239,68,68,.1)",c:"#EF4444"} };
    const b = m[s] || {bg:"rgba(100,116,139,.1)",c:"#64748B"};
    return <span style={{ background:b.bg, color:b.c, padding:"3px 9px", borderRadius:100, fontSize:10, fontWeight:700, textTransform:"capitalize" }}>{s}</span>;
  };
  const enableStudent = (id) => setStuds(ss => ss.map(s => s.id===id ? {...s, enabled:true, status:"active"} : s));
  const enablePayment = (i) => setPays(pp => pp.map((p,idx) => idx===i ? {...p, enabled:true} : p));

  const renderPage = () => {
    if (page === "overview") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Good morning, <em style={{ color:C.blue }}>Super Admin</em> 👋</h2>
        <div style={{ fontSize:12, color:C.slate, marginBottom:18 }}>SAMPACE INSTITUTE Command Centre · All 9 Schools</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:13, marginBottom:18 }}>
          {[{icon:"👥",label:"Students",val:323,color:C.blue},{icon:"⏳",label:"Pending",val:65,color:C.amber},{icon:"💰",label:"Revenue",val:fmt(7900000),color:C.green},{icon:"👔",label:"Staff",val:38,color:C.purple}].map((k,i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${k.color}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${k.color}` }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{k.icon}</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:24, color:k.color, fontWeight:900, lineHeight:1 }}>{k.val}</div>
              <div style={{ fontSize:11, color:C.navy, fontWeight:600, marginTop:3 }}>{k.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:14 }}>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy, display:"flex", justifyContent:"space-between" }}>
              Recent Applications <button onClick={()=>setPage("applications")} style={{ fontSize:11, color:C.blue, border:"none", background:"none", cursor:"pointer" }}>View All →</button>
            </div>
            {APPS.map(a=>(
              <div key={a.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", borderBottom:"1px solid #F8FAFF" }}>
                <div><div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{a.name}</div><div style={{ fontSize:10, color:C.slate }}>{a.school} · {a.program} · {a.date}</div></div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  {badge(a.status)}
                  {a.status==="pending" && <div style={{ display:"flex", gap:3 }}>
                    <button style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"3px 7px", borderRadius:4, fontSize:10, cursor:"pointer", fontWeight:700 }}>✓</button>
                    <button style={{ background:"rgba(239,68,68,.1)", border:"none", color:C.red, padding:"3px 7px", borderRadius:4, fontSize:10, cursor:"pointer", fontWeight:700 }}>✕</button>
                  </div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy, display:"flex", justifyContent:"space-between" }}>
              Payments <button onClick={()=>setPage("payments")} style={{ fontSize:11, color:C.blue, border:"none", background:"none", cursor:"pointer" }}>View All →</button>
            </div>
            {pays.slice(0,4).map((p,i)=>(
              <div key={i} style={{ padding:"10px 16px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div><div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{p.name}</div><div style={{ fontSize:10, color:C.slate }}>{p.school} · {p.date}</div></div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.green }}>{fmt(p.amount)}</div>
                  {!p.enabled ? <button onClick={()=>enablePayment(i)} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"3px 8px", borderRadius:5, fontSize:9, cursor:"pointer", fontWeight:700, marginTop:2 }}>Enable Access</button> : <span style={{ fontSize:9, color:C.green, fontWeight:700 }}>✓ Access Enabled</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    if (page === "students") return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div><h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy }}>Students</h2><div style={{ fontSize:12, color:C.slate }}>{studs.length} students</div></div>
          <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Add Student</button>
        </div>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.2fr 2fr 1.5fr 1.5fr 0.8fr 0.8fr 1.4fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
            {["ID","Student","School","Class","Fees","Status","Actions"].map(h=><div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>)}
          </div>
          {studs.map(s=>(
            <div key={s.id} style={{ display:"grid", gridTemplateColumns:"1.2fr 2fr 1.5fr 1.5fr 0.8fr 0.8fr 1.4fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
              <div style={{ fontSize:9, color:C.slate, fontFamily:"monospace" }}>{s.id}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ width:24, height:24, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff" }}>{s.name.charAt(0)}</div><div style={{ fontSize:11, fontWeight:600, color:C.navy }}>{s.name}</div></div>
              <div style={{ fontSize:10, color:C.slate }}>{s.school}</div>
              <div style={{ fontSize:10, color:C.slate }}>{s.cls}</div>
              {badge(s.fees)}
              {badge(s.status)}
              <div style={{ display:"flex", gap:4 }}>
                <button style={{ background:`${C.blue}12`, border:`1px solid ${C.blue}25`, color:C.blue, padding:"4px 7px", borderRadius:5, fontSize:9, cursor:"pointer", fontWeight:600 }}>View</button>
                {!s.enabled ? <button onClick={()=>enableStudent(s.id)} style={{ background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", color:C.green, padding:"4px 7px", borderRadius:5, fontSize:9, cursor:"pointer", fontWeight:600 }}>Enable</button> : <span style={{ fontSize:9, color:C.green, fontWeight:700 }}>✓ Active</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    if (page === "payments") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:18 }}>Payments & Finance</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:13, marginBottom:18 }}>
          {[["Total Collected",fmt(7800000),C.green],["Pending",fmt(130000),C.amber],["Overdue",fmt(85000),C.red]].map(([l,v,c],i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${c}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${c}` }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:24, color:c, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          {pays.map((p,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:"1px solid #F8FAFF" }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(16,185,129,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>💳</div>
                <div><div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{p.name}</div><div style={{ fontSize:10, color:C.slate }}>{p.school} · {p.date}</div></div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.green }}>{fmt(p.amount)}</div>
                {badge(p.status)}
                {!p.enabled ? <button onClick={()=>enablePayment(i)} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"5px 12px", borderRadius:6, fontSize:11, cursor:"pointer", fontWeight:700 }}>✓ Enable Access</button> : <span style={{ fontSize:11, color:C.green, fontWeight:700 }}>✅ Access Enabled</span>}
                <button style={{ background:`${C.blue}12`, border:`1px solid ${C.blue}25`, color:C.blue, padding:"5px 10px", borderRadius:6, fontSize:10, cursor:"pointer" }}>Receipt</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    if (page === "timetable") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Class Timetable Manager</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:18 }}>Manage and publish the weekly timetable for all schools.</p>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy, display:"flex", justifyContent:"space-between" }}>
            Add New Class
            <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"6px 14px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>+ Add Class</button>
          </div>
          <div style={{ padding:"16px 18px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["School","select",["School College","Tutorial","Digital Campus","Pre-University"]],["Class","select",["JSS1","JSS2","SS1","SS2","WAEC Track"]],["Subject","text","e.g. English Language"],["Teacher","text","e.g. Mrs. Adeyemi"],["Day","select",["Monday","Tuesday","Wednesday","Thursday","Friday"]],["Time","time",""]].map(([label,type,opts],i)=>(
              <div key={i}>
                <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>{label}</label>
                {type==="select" ? <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}><option>Select...</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
                : <input type={type} placeholder={opts} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>}
              </div>
            ))}
            <div style={{ gridColumn:"1/-1" }}>
              <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>Virtual Classroom Link</label>
              <input placeholder="https://meet.google.com/xxx or BigBlueButton room URL" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>
            </div>
          </div>
        </div>
        <div style={{ background:"rgba(21,101,192,.06)", border:"1px solid rgba(21,101,192,.2)", borderRadius:10, padding:"14px 18px", fontSize:12, color:C.navy }}>
          💡 Use Google Meet (free, no time limit for small groups) or BigBlueButton on Oracle Cloud (free, education-specific, records classes). Paste the meeting link above.
        </div>
      </div>
    );
    return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}><div style={{ fontSize:48, marginBottom:12 }}>🚧</div><h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:8, textTransform:"capitalize" }}>{page}</h2><p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>This section connects to Supabase database in Phase 2.</p></div>;
  };

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
      <aside style={{ width:sideOpen?220:56, background:C.navy, minHeight:"100vh", display:"flex", flexDirection:"column", transition:"width .3s ease", flexShrink:0, position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
        <div style={{ padding:"15px 11px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
          <div style={{ width:30, height:30, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:C.navy, flexShrink:0 }}>SI</div>
          {sideOpen && <div style={{ overflow:"hidden" }}><div style={{ fontSize:11, fontWeight:800, color:"#C9A84C", letterSpacing:2, whiteSpace:"nowrap" }}>SAMPACE ADMIN</div><div style={{ fontSize:8, color:"rgba(255,255,255,.3)" }}>Super Admin</div></div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{ marginLeft:"auto", background:"rgba(255,255,255,.06)", border:"none", color:"rgba(255,255,255,.4)", width:24, height:24, borderRadius:5, cursor:"pointer", fontSize:12, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{sideOpen?"←":"→"}</button>
        </div>
        <nav style={{ flex:1, padding:"10px 7px", overflowY:"auto" }}>
          {NAV.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 10px", borderRadius:7, border:"none", background:page===item.id?"linear-gradient(135deg,rgba(21,101,192,.35),rgba(66,165,245,.15))":"transparent", borderLeft:page===item.id?"2px solid #42A5F5":"2px solid transparent", color:page===item.id?"#fff":"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:2, fontSize:11, fontWeight:page===item.id?600:400, textAlign:"left", whiteSpace:"nowrap" }}>
              <span style={{ fontSize:14, flexShrink:0 }}>{item.icon}</span>
              {sideOpen && <span style={{ flex:1 }}>{item.label}</span>}
              {sideOpen && item.badge && <span style={{ background:C.red, color:"#fff", fontSize:9, fontWeight:700, padding:"1px 5px", borderRadius:100 }}>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          {sideOpen ? <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,.15)", border:"none", color:C.red, padding:"8px", borderRadius:7, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button> : <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", border:"none", color:C.red, width:34, height:34, borderRadius:7, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↩</button>}
        </div>
      </aside>
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 20px", height:50, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", fontSize:10, color:C.slate }}>Admin Dashboard <span style={{ color:"#CBD5E1" }}>›</span> <span style={{ color:C.navy, fontWeight:600, textTransform:"capitalize" }}>{page}</span></div>
          <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#C9A84C,#FFD54F)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:C.navy }}>A</div>
        </header>
        <main style={{ flex:1, padding:"20px", overflowY:"auto" }}>{renderPage()}</main>
      </div>
    </div>
  );
}

// ─── STAFF PORTAL ───
function StaffPortal({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [marked, setMarked] = useState({});
  const [scores, setScores] = useState({});
  const C = { navy:"#0B1F3A", blue:"#1565C0", sky:"#42A5F5", cream:"#F8FAFF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", red:"#EF4444", amber:"#F59E0B" };
  const NAV = [
    {id:"dashboard",icon:"🏠",label:"Dashboard"},
    {id:"classes",icon:"📚",label:"My Classes"},
    {id:"timetable",icon:"📅",label:"Timetable"},
    {id:"grades",icon:"📊",label:"Enter Grades"},
    {id:"attendance",icon:"✅",label:"Attendance"},
    {id:"resources",icon:"📁",label:"Upload Resources"},
    {id:"cbt",icon:"📝",label:"CBT Questions"},
    {id:"messages",icon:"💬",label:"Messages"},
  ];
  const STUDS = [
    {id:"SC/001",name:"Adaeze Okonkwo",cls:"SS1 Sciences",att:92,ca1:8,ca2:9,proj:8},
    {id:"SC/002",name:"Emeka Nwosu",cls:"SS1 Sciences",att:88,ca1:7,ca2:8,proj:7},
    {id:"SC/003",name:"Fatima Abdullahi",cls:"SS1 Sciences",att:79,ca1:6,ca2:7,proj:6},
    {id:"SC/004",name:"David Adeleke",cls:"JSS2A",att:95,ca1:9,ca2:9,proj:9},
    {id:"SC/005",name:"Grace Obi",cls:"JSS2A",att:71,ca1:5,ca2:6,proj:5},
  ];
  const TT = {
    Monday:[{t:"8:00am",sub:"English Language",cls:"SS1 Sciences",live:true},{t:"10:00am",sub:"Literature",cls:"SS1 Sciences"},{t:"2:00pm",sub:"English Language",cls:"JSS2A"}],
    Tuesday:[{t:"9:00am",sub:"Literature",cls:"SS1 Sciences"},{t:"11:00am",sub:"English",cls:"JSS2A"}],
    Wednesday:[{t:"8:00am",sub:"English",cls:"SS1 Sciences"},{t:"1:00pm",sub:"Literature",cls:"JSS2A"}],
    Thursday:[{t:"10:00am",sub:"Literature",cls:"SS1 Sciences"},{t:"2:00pm",sub:"English",cls:"JSS2A"}],
    Friday:[{t:"8:00am",sub:"English",cls:"SS1 Sciences"},{t:"11:00am",sub:"Review",cls:"JSS2A"}],
  };

  const renderPage = () => {
    if (page === "dashboard") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:4 }}>Welcome, <em style={{ color:C.blue }}>Mrs. Adeyemi</em> 👋</h2>
        <div style={{ fontSize:12, color:C.slate, marginBottom:16 }}>Class Teacher · School College · STF-2026-001</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
          {[{icon:"👥",l:"Students",v:60,c:C.blue},{icon:"📚",l:"Classes",v:2,c:"#7C3AED"},{icon:"📝",l:"Assignments",v:4,c:C.amber},{icon:"📅",l:"Today",v:3,c:C.green}].map((k,i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${k.c}22`, borderRadius:11, padding:"15px", borderTop:`3px solid ${k.c}` }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{k.icon}</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:24, color:k.c, fontWeight:900 }}>{k.v}</div>
              <div style={{ fontSize:11, color:C.slate }}>{k.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy }}>Today's Classes</div>
          {TT.Monday.map((c,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 16px", borderBottom:"1px solid #F8FAFF" }}>
              <div><div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{c.sub}</div><div style={{ fontSize:11, color:C.slate }}>{c.cls} · {c.t}</div></div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.blue }}>{c.t}</div>
                <button style={{ background:c.live ? "linear-gradient(135deg,#10B981,#059669)" : `linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"6px 12px", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>{c.live ? "🔴 Start Live" : "🎬 Start Class"}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    if (page === "grades") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:6 }}>Enter Grades</h2>
        <div style={{ fontSize:12, color:C.slate, marginBottom:16 }}>CA1(10) + CA2(10) + Project(10) + Exam(70) = 100</div>
        <div style={{ background:"rgba(21,101,192,.06)", border:`1px solid rgba(21,101,192,.15)`, borderRadius:10, padding:"12px 16px", marginBottom:16, fontSize:12, color:C.navy }}>
          📋 Grade A = 75–100 · B = 65–74 · C = 55–64 · D = 45–54 · E = 35–44 · F = 0–34
        </div>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
            {["Student","CA1","CA2","Project","Exam","Total","Grade"].map(h=><div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>)}
          </div>
          {STUDS.map(s=>{
            const sc = scores[s.id] || {};
            const ca1 = parseInt(sc.ca1 || s.ca1 || 0), ca2 = parseInt(sc.ca2 || s.ca2 || 0), proj = parseInt(sc.proj || s.proj || 0), exam = parseInt(sc.exam || 0);
            const total = ca1+ca2+proj+exam;
            const grade = total>=75?"A":total>=65?"B":total>=55?"C":total>=45?"D":total>=35?"E":"F";
            const gc = grade==="A"?C.green:grade==="B"?C.blue:grade==="C"?C.amber:C.red;
            return (
              <div key={s.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr", padding:"10px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{s.name}</div>
                {["ca1","ca2","proj"].map(f=><input key={f} defaultValue={s[f]} onChange={e=>setScores(sc=>({...sc,[s.id]:{...sc[s.id],[f]:e.target.value}}))} style={{ width:44, border:`1px solid ${C.border}`, borderRadius:5, padding:"5px 6px", fontSize:11, outline:"none", textAlign:"center", color:C.navy }}/>)}
                <input onChange={e=>setScores(sc=>({...sc,[s.id]:{...sc[s.id],exam:e.target.value}}))} placeholder="—" style={{ width:44, border:`1px solid ${C.border}`, borderRadius:5, padding:"5px 6px", fontSize:11, outline:"none", textAlign:"center", color:C.navy }}/>
                <div style={{ fontFamily:"Georgia,serif", fontSize:13, fontWeight:700, color:C.navy }}>{total||"—"}</div>
                <span style={{ background:`${gc}18`, color:gc, padding:"3px 8px", borderRadius:100, fontSize:11, fontWeight:700 }}>{total>0?grade:"—"}</span>
              </div>
            );
          })}
          <div style={{ padding:"12px 16px" }}><button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"9px 22px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>💾 Save Scores</button></div>
        </div>
      </div>
    );
    if (page === "attendance") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:16 }}>Mark Attendance</h2>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          {STUDS.map(s=>(
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 16px", borderBottom:"1px solid #F8FAFF" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff" }}>{s.name.charAt(0)}</div>
                <div><div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{s.name}</div><div style={{ fontSize:10, color:C.slate }}>{s.cls} · Avg: {s.att}%</div></div>
              </div>
              <div style={{ display:"flex", gap:7 }}>
                {["present","absent","late"].map(v=>(
                  <button key={v} onClick={()=>setMarked(m=>({...m,[s.id]:v}))} style={{ padding:"6px 12px", borderRadius:7, border:`1px solid ${marked[s.id]===v?(v==="present"?C.green:v==="absent"?C.red:C.amber):C.border}`, background:marked[s.id]===v?(v==="present"?"rgba(16,185,129,.1)":v==="absent"?"rgba(239,68,68,.1)":"rgba(245,158,11,.1)"):"#fff", color:marked[s.id]===v?(v==="present"?C.green:v==="absent"?C.red:C.amber):C.slate, fontSize:10, fontWeight:600, cursor:"pointer", textTransform:"capitalize" }}>{v==="present"?"✓":v==="absent"?"✗":"⏰"} {v}</button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ padding:"12px 16px" }}><button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"9px 22px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>💾 Submit Attendance</button></div>
        </div>
      </div>
    );
    if (page === "cbt") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:4 }}>CBT Question Bank</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:16 }}>Upload questions individually or in bulk via CSV.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"18px" }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:14 }}>Add Single Question</div>
            {[["Question Type","select",["Multiple Choice","True/False","Fill in the Blank","Short Answer","Essay"]],["Subject","select",["English Language","Mathematics","Biology","Chemistry","Physics"]],["Question Text","textarea","Type the question here..."],["Option A","text","First option"],["Option B","text","Second option"],["Correct Answer","select",["A","B","C","D"]],["Marks","text","e.g. 1"]].map(([label,type,opts],i)=>(
              <div key={i} style={{ marginBottom:10 }}>
                <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>{label}</label>
                {type==="textarea" ? <textarea placeholder={opts} rows={3} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"8px 11px", fontSize:12, outline:"none", resize:"vertical", color:C.navy }}/>
                : type==="select" ? <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"8px 11px", fontSize:12, outline:"none", color:C.navy }}><option>Select...</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
                : <input placeholder={opts} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"8px 11px", fontSize:12, outline:"none", color:C.navy }}/>}
              </div>
            ))}
            <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Add Question</button>
          </div>
          <div>
            <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"18px", marginBottom:14 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:10 }}>📋 Bulk Upload via CSV</div>
              <div style={{ fontSize:12, color:C.slate, lineHeight:1.6, marginBottom:12 }}>Download template, fill questions, upload — supports hundreds of questions at once.</div>
              <div style={{ display:"flex", gap:8 }}>
                <button style={{ flex:1, background:"#F8FAFF", border:`1px solid ${C.border}`, color:C.navy, padding:"8px", borderRadius:7, fontSize:11, cursor:"pointer" }}>📥 Download Template</button>
                <button style={{ flex:1, background:`${C.blue}12`, border:`1px solid ${C.blue}25`, color:C.blue, padding:"8px", borderRadius:7, fontSize:11, fontWeight:600, cursor:"pointer" }}>📤 Upload CSV</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    if (page === "resources") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:16 }}>Upload Resources</h2>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"18px" }}>
          <div style={{ border:`2px dashed ${C.border}`, borderRadius:9, padding:"32px", textAlign:"center", cursor:"pointer" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>📎</div>
            <div style={{ fontSize:13, fontWeight:600, color:C.navy, marginBottom:4 }}>Click to upload lesson material</div>
            <div style={{ fontSize:11, color:C.slate }}>PDF, Video, DOCX, MP4 — uploaded to Cloudinary</div>
          </div>
        </div>
      </div>
    );
    if (page === "timetable") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:16 }}>My Timetable</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {Object.entries(TT).map(([day,classes])=>(
            <div key={day} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:11, overflow:"hidden" }}>
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"9px 12px" }}><div style={{ fontFamily:"Georgia,serif", fontSize:13, fontWeight:700, color:"#C9A84C" }}>{day}</div></div>
              <div style={{ padding:"10px" }}>
                {classes.map((c,i)=>(
                  <div key={i} style={{ background:`${C.blue}08`, border:`1px solid ${C.blue}15`, borderRadius:7, padding:"8px 9px", marginBottom:6 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:C.blue }}>{c.t}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:C.navy }}>{c.sub}</div>
                    <div style={{ fontSize:9, color:C.slate }}>{c.cls}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}><div style={{ fontSize:44, marginBottom:12 }}>🚧</div><h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:8, textTransform:"capitalize" }}>{page}</h2><p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>Connects to Supabase in Phase 2.</p></div>;
  };

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
      <aside style={{ width:sideOpen?210:54, background:C.navy, minHeight:"100vh", display:"flex", flexDirection:"column", transition:"width .3s ease", flexShrink:0, position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
        <div style={{ padding:"14px 11px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
          <div style={{ width:28, height:28, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:C.navy, flexShrink:0 }}>SI</div>
          {sideOpen && <div style={{ overflow:"hidden" }}><div style={{ fontSize:11, fontWeight:800, color:"#C9A84C", letterSpacing:1.5, whiteSpace:"nowrap" }}>STAFF PORTAL</div><div style={{ fontSize:9, color:"rgba(255,255,255,.3)" }}>SAMPACE</div></div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{ marginLeft:"auto", background:"rgba(255,255,255,.06)", border:"none", color:"rgba(255,255,255,.4)", width:22, height:22, borderRadius:5, cursor:"pointer", fontSize:11, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{sideOpen?"←":"→"}</button>
        </div>
        {sideOpen && <div style={{ padding:"12px 13px 10px", borderBottom:"1px solid rgba(255,255,255,.07)" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#fff", marginBottom:7 }}>N</div>
          <div style={{ fontSize:11, fontWeight:700, color:"#fff" }}>Mrs. Ngozi Adeyemi</div>
          <div style={{ fontSize:9, color:"#42A5F5", marginTop:2 }}>Class Teacher</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,.35)" }}>School College</div>
        </div>}
        <nav style={{ flex:1, padding:"9px 7px", overflowY:"auto" }}>
          {NAV.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"8px 9px", borderRadius:7, border:"none", background:page===item.id?"linear-gradient(135deg,rgba(21,101,192,.35),rgba(66,165,245,.15))":"transparent", borderLeft:page===item.id?"2px solid #42A5F5":"2px solid transparent", color:page===item.id?"#fff":"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:2, fontSize:11, fontWeight:page===item.id?600:400, textAlign:"left", whiteSpace:"nowrap" }}>
              <span style={{ fontSize:13, flexShrink:0 }}>{item.icon}</span>
              {sideOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:"10px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          {sideOpen ? <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,.15)", border:"none", color:C.red, padding:"7px", borderRadius:7, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button> : <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", border:"none", color:C.red, width:32, height:32, borderRadius:7, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↩</button>}
        </div>
      </aside>
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 20px", height:48, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", gap:6, fontSize:10, color:C.slate, alignItems:"center" }}>Staff Portal <span style={{ color:"#CBD5E1" }}>›</span> <span style={{ color:C.navy, fontWeight:600, textTransform:"capitalize" }}>{page}</span></div>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>N</div>
        </header>
        <main style={{ flex:1, padding:"20px", overflowY:"auto" }}>{renderPage()}</main>
      </div>
    </div>
  );
}

// ─── STUDENT PORTAL ───
function StudentPortal({ onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const C = { navy:"#0B1F3A", blue:"#1565C0", sky:"#42A5F5", cream:"#F8FAFF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", gold:"#C9A84C", red:"#EF4444", amber:"#F59E0B", purple:"#7C3AED" };
  const courses = [
    {id:1,name:"English Language SS1",school:"School College",progress:65,nextLesson:"Essay Writing — Argumentative",teacher:"Mrs. Ngozi Adeyemi",color:C.blue,emoji:"📚"},
    {id:2,name:"WAEC Mathematics Prep",school:"Tutorial & Exam",progress:42,nextLesson:"Quadratic Equations — Practice",teacher:"Mr. Chidi Okafor",color:C.purple,emoji:"📐"},
    {id:3,name:"Biology SS1",school:"School College",progress:28,nextLesson:"Cell Structure & Functions",teacher:"Dr. Amina Hassan",color:C.green,emoji:"🔬"},
  ];
  const timetable = [
    {day:"Mon",time:"8:00am",subject:"English Language",teacher:"Mrs. Adeyemi",isLive:true},
    {day:"Mon",time:"10:00am",subject:"Mathematics",teacher:"Mr. Okafor",isLive:false},
    {day:"Tue",time:"9:00am",subject:"Biology",teacher:"Dr. Hassan",isLive:false},
    {day:"Wed",time:"8:00am",subject:"Chemistry",teacher:"Mr. Bello",isLive:false},
    {day:"Thu",time:"10:00am",subject:"Physics",teacher:"Mrs. Zainab",isLive:false},
    {day:"Fri",time:"8:00am",subject:"Literature",teacher:"Mrs. Adeyemi",isLive:false},
  ];
  const assignments = [
    {title:"Essay: My Ideal Nigeria",subject:"English Language",due:"Tomorrow",submitted:false,marks:null},
    {title:"Quadratic Equations Set 4",subject:"Mathematics",due:"3 days",submitted:true,marks:18},
    {title:"Cell Diagram Labelling",subject:"Biology",due:"Next week",submitted:false,marks:null},
  ];
  const navItems = [["dashboard","🏠","Dashboard"],["classes","🎬","My Classes"],["timetable","📅","Timetable"],["assignments","📝","Assignments"],["library","📚","Library"],["labs","🧪","Virtual Lab"],["results","📊","Results"],["certificate","🏆","Certificates"]];

  const renderMain = () => {
    if (tab==="dashboard") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Welcome back, <em style={{ color:C.blue }}>Adaeze</em> 👋</h2>
        <div style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Admission No: SC/2026/001 · SS1 Sciences · School College</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
          {[["65%","Progress",C.blue],["2 Due","Assignments",C.amber],["18/28","Lessons Done",C.green],["0","Certificates",C.gold]].map(([val,label,color],i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${color}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${color}` }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, color, fontWeight:900, lineHeight:1 }}>{val}</div>
              <div style={{ fontSize:11, color:C.slate, marginTop:3 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:14 }}>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy }}>My Courses</div>
            {courses.map(c=>(
              <div key={c.id} style={{ padding:"12px 16px", borderBottom:`1px solid #F8FAFF` }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${c.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{c.emoji}</div>
                  <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:700, color:C.navy }}>{c.name}</div><div style={{ fontSize:10, color:C.slate }}>{c.teacher}</div></div>
                  <div style={{ fontSize:11, fontWeight:700, color:c.color }}>{c.progress}%</div>
                </div>
                <div style={{ background:"#F1F5F9", borderRadius:100, height:5, overflow:"hidden" }}><div style={{ width:`${c.progress}%`, height:"100%", background:`linear-gradient(90deg,${c.color},${c.color}99)`, borderRadius:100 }}/></div>
                <button onClick={()=>setTab("classes")} style={{ marginTop:8, background:`linear-gradient(135deg,${c.color},${c.color}cc)`, color:"#fff", border:"none", padding:"6px 14px", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>Continue →</button>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy }}>Today's Classes</div>
            {timetable.filter(t=>t.day==="Mon").map((t,i)=>(
              <div key={i} style={{ padding:"10px 16px", borderBottom:`1px solid #F8FAFF`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div><div style={{ fontSize:12, fontWeight:700, color:C.navy }}>{t.subject}</div><div style={{ fontSize:10, color:C.slate }}>{t.time}</div></div>
                {t.isLive ? <button onClick={()=>setTab("classes")} style={{ background:"linear-gradient(135deg,#10B981,#059669)", color:"#fff", border:"none", padding:"5px 10px", borderRadius:5, fontSize:10, fontWeight:700, cursor:"pointer" }}>🔴 LIVE</button> : <span style={{ fontSize:10, color:C.slate }}>Upcoming</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    if (tab==="classes") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>My Classes</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Live and recorded classes. Click Join to enter a live session.</p>
        {courses.map(c=>(
          <div key={c.id} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, marginBottom:14, overflow:"hidden" }}>
            <div style={{ background:`linear-gradient(135deg,${c.color}20,${c.color}08)`, padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}><div style={{ fontSize:22 }}>{c.emoji}</div><div><div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{c.name}</div><div style={{ fontSize:11, color:C.slate }}>{c.teacher} · {c.school}</div></div></div>
              <div style={{ fontSize:12, fontWeight:700, color:c.color }}>{c.progress}% complete</div>
            </div>
            <div style={{ padding:"14px 18px" }}>
              <div style={{ background:`${c.color}08`, border:`1px solid ${c.color}20`, borderRadius:10, padding:"14px 16px", marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:c.color, marginBottom:4 }}>🔴 LIVE NOW</div>
                <div style={{ fontSize:12, color:C.navy, marginBottom:8 }}>Teacher: {c.teacher} · Started 8:00 AM</div>
                <a href={WA} target="_blank" rel="noreferrer" style={{ background:`linear-gradient(135deg,${c.color},${c.color}cc)`, color:"#fff", padding:"9px 20px", borderRadius:7, fontSize:12, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>🎬 Join Live Class</a>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:C.navy, marginBottom:8 }}>📹 Recorded Lessons</div>
              {["Introduction & Overview","Core Concepts Part 1","Core Concepts Part 2","Practice Session"].map((lesson,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid #F8FAFF` }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:i<2?"rgba(16,185,129,.12)":i===2?`${c.color}18`:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>{i<2?"✅":i===2?"▶️":"🔒"}</div>
                    <div style={{ fontSize:12, color:i<2?C.slate:i===2?C.navy:"#CBD5E1", fontWeight:i===2?600:400 }}>Lesson {i+1}: {lesson}</div>
                  </div>
                  <button style={{ background:i===2?`${c.color}18`:"#F1F5F9", color:i===2?c.color:C.slate, border:`1px solid ${i===2?c.color:C.border}`, padding:"4px 10px", borderRadius:5, fontSize:10, cursor:"pointer" }}>{i<2?"Rewatch":"Watch"}</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
    if (tab==="labs") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Virtual Science Laboratory</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Interactive simulations from University of Colorado Boulder (PhET) — free, no download needed.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[{name:"Physics — Forces & Motion",desc:"Explore Newton's laws",url:"https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",color:C.blue,emoji:"⚛️"},{name:"Chemistry — Build a Molecule",desc:"Build molecules, understand bonds",url:"https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_en.html",color:C.purple,emoji:"🧪"},{name:"Biology — Gene Expression",desc:"DNA, RNA and protein synthesis",url:"https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html",color:C.green,emoji:"🔬"},{name:"Physics — Electric Circuits",desc:"Build and test circuits virtually",url:"https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",color:C.amber,emoji:"⚡"}].map((lab,i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              <div style={{ background:`${lab.color}12`, padding:"16px" }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}><div style={{ fontSize:28 }}>{lab.emoji}</div><div><div style={{ fontWeight:700, fontSize:13, color:C.navy }}>{lab.name}</div><div style={{ fontSize:11, color:C.slate }}>{lab.desc}</div></div></div>
              </div>
              <div style={{ padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:10, color:C.slate }}>PhET · Univ. of Colorado</span>
                <a href={lab.url} target="_blank" rel="noreferrer" style={{ background:`linear-gradient(135deg,${lab.color},${lab.color}cc)`, color:"#fff", padding:"7px 14px", borderRadius:6, fontSize:11, fontWeight:700, textDecoration:"none" }}>Open Lab →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    if (tab==="results") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:20 }}>Academic Results</h2>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy }}>First Term 2026 — SS1 Sciences</div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 0.8fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
            {["Subject","CA1/10","CA2/10","Proj/10","Exam/70","Grade"].map(h=><div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>)}
          </div>
          {[["English Language",8,9,8,56,"A"],["Mathematics",7,7,8,50,"B"],["Biology",6,7,7,48,"B"],["Chemistry",8,8,7,52,"A"],["Physics",5,6,6,44,"C"]].map(([sub,...scores],i)=>{
            const grade = scores[4]; const gc = grade==="A"?C.green:grade==="B"?C.blue:grade==="C"?C.amber:C.red;
            return (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 0.8fr", padding:"11px 16px", borderBottom:`1px solid #F8FAFF`, alignItems:"center" }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{sub}</div>
                {scores.slice(0,4).map((s,j)=><div key={j} style={{ fontSize:12, color:C.slate }}>{s}</div>)}
                <span style={{ background:`${gc}18`, color:gc, padding:"3px 8px", borderRadius:100, fontSize:11, fontWeight:700 }}>{grade}</span>
              </div>
            );
          })}
          <div style={{ padding:"12px 16px", background:"#F0F4FF", fontWeight:700, fontSize:13, color:C.blue }}>Total: 314/400 · Average: 78.5% · Position: 3rd of 32</div>
        </div>
      </div>
    );
    if (tab==="certificate") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:8 }}>My Certificates</h2>
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, borderRadius:16, padding:"40px 32px", textAlign:"center", marginBottom:20, border:"2px solid rgba(201,168,76,.3)" }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:C.gold, letterSpacing:4, marginBottom:12 }}>SAMPACE INSTITUTE</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#fff", marginBottom:6 }}>Certificate of Completion</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.6)", marginBottom:16 }}>This is to certify that</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, color:C.gold, marginBottom:16, fontStyle:"italic" }}>Adaeze Okonkwo</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.7)" }}>has successfully completed</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"#fff" }}>English Language — SS1 Course</div>
        </div>
        <div style={{ background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.2)", borderRadius:10, padding:"14px 20px", textAlign:"center" }}>
          <div style={{ fontSize:13, color:C.amber, fontWeight:600 }}>⏳ Complete 35% more to unlock your official certificate</div>
        </div>
      </div>
    );
    if (tab==="library") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Digital Library</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Textbooks, past questions and e-resources.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[["📖","WAEC Past Questions 2015–2024","All Subjects"],["📖","NECO Past Questions 2015–2024","All Subjects"],["📖","New General Mathematics SS1","Textbook"],["📹","English Comprehension Video Series","English"]].map(([icon,title,subject],i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}><div style={{ fontSize:24 }}>{icon}</div><div><div style={{ fontSize:12, fontWeight:700, color:C.navy }}>{title}</div><div style={{ fontSize:10, color:C.slate }}>{subject}</div></div></div>
              <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>📥 Download / View</button>
            </div>
          ))}
        </div>
      </div>
    );
    if (tab==="assignments") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:20 }}>Assignments</h2>
        {assignments.map((a,i)=>(
          <div key={i} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, marginBottom:12, padding:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div><div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{a.title}</div><div style={{ fontSize:11, color:C.slate }}>{a.subject} · Due: {a.due}</div></div>
              <span style={{ background:a.submitted?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)", color:a.submitted?C.green:C.amber, padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:700 }}>{a.submitted?`✓ Submitted — ${a.marks}/20`:"Pending"}</span>
            </div>
            {!a.submitted && <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"9px 20px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>📤 Submit Assignment</button>}
          </div>
        ))}
      </div>
    );
    return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}><div style={{ fontSize:48, marginBottom:12 }}>🚧</div><h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:8, textTransform:"capitalize" }}>{tab}</h2><p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>Connects to Supabase in Phase 2.</p></div>;
  };

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
      <aside style={{ width:sideOpen?210:54, background:C.navy, minHeight:"100vh", display:"flex", flexDirection:"column", transition:"width .3s ease", flexShrink:0, position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
        <div style={{ padding:"14px 11px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
          <div style={{ width:28, height:28, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:C.navy, flexShrink:0 }}>SI</div>
          {sideOpen && <div style={{ overflow:"hidden" }}><div style={{ fontSize:11, fontWeight:800, color:"#C9A84C", letterSpacing:1.5, whiteSpace:"nowrap" }}>STUDENT PORTAL</div><div style={{ fontSize:9, color:"rgba(255,255,255,.3)" }}>School College</div></div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{ marginLeft:"auto", background:"rgba(255,255,255,.06)", border:"none", color:"rgba(255,255,255,.4)", width:22, height:22, borderRadius:5, cursor:"pointer", fontSize:11, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{sideOpen?"←":"→"}</button>
        </div>
        {sideOpen && <div style={{ padding:"12px 13px 10px", borderBottom:"1px solid rgba(255,255,255,.07)" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#fff", marginBottom:7 }}>A</div>
          <div style={{ fontSize:11, fontWeight:700, color:"#fff" }}>Adaeze Okonkwo</div>
          <div style={{ fontSize:9, color:"#42A5F5", marginTop:2 }}>SC/2026/001 · SS1</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,.35)" }}>Sciences Department</div>
        </div>}
        <nav style={{ flex:1, padding:"10px 7px", overflowY:"auto" }}>
          {navItems.map(([id,icon,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 10px", borderRadius:7, border:"none", background:tab===id?"linear-gradient(135deg,rgba(21,101,192,.35),rgba(66,165,245,.15))":"transparent", borderLeft:tab===id?"2px solid #42A5F5":"2px solid transparent", color:tab===id?"#fff":"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:2, fontSize:12, fontWeight:tab===id?600:400, textAlign:"left", whiteSpace:"nowrap" }}>
              <span style={{ fontSize:14, flexShrink:0 }}>{icon}</span>
              {sideOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:"10px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          {sideOpen ? <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,.15)", border:"none", color:C.red, padding:"7px", borderRadius:7, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button> : <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", border:"none", color:C.red, width:32, height:32, borderRadius:7, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↩</button>}
        </div>
      </aside>
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 20px", height:50, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", fontSize:10, color:C.slate }}>Student Portal <span style={{ color:"#CBD5E1" }}>›</span> <span style={{ color:C.navy, fontWeight:600, textTransform:"capitalize" }}>{tab}</span></div>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>A</div>
        </header>
        <main style={{ flex:1, padding:"20px", overflowY:"auto" }}>{renderMain()}</main>
      </div>
    </div>
  );
}

// ─── PARENT PORTAL ───
function ParentPortal({ onLogout }) {
  const C = { navy:"#0B1F3A", blue:"#1565C0", sky:"#42A5F5", cream:"#F8FAFF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", red:"#EF4444", amber:"#F59E0B" };
  const children = [
    {name:"Adaeze Okonkwo",admission:"SC/2026/001",school:"School College",class:"SS1 Sciences",progress:65,fees:"paid"},
    {name:"Emeka Okonkwo",admission:"SC/2026/022",school:"Tutorial & Exam",class:"WAEC Track",progress:38,fees:"pending"},
  ];
  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.cream, minHeight:"100vh" }}>
      <div style={{ background:C.navy, padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:C.navy }}>SI</div>
          <div><div style={{ fontSize:12, fontWeight:800, color:"#C9A84C", letterSpacing:1.5 }}>PARENT PORTAL</div><div style={{ fontSize:9, color:"rgba(255,255,255,.4)" }}>SAMPACE INSTITUTE</div></div>
        </div>
        <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", border:"none", color:"#EF4444", padding:"6px 14px", borderRadius:6, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button>
      </div>
      <div style={{ padding:"20px", maxWidth:900, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Welcome, <em style={{ color:C.blue }}>Mrs. Okonkwo</em> 👋</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Parent Dashboard — Monitor your children's academic progress</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
          {[["2","Children Enrolled",C.blue],["65%","Avg Progress",C.green],["1 Pending","Fee Status",C.amber]].map(([val,label,color],i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${color}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${color}` }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, color, fontWeight:900 }}>{val}</div>
              <div style={{ fontSize:11, color:C.slate, marginTop:3 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom:12, fontWeight:700, fontSize:14, color:C.navy }}>My Children</div>
        {children.map((child,i)=>(
          <div key={i} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, marginBottom:12, padding:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700, color:"#fff" }}>{child.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{child.name}</div>
                  <div style={{ fontSize:11, color:C.slate }}>{child.admission} · {child.class} · {child.school}</div>
                  <div style={{ marginTop:6, background:"#F1F5F9", borderRadius:100, height:6, width:200, overflow:"hidden" }}><div style={{ width:`${child.progress}%`, height:"100%", background:`linear-gradient(90deg,${C.blue},${C.sky})`, borderRadius:100 }}/></div>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ background:child.fees==="paid"?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)", color:child.fees==="paid"?C.green:C.amber, padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:700 }}>Fees: {child.fees}</span>
                <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"7px 14px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>View Report Card</button>
                {child.fees==="pending" && <button style={{ background:"linear-gradient(135deg,#E65100,#FF6D00)", color:"#fff", border:"none", padding:"7px 14px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>Pay Fees</button>}
              </div>
            </div>
          </div>
        ))}
        <div style={{ background:C.navy, borderRadius:12, padding:"18px 20px", textAlign:"center", marginTop:20 }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:8 }}>Need help? Contact the school directly</div>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <a href={WA} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", padding:"8px 16px", borderRadius:7, fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp</a>
            <a href={`mailto:${EMAIL}`} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", color:"#fff", padding:"8px 16px", borderRadius:7, fontSize:12, textDecoration:"none" }}>📧 Email</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ───
function App() {
  const [view, setView] = useState("home");
  const [school, setSchool] = useState(null);
  const go = s => { setSchool(s); setView("school"); window.scrollTo(0,0); };
  const login = type => { setView("login-"+type); window.scrollTo(0,0); };
  const afterLogin = type => { setView(type); window.scrollTo(0,0); };
  const back = () => { setSchool(null); setView("home"); window.scrollTo(0,0); };
  useEffect(() => {
    const h = window.location.hash.replace("#","");
    if (h) { const f = SCHOOLS.find(s=>s.id===h); if (f) { setSchool(f); setView("school"); } }
  }, []);
  return (
    <>
      <style>{G}</style>
      {view==="home"          && <Homepage onSelect={go} onLogin={login} />}
      {view==="school"        && school && <SchoolPage school={school} onBack={back} onLogin={login} />}
      {view==="login-admin"   && <LoginScreen type="admin"   onLogin={()=>afterLogin("admin")}   onBack={()=>setView("home")} />}
      {view==="login-staff"   && <LoginScreen type="staff"   onLogin={()=>afterLogin("staff")}   onBack={()=>setView("home")} />}
      {view==="login-student" && <LoginScreen type="student" onLogin={()=>afterLogin("student")} onBack={()=>setView("home")} />}
      {view==="login-parent"  && <LoginScreen type="parent"  onLogin={()=>afterLogin("parent")}  onBack={()=>setView("home")} />}
      {view==="admin"         && <AdminDashboard onLogout={back} />}
      {view==="staff"         && <StaffPortal onLogout={back} />}
      {view==="student"       && <StudentPortal onLogout={back} />}
      {view==="parent"        && <ParentPortal onLogout={back} />}
    </>
  );
}

const el = document.getElementById("root");
if (el) ReactDOM.createRoot(el).render(<App />);
