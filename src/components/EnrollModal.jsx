import React, { useState, useEffect } from 'react'
import { SITE } from '../constants.js'

export default function EnrollModal({ course, onClose }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!course) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!phone || phone.length < 10) return

    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n` +
      `I want to enroll in:\n` +
      `📚 ${course.title}\n` +
      `🏫 ${course.school}\n` +
      `📂 ${course.department}\n\n` +
      `Name: ${name || 'Not provided'}\n` +
      `Phone: ${phone}\n\n` +
      `Please send me the enrollment details, pricing, and next steps.`
    )

    window.open(
      `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`,
      '_blank'
    )
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="modal-icon">{course.schoolIcon}</div>
            <div className="modal-school-label">{course.school}</div>
            <h2 className="modal-title">{course.title}</h2>
            <p className="modal-subtitle">
              Fill in your details below. We'll send you the enrollment
              information, pricing, and next steps on WhatsApp.
            </p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="capture-input"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                className="capture-input"
                placeholder="WhatsApp number (e.g. 08012345678)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary modal-submit">
                Send My Enrollment Request →
              </button>
              <p className="diagnostic-note">
                🔒 Your details are safe. No spam.
              </p>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2 className="modal-title">Request Sent!</h2>
            <p className="modal-subtitle">
              Check your WhatsApp. Our team will send you the enrollment
              details and pricing within 24 hours.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open WhatsApp
            </a>
            <button className="btn btn-outline" onClick={onClose} style={{ marginTop: '0.75rem' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
