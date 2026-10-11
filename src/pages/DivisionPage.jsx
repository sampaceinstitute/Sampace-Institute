import React, { useState } from 'react'

export default function DivisionPage({ division, onBack }) {
  const [openDept, setOpenDept] = useState(division?.departments?.[0]?.id || null)

  if (!division) {
    return (
      <main className="division-page">
        <div className="division-header">
          <p>Division not found.</p>
          <button className="btn btn-outline" onClick={onBack}>← Back Home</button>
        </div>
      </main>
    )
  }

  return (
    <main className="division-page">
      <button className="back-button" onClick={onBack}>← Back to Home</button>

      <div className="division-header">
        <div className="division-icon">{division.icon}</div>
        <div className="division-code">Division {division.code}</div>
        <h1 className="division-title">{division.name}</h1>
        <p className="division-tagline">{division.tagline}</p>
        <p className="division-description">{division.description}</p>
        <div className="division-meta">
          <span>📚 {division.departments.length} Departments</span>
          <span>
            🎯{' '}
            {division.departments.reduce((sum, d) => sum + d.courses.length, 0)} Courses
          </span>
          <span>
            🏢 Entity: {division.entity === 'ltd' ? 'SAMPACE Educational Ltd' : 'SAMPACE Foundation'}
          </span>
        </div>
      </div>

      <div className="departments-list">
        {division.departments.map((dept) => (
          <div
            key={dept.id}
            className={`department-card ${openDept === dept.id ? 'open' : ''}`}
          >
            <button
              className="department-header"
              onClick={() => setOpenDept(openDept === dept.id ? null : dept.id)}
            >
              <span className="department-name">{dept.name}</span>
              <span className="department-count">{dept.courses.length} courses</span>
              <span className={`chevron ${openDept === dept.id ? 'rotated' : ''}`}>⌄</span>
            </button>

            {openDept === dept.id && (
              <ul className="courses-list">
                {dept.courses.map((course, i) => (
                  <li key={i} className="course-item">
                    <span className="course-dot" />
                    {course}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
