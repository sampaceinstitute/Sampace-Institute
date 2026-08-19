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

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const err = (k) => errors[k] ? <div style={{ color:"#EF4444", fontSize:10, marginTop:3 }}>{errors[k]}</div> : null;

  const req = (fields) => {
    const e = {};
    fields.forEach(k => { if (!form[k]?.trim()) e[k] = "This field is required"; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inp = {
    width:"100%", background:"rgba(255,255,255,.05)",
    border:"1px solid rgba(255,255,255,.12)", borderRadius:9,
    padding:"11px 14px", fontSize:12, color:W, outline:"none",
    fontFamily:"inherit", marginBottom:4,
  };
  const lbl = { fontSize:10, color:d.color, fontWeight:700, letterSpacing:1, display:"block", marginBottom:4, textTransform:"uppercase" };

  const TOTAL_STEPS = 4;

  const submit = async () => {
    if (!req(["fname","lname","email","phone"])) return;
    setSaving(true);
    const s = window.__supabase;
    const ref = `APP-${d.id.toUpperCase()}-${Date.now()}`;
    const payload = {
      reference: ref,
      school_id: d.id,
      applicant_name: `${form.fname} ${form.lname}`.trim(),
      email: form.email,
      phone: form.phone,
      date_of_birth: form.dob || null,
      gender: form.gender || null,
      state_of_origin: form.state || null,
      address: form.address || null,
      program: form.prog || null,
      class_level: form.cls || null,
      department: form.dept || null,
      prev_school: form.prevschool || null,
      parent_name: form.pname || null,
      parent_phone: form.pphone || null,
      parent_email: form.pemail || null,
      how_heard: form.source || null,
      status: "pending",
      app_type: "student",
    };
    if (s) {
      const { error } = await s.from("applications").insert(payload);
      if (error) { alert("Submission error: " + error.message); setSaving(false); return; }
    }
    setSaving(false);
    setDone(true);
  };

  if (done) return (
    <Modal onClose={onClose}>
      <div style={{ textAlign:"center", padding:"20px 0" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:W, marginBottom:8 }}>Application Submitted!</div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.8, marginBottom:24, maxWidth:320, margin:"0 auto 24px" }}>
          Thank you for applying to <strong style={{ color:d.color }}>{d.name}</strong>. Our admissions team will contact you within 72 hours.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <a href={SITE.whatsapp} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:W, padding:"10px 20px", borderRadius:9, fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp Us</a>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:W, padding:"10px 20px", borderRadius:9, fontSize:12, cursor:"pointer", fontWeight:600 }}>Close</button>
        </div>
      </div>
    </Modal>
  );

  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:22 }}>{d.icon}</span>
          <div>
            <div style={{ fontWeight:800, fontSize:14, color:W }}>{d.name}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>Application Form</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,.06)", border:"none", color:"rgba(255,255,255,.5)", width:30, height:30, borderRadius:7, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
      </div>

      {/* Progress */}
      <div style={{ display:"flex", gap:4, marginBottom:20 }}>
        {Array.from({length:TOTAL_STEPS}).map((_,i)=>(
          <div key={i} style={{ flex:1, height:4, borderRadius:2, background:i<step?`linear-gradient(90deg,${d.color},${d.g2})`:"rgba(255,255,255,.1)", transition:"all .3s" }}/>
        ))}
      </div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", marginBottom:20 }}>
        Step {step} of {TOTAL_STEPS} — {["","Personal Details","Academic Details","Parent/Guardian","Review & Submit"][step]}
      </div>

      {/* Step 1 — Personal */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize:15, fontWeight:700, color:W, marginBottom:16 }}>Personal Information</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["fname","First Name *"],["lname","Last Name *"]].map(([k,l])=>(
              <div key={k}><label style={lbl}>{l}</label><input style={inp} placeholder={l.replace(" *","")} value={form[k]||""} onChange={e=>set(k,e.target.value)}/>{err(k)}</div>
            ))}
          </div>
          {[["email","Email Address *","email"],["phone","Phone / WhatsApp *","tel"]].map(([k,l,t])=>(
            <div key={k}><label style={lbl}>{l}</label><input style={inp} type={t} placeholder={l.replace(" *","")} value={form[k]||""} onChange={e=>set(k,e.target.value)}/>{err(k)}</div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={lbl}>Date of Birth</label>
              <input style={inp} type="date" value={form.dob||""} onChange={e=>set("dob",e.target.value)}/>
            </div>
            <div>
              <label style={lbl}>Gender</label>
              <select style={{...inp,marginBottom:0}} value={form.gender||""} onChange={e=>set("gender",e.target.value)}>
                <option value="">Select...</option>
                <option>Male</option><option>Female</option><option>Prefer not to say</option>
              </select>
            </div>
          </div>
          {[["state","State of Origin"],["address","Residential Address"]].map(([k,l])=>(
            <div key={k}><label style={lbl}>{l}</label><input style={inp} placeholder={l} value={form[k]||""} onChange={e=>set(k,e.target.value)}/></div>
          ))}
        </div>
      )}

      {/* Step 2 — Academic */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize:15, fontWeight:700, color:W, marginBottom:16 }}>Academic Details</h3>
          <div>
            <label style={lbl}>Programme of Choice</label>
            <select style={{...inp}} value={form.prog||""} onChange={e=>set("prog",e.target.value)}>
              <option value="">Select programme...</option>
              {d.programmes.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          {d.id === "college" && (
            <div>
              <label style={lbl}>Class Level</label>
              <select style={{...inp}} value={form.cls||""} onChange={e=>set("cls",e.target.value)}>
                <option value="">Select class...</option>
                {["JSS1","JSS2","JSS3","SS1","SS2","SS3"].map(c=><option key={c}>{c}</option>)}
              </select>
              <label style={lbl}>Department</label>
              <select style={{...inp}} value={form.dept||""} onChange={e=>set("dept",e.target.value)}>
                <option value="">Select (for SS students)...</option>
                <option>Sciences</option><option>Humanities</option><option>Business</option>
              </select>
            </div>
          )}
          {[["prevschool","Previous School / Institution"],["source","How did you hear about us?"]].map(([k,l])=>(
            <div key={k}><label style={lbl}>{l}</label><input style={inp} placeholder={l} value={form[k]||""} onChange={e=>set(k,e.target.value)}/></div>
          ))}
        </div>
      )}

      {/* Step 3 — Parent/Guardian */}
      {step === 3 && (
        <div>
          <h3 style={{ fontSize:15, fontWeight:700, color:W, marginBottom:4 }}>Parent / Guardian Information</h3>
          <p style={{ fontSize:11, color:"rgba(255,255,255,.35)", marginBottom:16 }}>Required for under-18 applicants. Recommended for all.</p>
          {[["pname","Parent/Guardian Full Name"],["pphone","Parent Phone / WhatsApp"],["pemail","Parent Email Address"]].map(([k,l])=>(
            <div key={k}><label style={lbl}>{l}</label><input style={inp} placeholder={l} value={form[k]||""} onChange={e=>set(k,e.target.value)}/></div>
          ))}
          <div>
            <label style={lbl}>Relationship to Applicant</label>
            <select style={{...inp}} value={form.rel||""} onChange={e=>set("rel",e.target.value)}>
              <option value="">Select...</option>
              <option>Father</option><option>Mother</option><option>Guardian</option><option>Sibling</option><option>Other</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 4 — Review */}
      {step === 4 && (
        <div>
          <h3 style={{ fontSize:15, fontWeight:700, color:W, marginBottom:16 }}>Review & Submit</h3>
          <div style={{ background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:12, padding:"16px", marginBottom:16 }}>
            {[
              ["Name", `${form.fname||""} ${form.lname||""}`.trim()],
              ["Email", form.email],
              ["Phone", form.phone],
              ["Programme", form.prog || "—"],
              ["Class", form.cls || "—"],
              ["Parent", form.pname || "—"],
            ].map(([l,v])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.4)" }}>{l}</span>
                <span style={{ fontSize:11, color:W, fontWeight:600 }}>{v||"—"}</span>
              </div>
            ))}
          </div>
          <label style={{ display:"flex", gap:10, alignItems:"flex-start", cursor:"pointer", marginBottom:16 }}>
            <input type="checkbox" checked={form.declared||false} onChange={e=>set("declared",e.target.checked)} style={{ marginTop:2, accentColor:d.color }}/>
            <span style={{ fontSize:11, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>I confirm that the information provided is accurate and I agree to SAMPACE's Terms of Use and Privacy Policy.</span>
          </label>
          {!form.declared && errors.declared && <div style={{ color:"#EF4444", fontSize:11, marginBottom:10 }}>Please tick the declaration to proceed.</div>}
        </div>
      )}

      {/* Navigation */}
      <div style={{ display:"flex", gap:10, marginTop:20 }}>
        {step > 1 && (
          <button onClick={()=>setStep(s=>s-1)} style={{ flex:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:W, padding:"11px", borderRadius:9, fontSize:12, cursor:"pointer", fontWeight:600 }}>← Back</button>
        )}
        {step < TOTAL_STEPS ? (
          <button onClick={()=>{
            if (step===1 && !req(["fname","lname","email","phone"])) return;
            setStep(s=>s+1);
          }} style={{ flex:2, background:`linear-gradient(135deg,${d.color},${d.g2})`, border:"none", color:W, padding:"11px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer" }}>
            Next →
          </button>
        ) : (
          <button onClick={()=>{
            if (!form.declared) { setErrors(e=>({...e,declared:true})); return; }
            submit();
          }} disabled={saving} style={{ flex:2, background:`linear-gradient(135deg,${d.color},${d.g2})`, border:"none", color:W, padding:"11px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", opacity:saving?0.7:1 }}>
            {saving ? "Submitting..." : "🎓 Submit Application"}
          </button>
        )}
      </div>
    </Modal>
  );
}

function Modal({ children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:"rgba(6,15,30,.97)", border:"1px solid rgba(255,255,255,.1)", borderRadius:18, padding:"clamp(20px,4vw,32px)", width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto", fontFamily:"'Syne',sans-serif" }}>
        {children}
      </div>
    </div>
  );
}
