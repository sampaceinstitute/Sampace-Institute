import React, { useState } from 'react'
import Logo from './Logo.jsx'
import { NAV_LINKS } from '../constants.js'

export default function Header({ currentRoute, onNavigate, mounted }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (route) => {
    onNavigate(route)
    setMobileOpen(false)
  }

  return (
    <header className={`header ${mounted ? 'fade-in-down' : ''}`}>
      <div className="header-inner">
        <button
          className="logo-button"
          onClick={() => handleNav('home')}
          aria-label="Go to homepage"
        >
          <Logo size={48} />
        </button>

        <nav className="nav desktop-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.route}
              className={`nav-link ${currentRoute === link.route ? 'active' : ''}`}
              onClick={() => handleNav(link.route)}
            >
              {link.label}
            </button>
          ))}
          <button className="cta-small" onClick={() => handleNav('apply')}>
            Apply Now
          </button>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.route}
              className={`mobile-link ${currentRoute === link.route ? 'active' : ''}`}
              onClick={() => handleNav(link.route)}
            >
              {link.label}
            </button>
          ))}
          <button className="cta-small" onClick={() => handleNav('apply')}>
            Apply Now
          </button>
        </div>
      )}
    </header>
  )
}
