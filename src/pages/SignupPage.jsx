import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function SignupPage({ onNavigate }) {
  const { signUp } = useAuth()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreed: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm({ ...form, [field]: value })

  const passwordStrength = () => {
    const p = form.password
    if (p.length === 0) return { level: 0, label: '', color: '' }
    if (p.length < 6) return { level: 1, label: 'Too short', color: '#f87171' }
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    if (score >= 3) return { level: 3, label: 'Strong', color: '#4ade80' }
    if (score === 2) return { level: 2, label: 'Good', color: '#E5C158' }
    return { level: 1, label: 'Weak', color: '#fb923c' }
  }

  const strength = passwordStrength()

  const validate = () => {
    if (!form.fullName.trim()) return 'Please enter your full name.'
    if (!form.email.includes('@')) return 'Please enter a valid email address.'
    if (!form.phone || form.phone.length < 10) return 'Please enter a valid phone number.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    if (!form.agreed) return 'Please agree to the Terms of Service.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const { error: signUpError } = await signUp({
        email: form.email.trim(),
        password: form.password,
        fullName: form.fullName.trim(),
        phone: form.phone.trim()
      })

      if (signUpError) {
        setError(signUpError.message || 'Signup failed. Please try again.')
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
            <h1 className="auth-title">Welcome to SAMPACE!</h1>
            <p className="auth-subtitle">
              Your account has been created. You can now access your dashboard,
              enroll in courses, and track your learning.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('home')}
              style={{ marginTop: '1.5rem' }}
            >
              Go to Homepage →
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
            Join SAMPACE Free
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            It takes 30 seconds. No credit card required.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <label className="form-field">
            <span>Full Name *</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="e.g. Chidinma Okafor"
              autoComplete="name"
              required
            />
          </label>

          <label className="form-field">
            <span>Email Address *</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-field">
            <span>WhatsApp Number *</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="08012345678"
              autoComplete="tel"
              required
            />
          </label>

          <label className="form-field">
            <span>Password *</span>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
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
            {form.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(strength.level / 3) * 100}%`,
                      background: strength.color
                    }}
                  />
                </div>
                <span className="strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </label>

          <label className="form-field">
            <span>Confirm Password *</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />
          </label>

          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => update('agreed', e.target.checked)}
            />
            <span>
              I agree to the{' '}
              <button
                type="button"
                className="auth-link-inline"
                onClick={() => onNavigate('terms')}
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                className="auth-link-inline"
                onClick={() => onNavigate('privacy')}
              >
                Privacy Policy
              </button>
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div className="auth-footer-text">
          Already have an account?{' '}
          <button
            className="auth-link"
            onClick={() => onNavigate('login')}
          >
            Sign in
          </button>
        </div>
      </div>
    </main>
  )
}
