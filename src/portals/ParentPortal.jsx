import { useState, useEffect } from "react";
import { BRAND as C, SITE, fmt, fmtDate } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;

export default function ParentPortal({ user, onLogout }) {
  const [tab,      setTab]      = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [children, setChildren] = useState([]);
  const [selChild, setSelChild] = useState(null);
  const [grades,   setGrades]   = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifs,   setNotifs]   = useState([]);
  const [msg,      setMsg]      = useState("");

  const sb = () => window.__supabase;
  const showMsg = (m, d=3000) => { setMsg(m); setTimeout(()=>setMsg(""),d); };

  useEffect(() => {
    const s = sb(); if (!s) return;
    // Load children linked to this parent
    s.from("parent_children").select("*,student:student_id(*)").eq("parent_id",user?.id)
      .then(({data}) => {
        if (data?.length) {
          const kids = data.map(r=>r.student).filter(Boolean);
          setChildren(kids);
          if (kids.length > 0) {
            setSelChild(kids[0]);
            loadChildData(kids[0].id);
          }
        } else {
          // Demo mode: show sample data
          const demoKid = { id:"demo", full_name:"Sample Child", email:"child@demo.com", student_profiles:[{school_id:"college"}] };
          setChildren([demoKid]);
          setSelChild(demoKid);
        }
      });
    // Load notifications
    s.from("notifications").select("*").eq("user_id",user?.id).order("created_at",{ascending:false}).limit(10)
      .then(({data}) => setNotifs(data||[]));
    // Load payments
    s.from("payments").select("*").eq("user_id",user?.id).order("created_at",{ascending:false})
      .then(({data}) => setPayments(data||[]));
  }, []);

  const loadChildData = async (childId) => {
    const s = sb(); if (!s) return;
    const { data } = await s.from("grades").select("*").eq("student_id",childId).order("updated_at",{ascending:false});
    setGrades(data||[]);
  };

  const switchChild = (child) => {
    setSelChild(child);
    if (child.id !== "demo") loadChildData(child.id);
    else setGrades([]);
  };

  const DEMO_GRADES = [
    {subject:"English Language",ca1:8,ca2:7,project:8,exam:58,total:81,grade:"A"},
    {subject:"Mathematics",ca1:7,ca2:8,project:7,exam:55,total:77,grade:"B"},
    {subject:"Physics",ca1:9,ca2:8,project:9,exam:60,total:86,grade:"A"},
    {subject:"Chemistry",ca1:6,ca2:7,project:8,exam:50,total:71,grade:"B"},
  ];
  const displayGrades = grades.length > 0 ? grades : DEMO_GRADES;
  const avg = displayGrades.length ? Math.round(displayGrades.reduce((s,g)=>s+(g.total||0),0)/displayGrades.length) : 0;

  const NAV = [
    {id:"dashboard",  icon:"🏠", label:"Dashboard"},
    {id:"progress",   icon:"📊", label:"Academic Progress"},
    {id:"attendance", icon:"✅", label:"Attendance"},
    {id:"fees",       icon:"💳", label:"Fees & Payment"},
    {id:"timetable",  icon:"📅", label:"Timetable"},
    {id:"messages",   icon:"💬", label:"Message School"},
    {id:"profile",    icon:"👤", label:"My Profile"},
  ];

  const renderTab = () => {

    if (tab === "dashboard") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>
          Welcome, <em style={{color:C.green}}>{user?.full_name?.split(" ")[0]||"Parent"}</em> 👋
        </h2>
        <div style={{fontSize:12,color:C.slate,marginBottom:18}}>Parent Portal · SAMPACE EDUCATIONAL LTD</div>

        {/* Child selector */}
        {children.length > 1 && (
          <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
            {children.map((child,i)=>(
              <button key={i} onClick={()=>switchChild(child)} style={{background:selChild?.id===child.id?`linear-gradient(135deg,${C.green},${C.sky})`:"rgba(0,0,0,.04)",border:selChild?.id===child.id?"none":`1px solid ${C.border}`,color:selChild?.id===child.id?"#fff":N,padding:"7px 16px",borderRadius:100,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                👧 {child.full_name||"Child "+i}
              </button>
            ))}
          </div>
        )}

        {/* Child snapshot */}
        {selChild && (
          <div style={{background:`linear-gradient(135deg,rgba(0,137,123,.08),rgba(21,101,192,.06))`,border:`1px solid rgba(0,137,123,.2)`,borderRadius:16,padding:"20px",marginBottom:18,display:"flex",gap:16,alignItems:"center"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0}}>{selChild.full_name?.charAt(0)||"?"}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:16,color:N}}>{selChild.full_name||"Your Child"}</div>
              <div style={{fontSize:12,color:C.slate}}>{selChild.student_profiles?.[0]?.school_id||"SAMPACE"} · First Term 2026/2027</div>
              <div style={{fontSize:11,color:C.green,marginTop:3}}>Active Student ✓</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:avg>=75?C.green:avg>=55?C.blue:C.red}}>{avg}%</div>
              <div style={{fontSize:10,color:C.slate}}>Current Average</div>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
          {[
            {icon:"📊",label:"Average Score",val:avg+"%",color:C.blue},
            {icon:"📚",label:"Subjects",val:displayGrades.length,color:"#00897B"},
            {icon:"💳",label:"Payments",val:payments.length,color:C.green},
            {icon:"🔔",label:"Notifications",val:notifs.length,color:C.amber},
          ].map((k,i)=>(
            <div key={i} style={{background:"#fff",border:`1px solid ${k.color}22`,borderRadius:12,padding:"14px",borderTop:`3px solid ${k.color}`}}>
              <div style={{fontSize:18,marginBottom:5}}>{k.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:20,color:k.color,fontWeight:900}}>{k.val}</div>
              <div style={{fontSize:10,color:N,fontWeight:600,marginTop:2}}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Recent grades */}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:N,display:"flex",justifyContent:"space-between"}}>
            Latest Grades
            <button onClick={()=>setTab("progress")} style={{fontSize:11,color:C.blue,border:"none",background:"none",cursor:"pointer"}}>View All →</button>
          </div>
          {displayGrades.slice(0,4).map((g,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
              <div style={{fontSize:12,fontWeight:600,color:N}}>{g.subject}</div>
              <div style={{fontSize:11,color:C.slate,textAlign:"center"}}>Total: {g.total}</div>
              <div style={{textAlign:"center"}}>
                <span style={{background:g.grade==="A"?"rgba(16,185,129,.1)":"rgba(21,101,192,.1)",color:g.grade==="A"?C.green:C.blue,padding:"3px 9px",borderRadius:100,fontSize:10,fontWeight:700}}>{g.grade}</span>
              </div>
              <div style={{fontSize:11,color:g.total>=75?C.green:g.total>=55?C.blue:C.red,textAlign:"right",fontWeight:600}}>{g.total>=75?"Excellent":g.total>=65?"Good":g.total>=55?"Average":"Needs Work"}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[["📊","View Progress","progress"],["💳","Pay Fees","fees"],["💬","Message School","messages"]].map(([icon,label,t])=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,padding:"14px",cursor:"pointer",textAlign:"center"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.green} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
              <div style={{fontSize:11,fontWeight:600,color:N}}>{label}</div>
            </button>
          ))}
        </div>
      </div>
    );

    if (tab === "progress") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Academic Progress</h2>
        <div style={{fontSize:12,color:C.slate,marginBottom:18}}>
          {selChild?.full_name} · First Term 2026/2027 · {grades.length>0?"Live data":"Sample preview"}
        </div>
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
        <div style={{background:`rgba(16,185,129,.06)`,border:`1px solid rgba(16,185,129,.15)`,borderRadius:12,padding:"16px 18px"}}>
          <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:4}}>Term Summary</div>
          <div style={{fontSize:12,color:C.slate}}>Average Score: <strong style={{color:avg>=75?C.green:avg>=55?C.blue:C.red}}>{avg}%</strong> · Grade: <strong>{avg>=75?"A":avg>=65?"B":avg>=55?"C":"D"}</strong> · Subjects: {displayGrades.length}</div>
        </div>
      </div>
    );

    if (tab === "fees") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Fees & Payment</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>View fee schedule and make payments securely via Paystack.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px"}}>
            <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:14}}>Current Term Fee</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:900,color:C.blue,marginBottom:4}}>
              {selChild?.student_profiles?.[0]?.school_id==="college"?"₦45,000":"₦8,000"}
            </div>
            <div style={{fontSize:11,color:C.slate,marginBottom:16}}>First Term 2026/2027</div>
            <button onClick={()=>{
              const amount = selChild?.student_profiles?.[0]?.school_id==="college"?4500000:800000;
              const pk = import.meta?.env?.VITE_PAYSTACK_PUBLIC||"";
              if(!pk){alert("Payment gateway not configured yet. Please contact admin.");return;}
              const handler = window.PaystackPop?.setup({
                key:pk,email:user?.email||"parent@sampaceedu.com.ng",amount,
                currency:"NGN",ref:"PAY-"+Date.now(),
                onSuccess:(tx)=>showMsg("✅ Payment successful! Ref: "+tx.reference),
                onCancel:()=>showMsg("⚠️ Payment cancelled."),
              });
              handler?.openIframe();
            }} style={{width:"100%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer"}}>
              💳 Pay Now (Paystack)
            </button>
          </div>
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px"}}>
            <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:14}}>Payment History</div>
            {payments.length===0
              ? <div style={{textAlign:"center",padding:"20px 0",color:C.slate,fontSize:12}}>No payments recorded yet.</div>
              : payments.map((p,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #F8FAFF"}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:N}}>{p.payment_type||"Tuition"}</div>
                    <div style={{fontSize:9,color:C.slate}}>{fmtDate(p.created_at)}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.green}}>{fmt(p.amount)}</div>
                    <span style={{fontSize:9,background:"rgba(16,185,129,.1)",color:C.green,padding:"1px 7px",borderRadius:100}}>{p.status}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {msg && <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,fontSize:13}}>{msg}</div>}
      </div>
    );

    if (tab === "messages") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Message the School</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>Send messages to teachers or the school administration.</p>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"24px",marginBottom:14}}>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>To</label>
            <select style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",color:N}}>
              <option>School Administration</option><option>Class Teacher</option><option>Guidance Counsellor</option><option>Finance Office</option>
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Subject</label>
            <input id="pmsg-subj" placeholder="e.g. Question about my child's grades" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",color:N}}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message</label>
            <textarea id="pmsg-body" rows={5} placeholder="Type your message here..." style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",resize:"vertical",color:N,fontFamily:"inherit"}}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={async()=>{
              const s=sb();
              const subj=document.getElementById("pmsg-subj")?.value;
              const body=document.getElementById("pmsg-body")?.value;
              if(!subj||!body){alert("Please fill subject and message.");return;}
              if(s){await s.from("notifications").insert({user_id:"00000000-0000-0000-0000-000000000000",title:"Parent Message: "+subj,body:body,type:"parent_message",is_read:false}).then(()=>{}).catch(()=>{});}
              showMsg("✅ Message sent! Admin will reply within 24 hours.");
            }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>Send Message →</button>
            <a href={SITE.whatsapp} style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>💬 WhatsApp</a>
          </div>
        </div>
        {msg && <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,fontSize:13}}>{msg}</div>}
      </div>
    );

    if (tab === "profile") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>My Profile</h2>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:"#fff"}}>{user?.full_name?.charAt(0)||"P"}</div>
            <div>
              <div style={{fontWeight:700,fontSize:18,color:N}}>{user?.full_name||"Parent"}</div>
              <div style={{fontSize:12,color:C.slate}}>{user?.email}</div>
              <div style={{fontSize:11,color:C.green,marginTop:3}}>Parent/Guardian · SAMPACE</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["Full Name",user?.full_name||""],["Email",user?.email||""],["Phone",user?.phone||""],["Relationship","Parent/Guardian"]].map(([label,value])=>(
              <div key={label}>
                <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{label}</label>
                <input defaultValue={value} readOnly={label==="Email"} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,color:N,outline:"none",background:label==="Email"?"#F8FAFF":"#fff"}}/>
              </div>
            ))}
          </div>
          <button onClick={()=>showMsg("✅ Profile updated!")} style={{marginTop:16,background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>💾 Save Changes</button>
          {msg && <div style={{marginTop:12,background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,fontSize:13}}>{msg}</div>}
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
          {sideOpen&&<div><div style={{fontSize:8,fontWeight:800,color:G,letterSpacing:1.5,whiteSpace:"nowrap"}}>PARENT PORTAL</div><div style={{fontSize:7,color:"rgba(255,255,255,.3)",whiteSpace:"nowrap"}}>{user?.full_name?.split(" ")[0]||"Parent"}</div></div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{marginLeft:"auto",background:"rgba(255,255,255,.06)",border:"none",color:"rgba(255,255,255,.4)",width:22,height:22,borderRadius:5,cursor:"pointer",fontSize:11,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{sideOpen?"←":"→"}</button>
        </div>
        <nav style={{flex:1,padding:"8px 5px",overflowY:"auto"}}>
          {NAV.map(item=>(
            <button key={item.id} onClick={()=>setTab(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 8px",borderRadius:6,border:"none",background:tab===item.id?"linear-gradient(135deg,rgba(0,137,123,.4),rgba(77,182,172,.2))":"transparent",borderLeft:tab===item.id?"2px solid #4DB6AC":"2px solid transparent",color:tab===item.id?"#fff":"rgba(255,255,255,.45)",cursor:"pointer",marginBottom:1,fontSize:10,fontWeight:tab===item.id?600:400,textAlign:"left",whiteSpace:"nowrap"}}>
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
          <div style={{fontSize:10,color:C.slate}}>Parent Portal <span style={{color:"#CBD5E1"}}>›</span> <span style={{color:N,fontWeight:700,textTransform:"capitalize"}}>{tab}</span></div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:sb()?"#10B981":"#EF4444"}}/>
            <span style={{fontSize:9,color:C.slate}}>{sb()?"Live":"Demo"}</span>
            <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>{user?.full_name?.charAt(0)||"P"}</div>
          </div>
        </header>
        <main style={{flex:1,padding:"20px",overflowY:"auto"}}>{renderTab()}</main>
      </div>
    </div>
  );
}
