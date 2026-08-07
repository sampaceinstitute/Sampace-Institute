import { useState } from "react";
import { BRAND as C, SITE } from "../constants";

const W = C.white;

export default function EnquiryModal({ division: d, onClose }) {
  const [form,   setForm]   = useState({});
  const [errors, setErrors] = useState({});
  const [done,   setDone]   = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const req = (fields) => {
    const e = {};
    fields.forEach(k => { if (!form[k]?.trim()) e[k] = "Required"; });
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

  const INTEREST_PLACEHOLDER = {
    publish:      "e.g. Purchase textbooks, E-books, Curriculum resources",
    consult:      "e.g. School setup, Curriculum review, Accreditation support",
    research:     "e.g. Research partnership, Journal submission, Innovation hub",
    edtech:       "e.g. School management system, LMS, AI tools for my school",
    scholarships: "e.g. Undergraduate scholarship, Fellowship, Financial aid",
    careers:      "e.g. Teacher position, Graduate role, Internship, Volunteer",
  };

  const submit = async () => {
    if (!req(["name","email","phone"])) return;
    setSaving(true);
    const s = window.__supabase;
    if (s) {
      await s.from("applications").insert({
        reference: `ENQ-${d.id.toUpperCase()}-${Date.now()}`,
        school_id: d.id,
        applicant_name: form.name,
        email: form.email,
        phone: form.phone,
        program: form.interest || "General Enquiry",
        admin_notes: form.message || "",
        status: "pending",
        app_type: "inquiry",
      }).then(() => {}).catch(() => {});
    }
    setSaving(false);
    setDone(true);
  };

  if (done) return (
    <Modal onClose={onClose}>
      <div style={{ textAlign:"center", padding:"20px 0" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>✅</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:W, marginBottom:8 }}>Enquiry Sent!</div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.8, marginBottom:24, maxWidth:300, margin:"0 auto 24px" }}>
          Thank you for contacting <strong style={{ color:d.color }}>{d.name}</strong>. Our team will respond within 24 hours.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <a href={SITE.whatsapp} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:W, padding:"10px 20px", borderRadius:9, fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp for Faster Reply</a>
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
            <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>Send an Enquiry</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,.06)", border:"none", color:"rgba(255,255,255,.5)", width:30, height:30, borderRadius:7, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
      </div>

      {/* Info banner */}
      <div style={{ background:`${d.color}12`, border:`1px solid ${d.color}25`, borderRadius:10, padding:"12px 14px", marginBottom:20, fontSize:12, color:"rgba(255,255,255,.55)", lineHeight:1.7 }}>
        {d.icon} <strong style={{ color:W }}>{d.name}</strong> — Our team will get back to you within 24 hours. For faster response, use the WhatsApp button below.
      </div>

      {/* Form */}
      <div>
        <label style={lbl}>Full Name *</label>
        <input style={{ ...inp, borderColor:errors.name?"#EF4444":"rgba(255,255,255,.12)" }} placeholder="Your full name" value={form.name||""} onChange={e=>set("name",e.target.value)}/>
        {errors.name && <div style={{ color:"#EF4444", fontSize:10, marginBottom:6 }}>{errors.name}</div>}

        <label style={lbl}>Email Address *</label>
        <input style={{ ...inp, borderColor:errors.email?"#EF4444":"rgba(255,255,255,.12)" }} type="email" placeholder="your@email.com" value={form.email||""} onChange={e=>set("email",e.target.value)}/>
        {errors.email && <div style={{ color:"#EF4444", fontSize:10, marginBottom:6 }}>{errors.email}</div>}

        <label style={lbl}>Phone / WhatsApp *</label>
        <input style={{ ...inp, borderColor:errors.phone?"#EF4444":"rgba(255,255,255,.12)" }} type="tel" placeholder="+234..." value={form.phone||""} onChange={e=>set("phone",e.target.value)}/>
        {errors.phone && <div style={{ color:"#EF4444", fontSize:10, marginBottom:6 }}>{errors.phone}</div>}

        <label style={lbl}>What are you interested in?</label>
        <input style={inp} placeholder={INTEREST_PLACEHOLDER[d.id] || "Tell us what you need"} value={form.interest||""} onChange={e=>set("interest",e.target.value)}/>

        <label style={lbl}>Message / Additional Details</label>
        <textarea style={{ ...inp, minHeight:80, resize:"vertical" }} placeholder="Tell us more about your specific needs, timeline or any questions you have..." value={form.message||""} onChange={e=>set("message",e.target.value)}/>
      </div>

      {/* Actions */}
      <div style={{ display:"flex", gap:10, marginTop:8 }}>
        <a href={SITE.whatsapp} style={{ flex:1, background:"linear-gradient(135deg,#25D366,#128C7E)", color:W, padding:"11px", borderRadius:9, fontSize:11, fontWeight:700, textDecoration:"none", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          💬 WhatsApp
        </a>
        <button onClick={submit} disabled={saving} style={{ flex:2, background:`linear-gradient(135deg,${d.color},${d.g2})`, border:"none", color:W, padding:"11px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", opacity:saving?0.7:1 }}>
          {saving ? "Sending..." : "Send Enquiry ✓"}
        </button>
      </div>
    </Modal>
  );
}

function Modal({ children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", backdropFilter:"blur(8px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:"rgba(6,15,30,.97)", border:"1px solid rgba(255,255,255,.1)", borderRadius:18, padding:"clamp(20px,4vw,32px)", width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto", fontFamily:"'Syne',sans-serif" }}>
        {children}
      </div>
    </div>
  );
}
