import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getUserApplications, getUserDiagnostics } from '../lib/dataService.js'

export default function MyApplicationsPage({ onNavigate }) {
  const { user, profile } = useAuth()
  const [tab, setTab] = useState('applications')
  const [applications, setApplications] = useState([])
  const [diagnostics, setDiagnostics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    const load = async () => {
      const [appsRes, diagRes] = await Promise.all([
        getUserApplications(user.id),
        getUserDiagnostics(user.id)
      ])
      setApplications(appsRes.data || [])
      setDiagnostics(diagRes.data || [])
      setLoading(false)
    }
    load()
  }, [user?.id])

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusColor = (status) => {
    const map = {
      draft: '#a1a1aa',
      submitted: '#E5C158',
      under_review: '#22d3ee',
      approved: '#4ade80',
      unsuccessful: '#f87171',
      withdrawn: '#a1a1aa',
      enrolled: '#4ade80'
    }
    return map[status] || '#E5C158'
  }

  return (
    <main className="my-applications-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          My Account
        </div>
        <h1 className="page-title">My Activity</h1>
        <p className="page-subtitle">
          Track your applications, enrollments, and diagnostic results.
        </p>
      </div>

      <div className="my-tabs">
        <button
          className={`my-tab ${tab === 'applications' ? 'active' : ''}`}
          onClick={() => setTab('applications')}
        >
          📝 Applications ({applications.length})
        </button>
        <button
          className={`my-tab ${tab === 'diagnostics' ? 'active' : ''}`}
          onClick={() => setTab('diagnostics')}
        >
          🎯 Diagnostics ({diagnostics.length})
        </button>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading...</p>
        </div>
      )}

      {!loading && tab === 'applications' && (
        <>
          {applications.length === 0 ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">📝</div>
              <p>You haven't submitted any applications yet.</p>
              <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
                Browse Courses →
              </button>
            </div>
          ) : (
            <div className="my-list">
              {applications.map((a) => (
                <div key={a.id} className="my-card">
                  <div className="my-card-header">
                    <div className="my-card-reference">{a.reference}</div>
                    <div
                      className="my-card-status"
                      style={{ color: statusColor(a.status), borderColor: statusColor(a.status) }}
                    >
                      {a.status?.replace(/_/g, ' ').toUpperCase()}
                    </div>
                  </div>
                  <h3 className="my-card-title">{a.course_title || a.programme || 'Application'}</h3>
                  <div className="my-card-meta">
                    {a.school_name && <div>🏫 {a.school_name}</div>}
                    {a.department_name && <div>📂 {a.department_name}</div>}
                    <div>📅 Submitted {formatDate(a.submitted_at || a.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!loading && tab === 'diagnostics' && (
        <>
          {diagnostics.length === 0 ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">🎯</div>
              <p>You haven't taken any diagnostic tests yet.</p>
              <button className="btn btn-primary" onClick={() => onNavigate('home')}>
                Take Free Test →
              </button>
            </div>
          ) : (
            <div className="my-list">
              {diagnostics.map((d) => (
                <div key={d.id} className="my-card">
                  <div className="my-card-header">
                    <div className="my-card-reference">{d.exam_type}</div>
                    <div
                      className="my-card-status"
                      style={{
                        color: d.readiness_level === 'Excellent' ? '#4ade80'
                          : d.readiness_level === 'Good' ? '#E5C158'
                          : d.readiness_level === 'Fair' ? '#fb923c'
                          : '#f87171',
                        borderColor: d.readiness_level === 'Excellent' ? '#4ade80'
                          : d.readiness_level === 'Good' ? '#E5C158'
                          : d.readiness_level === 'Fair' ? '#fb923c'
                          : '#f87171'
                      }}
                    >
                      {d.readiness_level?.toUpperCase() || 'N/A'}
                    </div>
                  </div>
                  <div className="my-score-display">
                    <span className="my-score-number">{d.score}/{d.total_questions}</span>
                    <span className="my-score-label">score</span>
                  </div>
                  <div className="my-card-meta">
                    <div>📅 {formatDate(d.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
