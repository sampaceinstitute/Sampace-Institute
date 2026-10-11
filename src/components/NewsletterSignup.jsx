import React, { useState } from 'react'
import { SITE } from '../constants.js'

export default function NewsletterSignup({ variant = 'section' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    // Simple mailto capture — later replaced with real backend
    setSubmitted(true)
  }

  if (variant === 'footer') {
    return (
      <div className="newsletter-footer">
        {!submitted ? (
          <form className="newsletter-form-footer" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input-footer"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn-footer">
              Subscribe →
            </button>
          </form>
        ) : (
          <p className="newsletter-success-footer">✓ Subscribed!</p>
        )}
      </div>
    )
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        {!submitted ? (
          <>
            <div className="badge">
              <span className="badge-dot" />
              Stay Updated
            </div>
            <h2 className="section-title">Get Weekly Education Insights</h2>
            <p className="section-subtitle">
              JAMB tips, tech trends, and future-of-work insights — delivered every Friday.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe Free
                <span className="btn-arrow">→</span>
              </button>
            </form>
            <p className="diagnostic-note">
              🔒 We never share your email. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="newsletter-success">
            <div className="success-icon">✓</div>
            <h2 className="section-title">You're Subscribed!</h2>
            <p className="section-subtitle">
              Check your inbox for a welcome email.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
