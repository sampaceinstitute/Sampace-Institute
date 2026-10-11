import React from 'react'
import Logo from './Logo.jsx'
import NewsletterSignup from './NewsletterSignup.jsx'
import { SITE } from '../constants.js'

export default function Footer({ mounted }) {
  return (
    <footer className={`footer ${mounted ? 'fade-in-up-slow' : ''}`}>
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo size={40} />
          <p className="footer-tagline">{SITE.tagline}</p>
          <p className="footer-motto">{SITE.motto}</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📞 {SITE.phone}</p>
          <p>✉️ {SITE.email}</p>
          <p>✉️ {SITE.adminEmail}</p>
        </div>

        <div>
          <h4>Address</h4>
          <p>{SITE.address.street}</p>
          <p>{SITE.address.city}, {SITE.address.state}</p>
          <p>{SITE.address.country}</p>
        </div>

        <div>
          <h4>Explore</h4>
          <p>🏫 13 Schools</p>
          <p>📝 47 Departments</p>
          <p>🎯 400+ Courses</p>
          <p>📍 19 States</p>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p className="footer-newsletter-copy">
            Weekly JAMB tips, tech trends, and future-of-work insights.
          </p>
          <NewsletterSignup variant="footer" />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <a href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶️</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">🐦</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
        </div>
        <p>
          © {new Date().getFullYear()} {SITE.name} · RC: {SITE.rc} · Built for the next 100 years
        </p>
      </div>
    </footer>
  )
}
