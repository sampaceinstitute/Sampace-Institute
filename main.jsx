import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

const schools = [
  {
    id: "homepage",
    num: "00",
    name: "SAMPACE INSTITUTE",
    short: "Main Campus Portal",
    emoji: "🌐",
    color: "#1565C0",
    bg1: "#0B1F3A",
    bg2: "#1565C0",
    desc: "The central hub for all 9 schools. Explore every programme, apply for admission and start your journey.",
    tags: ["All Schools", "Apply Now", "Inquire"],
    features: [
      { icon:"🎓", t:"9 Schools", d:"Secondary to professional certifications" },
      { icon:"💻", t:"100% Online", d:"Learn from anywhere in Nigeria" },
      { icon:"📱", t:"Mobile Friendly", d:"Study from your phone" },
      { icon:"🏆", t:"Certified", d:"Recognised certificates on completion" },
      { icon:"👨‍👩‍👧", t:"Parent Portal", d:"Parents track progress in real time" },
      { icon:"🤖", t:"AI Assistant", d:"Built-in AI tutor 24/7" },
    ]
  },
  {
    id: "school-college",
    num: "01",
    name: "School College",
    short: "Secondary School · JSS1 to SS3",
    emoji: "🎓",
    color: "#1565C0",
    bg1: "#0B2A5E",
    bg2: "#1565C0",
    desc: "Nigeria's premier online secondary school. Full JSS1 to SS3 curriculum, virtual labs, blended learning and globally competitive academic standards.",
    tags: ["JSS1-SS3", "Virtual Lab", "WAEC/NECO", "Report Cards"],
    features: [
      { icon:"📚", t:"Full Curriculum", d:"JSS1-SS3 NERDC aligned subjects" },
      { icon:"🧪", t:"Virtual Lab", d:"Physics, Chemistry, Biology practicals online" },
      { icon:"📖", t:"Digital Library", d:"Thousands of textbooks and past questions" },
      { icon:"📝", t:"CBT Practice", d:"WAEC, NECO and JAMB exam preparation" },
      { icon:"📊", t:"Report Cards", d:"Termly reports auto-generated for parents" },
      { icon:"🏆", t:"Extracurricular", d:"Drama, Debate, Sports and more" },
    ]
  },
  {
    id: "tutorial",
    num: "02",
    name: "Tutorial and Local Exam",
    short: "BECE · WAEC · NECO · JAMB",
    emoji: "📝",
    color: "#00897B",
    bg1: "#003D2E",
    bg2: "#00695C",
    desc: "Intensive exam preparation for every major Nigerian examination. CBT practice, past questions, monthly mock tests and personalised study plans.",
    tags: ["BECE", "WAEC", "JAMB/UTME", "CBT Practice"],
    features: [
      { icon:"🟢", t:"BECE Track", d:"Junior secondary exit exam preparation" },
      { icon:"🔵", t:"WAEC Track", d:"Science, Humanities and Business subjects" },
      { icon:"🟡", t:"NECO Track", d:"NECO-specific past questions and guides" },
      { icon:"🔴", t:"JAMB Track", d:"4-subject combo with CBT simulator" },
      { icon:"📅", t:"Monthly Tests", d:"Scheduled mock exams every month" },
      { icon:"🏆", t:"Leaderboard", d:"Top performers celebrated with badges" },
    ]
  },
  {
    id: "digital-campus",
    num: "03-08",
    name: "SAMPACE Digital Campus",
    short: "Technology · Business · Languages · Communication · International",
    emoji: "🏫",
    color: "#7B1FA2",
    bg1: "#1A0040",
    bg2: "#4A148C",
    desc: "Six specialist schools under one digital campus. Technology, Business and Professional, Advanced and International, Communication and Diction, School of Languages.",
    tags: ["Tech and Digital", "PMP ACCA ICAN", "IELTS SAT", "Languages"],
    features: [
      { icon:"💻", t:"School of Technology", d:"Web Dev, Cybersecurity, Data Science, UI/UX" },
      { icon:"📊", t:"Business and Professional", d:"PMP, ACCA, ICAN, CFA certifications" },
      { icon:"🌍", t:"Advanced and International", d:"SAT, IELTS, A-Level, TOEFL preparation" },
      { icon:"🎤", t:"Communication and Diction", d:"Public speaking, presentation, media training" },
      { icon:"🌐", t:"School of Languages", d:"French, Spanish, Arabic, Mandarin and more" },
      { icon:"👥", t:"Cohort Learning", d:"Small groups, live classes, community" },
    ]
  },
  {
    id: "pre-university",
    num: "04",
    name: "Pre-University College",
    short: "IJMB · JUPEB · Pre-Degree · Diploma",
    emoji: "🏛️",
    color: "#BF360C",
    bg1: "#3E1A00",
    bg2: "#BF360C",
    desc: "Your gateway to 200-level university admission. IJMB, JUPEB and Diploma programmes — rigorous, university-standard, fully online.",
    tags: ["IJMB", "JUPEB", "Diploma", "200 Level Entry"],
    features: [
      { icon:"🎓", t:"IJMB Programme", d:"Direct 200-level entry without JAMB" },
      { icon:"🏛️", t:"JUPEB Programme", d:"University-affiliated pre-degree qualification" },
      { icon:"📘", t:"Pre-Degree", d:"Foundation programme for 100-level entry" },
      { icon:"📜", t:"Diploma", d:"Professional diploma in specialist fields" },
      { icon:"📋", t:"Transcript System", d:"Official transcript generated each semester" },
      { icon:"🎯", t:"University Placement", d:"Guidance for admission into top universities" },
    ]
  },
  {
    id: "services",
    num: "09",
    name: "Professional Services",
    short: "CV · Admissions · Consulting · Study Abroad",
    emoji: "🤝",
    color: "#E65100",
    bg1: "#1A1000",
    bg2: "#E65100",
    desc: "Expert professional services tailored to your goals. CV writing, university admission support, educational consulting and career advisory.",
    tags: ["CV Writing", "Admission Help", "Consulting", "Study Abroad"],
    features: [
      { icon:"📄", t:"CV and Resume Writing", d:"ATS-optimised CVs that get interviews" },
      { icon:"🎓", t:"University Admissions", d:"Nigerian and international application support" },
      { icon:"🏆", t:"Scholarship Research", d:"Find and apply for scholarships worldwide" },
      { icon:"🌍", t:"Study Abroad", d:"UK, USA, Canada, Australia guidance" },
      { icon:"🏢", t:"Corporate Training", d:"Bespoke training for organisations" },
      { icon:"✍️", t:"SOP Writing", d:"Statement of purpose for postgraduate entry" },
    ]
  },
]

function SchoolPage({ school, onBack }) {
  return (
    <div style={{ fontFamily:"Arial,sans-serif", background:"#060E1A", minHeight:"100vh", margin:0, padding:0 }}>

      {/* Back nav */}
      <div style={{ padding:"14px 16px", background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:100 }}>
        <button
          onClick={onBack}
          style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"8px 18px", borderRadius:8, fontSize:14, cursor:"pointer", fontWeight:700 }}>
          Back
        </button>
        <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>SAMPACE INSTITUTE</span>
      </div>

      {/* Hero */}
      <div style={{ background:"linear-gradient(160deg," + school.bg1 + " 0%," + school.bg2 + " 100%)", padding:"52px 20px 40px", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:14 }}>{school.emoji}</div>
        {school.num !== "00" && (
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:3, marginBottom:6, textTransform:"uppercase" }}>School {school.num}</div>
        )}
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(24px,5vw,48px)", fontWeight:700, color:"#fff", margin:"0 0 8px", lineHeight:1.1 }}>{school.name}</h1>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", marginBottom:16 }}>{school.short}</div>
        <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.8, maxWidth:500, margin:"0 auto 24px" }}>{school.desc}</p>
        <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
          {school.tags.map(function(t) {
            return (
              <span key={t} style={{ background:"rgba(255,255,255,0.12)", color:"#fff", padding:"4px 12px", borderRadius:100, fontSize:11 }}>{t}</span>
            )
          })}
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"13px 28px", borderRadius:8, fontSize:14, fontWeight:800, cursor:"pointer" }}>
            {school.id === "services" ? "Make Inquiry" : "Apply Now"}
          </button>
          <a href="https://wa.me/" style={{ background:"rgba(37,211,102,0.2)", border:"1px solid rgba(37,211,102,0.3)", color:"#fff", padding:"13px 24px", borderRadius:8, fontSize:14, textDecoration:"none", display:"inline-block" }}>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding:"36px 16px", maxWidth:680, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(20px,4vw,32px)", color:"#fff", textAlign:"center", marginBottom:24, fontWeight:700 }}>
          What We Offer
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {school.features.map(function(f, i) {
            return (
              <div key={i} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"18px 14px", borderTop:"3px solid " + school.color }}>
                <div style={{ fontSize:26, marginBottom:8 }}>{f.icon}</div>
                <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:4 }}>{f.t}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.5 }}>{f.d}</div>
              </div>
            )
          })}
        </div>

        {/* Inquiry form */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"24px 18px", marginTop:28 }}>
          <h3 style={{ fontFamily:"Georgia,serif", fontSize:20, color:"#fff", marginBottom:6, fontWeight:700 }}>Make an Inquiry</h3>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:18 }}>We will contact you within 48 hours.</p>
          <input placeholder="Full Name" style={{ width:"100%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"12px 14px", color:"#fff", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box", fontFamily:"Arial,sans-serif" }} />
          <input placeholder="Email Address" style={{ width:"100%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"12px 14px", color:"#fff", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box", fontFamily:"Arial,sans-serif" }} />
          <input placeholder="Phone / WhatsApp Number" style={{ width:"100%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"12px 14px", color:"#fff", fontSize:13, marginBottom:16, outline:"none", boxSizing:"border-box", fontFamily:"Arial,sans-serif" }} />
          <button style={{ width:"100%", background:"linear-gradient(135deg," + school.bg2 + "," + school.color + ")", color:"#fff", border:"none", padding:"13px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>
            Send Inquiry
          </button>
          <div style={{ textAlign:"center", marginTop:12, fontSize:12, color:"rgba(255,255,255,0.3)" }}>
            Email: info@sampacecampus.com.ng
          </div>
        </div>
      </div>
    </div>
  )
}

function Home({ onSelect }) {
  return (
    <div style={{ fontFamily:"Arial,sans-serif", background:"linear-gradient(160deg,#060E1A 0%,#0B1F3A 60%,#0D2855 100%)", minHeight:"100vh", margin:0, padding:0 }}>

      {/* Nav */}
      <nav style={{ padding:"14px 16px", background:"rgba(0,0,0,0.4)", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:"#0B1F3A" }}>SI</div>
          <div>
            <div style={{ fontSize:13, fontWeight:900, color:"#C9A84C", letterSpacing:2 }}>SAMPACE</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:1 }}>INSTITUTE</div>
          </div>
        </div>
        <button
          onClick={function() { onSelect(schools[0]) }}
          style={{ background:"linear-gradient(135deg,#C9A84C,#FFD54F)", color:"#0B1F3A", border:"none", padding:"8px 16px", borderRadius:6, fontSize:12, fontWeight:800, cursor:"pointer" }}>
          Apply Now
        </button>
      </nav>

      {/* Hero */}
      <div style={{ padding:"52px 16px 36px", textAlign:"center" }}>
        <div style={{ width:72, height:72, background:"linear-gradient(135deg,#C9A84C,#FFD54F)", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:900, color:"#0B1F3A", margin:"0 auto 18px", boxShadow:"0 8px 32px rgba(201,168,76,0.3)" }}>SI</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(30px,7vw,60px)", fontWeight:900, color:"#fff", lineHeight:0.95, margin:"0 0 10px" }}>
          SAMPACE<br/>
          <span style={{ color:"#C9A84C" }}>Institute</span>
        </h1>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:4, marginBottom:14, textTransform:"uppercase" }}>Where Excellence Begins</div>
        <div style={{ display:"inline-block", background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:8, padding:"7px 16px", color:"#10B981", fontSize:12, fontWeight:700, marginBottom:28 }}>
          Live at sampaceinstitute.netlify.app
        </div>
        <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
          {[["9","Schools"],["20+","Programmes"],["100%","Online"],["AUG","Launch"]].map(function(item) {
            return (
              <div key={item[1]} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:28, fontWeight:900, color:"#C9A84C", lineHeight:1 }}>{item[0]}</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:1.5, textTransform:"uppercase" }}>{item[1]}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* School Cards */}
      <div style={{ padding:"0 14px 48px", maxWidth:680, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:"rgba(201,168,76,0.7)", letterSpacing:3, textTransform:"uppercase", marginBottom:14, textAlign:"center", fontWeight:700 }}>
          Tap any school to explore
        </div>

        {schools.map(function(s) {
          return (
            <div
              key={s.id}
              onClick={function() { onSelect(s) }}
              style={{ background:"linear-gradient(135deg," + s.bg1 + " 0%," + s.bg2 + " 100%)", borderRadius:14, padding:"20px 16px", cursor:"pointer", marginBottom:12, border:"1px solid rgba(255,255,255,0.07)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-16, right:-16, width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
              <div style={{ display:"flex", alignItems:"center", gap:14, position:"relative", zIndex:2 }}>
                <div style={{ width:48, height:48, background:"rgba(255,255,255,0.12)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{s.emoji}</div>
                <div style={{ flex:1 }}>
                  {s.num !== "00" && (
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:2, marginBottom:2, textTransform:"uppercase" }}>School {s.num}</div>
                  )}
                  <div style={{ fontFamily:"Georgia,serif", fontSize:16, fontWeight:700, color:"#fff", marginBottom:3, lineHeight:1.2 }}>{s.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginBottom:8, lineHeight:1.3 }}>{s.short}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {s.tags.slice(0,3).map(function(t) {
                      return (
                        <span key={t} style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.75)", padding:"2px 8px", borderRadius:100, fontSize:10 }}>{t}</span>
                      )
                    })}
                  </div>
                </div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:22, flexShrink:0 }}>›</div>
              </div>
            </div>
          )
        })}

        {/* Contact */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"24px 16px", marginTop:8, textAlign:"center" }}>
          <div style={{ fontSize:10, color:"#C9A84C", letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Get In Touch</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:20, color:"#fff", fontWeight:700, marginBottom:6 }}>Not sure where to start?</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7, marginBottom:18 }}>Our admissions team will guide you to the right school and programme for your goals.</div>
          <a href="mailto:info@sampacecampus.com.ng" style={{ display:"block", background:"rgba(21,101,192,0.15)", border:"1px solid rgba(21,101,192,0.25)", borderRadius:10, padding:"13px 16px", textDecoration:"none", marginBottom:10 }}>
            <div style={{ fontSize:11, color:"#64B5F6", fontWeight:700, marginBottom:2 }}>EMAIL US</div>
            <div style={{ fontSize:13, color:"#fff" }}>info@sampacecampus.com.ng</div>
          </a>
          <a href="https://wa.me/" style={{ display:"block", background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.2)", borderRadius:10, padding:"13px 16px", textDecoration:"none" }}>
            <div style={{ fontSize:11, color:"#10B981", fontWeight:700, marginBottom:2 }}>WHATSAPP</div>
            <div style={{ fontSize:13, color:"#fff" }}>Chat with our admissions team</div>
          </a>
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center", marginTop:28, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize:11, color:"rgba(201,168,76,0.5)", fontWeight:700, marginBottom:4 }}>SAMPACE INSTITUTE</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", lineHeight:1.7 }}>
            School College · Tutorial and Exam · Digital Campus<br/>
            Pre-University College · Professional Services
          </div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.15)", marginTop:8 }}>
            Grand Opening August 2026 · sampacecampus.com.ng
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  var initialSchool = null
  try {
    var hash = window.location.hash.replace('#', '')
    if (hash) {
      for (var i = 0; i < schools.length; i++) {
        if (schools[i].id === hash) {
          initialSchool = schools[i]
          break
        }
      }
    }
  } catch(e) {}

  var state = useState(initialSchool)
  var currentSchool = state[0]
  var setCurrentSchool = state[1]

  useEffect(function() {
    function onPop() {
      setCurrentSchool(null)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return function() { window.removeEventListener('popstate', onPop) }
  }, [])

  function handleSelect(school) {
    try { window.history.pushState({}, '', '#' + school.id) } catch(e) {}
    setCurrentSchool(school)
    window.scrollTo(0, 0)
  }

  function handleBack() {
    try { window.history.back() } catch(e) {}
    setCurrentSchool(null)
    window.scrollTo(0, 0)
  }

  if (currentSchool) {
    return React.createElement(SchoolPage, { school: currentSchool, onBack: handleBack })
  }
  return React.createElement(Home, { onSelect: handleSelect })
}

var rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    React.createElement(React.StrictMode, null,
      React.createElement(App, null)
    )
  )
}
