import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function LoginPage({ onNavigate }) {
  const { signIn, user, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If already logged in, redirect home
    if (isAuthenticated && user) {
      onNavigate('home')
    }
  }, [isAuthenticated, user, onNavigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await signIn({ email: email.trim(), password })

      if (signInError) {
        setError(signInError.message || 'Login failed. Check your email and password.')
        setLoading(false)
        return
      }

      onNavigate('home')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="badge">
            <span className="badge-dot" />
            Welcome Back
          </div>
          <h1 className="auth-title">Sign in to SAMPACE</h1>
          <p className="auth-subtitle">
            Access your dashboard, courses, and learning progress.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <label className="form-field">
            <span>Email Address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          <div className="auth-row">
            <button
              type="button"
              className="auth-link-small"
              onClick={() => onNavigate('resetPassword')}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="auth-footer-text">
          Don't have an account?{' '}
          <button
            className="auth-link"
            onClick={() => onNavigate('signup')}
          >
            Create one now
          </button>
        </div>

        <div className="auth-back">
          <button className="back-button" onClick={() => onNavigate('home')}>
            ← Back to home
          </button>
        </div>
      </div>
    </main>
  )
}
