import { useState } from "react";

// ─── COLORS ───
const C = {
  navy:   "#0B1F3A",
  blue:   "#1565C0",
  sky:    "#42A5F5",
  light:  "#E3F2FD",
  gold:   "#C9A84C",
  white:  "#FFFFFF",
  cream:  "#F8FAFF",
  slate:  "#64748B",
  border: "#E2E8F0",
  green:  "#10B981",
  amber:  "#F59E0B",
  red:    "#EF4444",
};

// ─── MOCK DATA ───
const subjects = [
  { name:"English Language", teacher:"Mrs. Adeyemi",  score:78, grade:"B", next:"Mon 8:00am"  },
  { name:"Mathematics",       teacher:"Mr. Okafor",   score:85, grade:"A", next:"Mon 10:00am" },
  { name:"Biology",           teacher:"Mrs. Nwosu",   score:72, grade:"B", next:"Tue 8:00am"  },
  { name:"Chemistry",         teacher:"Mr. Bello",    score:68, grade:"C", next:"Tue 10:00am" },
  { name:"Physics",           teacher:"Mrs. Eze",     score:80, grade:"A", next:"Wed 8:00am"  },
  { name:"Civic Education",   teacher:"Mr. Adeleke",  score:90, grade:"A", next:"Wed 10:00am" },
];

const timetable = {
  Monday:    ["English 8am","Maths 10am","Break","Physics 1pm","Chemistry 3pm"],
  Tuesday:   ["Biology 8am","Chemistry 10am","Break","English 1pm","Maths 3pm"],
  Wednesday: ["Physics 8am","Civic Ed 10am","Break","Biology 1pm","English 3pm"],
  Thursday:  ["Maths 8am","Biology 10am","Break","Physics 1pm","Civic Ed 3pm"],
  Friday:    ["Chemistry 8am","English 10am","Break","Maths 1pm","Sports 3pm"],
};

const assignments = [
  { subject:"Mathematics",  title:"Algebra Worksheet Set 3",  due:"Tomorrow",  status:"pending"   },
  { subject:"English",      title:"Essay: My Future Career",  due:"3 days",    status:"pending"   },
  { subject:"Biology",      title:"Cell Division Diagram",    due:"Submitted", status:"submitted" },
  { subject:"Physics",      title:"Velocity Lab Report",      due:"Next week", status:"pending"   },
];

const announcements = [
  { title:"Mid-Term Exam Schedule Released",  date:"Today",      icon:"📋", color:C.blue  },
  { title:"WAEC Mock Registration — Deadline Friday", date:"Yesterday", icon:"⚠️", color:C.amber },
  { title:"Virtual Lab: Chemistry Practical",  date:"2 days ago", icon:"🧪", color:C.green },
  { title:"School fees reminder — 2nd term",   date:"3 days ago", icon:"💰", color:C.red   },
];

const childData = {
  name:"Adaeze Okonkwo", class:"SS2 Science A", id:"SMP/2026/0124",
  attendance:88, gpa:3.6, feesPaid:true, nextExam:"Mathematics — Friday 8am",
  subjects: subjects,
  fees: [
    { term:"2nd Term 2026", amount:85000, status:"paid",    date:"Jan 15"  },
    { term:"1st Term 2026", amount:85000, status:"paid",    date:"Sep 10"  },
    { term:"3rd Term 2025", amount:75000, status:"paid",    date:"Apr 5"   },
  ],
  reports:[
    { term:"1st Term 2026", avg:76, position:"4th/32",  status:"available" },
    { term:"3rd Term 2025", avg:72, position:"6th/32",  status:"available" },
  ]
};

// ─── HELPERS ───
function gradeColor(g) { return g==="A"?C.green:g==="B"?C.blue:g==="C"?C.amber:C.red; }
function Badge({ text, color, bg }) {
  return <span style={{ background:bg||`${color}18`, color, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600 }}>{text}</span>;
}
function Card({ children, style={} }) {
  return <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", ...style }}>{children}</div>;
}
function CardHeader({ title, action, actionLabel }) {
  return (
    <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div style={{ fontWeight:700, fontSize:15, color:C.navy }}>{title}</div>
      {action && <button onClick={action} style={{ fontSize:12, color:C.blue, border:"none", background:"none", cursor:"pointer", fontWeight:600 }}>{actionLabel} →</button>}
    </div>
  );
}

// ─── NAV ───
function Nav({ view, setView, role, setRole }) {
  const [scrolled, setScrolled] = useState(false);
  return (
    <nav style={{
      position:"sticky", top:0, zIndex:200,
      background:"rgba(11,31,58,0.97)", backdropFilter:"blur(16px)",
      borderBottom:"1px solid rgba(100,181,246,0.15)",
      padding:"0 40px", height:60,
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:38, height:38, background:`linear-gradient(135deg,${C.blue},${C.sky})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue'", fontSize:15, color:"#fff" }}>SC</div>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, letterSpacing:3, background:`linear-gradient(90deg,${C.sky},${C.gold})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>SCHOOL COLLEGE</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:2 }}>SAMPACE INSTITUTE</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:4 }}>
        {["landing","admission","student","parent"].map(v=>(
          <button key={v} onClick={()=>setView(v)} style={{
            background: view===v ? `linear-gradient(135deg,${C.blue},${C.sky})` : "transparent",
            border:"none", color: view===v ? "#fff" : "rgba(255,255,255,0.55)",
            padding:"6px 16px", borderRadius:6, fontSize:12, fontWeight:600,
            cursor:"pointer", textTransform:"capitalize", letterSpacing:0.5,
          }}>
            {v==="landing"?"🏫 About":v==="admission"?"📋 Apply":v==="student"?"🎓 Student Portal":"👨‍👩‍👧 Parent Portal"}
          </button>
        ))}
      </div>

      <button style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"8px 20px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>
        Apply Now
      </button>
    </nav>
  );
}

// ─── LANDING PAGE ───
function LandingPage({ setView }) {
  const features = [
    { icon:"🎓", title:"Full Secondary Curriculum", desc:"JSS1–SS3. Nigeria NERDC-aligned. Sciences, Humanities & Business departments." },
    { icon:"🧪", title:"Virtual Science Laboratory", desc:"Interactive 3D lab simulations for Physics, Chemistry and Biology practicals." },
    { icon:"📚", title:"Digital Library", desc:"Thousands of textbooks, past questions and e-resources per subject and class." },
    { icon:"📝", title:"CBT Exam Practice", desc:"Timed past-question CBT practice aligned to WAEC, NECO, JAMB and BECE." },
    { icon:"📊", title:"Real-Time Report Cards", desc:"Termly report cards auto-generated. Parents view online anytime." },
    { icon:"👨‍👩‍👧", title:"Parent Portal", desc:"Parents track attendance, performance, fees and communicate with teachers." },
    { icon:"🏆", title:"Extracurricular Activities", desc:"Drama, Debate, Sports, Scouts, Quiz Club and more — online and engaging." },
    { icon:"🤖", title:"AI Study Assistant", desc:"Built-in AI tutor helps students understand topics and practice questions." },
  ];
  const levels = [
    { name:"Junior Secondary", classes:["JSS 1","JSS 2","JSS 3"], color:C.blue,   icon:"🏫" },
    { name:"Senior Secondary", classes:["SS 1","SS 2","SS 3"],   color:"#7B1FA2", icon:"🎓" },
  ];
  const depts = [
    { name:"Sciences",   subjects:["Biology","Chemistry","Physics","Further Maths","Agric Science","Computer Science"], color:"#00695C", icon:"🔬" },
    { name:"Humanities", subjects:["Literature","Government","History","CRS/IRS","Geography","Fine Art"], color:"#1565C0", icon:"📖" },
    { name:"Business",   subjects:["Economics","Commerce","Accounting","Office Practice","Marketing"], color:"#E65100", icon:"📊" },
  ];

  return (
    <div style={{ background:C.cream }}>
      {/* Hero */}
      <section style={{ background:`linear-gradient(160deg,${C.navy} 0%,#0D2855 60%,#1565C0 100%)`, padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(100,181,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(100,181,246,0.05) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div style={{ position:"relative", zIndex:2, maxWidth:760, margin:"0 auto" }}>
          <div style={{ display:"inline-block", border:`1px solid ${C.sky}`, color:C.sky, padding:"5px 18px", borderRadius:100, fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:24 }}>
            🎓 Virtual & Physical Campus
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,7vw,80px)", fontWeight:700, color:"#fff", lineHeight:0.95, letterSpacing:-1, marginBottom:16 }}>
            <span style={{ background:`linear-gradient(135deg,#fff,${C.sky})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>School</span>{" "}
            <span style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>College</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:16, lineHeight:1.8, maxWidth:540, margin:"0 auto 36px" }}>
            Nigeria's premier online secondary school. JSS1 to SS3. Fully blended curriculum. Virtual labs, live classes and world-class academic standards — all from home.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setView("admission")} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"14px 36px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:`0 8px 28px rgba(21,101,192,0.5)` }}>
              Apply for Admission →
            </button>
            <button style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"14px 32px", borderRadius:8, fontSize:14, cursor:"pointer" }}>
              📧 Make Inquiry
            </button>
          </div>
          <div style={{ display:"flex", gap:40, justifyContent:"center", marginTop:56, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {[["JSS1–SS3","Class Levels"],["3","Departments"],["40+","Subjects"],["100%","Online"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:40, color:C.gold, letterSpacing:2, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Levels */}
      <section style={{ padding:"72px 48px", background:C.white }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, letterSpacing:3, color:C.gold, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Academic Structure</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy }}>Two Schools, <em style={{ color:C.blue, fontStyle:"italic" }}>One Excellence</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:40 }}>
            {levels.map(l=>(
              <div key={l.name} style={{ border:`2px solid ${l.color}25`, borderRadius:14, padding:"32px", borderTop:`4px solid ${l.color}` }}>
                <div style={{ fontSize:36, marginBottom:12 }}>{l.icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:C.navy, marginBottom:16 }}>{l.name}</h3>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {l.classes.map(c=>(
                    <div key={c} style={{ background:`${l.color}12`, border:`1px solid ${l.color}30`, color:l.color, padding:"8px 18px", borderRadius:8, fontSize:14, fontWeight:600 }}>{c}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Departments */}
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:24, textAlign:"center" }}>Senior Secondary <em style={{ fontStyle:"italic", color:C.blue }}>Departments</em></h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {depts.map(d=>(
              <div key={d.name} style={{ background:C.cream, borderRadius:12, padding:"24px", border:`1px solid ${d.color}20`, borderTop:`3px solid ${d.color}` }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{d.icon}</div>
                <div style={{ fontWeight:700, fontSize:16, color:C.navy, marginBottom:12 }}>{d.name} Track</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {d.subjects.map(s=>(
                    <span key={s} style={{ background:`${d.color}10`, color:d.color, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:500 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:"72px 48px", background:C.cream }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, letterSpacing:3, color:C.gold, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Platform Features</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy }}>Everything Your Child <em style={{ color:C.blue, fontStyle:"italic" }}>Needs</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
            {features.map(f=>(
              <div key={f.title} style={{ background:C.white, borderRadius:12, padding:"24px 20px", border:`1px solid ${C.border}`, transition:"all .25s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 8px 28px rgba(21,101,192,0.1)`; e.currentTarget.style.borderColor=`${C.blue}40`; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=C.border; }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:6, lineHeight:1.3 }}>{f.title}</div>
                <div style={{ fontSize:12, color:C.slate, lineHeight:1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg,${C.blue},${C.navy})`, padding:"72px 48px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:56, color:"#fff", letterSpacing:3, marginBottom:12 }}>READY TO ENROLL?</h2>
        <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:440, margin:"0 auto 32px", lineHeight:1.7 }}>Admission is open for the 2026/2027 academic session. Apply today and secure your child's place.</p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>setView("admission")} style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"14px 40px", borderRadius:8, fontSize:14, fontWeight:800, cursor:"pointer" }}>
            📋 Start Application
          </button>
          <a href="https://wa.me/" style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", padding:"14px 32px", borderRadius:8, fontSize:14, cursor:"pointer", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
            💬 WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  );
}

// ─── ADMISSION FORM ───
function AdmissionForm({ setView }) {
  const [step, setStep] = useState(1);
  const [sponsor, setSponsor] = useState("parent");
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 4;

  const steps = ["Student Details","Parent / Guardian","Academic Info","Documents & Submit"];

  if (submitted) return (
    <div style={{ background:C.cream, minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
      <div style={{ background:C.white, borderRadius:16, padding:"56px 48px", textAlign:"center", maxWidth:520, boxShadow:"0 16px 48px rgba(0,0,0,0.08)" }}>
        <div style={{ width:72, height:72, background:"rgba(16,185,129,0.12)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px" }}>✅</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:C.navy, marginBottom:8 }}>Application Submitted!</h2>
        <p style={{ color:C.slate, lineHeight:1.7, marginBottom:24 }}>Your application has been received. Our admissions team will review and respond within <strong>48 hours</strong>. Check your email for a confirmation.</p>
        <div style={{ background:C.cream, borderRadius:10, padding:"16px 20px", marginBottom:28, textAlign:"left" }}>
          <div style={{ fontSize:12, color:C.slate, marginBottom:4 }}>Application Reference</div>
          <div style={{ fontFamily:"monospace", fontSize:18, fontWeight:700, color:C.blue }}>APP-{Math.floor(Math.random()*9000)+1000}</div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button onClick={()=>setView("landing")} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"10px 24px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:600 }}>← Back to School</button>
          <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:600 }}>Check Status</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"40px 48px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <button onClick={()=>setView("landing")} style={{ background:"none", border:"none", color:C.slate, fontSize:13, cursor:"pointer", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>← Back to School College</button>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:700, color:C.navy, marginBottom:4 }}>
            Admission <em style={{ fontStyle:"italic", color:C.blue }}>Application</em>
          </h1>
          <div style={{ fontSize:13, color:C.slate }}>SAMPACE INSTITUTE · School College · 2026/2027 Session</div>
        </div>

        {/* Progress */}
        <div style={{ background:C.white, borderRadius:12, padding:"20px 28px", marginBottom:24, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:0 }}>
            {steps.map((s,i)=>(
              <div key={i} style={{ flex:1, display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                  <div style={{
                    width:36, height:36, borderRadius:"50%",
                    background: i+1<step ? C.green : i+1===step ? `linear-gradient(135deg,${C.blue},${C.sky})` : C.cream,
                    border: i+1>step ? `2px solid ${C.border}` : "none",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, color: i+1<=step ? "#fff" : C.slate, fontWeight:700,
                  }}>{i+1<step?"✓":i+1}</div>
                  <div style={{ fontSize:11, color:i+1===step?C.blue:C.slate, marginTop:6, fontWeight:i+1===step?700:400, textAlign:"center", whiteSpace:"nowrap" }}>{s}</div>
                </div>
                {i<steps.length-1 && <div style={{ height:2, flex:1, background:i+1<step?C.green:C.border, margin:"0 4px", marginBottom:20 }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor toggle */}
        {step===1 && (
          <div style={{ background:C.white, borderRadius:12, padding:"20px 28px", marginBottom:16, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:13, fontWeight:600, color:C.navy, marginBottom:12 }}>Application Type</div>
            <div style={{ display:"flex", gap:12 }}>
              {[["parent","👨‍👩‍👧 Parent / Guardian Sponsored"],["self","🎓 Self-Sponsored Student"]].map(([v,l])=>(
                <button key={v} onClick={()=>setSponsor(v)} style={{
                  flex:1, padding:"12px", borderRadius:8, cursor:"pointer",
                  background: sponsor===v ? `linear-gradient(135deg,${C.blue},${C.sky})` : C.cream,
                  border: sponsor===v ? "none" : `1px solid ${C.border}`,
                  color: sponsor===v ? "#fff" : C.navy,
                  fontSize:13, fontWeight:600,
                }}>{l}</button>
              ))}
            </div>
          </div>
        )}

        {/* Form Steps */}
        <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"20px 28px" }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.gold, letterSpacing:2 }}>STEP {step} OF {totalSteps}</div>
            <div style={{ fontSize:16, color:"#fff", fontWeight:600 }}>{steps[step-1]}</div>
          </div>
          <div style={{ padding:"32px 28px" }}>

            {step===1 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {[
                  ["First Name *","text"],["Last Name *","text"],
                  ["Date of Birth *","date"],["Gender *","select:Male,Female"],
                  ["State of Origin *","text"],["LGA *","text"],
                  ["Home Address *","text"],["Student's Phone","tel"],
                  ["Email Address *","email"],["Passport Photograph *","file"],
                ].map(([label,type])=>(
                  <div key={label} style={{ gridColumn: label.includes("Address") ? "1/-1" : "auto" }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                    {type.startsWith("select") ? (
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none", background:"#fff" }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none" }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step===2 && (
              <div>
                {sponsor==="self" ? (
                  <div style={{ background:"rgba(16,185,129,0.08)", border:`1px solid rgba(16,185,129,0.2)`, borderRadius:10, padding:"20px 24px", textAlign:"center" }}>
                    <div style={{ fontSize:28, marginBottom:8 }}>✅</div>
                    <div style={{ fontWeight:600, color:C.navy, marginBottom:4 }}>Self-Sponsored Application</div>
                    <div style={{ fontSize:13, color:C.slate, lineHeight:1.6 }}>You selected self-sponsored. No parent/guardian information is required. Emergency contact details are optional but recommended.</div>
                  </div>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                    {[
                      ["Guardian First Name *","text"],["Guardian Last Name *","text"],
                      ["Relationship to Student *","select:Father,Mother,Uncle,Aunt,Guardian,Other"],
                      ["Guardian Phone *","tel"],["Guardian Email *","email"],["Occupation","text"],
                      ["Guardian Address *","text"],["National ID / NIN","text"],
                    ].map(([label,type])=>(
                      <div key={label} style={{ gridColumn: label.includes("Address") ? "1/-1" : "auto" }}>
                        <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                        {type.startsWith("select") ? (
                          <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none", background:"#fff" }}>
                            <option value="">Select...</option>
                            {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none" }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step===3 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {[
                  ["Class Applying For *","select:JSS1,JSS2,JSS3,SS1,SS2,SS3"],
                  ["SS Department (SS only)","select:Sciences,Humanities,Business"],
                  ["Previous School Name *","text"],["Year Left *","text"],
                  ["Last Class Attended *","text"],["Previous School Type","select:Public,Private,Home School"],
                  ["Reason for Joining *","textarea"],["How Did You Hear About Us?","select:Social Media,Friend Referral,Google Search,School Fair,Other"],
                ].map(([label,type])=>(
                  <div key={label} style={{ gridColumn: label.includes("Reason") ? "1/-1" : "auto" }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                    {type==="textarea" ? (
                      <textarea rows={3} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none", resize:"vertical", fontFamily:"inherit" }} />
                    ) : type.startsWith("select") ? (
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none", background:"#fff" }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.navy, outline:"none" }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step===4 && (
              <div>
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:16 }}>Upload Required Documents</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    {["Birth Certificate *","Last School Report Card *","Passport Photograph (4 copies) *","Parent/Guardian ID (if applicable)"].map(doc=>(
                      <div key={doc} style={{ border:`2px dashed ${C.border}`, borderRadius:10, padding:"20px", textAlign:"center", cursor:"pointer", transition:"border-color .2s" }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                        <div style={{ fontSize:24, marginBottom:6 }}>📎</div>
                        <div style={{ fontSize:12, fontWeight:600, color:C.navy, marginBottom:4 }}>{doc}</div>
                        <div style={{ fontSize:11, color:C.slate }}>Click to upload PDF or JPG</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background:"rgba(21,101,192,0.06)", border:`1px solid rgba(21,101,192,0.15)`, borderRadius:10, padding:"16px 20px", marginBottom:20 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.blue, marginBottom:8 }}>📋 Declaration</div>
                  <div style={{ fontSize:12, color:C.slate, lineHeight:1.7, marginBottom:12 }}>I confirm that all information provided in this application is accurate and complete. I understand that providing false information may result in cancellation of admission.</div>
                  <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                    <input type="checkbox" style={{ width:16, height:16, accentColor:C.blue }} />
                    <span style={{ fontSize:13, color:C.navy, fontWeight:500 }}>I agree to the SAMPACE INSTITUTE terms and conditions</span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:32 }}>
              <button onClick={()=>step>1?setStep(s=>s-1):setView("landing")} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                {step===1?"← Back":"← Previous"}
              </button>
              <button onClick={()=>step<totalSteps?setStep(s=>s+1):setSubmitted(true)} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"11px 32px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 16px rgba(21,101,192,0.3)` }}>
                {step===totalSteps?"🎓 Submit Application":"Next Step →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STUDENT PORTAL ───
function StudentPortal() {
  const [tab, setTab] = useState("dashboard");
  const tabs = [["dashboard","🏠 Dashboard"],["subjects","📚 My Subjects"],["timetable","📅 Timetable"],["assignments","📝 Assignments"],["cbt","🎯 CBT Practice"],["library","📖 Library"],["reports","📊 Reports"]];

  return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex" }}>
      {/* Sidebar */}
      <aside style={{ width:220, background:C.navy, minHeight:"100vh", padding:"24px 12px", position:"sticky", top:60, height:"calc(100vh - 60px)", overflowY:"auto", flexShrink:0 }}>
        {/* Student card */}
        <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:12, padding:"16px", marginBottom:20, textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, margin:"0 auto 10px" }}>A</div>
          <div style={{ fontWeight:700, fontSize:13, color:"#fff" }}>{childData.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{childData.class}</div>
          <div style={{ fontSize:10, color:C.gold, marginTop:4, fontFamily:"monospace" }}>{childData.id}</div>
        </div>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:8,
            background: tab===id?`linear-gradient(135deg,rgba(21,101,192,0.4),rgba(66,165,245,0.2))`:"transparent",
            borderLeft: tab===id?`2px solid ${C.sky}`:"2px solid transparent",
            border:"none", color: tab===id?"#fff":"rgba(255,255,255,0.5)",
            fontSize:13, fontWeight: tab===id?600:400, cursor:"pointer",
            marginBottom:2, display:"block",
          }}>{label}</button>
        ))}
      </aside>

      {/* Content */}
      <main style={{ flex:1, padding:"28px 32px", minWidth:0 }}>
        {tab==="dashboard" && (
          <div>
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy }}>Welcome back, <em style={{ color:C.blue, fontStyle:"italic" }}>Adaeze</em> 👋</h2>
              <div style={{ fontSize:13, color:C.slate }}>Monday, 18 May 2026 · {childData.class}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
              {[["🎯","GPA",childData.gpa,"+0.2 this term",C.blue],["📅","Attendance",`${childData.attendance}%`,"Above average",C.green],["📝","Assignments","3 Pending","Due this week",C.amber],["📋","Next Exam","Friday","Mathematics",C.red]].map(([icon,label,val,sub,color])=>(
                <div key={label} style={{ background:C.white, border:`1px solid ${color}20`, borderRadius:12, padding:"20px", borderTop:`3px solid ${color}` }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>{icon}</div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:32, color, letterSpacing:1, lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:12, color:C.navy, fontWeight:600, marginTop:4 }}>{label}</div>
                  <div style={{ fontSize:11, color:C.slate }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:20 }}>
              <Card>
                <CardHeader title="My Subjects — Performance" />
                <div style={{ padding:"0 20px" }}>
                  {subjects.map(s=>(
                    <div key={s.name} style={{ padding:"12px 0", borderBottom:`1px solid ${C.cream}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{s.name}</div>
                        <div style={{ fontSize:11, color:C.slate }}>{s.teacher} · Next: {s.next}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{s.score}%</div>
                          <div style={{ width:80, height:4, background:C.cream, borderRadius:2, marginTop:4 }}>
                            <div style={{ width:`${s.score}%`, height:"100%", background:gradeColor(s.grade), borderRadius:2 }} />
                          </div>
                        </div>
                        <Badge text={s.grade} color={gradeColor(s.grade)} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <Card>
                  <CardHeader title="Announcements" />
                  <div style={{ padding:"0 16px" }}>
                    {announcements.map((a,i)=>(
                      <div key={i} style={{ padding:"11px 0", borderBottom:`1px solid ${C.cream}`, display:"flex", gap:10, alignItems:"flex-start" }}>
                        <div style={{ width:32, height:32, borderRadius:8, background:`${a.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{a.icon}</div>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:C.navy, lineHeight:1.3 }}>{a.title}</div>
                          <div style={{ fontSize:11, color:C.slate }}>{a.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <CardHeader title="Today's Classes" />
                  <div style={{ padding:"12px 20px" }}>
                    {(timetable.Monday||[]).map((c,i)=>(
                      <div key={i} style={{ padding:"8px 0", borderBottom:`1px solid ${C.cream}`, fontSize:13, color:c==="Break"?C.slate:C.navy, fontWeight:c==="Break"?400:500, fontStyle:c==="Break"?"italic":"normal" }}>
                        {c==="Break"?"☕ "+c:"📖 "+c}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {tab==="timetable" && (
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:24 }}>Weekly <em style={{ color:C.blue, fontStyle:"italic" }}>Timetable</em></h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
              {Object.entries(timetable).map(([day,classes])=>(
                <Card key={day}>
                  <div style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, padding:"12px 16px" }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:2, color:"#fff" }}>{day}</div>
                  </div>
                  <div style={{ padding:"12px" }}>
                    {classes.map((c,i)=>(
                      <div key={i} style={{ padding:"8px 10px", background:c==="Break"?C.cream:`${C.blue}08`, borderRadius:6, marginBottom:6, fontSize:12, color:c==="Break"?C.slate:C.navy, fontWeight:c==="Break"?400:500, border:c==="Break"?"none":`1px solid ${C.blue}15` }}>
                        {c==="Break"?"☕ Break":c}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab==="assignments" && (
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:24 }}>My <em style={{ color:C.blue, fontStyle:"italic" }}>Assignments</em></h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {assignments.map((a,i)=>(
                <Card key={i} style={{ padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                    <div style={{ width:44, height:44, borderRadius:10, background:`${C.blue}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📝</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{a.title}</div>
                      <div style={{ fontSize:12, color:C.slate }}>{a.subject}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:12, color:C.slate }}>Due</div>
                      <div style={{ fontSize:13, fontWeight:600, color:a.due==="Tomorrow"?C.red:C.navy }}>{a.due}</div>
                    </div>
                    <Badge text={a.status} color={a.status==="submitted"?C.green:C.amber} />
                    {a.status==="pending" && <button style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"8px 18px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Submit</button>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab==="cbt" && (
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:8 }}>CBT <em style={{ color:C.blue, fontStyle:"italic" }}>Practice</em></h2>
            <p style={{ color:C.slate, marginBottom:24 }}>Practice past questions and prepare for WAEC, NECO and internal exams.</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {subjects.map(s=>(
                <Card key={s.name} style={{ padding:"24px", cursor:"pointer" }}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 28px rgba(21,101,192,0.12)`; e.currentTarget.style.borderColor=`${C.blue}40`;}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=C.border;}}>
                  <div style={{ fontSize:28, marginBottom:12 }}>📝</div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:4 }}>{s.name}</div>
                  <div style={{ fontSize:12, color:C.slate, marginBottom:16 }}>Past Questions · Topic Drills · Timed Exams</div>
                  <button style={{ width:"100%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Start Practice →</button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {["library","reports"].includes(tab) && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>{tab==="library"?"📖":"📊"}</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:C.navy, marginBottom:8 }}>{tab==="library"?"Digital Library":"Report Cards"}</h2>
            <p style={{ color:C.slate, maxWidth:360, lineHeight:1.7 }}>{tab==="library"?"Access thousands of textbooks, e-resources and past question PDFs for all your subjects.":"View your termly report cards, subject scores and class position."}</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── PARENT PORTAL ───
function ParentPortal() {
  const [tab, setTab] = useState("overview");
  const tabs = [["overview","🏠 Overview"],["performance","📊 Performance"],["fees","💰 Fees"],["reports","📋 Reports"],["communicate","💬 Communicate"]];

  return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex" }}>
      {/* Sidebar */}
      <aside style={{ width:220, background:C.navy, minHeight:"100vh", padding:"24px 12px", position:"sticky", top:60, height:"calc(100vh - 60px)", flexShrink:0 }}>
        <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:12, padding:"16px", marginBottom:20, border:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize:11, color:C.gold, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>Parent / Guardian</div>
          <div style={{ fontWeight:700, fontSize:13, color:"#fff" }}>Mr. Okonkwo</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:2 }}>Parent Account</div>
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", letterSpacing:2, textTransform:"uppercase", padding:"0 14px", marginBottom:8 }}>My Child</div>
        <div style={{ background:"rgba(21,101,192,0.2)", borderRadius:10, padding:"12px 14px", marginBottom:16, border:"1px solid rgba(100,181,246,0.2)" }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{childData.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>{childData.class} · {childData.id}</div>
        </div>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:8,
            background: tab===id?`linear-gradient(135deg,rgba(21,101,192,0.4),rgba(66,165,245,0.2))`:"transparent",
            borderLeft: tab===id?`2px solid ${C.sky}`:"2px solid transparent",
            border:"none", color: tab===id?"#fff":"rgba(255,255,255,0.5)",
            fontSize:13, fontWeight: tab===id?600:400, cursor:"pointer", marginBottom:2,
          }}>{label}</button>
        ))}
      </aside>

      {/* Content */}
      <main style={{ flex:1, padding:"28px 32px" }}>
        {tab==="overview" && (
          <div>
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy }}>Parent <em style={{ color:C.blue, fontStyle:"italic" }}>Dashboard</em></h2>
              <div style={{ fontSize:13, color:C.slate }}>Monitoring: {childData.name} · {childData.class}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
              {[["📊","Current GPA",childData.gpa,"3 subjects above 80%",C.blue],["📅","Attendance",`${childData.attendance}%`,"Good standing",C.green],["💰","Fees Status","PAID","2nd Term 2026",C.green],["📋","Last Report","Term 1","Pos: 4th of 32",C.gold]].map(([icon,label,val,sub,color])=>(
                <div key={label} style={{ background:C.white, border:`1px solid ${color}20`, borderRadius:12, padding:"20px", borderTop:`3px solid ${color}` }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color, letterSpacing:1 }}>{val}</div>
                  <div style={{ fontSize:12, color:C.navy, fontWeight:600 }}>{label}</div>
                  <div style={{ fontSize:11, color:C.slate }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:20 }}>
              <Card>
                <CardHeader title="Subject Performance" />
                <div style={{ padding:"0 20px" }}>
                  {subjects.map(s=>(
                    <div key={s.name} style={{ padding:"11px 0", borderBottom:`1px solid ${C.cream}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{s.name}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:100, height:6, background:C.cream, borderRadius:3 }}>
                          <div style={{ width:`${s.score}%`, height:"100%", background:gradeColor(s.grade), borderRadius:3 }} />
                        </div>
                        <span style={{ fontSize:13, fontWeight:700, color:gradeColor(s.grade), width:32, textAlign:"right" }}>{s.score}%</span>
                        <Badge text={s.grade} color={gradeColor(s.grade)} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <Card>
                  <CardHeader title="School Announcements" />
                  <div style={{ padding:"0 16px" }}>
                    {announcements.slice(0,3).map((a,i)=>(
                      <div key={i} style={{ padding:"10px 0", borderBottom:`1px solid ${C.cream}`, display:"flex", gap:10 }}>
                        <div style={{ width:28, height:28, borderRadius:6, background:`${a.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>{a.icon}</div>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:C.navy, lineHeight:1.3 }}>{a.title}</div>
                          <div style={{ fontSize:11, color:C.slate }}>{a.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card style={{ padding:"20px" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.navy, marginBottom:12 }}>Quick Actions</div>
                  {[["📅","Book PTM","Schedule parent-teacher meeting"],["💰","Pay Fees","Paystack secure payment"],["📋","View Reports","Download report cards"]].map(([icon,title,desc])=>(
                    <button key={title} style={{ width:"100%", display:"flex", gap:10, alignItems:"center", background:C.cream, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", cursor:"pointer", marginBottom:8, transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue; e.currentTarget.style.background=`${C.blue}08`;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.cream;}}>
                      <span style={{ fontSize:18 }}>{icon}</span>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontSize:12, fontWeight:600, color:C.navy }}>{title}</div>
                        <div style={{ fontSize:11, color:C.slate }}>{desc}</div>
                      </div>
                    </button>
                  ))}
                </Card>
              </div>
            </div>
          </div>
        )}

        {tab==="fees" && (
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:24 }}>Fees & <em style={{ color:C.blue, fontStyle:"italic" }}>Payments</em></h2>
            <div style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:12, padding:"20px 24px", marginBottom:24, display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ fontSize:32 }}>✅</div>
              <div>
                <div style={{ fontWeight:700, color:C.navy }}>All fees paid for 2nd Term 2026</div>
                <div style={{ fontSize:13, color:C.slate }}>Next payment due: September 2026 (3rd Term)</div>
              </div>
            </div>
            <Card>
              <CardHeader title="Payment History" />
              {childData.fees.map((f,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderBottom:`1px solid ${C.cream}` }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:C.navy }}>{f.term}</div>
                    <div style={{ fontSize:12, color:C.slate }}>Paid on {f.date}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ fontSize:16, fontWeight:700, color:C.navy }}>₦{f.amount.toLocaleString()}</div>
                    <Badge text="✓ Paid" color={C.green} />
                    <button style={{ background:`${C.blue}12`, border:`1px solid ${C.blue}30`, color:C.blue, padding:"6px 14px", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:600 }}>Receipt</button>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {["performance","reports","communicate"].includes(tab) && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>{tab==="performance"?"📊":tab==="reports"?"📋":"💬"}</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:C.navy, marginBottom:8 }}>
              {tab==="performance"?"Full Performance Analytics":tab==="reports"?"Report Cards":"Message Teachers"}
            </h2>
            <p style={{ color:C.slate, maxWidth:360, lineHeight:1.7 }}>
              {tab==="performance"?"Detailed charts and trends of your child's academic performance across all terms."
               :tab==="reports"?"Download and view all termly report cards with teacher comments."
               :"Send messages directly to class teachers and subject tutors."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── ROOT ───
export default function SchoolCollege() {
  const [view, setView] = useState("landing");
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.cream }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#F8FAFF;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:2px;}
      `}</style>
      <Nav view={view} setView={setView} />
      {view==="landing"   && <LandingPage setView={setView} />}
      {view==="admission" && <AdmissionForm setView={setView} />}
      {view==="student"   && <StudentPortal />}
      {view==="parent"    && <ParentPortal />}
    </div>
  );
}
