import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getUserApplications, getUserDiagnostics } from '../lib/dataService.js'

export default function MyApplicationsPage({ onNavigate }) {
  const { user } = useAuth()
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
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const statusColor = (status) => {
    const map = {
      draft: '#a1a1aa', submitted: '#E5C158', under_review: '#22d3ee',
      approved: '#4ade80', unsuccessful: '#f87171', withdrawn: '#a1a1aa', enrolled: '#4ade80',
      waitlisted: '#a78bfa', action_required: '#fb923c'
    }
    return map[status] || '#E5C158'
  }

  // NEW: Human-readable status messages
  const getStatusMessage = (status) => {
    switch (status) {
      case 'submitted': return '📥 We have received your application and it is in the queue.'
      case 'under_review': return '🔍 Our admissions team is currently reviewing your application.'
      case 'action_required': return '⚡ We need more information from you. Please check your email or WhatsApp.'
      case 'approved': return '✅ Congratulations! Your application has been approved. Please check your email for next steps (payment, etc).'
      case 'waitlisted': return '⏳ You have been placed on the waitlist. We will contact you if a space becomes available.'
      case 'enrolled': return '🎓 Congratulations! You are officially enrolled. Welcome to SAMPACE!'
      case 'unsuccessful': return '❌ Unfortunately, we cannot offer you a place at this time. Please check your email for feedback.'
      default: return 'We are processing your application.'
    }
  }

  const formTypeBadge = (type) => {
    const map = {
      'school-admission': { label: '🎓 School Admission', color: '#7c3aed' },
      'exam-prep': { label: '📝 Exam Prep', color: '#0891b2' },
      'service-request': { label: '🛠️ Service Request', color: '#b45309' },
      'consulting-request': { label: '🏛️ Consulting', color: '#4338ca' },
      'research-request': { label: '🔬 Research', color: '#7e22ce' },
      'training': { label: '💻 Training', color: '#1e40af' },
      'higher-ed': { label: '🎓 Higher Ed', color: '#1e3a8a' },
      'generic': { label: '📋 Application', color: '#666' }
    }
    return map[type] || map.generic
  }

  const renderProgrammeSummary = (a) => {
    if (a.form_type === 'school-admission') {
      const items = []
      if (a.level) items.push(a.level)
      if (a.class_level) items.push(a.class_level)
      if (a.stream) items.push(a.stream)
      return items.join(' · ')
    }
    if (a.form_type === 'service-request' || a.form_type === 'consulting-request' || a.form_type === 'research-request') {
      return a.service_label || a.service_type || '—'
    }
    if (a.course_title || a.course) {
      return `${a.department_name || ''}${a.department_name ? ' · ' : ''}${a.course_title || a.course}`
    }
    return a.programme || '—'
  }

  return (
    <main className="my-applications-page">
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />My Account</div>
        <h1 className="page-title">My Activity</h1>
        <p className="page-subtitle">Track your applications, enrollments, and diagnostic results.</p>
      </div>

      <div className="my-tabs">
        <button className={`my-tab ${tab === 'applications' ? 'active' : ''}`} onClick={() => setTab('applications')}>
          📝 Applications ({applications.length})
        </button>
        <button className={`my-tab ${tab === 'diagnostics' ? 'active' : ''}`} onClick={() => setTab('diagnostics')}>
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
              <button className="btn btn-primary" onClick={() => onNavigate('courses')}>Browse Courses →</button>
            </div>
          ) : (
            <div className="my-list">
              {applications.map((a) => {
                const badge = formTypeBadge(a.form_type)
                const isActionable = ['action_required', 'approved'].includes(a.status)
                
                return (
                  <div key={a.id} className={`my-card ${isActionable ? 'action-needed' : ''}`}>
                    <div className="my-card-header">
                      <div className="my-card-reference">{a.reference}</div>
                      <div className="my-card-status" style={{ color: statusColor(a.status), borderColor: statusColor(a.status) }}>
                        {a.status?.replace(/_/g, ' ').toUpperCase()}
                      </div>
                    </div>

                    <div className="my-form-type-badge" style={{ borderColor: badge.color, color: badge.color }}>
                      {badge.label}
                    </div>

                    <h3 className="my-card-title">{a.school_name || a.programme || 'Application'}</h3>

                    <div className="my-card-summary">
                      {renderProgrammeSummary(a)}
                    </div>

                    {/* NEW: Clear status message for the student */}
                    <div className="my-status-message" style={{ borderLeftColor: statusColor(a.status) }}>
                      {getStatusMessage(a.status)}
                    </div>

                    <div className="my-card-meta" style={{ marginTop: '1rem' }}>
                      <div>📅 Submitted {formatDate(a.submitted_at || a.created_at)}</div>
                    </div>
                  </div>
                )
              })}
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
              <button className="btn btn-primary" onClick={() => onNavigate('home')}>Take Free Test →</button>
            </div>
          ) : (
            <div className="my-list">
              {diagnostics.map((d) => (
                <div key={d.id} className="my-card">
                  <div className="my-card-header">
                    <div className="my-card-reference">{d.exam_type}</div>
                    <div className="my-card-status" style={{
                      color: d.readiness_level === 'Excellent' ? '#4ade80' : d.readiness_level === 'Good' ? '#E5C158' : d.readiness_level === 'Fair' ? '#fb923c' : '#f87171',
                      borderColor: d.readiness_level === 'Excellent' ? '#4ade80' : d.readiness_level === 'Good' ? '#E5C158' : d.readiness_level === 'Fair' ? '#fb923c' : '#f87171'
                    }}>
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
