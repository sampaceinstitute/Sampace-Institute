import { useState, useEffect } from "react";
import { BRAND as C, SITE, DIVISIONS, DIVISION_GROUPS } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;
const WA = SITE.whatsapp;

export default function Homepage({ onSelectDiv, onLogin }) {
  const [scrolled,   setScrolled]  = useState(false);
  const [navOpen,    setNavOpen]   = useState(false);
  const [divMenu,    setDivMenu]   = useState(false);
  const [search,     setSearch]    = useState("");
  const [searchRes,  setSearchRes] = useState([]);
  const [counts,     setCounts]    = useState({ s:0, p:0, d:0 });
  const [activeGrp,  setActiveGrp] = useState(null);
  const [filterGrp,  setFilterGrp] = useState("all");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    let f = 0;
    const t = setInterval(() => {
      f++; const p = Math.min(f/90,1); const e = 1-Math.pow(1-p,3);
      setCounts({ s:Math.floor(5000*e), p:Math.floor(12*e)||1, d:Math.floor(50*e)||1 });
      if(p>=1) clearInterval(t);
    }, 16);
    return () => { window.removeEventListener("scroll",onScroll); clearInterval(t); };
  }, []);

  // ── Global search ──
  useEffect(() => {
    if (!search.trim()) { setSearchRes([]); return; }
    const q = search.toLowerCase();
    const results = DIVISIONS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.short.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q)) ||
      d.programmes.some(p => p.toLowerCase().includes(q))
    );
    setSearchRes(results);
  }, [search]);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const filteredDivisions = filterGrp === "all"
    ? DIVISIONS
    : DIVISIONS.filter(d => DIVISION_GROUPS.find(g => g.id === filterGrp)?.ids.includes(d.id));

  const STATUS = {
    open:    { dot:"🟢", label:"Open",           bg:"rgba(16,185,129,.12)", c:"#10B981" },
    coming:  { dot:"🟡", label:"Coming Soon",    bg:"rgba(245,158,11,.12)",  c:"#F59E0B" },
    future:  { dot:"🔵", label:"Future",         bg:"rgba(99,102,241,.12)", c:"#818CF8" },
  };

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.dark, color:W, overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px;background:#060F1E}
        ::-webkit-scrollbar-thumb{background:#C9A84C33;border-radius:3px}
        .hov{transition:all .25s;cursor:pointer}
        .hov:hover{transform:translateY(-3px)}
        .div-card{transition:all .3s;cursor:pointer;border:1px solid rgba(255,255,255,.07)}
        .div-card:hover{transform:translateY(-6px);border-color:rgba(201,168,76,.3)!important;box-shadow:0 20px 60px rgba(0,0,0,.4)}
        .nav-link{transition:color .2s;cursor:pointer;color:rgba(255,255,255,.55);font-size:12px;font-weight:600;letter-spacing:.3px}
        .nav-link:hover{color:#C9A84C}
        .btn-gold{background:linear-gradient(135deg,#C9A84C,#FFD54F);color:#0B1F3A;border:none;font-weight:800;cursor:pointer;transition:all .25s}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,.35)}
        .btn-ghost{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#fff;cursor:pointer;transition:all .25s;font-weight:600}
        .btn-ghost:hover{background:rgba(255,255,255,.1)}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse{0%,100%{opacity:.8}50%{opacity:.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        background:scrolled?"rgba(6,15,30,.97)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?"1px solid rgba(201,168,76,.08)":"none",
        transition:"all .3s",padding:"0 clamp(16px,4vw,48px)",
        height:64,display:"flex",alignItems:"center",justifyContent:"space-between"
      }}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>scrollTo("hero-sec")}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:N}}>SE</div>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:1.5}}>SAMPACE EDUCATIONAL LTD</div>
            <div style={{fontSize:7,color:"rgba(255,255,255,.3)",letterSpacing:1.5}}>CAC REGISTERED · NIGERIA</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          <span className="nav-link" onClick={()=>scrollTo("about-sec")}>About</span>

          {/* Divisions dropdown */}
          <div style={{position:"relative"}} onMouseEnter={()=>setDivMenu(true)} onMouseLeave={()=>setDivMenu(false)}>
            <span className="nav-link" style={{display:"flex",alignItems:"center",gap:4}}>
              Divisions <span style={{fontSize:9}}>▼</span>
            </span>
            {divMenu && (
              <div style={{
                position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",
                width:600,background:"rgba(6,15,30,.98)",backdropFilter:"blur(20px)",
                border:"1px solid rgba(201,168,76,.15)",borderRadius:16,
                padding:"20px",marginTop:8,
                display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,zIndex:999
              }}>
                {DIVISIONS.map(d=>(
                  <div key={d.id} onClick={()=>{setDivMenu(false);onSelectDiv(d);}}
                    style={{display:"flex",gap:10,alignItems:"center",padding:"10px 12px",borderRadius:9,cursor:"pointer",transition:"all .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.08)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{fontSize:18,flexShrink:0}}>{d.icon}</span>
                    <div>
                      <div style={{fontSize:11,fontWeight:700,color:W}}>{d.name}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>{d.short}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="nav-link" onClick={()=>scrollTo("programmes-sec")}>Programmes</span>
          <span className="nav-link" onClick={()=>scrollTo("partners-sec")}>Partners</span>
          <span className="nav-link" onClick={()=>scrollTo("contact-sec")}>Contact</span>

          {/* Search */}
          <div style={{position:"relative"}}>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search programmes..."
              style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"7px 32px 7px 12px",fontSize:11,color:W,outline:"none",width:160}}
            />
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:13,opacity:.4}}>🔍</span>
            {searchRes.length > 0 && (
              <div style={{position:"absolute",top:"100%",right:0,width:280,background:"rgba(6,15,30,.98)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"8px",marginTop:6,zIndex:999}}>
                {searchRes.map(d=>(
                  <div key={d.id} onClick={()=>{setSearch("");onSelectDiv(d);}}
                    style={{padding:"9px 12px",borderRadius:7,cursor:"pointer",fontSize:12,display:"flex",gap:8,alignItems:"center"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.08)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span>{d.icon}</span>
                    <div>
                      <div style={{color:W,fontWeight:600}}>{d.name}</div>
                      <div style={{color:"rgba(255,255,255,.4)",fontSize:10}}>{d.short}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn-gold" onClick={()=>scrollTo("divisions-sec")} style={{padding:"8px 18px",borderRadius:8,fontSize:11}}>Apply Now</button>
          <button className="btn-ghost" onClick={()=>onLogin("student")} style={{padding:"8px 14px",borderRadius:8,fontSize:11}}>Login →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero-sec" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"120px 24px 80px",position:"relative",overflow:"hidden"}}>
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
            12 divisions. Online and onsite. From secondary school to university entry, from professional certification to research — all under one roof.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:52}}>
            <button className="btn-gold hov" onClick={()=>scrollTo("pathways-sec")} style={{padding:"14px 30px",borderRadius:10,fontSize:13}}>Find Your Programme →</button>
            <button className="btn-ghost hov" onClick={()=>scrollTo("divisions-sec")} style={{padding:"14px 26px",borderRadius:10,fontSize:13}}>Explore Divisions</button>
            <a href={WA} style={{background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",color:"#4AE54A",padding:"14px 22px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>💬 Join Community</a>
          </div>
          <div style={{display:"flex",gap:40,justifyContent:"center",flexWrap:"wrap"}}>
            {[[counts.s.toLocaleString()+"+","Students Enrolling"],[counts.p+"","Divisions"],[counts.d+"+","Programmes"]].map(([v,l],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3vw,36px)",fontWeight:700,color:G}}>{v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:1.5,textTransform:"uppercase",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",animation:"floatY 2.5s ease-in-out infinite",opacity:.3,fontSize:18}}>↓</div>
      </section>

      {/* ── ABOUT ── */}
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
              {icon:"🎓",t:"Academic Excellence",d:"NERDC, WAEC, NECO and international curriculum standards"},
              {icon:"💻",t:"Technology-Driven",d:"AI-powered tools, virtual labs, CBT engines and digital platforms"},
              {icon:"🌍",t:"Online & Onsite",d:"Every programme available online and at physical learning centres"},
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

      {/* ── ONLINE + ONSITE ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(21,101,192,.1),rgba(201,168,76,.06))",border:"1px solid rgba(201,168,76,.12)",borderRadius:22,padding:"clamp(28px,4vw,48px)"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>What We Do</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700,marginBottom:10}}>Every Way You Learn. We Are There.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:32,alignItems:"center",textAlign:"center"}}>
            <div style={{background:"rgba(21,101,192,.08)",border:"1px solid rgba(21,101,192,.2)",borderRadius:16,padding:"28px"}}>
              <div style={{fontSize:36,marginBottom:12}}>🌐</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,marginBottom:12}}>Online Campus</div>
              {["Live video classes","Recorded lessons 24/7","Virtual science labs","CBT exam practice","Digital certificates","AI learning assistant"].map(f=>(
                <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,justifyContent:"center",marginBottom:4}}><span style={{color:"#10B981",fontSize:9}}>✓</span>{f}</div>
              ))}
            </div>
            <div style={{fontSize:28,color:G,fontWeight:900}}>+</div>
            <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.15)",borderRadius:16,padding:"28px"}}>
              <div style={{fontSize:36,marginBottom:12}}>🏫</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,marginBottom:12}}>Physical Centres</div>
              {["Physical classrooms","Onsite tutoring","Study halls","Exam centres","Face-to-face mentoring","Community events"].map(f=>(
                <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,justifyContent:"center",marginBottom:4}}><span style={{color:G,fontSize:9}}>✓</span>{f}</div>
              ))}
              <div style={{marginTop:12,fontSize:10,color:"rgba(255,255,255,.25)",fontStyle:"italic"}}>Physical centres launching in select cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARNING PATHWAYS ── */}
      <section id="pathways-sec" style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Learning Pathways</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700,marginBottom:10}}>Where Are You On Your Journey?</h2>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:440,margin:"0 auto"}}>Choose your goal and we guide you to the right SAMPACE division.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {[
            {icon:"👶",label:"Primary Support",desc:"After-school classes for Basic 1–6",div:"extramural",color:"#00897B"},
            {icon:"🏫",label:"Secondary School",desc:"Full JSS1–SS3 online education",div:"college",color:"#1565C0"},
            {icon:"📝",label:"Exam Preparation",desc:"WAEC, NECO, JAMB and BECE coaching",div:"extramural",color:"#BF360C"},
            {icon:"🏛️",label:"University Entry",desc:"IJMB, JUPEB and direct 200-level",div:"preuni",color:"#E65100"},
            {icon:"💻",label:"Digital Skills",desc:"Coding, AI, Cybersecurity, Design",div:"digital",color:"#7B1FA2"},
            {icon:"🌍",label:"International Exams",desc:"IELTS, TOEFL, SAT, Cambridge",div:"digital",color:"#006064"},
            {icon:"📊",label:"Professional Certs",desc:"ACCA, ICAN, PMP, CIPM and more",div:"digital",color:"#33691E"},
            {icon:"📖",label:"Adult Learning",desc:"Literacy, vocational and digital basics",div:"extramural",color:"#F57F17"},
          ].map((p,i)=>{
            const div = DIVISIONS.find(d=>d.id===p.div);
            return (
              <div key={i} className="div-card" onClick={()=>div&&onSelectDiv(div)} style={{borderRadius:14,padding:"18px",borderLeft:`3px solid ${p.color}`,background:"rgba(255,255,255,.025)"}}>
                <div style={{fontSize:26,marginBottom:10}}>{p.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:5}}>{p.label}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.38)",lineHeight:1.6,marginBottom:10}}>{p.desc}</div>
                <div style={{fontSize:10,color:p.color,fontWeight:700}}>Explore →</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── DIVISIONS ── */}
      <section id="divisions-sec" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Our Divisions</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,40px)",fontWeight:700,marginBottom:10}}>12 Divisions. One Vision.</h2>

          {/* Filter tabs */}
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:18}}>
            {[{id:"all",label:"All Divisions"},...DIVISION_GROUPS].map(g=>(
              <button key={g.id} onClick={()=>setFilterGrp(g.id)}
                style={{background:filterGrp===g.id?`linear-gradient(135deg,${g.color||G},${g.color||G}88)`:"rgba(255,255,255,.05)",border:filterGrp===g.id?"none":"1px solid rgba(255,255,255,.1)",color:filterGrp===g.id?W:"rgba(255,255,255,.5)",padding:"7px 16px",borderRadius:100,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Division groups */}
        {DIVISION_GROUPS.filter(g => filterGrp==="all" || filterGrp===g.id).map((group,gi)=>(
          <div key={gi} style={{marginBottom:48}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{width:36,height:36,background:`${group.color}18`,border:`1px solid ${group.color}33`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{gi===0?"🎓":gi===1?"💻":gi===2?"🏢":"🌟"}</div>
              <div>
                <div style={{fontWeight:800,fontSize:14,color:W}}>{group.label}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:1}}>{DIVISIONS.filter(d=>group.ids.includes(d.id)).length} divisions</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(${DIVISIONS.filter(d=>group.ids.includes(d.id)).length===2?"2":"3"},1fr)`,gap:14}}>
              {DIVISIONS.filter(d=>group.ids.includes(d.id)).map((d,di)=>{
                const st = STATUS[d.status] || STATUS.open;
                return (
                  <div key={di} className="div-card" style={{borderRadius:16,padding:"22px",borderTop:`3px solid ${d.color}`,display:"flex",flexDirection:"column",background:"rgba(255,255,255,.025)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div style={{width:40,height:40,background:`${d.color}15`,border:`1px solid ${d.color}25`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{d.icon}</div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <span style={{fontSize:8,color:"rgba(255,255,255,.2)",fontFamily:"monospace",letterSpacing:1}}>DIV {d.num}</span>
                        <span style={{background:st.bg,color:st.c,padding:"2px 9px",borderRadius:100,fontSize:9,fontWeight:700}}>{st.dot} {st.label}</span>
                      </div>
                    </div>
                    <div style={{fontWeight:800,fontSize:13,color:W,marginBottom:3}}>{d.name}</div>
                    <div style={{fontSize:11,color:d.color,fontWeight:600,marginBottom:8}}>{d.short}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.65,marginBottom:12,flex:1}}>{d.desc}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:14}}>
                      {d.tags.map(t=><span key={t} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:100,padding:"3px 10px",fontSize:10,color:"rgba(255,255,255,.45)",fontWeight:600}}>{t}</span>)}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>onSelectDiv(d)} style={{flex:1,background:`linear-gradient(135deg,${d.color},${d.g2})`,border:"none",color:W,padding:"9px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                        {d.btnLabel} →
                      </button>
                      <button onClick={()=>onLogin("student")} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.35)",padding:"9px 12px",borderRadius:8,fontSize:11,cursor:"pointer"}}>
                        Login
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ── PROGRAMMES QUICK LIST ── */}
      <section id="programmes-sec" style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Popular Programmes</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>What Would You Like to Study?</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {[
            ["Secondary School","JSS1–SS3 online school","college"],
            ["WAEC Coaching","Expert exam preparation","extramural"],
            ["JAMB Prep","CBT practice included","extramural"],
            ["Web Development","Full-stack coding","digital"],
            ["IELTS Preparation","Score 7.0+ guaranteed","digital"],
            ["IJMB/JUPEB","Direct 200-level entry","preuni"],
            ["Adult Learning","Literacy & digital skills","extramural"],
            ["Corporate Training","CPD for professionals","professional"],
            ["Data Science","AI & analytics","digital"],
            ["Scholarship Search","Find funding","scholarships"],
          ].map(([title,desc,divId],i)=>{
            const div = DIVISIONS.find(d=>d.id===divId);
            return (
              <div key={i} onClick={()=>div&&onSelectDiv(div)}
                style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"16px",cursor:"pointer",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.07)";e.currentTarget.style.borderColor="rgba(201,168,76,.2)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.03)";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}>
                <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:4}}>{title}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)",lineHeight:1.5}}>{desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHY SAMPACE ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Why Choose SAMPACE</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>Built for Nigerian Students.<br/>Designed for the World.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[
            {icon:"✅",t:"CAC Registered",d:"Legally incorporated under CAMA 2020. Your investment is with a recognised Nigerian company."},
            {icon:"🌐",t:"Online & Onsite",d:"Every programme runs both online and at our physical centres. Choose what works for you."},
            {icon:"💳",t:"Affordable Fees",d:"Quality education at prices that work for Nigerian families. Payment plans available."},
            {icon:"🤖",t:"Technology-Driven",d:"AI learning tools, virtual labs, CBT engines, live classes and digital certificates."},
            {icon:"📜",t:"Recognised Results",d:"WAEC, NECO, JAMB — students still sit the official exams. We help them ace it."},
            {icon:"🎯",t:"Results-Focused",d:"We measure success by student outcomes — exam passes, admissions and career placements."},
          ].map((w,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"22px"}}>
              <div style={{fontSize:28,marginBottom:10}}>{w.icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:7}}>{w.t}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.7}}>{w.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Success Stories</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>What Our Students Say</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {name:"Adaeze O.",role:"SS3 · SAMPACE College",text:"The live classes feel just like a real school. My grades have never been better since joining SAMPACE.",avatar:"A",color:"#1565C0"},
            {name:"Emeka T.",role:"JAMB Candidate · Extramural Hub",text:"I scored 287 in JAMB after 3 months on SAMPACE. The CBT practice sessions are exactly like the real exam.",avatar:"E",color:"#00897B"},
            {name:"Mrs. Fatima K.",role:"Parent · SAMPACE College",text:"The parent dashboard keeps me updated daily on my daughter's attendance and scores. I can message teachers directly.",avatar:"F",color:"#BF360C"},
            {name:"Chukwudi A.",role:"Web Dev · Digital Campus",text:"I now freelance and earn more than my previous salary after the SAMPACE Full-Stack programme.",avatar:"C",color:"#7B1FA2"},
            {name:"Blessing N.",role:"IELTS · Digital Campus",text:"Scored 7.5 overall in IELTS after the SAMPACE intensive prep. My Canadian visa was approved.",avatar:"B",color:"#E65100"},
            {name:"Taiwo R.",role:"JUPEB · Pre-University",text:"I gained direct 200-level admission to UNILAG through the SAMPACE JUPEB programme.",avatar:"T",color:"#006064"},
          ].map((t,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"22px",display:"flex",flexDirection:"column"}}>
              <div style={{fontSize:20,color:G,marginBottom:10,letterSpacing:2}}>"</div>
              <p style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.75,flex:1,marginBottom:16}}>{t.text}</p>
              <div style={{display:"flex",alignItems:"center",gap:10,borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:14}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${t.color},${t.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:W,flexShrink:0}}>{t.avatar}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:W}}>{t.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(201,168,76,.08),rgba(11,31,58,.95))",border:"1px solid rgba(201,168,76,.14)",borderRadius:22,padding:"clamp(28px,4vw,48px)",display:"grid",gridTemplateColumns:"auto 1fr",gap:36,alignItems:"center"}}>
          <div style={{width:72,height:72,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:900,color:N,flexShrink:0}}>A</div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>A Message from the Founder</div>
            <blockquote style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(15px,2vw,21px)",fontStyle:"italic",color:W,lineHeight:1.65,marginBottom:14}}>"SAMPACE was built on a simple belief — that every Nigerian child deserves access to world-class education. We are not just building a school. We are building an institution that will outlast us all."</blockquote>
            <div style={{fontSize:13,fontWeight:700,color:G}}>Ayeni Samuel Anuoluwapo</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2}}>Founder & Director, SAMPACE EDUCATIONAL LTD</div>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIPS ── */}
      <section id="partners-sec" style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
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

      {/* ── ADMISSIONS STEPS ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Admissions</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700,marginBottom:10}}>Start in 4 Simple Steps</h2>
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
          <button className="btn-gold hov" onClick={()=>scrollTo("divisions-sec")} style={{padding:"14px 36px",borderRadius:10,fontSize:13}}>Apply to Any Division →</button>
        </div>
      </section>

      {/* ── CONTACT ── */}
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
            <a href={WA} style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#25D366,#128C7E)",color:W,padding:"11px 22px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none"}}>💬 Join WhatsApp Community</a>
          </div>
          <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"26px"}}>
            <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:16}}>Send an Enquiry</div>
            {["Full Name","Email","Phone","Programme Interest"].map((label,i)=>(
              <div key={label} style={{marginBottom:11}}>
                <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{label}</label>
                <input id={"enq-"+i} type={i===1?"email":"text"} placeholder={["Your full name","your@email.com","+234...","e.g. WAEC Coaching, Coding, IJMB"][i]} style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",fontFamily:"inherit"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message</label>
              <textarea id="enq-msg" rows={3} placeholder="Tell us what you need..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
            </div>
            <button className="btn-gold" onClick={async()=>{
              const s = window.__supabase;
              const name = document.getElementById("enq-0")?.value;
              const email = document.getElementById("enq-1")?.value;
              const phone = document.getElementById("enq-2")?.value;
              const prog  = document.getElementById("enq-3")?.value;
              const msg   = document.getElementById("enq-msg")?.value;
              if(!name||!email){alert("Please enter your name and email.");return;}
              if(s){
                await s.from("applications").insert({
                  reference:"ENQ-HOME-"+Date.now(), school_id:"enquiry",
                  applicant_name:name, email, phone:phone||"",
                  program:prog||"General Enquiry", admin_notes:msg||"",
                  status:"pending", app_type:"inquiry"
                }).then(()=>{}).catch(()=>{});
              }
              alert("✅ Enquiry sent! We will contact you within 24 hours.");
            }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13}}>Send Enquiry →</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"40px clamp(20px,6vw,80px) 28px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:32}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
              <div style={{width:30,height:30,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:N}}>SE</div>
              <div style={{fontSize:10,fontWeight:900,color:G,letterSpacing:1.5}}>SAMPACE EDUCATIONAL LTD</div>
            </div>
            <p style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.8,maxWidth:240,marginBottom:10}}>Nigeria's education ecosystem. Online and onsite. Building Nigeria's education future.</p>
            <div style={{fontSize:9,color:"rgba(255,255,255,.18)"}}>CAC Registered · CAMA 2020 · Nigeria · Est. 2026</div>
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Divisions</div>
            {["College","Extramural Hub","Digital Campus","Pre-University","CBT Platform","Careers"].map(d=><div key={d} style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7,cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=G} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.3)"}>{d}</div>)}
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Programmes</div>
            {["Secondary School","WAEC/NECO Prep","JAMB Coaching","Digital Skills","IJMB/JUPEB","Adult Learning"].map(p=><div key={p} style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7}}>{p}</div>)}
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Company</div>
            {["About SAMPACE","Our Founder","Admissions","Partnerships","Careers at SAMPACE","Contact Us"].map(c=><div key={c} style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7,cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=G} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.3)"}>{c}</div>)}
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
