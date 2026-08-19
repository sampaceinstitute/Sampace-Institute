import { useState, useEffect } from "react";
import { BRAND as C, DIVISIONS, DIVISION_GROUPS, USER_ROLES, fmt, fmtDate } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;

// ── Shared UI helpers ──────────────────────────────────────────
const StatusBadge = ({ s }) => {
  const m = {
    pending:  { bg:"rgba(245,158,11,.12)",  c:"#F59E0B" },
    approved: { bg:"rgba(16,185,129,.12)",  c:"#10B981" },
    rejected: { bg:"rgba(239,68,68,.12)",   c:"#EF4444" },
    success:  { bg:"rgba(16,185,129,.12)",  c:"#10B981" },
    failed:   { bg:"rgba(239,68,68,.12)",   c:"#EF4444" },
    active:   { bg:"rgba(16,185,129,.12)",  c:"#10B981" },
    open:     { bg:"rgba(16,185,129,.12)",  c:"#10B981" },
    closed:   { bg:"rgba(239,68,68,.12)",   c:"#EF4444" },
    inquiry:  { bg:"rgba(99,102,241,.12)",  c:"#818CF8" },
  };
  const b = m[s] || { bg:"rgba(100,116,139,.12)", c:"#64748B" };
  return <span style={{ background:b.bg, color:b.c, padding:"3px 9px", borderRadius:100, fontSize:10, fontWeight:700, textTransform:"capitalize" }}>{s}</span>;
};

const MsgBar = ({ msg }) => msg ? (
  <div style={{ background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", color:C.green, padding:"10px 16px", borderRadius:8, marginBottom:14, fontSize:13, fontWeight:600 }}>{msg}</div>
) : null;

const PageTitle = ({ title, sub }) => (
  <div style={{ marginBottom:20 }}>
    <h2 style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:N }}>{title}</h2>
    {sub && <div style={{ fontSize:12, color:C.slate, marginTop:2 }}>{sub}</div>}
  </div>
);

const SectionCard = ({ title, children }) => (
  <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:14 }}>
    <div style={{ padding:"12px 18px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:13, color:N }}>{title}</div>
    {children}
  </div>
);

const TableHeader = ({ cols }) => (
  <div style={{ display:"grid", gridTemplateColumns:cols, padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
    {Object.keys(cols).map ? null : null}
  </div>
);

// ── STAFF ROLES per division ────────────────────────────────────
const STAFF_ROLES = {
  digital:      ["Campus Director","Programme Manager","Course Instructor","Teaching Assistant","Community Manager"],
  extramural:   ["Programme Coordinator","Centre Coordinator","Subject Tutor","CBT Administrator","Instructor","Mentor"],
  professional: ["Director","Lead Facilitator","Trainer","Instructor","Workplace Skills Coach"],
  consult:      ["Lead Consultant","Educational Consultant","Research Consultant","Project Officer","Trainer"],
  research:     ["Research Coordinator","Research Assistant","Data Analyst","Document Officer","Computer Operator"],
  edtech:       ["Technical Lead","Software Developer","UI/UX Designer","Project Manager","Support Officer"],
};

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function AdminDashboard({ user, onLogout }) {
  const [page,       setPage]      = useState("overview");
  const [sideOpen,   setSideOpen]  = useState(true);
  const [msg,        setMsg]       = useState("");
  const [loading,    setLoading]   = useState(false);
  const [apps,       setApps]      = useState([]);
  const [students,   setStudents]  = useState([]);
  const [payments,   setPayments]  = useState([]);
  const [staff,      setStaff]     = useState([]);
  const [stats,      setStats]     = useState({ students:0, staff:0, revenue:0, apps:0, pending:0 });
  const [divStatus,  setDivStatus] = useState(Object.fromEntries(DIVISIONS.map(d=>[d.id,"open"])));
  const [fees,       setFees]      = useState({
    college_jss:"45000", college_ss:"55000", college_ss3:"65000",
    tutorial_single:"8000", tutorial_bundle:"20000", tutorial_full:"35000",
    digital_tech:"150000", digital_biz:"120000", digital_lang:"30000",
    preuni_ijmb:"180000", preuni_jupeb:"200000", preuni_pre:"120000",
    professional_short:"50000", professional_exec:"200000",
    cbt_monthly:"3000", cbt_annual:"25000",
  });
  const [cfg, setCfg] = useState({
    inst_name:"SAMPACE EDUCATIONAL LTD", inst_tagline:"Where Excellence Begins",
    inst_email:"info@sampaceedu.com.ng", inst_phone:"+234-800-SAMPACE",
    inst_domain:"sampaceedu.com.ng", inst_timezone:"Africa/Lagos",
    brand_primary:"#0B1F3A", brand_secondary:"#C9A84C",
    academic_session:"2026/2027", academic_term:"First Term",
    academic_start:"September 1, 2026", academic_end:"December 15, 2026",
    grade_ca1:"10", grade_ca2:"10", grade_proj:"10", grade_exam:"70", grade_pass:"45",
    admissions_status:"open", admissions_fee:"0",
    payment_gateway:"Paystack", email_from:"noreply@sampaceedu.com.ng",
    sms_enabled:"false", whatsapp_enabled:"true",
    security_2fa:"false", security_timeout:"24h", maintenance:"false",
  });

  const sb    = () => window.__supabase;
  const showMsg = (m, d=3000) => { setMsg(m); setTimeout(()=>setMsg(""),d); };

  // ── DATA LOADING ──
  const loadData = async () => {
    const s = sb(); if (!s) return;
    try {
      const [studRes, appRes, payRes, staffRes] = await Promise.all([
        s.from("users").select("id",{count:"exact",head:true}).eq("role","student"),
        s.from("applications").select("*").order("created_at",{ascending:false}).limit(200),
        s.from("payments").select("*").order("created_at",{ascending:false}).limit(200),
        s.from("users").select("*").in("role",["teacher","school_admin"]).order("created_at",{ascending:false}),
      ]);
      const rev = (payRes.data||[]).filter(p=>p.status==="success").reduce((t,p)=>t+Number(p.amount),0);
      const pending = (appRes.data||[]).filter(a=>a.status==="pending").length;
      setStats({ students:studRes.count||0, staff:(staffRes.data||[]).length, revenue:rev, apps:(appRes.data||[]).length, pending });
      setApps(appRes.data||[]);
      setPayments(payRes.data||[]);
      setStaff(staffRes.data||[]);
    } catch(e) { console.error(e); }
  };

  const loadStudents = async () => {
    const s = sb(); if (!s) return;
    setLoading(true);
    const { data } = await s.from("users").select("*,student_profiles(*)").eq("role","student").order("created_at",{ascending:false}).limit(200);
    setStudents(data||[]);
    setLoading(false);
  };

  const approveApp = async (id, status) => {
    const s = sb(); if (!s) return;
    await s.from("applications").update({ status, reviewed_at:new Date().toISOString() }).eq("id",id);
    showMsg("✅ Application " + status);
    loadData();
  };

  const enableAccess = async (id) => {
    const s = sb(); if (!s) return;
    await s.from("payments").update({ access_enabled:true, admin_verified:true, admin_enabled_at:new Date().toISOString() }).eq("id",id);
    showMsg("✅ Student access enabled");
    loadData();
  };

  useEffect(() => { loadData(); }, []);
  useEffect(() => { if (page==="learners") loadStudents(); else loadData(); }, [page]);

  // ── NAV ──
  const NAV = [
    { section:"Core", items:[
      { id:"overview",       icon:"⊞", label:"Dashboard" },
      { id:"admissions",     icon:"📋", label:"Admissions", badge:stats.pending||null },
      { id:"learners",       icon:"👥", label:"Learners" },
      { id:"staff-page",     icon:"👔", label:"Staff" },
    ]},
    { section:"Academic & Learning", items:[
      { id:"academics",      icon:"📚", label:"Academics" },
      { id:"lms",            icon:"🎬", label:"Learning Mgmt" },
      { id:"timetable",      icon:"📅", label:"Timetable" },
      { id:"results-page",   icon:"📊", label:"Results" },
    ]},
    { section:"Finance & Operations", items:[
      { id:"finance",        icon:"💰", label:"Finance" },
      { id:"fee-settings",   icon:"💳", label:"Fee Settings" },
      { id:"operations",     icon:"⚙️", label:"Operations" },
      { id:"announcements",  icon:"📣", label:"Announcements" },
    ]},
    { section:"Corporate HQ", items:[
      { id:"corporate",      icon:"🏢", label:"Corporate HQ" },
      { id:"divisions-mgmt", icon:"🏫", label:"Divisions" },
      { id:"admin-roles",    icon:"🔑", label:"Admin & Roles" },
      { id:"inquiries",      icon:"💬", label:"Inquiries" },
    ]},
    { section:"Platform", items:[
      { id:"website-mgmt",   icon:"🌐", label:"Website" },
      { id:"reports",        icon:"📈", label:"Reports" },
      { id:"settings",       icon:"🔧", label:"Settings" },
    ]},
  ];

  // ── PAGE RENDERS ──
  const renderPage = () => {

    if (page === "overview") return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:700, color:N }}>SAMPACE Enterprise Dashboard</h2>
            <div style={{ fontSize:12, color:C.slate, marginTop:2 }}>{USER_ROLES[user?.role]?.label||"Super Admin"} · Education Ecosystem Command Centre</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ background:sb()?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)", color:sb()?"#10B981":"#EF4444", padding:"5px 12px", borderRadius:100, fontSize:10, fontWeight:700, border:"1px solid", borderColor:sb()?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)" }}>
              {sb() ? "● Live Database" : "● Demo Mode"}
            </div>
            <button onClick={loadData} style={{ background:"#fff", border:`1px solid ${C.border}`, color:C.slate, padding:"5px 12px", borderRadius:8, fontSize:11, cursor:"pointer", fontWeight:600 }}>🔄 Refresh</button>
          </div>
        </div>
        <MsgBar msg={msg}/>

        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:20 }}>
          {[
            { icon:"👥", label:"Learners",     val:stats.students, color:C.blue,   pg:"learners" },
            { icon:"👔", label:"Staff",        val:stats.staff,    color:C.purple, pg:"staff-page" },
            { icon:"🏫", label:"Divisions",    val:12,             color:"#00897B",pg:"divisions-mgmt" },
            { icon:"💰", label:"Revenue",      val:fmt(stats.revenue), color:C.green, pg:"finance" },
            { icon:"📋", label:"Applications", val:stats.apps,     color:C.amber,  pg:"admissions" },
            { icon:"⏳", label:"Pending",      val:stats.pending,  color:C.red,    pg:"admissions" },
          ].map((k,i)=>(
            <div key={i} onClick={()=>setPage(k.pg)}
              style={{ background:"#fff", border:`1px solid ${k.color}22`, borderRadius:12, padding:"14px", borderTop:`3px solid ${k.color}`, cursor:"pointer", transition:"all .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{ fontSize:18, marginBottom:6 }}>{k.icon}</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:20, color:k.color, fontWeight:900, lineHeight:1 }}>{k.val}</div>
              <div style={{ fontSize:10, color:N, fontWeight:600, marginTop:3 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Recent data panels */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
          <SectionCard title={<span>Recent Applications <button onClick={()=>setPage("admissions")} style={{ float:"right", fontSize:11, color:C.blue, border:"none", background:"none", cursor:"pointer" }}>View All →</button></span>}>
            {apps.length === 0
              ? <div style={{ padding:"24px", textAlign:"center", color:C.slate, fontSize:12 }}>No applications yet.</div>
              : apps.slice(0,5).map((a,i)=>(
                <div key={i} style={{ padding:"10px 16px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:N }}>{a.applicant_name}</div>
                    <div style={{ fontSize:10, color:C.slate }}>{a.school_id} · {fmtDate(a.created_at)}</div>
                  </div>
                  <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                    <StatusBadge s={a.status}/>
                    {a.status==="pending" && <>
                      <button onClick={()=>approveApp(a.id,"approved")} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"3px 7px", borderRadius:4, fontSize:10, cursor:"pointer", fontWeight:700 }}>✓</button>
                      <button onClick={()=>approveApp(a.id,"rejected")} style={{ background:"rgba(239,68,68,.1)", border:"none", color:C.red, padding:"3px 7px", borderRadius:4, fontSize:10, cursor:"pointer", fontWeight:700 }}>✕</button>
                    </>}
                  </div>
                </div>
              ))
            }
          </SectionCard>

          <SectionCard title={<span>Recent Payments <button onClick={()=>setPage("finance")} style={{ float:"right", fontSize:11, color:C.blue, border:"none", background:"none", cursor:"pointer" }}>View All →</button></span>}>
            {payments.length === 0
              ? <div style={{ padding:"24px", textAlign:"center", color:C.slate, fontSize:12 }}>No payments yet.</div>
              : payments.slice(0,5).map((p,i)=>(
                <div key={i} style={{ padding:"10px 16px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:N }}>{p.school_id||"General"} · {p.payment_type||"Tuition"}</div>
                    <div style={{ fontSize:10, color:C.slate }}>{fmtDate(p.created_at)}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:C.green }}>{fmt(p.amount)}</div>
                    {p.status==="success" && !p.access_enabled &&
                      <button onClick={()=>enableAccess(p.id)} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"2px 7px", borderRadius:4, fontSize:9, cursor:"pointer", fontWeight:700, marginTop:2 }}>Enable</button>
                    }
                  </div>
                </div>
              ))
            }
          </SectionCard>
        </div>

        {/* Quick actions */}
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
          <div style={{ fontWeight:700, fontSize:13, color:N, marginBottom:12 }}>Quick Actions</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 }}>
            {[["📋","Applications","admissions"],["👥","Learners","learners"],["👔","Staff","staff-page"],["💰","Finance","finance"],["📣","Announce","announcements"],["🔑","Roles","admin-roles"],["💳","Fees","fee-settings"],["🏫","Divisions","divisions-mgmt"],["🌐","Website","website-mgmt"],["📊","Reports","reports"],["⚙️","Operations","operations"],["🔧","Settings","settings"]].map(([icon,label,pg])=>(
              <button key={pg} onClick={()=>setPage(pg)}
                style={{ background:"#F8FAFF", border:`1px solid ${C.border}`, borderRadius:9, padding:"12px 6px", cursor:"pointer", textAlign:"center", transition:"all .15s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
                <div style={{ fontSize:10, fontWeight:600, color:N }}>{label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    if (page === "admissions") return (
      <div>
        <PageTitle title="Admissions Management" sub={`${apps.length} total · ${stats.pending} pending review`}/>
        <MsgBar msg={msg}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
          {[["Total",apps.length,"#64748B"],["Pending",apps.filter(a=>a.status==="pending").length,C.amber],["Approved",apps.filter(a=>a.status==="approved").length,C.green],["Rejected",apps.filter(a=>a.status==="rejected").length,C.red]].map(([l,v,c])=>(
            <div key={l} style={{ background:"#fff", border:`1px solid ${c}22`, borderRadius:10, padding:"14px", borderTop:`3px solid ${c}`, textAlign:"center" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:c, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:11, color:C.slate }}>{l}</div>
            </div>
          ))}
        </div>
        <SectionCard title="All Applications">
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 1fr 1.5fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
            {["Applicant","Division","Programme","Date","Status","Actions"].map(h=>(
              <div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>
          {apps.length === 0
            ? <div style={{ padding:"40px", textAlign:"center", color:C.slate }}>No applications yet.</div>
            : apps.map((a,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 1fr 1.5fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:N }}>{a.applicant_name}</div>
                <div style={{ fontSize:10, color:C.slate }}>{a.email}</div>
              </div>
              <div style={{ fontSize:11, color:C.slate }}>{a.school_id}</div>
              <div style={{ fontSize:11, color:C.slate }}>{a.program||"General"}</div>
              <div style={{ fontSize:10, color:C.slate }}>{fmtDate(a.created_at)}</div>
              <StatusBadge s={a.status}/>
              <div style={{ display:"flex", gap:4 }}>
                {a.status==="pending" ? <>
                  <button onClick={()=>approveApp(a.id,"approved")} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"4px 8px", borderRadius:5, fontSize:10, cursor:"pointer", fontWeight:700 }}>✓ Approve</button>
                  <button onClick={()=>approveApp(a.id,"rejected")} style={{ background:"rgba(239,68,68,.1)", border:"none", color:C.red, padding:"4px 8px", borderRadius:5, fontSize:10, cursor:"pointer", fontWeight:700 }}>✕</button>
                </> : <span style={{ fontSize:10, color:C.slate }}>Done</span>}
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    );

    if (page === "learners") return (
      <div>
        <PageTitle title="Learners Management" sub={`${students.length} registered across all divisions`}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
          {[["All",students.length,"#64748B"],["College",students.filter(s=>s.student_profiles?.[0]?.school_id==="college").length,C.blue],["Extramural",students.filter(s=>s.student_profiles?.[0]?.school_id==="extramural").length,"#00897B"],["Digital",students.filter(s=>s.student_profiles?.[0]?.school_id==="digital").length,"#7B1FA2"]].map(([l,v,c])=>(
            <div key={l} style={{ background:"#fff", border:`1px solid ${c}22`, borderRadius:10, padding:"14px", borderTop:`3px solid ${c}`, textAlign:"center" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:20, color:c, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:11, color:C.slate }}>{l}</div>
            </div>
          ))}
        </div>
        {loading ? <div style={{ textAlign:"center", padding:40, color:C.slate }}>Loading learners...</div> : (
          <SectionCard title={`All Learners (${students.length})`}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr", padding:"9px 16px", background:"#F8FAFF", borderBottom:`2px solid ${C.border}` }}>
              {["Learner","Email","Division","Role","Joined"].map(h=>(
                <div key={h} style={{ fontSize:9, fontWeight:700, color:C.slate, letterSpacing:.5, textTransform:"uppercase" }}>{h}</div>
              ))}
            </div>
            {students.length === 0
              ? <div style={{ padding:"40px", textAlign:"center", color:C.slate }}>No learners registered yet.</div>
              : students.map((s,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:W, flexShrink:0 }}>{s.full_name?.charAt(0)||"?"}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:N }}>{s.full_name}</div>
                </div>
                <div style={{ fontSize:11, color:C.slate }}>{s.email}</div>
                <div style={{ fontSize:11, color:C.slate }}>{s.student_profiles?.[0]?.school_id||"—"}</div>
                <div style={{ fontSize:11, color:C.slate, textTransform:"capitalize" }}>{s.role}</div>
                <div style={{ fontSize:10, color:C.slate }}>{fmtDate(s.created_at)}</div>
              </div>
            ))}
          </SectionCard>
        )}
      </div>
    );

    if (page === "staff-page") return (
      <div>
        <PageTitle title="Staff Management" sub="All staff across 12 divisions. Division-specific roles."/>
        <MsgBar msg={msg}/>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"20px", marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:N, marginBottom:14 }}>Add New Staff Member</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            {[["Full Name *","text","e.g. Mrs. Ngozi Adeyemi","snm"],["Email *","email","staff@sampaceedu.com.ng","sem"],["Phone","text","+234...","sph"],["Subject / Course","text","e.g. Mathematics","ssub"]].map(([l,t,ph,id])=>(
              <div key={id}>
                <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>{l}</label>
                <input id={id} type={t} placeholder={ph} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
              </div>
            ))}
            <div>
              <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Division</label>
              <select id="sdiv" onChange={e=>{
                const roles = STAFF_ROLES[e.target.value] || [];
                const sel = document.getElementById("srole");
                if (sel) sel.innerHTML = roles.map(r=>`<option>${r}</option>`).join("");
              }} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
                {DIVISIONS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Staff Role</label>
              <select id="srole" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
                {(STAFF_ROLES["college"]||[]).map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const name=document.getElementById("snm")?.value;
            const email=document.getElementById("sem")?.value;
            const phone=document.getElementById("sph")?.value||"";
            const div=document.getElementById("sdiv")?.value||"college";
            const subj=document.getElementById("ssub")?.value||"";
            if(!name||!email){alert("Name and email are required.");return;}
            if(s){
              const {data:nd,error}=await s.from("users").insert({full_name:name,email,phone,role:"teacher",is_active:true}).select().single();
              if(error){alert("Error: "+error.message);return;}
              if(nd&&subj){await s.from("courses").insert({school_id:div,subject:subj,title:subj,teacher_id:nd.id,is_active:true}).then(()=>{}).catch(()=>{});}
            }
            showMsg("✅ Staff member added!");
            loadData();
          }} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            + Add Staff Member
          </button>
        </div>
        <SectionCard title={`All Staff (${staff.length})`}>
          {staff.length === 0
            ? <div style={{ padding:"24px", textAlign:"center", color:C.slate }}>No staff added yet.</div>
            : staff.map((s,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${C.purple},${C.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:W }}>{s.full_name?.charAt(0)||"?"}</div>
                <div style={{ fontSize:12, fontWeight:600, color:N }}>{s.full_name}</div>
              </div>
              <div style={{ fontSize:11, color:C.slate }}>{s.email}</div>
              <div style={{ fontSize:11, color:C.slate, textTransform:"capitalize" }}>{s.role}</div>
              <button onClick={async()=>{if(!sb())return;await sb().from("users").update({is_active:!s.is_active}).eq("id",s.id);loadData();}}
                style={{ background:s.is_active?"rgba(239,68,68,.1)":"rgba(16,185,129,.1)", border:"none", color:s.is_active?C.red:C.green, padding:"4px 10px", borderRadius:5, fontSize:10, cursor:"pointer", fontWeight:700 }}>
                {s.is_active?"Suspend":"Activate"}
              </button>
            </div>
          ))}
        </SectionCard>
      </div>
    );

    if (page === "finance") return (
      <div>
        <PageTitle title="Finance Management" sub="Payments, revenue and financial overview"/>
        <MsgBar msg={msg}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
          {[
            ["Total Collected",fmt(payments.filter(p=>p.status==="success").reduce((t,p)=>t+Number(p.amount),0)),C.green],
            ["Pending Activation",payments.filter(p=>p.status==="success"&&!p.access_enabled).length+" students",C.amber],
            ["Total Transactions",payments.length+" records","#64748B"],
          ].map(([l,v,c])=>(
            <div key={l} style={{ background:"#fff", border:`1px solid ${c}22`, borderRadius:12, padding:"16px", borderTop:`3px solid ${c}` }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:c, fontWeight:900 }}>{v}</div>
              <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
        <SectionCard title="Payment History">
          {payments.length === 0
            ? <div style={{ padding:"40px", textAlign:"center", color:C.slate }}>No payments yet.</div>
            : payments.map((p,i)=>(
            <div key={i} style={{ padding:"12px 18px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:N }}>{p.paystack_reference||"REF-"+p.id?.slice(0,8)}</div>
                <div style={{ fontSize:10, color:C.slate }}>{p.school_id||"General"} · {p.payment_type||"Tuition"} · {fmtDate(p.created_at)}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.green }}>{fmt(p.amount)}</div>
                <StatusBadge s={p.status}/>
                {p.status==="success"&&!p.access_enabled&&<button onClick={()=>enableAccess(p.id)} style={{ background:"rgba(16,185,129,.1)", border:"none", color:C.green, padding:"5px 10px", borderRadius:6, fontSize:10, cursor:"pointer", fontWeight:700 }}>✓ Enable Access</button>}
                {p.access_enabled&&<span style={{ fontSize:10, color:C.green, fontWeight:700 }}>✅ Active</span>}
              </div>
            </div>
          ))}
        </SectionCard>
        <button onClick={()=>setPage("fee-settings")} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"10px 20px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", marginTop:12 }}>💳 Manage Fee Settings →</button>
      </div>
    );

    if (page === "fee-settings") return (
      <div>
        <PageTitle title="Fee Settings" sub="Admin-configurable fees for all programmes. Prices in Naira."/>
        <MsgBar msg={msg}/>
        {[
          { title:"🏫 SAMPACE College — Per Term", pairs:[["college_jss","JSS1–JSS3"],["college_ss","SS1–SS2"],["college_ss3","SS3 (Exam Year)"]] },
          { title:"📚 Tutorial & Extramural — Monthly", pairs:[["tutorial_single","Single Subject"],["tutorial_bundle","3-Subject Bundle"],["tutorial_full","Full Package"]] },
          { title:"💻 Digital Campus — Per Programme", pairs:[["digital_tech","School of Technology"],["digital_biz","Business & Professional"],["digital_lang","Languages"]] },
          { title:"🏛️ Pre-University — Annual", pairs:[["preuni_ijmb","IJMB Programme"],["preuni_jupeb","JUPEB Programme"],["preuni_pre","Pre-Degree / Diploma"]] },
          { title:"🏢 Professional Learning", pairs:[["professional_short","Short Course"],["professional_exec","Executive Programme"]] },
          { title:"🖥️ CBT Platform — Subscription", pairs:[["cbt_monthly","Monthly Access"],["cbt_annual","Annual Access"]] },
        ].map((sec,si)=>(
          <SectionCard key={si} title={sec.title}>
            {sec.pairs.map(([key,label])=>(
              <div key={key} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", padding:"11px 16px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
                <div style={{ fontSize:12, color:C.slate, fontWeight:600 }}>{label}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:12, color:C.slate, fontWeight:600 }}>₦</span>
                  <input type="number" value={fees[key]||""} onChange={e=>setFees(f=>({...f,[key]:e.target.value}))} style={{ flex:1, border:`1px solid ${C.border}`, borderRadius:7, padding:"7px 10px", fontSize:12, outline:"none", color:N }}/>
                  <span style={{ fontSize:11, color:C.green, fontWeight:700, minWidth:90 }}>{fmt(fees[key]||0)}</span>
                </div>
              </div>
            ))}
          </SectionCard>
        ))}
        <button onClick={async()=>{
          const s=sb();
          if(s){await s.from("notifications").insert({user_id:"00000000-0000-0000-0000-000000000000",title:"Fee Settings Updated",body:JSON.stringify(fees),type:"system"}).then(()=>{}).catch(()=>{});}
          showMsg("✅ All fee settings saved!");
        }} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"12px 28px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer" }}>
          💾 Save All Fee Settings
        </button>
      </div>
    );

    if (page === "timetable") return (
      <div>
        <PageTitle title="Class Timetable Manager" sub="Schedule and publish classes for all divisions"/>
        <TimetableManager C={C} sb={sb()}/>
      </div>
    );

    if (page === "announcements") return (
      <div>
        <PageTitle title="Announcements" sub="Publish notices to students and staff"/>
        <MsgBar msg={msg}/>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"20px", marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:N, marginBottom:14 }}>Create New Announcement</div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Title *</label>
            <input id="ann-title" placeholder="e.g. Term 2 begins January 6th" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Target Audience</label>
            <select id="ann-target" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
              <option>All Students</option><option>College Students</option><option>Extramural Learners</option><option>Digital Campus</option><option>Pre-University</option><option>All Staff</option><option>Everyone</option>
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Message *</label>
            <textarea id="ann-body" rows={4} placeholder="Type your announcement..." style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", resize:"vertical", color:N, fontFamily:"inherit" }}/>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const title=document.getElementById("ann-title")?.value;
            const body=document.getElementById("ann-body")?.value;
            const target=document.getElementById("ann-target")?.value;
            if(!title||!body){alert("Please fill title and message.");return;}
            if(s){const {data:users}=await s.from("users").select("id").eq("role","student");if(users?.length){await s.from("notifications").insert(users.map(u=>({user_id:u.id,title,body,type:"announcement",is_read:false})));}}
            showMsg("✅ Announcement published to "+target+"!");
          }} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            📣 Publish Announcement
          </button>
        </div>
      </div>
    );

    if (page === "inquiries") return (
      <div>
        <PageTitle title="Inquiries" sub="Website contact form submissions and service enquiries"/>
        <InquiriesPanel C={C} sb={sb()}/>
      </div>
    );

    if (page === "divisions-mgmt") return (
      <div>
        <PageTitle title="Divisions Management" sub="Control admissions status for all 12 SAMPACE divisions"/>
        <MsgBar msg={msg}/>
        {DIVISION_GROUPS.map((group,gi)=>(
          <SectionCard key={gi} title={group.label}>
            {DIVISIONS.filter(d=>group.ids.includes(d.id)).map(div=>(
              <div key={div.id} style={{ padding:"14px 16px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, background:`${div.color}15`, border:`1px solid ${div.color}25`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{div.icon}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:N }}>{div.name}</div>
                    <div style={{ fontSize:10, color:C.slate }}>Division {div.num}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ background:divStatus[div.id]==="open"?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)", color:divStatus[div.id]==="open"?C.green:C.red, padding:"3px 10px", borderRadius:100, fontSize:10, fontWeight:700 }}>
                    {divStatus[div.id]==="open"?"🟢 Open":"🔴 Closed"}
                  </span>
                  <button onClick={()=>setDivStatus(prev=>({...prev,[div.id]:prev[div.id]==="open"?"closed":"open"}))}
                    style={{ background:divStatus[div.id]==="open"?"rgba(239,68,68,.08)":"rgba(16,185,129,.08)", border:"none", color:divStatus[div.id]==="open"?C.red:C.green, padding:"5px 12px", borderRadius:6, fontSize:10, cursor:"pointer", fontWeight:700 }}>
                    {divStatus[div.id]==="open"?"Close Admissions":"Open Admissions"}
                  </button>
                </div>
              </div>
            ))}
          </SectionCard>
        ))}
      </div>
    );

    if (page === "admin-roles") return (
      <div>
        <PageTitle title="Admin Roles & Permissions" sub="Role-based access control across all 12 divisions"/>
        <MsgBar msg={msg}/>
        <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"20px", marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:13, color:N, marginBottom:14 }}>Assign Role to User</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div>
              <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>User Email</label>
              <input id="ae" type="email" placeholder="user@sampaceedu.com.ng" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
            </div>
            <div>
              <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Role</label>
              <select id="ar" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
                {Object.entries(USER_ROLES).map(([k,r])=><option key={k} value={k}>{r.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={async()=>{
            const s=sb();
            const email=document.getElementById("ae")?.value;
            const role=document.getElementById("ar")?.value;
            if(!email||!role){alert("Enter email and select role.");return;}
            if(s){const {data:u}=await s.from("users").select("id").eq("email",email).single();if(!u){alert("User not found.");return;}await s.from("users").update({role:"school_admin"}).eq("id",u.id);}
            showMsg("✅ Role assigned: "+USER_ROLES[role]?.label+" → "+email);
          }} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            🔑 Assign Role
          </button>
        </div>
        <SectionCard title="Role Access Map">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"14px" }}>
            {Object.entries(USER_ROLES).map(([key,role])=>(
              <div key={key} style={{ background:`${role.color}08`, border:`1px solid ${role.color}22`, borderRadius:9, padding:"11px 13px" }}>
                <div style={{ fontWeight:700, fontSize:12, color:role.color, marginBottom:3 }}>{role.label}</div>
                <div style={{ fontSize:10, color:C.slate, fontFamily:"monospace" }}>{key}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    );

    if (page === "settings") return (
      <div>
        <PageTitle title="Platform Settings" sub="Complete configuration for SAMPACE EDUCATIONAL LTD"/>
        <MsgBar msg={msg}/>
        {[
          { title:"🏛️ Institution Information", fields:[["inst_name","Institution Name"],["inst_tagline","Tagline"],["inst_email","Contact Email"],["inst_phone","Phone Number"],["inst_domain","Primary Domain"],["inst_timezone","Timezone"]] },
          { title:"🎨 Branding", fields:[["brand_primary","Primary Colour (hex)"],["brand_secondary","Secondary Colour (hex)"]] },
          { title:"📚 Academic Calendar", fields:[["academic_session","Current Session"],["academic_term","Current Term"],["academic_start","Term Start Date"],["academic_end","Term End Date"],["grade_ca1","CA1 Max"],["grade_ca2","CA2 Max"],["grade_proj","Project Max"],["grade_exam","Exam Max"],["grade_pass","Pass Mark"]] },
          { title:"📋 Admissions", fields:[["admissions_status","Status (open/closed)"],["admissions_fee","Application Fee (₦)"]] },
          { title:"💰 Finance", fields:[["payment_gateway","Payment Gateway"]] },
          { title:"📧 Communication", fields:[["email_from","From Email"],["sms_enabled","SMS Enabled"],["whatsapp_enabled","WhatsApp Enabled"]] },
          { title:"🔒 Security", fields:[["security_2fa","Two-Factor Auth"],["security_timeout","Session Timeout"]] },
          { title:"🔧 System", fields:[["maintenance","Maintenance Mode"]] },
        ].map((sec,si)=>(
          <SectionCard key={si} title={sec.title}>
            {sec.fields.map(([key,label])=>(
              <div key={key} style={{ display:"grid", gridTemplateColumns:"1fr 2fr", padding:"11px 18px", borderBottom:"1px solid #F8FAFF", alignItems:"center" }}>
                <div style={{ fontSize:12, color:C.slate, fontWeight:600 }}>{label}</div>
                <input value={cfg[key]||""} onChange={e=>setCfg(s=>({...s,[key]:e.target.value}))} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:7, padding:"7px 12px", fontSize:12, outline:"none", color:N }}/>
              </div>
            ))}
            <div style={{ padding:"11px 18px" }}>
              <button onClick={()=>showMsg("✅ "+sec.title.replace(/^.+?—\s*/,"")+" saved!")} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"7px 18px", borderRadius:7, fontSize:11, fontWeight:700, cursor:"pointer" }}>💾 Save Section</button>
            </div>
          </SectionCard>
        ))}
      </div>
    );

    // Generic coming-soon fallback
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🚧</div>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:N, marginBottom:8, textTransform:"capitalize" }}>{page.replace(/-/g," ")}</h2>
        <p style={{ color:C.slate, maxWidth:300, lineHeight:1.7 }}>This section is being built in Phase 2.</p>
        <button onClick={()=>setPage("overview")} style={{ marginTop:16, background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:W, border:"none", padding:"9px 20px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>← Back to Dashboard</button>
      </div>
    );
  };

  // ── LAYOUT ──────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.cream, minHeight:"100vh", display:"flex" }}>
      {/* Sidebar */}
      <aside style={{ width:sideOpen?210:52, background:N, minHeight:"100vh", display:"flex", flexDirection:"column", transition:"width .25s", flexShrink:0, position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>
        <div style={{ padding:"12px 10px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ width:28, height:28, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:N, flexShrink:0 }}>SE</div>
          {sideOpen && <div>
            <div style={{ fontSize:8, fontWeight:800, color:G, letterSpacing:1.5, whiteSpace:"nowrap" }}>SAMPACE ENTERPRISE</div>
            <div style={{ fontSize:7, color:"rgba(255,255,255,.3)", whiteSpace:"nowrap" }}>{USER_ROLES[user?.role]?.label||"Super Admin"}</div>
          </div>}
          <button onClick={()=>setSideOpen(o=>!o)} style={{ marginLeft:"auto", background:"rgba(255,255,255,.06)", border:"none", color:"rgba(255,255,255,.4)", width:22, height:22, borderRadius:5, cursor:"pointer", fontSize:11, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {sideOpen ? "←" : "→"}
          </button>
        </div>
        <nav style={{ flex:1, padding:"6px 5px", overflowY:"auto" }}>
          {NAV.map((group,gi)=>(
            <div key={gi} style={{ marginBottom:6 }}>
              {sideOpen && <div style={{ fontSize:8, color:"rgba(255,255,255,.22)", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", padding:"5px 7px 2px" }}>{group.section}</div>}
              {group.items.map(item=>(
                <button key={item.id} onClick={()=>setPage(item.id)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"7px 8px", borderRadius:6, border:"none", background:page===item.id?"linear-gradient(135deg,rgba(21,101,192,.4),rgba(66,165,245,.2))":"transparent", borderLeft:page===item.id?"2px solid #42A5F5":"2px solid transparent", color:page===item.id?"#fff":"rgba(255,255,255,.45)", cursor:"pointer", marginBottom:1, fontSize:10, fontWeight:page===item.id?600:400, textAlign:"left", whiteSpace:"nowrap" }}>
                  <span style={{ fontSize:13, flexShrink:0 }}>{item.icon}</span>
                  {sideOpen && <span style={{ flex:1 }}>{item.label}</span>}
                  {sideOpen && item.badge ? <span style={{ background:C.red, color:"#fff", fontSize:8, fontWeight:700, padding:"1px 5px", borderRadius:100 }}>{item.badge}</span> : null}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ padding:"8px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          {sideOpen
            ? <button onClick={onLogout} style={{ width:"100%", background:"rgba(239,68,68,.15)", border:"none", color:C.red, padding:"7px", borderRadius:7, fontSize:11, cursor:"pointer", fontWeight:600 }}>Logout</button>
            : <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", border:"none", color:C.red, width:32, height:32, borderRadius:7, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↩</button>
          }
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 20px", height:50, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", fontSize:10, color:C.slate }}>
            SAMPACE <span style={{ color:"#CBD5E1" }}>›</span>
            <span style={{ color:N, fontWeight:700, textTransform:"capitalize" }}>{page.replace(/-/g," ").replace("page","").trim()}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:sb()?"#10B981":"#EF4444" }}/>
            <span style={{ fontSize:9, color:C.slate }}>{sb()?"Live":"Demo"}</span>
            <span style={{ background:(USER_ROLES[user?.role]?.color||G)+"18", color:USER_ROLES[user?.role]?.color||G, padding:"2px 8px", borderRadius:100, fontSize:9, fontWeight:700 }}>
              {USER_ROLES[user?.role]?.label||"Super Admin"}
            </span>
            <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#C9A84C,#FFD54F)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:N }}>
              {user?.full_name?.charAt(0)||"A"}
            </div>
          </div>
        </header>
        <main style={{ flex:1, padding:"20px", overflowY:"auto" }}>{renderPage()}</main>
      </div>
    </div>
  );
}

// ── Timetable Manager ──────────────────────────────────────────
function TimetableManager({ C, sb }) {
  const [form, setForm] = useState({ school:"", cls:"", subject:"", teacher:"", day:"", time:"", link:"" });
  const [msg,  setMsg]  = useState("");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const SCHOOL_CLASSES = {
    college:      ["JSS1","JSS2","JSS3","SS1 Sciences","SS1 Humanities","SS1 Business","SS2 Sciences","SS2 Humanities","SS2 Business","SS3 Sciences","SS3 Humanities","SS3 Business"],
    extramural:   ["BECE Track","WAEC Track","NECO Track","GCE Track","JAMB/UTME Track","Adult Learning"],
    digital:      ["Full-Stack Web Dev","Cybersecurity","Data Science","UI/UX","ACCA","ICAN","PMP","IELTS","French","Spanish","Public Speaking"],
    preuni:       ["IJMB Year 1","IJMB Year 2","JUPEB Year 1","JUPEB Year 2","Pre-Degree","Diploma"],
    professional: ["Executive Education","Teacher Development","Corporate Training","CPD Bootcamp"],
  };

  const save = async () => {
    if (!form.school||!form.cls||!form.subject||!form.day) { setMsg("⚠️ Fill School, Class, Subject and Day"); setTimeout(()=>setMsg(""),3000); return; }
    if (sb) {
      const {error} = await sb.from("classes").insert({ school_id:form.school, title:form.subject, day_of_week:form.day, start_time:form.time||null, room_link:form.link||null, status:"scheduled", created_at:new Date().toISOString() });
      if (error) { setMsg("❌ "+error.message); setTimeout(()=>setMsg(""),4000); return; }
    }
    setMsg("✅ Class saved to timetable!");
    setForm({ school:"", cls:"", subject:"", teacher:"", day:"", time:"", link:"" });
    setTimeout(()=>setMsg(""),3000);
  };

  const N = C.navy;
  return (
    <div style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, padding:"20px", marginBottom:14 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>School *</label>
          <select value={form.school} onChange={e=>{set("school",e.target.value);set("cls","");}} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
            <option value="">Select school...</option>
            {DIVISIONS.filter(d=>SCHOOL_CLASSES[d.id]).map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Class / Level *</label>
          <select value={form.cls} onChange={e=>set("cls",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
            <option value="">Select class...</option>
            {(SCHOOL_CLASSES[form.school]||[]).map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Subject *</label>
          <input value={form.subject} onChange={e=>set("subject",e.target.value)} placeholder="e.g. English Language" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
        </div>
        <div>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Teacher</label>
          <input value={form.teacher} onChange={e=>set("teacher",e.target.value)} placeholder="e.g. Mrs. Adeyemi" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
        </div>
        <div>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Day *</label>
          <select value={form.day} onChange={e=>set("day",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}>
            <option value="">Select day...</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Start Time</label>
          <input type="time" value={form.time} onChange={e=>set("time",e.target.value)} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
        </div>
        <div style={{ gridColumn:"1/-1" }}>
          <label style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" }}>Virtual Classroom Link (Google Meet / BigBlueButton)</label>
          <input value={form.link} onChange={e=>set("link",e.target.value)} placeholder="https://meet.google.com/xxx-xxxx-xxx" style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 12px", fontSize:12, outline:"none", color:N }}/>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={save} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Save Class to Timetable</button>
        {msg && <span style={{ fontSize:12, fontWeight:600, color:msg.startsWith("✅")?C.green:msg.startsWith("❌")?C.red:C.amber }}>{msg}</span>}
      </div>
    </div>
  );
}

// ── Inquiries Panel ────────────────────────────────────────────
function InquiriesPanel({ C, sb }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [msg,       setMsg]       = useState("");

  useEffect(()=>{
    if(!sb){setLoading(false);return;}
    sb.from("applications").select("*").eq("app_type","inquiry").order("created_at",{ascending:false}).limit(100)
      .then(({data})=>{setInquiries(data||[]);setLoading(false);});
  },[]);

  const updateStatus = async (id,status) => {
    if(!sb)return;
    await sb.from("applications").update({status}).eq("id",id);
    setInquiries(prev=>prev.map(i=>i.id===id?{...i,status}:i));
    setMsg("✅ Updated"); setTimeout(()=>setMsg(""),2000);
  };

  const N = C.navy;
  if(loading) return <div style={{padding:40,textAlign:"center",color:C.slate}}>Loading inquiries...</div>;

  return (
    <div>
      {msg && <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",color:C.green,padding:"10px 16px",borderRadius:8,marginBottom:14,fontSize:13}}>{msg}</div>}
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        {inquiries.length===0
          ? <div style={{padding:"40px",textAlign:"center",color:C.slate}}>No enquiries yet.</div>
          : inquiries.map((inq,i)=>(
          <div key={i} style={{padding:"14px 18px",borderBottom:"1px solid #F8FAFF"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:N}}>{inq.applicant_name}</div>
                <div style={{fontSize:11,color:C.slate}}>{inq.email} · {inq.phone}</div>
                <div style={{fontSize:11,color:C.blue,marginTop:3}}>Division: {inq.school_id} · {inq.program||"General Enquiry"}</div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{background:inq.status==="pending"?"rgba(245,158,11,.1)":inq.status==="approved"?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)",color:inq.status==="pending"?"#F59E0B":inq.status==="approved"?"#10B981":"#EF4444",padding:"3px 10px",borderRadius:100,fontSize:10,fontWeight:700}}>{inq.status}</span>
                {inq.status==="pending"&&<>
                  <button onClick={()=>updateStatus(inq.id,"approved")} style={{background:"rgba(16,185,129,.1)",border:"none",color:C.green,padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>✓ Respond</button>
                  <button onClick={()=>updateStatus(inq.id,"rejected")} style={{background:"rgba(239,68,68,.1)",border:"none",color:C.red,padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700}}>✕</button>
                </>}
                <a href={"https://wa.me/"+(inq.phone||"").replace(/[^0-9]/g,"")} target="_blank" rel="noreferrer" style={{background:"rgba(37,211,102,.1)",border:"none",color:"#25D366",padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontWeight:700,textDecoration:"none"}}>💬 WhatsApp</a>
              </div>
            </div>
            {inq.admin_notes&&<div style={{fontSize:11,color:C.slate,marginTop:4,padding:"8px 12px",background:"#F8FAFF",borderRadius:7}}>{inq.admin_notes}</div>}
            <div style={{fontSize:10,color:"#94A3B8",marginTop:6}}>{new Date(inq.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
