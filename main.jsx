import React from 'react'
import ReactDOM from 'react-dom/client'

function SampaceHome() {
  const schools = [
    { name:"Global Homepage",         emoji:"🌐", color:"#1565C0", desc:"All 9 schools landing page" },
    { name:"Admin Dashboard",         emoji:"⚙️", color:"#0B1F3A", desc:"Master control centre" },
    { name:"School College",          emoji:"🎓", color:"#1565C0", desc:"JSS1–SS3 virtual school" },
    { name:"Tutorial & Exam",         emoji:"📝", color:"#00695C", desc:"BECE, WAEC, JAMB prep" },
    { name:"Pre-University College",  emoji:"🏛️", color:"#BF360C", desc:"IJMB, JUPEB, Diploma" },
    { name:"Schools 3–8",             emoji:"💻", color:"#6A1B9A", desc:"Technology, Business, Languages..." },
    { name:"Professional Services",   emoji:"🤝", color:"#F57F17", desc:"CV, Consulting, Admissions" },
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      background: "linear-gradient(160deg, #060E1A 0%, #0B1F3A 60%, #0D2855 100%)",
      minHeight: "100vh",
      padding: "0",
      margin: "0",
    }}>
      {/* Header */}
      <div style={{ padding: "32px 32px 0", textAlign: "center" }}>
        <div style={{
          width: 72, height: 72,
          background: "linear-gradient(135deg, #C9A84C, #FFD54F)",
          borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 900, color: "#0B1F3A",
          margin: "0 auto 16px",
          boxShadow: "0 8px 28px rgba(201,168,76,0.35)",
        }}>SI</div>

        <div style={{
          fontSize: "clamp(24px,5vw,40px)",
          fontWeight: 900, color: "#C9A84C",
          letterSpacing: 4, marginBottom: 6,
        }}>SAMPACE INSTITUTE</div>

        <div style={{
          fontSize: 14, color: "rgba(255,255,255,0.5)",
          letterSpacing: 3, marginBottom: 8,
        }}>WHERE EXCELLENCE BEGINS</div>

        <div style={{
          display: "inline-block",
          background: "rgba(16,185,129,0.15)",
          border: "1px solid rgba(16,185,129,0.4)",
          borderRadius: 8,
          padding: "8px 20px",
          color: "#10B981",
          fontSize: 13, fontWeight: 700,
          marginBottom: 40,
        }}>
          ✅ Website is LIVE on Netlify!
        </div>
      </div>

      {/* School cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
        padding: "0 24px 40px",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {schools.map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid rgba(255,255,255,0.1)`,
            borderLeft: `4px solid ${s.color}`,
            borderRadius: 14,
            padding: "24px 20px",
            cursor: "pointer",
            transition: "all .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>{s.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{s.desc}</div>
            <div style={{
              marginTop: 16,
              display: "inline-block",
              background: `${s.color}20`,
              color: s.color,
              padding: "4px 12px",
              borderRadius: 100,
              fontSize: 11, fontWeight: 600,
            }}>View Portal →</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "24px 32px 40px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.3)",
        fontSize: 12,
        lineHeight: 1.8,
      }}>
        <div style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 8 }}>
          🚀 Next Steps
        </div>
        <div>✅ GitHub uploaded · ✅ Netlify deployed · ⏳ Domain arriving soon</div>
        <div style={{ marginTop: 4 }}>sampacecampus.com.ng → connecting when domain arrives</div>
        <div style={{ marginTop: 4, color: "rgba(201,168,76,0.6)" }}>Grand Opening → August 2026</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SampaceHome />
  </React.StrictMode>
)
