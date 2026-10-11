import React from 'react'

const PARTNERS = [
  { icon: '🎓', label: 'Ministry of Education', sub: 'Partnership pending' },
  { icon: '🏛️', label: 'NUC', sub: 'University licence target' },
  { icon: '📚', label: 'WAEC', sub: 'Aligned prep' },
  { icon: '📝', label: 'JAMB', sub: 'Aligned prep' },
  { icon: '🏫', label: '47 Schools', sub: 'Active partners' },
  { icon: '🎯', label: 'TRCN', sub: 'Teacher CPD' }
]

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <p className="trust-label">
        Trusted by learners, schools, and institutions across Nigeria
      </p>
      <div className="trust-logos">
        {PARTNERS.map((p, i) => (
          <div key={i} className="trust-item">
            <span className="trust-icon">{p.icon}</span>
            <div>
              <div className="trust-name">{p.label}</div>
              <div className="trust-sub">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
