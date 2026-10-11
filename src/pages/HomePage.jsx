import React, { useEffect, useState } from 'react'
import { STATS } from '../constants.js'
import PersonaRouter from '../components/PersonaRouter.jsx'
import SchoolsPreview from '../components/SchoolsPreview.jsx'
import DiagnosticWidget from '../components/DiagnosticWidget.jsx'
import Testimonials from '../components/Testimonials.jsx'
import TrustBar from '../components/TrustBar.jsx'
import WhatsAppBar from '../components/WhatsAppBar.jsx'
import FeaturedCourses from '../components/FeaturedCourses.jsx'
import BlogPreview from '../components/BlogPreview.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'

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

  const scrollToDiagnostic = () => {
    document.getElementById('diagnostic-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ============ HERO ============ */}
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
            for everyone.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToDiagnostic}>
              Start Free JAMB Test
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('schools')}>
              Explore 400+ Courses
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

      {/* ============ TRUST BAR ============ */}
      <TrustBar />

      {/* ============ PERSONA ROUTER ============ */}
      <PersonaRouter onNavigate={onNavigate} />

      {/* ============ DIAGNOSTIC WIDGET ============ */}
      <div id="diagnostic-section">
        <DiagnosticWidget />
      </div>

      {/* ============ FEATURED COURSES ============ */}
      <FeaturedCourses onNavigate={onNavigate} />

      {/* ============ SCHOOLS PREVIEW ============ */}
      <SchoolsPreview onNavigate={onNavigate} />

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />

      {/* ============ BLOG PREVIEW ============ */}
      <BlogPreview onNavigate={onNavigate} />

      {/* ============ NEWSLETTER ============ */}
      <NewsletterSignup />

      {/* ============ WHATSAPP BAR ============ */}
      <WhatsAppBar />
    </>
  )
}
