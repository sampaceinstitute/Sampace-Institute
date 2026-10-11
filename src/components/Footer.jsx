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
         
