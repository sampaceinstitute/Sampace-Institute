import { useState, useEffect, useRef } from "react";

const C = {
  navy:  "#0B1F3A", green: "#00695C", mint:  "#4DB6AC",
  light: "#E0F2F1", gold:  "#C9A84C", white: "#FFFFFF",
  cream: "#F4FAF9", slate: "#64748B", border:"#E2E8F0",
  red:   "#EF4444", amber: "#F59E0B", blue:  "#1565C0",
};

// ─── DATA ───
const examTracks = [
  { id:"bece",  label:"BECE",      full:"Basic Education Certificate Exam", icon:"🟢", color:"#2E7D32", light:"#E8F5E9", desc:"JSS1–JSS3 students. Junior secondary exit exam.", subjects:["English Language","Mathematics","Basic Science & Technology","Social Studies","Civic Education","Basic Technology","Agricultural Science","Home Economics","Computer Studies","Creative & Cultural Arts"] },
  { id:"waec",  label:"WAEC",      full:"West African Senior School Cert.",  icon:"🔵", color:"#1565C0", light:"#E3F2FD", desc:"SS2–SS3 students. Senior secondary exit exam.",   subjects:["English Language","Mathematics","Biology","Chemistry","Physics","Literature","Government","Economics","Commerce","Accounting","Geography","History","Fine Art"] },
  { id:"neco",  label:"NECO",      full:"National Examinations Council",     icon:"🟡", color:"#E65100", light:"#FBE9E7", desc:"SS2–SS3. National alternative to WAEC.",         subjects:["English Language","Mathematics","Biology","Chemistry","Physics","Literature","Government","Economics","Commerce","Accounting"] },
  { id:"gce",   label:"GCE",       full:"General Certificate of Education",  icon:"🟠", color:"#6A1B9A", light:"#F3E5F5", desc:"School leavers & repeat candidates.",            subjects:["English Language","Mathematics","Biology","Chemistry","Physics","Literature","Government","Economics"] },
  { id:"jamb",  label:"JAMB/UTME", full:"Joint Admissions & Matriculation",  icon:"🔴", color:"#B71C1C", light:"#FFEBEE", desc:"SS3 & school leavers. University admission exam.", subjects:["Use of English (Compulsory)","Mathematics","Biology","Chemistry","Physics","Literature","Government","Economics","Commerce","Accounting","Geography","Agricultural Science"] },
];

const mockQuestions = [
  { id:1, text:"If 2x + 5 = 13, what is the value of x?", options:["3","4","5","6"], answer:1, explanation:"2x = 13 - 5 = 8, therefore x = 8 ÷ 2 = 4" },
  { id:2, text:"Which of the following is NOT a function of the liver?", options:["Detoxification","Bile production","Insulin secretion","Glycogen storage"], answer:2, explanation:"Insulin is secreted by the pancreas (beta cells), not the liver." },
  { id:3, text:"The capital of Nigeria is:", options:["Lagos","Abuja","Kano","Port Harcourt"], answer:1, explanation:"Abuja became Nigeria's capital in 1991, replacing Lagos." },
  { id:4, text:"What is the chemical symbol for Gold?", options:["Go","Gd","Au","Ag"], answer:2, explanation:"Au comes from the Latin word 'Aurum' meaning gold." },
  { id:5, text:"Which planet is known as the Red Planet?", options:["Venus","Jupiter","Saturn","Mars"], answer:3, explanation:"Mars appears red due to iron oxide (rust) on its surface." },
];

const studentProgress = [
  { subject:"English Language", mastery:78, questions:340, streak:5,  color:"#1565C0" },
  { subject:"Mathematics",       mastery:65, questions:520, streak:12, color:"#2E7D32" },
  { subject:"Biology",           mastery:82, questions:210, streak:3,  color:"#00695C" },
  { subject:"Chemistry",         mastery:54, questions:180, streak:0,  color:"#E65100" },
  { subject:"Physics",           mastery:70, questions:290, streak:7,  color:"#6A1B9A" },
];

const leaderboard = [
  { rank:1,  name:"Chiamaka O.", track:"WAEC",      score:94, badge:"🥇" },
  { rank:2,  name:"Ibrahim M.",  track:"JAMB",      score:91, badge:"🥈" },
  { rank:3,  name:"Adaeze N.",   track:"WAEC",      score:89, badge:"🥉" },
  { rank:4,  name:"Yusuf A.",    track:"NECO",      score:87, badge:"⭐" },
  { rank:5,  name:"Grace E.",    track:"BECE",      score:85, badge:"⭐" },
];

// ─── HELPERS ───
function Badge({ text, color, bg }) {
  return <span style={{ background:bg||`${color}18`, color, padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600 }}>{text}</span>;
}
function Card({ children, style={} }) {
  return <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", ...style }}>{children}</div>;
}
function Hdr({ title, sub }) {
  return (
    <div style={{ marginBottom:24 }}>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.navy }}>{title}</h2>
      {sub && <div style={{ fontSize:13, color:C.slate, marginTop:2 }}>{sub}</div>}
    </div>
  );
}

// ─── NAVBAR ───
function Nav({ view, setView }) {
  const views = [["landing","🏠 Home"],["enroll","📋 Enroll"],["student","🎓 Student"],["cbt","🎯 CBT Exam"]];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(0,57,49,0.97)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(77,182,172,0.2)", padding:"0 40px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:38, height:38, background:`linear-gradient(135deg,${C.green},${C.mint})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue'", fontSize:14, color:"#fff" }}>TLE</div>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, letterSpacing:3, background:`linear-gradient(90deg,${C.mint},${C.gold})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>TUTORIAL & LOCAL EXAM</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:2 }}>SAMPACE INSTITUTE</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:4 }}>
        {views.map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)} style={{ background:view===v?`linear-gradient(135deg,${C.green},${C.mint})`:"transparent", border:"none", color:view===v?"#fff":"rgba(255,255,255,0.55)", padding:"6px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>{l}</button>
        ))}
      </div>
      <button style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"8px 20px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>Enroll Now</button>
    </nav>
  );
}

// ─── LANDING ───
function Landing({ setView }) {
  return (
    <div style={{ background:C.cream }}>
      {/* Hero */}
      <section style={{ background:`linear-gradient(160deg,#002920 0%,${C.navy} 40%,${C.green} 100%)`, padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(77,182,172,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(77,182,172,0.05) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div style={{ position:"relative", zIndex:2, maxWidth:780, margin:"0 auto" }}>
          <div style={{ display:"inline-block", border:`1px solid ${C.mint}`, color:C.mint, padding:"5px 18px", borderRadius:100, fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:24 }}>
            📝 Exam Prep · CBT Practice · Monthly Tests
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,7vw,80px)", fontWeight:700, color:"#fff", lineHeight:0.95, marginBottom:16 }}>
            <span style={{ background:`linear-gradient(135deg,#fff,${C.mint})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Tutorial &</span>{" "}
            <span style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Local Exam</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:16, lineHeight:1.8, maxWidth:560, margin:"0 auto 36px" }}>
            Nigeria's most comprehensive online exam preparation platform. BECE, WAEC, NECO, GCE and JAMB. CBT practice, past questions, monthly mock tests and personalised study plans.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setView("enroll")} style={{ background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"14px 36px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:`0 8px 28px rgba(0,105,92,0.5)` }}>Enroll Now →</button>
            <button onClick={()=>setView("cbt")} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"14px 32px", borderRadius:8, fontSize:14, cursor:"pointer" }}>🎯 Try Free CBT Demo</button>
          </div>
          <div style={{ display:"flex", gap:48, justifyContent:"center", marginTop:56, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {[["5","Exam Tracks"],["40+","Subjects"],["10,000+","CBT Questions"],["Monthly","Mock Tests"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:40, color:C.gold, letterSpacing:2, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Tracks */}
      <section style={{ padding:"72px 48px", background:C.white }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, letterSpacing:3, color:C.gold, textTransform:"uppercase", marginBottom:10, fontWeight:600 }}>Choose Your Exam Track</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy }}>5 Tracks. <em style={{ color:C.green, fontStyle:"italic" }}>Every Nigerian Exam.</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
            {examTracks.map(t=>(
              <div key={t.id} onClick={()=>setView("enroll")} style={{ background:t.light, border:`2px solid ${t.color}25`, borderRadius:14, padding:"24px 16px", textAlign:"center", cursor:"pointer", transition:"all .25s", borderTop:`4px solid ${t.color}` }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 16px 40px ${t.color}20`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize:32, marginBottom:12 }}>{t.icon}</div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:26, color:t.color, letterSpacing:2, marginBottom:4 }}>{t.label}</div>
                <div style={{ fontSize:11, color:C.slate, lineHeight:1.5, marginBottom:12 }}>{t.desc}</div>
                <div style={{ fontSize:12, fontWeight:600, color:t.color }}>{t.subjects.length} Subjects →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:"72px 48px", background:C.cream }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy }}>Everything You Need to <em style={{ color:C.green, fontStyle:"italic" }}>Pass</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { icon:"🎯", title:"CBT Practice Engine",         desc:"10,000+ past questions. Topic drills, full exam simulation, timed practice and JAMB CBT exact replica." },
              { icon:"📅", title:"Monthly Mock Tests",          desc:"Scheduled monthly exams on fixed dates. Auto-graded, class ranking, leaderboard and performance feedback." },
              { icon:"📊", title:"Personalised Study Plan",     desc:"Your study schedule generated from your exam date, weak topics and available days per week." },
              { icon:"🎥", title:"Video Lessons & Notes",       desc:"Recorded tutor lessons per topic. Downloadable PDF notes, slides and worked examples." },
              { icon:"🏆", title:"Leaderboard & Badges",        desc:"Monthly top performers celebrated. Study streak badges, perfect score badges and participation certificates." },
              { icon:"📱", title:"Study Anywhere — Mobile PWA", desc:"Works perfectly on your phone. Download lessons for offline study. No laptop needed." },
            ].map(f=>(
              <div key={f.title} style={{ background:C.white, borderRadius:12, padding:"28px 24px", border:`1px solid ${C.border}`, transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${C.green}40`; e.currentTarget.style.boxShadow=`0 8px 28px rgba(0,105,92,0.1)`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize:32, marginBottom:14 }}>{f.icon}</div>
                <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:8 }}>{f.title}</div>
                <div style={{ fontSize:13, color:C.slate, lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section style={{ padding:"72px 48px", background:C.white }}>
        <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:11, letterSpacing:3, color:C.gold, textTransform:"uppercase", marginBottom:12, fontWeight:600 }}>Monthly Top Performers</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:700, color:C.navy, marginBottom:36 }}>This Month's <em style={{ color:C.green, fontStyle:"italic" }}>Champions</em></h2>
          <Card>
            {leaderboard.map((s,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", padding:"14px 24px", borderBottom:`1px solid ${C.cream}`, background:i===0?"rgba(201,168,76,0.06)":"transparent" }}>
                <div style={{ width:32, fontFamily:"'Bebas Neue'", fontSize:22, color:i===0?C.gold:C.slate }}>{s.badge}</div>
                <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${C.green},${C.mint})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", marginRight:14 }}>{s.name.charAt(0)}</div>
                <div style={{ flex:1, textAlign:"left" }}>
                  <div style={{ fontWeight:600, fontSize:13, color:C.navy }}>{s.name}</div>
                  <div style={{ fontSize:11, color:C.slate }}>{s.track} Track</div>
                </div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:24, color:C.green, letterSpacing:1 }}>{s.score}%</div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg,${C.green},#004D40)`, padding:"72px 48px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:56, color:"#fff", letterSpacing:3, marginBottom:12 }}>READY TO START PREPARING?</h2>
        <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:440, margin:"0 auto 32px", lineHeight:1.7 }}>Enroll now and get instant access to your exam track, CBT practice and personalised study plan.</p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>setView("enroll")} style={{ background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"14px 40px", borderRadius:8, fontSize:14, fontWeight:800, cursor:"pointer" }}>📋 Enroll Today</button>
          <a href="https://wa.me/" style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", padding:"14px 32px", borderRadius:8, fontSize:14, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>💬 WhatsApp Us</a>
        </div>
      </section>
    </div>
  );
}

// ─── ENROLLMENT FORM ───
function EnrollForm({ setView }) {
  const [step, setStep] = useState(1);
  const [track, setTrack] = useState("");
  const [pkg, setPkg]   = useState("");
  const [done, setDone]  = useState(false);
  const totalSteps = 3;

  if (done) return (
    <div style={{ background:C.cream, minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
      <div style={{ background:C.white, borderRadius:16, padding:"56px 48px", textAlign:"center", maxWidth:520, boxShadow:"0 16px 48px rgba(0,0,0,0.08)" }}>
        <div style={{ width:72, height:72, background:"rgba(16,185,129,0.12)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px" }}>✅</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:C.navy, marginBottom:8 }}>Enrollment Successful!</h2>
        <p style={{ color:C.slate, lineHeight:1.7, marginBottom:24 }}>Your account is being set up. You will receive your login details and study plan via email and SMS within <strong>1 hour</strong>.</p>
        <div style={{ background:C.cream, borderRadius:10, padding:"16px 20px", marginBottom:28 }}>
          <div style={{ fontSize:12, color:C.slate, marginBottom:4 }}>Enrollment ID</div>
          <div style={{ fontFamily:"monospace", fontSize:18, fontWeight:700, color:C.green }}>TLE-{Math.floor(Math.random()*9000)+1000}</div>
        </div>
        <button onClick={()=>setView("student")} style={{ background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"12px 32px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:700 }}>Go to Student Dashboard →</button>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"40px 48px" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <button onClick={()=>setView("landing")} style={{ background:"none", border:"none", color:C.slate, fontSize:13, cursor:"pointer", marginBottom:12 }}>← Back</button>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:700, color:C.navy, marginBottom:4 }}>Exam Prep <em style={{ color:C.green, fontStyle:"italic" }}>Enrollment</em></h1>
        <div style={{ fontSize:13, color:C.slate, marginBottom:28 }}>SAMPACE INSTITUTE · Tutorial & Local Exam Platform</div>

        {/* Progress */}
        <div style={{ background:C.white, borderRadius:12, padding:"20px 28px", marginBottom:24, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:0 }}>
            {["Your Details","Exam Track & Subjects","Payment"].map((s,i)=>(
              <div key={i} style={{ flex:1, display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:i+1<step?C.green:i+1===step?`linear-gradient(135deg,${C.green},${C.mint})`:C.cream, border:i+1>step?`2px solid ${C.border}`:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:i+1<=step?"#fff":C.slate, fontWeight:700 }}>{i+1<step?"✓":i+1}</div>
                  <div style={{ fontSize:11, color:i+1===step?C.green:C.slate, marginTop:6, fontWeight:i+1===step?700:400, textAlign:"center" }}>{s}</div>
                </div>
                {i<2 && <div style={{ height:2, flex:1, background:i+1<step?C.green:C.border, margin:"0 4px", marginBottom:20 }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ background:`linear-gradient(135deg,#002920,${C.green})`, padding:"20px 28px" }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:20, color:C.gold, letterSpacing:2 }}>STEP {step} OF {totalSteps}</div>
            <div style={{ fontSize:15, color:"#fff", fontWeight:600 }}>{["Your Personal Details","Choose Your Exam Track","Confirm & Pay"][step-1]}</div>
          </div>
          <div style={{ padding:"32px 28px" }}>

            {step===1 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {[["First Name *","text"],["Last Name *","text"],["Date of Birth *","date"],["Gender *","select:Male,Female"],["Phone Number *","tel"],["Email Address *","email"],["State of Origin *","text"],["Current School (Optional)","text"],["Your Address *","text"]].map(([label,type])=>(
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

            {step===2 && (
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:16 }}>Select Your Exam Track</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
                  {examTracks.map(t=>(
                    <div key={t.id} onClick={()=>setTrack(t.id)} style={{ border:`2px solid ${track===t.id?t.color:C.border}`, borderRadius:10, padding:"16px 18px", cursor:"pointer", background:track===t.id?t.light:"#fff", transition:"all .2s" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                        <span style={{ fontSize:20 }}>{t.icon}</span>
                        <div>
                          <div style={{ fontWeight:700, fontSize:14, color:track===t.id?t.color:C.navy }}>{t.label}</div>
                          <div style={{ fontSize:11, color:C.slate }}>{t.full}</div>
                        </div>
                        {track===t.id && <span style={{ marginLeft:"auto", color:t.color, fontSize:18 }}>✓</span>}
                      </div>
                      <div style={{ fontSize:12, color:C.slate }}>{t.desc}</div>
                    </div>
                  ))}
                </div>

                {track && (
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:12 }}>Choose Your Package</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                      {[["full","Full Package","All subjects for your exam track","₦45,000"],["bundle","Bundle","Pick 2–4 subjects","₦28,000"],["single","Single Subject","One subject only","₦12,000"]].map(([v,label,desc,price])=>(
                        <div key={v} onClick={()=>setPkg(v)} style={{ border:`2px solid ${pkg===v?C.green:C.border}`, borderRadius:10, padding:"16px", cursor:"pointer", background:pkg===v?"rgba(0,105,92,0.05)":"#fff", textAlign:"center", transition:"all .2s" }}>
                          <div style={{ fontWeight:700, fontSize:14, color:pkg===v?C.green:C.navy, marginBottom:4 }}>{label}</div>
                          <div style={{ fontSize:11, color:C.slate, marginBottom:8 }}>{desc}</div>
                          <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:pkg===v?C.green:C.navy, letterSpacing:1 }}>{price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step===3 && (
              <div>
                <div style={{ background:C.cream, borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:16 }}>Enrollment Summary</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {[["Exam Track", examTracks.find(t=>t.id===track)?.label || "WAEC"],["Package","Full Package"],["Duration","6 months access"],["Monthly Tests","Included"],["Study Plan","Auto-generated on enrollment"]].map(([k,v])=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                        <span style={{ fontSize:13, color:C.slate }}>{k}</span>
                        <span style={{ fontSize:13, fontWeight:600, color:C.navy }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0" }}>
                      <span style={{ fontSize:15, fontWeight:700, color:C.navy }}>Total Amount</span>
                      <span style={{ fontFamily:"'Bebas Neue'", fontSize:24, color:C.green, letterSpacing:1 }}>₦45,000</span>
                    </div>
                  </div>
                </div>
                <div style={{ background:"rgba(0,105,92,0.06)", border:`1px solid rgba(0,105,92,0.15)`, borderRadius:10, padding:"16px 20px", marginBottom:20 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.green, marginBottom:8 }}>🔒 Secure Payment via Paystack</div>
                  <div style={{ fontSize:12, color:C.slate, lineHeight:1.7 }}>You will be redirected to Paystack's secure payment page to complete your enrollment. Your student portal is activated immediately after payment.</div>
                </div>
                <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                  <input type="checkbox" style={{ width:16, height:16, accentColor:C.green }} />
                  <span style={{ fontSize:13, color:C.navy }}>I agree to the SAMPACE INSTITUTE terms and refund policy</span>
                </label>
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:32 }}>
              <button onClick={()=>step>1?setStep(s=>s-1):setView("landing")} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>{step===1?"← Back":"← Previous"}</button>
              <button onClick={()=>step<totalSteps?setStep(s=>s+1):setDone(true)} style={{ background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"11px 32px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 16px rgba(0,105,92,0.3)` }}>
                {step===totalSteps?"💳 Pay & Enroll":"Next Step →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STUDENT DASHBOARD ───
function StudentDash({ setView }) {
  const [tab, setTab] = useState("home");
  const tabs = [["home","🏠 Dashboard"],["study","📚 Study Plan"],["progress","📊 Progress"],["monthly","📅 Monthly Test"],["leaderboard","🏆 Leaderboard"]];
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const studyPlan = [
    { day:"Mon", subject:"Mathematics", topic:"Quadratic Equations", duration:"2hrs", done:true  },
    { day:"Tue", subject:"English",     topic:"Comprehension & Summary", duration:"1.5hrs", done:true },
    { day:"Wed", subject:"Biology",     topic:"Cell Division",        duration:"2hrs", done:false },
    { day:"Thu", subject:"Chemistry",   topic:"Organic Chemistry",    duration:"2hrs", done:false },
    { day:"Fri", subject:"Physics",     topic:"Electricity & Magnetism", duration:"1.5hrs", done:false },
    { day:"Sat", subject:"All Subjects","topic":"CBT Mock Session",   duration:"3hrs", done:false },
  ];

  return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex" }}>
      {/* Sidebar */}
      <aside style={{ width:220, background:"#002920", minHeight:"100vh", padding:"24px 12px", position:"sticky", top:60, height:"calc(100vh - 60px)", flexShrink:0, overflowY:"auto" }}>
        <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:12, padding:"16px", marginBottom:20, textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${C.green},${C.mint})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, margin:"0 auto 10px" }}>E</div>
          <div style={{ fontWeight:700, fontSize:13, color:"#fff" }}>Emeka Nwosu</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:2 }}>WAEC Track · SS3</div>
          <div style={{ fontSize:10, color:C.gold, marginTop:4, fontFamily:"monospace" }}>TLE/2026/0089</div>
          <div style={{ marginTop:8, background:"rgba(201,168,76,0.15)", border:`1px solid ${C.gold}40`, borderRadius:6, padding:"4px 0" }}>
            <span style={{ fontSize:10, color:C.gold, fontWeight:600 }}>🔥 12-day streak</span>
          </div>
        </div>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:8, background:tab===id?`linear-gradient(135deg,rgba(0,105,92,0.4),rgba(77,182,172,0.2))`:"transparent", borderLeft:tab===id?`2px solid ${C.mint}`:"2px solid transparent", border:"none", color:tab===id?"#fff":"rgba(255,255,255,0.5)", fontSize:13, fontWeight:tab===id?600:400, cursor:"pointer", marginBottom:2, display:"block" }}>{label}</button>
        ))}
        <div style={{ marginTop:16, padding:"0 4px" }}>
          <button onClick={()=>setView("cbt")} style={{ width:"100%", background:`linear-gradient(135deg,${C.gold},#FFD54F)`, color:C.navy, border:"none", padding:"12px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>🎯 Start CBT Practice</button>
        </div>
      </aside>

      <main style={{ flex:1, padding:"28px 32px", minWidth:0 }}>
        {tab==="home" && (
          <div>
            <Hdr title={<>Good morning, <em style={{ color:C.green, fontStyle:"italic" }}>Emeka</em> 👋</>} sub="WAEC Track · Your exam is in 47 days — stay focused!" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
              {[["🎯","Readiness Score","72%","↑ 4% this week",C.green],["📅","Days to Exam","47","WAEC 2026",C.amber],["🔥","Study Streak","12 Days","Personal best!",C.red],["📝","CBT Sessions","34","This month",C.blue]].map(([icon,label,val,sub,color])=>(
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
                <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:15, color:C.navy }}>Subject Readiness</div>
                <div style={{ padding:"0 20px" }}>
                  {studentProgress.map(s=>(
                    <div key={s.subject} style={{ padding:"13px 0", borderBottom:`1px solid ${C.cream}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:C.navy }}>{s.subject}</div>
                          <div style={{ fontSize:11, color:C.slate }}>{s.questions} questions practiced · {s.streak > 0 ? `🔥 ${s.streak}-day streak` : "No recent activity"}</div>
                        </div>
                        <div style={{ fontFamily:"'Bebas Neue'", fontSize:24, color:s.color, letterSpacing:1 }}>{s.mastery}%</div>
                      </div>
                      <div style={{ background:C.cream, borderRadius:100, height:8, overflow:"hidden" }}>
                        <div style={{ width:`${s.mastery}%`, height:"100%", background:`linear-gradient(90deg,${s.color},${s.color}99)`, borderRadius:100, transition:"width 1s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <Card style={{ padding:"20px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:14 }}>Today's Study Plan</div>
                  <div style={{ background:`${C.green}10`, border:`1px solid ${C.green}20`, borderRadius:10, padding:"14px" }}>
                    <div style={{ fontSize:12, color:C.green, fontWeight:600, marginBottom:4 }}>📚 Wednesday</div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>Biology</div>
                    <div style={{ fontSize:12, color:C.slate, marginBottom:10 }}>Cell Division · 2 hours</div>
                    <button onClick={()=>setView("cbt")} style={{ width:"100%", background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"9px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Start Today's Session →</button>
                  </div>
                </Card>
                <Card style={{ padding:"20px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:14 }}>Next Monthly Test</div>
                  <div style={{ textAlign:"center", padding:"16px 0" }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:C.amber, letterSpacing:2 }}>12 DAYS</div>
                    <div style={{ fontSize:12, color:C.slate }}>Saturday, 30 May 2026</div>
                    <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>All subjects · 2 hours</div>
                  </div>
                  <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:8, padding:"10px", textAlign:"center" }}>
                    <div style={{ fontSize:12, color:C.amber, fontWeight:600 }}>⏰ Reminder set for May 29</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {tab==="study" && (
          <div>
            <Hdr title={<>Your <em style={{ color:C.green, fontStyle:"italic" }}>Study Plan</em></>} sub="Auto-generated based on your exam date, subjects and weak areas" />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8, marginBottom:24 }}>
              {days.map((d,i)=>(
                <div key={d} style={{ background:i<2?"rgba(16,185,129,0.1)":i===2?`${C.green}20`:C.white, border:`2px solid ${i<2?C.green:i===2?C.green:C.border}`, borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
                  <div style={{ fontSize:11, color:i===2?C.green:C.slate, fontWeight:600, marginBottom:4 }}>{d}</div>
                  {i<2?<div style={{ fontSize:16 }}>✅</div>:i===2?<div style={{ fontSize:16 }}>📖</div>:<div style={{ fontSize:16 }}>⬜</div>}
                </div>
              ))}
            </div>
            <Card>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:15, color:C.navy }}>This Week's Schedule</div>
              {studyPlan.map((p,i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr 100px 80px", gap:16, padding:"14px 20px", borderBottom:`1px solid ${C.cream}`, alignItems:"center", background:p.done?"rgba(16,185,129,0.03)":"transparent" }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, color:p.done?C.green:C.slate, letterSpacing:1 }}>{p.day}</div>
                  <div style={{ fontWeight:600, fontSize:13, color:C.navy }}>{p.subject}</div>
                  <div style={{ fontSize:12, color:C.slate }}>{p.topic}</div>
                  <div style={{ fontSize:12, color:C.slate }}>⏱ {p.duration}</div>
                  <div>{p.done?<Badge text="✓ Done" color={C.green} />:<button onClick={()=>setView("cbt")} style={{ background:`${C.green}12`, border:`1px solid ${C.green}30`, color:C.green, padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer" }}>Start</button>}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {tab==="progress" && (
          <div>
            <Hdr title={<>My <em style={{ color:C.green, fontStyle:"italic" }}>Progress</em></>} sub="Track your improvement over time across all subjects" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {studentProgress.map(s=>(
                <Card key={s.subject} style={{ padding:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, color:C.navy }}>{s.subject}</div>
                      <div style={{ fontSize:12, color:C.slate }}>{s.questions} questions practiced</div>
                    </div>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:s.color, letterSpacing:1 }}>{s.mastery}%</div>
                  </div>
                  <div style={{ background:C.cream, borderRadius:100, height:10, overflow:"hidden", marginBottom:12 }}>
                    <div style={{ width:`${s.mastery}%`, height:"100%", background:`linear-gradient(90deg,${s.color},${s.color}88)`, borderRadius:100 }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11, color:C.slate }}>{s.mastery < 60 ? "⚠️ Needs attention" : s.mastery < 75 ? "📈 Good progress" : "🏆 Strong"}</span>
                    {s.streak > 0 && <span style={{ fontSize:11, color:C.amber, fontWeight:600 }}>🔥 {s.streak}-day streak</span>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab==="monthly" && (
          <div>
            <Hdr title={<>Monthly <em style={{ color:C.green, fontStyle:"italic" }}>Test</em></>} sub="Scheduled mock exams — held last Saturday of every month" />
            <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"24px 28px", marginBottom:24, display:"flex", alignItems:"center", gap:20 }}>
              <div style={{ fontSize:48 }}>⏳</div>
              <div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:32, color:C.amber, letterSpacing:2 }}>NEXT TEST: 12 DAYS</div>
                <div style={{ fontSize:14, color:C.navy, fontWeight:600 }}>Saturday, 30 May 2026 · 10:00 AM</div>
                <div style={{ fontSize:13, color:C.slate }}>All WAEC subjects · 2 hours · Auto-opens at 10am</div>
              </div>
            </div>
            <Card>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:15, color:C.navy }}>Past Monthly Tests</div>
              {[["April 2026","82%","6th / 89","Available"],["March 2026","74%","12th / 89","Available"],["February 2026","68%","18th / 89","Available"]].map(([month,score,pos,status],i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:16, padding:"14px 20px", borderBottom:`1px solid ${C.cream}`, alignItems:"center" }}>
                  <div style={{ fontWeight:600, fontSize:13, color:C.navy }}>{month}</div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.green, letterSpacing:1 }}>{score}</div>
                  <div style={{ fontSize:13, color:C.slate }}>Position: {pos}</div>
                  <button style={{ background:`${C.green}12`, border:`1px solid ${C.green}30`, color:C.green, padding:"6px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>View Report</button>
                </div>
              ))}
            </Card>
          </div>
        )}

        {tab==="leaderboard" && (
          <div>
            <Hdr title={<>May <em style={{ color:C.green, fontStyle:"italic" }}>Leaderboard</em></>} sub="Top performers this month — updated after each monthly test" />
            <Card>
              {leaderboard.map((s,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", padding:"16px 24px", borderBottom:`1px solid ${C.cream}`, background:s.name.includes("Emeka")?"rgba(0,105,92,0.05)":i===0?"rgba(201,168,76,0.06)":"transparent", borderLeft:s.name.includes("Emeka")?`3px solid ${C.green}`:"3px solid transparent" }}>
                  <div style={{ width:40, fontFamily:"'Bebas Neue'", fontSize:26, color:i===0?C.gold:C.slate }}>{s.badge}</div>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${C.green},${C.mint})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, color:"#fff", marginRight:16 }}>{s.name.charAt(0)}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{s.name} {s.name.includes("Emeka")&&<span style={{ color:C.green, fontSize:11 }}>(You)</span>}</div>
                    <div style={{ fontSize:12, color:C.slate }}>{s.track} Track</div>
                  </div>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, color:C.green, letterSpacing:1 }}>{s.score}%</div>
                </div>
              ))}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── CBT ENGINE ───
function CBTEngine({ setView }) {
  const [mode, setMode]       = useState("select");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [done, setDone]       = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const timerRef = useRef();

  useEffect(() => {
    if (mode === "exam" && !done) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setDone(true); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [mode, done]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const score = Object.entries(answers).filter(([qi,ai]) => mockQuestions[+qi].answer === +ai).length;

  if (mode === "select") return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 48px" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <button onClick={()=>setView("student")} style={{ background:"none", border:"none", color:C.slate, fontSize:13, cursor:"pointer", marginBottom:16 }}>← Back to Dashboard</button>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy, marginBottom:8 }}>CBT <em style={{ color:C.green, fontStyle:"italic" }}>Practice</em></h1>
        <p style={{ color:C.slate, marginBottom:40, lineHeight:1.7 }}>Choose your practice mode. All modes use real past exam questions with full explanations.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {[
            { icon:"📖", title:"Topic Practice",      desc:"Pick a subject and topic. Practice unlimited questions at your own pace.",  color:C.blue,  mode:"exam" },
            { icon:"⏱",  title:"Timed Full Exam",     desc:"Full past exam simulation. Real time limit. All subjects combined.",        color:C.green, mode:"exam" },
            { icon:"⚡",  title:"Quick 10-Min Drill",  desc:"20 random questions. 10 minutes. Best for daily warm-up sessions.",         color:C.amber, mode:"exam" },
            { icon:"📉",  title:"Weak Area Mode",      desc:"System picks topics where you are underperforming. Train your weak spots.", color:"#6A1B9A", mode:"exam" },
            { icon:"📅",  title:"Past Question Mode",  desc:"Full past papers by year. WAEC 2022, NECO 2023, JAMB 2024 and more.",      color:"#B71C1C", mode:"exam" },
            { icon:"🤖",  title:"JAMB CBT Simulator",  desc:"Exact replica of the JAMB CBT interface. 160 questions. 2-hour timer.",    color:C.navy,  mode:"jamb" },
          ].map(m=>(
            <div key={m.title} onClick={()=>setMode(m.mode)} style={{ background:C.white, border:`2px solid ${m.color}20`, borderRadius:14, padding:"28px 22px", cursor:"pointer", transition:"all .25s", borderTop:`4px solid ${m.color}` }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 36px ${m.color}20`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
              <div style={{ fontSize:32, marginBottom:14 }}>{m.icon}</div>
              <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:6 }}>{m.title}</div>
              <div style={{ fontSize:12, color:C.slate, lineHeight:1.6 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (done) {
    const pct = Math.round((score / mockQuestions.length) * 100);
    return (
      <div style={{ background:C.cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
        <div style={{ background:C.white, borderRadius:16, padding:"56px 48px", textAlign:"center", maxWidth:520 }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:80, color:pct>=50?C.green:C.red, letterSpacing:2, lineHeight:1 }}>{pct}%</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:C.navy, marginBottom:8 }}>
            {pct>=75?"Excellent! 🏆":pct>=50?"Good Effort! 📈":"Keep Practicing! 💪"}
          </div>
          <div style={{ color:C.slate, marginBottom:24 }}>You answered <strong>{score}</strong> of <strong>{mockQuestions.length}</strong> questions correctly.</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            <button onClick={()=>{setMode("select");setCurrent(0);setAnswers({});setRevealed({});setDone(false);setTimeLeft(600);}} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"10px 24px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:600 }}>Try Again</button>
            <button onClick={()=>setView("student")} style={{ background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:700 }}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  const q = mockQuestions[current];
  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"32px 48px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:C.navy, letterSpacing:2 }}>QUESTION {current+1} OF {mockQuestions.length}</div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, color:timeLeft<60?C.red:C.green, letterSpacing:2 }}>⏱ {fmt(timeLeft)}</div>
            <button onClick={()=>setDone(true)} style={{ background:C.red, color:"#fff", border:"none", padding:"8px 16px", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:600 }}>End Session</button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background:C.border, borderRadius:100, height:6, marginBottom:28 }}>
          <div style={{ width:`${((current+1)/mockQuestions.length)*100}%`, height:"100%", background:`linear-gradient(90deg,${C.green},${C.mint})`, borderRadius:100, transition:"width .4s" }} />
        </div>

        {/* Question */}
        <Card style={{ padding:"32px 36px", marginBottom:20 }}>
          <div style={{ fontSize:11, color:C.slate, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Mathematics · Algebra</div>
          <div style={{ fontSize:18, fontWeight:600, color:C.navy, lineHeight:1.6, marginBottom:28 }}>{q.text}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {q.options.map((opt,i)=>{
              const sel = answers[current] === i;
              const correct = revealed[current] && i === q.answer;
              const wrong   = revealed[current] && sel && i !== q.answer;
              return (
                <button key={i} onClick={()=>{ if (!revealed[current]) setAnswers(a=>({...a,[current]:i})); }}
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", borderRadius:10, border:`2px solid ${correct?"#10B981":wrong?C.red:sel?C.green:C.border}`, background:correct?"rgba(16,185,129,0.08)":wrong?"rgba(239,68,68,0.08)":sel?`${C.green}08`:"#fff", cursor:"pointer", transition:"all .2s", textAlign:"left" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", border:`2px solid ${correct?"#10B981":wrong?C.red:sel?C.green:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:correct?"#10B981":wrong?C.red:sel?C.green:C.slate, flexShrink:0 }}>{String.fromCharCode(65+i)}</div>
                  <span style={{ fontSize:14, color:C.navy, fontWeight:sel?600:400 }}>{opt}</span>
                  {correct && <span style={{ marginLeft:"auto", color:"#10B981", fontSize:18 }}>✓</span>}
                  {wrong   && <span style={{ marginLeft:"auto", color:C.red,     fontSize:18 }}>✗</span>}
                </button>
              );
            })}
          </div>
          {revealed[current] && (
            <div style={{ marginTop:20, background:"rgba(0,105,92,0.06)", border:`1px solid ${C.green}20`, borderRadius:10, padding:"14px 18px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.green, marginBottom:4 }}>📚 Explanation</div>
              <div style={{ fontSize:13, color:C.slate, lineHeight:1.6 }}>{q.explanation}</div>
            </div>
          )}
        </Card>

        {/* Nav */}
        <div style={{ display:"flex", gap:12, justifyContent:"space-between" }}>
          <button onClick={()=>setCurrent(c=>Math.max(0,c-1))} disabled={current===0} style={{ background:C.white, border:`1px solid ${C.border}`, color:current===0?C.border:C.navy, padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:600, cursor:current===0?"not-allowed":"pointer" }}>← Prev</button>
          <div style={{ display:"flex", gap:8 }}>
            {!revealed[current] && answers[current] !== undefined && (
              <button onClick={()=>setRevealed(r=>({...r,[current]:true}))} style={{ background:`${C.green}12`, border:`1px solid ${C.green}30`, color:C.green, padding:"11px 24px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>Check Answer</button>
            )}
            {current < mockQuestions.length-1 ? (
              <button onClick={()=>setCurrent(c=>c+1)} style={{ background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Next →</button>
            ) : (
              <button onClick={()=>setDone(true)} style={{ background:`linear-gradient(135deg,${C.green},${C.mint})`, color:"#fff", border:"none", padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Submit Exam →</button>
            )}
          </div>
        </div>

        {/* Question nav dots */}
        <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:20, flexWrap:"wrap" }}>
          {mockQuestions.map((_,i)=>(
            <div key={i} onClick={()=>setCurrent(i)} style={{ width:32, height:32, borderRadius:"50%", background:i===current?`linear-gradient(135deg,${C.green},${C.mint})`:answers[i]!==undefined?`${C.green}30`:C.border, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:i===current?"#fff":C.slate, transition:"all .2s" }}>{i+1}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ───
export default function TutorialPortal() {
  const [view, setView] = useState("landing");
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#F4FAF9;}
        ::-webkit-scrollbar-thumb{background:#4DB6AC;border-radius:2px;}
      `}</style>
      <Nav view={view} setView={setView} />
      {view==="landing" && <Landing setView={setView} />}
      {view==="enroll"  && <EnrollForm setView={setView} />}
      {view==="student" && <StudentDash setView={setView} />}
      {view==="cbt"     && <CBTEngine setView={setView} />}
    </div>
  );
}
