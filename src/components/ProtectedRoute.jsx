import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProtectedRoute({ children, requiredRoles = [], onNavigate, redirectTo = 'login' }) {
  const { isAuthenticated, loading, hasAnyRole, roles } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!isAuthenticated) {
      // Save intended destination for post-login redirect
      sessionStorage.setItem('sampace_redirect_after_login', window.location.pathname)
      onNavigate(redirectTo)
    }
  }, [isAuthenticated, loading, onNavigate, redirectTo])

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-container">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return (
      <main className="auth-page">
        <div className="auth-container">
          <div className="auth-success">
            <div className="not-found-code" style={{ fontSize: '4rem' }}>403</div>
            <h1 className="auth-title">Access Denied</h1>
            <p className="auth-subtitle">
              You don't have permission to access this page. Contact your administrator if you believe this is a mistake.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate('home')} style={{ marginTop: '1.5rem' }}>
              Go Home
            </button>
          </div>
        </div>
      </main>
    )
  }

  return children
}
