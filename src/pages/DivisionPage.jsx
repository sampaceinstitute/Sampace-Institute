import { useState } from "react";
import { BRAND as C, SITE } from "../constants";
import ApplyModal from "../components/ApplyModal";
import EnquiryModal from "../components/EnquiryModal";

const W = C.white;
const N = C.navy;
const G = C.gold;

export default function DivisionPage({ division: d, onBack, onLogin }) {
  const [showApply,   setShowApply]   = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [activeTab,   setActiveTab]   = useState("overview");

  const isEnquiry = d.applyType === "inquiry";

  const TABS = isEnquiry
    ? ["overview", "services", "faqs"]
    : ["overview", "programmes", "admission", "faqs"];

  const TAB_LABELS = {
    overview:   "Overview",
    programmes: "Programmes",
    services:   "Services",
    admission:  "Admission",
    faqs:       "FAQs",
  };

  const FAQS = {
    digital: [
      ["Do I need prior experience to join?","No. Most programmes begin from the basics. We have beginner, intermediate and advanced tracks. You just need a willingness to learn."],
      ["Will I receive a certificate?","Yes. You receive a SAMPACE Digital Campus certificate on successful completion of any programme."],
      ["Are classes live or self-paced?","Both options are available. We offer instructor-led live sessions and self-paced recorded courses depending on the programme."],
      ["How long do programmes take?","From 4 weeks (short skills courses) to 6 months (comprehensive programmes like Web Development or IELTS)."],
    ],
    extramural: [
      ["What examinations do you prepare students for?","WAEC, NECO, JAMB/UTME, BECE, GCE, Cambridge, IELTS and SAT. We cover all major Nigerian and international examinations."],
      ["When are classes available?","Morning, afternoon and evening classes are available Monday to Saturday. Weekend-only options also available."],
      ["Is there CBT practice included?","Yes. CBT (Computer-Based Testing) practice is integrated into our examination preparation programmes at no extra cost."],
      ["Can adults enroll for lessons?","Absolutely. We have dedicated adult learning, remedial and pre-university lesson programmes."],
    ],
    professional: [
      ["Who are these programmes designed for?","Teachers, school administrators, graduates, professionals, entrepreneurs and anyone seeking to develop workplace or leadership skills."],
      ["Are CPD certificates issued?","Yes. Certificates of professional development are issued on completion of all professional programmes."],
      ["Can organisations book group training?","Yes. We offer corporate and institutional group bookings. Contact us for a custom training proposal."],
      ["Are sessions online or in-person?","Both options are available depending on the programme and your location."],
    ],
    consult: [
      ["What types of schools do you consult for?","Primary schools, secondary schools, tutorial centres, vocational institutions and educational organisations."],
      ["How does a consulting engagement begin?","Contact us with your needs. We arrange a consultation call, assess your situation and propose a tailored engagement."],
      ["Do you offer remote consultancy?","Yes. Most of our consultancy work can be done remotely. On-site visits can be arranged where necessary."],
      ["What is the typical duration of a project?","Depends on scope. Short advisory engagements can be 1-2 weeks. School development projects may run 1-6 months."],
    ],
    research: [
      ["Do you complete research projects for students?","No. We provide research assistance, training and support — not project completion. Our services are ethical research support."],
      ["What data analysis software do you use?","We work with Excel and SPSS primarily. Training in both is also available."],
      ["Do you offer printing and document services?","Yes. Our computer centre offers printing, scanning, photocopying, CV preparation and professional documentation services."],
      ["Can I access computer services without research support?","Yes. Computer access, internet, printing and documentation services are available independently."],
    ],
    edtech: [
      ["Do you build websites for all schools?","Yes. We build websites for primary schools, secondary schools, tutorial centres and other educational institutions."],
      ["What LMS platforms do you implement?","We work with established proven platforms and configure them for your school's needs. We are also developing the SAMPACE ERP."],
      ["What is the SAMPACE ERP?","It is SAMPACE's own school management system currently in development, covering admissions, results, attendance, fees and portals."],
      ["How do you support schools after setup?","We provide training, documentation and ongoing technical support. Support packages are available."],
    ],
  };

  const faqList = FAQS[d.id] || [
    ["How do I get started?","Contact us via WhatsApp or email and our team will guide you through the process."],
    ["How quickly do you respond?","We respond to all enquiries within 24 hours on business days."],
    ["Are services available online?","Yes. All our services are available remotely. Physical locations are also available in Nigeria."],
    ["Can I get a custom quote?","Yes. Contact us with your specific needs and we will prepare a tailored proposal."],
  ];

  return (
    <div style={{ fontFamily:"'Syne',sans-serif", background:C.dark, color:W, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .btn-primary{cursor:pointer;transition:all .25s;font-weight:700;border:none}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .tab-btn{cursor:pointer;transition:all .2s;border:none;background:none}
        .faq-item{transition:all .2s}
        .faq-item:hover{background:rgba(255,255,255,.03)!important}
      `}</style>

      {/* ── HEADER BAR ── */}
      <div style={{ padding:"12px clamp(16px,4vw,48px)", background:"rgba(6,15,30,.96)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:200 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)", color:W, padding:"7px 16px", borderRadius:7, fontSize:12, cursor:"pointer", fontWeight:600 }}>← Back</button>
        <div style={{ display:"flex", alignItems:"center", gap:8, flex:1 }}>
          <span style={{ fontSize:20 }}>{d.icon}</span>
          <div>
            <div style={{ fontWeight:800, fontSize:13, color:W }}>{d.name}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>{d.short}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>onLogin("student")} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:W, padding:"7px 14px", borderRadius:7, fontSize:11, cursor:"pointer" }}>Login</button>
          {isEnquiry
            ? <button className="btn-primary" onClick={()=>setShowEnquiry(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"7px 16px", borderRadius:7, fontSize:11 }}>{d.btnLabel}</button>
            : <button className="btn-primary" onClick={()=>setShowApply(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"7px 16px", borderRadius:7, fontSize:11 }}>{d.btnLabel}</button>
          }
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{ background:`linear-gradient(135deg,${d.color}22,rgba(6,15,30,.9))`, borderBottom:"1px solid rgba(255,255,255,.06)", padding:"60px clamp(20px,6vw,80px) 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
            <span style={{ background:`${d.color}18`, border:`1px solid ${d.color}33`, color:d.color, padding:"4px 12px", borderRadius:100, fontSize:10, fontWeight:700 }}>Division {d.num}</span>
            <span style={{ background:"rgba(16,185,129,.1)", color:"#10B981", padding:"4px 12px", borderRadius:100, fontSize:10, fontWeight:700 }}>🟢 Open</span>
            <span style={{ background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.5)", padding:"4px 12px", borderRadius:100, fontSize:10, fontWeight:600 }}>Online & Onsite</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,5vw,56px)", fontWeight:700, marginBottom:12, lineHeight:1.15 }}>{d.name}</h1>
          <p style={{ fontSize:"clamp(13px,1.6vw,16px)", color:"rgba(255,255,255,.55)", lineHeight:1.8, maxWidth:640, marginBottom:24 }}>{d.desc}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
            {d.tags.map(t=><span key={t} style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:100, padding:"4px 12px", fontSize:11, color:"rgba(255,255,255,.5)", fontWeight:600 }}>{t}</span>)}
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {isEnquiry ? (
              <>
                <button className="btn-primary" onClick={()=>setShowEnquiry(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"12px 28px", borderRadius:10, fontSize:13 }}>{d.btnLabel} →</button>
                <a href={SITE.whatsapp} style={{ background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.2)", color:"#4AE54A", padding:"12px 22px", borderRadius:10, fontSize:12, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>💬 WhatsApp</a>
              </>
            ) : (
              <>
                <button className="btn-primary" onClick={()=>setShowApply(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"12px 28px", borderRadius:10, fontSize:13 }}>{d.btnLabel} →</button>
                <a href={SITE.whatsapp} style={{ background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.2)", color:"#4AE54A", padding:"12px 22px", borderRadius:10, fontSize:12, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>💬 Enquire on WhatsApp</a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ background:"rgba(6,15,30,.8)", borderBottom:"1px solid rgba(255,255,255,.06)", padding:"0 clamp(20px,6vw,80px)", position:"sticky", top:56, zIndex:100 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:0 }}>
          {TABS.map(tab=>(
            <button key={tab} className="tab-btn" onClick={()=>setActiveTab(tab)}
              style={{ padding:"14px 20px", fontSize:12, fontWeight:activeTab===tab?700:500, color:activeTab===tab?d.color:"rgba(255,255,255,.4)", borderBottom:activeTab===tab?`2px solid ${d.color}`:"2px solid transparent" }}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"40px clamp(20px,6vw,80px) 80px" }}>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:32 }}>
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:14 }}>About {d.name}</h2>
              <p style={{ color:"rgba(255,255,255,.55)", lineHeight:1.9, fontSize:13, marginBottom:20 }}>{d.desc}</p>
              <p style={{ color:"rgba(255,255,255,.5)", lineHeight:1.9, fontSize:13, marginBottom:24 }}>
                All {d.name} programmes are available both online and at our physical centres across Nigeria.
                Our experienced tutors deliver live and recorded sessions, ensuring flexibility for every learner.
              </p>
              <h3 style={{ fontSize:15, fontWeight:700, color:W, marginBottom:14 }}>What We Offer</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {d.programmes.map((prog,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, borderLeft:`3px solid ${d.color}` }}>
                    <span style={{ color:d.color, fontSize:14 }}>✓</span>
                    <span style={{ fontSize:13, color:W, fontWeight:600 }}>{prog}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* CTA Card */}
              <div style={{ background:`linear-gradient(135deg,${d.color}18,rgba(255,255,255,.02))`, border:`1px solid ${d.color}33`, borderRadius:16, padding:"24px", marginBottom:16 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, marginBottom:8 }}>Ready to Begin?</div>
                <p style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginBottom:20, lineHeight:1.7 }}>
                  {isEnquiry ? "Send an enquiry and our team will get back to you within 24 hours." : "Apply today and join thousands of SAMPACE learners across Nigeria."}
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {isEnquiry ? (
                    <button className="btn-primary" onClick={()=>setShowEnquiry(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"11px", borderRadius:9, fontSize:12 }}>{d.btnLabel} →</button>
                  ) : (
                    <button className="btn-primary" onClick={()=>setShowApply(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"11px", borderRadius:9, fontSize:12 }}>{d.btnLabel} →</button>
                  )}
                  <a href={SITE.whatsapp} style={{ background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.2)", color:"#4AE54A", padding:"11px", borderRadius:9, fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>💬 WhatsApp Us</a>
                  <button onClick={()=>onLogin("student")} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", padding:"11px", borderRadius:9, fontSize:12, cursor:"pointer", fontWeight:600 }}>Already enrolled? Login</button>
                </div>
              </div>
              {/* Contact card */}
              <div style={{ background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:"18px" }}>
                <div style={{ fontSize:12, fontWeight:700, color:W, marginBottom:12 }}>Need Help?</div>
                {[["📧","Email",SITE.email],["💬","WhatsApp","Chat with us"]].map(([icon,label,val])=>(
                  <div key={label} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
                    <span style={{ fontSize:16 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.3)", textTransform:"uppercase", letterSpacing:1 }}>{label}</div>
                      <div style={{ fontSize:11, color:W, fontWeight:600 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROGRAMMES */}
        {activeTab === "programmes" && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:6 }}>Programmes & Courses</h2>
            <p style={{ color:"rgba(255,255,255,.4)", fontSize:13, marginBottom:28 }}>All programmes available online and onsite.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {d.programmes.map((prog,i)=>(
                <div key={i} style={{ background:"rgba(255,255,255,.025)", border:`1px solid ${d.color}22`, borderRadius:14, padding:"20px", borderTop:`3px solid ${d.color}` }}>
                  <div style={{ fontSize:18, marginBottom:8 }}>{d.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:W, marginBottom:6 }}>{prog}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", lineHeight:1.6, marginBottom:14 }}>
                    Available online and onsite · Flexible schedule · Certificate on completion
                  </div>
                  <button className="btn-primary" onClick={()=>isEnquiry?setShowEnquiry(true):setShowApply(true)}
                    style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"8px 16px", borderRadius:7, fontSize:11, width:"100%" }}>
                    {isEnquiry ? "Enquire" : "Apply"} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES (for inquiry divisions) */}
        {activeTab === "services" && (
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:6 }}>Our Services</h2>
            <p style={{ color:"rgba(255,255,255,.4)", fontSize:13, marginBottom:28 }}>We provide tailored solutions for institutions, organisations and individuals.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {d.programmes.map((prog,i)=>(
                <div key={i} style={{ background:"rgba(255,255,255,.025)", border:`1px solid ${d.color}22`, borderRadius:14, padding:"20px" }}>
                  <div style={{ fontSize:18, marginBottom:8 }}>{d.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:W, marginBottom:6 }}>{prog}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", lineHeight:1.6, marginBottom:14 }}>
                    Bespoke solution tailored to your organisation's needs. Contact us for pricing and details.
                  </div>
                  <button className="btn-primary" onClick={()=>setShowEnquiry(true)}
                    style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"8px 16px", borderRadius:7, fontSize:11, width:"100%" }}>
                    Get a Quote →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMISSION */}
        {activeTab === "admission" && (
          <div style={{ maxWidth:720 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:6 }}>Admission Process</h2>
            <p style={{ color:"rgba(255,255,255,.4)", fontSize:13, marginBottom:32 }}>Simple, fast and fully online. Apply in minutes.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:32 }}>
              {[
                ["1","Submit Application","Fill out the online application form with your details and programme choice."],
                ["2","Admin Review","Our admissions team reviews your application within 72 hours and contacts you."],
                ["3","Acceptance Letter","Receive your acceptance letter with fee details and next steps."],
                ["4","Make Payment","Pay via Paystack (card, bank transfer, USSD). Instalment plans available."],
                ["5","Portal Access","Your student portal is activated immediately after payment confirmation."],
                ["6","Start Learning","Attend orientation, join your first live class and access all resources."],
              ].map(([n,t,d_])=>(
                <div key={n} style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"18px", background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:12 }}>
                  <div style={{ width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${d.color},${d.g2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:W,flexShrink:0 }}>{n}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:W, marginBottom:4 }}>{t}</div>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>{d_}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={()=>setShowApply(true)} style={{ background:`linear-gradient(135deg,${d.color},${d.g2})`, color:W, padding:"12px 32px", borderRadius:10, fontSize:13 }}>
              Start Application →
            </button>
          </div>
        )}

        {/* FAQS */}
        {activeTab === "faqs" && (
          <div style={{ maxWidth:720 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:6 }}>Frequently Asked Questions</h2>
            <p style={{ color:"rgba(255,255,255,.4)", fontSize:13, marginBottom:28 }}>Everything you need to know about {d.name}.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {faqList.map(([q,a],i)=>(
                <FAQItem key={i} q={q} a={a} color={d.color} />
              ))}
            </div>
            <div style={{ marginTop:32, background:`${d.color}10`, border:`1px solid ${d.color}22`, borderRadius:14, padding:"20px", textAlign:"center" }}>
              <div style={{ fontSize:13, fontWeight:700, color:W, marginBottom:6 }}>Still have questions?</div>
              <p style={{ fontSize:12, color:"rgba(255,255,255,.4)", marginBottom:16 }}>Our team is happy to help. Reach us on WhatsApp for a faster response.</p>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <a href={SITE.whatsapp} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:W, padding:"10px 20px", borderRadius:9, fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp Us</a>
                <a href={`mailto:${SITE.email}`} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", color:W, padding:"10px 20px", borderRadius:9, fontSize:12, fontWeight:600, textDecoration:"none" }}>📧 Email Us</a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {showApply && <ApplyModal division={d} onClose={()=>setShowApply(false)} />}
      {showEnquiry && <EnquiryModal division={d} onClose={()=>setShowEnquiry(false)} />}
    </div>
  );
}

function FAQItem({ q, a, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" style={{ background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, overflow:"hidden" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{q}</span>
        <span style={{ fontSize:16, color:color, flexShrink:0, marginLeft:12, transition:"transform .2s", transform:open?"rotate(45deg)":"rotate(0)" }}>+</span>
      </button>
      {open && <div style={{ padding:"0 18px 16px", fontSize:12, color:"rgba(255,255,255,.5)", lineHeight:1.8 }}>{a}</div>}
    </div>
  );
}
