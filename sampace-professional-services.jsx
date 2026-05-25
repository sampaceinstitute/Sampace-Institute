import { useState } from "react";

const C = {
  navy: "#0B1F3A", gold: "#C9A84C", goldLight: "#FFD54F",
  amber: "#F57F17", amberLight: "#FFF8E1", amberBorder: "#FFE082",
  white: "#FFFFFF", cream: "#FFFDF5", slate: "#64748B",
  border: "#E2E8F0", green: "#10B981", blue: "#1565C0",
};

// ─── SERVICES DATA ───
const services = [
  {
    id: "cv", icon: "📄", category: "Career Services",
    title: "CV & Resume Writing",
    desc: "Professionally crafted CVs that get noticed. We tailor every CV to your industry, experience level and target role — from fresh graduates to senior executives.",
    deliverables: ["ATS-optimised CV document", "Cover letter", "LinkedIn profile rewrite", "Unlimited revisions until satisfied"],
    turnaround: "3–5 business days",
    suitable: "Fresh graduates, job seekers, career changers, executives",
    color: "#BF360C",
  },
  {
    id: "linkedin", icon: "💼", category: "Career Services",
    title: "LinkedIn Profile Optimisation",
    desc: "Transform your LinkedIn into a magnet for recruiters and opportunities. Keyword-rich, professionally written, and conversion-optimised for your target industry.",
    deliverables: ["Complete profile rewrite", "Headline & summary optimisation", "Skills & endorsements strategy", "Connection growth guide"],
    turnaround: "2–3 business days",
    suitable: "Professionals, entrepreneurs, job seekers",
    color: "#0277BD",
  },
  {
    id: "admissions", icon: "🎓", category: "Educational Consulting",
    title: "University Admission Support",
    desc: "End-to-end support for university applications — Nigerian and international. From choosing the right institution to submitting a winning application.",
    deliverables: ["University shortlisting & course matching", "Personal statement / SOP writing", "Application form completion", "Document checklist & verification", "Interview preparation"],
    turnaround: "1–2 weeks per application",
    suitable: "SS3 students, school leavers, postgraduate applicants",
    color: "#1565C0",
  },
  {
    id: "scholarship", icon: "🏆", category: "Educational Consulting",
    title: "Scholarship Research & Application",
    desc: "We identify and apply for scholarships matching your profile — local, international, government and institutional. Increase your chances significantly with our support.",
    deliverables: ["Scholarship matching report", "Application essays / motivation letters", "Document preparation", "Submission support", "Follow-up strategy"],
    turnaround: "Varies by scholarship deadline",
    suitable: "Undergraduate and postgraduate students",
    color: "#2E7D32",
  },
  {
    id: "studyabroad", icon: "🌍", category: "Study Abroad",
    title: "Study Abroad Guidance",
    desc: "Comprehensive guidance for studying abroad — UK, USA, Canada, Australia, Europe and beyond. We handle everything from school selection to visa support.",
    deliverables: ["Destination & institution advisory", "Course & career alignment", "Application support", "Visa application guidance", "Pre-departure briefing"],
    turnaround: "4–8 weeks process",
    suitable: "Students targeting international universities",
    color: "#880E4F",
  },
  {
    id: "corporate", icon: "🏢", category: "Corporate Training",
    title: "Corporate Training Consulting",
    desc: "Bespoke training solutions for organisations. From soft skills to professional development, leadership and digital literacy — delivered to your team online or on-site.",
    deliverables: ["Training needs assessment", "Custom curriculum design", "Live or recorded delivery", "Post-training assessment", "Certificates for participants"],
    turnaround: "2–4 weeks from brief",
    suitable: "Companies, NGOs, government agencies, SMEs",
    color: "#00695C",
  },
  {
    id: "sop", icon: "✍️", category: "Career Services",
    title: "Statement of Purpose Writing",
    desc: "A compelling SOP can be the difference between acceptance and rejection. Our expert writers craft personalised, authentic statements that tell your story powerfully.",
    deliverables: ["Tailored SOP draft", "Two revision rounds", "Proofreading & editing", "Plagiarism check"],
    turnaround: "3–5 business days",
    suitable: "Postgraduate & international study applicants",
    color: "#4A148C",
  },
  {
    id: "counselling", icon: "🧭", category: "Educational Consulting",
    title: "Educational Counselling",
    desc: "Confused about what to study or where? Our educational counsellors help you align your strengths, interests and career goals with the right course and institution.",
    deliverables: ["1-on-1 counselling session (60 minutes)", "Career interest assessment", "Course & institution recommendations", "Written action plan"],
    turnaround: "Session within 48 hours of booking",
    suitable: "Students at any stage of education",
    color: "#E65100",
  },
  {
    id: "transcript", icon: "📋", category: "Documentation",
    title: "Document Attestation Support",
    desc: "Guidance and support for document attestation, notarisation and verification for international purposes — NYSC, WAEC, university transcripts and more.",
    deliverables: ["Document verification checklist", "Step-by-step process guide", "Institution liaison support", "Follow-up assistance"],
    turnaround: "Varies by institution",
    suitable: "Anyone requiring official document authentication",
    color: "#37474F",
  },
];

const categories = ["All", ...new Set(services.map(s => s.category))];

const testimonials = [
  { name: "Adaeze Okonkwo",    service: "CV & Resume Writing",           text: "I got 3 interview calls within a week of uploading my new CV. The team understood exactly what I needed.", role: "Marketing Executive" },
  { name: "Emeka Nwosu",       service: "University Admission Support",  text: "They helped me secure admission into a UK university with a full scholarship. Absolutely life-changing service.", role: "Postgraduate Student" },
  { name: "Fatima Abdullahi",  service: "Corporate Training",            text: "Our team of 40 completed the leadership training and the results have been incredible. Professional and thorough.", role: "HR Manager, Lagos" },
  { name: "David Adeleke",     service: "Study Abroad Guidance",         text: "From choosing Canada to getting my student visa — they were with me every step. I could not have done it alone.", role: "Engineering Student, Toronto" },
];

// ─── HELPERS ───
function Tag({ text, color }) {
  return <span style={{ background:`${color}12`, color, padding:"3px 12px", borderRadius:100, fontSize:11, fontWeight:600 }}>{text}</span>;
}
function SectionLabel({ text }) {
  return <div style={{ fontSize:11, letterSpacing:4, color:C.gold, textTransform:"uppercase", marginBottom:12, fontWeight:600 }}>{text}</div>;
}

// ─── NAV ───
function Nav({ view, setView }) {
  return (
    <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(26,16,0,0.97)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(201,168,76,0.2)", padding:"0 48px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:42, height:42, background:`linear-gradient(135deg,${C.amber},${C.gold})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🤝</div>
        <div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:3, background:`linear-gradient(90deg,${C.gold},#FFD54F)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>PROFESSIONAL SERVICES</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:2 }}>SAMPACE INSTITUTE · School 09</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:4 }}>
        {[["home","🏠 Home"],["services","🗂 Services"],["inquiry","✉️ Inquire"]].map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} style={{ background:view===v?`linear-gradient(135deg,${C.amber},${C.gold})`:"transparent", border:"none", color:view===v?"#fff":"rgba(255,255,255,0.55)", padding:"7px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .2s" }}>{l}</button>
        ))}
      </div>
      <button onClick={() => setView("inquiry")} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.navy, border:"none", padding:"9px 22px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>
        Make an Inquiry
      </button>
    </nav>
  );
}

// ─── HOME PAGE ───
function HomePage({ setView }) {
  const [activeTest, setActiveTest] = useState(0);

  return (
    <div style={{ background:C.cream }}>

      {/* Hero */}
      <section style={{ background:`linear-gradient(160deg,#0D0800 0%,#1A1000 35%,#2C1800 70%,#3D2000 100%)`, padding:"88px 48px", minHeight:"88vh", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(245,127,23,0.06) 0%, transparent 50%)` }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)", backgroundSize:"72px 72px" }} />

        {/* Floating service badges */}
        {[["📄","CV Writing","top:18%,left:5%"],["🎓","Admissions","top:22%,right:5%"],["🌍","Study Abroad","bottom:28%,left:4%"],["🏢","Corporate","bottom:22%,right:5%"]].map(([icon,label,pos])=>(
          <div key={label} style={{ position:"absolute", ...Object.fromEntries(pos.split(",").map(p=>p.trim().split(":"))), zIndex:2 }}>
            <div style={{ background:"rgba(201,168,76,0.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:14, padding:"14px 18px", textAlign:"center" }}>
              <div style={{ fontSize:26, marginBottom:4 }}>{icon}</div>
              <div style={{ fontSize:10, color:C.gold, letterSpacing:1.5, fontWeight:600 }}>{label}</div>
            </div>
          </div>
        ))}

        <div style={{ position:"relative", zIndex:3, maxWidth:820, margin:"0 auto" }}>
          <div style={{ display:"inline-block", border:"1px solid rgba(201,168,76,0.5)", color:C.gold, padding:"5px 20px", borderRadius:100, fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:28, background:"rgba(201,168,76,0.08)" }}>
            🤝 Personalised · Expert · Results-Driven
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,7vw,90px)", fontWeight:700, color:"#fff", lineHeight:0.92, letterSpacing:-2, marginBottom:16 }}>
            <span style={{ background:"linear-gradient(135deg,#fff,#FFD54F)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Professional</span><br/>
            <span style={{ background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontStyle:"italic" }}>Services</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, lineHeight:1.9, maxWidth:560, margin:"20px auto 16px" }}>
            Expert CV writing, university admission support, study abroad guidance, corporate training and educational consulting — tailored entirely to you.
          </p>
          <div style={{ background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:10, padding:"10px 20px", display:"inline-block", marginBottom:36 }}>
            <span style={{ fontSize:13, color:C.gold, fontWeight:600 }}>💡 No fixed pricing — all services are custom-quoted after your inquiry</span>
          </div>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setView("inquiry")} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.navy, border:"none", padding:"15px 40px", borderRadius:8, fontSize:14, fontWeight:800, cursor:"pointer", boxShadow:`0 8px 28px rgba(201,168,76,0.35)` }}>
              ✉️ Make an Inquiry →
            </button>
            <button onClick={()=>setView("services")} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"15px 32px", borderRadius:8, fontSize:14, cursor:"pointer" }}>
              Browse Services →
            </button>
          </div>
          <div style={{ display:"flex", gap:48, justifyContent:"center", marginTop:60, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {[["9+","Services Offered"],["48hrs","Response Time"],["100%","Personalised"],["Expert","Consultants"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:38, color:C.gold, letterSpacing:2, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding:"80px 48px", background:C.white }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <SectionLabel text="Simple Process" />
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:700, color:C.navy }}>
              How It <em style={{ color:C.amber, fontStyle:"italic" }}>Works</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, position:"relative" }}>
            <div style={{ position:"absolute", top:40, left:"12.5%", right:"12.5%", height:2, background:`linear-gradient(90deg,${C.gold},${C.amber},${C.gold},${C.amber})`, zIndex:0 }} />
            {[
              { step:"01", icon:"✉️", title:"Submit Inquiry",    desc:"Fill our inquiry form with your details and what you need. No obligation, no pressure." },
              { step:"02", icon:"💬", title:"Consultation Call", desc:"Our consultant contacts you within 48 hours to understand your needs fully." },
              { step:"03", icon:"📋", title:"Custom Proposal",   desc:"We send you a personalised service proposal and timeline." },
              { step:"04", icon:"🏆", title:"Delivery & Results", desc:"We deliver your service on time. Your success is our only goal." },
            ].map((s,i)=>(
              <div key={i} style={{ textAlign:"center", padding:"0 20px", position:"relative", zIndex:1 }}>
                <div style={{ width:80, height:80, borderRadius:"50%", background:`linear-gradient(135deg,${C.amber},${C.gold})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 20px", boxShadow:`0 8px 24px rgba(245,127,23,0.25)`, border:"3px solid #fff" }}>{s.icon}</div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:13, letterSpacing:3, color:C.gold, marginBottom:6 }}>STEP {s.step}</div>
                <div style={{ fontWeight:700, fontSize:16, color:C.navy, marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:13, color:C.slate, lineHeight:1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ padding:"80px 48px", background:C.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel text="Our Services" />
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:700, color:C.navy }}>
              What We <em style={{ color:C.amber, fontStyle:"italic" }}>Offer</em>
            </h2>
            <p style={{ color:C.slate, maxWidth:520, margin:"16px auto 0", lineHeight:1.8 }}>
              All services are custom-priced based on your specific needs. Contact us for a personalised quote — no commitment required.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {services.slice(0,6).map(s=>(
              <div key={s.id} style={{ background:C.white, borderRadius:14, padding:"28px 24px", border:`1px solid ${C.border}`, borderTop:`4px solid ${s.color}`, transition:"all .3s", cursor:"pointer" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 16px 40px ${s.color}15`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${s.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{s.icon}</div>
                  <Tag text={s.category} color={s.color} />
                </div>
                <div style={{ fontWeight:700, fontSize:16, color:C.navy, marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:13, color:C.slate, lineHeight:1.7, marginBottom:16 }}>{s.desc}</div>
                <div style={{ background:C.cream, borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
                  <div style={{ fontSize:11, color:C.gold, fontWeight:700, marginBottom:4 }}>⏱ Turnaround</div>
                  <div style={{ fontSize:12, color:C.navy, fontWeight:500 }}>{s.turnaround}</div>
                </div>
                <button onClick={()=>setView("inquiry")} style={{ width:"100%", background:`linear-gradient(135deg,${s.color},${s.color}cc)`, color:"#fff", border:"none", padding:"10px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                  Inquire About This Service →
                </button>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:32 }}>
            <button onClick={()=>setView("services")} style={{ background:`linear-gradient(135deg,${C.amber},${C.gold})`, color:"#fff", border:"none", padding:"13px 36px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              View All {services.length} Services →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding:"80px 48px", background:C.white }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel text="Client Stories" />
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:700, color:C.navy }}>
              Real <em style={{ color:C.amber, fontStyle:"italic" }}>Results</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
            {testimonials.map((t,i)=>(
              <div key={i} style={{ background:C.cream, borderRadius:14, padding:"28px 28px", border:`1px solid ${C.amberBorder}`, borderLeft:`4px solid ${C.gold}` }}>
                <div style={{ fontSize:36, color:C.gold, fontFamily:"'Cormorant Garamond',serif", lineHeight:1, marginBottom:12 }}>"</div>
                <p style={{ fontSize:15, color:C.navy, lineHeight:1.8, fontStyle:"italic", marginBottom:20 }}>{t.text}</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${C.amber},${C.gold})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#fff", flexShrink:0 }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{t.name}</div>
                    <div style={{ fontSize:12, color:C.slate }}>{t.role}</div>
                    <div style={{ fontSize:11, color:C.amber, fontWeight:600, marginTop:2 }}>{t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg,#0D0800,${C.amber}40,#1A1000)`, padding:"80px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:2 }}>
          <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(40px,6vw,72px)", color:"#fff", letterSpacing:3, lineHeight:1, marginBottom:12 }}>
            LET'S TALK ABOUT<br/>
            <span style={{ background:`linear-gradient(90deg,${C.gold},${C.goldLight})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>YOUR GOALS</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:460, margin:"0 auto 36px", lineHeight:1.8 }}>
            No commitment. No fixed price. Just a conversation about what you need and how we can help. Reach out today.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setView("inquiry")} style={{ background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.navy, border:"none", padding:"15px 44px", borderRadius:8, fontSize:15, fontWeight:800, cursor:"pointer", boxShadow:`0 8px 28px rgba(201,168,76,0.3)` }}>
              ✉️ Send Us an Inquiry
            </button>
            <a href="https://wa.me/" style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", padding:"15px 36px", borderRadius:8, fontSize:15, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ───
function ServicesPage({ setView }) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const filtered = filter === "All" ? services : services.filter(s => s.category === filter);

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"60px 48px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ marginBottom:40 }}>
          <SectionLabel text="All Services" />
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:700, color:C.navy, marginBottom:8 }}>
            Our <em style={{ color:C.amber, fontStyle:"italic" }}>Services</em>
          </h2>
          <p style={{ color:C.slate, maxWidth:540, lineHeight:1.8, marginBottom:28 }}>
            Every service is personalised. No price list is displayed — we quote based on your specific situation after a brief consultation. Reach out with no obligation.
          </p>
          {/* Notice */}
          <div style={{ background:C.amberLight, border:`1px solid ${C.amberBorder}`, borderRadius:10, padding:"14px 20px", display:"flex", gap:12, alignItems:"center", marginBottom:28, maxWidth:600 }}>
            <span style={{ fontSize:22 }}>💡</span>
            <div style={{ fontSize:13, color:C.navy, lineHeight:1.6 }}>
              <strong>No fixed pricing.</strong> All our services are custom-quoted based on your needs, complexity and timeline. We believe every client deserves a personalised approach.
            </div>
          </div>
          {/* Filter */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {categories.map(cat=>(
              <button key={cat} onClick={()=>setFilter(cat)} style={{ background:filter===cat?`linear-gradient(135deg,${C.amber},${C.gold})`:"#fff", border:`1px solid ${filter===cat?C.gold:C.border}`, color:filter===cat?"#fff":C.slate, padding:"7px 18px", borderRadius:100, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s" }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {filtered.map(s=>(
            <div key={s.id} style={{ background:C.white, borderRadius:14, overflow:"hidden", border:`1px solid ${C.border}`, borderTop:`4px solid ${s.color}`, transition:"all .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 36px ${s.color}15`;}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";}}>
              <div style={{ padding:"24px 24px 0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div style={{ width:44, height:44, borderRadius:10, background:`${s.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{s.icon}</div>
                  <Tag text={s.category} color={s.color} />
                </div>
                <div style={{ fontWeight:700, fontSize:15, color:C.navy, marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:13, color:C.slate, lineHeight:1.7, marginBottom:14 }}>{s.desc}</div>
                <div style={{ fontSize:12, color:C.amber, fontWeight:600, marginBottom:4 }}>⏱ {s.turnaround}</div>
                <div style={{ fontSize:12, color:C.slate, marginBottom:14 }}>👤 {s.suitable}</div>
              </div>

              {/* Expandable deliverables */}
              <div style={{ padding:"0 24px" }}>
                <button onClick={()=>setExpanded(expanded===s.id?null:s.id)} style={{ width:"100%", background:`${s.color}08`, border:`1px solid ${s.color}20`, color:s.color, padding:"8px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", marginBottom:expanded===s.id?0:16, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  {expanded===s.id?"▲ Hide Details":"▼ What's Included"}
                </button>
                {expanded===s.id&&(
                  <div style={{ background:`${s.color}06`, borderRadius:8, padding:"14px", marginBottom:16 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:C.navy, marginBottom:8 }}>What's included:</div>
                    {s.deliverables.map((d,i)=>(
                      <div key={i} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"flex-start" }}>
                        <span style={{ color:s.color, fontSize:12, marginTop:1, flexShrink:0 }}>✓</span>
                        <span style={{ fontSize:12, color:C.slate, lineHeight:1.5 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding:"0 24px 20px" }}>
                <button onClick={()=>setView("inquiry")} style={{ width:"100%", background:`linear-gradient(135deg,${s.color},${s.color}cc)`, color:"#fff", border:"none", padding:"11px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                  Inquire About This →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── INQUIRY FORM ───
function InquiryForm() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ background:C.cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:48 }}>
      <div style={{ background:C.white, borderRadius:20, padding:"60px 52px", textAlign:"center", maxWidth:540, boxShadow:"0 20px 60px rgba(0,0,0,0.08)" }}>
        <div style={{ width:80, height:80, background:`linear-gradient(135deg,${C.amber},${C.gold})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 24px", boxShadow:`0 8px 24px rgba(245,127,23,0.25)` }}>✅</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:C.navy, marginBottom:8 }}>Inquiry Received!</h2>
        <p style={{ color:C.slate, lineHeight:1.8, marginBottom:28 }}>
          Thank you for reaching out to SAMPACE Professional Services. Our consultant will contact you within <strong>48 hours</strong> via email or WhatsApp to discuss your needs.
        </p>
        <div style={{ background:C.amberLight, border:`1px solid ${C.amberBorder}`, borderRadius:12, padding:"20px 24px", marginBottom:28, textAlign:"left" }}>
          {[["Reference No.", `PS-${Math.floor(Math.random()*9000+1000)}`],["Service Requested", services.find(s=>s.id===selectedService)?.title||"General Inquiry"],["Response Time","Within 48 hours"],["Contact Method","Email + WhatsApp"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.amberBorder}` }}>
              <span style={{ fontSize:12, color:C.slate }}>{k}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:10, padding:"14px", marginBottom:24, fontSize:13, color:"#065F46" }}>
          💬 You can also reach us directly on WhatsApp for a faster response
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <a href="https://wa.me/" style={{ background:`linear-gradient(135deg,#25D366,#128C7E)`, color:"#fff", border:"none", padding:"11px 24px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", textDecoration:"none" }}>💬 WhatsApp Us Now</a>
          <button onClick={()=>{ setSubmitted(false); setStep(1); setSelectedService(""); }} style={{ background:C.cream, border:`1px solid ${C.border}`, color:C.navy, padding:"11px 24px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>New Inquiry</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.cream, minHeight:"100vh", padding:"48px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ marginBottom:28 }}>
          <SectionLabel text="Get In Touch" />
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:44, fontWeight:700, color:C.navy, marginBottom:4 }}>
            Make an <em style={{ color:C.amber, fontStyle:"italic" }}>Inquiry</em>
          </h1>
          <p style={{ color:C.slate, lineHeight:1.7 }}>No commitment required. Tell us what you need and we will get back to you with a personalised proposal within 48 hours.</p>
        </div>

        {/* Notice Banner */}
        <div style={{ background:C.amberLight, border:`1px solid ${C.amberBorder}`, borderRadius:12, padding:"16px 20px", marginBottom:24, display:"flex", gap:12 }}>
          <span style={{ fontSize:22, flexShrink:0 }}>💡</span>
          <div style={{ fontSize:13, color:C.navy, lineHeight:1.6 }}>
            <strong>No pricing shown.</strong> Every service is quoted individually based on your needs. Submit this form and we will reach out with a tailored quote — absolutely no pressure.
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ background:C.white, borderRadius:12, padding:"18px 24px", marginBottom:20, border:`1px solid ${C.border}`, display:"flex", gap:0 }}>
          {["About You","Service Needed","Your Message"].map((label,i)=>(
            <div key={i} style={{ flex:1, display:"flex", alignItems:"center" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:i+1<step?"#10B981":i+1===step?`linear-gradient(135deg,${C.amber},${C.gold})`:"#F1F5F9", border:i+1>step?`2px solid ${C.border}`:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:i+1<=step?"#fff":C.slate, fontWeight:700 }}>{i+1<step?"✓":i+1}</div>
                <div style={{ fontSize:11, color:i+1===step?C.amber:C.slate, marginTop:5, fontWeight:i+1===step?700:400 }}>{label}</div>
              </div>
              {i<2&&<div style={{ height:2, flex:1, background:i+1<step?"#10B981":C.border, margin:"0 4px", marginBottom:20 }} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ background:`linear-gradient(135deg,#0D0800,${C.amber})`, padding:"20px 32px" }}>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:18, color:C.gold, letterSpacing:2 }}>STEP {step} OF 3</div>
            <div style={{ fontSize:15, color:"#fff", fontWeight:600 }}>{["Tell Us About Yourself","What Service Do You Need?","Your Message & Details"][step-1]}</div>
          </div>

          <div style={{ padding:"32px" }}>
            {step===1&&(
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
                {[["Full Name *","text"],["Email Address *","email"],["Phone / WhatsApp Number *","tel"],["Country / City *","text"],["Occupation / Current Status *","select:Student,Job Seeker,Working Professional,Business Owner,NGO/Organisation,Other"],["How Did You Hear About Us? *","select:Instagram,Facebook,WhatsApp,Google Search,Friend Referral,LinkedIn,Other"]].map(([label,type])=>(
                  <div key={label}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                    {type.startsWith("select")?(
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:13, outline:"none", background:"#fff", color:C.navy }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    ):(
                      <input type={type} style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:13, outline:"none", color:C.navy }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {step===2&&(
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:16 }}>Select the service you are interested in</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  {services.map(s=>(
                    <div key={s.id} onClick={()=>setSelectedService(s.id)} style={{ border:`2px solid ${selectedService===s.id?s.color:C.border}`, borderRadius:10, padding:"14px 16px", cursor:"pointer", background:selectedService===s.id?`${s.color}06`:"#fff", transition:"all .2s", display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontSize:22, flexShrink:0 }}>{s.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:13, color:selectedService===s.id?s.color:C.navy, lineHeight:1.2 }}>{s.title}</div>
                        <div style={{ fontSize:11, color:C.slate }}>{s.category}</div>
                      </div>
                      {selectedService===s.id&&<span style={{ color:s.color, fontSize:16, flexShrink:0 }}>✓</span>}
                    </div>
                  ))}
                  <div onClick={()=>setSelectedService("other")} style={{ border:`2px solid ${selectedService==="other"?C.gold:C.border}`, borderRadius:10, padding:"14px 16px", cursor:"pointer", background:selectedService==="other"?C.amberLight:"#fff", display:"flex", alignItems:"center", gap:12, gridColumn:"1/-1" }}>
                    <span style={{ fontSize:22 }}>🔍</span>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13, color:C.navy }}>Something Else / Not Sure Yet</div>
                      <div style={{ fontSize:11, color:C.slate }}>Tell us what you need in the next step</div>
                    </div>
                    {selectedService==="other"&&<span style={{ color:C.gold, fontSize:16, marginLeft:"auto" }}>✓</span>}
                  </div>
                </div>
              </div>
            )}

            {step===3&&(
              <div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:8 }}>Describe what you need in detail *</label>
                  <textarea rows={5} placeholder="Tell us as much as you can — your background, goals, timeline, and any specific requirements. The more you share, the better we can help you." style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 14px", fontSize:13, outline:"none", resize:"vertical", fontFamily:"inherit", color:C.navy, lineHeight:1.7 }} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:20 }}>
                  {[["When do you need this?","select:As soon as possible,Within 1 week,Within 2 weeks,Within 1 month,Flexible"],["Preferred Contact Method","select:Email,WhatsApp,Either"]].map(([label,type])=>(
                    <div key={label}>
                      <label style={{ fontSize:12, fontWeight:600, color:C.navy, display:"block", marginBottom:6 }}>{label}</label>
                      <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:13, outline:"none", background:"#fff" }}>
                        <option value="">Select...</option>
                        {type.split(":")[1].split(",").map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div style={{ background:C.amberLight, border:`1px solid ${C.amberBorder}`, borderRadius:10, padding:"16px 20px", marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.amber, marginBottom:6 }}>📌 What happens next?</div>
                  <div style={{ fontSize:13, color:C.navy, lineHeight:1.7 }}>After you submit, our consultant will review your inquiry and reach out within 48 hours with a personalised service proposal and quote. No payment required at this stage.</div>
                </div>
                <label style={{ display:"flex", gap:10, alignItems:"flex-start", cursor:"pointer" }}>
                  <input type="checkbox" style={{ width:16, height:16, accentColor:C.amber, marginTop:2 }} />
                  <span style={{ fontSize:13, color:C.navy, lineHeight:1.6 }}>I agree to be contacted by SAMPACE Professional Services regarding my inquiry. I understand this is not a payment commitment.</span>
                </label>
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:32 }}>
              <button onClick={()=>step>1?setStep(s=>s-1):null} style={{ background:"#F1F5F9", border:`1px solid ${C.border}`, color:C.navy, padding:"11px 28px", borderRadius:8, fontSize:13, fontWeight:600, cursor:step>1?"pointer":"not-allowed", opacity:step>1?1:0.5 }}>← Previous</button>
              <button onClick={()=>step<3?setStep(s=>s+1):setSubmitted(true)} style={{ background:`linear-gradient(135deg,${C.amber},${C.gold})`, color:"#fff", border:"none", padding:"11px 32px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 16px rgba(245,127,23,0.3)` }}>
                {step===3?"✅ Submit Inquiry":"Next Step →"}
              </button>
            </div>
          </div>
        </div>

        {/* Alternative contact */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:20 }}>
          {[["📧","Email Us Directly","info@sampacecampus.com.ng","mailto:info@sampacecampus.com.ng"],["💬","WhatsApp Us","Available Mon–Sat · 8am–6pm","https://wa.me/"]].map(([icon,title,sub,href])=>(
            <a key={title} href={href} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 24px", display:"flex", gap:14, alignItems:"center", textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.boxShadow=`0 6px 20px rgba(201,168,76,0.12)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none";}}>
              <div style={{ width:44, height:44, borderRadius:10, background:C.amberLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>{title}</div>
                <div style={{ fontSize:12, color:C.slate }}>{sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ───
export default function ProfessionalServices() {
  const [view, setView] = useState("home");
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#FFFDF5;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#C9A84C,#F57F17);border-radius:2px;}
      `}</style>
      <Nav view={view} setView={setView} />
      {view==="home"     && <HomePage setView={setView} />}
      {view==="services" && <ServicesPage setView={setView} />}
      {view==="inquiry"  && <InquiryForm />}
    </div>
  );
}
