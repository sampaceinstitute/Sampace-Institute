import React from 'react'
import { ALL_DIVISIONS } from '../constants.js'

export default function SchoolsPreview({ onNavigate }) {
  // Show first 6 divisions on homepage, then a "view all" button
  const preview = ALL_DIVISIONS.slice(0, 6)

  return (
    <section className="schools-preview">
      <div className="section-header">
        <div className="badge">
          <span className="badge-dot" />
          {ALL_DIVISIONS.length} Schools & Divisions
        </div>
        <h2 className="section-title">Explore Our Schools</h2>
        <p className="section-subtitle">
          From Nursery to Space Law — every stage of learning, one platform.
        </p>
      </div>

      <div className="schools-preview-grid">
        {preview.map((div) => {
          const courseCount = div.departments.reduce((s, d) => s + d.courses.length, 0)
          return (
            <button
              key={div.id}
              className="school-card"
              onClick={() => onNavigate({ route: 'division', id: div.id })}
              style={{ '--card-accent': div.color }}
            >
              <div className="school-card-icon">{div.icon}</div>
              <div className="school-card-code">Division {div.code}</div>
              <h3 className="school-card-title">{div.name}</h3>
              <p className="school-card-tagline">{div.tagline}</p>
              <div className="school-card-stats">
                <span>{div.departments.length} Depts</span>
                <span>·</span>
                <span>{courseCount} Courses</span>
              </div>
              <div className="school-card-cta">
                Explore <span>→</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="schools-preview-cta">
        <button className="btn btn-outline" onClick={() => onNavigate('schools')}>
          View All {ALL_DIVISIONS.length} Schools →
        </button>
      </div>
    </section>
  )
}
