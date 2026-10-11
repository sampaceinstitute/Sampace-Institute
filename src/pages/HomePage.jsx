import React, { useEffect, useState } from 'react'
import { STATS } from '../constants.js'

export default function HomePage({ onNavigate }) {
  const [count, setCount] = useState({ learners: 0, schools: 0, courses: 0, states: 0 })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount({
        learners: Math.floor(STATS.learners * eased),
        schools: Math.floor(STATS.schools * eased),
        courses: Math.floor(STATS.courses * eased),
        states: Math.floor(STATS.states * eased)
      })

      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="hero">
      <div className="hero-content fade-in-up">
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
          for the next 100 years.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => onNavigate('schools')}>
            Start Free JAMB Test
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('courses')}>
            Explore 300+ Courses
          </button>
        </div>

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
    </main>
  )
}
