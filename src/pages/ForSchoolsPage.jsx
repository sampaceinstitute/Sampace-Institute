import React, { useState } from 'react'
import { SITE } from '../constants.js'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function ForSchoolsPage() {
  const [form, setForm] = useState({ schoolName: '', name: '', email: '', phone: '', role: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Save lead to contact_messages table (or a new school_leads table)
      await supabase.from('contact_messages').insert({
        name: `${form.name} (${form.role})`,
        email: form.email,
        subject: `EDTECH LEAD: ${form.schoolName}`,
        message: `Phone: ${form.phone}\n\nInterested in SAMPACE EdTech for ${form.schoolName}.`
      })
      setSuccess(true)
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="simple-page">
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />SAMPACE EDTECH</div>
        <h1 className="page-title">The Operating System for Modern Schools</h1>
        <p className="page-subtitle">
          Automate your school fees, payroll, lesson notes, and CBT exams with AI-powered intelligence. 
          Trusted by forward-thinking educational institutions.
        </p>
      </div>

      <div className="contact-layout" style={{ marginTop: '3rem' }}>
        {/* Left Side: Features */}
        <div className="contact-info" style={{ gap: '1.5rem' }}>
          <div className="contact-card" style={{ textAlign: 'left', padding: '2rem' }}>
            <h3 style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>💳 Financial Automation</h3>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>Track school fees seamlessly with automated receipts, debt tracking, and payroll management. No hidden costs.</p>
          </div>
          <div className="contact-card" style={{ textAlign: 'left', padding: '2rem' }}>
            <h3 style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>🤖 AI Lesson Notes & Results</h3>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>Generate curriculum-aligned lesson notes in seconds. Automate report card generation and student performance analytics.</p>
          </div>
          <div className="contact-card" style={{ textAlign: 'left', padding: '2rem' }}>
            <h3 style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>💻 Secure CBT Engine</h3>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>Conduct exams with anti-cheat webcams, tab-locks, and instant grading. The exact system used by SAMPACE.</p>
          </div>
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className="contact-form-container" style={{ background: 'linear-gradient(135deg, rgba(13, 42, 92, 0.9), rgba(10, 31, 68, 0.9))', border: '1px solid var(--gold)' }}>
          {success ? (
            <div className="auth-success-banner" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div className="success-icon" style={{ margin: '0 auto 1.5rem' }}>✓</div>
              <h3>Request Received!</h3>
              <p style={{ marginTop: '1rem' }}>Our EdTech team will reach out to schedule your onboarding.</p>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <h3 className="apply-step-title" style={{ color: 'var(--gold-light)' }}>Book a Demo / Onboard School</h3>
              
              <label className="form-field">
                <span>School Name *</span>
                <input type="text" required value={form.schoolName} onChange={e => setForm({...form, schoolName: e.target.value})} placeholder="e.g. Kith and Kin Schools" />
              </label>
              <label className="form-field">
                <span>Your Name *</span>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name" />
              </label>
              <label className="form-field">
                <span>Role</span>
                <input type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g. Principal / CLO" />
              </label>
              <label className="form-field">
                <span>Email Address *</span>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@school.com" />
              </label>
              <label className="form-field">
                <span>Phone Number *</span>
                <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="08012345678" />
              </label>

              <LoadingButton type="submit" loading={loading}>Request Onboarding →</LoadingButton>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
