import React from 'react'
import Logo from './Logo.jsx'
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
          <p>🏫 6 Schools</p>
          <p>📝 47 Departments</p>
          <p>🎯 312+ Courses</p>
          <p>📍 19 States</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name} · RC: {SITE.rc} · Built for the next 100 years
        </p>
      </div>
    </footer>
  )
}
