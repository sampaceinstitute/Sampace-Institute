import { useState } from "react";
import { BRAND as C, SITE } from "../constants";

const W = C.white;
const N = C.navy;

export default function ApplyModal({ division: d, onClose }) {
  const [step,   setStep]   = useState(1);
  const [form,   setForm]   = useState({});
  const [errors, setErrors] = useState({});
  const [done,   setDone]   = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };

  const req = (fields) => {
    const e = {};
    fields.forEach(k => { if (!form[k]?.toString().trim()) e[k] = "Required"; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inp = {
    width:"100%", background:"rgba(255,255,255,.05)",
    border:"1px solid rgba(255,255,255,.14)", borderRadius:9,
    padding:"11px 14px", fontSize:12, color:W, outline:"none",
    fontFamily:"inherit", marginBottom:4, transition:"border-color .2s",
  };

  const sel = {
    ...inp, marginBottom:4,
    backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='rgba(255,255,255,.4)'%3E%3Cpath d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\")",
    backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center",
    appearance:"none", paddingRight:32,
  };

  const lbl = {
    fontSize:10, color:d.color, fontWeight:700, letterSpacing:1,
    display:"block", marginBottom:5, textTransform:"uppercase",
  };

  const Err = ({k}) => errors[k] ? <div style={{color:"#EF4444",fontSize:10,marginBottom:6,marginTop:-2}}>{errors[k]}</div> : null;

  const TOTAL = 4;

  // ── Class levels per learning division ──
  const CLASS_LEVELS = {
    digital:      ["Beginner","Intermediate","Advanced"],
    extramural:   ["Primary (Basic 1–6)","JSS1","JSS2","JSS3","SS1","SS2","SS3","Adult Learner"],
    professional: ["Teacher","School Administrator","Graduate","Professional","Entrepreneur","Other"],
  };

  // ── Session preferences ──
  const SESSIONS = ["Morning (8am–12pm)","Afternoon (12pm–4pm)","Evening (4pm–8pm)","Weekend Only","Flexible / Online"];

  const submit = async () => {
    if (!form.declared) { setErrors(e=>({...e,declared:"Please tick the declaration to proceed."})); return; }
    setSaving(true);
    const s = window.__supabase;
    const ref = `APP-${d.id.toUpperCase()}-${Date.now()}`;
    const payload = {
      reference:    ref,
      school_id:    d.id,
      applicant_name: `${form.fname||""} ${form.lname||""}`.trim(),
      email:        form.email || "",
      phone:        form.phone || "",
      date_of_birth:form.dob  || null,
      gender:       form.gender|| null,
      state_of_origin: form.state || null,
      address:      form.address || null,
      program:      form.prog   || null,
      class_level:  form.level  || null,
      admin_notes:  [form.session && `Preferred session: ${form.session}`, form.prevschool && `Previous institution: ${form.prevschool}`, form.source && `Heard via: ${form.source}`].filter(Boolean).join(" | "),
      parent_name:  form.pname  || null,
      parent_phone: form.pphone || null,
      parent_email: form.pemail || null,
      status:       "pending",
      app_type:     "student",
    };
    if (s) {
      const { error } = await s.from("applications").insert(payload);
      if (error) { alert("Submission error: "+error.message); setSaving(false); return; }
    }
    setSaving(false);
    setDone(true);
  };

  if (done) return (
    <Modal onClose={onClose} color={d.color}>
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{fontSize:52,marginBottom:14}}>🎉</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:W,marginBottom:8}}>Application Submitted!</div>
        <p style={{fontSize:13,color:"rgba(255,255,255,.5)",lineHeight:1.8,maxWidth:320,margin:"0 auto 24px"}}>
          Thank you for applying to <strong style={{color:d.color}}>{d.name}</strong>.<br/>
          Our team will contact you within <strong style={{color:W}}>24–72 hours</strong>.
        </p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <a href={SITE.whatsapp} style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:W,padding:"10px 20px",borderRadius:9,fontSize:12,fontWeight:700,textDecoration:"none"}}>💬 WhatsApp Us</a>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.14)",color:W,padding:"10px 20px",borderRadius:9,fontSize:12,cursor:"pointer",fontWeight:600}}>Close</button>
        </div>
      </div>
    </Modal>
  );

  return (
    <Modal onClose={onClose} color={d.color}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>{d.icon}</span>
          <div>
            <div style={{fontWeight:800,fontSize:14,color:W}}>{d.name}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.38)"}}>Application Form</div>
          </div>
        </div>
        <button onClick={onClose} style={{background:"rgba(255,255,255,.06)",border:"none",color:"rgba(255,255,255,.5)",width:30,height:30,borderRadius:7,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
      </div>

      {/* Progress */}
      <div style={{display:"flex",gap:4,marginBottom:6}}>
        {Array.from({length:TOTAL}).map((_,i)=>(
          <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<step?`linear-gradient(90deg,${d.color},${d.g2})`:"rgba(255,255,255,.1)",transition:"all .3s"}}/>
        ))}
      </div>
      <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:18}}>
        Step {step} of {TOTAL} — {["","Personal Details","Programme Details","Parent / Guardian","Review & Submit"][step]}
      </div>

      {/* ── STEP 1: Personal ── */}
      {step === 1 && (
        <div>
          <div style={{fontSize:13,fontWeight:700,color:W,marginBottom:14}}>Personal Information</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
            <div>
              <label style={lbl}>First Name *</label>
              <input style={{...inp,borderColor:errors.fname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="First name" value={form.fname||""} onChange={e=>set("fname",e.target.value)}/>
              <Err k="fname"/>
            </div>
            <div>
              <label style={lbl}>Last Name *</label>
              <input style={{...inp,borderColor:errors.lname?"#EF4444":"rgba(255,255,255,.14)"}} placeholder="Last name" value={form.lname||""} onChange={e=>set("lname",e.target.value)}/>
              <Err k="lname"/>
            </div>
          </div>
          <label style={lbl}>Email Address *</label>
          <input style={{...inp,borderColor:errors.email?"#EF4444":"rgba(255,255,255,.14)"}} type="email" placeholder="your@email.com" value={form.email||""} onChange={e=>set("email",e.target.value)}/>
          <Err k="email"/>
          <label style={lbl}>Phone / WhatsApp *</label>
          <input style={{...inp,borderColor:errors.phone?"#EF4444":"rgba(255,255,255,.14)"}} type="tel" placeholder="+234..." value={form.phone||""} onChange={e=>set("phone",e.target.value)}/>
          <Err k="phone"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <label style={lbl}>Date of Birth</label>
              <input style={inp} type="date" value={form.dob||""} onChange={e=>set("dob",e.target.value)}/>
            </div>
            <div>
              <label style={lbl}>Gender</label>
              <select style={{...sel,borderColor:"rgba(255,255,255,.14)"}} value={form.gender||""} onChange={e=>set("gender",e.target.value)}>
                <option value="">Select gender...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <label style={lbl}>State of Origin</label>
          <select style={{...sel,borderColor:"rgba(255,255,255,.14)"}} value={form.state||""} onChange={e=>set("state",e.target.value)}>
            <option value="">Select state...</option>
            {["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT-Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"].map(s=>(
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <label style={lbl}>Residential Address</label>
          <input style={inp} placeholder="Your address" value={form.address||""} onChange={e=>set("address",e.target.value)}/>
        </div>
      )}

      {/* ── STEP 2: Programme ── */}
      {step === 2 && (
        <div>
          <div style={{fontSize:13,fontWeight:700,color:W,marginBottom:14}}>Programme Details</div>
          <label style={lbl}>Programme / Course of Interest *</label>
          <select style={{...sel,borderColor:errors.prog?"#EF4444":"rgba(255,255,255,.14)"}} value={form.prog||""} onChange={e=>set("prog",e.target.value)}>
            <option value="">Select a programme...</option>
            {(d.programmes||[]).map(p=>(
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <Err k="prog"/>

          {CLASS_LEVELS[d.id] && (
            <>
              <label style={lbl}>{d.id==="professional"?"Your Role / Background":"Level / Class"}</label>
              <select style={sel} value={form.level||""} onChange={e=>set("level",e.target.value)}>
                <option value="">Select...</option>
                {CLASS_LEVELS[d.id].map(l=><option key={l} value={l}>{l}</option>)}
              </select>
            </>
          )}

          <label style={lbl}>Preferred Session</label>
          <select style={sel} value={form.session||""} onChange={e=>set("session",e.target.value)}>
            <option value="">Select preferred time...</option>
            {SESSIONS.map(s=><option key={s} value={s}>{s}</option>)}
          </select>

          <label style={lbl}>Preferred Mode of Learning</label>
          <select style={sel} value={form.mode||""} onChange={e=>set("mode_",e.target.value)}>
            <option value="">Select...</option>
            <option value="Online">Online only</option>
            <option value="Physical">Physical / Onsite</option>
            <option value="Hybrid">Both (Hybrid)</option>
          </select>

          <label style={lbl}>Previous School / Institution</label>
          <input style={inp} placeholder="e.g. Government Secondary School, Lagos" value={form.prevschool||""} onChange={e=>set("prevschool",e.target.value)}/>

          <label style={lbl}>How Did You Hear About SAMPACE?</label>
          <select style={sel} value={form.source||""} onChange={e=>set("source",e.target.value)}>
            <option value="">Select...</option>
            <option>WhatsApp</option><option>Facebook</option><option>Instagram</option>
            <option>Google Search</option><option>Friend / Family</option>
            <option>School / Teacher</option><option>Flyer / Poster</option><option>Other</option>
          </select>
        </div>
      )}

      {/* ── STEP 3: Parent/Guardian ── */}
      {step === 3 && (
        <div>
          <div style={{fontSize:13,fontWeight:700,color:W,marginBottom:4}}>Parent / Guardian Information</div>
          <p style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:14}}>Required for applicants under 18. Recommended for all.</p>
          <label style={lbl}>Parent / Guardian Full Name</label>
          <input style={inp} placeholder="Full name" value={form.pname||""} onChange={e=>set("pname",e.target.value)}/>
          <label style={lbl}>Parent Phone / WhatsApp</label>
          <input style={inp} type="tel" placeholder="+234..." value={form.pphone||""} onChange={e=>set("pphone",e.target.value)}/>
          <label style={lbl}>Parent Email Address</label>
          <input style={inp} type="email" placeholder="parent@email.com" value={form.pemail||""} onChange={e=>set("pemail",e.target.value)}/>
          <label style={lbl}>Relationship to Applicant</label>
          <select style={sel} value={form.rel||""} onChange={e=>set("rel",e.target.value)}>
            <option value="">Select...</option>
            <option>Father</option><option>Mother</option><option>Guardian</option>
            <option>Sibling</option><option>Sponsor</option><option>Self (18+)</option>
          </select>
        </div>
      )}

      {/* ── STEP 4: Review ── */}
      {step === 4 && (
        <div>
          <div style={{fontSize:13,fontWeight:700,color:W,marginBottom:14}}>Review & Submit</div>
          <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"16px",marginBottom:16}}>
            {[
              ["Division",  d.name],
              ["Full Name", `${form.fname||""} ${form.lname||""}`.trim()],
              ["Email",     form.email||""],
              ["Phone",     form.phone||""],
              ["Gender",    form.gender||"—"],
              ["Programme", form.prog||"—"],
              ["Level",     form.level||"—"],
              ["Session",   form.session||"—"],
              ["Parent",    form.pname||"—"],
            ].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                <span style={{fontSize:11,color:"rgba(255,255,255,.38)"}}>{l}</span>
                <span style={{fontSize:11,color:W,fontWeight:600,maxWidth:"60%",textAlign:"right"}}>{v||"—"}</span>
              </div>
            ))}
          </div>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer",marginBottom:6}}>
            <input type="checkbox" checked={form.declared||false} onChange={e=>set("declared",e.target.checked)} style={{marginTop:2,accentColor:d.color,width:14,height:14,flexShrink:0}}/>
            <span style={{fontSize:11,color:"rgba(255,255,255,.45)",lineHeight:1.65}}>I confirm that the information provided is accurate and I agree to SAMPACE's Terms of Use and Privacy Policy.</span>
          </label>
          {errors.declared && <div style={{color:"#EF4444",fontSize:11,marginBottom:8}}>{errors.declared}</div>}
        </div>
      )}

      {/* Navigation */}
      <div style={{display:"flex",gap:10,marginTop:18}}>
        {step > 1 && (
          <button onClick={()=>setStep(s=>s-1)} style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.14)",color:W,padding:"11px",borderRadius:9,fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>← Back</button>
        )}
        {step < TOTAL ? (
          <button onClick={()=>{
            if (step===1 && !req(["fname","lname","email","phone"])) return;
            if (step===2 && !req(["prog"])) return;
            setStep(s=>s+1);
          }} style={{flex:2,background:`linear-gradient(135deg,${d.color},${d.g2})`,border:"none",color:W,padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            Next →
          </button>
        ) : (
          <button onClick={submit} disabled={saving}
            style={{flex:2,background:`linear-gradient(135deg,${d.color},${d.g2})`,border:"none",color:W,padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:saving?.7:1}}>
            {saving ? "Submitting..." : "Submit Application ✓"}
          </button>
        )}
      </div>
    </Modal>
  );
}

function Modal({ children, onClose, color }) {
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.78)",backdropFilter:"blur(10px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"rgba(6,15,30,.97)",border:"1px solid rgba(255,255,255,.1)",borderRadius:18,padding:"clamp(20px,4vw,32px)",width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",fontFamily:"'Syne',sans-serif",borderTop:`3px solid ${color}`}}>
        {children}
      </div>
    </div>
  );
}
