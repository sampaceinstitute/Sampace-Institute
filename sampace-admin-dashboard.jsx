import { useState } from "react";

// ─── MOCK DATA ───
const schools = [
  { id:1, name:"School College",            short:"Secondary School",        emoji:"🎓", color:"#1565C0", light:"#E3F2FD", students:124, pending:8,  revenue:2840000, staff:14, active:true  },
  { id:2, name:"Tutorial & Local Exam",     short:"Exam Prep",               emoji:"📝", color:"#00695C", light:"#E0F2F1", students:89,  pending:12, revenue:1560000, staff:8,  active:true  },
  { id:3, name:"School of Technology",      short:"Tech & Digital",          emoji:"💻", color:"#6A1B9A", light:"#F3E5F5", students:47,  pending:5,  revenue:980000,  staff:5,  active:true  },
  { id:4, name:"Pre-University College",    short:"Pre-Degree",              emoji:"🏛️", color:"#BF360C", light:"#FBE9E7", students:63,  pending:9,  revenue:1920000, staff:9,  active:true  },
  { id:5, name:"Advanced & International",  short:"SAT/IELTS/A-Level",       emoji:"🌍", color:"#880E4F", light:"#FCE4EC", students:38,  pending:3,  revenue:1140000, staff:6,  active:true  },
  { id:6, name:"Business & Professional",   short:"PMP/ACCA/ICAN",           emoji:"📊", color:"#006064", light:"#E0F7FA", students:55,  pending:7,  revenue:2100000, staff:7,  active:true  },
  { id:7, name:"Communication & Diction",   short:"Speech & Comm",           emoji:"🎤", color:"#01579B", light:"#E1F5FE", students:29,  pending:2,  revenue:580000,  staff:4,  active:false },
  { id:8, name:"School of Languages",       short:"Languages",               emoji:"🌐", color:"#311B92", light:"#EDE7F6", students:22,  pending:4,  revenue:440000,  staff:3,  active:false },
  { id:9, name:"Professional Services",     short:"Consulting",              emoji:"🤝", color:"#F57F17", light:"#FFFDE7", students:0,   pending:15, revenue:620000,  staff:2,  active:true  },
];

const recentApplications = [
  { id:"APP-2601", name:"Adaeze Okonkwo",   school:"School College",           program:"JSS1",        date:"Today, 9:14am",   status:"pending"  },
  { id:"APP-2600", name:"Emeka Nwosu",      school:"Tutorial & Local Exam",    program:"WAEC Track",  date:"Today, 8:52am",   status:"approved" },
  { id:"APP-2599", name:"Fatima Abdullahi", school:"Business & Professional",  program:"ACCA",        date:"Yesterday",       status:"pending"  },
  { id:"APP-2598", name:"David Adeleke",    school:"Pre-University College",   program:"IJMB",        date:"Yesterday",       status:"approved" },
  { id:"APP-2597", name:"Grace Obi",        school:"Advanced & International", program:"IELTS Prep",  date:"2 days ago",      status:"rejected" },
  { id:"APP-2596", name:"Yusuf Musa",       school:"School of Technology",     program:"Cybersecurity",date:"2 days ago",     status:"pending"  },
  { id:"APP-2595", name:"Chioma Eze",       school:"School College",           program:"SS2 Science", date:"3 days ago",      status:"approved" },
  { id:"APP-2594", name:"Ibrahim Suleiman", school:"Professional Services",    program:"CV Writing",  date:"3 days ago",      status:"pending"  },
];

const recentPayments = [
  { name:"Emeka Nwosu",      amount:45000,  school:"Tutorial & Exam",    date:"Today",      type:"Tuition"       },
  { name:"David Adeleke",    amount:120000, school:"Pre-University",      date:"Today",      type:"Tuition"       },
  { name:"Chioma Eze",       amount:85000,  school:"School College",      date:"Yesterday",  type:"Registration"  },
  { name:"Amina Hassan",     amount:65000,  school:"Business & Prof",     date:"Yesterday",  type:"Course Fee"    },
  { name:"Tunde Bakare",     amount:55000,  school:"Advanced & Intl",     date:"2 days ago", type:"Tuition"       },
];

const staffList = [
  { name:"Mrs. Ngozi Adeyemi",  role:"School Admin",      school:"School College",         status:"online"  },
  { name:"Mr. Chidi Okafor",    role:"Class Teacher",     school:"School College",         status:"online"  },
  { name:"Miss Kemi Lawson",    role:"Tutor/Coordinator", school:"Tutorial & Exam",        status:"away"    },
  { name:"Dr. Bello Usman",     role:"Lecturer",          school:"Pre-University College", status:"online"  },
  { name:"Mr. Segun Adebayo",   role:"Tech Instructor",   school:"School of Technology",   status:"offline" },
  { name:"Mrs. Zainab Yusuf",   role:"Bursar",            school:"School College",         status:"online"  },
];

const navItems = [
  { id:"overview",      label:"Overview",         icon:"⊞"  },
  { id:"schools",       label:"All Schools",      icon:"🏫"  },
  { id:"applications",  label:"Applications",     icon:"📋", badge:65 },
  { id:"students",      label:"Students",         icon:"👥"  },
  { id:"staff",         label:"Staff",            icon:"👔"  },
  { id:"finance",       label:"Finance",          icon:"💰"  },
  { id:"content",       label:"Content & LMS",    icon:"📚"  },
  { id:"cbte",          label:"CBT & Exams",      icon:"📝"  },
  { id:"inquiries",     label:"Inquiries",        icon:"💬", badge:23 },
  { id:"announcements", label:"Announcements",    icon:"📣"  },
  { id:"settings",      label:"Settings",         icon:"⚙️"  },
];

const statusColor = { pending:"#F59E0B", approved:"#10B981", rejected:"#EF4444" };
const statusBg    = { pending:"rgba(245,158,11,0.12)", approved:"rgba(16,185,129,0.12)", rejected:"rgba(239,68,68,0.12)" };

function fmt(n) { return "₦" + n.toLocaleString(); }

// ─── MINI CHART ───
function MiniBar({ values, color }) {
  const max = Math.max(...values);
  return (
    <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:36 }}>
      {values.map((v,i) => (
        <div key={i} style={{ flex:1, height:`${(v/max)*100}%`, background:i===values.length-1?color:`${color}55`, borderRadius:"2px 2px 0 0", minHeight:3, transition:"height .4s ease" }} />
      ))}
    </div>
  );
}

// ─── STAT CARD ───
function StatCard({ icon, label, value, sub, color, chart }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      background: hov ? "#fff" : "#FAFBFF",
      border:`1px solid ${hov ? color+"40" : "#E8ECF4"}`,
      borderRadius:12, padding:"22px 24px",
      transition:"all .25s ease",
      boxShadow: hov ? `0 8px 32px ${color}18` : "0 1px 4px rgba(0,0,0,0.04)",
      cursor:"default",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{ width:42, height:42, borderRadius:10, background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{icon}</div>
        {chart && <MiniBar values={chart} color={color} />}
      </div>
      <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color:"#0B1F3A", letterSpacing:1, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:13, color:"#64748B", marginTop:4 }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:color, marginTop:4, fontWeight:600 }}>{sub}</div>}
    </div>
  );
}

// ─── SCHOOL ROW ───
function SchoolRow({ s, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onSelect(s)}
      style={{
        display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 1fr 1fr",
        gap:0, padding:"14px 20px",
        background: hov ? `${s.color}06` : "transparent",
        borderBottom:"1px solid #F1F4F9",
        cursor:"pointer", transition:"background .2s",
        alignItems:"center",
      }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:36, height:36, borderRadius:8, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{s.emoji}</div>
        <div>
          <div style={{ fontWeight:600, fontSize:13, color:"#0B1F3A" }}>{s.name}</div>
          <div style={{ fontSize:11, color:"#94A3B8" }}>{s.short}</div>
        </div>
      </div>
      <div style={{ fontSize:13, color:"#0B1F3A", fontWeight:600 }}>{s.students}</div>
      <div style={{ fontSize:13, color:"#F59E0B", fontWeight:600 }}>{s.pending}</div>
      <div style={{ fontSize:13, color:"#0B1F3A" }}>{s.staff}</div>
      <div style={{ fontSize:13, color:"#0B1F3A", fontWeight:600 }}>{fmt(s.revenue)}</div>
      <div>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:5,
          background: s.active ? "rgba(16,185,129,0.1)" : "rgba(148,163,184,0.15)",
          color: s.active ? "#10B981" : "#94A3B8",
          padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600,
        }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"currentColor", display:"inline-block" }} />
          {s.active ? "Active" : "Setup"}
        </span>
      </div>
    </div>
  );
}

// ─── SCHOOL DETAIL MODAL ───
function SchoolModal({ school, onClose }) {
  if (!school) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:560, maxHeight:"85vh", overflow:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.2)" }}>
        <div style={{ background:`linear-gradient(135deg, ${school.color}, ${school.color}99)`, padding:"28px 32px", borderRadius:"16px 16px 0 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:36, marginBottom:8 }}>{school.emoji}</div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:"#fff", letterSpacing:2 }}>{school.name}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.7)", marginTop:2 }}>{school.short}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        <div style={{ padding:"28px 32px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
            {[
              ["👥 Students", school.students],
              ["⏳ Pending", school.pending],
              ["👔 Staff", school.staff],
              ["💰 Revenue", fmt(school.revenue)],
            ].map(([l,v])=>(
              <div key={l} style={{ background:"#F8FAFF", borderRadius:10, padding:"16px", border:`1px solid ${school.color}20` }}>
                <div style={{ fontSize:12, color:"#64748B", marginBottom:4 }}>{l}</div>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:28, color:school.color, letterSpacing:1 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {["View Students","View Staff","Manage Content","Fee Structure","Announcements"].map(a=>(
              <button key={a} style={{ background:`${school.color}12`, border:`1px solid ${school.color}30`, color:school.color, padding:"8px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OVERVIEW PAGE ───
function OverviewPage({ setPage }) {
  const totalStudents = schools.reduce((a,s)=>a+s.students,0);
  const totalPending  = schools.reduce((a,s)=>a+s.pending,0);
  const totalRevenue  = schools.reduce((a,s)=>a+s.revenue,0);
  const totalStaff    = schools.reduce((a,s)=>a+s.staff,0);

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom:28, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:"#0B1F3A", marginBottom:4 }}>Good morning, <em style={{color:"#1565C0",fontStyle:"italic"}}>Super Admin</em> 👋</h1>
          <div style={{ fontSize:13, color:"#94A3B8" }}>Monday, 18 May 2026 · SAMPACE INSTITUTE Command Centre</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{ background:"#fff", border:"1px solid #E2E8F0", color:"#0B1F3A", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer" }}>📥 Export Report</button>
          <button style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", border:"none", padding:"9px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 16px rgba(21,101,192,0.3)" }}>+ Add Student</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard icon="👥" label="Total Students" value={totalStudents} sub="↑ 12 this week" color="#1565C0" chart={[60,75,80,90,95,110,124]} />
        <StatCard icon="⏳" label="Pending Applications" value={totalPending} sub="Needs review" color="#F59E0B" chart={[20,35,28,42,55,60,65]} />
        <StatCard icon="💰" label="Total Revenue" value={fmt(totalRevenue)} sub="↑ 8% vs last month" color="#10B981" chart={[400,520,610,700,780,850,962]} />
        <StatCard icon="👔" label="Total Staff" value={totalStaff} sub="Across all schools" color="#8B5CF6" chart={[10,12,14,16,18,20,22]} />
      </div>

      {/* Schools Quick View + Recent Activity */}
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:20, marginBottom:20 }}>
        {/* Schools summary */}
        <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"18px 20px", borderBottom:"1px solid #F1F4F9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#0B1F3A" }}>Schools Overview</div>
            <button onClick={()=>setPage("schools")} style={{ fontSize:12, color:"#1565C0", border:"none", background:"none", cursor:"pointer", fontWeight:600 }}>View All →</button>
          </div>
          {schools.slice(0,6).map(s=>(
            <div key={s.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 20px", borderBottom:"1px solid #F8FAFF" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:30, height:30, borderRadius:7, background:`${s.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{s.emoji}</div>
                <div style={{ fontSize:13, fontWeight:500, color:"#0B1F3A" }}>{s.name}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ fontSize:12, color:"#64748B" }}><span style={{ fontWeight:700, color:"#0B1F3A" }}>{s.students}</span> students</div>
                {s.pending > 0 && <span style={{ background:"rgba(245,158,11,0.12)", color:"#F59E0B", padding:"2px 8px", borderRadius:100, fontSize:11, fontWeight:600 }}>{s.pending} pending</span>}
                <span style={{ width:7, height:7, borderRadius:"50%", background:s.active?"#10B981":"#CBD5E1", display:"inline-block" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent payments */}
        <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"18px 20px", borderBottom:"1px solid #F1F4F9", display:"flex", justifyContent:"space-between" }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#0B1F3A" }}>Recent Payments</div>
            <button onClick={()=>setPage("finance")} style={{ fontSize:12, color:"#1565C0", border:"none", background:"none", cursor:"pointer", fontWeight:600 }}>View All →</button>
          </div>
          {recentPayments.map((p,i)=>(
            <div key={i} style={{ padding:"13px 20px", borderBottom:"1px solid #F8FAFF", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#0B1F3A" }}>{p.name}</div>
                <div style={{ fontSize:11, color:"#94A3B8" }}>{p.school} · {p.type}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#10B981" }}>{fmt(p.amount)}</div>
                <div style={{ fontSize:11, color:"#94A3B8" }}>{p.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applications + Staff Online */}
      <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:20 }}>
        <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"18px 20px", borderBottom:"1px solid #F1F4F9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#0B1F3A" }}>Recent Applications</div>
            <button onClick={()=>setPage("applications")} style={{ fontSize:12, color:"#1565C0", border:"none", background:"none", cursor:"pointer", fontWeight:600 }}>View All →</button>
          </div>
          <div style={{ padding:"0 20px" }}>
            {recentApplications.slice(0,5).map(a=>(
              <div key={a.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #F8FAFF" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,#1565C0,#42A5F5)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>{a.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#0B1F3A" }}>{a.name}</div>
                    <div style={{ fontSize:11, color:"#94A3B8" }}>{a.school} · {a.program}</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ fontSize:11, color:"#94A3B8" }}>{a.date}</div>
                  <span style={{ background:statusBg[a.status], color:statusColor[a.status], padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600, textTransform:"capitalize" }}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff online */}
        <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"18px 20px", borderBottom:"1px solid #F1F4F9" }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#0B1F3A" }}>Staff Activity</div>
          </div>
          {staffList.map((s,i)=>(
            <div key={i} style={{ padding:"12px 20px", borderBottom:"1px solid #F8FAFF", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ position:"relative" }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#0B1F3A" }}>{s.name.charAt(0)}</div>
                <div style={{ position:"absolute", bottom:0, right:0, width:9, height:9, borderRadius:"50%", background:s.status==="online"?"#10B981":s.status==="away"?"#F59E0B":"#CBD5E1", border:"2px solid #fff" }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#0B1F3A", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.name}</div>
                <div style={{ fontSize:11, color:"#94A3B8" }}>{s.role}</div>
              </div>
              <div style={{ fontSize:10, color:s.status==="online"?"#10B981":s.status==="away"?"#F59E0B":"#94A3B8", fontWeight:600, textTransform:"capitalize" }}>{s.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ALL SCHOOLS PAGE ───
function SchoolsPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"#0B1F3A" }}>All Schools</h2>
          <div style={{ fontSize:13, color:"#94A3B8" }}>9 schools · {schools.filter(s=>s.active).length} active · {schools.filter(s=>!s.active).length} in setup</div>
        </div>
        <button style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", border:"none", padding:"9px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>+ Add New School</button>
      </div>

      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {schools.slice(0,3).map(s=>(
          <div key={s.id} onClick={()=>setSelected(s)} style={{ background:"#fff", border:`1px solid ${s.color}25`, borderRadius:12, padding:"20px", cursor:"pointer", transition:"all .25s", borderTop:`3px solid ${s.color}` }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}20`}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <div style={{ fontSize:28 }}>{s.emoji}</div>
              <span style={{ background:s.active?"rgba(16,185,129,0.1)":"rgba(148,163,184,0.1)", color:s.active?"#10B981":"#94A3B8", padding:"2px 10px", borderRadius:100, fontSize:11, fontWeight:600 }}>{s.active?"Active":"Setup"}</span>
            </div>
            <div style={{ fontWeight:700, fontSize:14, color:"#0B1F3A", marginBottom:2 }}>{s.name}</div>
            <div style={{ fontSize:12, color:"#94A3B8", marginBottom:12 }}>{s.short}</div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:22, color:s.color }}>{s.students}</div>
                <div style={{ fontSize:10, color:"#94A3B8" }}>Students</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:22, color:"#F59E0B" }}>{s.pending}</div>
                <div style={{ fontSize:10, color:"#94A3B8" }}>Pending</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:22, color:"#10B981" }}>{s.staff}</div>
                <div style={{ fontSize:10, color:"#94A3B8" }}>Staff</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 1fr 1fr", padding:"12px 20px", background:"#F8FAFF", borderBottom:"2px solid #E8ECF4" }}>
          {["School","Students","Pending","Staff","Revenue","Status"].map(h=>(
            <div key={h} style={{ fontSize:11, fontWeight:700, color:"#64748B", letterSpacing:1, textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
        {schools.map(s=><SchoolRow key={s.id} s={s} onSelect={setSelected} />)}
      </div>
      <SchoolModal school={selected} onClose={()=>setSelected(null)} />
    </div>
  );
}

// ─── APPLICATIONS PAGE ───
function ApplicationsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = recentApplications.filter(a =>
    (filter === "all" || a.status === filter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.school.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"#0B1F3A" }}>Applications</h2>
          <div style={{ fontSize:13, color:"#94A3B8" }}>65 total applications across all schools</div>
        </div>
        <button style={{ background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", border:"none", padding:"9px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>📥 Export CSV</button>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[["All","all","#1565C0",65],["Pending","pending","#F59E0B",38],["Approved","approved","#10B981",20],["Rejected","rejected","#EF4444",7]].map(([l,f,c,n])=>(
          <div key={f} onClick={()=>setFilter(f)} style={{ background: filter===f?c:"#fff", border:`1px solid ${filter===f?c:c+"30"}`, borderRadius:10, padding:"16px 20px", cursor:"pointer", transition:"all .2s", color:filter===f?"#fff":c }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:32, letterSpacing:1 }}>{n}</div>
            <div style={{ fontSize:12, fontWeight:600, opacity:filter===f?1:0.8 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom:16 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search by name or school..." style={{ width:"100%", maxWidth:400, background:"#fff", border:"1px solid #E2E8F0", borderRadius:8, padding:"10px 16px", fontSize:13, outline:"none", color:"#0B1F3A" }} />
      </div>

      {/* Table */}
      <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"0.5fr 2fr 2fr 1.5fr 1fr 1fr", padding:"12px 20px", background:"#F8FAFF", borderBottom:"2px solid #E8ECF4" }}>
          {["ID","Applicant","School","Program","Date","Status"].map(h=>(
            <div key={h} style={{ fontSize:11, fontWeight:700, color:"#64748B", letterSpacing:1, textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
        {filtered.map(a=>(
          <div key={a.id} style={{ display:"grid", gridTemplateColumns:"0.5fr 2fr 2fr 1.5fr 1fr 1fr", padding:"14px 20px", borderBottom:"1px solid #F1F4F9", alignItems:"center" }}>
            <div style={{ fontSize:12, color:"#94A3B8", fontFamily:"monospace" }}>{a.id}</div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#1565C0,#42A5F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>{a.name.charAt(0)}</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#0B1F3A" }}>{a.name}</div>
            </div>
            <div style={{ fontSize:12, color:"#64748B" }}>{a.school}</div>
            <div style={{ fontSize:12, color:"#64748B" }}>{a.program}</div>
            <div style={{ fontSize:12, color:"#94A3B8" }}>{a.date}</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ background:statusBg[a.status], color:statusColor[a.status], padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600, textTransform:"capitalize" }}>{a.status}</span>
              {a.status === "pending" && (
                <div style={{ display:"flex", gap:4 }}>
                  <button style={{ background:"rgba(16,185,129,0.1)", border:"none", color:"#10B981", padding:"3px 8px", borderRadius:4, fontSize:11, cursor:"pointer", fontWeight:600 }}>✓</button>
                  <button style={{ background:"rgba(239,68,68,0.1)", border:"none", color:"#EF4444", padding:"3px 8px", borderRadius:4, fontSize:11, cursor:"pointer", fontWeight:600 }}>✕</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}>No applications found</div>
        )}
      </div>
    </div>
  );
}

// ─── FINANCE PAGE ───
function FinancePage() {
  const total = schools.reduce((a,s)=>a+s.revenue,0);
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"#0B1F3A" }}>Finance & Revenue</h2>
        <div style={{ fontSize:13, color:"#94A3B8" }}>All schools combined financial overview</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        <StatCard icon="💰" label="Total Revenue (All Schools)" value={fmt(total)} sub="May 2026" color="#10B981" chart={[300,420,510,600,680,750,960]} />
        <StatCard icon="📈" label="This Month" value={fmt(962000)} sub="↑ 8% vs April" color="#1565C0" chart={[80,90,100,110,120,130,140]} />
        <StatCard icon="⏳" label="Outstanding Fees" value={fmt(340000)} sub="38 defaulters" color="#F59E0B" chart={[50,60,45,55,65,70,68]} />
      </div>

      {/* Revenue per school */}
      <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden", marginBottom:20 }}>
        <div style={{ padding:"18px 20px", borderBottom:"1px solid #F1F4F9", fontWeight:700, fontSize:15, color:"#0B1F3A" }}>Revenue by School</div>
        {schools.map(s=>(
          <div key={s.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 20px", borderBottom:"1px solid #F8FAFF" }}>
            <div style={{ fontSize:20 }}>{s.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#0B1F3A" }}>{s.name}</div>
                <div style={{ fontSize:13, fontWeight:700, color:"#0B1F3A" }}>{fmt(s.revenue)}</div>
              </div>
              <div style={{ background:"#F1F4F9", borderRadius:100, height:6, overflow:"hidden" }}>
                <div style={{ width:`${(s.revenue/total)*100}%`, height:"100%", background:`linear-gradient(90deg,${s.color},${s.color}99)`, borderRadius:100, transition:"width 1s ease" }} />
              </div>
            </div>
            <div style={{ fontSize:12, color:"#94A3B8", width:40, textAlign:"right" }}>{Math.round((s.revenue/total)*100)}%</div>
          </div>
        ))}
      </div>

      {/* Recent payments */}
      <div style={{ background:"#fff", border:"1px solid #E8ECF4", borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"18px 20px", borderBottom:"1px solid #F1F4F9", fontWeight:700, fontSize:15, color:"#0B1F3A" }}>Recent Transactions</div>
        {recentPayments.map((p,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px", borderBottom:"1px solid #F8FAFF" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(16,185,129,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>💳</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#0B1F3A" }}>{p.name}</div>
                <div style={{ fontSize:11, color:"#94A3B8" }}>{p.school} · {p.type}</div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:15, fontWeight:700, color:"#10B981" }}>{fmt(p.amount)}</div>
              <div style={{ fontSize:11, color:"#94A3B8" }}>{p.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLACEHOLDER PAGES ───
function PlaceholderPage({ title, icon, desc }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, textAlign:"center" }}>
      <div style={{ fontSize:64, marginBottom:20 }}>{icon}</div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:"#0B1F3A", marginBottom:8 }}>{title}</h2>
      <p style={{ color:"#94A3B8", maxWidth:400, lineHeight:1.7 }}>{desc}</p>
      <div style={{ marginTop:24, padding:"12px 24px", background:"linear-gradient(135deg,#1565C0,#42A5F5)", color:"#fff", borderRadius:8, fontSize:13, fontWeight:600 }}>Coming in Next Build</div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───
export default function AdminDashboard() {
  const [page, setPage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch(page) {
      case "overview":     return <OverviewPage setPage={setPage} />;
      case "schools":      return <SchoolsPage />;
      case "applications": return <ApplicationsPage />;
      case "finance":      return <FinancePage />;
      case "students":     return <PlaceholderPage title="Students" icon="👥" desc="Full student database with search, filter by school, class, status, and performance reports." />;
      case "staff":        return <PlaceholderPage title="Staff Management" icon="👔" desc="Manage all staff across 9 schools — roles, assignments, payroll, and activity logs." />;
      case "content":      return <PlaceholderPage title="Content & LMS" icon="📚" desc="Upload lessons, manage course content, videos, assignments and resources per school." />;
      case "cbte":         return <PlaceholderPage title="CBT & Exams" icon="📝" desc="Question bank management, schedule exams, monthly tests and result management." />;
      case "inquiries":    return <PlaceholderPage title="Inquiries" icon="💬" desc="All email and WhatsApp inquiries from all 9 school portals in one inbox." />;
      case "announcements":return <PlaceholderPage title="Announcements" icon="📣" desc="Send announcements to specific schools, all students, staff, or parents." />;
      case "settings":     return <PlaceholderPage title="Settings" icon="⚙️" desc="Platform settings, school branding, fee structures, academic calendar, user roles." />;
      default:             return <OverviewPage setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#F4F7FF", minHeight:"100vh", display:"flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#F4F7FF;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:2px;}
      `}</style>

      {/* ─── SIDEBAR ─── */}
      <aside style={{
        width: sidebarOpen ? 240 : 64,
        background:"#0B1F3A",
        minHeight:"100vh",
        display:"flex", flexDirection:"column",
        transition:"width .3s cubic-bezier(.4,0,.2,1)",
        flexShrink:0,
        position:"sticky", top:0, height:"100vh",
        overflow:"hidden",
      }}>
        {/* Logo */}
        <div style={{ padding:"20px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <div style={{ width:36, height:36, background:"linear-gradient(135deg,#1565C0,#42A5F5)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue'", fontSize:15, flexShrink:0 }}>SI</div>
          {sidebarOpen && (
            <div style={{ overflow:"hidden" }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:15, letterSpacing:2, background:"linear-gradient(90deg,#64B5F6,#C9A84C)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", whiteSpace:"nowrap" }}>SAMPACE ADMIN</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:1.5, textTransform:"uppercase" }}>Super Admin</div>
            </div>
          )}
          <button onClick={()=>setSidebarOpen(o=>!o)} style={{ marginLeft:"auto", background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.5)", width:28, height:28, borderRadius:6, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto" }}>
          {navItems.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:12,
              padding:"10px 12px", borderRadius:8, border:"none",
              background: page===item.id ? "linear-gradient(135deg,rgba(21,101,192,0.4),rgba(66,165,245,0.2))" : "transparent",
              borderLeft: page===item.id ? "2px solid #42A5F5" : "2px solid transparent",
              color: page===item.id ? "#fff" : "rgba(255,255,255,0.55)",
              cursor:"pointer", transition:"all .2s", marginBottom:2,
              fontSize:13, fontWeight: page===item.id ? 600 : 400,
              textAlign:"left", whiteSpace:"nowrap",
            }}>
              <span style={{ fontSize:16, flexShrink:0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ flex:1 }}>{item.label}</span>}
              {sidebarOpen && item.badge && (
                <span style={{ background:"#EF4444", color:"#fff", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:100, minWidth:18, textAlign:"center" }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom user */}
        <div style={{ padding:"16px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#C9A84C,#FFD54F)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#0B1F3A", flexShrink:0 }}>A</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:"#fff" }}>Super Admin</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>admin@sampacecampus.ng</div>
            </div>
          )}
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {/* Top bar */}
        <header style={{ background:"#fff", borderBottom:"1px solid #E8ECF4", padding:"0 32px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ fontSize:11, color:"#94A3B8" }}>Dashboard</div>
            <div style={{ fontSize:11, color:"#CBD5E1" }}>›</div>
            <div style={{ fontSize:11, color:"#0B1F3A", fontWeight:600, textTransform:"capitalize" }}>{page}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button style={{ background:"#F4F7FF", border:"1px solid #E2E8F0", borderRadius:8, padding:"7px 14px", fontSize:12, color:"#64748B", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              🔍 Search...
            </button>
            <div style={{ position:"relative" }}>
              <button style={{ background:"#F4F7FF", border:"1px solid #E2E8F0", borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>🔔</button>
              <div style={{ position:"absolute", top:6, right:6, width:8, height:8, background:"#EF4444", borderRadius:"50%", border:"2px solid #fff" }} />
            </div>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#C9A84C,#FFD54F)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#0B1F3A", cursor:"pointer" }}>A</div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding:"28px 32px", overflowY:"auto" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
