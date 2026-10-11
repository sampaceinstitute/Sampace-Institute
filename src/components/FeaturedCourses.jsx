import React, { useMemo } from 'react'
import { ALL_DIVISIONS } from '../constants.js'

export default function FeaturedCourses({ onNavigate }) {
  // Pick 6 popular courses across different schools
  const featured = useMemo(() => {
    const picks = [
      { div: 'extramural-exam-hub', dept: 'national-exams', course: 'JAMB/UTME Prep' },
      { div: 'technology-innovation', dept: 'data-ai', course: 'Data Analysis' },
      { div: 'technology-innovation', dept: 'cybersecurity', course: 'Ethical Hacking' },
      { div: 'frontier-sciences', dept: 'space-cosmic', course: 'Space Law & Extraterrestrial Property Rights' },
      { div: 'professional-vocational', dept: 'vocational-trades', course: 'Tailoring/Fashion' },
      { div: 'professional-vocational', dept: 'business-finance', course: 'Digital Marketing' }
    ]

    return picks
      .map((p) => {
        const div = ALL_DIVISIONS.find((d) => d.id === p.div)
        const dept = div?.departments.find((d) => d.id === p.dept)
        if (!div || !dept) return null
        return {
          courseId: `featured-${p.div}-${p.dept}-${p.course}`,
          title: p.course,
          school: div.name,
          department: dept.name,
          schoolIcon: div.icon,
          schoolColor: div.color,
          mode: 'Online · Physical · Hybrid'
        }
      })
      .filter(Boolean)
  }, [])

  return (
    <section className="featured-courses">
      <div className="section-header">
        <div className="badge">
          <span className="badge-dot" />
          Popular Right Now
        </div>
        <h2 className="section-title">Featured Courses</h2>
        <p className="section-subtitle">
          Our most enrolled programmes this month — across every SAMPACE school.
        </p>
      </div>

      <div className="featured-grid">
        {featured.map((c) => (
          <div key={c.courseId} className="course-card" style={{ '--card-accent': c.schoolColor }}>
            <div className="course-card-top">
              <div className="course-card-icon">{c.schoolIcon}</div>
              <div className="course-card-badges">
                <span className="course-mode">Featured</span>
              </div>
            </div>
            <h3 className="course-card-title">{c.title}</h3>
            <div className="course-card-meta">
              <div className="course-card-school">{c.school}</div>
              <div className="course-card-dept">{c.department}</div>
            </div>
            <div className="course-card-footer">
              <button
                className="course-enroll-btn"
                onClick={() => onNavigate('courses')}
              >
                View in Catalog →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-cta">
        <button className="btn btn-outline" onClick={() => onNavigate('courses')}>
          Browse All 400+ Courses →
        </button>
      </div>
    </section>
  )
}
