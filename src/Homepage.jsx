import { useState, useEffect } from "react";
import { BRAND as C, SITE, DIVISIONS, DIVISION_GROUPS } from "../constants";

const W = C.white;
const G = C.gold;
const WA = SITE.whatsapp;

export default function Homepage({ onSelectDiv, onLogin }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [divMenu,   setDivMenu]   = useState(false);
  const [search,    setSearch]    = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [filterGrp, setFilterGrp] = useState("all");
  const [counts,    setCounts]    = useState({ s:0, d:0, p:0 });
  const [navOpen,   setNavOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    let f = 0;
    const t = setInterval(() => {
      f++; const p = Math.min(f/80,1); const e = 1-Math.pow(1-p,3);
      setCounts({ s:Math.floor(500*e), d:Math.floor(6*e)||1, p:Math.floor(50*e)||1 });
      if (p >= 1) clearInterval(t);
    }, 16);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(t); };
  }, []);

  useEffect(() => {
    if (!search.trim()) { setSearchRes([]); return; }
    const q = search.toLowerCase();
    setSearchRes(DIVISIONS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.short.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q)) ||
      d.programmes.some(p => p.toLowerCase().includes(q))
    ));
  }, [search]);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const filtered = filterGrp === "all"
    ? DIVISIONS
    : DIVISIONS.filter(d => DIVISION_GROUPS.find(g => g.id === filterGrp)?.ids.includes(d.id));

  return (
    <div style={{fontFamily:"'Syne',sans-serif",background:C.dark,color:W,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px;background:#060F1E}
        ::-webkit-scrollbar-thumb{background:#C9A84C33;border-radius:3px}
        .hov{transition:all .25s;cursor:pointer}
        .hov:hover{transform:translateY(-3px)}
        .div-card{transition:all .3s;cursor:pointer;border:1px solid rgba(255,255,255,.07)}
        .div-card:hover{transform:translateY(-6px);border-color:rgba(201,168,76,.35)!important;box-shadow:0 24px 60px rgba(0,0,0,.45)}
        .nav-link{color:rgba(255,255,255,.55);font-size:12px;font-weight:600;cursor:pointer;transition:color .2s;letter-spacing:.3px}
        .nav-link:hover{color:#C9A84C}
        .btn-gold{background:linear-gradient(135deg,#C9A84C,#FFD54F);color:#0B1F3A;border:none;font-weight:800;cursor:pointer;transition:all .25s;font-family:inherit}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,.4)}
        .btn-ghost{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#fff;cursor:pointer;transition:all .25s;font-weight:600;font-family:inherit}
        .btn-ghost:hover{background:rgba(255,255,255,.11)}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse{0%,100%{opacity:.7}50%{opacity:.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(6,15,30,.97)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(201,168,76,.1)":"none",transition:"all .3s",padding:"0 clamp(16px,4vw,48px)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>

        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>scrollTo("hero")}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.navy,flexShrink:0}}>SE</div>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:G,letterSpacing:1.5,lineHeight:1.1}}>SAMPACE EDUCATIONAL LTD</div>
            <div style={{fontSize:7,color:"rgba(255,255,255,.3)",letterSpacing:1.5}}>LEARN · EMPOWER · EXCEL</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          <span className="nav-link" onClick={()=>scrollTo("about")}>About</span>

          {/* Divisions mega menu */}
          <div style={{position:"relative"}} onMouseEnter={()=>setDivMenu(true)} onMouseLeave={()=>setDivMenu(false)}>
            <span className="nav-link" style={{display:"flex",alignItems:"center",gap:4}}>Divisions <span style={{fontSize:8}}>▼</span></span>
            {divMenu && (
              <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",width:560,background:"rgba(6,15,30,.98)",backdropFilter:"blur(20px)",border:"1px solid rgba(201,168,76,.15)",borderRadius:16,padding:20,marginTop:8,zIndex:999}}>
                {DIVISION_GROUPS.map((group,gi)=>(
                  <div key={gi} style={{marginBottom:gi===0?14:0}}>
                    <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{group.icon} {group.label}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                      {DIVISIONS.filter(d=>group.ids.includes(d.id)).map(d=>(
                        <div key={d.id} onClick={()=>{setDivMenu(false);onSelectDiv(d);}}
                          style={{display:"flex",gap:8,alignItems:"center",padding:"9px 11px",borderRadius:9,cursor:"pointer",transition:"all .2s",border:"1px solid transparent"}}
                          onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.08)";e.currentTarget.style.borderColor="rgba(201,168,76,.15)";}}
                          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";}}>
                          <span style={{fontSize:16,flexShrink:0}}>{d.icon}</span>
                          <div>
                            <div style={{fontSize:11,fontWeight:700,color:W,lineHeight:1.2}}>{d.name.replace("SAMPACE ","")}</div>
                            <div style={{fontSize:9,color:"rgba(255,255,255,.38)",lineHeight:1.3,marginTop:1}}>{d.tags[0]} · {d.tags[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="nav-link" onClick={()=>scrollTo("divisions")}>Services</span>
          <span className="nav-link" onClick={()=>scrollTo("contact")}>Contact</span>

          {/* Search */}
          <div style={{position:"relative"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search services..."
              style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"7px 32px 7px 12px",fontSize:11,color:W,outline:"none",width:150,fontFamily:"inherit"}}/>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:12,opacity:.4}}>🔍</span>
            {searchRes.length > 0 && (
              <div style={{position:"absolute",top:"100%",right:0,width:280,background:"rgba(6,15,30,.98)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:8,marginTop:6,zIndex:999}}>
                {searchRes.map(d=>(
                  <div key={d.id} onClick={()=>{setSearch("");onSelectDiv(d);}}
                    style={{padding:"9px 12px",borderRadius:7,cursor:"pointer",display:"flex",gap:8,alignItems:"center",transition:"background .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.08)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span>{d.icon}</span>
                    <div>
                      <div style={{color:W,fontWeight:600,fontSize:12}}>{d.name}</div>
                      <div style={{color:"rgba(255,255,255,.4)",fontSize:10}}>{d.short}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn-gold" onClick={()=>scrollTo("divisions")} style={{padding:"8px 18px",borderRadius:8,fontSize:11}}>Get Started</button>
          <button className="btn-ghost" onClick={()=>onLogin("student")} style={{padding:"8px 14px",borderRadius:8,fontSize:11}}>Login →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"120px 24px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"15%",left:"5%",width:500,height:500,background:"radial-gradient(circle,rgba(201,168,76,.09),transparent 70%)",filter:"blur(60px)",animation:"pulse 6s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"10%",right:"5%",width:400,height:400,background:"radial-gradient(circle,rgba(21,101,192,.1),transparent 70%)",filter:"blur(60px)",animation:"pulse 7s ease-in-out infinite 2s",pointerEvents:"none"}}/>

        <div style={{position:"relative",zIndex:1,maxWidth:900}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.2)",borderRadius:100,padding:"6px 20px",marginBottom:28,fontSize:10,fontWeight:700,color:G,letterSpacing:2}}>
            🇳🇬 &nbsp; SAMPACE EDUCATIONAL LTD · CAC REGISTERED · NIGERIA
          </div>

          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(38px,6vw,78px)",fontWeight:700,lineHeight:1.1,marginBottom:16,letterSpacing:"-1px"}}>
            Learn. Empower. Excel.<br/>
            <span style={{background:"linear-gradient(135deg,#C9A84C,#FFD54F,#C9A84C)",backgroundSize:"200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 4s linear infinite"}}>Education Redefined.</span>
          </h1>

          <p style={{fontSize:"clamp(13px,1.7vw,17px)",color:"rgba(255,255,255,.5)",lineHeight:1.9,maxWidth:580,margin:"0 auto 14px"}}>
            Six focused divisions. Digital skills. Academic preparation. Professional training. Consultancy. Research services. School technology. All from one trusted Nigerian institution.
          </p>

          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:52}}>
            <button className="btn-gold hov" onClick={()=>scrollTo("divisions")} style={{padding:"13px 30px",borderRadius:10,fontSize:13}}>Explore Our Divisions →</button>
            <button className="btn-ghost hov" onClick={()=>scrollTo("contact")} style={{padding:"13px 26px",borderRadius:10,fontSize:13}}>Contact Us</button>
            <a href={WA} style={{background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",color:"#4AE54A",padding:"13px 22px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>💬 WhatsApp</a>
          </div>

          <div style={{display:"flex",gap:48,justifyContent:"center",flexWrap:"wrap"}}>
            {[[counts.s+"+","Active Learners"],[counts.d+"","Divisions"],[counts.p+"+","Programmes & Services"]].map(([v,l],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:700,color:G}}>{v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:1.5,textTransform:"uppercase",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",animation:"floatY 2.5s ease-in-out infinite",opacity:.3,fontSize:18,pointerEvents:"none"}}>↓</div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:"80px clamp(20px,6vw,80px)",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
          <div>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Who We Are</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,42px)",fontWeight:700,lineHeight:1.2,marginBottom:18}}>
              Focused. Practical.<br/><em style={{color:G}}>Built for Nigeria.</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.9,fontSize:14,marginBottom:14}}>SAMPACE EDUCATIONAL LTD is a Nigerian education institution incorporated under the Companies and Allied Matters Act 2020. We operate six focused divisions delivering digital skills, academic preparation, professional development, consultancy, research services and school technology.</p>
            <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.9,fontSize:14,marginBottom:24}}>We believe in building deliberately — starting with what we can deliver excellently today, and expanding strategically. Our focus is quality over quantity.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {["CAC Registered","CAMA 2020","Nigeria-First","Quality-Focused","Online & Onsite","Results-Driven"].map(t=>(
                <span key={t} style={{background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.18)",color:G,padding:"5px 13px",borderRadius:100,fontSize:10,fontWeight:700}}>✓ {t}</span>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {icon:"🎓",t:"Academic Excellence",d:"Aligned with Nigerian curriculum and international examination standards."},
              {icon:"💻",t:"Digital & Practical",d:"Hands-on digital skills training that translates directly into work and income."},
              {icon:"🌐",t:"Online & Onsite",d:"All programmes available online and at physical locations across Nigeria."},
              {icon:"🤝",t:"Institution-Focused",d:"Dedicated consulting and technology services for schools and educational bodies."},
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

      {/* ── TWO TRACKS ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(21,101,192,.09),rgba(201,168,76,.05))",border:"1px solid rgba(201,168,76,.13)",borderRadius:22,padding:"clamp(28px,4vw,48px)"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Two Clear Tracks</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:700}}>For Learners. For Institutions.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:28,alignItems:"center"}}>
            <div style={{background:"rgba(21,101,192,.09)",border:"1px solid rgba(21,101,192,.22)",borderRadius:16,padding:28}}>
              <div style={{fontSize:32,marginBottom:12}}>🎓</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,marginBottom:12}}>For Learners</div>
              {["Digital skills & coding","WAEC, NECO & JAMB prep","CBT practice & mock exams","Teacher & professional training","Online & onsite classes","Certificate on completion"].map(f=>(
                <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,marginBottom:5}}><span style={{color:"#10B981",fontSize:9}}>✓</span>{f}</div>
              ))}
              <button className="btn-gold" onClick={()=>scrollTo("divisions")} style={{marginTop:16,width:"100%",padding:"10px",borderRadius:9,fontSize:11}}>Enroll in a Programme →</button>
            </div>
            <div style={{fontSize:26,color:G,fontWeight:900}}>+</div>
            <div style={{background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.18)",borderRadius:16,padding:28}}>
              <div style={{fontSize:32,marginBottom:12}}>🏫</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,marginBottom:12}}>For Institutions</div>
              {["School development consultancy","Research & data analysis support","Computer centre & print services","School website development","LMS implementation","CBT & school management systems"].map(f=>(
                <div key={f} style={{fontSize:11,color:"rgba(255,255,255,.5)",display:"flex",alignItems:"center",gap:6,marginBottom:5}}><span style={{color:G,fontSize:9}}>✓</span>{f}</div>
              ))}
              <button className="btn-ghost" onClick={()=>scrollTo("divisions")} style={{marginTop:16,width:"100%",padding:"10px",borderRadius:9,fontSize:11}}>Enquire About Our Services →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVISIONS ── */}
      <section id="divisions" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Our Divisions</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,40px)",fontWeight:700,marginBottom:8}}>Six Divisions. One Institution.</h2>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:13,maxWidth:500,margin:"0 auto 20px"}}>Three learning divisions for individuals. Three service divisions for institutions.</p>

          {/* Filter tabs */}
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {[{id:"all",label:"All Divisions",color:G},...DIVISION_GROUPS].map(g=>(
              <button key={g.id} onClick={()=>setFilterGrp(g.id)}
                style={{background:filterGrp===g.id?`linear-gradient(135deg,${g.color},${g.color}aa)`:"rgba(255,255,255,.05)",border:filterGrp===g.id?"none":"1px solid rgba(255,255,255,.1)",color:filterGrp===g.id?W:"rgba(255,255,255,.5)",padding:"7px 18px",borderRadius:100,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all .2s",fontFamily:"inherit"}}>
                {g.icon||""} {g.label||"All Divisions"}
              </button>
            ))}
          </div>
        </div>

        {/* Division groups */}
        {DIVISION_GROUPS.filter(g => filterGrp==="all" || filterGrp===g.id).map((group,gi)=>(
          <div key={gi} style={{marginBottom:52}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{width:38,height:38,background:`${group.color}18`,border:`1px solid ${group.color}33`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{group.icon}</div>
              <div>
                <div style={{fontWeight:800,fontSize:14,color:W}}>{group.label}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.38)",marginTop:1}}>{group.desc}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              {DIVISIONS.filter(d=>group.ids.includes(d.id)).map((d,di)=>(
                <div key={di} className="div-card" style={{borderRadius:18,padding:"24px",borderTop:`3px solid ${d.color}`,background:"rgba(255,255,255,.025)",display:"flex",flexDirection:"column"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                    <div style={{width:42,height:42,background:`${d.color}15`,border:`1px solid ${d.color}28`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>{d.icon}</div>
                    <span style={{fontSize:8,color:"rgba(255,255,255,.2)",fontFamily:"monospace",letterSpacing:1}}>DIV {d.num}</span>
                  </div>
                  <div style={{fontWeight:800,fontSize:13,color:W,marginBottom:3}}>{d.name}</div>
                  <div style={{fontSize:11,color:d.color,fontWeight:600,marginBottom:9}}>{d.short}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.42)",lineHeight:1.7,marginBottom:13,flex:1}}>{d.desc}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:15}}>
                    {d.tags.slice(0,4).map(t=>(
                      <span key={t} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:100,padding:"3px 10px",fontSize:10,color:"rgba(255,255,255,.45)",fontWeight:600}}>{t}</span>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>onSelectDiv(d)} style={{flex:1,background:`linear-gradient(135deg,${d.color},${d.g2})`,border:"none",color:W,padding:"10px",borderRadius:9,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                      {d.btnLabel} →
                    </button>
                    <button onClick={()=>onLogin("student")} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.4)",padding:"10px 12px",borderRadius:9,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                      Login
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── WHY SAMPACE ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Why Choose SAMPACE</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>Built for Nigeria.<br/>Delivering Real Results.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[
            {icon:"✅",t:"CAC Registered Institution",d:"Legally incorporated under CAMA 2020. Your investment is with a recognised Nigerian company."},
            {icon:"🎯",t:"Focused & Practical",d:"Six divisions we can actually deliver. Quality over quantity. Real skills and real results."},
            {icon:"🌐",t:"Online & Onsite",d:"All programmes available both online and at our physical locations. Choose what works for you."},
            {icon:"🧑‍💻",t:"Technology-Driven",d:"Digital skills, LMS, CBT systems, school websites and management technology built in."},
            {icon:"📊",t:"Research-Backed",d:"Data analysis, research support and academic services grounded in methodology and best practice."},
            {icon:"🏫",t:"Serving Institutions",d:"Dedicated consulting and EdTech divisions for schools, organisations and institutions."},
          ].map((w,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,padding:"22px"}}>
              <div style={{fontSize:28,marginBottom:10}}>{w.icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:7}}>{w.t}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.42)",lineHeight:1.75}}>{w.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>How to Get Started</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3.5vw,38px)",fontWeight:700}}>Simple Process. Fast Response.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
          {[
            ["1","Choose a Division","Select the learning or service division that matches your need."],
            ["2","Apply or Enquire","Fill a short form online in under 3 minutes. Or WhatsApp us directly."],
            ["3","We Contact You","Our team gets back to you within 24 hours with next steps."],
            ["4","Begin Learning","Pay and access your course, portal or service immediately."],
          ].map(([n,t,d])=>(
            <div key={n} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"20px",textAlign:"center"}}>
              <div style={{width:34,height:34,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.navy,margin:"0 auto 12px"}}>{n}</div>
              <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:5}}>{t}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",lineHeight:1.65}}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <button className="btn-gold hov" onClick={()=>scrollTo("divisions")} style={{padding:"13px 36px",borderRadius:10,fontSize:13}}>Get Started Now →</button>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section style={{padding:"0 clamp(20px,6vw,80px) 72px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(201,168,76,.08),rgba(11,31,58,.95))",border:"1px solid rgba(201,168,76,.14)",borderRadius:22,padding:"clamp(28px,4vw,48px)",display:"grid",gridTemplateColumns:"auto 1fr",gap:32,alignItems:"center"}}>
          <div style={{width:68,height:68,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:C.navy,flexShrink:0}}>A</div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>From the Founder</div>
            <blockquote style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(14px,2vw,20px)",fontStyle:"italic",color:W,lineHeight:1.7,marginBottom:14}}>"We are not trying to be everything to everyone. We are building something excellent, deliberately, for the Nigerian educational landscape. Six divisions. Real services. Real results."</blockquote>
            <div style={{fontSize:13,fontWeight:700,color:G}}>Ayeni Samuel Anuoluwapo</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2}}>Founder & Director, SAMPACE EDUCATIONAL LTD</div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"0 clamp(20px,6vw,80px) 80px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
          <div>
            <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Contact Us</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:700,marginBottom:14}}>Let's Talk</h2>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:13,lineHeight:1.8,marginBottom:24}}>Questions about our divisions, programmes, consulting services or partnerships? Contact us and we respond within 24 hours.</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
              {[["📧","Email",SITE.email],["🌐","Website","sampaceedu.com.ng"],["💬","WhatsApp","Click to chat with us"]].map(([icon,label,val])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:34,height:34,background:"rgba(201,168,76,.08)",border:"1px solid rgba(201,168,76,.18)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{icon}</div>
                  <div><div style={{fontSize:9,color:"rgba(255,255,255,.25)",letterSpacing:1,textTransform:"uppercase"}}>{label}</div><div style={{fontSize:12,color:W,fontWeight:600}}>{val}</div></div>
                </div>
              ))}
            </div>
            <a href={WA} style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#25D366,#128C7E)",color:W,padding:"11px 22px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none"}}>💬 WhatsApp Us Now</a>
          </div>

          <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"26px"}}>
            <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:16}}>Send a Quick Enquiry</div>
            {[["Full Name","text","Your full name","enq-0"],["Email","email","your@email.com","enq-1"],["Phone","tel","+234...","enq-2"],["Division / Service","text","e.g. Digital Campus, Consulting","enq-3"]].map(([l,t,ph,id])=>(
              <div key={id} style={{marginBottom:11}}>
                <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{l}</label>
                <input id={id} type={t} placeholder={ph} style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",fontFamily:"inherit"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:9,color:G,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message</label>
              <textarea id="enq-msg" rows={3} placeholder="Tell us what you need..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"9px 12px",fontSize:12,color:W,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
            </div>
            <button className="btn-gold" onClick={async()=>{
              const name=document.getElementById("enq-0")?.value;
              const email=document.getElementById("enq-1")?.value;
              const phone=document.getElementById("enq-2")?.value;
              const div=document.getElementById("enq-3")?.value;
              const msg=document.getElementById("enq-msg")?.value;
              if(!name||!email){alert("Please enter your name and email.");return;}
              const s=window.__supabase;
              if(s){await s.from("applications").insert({reference:"ENQ-HOME-"+Date.now(),school_id:"enquiry",applicant_name:name,email,phone:phone||"",program:div||"General Enquiry",admin_notes:msg||"",status:"pending",app_type:"inquiry"}).then(()=>{}).catch(()=>{});}
              alert("Thank you! We will contact you within 24 hours.");
            }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13}}>Send Enquiry →</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"40px clamp(20px,6vw,80px) 28px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:32,marginBottom:28}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
              <div style={{width:30,height:30,background:"linear-gradient(135deg,#C9A84C,#FFD54F)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:C.navy}}>SE</div>
              <div style={{fontSize:10,fontWeight:900,color:G,letterSpacing:1.5}}>SAMPACE EDUCATIONAL LTD</div>
            </div>
            <p style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.8,maxWidth:280,marginBottom:10}}>Learn · Empower · Excel. A focused Nigerian education institution serving learners and institutions across six core divisions.</p>
            <div style={{fontSize:9,color:"rgba(255,255,255,.18)"}}>CAC Registered · CAMA 2020 · Nigeria · Est. 2026</div>
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Our Divisions</div>
            {DIVISIONS.map(d=>(
              <div key={d.id} onClick={()=>onSelectDiv(d)} style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color=G} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.3)"}>{d.icon} {d.name.replace("SAMPACE ","")}</div>
            ))}
          </div>
          <div>
            <div style={{fontSize:9,color:G,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Company</div>
            {["About SAMPACE","Our Founder","Admissions","Consulting Services","Contact Us","WhatsApp Community"].map(c=>(
              <div key={c} style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:7}}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,.18)"}}>© 2026 SAMPACE EDUCATIONAL LTD. All rights reserved. Incorporated in Nigeria.</div>
          <div style={{display:"flex",gap:12}}>
            {["Privacy Policy","Terms of Use","Refund Policy"].map(l=>(
              <span key={l} style={{fontSize:9,color:"rgba(255,255,255,.18)",cursor:"pointer"}}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
