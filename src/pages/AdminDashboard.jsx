import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { ALL_DIVISIONS } from '../constants.js'

export default function AdminDashboard({ onNavigate }) {
  const { user, profile } = useAuth()

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Admin'

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome admin-welcome">
        <div className="dashboard-avatar">{getInitials()}</div>
        <div className="dashboard-welcome-text">
          <div className="dashboard-role-badge role-admin">ADMINISTRATOR</div>
          <h1 className="dashboard-title">Administrator Console</h1>
          <p className="dashboard-subtitle">
            Welcome, {firstName}. You have full system access.
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">👥</div>
          <div className="dashboard-stat-number">1</div>
          <div className="dashboard-stat-label">Total Users</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📝</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Applications</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">💰</div>
          <div className="dashboard-stat-number">₦0</div>
          <div className="dashboard-stat-label">Revenue</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🎓</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Enrollments</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">System Administration</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">👥</div>
            <div className="dashboard-action-title">User Management</div>
            <div className="dashboard-action-desc">Assign roles, manage access</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">📝</div>
            <div className="dashboard-action-title">Review Applications</div>
            <div className="dashboard-action-desc">Process pending applications</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">📊</div>
            <div className="dashboard-action-title">Analytics</div>
            <div className="dashboard-action-desc">Traffic, conversions, revenue</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">⚙️</div>
            <div className="dashboard-action-title">System Settings</div>
            <div className="dashboard-action-desc">Configuration & features</div>
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Platform Overview</h2>
        <div className="admin-stats-grid">
          <div className="admin-stat-item">
            <div className="admin-stat-label">Schools & Divisions</div>
            <div className="admin-stat-value">{ALL_DIVISIONS.length}</div>
          </div>
          <div className="admin-stat-item">
            <div className="admin-stat-label">Total Courses</div>
            <div className="admin-stat-value">
              {ALL_DIVISIONS.reduce((s, d) => s + d.departments.reduce((x, dept) => x + dept.courses.length, 0), 0)}
            </div>
          </div>
          <div className="admin-stat-item">
            <div className="admin-stat-label">Database Tables</div>
            <div className="admin-stat-value">8</div>
          </div>
          <div className="admin-stat-item">
            <div className="admin-stat-label">Roles Defined</div>
            <div className="admin-stat-value">15</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Users</h2>
        <div className="admin-user-list">
          <div className="admin-user-item">
            <div className="admin-user-avatar">{getInitials()}</div>
            <div className="admin-user-info">
              <div className="admin-user-name">{profile?.full_name || 'You'}</div>
              <div className="admin-user-email">{user?.email}</div>
            </div>
            <div className="admin-user-badge">ADMIN</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">System Health</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">✅</div>
          <p>All systems operational. Database connected. Auth working.</p>
        </div>
      </div>
    </main>
  )
}
