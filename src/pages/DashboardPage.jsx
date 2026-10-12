import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function DashboardPage({ onNavigate }) {
  const { user, profile, roles } = useAuth()

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Friend'

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div className="dashboard-avatar">{getInitials()}</div>
        <div className="dashboard-welcome-text">
          <h1 className="dashboard-title">Welcome back, {firstName} 👋</h1>
          <p className="dashboard-subtitle">
            Here is your SAMPACE overview.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📚</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Enrolled Courses</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📝</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Applications</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🎯</div>
          <div className="dashboard-stat-number">—</div>
          <div className="dashboard-stat-label">Readiness Score</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🏆</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Certificates</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('courses')}>
            <div className="dashboard-action-icon">🔍</div>
            <div className="dashboard-action-title">Browse Courses</div>
            <div className="dashboard-action-desc">Explore 400+ courses</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('apply')}>
            <div className="dashboard-action-icon">📝</div>
            <div className="dashboard-action-title">New Application</div>
            <div className="dashboard-action-desc">Apply to a programme</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('schools')}>
            <div className="dashboard-action-icon">🏫</div>
            <div className="dashboard-action-title">Explore Schools</div>
            <div className="dashboard-action-desc">13 schools & divisions</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('profile')}>
            <div className="dashboard-action-icon">⚙️</div>
            <div className="dashboard-action-title">Edit Profile</div>
            <div className="dashboard-action-desc">Update your details</div>
          </button>
        </div>
      </div>

      {/* Role Info */}
      {roles.length > 0 && (
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Your Roles</h2>
          <div className="dashboard-roles">
            {roles.map((r, i) => (
              <div key={i} className="dashboard-role-item">
                <div className="dashboard-role-icon">🎓</div>
                <div>
                  <div className="dashboard-role-name">{r.roles?.name}</div>
                  <div className="dashboard-role-org">{r.organisations?.name || 'SAMPACE'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity Placeholder */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Activity</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📋</div>
          <p>No activity yet. Start by browsing courses or applying to a programme.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
            Browse Courses →
          </button>
        </div>
      </div>
    </main>
  )
}
