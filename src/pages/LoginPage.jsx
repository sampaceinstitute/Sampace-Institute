import { useState } from "react";
import { BRAND as C, SITE } from "../constants";

const W = C.white;
const N = C.navy;
const G = C.gold;

const PORTALS = {
  student: {
    title: "Student Portal",
    icon: "🎓",
    color: "#1565C0",
    g2: "#42A5F5",
    placeholder: "student@sampaceedu.com.ng",
    desc: "Access your classes, CBT practice, results and certificates.",
    roleCheck: (role) => !role || role === "student",
  },
  parent: {
    title: "Parent Portal",
    icon: "👨‍👩‍👧",
    color: "#00897B",
    g2: "#4DB6AC",
    placeholder: "parent@sampaceedu.com.ng",
    desc: "Monitor your child's progress, fees and communicate with tutors.",
    roleCheck: (role) => role === "parent",
  },
  staff: {
    title: "Staff Portal",
    icon: "👔",
    color: "#7B1FA2",
    g2: "#BA68C8",
    placeholder: "tutor@sampaceedu.com.ng",
    desc: "Manage your classes, mark attendance and enter grades.",
    roleCheck: (role) => role === "teacher",
  },
  admin: {
    title: "Admin Dashboard",
    icon: "⚙️",
    color: "#C9A84C",
    g2: "#FFD54F",
    placeholder: "admin@sampaceedu.com.ng",
    desc: "Full platform management across all 6 SAMPACE divisions.",
    roleCheck: (role) => role === "super_admin" || (role && role.includes("admin")),
  },
};

export default function LoginPage({ type, onBack, onSuccess }) {
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [mode,      setMode]      = useState("login"); // login | reset
  const [resetSent, setResetSent] = useState(false);
  const [showPass,  setShowPass]  = useState(false);

  const cfg = PORTALS[type] || PORTALS.student;

  const login = async () => {
    if (!email.trim())    { setError("Please enter your email address."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }

    setLoading(true);
    setError("");

    const s = window.__supabase;
    if (!s) {
      setError("Database connection error. Please check your internet and try again.");
      setLoading(false);
      return;
    }

    // ── Sign in ──
    const { data, error: authErr } = await s.auth.signInWithPassword({ email: email.trim(), password });

    if (authErr) {
      const msg = authErr.message.toLowerCase();
      if (msg.includes("invalid login") || msg.includes("invalid credentials")) {
        setError("Incorrect email or password. Please check and try again.");
      } else if (msg.includes("email not confirmed")) {
        setError("Please confirm your email address first. Check your inbox.");
      } else if (msg.includes("too many")) {
        setError("Too many attempts. Please wait a few minutes and try again.");
      } else {
        setError(authErr.message);
      }
      setLoading(false);
      return;
    }

    if (!data?.user) {
      setError("Login failed. Please try again.");
      setLoading(false);
      return;
    }

    // ── Load profile from users table ──
    const { data: profile, error: profErr } = await s
      .from("users")
      .select("*")
      .eq("auth_id", data.user.id)
      .single();

    const userData = { ...data.user, ...(profile || {}) };

    // ── Role mismatch warning ──
    if (profile?.role) {
      const correctPortal = PORTALS[type];
      if (!correctPortal?.roleCheck(profile.role)) {
        // Still log them in — App router will send to correct portal
        setError("");
      }
    }

    setLoading(false);
    onSuccess(userData);
  };

  const sendReset = async () => {
    if (!email.trim()) { setError("Please enter your email address first."); return; }
    setLoading(true);
    setError("");
    const s = window.__supabase;
    if (s) {
      const { error: err } = await s.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `https://${SITE.domain}/#reset-password`
      });
      if (err) { setError(err.message); setLoading(false); return; }
    }
    setResetSent(true);
    setLoading(false);
  };

  const inpStyle = (focus) => ({
    width:"100%",
    background:"rgba(255,255,255,.05)",
    border:`1px solid ${error && !focus ? "rgba(239,68,68,.4)" : "rgba(255,255,255,.14)"}`,
    borderRadius:9,
    padding:"12px 14px",
    fontSize:13,
    color:W,
    outline:"none",
    fontFamily:"inherit",
    transition:"border-color .2s",
  });

  return (
    <div style={{fontFamily:"'Syne',sans-serif",background:C.dark,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,select,button{font-family:inherit}
        .inp:focus{border-color:${cfg.color}!important;background:rgba(255,255,255,.07)!important}
        .btn-primary{cursor:pointer;transition:all .2s;border:none;font-family:inherit;font-weight:800}
        .btn-primary:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,.3)}
        .btn-primary:disabled{opacity:.6;cursor:not-allowed}
        .tab:hover{opacity:1!important}
      `}</style>

      {/* Back button */}
      <button onClick={onBack} style={{position:"fixed",top:20,left:20,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",color:W,padding:"8px 16px",borderRadius:8,fontSize:12,cursor:"pointer",fontWeight:600}}>
        ← Back to Site
      </button>

      {/* Portal switcher */}
      <div style={{display:"flex",gap:6,marginBottom:28,flexWrap:"wrap",justifyContent:"center"}}>
        {Object.entries(PORTALS).map(([key, p]) => (
          <button key={key} onClick={()=>{ window.location.hash=`login-${key}`; window.location.reload(); }}
            className="tab"
            style={{background:type===key?`linear-gradient(135deg,${p.color},${p.g2})`:"rgba(255,255,255,.05)",border:type===key?"none":"1px solid rgba(255,255,255,.1)",color:W,padding:"7px 16px",borderRadius:100,fontSize:11,fontWeight:600,cursor:"pointer",opacity:type===key?1:.6,transition:"all .2s"}}>
            {p.icon} {p.title}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{width:"100%",maxWidth:420,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.09)",borderRadius:20,padding:"clamp(24px,4vw,40px)",borderTop:`3px solid ${cfg.color}`}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:58,height:58,background:`linear-gradient(135deg,${cfg.color},${cfg.g2})`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px"}}>
            {cfg.icon}
          </div>
          <div style={{fontWeight:800,fontSize:20,color:W,marginBottom:4}}>{cfg.title}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.6}}>SAMPACE EDUCATIONAL LTD</div>
        </div>

        {mode === "reset" ? (
          // ── PASSWORD RESET ──
          <div>
            {resetSent ? (
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:40,marginBottom:14}}>📧</div>
                <div style={{fontWeight:700,color:W,fontSize:16,marginBottom:8}}>Reset Link Sent!</div>
                <p style={{fontSize:12,color:"rgba(255,255,255,.42)",lineHeight:1.7,marginBottom:20}}>Check your email inbox for the password reset link. It expires in 1 hour.</p>
                <button className="btn-primary" onClick={()=>{setMode("login");setResetSent(false);}}
                  style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.14)",color:W,padding:"10px 22px",borderRadius:9,fontSize:12}}>
                  ← Back to Login
                </button>
              </div>
            ) : (
              <>
                <p style={{fontSize:13,color:"rgba(255,255,255,.42)",lineHeight:1.7,marginBottom:18}}>Enter your email and we will send you a password reset link.</p>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:10,color:cfg.color,fontWeight:700,letterSpacing:1,display:"block",marginBottom:5,textTransform:"uppercase"}}>Email Address</label>
                  <input className="inp" type="email" placeholder={cfg.placeholder} value={email} onChange={e=>setEmail(e.target.value)} style={inpStyle(false)}/>
                </div>
                {error && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.22)",color:"#EF4444",padding:"9px 13px",borderRadius:8,fontSize:12,marginBottom:12}}>{error}</div>}
                <button className="btn-primary" onClick={sendReset} disabled={loading}
                  style={{width:"100%",background:`linear-gradient(135deg,${cfg.color},${cfg.g2})`,color:N,padding:"13px",borderRadius:9,fontSize:13,marginBottom:10}}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button className="btn-primary" onClick={()=>{setMode("login");setError("");}}
                  style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",padding:"10px",borderRadius:9,fontSize:12}}>
                  ← Back to Login
                </button>
              </>
            )}
          </div>
        ) : (
          // ── LOGIN FORM ──
          <>
            <p style={{fontSize:12,color:"rgba(255,255,255,.38)",textAlign:"center",marginBottom:22,lineHeight:1.6}}>{cfg.desc}</p>

            <div style={{marginBottom:14}}>
              <label style={{fontSize:10,color:cfg.color,fontWeight:700,letterSpacing:1,display:"block",marginBottom:5,textTransform:"uppercase"}}>Email Address</label>
              <input className="inp" type="email" placeholder={cfg.placeholder} value={email}
                onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&login()}
                style={inpStyle(false)}/>
            </div>

            <div style={{marginBottom:8}}>
              <label style={{fontSize:10,color:cfg.color,fontWeight:700,letterSpacing:1,display:"block",marginBottom:5,textTransform:"uppercase"}}>Password</label>
              <div style={{position:"relative"}}>
                <input className="inp" type={showPass?"text":"password"} placeholder="Enter your password" value={password}
                  onChange={e=>setPassword(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&login()}
                  style={{...inpStyle(false),paddingRight:44}}/>
                <button onClick={()=>setShowPass(s=>!s)}
                  style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",fontSize:14,padding:0}}>
                  {showPass?"🙈":"👁️"}
                </button>
              </div>
            </div>

            <div style={{textAlign:"right",marginBottom:18}}>
              <span onClick={()=>{setMode("reset");setError("");}}
                style={{fontSize:11,color:cfg.color,cursor:"pointer",textDecoration:"underline"}}>
                Forgot password?
              </span>
            </div>

            {error && (
              <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.22)",color:"#EF4444",padding:"10px 14px",borderRadius:9,fontSize:12,marginBottom:14,lineHeight:1.5}}>
                ⚠️ {error}
              </div>
            )}

            <button className="btn-primary" onClick={login} disabled={loading}
              style={{width:"100%",background:`linear-gradient(135deg,${cfg.color},${cfg.g2})`,color:N,padding:"14px",borderRadius:9,fontSize:14,marginBottom:16}}>
              {loading ? (
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span style={{width:14,height:14,border:"2px solid rgba(11,31,58,.4)",borderTopColor:N,borderRadius:"50%",animation:"spin 1s linear infinite",display:"inline-block"}}/>
                  Signing in...
                </span>
              ) : `Login to ${cfg.title} →`}
            </button>

            <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,.28)"}}>
              Need access? <a href={`mailto:${SITE.email}`} style={{color:cfg.color,textDecoration:"none"}}>Contact admin</a>
            </div>
          </>
        )}
      </div>

      <div style={{marginTop:24,fontSize:10,color:"rgba(255,255,255,.18)",textAlign:"center"}}>
        © 2026 SAMPACE EDUCATIONAL LTD · CAC Registered · Nigeria
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
