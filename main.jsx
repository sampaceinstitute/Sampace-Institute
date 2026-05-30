import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

// ─── WHATSAPP CONFIG — Replace with real number when ready ───
const WA_NUMBER = "2348000000000"; // Replace with real number e.g. 2348012345678
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const EMAIL = "info@sampacecampus.com.ng";

// ─── GLOBAL STYLES ───
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Syne', sans-serif; background: #050A14; color: #fff; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #050A14; }
  ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }

  @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes floatUpSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
  @keyframes pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.08)} }
  @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes fadeSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeSlideIn { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.2)} 50%{box-shadow:0 0 60px rgba(201,168,76,0.5)} }
  @keyframes bgShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes particleFloat {
    0%   { transform: translateY(100vh) scale(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
  }
  @keyframes orbitRing {
    from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
  }
  @keyframes countUp { from { opacity:0; transform: scale(0.5); } to { opacity:1; transform: scale(1); } }
  @keyframes borderFlow {
    0%   { border-color: rgba(201,168,76,0.3); }
    50%  { border-color: rgba(201,168,76,0.8); }
    100% { border-color: rgba(201,168,76,0.3); }
  }
  @keyframes textGlow {
    0%,100% { text-shadow: 0 0 20px rgba(201,168,76,0); }
    50%      { text-shadow: 0 0 40px rgba(201,168,76,0.6); }
  }
  @keyframes scanLine {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
  @keyframes morphBg {
    0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  }

  .shimmer-text {
    background: linear-gradient(90deg, #C9A84C 0%, #FFD54F 30%, #fff 50%, #FFD54F 70%, #C9A84C 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
  .card-hover {
    transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s ease;
    cursor: pointer;
  }
  .card-hover:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 32px 64px rgba(0,0,0,0.4);
  }
  .btn-glow {
    position: relative; overflow: hidden;
    transition: all .3s ease;
  }
  .btn-glow::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%) skewX(-15deg);
    transition: transform .5s ease;
  }
  .btn-glow:hover::before { transform: translateX(200%) skewX(-15deg); }
  .btn-glow:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.45); }

  input::placeholder, textarea::placeholder, select { color: rgba(255,255,255,0.35); }
  input:focus, textarea:focus { outline: none; border-color: #C9A84C !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }

  .particle {
    position: absolute; border-radius: 50%;
    animation: particleFloat linear infinite;
    pointer-events: none;
  }
  .page-enter { animation: fadeSlideUp .6s ease both; }
`;

// ─── PARTICLE SYSTEM ───
function Particles({ count = 25 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 10,
    color: i % 3 === 0 ? "#C9A84C" : i % 3 === 1 ? "#42A5F5" : "rgba(255,255,255,0.3)",
  }));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.left}%`, bottom: "-10px",
          width: p.size, height: p.size,
          background: p.color,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
        }} />
      ))}
    </div>
  );
}

// ─── 3D ORBIT VISUAL ───
function OrbitVisual() {
  return (
    <div style={{ position:"relative", width:260, height:260, margin:"0 auto" }}>
      {/* Core sphere */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:80, height:80, borderRadius:"50%",
        background:"linear-gradient(135deg,#C9A84C,#FFD54F,#1565C0)",
        boxShadow:"0 0 60px rgba(201,168,76,0.6), 0 0 120px rgba(21,101,192,0.3)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:28, animation:"glow 3s ease-in-out infinite",
        zIndex:10,
      }}>SI</div>

      {/* Orbit rings */}
      {[
        { size:160, color:"rgba(201,168,76,0.2)", duration:"12s" },
        { size:200, color:"rgba(66,165,245,0.15)", duration:"18s", reverse:true },
        { size:240, color:"rgba(255,255,255,0.08)", duration:"25s" },
      ].map((ring,i) => (
        <div key={i} style={{
          position:"absolute", top:"50%", left:"50%",
          width:ring.size, height:ring.size,
          marginLeft:-ring.size/2, marginTop:-ring.size/2,
          borderRadius:"50%",
          border:`1px solid ${ring.color}`,
          animation:`spinSlow ${ring.duration} linear infinite ${ring.reverse?"reverse":""}`,
        }}>
          <div style={{
            position:"absolute", top:-4, left:"50%", marginLeft:-4,
            width:8, height:8, borderRadius:"50%",
            background: i===0?"#C9A84C": i===1?"#42A5F5":"rgba(255,255,255,0.5)",
            boxShadow:`0 0 12px ${i===0?"#C9A84C": i===1?"#42A5F5":"rgba(255,255,255,0.5)"}`,
          }} />
        </div>
      ))}

      {/* Floating school icons */}
      {[
        { emoji:"🎓", angle:0,   dist:100, delay:"0s" },
        { emoji:"📝", angle:72,  dist:100, delay:"1s" },
        { emoji:"💻", angle:144, dist:100, delay:"2s" },
        { emoji:"🏛️", angle:216, dist:100, delay:"3s" },
        { emoji:"🤝", angle:288, dist:100, delay:"4s" },
      ].map((item,i) => {
        const rad = (item.angle * Math.PI) / 180;
        const x = Math.cos(rad) * item.dist;
        const y = Math.sin(rad) * item.dist;
        return (
          <div key={i} style={{
            position:"absolute", top:"50%", left:"50%",
            transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            width:36, height:36, borderRadius:10,
            background:"rgba(255,255,255,0.08)",
            backdropFilter:"blur(4px)",
            border:"1px solid rgba(255,255,255,0.15)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18,
            animation:`floatUp ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay:item.delay,
            zIndex:5,
          }}>{item.emoji}</div>
        );
      })}
    </div>
  );
}

// ─── ANIMATED COUNTER ───
function CountUp({ target, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const num = parseInt(target);
        const step = Math.ceil(num / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(start);
        }, 40);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={ref} style={{ textAlign:"center", animation:"countUp .6s ease both" }}>
      <div style={{
        fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,6vw,56px)",
        fontWeight:900, color:"#C9A84C", lineHeight:1,
        textShadow:"0 0 30px rgba(201,168,76,0.4)",
      }}>{count}{suffix}</div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:2, textTransform:"uppercase", marginTop:4 }}>{label}</div>
    </div>
  );
}

// ─── SCHOOL DATA ───
const SCHOOLS = [
  {
    id:"school-college", num:"01", emoji:"🎓",
    name:"School College",
    short:"Secondary School · JSS1–SS3",
    color:"#1565C0", grad:"135deg,#0B2A5E,#1565C0,#1E88E5",
    accent:"#64B5F6",
    desc:"Nigeria's premier online secondary school. Full JSS1–SS3 curriculum with virtual labs, blended learning, CBT exams and globally competitive academic standards.",
    tags:["JSS1–SS3","Virtual Lab","WAEC/NECO","Report Cards","CBT"],
    applyType:"parent-student",
    departments:["Sciences","Humanities","Business/Commercial"],
    features:[
      {icon:"🧪",t:"Virtual Laboratory",d:"Interactive physics, chemistry and biology simulations"},
      {icon:"📚",t:"Digital Library",d:"Thousands of textbooks, past questions and e-resources"},
      {icon:"📝",t:"CBT Exam Engine",d:"Objective, theory and fill-in-gap questions with timer"},
      {icon:"📊",t:"Report Cards",d:"CA1+CA2+Project+Exam grading — termly PDF reports"},
      {icon:"🎬",t:"Live Classes",d:"Online classes with recorded playback per subject"},
      {icon:"👨‍👩‍👧",t:"Parent Dashboard",d:"Auto-created parent portal on student admission"},
    ],
    grades:{ ca1:10, ca2:10, project:10, exam:70 },
  },
  {
    id:"tutorial", num:"02", emoji:"📝",
    name:"Tutorial & Local Exam",
    short:"BECE · WAEC · NECO · GCE · JAMB",
    color:"#00897B", grad:"135deg,#003D2E,#00695C,#00897B",
    accent:"#4DB6AC",
    desc:"Intensive exam preparation for every major Nigerian examination. CBT practice, past questions, monthly mock tests and personalised study plans.",
    tags:["BECE","WAEC","NECO","JAMB/UTME","CBT Practice"],
    applyType:"student-only",
    tracks:["BECE","WAEC","NECO","GCE","JAMB/UTME"],
    features:[
      {icon:"🎯",t:"5 Exam Tracks",d:"BECE, WAEC, NECO, GCE and JAMB preparation"},
      {icon:"💻",t:"CBT Simulator",d:"Exact JAMB CBT interface replica — 160 questions"},
      {icon:"📅",t:"Monthly Tests",d:"Scheduled mock exams graded and ranked"},
      {icon:"🧪",t:"Virtual Lab",d:"Science practicals for Biology, Chemistry, Physics"},
      {icon:"🏆",t:"Leaderboard",d:"Monthly top performers with digital badges"},
      {icon:"📜",t:"Certificate",d:"Certificate of participation for all candidates"},
    ],
  },
  {
    id:"digital-campus", num:"03–08", emoji:"🏫",
    name:"SAMPACE Digital Campus",
    short:"Technology · Business · Languages · Communication · International",
    color:"#7B1FA2", grad:"135deg,#1A0040,#4A148C,#7B1FA2",
    accent:"#CE93D8",
    desc:"Six specialist schools under one digital campus. Cohort-based professional learning with live classes, community support and career-focused certification.",
    tags:["Technology","PMP·ACCA·ICAN","IELTS·SAT","Languages","Certificates"],
    applyType:"individual",
    subSchools:[
      { id:"technology",     name:"School of Technology",           emoji:"💻", color:"#4A148C", courses:["Web Development","Cybersecurity","Data Science","UI/UX","Mobile App","Cloud AWS"] },
      { id:"business",       name:"Business & Professional",        emoji:"📊", color:"#006064", courses:["ACCA","ICAN","PMP","CFA","CIMA","CIPM"] },
      { id:"international",  name:"Advanced & International",       emoji:"🌍", color:"#880E4F", courses:["IELTS","SAT","A-Level","TOEFL","GRE","GMAT"] },
      { id:"communication",  name:"Communication & Diction",        emoji:"🎤", color:"#0277BD", courses:["Public Speaking","Diction","Presentation","Debate","Media Training"] },
      { id:"languages",      name:"School of Languages",            emoji:"🌐", color:"#311B92", courses:["French","Spanish","Arabic","Mandarin","German","Yoruba"] },
    ],
    features:[
      {icon:"💻",t:"School of Technology",d:"Web Dev, Cybersecurity, Data Science, UI/UX"},
      {icon:"📊",t:"Business & Professional",d:"PMP, ACCA, ICAN, CFA — globally recognised"},
      {icon:"🌍",t:"Advanced & International",d:"SAT, IELTS, A-Level, TOEFL preparation"},
      {icon:"🎤",t:"Communication & Diction",d:"Public speaking, presentation, media training"},
      {icon:"🌐",t:"School of Languages",d:"French, Spanish, Arabic, Mandarin and more"},
      {icon:"🏆",t:"Certificates",d:"Digital certificates on course completion"},
    ],
  },
  {
    id:"pre-university", num:"04", emoji:"🏛️",
    name:"Pre-University College",
    short:"IJMB · JUPEB · Pre-Degree · Diploma",
    color:"#BF360C", grad:"135deg,#3E1A00,#BF360C,#E64A19",
    accent:"#FFAB91",
    desc:"Your gateway to 200-level university admission. IJMB, JUPEB and Diploma programmes — rigorous, university-standard, fully online.",
    tags:["IJMB","JUPEB","Diploma","200 Level Entry","Transcripts"],
    applyType:"parent-student",
    programs:["IJMB","JUPEB","Pre-Degree","Diploma"],
    features:[
      {icon:"🎓",t:"IJMB",d:"Direct 200-level entry without JAMB"},
      {icon:"🏛️",t:"JUPEB",d:"University-affiliated pre-degree qualification"},
      {icon:"📘",t:"Pre-Degree",d:"Foundation programme for 100-level entry"},
      {icon:"📜",t:"Diploma",d:"Professional diploma in specialist fields"},
      {icon:"📋",t:"Transcript",d:"Official semester transcript generated automatically"},
      {icon:"🎯",t:"University Placement",d:"Guidance into top Nigerian universities"},
    ],
  },
  {
    id:"services", num:"09", emoji:"🤝",
    name:"Professional Services",
    short:"CV · Admissions · Consulting · Study Abroad",
    color:"#E65100", grad:"135deg,#1A1000,#E65100,#FF6D00",
    accent:"#FFD180",
    desc:"Expert professional services — CV writing, university admission support, scholarship research, study abroad guidance and corporate training.",
    tags:["CV Writing","Admission Help","Scholarships","Study Abroad","Corporate"],
    applyType:"inquiry",
    services:[
      "CV & Resume Writing","University Admission Support","Scholarship Research",
      "Study Abroad Guidance","Corporate Training","Statement of Purpose Writing",
      "Educational Counselling","Document Attestation",
    ],
    features:[
      {icon:"📄",t:"CV Writing",d:"ATS-optimised CVs that get interviews"},
      {icon:"🎓",t:"Admissions Support",d:"Nigerian and international university applications"},
      {icon:"🏆",t:"Scholarship Research",d:"Find and apply for scholarships worldwide"},
      {icon:"🌍",t:"Study Abroad",d:"UK, USA, Canada, Australia full guidance"},
      {icon:"🏢",t:"Corporate Training",d:"Bespoke training for organisations"},
      {icon:"✍️",t:"SOP Writing",d:"Personal statements for postgraduate entry"},
    ],
  },
];

// ─── APPLY FORM ───
function ApplyForm({ school, onClose }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("parent"); // parent | student | self
  const [submitted, setSubmitted] = useState(false);
  const [program, setProgram] = useState("");
  const totalSteps = school.applyType === "inquiry" ? 2 : school.applyType === "student-only" ? 2 : 3;

  const inputStyle = {
    width:"100%", background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.12)", borderRadius:8,
    padding:"12px 14px", color:"#fff", fontSize:13,
    marginBottom:10, outline:"none", fontFamily:"Syne,sans-serif",
    boxSizing:"border-box", transition:"border-color .2s",
  };
  const selectStyle = { ...inputStyle, background:"rgba(11,20,40,0.9)" };
  const labelStyle = { fontSize:11, color:school.accent, fontWeight:700, letterSpacing:1, textTransform:"uppercase", display:"block", marginBottom:5 };

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"48px 24px" }}>
      <div style={{ fontSize:64, marginBottom:16, animation:"floatUp 2s ease-in-out infinite" }}>🎉</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"#fff", marginBottom:8 }}>
        {school.applyType === "inquiry" ? "Inquiry Received!" : "Application Submitted!"}
      </div>
      <p style={{ color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:24 }}>
        {school.applyType === "inquiry"
          ? "Our consultant will contact you within 48 hours via email or WhatsApp."
          : "Our admissions team will review and respond within 72 hours. Check your email for confirmation."}
      </p>
      <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"16px 20px", marginBottom:24, textAlign:"left" }}>
        <div style={{ fontSize:11, color:school.accent, marginBottom:4 }}>Reference Number</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, fontWeight:700, color:"#fff" }}>
          {school.num.replace("–","-")}-{Math.floor(Math.random()*9000+1000)}
        </div>
      </div>
      <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
        <a href={WA_LINK} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", padding:"11px 22px", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp Us</a>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"11px 22px", borderRadius:8, fontSize:13, cursor:"pointer" }}>Close</button>
      </div>
    </div>
  );

  // INQUIRY FORM (Professional Services)
  if (school.applyType === "inquiry") return (
    <div style={{ padding:"8px 0" }}>
      {step === 1 && (
        <div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Full Name *</label>
            <input style={inputStyle} placeholder="Enter your full name" />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Email Address *</label>
            <input style={inputStyle} placeholder="your@email.com" />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Phone / WhatsApp *</label>
            <input style={inputStyle} placeholder="+234..." />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Service Needed *</label>
            <select style={selectStyle}>
              <option value="">Select a service...</option>
              {school.services && school.services.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={()=>setStep(2)} className="btn-glow" style={{ width:"100%", background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"13px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
            Next →
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Describe What You Need *</label>
            <textarea style={{ ...inputStyle, resize:"vertical", minHeight:100, marginBottom:0 }} placeholder="Tell us your goals and what you need help with..." />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Preferred Contact Method</label>
            <select style={selectStyle}>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Either</option>
            </select>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Timeline</label>
            <select style={selectStyle}>
              <option>As soon as possible</option>
              <option>Within 1 week</option>
              <option>Within 1 month</option>
              <option>Flexible</option>
            </select>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep(1)} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"12px", borderRadius:8, fontSize:13, cursor:"pointer" }}>← Back</button>
            <button onClick={()=>setSubmitted(true)} className="btn-glow" style={{ flex:2, background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"12px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              ✅ Submit Inquiry
            </button>
          </div>
          <div style={{ textAlign:"center", marginTop:12, fontSize:11, color:"rgba(255,255,255,0.3)" }}>
            Or reach us directly:
            <a href={WA_LINK} style={{ color:school.accent, marginLeft:6, textDecoration:"none" }}>WhatsApp</a> ·
            <a href={`mailto:${EMAIL}`} style={{ color:school.accent, marginLeft:6, textDecoration:"none" }}>Email</a>
          </div>
        </div>
      )}
    </div>
  );

  // STUDENT-ONLY (Tutorial)
  if (school.applyType === "student-only") return (
    <div style={{ padding:"8px 0" }}>
      {step === 1 && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:8 }}>
            <div><label style={labelStyle}>First Name *</label><input style={inputStyle} placeholder="First name" /></div>
            <div><label style={labelStyle}>Last Name *</label><input style={inputStyle} placeholder="Last name" /></div>
          </div>
          <label style={labelStyle}>Email Address *</label>
          <input style={inputStyle} placeholder="your@email.com" />
          <label style={labelStyle}>Phone / WhatsApp *</label>
          <input style={inputStyle} placeholder="+234..." />
          <label style={labelStyle}>Date of Birth *</label>
          <input type="date" style={inputStyle} />
          <label style={labelStyle}>State of Origin *</label>
          <input style={inputStyle} placeholder="State" />
          <button onClick={()=>setStep(2)} className="btn-glow" style={{ width:"100%", background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"13px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", marginTop:8 }}>
            Next →
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label style={labelStyle}>Select Exam Track *</label>
          <select style={selectStyle}>
            <option value="">Choose your exam...</option>
            {school.tracks && school.tracks.map(t=><option key={t}>{t}</option>)}
          </select>
          <label style={labelStyle}>Enrollment Package</label>
          <select style={selectStyle}>
            <option>Full Package — All Subjects</option>
            <option>Bundle — 2-4 Subjects</option>
            <option>Single Subject</option>
          </select>
          <label style={labelStyle}>How Did You Hear About Us?</label>
          <select style={selectStyle}>
            <option>Social Media</option><option>Friend Referral</option>
            <option>Google Search</option><option>School</option><option>Other</option>
          </select>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"12px", marginBottom:12 }}>
            <div style={{ fontSize:11, color:school.accent, fontWeight:700, marginBottom:4 }}>📋 Payment</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>After submission, you will receive payment instructions via email and WhatsApp. Access is enabled once payment is confirmed.</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep(1)} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"12px", borderRadius:8, fontSize:13, cursor:"pointer" }}>← Back</button>
            <button onClick={()=>setSubmitted(true)} className="btn-glow" style={{ flex:2, background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"12px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              Submit Application ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // PARENT-STUDENT (School College, Pre-University)
  return (
    <div style={{ padding:"8px 0" }}>
      {/* Application type toggle */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Application Type *</label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[["parent","👨‍👩‍👧 Parent / Guardian"],["self","🎓 Self-Sponsored"]].map(([v,l])=>(
                <div key={v} onClick={()=>setType(v)} style={{ border:`2px solid ${type===v?school.color:"rgba(255,255,255,0.1)"}`, borderRadius:8, padding:"12px", cursor:"pointer", background:type===v?`${school.color}18`:"rgba(255,255,255,0.03)", textAlign:"center", fontSize:13, color:type===v?"#fff":"rgba(255,255,255,0.6)", fontWeight:type===v?700:400, transition:"all .2s" }}>{l}</div>
              ))}
            </div>
          </div>
          <label style={labelStyle}>Student First Name *</label>
          <input style={inputStyle} placeholder="First name" />
          <label style={labelStyle}>Student Last Name *</label>
          <input style={inputStyle} placeholder="Last name" />
          <label style={labelStyle}>Date of Birth *</label>
          <input type="date" style={inputStyle} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div>
              <label style={labelStyle}>Gender *</label>
              <select style={selectStyle}><option>Male</option><option>Female</option></select>
            </div>
            <div>
              <label style={labelStyle}>State of Origin *</label>
              <input style={inputStyle} placeholder="State" />
            </div>
          </div>
          <label style={labelStyle}>Student Email / Phone *</label>
          <input style={inputStyle} placeholder="Email or phone" />
          <button onClick={()=>setStep(2)} className="btn-glow" style={{ width:"100%", background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"13px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", marginTop:4 }}>
            Next: {type==="parent"?"Guardian Details":"Academic Info"} →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          {type === "parent" ? (
            <div>
              <label style={labelStyle}>Guardian Full Name *</label>
              <input style={inputStyle} placeholder="Guardian name" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div><label style={labelStyle}>Relationship *</label>
                  <select style={selectStyle}><option>Father</option><option>Mother</option><option>Uncle</option><option>Aunt</option><option>Guardian</option></select>
                </div>
                <div><label style={labelStyle}>Phone/WhatsApp *</label>
                  <input style={inputStyle} placeholder="+234..." />
                </div>
              </div>
              <label style={labelStyle}>Guardian Email *</label>
              <input style={inputStyle} placeholder="guardian@email.com" />
              <div style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:8, padding:"10px 12px", marginBottom:10 }}>
                <div style={{ fontSize:11, color:"#C9A84C", fontWeight:700, marginBottom:3 }}>👨‍👩‍👧 Parent Portal</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>A parent dashboard will be automatically created and emailed to you on admission approval. You can register multiple children under one account.</div>
              </div>
            </div>
          ) : (
            <div>
              <label style={labelStyle}>Your Email *</label>
              <input style={inputStyle} placeholder="your@email.com" />
              <label style={labelStyle}>Your Phone / WhatsApp *</label>
              <input style={inputStyle} placeholder="+234..." />
              <label style={labelStyle}>Occupation</label>
              <input style={inputStyle} placeholder="Current occupation" />
            </div>
          )}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep(1)} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"12px", borderRadius:8, fontSize:13, cursor:"pointer" }}>← Back</button>
            <button onClick={()=>setStep(3)} className="btn-glow" style={{ flex:2, background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"12px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              Next: Academic Info →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          {school.programs && (
            <><label style={labelStyle}>Programme *</label>
            <select style={selectStyle} value={program} onChange={e=>setProgram(e.target.value)}>
              <option value="">Select programme...</option>
              {school.programs.map(p=><option key={p}>{p}</option>)}
            </select></>
          )}
          {school.departments && (
            <><label style={labelStyle}>Department (SSS) *</label>
            <select style={selectStyle}>
              <option value="">Select department...</option>
              {school.departments.map(d=><option key={d}>{d}</option>)}
            </select></>
          )}
          <label style={labelStyle}>Class Applying For *</label>
          <select style={selectStyle}>
            <option value="">Select class...</option>
            {school.id === "school-college"
              ? ["JSS1","JSS2","JSS3","SS1","SS2","SS3"].map(c=><option key={c}>{c}</option>)
              : school.programs && school.programs.map(p=><option key={p}>{p}</option>)}
          </select>
          <label style={labelStyle}>Previous School</label>
          <input style={inputStyle} placeholder="Name of previous school" />
          <label style={labelStyle}>How Did You Hear About Us?</label>
          <select style={selectStyle}>
            <option>Social Media</option><option>Friend Referral</option>
            <option>Google</option><option>School Partnership</option><option>Other</option>
          </select>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
            <div style={{ fontSize:11, color:school.accent, fontWeight:700, marginBottom:3 }}>💳 Payment Info</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>After admission approval, you will receive payment details. Student and parent portals are activated automatically after payment confirmation by admin.</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep(2)} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"12px", borderRadius:8, fontSize:13, cursor:"pointer" }}>← Back</button>
            <button onClick={()=>setSubmitted(true)} className="btn-glow" style={{ flex:2, background:`linear-gradient(135deg,${school.color},${school.color}cc)`, color:"#fff", border:"none", padding:"12px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              🎓 Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SCHOOL PAGE ───
function SchoolPage({ school, onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [showSubSchool, setShowSubSchool] = useState(null);

  return (
    <div className="page-enter" style={{ fontFamily:"'Syne',sans-serif", background:"#050A14", minHeight:"100vh" }}>
      {/* Sticky nav */}
      <div style={{ padding:"14px 20px", background:"rgba(5,10,20,0.95)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:200 }}>
        <button onClick={onBack} className="btn-glow" style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"8px 18px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
          ← Back
        </button>
        <div style={{ flex:1, fontSize:12, color:"rgba(255,255,255,0.4)" }}>SAMPACE INSTITUTE › {school.name}</div>
        <button onClick={()=>setShowForm(true)} className="btn-glow" style={{ background:`linear-gradient(135deg,${school.color},${school.color}cc)`, border:"none", color:"#fff", padding:"8px 18px", borderRadius:8, fontSize:12, cursor:"pointer", fontWeight:700 }}>
          {school.applyType === "inquiry" ? "✉️ Inquire" : "Apply Now"}
        </button>
      </div>

      {/* Hero */}
      <div style={{ background:`linear-gradient(${school.grad})`, padding:"60px 20px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <Particles count={15} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ width:80, height:80, borderRadius:22, background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, margin:"0 auto 16px", animation:"floatUp 4s ease-in-out infinite", boxShadow:`0 0 40px ${school.color}50` }}>{school.emoji}</div>
          {school.num !== "00" && <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:4, marginBottom:6, textTransform:"uppercase", fontFamily:"'Space Mono',monospace" }}>SCHOOL {school.num}</div>}
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,5vw,52px)", fontWeight:900, color:"#fff", margin:"0 0 8px", lineHeight:1.05 }}>{school.name}</h1>
          <div style={{ fontSize:13, color:`${school.accent}`, marginBottom:14, letterSpacing:1, fontWeight:600 }}>{school.short}</div>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.8, maxWidth:500, margin:"0 auto 24px" }}>{school.desc}</p>
          <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            {school.tags.map(t=>(
              <span key={t} style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(4px)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:500 }}>{t}</span>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setShowForm(true)} className="btn-glow" style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"13px 32px", borderRadius:8, fontSize:14, fontWeight:800, cursor:"pointer" }}>
              {school.applyType === "inquiry" ? "✉️ Make Inquiry" : "📋 Apply Now"}
            </button>
            <a href={WA_LINK} className="btn-glow" style={{ background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", color:"#fff", padding:"13px 24px", borderRadius:8, fontSize:14, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div style={{ padding:"36px 16px", maxWidth:700, margin:"0 auto" }}>
        {/* Sub-schools for Digital Campus */}
        {school.subSchools && (
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:11, color:school.accent, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:16, textAlign:"center" }}>Click a School to Explore</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {school.subSchools.map(sub=>(
                <div key={sub.id} className="card-hover" onClick={()=>setShowSubSchool(showSubSchool===sub.id?null:sub.id)}
                  style={{ background:`${sub.color}18`, border:`2px solid ${showSubSchool===sub.id?sub.color:"rgba(255,255,255,0.08)"}`, borderRadius:12, padding:"18px 14px", transition:"all .3s" }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>{sub.emoji}</div>
                  <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:4 }}>{sub.name}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                    {sub.courses.slice(0,3).map(c=>(
                      <span key={c} style={{ background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)", padding:"2px 7px", borderRadius:100, fontSize:9 }}>{c}</span>
                    ))}
                    <span style={{ background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)", padding:"2px 7px", borderRadius:100, fontSize:9 }}>+{sub.courses.length-3}</span>
                  </div>
                  {showSubSchool === sub.id && (
                    <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                      {sub.courses.map(c=>(
                        <div key={c} style={{ fontSize:12, color:"rgba(255,255,255,0.6)", padding:"4px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>→ {c}</div>
                      ))}
                      <button onClick={()=>setShowForm(true)} className="btn-glow" style={{ width:"100%", background:`linear-gradient(135deg,${sub.color},${sub.color}cc)`, border:"none", color:"#fff", padding:"10px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer", marginTop:10 }}>
                        Enroll in {sub.name} →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,4vw,32px)", color:"#fff", textAlign:"center", marginBottom:24, fontWeight:700 }}>
          What We <span className="shimmer-text">Offer</span>
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:32 }}>
          {school.features.map((f,i)=>(
            <div key={i} className="card-hover" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"18px 14px", borderTop:`3px solid ${school.color}`, animationDelay:`${i*0.1}s` }}>
              <div style={{ fontSize:26, marginBottom:8 }}>{f.icon}</div>
              <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:4 }}>{f.t}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:1.5 }}>{f.d}</div>
            </div>
          ))}
        </div>

        {/* Student Login */}
        {(school.applyType === "parent-student" || school.applyType === "student-only") && (
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"24px 18px", marginBottom:24 }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#fff", fontWeight:700, marginBottom:4 }}>Already Enrolled? Login</h3>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:16 }}>Access your classes, timetable, assignments and report cards.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <div style={{ fontSize:11, color:school.accent, fontWeight:700, letterSpacing:1, marginBottom:5, textTransform:"uppercase" }}>Student ID / Admission No.</div>
                <input style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"11px 12px", color:"#fff", fontSize:13, outline:"none", fontFamily:"'Space Mono',monospace", boxSizing:"border-box" }} placeholder="e.g. SC/2026/0001" />
              </div>
              <div>
                <div style={{ fontSize:11, color:school.accent, fontWeight:700, letterSpacing:1, marginBottom:5, textTransform:"uppercase" }}>Password</div>
                <input type="password" style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"11px 12px", color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" }} placeholder="••••••••" />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <button className="btn-glow" style={{ background:`linear-gradient(135deg,${school.color},${school.color}cc)`, border:"none", color:"#fff", padding:"12px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                🎓 Student Login
              </button>
              <button className="btn-glow" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"12px", borderRadius:8, fontSize:13, cursor:"pointer" }}>
                👨‍👩‍👧 Parent Login
              </button>
            </div>
          </div>
        )}

        {/* Quick contact */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"20px 16px", textAlign:"center" }}>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:12 }}>Have a question? Contact us directly</div>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={WA_LINK} className="btn-glow" style={{ background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.25)", color:"#fff", padding:"9px 18px", borderRadius:8, fontSize:12, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, fontWeight:600 }}>
              💬 WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-glow" style={{ background:"rgba(21,101,192,0.15)", border:"1px solid rgba(21,101,192,0.25)", color:"#fff", padding:"9px 18px", borderRadius:8, fontSize:12, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, fontWeight:600 }}>
              📧 Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showForm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={()=>setShowForm(false)}>
          <div style={{ background:"#0D1829", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:600, maxHeight:"90vh", overflow:"auto", padding:"28px 20px 40px", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"none", animation:"fadeSlideUp .4s ease" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#fff" }}>
                  {school.applyType === "inquiry" ? "Make an Inquiry" : `Apply — ${school.name}`}
                </div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>SAMPACE INSTITUTE</div>
              </div>
              <button onClick={()=>setShowForm(false)} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", width:36, height:36, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
            </div>
            <ApplyForm school={school} onClose={()=>setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOMEPAGE ───
function Homepage({ onSelect }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:"#050A14", minHeight:"100vh" }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        padding:"14px 20px", position:"fixed", top:0, left:0, right:0, zIndex:300,
        background: scrollY > 50 ? "rgba(5,10,20,0.97)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition:"all .4s ease",
        display:"flex", justifyContent:"space-between", alignItems:"center",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:900, color:"#0B1F3A", boxShadow:"0 4px 14px rgba(201,168,76,0.35)", animation:"glow 4s ease-in-out infinite" }}>SI</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, color:"#C9A84C", letterSpacing:2 }}>SAMPACE</div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,0.3)", letterSpacing:2, textTransform:"uppercase" }}>INSTITUTE</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <a href={WA_LINK} className="btn-glow" style={{ background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.2)", color:"#fff", padding:"7px 14px", borderRadius:6, fontSize:11, textDecoration:"none", fontWeight:600 }}>💬 WhatsApp</a>
          <button onClick={()=>onSelect(SCHOOLS[0])} className="btn-glow" style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"7px 16px", borderRadius:6, fontSize:11, fontWeight:800, cursor:"pointer" }}>Apply Now</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 16px 60px", position:"relative", overflow:"hidden", textAlign:"center" }}>
        {/* Animated background */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 20% 50%,rgba(21,101,192,0.12) 0%,transparent 60%), radial-gradient(ellipse at 80% 30%,rgba(201,168,76,0.08) 0%,transparent 50%), radial-gradient(ellipse at 50% 80%,rgba(123,31,162,0.1) 0%,transparent 60%)" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
        <Particles count={30} />

        {/* Scan line effect */}
        <div style={{ position:"absolute", left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)", animation:"scanLine 6s linear infinite", zIndex:2, pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:3, maxWidth:800 }}>
          {/* Orbit visual */}
          <div style={{ marginBottom:32 }}>
            <OrbitVisual />
          </div>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(201,168,76,0.35)", background:"rgba(201,168,76,0.06)", backdropFilter:"blur(8px)", borderRadius:100, padding:"6px 18px", fontSize:11, color:"#C9A84C", letterSpacing:2, textTransform:"uppercase", marginBottom:24, animation:"borderFlow 3s ease-in-out infinite" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"pulse 2s ease-in-out infinite" }} />
            Launching August 2026
          </div>

          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(42px,9vw,90px)", fontWeight:900, lineHeight:0.9, marginBottom:16, letterSpacing:-2 }}>
            <span style={{ display:"block", background:"linear-gradient(135deg,#fff,#64B5F6,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:4 }}>SAMPACE</span>
            <span className="shimmer-text" style={{ fontStyle:"italic" }}>Institute</span>
          </h1>

          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(10px,1.8vw,13px)", letterSpacing:6, color:"rgba(255,255,255,0.3)", marginBottom:20, textTransform:"uppercase" }}>Where Excellence Begins</div>

          <p style={{ fontSize:"clamp(14px,2vw,16px)", color:"rgba(255,255,255,0.6)", lineHeight:1.8, maxWidth:540, margin:"0 auto 36px" }}>
            Nine world-class schools. One powerful platform. From secondary school to professional certifications — your complete educational journey, entirely online.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:56 }}>
            <button onClick={()=>document.getElementById("schools").scrollIntoView({behavior:"smooth"})} className="btn-glow" style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:"0 8px 32px rgba(21,101,192,0.4)" }}>
              Explore Schools →
            </button>
            <button onClick={()=>onSelect(SCHOOLS[0])} className="btn-glow" style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:800, cursor:"pointer" }}>
              Apply Now
            </button>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:32, justifyContent:"center", flexWrap:"wrap", paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <CountUp target="9" suffix="" label="Schools" />
            <CountUp target="20" suffix="+" label="Programmes" />
            <CountUp target="100" suffix="%" label="Online" />
            <CountUp target="2026" suffix="" label="Est. Year" />
          </div>
        </div>
      </section>

      {/* ─── SCHOOLS ─── */}
      <section id="schools" style={{ padding:"80px 16px", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#C9A84C", letterSpacing:4, textTransform:"uppercase", marginBottom:12 }}>Our Academic Portfolio</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.05 }}>
            Nine <span className="shimmer-text" style={{ fontStyle:"italic" }}>Schools.</span><br/>One Vision.
          </h2>
        </div>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
          {SCHOOLS.map((s,i)=>(
            <div key={s.id} className="card-hover"
              onMouseEnter={()=>setActiveCard(s.id)}
              onMouseLeave={()=>setActiveCard(null)}
              onClick={()=>onSelect(s)}
              style={{
                background:`linear-gradient(135deg,${s.bg1||s.color}28,${s.color}18)`,
                border:`1px solid ${activeCard===s.id?s.color:"rgba(255,255,255,0.07)"}`,
                borderLeft:`4px solid ${s.color}`,
                borderRadius:14, padding:"20px 18px",
                transition:"all .3s ease",
                boxShadow:activeCard===s.id?`0 8px 40px ${s.color}25`:"none",
                animation:`fadeSlideIn .6s ${i*0.08}s ease both`,
              }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:`${s.color}22`, border:`1px solid ${s.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0, transition:"transform .3s", transform:activeCard===s.id?"scale(1.12) rotate(5deg)":"scale(1)" }}>{s.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:`${s.color}`, letterSpacing:2, marginBottom:3, textTransform:"uppercase", fontWeight:700 }}>School {s.num}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(15px,3vw,19px)", fontWeight:700, color:"#fff", marginBottom:4, lineHeight:1.2 }}>{s.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", lineHeight:1.4, marginBottom:8 }}>{s.short}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {s.tags.slice(0,3).map(t=>(
                      <span key={t} style={{ background:`${s.color}18`, border:`1px solid ${s.color}30`, color:s.accent||s.color, padding:"2px 8px", borderRadius:100, fontSize:9, fontWeight:600 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ color:s.color, fontSize:24, transition:"transform .3s", transform:activeCard===s.id?"translateX(4px)":"translateX(0)" }}>›</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section style={{ padding:"60px 16px", maxWidth:600, margin:"0 auto" }}>
        <div style={{ background:"linear-gradient(135deg,rgba(21,101,192,0.08),rgba(201,168,76,0.06))", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"32px 24px", textAlign:"center", animation:"borderFlow 4s ease-in-out infinite" }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#C9A84C", letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Get In Touch</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,4vw,30px)", color:"#fff", fontWeight:700, marginBottom:8 }}>Not sure where to start?</h3>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7, marginBottom:24 }}>Our admissions team will guide you to the right school and programme for your goals.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href={WA_LINK} className="btn-glow" style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.2)", borderRadius:12, padding:"14px 18px", textDecoration:"none", transition:"all .3s" }}>
              <span style={{ fontSize:26 }}>💬</span>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:11, color:"#10B981", fontWeight:800, letterSpacing:1, textTransform:"uppercase" }}>WhatsApp</div>
                <div style={{ fontSize:13, color:"#fff", fontWeight:500 }}>Chat with our admissions team</div>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-glow" style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(21,101,192,0.1)", border:"1px solid rgba(21,101,192,0.2)", borderRadius:12, padding:"14px 18px", textDecoration:"none" }}>
              <span style={{ fontSize:26 }}>📧</span>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:11, color:"#64B5F6", fontWeight:800, letterSpacing:1, textTransform:"uppercase" }}>Email</div>
                <div style={{ fontSize:13, color:"#fff", fontWeight:500 }}>{EMAIL}</div>
              </div>
            </a>
          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:40, paddingTop:24, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"rgba(201,168,76,0.6)", fontWeight:700, marginBottom:6 }}>SAMPACE INSTITUTE</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", lineHeight:1.8, letterSpacing:0.5 }}>
            School College · Tutorial & Exam · Digital Campus · Pre-University · Professional Services
          </div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.12)", marginTop:10 }}>
            © 2026 SAMPACE INSTITUTE · Grand Opening August 2026 · sampacecampus.com.ng
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a href={WA_LINK} style={{ position:"fixed", bottom:24, right:20, width:52, height:52, background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, zIndex:999, boxShadow:"0 8px 24px rgba(37,211,102,0.4)", animation:"glow 3s ease-in-out infinite", textDecoration:"none" }}>
        💬
      </a>
    </div>
  );
}

// ─── ROOT APP ───
function App() {
  const [page, setPage] = useState(null);
  const handleSelect = (school) => { setPage(school); window.scrollTo(0,0); };
  const handleBack  = () => { setPage(null); window.scrollTo(0,0); };
  useEffect(() => {
    const hash = window.location.hash.replace("#","");
    if (hash) { const found = SCHOOLS.find(s=>s.id===hash); if(found) setPage(found); }
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {page ? <SchoolPage school={page} onBack={handleBack} /> : <Homepage onSelect={handleSelect} />}
    </>
  );
}

const root = document.getElementById("root");
if (root) ReactDOM.createRoot(root).render(<App />);
