import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function SetNewPasswordPage({ onNavigate }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Supabase appends #access_token=...&type=recovery to the URL
    // The client library auto-detects this and creates a session.
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) setHasSession(true)
    }

    // Give Supabase a moment to parse the URL hash
    const timer = setTimeout(checkSession, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) {
        setError(updateError.message || 'Could not update password.')
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)

      setTimeout(() => onNavigate('login'), 2500)
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
            <h1 className="auth-title">Password Updated!</h1>
            <p className="auth-subtitle">
              Your new password has been saved. Redirecting you to sign in...
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('login')}
              style={{ marginTop: '1.5rem' }}
            >
              Go to Sign In →
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
            Set New Password
          </div>
          <h1 className="auth-title">Create a new password</h1>
          <p className="auth-subtitle">
            Choose a strong password you'll remember.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!hasSession && (
            <div className="auth-error">
              <span>⚠️</span> Waiting for password reset link... If this message persists, request a new reset link from the sign-in page.
            </div>
          )}

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <label className="form-field">
            <span>New Password</span>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          <label className="form-field">
            <span>Confirm New Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your new password"
              autoComplete="new-password"
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading || !hasSession}
            style={{ opacity: hasSession ? 1 : 0.5 }}
          >
            {loading ? 'Updating...' : 'Update Password →'}
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
