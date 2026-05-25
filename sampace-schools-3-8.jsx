import { useState } from "react";

// ─── SCHOOL DEFINITIONS ───
const SCHOOLS = {
  technology: {
    id: "technology", num: "03",
    name: "School of Technology",
    short: "Tech & Digital Skills",
    tagline: "Code · Design · Cybersecurity · Data Science",
    emoji: "💻",
    grad1: "#1A0040", grad2: "#4A148C", grad3: "#9C27B0",
    accent: "#CE93D8", accentDark: "#6A1B9A",
    light: "#F3E5F5", border: "#E1BEE7",
    nav: "rgba(26,0,64,0.97)",
    courses: [
      { id:"webdev",    name:"Full-Stack Web Development",  duration:"12 weeks", level:"Beginner–Intermediate", price:85000,  students:47, rating:4.8, icon:"🌐", tag:"Most Popular", desc:"HTML, CSS, JavaScript, React, Node.js and database integration. Build real-world projects." },
      { id:"cyber",     name:"Cybersecurity Fundamentals",  duration:"10 weeks", level:"Intermediate",          price:95000,  students:31, rating:4.9, icon:"🔐", tag:"High Demand",  desc:"Network security, ethical hacking, penetration testing and security certifications prep." },
      { id:"data",      name:"Data Science & Analytics",    duration:"12 weeks", level:"Intermediate",          price:90000,  students:28, rating:4.7, icon:"📊", tag:"",            desc:"Python, Pandas, machine learning basics, data visualisation and real-world datasets." },
      { id:"uiux",      name:"UI/UX Design",                duration:"8 weeks",  level:"Beginner",              price:65000,  students:39, rating:4.6, icon:"🎨", tag:"",            desc:"Figma, design thinking, user research, wireframing and building a professional portfolio." },
      { id:"mobile",    name:"Mobile App Development",      duration:"10 weeks", level:"Intermediate",          price:88000,  students:22, rating:4.7, icon:"📱", tag:"New",          desc:"React Native for iOS and Android. Build, test and deploy cross-platform mobile apps." },
      { id:"cloud",     name:"Cloud Computing (AWS)",       duration:"8 weeks",  level:"Intermediate–Advanced", price:95000,  students:18, rating:4.8, icon:"☁️", tag:"",            desc:"AWS core services, cloud architecture, deployment and AWS Solutions Architect prep." },
    ],
    cohorts: [{ label:"Cohort 7 — July 2026", spots:12, status:"Enrolling" },{ label:"Cohort 8 — September 2026", spots:25, status:"Coming Soon" }],
    features: ["Live coding sessions (recorded)","Real project portfolio","Industry-certified instructors","Job placement support","WhatsApp cohort community","Certificate of completion"],
  },
  advanced: {
    id: "advanced", num: "05",
    name: "School of Advanced & International",
    short: "SAT · IELTS · A-Level · TOEFL",
    tagline: "International Examinations · Global Standards",
    emoji: "🌍",
    grad1: "#3E0020", grad2: "#880E4F", grad3: "#E91E63",
    accent: "#F48FB1", accentDark: "#880E4F",
    light: "#FCE4EC", border: "#F8BBD0",
    nav: "rgba(62,0,32,0.97)",
    courses: [
      { id:"ielts",   name:"IELTS Academic Preparation",     duration:"8 weeks",  level:"Intermediate–Advanced", price:75000, students:38, rating:4.9, icon:"🎯", tag:"Most Popular", desc:"All 4 bands — Listening, Reading, Writing, Speaking. Target band 7.0 and above." },
      { id:"sat",     name:"SAT Exam Preparation",           duration:"10 weeks", level:"All Levels",            price:80000, students:24, rating:4.8, icon:"📐", tag:"",            desc:"Math, Evidence-Based Reading & Writing. Strategies, timed practice and full mock tests." },
      { id:"alevel",  name:"A-Level Programme",              duration:"9 months", level:"Post-O'Level",          price:250000,students:19, rating:4.9, icon:"🏫", tag:"Intensive",   desc:"Cambridge A-Level in Sciences, Humanities and Business. Leads to UK university entry." },
      { id:"toefl",   name:"TOEFL iBT Preparation",          duration:"6 weeks",  level:"Intermediate–Advanced", price:65000, students:16, rating:4.7, icon:"🔤", tag:"",            desc:"Reading, Listening, Speaking, Writing. Full test simulations and examiner feedback." },
      { id:"gre",     name:"GRE Postgraduate Prep",          duration:"8 weeks",  level:"Graduate Level",        price:85000, students:12, rating:4.8, icon:"📚", tag:"New",          desc:"Verbal Reasoning, Quantitative Reasoning and Analytical Writing for postgrad admission." },
      { id:"gmat",    name:"GMAT Business School Prep",      duration:"8 weeks",  level:"Graduate Level",        price:90000, students:9,  rating:4.7, icon:"💼", tag:"",            desc:"Analytical Writing, Integrated Reasoning, Quantitative and Verbal sections mastery." },
    ],
    cohorts: [{ label:"June Cohort 2026", spots:8, status:"Enrolling" },{ label:"August Cohort 2026", spots:20, status:"Coming Soon" }],
    features: ["Native & near-native tutors","Official exam strategy sessions","Full mock tests with feedback","Score guarantee policy","International study community","Certificate of preparation"],
  },
  business: {
    id: "business", num: "06",
    name: "School of Business & Professional",
    short: "PMP · ACCA · ICAN · CFA · CIMA",
    tagline: "Professional Certifications · Career Advancement",
    emoji: "📊",
    grad1: "#003040", grad2: "#00607A", grad3: "#00BCD4",
    accent: "#80DEEA", accentDark: "#006064",
    light: "#E0F7FA", border: "#B2EBF2",
    nav: "rgba(0,48,64,0.97)",
    courses: [
      { id:"acca",  name:"ACCA — Applied Knowledge",          duration:"Per Paper", level:"All Levels",         price:85000,  students:55, rating:4.9, icon:"📋", tag:"Most Popular", desc:"ACCA F1–F3 Applied Knowledge papers. Exam-aligned study with mock exams and past questions." },
      { id:"ican",  name:"ICAN Foundation & Skills",          duration:"Per Level", level:"All Levels",         price:80000,  students:43, rating:4.8, icon:"🏦", tag:"",            desc:"ICAN foundation and skills levels. Nigerian accounting standards, tax and audit modules." },
      { id:"pmp",   name:"PMP Certification Prep",            duration:"8 weeks",  level:"Project Managers",   price:120000, students:29, rating:4.9, icon:"📅", tag:"High Demand",  desc:"PMBOK 7th edition. 35 contact hours included. Mock exams and application support." },
      { id:"cfa",   name:"CFA Level 1 Preparation",           duration:"16 weeks", level:"Finance Graduates",  price:150000, students:18, rating:4.8, icon:"📈", tag:"",            desc:"All 10 CFA topic areas. Ethics, Fixed Income, Equity, Derivatives and Portfolio Management." },
      { id:"cima",  name:"CIMA Certificate in Business Acc.", duration:"Per Paper", level:"All Levels",         price:75000,  students:21, rating:4.7, icon:"💹", tag:"New",          desc:"CIMA BA1–BA4 Certificate papers. Management accounting, business law and finance." },
      { id:"cipm",  name:"CIPM HR Professional Cert.",        duration:"Per Level", level:"HR Professionals",   price:70000,  students:24, rating:4.6, icon:"👥", tag:"",            desc:"CIPM foundation and professional levels. Nigerian labour law, compensation and HR strategy." },
    ],
    cohorts: [{ label:"Q3 Cohort — July 2026", spots:10, status:"Enrolling" },{ label:"Q4 Cohort — October 2026", spots:25, status:"Coming Soon" }],
    features: ["Industry-certified professional tutors","Exam-aligned study materials","Mock exams & past questions","Study group WhatsApp community","35 CPD hours (where applicable)","Certificate of completion"],
  },
  communication: {
    id: "communication", num: "07",
    name: "School of Communication & Diction",
    short: "Public Speaking · Diction · Presentation",
    tagline: "Speak · Present · Lead · Influence",
    emoji: "🎤",
    grad1: "#0D2040", grad2: "#01579B", grad3: "#29B6F6",
    accent: "#81D4FA", accentDark: "#0277BD",
    light: "#E1F5FE", border: "#B3E5FC",
    nav: "rgba(13,32,64,0.97)",
    courses: [
      { id:"publicspeaking", name:"Public Speaking Mastery",        duration:"6 weeks", level:"All Levels",      price:55000, students:29, rating:4.8, icon:"🎙️", tag:"Most Popular", desc:"Confidence building, voice projection, body language, stage presence and speech structuring." },
      { id:"diction",        name:"Diction & Accent Training",       duration:"6 weeks", level:"All Levels",      price:50000, students:22, rating:4.9, icon:"🗣️", tag:"",            desc:"Correct pronunciation, Standard Nigerian English, accent reduction and oral clarity." },
      { id:"presentation",   name:"Business Presentation Skills",    duration:"4 weeks", level:"Professionals",   price:45000, students:18, rating:4.7, icon:"📊", tag:"",            desc:"PowerPoint mastery, executive presence, boardroom presentations and pitch delivery." },
      { id:"debate",         name:"Debate & Argumentation",          duration:"6 weeks", level:"Students",        price:40000, students:15, rating:4.8, icon:"⚖️", tag:"",            desc:"Argument construction, rebuttal techniques, research skills and competitive debate formats." },
      { id:"media",          name:"Media & TV Presentation",         duration:"8 weeks", level:"Intermediate",    price:65000, students:11, rating:4.7, icon:"📺", tag:"New",          desc:"On-camera confidence, broadcast voice, interviewing techniques and news presentation." },
      { id:"leadership",     name:"Leadership Communication",        duration:"4 weeks", level:"Leaders/Managers",price:60000, students:14, rating:4.6, icon:"👑", tag:"",            desc:"Communicating with authority, motivating teams, conflict resolution and executive presence." },
    ],
    cohorts: [{ label:"Cohort 5 — June 2026", spots:6, status:"Enrolling" },{ label:"Cohort 6 — August 2026", spots:20, status:"Coming Soon" }],
    features: ["Live sessions with video feedback","Practice recordings reviewed by coach","Small group cohorts (max 15)","WhatsApp accountability group","Performance certificate","Lifetime community access"],
  },
  languages: {
    id: "languages", num: "08",
    name: "School of Languages",
    short: "French · Spanish · Arabic · Mandarin +",
    tagline: "Become Multilingual · Connect Globally",
    emoji: "🌐",
    grad1: "#1A003E", grad2: "#311B92", grad3: "#7986CB",
    accent: "#C5CAE9", accentDark: "#311B92",
    light: "#EDE7F6", border: "#D1C4E9",
    nav: "rgba(26,0,62,0.97)",
    courses: [
      { id:"french",    name:"French Language (A1–C1)",        duration:"Per Level",  level:"Beginner–Advanced", price:55000, students:22, rating:4.8, icon:"🇫🇷", tag:"Most Popular", desc:"All CEFR levels from A1 to C1. Conversation, grammar, DELF/DALF certification prep." },
      { id:"spanish",   name:"Spanish Language (A1–C1)",       duration:"Per Level",  level:"Beginner–Advanced", price:55000, students:17, rating:4.7, icon:"🇪🇸", tag:"",            desc:"All CEFR levels. Conversational Spanish, grammar and DELE certification preparation." },
      { id:"arabic",    name:"Arabic Language (Modern Standard)",duration:"Per Level", level:"Beginner–Advanced", price:60000, students:14, rating:4.8, icon:"🕌", tag:"",            desc:"Modern Standard Arabic and conversational Arabic. Reading, writing and speaking." },
      { id:"mandarin",  name:"Mandarin Chinese (HSK 1–4)",     duration:"Per Level",  level:"Beginner–Advanced", price:65000, students:9,  rating:4.7, icon:"🇨🇳", tag:"New",          desc:"HSK-aligned Mandarin from beginner to intermediate. Characters, tones and conversation." },
      { id:"german",    name:"German Language (A1–B2)",        duration:"Per Level",  level:"Beginner–Advanced", price:58000, students:11, rating:4.6, icon:"🇩🇪", tag:"",            desc:"All levels from A1 to B2. Goethe-Institut exam preparation and conversational German." },
      { id:"yoruba",    name:"Yoruba Language & Culture",      duration:"8 weeks",    level:"All Levels",        price:35000, students:16, rating:4.9, icon:"🥁", tag:"",            desc:"Reading, writing and speaking Yoruba. Cultural context, proverbs and literature." },
    ],
    cohorts: [{ label:"June Cohort 2026", spots:8, status:"Enrolling" },{ label:"September Cohort 2026", spots:20, status:"Coming Soon" }],
    features: ["Native or near-native speakers","CEFR-aligned curriculum","Conversational practice sessions","Language exchange WhatsApp group","Internationally recognised certificate","Cultural immersion content"],
  },
};

// ─── HELPERS ───
const C = { navy:"#0B1F3A", gold:"#C9A84C", white:"#FFFFFF", cream:"#F8F9FF", slate:"#64748B", border:"#E2E8F0", green:"#10B981", amber:"#F59E0B" };

function Card({ children, style={} }) {
  return <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", ...style }}>{children}</div>;
}

// ─── MAIN HUB (School selector) ───
function SchoolHub({ setActive }) {
  const schools = Object.values(SCHOOLS);
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background:"#060E1A", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#060E1A;}
        ::-webkit-scrollbar-thumb{background:#C9A84C;border-radius:2px;}
      `}</style>

      {/* Hub Nav */}
      <nav style={{ background:"rgba(6,14,26,0.97)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(201,168,76,0.15)", padding:"0 48px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, background:"linear-gradient(135deg,#1565C0,#42A5F5)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue'", fontSize:16, color:"#fff" }}>SI</div>
          <div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:3, background:"linear-gradient(90deg,#64B5F6,#C9A84C)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>SAMPACE INSTITUTE</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:2, textTransform:"uppercase" }}>Cohort Schools · Select a School</div>
          </div>
        </div>
        <button style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:C.navy, border:"none", padding:"8px 20px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>← Back to Main Site</button>
      </nav>

      {/* Hero */}
      <section style={{ padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(100,181,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(100,181,246,0.04) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:700, height:400, background:"radial-gradient(ellipse,rgba(21,101,192,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:2, maxWidth:700, margin:"0 auto" }}>
          <div style={{ display:"inline-block", border:"1px solid rgba(201,168,76,0.4)", color:"#C9A84C", padding:"5px 20px", borderRadius:100, fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:24, background:"rgba(201,168,76,0.08)" }}>
            Six Specialist Schools
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,7vw,80px)", fontWeight:700, lineHeight:0.95, marginBottom:16 }}>
            <span style={{ background:"linear-gradient(135deg,#fff,#64B5F6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Cohort-Based</span><br/>
            <span style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Schools</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:16, lineHeight:1.8, maxWidth:520, margin:"0 auto" }}>
            Select any of our six specialist schools below. Each runs as an independent portal with its own courses, cohorts, instructors and community.
          </p>
        </div>
      </section>

      {/* School Cards */}
      <section style={{ padding:"0 48px 80px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, maxWidth:1100, margin:"0 auto" }}>
          {schools.map(s=>(
            <div key={s.id} onMouseEnter={()=>setHovered(s.id)} onMouseLeave={()=>setHovered(null)} onClick={()=>setActive(s.id)}
              style={{ borderRadius:16, overflow:"hidden", cursor:"pointer", transition:"all .35s cubic-bezier(.4,0,.2,1)", transform:hovered===s.id?"translateY(-8px) scale(1.02)":"translateY(0) scale(1)", boxShadow:hovered===s.id?`0 28px 64px rgba(0,0,0,0.5)`:"0 4px 20px rgba(0,0,0,0.3)" }}>
              <div style={{ background:`linear-gradient(135deg,${s.grad1} 0%,${s.grad2} 50%,${s.grad3} 100%)`, padding:"36px 28px 28px", position:"relative", minHeight:280 }}>
                {/* Decorative */}
                <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.04)", transition:"transform .4s", transform:hovered===s.id?"scale(1.4)":"scale(1)" }} />
                <div style={{ position:"absolute", bottom:-20, left:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }} />

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, position:"relative", zIndex:2 }}>
                  <span style={{ fontFamily:"'Bebas Neue'", fontSize:52, color:"rgba(255,255,255,0.1)", letterSpacing:2, lineHeight:1 }}>{s.num}</span>
                  <span style={{ fontSize:36, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", borderRadius:12, padding:"8px 12px", border:"1px solid rgba(255,255,255,0.2)", display:"block", transition:"transform .3s", transform:hovered===s.id?"scale(1.15) rotate(5deg)":"scale(1)" }}>{s.emoji}</span>
                </div>

                <div style={{ position:"relative", zIndex:2 }}>
                  <div style={{ fontSize:10, letterSpacing:3, color:s.accent, textTransform:"uppercase", marginBottom:6, fontWeight:600 }}>{s.short}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#fff", lineHeight:1.15, marginBottom:6 }}>{s.name}</h3>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontStyle:"italic", marginBottom:16 }}>{s.tagline}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                    {s.courses.slice(0,3).map(c=>(
                      <span key={c.id} style={{ background:"rgba(255,255,255,0.1)", border:`1px solid ${s.accent}30`, color:s.accent, padding:"3px 10px", borderRadius:100, fontSize:10, fontWeight:500 }}>{c.icon} {c.name.split(" ").slice(0,2).join(" ")}</span>
                    ))}
                    <span style={{ background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)", padding:"3px 10px", borderRadius:100, fontSize:10 }}>+{s.courses.length-3} more</span>
                  </div>
                  <div style={{ display:"flex", gap:20 }}>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:s.accent, letterSpacing:1 }}>{s.courses.length}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>Courses</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:s.accent, letterSpacing:1 }}>{s.courses.reduce((a,c)=>a+c.students,0)}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>Students</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:"#10B981", letterSpacing:1 }}>OPEN</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>Enrolling</div>
                    </div>
                  </div>
                </div>

                <div style={{ position:"relative", zIndex:2, marginTop:20, opacity:hovered===s.id?1:0, transform:hovered===s.id?"translateY(0)":"translateY(8px)", transition:"all .3s" }}>
                  <div style={{ width:"100%", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:`1px solid ${s.accent}`, color:"#fff", padding:"10px", borderRadius:8, textAlign:"center", fontSize:13, fontWeight:600 }}>
                    Enter School →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── INDIVIDUAL SCHOOL PORTAL ───
function SchoolPortal({ schoolId, setActive }) {
  const s = SCHOOLS[schoolId];
  const [view, setView]         = useState("landing");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollStep, setEnrollStep] = useState(1);
  const [enrolled, setEnrolled] = useState(false);
  const [studentTab, setStudentTab] = useState("dashboard");

  // ── Landing ──
  function Landing() {
    const [hovC, setHovC] = useState(null);
    return (
      <div style={{ background:s.light }}>
        {/* Hero */}
        <section style={{ background:`linear-gradient(160deg,${s.grad1} 0%,${s.grad2} 55%,${s.grad3} 100%)`, padding:"88px 48px", textAlign:"center", position:"relative", overflow:"hidden", minHeight:"85vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${s.accent}06 1px,transparent 1px),linear-gradient(90deg,${s.accent}06 1px,transparent 1px)`, backgroundSize:"60px 60px" }} />
          <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:600, height:400, background:`radial-gradient(ellipse,${s.grad3}18 0%,transparent 70%)`, pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:2, maxWidth:800, margin:"0 auto" }}>
            <div style={{ width:72, height:72, background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px", boxShadow:`0 8px 28px ${s.grad2}60`, border:`2px solid ${s.accent}40` }}>{s.emoji}</div>
            <div style={{ display:"inline-block", border:`1px solid ${s.accent}80`, color:s.accent, padding:"5px 18px", borderRadius:100, fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:20, background:`${s.grad3}18` }}>
              School {s.num} · Cohort-Based Learning
            </div>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6.5vw,80px)", fontWeight:700, color:"#fff", lineHeight:0.92, letterSpacing:-1, marginBottom:14 }}>
              <span style={{ background:`linear-gradient(135deg,#fff,${s.accent})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.name.split(" ").slice(0,-1).join(" ")}</span><br/>
              <span style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>{s.name.split(" ").slice(-1)[0]}</span>
            </h1>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(12px,1.8vw,18px)", letterSpacing:5, color:`${s.accent}90`, margin:"14px 0 20px" }}>{s.tagline.toUpperCase()}</div>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:15, lineHeight:1.8, maxWidth:520, margin:"0 auto 36px" }}>
              {s.courses.length} specialist courses. Expert instructors. Cohort-based learning with a strong community. Enroll in the next cohort and transform your career.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={()=>setView("courses")} style={{ background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, color:"#fff", border:"none", padding:"14px 36px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:`0 8px 24px ${s.grad2}60` }}>Browse Courses →</button>
              <button style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"14px 28px", borderRadius:8, fontSize:14, cursor:"pointer" }}>💬 WhatsApp Us</button>
            </div>
            <div style={{ display:"flex", gap:48, justifyContent:"center", marginTop:56, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
              {[[s.courses.length,"Courses"],[s.courses.reduce((a,c)=>a+c.students,0),"Students"],[s.cohorts[0].spots,"Spots Left"],["100%","Online"]].map(([n,l])=>(
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:38, color:C.gold, letterSpacing:2, lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section style={{ padding:"72px 48px", background:"#fff" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div style={{ fontSize:11, letterSpacing:3, color:C.gold, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Our Courses</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:700, color:C.navy }}>What We <em style={{ color:s.accentDark, fontStyle:"italic" }}>Teach</em></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {s.courses.map(c=>(
                <div key={c.id} onMouseEnter={()=>setHovC(c.id)} onMouseLeave={()=>setHovC(null)}
                  style={{ background:hovC===c.id?s.light:"#FAFAFA", border:`2px solid ${hovC===c.id?s.accentDark+"60":C.border}`, borderRadius:14, padding:"28px 24px", cursor:"pointer", transition:"all .3s", transform:hovC===c.id?"translateY(-4px)":"translateY(0)", boxShadow:hovC===c.id?`0 12px 36px ${s.grad2}18`:"none", borderTop:`4px solid ${s.accentDark}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                    <div style={{ fontSize:32 }}>{c.icon}</div>
                    {c.tag&&<span style={{ background:`${s.grad2}15`, color:s.accentDark, padding:"3px 10px", borderRadius:100, fontSize:10, fontWeight:700 }}>{c.tag}</span>}
                  </div>
                  <div style={{ fontWeight:700, fontSize:15, color:C.navy, marginBottom:6, lineHeight:1.3 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:C.slate, lineHeight:1.6, marginBottom:14 }}>{c.desc}</div>
                  <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
                    <span style={{ background:s.light, color:s.accentDark, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:500 }}>⏱ {c.duration}</span>
                    <span style={{ background:s.light, color:s.accentDark, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:500 }}>👤 {c.level}</span>
                    <span style={{ background:s.light, color:s.accentDark, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:500 }}>⭐ {c.rating}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:24, color:s.accentDark, letterSpacing:1 }}>₦{c.price.toLocaleString()}</div>
                    <button onClick={()=>{ setSelectedCourse(c); setView("enroll"); }} style={{ background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, color:"#fff", border:"none", padding:"8px 20px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Enroll →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cohorts */}
        <section style={{ padding:"60px 48px", background:s.light }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <div style={{ fontSize:11, letterSpacing:3, color:C.gold, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Upcoming Cohorts</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:700, color:C.navy }}>Join the Next <em style={{ color:s.accentDark, fontStyle:"italic" }}>Cohort</em></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {s.cohorts.map((co,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:14, padding:"28px", border:`2px solid ${i===0?s.accentDark:C.border}`, borderTop:`4px solid ${i===0?s.accentDark:"#CBD5E1"}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:24, color:i===0?s.accentDark:C.slate, letterSpacing:1 }}>{co.label}</div>
                    <span style={{ background:i===0?"rgba(16,185,129,0.12)":"rgba(100,116,139,0.12)", color:i===0?"#10B981":C.slate, padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:700 }}>{co.status}</span>
                  </div>
                  <div style={{ fontSize:14, color:C.slate, marginBottom:16 }}>
                    {i===0?`Only `:<span style={{ color:C.slate }}>Up to </span>}
                    <strong style={{ color:i===0?s.accentDark:C.navy }}>{co.spots} spots</strong>
                    {i===0?" remaining — enroll now to secure your place":" available in this cohort"}
                  </div>
                  <button onClick={()=>setView("enroll")} disabled={i!==0} style={{ width:"100%", background:i===0?`linear-gradient(135deg,${s.grad2},${s.grad3})`:"#F1F5F9", color:i===0?"#fff":C.slate, border:"none", padding:"12px", borderRadius:8, fontSize:13, fontWeight:700, cursor:i===0?"pointer":"not-allowed", opacity:i===0?1:0.7 }}>
                    {i===0?"Enroll Now →":"Notify Me When Open"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding:"60px 48px", background:"#fff" }}>
          <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:700, color:C.navy, marginBottom:36 }}>What You <em style={{ color:s.accentDark, fontStyle:"italic" }}>Get</em></h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {s.features.map((f,i)=>(
                <div key={i} style={{ background:s.light, borderRadius:10, padding:"20px", border:`1px solid ${s.border}` }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>✅</div>
                  <div style={{ fontSize:13, fontWeight:600, color:C.navy, lineHeight:1.4 }}>{f}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background:`linear-gradient(135deg,${s.grad1},${s.grad2})`, padding:"72px 48px", textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(36px,5.5vw,64px)", color:"#fff", letterSpacing:3, marginBottom:12 }}>READY TO START?</h2>
          <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:400, margin:"0 auto 32px", lineHeight:1.7 }}>Limited spots per cohort. Enroll now and join a community of learners transforming their careers.</p>
          <button onClick={()=>setView("enroll")} style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"14px 44px", borderRadius:8, fontSize:15, fontWeight:800, cursor:"pointer" }}>
            Enroll in Next Cohort →
          </button>
        </section>
      </div>
    );
  }

  // ── Enrollment Form ──
  function EnrollForm() {
    if (enrolled) return (
      <div style={{ background:s.light, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
        <div style={{ background:"#fff", borderRadius:16, padding:"56px 48px", textAlign:"center", maxWidth:500, boxShadow:"0 16px 48px rgba(0,0,0,0.08)" }}>
          <div style={{ width:72, height:72, background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px" }}>🎉</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:C.navy, marginBottom:8 }}>Enrollment Confirmed!</h2>
          <p style={{ color:C.slate, lineHeight:1.7, marginBottom:24 }}>Welcome to <strong>{s.name}</strong>! Your student portal and WhatsApp group invite will be sent to your email within <strong>1 hour</strong>.</p>
          <div style={{ background:s.light, borderRadius:10, padding:"16px 20px", marginBottom:24, textAlign:"left" }}>
            {[["School",s.name],["Course",selectedCourse?.name||s.courses[0].name],["Cohort",s.cohorts[0].label],["Enrollment ID",`${s.num}-${Math.floor(Math.random()*9000+1000)}`]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${s.border}` }}>
                <span style={{ fontSize:12, color:C.slate }}>{k}</span>
                <span style={{ fontSize:12, fontWeight:600, color:C.navy }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <button onClick={()=>{ setView("landing"); setEnrolled(false); setEnrollStep(1); }} style={{ background:"#F1F5F9", border:`1px solid ${C.border}`, color:C.navy, padding:"10px 20px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:600 }}>← Back</button>
            <button onClick={()=>setView("student")} style={{ background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:700 }}>Go to Dashboard →</button>
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ background:s.light, minHeight:"100vh", padding:"40px 48px" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <button onClick={()=>setView("landing")} style={{ background:"none", border:"none", color:C.slate, fontSize:13, cursor:"pointer", marginBottom:12 }}>← Back to {s.name}</button>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:C.navy, marginBottom:4 }}>
            Course <em style={{ color:s.accentDark, fontStyle:"italic" }}>Enrollment</em>
          </h1>
          <div style={{ fontSize:13, color:C.slate, marginBottom:24 }}>{s.name} · SAMPACE INSTITUTE</div>

          {/* Course selected banner */}
          {selectedCourse && (
            <div style={{ background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, borderRadius:12, padding:"16px 20px", marginBottom:20, display:"flex", gap:14, alignItems:"center" }}>
              <span style={{ fontSize:28 }}>{selectedCourse.icon}</span>
              <div>
                <div style={{ fontWeight:700, color:"#fff", fontSize:14 }}>{selectedCourse.name}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.7)" }}>{selectedCourse.duration} · ₦{selectedCourse.price.toLocaleString()}</div>
              </div>
              <button onClick={()=>setSelectedCourse(null)} style={{ marginLeft:"auto", background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", width:28, height:28, borderRadius:"50%", cursor:"pointer", fontSize:14 }}>×</button>
            </div>
          )}

          {/* Step indicator */}
          <div style={{ background:"#fff", borderRadius:12, padding:"16px 24px", marginBottom:20, border:`1px solid ${C.border}`, display:"flex", gap:0 }}>
            {["Your Details","Course & Cohort","Payment"].map((label,i)=>(
              <div key={i} style={{ flex:1, display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:i+1<enrollStep?"#10B981":i+1===enrollStep?`linear-gradient(135deg,${s.grad2},${s.grad3})`:"#F1F5F9", border:i+1>enrollStep?`2px solid ${C.border}`:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:i+1<=enrollStep?"#fff":C.slate, fontWeight:700 }}>{i+1<enrollStep?"✓":i+1}</div>
                  <div style={{ fontSize:11, color:i+1===enrollStep?s.accentDark:C.slate, marginTop:5, fontWeight:i+1===enrollStep?700:400 }}>{label}</div>
                </div>
                {i<2&&<div style={{ height:2, flex:1, background:i+1<enrollStep?"#10B981":C.border, margin:"0 4px", marginBottom:20 }} />}
              </div>
            ))}
          </div>

          <div style={{ background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            <div style={{ background:`linear-gradient(135deg,${s.grad1},${s.grad2})`, padding:"18px 28px" }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, color:C.gold, letterSpacing:2 }}>STEP {enrollStep} OF 3</div>
              <div style={{ fontSize:15, color:"#fff", fontWeight:600 }}>{["Your Personal Details","Choose Your Course & Cohort","Review & Pay"][enrollStep-1]}</div>
            </div>
            <div style={{ padding:"28px 28px" }}>
              {enrollStep===1&&(
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
                  {[["First Name *","text"],["Last Name *","text"],["Phone Number *","tel"],["Email Address *","email"],["Date of Birth","date"],["Gender *","select:Male,Female"],["State of Origin *","text"],["Highest Qualification *","select:O'Level,NCE,OND,HND,B.Sc,M.Sc,Other"],["Current Occupation","text"],["How Did You Hear About Us?","select:Social Media,Google,Friend Referral,WhatsApp,Other"]].map(([label,type])=>(
                    <div key={label}>
                      <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                      {type.startsWith("select")?(
                        <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, outline:"none", background:"#fff" }}>
                          <option value="">Select...</option>
                          {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                        </select>
                      ):(
                        <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, outline:"none" }} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {enrollStep===2&&(
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:14 }}>Select a Course</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                    {s.courses.map(c=>(
                      <div key={c.id} onClick={()=>setSelectedCourse(c)} style={{ border:`2px solid ${selectedCourse?.id===c.id?s.accentDark:C.border}`, borderRadius:10, padding:"14px", cursor:"pointer", background:selectedCourse?.id===c.id?s.light:"#fff", transition:"all .2s" }}>
                        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
                          <span style={{ fontSize:20 }}>{c.icon}</span>
                          <div style={{ fontWeight:600, fontSize:13, color:selectedCourse?.id===c.id?s.accentDark:C.navy, lineHeight:1.2, flex:1 }}>{c.name}</div>
                          {selectedCourse?.id===c.id&&<span style={{ color:s.accentDark }}>✓</span>}
                        </div>
                        <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, color:s.accentDark, letterSpacing:1 }}>₦{c.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:14 }}>Select a Cohort</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {s.cohorts.map((co,i)=>(
                      <div key={i} style={{ border:`2px solid ${i===0?s.accentDark:C.border}`, borderRadius:10, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", background:i===0?s.light:"#F8F9FF", opacity:i===0?1:0.6 }}>
                        <div>
                          <div style={{ fontWeight:600, fontSize:13, color:C.navy }}>{co.label}</div>
                          <div style={{ fontSize:12, color:C.slate }}>{co.spots} spots · {co.status}</div>
                        </div>
                        <span style={{ background:i===0?"rgba(16,185,129,0.12)":"rgba(100,116,139,0.12)", color:i===0?"#10B981":C.slate, padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:700 }}>{i===0?"✓ Selected":"Not Available"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {enrollStep===3&&(
                <div>
                  <div style={{ background:s.light, borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:14 }}>Enrollment Summary</div>
                    {[["School",s.name],["Course",selectedCourse?.name||s.courses[0].name],["Cohort",s.cohorts[0].label],["Duration",selectedCourse?.duration||s.courses[0].duration],["Amount",`₦${(selectedCourse?.price||s.courses[0].price).toLocaleString()}`]].map(([k,v])=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${s.border}` }}>
                        <span style={{ fontSize:13, color:C.slate }}>{k}</span>
                        <span style={{ fontSize:13, fontWeight:600, color:C.navy }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0" }}>
                      <span style={{ fontSize:15, fontWeight:700, color:C.navy }}>Total</span>
                      <span style={{ fontFamily:"'Bebas Neue'", fontSize:26, color:s.accentDark, letterSpacing:1 }}>₦{(selectedCourse?.price||s.courses[0].price).toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{ background:`${s.accentDark}08`, border:`1px solid ${s.accentDark}20`, borderRadius:10, padding:"14px 18px", marginBottom:16 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:s.accentDark, marginBottom:6 }}>🔒 Secure Payment via Paystack</div>
                    <div style={{ fontSize:12, color:C.slate, lineHeight:1.6 }}>Your portal access is activated immediately after payment. You will be added to the cohort WhatsApp group and receive your login details.</div>
                  </div>
                  <label style={{ display:"flex", gap:10, alignItems:"center", cursor:"pointer" }}>
                    <input type="checkbox" style={{ width:16, height:16, accentColor:s.accentDark }} />
                    <span style={{ fontSize:13, color:C.navy }}>I agree to SAMPACE INSTITUTE terms and refund policy</span>
                  </label>
                </div>
              )}

              <div style={{ display:"flex", justifyContent:"space-between", marginTop:28 }}>
                <button onClick={()=>enrollStep>1?setEnrollStep(e=>e-1):setView("landing")} style={{ background:"#F1F5F9", border:`1px solid ${C.border}`, color:C.navy, padding:"10px 24px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  {enrollStep===1?"← Back":"← Previous"}
                </button>
                <button onClick={()=>enrollStep<3?setEnrollStep(e=>e+1):setEnrolled(true)} style={{ background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, color:"#fff", border:"none", padding:"10px 28px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 14px ${s.grad2}40` }}>
                  {enrollStep===3?"💳 Pay & Enroll →":"Next →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Student Dashboard ──
  function StudentDash() {
    const course = selectedCourse || s.courses[0];
    const tabs = [["overview","🏠 Overview"],["lessons","📚 Lessons"],["assignments","📝 Assignments"],["certificate","🏆 Certificate"]];
    const progress = 65;

    return (
      <div style={{ background:s.light, minHeight:"100vh", display:"flex" }}>
        <aside style={{ width:220, background:s.grad1, minHeight:"100vh", padding:"24px 12px", position:"sticky", top:64, height:"calc(100vh - 64px)", flexShrink:0 }}>
          <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:12, padding:"16px", marginBottom:20, border:"1px solid rgba(255,255,255,0.08)", textAlign:"center" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"#fff", margin:"0 auto 10px" }}>E</div>
            <div style={{ fontWeight:700, fontSize:13, color:"#fff" }}>Emeka Nwosu</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{course.name.split(" ").slice(0,3).join(" ")}</div>
            <div style={{ fontSize:10, color:s.accent, marginTop:4, fontFamily:"monospace" }}>{s.num}-2026-0031</div>
            <div style={{ marginTop:10, background:`${s.grad3}30`, borderRadius:6, padding:"8px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.5)" }}>Progress</span>
                <span style={{ fontSize:10, color:s.accent, fontWeight:700 }}>{progress}%</span>
              </div>
              <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:100, height:4 }}>
                <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${s.accent},${s.grad3})`, borderRadius:100 }} />
              </div>
            </div>
          </div>
          {tabs.map(([id,label])=>(
            <button key={id} onClick={()=>setStudentTab(id)} style={{ width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:8, background:studentTab===id?`linear-gradient(135deg,rgba(${s.grad2.replace("#","").match(/../g).map(h=>parseInt(h,16)).join(",")},0.4),rgba(${s.grad3.replace("#","").match(/../g).map(h=>parseInt(h,16)).join(",")},0.2))`:"transparent", borderLeft:studentTab===id?`2px solid ${s.accent}`:"2px solid transparent", border:"none", color:studentTab===id?"#fff":"rgba(255,255,255,0.5)", fontSize:13, fontWeight:studentTab===id?600:400, cursor:"pointer", marginBottom:2 }}>{label}</button>
          ))}
        </aside>

        <main style={{ flex:1, padding:"28px 32px", minWidth:0 }}>
          {studentTab==="overview"&&(
            <div>
              <div style={{ marginBottom:24 }}>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy }}>
                  Welcome, <em style={{ color:s.accentDark, fontStyle:"italic" }}>Emeka</em> 👋
                </h2>
                <div style={{ fontSize:13, color:C.slate }}>{course.name} · {s.cohorts[0].label}</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
                {[["📊","Progress",`${progress}%`,"Week 8 of 12",s.accentDark],["✅","Lessons Done","18","of 28 total",C.green],["📝","Assignments","2 Pending","Due this week",C.amber],["👥","Cohort","47 Students","Active community",C.blue]].map(([icon,label,val,sub,color])=>(
                  <div key={label} style={{ background:"#fff", border:`1px solid ${color}20`, borderRadius:12, padding:"20px", borderTop:`3px solid ${color}` }}>
                    <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:32, color, letterSpacing:1, lineHeight:1 }}>{val}</div>
                    <div style={{ fontSize:12, color:C.navy, fontWeight:600, marginTop:4 }}>{label}</div>
                    <div style={{ fontSize:11, color:C.slate }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:20 }}>
                <Card>
                  <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:14, color:C.navy }}>Course Modules</div>
                  {["Module 1: Introduction & Setup","Module 2: Core Fundamentals","Module 3: Intermediate Concepts","Module 4: Advanced Techniques","Module 5: Real-World Projects","Module 6: Certification & Portfolio"].map((m,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:`1px solid #F8FAFF` }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:i<3?"rgba(16,185,129,0.15)":i===3?`${s.grad2}20`:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{i<3?"✅":i===3?"📖":"🔒"}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:i===3?700:500, color:i===3?C.navy:i<3?C.slate:"#CBD5E1" }}>{m}</div>
                      </div>
                      <span style={{ fontSize:11, color:i<3?C.green:i===3?s.accentDark:C.slate, fontWeight:600 }}>{i<3?"Done":i===3?"In Progress":"Locked"}</span>
                    </div>
                  ))}
                </Card>
                <Card style={{ padding:"20px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:14 }}>Upcoming Sessions</div>
                  {[["Live Class","Advanced Techniques Pt.2","Tomorrow, 6pm"],["Q&A Session","Module 4 Review","Friday, 5pm"],["Workshop","Project Kickoff","Next Monday"]].map(([type,title,when])=>(
                    <div key={title} style={{ background:s.light, borderRadius:8, padding:"12px", marginBottom:10, border:`1px solid ${s.border}` }}>
                      <div style={{ fontSize:10, color:s.accentDark, fontWeight:700, marginBottom:3, letterSpacing:1, textTransform:"uppercase" }}>{type}</div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.navy, marginBottom:2 }}>{title}</div>
                      <div style={{ fontSize:11, color:C.slate }}>{when}</div>
                    </div>
                  ))}
                  <button style={{ width:"100%", background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, color:"#fff", border:"none", padding:"10px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", marginTop:4 }}>💬 Join WhatsApp Group</button>
                </Card>
              </div>
            </div>
          )}

          {studentTab==="certificate"&&(
            <div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy, marginBottom:8 }}>Your <em style={{ color:s.accentDark, fontStyle:"italic" }}>Certificate</em></h2>
              <p style={{ color:C.slate, marginBottom:28 }}>Complete all modules and assignments to unlock your certificate of completion.</p>
              <div style={{ background:`linear-gradient(135deg,${s.grad1},${s.grad2})`, borderRadius:16, padding:"48px", textAlign:"center", marginBottom:20, border:`2px solid ${s.accent}40`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-30, right:-30, width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:14, letterSpacing:5, color:s.accent, marginBottom:12 }}>SAMPACE INSTITUTE</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:"#fff", marginBottom:6 }}>Certificate of Completion</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:20 }}>This is to certify that</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:700, color:C.gold, marginBottom:20, fontStyle:"italic" }}>Emeka Nwosu</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)", marginBottom:8 }}>has successfully completed</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#fff", marginBottom:24 }}>{course.name}</div>
                <div style={{ display:"flex", justifyContent:"center", gap:40 }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ width:60, height:1, background:s.accent, margin:"0 auto 8px" }} />
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Director</div>
                  </div>
                  <div style={{ fontSize:32 }}>🏅</div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ width:60, height:1, background:s.accent, margin:"0 auto 8px" }} />
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Date</div>
                  </div>
                </div>
              </div>
              <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:10, padding:"14px 20px", textAlign:"center" }}>
                <div style={{ fontSize:13, color:C.amber, fontWeight:600 }}>⏳ Complete 35% more to unlock your certificate</div>
              </div>
            </div>
          )}

          {["lessons","assignments"].includes(studentTab)&&(
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, textAlign:"center" }}>
              <div style={{ fontSize:56, marginBottom:16 }}>{studentTab==="lessons"?"📚":"📝"}</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:C.navy, marginBottom:8 }}>
                {studentTab==="lessons"?"Course Lessons":"Assignments & Projects"}
              </h2>
              <p style={{ color:C.slate, maxWidth:380, lineHeight:1.7 }}>
                {studentTab==="lessons"?"Video lessons, downloadable notes, slides and resource files for all modules.":"Weekly assignments, project briefs and submission portal with instructor feedback."}
              </p>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ── School Nav ──
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <nav style={{ position:"sticky", top:0, zIndex:200, background:s.nav, backdropFilter:"blur(16px)", borderBottom:`1px solid ${s.accent}20`, padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={()=>setActive(null)} style={{ background:"rgba(255,255,255,0.08)", border:"none", color:"rgba(255,255,255,0.6)", padding:"6px 12px", borderRadius:6, fontSize:12, cursor:"pointer", marginRight:8 }}>← All Schools</button>
          <div style={{ width:38, height:38, background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{s.emoji}</div>
          <div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, letterSpacing:3, background:`linear-gradient(90deg,${s.accent},${C.gold})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.name.toUpperCase()}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:2 }}>SAMPACE INSTITUTE · SCHOOL {s.num}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {[["landing","🏠 Home"],["courses","📚 Courses"],["enroll","📋 Enroll"],["student","🎓 Dashboard"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{ background:view===v?`linear-gradient(135deg,${s.grad2},${s.grad3})`:"transparent", border:"none", color:view===v?"#fff":"rgba(255,255,255,0.55)", padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        <button onClick={()=>setView("enroll")} style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"8px 18px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>Enroll Now</button>
      </nav>

      {view==="landing" && <Landing />}
      {view==="courses" && (
        <div style={{ background:s.light, padding:"60px 48px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy, marginBottom:8 }}>All <em style={{ color:s.accentDark, fontStyle:"italic" }}>Courses</em></h2>
            <p style={{ color:C.slate, marginBottom:36 }}>{s.courses.length} courses available · New cohorts starting {s.cohorts[0].label}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {s.courses.map(c=>(
                <div key={c.id} style={{ background:"#fff", borderRadius:14, padding:"28px 24px", border:`2px solid ${C.border}`, borderTop:`4px solid ${s.accentDark}`, transition:"all .25s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.accentDark}60`; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 32px ${s.grad2}18`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                    <span style={{ fontSize:32 }}>{c.icon}</span>
                    {c.tag&&<span style={{ background:`${s.grad2}15`, color:s.accentDark, padding:"2px 10px", borderRadius:100, fontSize:10, fontWeight:700, alignSelf:"flex-start" }}>{c.tag}</span>}
                  </div>
                  <div style={{ fontWeight:700, fontSize:15, color:C.navy, marginBottom:6 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:C.slate, lineHeight:1.6, marginBottom:14 }}>{c.desc}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                    {[`⏱ ${c.duration}`,`👤 ${c.level}`,`⭐ ${c.rating}`,`👥 ${c.students} enrolled`].map(tag=>(
                      <span key={tag} style={{ background:s.light, color:s.accentDark, padding:"3px 10px", borderRadius:100, fontSize:10, fontWeight:500 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, color:s.accentDark, letterSpacing:1 }}>₦{c.price.toLocaleString()}</div>
                    <button onClick={()=>{ setSelectedCourse(c); setView("enroll"); }} style={{ background:`linear-gradient(135deg,${s.grad2},${s.grad3})`, color:"#fff", border:"none", padding:"9px 20px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Enroll →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {view==="enroll"  && <EnrollForm />}
      {view==="student" && <StudentDash />}
    </div>
  );
}

// ─── ROOT ───
export default function CohortSchools() {
  const [active, setActive] = useState(null);
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#060E1A;}
        ::-webkit-scrollbar-thumb{background:#C9A84C;border-radius:2px;}
      `}</style>
      {active ? <SchoolPortal schoolId={active} setActive={setActive} /> : <SchoolHub setActive={setActive} />}
    </div>
  );
}
