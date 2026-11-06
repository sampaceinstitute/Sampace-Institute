import React, { useEffect, useState } from 'react'
import { STATS } from '../constants.js'
import PersonaRouter from '../components/PersonaRouter.jsx'
import DiagnosticWidget from '../components/DiagnosticWidget.jsx'
import Testimonials from '../components/Testimonials.jsx'
import WhatsAppBar from '../components/WhatsAppBar.jsx'
import '../premium.css' // Import the new design system

export default function HomePage({ onNavigate }) {
  const [count, setCount] = useState({ learners: 0, schools: 0, courses: 0, states: 0 })

  useEffect(() => {
    // ... (Keep your count animation logic here) ...
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
    <>
      {/* NEW HERO SECTION */}
      <main className="hero-split container">
        {/* Left Side: Editorial Text */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(201, 162, 39, 0.1)', border: '1px solid rgba(201, 162, 39, 0.3)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '2rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', background: 'var(--accent-gold)', borderRadius: '50%' }}></span>
            Educational Intelligence
          </div>
          
          <h1 className="editorial-title">
            Empowering <br />
            <span style={{ color: 'var(--accent-gold)' }}>Learners.</span><br />
            Building Futures.
          </h1>
          
          <p className="editorial-subtitle" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
            From JAMB prep to Space Law — SAMPACE is the home of learning for the next 100 years. We provide the intelligence, tools, and platform for your success.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-premium btn-premium-primary" onClick={() => onNavigate('courses')}>
              Explore 400+ Courses
            </button>
            <button className="btn-premium btn-premium-outline" onClick={() => document.getElementById('diagnostic-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Take Free JAMB Test
            </button>
          </div>

          {/* Live Stats in a clean row */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{count.learners.toLocaleString()}+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>Learners</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{count.courses}+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>Courses</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{count.schools}+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>Schools</div>
            </div>
          </div>
        </div>

        {/* Right Side: Real Product Mockup (This beats AI generated art) */}
        <div className="product-mockup-frame">
          <div className="mockup-header">
            <div className="mockup-dot" style={{ background: '#ef4444' }}></div>
            <div className="mockup-dot" style={{ background: '#f59e0b' }}></div>
            <div className="mockup-dot" style={{ background: '#10b981' }}></div>
            <div style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>portal.sampaceedu.com.ng</div>
          </div>
          
          {/* Fake Dashboard UI inside the mockup */}
          <div style={{ padding: '2rem', background: '#F8FAFC', color: '#0F172A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>JAMB Intelligence</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.25rem 0 0' }}>Candidate: Samuel A.</p>
              </div>
              <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, height: 'fit-content' }}>274 / 400</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#FFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Readiness Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>84%</div>
                <div style={{ height: '4px', background: '#E2E8F0', borderRadius: '4px', marginTop: '0.5rem' }}>
                  <div style={{ width: '84%', height: '100%', background: '#10B981', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div style={{ background: '#FFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Weakest Topic</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginTop: '0.5rem' }}>Organic Chemistry</div>
                <div style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '0.25rem' }}>Needs immediate action</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Keep the rest of your sections below, but they will automatically look cleaner due to the CSS */}
      <div className="container" style={{ marginTop: '6rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '4rem' }}>
        <PersonaRouter onNavigate={onNavigate} />
      </div>

      <div className="container" id="diagnostic-section" style={{ marginTop: '4rem' }}>
        <DiagnosticWidget />
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <Testimonials />
      </div>
      
      <div className="container" style={{ marginTop: '4rem' }}>
        <WhatsAppBar />
      </div>
    </>
  )
}
