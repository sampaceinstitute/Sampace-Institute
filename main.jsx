import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

// ─── CONFIG ───
const WA_COMMUNITY = "https://chat.whatsapp.com/HLWOIKvXhjqIjYAfOFjvTp";
const EMAIL        = "info@sampacecampus.com.ng";
const MOODLE_URL   = "https://learn.sampacecampus.com.ng";

// ─── DEMO CREDENTIALS ───
const ADMIN_CREDS  = { email:"admin@sampacecampus.com.ng",  password:"admin2026" };
const STAFF_CREDS  = { email:"staff@sampacecampus.com.ng",  password:"staff2026" };

// ─── GLOBAL CSS ───
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Syne:wght@400;600;700;800&family=Space+Mono&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Syne',sans-serif;background:#050A14;color:#fff;overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#050A14;}
  ::-webkit-scrollbar-thumb{background:linear-gradient(#C9A84C,#1565C0);border-radius:2px;}
  input,textarea,select{font-family:'Syne',sans-serif;}
  input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3);}
  input:focus,textarea:focus{outline:none;border-color:#C9A84C!important;}
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
  @keyframes countAnim{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
  .shimmer{background:linear-gradient(90deg,#C9A84C 0%,#FFD54F 30%,#fff 50%,#FFD54F 70%,#C9A84C 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;}
  .hover-lift{transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s ease;cursor:pointer;}
  .hover-lift:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 28px 56px rgba(0,0,0,0.4);}
  .btn-shine{position:relative;overflow:hidden;transition:all .3s ease;}
  .btn-shine::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);transform:translateX(-100%) skewX(-15deg);transition:transform .5s ease;}
  .btn-shine:hover::before{transform:translateX(200%) skewX(-15deg);}
  .btn-shine:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(201,168,76,0.4);}
  .page-in{animation:slideUp .5s cubic-bezier(.4,0,.2,1) both;}
`;

// ─── PARTICLES ───
function Particles({ n=20 }) {
  const pts = Array.from({length:n},(_,i)=>({
    id:i, left:Math.random()*100, sz:Math.random()*3+1,
    dur:Math.random()*14+7, delay:Math.random()*10,
    col:i%3===0?"#C9A84C":i%3===1?"#42A5F5":"rgba(255,255,255,.2)",
  }));
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:1}}>
      {pts.map(p=>(
        <div key={p.id} style={{position:"absolute",bottom:-10,left:`${p.left}%`,width:p.sz,height:p.sz,borderRadius:"50%",background:p.col,boxShadow:`0 0 ${p.sz*3}px ${p.col}`,animation:`particleRise ${p.dur}s ${p.delay}s linear infinite`}}/>
      ))}
    </div>
  );
}

// ─── ORBIT 3D ───
function Orbit3D() {
  return (
    <div style={{position:"relative",width:220,height:220,margin:"0 auto"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.25),transparent 70%)",animation:"pulse 3s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#C9A84C,#FFD54F,#1565C0)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"#0B1F3A",boxShadow:"0 0 50px rgba(201,168,76,0.6)",animation:"glow 3s ease-in-out infinite",zIndex:10}}>SI</div>
      {[{s:130,c:"rgba(201,168,76,.2)",d:"10s"},{s:170,c:"rgba(66,165,245,.15)",d:"16s",r:true},{s:210,c:"rgba(255,255,255,.06)",d:"22s"}].map((r,i)=>(
        <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:r.s,height:r.s,marginLeft:-r.s/2,marginTop:-r.s/2,borderRadius:"50%",border:`1px solid ${r.c}`,animation:`${r.r?"spinSlowR":"spinSlow"} ${r.d} linear infinite`}}>
          <div style={{position:"absolute",top:-3,left:"50%",marginLeft:-3,width:7,height:7,borderRadius:"50%",background:i===0?"#C9A84C":i===1?"#42A5F5":"rgba(255,255,255,.4)"}}/>
        </div>
      ))}
      {[["🎓",0],["📝",72],["💻",144],["🏛️",216],["🤝",288]].map(([e,angle],i)=>{
        const rad=(angle*Math.PI)/180;
        const x=Math.cos(rad)*86, y=Math.sin(rad)*86;
        return (
          <div key={i} style={{position:"absolute",top:"50%",left:"50%",transform:`translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`,width:28,height:28,borderRadius:8,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,animation:`floatY ${3+i*.4}s ease-in-out infinite`,animationDelay:`${i*.5}s`,zIndex:5}}>{e}</div>
        );
      })}
    </div>
  );
}

// ─── COUNT UP ───
function CountUp({ to, suf="", label }) {
  const [v,setV]=useState(0);
  const ref=useRef();
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        const num=parseInt(to),step=Math.max(1,Math.ceil(num/40));
        let cur=0;
        const t=setInterval(()=>{cur+=step;if(cur>=num){setV(num);clearInterval(t);}else setV(cur);},40);
        obs.disconnect();
      }
    });
    if(ref.current)obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[to]);
  return (
    <div ref={ref} style={{textAlign:"center"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,46px)",fontWeight:900,color:"#C9A84C",lineHeight:1,textShadow:"0 0 24px rgba(201,168,76,.4)"}}>{v}{suf}</div>
      <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:2,textTransform:"uppercase",marginTop:4}}>{label}</div>
    </div>
  );
}

// ─── SCHOOLS DATA ───
const SCHOOLS = [
  {id:"school-college",  num:"01",emoji:"🎓",name:"School College",        short:"JSS1–SS3 · Virtual Campus",           color:"#1565C0",accent:"#64B5F6",g1:"#0B2A5E",g2:"#1565C0",desc:"Nigeria's premier online secondary school. Full JSS1–SS3 curriculum, virtual labs via Moodle, CBT exams and globally competitive standards.",tags:["JSS1–SS3","Virtual Lab","WAEC·NECO","CBT","Report Cards"],applyType:"parent-student",departments:["Sciences","Humanities","Business/Commercial"],classes:["JSS1","JSS2","JSS3","SS1","SS2","SS3"],features:[{icon:"🧪",t:"Virtual Lab",d:"Physics, Chemistry, Biology via LTI-Moodle"},{icon:"📚",t:"Digital Library",d:"Textbooks, past questions and e-resources"},{icon:"📝",t:"CBT Engine",d:"Objective, theory, fill-in-gap questions"},{icon:"📊",t:"Report Cards",d:"CA1+CA2+Project+Exam per term"},{icon:"🎬",t:"Live Classes",d:"Zoom integrated via Moodle LMS"},{icon:"👨‍👩‍👧",t:"Parent Portal",d:"Auto-created on admission approval"}]},
  {id:"tutorial",        num:"02",emoji:"📝",name:"Tutorial & Local Exam",  short:"BECE · WAEC · NECO · GCE · JAMB",     color:"#00897B",accent:"#4DB6AC",g1:"#003D2E",g2:"#00695C",desc:"Intensive exam preparation for every major Nigerian exam. CBT, monthly mock tests, virtual labs and personalised study plans.",tags:["BECE","WAEC","NECO","JAMB/UTME","CBT","Virtual Lab"],applyType:"student-only",tracks:["BECE","WAEC","NECO","GCE","JAMB/UTME"],features:[{icon:"🎯",t:"5 Exam Tracks",d:"BECE, WAEC, NECO, GCE and JAMB"},{icon:"💻",t:"JAMB Simulator",d:"Exact JAMB interface — 160 questions"},{icon:"📅",t:"Monthly Tests",d:"Scheduled exams, auto-graded, ranked"},{icon:"🧪",t:"Virtual Lab",d:"Science practicals for all science tracks"},{icon:"🏆",t:"Leaderboard",d:"Monthly top performers with badges"},{icon:"📜",t:"Certificate",d:"Certificate of participation"}]},
  {id:"digital-campus",  num:"03–08",emoji:"🏫",name:"SAMPACE Digital Campus",short:"Technology · Business · Languages · Comm · International",color:"#7B1FA2",accent:"#CE93D8",g1:"#1A0040",g2:"#4A148C",desc:"Six specialist schools — cohort-based professional learning with live Moodle classes, community support and career-focused certification.",tags:["Technology","PMP·ACCA·ICAN","IELTS·SAT","Languages","Certificates"],applyType:"individual",subSchools:[{id:"technology",name:"School of Technology",emoji:"💻",color:"#4A148C",courses:["Full-Stack Web Dev","Cybersecurity","Data Science","UI/UX","Mobile App","Cloud/AWS"]},{id:"business",name:"Business & Professional",emoji:"📊",color:"#006064",courses:["ACCA","ICAN","PMP","CFA","CIMA","CIPM"]},{id:"international",name:"Advanced & International",emoji:"🌍",color:"#880E4F",courses:["IELTS","SAT","A-Level","TOEFL","GRE","GMAT"]},{id:"communication",name:"Communication & Diction",emoji:"🎤",color:"#0277BD",courses:["Public Speaking","Diction","Presentation","Debate","Media Training"]},{id:"languages",name:"School of Languages",emoji:"🌐",color:"#311B92",courses:["French","Spanish","Arabic","Mandarin","German","Yoruba"]}],features:[{icon:"💻",t:"School of Technology",d:"Web Dev, Cybersecurity, Data Science"},{icon:"📊",t:"Business & Professional",d:"PMP, ACCA, ICAN, CFA certifications"},{icon:"🌍",t:"Advanced & International",d:"SAT, IELTS, A-Level, TOEFL"},{icon:"🎤",t:"Communication & Diction",d:"Public speaking, diction, media"},{icon:"🌐",t:"School of Languages",d:"French, Spanish, Arabic, Mandarin"},{icon:"🏆",t:"Certificates",d:"Digital certificates on completion"}]},
  {id:"pre-university",  num:"04",emoji:"🏛️",name:"Pre-University College", short:"IJMB · JUPEB · Pre-Degree · Diploma",  color:"#BF360C",accent:"#FFAB91",g1:"#3E1A00",g2:"#BF360C",desc:"Your gateway to 200-level university admission. IJMB, JUPEB and Diploma programmes — university-standard, fully online with transcripts.",tags:["IJMB","JUPEB","Diploma","200 Level","Transcripts"],applyType:"parent-student",programs:["IJMB","JUPEB","Pre-Degree","Diploma"],classes:["IJMB","JUPEB","Pre-Degree","Diploma"],features:[{icon:"🎓",t:"IJMB",d:"Direct 200-level entry without JAMB"},{icon:"🏛️",t:"JUPEB",d:"University-affiliated pre-degree"},{icon:"📘",t:"Pre-Degree",d:"Foundation for 100-level entry"},{icon:"📜",t:"Diploma",d:"Professional diploma programmes"},{icon:"📋",t:"Transcript",d:"Official semester transcript"},{icon:"🎯",t:"Placement",d:"University placement guidance"}]},
  {id:"services",        num:"09",emoji:"🤝",name:"Professional Services",  short:"CV · Admissions · Consulting · Study Abroad",color:"#E65100",accent:"#FFD180",g1:"#1A1000",g2:"#E65100",desc:"Expert CV writing, university admission support, scholarship research, study abroad guidance and corporate training — all on request.",tags:["CV Writing","Admission Help","Scholarships","Study Abroad","Corporate"],applyType:"inquiry",services:["CV & Resume Writing","University Admission Support","Scholarship Research","Study Abroad Guidance","Corporate Training","SOP Writing","Educational Counselling","Document Attestation"],features:[{icon:"📄",t:"CV & Resume",d:"ATS-optimised CVs that get interviews"},{icon:"🎓",t:"Admissions",d:"Nigerian and international universities"},{icon:"🏆",t:"Scholarships",d:"Find and apply worldwide"},{icon:"🌍",t:"Study Abroad",d:"UK, USA, Canada, Australia"},{icon:"🏢",t:"Corporate Training",d:"Bespoke training for organisations"},{icon:"✍️",t:"SOP Writing",d:"Personal statements for postgraduate"}]},
];

// ─── INPUT STYLES ───
const inp = {width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,padding:"11px 13px",color:"#fff",fontSize:13,marginBottom:10,outline:"none",boxSizing:"border-box"};
const sel = {...inp,background:"rgba(11,20,40,.92)"};
const lbl = (accent) => ({fontSize:10,color:accent,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",display:"block",marginBottom:5});

// ─── LOGIN SCREEN ───
function LoginScreen({ type, onLogin, onBack }) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [error,setError]=useState("");
  const isAdmin = type==="admin";
  const creds = isAdmin ? ADMIN_CREDS : STAFF_CREDS;
  const color = isAdmin ? "#1565C0" : "#00897B";
  const grad  = isAdmin ? "135deg,#0B1F3A,#1565C0" : "135deg,#003D2E,#00695C";

  const handle = () => {
    if(email===creds.email && pass===creds.password){ onLogin(); }
    else { setError("Invalid credentials. Please try again."); }
  };

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(${grad})`,display:"flex",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden"}}>
      <Particles n={15}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",backgroundSize:"36px 36px"}}/>
      <div className="page-in" style={{background:"rgba(5,10,20,.85)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:"40px 32px",width:"100%",maxWidth:420,position:"relative",zIndex:2}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",color:"rgba(255,255,255,.6)",padding:"6px 14px",borderRadius:7,fontSize:12,cursor:"pointer",marginBottom:24,fontFamily:"'Syne',sans-serif"}}>← Back to Site</button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:64,height:64,background:`linear-gradient(135deg,${color},${color}cc)`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px",boxShadow:`0 8px 28px ${color}50`,animation:"glow 3s ease-in-out infinite"}}>
            {isAdmin?"⚙️":"👔"}
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#fff",marginBottom:4}}>
            {isAdmin?"Admin Dashboard":"Staff Portal"}
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>SAMPACE INSTITUTE</div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={lbl(color)}>Email Address</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={creds.email} style={{...inp,marginBottom:0}} onKeyDown={e=>e.key==="Enter"&&handle()}/>
        </div>
        <div style={{marginBottom:6}}>
          <label style={lbl(color)}>Password</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" style={{...inp,marginBottom:0}} onKeyDown={e=>e.key==="Enter"&&handle()}/>
        </div>
        {error && <div style={{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.25)",color:"#EF4444",padding:"8px 12px",borderRadius:7,fontSize:12,marginBottom:10}}>{error}</div>}
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"10px 13px",marginBottom:16,fontSize:11,color:"rgba(255,255,255,.4)"}}>
          Demo — Email: <span style={{color,fontFamily:"monospace"}}>{creds.email}</span><br/>Password: <span style={{color,fontFamily:"monospace"}}>{creds.password}</span>
        </div>
        <button onClick={handle} className="btn-shine" style={{width:"100%",background:`linear-gradient(135deg,${color},${color}cc)`,color:"#fff",border:"none",padding:"13px",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>
          Login to {isAdmin?"Admin Dashboard":"Staff Portal"} →
        </button>
        <div style={{textAlign:"center",marginTop:14,fontSize:11,color:"rgba(255,255,255,.25)"}}>Forgot password? Contact <a href={`mailto:${EMAIL}`} style={{color,textDecoration:"none"}}>admin</a></div>
      </div>
    </div>
  );
}

// ─── APPLY FORM ───
function ApplyModal({ school, onClose }) {
  const [step,setStep]=useState(1);
  const [appType,setAppType]=useState("parent");
  const [done,setDone]=useState(false);
  const maxSteps=school.applyType==="inquiry"?2:school.applyType==="student-only"?2:3;
  const ac=lbl(school.accent);

  if(done) return (
    <div style={{textAlign:"center",padding:"36px 16px"}}>
      <div style={{fontSize:56,marginBottom:12,animation:"floatY 2s ease-in-out infinite"}}>🎉</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#fff",marginBottom:8}}>{school.applyType==="inquiry"?"Inquiry Received!":"Application Submitted!"}</div>
      <p style={{color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:18,fontSize:13}}>{school.applyType==="inquiry"?"Our consultant will respond within 48 hours.":"Our admissions team will review within 72 hours. Check your email and WhatsApp."}</p>
      <div style={{background:"rgba(255,255,255,.05)",borderRadius:10,padding:"13px 16px",marginBottom:16,textAlign:"left"}}>
        <div style={{fontSize:10,color:school.accent,fontWeight:700,letterSpacing:1,marginBottom:4,textTransform:"uppercase"}}>Reference Number</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:17,color:"#fff"}}>{school.num.replace("–","-")}-{Math.floor(Math.random()*9000+1000)}</div>
      </div>
      <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.18)",borderRadius:9,padding:"11px 14px",marginBottom:16,fontSize:11,color:"rgba(255,255,255,.55)",lineHeight:1.6}}>
        💡 After admin approval, payment details will be sent. Student portal (Moodle LMS) and parent portal activate automatically once payment is confirmed by admin.
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <a href={WA_COMMUNITY} className="btn-shine" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",padding:"9px 18px",borderRadius:8,fontSize:12,fontWeight:700,textDecoration:"none"}}>💬 Join Community</a>
        <button onClick={onClose} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"9px 18px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Close</button>
      </div>
    </div>
  );

  if(school.applyType==="inquiry") return (
    <div>
      {step===1&&(<div>
        <label style={ac}>Full Name *</label><input style={inp} placeholder="Your full name"/>
        <label style={ac}>Email *</label><input style={inp} placeholder="email@example.com"/>
        <label style={ac}>Phone / WhatsApp *</label><input style={inp} placeholder="+234..."/>
        <label style={ac}>Service Needed *</label>
        <select style={sel}><option value="">Select service...</option>{school.services&&school.services.map(s=><option key={s}>{s}</option>)}</select>
        <div style={{display:"flex",gap:10,marginTop:8}}>
          <a href={WA_COMMUNITY} className="btn-shine" style={{flex:1,background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",padding:"11px",borderRadius:8,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>💬 WhatsApp</a>
          <button onClick={()=>setStep(2)} className="btn-shine" style={{flex:1,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Via Form →</button>
        </div>
      </div>)}
      {step===2&&(<div>
        <label style={ac}>Describe What You Need *</label>
        <textarea style={{...inp,minHeight:90,resize:"vertical"}} placeholder="Your goals, background and what you need..."/>
        <label style={ac}>Preferred Contact</label>
        <select style={sel}><option>WhatsApp</option><option>Email</option><option>Either</option></select>
        <label style={ac}>Timeline</label>
        <select style={sel}><option>As soon as possible</option><option>Within 1 week</option><option>Within 1 month</option><option>Flexible</option></select>
        <div style={{display:"flex",gap:10,marginTop:6}}>
          <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>← Back</button>
          <button onClick={()=>setDone(true)} className="btn-shine" style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>✅ Submit</button>
        </div>
      </div>)}
    </div>
  );

  if(school.applyType==="student-only") return (
    <div>
      {step===1&&(<div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>First Name *</label><input style={inp} placeholder="First"/></div>
          <div><label style={ac}>Last Name *</label><input style={inp} placeholder="Last"/></div>
        </div>
        <label style={ac}>Email *</label><input style={inp} placeholder="email@example.com"/>
        <label style={ac}>Phone / WhatsApp *</label><input style={inp} placeholder="+234..."/>
        <label style={ac}>Date of Birth *</label><input type="date" style={inp}/>
        <label style={ac}>State of Origin *</label><input style={inp} placeholder="State"/>
        <button onClick={()=>setStep(2)} className="btn-shine" style={{width:"100%",background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"12px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",marginTop:4,fontFamily:"'Syne',sans-serif"}}>Next →</button>
      </div>)}
      {step===2&&(<div>
        <label style={ac}>Exam Track *</label>
        <select style={sel}><option value="">Select track...</option>{school.tracks&&school.tracks.map(t=><option key={t}>{t}</option>)}</select>
        <label style={ac}>Package</label>
        <select style={sel}><option>Full Package — All Subjects</option><option>Bundle — 2–4 Subjects</option><option>Single Subject</option></select>
        <label style={ac}>How Did You Hear About Us?</label>
        <select style={sel}><option>Social Media</option><option>Friend/Referral</option><option>Google</option><option>School</option><option>Other</option></select>
        <div style={{background:"rgba(77,182,172,.07)",border:"1px solid rgba(77,182,172,.18)",borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:11,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>
          💳 Payment details sent via email and WhatsApp after submission. Moodle access enabled by admin after payment confirmation.
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>← Back</button>
          <button onClick={()=>setDone(true)} className="btn-shine" style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Submit ✓</button>
        </div>
      </div>)}
    </div>
  );

  return (
    <div>
      {step===1&&(<div>
        <label style={ac}>Application Type *</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[["parent","👨‍👩‍👧 Parent/Guardian"],["self","🎓 Self-Sponsored"]].map(([v,l])=>(
            <div key={v} onClick={()=>setAppType(v)} style={{border:`2px solid ${appType===v?school.color:"rgba(255,255,255,.1)"}`,borderRadius:8,padding:"11px 10px",cursor:"pointer",background:appType===v?`${school.color}18`:"rgba(255,255,255,.03)",textAlign:"center",fontSize:12,color:appType===v?"#fff":"rgba(255,255,255,.5)",fontWeight:appType===v?700:400,transition:"all .2s"}}>{l}</div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>First Name *</label><input style={inp} placeholder="First"/></div>
          <div><label style={ac}>Last Name *</label><input style={inp} placeholder="Last"/></div>
        </div>
        <label style={ac}>Date of Birth *</label><input type="date" style={inp}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label style={ac}>Gender *</label><select style={sel}><option>Male</option><option>Female</option></select></div>
          <div><label style={ac}>State *</label><input style={inp} placeholder="State"/></div>
        </div>
        <label style={ac}>Email / Phone *</label><input style={inp} placeholder="Email or phone"/>
        {appType==="parent"&&<div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.15)",borderRadius:8,padding:"9px 12px",marginBottom:10,fontSize:11,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>👨‍👩‍👧 Parent portal auto-created on admission. Can register multiple children under one account.</div>}
        <button onClick={()=>setStep(2)} className="btn-shine" style={{width:"100%",background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"12px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",marginTop:4,fontFamily:"'Syne',sans-serif"}}>Next →</button>
      </div>)}
      {step===2&&(<div>
        {appType==="parent"?(<div>
          <label style={ac}>Guardian Full Name *</label><input style={inp} placeholder="Guardian name"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={ac}>Relationship *</label><select style={sel}><option>Father</option><option>Mother</option><option>Uncle</option><option>Aunt</option><option>Guardian</option></select></div>
            <div><label style={ac}>Guardian Phone *</label><input style={inp} placeholder="+234..."/></div>
          </div>
          <label style={ac}>Guardian Email *</label><input style={inp} placeholder="guardian@email.com"/>
        </div>):(<div>
          <label style={ac}>Your Email *</label><input style={inp} placeholder="email@example.com"/>
          <label style={ac}>Your Phone *</label><input style={inp} placeholder="+234..."/>
          <label style={ac}>Occupation</label><input style={inp} placeholder="Current occupation"/>
        </div>)}
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setStep(1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>← Back</button>
          <button onClick={()=>setStep(3)} className="btn-shine" style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Academic Info →</button>
        </div>
      </div>)}
      {step===3&&(<div>
        {school.programs&&(<><label style={ac}>Programme *</label><select style={sel}><option value="">Select...</option>{school.programs.map(p=><option key={p}>{p}</option>)}</select></>)}
        {school.departments&&(<><label style={ac}>Department (SSS) *</label><select style={sel}><option value="">Select...</option>{school.departments.map(d=><option key={d}>{d}</option>)}</select></>)}
        {school.classes&&(<><label style={ac}>Class / Level *</label><select style={sel}><option value="">Select...</option>{school.classes.map(c=><option key={c}>{c}</option>)}</select></>)}
        <label style={ac}>Previous School</label><input style={inp} placeholder="Previous school name"/>
        <label style={ac}>How Did You Hear About Us?</label>
        <select style={sel}><option>Social Media</option><option>Friend/Referral</option><option>Google</option><option>School Partnership</option><option>WhatsApp</option><option>Other</option></select>
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:11,color:"rgba(255,255,255,.45)",lineHeight:1.6}}>
          💳 Admin reviews application → sends payment details → student and parent portals activate automatically after payment confirmation.
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setStep(2)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>← Back</button>
          <button onClick={()=>setDone(true)} className="btn-shine" style={{flex:2,background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>🎓 Submit Application</button>
        </div>
      </div>)}
    </div>
  );
}

// ─── SCHOOL PAGE ───
function SchoolPage({ school, onBack }) {
  const [showForm,setShowForm]=useState(false);
  const [openSub,setOpenSub]=useState(null);
  return (
    <div className="page-in" style={{fontFamily:"'Syne',sans-serif",background:"#050A14",minHeight:"100vh"}}>
      <div style={{padding:"12px 18px",background:"rgba(5,10,20,.96)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:200}}>
        <button onClick={onBack} className="btn-shine" style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",color:"#fff",padding:"7px 16px",borderRadius:7,fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"'Syne',sans-serif"}}>← Back</button>
        <div style={{flex:1,fontSize:11,color:"rgba(255,255,255,.35)",fontFamily:"'Space Mono',monospace"}}>SAMPACE › {school.name}</div>
        <button onClick={()=>setShowForm(true)} className="btn-shine" style={{background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"7px 16px",borderRadius:7,fontSize:12,cursor:"pointer",fontWeight:700,fontFamily:"'Syne',sans-serif"}}>
          {school.applyType==="inquiry"?"✉️ Inquire":"Apply Now"}
        </button>
      </div>
      <div style={{background:`linear-gradient(160deg,${school.g1} 0%,${school.g2} 55%,${school.color} 100%)`,padding:"52px 18px 40px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <Particles n={10}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"36px 36px"}}/>
        <div style={{position:"relative",zIndex:2}}>
          <div style={{width:72,height:72,borderRadius:20,background:"rgba(255,255,255,.12)",backdropFilter:"blur(8px)",border:`1px solid ${school.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,margin:"0 auto 13px",animation:"floatY 4s ease-in-out infinite",boxShadow:`0 0 40px ${school.color}50`}}>{school.emoji}</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"rgba(255,255,255,.4)",letterSpacing:4,marginBottom:5,textTransform:"uppercase"}}>SCHOOL {school.num}</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,5vw,46px)",fontWeight:900,color:"#fff",margin:"0 0 7px",lineHeight:1.05}}>{school.name}</h1>
          <div style={{fontSize:12,color:school.accent,marginBottom:13,letterSpacing:1,fontWeight:600}}>{school.short}</div>
          <p style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.8,maxWidth:480,margin:"0 auto 22px"}}>{school.desc}</p>
          <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:22}}>
            {school.tags.map(t=><span key={t} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",color:"#fff",padding:"3px 11px",borderRadius:100,fontSize:10,fontWeight:500}}>{t}</span>)}
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setShowForm(true)} className="btn-shine" style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:"#0B1F3A",border:"none",padding:"12px 26px",borderRadius:8,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>
              {school.applyType==="inquiry"?"✉️ Make Inquiry":"📋 Apply Now"}
            </button>
            <a href={WA_COMMUNITY} className="btn-shine" style={{background:"rgba(37,211,102,.14)",border:"1px solid rgba(37,211,102,.3)",color:"#fff",padding:"12px 20px",borderRadius:8,fontSize:13,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6,fontWeight:600}}>💬 Join Community</a>
          </div>
        </div>
      </div>
      <div style={{padding:"28px 16px",maxWidth:660,margin:"0 auto"}}>
        {/* LMS Box */}
        <div style={{background:"rgba(21,101,192,.08)",border:"1px solid rgba(21,101,192,.2)",borderRadius:12,padding:"16px 18px",marginBottom:22,display:"flex",gap:12,alignItems:"center"}}>
          <div style={{fontSize:28,flexShrink:0}}>🎓</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:12,color:"#fff",marginBottom:3}}>Classes on Moodle LMS · Zoom Integrated · Virtual Labs via LTI</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.5}}>All lessons, live classes, labs, CBT exams and progress tracking live on our Moodle LMS. Access granted after payment confirmation.</div>
          </div>
          <a href={MOODLE_URL} className="btn-shine" style={{background:"linear-gradient(135deg,#1565C0,#42A5F5)",color:"#fff",padding:"8px 14px",borderRadius:7,fontSize:11,fontWeight:700,textDecoration:"none",flexShrink:0,whiteSpace:"nowrap"}}>Go to LMS →</a>
        </div>
        {/* Sub-schools */}
        {school.subSchools&&(
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:school.accent,letterSpacing:3,fontWeight:700,textTransform:"uppercase",marginBottom:13,textAlign:"center"}}>Tap a School to Explore & Enroll</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {school.subSchools.map(sub=>(
                <div key={sub.id} className="hover-lift" onClick={()=>setOpenSub(openSub===sub.id?null:sub.id)} style={{background:`${sub.color}18`,border:`2px solid ${openSub===sub.id?sub.color:"rgba(255,255,255,.07)"}`,borderRadius:12,padding:"16px 13px",transition:"all .3s"}}>
                  <div style={{fontSize:22,marginBottom:7}}>{sub.emoji}</div>
                  <div style={{fontWeight:700,fontSize:12,color:"#fff",marginBottom:4,lineHeight:1.2}}>{sub.name}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                    {sub.courses.slice(0,2).map(c=><span key={c} style={{background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.4)",padding:"1px 6px",borderRadius:100,fontSize:9}}>{c}</span>)}
                    <span style={{background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.3)",padding:"1px 6px",borderRadius:100,fontSize:9}}>+{sub.courses.length-2}</span>
                  </div>
                  {openSub===sub.id&&(
                    <div style={{paddingTop:10,borderTop:"1px solid rgba(255,255,255,.07)",marginTop:8}}>
                      {sub.courses.map(c=><div key={c} style={{fontSize:11,color:"rgba(255,255,255,.5)",padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>→ {c}</div>)}
                      <button onClick={e=>{e.stopPropagation();setShowForm(true);}} className="btn-shine" style={{width:"100%",background:`linear-gradient(135deg,${sub.color},${sub.color}cc)`,border:"none",color:"#fff",padding:"9px",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer",marginTop:10,fontFamily:"'Syne',sans-serif"}}>Enroll →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Features */}
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,3.5vw,28px)",color:"#fff",textAlign:"center",marginBottom:18,fontWeight:700}}>What We <span className="shimmer">Offer</span></h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:24}}>
          {school.features.map((f,i)=>(
            <div key={i} className="hover-lift" style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"17px 13px",borderTop:`3px solid ${school.color}`}}>
              <div style={{fontSize:24,marginBottom:7}}>{f.icon}</div>
              <div style={{fontWeight:700,fontSize:12,color:"#fff",marginBottom:3}}>{f.t}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.5}}>{f.d}</div>
            </div>
          ))}
        </div>
        {/* Login box */}
        {(school.applyType==="parent-student"||school.applyType==="student-only")&&(
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:13,padding:"20px 16px",marginBottom:20}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#fff",fontWeight:700,marginBottom:4}}>Already Enrolled? Login</h3>
            <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:14}}>Access your Moodle classes, timetable, CBT and report cards.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div><div style={{fontSize:10,color:school.accent,fontWeight:700,letterSpacing:1.5,marginBottom:5,textTransform:"uppercase"}}>Student ID</div><input style={{...inp,marginBottom:0,fontFamily:"'Space Mono',monospace"}} placeholder="e.g. SC/2026/0001"/></div>
              <div><div style={{fontSize:10,color:school.accent,fontWeight:700,letterSpacing:1.5,marginBottom:5,textTransform:"uppercase"}}>Password</div><input type="password" style={{...inp,marginBottom:0}} placeholder="••••••••"/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <a href={MOODLE_URL} className="btn-shine" style={{background:`linear-gradient(135deg,${school.g2},${school.color})`,border:"none",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,fontWeight:700,textDecoration:"none",textAlign:"center",display:"block"}}>🎓 Student Login</a>
              <a href={MOODLE_URL} className="btn-shine" style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",padding:"11px",borderRadius:8,fontSize:12,textDecoration:"none",textAlign:"center",display:"block"}}>👨‍👩‍👧 Parent Login</a>
            </div>
            <div style={{textAlign:"center",marginTop:8,fontSize:10,color:"rgba(255,255,255,.22)"}}>Credentials sent via email after payment confirmation</div>
          </div>
        )}
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:11,padding:"16px",textAlign:"center"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:10}}>Questions? Contact us directly</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <a href={WA_COMMUNITY} className="btn-shine" style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.2)",color:"#fff",padding:"8px 16px",borderRadius:7,fontSize:11,textDecoration:"none",fontWeight:600}}>💬 WhatsApp Community</a>
            <a href={`mailto:${EMAIL}`} className="btn-shine" style={{background:"rgba(21,101,192,.1)",border:"1px solid rgba(21,101,192,.2)",color:"#fff",padding:"8px 16px",borderRadius:7,fontSize:11,textDecoration:"none",fontWeight:600}}>📧 Email Us</a>
          </div>
        </div>
      </div>
      {showForm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",backdropFilter:"blur(10px)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowForm(false)}>
          <div style={{background:"#0C1828",borderRadius:"18px 18px 0 0",width:"100%",maxWidth:540,maxHeight:"88vh",overflow:"auto",padding:"22px 18px 40px",border:"1px solid rgba(255,255,255,.08)",borderBottom:"none",animation:"slideUp .4s ease"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#fff"}}>{school.applyType==="inquiry"?"Make an Inquiry":`Apply — ${school.name}`}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:2}}>SAMPACE INSTITUTE</div>
              </div>
              <button onClick={()=>setShowForm(false)} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:16,fontFamily:"'Syne',sans-serif"}}>×</button>
            </div>
            <ApplyModal school={school} onClose={()=>setShowForm(false)}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOMEPAGE ───
function Homepage({ onSelect, onAdminLogin, onStaffLogin }) {
  const [scrollY,setScrollY]=useState(0);
  const [hovered,setHovered]=useState(null);
  const [showPortalMenu,setShowPortalMenu]=useState(false);
  useEffect(()=>{ const fn=()=>setScrollY(window.scrollY); window.addEventListener("scroll",fn,{passive:true}); return ()=>window.removeEventListener("scroll",fn); },[]);
  return (
    <div style={{fontFamily:"'Syne',sans-serif",background:"#050A14",minHeight:"100vh"}}>
      {/* NAV */}
      <nav style={{padding:"12px 18px",position:"fixed",top:0,left:0,right:0,zIndex:300,background:scrollY>50?"rgba(5,10,20,.97)":"transparent",backdropFilter:scrollY>50?"blur(20px)":"none",borderBottom:scrollY>50?"1px solid rgba(255,255,255,.06)":"none",transition:"all .4s ease",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:34,height:34,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:900,color:"#0B1F3A",animation:"glow 4s ease-in-out infinite"}}>SI</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:"#C9A84C",letterSpacing:2}}>SAMPACE</div>
            <div style={{fontSize:8,color:"rgba(255,255,255,.28)",letterSpacing:2,textTransform:"uppercase"}}>INSTITUTE</div>
          </div>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center",position:"relative"}}>
          <a href={WA_COMMUNITY} className="btn-shine" style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.2)",color:"#fff",padding:"7px 12px",borderRadius:6,fontSize:11,textDecoration:"none",fontWeight:600}}>💬 Community</a>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowPortalMenu(m=>!m)} className="btn-shine" style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",color:"#fff",padding:"7px 12px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>
              🔐 Login ▾
            </button>
            {showPortalMenu&&(
              <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"rgba(11,20,40,.98)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"8px",minWidth:180,zIndex:400}}>
                <button onClick={()=>{setShowPortalMenu(false);onAdminLogin();}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:7,border:"none",background:"transparent",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"'Syne',sans-serif"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(21,101,192,.2)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>⚙️ Admin Login</button>
                <button onClick={()=>{setShowPortalMenu(false);onStaffLogin();}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:7,border:"none",background:"transparent",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"'Syne',sans-serif"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(0,105,92,.2)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>👔 Staff Login</button>
                <div style={{borderTop:"1px solid rgba(255,255,255,.06)",margin:"6px 0",paddingTop:6}}>
                  {SCHOOLS.slice(0,2).map(s=>(
                    <button key={s.id} onClick={()=>{setShowPortalMenu(false);onSelect(s);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:7,border:"none",background:"transparent",color:"rgba(255,255,255,.7)",fontSize:11,cursor:"pointer",fontFamily:"'Syne',sans-serif"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.06)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{s.emoji} {s.name}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={()=>onSelect(SCHOOLS[0])} className="btn-shine" style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:"#0B1F3A",border:"none",padding:"7px 15px",borderRadius:6,fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Apply Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 16px 60px",position:"relative",overflow:"hidden",textAlign:"center"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%,rgba(21,101,192,.12),transparent 60%),radial-gradient(ellipse at 80% 30%,rgba(201,168,76,.07),transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(123,31,162,.1),transparent 60%)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(201,168,76,.05) 1px,transparent 1px)",backgroundSize:"38px 38px"}}/>
        <div style={{position:"absolute",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.25),transparent)",animation:"scanLine 7s linear infinite",pointerEvents:"none",zIndex:2}}/>
        <Particles n={25}/>
        <div style={{position:"relative",zIndex:3,maxWidth:720}}>
          <div style={{marginBottom:24}}><Orbit3D/></div>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(201,168,76,.3)",background:"rgba(201,168,76,.05)",backdropFilter:"blur(8px)",borderRadius:100,padding:"5px 16px",fontSize:10,color:"#C9A84C",letterSpacing:2,textTransform:"uppercase",marginBottom:20,animation:"borderPulse 3s ease-in-out infinite"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#10B981",animation:"pulse 2s ease-in-out infinite"}}/>
            Live · sampaceinstitute.netlify.app
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,9vw,84px)",fontWeight:900,lineHeight:.9,marginBottom:14,letterSpacing:-2}}>
            <span style={{display:"block",background:"linear-gradient(135deg,#fff,#64B5F6,#fff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SAMPACE</span>
            <span className="shimmer" style={{fontStyle:"italic"}}>Institute</span>
          </h1>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(8px,1.5vw,11px)",letterSpacing:6,color:"rgba(255,255,255,.25)",marginBottom:16,textTransform:"uppercase"}}>Where Excellence Begins</div>
          <p style={{fontSize:"clamp(12px,2vw,14px)",color:"rgba(255,255,255,.5)",lineHeight:1.85,maxWidth:480,margin:"0 auto 28px"}}>
            Nine world-class schools. Moodle LMS · Virtual Labs · CBT Exams · Live Classes · Parent Portals. All online.
          </p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:48}}>
            <button onClick={()=>document.getElementById("schools-sec").scrollIntoView({behavior:"smooth"})} className="btn-shine" style={{background:"linear-gradient(135deg,#1565C0,#42A5F5)",color:"#fff",border:"none",padding:"12px 26px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif",boxShadow:"0 8px 28px rgba(21,101,192,.4)"}}>Explore Schools →</button>
            <button onClick={()=>onSelect(SCHOOLS[0])} className="btn-shine" style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F)",color:"#0B1F3A",border:"none",padding:"12px 26px",borderRadius:8,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Apply Now</button>
            <a href={WA_COMMUNITY} className="btn-shine" style={{background:"rgba(37,211,102,.12)",border:"1px solid rgba(37,211,102,.25)",color:"#fff",padding:"12px 20px",borderRadius:8,fontSize:13,textDecoration:"none",fontWeight:600,display:"inline-flex",alignItems:"center",gap:6}}>💬 Community</a>
          </div>
          <div style={{display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap",paddingTop:32,borderTop:"1px solid rgba(255,255,255,.06)"}}>
            <CountUp to="9" suf="" label="Schools"/>
            <CountUp to="20" suf="+" label="Programmes"/>
            <CountUp to="100" suf="%" label="Online"/>
            <CountUp to="2026" suf="" label="Est. Year"/>
          </div>
        </div>
      </section>

      {/* LMS STRIP */}
      <div style={{background:"linear-gradient(135deg,rgba(21,101,192,.1),rgba(201,168,76,.05))",borderTop:"1px solid rgba(21,101,192,.18)",borderBottom:"1px solid rgba(21,101,192,.18)",padding:"16px"}}>
        <div style={{maxWidth:660,margin:"0 auto",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{fontSize:26,flexShrink:0}}>🎓</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:12,color:"#fff",marginBottom:3}}>Powered by Moodle LMS · LTI Virtual Labs · Zoom Live Classes · Single Sign-On</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.4)",lineHeight:1.5}}>All SAMPACE classes, labs and CBT exams run on our self-hosted Moodle. Admin enables student access after payment confirmation.</div>
          </div>
          <a href={MOODLE_URL} className="btn-shine" style={{background:"linear-gradient(135deg,#1565C0,#42A5F5)",color:"#fff",padding:"8px 14px",borderRadius:7,fontSize:11,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0}}>Go to LMS →</a>
        </div>
      </div>

      {/* SCHOOLS */}
      <section id="schools-sec" style={{padding:"64px 16px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#C9A84C",letterSpacing:4,textTransform:"uppercase",marginBottom:10}}>Our Academic Portfolio</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,5vw,46px)",fontWeight:900,color:"#fff",lineHeight:1.05}}>Nine <span className="shimmer" style={{fontStyle:"italic"}}>Schools.</span><br/>One Vision.</h2>
        </div>
        <div style={{maxWidth:660,margin:"0 auto",display:"flex",flexDirection:"column",gap:11}}>
          {SCHOOLS.map((s,i)=>(
            <div key={s.id} className="hover-lift" onMouseEnter={()=>setHovered(s.id)} onMouseLeave={()=>setHovered(null)} onClick={()=>onSelect(s)} style={{background:`linear-gradient(135deg,${s.g1}40,${s.color}20)`,border:`1px solid ${hovered===s.id?s.color:"rgba(255,255,255,.07)"}`,borderLeft:`4px solid ${s.color}`,borderRadius:13,padding:"18px 15px",transition:"all .3s ease",boxShadow:hovered===s.id?`0 8px 36px ${s.color}28`:"none",animation:`fadeUp .55s ${i*.07}s ease both`}}>
              <div style={{display:"flex",alignItems:"center",gap:13}}>
                <div style={{width:48,height:48,borderRadius:13,background:`${s.color}22`,border:`1px solid ${s.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:23,flexShrink:0,transition:"transform .3s",transform:hovered===s.id?"scale(1.12) rotate(6deg)":"scale(1)"}}>{s.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:s.accent,letterSpacing:2,marginBottom:2,textTransform:"uppercase",fontWeight:700}}>School {s.num}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(14px,3vw,17px)",fontWeight:700,color:"#fff",marginBottom:3,lineHeight:1.2}}>{s.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",lineHeight:1.4,marginBottom:7}}>{s.short}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {s.tags.slice(0,3).map(t=><span key={t} style={{background:`${s.color}18`,border:`1px solid ${s.color}28`,color:s.accent,padding:"2px 8px",borderRadius:100,fontSize:9,fontWeight:600}}>{t}</span>)}
                  </div>
                </div>
                <div style={{color:s.color,fontSize:20,transition:"transform .3s",transform:hovered===s.id?"translateX(5px)":"translateX(0)",flexShrink:0}}>›</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{padding:"40px 16px 64px",maxWidth:520,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(21,101,192,.07),rgba(201,168,76,.04))",border:"1px solid rgba(255,255,255,.07)",borderRadius:18,padding:"26px 20px",textAlign:"center",animation:"borderPulse 5s ease-in-out infinite"}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#C9A84C",letterSpacing:3,textTransform:"uppercase",marginBottom:8}}>Get In Touch</div>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,3.5vw,26px)",color:"#fff",fontWeight:700,marginBottom:7}}>Not sure where to start?</h3>
          <p style={{fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.7,marginBottom:18}}>Our admissions team will guide you to the right school and programme.</p>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            <a href={WA_COMMUNITY} className="btn-shine" style={{display:"flex",alignItems:"center",gap:13,background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.18)",borderRadius:11,padding:"12px 16px",textDecoration:"none"}}>
              <span style={{fontSize:22}}>💬</span>
              <div style={{textAlign:"left"}}><div style={{fontSize:10,color:"#10B981",fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>WhatsApp Community</div><div style={{fontSize:12,color:"#fff",fontWeight:500}}>Join our student community</div></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-shine" style={{display:"flex",alignItems:"center",gap:13,background:"rgba(21,101,192,.1)",border:"1px solid rgba(21,101,192,.18)",borderRadius:11,padding:"12px 16px",textDecoration:"none"}}>
              <span style={{fontSize:22}}>📧</span>
              <div style={{textAlign:"left"}}><div style={{fontSize:10,color:"#64B5F6",fontWeight:800,letterSpacing:1,textTransform:"uppercase"}}>Email</div><div style={{fontSize:12,color:"#fff",fontWeight:500}}>{EMAIL}</div></div>
            </a>
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:32,paddingTop:18,borderTop:"1px solid rgba(255,255,255,.04)"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:"rgba(201,168,76,.45)",fontWeight:700,marginBottom:5}}>SAMPACE INSTITUTE</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,.16)",lineHeight:1.8}}>School College · Tutorial & Exam · Digital Campus · Pre-University · Professional Services<br/>© 2026 SAMPACE INSTITUTE · Grand Opening August 2026</div>
          <div style={{marginTop:16,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={onAdminLogin} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.35)",padding:"6px 14px",borderRadius:6,fontSize:10,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>⚙️ Admin Login</button>
            <button onClick={onStaffLogin} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.35)",padding:"6px 14px",borderRadius:6,fontSize:10,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>👔 Staff Login</button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href={WA_COMMUNITY} style={{position:"fixed",bottom:22,right:18,width:50,height:50,background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,zIndex:999,boxShadow:"0 6px 22px rgba(37,211,102,.45)",animation:"glow 3s ease-in-out infinite",textDecoration:"none"}}>💬</a>
    </div>
  );
}

// ─── INLINE ADMIN DASHBOARD ───
function AdminDashboard({ onLogout }) {
  const [page,setPage]=useState("overview");
  const [sideOpen,setSideOpen]=useState(true);
  const C2={navy:"#0B1F3A",blue:"#1565C0",sky:"#42A5F5",gold:"#C9A84C",cream:"#F8FAFF",slate:"#64748B",border:"#E2E8F0",green:"#10B981",red:"#EF4444",amber:"#F59E0B",purple:"#7C3AED"};
  const NAV=[{id:"overview",icon:"⊞",label:"Overview"},{id:"applications",icon:"📋",label:"Applications",badge:65},{id:"students",icon:"👥",label:"Students"},{id:"staff",icon:"👔",label:"Staff"},{id:"payments",icon:"💰",label:"Payments"},{id:"inquiries",icon:"💬",label:"Inquiries",badge:8},{id:"announcements",icon:"📣",label:"Announcements"},{id:"schools",icon:"🏫",label:"Schools"},{id:"settings",icon:"⚙️",label:"Settings"}];
  const APPS=[{id:"APP-2601",name:"Adaeze Okonkwo",school:"School College",program:"SS1 Sciences",date:"Today 9:14am",status:"pending"},{id:"APP-2600",name:"Emeka Nwosu",school:"Tutorial & Exam",program:"WAEC Track",date:"Today 8:52am",status:"approved"},{id:"APP-2599",name:"Fatima Abdullahi",school:"Digital Campus",program:"ACCA",date:"Yesterday",status:"pending"},{id:"APP-2598",name:"David Adeleke",school:"Pre-University",program:"IJMB",date:"Yesterday",status:"approved"},{id:"APP-2597",name:"Grace Obi",school:"School College",program:"JSS1",date:"2 days ago",status:"rejected"}];
  const STUDS=[{id:"SC/2026/001",name:"Adaeze Okonkwo",school:"School College",cls:"SS1 Sciences",fees:"paid",status:"active"},{id:"SC/2026/002",name:"Emeka Nwosu",school:"Tutorial",cls:"WAEC Track",fees:"paid",status:"active"},{id:"SC/2026/003",name:"Fatima Abdullahi",school:"Digital Campus",cls:"ACCA",fees:"pending",status:"pending"},{id:"SC/2026/004",name:"David Adeleke",school:"Pre-University",cls:"IJMB",fees:"paid",status:"active"}];
  const PAYS=[{name:"Emeka Nwosu",school:"Tutorial",amount:45000,date:"Today",status:"confirmed"},{name:"David Adeleke",school:"Pre-University",amount:120000,date:"Today",status:"confirmed"},{name:"Adaeze Okonkwo",school:"School College",amount:85000,date:"Yesterday",status:"confirmed"},{name:"Fatima Abdullahi",school:"Digital Campus",amount:65000,date:"Yesterday",status:"pending"}];
  const fmt=n=>"₦"+n.toLocaleString();
  const badge=(s)=>{const m={pending:{bg:"rgba(245,158,11,.1)",c:"#F59E0B"},approved:{bg:"rgba(16,185,129,.1)",c:"#10B981"},rejected:{bg:"rgba(239,68,68,.1)",c:"#EF4444"},active:{bg:"rgba(16,185,129,.1)",c:"#10B981"},paid:{bg:"rgba(16,185,129,.1)",c:"#10B981"},confirmed:{bg:"rgba(16,185,129,.1)",c:"#10B981"},overdue:{bg:"rgba(239,68,68,.1)",c:"#EF4444"}};const b=m[s]||{bg:"rgba(100,116,139,.1)",c:"#64748B"};return <span style={{background:b.bg,color:b.c,padding:"3px 9px",borderRadius:100,fontSize:10,fontWeight:700,textTransform:"capitalize"}}>{s}</span>;};

  const renderPage=()=>{
    if(page==="overview") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C2.navy,marginBottom:18}}>Good morning, <em style={{color:C2.blue}}>Super Admin</em> 👋</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:18}}>
          {[{icon:"👥",label:"Students",val:323,color:C2.blue},{icon:"⏳",label:"Pending",val:65,color:C2.amber},{icon:"💰",label:"Revenue",val:fmt(7900000),color:C2.green},{icon:"👔",label:"Staff",val:38,color:C2.purple}].map((k,i)=>(
            <div key={i} style={{background:"#fff",border:`1px solid ${k.color}22`,borderRadius:12,padding:"16px",borderTop:`3px solid ${k.color}`}}>
              <div style={{fontSize:20,marginBottom:6}}>{k.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:24,color:k.color,fontWeight:900,lineHeight:1}}>{k.val}</div>
              <div style={{fontSize:11,color:C2.navy,fontWeight:600,marginTop:3}}>{k.label}</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14,marginBottom:14}}>
          <div style={{background:"#fff",border:`1px solid ${C2.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C2.border}`,fontWeight:700,fontSize:13,color:C2.navy}}>Recent Applications</div>
            {APPS.map(a=>(
              <div key={a.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid #F8FAFF"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:C2.navy}}>{a.name}</div>
                  <div style={{fontSize:10,color:C2.slate}}>{a.school} · {a.program}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  {badge(a.status)}
                  {a.status==="pending"&&<div style={{display:"flex",gap:3}}><button style={{background:"rgba(16,185,129,.1)",border:"none",color:C2.green,padding:"3px 7px",borderRadius:4,fontSize:10,cursor:"pointer",fontWeight:700}}>✓</button><button style={{background:"rgba(239,68,68,.1)",border:"none",color:C2.red,padding:"3px 7px",borderRadius:4,fontSize:10,cursor:"pointer",fontWeight:700}}>✕</button></div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{background:"#fff",border:`1px solid ${C2.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C2.border}`,fontWeight:700,fontSize:13,color:C2.navy}}>Recent Payments</div>
            {PAYS.map((p,i)=>(
              <div key={i} style={{padding:"10px 16px",borderBottom:"1px solid #F8FAFF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:12,fontWeight:600,color:C2.navy}}>{p.name}</div><div style={{fontSize:10,color:C2.slate}}>{p.school}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:C2.green}}>{fmt(p.amount)}</div>{badge(p.status)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    if(page==="students") return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C2.navy}}>Students</h2><button style={{background:`linear