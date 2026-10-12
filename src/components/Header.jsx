import React, { useState } from 'react'
import Logo from './Logo.jsx'
import UserMenu from './UserMenu.jsx'
import { NAV_LINKS } from '../constants.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Header({ currentRoute, onNavigate, mounted }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()

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

          {isAuthenticated ? (
            <UserMenu onNavigate={onNavigate} />
          ) : (
            <>
              <button
                className="nav-link"
                onClick={() => handleNav('login')}
              >
                Sign In
              </button>
              <button className="cta-small" onClick={() => handleNav('signup')}>
                Sign Up Free
              </button>
            </>
          )}
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

          <div className="mobile-auth">
            {isAuthenticated ? (
              <>
                <button className="mobile-link" onClick={() => handleNav('home')}>
                  🏠 My Dashboard
                </button>
                <button className="mobile-link" onClick={() => handleNav('courses')}>
                  📚 My Courses
                </button>
                <button className="mobile-link" onClick={() => handleNav('apply')}>
                  📝 My Applications
                </button>
                <button
                  className="mobile-link mobile-signout"
                  onClick={async () => {
                    const { signOut } = await import('../contexts/AuthContext.jsx')
                      .then(() => ({ signOut: null }))
                      .catch(() => ({ signOut: null }))
                    // Fallback: use navigate pattern
                    setMobileOpen(false)
                    window.location.href = '/logout'
                  }}
                >
                  🚪 Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="mobile-link" onClick={() => handleNav('login')}>
                  Sign In
                </button>
                <button className="cta-small mobile-cta" onClick={() => handleNav('signup')}>
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
