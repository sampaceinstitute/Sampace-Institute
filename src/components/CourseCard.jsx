import React from 'react'

export default function CourseCard({ course, onEnroll }) {
  const { title, school, department, schoolIcon, schoolColor, mode, courseId } = course

  return (
    <div className="course-card" style={{ '--card-accent': schoolColor }}>
      <div className="course-card-top">
        <div className="course-card-icon">{schoolIcon}</div>
        <div className="course-card-badges">
          {mode && <span className="course-mode">{mode}</span>}
        </div>
      </div>

      <h3 className="course-card-title">{title}</h3>

      <div className="course-card-meta">
        <div className="course-card-school">{school}</div>
        <div className="course-card-dept">{department}</div>
      </div>

      <div className="course-card-footer">
        <button
          className="course-enroll-btn"
          onClick={() => onEnroll({ ...course, id: courseId })}
        >
          Enroll Now →
        </button>
      </div>
    </div>
  )
}
