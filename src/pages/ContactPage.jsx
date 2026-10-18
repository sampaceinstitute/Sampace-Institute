import React, { useState } from 'react'
import { SITE } from '../constants.js'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        })

      if (dbError) throw dbError

      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setError('Failed to send message. Please try again or WhatsApp us.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="simple-page">
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Get in Touch</div>
        <h1 className="page-title">Contact SAMPACE</h1>
        <p className="page-subtitle">We reply to every enquiry within 24 hours.</p>
      </div>

      <div className="contact-layout">
        {/* Contact Info Cards */}
        <div className="contact-info">
          <a href={`tel:${SITE.phone}`} className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>{SITE.phone}</p>
          </a>
          <a href={`mailto:${SITE.email}`} className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Email Us</h3>
            <p>{SITE.email}</p>
          </a>
          <a href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>Fastest response</p>
          </a>
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Visit Us</h3>
            <p>{SITE.address.street}<br/>{SITE.address.city}, {SITE.address.state}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          {success ? (
            <div className="auth-success-banner" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div className="success-icon" style={{ margin: '0 auto 1.5rem' }}>✓</div>
              <h3>Message Sent!</h3>
              <p style={{ marginTop: '1rem' }}>Thank you for reaching out. Our team will get back to you shortly.</p>
              <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => setSuccess(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <h3 className="apply-step-title">Send us a message</h3>
              
              {error && <div className="auth-error"><span>⚠️</span> {error}</div>}
              
              <label className="form-field">
                <span>Full Name *</span>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Your name" />
              </label>
              <label className="form-field">
                <span>Email Address *</span>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="you@example.com" />
              </label>
              <label className="form-field">
                <span>Subject</span>
                <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="What is this regarding?" />
              </label>
              <label className="form-field">
                <span>Message *</span>
                <textarea rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="How can we help you?" />
              </label>

              <LoadingButton type="submit" loading={loading} loadingText="Sending...">
                Send Message →
              </LoadingButton>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
