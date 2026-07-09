import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

// ─── SUPABASE CLIENT (initialised from Vite env vars — no hardcoded values) ───
if (typeof window !== "undefined" && window.__initSupabase) {
  window.__initSupabase(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON
  );
}
const _supa = () => window.__supabase || null;

// ─── CONFIG ───
const WA = "https://chat.whatsapp.com/HLWOIKvXhjqIjYAfOFjvTp";
const EMAIL = "info@sampaceedu.com.ng";
// Public config — values come ONLY from Netlify environment variables
// Set these in Netlify → Site Configuration → Environment Variables
const CLOUD_NAME  = import.meta.env.VITE_CLOUDINARY_CLOUD;
const PAYSTACK_PK = import.meta.env.VITE_PAYSTACK_PUBLIC;
const FROM_EMAIL  = "info@sampaceedu.com.ng";
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON;

// Demo credentials removed — real Supabase auth only
const DEMO = {
  admin:   { email: "admin@sampaceedu.com.ng",   pass: "" },
  staff:   { email: "staff@sampaceedu.com.ng",    pass: "" },
  student: { email: "student@sampaceedu.com.ng",  pass: "" },
  parent:  { email: "parent@sampaceedu.com.ng",   pass: "" },
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

  const handle = async () => {
    if (!email || !pass) { setErr("Please enter email and password."); return; }
    setErr(""); setLoading(true);
    try {
      // Real Supabase auth
      const sb = window.__supabase;
      if (sb) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        const { data: profile } = await sb.from("users").select("role").eq("auth_id", data.user.id).single();
        onLogin(profile?.role || type);
        return;
      }
      // Demo fallback while Supabase schema is being set up
      if (email === creds.email && pass === creds.pass) { onLogin(type); }
      else { setErr("Invalid email or password."); setLoading(false); }
    } catch (err) {
      // Demo fallback
      if (email === creds.email && pass === creds.pass) { onLogin(type); }
      else { setErr(err.message || "Invalid email or password."); setLoading(false); }
    }
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
        <div style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginBottom:16, textAlign:"center" }}>
          Need access? Contact <a href="mailto:info@sampaceedu.com.ng" style={{color:"#C9A84C",textDecoration:"none"}}>info@sampaceedu.com.ng</a>
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
// ─── APPLY MODAL (Full detail form with validation) ───
function ApplyModal({ school, onClose }) {
  const [step, setStep] = useState(1);
  const [appType, setAppType] = useState("parent");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const ac = lbl(school.accent);
  const R = school.color;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const req = (fields) => {
    const e = {};
    fields.forEach(k => { if (!form[k] || form[k].trim() === "") e[k] = "Required"; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isSec = school.id === "school-college" || school.id === "pre-university";
  const isTut = school.id === "tutorial";

  if (done) return (
    <div style={{ textAlign:"center", padding:"36px 16px" }}>
      <div style={{ fontSize:56, marginBottom:12, animation:"floatY 2s ease-in-out infinite" }}>🎉</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#fff", marginBottom:8 }}>
        {school.applyType === "inquiry" ? "Inquiry Received!" : "Application Submitted!"}
      </div>
      <p style={{ color:"rgba(255,255,255,.55)", lineHeight:1.7, marginBottom:16, fontSize:13 }}>
        Our admissions team reviews within 72 hours. Watch your email and WhatsApp.
      </p>
      <div style={{ background:"rgba(255,255,255,.05)", borderRadius:10, padding:"13px 16px", marginBottom:14, textAlign:"left" }}>
        <div style={{ fontSize:10, color:school.accent, fontWeight:700, letterSpacing:1, marginBottom:4, textTransform:"uppercase" }}>Reference Number</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:17, color:"#fff" }}>
          {school.num.replace("–","-")}-{Math.floor(Math.random()*9000+1000)}
        </div>
      </div>
      <div style={{ background:"rgba(201,168,76,.06)", border:"1px solid rgba(201,168,76,.18)", borderRadius:9, padding:"11px 14px", marginBottom:14, fontSize:11, color:"rgba(255,255,255,.55)", lineHeight:1.6 }}>
        💡 Admin reviews → payment details sent → portal access unlocked after confirmation
      </div>
      <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
        <a href={WA} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", padding:"9px 18px", borderRadius:8, fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 Join WhatsApp</a>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:"#fff", padding:"9px 18px", borderRadius:8, fontSize:12, cursor:"pointer" }}>Close</button>
      </div>
    </div>
  );

  // ── INQUIRY FORM ──
  if (school.applyType === "inquiry") return (
    <div>
      <label style={ac}>Full Name *</label>
      <input style={{...inp, borderColor: errors.name ? "#EF4444":"rgba(255,255,255,.14)"}} placeholder="Your full legal name" onChange={e=>set("name",e.target.value)}/>
      {errors.name && <div style={{color:"#EF4444",fontSize:10,marginTop:-8,marginBottom:8}}>{errors.name}</div>}
      <label style={ac}>Email *</label>
      <input style={{...inp, borderColor: errors.email ? "#EF4444":"rgba(255,255,255,.14)"}} placeholder="email@example.com" onChange={e=>set("email",e.target.value)}/>
      <label style={ac}>Phone / WhatsApp *</label>
      <input style={{...inp, borderColor: errors.phone ? "#EF4444":"rgba(255,255,255,.14)"}} placeholder="+234..." onChange={e=>set("phone",e.target.value)}/>
      <label style={ac}>Service Needed *</label>
      <select style={sel} onChange={e=>set("service",e.target.value)}>
        <option value="">Select service...</option>
        {school.services && school.services.map(s=><option key={s}>{s}</option>)}
      </select>
      <label style={ac}>Describe Your Need</label>
      <textarea style={{...inp, minHeight:80, resize:"vertical"}} placeholder="Tell us more about what you need..." onChange={e=>set("desc",e.target.value)}/>
      <div style={{display:"flex",gap:10,marginTop:6}}>
        <a href={WA} style={{flex:1,background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",padding:"11px",borderRadius:8,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>💬 WhatsApp Us</a>
        <button onClick={()=>{if(req(["name","email","phone","service"]))setDone(true);}} style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Submit Inquiry ✓</button>
      </div>
    </div>
  );

  // ── TUTORIAL — STUDENT ONLY (no parent) ──
  if (isTut) return (
    <div>
      {step === 1 && <div>
        <div style={{background:"rgba(0,137,123,.08)",border:"1px solid rgba(0,137,123,.2)",borderRadius:8,padding:"10px 12px",marginBottom:14,fontSize:11,color:"rgba(255,255,255,.55)",lineHeight:1.6}}>
          📝 Tutorial school is student-only. Fill your own details below.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>First Name *</label><input style={{...inp,borderColor:errors.fname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="First name" onChange={e=>set("fname",e.target.value)}/>{errors.fname&&<div style={{color:"#EF4444",fontSize:10}}>{errors.fname}</div>}</div>
          <div><label style={ac}>Last Name *</label><input style={{...inp,borderColor:errors.lname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Last name" onChange={e=>set("lname",e.target.value)}/>{errors.lname&&<div style={{color:"#EF4444",fontSize:10}}>{errors.lname}</div>}</div>
        </div>
        <label style={ac}>Date of Birth *</label>
        <input type="date" style={{...inp,borderColor:errors.dob?"#EF4444":"rgba(255,255,255,.14)"}} onChange={e=>set("dob",e.target.value)}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>Gender *</label><select style={sel} onChange={e=>set("gender",e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
          <div><label style={ac}>State of Origin *</label><input style={inp} placeholder="e.g. Lagos" onChange={e=>set("state",e.target.value)}/></div>
        </div>
        <label style={ac}>Email Address *</label>
        <input style={{...inp,borderColor:errors.email?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="email@example.com" onChange={e=>set("email",e.target.value)}/>
        <label style={ac}>Phone / WhatsApp *</label>
        <input style={{...inp,borderColor:errors.phone?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="+234..." onChange={e=>set("phone",e.target.value)}/>
        <label style={ac}>Residential Address</label>
        <input style={inp} placeholder="House No, Street, Town" onChange={e=>set("address",e.target.value)}/>
        <button onClick={()=>{if(req(["fname","lname","dob","email","phone"]))setStep(2);}} style={{width:"100%",background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"12px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",marginTop:4}}>Next: Exam Details →</button>
      </div>}
      {step === 2 && <div>
        <label style={ac}>Exam Target *</label>
        <select style={{...sel,borderColor:errors.exam?"#EF4444":"rgba(255,255,255,.14)"}} onChange={e=>set("exam",e.target.value)}>
          <option value="">Select exam...</option>
          {school.tracks && school.tracks.map(t=><option key={t}>{t}</option>)}
        </select>
        <label style={ac}>Current Class</label>
        <select style={sel} onChange={e=>set("cls",e.target.value)}>
          <option value="">Select class...</option>
          <option>JSS1</option><option>JSS2</option><option>JSS3</option>
          <option>SS1</option><option>SS2</option><option>SS3</option>
          <option>Awaiting Result</option><option>Post-Secondary</option>
        </select>
        <label style={ac}>Department (SS Students)</label>
        <select style={sel} onChange={e=>set("dept",e.target.value)}>
          <option value="">Select if applicable</option>
          <option>Sciences</option><option>Commercial</option><option>Arts/Humanities</option>
        </select>
        <label style={ac}>Subjects Interested In</label>
        <input style={inp} placeholder="e.g. Mathematics, English, Biology" onChange={e=>set("subjects",e.target.value)}/>
        <label style={ac}>JAMB Score (if taken)</label>
        <input style={inp} placeholder="e.g. 280 (optional)" onChange={e=>set("jamb",e.target.value)}/>
        <label style={ac}>Previous School</label>
        <input style={inp} placeholder="Name of your last school" onChange={e=>set("prevschool",e.target.value)}/>
        <label style={ac}>How Did You Hear About Us?</label>
        <select style={sel} onChange={e=>set("source",e.target.value)}>
          <option>Social Media</option><option>Friend/Referral</option><option>Google</option><option>School</option><option>WhatsApp</option><option>Other</option>
        </select>
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:11,color:"rgba(255,255,255,.45)",lineHeight:1.6}}>
          💳 Admin reviews → payment details sent → access enabled after confirmation.
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer"}}>← Back</button>
          <button onClick={async()=>{
            if(!req(["exam"]))return;
            const sb=window.__supabase;
            const ref=school.num.replace("–","-")+"-"+Date.now();
            const payload={
              reference:ref, school_id:school.id,
              applicant_name:(form.fname||"")+" "+(form.lname||""),
              email:form.email||"", phone:form.phone||"",
              date_of_birth:form.dob||null, gender:form.gender||null,
              state_of_origin:form.state||null,
              address:form.address||null,
              exam_targets:form.exam?[form.exam]:null,
              class_level:form.cls||null, department:form.dept||null,
              prev_school:form.prevschool||null,
              how_heard:form.source||null, app_type:"student", status:"pending"
            };
            if(sb){
              const {error}=await sb.from("applications").insert(payload);
              if(error){alert("Submission error: "+error.message);return;}
            }
            setDone(true);
          }} style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Submit Application ✓</button>
        </div>
      </div>}
    </div>
  );

  // ── SECONDARY / PRE-UNIVERSITY / DIGITAL CAMPUS — FULL FORM ──
  return (
    <div>
      {/* Step indicator */}
      <div style={{display:"flex",gap:6,marginBottom:16,alignItems:"center"}}>
        {[1,2,3,4].map(n=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:step>=n?`linear-gradient(135deg,${school.g2},${school.color})`:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:step>=n?"#fff":"rgba(255,255,255,.4)",transition:"all .3s"}}>{n}</div>
            {n<4&&<div style={{flex:1,height:2,background:step>n?school.color:"rgba(255,255,255,.1)",minWidth:20,transition:"all .3s"}}/>}
          </div>
        ))}
        <div style={{marginLeft:"auto",fontSize:10,color:"rgba(255,255,255,.4)"}}>Step {step} of 4</div>
      </div>

      {/* STEP 1: Applicant Type + Student Personal */}
      {step === 1 && <div>
        {isSec && <div>
          <label style={ac}>Application Type *</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            {[["parent","👨‍👩‍👧 Parent/Guardian applies"],["self","🎓 Self-Sponsored (18+)"]].map(([v,l])=>(
              <div key={v} onClick={()=>setAppType(v)} style={{border:`2px solid ${appType===v?school.color:"rgba(255,255,255,.1)"}`,borderRadius:8,padding:"11px 10px",cursor:"pointer",background:appType===v?`${school.color}18`:"rgba(255,255,255,.03)",textAlign:"center",fontSize:12,color:appType===v?"#fff":"rgba(255,255,255,.5)",fontWeight:appType===v?700:400,transition:"all .2s"}}>{l}</div>
            ))}
          </div>
        </div>}
        <div style={{fontSize:11,color:school.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>— Student Details —</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>Student First Name *</label><input style={{...inp,borderColor:errors.fname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Student's first name" onChange={e=>set("fname",e.target.value)}/>{errors.fname&&<div style={{color:"#EF4444",fontSize:10}}>{errors.fname}</div>}</div>
          <div><label style={ac}>Student Last Name *</label><input style={{...inp,borderColor:errors.lname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Student's last name" onChange={e=>set("lname",e.target.value)}/>{errors.lname&&<div style={{color:"#EF4444",fontSize:10}}>{errors.lname}</div>}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>Date of Birth *</label><input type="date" style={{...inp,borderColor:errors.dob?"#EF4444":"rgba(255,255,255,.14)"}} onChange={e=>set("dob",e.target.value)}/></div>
          <div><label style={ac}>Gender *</label><select style={sel} onChange={e=>set("gender",e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>Nationality *</label><input style={inp} placeholder="e.g. Nigerian" onChange={e=>set("nationality",e.target.value)}/></div>
          <div><label style={ac}>State of Origin *</label><input style={{...inp,borderColor:errors.state?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="e.g. Lagos" onChange={e=>set("state",e.target.value)}/></div>
        </div>
        <label style={ac}>Local Government Area *</label>
        <input style={inp} placeholder="e.g. Ikeja LGA" onChange={e=>set("lga",e.target.value)}/>
        <label style={ac}>Residential Address *</label>
        <input style={{...inp,borderColor:errors.address?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="House no, street, town, state" onChange={e=>set("address",e.target.value)}/>
        <button onClick={()=>{if(req(["fname","lname","dob","state","address"]))setStep(2);}} style={{width:"100%",background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"12px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",marginTop:4}}>Next: Contact Info →</button>
      </div>}

      {/* STEP 2: Contact + Parent (if secondary) */}
      {step === 2 && <div>
        <div style={{fontSize:11,color:school.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>— Contact Information —</div>
        <label style={ac}>Student Email *</label>
        <input style={{...inp,borderColor:errors.email?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="email@example.com" onChange={e=>set("email",e.target.value)}/>
        <label style={ac}>Student Phone / WhatsApp *</label>
        <input style={{...inp,borderColor:errors.phone?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="+234..." onChange={e=>set("phone",e.target.value)}/>
        {isSec && appType === "parent" && <div>
          <div style={{fontSize:11,color:school.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"14px 0 10px"}}>— Parent / Guardian Details —</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={ac}>Guardian Full Name *</label><input style={{...inp,borderColor:errors.pname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Guardian's full name" onChange={e=>set("pname",e.target.value)}/></div>
            <div><label style={ac}>Relationship *</label><select style={sel} onChange={e=>set("rel",e.target.value)}><option>Father</option><option>Mother</option><option>Uncle</option><option>Aunt</option><option>Guardian</option></select></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={ac}>Guardian Phone *</label><input style={inp} placeholder="+234..." onChange={e=>set("pphone",e.target.value)}/></div>
            <div><label style={ac}>Guardian Email *</label><input style={inp} placeholder="guardian@email.com" onChange={e=>set("pemail",e.target.value)}/></div>
          </div>
          <label style={ac}>Guardian Occupation</label>
          <input style={inp} placeholder="e.g. Teacher, Business Owner" onChange={e=>set("pocc",e.target.value)}/>
        </div>}
        <div style={{display:"flex",gap:10,marginTop:10}}>
          <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer"}}>← Back</button>
          <button onClick={()=>{const f=isSec&&appType==="parent"?["email","phone","pname"]:["email","phone"];if(req(f))setStep(3);}} style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Next: Academic Info →</button>
        </div>
      </div>}

      {/* STEP 3: Academic Details */}
      {step === 3 && <div>
        <div style={{fontSize:11,color:school.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>— Academic Details —</div>
        {school.programs && <><label style={ac}>Programme *</label><select style={sel} onChange={e=>set("prog",e.target.value)}><option value="">Select programme...</option>{school.programs.map(p=><option key={p}>{p}</option>)}</select></>}
        {school.depts && <><label style={ac}>Department *</label><select style={{...sel,borderColor:errors.dept?"#EF4444":"rgba(255,255,255,.14)"}} onChange={e=>set("dept",e.target.value)}><option value="">Select department...</option>{school.depts.map(d=><option key={d}>{d}</option>)}</select></>}
        {school.classes && <><label style={ac}>Class / Level *</label><select style={{...sel,borderColor:errors.cls?"#EF4444":"rgba(255,255,255,.14)"}} onChange={e=>set("cls",e.target.value)}><option value="">Select class...</option>{school.classes.map(c=><option key={c}>{c}</option>)}</select></>}
        {school.subSchools && <><label style={ac}>Choose Programme Track *</label><select style={sel} onChange={e=>set("track",e.target.value)}><option value="">Select track...</option>{school.subSchools.map(s=><option key={s.id}>{s.name}</option>)}</select></>}
        <label style={ac}>Previous School *</label>
        <input style={{...inp,borderColor:errors.prevschool?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Name of most recent school attended" onChange={e=>set("prevschool",e.target.value)}/>
        <label style={ac}>Last Class Attended</label>
        <input style={inp} placeholder="e.g. SS2, Year 10" onChange={e=>set("lastcls",e.target.value)}/>
        <label style={ac}>Medical / Health Information</label>
        <textarea style={{...inp,minHeight:60,resize:"vertical"}} placeholder="Any medical conditions, allergies or special needs (optional)" onChange={e=>set("medical",e.target.value)}/>
        <label style={ac}>How Did You Hear About SAMPACE?</label>
        <select style={sel} onChange={e=>set("source",e.target.value)}><option>Social Media</option><option>Friend/Referral</option><option>Google</option><option>School</option><option>WhatsApp</option><option>Other</option></select>
        <div style={{display:"flex",gap:10,marginTop:10}}>
          <button onClick={()=>setStep(2)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer"}}>← Back</button>
          <button onClick={()=>{if(req(["prevschool"]))setStep(4);}} style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Next: Declaration →</button>
        </div>
      </div>}

      {/* STEP 4: Declaration & Submit */}
      {step === 4 && <div>
        <div style={{fontSize:11,color:school.accent,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>— Declaration —</div>
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"14px",marginBottom:14,fontSize:11,color:"rgba(255,255,255,.6)",lineHeight:1.8}}>
          I, <strong style={{color:"#fff"}}>{form.fname} {form.lname}</strong>, hereby declare that all information provided in this application is true and correct. I understand that providing false information may result in cancellation of admission.
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:14}}>
          <input type="checkbox" id="decl" style={{marginTop:3,accentColor:school.color,width:16,height:16}} onChange={e=>set("declared",e.target.checked)}/>
          <label htmlFor="decl" style={{fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.6,cursor:"pointer"}}>
            I confirm the information above is accurate and I agree to SAMPACE INSTITUTE's terms and conditions. <span style={{color:school.accent}}>*</span>
          </label>
        </div>
        <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.18)",borderRadius:8,padding:"10px 12px",marginBottom:14,fontSize:11,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>
          💳 After submission: Admin reviews → payment details sent → portals activated on confirmation.
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setStep(3)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer"}}>← Back</button>
          <button onClick={async()=>{
            if(!form.declared){alert("Please tick the declaration checkbox to proceed.");return;}
            const sb=window.__supabase;
            const ref=school.num.replace("–","-")+"-"+Date.now();
            const payload={
              reference:ref, school_id:school.id,
              applicant_name:(form.fname||"")+" "+(form.lname||""),
              email:form.email||"", phone:form.phone||"",
              date_of_birth:form.dob||null, gender:form.gender||null,
              nationality:form.nationality||"Nigerian",
              state_of_origin:form.state||null, lga:form.lga||null,
              address:form.address||null, program:form.prog||null,
              department:form.dept||null, class_level:form.cls||null,
              prev_school:form.prevschool||null, medical_info:form.medical||null,
              app_type:appType, parent_name:form.pname||null,
              parent_phone:form.pphone||null, parent_email:form.pemail||null,
              parent_relation:form.rel||null, how_heard:form.source||null,
              status:"pending"
            };
            if(sb){
              const {error}=await sb.from("applications").insert(payload);
              if(error){alert("Submission error: "+error.message);return;}
            }
            setDone(true);
          }} style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>🎓 Submit Application</button>
        </div>
      </div>}
    </div>
  );
}


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
        {(school.applyType==="parent-student") && (
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
// ─── CORPORATE HOMEPAGE ───────────────────────────────
// ─── SAMPACE EDUCATIONAL LTD — ECOSYSTEM HOMEPAGE ───
function Homepage({ onSelect, onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [counts, setCounts] = useState({s:0,p:0,d:0,y:0});

  const N="#0B1F3A", G="#C9A84C", W="#ffffff";
  const WA_LINK = typeof WA !== "undefined" ? WA : "https://chat.whatsapp.com/HLWOIKvXhjqIjYAfOFjvTp";

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",onScroll);
    let f=0;
    const t=setInterval(()=>{
      f++; const p=Math.min(f/90,1); const e=1-Math.pow(1-p,3);
      setCounts({s:Math.floor(5000*e),p:Math.floor(12*e)||1,d:Math.floor(9*e)||1,y:Math.floor(1*e)||1});
      if(p>=1)clearInterval(t);
    },16);
    return()=>{window.removeEventListener("scroll",onScroll);clearInterval(t);};
  },[]);

  // ── 12 DIVISIONS in 4 Groups ──
  const GROUPS = [
    {
      id:"academic", label:"Academic Education", icon:"🎓",
      desc:"From primary support to pre-university — structured academic programmes online and onsite.",
      color:"#1565C0",
      divisions:[
        {id:"college",num:"01",name:"SAMPACE College",short:"Online Secondary School",desc:"Full JSS1–SS3 online school. Live classes, virtual labs, CBT exams, digital report cards, parent portals.",icon:"🏫",color:"#1565C0",g2:"#42A5F5",status:"open",tags:["JSS1–SS3","Live Classes","Virtual Labs","Parent Portal"]},
        {id:"extramural",num:"02",name:"Extramural & Exam Hub",short:"After-School · Exam Prep · Adult Learning",desc:"After-school coaching, holiday lessons, WAEC/NECO/JAMB/BECE prep, adult literacy and home tutoring.",icon:"📚",color:"#00897B",g2:"#4DB6AC",status:"open",tags:["WAEC","NECO","JAMB","After-School","Adult Learning"]},
        {id:"preuni",num:"03",name:"Pre-University Centre",short:"IJMB · JUPEB · Foundation Studies",desc:"Direct 200-level entry. IJMB, JUPEB, Pre-Degree, Diploma and university admissions coaching.",icon:"🏛️",color:"#BF360C",g2:"#FF6D00",status:"open",tags:["IJMB","JUPEB","Pre-Degree","Diploma"]},
      ]
    },
    {
      id:"professional", label:"Professional & Digital Learning", icon:"💻",
      desc:"Skill-building and certification programmes for career advancement and professional growth.",
      color:"#7B1FA2",
      divisions:[
        {id:"digital",num:"04",name:"Digital Campus",short:"Six Specialist Professional Schools",desc:"Technology, Business, Languages, Communication, International Programmes and Advanced Studies — online and onsite.",icon:"💻",color:"#7B1FA2",g2:"#BA68C8",status:"open",tags:["Coding","IELTS","French","PMP","ACCA","UI/UX","AI"]},
        {id:"professional",num:"05",name:"Professional Learning Centre",short:"Executive · Corporate · CPD",desc:"Executive education, teacher development, school leadership, corporate training and continuing professional development.",icon:"🏢",color:"#E65100",g2:"#FF6D00",status:"coming",tags:["CPD","Corporate Training","Leadership","Teacher Dev"]},
        {id:"cbt",num:"06",name:"CBT Platform",short:"Past Questions · Mock Exams · Practice",desc:"WAEC, NECO and JAMB past questions 2010–2024. Token-based CBT practice, mock exams, Android and Windows app.",icon:"🖥️",color:"#006064",g2:"#00BCD4",status:"coming",tags:["WAEC CBT","NECO CBT","JAMB Simulator","Mobile App"]},
      ]
    },
    {
      id:"corporate", label:"Corporate & Knowledge Services", icon:"🏢",
      desc:"Publishing, consulting, research and technology solutions powering education institutions.",
      color:"#33691E",
      divisions:[
        {id:"publish",num:"07",name:"SAMPACE Publishing",short:"Books · Resources · Digital Content",desc:"Educational textbooks, workbooks, e-books, teacher guides, curriculum resources and digital learning content.",icon:"📖",color:"#33691E",g2:"#8BC34A",status:"coming",tags:["Textbooks","E-books","Curriculum","Digital Content"]},
        {id:"consult",num:"08",name:"SAMPACE Consulting",short:"School Improvement · Advisory",desc:"School establishment support, curriculum development, accreditation guidance and educational policy advisory.",icon:"🤝",color:"#4A148C",g2:"#9C27B0",status:"coming",tags:["School Setup","Accreditation","Curriculum Dev","Digital Transform"]},
        {id:"research",num:"09",name:"Research & Innovation",short:"Think Tank · Knowledge Hub · Journals",desc:"Educational research, innovation hub, learning analytics, AI in education, academic journals and research partnerships.",icon:"🔬",color:"#1A237E",g2:"#3F51B5",status:"future",tags:["Research","Innovation","AI in Education","Journals"]},
        {id:"edtech",num:"10",name:"SAMPACE EdTech",short:"LMS · School Management · AI Tools",desc:"School management systems, AI learning assistant, teacher tools, student analytics and digital infrastructure products.",icon:"⚡",color:"#006064",g2:"#00BCD4",status:"future",tags:["LMS","AI Tools","School Management","Analytics"]},
      ]
    },
    {
      id:"community", label:"Community & Opportunity", icon:"🌟",
      desc:"Scholarships, careers, alumni and community programmes creating opportunities beyond the classroom.",
      color:"#F57F17",
      divisions:[
        {id:"scholarships",num:"11",name:"Scholarship Bank",short:"Grants · Fellowships · Bursaries",desc:"Scholarship database, student sponsorship, fellowship opportunities, education grants and financial aid guidance.",icon:"🌟",color:"#F57F17",g2:"#FFC107",status:"coming",tags:["Scholarships","Grants","Fellowships","Financial Aid"]},
        {id:"careers",num:"12",name:"SAMPACE Careers",short:"Jobs · Recruitment · Internships · Alumni",desc:"Graduate recruitment, teacher recruitment, school jobs, internship programmes, volunteer opportunities and alumni network.",icon:"💼",color:"#37474F",g2:"#78909C",status:"coming",tags:["Graduate Jobs","Teacher Jobs","Internships","Alumni Network"]},
      ]
    },
  ];

  const STATUS = {
    open:{bg:"rgba(16,185,129,.12)",c:"#10B981",dot:"🟢",t:"Open"},
    coming:{bg:"rgba(245,158,11,.12)",c:"#F59E0B",dot:"🟡",t:"Coming Soon"},
    future:{bg:"rgba(99,102,241,.12)",c:"#818CF8",dot:"🔵",t:"Future Expansion"},
  };

  const PATHWAYS = [
    {icon:"👶",label:"Primary Support",desc:"After-school and extramural classes for Basic 1–6",div:"extramural",color:"#00897B"},
    {icon:"🏫",label:"Secondary School",desc:"Full online JSS1–SS3 education with live classes",div:"college",color:"#1565C0"},
    {icon:"📝",label:"Exam Preparation",desc:"WAEC, NECO, JAMB and BECE intensive coaching",div:"extramural",color:"#BF360C"},
    {icon:"🏛️",label:"University Entry",desc:"IJMB, JUPEB, Pre-Degree and direct 200-level",div:"preuni",color:"#E65100"},
    {icon:"💻",label:"Digital Skills",desc:"Coding, AI, Cybersecurity, Data Science and Design",div:"digital",color:"#7B1FA2"},
    {icon:"🌍",label:"International Exams",desc:"IELTS, TOEFL, SAT, GRE and Cambridge prep",div:"digital",color:"#006064"},
    {icon:"📊",label:"Professional Certs",desc:"ACCA, ICAN, PMP, CIPM and more",div:"digital",color:"#33691E"},
    {icon:"📖",label:"Adult Learning",desc:"Literacy, vocational skills and digital basics",div:"extramural",color:"#F57F17"},
  ];

  const WHY = [
    {icon:"✅",title:"CAC Registered",desc:"Legally incorporated under CAMA 2020. Your investment in education is with a recognised Nigerian company."},
    {icon:"🌐",title:"Online & Onsite",desc:"Every programme runs both online and at our physical centres. Choose what works for you."},
    {icon:"💳",title:"Affordable Fees",desc:"Quality education at prices that work for Nigerian families. Instalment payment plans available."},
    {icon:"🤖",title:"Technology-Driven",desc:"AI learning tools, virtual labs, CBT engines, live classes and digital certificates — all in one place."},
    {icon:"📜",title:"Recognised Certificates",desc:"SAMPACE certificates for professional programmes. External exam bodies for WAEC, NECO, JAMB."},
    {icon:"🎯",title:"Results-Focused",desc:"We measure success by student outcomes — exam passes, university admissions and career placements."},
  ];

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div style={{fontFamily:"'Syne',sans-serif",background:"#060F1E",color:W,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&family=Space+Mono&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px;background:#060F1E}
        ::-webkit-scrollbar-thumb{background:#C9A84C33;border-radius:3px}
        .hov-gold{transition:color .2s;cursor:pointer}
        .hov-gold:hover{color:#C9A84C!important}
        .hov-card{transition:all .3s ease;cursor:pointer}
        .hov-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(0,0,0,.35)!important}
        .btn-primary{transition:all .25s;cursor:pointer}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,.3)!important}
        .tag{display:inline-block;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:100px;padding:3px 10px;font-size:10px;color:rgba(255,255,255,.45);margin:2px;font-weight:600;letter-spacing:.3px}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulse{0%,100%{opacity:.8}50%{opacity:.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(6,15,30,.96)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(201,168,76,.08)":"none",transition:"all .3s",padding:"0 clamp(16px,4vw,40px)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:N}}>SE</div>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:1.5}}>SAMPACE EDUCATIONAL LTD</div>
            <div style={{fontSize:7,color:"rgba(255,255,255,.3)",letterSpacing:1.5,textTransform:"uppercase"}}>CAC Registered · Nigeria</div>
          </div>
        </div>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          {[["About","about-sec"],["Divisions","divisions-sec"],["Programmes","pathways-sec"],["Partnerships","partners-sec"],["Contact","contact-sec"]].map(([l,id])=>(
            <span key={l} className="hov-gold" onClick={()=>scrollTo(id)} style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.5)",cursor:"pointer",letterSpacing:.3}}>{l}</span>
          ))}
          <button className="btn-primary" onClick={()=>scrollTo("divisions-sec")} style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:N,border:"none",padding:"8px 18px",borderRadius:8,fontSize:11,fontWeight:800,cursor:"pointer",letterSpacing:.3}}>Apply Now</button>
          <button onClick={()=>onLogin("admin")} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:"8px 14px",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer"}}>Login →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"120px 24px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)",backgroundSize:"64px 64px"}}/>
        <div style={{position:"absolute",top:"15%",left:"10%",width:400,height:400,background:"radial-gradient(circle,rgba(201,168,76,.1),transparent 70%)",filter:"blur(60px)",animation:"pulse 5s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"15%",right:"10%",width:320,height:320,background:"radial-gradient(circle,rgba(21,101,192,.12),transparent 70%)",filter:"blur(60px)",animation:"pulse 6s ease-in-out infinite 1.5s"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:860}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.18)",borderRadius:100,padding:"6px 18px",marginBottom:28,fontSize:10,fontWeight:700,color:G,letterSpacing:2}}>
            🇳🇬 &nbsp; SAMPACE EDUCATIONAL LTD · CAC REGISTERED · NIGERIA
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,6.5vw,82px)",fontWeight:700,lineHeight:1.08,marginBottom:18,letterSpacing:"-1px"}}>
            Nigeria's Education<br/>
            <span style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F,#C9A84C)",backgroundSize:"200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 4s linear infinite"}}>Ecosystem</span>
          </h1>
          <p style={{fontSize:"clamp(13px,1.8vw,17px)",color:"rgba(255,255,255,.5)",lineHeight:1.9,maxWidth:600,margin:"0 auto 16px"}}>
            12 divisions. Online and onsite. From primary school support to university entry, from professional certification to publishing and research — all under one roof.
          </p>
          <p style={{fontSize:13,color:"rgba(255,255,255,.3)",marginBottom:36}}>Online · Onsite · Accessible · World-Class</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:52}}>
            <button className="btn-primary" onClick={()=>scrollTo("pathways-sec")} style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:N,border:"none",padding:"14px 30px",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer"}}>Find Your Programme →</button>
            <button onClick={()=>scrollTo("divisions-sec")} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.12)",color:W,padding:"14px 26px",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>Explore All Divisions</button>
            <a href={WA_LINK} style={{background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",color:"#4AE54A",padding:"14px 22px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>💬 Join Community</a>
          </div>
          <div style={{display:"flex",gap:40,justifyContent:"center",flexWrap:"wrap"}}>
            {[[counts.s.toLocaleString()+"+","Students Enrolling"],[counts.p+"","Divisions"],[counts.d,"Programmes"],[counts.y,"Year Operating"]].map(([v,l],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3vw,36px)",fontWeight:700,color:G}}>{v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:1.5,textTransform:"uppercase",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",animation:"floatY 2.5s ease-in-out infinite",opacity:.3,fontSize:18}}>↓</div>
      </section>

      {/* WHO WE ARE */}
      <section id="about-sec" style={{padding:"80px clamp(20px,6vw,80px)",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
          <div>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Who We Are</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:700,lineHeight:1.2,marginBottom:20}}>
              More Than a School.<br/><em style={{color:G}}>An Education Empire.</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.9,fontSize:14,marginBottom:14}}>SAMPACE EDUCATIONAL LTD is a Nigerian education conglomerate incorporated under the Companies and Allied Matters Act 2020. Founded by Ayeni Samuel Anuoluwapo, we operate across 12 divisions delivering education online and onsite.</p>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.9,fontSize:14,marginBottom:24}}>We are not just a tutoring platform. We are building the infrastructure for Nigeria's education future — one division, one student, one community at a time.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {["CAC Registered","Online & Onsite","12 Divisions","CAMA 2020","Nigeria-First","Technology-Driven"].map(t=>(
                <span key={t} style={{background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.16)",color:G,padding:"5px 13px",borderRadius:100,fontSize:10,fontWeight:700}}>✓ {t}</span>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {icon:"🎓",t:"Academic Excellence",d:"Curriculum aligned to NERDC, WAEC, NECO and international standards"},
              {icon:"💻",t:"Technology-Driven",d:"AI-powered tools, virtual labs, CBT engines and digital platforms"},
              {icon:"🌍",t:"Online & Onsite",d:"Every programme available both online and at physical learning centres"},
              {icon:"🤝",t:"Inclusive Access",d:"Affordable education for every Nigerian regardless of location"},
            ].map((c,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"20px",borderTop:`2px solid ${G}33`}}>
                <div style={{fontSize:26,marginBottom:10}}>{c.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:6}}>{c.t}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.38)",lineHeight:1.65}}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO — Online + Onsite */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(21,101,192,.1),rgba(201,168,76,.06),rgba(11,31,58,.9))",border:"1px solid rgba(201,168,76,.12)",borderRadius:22,padding:"clamp(28px,4vw,48px)"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>What We Do</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700,marginBottom:10}}>Every Way You Learn. We Are There.</h2>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:500,margin:"0 auto"}}>Whether you prefer to learn from your bedroom or from a classroom, SAMPACE covers you.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:32,alignItems:"center",textAlign:"center"}}>
            <div style={{background:"rgba(21,101,192,.08)",border:"1px solid rgba(21,101,192,.2)",borderRadius:16,padding:"28px"}}>
              <div style={{fontSize:36,marginBottom:12}}>🌐</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,marginBottom:12}}>Online Campus</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {["Live video classes","Recorded lessons 24/7","Virtual science labs","CBT exam practice","Digital certificates","AI learning assistant","Mobile + desktop access"].map(f=>(
                  <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><span style={{color:"#10B981",fontSize:9}}>✓</span>{f}</div>
                ))}
              </div>
            </div>
            <div style={{fontSize:32,color:G,fontWeight:900,padding:"20px 0"}}>+</div>
            <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.15)",borderRadius:16,padding:"28px"}}>
              <div style={{fontSize:36,marginBottom:12}}>🏫</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,marginBottom:12}}>Physical Centres</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {["Physical classrooms","Onsite tutoring","Study halls & reading rooms","Exam preparation centres","Hands-on practical sessions","Face-to-face mentoring","Community events"].map(f=>(
                  <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><span style={{color:G,fontSize:9}}>✓</span>{f}</div>
                ))}
              </div>
              <div style={{marginTop:14,fontSize:10,color:"rgba(255,255,255,.25)",fontStyle:"italic"}}>Physical centres launching in select cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING PATHWAYS */}
      <section id="pathways-sec" style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Learning Pathways</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700,marginBottom:10}}>Where Are You On Your Journey?</h2>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:480,margin:"0 auto"}}>Tell us your goal and we will point you to the right SAMPACE division.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {PATHWAYS.map((p,i)=>(
            <div key={i} className="hov-card" onClick={()=>scrollTo("divisions-sec")} style={{background:"rgba(255,255,255,.025)",border:`1px solid rgba(255,255,255,.07)`,borderRadius:14,padding:"20px",borderLeft:`3px solid ${p.color}`}}>
              <div style={{fontSize:26,marginBottom:10}}>{p.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:6}}>{p.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.38)",lineHeight:1.6,marginBottom:12}}>{p.desc}</div>
              <div style={{fontSize:10,color:p.color,fontWeight:700}}>Explore →</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVISIONS — Grouped */}
      <section id="divisions-sec" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Our Divisions</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,42px)",fontWeight:700,marginBottom:10}}>12 Divisions. One Vision.</h2>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:520,margin:"0 auto"}}>Each division is designed to grow independently while remaining part of the SAMPACE ecosystem.</p>
          <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:18,flexWrap:"wrap"}}>
            {Object.entries({open:{c:"#10B981",t:"🟢 Open — Enroll Now"},coming:{c:"#F59E0B",t:"🟡 Coming Soon"},future:{c:"#818CF8",t:"🔵 Future Expansion"}}).map(([k,v])=>(
              <span key={k} style={{fontSize:11,color:v.c,fontWeight:600}}>{v.t}</span>
            ))}
          </div>
        </div>

        {GROUPS.map((group,gi)=>(
          <div key={gi} style={{marginBottom:52}}>
            {/* Group Header */}
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,paddingBottom:14,borderBottom:`1px solid rgba(255,255,255,.07)`}}>
              <div style={{width:40,height:40,background:`${group.color}18`,border:`1px solid ${group.color}33`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{group.icon}</div>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:W}}>{group.label}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{group.desc}</div>
              </div>
            </div>
            {/* Division Cards */}
            <div style={{display:"grid",gridTemplateColumns:`repeat(${group.divisions.length<=2?"2":"3"},1fr)`,gap:14}}>
              {group.divisions.map((d,di)=>{
                const st = STATUS[d.status]||STATUS.future;
                return (
                  <div key={di} className="hov-card" style={{background:"rgba(255,255,255,.025)",border:`1px solid rgba(255,255,255,.07)`,borderRadius:16,padding:"22px",borderTop:`3px solid ${d.color}`,display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div style={{width:42,height:42,background:`${d.color}15`,border:`1px solid ${d.color}25`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{d.icon}</div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <span style={{fontSize:8,color:"rgba(255,255,255,.2)",fontFamily:"'Space Mono',monospace",letterSpacing:1}}>DIV {d.num}</span>
                        <span style={{background:st.bg,color:st.c,padding:"2px 9px",borderRadius:100,fontSize:9,fontWeight:700}}>{st.dot} {st.t}</span>
                      </div>
                    </div>
                    <div style={{fontWeight:800,fontSize:13,color:W,marginBottom:3}}>{d.name}</div>
                    <div style={{fontSize:11,color:d.color,fontWeight:600,marginBottom:10}}>{d.short}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.65,marginBottom:12,flex:1}}>{d.desc}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:14}}>
                      {d.tags.map(t=><span key={t} className="tag">{t}</span>)}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      {d.status==="open"
                        ? <button onClick={()=>onSelect({id:d.id,name:d.name,color:d.color,g2:d.g2,g1:d.color,icon:d.icon,num:d.num,applyType:"student-only"})} style={{flex:1,background:`linear-gradient(135deg,${d.color},${d.g2})`,border:"none",color:W,padding:"9px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Enroll Now →</button>
                        : <button style={{flex:1,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.3)",padding:"9px",borderRadius:8,fontSize:11,fontWeight:600,cursor:"default"}}>{d.status==="coming"?"Join Waitlist":"Future Expansion"}</button>
                      }
                      <button onClick={()=>onLogin("admin")} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.35)",padding:"9px 12px",borderRadius:8,fontSize:11,cursor:"pointer"}}>Login</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* WHY CHOOSE SAMPACE */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Why Choose SAMPACE</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700}}>Built for Nigerian Students.<br/>Designed for the World.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {WHY.map((w,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"22px"}}>
              <div style={{fontSize:28,marginBottom:10}}>{w.icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:7}}>{w.title}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.7}}>{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Success Stories</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>What Our Students Say</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {name:"Adaeze O.",role:"SS3 Student · School College",text:"SAMPACE changed everything for me. The live classes feel just like a real school but I can attend from my bedroom in Anambra. My grades have never been better.",avatar:"A",color:"#1565C0"},
            {name:"Emeka T.",role:"JAMB Candidate · Extramural Hub",text:"I scored 287 in JAMB after 3 months on SAMPACE. The CBT practice sessions are exactly like the real exam. I cannot believe how affordable it was.",avatar:"E",color:"#00897B"},
            {name:"Mrs. Fatima K.",role:"Parent · School College",text:"As a parent, the dashboard keeps me updated daily on my daughter's attendance and scores. I can even message her teachers directly. This is the future.",avatar:"F",color:"#BF360C"},
            {name:"Chukwudi A.",role:"Web Development Graduate · Digital Campus",text:"I learned full-stack web development on SAMPACE in 6 months. I now freelance and earn more than my previous salary. Best investment I ever made.",avatar:"C",color:"#7B1FA2"},
            {name:"Blessing N.",role:"IELTS Student · Digital Campus",text:"Scored 7.5 overall in IELTS after the SAMPACE intensive prep. The tutors are world-class. My Canadian visa was approved. SAMPACE made it happen.",avatar:"B",color:"#E65100"},
            {name:"Taiwo R.",role:"JUPEB Graduate · Pre-University",text:"I gained direct 200-level admission to UNILAG through SAMPACE's JUPEB programme. The best decision I made after WAEC results came out.",avatar:"T",color:"#006064"},
          ].map((t,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"22px",display:"flex",flexDirection:"column"}}>
              <div style={{fontSize:20,color:G,marginBottom:10,letterSpacing:2}}>"</div>
              <p style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.75,flex:1,marginBottom:16}}>{t.text}</p>
              <div style={{display:"flex",alignItems:"center",gap:10,borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:14}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${t.color},${t.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",flexShrink:0}}>{t.avatar}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{t.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(201,168,76,.08),rgba(11,31,58,.95))",border:"1px solid rgba(201,168,76,.14)",borderRadius:22,padding:"clamp(28px,4vw,48px)",display:"grid",gridTemplateColumns:"auto 1fr",gap:36,alignItems:"center"}}>
          <div style={{width:72,height:72,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:900,color:N,flexShrink:0}}>A</div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>A Message from the Founder</div>
            <blockquote style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(15px,2vw,21px)",fontStyle:"italic",color:W,lineHeight:1.65,marginBottom:14}}>"SAMPACE was built on a simple belief — that every Nigerian child, regardless of location or income, deserves access to world-class education. We are not just building a school. We are building an institution that will outlast us all."</blockquote>
            <div style={{fontSize:13,fontWeight:700,color:G}}>Ayeni Samuel Anuoluwapo</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2}}>Founder & Director, SAMPACE EDUCATIONAL LTD</div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partners-sec" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:20,padding:"clamp(28px,4vw,48px)",textAlign:"center"}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Partnerships & Affiliations</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:700,marginBottom:10}}>Building With the Best</h2>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:13,maxWidth:460,margin:"0 auto 28px",lineHeight:1.7}}>SAMPACE is building partnerships with leading professional bodies, exam boards and international education organisations.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:9,justifyContent:"center",marginBottom:16}}>
            {["WAEC","NECO","JAMB","ICAN","ACCA","PMI","Cambridge International","CIPM","NIMN","NIM","Google for Education","Microsoft Learn"].map(p=>(
              <span key={p} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.45)",padding:"7px 15px",borderRadius:100,fontSize:11,fontWeight:600}}>{p}</span>
            ))}
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.2)"}}>Partnerships being formalised. Contact us to partner with SAMPACE.</div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Admissions</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700,marginBottom:10}}>Start in 4 Simple Steps</h2>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:440,margin:"0 auto"}}>Apply online in minutes. Our admissions team responds within 72 hours.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
          {[["1","Choose Division","Select the school or programme that fits your goal"],["2","Apply Online","Fill the application form in under 5 minutes"],["3","Admin Review","Our team contacts you within 72 hours"],["4","Pay & Access","Make payment — your portal is activated immediately"]].map(([n,t,d])=>(
            <div key={n} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"20px",textAlign:"center"}}>
              <div style={{width:34,height:34,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:N,margin:"0 auto 12px"}}>{n}</div>
              <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:5}}>{t}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.38)",lineHeight:1.6}}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <button className="btn-primary" onClick={()=>scrollTo("divisions-sec")} style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:N,border:"none",padding:"14px 36px",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer"}}>Apply to Any Division →</button>
        </div>
      </section>

      {/* NEWS */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32}}>
          <div>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:10}}>Latest News</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>SAMPACE Updates</h2>
          </div>
          <a href={WA_LINK} style={{fontSize:12,color:G,fontWeight:700,textDecoration:"none"}}>All Updates →</a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {tag:"Launch",date:"July 2026",title:"SAMPACE Institute Goes Live on sampaceedu.com.ng",desc:"Our flagship platform is now fully operational with Admin, Staff, Student and Parent portals connected to a live Supabase database.",color:"#10B981"},
            {tag:"Admissions",date:"July 2026",title:"First Cohort Applications Now Open for School College",desc:"JSS1 to SS3 online secondary school is now accepting applications. Early applicants receive special fee consideration.",color:"#1565C0"},
            {tag:"Coming Soon",date:"August 2026",title:"SAMPACE Extramural Hub Launching — WAEC, NECO & JAMB Prep",desc:"After-school and holiday coaching for primary and secondary students launching August 2026. Register interest now.",color:"#F59E0B"},
          ].map((n,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(201,168,76,.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.07)"}>
              <div style={{height:6,background:`linear-gradient(90deg,${n.color},${n.color}44)`}}/>
              <div style={{padding:"20px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
                  <span style={{background:`${n.color}18`,color:n.color,padding:"2px 10px",borderRadius:100,fontSize:10,fontWeight:700}}>{n.tag}</span>
                  <span style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{n.date}</span>
                </div>
                <div style={{fontWeight:700,fontSize:13,color:"#fff",lineHeight:1.45,marginBottom:10}}>{n.title}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.7}}>{n.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-sec" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
          <div>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Contact Us</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,marginBottom:14}}>Let's Talk Education</h2>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:13,lineHeight:1.8,marginBottom:24}}>Questions about admissions, programmes, partnerships or careers at SAMPACE? Our team is ready.</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
              {[["📧","Email","info@sampaceedu.com.ng"],["🌐","Website","sampaceedu.com.ng"],["💬","WhatsApp","Community & Support"]].map(([icon,label,val])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:34,height:34,background:"rgba(201,168,76,.08)",border:"1px solid rgba(201,168,76,.18)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{icon}</div>
                  <div><div style={{fontSize:9,color:"rgba(255,255,255,.25)",letterSpacing:1,textTransform:"uppercase"}}>{label}</div><div style={{fontSize:12,color:W,fontWeight:600}}>{val}</div></div>
                </div>
              ))}
            </div>
            <a href={WA_LINK} style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#25D366,#128C7E)",color:W,padding:"11px 22px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none"}}>💬 Join WhatsApp Community</a>
          </div>
          <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"26px"}}>
            <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:16}}>Send an Enquiry</div>
            {[["Full Name","text","Your full name"],["Email","email","your@email.com"],["Phone","text","+234..."],["Programme Interest","text","e.g. WAEC Coaching, Coding, IJMB"]].map(([label,type,ph])=>(
              <div key={label} style={{marginBottom:11}}>
                <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{label}</label>
                <input type={type} placeholder={ph} style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",fontFamily:"'Syne',sans-serif"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message</label>
              <textarea rows={3} placeholder="Tell us what you need..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",resize:"vertical",fontFamily:"'Syne',sans-serif"}}/>
            </div>
            <button className="btn-primary" style={{width:"100%",background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:N,border:"none",padding:"11px",border
