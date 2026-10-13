import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function TeacherDashboard({ onNavigate }) {
  const { user, profile, roles } = useAuth()

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Teacher'
  const primaryAssignment = roles[0]?.organisations?.name || 'SAMPACE'

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div className="dashboard-avatar">{getInitials()}</div>
        <div className="dashboard-welcome-text">
          <div className="dashboard-role-badge role-teacher">TEACHER</div>
          <h1 className="dashboard-title">Welcome, {firstName} 👨‍🏫</h1>
          <p className="dashboard-subtitle">
            Teaching at <strong>{primaryAssignment}</strong>
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🏫</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">My Classes</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">👥</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">My Students</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📝</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Pending Grades</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📚</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Materials</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Teaching Tools</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">🏫</div>
            <div className="dashboard-action-title">My Classes</div>
            <div className="dashboard-action-desc">View all classes</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">✅</div>
            <div className="dashboard-action-title">Take Attendance</div>
            <div className="dashboard-action-desc">Mark today's roll</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">📊</div>
            <div className="dashboard-action-title">Grade Submissions</div>
            <div className="dashboard-action-desc">Review student work</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">📤</div>
            <div className="dashboard-action-title">Upload Materials</div>
            <div className="dashboard-action-desc">Share notes & resources</div>
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">My Classes</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">🏫</div>
          <p>No classes assigned yet. Contact your administrator.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Student Activity</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📈</div>
          <p>Student activity will appear here once classes begin.</p>
        </div>
      </div>
    </main>
  )
}
