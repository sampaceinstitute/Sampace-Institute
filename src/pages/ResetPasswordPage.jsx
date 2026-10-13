import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ResetPasswordPage({ onNavigate }) {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: resetError } = await resetPassword(email.trim())

      if (resetError) {
        setError(resetError.message || 'Could not send reset email.')
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="auth-page">
        <div className="auth-container">
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h1 className="auth-title">Check your email</h1>
            <p className="auth-subtitle">
              We've sent a password reset link to <strong>{email}</strong>.
              Click the link to set a new password.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('login')}
              style={{ marginTop: '1.5rem' }}
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="badge">
            <span className="badge-dot" />
            Password Reset
          </div>
          <h1 className="auth-title">Forgot your password?</h1>
          <p className="auth-subtitle">
            Enter your email and we'll send you a reset link.
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

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link →'}
          </button>
        </form>

        <div className="auth-back">
          <button className="back-button" onClick={() => onNavigate('login')}>
            ← Back to sign in
          </button>
        </div>
      </div>
    </main>
  )
}
