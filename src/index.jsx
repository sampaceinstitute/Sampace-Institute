import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import DivisionPage from "./pages/DivisionPage";
import AdminDashboard from "./portals/AdminDashboard";
import StudentPortal from "./portals/StudentPortal";
import ParentPortal from "./portals/ParentPortal";
import StaffPortal from "./portals/StaffPortal";
import { DIVISIONS } from "./constants";

// ── Supabase init ──────────────────────────────────────────────
const SB_URL  = import.meta.env.VITE_SUPABASE_URL  || "";
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON || "";

if (SB_URL && SB_ANON) {
  window.__supabase = createClient(SB_URL, SB_ANON);
}

// ── App Router ──────────────────────────────────────────────────
function App() {
  const [view,      setView]  = useState("home");
  const [division,  setDiv]   = useState(null);
  const [user,      setUser]  = useState(null);
  const [authReady, setReady] = useState(false);

  const sb = () => window.__supabase || null;

  // ── Auth listener ──
  useEffect(() => {
    const s = sb();
    if (!s) { setReady(true); return; }

    s.auth.getSession().then(({ data }) => {
      if (data?.session?.user) loadProfile(data.session.user);
      else setReady(true);
    });

    const { data: listener } = s.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadProfile(session.user);
      else { setUser(null); setView("home"); setReady(true); }
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const loadProfile = async (authUser) => {
    const s = sb();
    if (!s) { setReady(true); return; }
    const { data: profile } = await s
      .from("users").select("*").eq("auth_id", authUser.id).single();
    if (profile) {
      setUser({ ...authUser, ...profile });
      const role = profile.role || "student";
      if (role === "super_admin" || role.includes("admin")) setView("admin");
      else if (role === "teacher") setView("staff");
      else if (role === "parent")  setView("parent");
      else setView("student");
    }
    setReady(true);
  };

  // ── Navigation helpers ──
  const goHome  = ()     => { setView("home"); setDiv(null); window.scrollTo(0,0); };
  const goDiv   = (div)  => { setDiv(div); setView("division"); window.scrollTo(0,0); };
  const goLogin = (type) => { setView("login-"+type); window.scrollTo(0,0); };
  const logout  = async () => {
    const s = sb();
    if (s) await s.auth.signOut();
    setUser(null); setView("home");
  };

  // ── Browser back button ──
  useEffect(() => {
    const onPop = () => {
      const h = window.location.hash.replace("#","");
      if (!h || h === "home") { goHome(); return; }
      if (h.startsWith("login-")) { setView(h); return; }
      const d = DIVISIONS.find(d => d.id === h);
      if (d) goDiv(d); else goHome();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ── Loading screen ──
  if (!authReady) return (
    <div style={{minHeight:"100vh",background:"#060F1E",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:40,height:40,border:"3px solid #C9A84C",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 12px"}}/>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:12,fontFamily:"sans-serif"}}>Loading SAMPACE...</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  // ── Logged-in portal routing ──
  if (user) {
    if (view === "admin")   return <AdminDashboard  user={user} onLogout={logout}/>;
    if (view === "staff")   return <StaffPortal     user={user} onLogout={logout}/>;
    if (view === "parent")  return <ParentPortal    user={user} onLogout={logout}/>;
    if (view === "student") return <StudentPortal   user={user} onLogout={logout}/>;
  }

  // ── Public routes ──
  if (view === "division" && division) {
    return <DivisionPage division={division} onBack={goHome} onLogin={goLogin}/>;
  }
  if (view.startsWith("login-")) {
    return <LoginPage type={view.replace("login-","")} onBack={goHome} onSuccess={(u)=>setUser(u)}/>;
  }
  return <Homepage onSelectDiv={goDiv} onLogin={goLogin}/>;
}

const el = document.getElementById("root");
if (el) ReactDOM.createRoot(el).render(<App/>);
