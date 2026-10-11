import React from 'react'
import { ALL_DIVISIONS } from '../constants.js'

export default function SchoolsPage({ onSelectDivision }) {
  return (
    <main className="schools-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          {ALL_DIVISIONS.length} Schools & Divisions
        </div>
        <h1 className="page-title">Our Schools & Divisions</h1>
        <p className="page-subtitle">
          From Nursery to Space Law — explore every corner of SAMPACE.
        </p>
      </div>

      <div className="schools-grid">
        {ALL_DIVISIONS.map((div) => {
          const courseCount = div.departments.reduce((s, d) => s + d.courses.length, 0)
          return (
            <button
              key={div.id}
              className="school-card"
              onClick={() => onSelectDivision(div.id)}
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
    </main>
  )
}
