import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
if (typeof window !== "undefined" && window.__initSupabase) {
  window.__initSupabase(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON
  );
}
const _supa = () => window.__supabase || null;
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
const SCHOOLS = [
  { id: "school-college", num: "01", emoji: "🎓", name: "School College", short: "JSS1–SS3 · Virtual Campus", color: "#1565C0", accent: "#64B5F6", g1: "#0B2A5E", g2: "#1565C0", desc: "Nigeria's premier online secondary school. Full JSS1–SS3 curriculum, virtual labs, CBT exams and globally competitive academic standards.", tags: ["JSS1–SS3", "Virtual Lab", "WAEC·NECO", "CBT", "Report Cards"], applyType: "parent-student", depts: ["Sciences", "Humanities", "Business/Commercial"], classes: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"], features: [{ icon: "🧪", t: "Virtual Science Lab", d: "Physics, Chemistry, Biology simulations via PhET — free, no install needed" }, { icon: "📚", t: "Digital Library", d: "Textbooks, past questions, e-resources and video lessons" }, { icon: "📝", t: "CBT Exam Engine", d: "Objective, theory, fill-in-gap and diagram questions with timer" }, { icon: "📊", t: "Report Cards", d: "CA1(10) + CA2(10) + Project(10) + Exam(70) per term" }, { icon: "🎬", t: "Live Classes", d: "BigBlueButton virtual classroom — free, record, whiteboard, attendance" }, { icon: "👨‍👩‍👧", t: "Parent Dashboard", d: "Auto-created on admission — track progress, attendance, reports" }] },
  { id: "tutorial", num: "02", emoji: "📝", name: "Tutorial & Local Exam", short: "BECE · WAEC · NECO · GCE · JAMB", color: "#00897B", accent: "#4DB6AC", g1: "#003D2E", g2: "#00695C", desc: "Intensive exam preparation for every major Nigerian examination — CBT simulators, virtual labs and monthly ranked mock tests.", tags: ["BECE", "WAEC", "NECO", "JAMB/UTME", "CBT", "Virtual Lab"], applyType: "student-only", tracks: ["BECE", "WAEC", "NECO", "GCE", "JAMB/UTME"], features: [{ icon: "🎯", t: "5 Exam Tracks", d: "BECE, WAEC, NECO, GCE and JAMB — pick your track" }, { icon: "💻", t: "JAMB CBT Simulator", d: "Exact JAMB interface — 160 questions, 2-hour countdown" }, { icon: "📅", t: "Monthly Mock Tests", d: "Scheduled, auto-graded, ranked — see your position" }, { icon: "🧪", t: "Virtual Lab", d: "Science practicals for Biology, Chemistry, Physics tracks" }, { icon: "🏆", t: "Leaderboard", d: "Monthly top performers celebrated with digital badges" }, { icon: "📜", t: "Certificate", d: "Digital Certificate of Participation for all candidates" }] },
  { id: "digital-campus", num: "03–08", emoji: "🏫", name: "SAMPACE Digital Campus", short: "Technology · Business · Languages · Communication · International", color: "#7B1FA2", accent: "#CE93D8", g1: "#1A0040", g2: "#4A148C", desc: "Six specialist schools — cohort-based professional learning with live classes, community and career-focused digital certification.", tags: ["Technology", "PMP·ACCA·ICAN", "IELTS·SAT", "Languages", "Certificates"], applyType: "individual", subSchools: [{ id: "technology", name: "School of Technology", emoji: "💻", color: "#4A148C", courses: ["Full-Stack Web Dev", "Cybersecurity", "Data Science", "UI/UX", "Mobile App", "Cloud/AWS"] }, { id: "business", name: "Business & Professional", emoji: "📊", color: "#006064", courses: ["ACCA", "ICAN", "PMP", "CFA", "CIMA", "CIPM"] }, { id: "international", name: "Advanced & International", emoji: "🌍", color: "#880E4F", courses: ["IELTS", "SAT", "A-Level", "TOEFL", "GRE", "GMAT"] }, { id: "communication", name: "Communication & Diction", emoji: "🎤", color: "#0277BD", courses: ["Public Speaking", "Diction", "Presentation", "Debate", "Media Training"] }, { id: "languages", name: "School of Languages", emoji: "🌐", color: "#311B92", courses: ["French", "Spanish", "Arabic", "Mandarin", "German", "Yoruba"] }], features: [{ icon: "💻", t: "School of Technology", d: "Web Dev, Cybersecurity, Data Science, UI/UX" }, { icon: "📊", t: "Business & Professional", d: "PMP, ACCA, ICAN, CFA certifications" }, { icon: "🌍", t: "Advanced & International", d: "SAT, IELTS, A-Level, TOEFL" }, { icon: "🎤", t: "Communication & Diction", d: "Public speaking, diction, media training" }, { icon: "🌐", t: "School of Languages", d: "French, Spanish, Arabic, Mandarin" }, { icon: "🏆", t: "Certificates", d: "Digital certificates on course completion" }] },
  { id: "pre-university", num: "04", emoji: "🏛️", name: "Pre-University College", short: "IJMB · JUPEB · Pre-Degree · Diploma", color: "#BF360C", accent: "#FFAB91", g1: "#3E1A00", g2: "#BF360C", desc: "Your gateway to 200-level university admission. IJMB, JUPEB, Pre-Degree and Diploma — university-standard, fully online with official transcripts and certificates.", tags: ["IJMB", "JUPEB", "Diploma", "200 Level", "Transcripts"], applyType: "parent-student", programs: ["IJMB", "JUPEB", "Pre-Degree", "Diploma"], classes: ["IJMB — Year 1", "IJMB — Year 2", "JUPEB — Year 1", "JUPEB — Year 2", "Pre-Degree", "Diploma"], features: [{ icon: "🎓", t: "IJMB Programme", d: "Direct 200-level university entry without JAMB — 2 years" }, { icon: "🏛️", t: "JUPEB Programme", d: "University-affiliated advanced level qualification" }, { icon: "📘", t: "Pre-Degree", d: "1-year foundation programme for 100-level university entry" }, { icon: "📜", t: "Diploma", d: "Professional diploma in specialist fields — 1 year" }, { icon: "📋", t: "Official Transcript", d: "Semester transcript auto-generated for each student" }, { icon: "🎯", t: "University Placement", d: "Advisory and support for admission into top universities" }] },
  { id: "services", num: "09", emoji: "🤝", name: "Professional Services", short: "CV · Admissions · Consulting · Study Abroad", color: "#E65100", accent: "#FFD180", g1: "#1A1000", g2: "#E65100", desc: "Expert personalised services — CV writing, university admission support, scholarship research, study abroad guidance and corporate training. All custom-priced.", tags: ["CV Writing", "Admission Help", "Scholarships", "Study Abroad", "Corporate"], applyType: "inquiry", services: ["CV & Resume Writing", "University Admission Support", "Scholarship Research", "Study Abroad Guidance", "Corporate Training", "SOP Writing", "Educational Counselling", "Document Attestation"], features: [{ icon: "📄", t: "CV & Resume Writing", d: "ATS-optimised, industry-targeted CVs that get interviews" }, { icon: "🎓", t: "University Admissions", d: "Nigerian and international university applications" }, { icon: "🏆", t: "Scholarship Research", d: "Find and apply for scholarships worldwide" }, { icon: "🌍", t: "Study Abroad", d: "UK, USA, Canada, Australia complete guidance" }, { icon: "🏢", t: "Corporate Training", d: "Bespoke training for organisations and NGOs" }, { icon: "✍️", t: "SOP Writing", d: "Personal statements for postgraduate entry" }] },
];
const inp = { width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8, padding: "11px 13px", color: "#fff", fontSize: 13, marginBottom: 10, outline: "none", boxSizing: "border-box" };
const sel = { ...inp, background: "rgba(11,20,40,.92)" };
const lbl = (c) => ({ fontSize: 10, color: c, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 5 });
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
          <span onClick={async()=>{
            if(!email){alert("Enter your email above, then click here.");return;}
            const sb=window.__supabase;
            if(sb){const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:"https://sampaceedu.com.ng/#reset"});alert(error?"Error: "+error.message:"✅ Reset link sent to "+email+". Check your inbox.");}
            else{alert("Contact info@sampaceedu.com.ng to reset your password.");}
          }} style={{cursor:"pointer",color,textDecoration:"underline"}}>Forgot password?</span>
          &nbsp;·&nbsp;<a href={`mailto:${EMAIL}`} style={{color:"rgba(255,255,255,.3)",textDecoration:"none"}}>Contact admin</a>
        </div>
      </div>
    </div>
  );
}
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

  const isSec = ["school-college","pre-university","college","preuni"].includes(school.id);
  const isTut = ["tutorial","extramural"].includes(school.id);
  const isInquiry = ["publish","consult","research","edtech","scholarships","careers"].includes(school.id);

  if (done) return (
    <div style={{ textAlign:"center", padding:"36px 16px" }}>
      <div style={{ fontSize:56, marginBottom:12, animation:"floatY 2s ease-in-out infinite" }}>🎉</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:"#fff", marginBottom:8 }}>
        {school.applyType === "inquiry" ? "Inquiry Received!" : "Application Submitted!"}
      </div>
      <p style={{ color:"rgba(255,255,255,.55)", lineHeight:1.7, marginBottom:16, fontSize:13 }}>
        Our admissions team reviews within 72 hours. Watch your email and WhatsApp.
      </p>
      <div style={{ background:"rgba(255,255,255,.05)", borderRadius:10, padding:"13px 16px", marginBottom:14, textAlign:"left" }}>
        <div style={{ fontSize:10, color:school.accent, fontWeight:700, letterSpacing:1, marginBottom:4, textTransform:"uppercase" }}>Reference Number</div>
        <div style={{ fontFamily:"monospace", fontSize:17, color:"#fff" }}>
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
  // ── INQUIRY FORM — for non-school divisions ──
  if (isInquiry) return (
    <div>
      <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.18)",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:12,color:"rgba(255,255,255,.6)",lineHeight:1.7}}>
        {school.icon} <strong style={{color:"#fff"}}>{school.name}</strong> — Our team will contact you within 24 hours.
      </div>
      <label style={ac}>Full Name *</label>
      <input style={{...inp,borderColor:errors.name?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Your full name" onChange={e=>set("name",e.target.value)}/>
      {errors.name&&<div style={{color:"#EF4444",fontSize:10,marginBottom:6}}>{errors.name}</div>}
      <label style={ac}>Email *</label>
      <input style={{...inp,borderColor:errors.email?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="email@example.com" onChange={e=>set("email",e.target.value)}/>
      {errors.email&&<div style={{color:"#EF4444",fontSize:10,marginBottom:6}}>{errors.email}</div>}
      <label style={ac}>Phone / WhatsApp *</label>
      <input style={{...inp,borderColor:errors.phone?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="+234..." onChange={e=>set("phone",e.target.value)}/>
      {errors.phone&&<div style={{color:"#EF4444",fontSize:10,marginBottom:6}}>{errors.phone}</div>}
      <label style={ac}>What are you interested in?</label>
      <input style={inp} placeholder={
        school.id==="careers"?"e.g. Teacher position, Graduate role, Internship":
        school.id==="scholarships"?"e.g. Undergraduate scholarship, Fellowship, Grant":
        school.id==="consult"?"e.g. School setup, Curriculum review, Accreditation":
        school.id==="publish"?"e.g. Purchase books, Curriculum resources":
        school.id==="research"?"e.g. Research partnership, Journal submission":
        "e.g. General enquiry, Partnership, Information"
      } onChange={e=>set("interest",e.target.value)}/>
      <label style={ac}>Message</label>
      <textarea style={{...inp,minHeight:70,resize:"vertical"}} placeholder="Tell us more about what you need..." onChange={e=>set("desc",e.target.value)}/>
      <div style={{display:"flex",gap:10,marginTop:8}}>
        <a href={typeof WA!=="undefined"?WA:"https://chat.whatsapp.com/HLWOIKvXhjqIjYAfOFjvTp"}
          style={{flex:1,background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",padding:"11px",borderRadius:8,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}>
          💬 WhatsApp
        </a>
        <button onClick={async()=>{
          if(!req(["name","email","phone"]))return;
          const sb=window.__supabase;
          if(sb){
            await sb.from("applications").insert({
              reference:"ENQ-"+school.id.toUpperCase()+"-"+Date.now(),
              school_id:school.id, applicant_name:form.name,
              email:form.email, phone:form.phone,
              program:form.interest||"General Enquiry",
              admin_notes:form.desc||"", status:"pending", app_type:"inquiry"
            }).then(()=>{}).catch(()=>{});
          }
          setDone(true);
        }} style={{flex:2,background:`linear-gradient(135deg,${school.g2||"#1565C0"},${school.color||"#42A5F5"})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>
          Send Enquiry ✓
        </button>
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
        </div>}
      </div>
    </div>
  );
}


function SchoolPage({ school, onBack, onLogin }) {
  const [showForm, setShowForm] = useState(false);
  const [openSub, setOpenSub] = useState(null);

  // Safety: if school object is missing required fields, show fallback
  if (!school || !school.color) {
    return (
      <div style={{fontFamily:"sans-serif",background:"#050A14",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:40}}>
        <div style={{fontSize:48,marginBottom:16}}>{school?.icon||"🏫"}</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,color:"#fff",marginBottom:12}}>{school?.name||"SAMPACE Division"}</h2>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:14,marginBottom:8}}>{school?.short||""}</p>
        <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:500,lineHeight:1.7,marginBottom:28}}>{school?.desc||"This division is currently being set up. Please contact us for more information."}</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
          <a href="https://chat.whatsapp.com/HLWOIKvXhjqIjYAfOFjvTp" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",padding:"12px 24px",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>💬 WhatsApp Us</a>
          <a href="mailto:info@sampaceedu.com.ng" style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",color:"#fff",padding:"12px 24px",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>📧 Email Us</a>
          <button onClick={onBack} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"rgba(255,255,255,.7)",padding:"12px 24px",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-in" style={{ fontFamily:"sans-serif", background:"#050A14", minHeight:"100vh" }}>
      <div style={{ padding:"12px 18px", background:"rgba(5,10,20,.96)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:200 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)", color:"#fff", padding:"7px 16px", borderRadius:7, fontSize:12, cursor:"pointer", fontWeight:600 }}>← Back</button>
        <div style={{ flex:1, fontSize:11, color:"rgba(255,255,255,.35)", fontFamily:"monospace" }}>SAMPACE › {school.name}</div>
        <button onClick={()=>setShowForm(true)} style={{ background:`linear-gradient(135deg,${school.g2},${school.color})`, border:"none", color:"#fff", padding:"7px 16px", borderRadius:7, fontSize:12, cursor:"pointer", fontWeight:700 }}>{school.applyType==="inquiry"?"✉️ Inquire":"Apply Now"}</button>
      </div>
      <div style={{ background:`linear-gradient(160deg,${school.g1} 0%,${school.g2} 55%,${school.color} 100%)`, padding:"52px 18px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <Particles n={10} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize:"36px 36px" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ width:72, height:72, borderRadius:20, background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)", border:`1px solid ${school.accent}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, margin:"0 auto 13px", animation:"floatY 4s ease-in-out infinite", boxShadow:`0 0 40px ${school.color}50` }}>{school.emoji}</div>
          <div style={{ fontFamily:"monospace", fontSize:9, color:"rgba(255,255,255,.4)", letterSpacing:4, marginBottom:5, textTransform:"uppercase" }}>SCHOOL {school.num}</div>
          <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(22px,5vw,46px)", fontWeight:900, color:"#fff", margin:"0 0 7px", lineHeight:1.05 }}>{school.name}</h1>
          <div style={{ fontSize:12, color:school.accent, marginBottom:13, letterSpacing:1, fontWeight:600 }}>{school.short}</div>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.65)", lineHeight:1.8, maxWidth:480, margin:"0 auto 22px" }}>{school.desc}</p>
          <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap", marginBottom:22 }}>{school.tags.map(t=><span key={t} style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", color:"#fff", padding:"3px 11px", borderRadius:99, fontSize:10, fontWeight:500 }}>{t}</span>)}</div>
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
            <div style={{ fontFamily:"monospace", fontSize:9, color:school.accent, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:13, textAlign:"center" }}>Tap a School to Explore</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {school.subSchools.map(sub=>(
                <div key={sub.id} className="hover-lift" onClick={()=>setOpenSub(openSub===sub.id?null:sub.id)} style={{ background:`${sub.color}18`, border:`2px solid ${openSub===sub.id?sub.color:"rgba(255,255,255,.07)"}`, borderRadius:12, padding:"16px 13px", transition:"all .3s" }}>
                  <div style={{ fontSize:22, marginBottom:7 }}>{sub.emoji}</div>
                  <div style={{ fontWeight:700, fontSize:12, color:"#fff", marginBottom:4, lineHeight:1.2 }}>{sub.name}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>
                    {sub.courses.slice(0,2).map(c=><span key={c} style={{ background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.4)", padding:"1px 6px", borderRadius:99, fontSize:9 }}>{c}</span>)}
                    <span style={{ background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.3)", padding:"1px 6px", borderRadius:99, fontSize:9 }}>+{sub.courses.length-2}</span>
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
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(18px,3.5vw,28px)", color:"#fff", textAlign:"center", marginBottom:18, fontWeight:700 }}>What We <span className="shimmer">Offer</span></h2>
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
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:18, color:"#fff", fontWeight:700, marginBottom:4 }}>Already Enrolled? Login Here</h3>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:14 }}>Access your classes, timetable, CBT exams, virtual labs and report cards.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
              <div><div style={{ fontSize:10, color:school.accent, fontWeight:700, letterSpacing:1.5, marginBottom:5, textTransform:"uppercase" }}>Student ID</div><input style={{ ...inp, marginBottom:0, fontFamily:"monospace" }} placeholder="e.g. SC/2026/0001"/></div>
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
                <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:"#fff" }}>{school.applyType==="inquiry"?"Make an Inquiry":`Apply — ${school.name}`}</div>
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
        {id:"professional",num:"05",name:"Professional Learning Centre",short:"Executive · Corporate · CPD",desc:"Executive education, teacher development, school leadership, corporate training and continuing professional development.",icon:"🏢",color:"#E65100",g2:"#FF6D00",status:"open",tags:["CPD","Corporate Training","Leadership","Teacher Dev"]},
        {id:"cbt",num:"06",name:"CBT Platform",short:"Past Questions · Mock Exams · Practice",desc:"WAEC, NECO and JAMB past questions 2010–2024. Token-based CBT practice, mock exams, Android and Windows app.",icon:"🖥️",color:"#006064",g2:"#00BCD4",status:"open",tags:["WAEC CBT","NECO CBT","JAMB Simulator","Mobile App"]},
      ]
    },
    {
      id:"corporate", label:"Corporate & Knowledge Services", icon:"🏢",
      desc:"Publishing, consulting, research and technology solutions powering education institutions.",
      color:"#33691E",
      divisions:[
        {id:"publish",num:"07",name:"SAMPACE Publishing",short:"Books · Resources · Digital Content",desc:"Educational textbooks, workbooks, e-books, teacher guides, curriculum resources and digital learning content.",icon:"📖",color:"#33691E",g2:"#8BC34A",status:"open",tags:["Textbooks","E-books","Curriculum","Digital Content"]},
        {id:"consult",num:"08",name:"SAMPACE Consulting",short:"School Improvement · Advisory",desc:"School establishment support, curriculum development, accreditation guidance and educational policy advisory.",icon:"🤝",color:"#4A148C",g2:"#9C27B0",status:"open",tags:["School Setup","Accreditation","Curriculum Dev","Digital Transform"]},
        {id:"research",num:"09",name:"Research & Innovation",short:"Think Tank · Knowledge Hub · Journals",desc:"Educational research, innovation hub, learning analytics, AI in education, academic journals and research partnerships.",icon:"🔬",color:"#1A237E",g2:"#3F51B5",status:"open",tags:["Research","Innovation","AI in Education","Journals"]},
        {id:"edtech",num:"10",name:"SAMPACE EdTech",short:"LMS · School Management · AI Tools",desc:"School management systems, AI learning assistant, teacher tools, student analytics and digital infrastructure products.",icon:"⚡",color:"#006064",g2:"#00BCD4",status:"open",tags:["LMS","AI Tools","School Management","Analytics"]},
      ]
    },
    {
      id:"community", label:"Community & Opportunity", icon:"🌟",
      desc:"Scholarships, careers, alumni and community programmes creating opportunities beyond the classroom.",
      color:"#F57F17",
      divisions:[
        {id:"scholarships",num:"11",name:"Scholarship Bank",short:"Grants · Fellowships · Bursaries",desc:"Scholarship database, student sponsorship, fellowship opportunities, education grants and financial aid guidance.",icon:"🌟",color:"#F57F17",g2:"#FFC107",status:"open",tags:["Scholarships","Grants","Fellowships","Financial Aid"]},
        {id:"careers",num:"12",name:"SAMPACE Careers",short:"Jobs · Recruitment · Internships · Alumni",desc:"Graduate recruitment, teacher recruitment, school jobs, internship programmes, volunteer opportunities and alumni network.",icon:"💼",color:"#37474F",g2:"#78909C",status:"open",tags:["Graduate Jobs","Teacher Jobs","Internships","Alumni Network"]},
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
    <div style={{fontFamily:"sans-serif",background:"#060F1E",color:W,overflowX:"hidden"}}>
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
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.18)",borderRadius:99,padding:"6px 18px",marginBottom:28,fontSize:10,fontWeight:700,color:G,letterSpacing:2}}>
            🇳🇬 &nbsp; SAMPACE EDUCATIONAL LTD · CAC REGISTERED · NIGERIA
          </div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(40px,6.5vw,82px)",fontWeight:700,lineHeight:1.08,marginBottom:18,letterSpacing:"-1px"}}>
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
                <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,36px)",fontWeight:700,color:G}}>{v}</div>
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
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:700,lineHeight:1.2,marginBottom:20}}>
              More Than a School.<br/><em style={{color:G}}>An Education Empire.</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.9,fontSize:14,marginBottom:14}}>SAMPACE EDUCATIONAL LTD is a Nigerian education conglomerate incorporated under the Companies and Allied Matters Act 2020. Founded by Ayeni Samuel Anuoluwapo, we operate across 12 divisions delivering education online and onsite.</p>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.9,fontSize:14,marginBottom:24}}>We are not just a tutoring platform. We are building the infrastructure for Nigeria's education future — one division, one student, one community at a time.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {["CAC Registered","Online & Onsite","12 Divisions","CAMA 2020","Nigeria-First","Technology-Driven"].map(t=>(
                <span key={t} style={{background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.16)",color:G,padding:"5px 13px",borderRadius:99,fontSize:10,fontWeight:700}}>✓ {t}</span>
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
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700,marginBottom:10}}>Every Way You Learn. We Are There.</h2>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:500,margin:"0 auto"}}>Whether you prefer to learn from your bedroom or from a classroom, SAMPACE covers you.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:32,alignItems:"center",textAlign:"center"}}>
            <div style={{background:"rgba(21,101,192,.08)",border:"1px solid rgba(21,101,192,.2)",borderRadius:16,padding:"28px"}}>
              <div style={{fontSize:36,marginBottom:12}}>🌐</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,marginBottom:12}}>Online Campus</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {["Live video classes","Recorded lessons 24/7","Virtual science labs","CBT exam practice","Digital certificates","AI learning assistant","Mobile + desktop access"].map(f=>(
                  <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><span style={{color:"#10B981",fontSize:9}}>✓</span>{f}</div>
                ))}
              </div>
            </div>
            <div style={{fontSize:32,color:G,fontWeight:900,padding:"20px 0"}}>+</div>
            <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.15)",borderRadius:16,padding:"28px"}}>
              <div style={{fontSize:36,marginBottom:12}}>🏫</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,marginBottom:12}}>Physical Centres</div>
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
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700,marginBottom:10}}>Where Are You On Your Journey?</h2>
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
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,3.5vw,42px)",fontWeight:700,marginBottom:10}}>12 Divisions. One Vision.</h2>
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
                        <span style={{fontSize:8,color:"rgba(255,255,255,.2)",fontFamily:"monospace",letterSpacing:1}}>DIV {d.num}</span>
                        <span style={{background:st.bg,color:st.c,padding:"2px 9px",borderRadius:99,fontSize:9,fontWeight:700}}>{st.dot} {st.t}</span>
                      </div>
                    </div>
                    <div style={{fontWeight:800,fontSize:13,color:W,marginBottom:3}}>{d.name}</div>
                    <div style={{fontSize:11,color:d.color,fontWeight:600,marginBottom:10}}>{d.short}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.65,marginBottom:12,flex:1}}>{d.desc}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:14}}>
                      {d.tags.map(t=><span key={t} className="tag">{t}</span>)}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      {(()=>{
                        // Define correct label, action and school data per division
                        const SCHOOL_DATA = {
                          college:{label:"Enroll Now →",applyType:"parent-student",short:"JSS1–SS3 Online Secondary School",desc:"Full JSS1–SS3 online school. Live classes, virtual labs, CBT exams and digital report cards.",tags:["JSS1","JSS2","JSS3","SS1","SS2","SS3"],emoji:"🏫"},
                          extramural:{label:"Enroll Now →",applyType:"student-only",short:"After-School · Exam Prep · Adult Learning",desc:"After-school coaching, WAEC/NECO/JAMB/BECE prep, adult literacy and holiday lessons.",tags:["WAEC","NECO","JAMB","After-School"],emoji:"📚"},
                          preuni:{label:"Apply Now →",applyType:"student-only",short:"IJMB · JUPEB · Pre-Degree · Diploma",desc:"Direct 200-level entry programmes. IJMB, JUPEB, Pre-Degree and Diploma.",tags:["IJMB","JUPEB","Pre-Degree","Diploma"],emoji:"🏛️"},
                          digital:{label:"Enroll Now →",applyType:"student-only",short:"Technology · Business · Languages · More",desc:"Six specialist professional schools — Technology, Business, Languages, Communication and more.",tags:["Coding","IELTS","French","PMP","ACCA"],emoji:"💻"},
                          professional:{label:"Apply Now →",applyType:"student-only",short:"Executive · Corporate · CPD Training",desc:"Executive education, teacher development, leadership and corporate training programmes.",tags:["CPD","Leadership","Corporate"],emoji:"🏢"},
                          cbt:{label:"Get Access →",applyType:"student-only",short:"Past Questions · Mock Exams · Practice",desc:"WAEC, NECO and JAMB past questions 2010–2024. Token-based CBT practice.",tags:["WAEC CBT","NECO","JAMB"],emoji:"🖥️"},
                          publish:{label:"Explore →",applyType:"inquiry",short:"Books · Resources · Digital Content",desc:"Educational textbooks, workbooks, e-books, teacher guides and curriculum resources.",tags:["Textbooks","E-books","Curriculum"],emoji:"📖"},
                          consult:{label:"Get a Quote →",applyType:"inquiry",short:"School Improvement · Advisory Services",desc:"School establishment support, curriculum development and educational policy advisory.",tags:["School Setup","Accreditation","Curriculum"],emoji:"🤝"},
                          research:{label:"Learn More →",applyType:"inquiry",short:"Think Tank · Knowledge Hub · Journals",desc:"Educational research, innovation hub, AI in education and academic journals.",tags:["Research","Innovation","AI"],emoji:"🔬"},
                          edtech:{label:"Learn More →",applyType:"inquiry",short:"LMS · School Management · AI Tools",desc:"School management systems, AI learning assistant and digital infrastructure products.",tags:["LMS","AI Tools","Analytics"],emoji:"⚡"},
                          scholarships:{label:"Find Scholarships →",applyType:"inquiry",short:"Grants · Fellowships · Bursaries",desc:"Scholarship database, student sponsorship, fellowship opportunities and financial aid guidance.",tags:["Scholarships","Grants","Fellowships"],emoji:"🌟"},
                          careers:{label:"Make Enquiry →",applyType:"inquiry",short:"Jobs · Recruitment · Internships · Alumni",desc:"Graduate recruitment, teacher recruitment, internship programmes and alumni network.",tags:["Graduate Jobs","Teacher Jobs","Internships"],emoji:"💼"},
                        };
                        const sd = SCHOOL_DATA[d.id] || {};
                        const schoolObj = {
                          id:d.id, name:d.name, color:d.color, g1:d.color, g2:d.g2,
                          accent:d.g2, num:d.num, icon:d.icon,
                          emoji:sd.emoji||d.icon,
                          short:sd.short||d.short,
                          desc:sd.desc||"",
                          tags:sd.tags||d.tags||[],
                          applyType:sd.applyType||"student-only",
                          programs:[], depts:[], classes:[],
                          services:["General Enquiry","Course Information","Admissions","Partnership"],
                          tracks:["WAEC","NECO","JAMB","BECE","GCE"],
                          subSchools:[],
                        };
                        return (
                          <>
                            <button onClick={()=>onSelect(schoolObj)}
                              style={{flex:1,background:`linear-gradient(135deg,${d.color},${d.g2})`,border:"none",color:W,padding:"9px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                              {sd.label||"Enroll Now →"}
                            </button>
                            <button onClick={()=>onLogin("student")}
                              style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.35)",padding:"9px 12px",borderRadius:8,fontSize:11,cursor:"pointer"}}>
                              Login
                            </button>
                          </>
                        );
                      })()}
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
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700}}>Built for Nigerian Students.<br/>Designed for the World.</h2>
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
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>What Our Students Say</h2>
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
            <blockquote style={{fontFamily:"Georgia,serif",fontSize:"clamp(15px,2vw,21px)",fontStyle:"italic",color:W,lineHeight:1.65,marginBottom:14}}>"SAMPACE was built on a simple belief — that every Nigerian child, regardless of location or income, deserves access to world-class education. We are not just building a school. We are building an institution that will outlast us all."</blockquote>
            <div style={{fontSize:13,fontWeight:700,color:G}}>Ayeni Samuel Anuoluwapo</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2}}>Founder & Director, SAMPACE EDUCATIONAL LTD</div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partners-sec" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:20,padding:"clamp(28px,4vw,48px)",textAlign:"center"}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Partnerships & Affiliations</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:700,marginBottom:10}}>Building With the Best</h2>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:13,maxWidth:460,margin:"0 auto 28px",lineHeight:1.7}}>SAMPACE is building partnerships with leading professional bodies, exam boards and international education organisations.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:9,justifyContent:"center",marginBottom:16}}>
            {["WAEC","NECO","JAMB","ICAN","ACCA","PMI","Cambridge International","CIPM","NIMN","NIM","Google for Education","Microsoft Learn"].map(p=>(
              <span key={p} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.45)",padding:"7px 15px",borderRadius:99,fontSize:11,fontWeight:600}}>{p}</span>
            ))}
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.2)"}}>Partnerships being formalised. Contact us to partner with SAMPACE.</div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Admissions</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700,marginBottom:10}}>Start in 4 Simple Steps</h2>
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
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>SAMPACE Updates</h2>
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
                  <span style={{background:`${n.color}18`,color:n.color,padding:"2px 10px",borderRadius:99,fontSize:10,fontWeight:700}}>{n.tag}</span>
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
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,marginBottom:14}}>Let's Talk Education</h2>
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
                <input type={type} placeholder={ph} style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",fontFamily:"sans-serif"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message</label>
              <textarea rows={3} placeholder="Tell us what you need..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",resize:"vertical",fontFamily:"sans-serif"}}/>
            </div>
            <button className="btn-primary" onClick={async()=>{
              const sb=window.__supabase;
              const name=document.getElementById("enq-name")?.value;
              const email=document.getElementById("enq-email")?.value;
              const phone=document.getElementById("enq-phone")?.value;
              const prog=document.getElementById("enq-prog")?.value;
              const msg=document.getElementById("enq-msg")?.value;
              if(!name||!email){alert("Please enter your name and email.");return;}
              if(sb){
                const ref="ENQ-"+Date.now();
                await sb.from("applications").insert({
                  reference:ref, school_id:"enquiry",
                  applicant_name:name, email, phone:phone||"",
                  program:prog||"General Enquiry",
                  admin_notes:msg||"", status:"pending",
                  app_type:"enquiry"
                });
              }
              alert("✅ Enquiry sent! We will contact you within 24 hours.");
            }} style={{width:"100%",background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:N,border:"none",padding:"11px",borderRadius:9,fontSize:13,fontWeight:800,cursor:"pointer"}}>Send Enquiry →</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"40px clamp(20px,6vw,80px) 28px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:32}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
              <div style={{width:30,height:30,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:N}}>SE</div>
              <div style={{fontSize:10,fontWeight:900,color:G,letterSpacing:1.5}}>SAMPACE EDUCATIONAL LTD</div>
            </div>
            <p style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.8,maxWidth:240,marginBottom:10}}>Nigeria's education ecosystem. Online and onsite. From tutorial to university. Building Nigeria's education future.</p>
            <div style={{fontSize:9,color:"rgba(255,255,255,.18)"}}>CAC Registered · CAMA 2020 · Nigeria · Est. 2026</div>
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Divisions</div>
            {["College","Extramural Hub","Digital Campus","Pre-University","CBT Platform","Professional Centre","Scholarship Bank","Careers"].map(d=><div key={d} className="hov-gold" style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7,cursor:"pointer"}}>{d}</div>)}
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Programmes</div>
            {["Secondary School","WAEC/NECO Prep","JAMB Coaching","Digital Skills","IJMB/JUPEB","Adult Learning","Corporate Training","IELTS/SAT Prep"].map(p=><div key={p} style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7}}>{p}</div>)}
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Company</div>
            {["About SAMPACE","Our Founder","Admissions","Partnerships","Careers at SAMPACE","News & Updates","Contact Us","Privacy Policy"].map(c=><div key={c} className="hov-gold" style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7,cursor:"pointer"}}>{c}</div>)}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,.18)"}}>© 2026 SAMPACE EDUCATIONAL LTD. All rights reserved. Incorporated in Nigeria.</div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            {["Privacy Policy","Terms of Use","Data Protection","Refund Policy"].map(l=><span key={l} style={{fontSize:9,color:"rgba(255,255,255,.18)",cursor:"pointer"}}>{l}</span>)}
          </div>
        </div>
      </footer>

    </div>
  );
}


function TimetableManagerInline({ C, sb }) {
  const [school, setSchool] = useState("");
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState("");

  const schoolClasses = {
    "School College": ["JSS1","JSS2","JSS3","SS1 Sciences","SS1 Humanities","SS1 Business","SS2 Sciences","SS2 Humanities","SS2 Business","SS3 Sciences","SS3 Humanities","SS3 Business"],
    "Tutorial & Exam": ["BECE Track","WAEC Track","NECO Track","GCE Track","JAMB/UTME Track"],
    "Digital Campus": ["Full-Stack Web Dev","Cybersecurity","Data Science","UI/UX","ACCA","ICAN","PMP","IELTS","SAT","French","Spanish","Arabic","Public Speaking"],
    "Pre-University": ["IJMB Year 1","IJMB Year 2","JUPEB Year 1","JUPEB Year 2","Pre-Degree","Diploma"],
    "Professional Services": ["CV Writing","Admissions Support","Study Abroad","Corporate Training"],
  };

  const [form, setForm] = useState({ school:"", cls:"", subject:"", teacher:"", day:"", time:"", link:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const save = async () => {
    if(!form.school||!form.cls||!form.subject||!form.day){
      setMsg("⚠️ Please fill School, Class, Subject and Day");
      setTimeout(()=>setMsg(""),3000); return;
    }
    if(sb){
      const {error} = await sb.from("classes").insert({
        school_id: form.school, title: form.subject,
        day_of_week: form.day, start_time: form.time||null,
        room_link: form.link||null, status:"scheduled",
        created_at: new Date().toISOString()
      });
      if(error){ setMsg("❌ "+error.message); setTimeout(()=>setMsg(""),4000); return; }
    }
    setMsg("✅ Class saved to timetable!");
    setForm({ school:"", cls:"", subject:"", teacher:"", day:"", time:"", link:"" });
    setTimeout(()=>setMsg(""),3000);
  };

  return (
    <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"20px", marginBottom:14 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>School *</label>
          <select value={form.school} onChange={e=>{set("school",e.target.value);set("cls","");}} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}>
            <option value="">Select school...</option>
            {Object.keys(schoolClasses).map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Class / Level *</label>
          <select value={form.cls} onChange={e=>set("cls",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}>
            <option value="">Select class...</option>
            {(schoolClasses[form.school]||[]).map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Subject *</label>
          <input value={form.subject} onChange={e=>set("subject",e.target.value)} placeholder="e.g. English Language" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>
        </div>
        <div>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Teacher</label>
          <input value={form.teacher} onChange={e=>set("teacher",e.target.value)} placeholder="e.g. Mrs. Adeyemi" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>
        </div>
        <div>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Day *</label>
          <select value={form.day} onChange={e=>set("day",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}>
            <option value="">Select day...</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Start Time</label>
          <input type="time" value={form.time} onChange={e=>set("time",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>
        </div>
        <div style={{ gridColumn:"1/-1" }}>
          <label style={{ fontSize:11, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Virtual Classroom Link (Google Meet / BigBlueButton)</label>
          <input value={form.link} onChange={e=>set("link",e.target.value)} placeholder="https://meet.google.com/xxx-xxxx-xxx" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }}/>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={save} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Save Class to Timetable</button>
        {msg && <span style={{ fontSize:12, fontWeight:600, color:msg.startsWith("✅")?C.green:msg.startsWith("❌")?"#EF4444":"#F59E0B" }}>{msg}</span>}
      </div>
      <div style={{ marginTop:14, background:"rgba(21,101,192,.06)", border:"1px solid rgba(21,101,192,.15)", borderRadius:8, padding:"12px 16px", fontSize:11, color:C.navy }}>
        💡 Google Meet is free and available now. BigBlueButton on Oracle Cloud coming after card issue resolved — better for recording and attendance.
      </div>
    </div>
  );
}
function InquiriesInline({ C, sb }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    if(!sb){ setLoading(false); return; }
    sb.from("applications")
      .select("*").eq("school_id","services")
      .order("created_at",{ascending:false}).limit(50)
      .then(({data})=>{ setInquiries(data||[]); setLoading(false); });
  },[]);

  const updateStatus = async (id, status) => {
    if(!sb) return;
    await sb.from("applications").update({status}).eq("id",id);
    setInquiries(prev=>prev.map(i=>i.id===id?{...i,status}:i));
    setMsg("✅ Updated"); setTimeout(()=>setMsg(""),2000);
  };

  if(loading) return <div style={{padding:40,textAlign:"center",color:C.slate}}>Loading inquiries...</div>;

  return (
    <div>
      {msg && <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,marginBottom:14,fontSize:13}}>{msg}</div>}
      <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        {inquiries.length===0
          ? <div style={{padding:"40px 16px",textAlign:"center",color:C.slate}}>No inquiries yet. When someone submits a Professional Services inquiry, it appears here.</div>
          : inquiries.map((inq,i)=>(
          <div key={i} style={{ padding:"14px 18px", borderBottom:`1px solid #F8FAFF` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:13, color:C.navy }}>{inq.applicant_name}</div>
                <div style={{ fontSize:11, color:C.slate }}>{inq.email} · {inq.phone}</div>
                <div style={{ fontSize:11, color:C.blue, marginTop:3 }}>Service: {inq.program||"General Inquiry"}</div>
              </div>
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <span style={{ background:inq.status==="pending"?"rgba(245,158,11,.1)":inq.status==="approved"?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)", color:inq.status==="pending"?"#F59E0B":inq.status==="approved"?"#10B981":"#EF4444", padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:700 }}>{inq.status}</span>
                {inq.status==="pending" && <>
                  <button onClick={()=>updateStatus(inq.id,"approved")} style={{background:"rgba(16,185,129,.1)",border:"none",color:"#10B981",padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>✓ Respond</button>
                  <button onClick={()=>updateStatus(inq.id,"rejected")} style={{background:"rgba(239,68,68,.1)",border:"none",color:"#EF4444",padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>✕</button>
                </>}
                <a href={`https://wa.me/${(inq.phone||"").replace(/[^0-9]/g,"")}`} target="_blank" rel="noreferrer" style={{background:"rgba(37,211,102,.1)",border:"none",color:"#25D366",padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700,textDecoration:"none"}}>💬 WhatsApp</a>
              </div>
            </div>
            <div style={{ fontSize:11, color:C.slate }}>{new Date(inq.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── ADMIN DASHBOARD — Full Role-Based System ───
// ─── SAMPACE ENTERPRISE ADMIN DASHBOARD ───────────────────────
function AdminDashboard({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [sideOpen, setSideOpen] = useState(true);
  const [adminRole, setAdminRole] = useState("super_admin");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([]);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState({students:0,staff:0,revenue:0,apps:0,pending:0});
  const [divStatus, setDivStatus] = useState({
    college:"open",extramural:"open",preuni:"open",digital:"open",
    professional:"open",cbt:"open",publish:"open",consult:"open",
    research:"open",edtech:"open",scholarships:"open",careers:"open",
  });
  const [fees, setFees] = useState({
    college_jss:"45000",college_ss:"55000",college_ss3:"65000",
    tutorial_single:"8000",tutorial_bundle:"20000",tutorial_full:"35000",
    digital_tech:"150000",digital_biz:"120000",digital_lang:"30000",
    preuni_ijmb:"180000",preuni_jupeb:"200000",preuni_pre:"120000",
    professional_short:"50000",professional_exec:"200000",
    cbt_monthly:"3000",cbt_annual:"25000",
  });
  const [cfg, setCfg] = useState({
    inst_name:"SAMPACE EDUCATIONAL LTD",inst_tagline:"Where Excellence Begins",
    inst_email:"info@sampaceedu.com.ng",inst_phone:"+234-800-SAMPACE",
    inst_address:"Nigeria",inst_domain:"sampaceedu.com.ng",
    inst_timezone:"Africa/Lagos",inst_currency:"NGN",
    brand_primary:"#0B1F3A",brand_secondary:"#C9A84C",brand_accent:"#1565C0",
    academic_session:"2026/2027",academic_term:"First Term",
    academic_start:"September 1, 2026",academic_end:"December 15, 2026",
    grade_ca1:"10",grade_ca2:"10",grade_proj:"10",grade_exam:"70",grade_pass:"45",
    admissions_status:"open",admissions_fee:"0",admissions_workflow:"manual",
    payment_gateway:"Paystack",email_from:"noreply@sampaceedu.com.ng",
    sms_enabled:"false",whatsapp_enabled:"true",
    security_2fa:"false",security_timeout:"24h",security_attempts:"5",
    maintenance:"false",platform_version:"1.0.0",
  });

  const C = {navy:"#0B1F3A",blue:"#1565C0",sky:"#42A5F5",gold:"#C9A84C",
    cream:"#F8FAFF",slate:"#64748B",border:"#E2E8F0",
    green:"#10B981",red:"#EF4444",amber:"#F59E0B",purple:"#7C3AED"};
  const fmt = n => "₦" + Number(n||0).toLocaleString();
  const sb = () => window.__supabase;
  const showMsg = (m, d=3000) => { setMsg(m); setTimeout(()=>setMsg(""), d); };

  const ROLES = {
    super_admin:{label:"Super Admin",color:"#C9A84C"},
    assistant_admin:{label:"Assistant Admin",color:"#1565C0"},
    academic_admin:{label:"Academic Division Admin",color:"#1565C0"},
    professional_admin:{label:"Professional Division Admin",color:"#7B1FA2"},
    college_admin:{label:"College Admin",color:"#1565C0"},
    extramural_admin:{label:"Extramural Admin",color:"#00897B"},
    preuni_admin:{label:"Pre-University Admin",color:"#BF360C"},
    digital_admin:{label:"Digital Campus Admin",color:"#7B1FA2"},
    cbt_admin:{label:"CBT Admin",color:"#006064"},
    publish_admin:{label:"Publishing Admin",color:"#33691E"},
  };

  const STAFF_ROLES = {
    college:["Principal","Vice Principal","Academic Coordinator","HOD","Class Teacher","Subject Teacher","Counsellor","Lab Officer","Librarian"],
    extramural:["Programme Coordinator","Centre Coordinator","Subject Tutor","Academic Mentor","Instructor"],
    digital:["Campus Director","Programme Manager","Course Instructor","Teaching Assistant","Community Manager"],
    preuni:["Director","Programme Coordinator","Lecturer","Admission Officer"],
    professional:["Director","Lead Facilitator","Lecturer","Instructor","Mentor"],
    cbt:["CBT Administrator","Question Manager","Examiner","Technical Support"],
    publish:["Editor","Reviewer","Graphic Designer","Content Developer"],
    consult:["Consultant","Trainer","Project Officer"],
    research:["Research Fellow","Research Assistant","Data Analyst"],
    edtech:["Software Engineer","UI/UX Designer","Product Manager","QA Engineer"],
    scholarships:["Scholarship Officer","Financial Aid Advisor"],
    careers:["Recruitment Officer","Career Advisor","Alumni Coordinator"],
  };

  const DIVISIONS = [
    {id:"college",name:"SAMPACE College",icon:"🏫",color:"#1565C0"},
    {id:"extramural",name:"Extramural & Exam Hub",icon:"📚",color:"#00897B"},
    {id:"preuni",name:"Pre-University Centre",icon:"🏛️",color:"#BF360C"},
    {id:"digital",name:"Digital Campus",icon:"💻",color:"#7B1FA2"},
    {id:"professional",name:"Professional Learning",icon:"🏢",color:"#E65100"},
    {id:"cbt",name:"CBT Platform",icon:"🖥️",color:"#006064"},
    {id:"publish",name:"SAMPACE Publishing",icon:"📖",color:"#33691E"},
    {id:"consult",name:"SAMPACE Consulting",icon:"🤝",color:"#4A148C"},
    {id:"research",name:"Research & Innovation",icon:"🔬",color:"#1A237E"},
    {id:"edtech",name:"SAMPACE EdTech",icon:"⚡",color:"#006064"},
    {id:"scholarships",name:"Scholarship Bank",icon:"🌟",color:"#F57F17"},
    {id:"careers",name:"SAMPACE Careers",icon:"💼",color:"#37474F"},
  ];

  const DIV_GROUPS = [
    {label:"Academic Education",ids:["college","extramural","preuni"]},
    {label:"Professional & Digital Learning",ids:["digital","professional","cbt"]},
    {label:"Corporate & Knowledge Services",ids:["publish","consult","research","edtech"]},
    {label:"Community & Opportunity",ids:["scholarships","careers"]},
  ];

  // ── DATA LOADING ──────────────────────────────────────────────
  const loadData = async () => {
    const s = sb();
    if (!s) return;
    try {
      const [studRes, appRes, payRes, staffRes] = await Promise.all([
        s.from("users").select("id",{count:"exact",head:true}).eq("role","student"),
        s.from("applications").select("*").order("created_at",{ascending:false}).limit(100),
        s.from("payments").select("*").order("created_at",{ascending:false}).limit(100),
        s.from("users").select("*").in("role",["teacher","school_admin"]).order("created_at",{ascending:false}),
      ]);
      const rev = (payRes.data||[]).filter(p=>p.status==="success").reduce((t,p)=>t+Number(p.amount),0);
      const pending = (appRes.data||[]).filter(a=>a.status==="pending").length;
      setStats({students:studRes.count||0,staff:(staffRes.data||[]).length,revenue:rev,apps:(appRes.data||[]).length,pending});
      setApps(appRes.data||[]);
      setPayments(payRes.data||[]);
      setStaff(staffRes.data||[]);
    } catch(e) { console.error("Admin load error:", e); }
  };

  const loadStudents = async () => {
    const s = sb();
    if (!s) return;
    setLoading(true);
    const {data} = await s.from("users").select("*,student_profiles(*)").eq("role","student").order("created_at",{ascending:false}).limit(200);
    setStudents(data||[]);
    setLoading(false);
  };

  const approveApp = async (id, status) => {
    const s = sb();
    if (!s) return;
    await s.from("applications").update({status,reviewed_at:new Date().toISOString()}).eq("id",id);
    showMsg("✅ Application " + status);
    loadData();
  };

  const enableAccess = async (id) => {
    const s = sb();
    if (!s) return;
    await s.from("payments").update({access_enabled:true,admin_verified:true,admin_enabled_at:new Date().toISOString()}).eq("id",id);
    showMsg("✅ Student access enabled");
    loadData();
  };

  useEffect(() => {
    loadData();
    const s = sb();
    if (s) {
      s.auth.getUser().then(({data}) => {
        if (data?.user) {
          s.from("users").select("role").eq("auth_id",data.user.id).single()
            .then(({data:p}) => { if (p?.role) setAdminRole(p.role); });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (page === "learners") loadStudents();
    else if (page === "overview" || page === "finance" || page === "admissions-page") loadData();
  }, [page]);

  // ── NAV STRUCTURE ─────────────────────────────────────────────
  const NAV = [
    { section:"Core", items:[
      {id:"overview",icon:"⊞",label:"Dashboard"},
      {id:"admissions-page",icon:"📋",label:"Admissions",badge:stats.pending||null},
      {id:"learners",icon:"👥",label:"Learners"},
      {id:"staff-page",icon:"👔",label:"Staff"},
    ]},
    { section:"Academic & Learning", items:[
      {id:"academics",icon:"📚",label:"Academics"},
      {id:"lms",icon:"🎬",label:"Learning Mgmt"},
      {id:"timetable",icon:"📅",label:"Timetable"},
      {id:"results-page",icon:"📊",label:"Results"},
    ]},
    { section:"Finance & Operations", items:[
      {id:"finance",icon:"💰",label:"Finance"},
      {id:"fee-settings",icon:"💳",label:"Fee Settings"},
      {id:"operations",icon:"⚙️",label:"Operations"},
      {id:"announcements",icon:"📣",label:"Announcements"},
    ]},
    { section:"Corporate HQ", items:[
      {id:"corporate",icon:"🏢",label:"Corporate HQ"},
      {id:"divisions-mgmt",icon:"🏫",label:"Divisions"},
      {id:"admin-roles",icon:"🔑",label:"Admin & Roles"},
      {id:"inquiries",icon:"💬",label:"Inquiries"},
    ]},
    { section:"Platform", items:[
      {id:"website-mgmt",icon:"🌐",label:"Website"},
      {id:"reports",icon:"📈",label:"Reports"},
      {id:"settings",icon:"🔧",label:"Settings"},
    ]},
  ];

  const StatusBadge = ({s}) => {
    const m = {
      pending:{bg:"rgba(245,158,11,.1)",c:"#F59E0B"},
      approved:{bg:"rgba(16,185,129,.1)",c:"#10B981"},
      rejected:{bg:"rgba(239,68,68,.1)",c:"#EF4444"},
      success:{bg:"rgba(16,185,129,.1)",c:"#10B981"},
      failed:{bg:"rgba(239,68,68,.1)",c:"#EF4444"},
      open:{bg:"rgba(16,185,129,.1)",c:"#10B981"},
      closed:{bg:"rgba(239,68,68,.1)",c:"#EF4444"},
    };
    const b = m[s] || {bg:"rgba(100,116,139,.1)",c:"#64748B"};
    return <span style={{background:b.bg,color:b.c,padding:"3px 9px",borderRadius:100,fontSize:10,fontWeight:700,textTransform:"capitalize"}}>{s}</span>;
  };

  const MsgBar = () => msg ? (
    <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,marginBottom:14,fontSize:13,fontWeight:600}}>{msg}</div>
  ) : null;

  const PageTitle = ({title,sub}) => (
    <div style={{marginBottom:20}}>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.navy}}>{title}</h2>
      {sub && <div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}
    </div>
  );

  const CardGrid = ({items, cols=3}) => (
    <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:12}}>
      {items.map(([icon,label,desc,pg])=>(
        <div key={pg} onClick={()=>pg.startsWith("msg:")?showMsg(pg.slice(4)):setPage(pg)}
          style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"18px",cursor:"pointer",transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="translateY(0)";}}>
          <div style={{fontSize:26,marginBottom:8}}>{icon}</div>
          <div style={{fontSize:12,fontWeight:700,color:C.navy,marginBottom:4}}>{label}</div>
          <div style={{fontSize:10,color:C.slate,lineHeight:1.6}}>{desc}</div>
        </div>
      ))}
    </div>
  );

  // ── PAGE RENDERS ──────────────────────────────────────────────
  const renderPage = () => {

    // OVERVIEW
    if (page === "overview") return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,color:C.navy}}>SAMPACE Enterprise Dashboard</h2>
            <div style={{fontSize:12,color:C.slate,marginTop:2}}>{ROLES[adminRole]?.label||"Super Admin"} · Education Ecosystem Command Centre</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <div style={{background:sb()?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)",color:sb()?"#10B981":"#EF4444",padding:"5px 12px",borderRadius:100,fontSize:10,fontWeight:700,border:"1px solid",borderColor:sb()?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)"}}>
              {sb()?"● Live Database":"● Demo Mode"}
            </div>
            <button onClick={loadData} style={{background:"#fff",border:`1px solid ${C.border}`,color:C.slate,padding:"5px 12px",borderRadius:8,fontSize:11,cursor:"pointer",fontWeight:600}}>🔄 Refresh</button>
          </div>
        </div>
        <MsgBar/>

        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:20}}>
          {[
            {icon:"👥",label:"Learners",val:stats.students,color:C.blue,pg:"learners"},
            {icon:"👔",label:"Staff",val:stats.staff,color:C.purple,pg:"staff-page"},
            {icon:"🏫",label:"Divisions",val:12,color:"#00897B",pg:"divisions-mgmt"},
            {icon:"💰",label:"Revenue",val:fmt(stats.revenue),color:C.green,pg:"finance"},
            {icon:"📋",label:"Applications",val:stats.apps,color:C.amber,pg:"admissions-page"},
            {icon:"⏳",label:"Pending",val:stats.pending,color:C.red,pg:"admissions-page"},
          ].map((k,i) => (
            <div key={i} onClick={()=>setPage(k.pg)}
              style={{background:"#fff",border:`1px solid ${k.color}22`,borderRadius:12,padding:"14px",borderTop:`3px solid ${k.color}`,cursor:"pointer",transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{fontSize:18,marginBottom:6}}>{k.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:20,color:k.color,fontWeight:900,lineHeight:1}}>{k.val}</div>
              <div style={{fontSize:10,color:C.navy,fontWeight:600,marginTop:3}}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Recent data */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:C.navy,display:"flex",justifyContent:"space-between"}}>
              Recent Applications
              <button onClick={()=>setPage("admissions-page")} style={{fontSize:11,color:C.blue,border:"none",background:"none",cursor:"pointer"}}>View All →</button>
            </div>
            {apps.length === 0
              ? <div style={{padding:"24px",textAlign:"center",color:C.slate,fontSize:12}}>No applications yet.</div>
              : apps.slice(0,5).map((a,i) => (
                <div key={i} style={{padding:"10px 16px",borderBottom:"1px solid #F8FAFF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:12,fontWeight:600,color:C.navy}}>{a.applicant_name}</div>
                    <div style={{fontSize:10,color:C.slate}}>{a.school_id} · {new Date(a.created_at).toLocaleDateString()}</div>
                  </div>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <StatusBadge s={a.status}/>
                    {a.status==="pending" && <>
                      <button onClick={()=>approveApp(a.id,"approved")} style={{background:"rgba(16,185,129,.1)",border:"none",color:C.green,padding:"3px 7px",borderRadius:4,fontSize:10,cursor:"pointer",fontWeight:700}}>✓</button>
                      <button onClick={()=>approveApp(a.id,"rejected")} style={{background:"rgba(239,68,68,.1)",border:"none",color:C.red,padding:"3px 7px",borderRadius:4,fontSize:10,cursor:"pointer",fontWeight:700}}>✕</button>
                    </>}
                  </div>
                </div>
              ))
            }
          </div>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:C.navy,display:"flex",justifyContent:"space-between"}}>
              Recent Payments
              <button onClick={()=>setPage("finance")} style={{fontSize:11,color:C.blue,border:"none",background:"none",cursor:"pointer"}}>View All →</button>
            </div>
            {payments.length === 0
              ? <div style={{padding:"24px",textAlign:"center",color:C.slate,fontSize:12}}>No payments yet.</div>
              : payments.slice(0,5).map((p,i) => (
                <div key={i} style={{padding:"10px 16px",borderBottom:"1px solid #F8FAFF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:C.navy}}>{p.school_id||"General"} · {p.payment_type||"Tuition"}</div>
                    <div style={{fontSize:10,color:C.slate}}>{new Date(p.created_at).toLocaleDateString()}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.green}}>{fmt(p.amount)}</div>
                    {p.status==="success" && !p.access_enabled &&
                      <button onClick={()=>enableAccess(p.id)} style={{background:"rgba(16,185,129,.1)",border:"none",color:C.green,padding:"2px 7px",borderRadius:4,fontSize:9,cursor:"pointer",fontWeight:700,marginTop:2}}>Enable Access</button>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"16px"}}>
          <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:12}}>Quick Actions</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
            {[["📋","Applications","admissions-page"],["👥","Learners","learners"],["👔","Staff","staff-page"],["💰","Finance","finance"],["📣","Announce","announcements"],["🔑","Roles","admin-roles"],["💳","Fees","fee-settings"],["🏫","Divisions","divisions-mgmt"],["🌐","Website","website-mgmt"],["📊","Reports","reports"],["⚙️","Operations","operations"],["🔧","Settings","settings"]].map(([icon,label,pg])=>(
              <button key={pg} onClick={()=>setPage(pg)}
                style={{background:"#F8FAFF",border:`1px solid ${C.border}`,borderRadius:9,padding:"12px 6px",cursor:"pointer",textAlign:"center",transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
                <div style={{fontSize:10,fontWeight:600,color:C.navy}}>{label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    // ADMISSIONS
    if (page === "admissions-page") return (
      <div>
        <PageTitle title="Admissions Management" sub={`${apps.length} total · ${stats.pending} pending review`}/>
        <MsgBar/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
          {[["Total",apps.length,"#64748B"],["Pending",apps.filter(a=>a.status==="pending").length,C.amber],["Approved",apps.filter(a=>a.status==="approved").length,C.green],["Rejected",apps.filter(a=>a.status==="rejected").length,C.red]].map(([l,v,c])=>(
            <div key={l} style={{background:"#fff",border:`1px solid ${c}22`,borderRadius:10,padding:"14px",borderTop:`3px solid ${c}`,textAlign:"center"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,color:c,fontWeight:900}}>{v}</div>
              <div style={{fontSize:11,color:C.slate}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 1fr 1.5fr",padding:"9px 16px",background:"#F8FAFF",borderBottom:`2px solid ${C.border}`}}>
            {["Applicant","Division","Programme","Date","Status","Actions"].map(h=>(
              <div key={h} style={{fontSize:9,fontWeight:700,color:C.slate,letterSpacing:.5,textTransform:"uppercase"}}>{h}</div>
            ))}
          </div>
          {apps.length === 0
            ? <div style={{padding:"40px",textAlign:"center",color:C.slate}}>No applications yet. Share sampaceedu.com.ng with students.</div>
            : apps.map((a,i) => (
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 1fr 1.5fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center",background:a.status==="pending"?"rgba(245,158,11,.02)":"#fff"}}>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:C.navy}}>{a.applicant_name}</div>
                <div style={{fontSize:10,color:C.slate}}>{a.email}</div>
                <div style={{fontSize:9,color:"#94A3B8",fontFamily:"monospace"}}>{a.reference}</div>
              </div>
              <div style={{fontSize:11,color:C.slate}}>{a.school_id}</div>
              <div style={{fontSize:11,color:C.slate}}>{a.program||a.class_level||"General"}</div>
              <div style={{fontSize:10,color:C.slate}}>{new Date(a.created_at).toLocaleDateString()}</div>
              <StatusBadge s={a.status}/>
              <div style={{display:"flex",gap:4}}>
                {a.status === "pending" ? <>
                  <button onClick={()=>approveApp(a.id,"approved")} style={{background:"rgba(16,185,129,.1)",border:"none",color:C.green,padding:"4px 8px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>✓ Approve</button>
                  <button onClick={()=>approveApp(a.id,"rejected")} style={{background:"rgba(239,68,68,.1)",border:"none",color:C.red,padding:"4px 8px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>✕</button>
                </> : <span style={{fontSize:10,color:C.slate}}>Done</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // LEARNERS
    if (page === "learners") return (
      <div>
        <PageTitle title="Learners Management" sub={`${students.length} registered across all divisions`}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
          {[["All Learners",students.length,"#64748B"],["College",students.filter(s=>s.student_profiles?.[0]?.school_id==="college").length,C.blue],["Extramural",students.filter(s=>s.student_profiles?.[0]?.school_id==="extramural").length,"#00897B"],["Digital",students.filter(s=>s.student_profiles?.[0]?.school_id==="digital").length,"#7B1FA2"]].map(([l,v,c])=>(
            <div key={l} style={{background:"#fff",border:`1px solid ${c}22`,borderRadius:10,padding:"14px",borderTop:`3px solid ${c}`,textAlign:"center"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:20,color:c,fontWeight:900}}>{v}</div>
              <div style={{fontSize:11,color:C.slate}}>{l}</div>
            </div>
          ))}
        </div>
        {loading ? <div style={{textAlign:"center",padding:40,color:C.slate,fontSize:13}}>Loading learners...</div> : (
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr",padding:"9px 16px",background:"#F8FAFF",borderBottom:`2px solid ${C.border}`}}>
              {["Learner","Email","Division","Role","Joined"].map(h=>(
                <div key={h} style={{fontSize:9,fontWeight:700,color:C.slate,letterSpacing:.5,textTransform:"uppercase"}}>{h}</div>
              ))}
            </div>
            {students.length === 0
              ? <div style={{padding:"40px",textAlign:"center",color:C.slate}}>No learners registered yet.</div>
              : students.map((s,i) => (
              <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>
                    {s.full_name?.charAt(0)||"?"}
                  </div>
                  <div style={{fontSize:12,fontWeight:600,color:C.navy}}>{s.full_name}</div>
                </div>
                <div style={{fontSize:11,color:C.slate}}>{s.email}</div>
                <div style={{fontSize:11,color:C.slate}}>{s.student_profiles?.[0]?.school_id||"—"}</div>
                <div style={{fontSize:11,color:C.slate,textTransform:"capitalize"}}>{s.role}</div>
                <div style={{fontSize:10,color:C.slate}}>{new Date(s.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    // STAFF
    if (page === "staff-page") return (
      <div>
        <PageTitle title="Staff Management" sub="All staff across 12 divisions. Division-specific roles available."/>
        <MsgBar/>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:14}}>Add New Staff Member</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            {[["Full Name *","text","e.g. Mrs. Ngozi Adeyemi","snm"],["Email *","email","staff@sampaceedu.com.ng","sem"],["Phone","text","+234...","sph"],["Subject / Course","text","e.g. Mathematics, Web Dev","ssub"]].map(([l,t,ph,id])=>(
              <div key={id}>
                <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{l}</label>
                <input id={id} type={t} placeholder={ph} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}/>
              </div>
            ))}
            <div>
              <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Division</label>
              <select id="sdiv" onChange={e=>{
                const roles = STAFF_ROLES[e.target.value] || [];
                const sel = document.getElementById("srole");
                if (sel) sel.innerHTML = roles.map(r=>`<option>${r}</option>`).join("");
              }} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}>
                {DIVISIONS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Staff Role</label>
              <select id="srole" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}>
                {(STAFF_ROLES["college"]||[]).map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const name=document.getElementById("snm")?.value;
            const email=document.getElementById("sem")?.value;
            const phone=document.getElementById("sph")?.value||"";
            const div=document.getElementById("sdiv")?.value||"college";
            const subj=document.getElementById("ssub")?.value||"";
            if(!name||!email){alert("Name and email are required.");return;}
            if(s){
              const {data:nd,error}=await s.from("users").insert({full_name:name,email,phone,role:"teacher",is_active:true}).select().single();
              if(error){alert("Error: "+error.message);return;}
              if(nd&&subj){
                await s.from("courses").insert({school_id:div,subject:subj,title:subj,teacher_id:nd.id,is_active:true}).then(()=>{}).catch(()=>{});
              }
            }
            showMsg("✅ Staff member added successfully!");
            loadData();
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            + Add Staff Member
          </button>
        </div>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:C.navy}}>All Staff ({staff.length})</div>
          {staff.length === 0
            ? <div style={{padding:"24px",textAlign:"center",color:C.slate,fontSize:12}}>No staff added yet. Use the form above.</div>
            : staff.map((s,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 2fr 1.5fr 1fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.purple},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff"}}>
                  {s.full_name?.charAt(0)||"?"}
                </div>
                <div style={{fontSize:12,fontWeight:600,color:C.navy}}>{s.full_name}</div>
              </div>
              <div style={{fontSize:11,color:C.slate}}>{s.email}</div>
              <div style={{fontSize:11,color:C.slate,textTransform:"capitalize"}}>{s.role}</div>
              <button onClick={async()=>{if(!sb())return;await sb().from("users").update({is_active:!s.is_active}).eq("id",s.id);loadData();}}
                style={{background:s.is_active?"rgba(239,68,68,.1)":"rgba(16,185,129,.1)",border:"none",color:s.is_active?C.red:C.green,padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>
                {s.is_active?"Suspend":"Activate"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );

    // ACADEMICS
    if (page === "academics") return (
      <div>
        <PageTitle title="Academics" sub="Manage all academic activities across SAMPACE divisions"/>
        <CardGrid cols={4} items={[
          ["📅","Timetable","Class schedules for all divisions","timetable"],
          ["📊","Results & Reports","Grades and term results","results-page"],
          ["📝","Assessments","CA tests, exams, assignments","msg:Assessment management coming in Phase 2"],
          ["🎓","Certificates","Issue and verify certificates","msg:Certificate management coming in Phase 2"],
          ["📋","Curriculum","Subjects, courses and syllabi","msg:Curriculum manager coming in Phase 2"],
          ["📆","Academic Calendar","Term dates and events","msg:Calendar management coming in Phase 2"],
          ["🧪","Virtual Labs","PhET simulations and online labs","msg:Labs management coming in Phase 2"],
          ["✅","Attendance","Daily attendance records","msg:Attendance reports coming in Phase 2"],
        ]}/>
      </div>
    );

    // FINANCE
    if (page === "finance") return (
      <div>
        <PageTitle title="Finance Management" sub="Payments, revenue and financial overview"/>
        <MsgBar/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
          {[
            ["Total Collected",fmt(payments.filter(p=>p.status==="success").reduce((t,p)=>t+Number(p.amount),0)),C.green],
            ["Awaiting Activation",payments.filter(p=>p.status==="success"&&!p.access_enabled).length+" students",C.amber],
            ["Total Transactions",payments.length+" records","#64748B"],
          ].map(([l,v,c])=>(
            <div key={l} style={{background:"#fff",border:`1px solid ${c}22`,borderRadius:12,padding:"16px",borderTop:`3px solid ${c}`}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,color:c,fontWeight:900}}>{v}</div>
              <div style={{fontSize:12,color:C.slate,marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:C.navy}}>Payment History</div>
          {payments.length === 0
            ? <div style={{padding:"40px",textAlign:"center",color:C.slate}}>No payments yet.</div>
            : payments.map((p,i)=>(
            <div key={i} style={{padding:"12px 18px",borderBottom:"1px solid #F8FAFF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:C.navy}}>{p.paystack_reference||"REF-"+p.id?.slice(0,8)}</div>
                <div style={{fontSize:10,color:C.slate}}>{p.school_id||"General"} · {p.payment_type||"Tuition"} · {new Date(p.created_at).toLocaleDateString()}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:13,fontWeight:700,color:C.green}}>{fmt(p.amount)}</div>
                <StatusBadge s={p.status}/>
                {p.status==="success"&&!p.access_enabled&&
                  <button onClick={()=>enableAccess(p.id)} style={{background:"rgba(16,185,129,.1)",border:"none",color:C.green,padding:"5px 10px",borderRadius:6,fontSize:10,cursor:"pointer",fontWeight:700}}>✓ Enable Access</button>
                }
                {p.access_enabled&&<span style={{fontSize:10,color:C.green,fontWeight:700}}>✅ Active</span>}
              </div>
            </div>
          ))}
        </div>
        <button onClick={()=>setPage("fee-settings")} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 20px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>💳 Manage Fee Settings →</button>
      </div>
    );

    // FEE SETTINGS
    if (page === "fee-settings") return (
      <div>
        <PageTitle title="Fee Settings" sub="Admin-configurable fees for all programmes. All prices in Naira."/>
        <MsgBar/>
        {[
          {title:"🏫 SAMPACE College — Per Term",pairs:[["college_jss","JSS1–JSS3"],["college_ss","SS1–SS2"],["college_ss3","SS3 (Exam Year)"]]},
          {title:"📚 Tutorial & Extramural — Monthly",pairs:[["tutorial_single","Single Subject"],["tutorial_bundle","3-Subject Bundle"],["tutorial_full","Full Package (All Subjects)"]]},
          {title:"💻 Digital Campus — Per Programme",pairs:[["digital_tech","School of Technology"],["digital_biz","Business & Professional"],["digital_lang","Languages & Communication"]]},
          {title:"🏛️ Pre-University — Annual",pairs:[["preuni_ijmb","IJMB Programme"],["preuni_jupeb","JUPEB Programme"],["preuni_pre","Pre-Degree / Diploma"]]},
          {title:"🏢 Professional Learning Centre",pairs:[["professional_short","Short Course (per course)"],["professional_exec","Executive Programme"]]},
          {title:"🖥️ CBT Platform — Subscription",pairs:[["cbt_monthly","Monthly Access"],["cbt_annual","Annual Access"]]},
        ].map((sec,si)=>(
          <div key={si} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:12,color:C.navy}}>{sec.title}</div>
            {sec.pairs.map(([key,label])=>(
              <div key={key} style={{display:"grid",gridTemplateColumns:"1fr 1fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
                <div style={{fontSize:12,color:C.slate,fontWeight:600}}>{label}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,color:C.slate,fontWeight:600}}>₦</span>
                  <input type="number" value={fees[key]||""} onChange={e=>setFees(f=>({...f,[key]:e.target.value}))}
                    style={{flex:1,border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,outline:"none",color:C.navy}}/>
                  <span style={{fontSize:11,color:C.green,fontWeight:700,minWidth:90}}>{fmt(fees[key]||0)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <button onClick={async()=>{
          const s=sb();
          if(s){await s.from("notifications").insert({user_id:"00000000-0000-0000-0000-000000000000",title:"Fee Settings Updated",body:JSON.stringify(fees),type:"system"}).then(()=>{}).catch(()=>{});}
          showMsg("✅ All fee settings saved successfully!");
        }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"12px 28px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer"}}>
          💾 Save All Fee Settings
        </button>
      </div>
    );

    // OPERATIONS
    if (page === "operations") return (
      <div>
        <PageTitle title="Operations" sub="Day-to-day operational management"/>
        <CardGrid cols={3} items={[
          ["📣","Announcements","Publish to students and staff","announcements"],
          ["🎫","Support Tickets","Help desk and student issues","msg:Support tickets coming in Phase 2"],
          ["📅","Events","Schedule SAMPACE events","msg:Events calendar coming in Phase 2"],
          ["💬","Internal Messaging","Staff communication","msg:Internal messaging coming in Phase 2"],
          ["📦","Resources","Manage learning resources","msg:Resource management coming in Phase 2"],
          ["📋","Visitor Log","Track visitors and guests","msg:Visitor log coming in Phase 2"],
        ]}/>
      </div>
    );

    // CORPORATE HQ
    if (page === "corporate") return (
      <div>
        <PageTitle title="Corporate Headquarters" sub="SAMPACE EDUCATIONAL LTD · CAC Registered · CAMA 2020"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px"}}>
            <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:14}}>Company Profile</div>
            {[["Company Name","SAMPACE EDUCATIONAL LTD"],["Founder","Ayeni Samuel Anuoluwapo"],["Incorporation","CAC · CAMA 2020 · Nigeria"],["Status","Active · Trading"],["Primary Domain","sampaceedu.com.ng"],["Contact","info@sampaceedu.com.ng"],["Divisions","12 Active Divisions"],["Founded","2026"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F8FAFF"}}>
                <div style={{fontSize:11,color:C.slate,fontWeight:600}}>{l}</div>
                <div style={{fontSize:11,color:C.navy,fontWeight:700}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[["📜","Company Documents","CAC certificates, MEMART, TIN"],["🤝","Partners & Affiliations","WAEC, NECO, JAMB, ACCA, ICAN"],["👑","Leadership Team","Director and management"],["🎨","Brand Assets","Logos, colours, guidelines"],["📰","Press & Media","Media kit and press releases"],["🌍","Global Presence","International partnerships"]].map(([icon,label,desc])=>(
              <div key={label} onClick={()=>showMsg(label+" — coming in Phase 2")}
                style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 16px",cursor:"pointer",display:"flex",gap:12,alignItems:"center",transition:"all .2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{fontSize:20,flexShrink:0}}>{icon}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.navy}}>{label}</div>
                  <div style={{fontSize:10,color:C.slate}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // DIVISIONS MANAGEMENT
    if (page === "divisions-mgmt") return (
      <div>
        <PageTitle title="Divisions Management" sub="Control admissions status and configure all 12 SAMPACE divisions"/>
        <MsgBar/>
        {DIV_GROUPS.map((group,gi)=>(
          <div key={gi} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:12,color:C.navy,background:"#F8FAFF"}}>{group.label}</div>
            {DIVISIONS.filter(d=>group.ids.includes(d.id)).map(div=>(
              <div key={div.id} style={{padding:"14px 16px",borderBottom:"1px solid #F8FAFF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,background:`${div.color}15`,border:`1px solid ${div.color}25`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{div.icon}</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:C.navy}}>{div.name}</div>
                    <div style={{fontSize:10,color:C.slate}}>Division {DIVISIONS.findIndex(d=>d.id===div.id)+1}</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{background:divStatus[div.id]==="open"?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)",color:divStatus[div.id]==="open"?C.green:C.red,padding:"3px 10px",borderRadius:100,fontSize:10,fontWeight:700}}>
                    {divStatus[div.id]==="open"?"🟢 Open":"🔴 Closed"}
                  </span>
                  <button onClick={()=>setDivStatus(prev=>({...prev,[div.id]:prev[div.id]==="open"?"closed":"open"}))}
                    style={{background:divStatus[div.id]==="open"?"rgba(239,68,68,.08)":"rgba(16,185,129,.08)",border:"none",color:divStatus[div.id]==="open"?C.red:C.green,padding:"5px 12px",borderRadius:6,fontSize:10,cursor:"pointer",fontWeight:700}}>
                    {divStatus[div.id]==="open"?"Close Admissions":"Open Admissions"}
                  </button>
                  <button onClick={()=>showMsg("Analytics for "+div.name+" — coming in Phase 2")}
                    style={{background:"#F8FAFF",border:`1px solid ${C.border}`,color:C.slate,padding:"5px 12px",borderRadius:6,fontSize:10,cursor:"pointer"}}>
                    Analytics
                  </button>
                  <button onClick={()=>showMsg("Configuration for "+div.name+" — coming in Phase 2")}
                    style={{background:`${div.color}10`,border:`1px solid ${div.color}22`,color:div.color,padding:"5px 12px",borderRadius:6,fontSize:10,cursor:"pointer",fontWeight:600}}>
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );

    // ADMIN ROLES
    if (page === "admin-roles") return (
      <div>
        <PageTitle title="Admin Roles & Permissions" sub="Role-based access control across all 12 divisions"/>
        <MsgBar/>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:14}}>Assign Admin Role to User</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>User Email</label>
              <input id="ae" type="email" placeholder="user@sampaceedu.com.ng" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}/>
            </div>
            <div>
              <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Assign Role</label>
              <select id="ar" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}>
                {Object.entries(ROLES).map(([k,r])=><option key={k} value={k}>{r.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const email=document.getElementById("ae")?.value;
            const role=document.getElementById("ar")?.value;
            if(!email||!role){alert("Enter email and select role.");return;}
            if(s){
              const {data:u}=await s.from("users").select("id").eq("email",email).single();
              if(!u){alert("User not found. They must register first.");return;}
              await s.from("users").update({role:"school_admin"}).eq("id",u.id);
            }
            showMsg("✅ Role assigned: "+ROLES[role]?.label+" → "+email);
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            🔑 Assign Role
          </button>
        </div>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"18px"}}>
          <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:14}}>Role Access Map</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {Object.entries(ROLES).map(([key,role])=>(
              <div key={key} style={{background:`${role.color}08`,border:`1px solid ${role.color}22`,borderRadius:9,padding:"11px 13px"}}>
                <div style={{fontWeight:700,fontSize:12,color:role.color,marginBottom:3}}>{role.label}</div>
                <div style={{fontSize:10,color:C.slate,fontFamily:"monospace"}}>{key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // TIMETABLE
    if (page === "timetable") return (
      <div>
        <PageTitle title="Class Timetable Manager" sub="Schedule and publish classes for all divisions"/>
        <TimetableManagerInline C={C} sb={sb()}/>
      </div>
    );

    // RESULTS
    if (page === "results-page") return (
      <div>
        <PageTitle title="Results & Reports" sub="Academic results across all divisions and terms"/>
        <div style={{background:"rgba(21,101,192,.06)",border:"1px solid rgba(21,101,192,.15)",borderRadius:10,padding:"16px 18px",marginBottom:16,fontSize:12,color:C.navy,lineHeight:1.7}}>
          📊 Results management is connected to Supabase. Grades appear here as staff enter them in the Staff Portal. Full result reports, term summaries and CGPA calculations coming in Phase 2.
        </div>
        <CardGrid cols={3} items={[
          ["📊","Term Results","View all term grades","msg:Term results view — connected to Supabase grades table"],
          ["🏆","Class Rankings","Student performance rankings","msg:Class rankings coming in Phase 2"],
          ["📈","Progress Reports","Student progress over time","msg:Progress reports coming in Phase 2"],
          ["📋","Report Cards","Generate and print report cards","msg:Report card generator coming in Phase 2"],
          ["🎓","CGPA Calculator","Pre-University CGPA","msg:CGPA calculator coming in Phase 2"],
          ["📥","Export Results","Download results as CSV/Excel","msg:Export coming in Phase 2"],
        ]}/>
      </div>
    );

    // LMS
    if (page === "lms") return (
      <div>
        <PageTitle title="Learning Management" sub="Content, classes and learning resources"/>
        <CardGrid cols={3} items={[
          ["🎬","Live Classes","Schedule and manage live sessions","msg:Live class manager coming — needs Oracle Cloud BigBlueButton"],
          ["📹","Recorded Classes","Video library from Cloudinary","msg:Video library — connected to Cloudinary dsqz7kndw"],
          ["📝","Assignments","Create and grade assignments","msg:Assignment manager coming in Phase 2"],
          ["💬","Discussions","Forum and discussion boards","msg:Discussion boards coming in Phase 2"],
          ["📥","Resources","Learning materials and downloads","msg:Resource library coming in Phase 2"],
          ["🔨","Course Builder","Build and publish courses","msg:Course builder coming in Phase 2"],
        ]}/>
      </div>
    );

    // ANNOUNCEMENTS
    if (page === "announcements") return (
      <div>
        <PageTitle title="Announcements" sub="Publish notices to students and staff"/>
        <MsgBar/>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:C.navy,marginBottom:14}}>Create New Announcement</div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Title *</label>
            <input id="ann-title" type="text" placeholder="e.g. Term 2 begins January 6th" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Target Audience</label>
            <select id="ann-target" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",color:C.navy}}>
              <option>All Students</option><option>College Students</option><option>Extramural Learners</option>
              <option>Digital Campus</option><option>Pre-University</option><option>All Staff</option><option>Everyone</option>
            </select>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message *</label>
            <textarea id="ann-body" rows={4} placeholder="Type your announcement here..."
              style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",fontSize:12,outline:"none",resize:"vertical",color:C.navy,fontFamily:"sans-serif"}}/>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const title=document.getElementById("ann-title")?.value;
            const body=document.getElementById("ann-body")?.value;
            const target=document.getElementById("ann-target")?.value;
            if(!title||!body){alert("Please fill in title and message.");return;}
            if(s){
              const {data:users}=await s.from("users").select("id").eq("role","student");
              if(users?.length){
                await s.from("notifications").insert(users.map(u=>({user_id:u.id,title,body,type:"announcement",is_read:false})));
              }
            }
            showMsg("✅ Announcement published to " + target + "!");
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            📣 Publish Announcement
          </button>
        </div>
      </div>
    );

    // INQUIRIES
    if (page === "inquiries") return (
      <div>
        <PageTitle title="Inquiries" sub="Website contact form submissions and service inquiries"/>
        <InquiriesInline C={C} sb={sb()}/>
      </div>
    );

    // WEBSITE MANAGEMENT
    if (page === "website-mgmt") return (
      <div>
        <PageTitle title="Website Management" sub="Manage the SAMPACE public website content"/>
        <CardGrid cols={3} items={[
          ["🏠","Homepage","Edit hero, sections and content","msg:Homepage editor coming in Phase 2"],
          ["📰","News & Blog","Manage news articles","msg:Blog manager coming in Phase 2"],
          ["🖼️","Banners & Media","Upload images and media","msg:Media manager — connected to Cloudinary"],
          ["❓","FAQs","Frequently asked questions","msg:FAQ manager coming in Phase 2"],
          ["⭐","Testimonials","Manage student testimonials","msg:Testimonials manager coming in Phase 2"],
          ["🔍","SEO Settings","Meta tags and analytics","msg:SEO settings coming in Phase 2"],
          ["📱","Social Media","Links and social profiles","msg:Social settings coming in Phase 2"],
          ["📞","Contact Info","Phone, email, address","msg:Contact settings coming in Phase 2"],
          ["🎨","Menus & Navigation","Website navigation","msg:Navigation editor coming in Phase 2"],
        ]}/>
      </div>
    );

    // REPORTS
    if (page === "reports") return (
      <div>
        <PageTitle title="Reports & Analytics" sub="Platform-wide reports across all 12 divisions"/>
        <CardGrid cols={3} items={[
          ["👥","Learner Reports","Enrollment, retention, performance","msg:Learner reports — coming in Phase 2 with charts"],
          ["👔","Staff Reports","Workload and performance","msg:Staff reports coming in Phase 2"],
          ["💰","Revenue Reports","Income by division and trends","msg:Revenue charts coming in Phase 2"],
          ["📊","Academic Reports","Grades and pass rates","msg:Academic reports coming in Phase 2"],
          ["✅","Attendance Reports","Daily and weekly attendance","msg:Attendance reports coming in Phase 2"],
          ["🏆","Performance Reports","Top performers by division","msg:Performance reports coming in Phase 2"],
        ]}/>
      </div>
    );

    // SETTINGS
    if (page === "settings") return (
      <div>
        <PageTitle title="Platform Settings" sub="Complete configuration for SAMPACE EDUCATIONAL LTD"/>
        <MsgBar/>
        {[
          {title:"🏛️ General — Institution",fields:[["inst_name","Institution Name"],["inst_tagline","Tagline"],["inst_email","Contact Email"],["inst_phone","Phone Number"],["inst_address","Physical Address"],["inst_domain","Primary Domain"],["inst_timezone","Timezone"],["inst_currency","Currency"]]},
          {title:"🎨 Branding & Identity",fields:[["brand_primary","Primary Colour (hex)"],["brand_secondary","Secondary Colour (hex)"],["brand_accent","Accent Colour (hex)"]]},
          {title:"📚 Academic Calendar",fields:[["academic_session","Current Session"],["academic_term","Current Term"],["academic_start","Term Start Date"],["academic_end","Term End Date"],["grade_ca1","CA1 Max"],["grade_ca2","CA2 Max"],["grade_proj","Project Max"],["grade_exam","Exam Max"],["grade_pass","Pass Mark"]]},
          {title:"📋 Admissions Control",fields:[["admissions_status","Admissions Status"],["admissions_fee","Application Fee (₦)"],["admissions_workflow","Approval Workflow"]]},
          {title:"💰 Finance & Payments",fields:[["payment_gateway","Payment Gateway"]]},
          {title:"📧 Communication",fields:[["email_from","From Email"],["sms_enabled","SMS (true/false)"],["whatsapp_enabled","WhatsApp (true/false)"]]},
          {title:"🔒 Security",fields:[["security_2fa","Two-Factor Auth"],["security_timeout","Session Timeout"],["security_attempts","Max Login Attempts"]]},
          {title:"🔧 System",fields:[["maintenance","Maintenance Mode"],["platform_version","Platform Version"]]},
        ].map((sec,si)=>(
          <div key={si} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:12,color:C.navy}}>{sec.title}</div>
            {sec.fields.map(([key,label])=>(
              <div key={key} style={{display:"grid",gridTemplateColumns:"1fr 2fr",padding:"11px 18px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
                <div style={{fontSize:12,color:C.slate,fontWeight:600}}>{label}</div>
                <input value={cfg[key]||""} onChange={e=>setCfg(s=>({...s,[key]:e.target.value}))}
                  style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 12px",fontSize:12,outline:"none",color:C.navy}}/>
              </div>
            ))}
            <div style={{padding:"11px 18px"}}>
              <button onClick={()=>showMsg("✅ "+sec.title.split("—")[1]?.trim()+" saved!")}
                style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"7px 18px",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                💾 Save Section
              </button>
            </div>
          </div>
        ))}
      </div>
    );

    // FALLBACK
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:300,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:12}}>🚧</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,color:C.navy,marginBottom:8,textTransform:"capitalize"}}>{page.replace(/-/g," ")}</h2>
        <p style={{color:C.slate,maxWidth:300,lineHeight:1.7}}>This section is being built in Phase 2.</p>
        <button onClick={()=>setPage("overview")} style={{marginTop:16,background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"9px 20px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>← Back to Dashboard</button>
      </div>
    );
  };

  // ── LAYOUT ────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"'Syne',sans-serif",background:C.cream,minHeight:"100vh",display:"flex"}}>
      {/* Sidebar */}
      <aside style={{width:sideOpen?210:52,background:C.navy,minHeight:"100vh",display:"flex",flexDirection:"column",transition:"width .25s",flexShrink:0,position:"sticky",top:0,height:"100vh",overflow:"hidden"}}>
        <div style={{padding:"12px 10px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{width:28,height:28,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:C.navy,flexShrink:0}}>SE</div>
          {sideOpen && <div>
            <div style={{fontSize:8,fontWeight:800,color:"#C9A84C",letterSpacing:1.5,whiteSpace:"nowrap"}}>SAMPACE ENTERPRISE</div>
            <div style={{fontSize:7,color:"rgba(255,255,255,.3)",whiteSpace:"nowrap"}}>{ROLES[adminRole]?.label||"Super Admin"}</div>
          </div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{marginLeft:"auto",background:"rgba(255,255,255,.06)",border:"none",color:"rgba(255,255,255,.4)",width:22,height:22,borderRadius:5,cursor:"pointer",fontSize:11,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {sideOpen?"←":"→"}
          </button>
        </div>
        <nav style={{flex:1,padding:"6px 5px",overflowY:"auto"}}>
          {NAV.map((group,gi)=>(
            <div key={gi} style={{marginBottom:6}}>
              {sideOpen && <div style={{fontSize:8,color:"rgba(255,255,255,.22)",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",padding:"5px 7px 2px"}}>{group.section}</div>}
              {group.items.map(item=>(
                <button key={item.id} onClick={()=>setPage(item.id)}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 8px",borderRadius:6,border:"none",background:page===item.id?"linear-gradient(135deg,rgba(21,101,192,.4),rgba(66,165,245,.2))":"transparent",borderLeft:page===item.id?"2px solid #42A5F5":"2px solid transparent",color:page===item.id?"#fff":"rgba(255,255,255,.45)",cursor:"pointer",marginBottom:1,fontSize:10,fontWeight:page===item.id?600:400,textAlign:"left",whiteSpace:"nowrap"}}>
                  <span style={{fontSize:13,flexShrink:0}}>{item.icon}</span>
                  {sideOpen && <span style={{flex:1}}>{item.label}</span>}
                  {sideOpen && item.badge ? <span style={{background:C.red,color:"#fff",fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:100}}>{item.badge}</span> : null}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div style={{padding:"8px",borderTop:"1px solid rgba(255,255,255,.07)"}}>
          {sideOpen
            ? <button onClick={onLogout} style={{width:"100%",background:"rgba(239,68,68,.15)",border:"none",color:C.red,padding:"7px",borderRadius:7,fontSize:11,cursor:"pointer",fontWeight:600}}>Logout</button>
            : <button onClick={onLogout} style={{background:"rgba(239,68,68,.15)",border:"none",color:C.red,width:32,height:32,borderRadius:7,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>↩</button>
          }
        </div>
      </aside>

      {/* Main Content */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <header style={{background:"#fff",borderBottom:`1px solid ${C.border}`,padding:"0 20px",height:50,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
          <div style={{display:"flex",gap:6,alignItems:"center",fontSize:10,color:C.slate}}>
            SAMPACE <span style={{color:"#CBD5E1"}}>›</span>
            <span style={{color:C.navy,fontWeight:700,textTransform:"capitalize"}}>{page.replace(/-/g," ").replace("page","")}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:sb()?"#10B981":"#EF4444"}}/>
            <span style={{fontSize:9,color:C.slate}}>{sb()?"Live":"Demo"}</span>
            <span style={{background:(ROLES[adminRole]?.color||C.gold)+"18",color:ROLES[adminRole]?.color||C.gold,padding:"2px 8px",borderRadius:100,fontSize:9,fontWeight:700}}>
              {ROLES[adminRole]?.label||"Super Admin"}
            </span>
            <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#FFD54F)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.navy}}>A</div>
          </div>
        </header>
        <main style={{flex:1,padding:"20px",overflowY:"auto"}}>{renderPage()}</main>
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
    sb.auth.getUser().then(({ data }) => {
      if (data?.user) {
        sb.from("users").select("*").eq("auth_id", data.user.id).single()
          .then(({ data: p }) => { if (p) setStaffProfile(p); });
      }
    });
  }, []);

  const saveGrades = async (studentId) => {
    const sb = window.__supabase;
    const sc = scores[studentId] || {};
    if (!sb) { setSaveMsg("⚠️ Not connected to database"); return; }
    const { error } = await sb.from("grades").upsert({
      student_id: studentId,
      subject: "General",
      ca1: Number(sc.ca1||0), ca2: Number(sc.ca2||0),
      project: Number(sc.proj||0), exam: Number(sc.exam||0),
      term: "First Term", session: "2026/2027",
      updated_at: new Date().toISOString()
    }, { onConflict: "student_id,course_id,term,session" });
    setSaveMsg(error ? "❌ Error: "+error.message : "✅ Grades saved to database!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const saveAttendance = async () => {
    const sb = window.__supabase;
    if (!sb) { setSaveMsg("⚠️ Not connected"); return; }
    const records = Object.entries(marked).map(([studentId, status]) => ({
      student_id: studentId, date: new Date().toISOString().split("T")[0],
      status, created_at: new Date().toISOString()
    }));
    if (records.length === 0) { setSaveMsg("⚠️ Mark attendance first"); return; }
    const { error } = await sb.from("attendance").upsert(records, { onConflict: "student_id,course_id,date" });
    setSaveMsg(error ? "❌ Error: "+error.message : "✅ Attendance saved!");
    setTimeout(() => setSaveMsg(""), 3000);
  };
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
                <span style={{ background:`${gc}18`, color:gc, padding:"3px 8px", borderRadius:99, fontSize:11, fontWeight:700 }}>{total>0?grade:"—"}</span>
              </div>
            );
          })}
          <div style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={()=>STUDS.forEach(s=>saveGrades(s.id))} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"9px 22px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>💾 Save All Scores</button>
            {saveMsg && <span style={{ fontSize:12, fontWeight:600, color:saveMsg.startsWith("✅")?C.green:C.red }}>{saveMsg}</span>}
          </div>
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
          <div style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={saveAttendance} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"9px 22px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>💾 Submit Attendance</button>
            {saveMsg && <span style={{ fontSize:12, fontWeight:600, color:saveMsg.startsWith("✅")?C.green:C.red }}>{saveMsg}</span>}
          </div>
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
    <div style={{ fontFamily:"sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
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
function CBTEngine({ C }) {
  const QUESTIONS = {
    "WAEC English": [
      {q:"Choose the word that is nearest in meaning to ELOQUENT:",opts:["Silent","Fluent","Awkward","Confused"],ans:1,exp:"ELOQUENT means fluent or persuasive in speech or writing."},
      {q:"Select the option that best completes the sentence: The boy _____ to school every day.",opts:["go","goes","going","gone"],ans:1,exp:"'Goes' is correct because 'the boy' is third person singular."},
      {q:"Which of the following is a conjunction?",opts:["Quickly","Beautiful","Although","Table"],ans:2,exp:"'Although' is a conjunction — it joins two clauses together."},
      {q:"The plural of 'phenomenon' is:",opts:["Phenomenons","Phenomenas","Phenomena","Phenomenes"],ans:2,exp:"'Phenomena' is the correct plural form of 'phenomenon'."},
      {q:"Choose the correctly punctuated sentence:",opts:["Its a beautiful day","It's a beautiful day","Its' a beautiful day","It is' a beautiful day"],ans:1,exp:"The apostrophe in 'It's' replaces the missing letter 'i' in 'It is'."},
    ],
    "WAEC Mathematics": [
      {q:"Simplify: 3x + 2y - x + 4y",opts:["2x + 6y","4x + 6y","2x + 2y","4x + 2y"],ans:0,exp:"3x - x = 2x and 2y + 4y = 6y, so the answer is 2x + 6y."},
      {q:"Find the value of x if 3x - 7 = 14",opts:["x = 3","x = 7","x = 21","x = 14"],ans:1,exp:"3x = 14 + 7 = 21, so x = 21 ÷ 3 = 7."},
      {q:"What is 15% of 200?",opts:["25","30","35","40"],ans:1,exp:"15% of 200 = (15/100) × 200 = 30."},
      {q:"The area of a rectangle with length 8cm and width 5cm is:",opts:["26 cm²","40 cm²","13 cm²","80 cm²"],ans:1,exp:"Area = length × width = 8 × 5 = 40 cm²."},
      {q:"If the sum of interior angles of a polygon is 540°, how many sides does it have?",opts:["4","5","6","7"],ans:1,exp:"Sum = (n-2) × 180°. 540 = (n-2) × 180, n-2 = 3, n = 5 sides."},
    ],
    "JAMB English": [
      {q:"Choose the word that has the same vowel sound as in 'beat':",opts:["bed","bit","beet","bat"],ans:2,exp:"'Beet' has the same long /iː/ vowel sound as 'beat'."},
      {q:"Select the most appropriate word to fill the gap: The manager was _____ with the employee's performance.",opts:["please","pleasing","pleased","pleasure"],ans:2,exp:"'Pleased' is the correct past participle form used as an adjective here."},
      {q:"Identify the figure of speech: 'The wind whispered through the trees'",opts:["Simile","Metaphor","Personification","Hyperbole"],ans:2,exp:"Personification gives human qualities (whispered) to a non-human thing (wind)."},
      {q:"Which sentence is grammatically correct?",opts:["Neither of the boys are ready","Neither of the boys is ready","Neither of the boys were ready","Neither of the boys be ready"],ans:1,exp:"'Neither' takes a singular verb, so 'is' is correct."},
      {q:"The opposite of 'VERBOSE' is:",opts:["Talkative","Concise","Loud","Boring"],ans:1,exp:"VERBOSE means using too many words. Its antonym is CONCISE (brief and clear)."},
    ],
    "WAEC Biology": [
      {q:"Which organelle is responsible for protein synthesis?",opts:["Mitochondria","Ribosome","Nucleus","Lysosome"],ans:1,exp:"Ribosomes are the sites of protein synthesis in all living cells."},
      {q:"Osmosis is the movement of water from a region of:",opts:["High to low solute concentration","Low to high solute concentration","High to low water concentration","Low to high water concentration"],ans:2,exp:"Water moves from high water concentration (low solute) to low water concentration (high solute) through a semi-permeable membrane."},
      {q:"The powerhouse of the cell is the:",opts:["Nucleus","Ribosome","Mitochondria","Cell wall"],ans:2,exp:"The mitochondria produces ATP (energy) through cellular respiration."},
      {q:"Which blood group is the universal donor?",opts:["A","B","AB","O"],ans:3,exp:"Blood group O negative is the universal donor because it has no A, B or Rh antigens."},
      {q:"Photosynthesis takes place in the:",opts:["Mitochondria","Ribosome","Chloroplast","Nucleus"],ans:2,exp:"Chloroplasts contain chlorophyll which captures light energy for photosynthesis."},
    ],
  };

  const subjects = Object.keys(QUESTIONS);
  const [subject, setSubject] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const questions = subject ? QUESTIONS[subject] : [];

  useEffect(()=>{
    if(!started||finished) return;
    setTimeLeft(30);
    const t = setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev<=1){
          clearInterval(t);
          if(!answered){ handleAnswer(-1); }
          return 0;
        }
        return prev-1;
      });
    },1000);
    return ()=>clearInterval(t);
  },[current,started,finished]);

  const handleAnswer = (idx) => {
    if(answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = questions[current].ans === idx;
    if(correct) setScore(s=>s+1);
    setResults(r=>[...r,{q:questions[current].q,selected:idx,correct:questions[current].ans,isCorrect:correct,exp:questions[current].exp}]);
  };

  const next = () => {
    if(current+1 >= questions.length){ setFinished(true); return; }
    setCurrent(c=>c+1);
    setSelected(null);
    setAnswered(false);
  };

  const reset = () => {
    setStarted(false); setFinished(false); setCurrent(0);
    setSelected(null); setAnswered(false); setScore(0); setResults([]);
  };

  const pct = questions.length ? Math.round(score/questions.length*100) : 0;
  const grade = pct>=75?"A":pct>=65?"B":pct>=55?"C":pct>=45?"D":"F";
  const gc = {A:"#10B981",B:"#1565C0",C:"#F59E0B",D:"#F97316",F:"#EF4444"}[grade];

  if(finished) return (
    <div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"24px",marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>{pct>=75?"🏆":pct>=55?"✅":"📚"}</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:C.navy,marginBottom:4}}>Score: {score}/{questions.length}</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:40,fontWeight:900,color:gc,marginBottom:4}}>{pct}%</div>
        <div style={{fontSize:16,fontWeight:700,color:gc,marginBottom:12}}>Grade {grade}</div>
        <div style={{fontSize:13,color:C.slate,marginBottom:16}}>{subject} · {questions.length} Questions</div>
        <div style={{width:200,height:6,background:"#F1F5F9",borderRadius:99,margin:"0 auto 20px",overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${gc},${gc}88)`,borderRadius:99,transition:"width 1s ease"}}/>
        </div>
        <button onClick={reset} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Try Another Subject</button>
      </div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:C.navy}}>Question Review</div>
        {results.map((r,i)=>(
          <div key={i} style={{padding:"14px 18px",borderBottom:`1px solid #F8FAFF`,background:r.isCorrect?"rgba(16,185,129,.03)":"rgba(239,68,68,.03)"}}>
            <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
              <span style={{fontSize:14,flexShrink:0}}>{r.isCorrect?"✅":"❌"}</span>
              <div style={{fontSize:12,fontWeight:600,color:C.navy}}>{i+1}. {r.q}</div>
            </div>
            {!r.isCorrect && <div style={{fontSize:11,color:"#EF4444",marginLeft:22,marginBottom:4}}>Your answer: {questions[i]?.opts?.[r.selected]||"No answer (timeout)"}</div>}
            <div style={{fontSize:11,color:"#10B981",marginLeft:22,marginBottom:6}}>Correct: {questions[i]?.opts?.[r.correct]}</div>
            <div style={{fontSize:11,color:C.slate,marginLeft:22,background:"#F8FAFF",padding:"8px 12px",borderRadius:7,lineHeight:1.6}}>💡 {r.exp}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(!started) return (
    <div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"28px",marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:14,color:C.navy,marginBottom:16}}>Select Subject to Practice</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {subjects.map(s=>(
            <div key={s} onClick={()=>setSubject(s)} style={{border:`2px solid ${subject===s?C.blue:C.border}`,borderRadius:10,padding:"14px",cursor:"pointer",background:subject===s?`${C.blue}08`:"#fff",transition:"all .2s"}}>
              <div style={{fontWeight:700,fontSize:13,color:C.navy}}>{s}</div>
              <div style={{fontSize:11,color:C.slate,marginTop:3}}>{QUESTIONS[s].length} questions · 30s per question</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(21,101,192,.06)",border:"1px solid rgba(21,101,192,.15)",borderRadius:9,padding:"12px 16px",marginBottom:16,fontSize:11,color:C.navy,lineHeight:1.7}}>
          📋 <strong>CBT Rules:</strong> 30 seconds per question · Auto-advance on timeout · Instant feedback · Full review at the end · Grade shown on completion
        </div>
        {subject && <button onClick={()=>setStarted(true)} style={{width:"100%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"12px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer"}}>🖥️ Start CBT Practice — {subject}</button>}
      </div>
      <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.18)",borderRadius:10,padding:"12px 16px",fontSize:11,color:C.navy}}>
        💡 Full WAEC 2010–2024 past questions database coming in the CBT Platform division (cbt.sampaceedu.com.ng). This is a preview with sample questions.
      </div>
    </div>
  );

  const q = questions[current];
  const timerPct = (timeLeft/30)*100;
  const timerColor = timeLeft>15?"#10B981":timeLeft>7?"#F59E0B":"#EF4444";

  return (
    <div>
      {/* Progress */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:12,color:C.slate}}>{subject} · Question {current+1} of {questions.length}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:80,height:5,background:"#F1F5F9",borderRadius:99,overflow:"hidden"}}>
            <div style={{width:`${timerPct}%`,height:"100%",background:timerColor,borderRadius:99,transition:"width 1s linear"}}/>
          </div>
          <div style={{fontSize:12,fontWeight:700,color:timerColor,minWidth:24,textAlign:"right"}}>{timeLeft}s</div>
        </div>
      </div>
      <div style={{width:"100%",height:5,background:"#F1F5F9",borderRadius:99,marginBottom:18,overflow:"hidden"}}>
        <div style={{width:`${((current)/questions.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.sky})`,borderRadius:99}}/>
      </div>

      {/* Question */}
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"22px",marginBottom:14}}>
        <div style={{fontSize:9,color:C.blue,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Question {current+1}</div>
        <div style={{fontSize:15,fontWeight:700,color:C.navy,lineHeight:1.5,marginBottom:20}}>{q.q}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {q.opts.map((opt,i)=>{
            let bg="#fff",border=`1px solid ${C.border}`,color=C.navy;
            if(answered){
              if(i===q.ans){bg="rgba(16,185,129,.08)";border="1px solid #10B981";color="#10B981";}
              else if(i===selected&&i!==q.ans){bg="rgba(239,68,68,.08)";border="1px solid #EF4444";color="#EF4444";}
            } else if(selected===i){bg=`${C.blue}08`;border=`1px solid ${C.blue}`;color=C.blue;}
            return (
              <div key={i} onClick={()=>handleAnswer(i)} style={{background:bg,border,borderRadius:9,padding:"13px 16px",cursor:answered?"default":"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .15s"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:answered&&i===q.ans?"#10B981":answered&&i===selected?"#EF4444":"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:answered&&(i===q.ans||i===selected)?"#fff":C.slate,flexShrink:0}}>{["A","B","C","D"][i]}</div>
                <div style={{fontSize:13,fontWeight:500,color}}>{opt}</div>
                {answered&&i===q.ans&&<span style={{marginLeft:"auto",fontSize:14}}>✅</span>}
                {answered&&i===selected&&i!==q.ans&&<span style={{marginLeft:"auto",fontSize:14}}>❌</span>}
              </div>
            );
          })}
        </div>
        {answered && (
          <div style={{marginTop:14,background:"rgba(21,101,192,.06)",border:"1px solid rgba(21,101,192,.15)",borderRadius:9,padding:"12px 16px",fontSize:12,color:C.navy,lineHeight:1.6}}>
            💡 <strong>Explanation:</strong> {q.exp}
          </div>
        )}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:12,color:C.slate}}>Score: <strong style={{color:C.navy}}>{score}/{current+1}</strong></div>
        {answered && <button onClick={next} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>{current+1>=questions.length?"See Results →":"Next Question →"}</button>}
      </div>
    </div>
  );
}


function StudentPortal({ onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [realGrades, setRealGrades] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const sb = window.__supabase;
    if (!sb) return;
    // Load current user profile
    sb.auth.getUser().then(({ data }) => {
      if (data?.user) {
        sb.from("users").select("*, student_profiles(*)").eq("auth_id", data.user.id).single()
          .then(({ data: profile }) => { if (profile) setUserProfile(profile); });
        // Load grades
        sb.from("grades").select("*").eq("student_id", data.user.id)
          .then(({ data: grades }) => { if (grades?.length) setRealGrades(grades); });
      }
    });
  }, []);
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
  const navItems = [["dashboard","🏠","Dashboard"],["classes","🎬","My Classes"],["timetable","📅","Timetable"],["assignments","📝","Assignments"],["library","📚","Library"],["labs","🧪","Virtual Lab"],["cbt","🖥️","CBT Practice"],["results","📊","Results"],["certificate","🏆","Certificates"],["profile","👤","My Profile"],["feedback","💬","Feedback"]];

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
                <div style={{ background:"#F1F5F9", borderRadius:99, height:5, overflow:"hidden" }}><div style={{ width:`${c.progress}%`, height:"100%", background:`linear-gradient(90deg,${c.color},${c.color}99)`, borderRadius:99 }}/></div>
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
    if (tab==="cbt") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>CBT Practice Engine</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:18 }}>Practice past questions and mock exams. WAEC · NECO · JAMB</p>
        <CBTEngine C={C} />
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
                <span style={{ background:`${gc}18`, color:gc, padding:"3px 8px", borderRadius:99, fontSize:11, fontWeight:700 }}>{grade}</span>
              </div>
            );
          })}
          <div style={{ padding:"12px 16px", background:"#F0F4FF", fontWeight:700, fontSize:13, color:C.blue }}>Total: 314/400 · Average: 78.5% · Position: 3rd of 32</div>
        </div>
      </div>
    );
    if (tab==="profile") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:18 }}>My Profile</h2>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"24px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:700, color:"#fff" }}>
              {userProfile?.full_name?.charAt(0)||"S"}
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:18, color:C.navy }}>{userProfile?.full_name||"Student"}</div>
              <div style={{ fontSize:12, color:C.slate }}>{userProfile?.email||""}</div>
              <div style={{ fontSize:11, color:C.blue, marginTop:3 }}>
                {userProfile?.student_profiles?.[0]?.admission_number||"Admission number pending"} · {userProfile?.student_profiles?.[0]?.current_class||""}
              </div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              ["Full Name", userProfile?.full_name||""],
              ["Email", userProfile?.email||""],
              ["Phone", userProfile?.phone||""],
              ["School", userProfile?.student_profiles?.[0]?.school_id||""],
              ["Department", userProfile?.student_profiles?.[0]?.department||""],
              ["Class", userProfile?.student_profiles?.[0]?.current_class||""],
            ].map(([label, value], i) => (
              <div key={i}>
                <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>{label}</label>
                <input defaultValue={value} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, color:C.navy, outline:"none" }}/>
              </div>
            ))}
          </div>
          <button onClick={async()=>{
            const sb=window.__supabase;
            if(!sb){alert("Not connected.");return;}
            const {data:user}=await sb.auth.getUser();
            if(user?.user){
              const {error}=await sb.from("users").update({phone:document.querySelectorAll("input")[2]?.value||""}).eq("auth_id",user.user.id);
              alert(error?"Error: "+error.message:"✅ Profile updated!");
            }
          }} style={{ marginTop:16, background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>💾 Save Changes</button>
        </div>
        <div style={{ background:"rgba(21,101,192,.06)", border:"1px solid rgba(21,101,192,.15)", borderRadius:10, padding:"12px 16px", fontSize:11, color:C.navy }}>
          💡 To update your name or email contact admin at info@sampaceedu.com.ng
        </div>
      </div>
    );
    if (tab==="feedback") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Give Feedback</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Your feedback helps us improve. All responses are reviewed by the Director.</p>
        {[{label:"Overall Platform Experience",type:"stars"},{label:"Quality of Live Classes",type:"stars"},{label:"Teacher Support & Communication",type:"stars"},{label:"Virtual Labs & Resources",type:"stars"}].map((item,i)=>(
          <div key={i} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px", marginBottom:10 }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.navy, marginBottom:8 }}>{item.label}</div>
            <div style={{ display:"flex", gap:8 }}>
              {[1,2,3,4,5].map(n=><button key={n} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>⭐</button>)}
            </div>
          </div>
        ))}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:6, textTransform:"uppercase" }}>Any comments or suggestions?</label>
          <textarea rows={4} placeholder="Tell us what we can improve, what you enjoy, or any issue you faced..." style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:12, outline:"none", resize:"vertical", color:C.navy, fontFamily:"sans-serif" }}/>
        </div>
        <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Submit Feedback ✓</button>
      </div>
    );
    if (tab==="certificate") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:8 }}>My Certificates</h2>
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, borderRadius:16, padding:"40px 32px", textAlign:"center", marginBottom:20, border:"2px solid rgba(201,168,76,.3)" }}>
          <div style={{ fontFamily:"monospace", fontSize:11, color:C.gold, letterSpacing:4, marginBottom:12 }}>SAMPACE INSTITUTE</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:700, color:"#fff", marginBottom:6 }}>Certificate of Completion</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.6)", marginBottom:16 }}>This is to certify that</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:32, fontWeight:700, color:C.gold, marginBottom:16, fontStyle:"italic" }}>Adaeze Okonkwo</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.7)" }}>has successfully completed</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:700, color:"#fff" }}>English Language — SS1 Course</div>
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
              <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }} onClick={()=>{
              const txt=`SAMPACE EDUCATIONAL LTD\nCERTIFICATE OF COMPLETION\n\nThis certifies that\n[Student Name]\nhas successfully completed a programme at SAMPACE INSTITUTE\n\nIssued: ${new Date().toLocaleDateString()}\nCertificate ID: SAMP-${Date.now().toString().slice(-8)}\n\nsampaceedu.com.ng`;
              const blob=new Blob([txt],{type:"text/plain"});
              const url=URL.createObjectURL(blob);
              const a=document.createElement("a");
              a.href=url;a.download="SAMPACE_Certificate.txt";a.click();
              URL.revokeObjectURL(url);
            }}>📥 Download Certificate</button>
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
              <span style={{ background:a.submitted?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)", color:a.submitted?C.green:C.amber, padding:"4px 12px", borderRadius:99, fontSize:11, fontWeight:700 }}>{a.submitted?`✓ Submitted — ${a.marks}/20`:"Pending"}</span>
            </div>
            {!a.submitted && <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"9px 20px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>📤 Submit Assignment</button>}
          </div>
        ))}
      </div>
    );
    return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}><div style={{ fontSize:48, marginBottom:12 }}>🚧</div><h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:8, textTransform:"capitalize" }}>{tab}</h2><p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>Connects to Supabase in Phase 2.</p></div>;
  };

  return (
    <div style={{ fontFamily:"sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
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
function ParentPortal({ onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [realChildren, setRealChildren] = useState([]);
  const [realMessages, setRealMessages] = useState([]);
  const [sendingMsg, setSendingMsg] = useState(false);
  const C = { navy:"#0B1F3A", blue:"#1565C0", sky:"#42A5F5", cream:"#F8FAFF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", red:"#EF4444", amber:"#F59E0B", gold:"#C9A84C" };

  useEffect(() => {
    const sb = window.__supabase;
    if (!sb) return;
    sb.auth.getUser().then(async ({ data }) => {
      if (!data?.user) return;
      // Get parent's children
      const { data: links } = await sb.from("parent_children")
        .select("student_id, users!parent_children_student_id_fkey(id,full_name,email,student_profiles(*))")
        .eq("parent_id", data.user.id);
      if (links?.length) setRealChildren(links.map(l=>l.users));
      // Get messages
      const { data: msgs } = await sb.from("messages")
        .select("*").eq("receiver_id", data.user.id).order("created_at",{ascending:true});
      if (msgs?.length) setRealMessages(msgs);
    });
  }, []);

  const sendMessage = async (body, receiverId, studentId) => {
    const sb = window.__supabase;
    if (!sb || !body.trim()) return;
    setSendingMsg(true);
    const { data: user } = await sb.auth.getUser();
    if (user?.user) {
      const { data: profile } = await sb.from("users").select("id").eq("auth_id", user.user.id).single();
      if (profile) {
        await sb.from("messages").insert({ sender_id: profile.id, receiver_id: receiverId, student_id: studentId, body });
        const { data: msgs } = await sb.from("messages").select("*").eq("receiver_id", profile.id).order("created_at",{ascending:true});
        if (msgs) setRealMessages(msgs);
      }
    }
    setSendingMsg(false);
  };

  const children = [
    {id:1,name:"Adaeze Okonkwo",admission:"SC/2026/001",school:"School College",class:"SS1 Sciences",progress:65,fees:"paid",
     subjects:[{sub:"English Language",ca1:8,ca2:9,proj:8,exam:56,att:92},{sub:"Mathematics",ca1:7,ca2:7,proj:8,exam:50,att:88},{sub:"Biology",ca1:6,ca2:7,proj:7,exam:48,att:79}]},
    {id:2,name:"Emeka Okonkwo",admission:"SC/2026/022",school:"Tutorial & Exam",class:"WAEC Track",progress:38,fees:"pending",
     subjects:[{sub:"Mathematics",ca1:7,ca2:6,proj:0,exam:0,att:75},{sub:"Physics",ca1:6,ca2:5,proj:0,exam:0,att:80}]},
  ];
  const [activeChild, setActiveChild] = useState(0);
  const child = children[activeChild];
  const [msgTo, setMsgTo] = useState("Mrs. Adeyemi");
  const [msgText, setMsgText] = useState("");
  const [messages, setMessages] = useState([
    {from:"Mrs. Adeyemi (English)",text:"Adaeze performed excellently in this week's essay. Please encourage more reading at home.",time:"Today 9:12am",mine:false},
    {from:"You",text:"Thank you ma. We will work on that. Is there any resource you recommend?",time:"Today 9:45am",mine:true},
    {from:"Mrs. Adeyemi (English)",text:"Yes, I have uploaded a reading list to the digital library. She can access it from the student portal.",time:"Today 10:01am",mine:false},
  ]);

  const NAV = [
    ["dashboard","🏠","Dashboard"],
    ["progress","📊","Track Progress"],
    ["communication","💬","Teacher Messages"],
    ["activities","📅","Daily Activities"],
    ["results","📋","Report Card"],
    ["fees","💳","School Fees"],
    ["profile","👤","Child Profile"],
  ];

  const sendMsg = () => {
    if (!msgText.trim()) return;
    setMessages(m => [...m, {from:"You", text:msgText, time:"Just now", mine:true}]);
    setMsgText("");
    setTimeout(()=>setMessages(m=>[...m,{from:msgTo,text:"Thank you for your message. I will respond shortly.",time:"Just now",mine:false}]),1500);
  };

  const renderTab = () => {
    if (tab === "dashboard") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.navy, marginBottom:4 }}>Welcome, <em style={{ color:C.blue }}>Mrs. Okonkwo</em> 👋</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:16 }}>Parent Dashboard — Secondary School Portal</p>

        {/* Child selector */}
        <div style={{ display:"flex", gap:10, marginBottom:18 }}>
          {children.map((ch,i)=>(
            <button key={i} onClick={()=>setActiveChild(i)} style={{ flex:1, background:activeChild===i?`linear-gradient(135deg,${C.blue},${C.sky})`:"#fff", border:`1px solid ${activeChild===i?C.blue:C.border}`, color:activeChild===i?"#fff":C.navy, padding:"10px 14px", borderRadius:10, cursor:"pointer", fontWeight:activeChild===i?700:400, fontSize:12, transition:"all .2s" }}>
              <div style={{ fontSize:18, marginBottom:4 }}>👤</div>
              <div>{ch.name.split(" ")[0]}</div>
              <div style={{ fontSize:10, opacity:.7 }}>{ch.class}</div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
          {[[child.progress+"%","Progress",C.blue],["3","Subjects",C.sky],[child.fees==="paid"?"Paid":"Pending","Fees",child.fees==="paid"?C.green:C.amber]].map(([v,l,c],i)=>(
            <div key={i} style={{ background:"#fff", border:`1px solid ${c}22`, borderRadius:12, padding:"14px", borderTop:`3px solid ${c}`, textAlign:"center" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:c, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:11, color:C.slate, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Child card */}
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px", marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"#fff" }}>{child.name.charAt(0)}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{child.name}</div>
                <div style={{ fontSize:11, color:C.slate }}>{child.admission} · {child.class} · {child.school}</div>
                <div style={{ marginTop:6, background:"#F1F5F9", borderRadius:99, height:5, width:180, overflow:"hidden" }}>
                  <div style={{ width:`${child.progress}%`, height:"100%", background:`linear-gradient(90deg,${C.blue},${C.sky})`, borderRadius:99 }}/>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <button onClick={()=>setTab("progress")} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"7px 14px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>📊 View Progress</button>
              {child.fees==="pending" && <button onClick={()=>setTab("fees")} style={{ background:"linear-gradient(135deg,#E65100,#FF6D00)", color:"#fff", border:"none", padding:"7px 14px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>💳 Pay Fees</button>}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[["📊","Track Progress","progress"],["💬","Message Teacher","communication"],["📅","Daily Activities","activities"],["📋","Report Card","results"]].map(([icon,label,t])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:10, padding:"14px", cursor:"pointer", textAlign:"left", transition:"all .2s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{ fontSize:22, marginBottom:6 }}>{icon}</div>
              <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{label}</div>
            </button>
          ))}
        </div>
      </div>
    );

    if (tab === "progress") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:4 }}>Academic Progress</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:16 }}>{child.name} · {child.class} · First Term 2026</p>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:14 }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:C.navy }}>Subject Performance</div>
          {child.subjects.map((s,i)=>{
            const total = s.ca1+s.ca2+s.proj+s.exam;
            const grade = total>=75?"A":total>=65?"B":total>=55?"C":total>=45?"D":"F";
            const gc = grade==="A"?C.green:grade==="B"?C.blue:grade==="C"?C.amber:C.red;
            return (
              <div key={i} style={{ padding:"14px 16px", borderBottom:`1px solid #F8FAFF` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{s.sub}</div>
                  <span style={{ background:`${gc}18`, color:gc, padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700 }}>{grade} · {total>0?total:"—"}/100</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:8 }}>
                  {[["CA1",s.ca1,10],["CA2",s.ca2,10],["Project",s.proj,10],["Exam",s.exam,70]].map(([label,score,max])=>(
                    <div key={label} style={{ background:"#F8FAFF", borderRadius:7, padding:"8px", textAlign:"center" }}>
                      <div style={{ fontSize:9, color:C.slate, marginBottom:3, textTransform:"uppercase" }}>{label}/{max}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:C.navy }}>{score||"—"}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ fontSize:10, color:C.slate }}>Attendance: {s.att}%</div>
                  <div style={{ flex:1, background:"#F1F5F9", borderRadius:99, height:4, overflow:"hidden" }}>
                    <div style={{ width:`${s.att}%`, height:"100%", background:s.att>=75?C.green:C.amber, borderRadius:99 }}/>
                  </div>
                  {s.att < 75 && <span style={{ fontSize:9, color:C.red, fontWeight:700 }}>⚠️ Below 75%</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background:`linear-gradient(135deg,${C.blue}12,${C.sky}08)`, border:`1px solid ${C.blue}20`, borderRadius:10, padding:"12px 16px", fontSize:11, color:C.navy }}>
          💡 Attendance below 75% may affect exam eligibility. Contact school admin if there are concerns.
        </div>
      </div>
    );

    if (tab === "communication") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:4 }}>Parent-Teacher Messages</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:14 }}>Direct communication with {child.name}'s teachers. All messages are logged for quality assurance.</p>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", display:"block", marginBottom:5 }}>Message To *</label>
          <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:C.navy }} value={msgTo} onChange={e=>setMsgTo(e.target.value)}>
            <option>Mrs. Adeyemi (English)</option>
            <option>Mr. Okafor (Mathematics)</option>
            <option>Dr. Hassan (Biology)</option>
            <option>School Admin</option>
          </select>
        </div>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:12, maxHeight:320, overflowY:"auto" }}>
          {messages.map((m,i)=>(
            <div key={i} style={{ padding:"12px 16px", borderBottom:`1px solid #F8FAFF`, display:"flex", justifyContent:m.mine?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"75%", background:m.mine?`${C.blue}18`:"#F8FAFF", borderRadius:m.mine?"12px 12px 0 12px":"12px 12px 12px 0", padding:"10px 14px" }}>
                <div style={{ fontSize:10, color:C.slate, marginBottom:3, fontWeight:600 }}>{m.from} · {m.time}</div>
                <div style={{ fontSize:12, color:C.navy, lineHeight:1.6 }}>{m.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Type your message to the teacher..." style={{ flex:1, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 13px", fontSize:12, outline:"none", color:C.navy }}/>
          <button onClick={sendMsg} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px 20px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>Send →</button>
        </div>
        <div style={{ fontSize:10, color:C.slate, marginTop:8 }}>💡 Messages are responded to within 24 hours on school days.</div>
      </div>
    );

    if (tab === "activities") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:4 }}>Daily Activities</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:16 }}>What {child.name} did today — {new Date().toDateString()}</p>
        {[
          {time:"8:00am",event:"Joined English Language Live Class",icon:"🎬",status:"present"},
          {time:"9:00am",event:"Submitted Essay: My Ideal Nigeria",icon:"📝",status:"submitted"},
          {time:"10:00am",event:"Mathematics Class — Absent",icon:"⚠️",status:"absent"},
          {time:"12:00pm",event:"Opened Digital Library — Biology notes",icon:"📚",status:"active"},
          {time:"2:00pm",event:"Completed Biology virtual lab (PhET)",icon:"🧪",status:"completed"},
          {time:"3:30pm",event:"Last active on platform",icon:"📱",status:"active"},
        ].map((a,i)=>(
          <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{a.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{a.event}</div>
              <div style={{ fontSize:10, color:C.slate, marginTop:2 }}>{a.time}</div>
            </div>
            <span style={{ background:a.status==="absent"?"rgba(239,68,68,.1)":a.status==="present"||a.status==="completed"?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)", color:a.status==="absent"?C.red:a.status==="present"||a.status==="completed"?C.green:C.amber, padding:"3px 9px", borderRadius:99, fontSize:10, fontWeight:700 }}>{a.status}</span>
          </div>
        ))}
      </div>
    );

    if (tab === "results") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:4 }}>Report Card</h2>
        <p style={{ fontSize:12, color:C.slate, marginBottom:14 }}>{child.name} · First Term 2026 · {child.class}</p>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:12 }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
            {["Subject","CA1","CA2","Proj","Exam","Total","Grade"].map(h=><div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>)}
          </div>
          {child.subjects.map((s,i)=>{
            const total = s.ca1+s.ca2+s.proj+s.exam;
            const grade = total>=75?"A":total>=65?"B":total>=55?"C":total>=45?"D":"F";
            const gc = grade==="A"?C.green:grade==="B"?C.blue:grade==="C"?C.amber:C.red;
            return (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr", padding:"11px 16px", borderBottom:`1px solid #F8FAFF`, alignItems:"center" }}>
                <div style={{ fontSize:11, fontWeight:600, color:C.navy }}>{s.sub}</div>
                {[s.ca1,s.ca2,s.proj,s.exam].map((v,j)=><div key={j} style={{ fontSize:11, color:C.slate }}>{v||"—"}</div>)}
                <div style={{ fontSize:12, fontWeight:700, color:C.navy }}>{total>0?total:"—"}</div>
                <span style={{ background:`${gc}18`, color:gc, padding:"2px 7px", borderRadius:99, fontSize:10, fontWeight:700 }}>{total>0?grade:"—"}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>{
            const scores = child.subjects.map(s=>s.sub+" | CA1:"+s.ca1+" CA2:"+s.ca2+" Proj:"+s.proj+" Exam:"+s.exam+" Total:"+(s.ca1+s.ca2+s.proj+s.exam)).join("\n");
            const lines = ["SAMPACE EDUCATIONAL LTD","ACADEMIC REPORT CARD - First Term 2026","","Student: "+child.name,"Admission: "+child.admission,"Class: "+child.class,"","SUBJECT SCORES:","",scores,"","Form Teacher: Keep up the good work!","Principal: Excellent performance.","","sampaceedu.com.ng"];
            const blob=new Blob([lines.join("\n")],{type:"text/plain"});
            const url=URL.createObjectURL(blob);
            const a=document.createElement("a");
            a.href=url;a.download=child.name+"_ReportCard.txt";a.click();URL.revokeObjectURL(url);
          }} style={{ flex:1, background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>📥 Download Report Card</button>
        </div>
        <div style={{ marginTop:12, background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.2)", borderRadius:8, padding:"10px 14px", fontSize:11, color:C.amber }}>
          ⏳ Full downloadable PDF report will be available when Supabase is connected in Phase 2.
        </div>
      </div>
    );

    if (tab === "fees") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:16 }}>School Fees</h2>
        {children.map((ch,i)=>(
          <div key={i} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px", marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div><div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{ch.name}</div><div style={{ fontSize:11, color:C.slate }}>{ch.class} · {ch.school}</div></div>
              <span style={{ background:ch.fees==="paid"?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)", color:ch.fees==="paid"?C.green:C.amber, padding:"4px 12px", borderRadius:99, fontSize:11, fontWeight:700 }}>Fees: {ch.fees}</span>
            </div>
            {ch.fees === "pending" ? (
              <div>
                <div style={{ background:"rgba(245,158,11,.06)", border:"1px solid rgba(245,158,11,.2)", borderRadius:8, padding:"10px 14px", marginBottom:10, fontSize:11, color:C.amber, lineHeight:1.6 }}>
                  ⚠️ Payment is pending. Amount will be set by admin and sent to your email. Contact admin to confirm.
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <a href={WA} style={{ flex:1, background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", padding:"10px", borderRadius:8, fontSize:11, fontWeight:700, textDecoration:"none", textAlign:"center" }}>💬 WhatsApp Admin</a>
                  <button onClick={async()=>{
                    const pk = import.meta.env.VITE_PAYSTACK_PUBLIC;
                    if(!pk||!window.PaystackPop){alert("Paystack not loaded. Check your connection.");return;}
                    const sb=window.__supabase;
                    const {data:user}=sb?await sb.auth.getUser():{data:{}};
                    const handler = window.PaystackPop.setup({
                      key: pk,
                      email: user?.user?.email||"student@sampaceedu.com.ng",
                      amount: 4500000, // ₦45,000 in kobo — admin sets real amount later
                      currency: "NGN",
                      ref: "SAMP-"+Date.now(),
                      callback: (res) => alert("Payment successful! Reference: "+res.reference+". Admin will activate your access within 24 hours."),
                      onClose: () => {}
                    });
                    handler.openIframe();
                  }} style={{ flex:1, background:"linear-gradient(135deg,#E65100,#FF6D00)", color:"#fff", border:"none", padding:"10px", borderRadius:8, fontSize:11, fontWeight:700, cursor:"pointer" }}>💳 Pay via Paystack</button>
                </div>
              </div>
            ) : (
              <div style={{ background:"rgba(16,185,129,.06)", border:"1px solid rgba(16,185,129,.2)", borderRadius:8, padding:"10px 14px", fontSize:11, color:C.green }}>
                ✅ Fees paid for this term. Thank you!
              </div>
            )}
          </div>
        ))}
      </div>
    );

    if (tab === "profile") return (
      <div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:16 }}>Child Profile</h2>
        {[{label:"Full Name",value:child.name},{label:"Admission Number",value:child.admission},{label:"School",value:child.school},{label:"Class",value:child.class},{label:"Status",value:"Active"}].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12, color:C.slate }}>{r.label}</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{r.value}</div>
          </div>
        ))}
        <div style={{ marginTop:16, background:"rgba(21,101,192,.06)", border:`1px solid rgba(21,101,192,.2)`, borderRadius:10, padding:"12px 14px", fontSize:11, color:C.navy }}>
          💡 To update student profile details, contact admin via WhatsApp or email.
        </div>
      </div>
    );

    return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}><div style={{ fontSize:48, marginBottom:12 }}>🚧</div><h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:8, textTransform:"capitalize" }}>{tab}</h2><p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>Coming in Phase 2.</p></div>;
  };

  return (
    <div style={{ fontFamily:"sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
      {/* Sidebar */}
      <aside style={{ width:200, background:C.navy, minHeight:"100vh", display:"flex", flexDirection:"column", flexShrink:0, position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
        <div style={{ padding:"14px 12px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:28, height:28, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:C.navy }}>SI</div>
          <div><div style={{ fontSize:11, fontWeight:800, color:"#C9A84C", letterSpacing:1.5 }}>PARENT PORTAL</div><div style={{ fontSize:8, color:"rgba(255,255,255,.3)" }}>Secondary School</div></div>
        </div>
        <div style={{ padding:"12px 12px 10px", borderBottom:"1px solid rgba(255,255,255,.07)" }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#BF360C,#FF6D00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>O</div>
          <div style={{ fontSize:11, fontWeight:700, color:"#fff" }}>Mrs. Okonkwo</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginTop:2 }}>{children.length} children enrolled</div>
        </div>
        <nav style={{ flex:1, padding:"9px 7px", overflowY:"auto" }}>
          {NAV.map(([id,icon,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"8px 9px", borderRadius:7, border:"none", background:tab===id?"linear-gradient(135deg,rgba(191,54,12,.35),rgba(255,109,0,.15))":"transparent", borderLeft:tab===id?"2px solid #FF6D00":"2px solid transparent", color:tab===id?"#fff":"rgba(255,255,255,.5)", cursor:"pointer", marginBottom:2, fontSize:11, fontWeight:tab===id?600:400, textAlign:"left" }}>
              <span style={{ fontSize:13, flexShrink:0 }}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding:"10px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,.15)", border:"none", color:C.red, padding:"7px", borderRadius:7, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 20px", height:50, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", fontSize:10, color:C.slate }}>Parent Portal <span style={{ color:"#CBD5E1" }}>›</span> <span style={{ color:C.navy, fontWeight:600, textTransform:"capitalize" }}>{tab.replace("-"," ")}</span></div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ fontSize:10, color:C.slate }}>Viewing: <strong style={{ color:C.navy }}>{child.name.split(" ")[0]}</strong></div>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#BF360C,#FF6D00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>O</div>
          </div>
        </header>
        <main style={{ flex:1, padding:"20px", overflowY:"auto" }}>{renderTab()}</main>
      </div>
    </div>
  );
}


function App() {
  const [view, setView] = useState("home");
  const [school, setSchool] = useState(null);

  // Push state so browser back button works correctly
  const go = s => {
    setSchool(s); setView("school"); window.scrollTo(0,0);
    try { window.history.pushState({view:"school", schoolId:s.id, schoolData:JSON.stringify(s)}, "", "#"+s.id); } catch(e){}
  };
  const login = type => {
    setView("login-"+type); window.scrollTo(0,0);
    window.history.pushState({view:"login-"+type}, "", "#login-"+type);
  };
  const afterLogin = type => {
    setView(type); window.scrollTo(0,0);
    window.history.pushState({view:type}, "", "#"+type);
  };
  const back = () => {
    setSchool(null); setView("home"); window.scrollTo(0,0);
    window.history.pushState({view:"home"}, "", window.location.pathname);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = (e) => {
      const state = e.state;
      if (!state || state.view === "home") { setSchool(null); setView("home"); window.scrollTo(0,0); }
      else if (state.view === "school") {
        // Try stored schoolData first (works for all 12 divisions)
        if (state.schoolData) {
          try { const s = JSON.parse(state.schoolData); setSchool(s); setView("school"); window.scrollTo(0,0); return; } catch(e){}
        }
        // Fallback: look in SCHOOLS array
        const f = SCHOOLS.find(s=>s.id===state.schoolId);
        if (f) { setSchool(f); setView("school"); window.scrollTo(0,0); }
        else { setSchool(null); setView("home"); window.scrollTo(0,0); }
      } else if (state.view && state.view.startsWith("login-")) { setView(state.view); window.scrollTo(0,0); }
      else { setSchool(null); setView("home"); window.scrollTo(0,0); }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const h = window.location.hash.replace("#","");
    if (h) {
      const f = SCHOOLS.find(s=>s.id===h);
      if (f) { setSchool(f); setView("school"); }
    }
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
