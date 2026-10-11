import React from 'react'
import { ALL_DIVISIONS } from '../constants.js'

export default function CoursesPage({ onNavigate }) {
  const totalCourses = ALL_DIVISIONS.reduce(
    (sum, d) => sum + d.departments.reduce((s, dept) => s + dept.courses.length, 0),
    0
  )

  return (
    <main className="simple-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          {totalCourses}+ Courses
        </div>
        <h1 className="page-title">Course Catalog</h1>
        <p className="page-subtitle">
          Full searchable catalog coming in Phase 1. For now, explore by school.
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate('schools')}>
          Browse by School →
        </button>
      </div>
    </main>
  )
}
