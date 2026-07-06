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

// Demo credentials
const DEMO = {
  admin:   { email: "admin@sampaceedu.com.ng",   pass: "admin2026"   },
  staff:   { email: "staff@sampaceedu.com.ng",    pass: "staff2026"   },
  student: { email: "student@sampaceedu.com.ng",  pass: "student2026" },
  parent:  { email: "parent@sampaceedu.com.ng",   pass: "parent2026"  },
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
        <div style={{ display:"flex", gap:6, alignItems:"center", position:"relative" }}>
          {["About","Schools","Contact"].map(item=>(
            <button key={item} onClick={()=>item==="Schools"?document.getElementById("schools-sec")?.scrollIntoView({behavior:"smooth"}):item==="Contact"?document.getElementById("contact-sec")?.scrollIntoView({behavior:"smooth"}):document.getElementById("about-sec")?.scrollIntoView({behavior:"smooth"})} style={{ background:"transparent", border:"none", color:"rgba(255,255,255,.65)", padding:"6px 10px", borderRadius:6, fontSize:11, cursor:"pointer", fontWeight:600, display:scrollY>50?"inline":"none" }}>{item}</button>
          ))}
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
          <button onClick={()=>document.getElementById("schools-sec")?.scrollIntoView({behavior:"smooth"})} style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"7px 15px", borderRadius:6, fontSize:11, fontWeight:800, cursor:"pointer" }}>Apply Now</button>
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
            🟢 Live · sampaceedu.com.ng
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(38px,9vw,82px)", fontWeight:900, lineHeight:.9, marginBottom:13, letterSpacing:-2 }}>
            <span style={{ display:"block", background:"linear-gradient(135deg,#fff,#64B5F6,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>SAMPACE</span>
            <span className="shimmer" style={{ fontStyle:"italic" }}>Institute</span>
          </h1>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(8px,1.5vw,11px)", letterSpacing:6, color:"rgba(255,255,255,.25)", marginBottom:16, textTransform:"uppercase" }}>Where Excellence Begins</div>
          <p style={{ fontSize:"clamp(12px,2vw,14px)", color:"rgba(255,255,255,.5)", lineHeight:1.85, maxWidth:480, margin:"0 auto 26px" }}>Nine world-class schools. Virtual Labs · CBT Exams · Live Classes · Parent Portals. Everything online.</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:44 }}>
            <button onClick={()=>document.getElementById("schools-sec").scrollIntoView({behavior:"smooth"})} style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", border:"none", padding:"12px 26px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 8px 28px rgba(21,101,192,.4)" }}>Explore Schools →</button>
            <button onClick={()=>document.getElementById("schools-sec")?.scrollIntoView({behavior:"smooth"})} style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"12px 26px", borderRadius:8, fontSize:13, fontWeight:800, cursor:"pointer" }}>Apply Now</button>
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
            <div key={s.id} className="hover-lift" onMouseEnter={()=>setHovered(s.id)} onMouseLeave={()=>setHovered(null)} onClick={()=>onSelect(s)} style={{ background:hovered===s.id?`linear-gradient(135deg,${s.g1}80,${s.color}45)`:`linear-gradient(135deg,${s.g1}40,${s.color}20)`, border:`1px solid ${hovered===s.id?s.color:"rgba(255,255,255,.1)"}`, borderLeft:`4px solid ${s.color}`, borderRadius:13, padding:"18px 15px", transition:"all .3s ease", boxShadow:hovered===s.id?`0 8px 36px ${s.color}28`:"none", animation:`fadeUp .55s ${i*.07}s ease both` }}>
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

      <section id="contact-sec" style={{ padding:"40px 16px 64px", maxWidth:520, margin:"0 auto" }}>
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
// ─── ADMIN DASHBOARD (Supabase connected) ───
function AdminDashboard({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [sideOpen, setSideOpen] = useState(true);
  const [stats, setStats] = useState({ totalStudents:0, totalApps:0, totalRevenue:0, pendingApps:0, pendingPayments:0 });
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const C = { navy:"#0B1F3A", blue:"#1565C0", sky:"#42A5F5", gold:"#C9A84C", cream:"#F8FAFF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", red:"#EF4444", amber:"#F59E0B", purple:"#7C3AED" };
  const fmt = n => "₦" + Number(n||0).toLocaleString();

  const sb = () => window.__supabase;

  // Load data from Supabase
  const loadStats = async () => {
    const s = sb(); if (!s) return;
    try {
      const [studs, apps, pays, pendApps, pendPays] = await Promise.all([
        s.from("users").select("id", { count:"exact", head:true }).eq("role","student"),
        s.from("applications").select("id", { count:"exact", head:true }),
        s.from("payments").select("amount").eq("status","success"),
        s.from("applications").select("id", { count:"exact", head:true }).eq("status","pending"),
        s.from("payments").select("id", { count:"exact", head:true }).eq("status","success").eq("admin_verified",false),
      ]);
      const totalRevenue = (pays.data||[]).reduce((sum,p)=>sum+Number(p.amount),0);
      setStats({ totalStudents:studs.count||0, totalApps:apps.count||0, totalRevenue, pendingApps:pendApps.count||0, pendingPayments:pendPays.count||0 });
    } catch(e) { console.error(e); }
  };

  const loadApplications = async () => {
    const s = sb(); if (!s) return;
    setLoading(true);
    const { data, error } = await s.from("applications").select("*").order("created_at",{ascending:false}).limit(50);
    if (!error) setApplications(data||[]);
    setLoading(false);
  };

  const loadStudents = async () => {
    const s = sb(); if (!s) return;
    setLoading(true);
    const { data, error } = await s.from("users").select("*, student_profiles(*)").eq("role","student").order("created_at",{ascending:false}).limit(50);
    if (!error) setStudents(data||[]);
    setLoading(false);
  };

  const loadPayments = async () => {
    const s = sb(); if (!s) return;
    setLoading(true);
    const { data, error } = await s.from("payments").select("*").order("created_at",{ascending:false}).limit(50);
    if (!error) setPayments(data||[]);
    setLoading(false);
  };

  const updateAppStatus = async (id, status) => {
    const s = sb(); if (!s) return;
    await s.from("applications").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    setMsg("✅ Application " + status);
    loadApplications(); loadStats();
    setTimeout(()=>setMsg(""), 3000);
  };

  const enablePayment = async (id) => {
    const s = sb(); if (!s) return;
    await s.from("payments").update({ access_enabled:true, admin_verified:true, admin_enabled_at:new Date().toISOString() }).eq("id", id);
    setMsg("✅ Access enabled for student");
    loadPayments(); loadStats();
    setTimeout(()=>setMsg(""), 3000);
  };

  useEffect(() => {
    loadStats();
    if (page==="applications") loadApplications();
    else if (page==="students") loadStudents();
    else if (page==="payments") loadPayments();
  }, [page]);

  const NAV = [
    {id:"overview",icon:"⊞",label:"Overview"},
    {id:"applications",icon:"📋",label:"Applications",badge:stats.pendingApps||null},
    {id:"students",icon:"👥",label:"Students"},
    {id:"staff",icon:"👔",label:"Staff"},
    {id:"payments",icon:"💰",label:"Payments",badge:stats.pendingPayments||null},
    {id:"inquiries",icon:"💬",label:"Inquiries"},
    {id:"timetable",icon:"📅",label:"Timetable"},
    {id:"announcements",icon:"📣",label:"Announcements"},
    {id:"schools",icon:"🏫",label:"Schools"},
    {id:"settings",icon:"⚙️",label:"Settings"},
  ];

  const badge = (s) => {
    const m = { pending:{bg:"rgba(245,158,11,.1)",c:"#F59E0B"}, approved:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, rejected:{bg:"rgba(239,68,68,.1)",c:"#EF4444"}, active:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, paid:{bg:"rgba(16,185,129,.1)",c:"#10B981"}, success:{bg:"rgba(16,185,129,.1)",c:"#10B981"} };
    const b = m[s] || {bg:"rgba(100,116,139,.1)",c:"#64748B"};
    return <span style={{ background:b.bg, color:b.c, padding:"3px 9px", borderRadius:100, fontSize:10, fontWeight:700, textTransform:"capitalize" }}>{s}</span>;
  };

  const renderPage = () => {
    if (page === "overview") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Good day, <em style={{ color:C.blue }}>Super Admin</em> 👋</h2>
        <div style={{ fontSize:12, color:C.slate, marginBottom:18 }}>SAMPACE INSTITUTE Command Centre · All 9 Schools</div>
        {msg && <div style={{ background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", color:C.green, padding:"10px 16px", borderRadius:8, marginBottom:14, fontSize:13, fontWeight:600 }}>{msg}</div>}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:13, marginBottom:18 }}>
          {[
            {icon:"👥", label:"Total Students", val:stats.totalStudents, color:C.blue},
            {icon:"⏳", label:"Pending Apps", val:stats.pendingApps, color:C.amber},
            {icon:"💰", label:"Total Revenue", val:fmt(stats.totalRevenue), color:C.green},
            {icon:"💳", label:"Pending Payments", val:stats.pendingPayments, color:C.purple},
          ].map((k,i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${k.color}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${k.color}` }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{k.icon}</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:24, color:k.color, fontWeight:900, lineHeight:1 }}>{k.val}</div>
              <div style={{ fontSize:11, color:C.navy, fontWeight:600, marginTop:3 }}>{k.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy, display:"flex", justifyContent:"space-between" }}>
              Recent Applications
              <button onClick={()=>setPage("applications")} style={{ fontSize:11, color:C.blue, border:"none", background:"none", cursor:"pointer" }}>View All →</button>
            </div>
            {applications.slice(0,5).map((a,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", borderBottom:"1px solid #F8FAFF" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{a.applicant_name}</div>
                  <div style={{ fontSize:10, color:C.slate }}>{a.school_id} · {a.reference}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  {badge(a.status)}
                  {a.status==="pending" && <div style={{ display:"flex", gap:3 }}>
                    <button onClick={()=>updateAppStatus(a.id,"approved")} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"3px 8px", borderRadius:4, fontSize:10, cursor:"pointer", fontWeight:700 }}>✓</button>
                    <button onClick={()=>updateAppStatus(a.id,"rejected")} style={{ background:"rgba(239,68,68,.1)", border:"none", color:C.red, padding:"3px 8px", borderRadius:4, fontSize:10, cursor:"pointer", fontWeight:700 }}>✕</button>
                  </div>}
                </div>
              </div>
            ))}
            {applications.length===0 && <div style={{ padding:"20px 16px", textAlign:"center", color:C.slate, fontSize:12 }}>No applications yet. Students will appear here when they apply.</div>}
          </div>
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy, display:"flex", justifyContent:"space-between" }}>
              Recent Payments
              <button onClick={()=>setPage("payments")} style={{ fontSize:11, color:C.blue, border:"none", background:"none", cursor:"pointer" }}>View All →</button>
            </div>
            {payments.slice(0,5).map((p,i)=>(
              <div key={i} style={{ padding:"10px 16px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{p.student_id?.slice(0,8)||"Student"}...</div>
                  <div style={{ fontSize:10, color:C.slate }}>{p.school_id} · {p.payment_type}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.green }}>{fmt(p.amount)}</div>
                  {!p.access_enabled
                    ? <button onClick={()=>enablePayment(p.id)} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"3px 8px", borderRadius:5, fontSize:9, cursor:"pointer", fontWeight:700, marginTop:2 }}>Enable Access</button>
                    : <span style={{ fontSize:9, color:C.green, fontWeight:700 }}>✓ Access On</span>}
                </div>
              </div>
            ))}
            {payments.length===0 && <div style={{ padding:"20px 16px", textAlign:"center", color:C.slate, fontSize:12 }}>No payments yet.</div>}
          </div>
        </div>
      </div>
    );

    if (page === "applications") return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div><h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy }}>Applications</h2><div style={{ fontSize:12, color:C.slate }}>{applications.length} total · {stats.pendingApps} pending</div></div>
          <button onClick={loadApplications} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>🔄 Refresh</button>
        </div>
        {msg && <div style={{ background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", color:C.green, padding:"10px 16px", borderRadius:8, marginBottom:14, fontSize:13 }}>{msg}</div>}
        {loading ? <div style={{ textAlign:"center", padding:40, color:C.slate }}>Loading applications...</div> : (
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 1fr 1.5fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
              {["Applicant","School","Program","Date","Status","Actions"].map(h=><div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>)}
            </div>
            {applications.length===0
              ? <div style={{ padding:"40px 16px", textAlign:"center", color:C.slate }}>No applications yet. When students apply on the website, they appear here.</div>
              : applications.map((a,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 1fr 1.5fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{a.applicant_name}</div>
                  <div style={{ fontSize:10, color:C.slate }}>{a.email}</div>
                </div>
                <div style={{ fontSize:11, color:C.slate }}>{a.school_id}</div>
                <div style={{ fontSize:11, color:C.slate }}>{a.program||a.class_level||"—"}</div>
                <div style={{ fontSize:10, color:C.slate }}>{new Date(a.created_at).toLocaleDateString()}</div>
                {badge(a.status)}
                <div style={{ display:"flex", gap:4 }}>
                  {a.status==="pending" && <>
                    <button onClick={()=>updateAppStatus(a.id,"approved")} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"4px 8px", borderRadius:5, fontSize:10, cursor:"pointer", fontWeight:700 }}>✓ Approve</button>
                    <button onClick={()=>updateAppStatus(a.id,"rejected")} style={{ background:"rgba(239,68,68,.1)", border:"none", color:C.red, padding:"4px 8px", borderRadius:5, fontSize:10, cursor:"pointer", fontWeight:700 }}>✕</button>
                  </>}
                  {a.status!=="pending" && <span style={{ fontSize:10, color:C.slate }}>Done</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (page === "students") return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div><h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy }}>Students</h2><div style={{ fontSize:12, color:C.slate }}>{students.length} registered</div></div>
          <button onClick={loadStudents} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>🔄 Refresh</button>
        </div>
        {loading ? <div style={{ textAlign:"center", padding:40, color:C.slate }}>Loading students...</div> : (
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
              {["Student","Email","School","Role","Joined"].map(h=><div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>)}
            </div>
            {students.length===0
              ? <div style={{ padding:"40px 16px", textAlign:"center", color:C.slate }}>No students yet. Students appear here after registration and admin approval.</div>
              : students.map((s,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>{s.full_name?.charAt(0)||"?"}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{s.full_name}</div>
                </div>
                <div style={{ fontSize:11, color:C.slate }}>{s.email}</div>
                <div style={{ fontSize:11, color:C.slate }}>{s.student_profiles?.[0]?.school_id||"—"}</div>
                <div style={{ fontSize:11, color:C.slate, textTransform:"capitalize" }}>{s.role}</div>
                <div style={{ fontSize:10, color:C.slate }}>{new Date(s.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (page === "payments") return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div><h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy }}>Payments</h2><div style={{ fontSize:12, color:C.slate }}>{payments.length} total payments</div></div>
          <button onClick={loadPayments} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>🔄 Refresh</button>
        </div>
        {msg && <div style={{ background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", color:C.green, padding:"10px 16px", borderRadius:8, marginBottom:14, fontSize:13 }}>{msg}</div>}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:13, marginBottom:18 }}>
          {[
            ["Total Collected", fmt(payments.filter(p=>p.status==="success").reduce((s,p)=>s+Number(p.amount),0)), C.green],
            ["Pending Verification", fmt(payments.filter(p=>p.status==="success"&&!p.admin_verified).reduce((s,p)=>s+Number(p.amount),0)), C.amber],
            ["Access Not Enabled", payments.filter(p=>p.status==="success"&&!p.access_enabled).length+" students", C.red],
          ].map(([l,v,c],i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${c}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${c}` }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:c, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
        {loading ? <div style={{ textAlign:"center", padding:40, color:C.slate }}>Loading...</div> : (
          <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            {payments.length===0
              ? <div style={{ padding:"40px 16px", textAlign:"center", color:C.slate }}>No payments yet. Payments appear here when students pay via Paystack.</div>
              : payments.map((p,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:"1px solid #F8FAFF" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(16,185,129,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>💳</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{p.paystack_reference||"Ref: "+p.id?.slice(0,8)}</div>
                    <div style={{ fontSize:10, color:C.slate }}>{p.school_id} · {p.payment_type} · {new Date(p.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.green }}>{fmt(p.amount)}</div>
                  {badge(p.status)}
                  {p.status==="success" && !p.access_enabled
                    ? <button onClick={()=>enablePayment(p.id)} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"6px 12px", borderRadius:6, fontSize:11, cursor:"pointer", fontWeight:700 }}>✓ Enable Access</button>
                    : p.access_enabled ? <span style={{ fontSize:11, color:C.green, fontWeight:700 }}>✅ Active</span> : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (page === "timetable") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Class Timetable Manager</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:18 }}>Manage and publish the weekly timetable for all schools.</p>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"20px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["School","select",["School College","Tutorial","Digital Campus","Pre-University"]],["Class/Level","select",["JSS1","JSS2","JSS3","SS1","SS2","SS3","WAEC Track","IJMB","JUPEB"]],["Subject","text","e.g. English Language"],["Teacher","text","e.g. Mrs. Adeyemi"],["Day","select",["Monday","Tuesday","Wednesday","Thursday","Friday"]],["Time","time",""]].map(([label,type,opts],i)=>(
              <div key={i}>
                <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>{label}</label>
                {type==="select" ? <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}><option>Select...</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
                : <input type={type} placeholder={opts} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>}
              </div>
            ))}
            <div style={{ gridColumn:"1/-1" }}>
              <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>Virtual Classroom Link (BigBlueButton / Google Meet)</label>
              <input placeholder="https://meet.google.com/xxx" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>
            </div>
          </div>
          <button style={{ marginTop:16, background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Save Class to Timetable</button>
        </div>
        <div style={{ marginTop:14, background:"rgba(21,101,192,.06)", border:"1px solid rgba(21,101,192,.2)", borderRadius:10, padding:"14px 18px", fontSize:12, color:C.navy }}>
          💡 Live class links connect to BigBlueButton on Oracle Cloud (coming after card issue resolved) or Google Meet (free, available now).
        </div>
      </div>
    );

    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🚧</div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:8, textTransform:"capitalize" }}>{page}</h2>
        <p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>This section is being built. Check back soon.</p>
      </div>
    );
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
              {sideOpen && item.badge ? <span style={{ background:C.red, color:"#fff", fontSize:9, fontWeight:700, padding:"1px 5px", borderRadius:100, minWidth:16, textAlign:"center" }}>{item.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          {sideOpen ? <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,.15)", border:"none", color:C.red, padding:"8px", borderRadius:7, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button>
          : <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", border:"none", color:C.red, width:34, height:34, borderRadius:7, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↩</button>}
        </div>
      </aside>
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 20px", height:50, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", fontSize:10, color:C.slate }}>Admin Dashboard <span style={{ color:"#CBD5E1" }}>›</span> <span style={{ color:C.navy, fontWeight:600, textTransform:"capitalize" }}>{page}</span></div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:sb()?"#10B981":"#EF4444" }} title={sb()?"Supabase connected":"Supabase not connected"} />
            <div style={{ fontSize:10, color:C.slate }}>{sb()?"Live":"Demo"}</div>
            <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#C9A84C,#FFD54F)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:C.navy }}>A</div>
          </div>
        </header>
        <main style={{ flex:1, padding:"20px", overflowY:"auto" }}>{renderPage()}</main>
      </div>
    </div>
  );
}


function StaffPortal({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [marked, setMarked] = useState({});
  const [scores, setScores] = useState({});
  const [saveMsg, setSaveMsg] = useState("");
  const [staffProfile, setStaffProfile] = useState(null);

  useEffect(() => {
    const sb = window.__supabase;
    if (!sb) return;
    sb.auth.getUser().then(({ da
