import { useState } from "react";
import { BRAND as C, SITE } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;

const PORTAL_CONFIG = {
  student: {
    title: "Student Portal",
    icon: "🎓",
    color: "#1565C0",
    g2: "#42A5F5",
    placeholder: "student@sampaceedu.com.ng",
    desc: "Access your classes, grades, CBT practice and certificates.",
  },
  parent: {
    title: "Parent Portal",
    icon: "👨‍👩‍👧",
    color: "#00897B",
    g2: "#4DB6AC",
    placeholder: "parent@sampaceedu.com.ng",
    desc: "Monitor your child's progress, pay fees and message teachers.",
  },
  staff: {
    title: "Staff Portal",
    icon: "👔",
    color: "#7B1FA2",
    g2: "#BA68C8",
    placeholder: "teacher@sampaceedu.com.ng",
    desc: "Manage classes, record grades and attendance.",
  },
  admin: {
    title: "Admin Dashboard",
    icon: "⚙️",
    color: "#C9A84C",
    g2: "#FFD54F",
    placeholder: "admin@sampaceedu.com.ng",
    desc: "Full platform management across all 12 divisions.",
  },
};

export default function LoginPage({ type, onBack, onSuccess }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [mode,     setMode]     = useState("login"); // login | reset
  const [resetSent,setResetSent]= useState(false);

  const cfg = PORTAL_CONFIG[type] || PORTAL_CONFIG.student;

  const login = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true); setError("");
    const s = window.__supabase;
    if (!s) {
      setError("Connection error. Please refresh and try again.");
      setLoading(false); return;
    }
    const { data, error: err } = await s.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message === "Invalid login credentials"
        ? "Incorrect email or password. Please try again."
        : err.message);
      setLoading(false); return;
    }
    // Load profile and call onSuccess
    if (data?.user) {
      const { data: profile } = await s.from("users").select("*").eq("auth_id", data.user.id).single();
      onSuccess({ ...data.user, ...(profile||{}) });
    }
    setLoading(false);
  };

  const sendReset = async () => {
    if (!email) { setError("Enter your email address first."); return; }
    setLoading(true); setError("");
    const s = window.__supabase;
    if (s) {
      const { error: err } = await s.auth.resetPasswordForEmail(email, {
        redirectTo: `https://${SITE.domain}/#reset-password`
      });
      if (err) { setError(err.message); setLoading(false); return; }
    }
    setResetSent(true);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.dark, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input{font-family:inherit}
        .inp{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:11px 14px;font-size:13px;color:#fff;outline:none;transition:border-color .2s;font-family:inherit}
        .inp:focus{border-color:${cfg.color}}
        .inp::placeholder{color:rgba(255,255,255,.3)}
        .btn{cursor:pointer;transition:all .25s;font-family:inherit}
        .btn:hover:not(:disabled){transform:translateY(-1px)}
        .btn:disabled{opacity:.6;cursor:not-allowed}
      `}</style>

      {/* Back button */}
      <button onClick={onBack} style={{ position:"fixed", top:20, left:20, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:W, padding:"8px 16px", borderRadius:8, fontSize:12, cursor:"pointer", fontWeight:600 }}>← Back to Site</button>

      {/* Portal selector */}
      <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap", justifyContent:"center" }}>
        {Object.entries(PORTAL_CONFIG).map(([key, p])=>(
          <a key={key} href={`#login-${key}`} onClick={()=>window.location.hash=`login-${key}`}
            style={{ background:type===key?`linear-gradient(135deg,${p.color},${p.g2})`:"rgba(255,255,255,.05)", border:type===key?"none":"1px solid rgba(255,255,255,.1)", color:W, padding:"7px 16px", borderRadius:100, fontSize:11, fontWeight:600, textDecoration:"none", cursor:"pointer", transition:"all .2s" }}>
            {p.icon} {p.title}
          </a>
        ))}
      </div>

      {/* Login card */}
      <div style={{ width:"100%", maxWidth:420, background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.08)", borderRadius:20, padding:"clamp(24px,4vw,40px)", borderTop:`3px solid ${cfg.color}` }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:56, height:56, background:`linear-gradient(135deg,${cfg.color},${cfg.g2})`, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 14px" }}>{cfg.icon}</div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20, color:W, marginBottom:6 }}>{cfg.title}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,.3)", lineHeight:1.6 }}>SAMPACE EDUCATIONAL LTD</div>
        </div>

        {mode === "reset" ? (
          /* Password reset */
          <div>
            {resetSent ? (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:36, marginBottom:12 }}>📧</div>
                <div style={{ fontWeight:700, color:W, marginBottom:8 }}>Reset Link Sent!</div>
                <p style={{ fontSize:12, color:"rgba(255,255,255,.4)", lineHeight:1.7, marginBottom:20 }}>Check your email inbox for the password reset link. It expires in 1 hour.</p>
                <button className="btn" onClick={()=>{setMode("login");setResetSent(false);}} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:W, padding:"10px 20px", borderRadius:9, fontSize:12, fontWeight:600 }}>← Back to Login</button>
              </div>
            ) : (
              <>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.4)", lineHeight:1.7, marginBottom:20 }}>Enter your email address and we will send you a reset link.</p>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:10, color:cfg.color, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>Email Address</label>
                  <input className="inp" type="email" placeholder={cfg.placeholder} value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                {error && <div style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", color:"#EF4444", padding:"9px 13px", borderRadius:8, fontSize:12, marginBottom:12 }}>{error}</div>}
                <button className="btn" onClick={sendReset} disabled={loading} style={{ width:"100%", background:`linear-gradient(135deg,${cfg.color},${cfg.g2})`, color:N, padding:"12px", borderRadius:9, fontSize:13, fontWeight:800, border:"none", marginBottom:12 }}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button className="btn" onClick={()=>{setMode("login");setError("");}} style={{ width:"100%", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", padding:"10px", borderRadius:9, fontSize:12, fontWeight:600 }}>← Back to Login</button>
              </>
            )}
          </div>
        ) : (
          /* Login form */
          <>
            <p style={{ fontSize:12, color:"rgba(255,255,255,.35)", textAlign:"center", marginBottom:20, lineHeight:1.6 }}>{cfg.desc}</p>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:10, color:cfg.color, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>Email Address</label>
              <input className="inp" type="email" placeholder={cfg.placeholder} value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/>
            </div>
            <div style={{ marginBottom:8 }}>
              <label style={{ fontSize:10, color:cfg.color, fontWeight:700, letterSpacing:1, display:"block", marginBottom:5, textTransform:"uppercase" }}>Password</label>
              <input className="inp" type="password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/>
            </div>
            <div style={{ textAlign:"right", marginBottom:16 }}>
              <span onClick={()=>{setMode("reset");setError("");}} style={{ fontSize:11, color:cfg.color, cursor:"pointer", textDecoration:"underline" }}>Forgot password?</span>
            </div>
            {error && <div style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", color:"#EF4444", padding:"9px 13px", borderRadius:8, fontSize:12, marginBottom:14 }}>{error}</div>}
            <button className="btn" onClick={login} disabled={loading} style={{ width:"100%", background:`linear-gradient(135deg,${cfg.color},${cfg.g2})`, color:N, padding:"13px", borderRadius:9, fontSize:13, fontWeight:800, border:"none", marginBottom:16 }}>
              {loading ? "Signing in..." : `Login to ${cfg.title} →`}
            </button>
            <div style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,.3)" }}>
              Need access? <a href={`mailto:${SITE.email}`} style={{ color:cfg.color, textDecoration:"none" }}>Contact admin</a>
            </div>
          </>
        )}
      </div>

      {/* Bottom note */}
      <div style={{ marginTop:24, fontSize:11, color:"rgba(255,255,255,.2)", textAlign:"center" }}>
        © 2026 SAMPACE EDUCATIONAL LTD · CAC Registered · Nigeria
      </div>
    </div>
  );
}
