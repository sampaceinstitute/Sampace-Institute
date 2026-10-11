import React from 'react'
import { SITE } from '../constants.js'

export default function ContactPage() {
  return (
    <main className="simple-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Get in Touch
        </div>
        <h1 className="page-title">Contact SAMPACE</h1>
        <p className="page-subtitle">
          We reply to every enquiry within 24 hours.
        </p>
      </div>

      <div className="contact-grid">
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

        <a
          href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <div className="contact-icon">💬</div>
          <h3>WhatsApp</h3>
          <p>{SITE.phone}</p>
        </a>

        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h3>Visit Us</h3>
          <p>{SITE.address.street}</p>
          <p>{SITE.address.city}, {SITE.address.state}</p>
        </div>
      </div>
    </main>
  )
}
