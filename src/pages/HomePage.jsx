import React, { useEffect, useState } from 'react'
import { STATS } from '../constants.js'
import PersonaRouter from '../components/PersonaRouter.jsx'
import DiagnosticWidget from '../components/DiagnosticWidget.jsx'
import Testimonials from '../components/Testimonials.jsx'
import WhatsAppBar from '../components/WhatsAppBar.jsx'
import '../premium.css'

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
    <>
      <main className="hero-split">
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '100px', fontSize: '0.75rem', color: '#065F46', marginBottom: '2rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></span>
            13 Academic Divisions
          </div>
          
          <h1 className="editorial-title">
            Empowering <br />
            <span style={{ color: 'var(--brand-accent)' }}>Learners.</span><br />
            Building Futures.
          </h1>
          
          <p className="editorial-subtitle" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
            From Nursery to Space Law — SAMPACE is a unified ecosystem of 13 divisions delivering world-class education online, on-campus, and virtually.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-premium btn-premium-primary" onClick={() => onNavigate('schools')}>
              Explore 13 Divisions
            </button>
            <button className="btn-premium btn-premium-outline" onClick={() => document.getElementById('diagnostic-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Take Free JAMB Test
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '4rem', borderTop: '1px solid var(--border-dark)', paddingTop: '2rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--brand-primary)' }}>{count.learners.toLocaleString()}+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>Learners</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--brand-primary)' }}>{count.courses}+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>Courses</div>
            </div>
          </div>
        </div>

        {/* Real Product Mockup */}
        <div className="product-mockup-frame">
          <div className="mockup-header">
            <div className="mockup-dot" style={{ background: '#ef4444' }}></div>
            <div className="mockup-dot" style={{ background: '#f59e0b' }}></div>
            <div className="mockup-dot" style={{ background: '#10b981' }}></div>
            <div style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-muted)' }}>admin.sampaceedu.com.ng</div>
          </div>
          
          <div style={{ padding: '2rem', background: '#FFFFFF', color: '#1E293B' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#064E3B' }}>Super Admin Dashboard</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.25rem 0 0' }}>All Divisions Overview</p>
              </div>
              <div style={{ background: '#ECFDF5', color: '#065F46', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, height: 'fit-content' }}>Online</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Total Revenue</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#064E3B', marginTop: '0.5rem' }}>₦4.2M</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>AI Alerts</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#D97706', marginTop: '0.5rem' }}>3 Fee Defaults Flagged</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <PersonaRouter onNavigate={onNavigate} />
        <div id="diagnostic-section" style={{ marginTop: '4rem' }}><DiagnosticWidget /></div>
        <div style={{ marginTop: '4rem' }}><Testimonials /></div>
        <div style={{ marginTop: '4rem' }}><WhatsAppBar /></div>
      </div>
    </>
  )
}
