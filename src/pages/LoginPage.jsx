import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { checkRateLimit, recordFailedAttempt } from '../lib/rateLimiter.js'

export default function LoginPage({ onNavigate }) {
  const { signIn, user, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [rateLimitError, setRateLimitError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      onNavigate('dashboard')
    }
  }, [isAuthenticated, user, onNavigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setRateLimitError('')

    // Check rate limit first
    const rateCheck = checkRateLimit()
    if (!rateCheck.allowed) {
      setRateLimitError(rateCheck.message)
      return
    }

    setLoading(true)

    try {
      const { error: signInError } = await signIn({
        email: email.trim(),
        password,
        rememberMe
      })

      if (signInError) {
        recordFailedAttempt()
        setError(signInError.message || 'Login failed. Check your email and password.')
        setLoading(false)
        return
      }

      onNavigate('dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const remainingAttempts = checkRateLimit().remaining

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
          {rateLimitError && (
            <div className="auth-error">
              <span>🔒</span> {rateLimitError}
            </div>
          )}

          {error && !rateLimitError && (
            <div className="auth-error">
              <span>⚠️</span> {error}
              {remainingAttempts !== undefined && remainingAttempts > 0 && remainingAttempts < 5 && (
                <div style={{ fontSize: '0.75rem', marginTop: '0.35rem', opacity: 0.8 }}>
                  {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining.
                </div>
              )}
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
            <label className="auth-checkbox-inline">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
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
          <button className="auth-link" onClick={() => onNavigate('signup')}>
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
