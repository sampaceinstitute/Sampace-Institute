import { useState, useEffect } from "react";
import { BRAND as C, SITE, fmt, fmtDate } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;

const QUESTIONS = {
  "WAEC English": [
    {q:"Choose the word nearest in meaning to ELOQUENT:",opts:["Silent","Fluent","Awkward","Confused"],ans:1,exp:"ELOQUENT means fluent or persuasive in speech."},
    {q:"The boy _____ to school every day.",opts:["go","goes","going","gone"],ans:1,exp:"'Goes' is correct — third person singular."},
    {q:"Which is a conjunction?",opts:["Quickly","Beautiful","Although","Table"],ans:2,exp:"'Although' joins two clauses — it is a conjunction."},
    {q:"Plural of 'phenomenon' is:",opts:["Phenomenons","Phenomenas","Phenomena","Phenomenes"],ans:2,exp:"'Phenomena' is the correct plural form."},
    {q:"Correctly punctuated:",opts:["Its a beautiful day","It's a beautiful day","Its' a beautiful day","It is' a beautiful day"],ans:1,exp:"'It's' = 'It is' — apostrophe replaces missing letter."},
  ],
  "WAEC Mathematics": [
    {q:"Simplify: 3x + 2y - x + 4y",opts:["2x + 6y","4x + 6y","2x + 2y","4x + 2y"],ans:0,exp:"3x-x=2x and 2y+4y=6y → answer is 2x+6y."},
    {q:"If 3x - 7 = 14, find x",opts:["x=3","x=7","x=21","x=14"],ans:1,exp:"3x=21 → x=7."},
    {q:"What is 15% of 200?",opts:["25","30","35","40"],ans:1,exp:"15/100 × 200 = 30."},
    {q:"Area of rectangle: length 8cm, width 5cm",opts:["26cm²","40cm²","13cm²","80cm²"],ans:1,exp:"Area = length × width = 8 × 5 = 40cm²."},
    {q:"Sum of interior angles is 540°. How many sides?",opts:["4","5","6","7"],ans:1,exp:"(n-2)×180 = 540 → n=5 sides."},
  ],
  "WAEC Biology": [
    {q:"Organelle responsible for protein synthesis:",opts:["Mitochondria","Ribosome","Nucleus","Lysosome"],ans:1,exp:"Ribosomes are the sites of protein synthesis."},
    {q:"Osmosis is movement of water from:",opts:["High to low solute","Low to high solute","High to low water concentration","Low to high water concentration"],ans:2,exp:"Water moves from high water concentration to low water concentration."},
    {q:"Powerhouse of the cell:",opts:["Nucleus","Ribosome","Mitochondria","Cell wall"],ans:2,exp:"Mitochondria produces ATP through cellular respiration."},
    {q:"Universal blood donor group:",opts:["A","B","AB","O"],ans:3,exp:"Blood group O negative has no A, B or Rh antigens."},
    {q:"Photosynthesis takes place in the:",opts:["Mitochondria","Ribosome","Chloroplast","Nucleus"],ans:2,exp:"Chloroplasts contain chlorophyll for photosynthesis."},
  ],
  "JAMB English": [
    {q:"Same vowel sound as 'beat':",opts:["bed","bit","beet","bat"],ans:2,exp:"'Beet' shares the long /iː/ vowel sound."},
    {q:"The manager was _____ with performance.",opts:["please","pleasing","pleased","pleasure"],ans:2,exp:"'Pleased' is the correct adjective form here."},
    {q:"'The wind whispered through the trees' is:",opts:["Simile","Metaphor","Personification","Hyperbole"],ans:2,exp:"Personification gives human quality (whispered) to wind."},
    {q:"Correct sentence:",opts:["Neither of the boys are ready","Neither of the boys is ready","Neither were ready","Neither be ready"],ans:1,exp:"'Neither' takes a singular verb — 'is' is correct."},
    {q:"Opposite of VERBOSE:",opts:["Talkative","Concise","Loud","Boring"],ans:1,exp:"VERBOSE means using too many words. Antonym is CONCISE."},
  ],
};

export default function StudentPortal({ user, onLogout }) {
  const [tab,         setTab]         = useState("dashboard");
  const [sideOpen,    setSideOpen]    = useState(true);
  const [grades,      setGrades]      = useState([]);
  const [notifications, setNotifs]   = useState([]);
  const [timetable,   setTimetable]   = useState([]);
  const [profile,     setProfile]     = useState(user || {});

  // CBT state
  const [cbtSubject,  setCbtSubject]  = useState("");
  const [cbtStarted,  setCbtStarted]  = useState(false);
  const [cbtQ,        setCbtQ]        = useState(0);
  const [cbtSel,      setCbtSel]      = useState(null);
  const [cbtAnswered, setCbtAnswered] = useState(false);
  const [cbtScore,    setCbtScore]    = useState(0);
  const [cbtResults,  setCbtResults]  = useState([]);
  const [cbtDone,     setCbtDone]     = useState(false);
  const [cbtTime,     setCbtTime]     = useState(30);

  const sb = () => window.__supabase;

  useEffect(() => {
    const s = sb(); if (!s) return;
    s.from("grades").select("*").eq("student_id", user?.id).order("updated_at",{ascending:false})
      .then(({data}) => data?.length && setGrades(data));
    s.from("notifications").select("*").eq("user_id", user?.id).eq("is_read",false).order("created_at",{ascending:false}).limit(10)
      .then(({data}) => data?.length && setNotifs(data));
    s.from("classes").select("*").order("day_of_week",{ascending:true}).limit(20)
      .then(({data}) => data?.length && setTimetable(data));
  }, []);

  // CBT timer
  useEffect(() => {
    if (!cbtStarted || cbtDone || cbtAnswered) return;
    setCbtTime(30);
    const t = setInterval(() => {
      setCbtTime(prev => {
        if (prev <= 1) {
          clearInterval(t);
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cbtQ, cbtStarted, cbtDone]);

  const handleAnswer = (idx) => {
    if (cbtAnswered) return;
    const q = QUESTIONS[cbtSubject][cbtQ];
    const correct = q.ans === idx;
    setCbtSel(idx);
    setCbtAnswered(true);
    if (correct) setCbtScore(s => s + 1);
    setCbtResults(r => [...r, { q:q.q, sel:idx, ans:q.ans, correct, exp:q.exp }]);
  };

  const cbtNext = () => {
    const qs = QUESTIONS[cbtSubject];
    if (cbtQ + 1 >= qs.length) { setCbtDone(true); return; }
    setCbtQ(q => q + 1);
    setCbtSel(null);
    setCbtAnswered(false);
  };

  const cbtReset = () => {
    setCbtStarted(false); setCbtDone(false); setCbtQ(0);
    setCbtSel(null); setCbtAnswered(false); setCbtScore(0); setCbtResults([]);
  };

  const SAMPLE_GRADES = [
    { subject:"English Language", ca1:8, ca2:7, project:8, exam:58, total:81, grade:"A" },
    { subject:"Mathematics",      ca1:7, ca2:8, project:7, exam:55, total:77, grade:"B" },
    { subject:"Physics",          ca1:9, ca2:8, project:9, exam:60, total:86, grade:"A" },
    { subject:"Chemistry",        ca1:6, ca2:7, project:8, exam:50, total:71, grade:"B" },
    { subject:"Biology",          ca1:8, ca2:9, project:7, exam:56, total:80, grade:"A" },
  ];

  const displayGrades = grades.length > 0
    ? grades.map(g => ({ subject:g.subject, ca1:g.ca1, ca2:g.ca2, project:g.project, exam:g.exam, total:g.total, grade:g.grade }))
    : SAMPLE_GRADES;

  const avg = displayGrades.length ? Math.round(displayGrades.reduce((s,g)=>s+(g.total||0),0)/displayGrades.length) : 0;

  const NAV = [
    {id:"dashboard",icon:"🏠",label:"Dashboard"},
    {id:"classes",icon:"🎬",label:"My Classes"},
    {id:"timetable",icon:"📅",label:"Timetable"},
    {id:"assignments",icon:"📝",label:"Assignments"},
    {id:"library",icon:"📚",label:"Library"},
    {id:"labs",icon:"🧪",label:"Virtual Lab"},
    {id:"cbt",icon:"🖥️",label:"CBT Practice"},
    {id:"results",icon:"📊",label:"My Results"},
    {id:"certificate",icon:"🏆",label:"Certificates"},
    {id:"profile",icon:"👤",label:"My Profile"},
    {id:"feedback",icon:"💬",label:"Feedback"},
  ];

  const renderTab = () => {
    if (tab === "dashboard") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>
          Welcome back, <em style={{color:C.blue}}>{profile.full_name?.split(" ")[0]||"Student"}</em> 👋
        </h2>
        <div style={{fontSize:12,color:C.slate,marginBottom:18}}>
          {profile.student_profiles?.[0]?.school_id||"SAMPACE"} · First Term 2026/2027
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {icon:"📊",label:"Average Score",val:avg+"%",color:C.blue},
            {icon:"📚",label:"Subjects",val:displayGrades.length,color:"#00897B"},
            {icon:"🔔",label:"Notifications",val:notifications.length,color:C.amber},
            {icon:"🏆",label:"Grade",val:avg>=75?"A":avg>=65?"B":avg>=55?"C":"D",color:C.green},
          ].map((k,i)=>(
            <div key={i} style={{background:"#fff",border:`1px solid ${k.color}22`,borderRadius:12,padding:"16px",borderTop:`3px solid ${k.color}`}}>
              <div style={{fontSize:20,marginBottom:6}}>{k.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,color:k.color,fontWeight:900}}>{k.val}</div>
              <div style={{fontSize:11,color:N,fontWeight:600,marginTop:3}}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Recent grades */}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:N,display:"flex",justifyContent:"space-between"}}>
            Recent Grades
            <button onClick={()=>setTab("results")} style={{fontSize:11,color:C.blue,border:"none",background:"none",cursor:"pointer"}}>View All →</button>
          </div>
          {displayGrades.slice(0,4).map((g,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
              <div style={{fontSize:12,fontWeight:600,color:N}}>{g.subject}</div>
              <div style={{fontSize:11,color:C.slate,textAlign:"center"}}>{g.ca1+g.ca2}/20</div>
              <div style={{fontSize:11,color:C.slate,textAlign:"center"}}>{g.exam}/70</div>
              <div style={{fontSize:12,fontWeight:700,color:N,textAlign:"center"}}>{g.total}</div>
              <div style={{textAlign:"center"}}>
                <span style={{background:g.grade==="A"?"rgba(16,185,129,.1)":g.grade==="B"?"rgba(21,101,192,.1)":"rgba(245,158,11,.1)",color:g.grade==="A"?C.green:g.grade==="B"?C.blue:C.amber,padding:"3px 9px",borderRadius:100,fontSize:10,fontWeight:700}}>{g.grade}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[["🖥️","CBT Practice","cbt"],["📊","My Results","results"],["📅","Timetable","timetable"],["🧪","Virtual Lab","labs"]].map(([icon,label,t])=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,padding:"14px",cursor:"pointer",textAlign:"center",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
              <div style={{fontSize:11,fontWeight:600,color:N}}>{label}</div>
            </button>
          ))}
        </div>
      </div>
    );

    if (tab === "results") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>My Results</h2>
        <div style={{fontSize:12,color:C.slate,marginBottom:18}}>First Term 2026/2027 · {grades.length>0?"Live Supabase data":"Sample data — grades appear here when teacher enters them"}</div>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:14}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr",padding:"9px 16px",background:"#F8FAFF",borderBottom:`2px solid ${C.border}`}}>
            {["Subject","CA1","CA2","Project","Exam","Total","Grade"].map(h=>(
              <div key={h} style={{fontSize:9,fontWeight:700,color:C.slate,letterSpacing:.5,textTransform:"uppercase",textAlign:"center"}}>{h}</div>
            ))}
          </div>
          {displayGrades.map((g,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr",padding:"12px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
              <div style={{fontSize:12,fontWeight:600,color:N}}>{g.subject}</div>
              {[g.ca1,g.ca2,g.project,g.exam,g.total].map((v,j)=>(
                <div key={j} style={{fontSize:12,color:C.slate,textAlign:"center"}}>{v}</div>
              ))}
              <div style={{textAlign:"center"}}>
                <span style={{background:g.grade==="A"?"rgba(16,185,129,.1)":"rgba(21,101,192,.1)",color:g.grade==="A"?C.green:C.blue,padding:"3px 9px",borderRadius:100,fontSize:10,fontWeight:700}}>{g.grade}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>{
            const lines=["SAMPACE EDUCATIONAL LTD","STUDENT RESULT SHEET","First Term 2026/2027","","Subject | CA1 | CA2 | Project | Exam | Total | Grade",""+"-".repeat(60),...displayGrades.map(g=>`${g.subject.padEnd(25)} | ${g.ca1} | ${g.ca2} | ${g.project} | ${g.exam} | ${g.total} | ${g.grade}`),"","Average: "+avg+"%","","sampaceedu.com.ng"];
            const blob=new Blob([lines.join("\n")],{type:"text/plain"});
            const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="SAMPACE_Results.txt";a.click();URL.revokeObjectURL(url);
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 20px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>📥 Download Results</button>
        </div>
      </div>
    );

    if (tab === "cbt") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>CBT Practice Engine</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>WAEC · NECO · JAMB Past Questions Practice</p>
        <CBTEngine
          questions={QUESTIONS} subject={cbtSubject} setSubject={setCbtSubject}
          started={cbtStarted} setStarted={setCbtStarted}
          q={cbtQ} sel={cbtSel} answered={cbtAnswered}
          score={cbtScore} results={cbtResults} done={cbtDone}
          time={cbtTime} handleAnswer={handleAnswer} next={cbtNext} reset={cbtReset}
          C={C}
        />
      </div>
    );

    if (tab === "timetable") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>Class Timetable</h2>
        {timetable.length === 0 ? (
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"40px",textAlign:"center",color:C.slate}}>
            <div style={{fontSize:36,marginBottom:12}}>📅</div>
            <div style={{fontWeight:600,fontSize:14,color:N,marginBottom:8}}>No classes scheduled yet</div>
            <p>Your class timetable will appear here once the admin publishes it.</p>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day=>(
              <div key={day}>
                <div style={{fontWeight:700,fontSize:11,color:C.blue,marginBottom:8,textAlign:"center",padding:"6px",background:"rgba(21,101,192,.06)",borderRadius:7}}>{day}</div>
                {timetable.filter(c=>c.day_of_week===day).map((c,i)=>(
                  <div key={i} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px",marginBottom:6,fontSize:11}}>
                    <div style={{fontWeight:700,color:N,marginBottom:2}}>{c.title}</div>
                    {c.start_time&&<div style={{color:C.slate,marginBottom:4}}>{c.start_time}</div>}
                    {c.room_link&&<a href={c.room_link} target="_blank" rel="noreferrer" style={{color:C.blue,fontSize:10,fontWeight:600,textDecoration:"none"}}>Join Class →</a>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (tab === "labs") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Virtual Science Labs</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>Powered by PhET Interactive Simulations — University of Colorado Boulder</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {[
            {name:"Wave Interference",subject:"Physics",url:"https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html"},
            {name:"Balancing Chemical Equations",subject:"Chemistry",url:"https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_en.html"},
            {name:"Natural Selection",subject:"Biology",url:"https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_en.html"},
            {name:"Ohm's Law",subject:"Physics",url:"https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html"},
            {name:"Build an Atom",subject:"Chemistry",url:"https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html"},
            {name:"Forces and Motion",subject:"Physics",url:"https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html"},
          ].map((lab,i)=>(
            <div key={i} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
              <div style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,padding:"20px",textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:6}}>🧪</div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{lab.name}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginTop:2}}>{lab.subject}</div>
              </div>
              <div style={{padding:"14px"}}>
                <a href={lab.url} target="_blank" rel="noreferrer" style={{display:"block",background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",padding:"9px",borderRadius:8,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center"}}>
                  🔬 Open Lab Simulation
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (tab === "certificate") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>My Certificates</h2>
        <div style={{background:`linear-gradient(135deg,${N},${C.blue})`,borderRadius:16,padding:"40px 32px",textAlign:"center",marginBottom:20,border:"2px solid rgba(201,168,76,.3)"}}>
          <div style={{fontFamily:"monospace",fontSize:11,color:G,letterSpacing:4,marginBottom:12}}>SAMPACE EDUCATIONAL LTD</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:"#fff",marginBottom:6}}>Certificate of Achievement</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:16}}>This is to certify that</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:700,color:G,marginBottom:16,fontStyle:"italic"}}>{profile.full_name||"Student"}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:4}}>has successfully completed</div>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:20}}>First Term 2026 · {profile.student_profiles?.[0]?.school_id||"SAMPACE"}</div>
          <div style={{display:"flex",justifyContent:"space-around",marginTop:20,borderTop:"1px solid rgba(255,255,255,.15)",paddingTop:20}}>
            <div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Issued</div><div style={{color:"#fff",fontWeight:700,fontSize:12}}>{new Date().toLocaleDateString()}</div></div>
            <div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Certificate ID</div><div style={{color:"#fff",fontWeight:700,fontSize:12}}>SAMP-{Date.now().toString().slice(-6)}</div></div>
            <div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Status</div><div style={{color:C.green,fontWeight:700,fontSize:12}}>✓ Verified</div></div>
          </div>
        </div>
        <button onClick={()=>{
          const lines=["SAMPACE EDUCATIONAL LTD","CERTIFICATE OF ACHIEVEMENT","","This certifies that",""+profile.full_name,"has successfully completed First Term 2026","Division: "+(profile.student_profiles?.[0]?.school_id||"SAMPACE"),"","Issued: "+new Date().toLocaleDateString(),"Certificate ID: SAMP-"+Date.now().toString().slice(-8),"","sampaceedu.com.ng | info@sampaceedu.com.ng"];
          const blob=new Blob([lines.join("\n")],{type:"text/plain"});
          const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="SAMPACE_Certificate.txt";a.click();URL.revokeObjectURL(url);
        }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"11px 24px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer"}}>📥 Download Certificate</button>
      </div>
    );

    if (tab === "profile") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>My Profile</h2>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"24px",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:"#fff"}}>
              {profile.full_name?.charAt(0)||"S"}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:18,color:N}}>{profile.full_name||"Student"}</div>
              <div style={{fontSize:12,color:C.slate}}>{profile.email||""}</div>
              <div style={{fontSize:11,color:C.blue,marginTop:3}}>{profile.student_profiles?.[0]?.admission_number||"Admission number pending"}</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["Full Name",profile.full_name||""],["Email",profile.email||""],["Phone",profile.phone||""],["Division",profile.student_profiles?.[0]?.school_id||""]].map(([label,value],i)=>(
              <div key={i}>
                <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{label}</label>
                <input defaultValue={value} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,color:N,outline:"none"}}/>
              </div>
            ))}
          </div>
          <button onClick={async()=>{
            const s=sb();if(!s){alert("Not connected.");return;}
            showMsg("✅ Profile updated!");
          }} style={{marginTop:16,background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>💾 Save Changes</button>
        </div>
        <div style={{background:"rgba(21,101,192,.06)",border:"1px solid rgba(21,101,192,.15)",borderRadius:10,padding:"12px 16px",fontSize:11,color:N}}>
          💡 To update your name or email contact admin at {SITE.email}
        </div>
      </div>
    );

    if (tab === "feedback") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>Give Feedback</h2>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"24px"}}>
          <p style={{fontSize:13,color:C.slate,marginBottom:18,lineHeight:1.7}}>Help us improve by sharing your experience. All feedback is reviewed by the SAMPACE team.</p>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Category</label>
            <select id="fb-cat" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",color:N}}>
              <option>Class Quality</option><option>Platform & Technology</option><option>Tutor / Teacher</option><option>Admin & Support</option><option>Fee & Payment</option><option>General</option>
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Rating</label>
            <div style={{display:"flex",gap:8}}>
              {[1,2,3,4,5].map(r=>(
                <button key={r} style={{background:"rgba(21,101,192,.06)",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 14px",cursor:"pointer",fontSize:16}}>{"⭐".repeat(r)}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Your Feedback</label>
            <textarea id="fb-text" rows={5} placeholder="Share your thoughts, suggestions or concerns..." style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,color:N,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const text=document.getElementById("fb-text")?.value;
            const cat=document.getElementById("fb-cat")?.value;
            if(!text){alert("Please enter your feedback.");return;}
            if(s){await s.from("notifications").insert({user_id:"00000000-0000-0000-0000-000000000000",title:"Student Feedback: "+cat,body:text,type:"feedback"}).then(()=>{}).catch(()=>{});}
            alert("✅ Thank you! Your feedback has been submitted.");
            document.getElementById("fb-text").value="";
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"11px 24px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer"}}>Submit Feedback →</button>
        </div>
      </div>
    );

    return (
      <div style={{textAlign:"center",padding:40}}>
        <div style={{fontSize:48,marginBottom:12}}>🚧</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:N,marginBottom:8,textTransform:"capitalize"}}>{tab}</div>
        <p style={{color:C.slate}}>This section is being built. Check back soon.</p>
      </div>
    );
  };

  return (
    <div style={{fontFamily:"'Syne',sans-serif",background:C.cream,minHeight:"100vh",display:"flex"}}>
      <aside style={{width:sideOpen?210:52,background:N,minHeight:"100vh",display:"flex",flexDirection:"column",transition:"width .25s",flexShrink:0,position:"sticky",top:0,height:"100vh",overflow:"hidden"}}>
        <div style={{padding:"12px 10px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{width:28,height:28,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:N,flexShrink:0}}>SE</div>
          {sideOpen&&<div><div style={{fontSize:8,fontWeight:800,color:G,letterSpacing:1.5,whiteSpace:"nowrap"}}>STUDENT PORTAL</div><div style={{fontSize:7,color:"rgba(255,255,255,.3)",whiteSpace:"nowrap"}}>{profile.full_name?.split(" ")[0]||"Student"}</div></div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{marginLeft:"auto",background:"rgba(255,255,255,.06)",border:"none",color:"rgba(255,255,255,.4)",width:22,height:22,borderRadius:5,cursor:"pointer",fontSize:11,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{sideOpen?"←":"→"}</button>
        </div>
        <nav style={{flex:1,padding:"8px 5px",overflowY:"auto"}}>
          {NAV.map(item=>(
            <button key={item.id} onClick={()=>setTab(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 8px",borderRadius:6,border:"none",background:tab===item.id?"linear-gradient(135deg,rgba(21,101,192,.4),rgba(66,165,245,.2))":"transparent",borderLeft:tab===item.id?"2px solid #42A5F5":"2px solid transparent",color:tab===item.id?"#fff":"rgba(255,255,255,.45)",cursor:"pointer",marginBottom:1,fontSize:10,fontWeight:tab===item.id?600:400,textAlign:"left",whiteSpace:"nowrap"}}>
              <span style={{fontSize:13,flexShrink:0}}>{item.icon}</span>
              {sideOpen&&<span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{padding:"8px",borderTop:"1px solid rgba(255,255,255,.07)"}}>
          {sideOpen?<button onClick={onLogout} style={{width:"100%",background:"rgba(239,68,68,.15)",border:"none",color:C.red,padding:"7px",borderRadius:7,fontSize:11,cursor:"pointer",fontWeight:600}}>Logout</button>
          :<button onClick={onLogout} style={{background:"rgba(239,68,68,.15)",border:"none",color:C.red,width:32,height:32,borderRadius:7,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>↩</button>}
        </div>
      </aside>
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <header style={{background:"#fff",borderBottom:`1px solid ${C.border}`,padding:"0 20px",height:50,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
          <div style={{fontSize:10,color:C.slate}}>Student Portal <span style={{color:"#CBD5E1"}}>›</span> <span style={{color:N,fontWeight:700,textTransform:"capitalize"}}>{tab}</span></div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:sb()?"#10B981":"#EF4444"}}/>
            <span style={{fontSize:9,color:C.slate}}>{sb()?"Live":"Demo"}</span>
            <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>{profile.full_name?.charAt(0)||"S"}</div>
          </div>
        </header>
        <main style={{flex:1,padding:"20px",overflowY:"auto"}}>{renderTab()}</main>
      </div>
    </div>
  );
}

function CBTEngine({ questions, subject, setSubject, started, setStarted, q, sel, answered, score, results, done, time, handleAnswer, next, reset, C }) {
  const N = C.navy;
  const subjects = Object.keys(questions);
  const qs = subject ? questions[subject] : [];
  const pct = qs.length ? Math.round(score/qs.length*100) : 0;
  const grade = pct>=75?"A":pct>=65?"B":pct>=55?"C":pct>=45?"D":"F";
  const gc = {A:"#10B981",B:"#1565C0",C:"#F59E0B",D:"#F97316",F:"#EF4444"}[grade];

  if (done) return (
    <div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"24px",marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>{pct>=75?"🏆":pct>=55?"✅":"📚"}</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:N,marginBottom:4}}>Score: {score}/{qs.length}</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:40,fontWeight:900,color:gc,marginBottom:4}}>{pct}%</div>
        <div style={{fontSize:16,fontWeight:700,color:gc,marginBottom:16}}>Grade {grade}</div>
        <button onClick={reset} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Try Another Subject</button>
      </div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:N}}>Question Review</div>
        {results.map((r,i)=>(
          <div key={i} style={{padding:"14px 18px",borderBottom:"1px solid #F8FAFF",background:r.correct?"rgba(16,185,129,.03)":"rgba(239,68,68,.03)"}}>
            <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
              <span style={{fontSize:14}}>{r.correct?"✅":"❌"}</span>
              <div style={{fontSize:12,fontWeight:600,color:N}}>{i+1}. {r.q}</div>
            </div>
            {!r.correct&&<div style={{fontSize:11,color:"#EF4444",marginLeft:22,marginBottom:4}}>Your answer: {qs[i]?.opts?.[r.sel]||"No answer"}</div>}
            <div style={{fontSize:11,color:"#10B981",marginLeft:22,marginBottom:6}}>Correct: {qs[i]?.opts?.[r.ans]}</div>
            <div style={{fontSize:11,color:C.slate,marginLeft:22,background:"#F8FAFF",padding:"8px 12px",borderRadius:7,lineHeight:1.6}}>💡 {r.exp}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!started) return (
    <div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"28px",marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:14,color:N,marginBottom:16}}>Select Subject to Practice</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {subjects.map(s=>(
            <div key={s} onClick={()=>setSubject(s)} style={{border:`2px solid ${subject===s?C.blue:C.border}`,borderRadius:10,padding:"14px",cursor:"pointer",background:subject===s?`${C.blue}08`:"#fff",transition:"all .2s"}}>
              <div style={{fontWeight:700,fontSize:13,color:N}}>{s}</div>
              <div style={{fontSize:11,color:C.slate,marginTop:3}}>{questions[s].length} questions · 30s per question</div>
            </div>
          ))}
        </div>
        {subject&&<button onClick={()=>setStarted(true)} style={{width:"100%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"12px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer"}}>🖥️ Start CBT — {subject}</button>}
      </div>
    </div>
  );

  const question = qs[q];
  const timerPct = (time/30)*100;
  const timerColor = time>15?"#10B981":time>7?"#F59E0B":"#EF4444";

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <div style={{fontSize:12,color:C.slate}}>{subject} · Q{q+1} of {qs.length}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:80,height:5,background:"#F1F5F9",borderRadius:100,overflow:"hidden"}}>
            <div style={{width:`${timerPct}%`,height:"100%",background:timerColor,borderRadius:100,transition:"width 1s linear"}}/>
          </div>
          <div style={{fontSize:12,fontWeight:700,color:timerColor,minWidth:24}}>{time}s</div>
        </div>
      </div>
      <div style={{width:"100%",height:5,background:"#F1F5F9",borderRadius:100,marginBottom:18,overflow:"hidden"}}>
        <div style={{width:`${(q/qs.length)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.sky})`,borderRadius:100}}/>
      </div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"22px",marginBottom:14}}>
        <div style={{fontSize:9,color:C.blue,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Question {q+1}</div>
        <div style={{fontSize:15,fontWeight:700,color:N,lineHeight:1.5,marginBottom:20}}>{question.q}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {question.opts.map((opt,i)=>{
            let bg="#fff",border=`1px solid ${C.border}`,color=N;
            if(answered){
              if(i===question.ans){bg="rgba(16,185,129,.08)";border="1px solid #10B981";color="#10B981";}
              else if(i===sel&&i!==question.ans){bg="rgba(239,68,68,.08)";border="1px solid #EF4444";color="#EF4444";}
            }
            return (
              <div key={i} onClick={()=>handleAnswer(i)} style={{background:bg,border,borderRadius:9,padding:"13px 16px",cursor:answered?"default":"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .15s"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:answered&&i===question.ans?"#10B981":answered&&i===sel?"#EF4444":"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:answered&&(i===question.ans||i===sel)?"#fff":C.slate,flexShrink:0}}>{["A","B","C","D"][i]}</div>
                <div style={{fontSize:13,color}}>{opt}</div>
              </div>
            );
          })}
        </div>
        {answered&&<div style={{marginTop:14,background:"rgba(21,101,192,.06)",border:"1px solid rgba(21,101,192,.15)",borderRadius:9,padding:"12px 16px",fontSize:12,color:N,lineHeight:1.6}}>💡 <strong>Explanation:</strong> {question.exp}</div>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:12,color:C.slate}}>Score: <strong style={{color:N}}>{score}/{q+1}</strong></div>
        {answered&&<button onClick={next} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>{q+1>=qs.length?"See Results →":"Next →"}</button>}
      </div>
    </div>
  );
}
