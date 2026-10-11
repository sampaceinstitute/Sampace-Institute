import React, { useEffect, useState } from 'react'

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [count, setCount] = useState({ learners: 0, schools: 0, courses: 0, states: 0 })

  useEffect(() => {
    setMounted(true)

    // Animated counters
    const targets = { learners: 12482, schools: 47, courses: 312, states: 19 }
    const duration = 2000
    const steps = 60
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount({
        learners: Math.floor(targets.learners * eased),
        schools: Math.floor(targets.schools * eased),
        courses: Math.floor(targets.courses * eased),
        states: Math.floor(targets.states * eased)
      })

      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className={`particle particle-${i % 5}`} />
        ))}
      </div>

      {/* Header */}
      <header className={`header ${mounted ? 'fade-in-down' : ''}`}>
        <div className="logo-container">
          <div className="logo-mark">
            <svg viewBox="0 0 60 60" width="48" height="48" aria-hidden="true">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C158" />
                  <stop offset="100%" stopColor="#C9A227" />
                </linearGradient>
              </defs>
              {/* Book base */}
              <path
                d="M12 40 Q30 32 30 40 Q30 32 48 40 L48 46 Q30 38 30 46 Q30 38 12 46 Z"
                fill="url(#goldGrad)"
              />
              {/* Rising path */}
              <path
                d="M30 38 L30 18"
                stroke="url(#goldGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Star */}
              <path
                d="M30 8 L32 14 L38 14 L33 18 L35 24 L30 20 L25 24 L27 18 L22 14 L28 14 Z"
                fill="url(#goldGrad)"
              />
            </svg>
          </div>
          <div className="logo-text">
            <h1 className="logo-name">SAMPACE</h1>
            <p className="logo-sub">EDUCATIONAL LTD</p>
          </div>
        </div>

        <nav className="nav">
          <a href="#schools">Schools</a>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="cta-small">Apply Now</button>
        </nav>
      </header>

      {/* Hero */}
      <main className="hero">
        <div className={`hero-content ${mounted ? 'fade-in-up' : ''}`}>
          <div className="badge">
            <span className="badge-dot" />
            RC: 9677766 · Nigeria
          </div>

          <h1 className="hero-title">
            Empowering Learners.
            <br />
            <span className="gradient-text">Transforming Education.</span>
            <br />
            Building the Future.
          </h1>

          <p className="hero-subtitle">
            From JAMB prep to Space Law — SAMPACE is the home of learning
            for everyone.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">
              Start Free JAMB Test
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-outline">
              Explore 300+ Courses
            </button>
          </div>

          {/* Live stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat-number">{count.learners.toLocaleString()}+</div>
              <div className="stat-label">Learners</div>
            </div>
            <div className="stat">
              <div className="stat-number">{count.schools}+</div>
              <div className="stat-label">Partner Schools</div>
            </div>
            <div className="stat">
              <div className="stat-number">{count.courses}+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat">
              <div className="stat-number">{count.states}</div>
              <div className="stat-label">States</div>
            </div>
          </div>
        </div>

        {/* Floating status card */}
        <div className={`status-card ${mounted ? 'fade-in-left' : ''}`}>
          <div className="status-header">
            <span className="status-pulse" />
            <span>Platform Status</span>
          </div>
          <div className="status-body">
            <div className="status-line">
              <span>Deployment</span>
              <span className="status-ok">● LIVE</span>
            </div>
            <div className="status-line">
              <span>Build</span>
              <span className="status-ok">● Success</span>
            </div>
            <div className="status-line">
              <span>Version</span>
              <span>Phase 0 · v1.0.0</span>
            </div>
          </div>
          <div className="status-footer">
            🚀 Walking skeleton ready
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`footer ${mounted ? 'fade-in-up-slow' : ''}`}>
        <div className="footer-grid">
          <div>
            <h4>SAMPACE EDUCATIONAL LTD</h4>
            <p>Learn · Empower · Excel</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>📞 +234 708 216 6496</p>
            <p>✉️ info@sampaceedu.com.ng</p>
          </div>
          <div>
            <h4>Address</h4>
            <p>6, Ahmed Street, New Legun Road</p>
            <p>Koye, Olambe, Ogun State</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SAMPACE Educational Ltd · RC: 9677766 · Built for the next 100 years</p>
        </div>
      </footer>
    </div>
  )
}
