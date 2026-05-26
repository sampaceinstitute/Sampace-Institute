import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// ─── IMPORT ALL SAMPACE PORTALS ───
// Uncomment each one after uploading the files to GitHub

// import Homepage from './sampace-homepage.jsx'
// import AdminDashboard from './sampace-admin-dashboard.jsx'
// import SchoolCollege from './sampace-school-college.jsx'
// import TutorialPortal from './sampace-tutorial-portal.jsx'
// import PreUniversity from './sampace-pre-university.jsx'
// import CohortSchools from './sampace-schools-3-8.jsx'
// import ProfessionalServices from './sampace-professional-services.jsx'

// ─── TEMPORARY HOME WHILE SETTING UP ───
function TempHome() {
  const schools = [
    { name:"Global Homepage",         path:"/",              emoji:"🌐", color:"#1565C0" },
    { name:"Admin Dashboard",         path:"/admin",         emoji:"⚙️", color:"#0B1F3A" },
    { name:"School College",          path:"/school-college",emoji:"🎓", color:"#1565C0" },
    { name:"Tutorial & Exam",         path:"/tutorial",      emoji:"📝", color:"#00695C" },
    { name:"Pre-University College",  path:"/pre-university",emoji:"🏛️", color:"#BF360C" },
    { name:"Schools 3–8",             path:"/cohort-schools",emoji:"💻", color:"#6A1B9A" },
    { name:"Professional Services",   path:"/services",      emoji:"🤝", color:"#F57F17" },
  ];

  return (
    <div style={{ fontFamily:"sans-serif", background:"#0B1F3A", minHeight:"100vh", padding:"48px 32px" }}>
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
        {/* Logo */}
        <div style={{ width:72, height:72, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:900, color:"#0B1F3A", margin:"0 auto 20px" }}>SI</div>
        <div style={{ fontSize:32, fontWeight:900, color:"#C9A84C", letterSpacing:4, marginBottom:4 }}>SAMPACE INSTITUTE</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:8, letterSpacing:2 }}>WHERE EXCELLENCE BEGINS</div>
        <div style={{ background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:8, padding:"10px 20px", display:"inline-block", marginBottom:48 }}>
          <span style={{ color:"#10B981", fontSize:13, fontWeight:600 }}>✅ Website is LIVE and running on Netlify!</span>
        </div>

        {/* Portal links */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {schools.map((s,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"20px", borderLeft:`3px solid ${s.color}`, cursor:"pointer", transition:"all .2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
              <div style={{ fontSize:28, marginBottom:8 }}>{s.emoji}</div>
              <div style={{ fontWeight:700, fontSize:14, color:"#fff" }}>{s.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4 }}>Coming soon</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:48, color:"rgba(255,255,255,0.3)", fontSize:12, lineHeight:1.8 }}>
          <div style={{ color:"rgba(255,255,255,0.6)", fontWeight:600, marginBottom:8 }}>Next Steps:</div>
          <div>1. All portal .jsx files are uploading to GitHub</div>
          <div>2. Connect sampacecampus.com.ng when domain arrives</div>
          <div>3. Grand Opening → August 2026 🚀</div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<TempHome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
