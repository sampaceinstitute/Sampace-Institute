import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ParentDashboard({ onNavigate }) {
  const { user, profile } = useAuth()

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Parent'

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div className="dashboard-avatar">{getInitials()}</div>
        <div className="dashboard-welcome-text">
          <div className="dashboard-role-badge role-parent">PARENT</div>
          <h1 className="dashboard-title">Welcome, {firstName} 👨‍👩‍👧</h1>
          <p className="dashboard-subtitle">
            Monitor your children's learning journey
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">👶</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">My Children</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">💰</div>
          <div className="dashboard-stat-number">₦0</div>
          <div className="dashboard-stat-label">Fees Due</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📊</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Reports</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">💬</div>
          <div className="dashboard-stat-number">0</div>
          <div className="dashboard-stat-label">Messages</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Parent Tools</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">👶</div>
            <div className="dashboard-action-title">Add a Child</div>
            <div className="dashboard-action-desc">Link to your child's account</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">💰</div>
            <div className="dashboard-action-title">Pay Fees</div>
            <div className="dashboard-action-desc">View & pay outstanding fees</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">📊</div>
            <div className="dashboard-action-title">View Reports</div>
            <div className="dashboard-action-desc">Weekly performance reports</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('dashboard')}>
            <div className="dashboard-action-icon">💬</div>
            <div className="dashboard-action-title">Message Teacher</div>
            <div className="dashboard-action-desc">Communicate with staff</div>
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">My Children</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">👶</div>
          <p>You haven't linked any children yet.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('dashboard')}>
            Add a Child →
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Reports</h2>
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📈</div>
          <p>Weekly progress reports will appear here.</p>
        </div>
      </div>
    </main>
  )
}
