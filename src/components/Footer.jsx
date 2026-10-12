import React from 'react'
import Logo from './Logo.jsx'
import NewsletterSignup from './NewsletterSignup.jsx'
import { SITE } from '../constants.js'

export default function Footer({ mounted, onNavigate }) {
  const nav = (r) => (e) => { e.preventDefault(); onNavigate(r) }

  return (
    <footer className={`footer ${mounted ? 'fade-in-up-slow' : ''}`}>
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo size={40} />
          <p className="footer-tagline">{SITE.tagline}</p>
          <p className="footer-motto">{SITE.motto}</p>
        </div>

        <div>
          <h4>Explore</h4>
          <p><a href="/schools" onClick={nav('schools')}>Schools & Divisions</a></p>
          <p><a href="/courses" onClick={nav('courses')}>Course Catalog</a></p>
          <p><a href="/events" onClick={nav('events')}>Events & Webinars</a></p>
          <p><a href="/success-stories" onClick={nav('successStories')}>Success Stories</a></p>
          <p><a href="/blog" onClick={nav('blog')}>Blog</a></p>
        </div>

        <div>
          <h4>Support</h4>
          <p><a href="/faq" onClick={nav('faq')}>FAQ</a></p>
          <p><a href="/apply" onClick={nav('apply')}>Apply Now</a></p>
          <p><a href="/contact" onClick={nav('contact')}>Contact Us</a></p>
          <p><a href="/privacy" onClick={nav('privacy')}>Privacy Policy</a></p>
          <p><a href="/terms" onClick={nav('terms')}>Terms of Service</a></p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📞 {SITE.phone}</p>
          <p>✉️ {SITE.email}</p>
          <p>📍 {SITE.address.street}</p>
          <p>{SITE.address.city}, {SITE.address.state}</p>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p className="footer-newsletter-copy">
            Weekly tips, tech trends, and future-of-work insights.
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
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">🐦</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
        </div>
        <p>
          © {new Date().getFullYear()} {SITE.name} · RC: {SITE.rc} · Built for the next 100 years
        </p>
      </div>
    </footer>
  )
}
