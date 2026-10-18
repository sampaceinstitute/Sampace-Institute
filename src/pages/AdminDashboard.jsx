import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { ALL_DIVISIONS } from '../constants.js'
import { getAdminOverview, getRecentApplications, getRecentPayments } from '../lib/analyticsService.js'

export default function AdminDashboard({ onNavigate }) {
  const { user, profile } = useAuth()
  const [overview, setOverview] = useState(null)
  const [recentApps, setRecentApps] = useState([])
  const [recentPays, setRecentPays] = useState([])

  useEffect(() => {
    const load = async () => {
      const [o, a, p] = await Promise.all([
        getAdminOverview(),
        getRecentApplications(4),
        getRecentPayments(4)
      ])
      setOverview(o.data)
      setRecentApps(a.data || [])
      setRecentPays(p.data || [])
    }
    load()
  }, [])

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Admin'
  const formatNaira = (n) => '₦' + Math.round(n).toLocaleString('en-NG')

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome admin-welcome">
        <div className="dashboard-avatar">{getInitials()}</div>
        <div className="dashboard-welcome-text">
          <div className="dashboard-role-badge role-admin">ADMINISTRATOR</div>
          <h1 className="dashboard-title">Administrator Console</h1>
          <p className="dashboard-subtitle">Welcome, {firstName}. You have full system access.</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">👥</div>
          <div className="dashboard-stat-number">{overview?.totalUsers ?? '—'}</div>
          <div className="dashboard-stat-label">Total Users</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📝</div>
          <div className="dashboard-stat-number">{overview?.totalApplications ?? '—'}</div>
          <div className="dashboard-stat-label">Applications</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">💰</div>
          <div className="dashboard-stat-number" style={{ color: '#E5C158' }}>
            {overview ? formatNaira(overview.totalRevenue) : '—'}
          </div>
          <div className="dashboard-stat-label">Revenue</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🎓</div>
          <div className="dashboard-stat-number" style={{ color: '#4ade80' }}>
            {overview?.totalEnrollments ?? '—'}
          </div>
          <div className="dashboard-stat-label">Enrollments</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">System Administration</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('adminUsers')}>
            <div className="dashboard-action-icon">👥</div>
            <div className="dashboard-action-title">User Management</div>
            <div className="dashboard-action-desc">Assign roles, manage access</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('adminApplications')}>
            <div className="dashboard-action-icon">📝</div>
            <div className="dashboard-action-title">Review Applications</div>
            <div className="dashboard-action-desc">Process pending applications</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('adminPayments')}>
            <div className="dashboard-action-icon">💳</div>
            <div className="dashboard-action-title">Payments</div>
            <div className="dashboard-action-desc">See all transactions</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('adminAnalytics')}>
            <div className="dashboard-action-icon">📊</div>
            <div className="dashboard-action-title">Analytics</div>
            <div className="dashboard-action-desc">Traffic, conversions, revenue</div>
          </button>
        </div>
      </div>
          <button className="dashboard-action-card" onClick={() => onNavigate('adminExams')}>
  <div className="dashboard-action-icon">📝</div>
  <div className="dashboard-action-title">CBT Exams</div>
  <div className="dashboard-action-desc">Create & manage tests</div>
</button>
          <button className="dashboard-action-card" onClick={() => onNavigate('adminMessages')}>
  <div className="dashboard-action-icon">📩</div>
  <div className="dashboard-action-title">Inbox</div>
  <div className="dashboard-action-desc">Read contact messages</div>
</button> 
          <button className="dashboard-action-card" onClick={() => onNavigate('adminGrading')}>
  <div className="dashboard-action-icon">✍️</div>
  <div className="dashboard-action-title">Grading</div>
  <div className="dashboard-action-desc">Grade theory submissions</div>
</button>
      
      {/* Two-column: Recent Applications + Recent Payments */}
      <div className="admin-recent-grid">
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Recent Applications</h2>
          {recentApps.length === 0 ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">📝</div>
              <p>No applications yet.</p>
            </div>
          ) : (
            <div className="admin-recent-list">
              {recentApps.map((a) => (
                <button
                  key={a.id}
                  className="admin-recent-item"
                  onClick={() => onNavigate({ route: 'adminApplicationDetail', id: a.id })}
                >
                  <div className="admin-recent-main">
                    <div className="admin-recent-title">{a.applicant_name || 'Unnamed'}</div>
                    <div className="admin-recent-sub">{a.reference} · {a.school_name || '—'}</div>
                  </div>
                  <div className="admin-recent-date">{formatDate(a.created_at)}</div>
                </button>
               ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Recent Payments</h2>
          {recentPays.length === 0 ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">💳</div>
              <p>No payments yet.</p>
            </div>
          ) : (
            <div className="admin-recent-list">
              {recentPays.map((p) => (
                <div key={p.reference} className="admin-recent-item">
                  <div className="admin-recent-main">
                    <div className="admin-recent-title">{p.reference}</div>
                    <div className="admin-recent-sub">{p.description || 'Payment'}</div>
                  </div>
                  <div className="admin-recent-right">
                    <div className="admin-recent-amount">{formatNaira(p.amount / 100)}</div>
                    <div className={`admin-recent-status status-${p.status}`}>{p.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <div className="admin-stat-value">10</div>
          </div>
          <div className="admin-stat-item">
            <div className="admin-stat-label">Roles Defined</div>
            <div className="admin-stat-value">15</div>
          </div>
        </div>
      </div>
    </main>
  )
}
