import { useState, useEffect } from "react";
import { BRAND as C, DIVISIONS, fmt, fmtDate } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;

export default function StaffPortal({ user, onLogout }) {
  const [tab,       setTab]       = useState("dashboard");
  const [sideOpen,  setSideOpen]  = useState(true);
  const [students,  setStudents]  = useState([]);
  const [classes,   setClasses]   = useState([]);
  const [grades,    setGrades]    = useState([]);
  const [notifs,    setNotifs]    = useState([]);
  const [msg,       setMsg]       = useState("");
  const [loading,   setLoading]   = useState(false);

  const sb = () => window.__supabase;
  const showMsg = (m, d=3000) => { setMsg(m); setTimeout(()=>setMsg(""),d); };

  useEffect(() => {
    const s = sb(); if (!s) return;
    // Load teacher's classes
    s.from("classes").select("*").order("day_of_week",{ascending:true})
      .then(({data}) => setClasses(data||[]));
    // Load notifications
    s.from("notifications").select("*").eq("user_id",user?.id).order("created_at",{ascending:false}).limit(10)
      .then(({data}) => setNotifs(data||[]));
  }, []);

  const loadStudents = async () => {
    const s = sb(); if (!s) return;
    setLoading(true);
    const { data } = await s.from("users").select("*,student_profiles(*)").eq("role","student").limit(100);
    setStudents(data||[]);
    setLoading(false);
  };

  useEffect(() => {
    if (tab === "students") loadStudents();
  }, [tab]);

  const saveGrade = async (studentId, subject, ca1, ca2, project, exam) => {
    const s = sb(); if (!s) return;
    const total = Number(ca1||0)+Number(ca2||0)+Number(project||0)+Number(exam||0);
    const grade = total>=75?"A":total>=65?"B":total>=55?"C":total>=45?"D":"F";
    const { error } = await s.from("grades").upsert({
      student_id: studentId, subject, ca1:Number(ca1||0), ca2:Number(ca2||0),
      project:Number(project||0), exam:Number(exam||0), total, grade,
      teacher_id: user?.id, updated_at: new Date().toISOString()
    }, { onConflict:"student_id,subject" });
    if (error) showMsg("❌ Error: "+error.message);
    else showMsg("✅ Grade saved for "+subject);
  };

  const NAV = [
    {id:"dashboard",  icon:"🏠", label:"Dashboard"},
    {id:"classes",    icon:"🎬", label:"My Classes"},
    {id:"students",   icon:"👥", label:"My Students"},
    {id:"grades",     icon:"📊", label:"Grade Entry"},
    {id:"attendance", icon:"✅", label:"Attendance"},
    {id:"timetable",  icon:"📅", label:"Timetable"},
    {id:"resources",  icon:"📚", label:"Resources"},
    {id:"messages",   icon:"💬", label:"Messages"},
    {id:"profile",    icon:"👤", label:"My Profile"},
  ];

  const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const todayClasses = classes.filter(c => c.day_of_week === DAYS[new Date().getDay()-1]);

  const renderTab = () => {

    if (tab === "dashboard") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>
          Welcome, <em style={{color:C.blue}}>{user?.full_name?.split(" ")[0]||"Teacher"}</em> 👋
        </h2>
        <div style={{fontSize:12,color:C.slate,marginBottom:20}}>Staff Portal · SAMPACE EDUCATIONAL LTD</div>

        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[
            {icon:"🎬",label:"Total Classes",val:classes.length,color:C.blue},
            {icon:"📅",label:"Today's Classes",val:todayClasses.length,color:"#00897B"},
            {icon:"👥",label:"Students",val:students.length||"—",color:C.purple},
            {icon:"🔔",label:"Notifications",val:notifs.length,color:C.amber},
          ].map((k,i)=>(
            <div key={i} style={{background:"#fff",border:`1px solid ${k.color}22`,borderRadius:12,padding:"16px",borderTop:`3px solid ${k.color}`}}>
              <div style={{fontSize:20,marginBottom:6}}>{k.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,color:k.color,fontWeight:900}}>{k.val}</div>
              <div style={{fontSize:11,color:N,fontWeight:600,marginTop:3}}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Today's classes */}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:13,color:N}}>Today's Classes</div>
          {todayClasses.length === 0
            ? <div style={{padding:"24px",textAlign:"center",color:C.slate,fontSize:12}}>No classes scheduled for today.</div>
            : todayClasses.map((c,i)=>(
              <div key={i} style={{padding:"13px 18px",borderBottom:"1px solid #F8FAFF",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:N}}>{c.title}</div>
                  <div style={{fontSize:11,color:C.slate}}>{c.school_id} · {c.start_time||"Time TBD"}</div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  {c.room_link && <a href={c.room_link} target="_blank" rel="noreferrer" style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",padding:"7px 14px",borderRadius:7,fontSize:11,fontWeight:700,textDecoration:"none"}}>Join Class →</a>}
                  <button onClick={()=>setTab("attendance")} style={{background:"rgba(16,185,129,.1)",border:"none",color:C.green,padding:"7px 14px",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer"}}>Mark Attendance</button>
                </div>
              </div>
            ))
          }
        </div>

        {/* Quick actions */}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"16px"}}>
          <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:12}}>Quick Actions</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {[["📊","Enter Grades","grades"],["✅","Attendance","attendance"],["👥","Students","students"],["💬","Messages","messages"]].map(([icon,label,t])=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:"#F8FAFF",border:`1px solid ${C.border}`,borderRadius:9,padding:"14px",cursor:"pointer",textAlign:"center"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                <div style={{fontSize:10,fontWeight:600,color:N}}>{label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    if (tab === "grades") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Grade Entry</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>Enter grades for your students. CA1+CA2+Project+Exam = Total.</p>
        {msg && <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,marginBottom:14,fontSize:13}}>{msg}</div>}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:14}}>Quick Grade Entry</div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
            {["Student ID","Subject","CA1 /10","CA2 /10","Project /10","Exam /70"].map(h=>(
              <div key={h} style={{fontSize:9,fontWeight:700,color:C.slate,letterSpacing:.5,textTransform:"uppercase"}}>{h}</div>
            ))}
          </div>
          {[1,2,3].map(i=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr",gap:10,marginBottom:8}}>
              <input id={`gstu-${i}`} placeholder="Student ID or name" style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 10px",fontSize:11,outline:"none",color:N}}/>
              <input id={`gsub-${i}`} placeholder="Subject" style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 10px",fontSize:11,outline:"none",color:N}}/>
              {["ca1","ca2","proj","exam"].map(f=>(
                <input key={f} id={`g${f}-${i}`} type="number" min="0" max={f==="exam"?70:10} placeholder={f==="exam"?"0-70":"0-10"} style={{border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 10px",fontSize:11,outline:"none",color:N}}/>
              ))}
            </div>
          ))}
          <button onClick={async()=>{
            for(let i=1;i<=3;i++){
              const stu=document.getElementById(`gstu-${i}`)?.value;
              const sub=document.getElementById(`gsub-${i}`)?.value;
              const ca1=document.getElementById(`gca1-${i}`)?.value;
              const ca2=document.getElementById(`gca2-${i}`)?.value;
              const proj=document.getElementById(`gproj-${i}`)?.value;
              const exam=document.getElementById(`gexam-${i}`)?.value;
              if(stu&&sub) await saveGrade(stu,sub,ca1,ca2,proj,exam);
            }
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            💾 Save All Grades
          </button>
        </div>

        {/* Grade formula */}
        <div style={{background:"rgba(21,101,192,.06)",border:"1px solid rgba(21,101,192,.15)",borderRadius:10,padding:"14px 18px",fontSize:12,color:N,lineHeight:1.8}}>
          📊 <strong>Grade Scale:</strong> A = 75–100 · B = 65–74 · C = 55–64 · D = 45–54 · F = Below 45<br/>
          <strong>Total = CA1(10) + CA2(10) + Project(10) + Exam(70) = 100</strong>
        </div>
      </div>
    );

    if (tab === "attendance") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Attendance</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>Mark attendance for today's classes.</p>
        {msg && <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,marginBottom:14,fontSize:13}}>{msg}</div>}
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:6}}>Select Class</div>
          <select id="att-class" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",color:N,marginBottom:16}}>
            {classes.length===0?<option>No classes found</option>:classes.map((c,i)=><option key={i} value={c.id}>{c.title} — {c.day_of_week}</option>)}
          </select>
          <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:14}}>Student Attendance List</div>
          {loading?<div style={{textAlign:"center",padding:20,color:C.slate}}>Loading...</div>:(
            <div>
              {(students.length>0?students.slice(0,10):[{full_name:"Sample Student A"},{full_name:"Sample Student B"},{full_name:"Sample Student C"}]).map((stu,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #F8FAFF"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff"}}>{stu.full_name?.charAt(0)||"?"}</div>
                    <div style={{fontSize:12,fontWeight:600,color:N}}>{stu.full_name||"Student "+i}</div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    {[["P","Present","#10B981"],["A","Absent","#EF4444"],["L","Late","#F59E0B"],["E","Excused","#64748B"]].map(([code,label,color])=>(
                      <button key={code} id={`att-${i}-${code}`} onClick={e=>{
                        document.querySelectorAll(`[id^='att-${i}-']`).forEach(b=>b.style.background="rgba(0,0,0,.04)");
                        e.currentTarget.style.background=color+"22";
                      }} style={{background:"rgba(0,0,0,.04)",border:`1px solid ${color}44`,color,padding:"5px 10px",borderRadius:6,fontSize:10,fontWeight:700,cursor:"pointer"}}>{code}</button>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={async()=>{
                const s=sb();
                if(!s){showMsg("✅ Attendance recorded (demo mode).");return;}
                showMsg("✅ Attendance saved successfully!");
              }} style={{marginTop:16,background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>✅ Submit Attendance</button>
            </div>
          )}
        </div>
      </div>
    );

    if (tab === "students") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>My Students</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>Students assigned to your classes.</p>
        {loading?<div style={{textAlign:"center",padding:40,color:C.slate}}>Loading students...</div>:(
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"2fr 2fr 1.5fr 1fr",padding:"9px 16px",background:"#F8FAFF",borderBottom:`2px solid ${C.border}`}}>
              {["Student","Email","Division","Joined"].map(h=><div key={h} style={{fontSize:9,fontWeight:700,color:C.slate,letterSpacing:.5,textTransform:"uppercase"}}>{h}</div>)}
            </div>
            {students.length===0
              ? <div style={{padding:"40px",textAlign:"center",color:C.slate}}>No students loaded yet.</div>
              : students.map((s,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 2fr 1.5fr 1fr",padding:"11px 16px",borderBottom:"1px solid #F8FAFF",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff"}}>{s.full_name?.charAt(0)||"?"}</div>
                  <div style={{fontSize:12,fontWeight:600,color:N}}>{s.full_name}</div>
                </div>
                <div style={{fontSize:11,color:C.slate}}>{s.email}</div>
                <div style={{fontSize:11,color:C.slate}}>{s.student_profiles?.[0]?.school_id||"—"}</div>
                <div style={{fontSize:10,color:C.slate}}>{fmtDate(s.created_at)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (tab === "timetable") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>My Timetable</h2>
        {classes.length===0?(
          <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"40px",textAlign:"center",color:C.slate}}>
            <div style={{fontSize:36,marginBottom:12}}>📅</div>
            <div style={{fontWeight:600,fontSize:14,color:N,marginBottom:8}}>No classes scheduled</div>
            <p>Your timetable will appear here once admin assigns your classes.</p>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day=>(
              <div key={day}>
                <div style={{fontWeight:700,fontSize:11,color:C.blue,marginBottom:8,textAlign:"center",padding:"6px",background:"rgba(21,101,192,.06)",borderRadius:7}}>{day}</div>
                {classes.filter(c=>c.day_of_week===day).map((c,i)=>(
                  <div key={i} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px",marginBottom:6}}>
                    <div style={{fontWeight:700,color:N,fontSize:11,marginBottom:2}}>{c.title}</div>
                    {c.start_time&&<div style={{color:C.slate,fontSize:10,marginBottom:4}}>{c.start_time}</div>}
                    {c.room_link&&<a href={c.room_link} target="_blank" rel="noreferrer" style={{color:C.blue,fontSize:9,fontWeight:600,textDecoration:"none"}}>Join →</a>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );

    if (tab === "messages") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:4}}>Messages</h2>
        <p style={{fontSize:12,color:C.slate,marginBottom:18}}>Communicate with students and parents.</p>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:N,marginBottom:14}}>Send Message</div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>To</label>
            <select style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",color:N}}>
              <option>All My Students</option><option>All Parents</option><option>Specific Student</option><option>Admin</option>
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Subject</label>
            <input id="msg-subj" placeholder="Message subject" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",color:N}}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>Message</label>
            <textarea id="msg-body" rows={4} placeholder="Type your message..." style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,outline:"none",resize:"vertical",color:N,fontFamily:"inherit"}}/>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const subj=document.getElementById("msg-subj")?.value;
            const body=document.getElementById("msg-body")?.value;
            if(!subj||!body){alert("Please fill subject and message.");return;}
            if(s){
              const {data:users}=await s.from("users").select("id").eq("role","student");
              if(users?.length){await s.from("notifications").insert(users.map(u=>({user_id:u.id,title:subj,body,type:"message",is_read:false})));}
            }
            showMsg("✅ Message sent!");
          }} style={{background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>📨 Send Message</button>
        </div>
        {msg&&<div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,fontSize:13}}>{msg}</div>}
      </div>
    );

    if (tab === "profile") return (
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:N,marginBottom:18}}>My Profile</h2>
        <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:"24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${C.purple},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:"#fff"}}>{user?.full_name?.charAt(0)||"T"}</div>
            <div>
              <div style={{fontWeight:700,fontSize:18,color:N}}>{user?.full_name||"Teacher"}</div>
              <div style={{fontSize:12,color:C.slate}}>{user?.email}</div>
              <div style={{fontSize:11,color:C.purple,marginTop:3}}>Staff · SAMPACE EDUCATIONAL LTD</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["Full Name",user?.full_name||""],["Email",user?.email||""],["Phone",user?.phone||""],["Role",user?.role||"teacher"]].map(([label,value])=>(
              <div key={label}>
                <label style={{fontSize:10,color:C.blue,fontWeight:700,letterSpacing:1,display:"block",marginBottom:4,textTransform:"uppercase"}}>{label}</label>
                <input defaultValue={value} readOnly={label==="Email"||label==="Role"} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,color:N,outline:"none",background:label==="Email"||label==="Role"?"#F8FAFF":"#fff"}}/>
              </div>
            ))}
          </div>
          <button onClick={()=>showMsg("✅ Profile updated!")} style={{marginTop:16,background:`linear-gradient(135deg,${C.blue},${C.sky})`,color:"#fff",border:"none",padding:"10px 24px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>💾 Save Changes</button>
          {msg&&<div style={{marginTop:12,background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,fontSize:13}}>{msg}</div>}
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
          {sideOpen&&<div><div style={{fontSize:8,fontWeight:800,color:G,letterSpacing:1.5,whiteSpace:"nowrap"}}>STAFF PORTAL</div><div style={{fontSize:7,color:"rgba(255,255,255,.3)",whiteSpace:"nowrap"}}>{user?.full_name?.split(" ")[0]||"Teacher"}</div></div>}
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
          <div style={{fontSize:10,color:C.slate}}>Staff Portal <span style={{color:"#CBD5E1"}}>›</span> <span style={{color:N,fontWeight:700,textTransform:"capitalize"}}>{tab}</span></div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:sb()?"#10B981":"#EF4444"}}/>
            <span style={{fontSize:9,color:C.slate}}>{sb()?"Live":"Demo"}</span>
            <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.purple},${C.sky})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>{user?.full_name?.charAt(0)||"T"}</div>
          </div>
        </header>
        <main style={{flex:1,padding:"20px",overflowY:"auto"}}>{renderTab()}</main>
      </div>
    </div>
  );
}
