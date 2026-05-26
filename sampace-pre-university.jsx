import { useState } from "react";

const C = {
  navy:   "#0B1F3A", maroon: "#BF360C", amber:  "#FF7043",
  light:  "#FBE9E7", gold:   "#C9A84C", white:  "#FFFFFF",
  cream:  "#FFF8F5", slate:  "#64748B", border: "#E2E8F0",
  green:  "#10B981", red:    "#EF4444", blue:   "#1565C0",
  purple: "#6A1B9A", teal:   "#00695C",
};

// ─── DATA ───
const programs = [
  {
    id:"ijmb", code:"IJMB", name:"Interim Joint Matriculation Board",
    icon:"🎓", color:"#BF360C", light:"#FBE9E7",
    duration:"1 Academic Session (2 Semesters)",
    entry:"O'Level (5 credits including English & Maths)",
    outcome:"Direct 200-level university admission without JAMB",
    desc:"The IJMB programme is a pre-degree qualification that gives students direct entry into 200-level in Nigerian universities. Recognised by all federal and state universities.",
    faculties:["Sciences","Humanities","Social Sciences","Business & Management"],
    subjects:["Use of English","Mathematics","Biology","Chemistry","Physics","Economics","Government","Literature","Geography","History","Accounting"],
    grading:"A (70-100) · B (60-69) · C (50-59) · D (45-49) · E (40-44) · F (0-39)",
  },
  {
    id:"jupeb", code:"JUPEB", name:"Joint Universities Preliminary Examinations Board",
    icon:"🏛️", color:"#1565C0", light:"#E3F2FD",
    duration:"1 Academic Session (2 Semesters)",
    entry:"O'Level (5 credits including English & Maths)",
    outcome:"Direct 200-level admission — JUPEB-affiliated universities",
    desc:"JUPEB is a pre-degree programme jointly operated by Nigerian universities. It provides a recognised pathway for direct entry into 200-level in participating universities.",
    faculties:["Sciences","Arts & Humanities","Social & Management Sciences"],
    subjects:["Use of English","Mathematics","Biology","Chemistry","Physics","Economics","Government","Literature","Geography","Accounting","Commerce"],
    grading:"A (70-100) · B (60-69) · C (50-59) · D (45-49) · F (0-44)",
  },
  {
    id:"predegree", code:"Pre-Degree", name:"University Pre-Degree Programme",
    icon:"📘", color:"#00695C", light:"#E0F2F1",
    duration:"1 Academic Session (2 Semesters)",
    entry:"O'Level — 5 credits",
    outcome:"Pathway to 100-level admission in partner institutions",
    desc:"A structured pre-degree foundation programme designed to prepare students academically and mentally for university-level education. Strong focus on study skills and core subjects.",
    faculties:["Sciences","Humanities","Business"],
    subjects:["Use of English","Mathematics","Biology","Chemistry","Physics","Economics","Government","History"],
    grading:"University standard — GPA on 5.0 scale",
  },
  {
    id:"diploma", code:"Diploma", name:"Diploma Programme",
    icon:"📜", color:"#6A1B9A", light:"#F3E5F5",
    duration:"1–2 Years (2–4 Semesters)",
    entry:"O'Level or equivalent qualification",
    outcome:"Professional diploma — recognised by employers & institutions",
    desc:"Professional diploma programmes in specialised fields. Designed for students seeking practical qualifications alongside or instead of a degree pathway.",
    faculties:["Business Administration","Information Technology","Public Administration","Mass Communication","Accounting"],
    subjects:["Core professional subjects per faculty","Research Methods","Communication Skills","Ethics & Professionalism"],
    grading:"Distinction (70+) · Credit (60-69) · Merit (50-59) · Pass (40-49) · Fail (<40)",
  },
];

const faculties = [
  { name:"Sciences",                   dean:"Prof. Abubakar Suleiman",  students:142, color:"#2E7D32", icon:"🔬" },
  { name:"Humanities & Social Sci.",   dean:"Dr. Ngozi Adeyemi",        students:98,  color:"#1565C0", icon:"📖" },
  { name:"Business & Management",      dean:"Prof. Emeka Okafor",       students:115, color:"#E65100", icon:"📊" },
  { name:"Information Technology",     dean:"Dr. Fatima Usman",         students:63,  color:"#6A1B9A", icon:"💻" },
];

const courses = [
  { code:"USE101", title:"Use of English I",        credit:3, score:74, grade:"B", faculty:"General" },
  { code:"MTH101", title:"Mathematics I",            credit:3, score:81, grade:"A", faculty:"Sciences" },
  { code:"BIO101", title:"Biology I",                credit:3, score:68, grade:"B", faculty:"Sciences" },
  { code:"CHE101", title:"Chemistry I",              credit:3, score:62, grade:"C", faculty:"Sciences" },
  { code:"PHY101", title:"Physics I",                credit:3, score:77, grade:"B", faculty:"Sciences" },
  { code:"GST101", title:"General Studies I",        credit:2, score:85, grade:"A", faculty:"General" },
];

const semesters = [
  { name:"1st Semester 2025/2026", status:"completed", gpa:3.40, courses:courses },
  { name:"2nd Semester 2025/2026", status:"ongoing",   gpa:null, courses:[] },
];

// ─── HELPERS ───
function gradeColor(g) { return g==="A"?"#10B981":g==="B"?C.blue:g==="C"?C.maroon:C.red; }
function Card({ children, style={} }) {
  return <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", ...style }}>{children}</div>;
}
function SectionLabel({ text }) {
  return <div style={{ fontSize:11, letterSpacing:4, color:C.gold, textTransform:"uppercase", marginBottom:12, fontWeight:600 }}>{text}</div>;
}

// ─── NAV ───
function Nav({ view, setView }) {
  const views = [["landing","🏠 Home"],["apply","📋 Apply"],["student","🎓 Student"],["parent","👨‍👩‍👧 Parent"]];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(62,26,0,0.97)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,112,67,0.2)", padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:42, height:42, background:`linear-gradient(135deg,${C.maroon},${C.amber})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue'", fontSize:15, color:"#fff", boxShadow:`0 4px 12px rgba(191,54,12,0.4)` }}>PUC</div>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:3, background:`linear-gradient(90deg,${C.amber},${C.gold})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>PRE-UNIVERSITY COLLEGE</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:2.5, textTransform:"uppercase" }}>SAMPACE INSTITUTE · Est. 2026</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:4 }}>
        {views.map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)} style={{ background:view===v?`linear-gradient(135deg,${C.maroon},${C.amber})`:"transparent", border:"none", color:view===v?"#fff":"rgba(255,255,255,0.55)", padding:"7px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .2s" }}>{l}</button>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)", padding:"8px 18px", borderRadius:6, fontSize:12, cursor:"pointer" }}>Student Login</button>
        <button onClick={()=>setView("apply")} style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"8px 20px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>Apply Now</button>
      </div>
    </nav>
  );
}

// ─── LANDING PAGE ───
function Landing({ setView }) {
  const [activeProgram, setActiveProgram] = useState(null);

  return (
    <div style={{ background:C.cream }}>

      {/* Hero */}
      <section style={{ background:`linear-gradient(160deg,#1A0A00 0%,${C.navy} 35%,#3E1A00 70%,${C.maroon} 100%)`, padding:"90px 48px 80px", textAlign:"center", position:"relative", overflow:"hidden", minHeight:"88vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(191,54,12,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.1) 0%, transparent 50%)" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,112,67,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,112,67,0.04) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

        {/* Floating badges */}
        {[["🎓","IJMB","top:15%,left:5%","#BF360C"],["🏛️","JUPEB","top:20%,right:5%","#1565C0"],["📜","Diploma","bottom:25%,left:4%","#6A1B9A"],["📘","Pre-Degree","bottom:20%,right:5%","#00695C"]].map(([icon,label,pos,color])=>(
          <div key={label} style={{ position:"absolute", ...Object.fromEntries(pos.split(",").map(p=>p.trim().split(":"))), zIndex:2 }}>
            <div style={{ background:`linear-gradient(135deg,${color}cc,${color}88)`, backdropFilter:"blur(8px)", border:`1px solid ${color}60`, borderRadius:14, padding:"14px 18px", textAlign:"center" }}>
              <div style={{ fontSize:26, marginBottom:4 }}>{icon}</div>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:14, color:"#fff", letterSpacing:2 }}>{label}</div>
            </div>
          </div>
        ))}

        <div style={{ position:"relative", zIndex:3, maxWidth:800, margin:"0 auto" }}>
          {/* Crest */}
          <div style={{ width:80, height:80, background:`linear-gradient(135deg,${C.maroon},${C.amber})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 24px", boxShadow:`0 8px 32px rgba(191,54,12,0.4)`, border:"3px solid rgba(201,168,76,0.4)" }}>🏛️</div>

          <div style={{ display:"inline-block", border:`1px solid rgba(201,168,76,0.5)`, color:C.gold, padding:"5px 20px", borderRadius:100, fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:24, background:"rgba(201,168,76,0.08)" }}>
            Recognised · Accredited · Excellence
          </div>

          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,7vw,88px)", fontWeight:700, color:"#fff", lineHeight:0.9, letterSpacing:-1, marginBottom:16 }}>
            <span style={{ background:`linear-gradient(135deg,#fff,${C.amber})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Pre-University</span><br/>
            <span style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>College</span>
          </h1>

          <div style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(13px,2vw,18px)", letterSpacing:6, color:"rgba(255,112,67,0.7)", margin:"16px 0 20px" }}>
            SAMPACE INSTITUTE · WHERE SCHOLARS ARE BORN
          </div>

          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, lineHeight:1.8, maxWidth:560, margin:"0 auto 40px" }}>
            Your gateway to 200-level university admission. IJMB, JUPEB, Pre-Degree and Diploma programmes — all online, all rigorous, all world-class.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setView("apply")} style={{ background:`linear-gradient(135deg,${C.maroon},${C.amber})`, color:"#fff", border:"none", padding:"15px 40px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:`0 8px 28px rgba(191,54,12,0.5)` }}>
              Apply for Admission →
            </button>
            <button style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"15px 32px", borderRadius:8, fontSize:14, cursor:"pointer" }}>
              📧 Request Prospectus
            </button>
          </div>

          <div style={{ display:"flex", gap:48, justifyContent:"center", marginTop:60, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {[["4","Programmes"],["200-Level","Direct Entry"],["All","Universities"],["Online","Delivery"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:38, color:C.gold, letterSpacing:2, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section style={{ padding:"80px 48px", background:C.white }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <SectionLabel text="Our Programmes" />
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:700, color:C.navy }}>
              Choose Your <em style={{ color:C.maroon, fontStyle:"italic" }}>Pathway</em>
            </h2>
            <p style={{ color:C.slate, maxWidth:540, margin:"16px auto 0", lineHeight:1.8 }}>
              Four internationally recognised pre-university programmes. Each one designed to take you directly into 200-level or professional qualification.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24 }}>
            {programs.map(p=>(
              <div key={p.id} onClick={()=>setActiveProgram(activeProgram===p.id?null:p.id)}
                style={{ background:activeProgram===p.id?p.light:C.cream, border:`2px solid ${activeProgram===p.id?p.color:C.border}`, borderRadius:16, overflow:"hidden", cursor:"pointer", transition:"all .3s", borderTop:`5px solid ${p.color}` }}
                onMouseEnter={e=>{if(activeProgram!==p.id){e.currentTarget.style.borderColor=p.color+"60"; e.currentTarget.style.boxShadow=`0 12px 36px ${p.color}15`;}}}
                onMouseLeave={e=>{if(activeProgram!==p.id){e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none";}}}>
                <div style={{ padding:"28px 32px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                    <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                      <div style={{ width:52, height:52, borderRadius:12, background:`${p.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{p.icon}</div>
                      <div>
                        <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, color:p.color, letterSpacing:2, lineHeight:1 }}>{p.code}</div>
                        <div style={{ fontSize:12, color:C.slate, marginTop:2 }}>{p.name}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:20, color:p.color, transition:"transform .3s", transform:activeProgram===p.id?"rotate(180deg)":"rotate(0deg)" }}>›</div>
                  </div>
                  <p style={{ fontSize:14, color:C.slate, lineHeight:1.7 }}>{p.desc}</p>
                </div>

                {activeProgram===p.id && (
                  <div style={{ padding:"0 32px 28px" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                      {[["⏱ Duration",p.duration],["🎯 Entry",p.entry],["🏆 Outcome",p.outcome],["📐 Grading",p.grading]].map(([k,v])=>(
                        <div key={k} style={{ background:"rgba(255,255,255,0.7)", borderRadius:10, padding:"14px" }}>
                          <div style={{ fontSize:11, color:p.color, fontWeight:700, marginBottom:4 }}>{k}</div>
                          <div style={{ fontSize:12, color:C.navy, lineHeight:1.5 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:C.navy, marginBottom:8 }}>Available Faculties</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {p.faculties.map(f=><span key={f} style={{ background:`${p.color}12`, color:p.color, padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:500 }}>{f}</span>)}
                      </div>
                    </div>
                    <button onClick={e=>{e.stopPropagation();setView("apply")}} style={{ width:"100%", background:`linear-gradient(135deg,${p.color},${p.color}cc)`, color:"#fff", border:"none", padding:"12px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                      Apply for {p.code} →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculties */}
      <section style={{ padding:"80px 48px", background:C.cream }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel text="Faculties & Schools" />
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:700, color:C.navy }}>
              Our <em style={{ color:C.maroon, fontStyle:"italic" }}>Faculties</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {faculties.map(f=>(
              <div key={f.name} style={{ background:C.white, borderRadius:12, padding:"28px 22px", textAlign:"center", border:`1px solid ${C.border}`, borderTop:`4px solid ${f.color}`, transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 36px ${f.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize:36, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:6, lineHeight:1.3 }}>{f.name}</div>
                <div style={{ fontSize:12, color:C.slate, marginBottom:12 }}>Dean: {f.dean}</div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, color:f.color, letterSpacing:1 }}>{f.students}</div>
                <div style={{ fontSize:11, color:C.slate }}>Students Enrolled</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pre-University */}
      <section style={{ padding:"80px 48px", background:C.white }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <SectionLabel text="Why Choose Us" />
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:700, color:C.navy, marginBottom:24, lineHeight:1.1 }}>
              The Smarter Path<br/>to <em style={{ color:C.maroon, fontStyle:"italic" }}>University</em>
            </h2>
            <p style={{ color:C.slate, lineHeight:1.8, marginBottom:32, fontSize:15 }}>
              Skip the JAMB stress. Our pre-university programmes give you direct entry into 200-level with full recognition across Nigerian universities.
            </p>
            {[
              ["🏛️","Direct 200-Level Entry","Bypass 100-level entirely. Save one full academic year."],
              ["✅","No JAMB Required","IJMB and JUPEB students gain admission without sitting UTME."],
              ["📜","Recognised Nationally","All programmes recognised by NUC and Nigerian universities."],
              ["🎓","University-Grade Teaching","Lecturers with M.Sc and Ph.D qualifications. University standards."],
              ["📱","100% Online Delivery","Full flexibility — live lectures recorded for replay. Study anywhere."],
            ].map(([icon,title,desc])=>(
              <div key={title} style={{ display:"flex", gap:14, marginBottom:18, alignItems:"flex-start" }}>
                <div style={{ width:40, height:40, flexShrink:0, background:`${C.maroon}12`, border:`1px solid ${C.maroon}25`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight:600, color:C.navy, marginBottom:2, fontSize:14 }}>{title}</div>
                  <div style={{ fontSize:13, color:C.slate, lineHeight:1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[
              ["📅","Semester System","University-style 2-semester session","#BF360C"],
              ["📋","Matriculation","Formal matric number issued on admission","#1565C0"],
              ["📊","Transcript","Official transcript generated each semester","#00695C"],
              ["🧪","Virtual Labs","Interactive science practicals online","#6A1B9A"],
              ["📚","e-Library","Thousands of academic resources","#E65100"],
              ["🤝","Placement Guide","University placement support after completion","#2E7D32"],
            ].map(([icon,title,desc,color])=>(
              <div key={title} style={{ background:C.cream, borderRadius:12, padding:"20px 16px", border:`1px solid ${color}18`, borderTop:`2px solid ${color}` }}>
                <div style={{ fontSize:26, marginBottom:8 }}>{icon}</div>
                <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:11, color:C.slate, lineHeight:1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg,${C.maroon},#7A1500)`, padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(40px,6vw,72px)", color:"#fff", letterSpacing:3, lineHeight:1, marginBottom:12 }}>
            YOUR UNIVERSITY JOURNEY<br/>
            <span style={{ background:`linear-gradient(90deg,${C.gold},#FFD54F)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>STARTS HERE</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.65)", maxWidth:460, margin:"0 auto 36px", lineHeight:1.8 }}>
            Applications are open for the 2026/2027 academic session. Secure your place today.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setView("apply")} style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"15px 44px", borderRadius:8, fontWeight:800, fontSize:15, cursor:"pointer", boxShadow:`0 8px 28px rgba(201,168,76,0.35)` }}>
              🎓 Apply Now
            </button>
            <a href="https://wa.me/" style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", padding:"15px 36px", borderRadius:8, fontSize:15, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ADMISSION FORM ───
function AdmissionForm({ setView }) {
  const [step, setStep] = useState(1);
  const [program, setProgram] = useState("");
  const [faculty, setFaculty] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 5;
  const stepLabels = ["Personal Details","Academic Background","Programme & Faculty","Guardian Information","Documents & Submit"];

  if (submitted) return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
      <div style={{ background:C.white, borderRadius:20, padding:"60px 52px", textAlign:"center", maxWidth:560, boxShadow:"0 24px 64px rgba(0,0,0,0.1)" }}>
        <div style={{ width:80, height:80, background:`linear-gradient(135deg,${C.maroon},${C.amber})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 24px", boxShadow:`0 8px 24px rgba(191,54,12,0.3)` }}>🎓</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:C.navy, marginBottom:8 }}>Application Submitted!</h2>
        <p style={{ color:C.slate, lineHeight:1.7, marginBottom:28 }}>Your application to the Pre-University College has been received. Our Admissions Office will review and contact you within <strong>72 hours</strong>.</p>
        <div style={{ background:C.cream, borderRadius:12, padding:"20px 24px", marginBottom:28, textAlign:"left" }}>
          {[["Application Ref","PUC-"+Math.floor(Math.random()*9000+1000)],["Programme",programs.find(p=>p.id===program)?.code||"IJMB"],["Status","Under Review"],["Next Step","Await admission letter via email"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12, color:C.slate }}>{k}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button onClick={()=>setView("landing")} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"11px 24px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>← Back to College</button>
          <button onClick={()=>setView("student")} style={{ background:`linear-gradient(135deg,${C.maroon},${C.amber})`, color:"#fff", border:"none", padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>View Student Portal</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"40px 48px" }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <button onClick={()=>setView("landing")} style={{ background:"none", border:"none", color:C.slate, fontSize:13, cursor:"pointer", marginBottom:12 }}>← Back to Pre-University College</button>
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
            <div style={{ width:48, height:48, background:`linear-gradient(135deg,${C.maroon},${C.amber})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🏛️</div>
            <div>
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:C.navy, lineHeight:1 }}>Admission Application</h1>
              <div style={{ fontSize:13, color:C.slate }}>Pre-University College · SAMPACE INSTITUTE · 2026/2027 Session</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background:C.white, borderRadius:12, padding:"20px 28px", marginBottom:24, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:0 }}>
            {stepLabels.map((s,i)=>(
              <div key={i} style={{ flex:1, display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:i+1<step?"#10B981":i+1===step?`linear-gradient(135deg,${C.maroon},${C.amber})`:C.cream, border:i+1>step?`2px solid ${C.border}`:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:i+1<=step?"#fff":C.slate, fontWeight:700 }}>{i+1<step?"✓":i+1}</div>
                  <div style={{ fontSize:10, color:i+1===step?C.maroon:C.slate, marginTop:5, fontWeight:i+1===step?700:400, textAlign:"center", lineHeight:1.3 }}>{s}</div>
                </div>
                {i<stepLabels.length-1 && <div style={{ height:2, flex:1, background:i+1<step?"#10B981":C.border, margin:"0 2px", marginBottom:22 }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ background:`linear-gradient(135deg,#1A0A00,${C.maroon})`, padding:"22px 32px" }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, color:C.gold, letterSpacing:2 }}>STEP {step} OF {totalSteps}</div>
            <div style={{ fontSize:16, color:"#fff", fontWeight:600 }}>{stepLabels[step-1]}</div>
          </div>
          <div style={{ padding:"36px 32px" }}>

            {step===1 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {[["First Name *","text"],["Last Name *","text"],["Middle Name","text"],["Date of Birth *","date"],["Gender *","select:Male,Female"],["State of Origin *","text"],["LGA of Origin *","text"],["Nationality *","select:Nigerian,Other"],["Phone Number *","tel"],["Email Address *","email"],["Home Address *","text"],["Passport Photograph *","file"]].map(([label,type])=>(
                  <div key={label} style={{ gridColumn:label.includes("Address")?"1/-1":"auto" }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                    {type.startsWith("select")?(
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none", background:"#fff", color:C.navy }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    ):(
                      <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none", color:C.navy }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step===2 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <div style={{ gridColumn:"1/-1" }}>
                  <div style={{ background:`${C.maroon}08`, border:`1px solid ${C.maroon}20`, borderRadius:10, padding:"16px 20px", marginBottom:8 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.maroon, marginBottom:4 }}>📋 O'Level Results Required</div>
                    <div style={{ fontSize:12, color:C.slate, lineHeight:1.6 }}>You must have a minimum of 5 credits in your O'Level results (WAEC, NECO or GCE) including English Language and Mathematics to qualify for all programmes.</div>
                  </div>
                </div>
                {[["Secondary School Name *","text"],["Year of Graduation *","text"],["O'Level Type *","select:WAEC,NECO,GCE,NABTEB"],["O'Level Year *","text"],["English Language Grade *","select:A1,B2,B3,C4,C5,C6"],["Mathematics Grade *","select:A1,B2,B3,C4,C5,C6"],["Other Subject 1 & Grade","text"],["Other Subject 2 & Grade","text"],["Other Subject 3 & Grade","text"],["Awaiting Results?","select:No,Yes (provide results before matriculation)"]].map(([label,type])=>(
                  <div key={label}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                    {type.startsWith("select")?(
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none", background:"#fff" }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    ):(
                      <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none" }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step===3 && (
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:16 }}>Select Your Programme</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
                  {programs.map(p=>(
                    <div key={p.id} onClick={()=>setProgram(p.id)} style={{ border:`2px solid ${program===p.id?p.color:C.border}`, borderRadius:12, padding:"18px 20px", cursor:"pointer", background:program===p.id?p.light:"#fff", transition:"all .2s" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                        <span style={{ fontSize:24 }}>{p.icon}</span>
                        <div>
                          <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, color:program===p.id?p.color:C.navy, letterSpacing:1 }}>{p.code}</div>
                          <div style={{ fontSize:11, color:C.slate, lineHeight:1.3 }}>{p.duration}</div>
                        </div>
                        {program===p.id&&<span style={{ marginLeft:"auto", color:p.color, fontSize:18 }}>✓</span>}
                      </div>
                      <div style={{ fontSize:12, color:C.slate, lineHeight:1.5 }}>{p.outcome}</div>
                    </div>
                  ))}
                </div>

                {program && (
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:12 }}>Select Your Faculty</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                      {(programs.find(p=>p.id===program)?.faculties||[]).map(f=>(
                        <div key={f} onClick={()=>setFaculty(f)} style={{ border:`2px solid ${faculty===f?C.maroon:C.border}`, borderRadius:8, padding:"12px 16px", cursor:"pointer", background:faculty===f?`${C.maroon}08`:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <span style={{ fontSize:13, fontWeight:500, color:faculty===f?C.maroon:C.navy }}>{f}</span>
                          {faculty===f&&<span style={{ color:C.maroon }}>✓</span>}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:20 }}>
                      <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:8 }}>Preferred Course Combination / Subjects</label>
                      <textarea rows={3} placeholder="e.g. Mathematics, Physics, Chemistry — for Sciences track" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none", resize:"vertical", fontFamily:"inherit", color:C.navy }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {step===4 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <div style={{ gridColumn:"1/-1" }}>
                  <div style={{ background:"rgba(21,101,192,0.06)", border:`1px solid rgba(21,101,192,0.15)`, borderRadius:10, padding:"14px 18px", marginBottom:8 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.blue, marginBottom:4 }}>ℹ️ Guardian Information</div>
                    <div style={{ fontSize:12, color:C.slate }}>Required for students under 25. Older students may provide emergency contact instead.</div>
                  </div>
                </div>
                {[["Guardian First Name *","text"],["Guardian Last Name *","text"],["Relationship *","select:Father,Mother,Uncle,Aunt,Sibling,Guardian,Spouse,Other"],["Guardian Phone *","tel"],["Guardian Email *","email"],["Occupation","text"],["Guardian Address","text"],["NIN / National ID","text"]].map(([label,type])=>(
                  <div key={label} style={{ gridColumn:label.includes("Address")?"1/-1":"auto" }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                    {type.startsWith("select")?(
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none", background:"#fff" }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    ):(
                      <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, outline:"none" }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step===5 && (
              <div>
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:14 }}>Upload Required Documents</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {["O'Level Certificate / Result *","Birth Certificate *","Passport Photograph (2 copies) *","Local Government Letter of Origin *","Guardian's ID Card","Any Other Relevant Certificate"].map(doc=>(
                      <div key={doc} style={{ border:`2px dashed ${C.border}`, borderRadius:10, padding:"20px", textAlign:"center", cursor:"pointer", transition:"border-color .2s" }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=C.maroon}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                        <div style={{ fontSize:24, marginBottom:6 }}>📎</div>
                        <div style={{ fontSize:12, fontWeight:600, color:C.navy, marginBottom:3 }}>{doc}</div>
                        <div style={{ fontSize:11, color:C.slate }}>PDF, JPG or PNG · Max 5MB</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application fee */}
                <div style={{ background:`${C.maroon}08`, border:`1px solid ${C.maroon}20`, borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.maroon, marginBottom:8 }}>💳 Application Fee</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontSize:13, color:C.slate }}>Non-refundable application processing fee</div>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, color:C.maroon, letterSpacing:1 }}>₦5,000</div>
                  </div>
                  <div style={{ fontSize:12, color:C.slate, marginTop:8 }}>Paid via Paystack. Application reviewed only after payment confirmed.</div>
                </div>

                <div style={{ background:`${C.navy}06`, border:`1px solid ${C.navy}15`, borderRadius:10, padding:"16px 20px", marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.navy, marginBottom:8 }}>📋 Applicant's Declaration</div>
                  <div style={{ fontSize:12, color:C.slate, lineHeight:1.7, marginBottom:12 }}>I hereby declare that all information and documents submitted in this application are genuine and accurate. I understand that false declaration will lead to immediate cancellation of admission and possible legal consequences.</div>
                  <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                    <input type="checkbox" style={{ width:16, height:16, accentColor:C.maroon }} />
                    <span style={{ fontSize:13, color:C.navy, fontWeight:500 }}>I accept the terms, conditions and academic regulations of SAMPACE INSTITUTE Pre-University College</span>
                  </label>
                </div>
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:36 }}>
              <button onClick={()=>step>1?setStep(s=>s-1):setView("landing")} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"12px 28px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>{step===1?"← Back":"← Previous"}</button>
              <button onClick={()=>step<totalSteps?setStep(s=>s+1):setSubmitted(true)} style={{ background:`linear-gradient(135deg,${C.maroon},${C.amber})`, color:"#fff", border:"none", padding:"12px 32px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 16px rgba(191,54,12,0.3)` }}>
                {step===totalSteps?"🎓 Submit & Pay Application Fee":"Next Step →"}
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
  const tabs = [["dashboard","🏠 Dashboard"],["courses","📚 Courses"],["timetable","📅 Timetable"],["transcript","📊 Transcript"],["fees","💰 Fees"],["library","📖 e-Library"],["placement","🎯 Placement"]];

  const cgpa = (courses.reduce((a,c)=>a+(c.score>=70?5:c.score>=60?4:c.score>=50?3:c.score>=45?2:c.score>=40?1:0)*c.credit,0)/courses.reduce((a,c)=>a+c.credit,0)).toFixed(2);

  return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex" }}>
      {/* Sidebar */}
      <aside style={{ width:228, background:"#1A0A00", minHeight:"100vh", padding:"24px 12px", position:"sticky", top:64, height:"calc(100vh - 64px)", flexShrink:0, overflowY:"auto" }}>
        {/* Student ID card */}
        <div style={{ background:`linear-gradient(135deg,${C.maroon}cc,${C.amber}80)`, borderRadius:12, padding:"16px", marginBottom:20, border:"1px solid rgba(255,112,67,0.2)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
          <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},#FFD54F)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:C.navy, marginBottom:10 }}>D</div>
          <div style={{ fontWeight:700, fontSize:13, color:"#fff" }}>David Adeleke</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", marginTop:2 }}>IJMB · Sciences Faculty</div>
          <div style={{ fontSize:10, color:C.gold, marginTop:4, fontFamily:"monospace", letterSpacing:1 }}>PUC/IJMB/2026/0064</div>
          <div style={{ marginTop:10, display:"flex", justifyContent:"space-between" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, color:C.gold }}>{cgpa}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:1 }}>CGPA</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, color:C.gold }}>1st</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:1 }}>SEMESTER</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, color:"#10B981" }}>PAID</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:1 }}>FEES</div>
            </div>
          </div>
        </div>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:8, background:tab===id?`linear-gradient(135deg,rgba(191,54,12,0.4),rgba(255,112,67,0.2))`:"transparent", borderLeft:tab===id?`2px solid ${C.amber}`:"2px solid transparent", border:"none", color:tab===id?"#fff":"rgba(255,255,255,0.5)", fontSize:13, fontWeight:tab===id?600:400, cursor:"pointer", marginBottom:2, display:"block" }}>{label}</button>
        ))}
      </aside>

      <main style={{ flex:1, padding:"28px 36px", minWidth:0 }}>

        {tab==="dashboard" && (
          <div>
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy }}>Welcome, <em style={{ color:C.maroon, fontStyle:"italic" }}>David</em> 👋</h2>
              <div style={{ fontSize:13, color:C.slate }}>IJMB · Sciences · 1st Semester 2025/2026 · Matriculation: PUC/IJMB/2026/0064</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
              {[["🎓","CGPA",cgpa,"1st Semester",C.maroon],["📚","Courses","6","All registered",C.blue],["📅","Week","Week 12","Exams in 3 weeks",C.amber],["✅","Attendance","91%","Above required",C.green]].map(([icon,label,val,sub,color])=>(
                <div key={label} style={{ background:C.white, border:`1px solid ${color}20`, borderRadius:12, padding:"20px", borderTop:`3px solid ${color}` }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:32, color, letterSpacing:1, lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:12, color:C.navy, fontWeight:600, marginTop:4 }}>{label}</div>
                  <div style={{ fontSize:11, color:C.slate }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:20 }}>
              <Card>
                <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:15, color:C.navy }}>1st Semester Courses</div>
                <div style={{ padding:"0 20px" }}>
                  {courses.map(c=>(
                    <div key={c.code} style={{ padding:"12px 0", borderBottom:`1px solid ${C.cream}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{c.title}</div>
                        <div style={{ fontSize:11, color:C.slate }}>{c.code} · {c.credit} Units</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{c.score}%</div>
                        <span style={{ background:`${gradeColor(c.grade)}18`, color:gradeColor(c.grade), padding:"2px 9px", borderRadius:100, fontSize:12, fontWeight:700 }}>{c.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <Card style={{ padding:"20px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:14 }}>Semester Progress</div>
                  {[["Week","12 of 15","80%",C.maroon],["Exam Countdown","21 Days","—",C.amber],["Assignments","8 / 10 submitted","80%",C.green]].map(([k,v,p,color])=>(
                    <div key={k} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:12, color:C.slate }}>{k}</span>
                        <span style={{ fontSize:12, fontWeight:600, color }}>{v}</span>
                      </div>
                      {p!=="—"&&<div style={{ background:C.cream, borderRadius:100, height:5 }}><div style={{ width:p, height:"100%", background:`linear-gradient(90deg,${color},${color}88)`, borderRadius:100 }} /></div>}
                    </div>
                  ))}
                </Card>
                <Card style={{ padding:"20px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:14 }}>Notices</div>
                  {[["📋","1st Semester Exams begin June 10","3 weeks"],["💰","School fees fully paid — receipt available","—"],["📚","Course registration for 2nd Semester opens July","Next semester"]].map(([icon,text,when])=>(
                    <div key={text} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.cream}` }}>
                      <span style={{ fontSize:16 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize:12, fontWeight:600, color:C.navy, lineHeight:1.3 }}>{text}</div>
                        <div style={{ fontSize:11, color:C.slate }}>{when}</div>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          </div>
        )}

        {tab==="transcript" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy }}>Academic <em style={{ color:C.maroon, fontStyle:"italic" }}>Transcript</em></h2>
                <div style={{ fontSize:13, color:C.slate }}>Official academic record — SAMPACE INSTITUTE Pre-University College</div>
              </div>
              <button style={{ background:`linear-gradient(135deg,${C.maroon},${C.amber})`, color:"#fff", border:"none", padding:"10px 22px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>📥 Download PDF</button>
            </div>

            {/* Transcript header */}
            <Card style={{ marginBottom:20 }}>
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.maroon})`, padding:"28px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.gold, letterSpacing:3 }}>SAMPACE INSTITUTE</div>
                  <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)", marginTop:2 }}>Pre-University College · Official Transcript</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", letterSpacing:1 }}>STUDENT</div>
                  <div style={{ fontWeight:700, color:"#fff" }}>David Adeleke</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>PUC/IJMB/2026/0064</div>
                </div>
              </div>
              <div style={{ padding:"20px 32px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
                {[["Programme","IJMB"],["Faculty","Sciences"],["Session","2025/2026"],["Status","Active"]].map(([k,v])=>(
                  <div key={k}>
                    <div style={{ fontSize:11, color:C.slate, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>{k}</div>
                    <div style={{ fontWeight:700, color:C.navy, fontSize:14 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Card>

            {semesters.map((sem,si)=>(
              <Card key={si} style={{ marginBottom:16 }}>
                <div style={{ padding:"14px 24px", background:`${C.maroon}08`, borderBottom:`2px solid ${C.maroon}20`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{sem.name}</div>
                  <span style={{ background:sem.status==="completed"?"rgba(16,185,129,0.1)":"rgba(245,158,11,0.1)", color:sem.status==="completed"?C.green:C.amber, padding:"3px 12px", borderRadius:100, fontSize:11, fontWeight:600, textTransform:"capitalize" }}>{sem.status}</span>
                </div>
                {sem.status==="completed"?(
                  <>
                    <div style={{ display:"grid", gridTemplateColumns:"0.8fr 2fr 0.5fr 1fr 0.8fr 0.8fr", padding:"10px 24px", background:"#F8FAFF", borderBottom:`1px solid ${C.border}` }}>
                      {["Course Code","Course Title","Units","Score","Grade","Points"].map(h=>(
                        <div key={h} style={{ fontSize:11, fontWeight:700, color:C.slate, letterSpacing:0.5, textTransform:"uppercase" }}>{h}</div>
                      ))}
                    </div>
                    {sem.courses.map(c=>(
                      <div key={c.code} style={{ display:"grid", gridTemplateColumns:"0.8fr 2fr 0.5fr 1fr 0.8fr 0.8fr", padding:"13px 24px", borderBottom:`1px solid ${C.cream}`, alignItems:"center" }}>
                        <div style={{ fontSize:12, fontFamily:"monospace", color:C.slate }}>{c.code}</div>
                        <div style={{ fontSize:13, fontWeight:500, color:C.navy }}>{c.title}</div>
                        <div style={{ fontSize:13, color:C.slate }}>{c.credit}</div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{c.score}%</div>
                        <span style={{ background:`${gradeColor(c.grade)}18`, color:gradeColor(c.grade), padding:"2px 10px", borderRadius:100, fontSize:12, fontWeight:700, display:"inline-block" }}>{c.grade}</span>
                        <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{c.score>=70?5:c.score>=60?4:c.score>=50?3:c.score>=45?2:c.score>=40?1:0}.0</div>
                      </div>
                    ))}
                    <div style={{ padding:"14px 24px", background:`${C.maroon}05`, display:"flex", justifyContent:"flex-end", gap:40 }}>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:11, color:C.slate }}>Total Units</div>
                        <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.navy }}>{sem.courses.reduce((a,c)=>a+c.credit,0)}</div>
                      </div>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:11, color:C.slate }}>Semester GPA</div>
                        <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.maroon }}>{cgpa}</div>
                      </div>
                    </div>
                  </>
                ):(
                  <div style={{ padding:"32px", textAlign:"center", color:C.slate }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>⏳</div>
                    <div style={{ fontWeight:600, color:C.navy, marginBottom:4 }}>2nd Semester in Progress</div>
                    <div style={{ fontSize:13 }}>Course registration opens July 2026. Results available at semester end.</div>
                  </div>
                )}
              </Card>
            ))}

            {/* CGPA summary */}
            <Card style={{ padding:"24px 32px", background:`linear-gradient(135deg,${C.navy},${C.maroon})` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginBottom:4 }}>Cumulative GPA (CGPA)</div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:52, color:C.gold, letterSpacing:2, lineHeight:1 }}>{cgpa} / 5.0</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginTop:4 }}>{cgpa>=4.5?"First Class Standing":cgpa>=3.5?"Second Class Upper":"Second Class Lower"}</div>
                </div>
                <button style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"12px 28px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>📥 Download Full Transcript</button>
              </div>
            </Card>
          </div>
        )}

        {tab==="courses" && (
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:24 }}>My <em style={{ color:C.maroon, fontStyle:"italic" }}>Courses</em></h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {courses.map(c=>(
                <Card key={c.code} style={{ padding:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                    <div style={{ fontFamily:"monospace", fontSize:12, color:C.slate, background:C.cream, padding:"3px 8px", borderRadius:4 }}>{c.code}</div>
                    <span style={{ background:`${gradeColor(c.grade)}18`, color:gradeColor(c.grade), padding:"3px 10px", borderRadius:100, fontSize:12, fontWeight:700 }}>{c.grade}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:4 }}>{c.title}</div>
                  <div style={{ fontSize:12, color:C.slate, marginBottom:12 }}>{c.credit} Credit Units · {c.faculty}</div>
                  <div style={{ background:C.cream, borderRadius:100, height:6, marginBottom:6 }}>
                    <div style={{ width:`${c.score}%`, height:"100%", background:`linear-gradient(90deg,${gradeColor(c.grade)},${gradeColor(c.grade)}88)`, borderRadius:100 }} />
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{c.score}%</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab==="fees" && (
          <div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:24 }}>Fees & <em style={{ color:C.maroon, fontStyle:"italic" }}>Payments</em></h2>
            <div style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:12, padding:"20px 28px", marginBottom:24, display:"flex", gap:16, alignItems:"center" }}>
              <div style={{ fontSize:32 }}>✅</div>
              <div>
                <div style={{ fontWeight:700, color:C.navy }}>All fees paid for 2025/2026 Session</div>
                <div style={{ fontSize:13, color:C.slate }}>Next payment: 2nd Semester top-up due August 2026</div>
              </div>
            </div>
            <Card>
              <div style={{ padding:"16px 24px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:15, color:C.navy }}>Payment History</div>
              {[["IJMB Application Fee","May 2026","₦5,000","Processing Fee"],["1st Semester Tuition","June 2026","₦120,000","Full Tuition"],["Lab & Resource Fee","June 2026","₦15,000","Sciences Faculty"]].map(([desc,date,amount,type],i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 24px", borderBottom:`1px solid ${C.cream}` }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{desc}</div>
                    <div style={{ fontSize:11, color:C.slate }}>{type} · {date}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.navy, letterSpacing:1 }}>{amount}</div>
                    <span style={{ background:"rgba(16,185,129,0.1)", color:C.green, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600 }}>✓ Paid</span>
                    <button style={{ background:`${C.maroon}12`, border:`1px solid ${C.maroon}30`, color:C.maroon, padding:"6px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Receipt</button>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {["timetable","library","placement"].includes(tab) && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>{tab==="timetable"?"📅":tab==="library"?"📖":"🎯"}</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:C.navy, marginBottom:8 }}>
              {tab==="timetable"?"Lecture Timetable":tab==="library"?"Academic e-Library":"University Placement Guide"}
            </h2>
            <p style={{ color:C.slate, maxWidth:380, lineHeight:1.7 }}>
              {tab==="timetable"?"Full semester lecture schedule with live class links, room assignments and exam timetable."
               :tab==="library"?"Access thousands of academic textbooks, journals, past papers and research resources."
               :"Full guide to university placement — cut-off marks, direct entry requirements and application support."}
            </p>
            <div style={{ marginTop:24, padding:"10px 24px", background:`linear-gradient(135deg,${C.maroon},${C.amber})`, color:"#fff", borderRadius:8, fontSize:13, fontWeight:600 }}>Coming in Next Build</div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── PARENT PORTAL ───
function ParentPortal() {
  return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
      <div style={{ maxWidth:600, textAlign:"center" }}>
        <div style={{ width:80, height:80, background:`linear-gradient(135deg,${C.maroon},${C.amber})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 24px" }}>👨‍👩‍👧</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:C.navy, marginBottom:12 }}>Parent / Guardian Portal</h2>
        <p style={{ color:C.slate, lineHeight:1.8, marginBottom:32 }}>Parents and guardians can monitor their ward's academic progress, fee payment status, semester results, attendance and communicate with the college administration.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:32, textAlign:"left" }}>
          {[["📊","Academic Performance","View courses, scores and CGPA in real-time"],["💰","Fee Status","Track payment history and upcoming dues"],["📋","Semester Reports","Download official results and transcripts"],["💬","Message Admin","Direct communication with College Registrar"]].map(([icon,title,desc])=>(
            <div key={title} style={{ background:C.white, borderRadius:10, padding:"18px", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{icon}</div>
              <div style={{ fontWeight:600, color:C.navy, marginBottom:4, fontSize:13 }}>{title}</div>
              <div style={{ fontSize:12, color:C.slate, lineHeight:1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.white, borderRadius:12, padding:"24px 28px", border:`1px solid ${C.border}` }}>
          <div style={{ fontWeight:700, color:C.navy, marginBottom:16, fontSize:15 }}>Parent Login</div>
          {["Email Address","Password"].map(p=>(
            <input key={p} type={p==="Password"?"password":"email"} placeholder={p} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:13, marginBottom:12, outline:"none", color:C.navy, fontFamily:"inherit" }} />
          ))}
          <button style={{ width:"100%", background:`linear-gradient(135deg,${C.maroon},${C.amber})`, color:"#fff", border:"none", padding:"12px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>Login to Parent Portal</button>
          <div style={{ fontSize:12, color:C.slate, marginTop:12 }}>Parent accounts are auto-created and emailed when your ward is admitted.</div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ───
export default function PreUniversityCollege() {
  const [view, setView] = useState("landing");
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#FFF8F5;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(${C.maroon},${C.amber});border-radius:2px;}
      `}</style>
      <Nav view={view} setView={setView} />
      {view==="landing" && <Landing setView={setView} />}
      {view==="apply"   && <AdmissionForm setView={setView} />}
      {view==="student" && <StudentPortal />}
      {view==="parent"  && <ParentPortal />}
    </div>
  );
}
