import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function StudentDashboard({ onNavigate, isNewUser }) {
  const { user, profile } = useAuth()

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
          <div className="dashboard-role-badge">STUDENT</div>
          <h1 className="dashboard-title">Welcome back, {firstName} 👋</h1>
          <p className="dashboard-subtitle">
            {isNewUser
              ? 'Your learner journey starts here. Explore courses or take the free diagnostic test.'
              : 'Your SAMPACE overview is below.'}
          </p>
        </div>
      </div>

      {isNewUser && (
        <div className="dashboard-onboarding">
          <div className="dashboard-onboarding-icon">🎓</div>
          <div>
            <h3>Welcome to SAMPACE!</h3>
            <p>
              Start with these three steps to make the most of your account.
            </p>
          </div>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📚</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Enrolled Courses</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🎯</div>
          <div className="dashboard-stat-number">—</div>
          <div className="dashboard-stat-label">Readiness Score</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📝</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Applications</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🏆</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Certificates</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('courses')}>
            <div className="dashboard-action-icon">🔍</div>
            <div className="dashboard-action-title">Browse Courses</div>
            <div className="dashboard-action-desc">Explore 400+ courses</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('home')}>
            <div className="dashboard-action-icon">🎯</div>
            <div className="dashboard-action-title">Take Diagnostic Test</div>
            <div className="dashboard-action-desc">Free JAMB readiness check</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('apply')}>
            <div className="dashboard-action-icon">📝</div>
            <div className="dashboard-action-title">New Application</div>
            <div className="dashboard-action-desc">Apply to a programme</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('profile')}>
            <div className="dashboard-action-icon">⚙️</div>
            <div className="dashboard-action-title">Edit Profile</div>
            <div className="dashboard-action-desc">Update your details</div>
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">My Courses</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📚</div>
          <p>You haven't enrolled in any courses yet.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
            Browse Courses →
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Activity</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📋</div>
          <p>No activity yet. Your learning journey starts here.</p>
        </div>
      </div>
    </main>
  )
}
