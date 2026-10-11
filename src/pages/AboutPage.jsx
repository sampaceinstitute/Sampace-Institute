import React from 'react'
import { SITE } from '../constants.js'

export default function AboutPage() {
  return (
    <main className="simple-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          About SAMPACE
        </div>
        <h1 className="page-title">{SITE.name}</h1>
        <p className="page-subtitle">RC: {SITE.rc} · Founded {SITE.founded}</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>🎯 Our Vision</h3>
          <p>{SITE.vision}</p>
        </div>
        <div className="about-card">
          <h3>🚀 Our Mission</h3>
          <p>{SITE.mission}</p>
        </div>
        <div className="about-card">
          <h3>💎 Our Values</h3>
          <ul>
            {SITE.values.map((v) => (
              <li key={v}>• {v}</li>
            ))}
          </ul>
        </div>
        <div className="about-card">
          <h3>🏛️ Legal Structure</h3>
          <p>
            <strong>SAMPACE EDUCATIONAL LTD</strong> (Limited by Shares) — commercial operations,
            EdTech, training, tutorials, publishing, and consultancy.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            <strong>SAMPACE EDUCATION FOUNDATION</strong> (Ltd/Gte) — planned degree-awarding
            institution, research institute, and non-profit impact programmes.
          </p>
        </div>
      </div>
    </main>
  )
}
