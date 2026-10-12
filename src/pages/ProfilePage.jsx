import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProfilePage({ onNavigate }) {
  const { user, profile, updateProfile, roles } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    gender: '',
    date_of_birth: '',
    country: 'Nigeria',
    state: '',
    city: '',
    address: '',
    preferred_contact_method: 'whatsapp',
    preferred_language: 'en'
  })

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        date_of_birth: profile.date_of_birth || '',
        country: profile.country || 'Nigeria',
        state: profile.state || '',
        city: profile.city || '',
        address: profile.address || '',
        preferred_contact_method: profile.preferred_contact_method || 'whatsapp',
        preferred_language: profile.preferred_language || 'en'
      })
    }
  }, [profile])

  const update = (field, value) => setForm({ ...form, [field]: value })

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const { error: updateError } = await updateProfile(form)

      if (updateError) {
        setError(updateError.message || 'Could not save changes.')
        setSaving(false)
        return
      }

      setSuccess(true)
      setEditing(false)
      setSaving(false)

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSaving(false)
    }
  }

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  return (
    <main className="profile-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          My Profile
        </div>
        <h1 className="page-title">Profile Settings</h1>
        <p className="page-subtitle">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="profile-container">
        {/* Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar-large">{getInitials()}</div>
          <div className="profile-header-info">
            <h2 className="profile-name">{profile?.full_name || 'SAMPACE User'}</h2>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-badges">
              {roles.length > 0 ? (
                roles.map((r, i) => (
                  <span key={i} className="profile-role-badge">
                    {r.roles?.name || 'Member'}
                  </span>
                ))
              ) : (
                <span className="profile-role-badge">Member</span>
              )}
            </div>
          </div>
          <button
            className="btn btn-outline"
            onClick={() => setEditing(!editing)}
          >
            {editing ? '✕ Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {success && (
          <div className="auth-success-banner">
            ✓ Your profile has been updated successfully.
          </div>
        )}

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* View Mode */}
        {!editing && (
          <div className="profile-view">
            <div className="profile-section">
              <h3 className="profile-section-title">Personal Information</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <span className="profile-field-label">Full Name</span>
                  <span className="profile-field-value">{profile?.full_name || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Email</span>
                  <span className="profile-field-value">{user?.email || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Phone</span>
                  <span className="profile-field-value">{profile?.phone || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Gender</span>
                  <span className="profile-field-value">{profile?.gender || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Date of Birth</span>
                  <span className="profile-field-value">{profile?.date_of_birth || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Preferred Contact</span>
                  <span className="profile-field-value">{profile?.preferred_contact_method || '—'}</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">Location</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <span className="profile-field-label">Country</span>
                  <span className="profile-field-value">{profile?.country || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">State</span>
                  <span className="profile-field-value">{profile?.state || '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">City</span>
                  <span className="profile-field-value">{profile?.city || '—'}</span>
                </div>
                <div className="profile-field profile-field-full">
                  <span className="profile-field-label">Address</span>
                  <span className="profile-field-value">{profile?.address || '—'}</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')}>
                Go to Dashboard →
              </button>
              <button className="btn btn-outline" onClick={() => onNavigate('courses')}>
                Browse Courses
              </button>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {editing && (
          <form className="profile-edit" onSubmit={handleSave}>
            <div className="profile-section">
              <h3 className="profile-section-title">Personal Information</h3>
              <div className="form-grid">
                <label className="form-field">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => update('full_name', e.target.value)}
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Email (read-only)</span>
                  <input type="email" value={user?.email || ''} disabled />
                </label>
                <label className="form-field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>Gender</span>
                  <select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Date of Birth</span>
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) => update('date_of_birth', e.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>Preferred Contact</span>
                  <select
                    value={form.preferred_contact_method}
                    onChange={(e) => update('preferred_contact_method', e.target.value)}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="sms">SMS</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">Location</h3>
              <div className="form-grid">
                <label className="form-field">
                  <span>Country</span>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>State</span>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => update('state', e.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>City</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                  />
                </label>
                <label className="form-field form-field-full">
                  <span>Address</span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="profile-edit-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
                  }
