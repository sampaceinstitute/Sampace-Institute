import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function UserMenu({ onNavigate }) {
  const { user, profile, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    setOpen(false)
    await signOut()
    onNavigate('home')
  }

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const displayName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'

  return (
    <div className="user-menu" ref={ref}>
      <button
        className="user-menu-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="user-avatar">{getInitials()}</span>
        <span className="user-name">{displayName}</span>
        <span className={`user-chevron ${open ? 'rotated' : ''}`}>⌄</span>
      </button>

      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <div className="user-dropdown-avatar">{getInitials()}</div>
            <div>
              <div className="user-dropdown-name">
                {profile?.full_name || 'SAMPACE User'}
              </div>
              <div className="user-dropdown-email">
                {user?.email || ''}
              </div>
            </div>
          </div>

          <div className="user-dropdown-divider" />

          <button
            className="user-dropdown-item"
            onClick={() => { setOpen(false); onNavigate('dashboard') }}
          >
            🏠 My Dashboard
          </button>
          <button
            className="user-dropdown-item"
            onClick={() => { setOpen(false); onNavigate('courses') }}
          >
            📚 Browse Courses
          </button>
          <button
            className="user-dropdown-item"
            onClick={() => { setOpen(false); onNavigate('apply') }}
          >
            📝 Apply
          </button>
          <button
            className="user-dropdown-item"
            onClick={() => { setOpen(false); onNavigate('myApplications') }}
          >
            📋 My Applications
         <button
  className="user-dropdown-item"
  onClick={() => { setOpen(false); onNavigate('wallet') }}
>
  💳 My Wallet
</button>
          </button>
          <button
            className="user-dropdown-item"
            onClick={() => { setOpen(false); onNavigate('profile') }}
          >
            ⚙️ Profile Settings
          </button>

          <div className="user-dropdown-divider" />

          <button
            className="user-dropdown-item user-dropdown-signout"
            onClick={handleSignOut}
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
