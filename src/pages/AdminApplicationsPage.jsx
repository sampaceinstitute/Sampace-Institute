import React, { useEffect, useState } from 'react'
import { getAllApplications, updateApplicationStatus } from '../lib/applicationService.js'

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'under_review', label: 'Under Review' },
  { id: 'approved', label: 'Approved' },
  { id: 'unsuccessful', label: 'Unsuccessful' },
  { id: 'enrolled', label: 'Enrolled' }
]

const STATUS_COLORS = {
  draft: '#a1a1aa',
  submitted: '#E5C158',
  under_review: '#22d3ee',
  approved: '#4ade80',
  offer_issued: '#a78bfa',
  enrolled: '#4ade80',
  unsuccessful: '#f87171',
  withdrawn: '#a1a1aa'
}

export default function AdminApplicationsPage({ onNavigate }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [updating, setUpdating] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await getAllApplications({ limit: 200 })
    setApplications(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = filter === 'all'
    ? applications
    : applications.filter((a) => a.status === filter)

  const handleStatusChange = async (newStatus) => {
    if (!selected) return
    setUpdating(true)
    const { data, error } = await updateApplicationStatus({
      id: selected.id,
      status: newStatus,
      notes: ''
    })
    if (!error && data) {
      setSelected(data)
      setApplications((prev) => prev.map((a) => (a.id === data.id ? data : a)))
    }
    setUpdating(false)
  }

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Admin · Applications
        </div>
        <h1 className="page-title">Application Review</h1>
        <p className="page-subtitle">
          Review, filter, and process student applications.
        </p>
      </div>

      <div className="admin-apps-filters">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.id}
            className={`admin-apps-filter ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            {f.id === 'all' && ` (${applications.length})`}
          </button>
        ))}
        <button className="admin-apps-refresh" onClick={load}>🔄 Refresh</button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading applications...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📭</div>
          <p>No applications match this filter.</p>
        </div>
      ) : (
        <div className="admin-apps-list">
          {filtered.map((app) => (
            <button
              key={app.id}
              className={`admin-app-card ${selected?.id === app.id ? 'active' : ''}`}
              onClick={() => setSelected(app)}
            >
              <div className="admin-app-card-top">
                <div className="admin-app-ref">{app.reference}</div>
                <div
                  className="admin-app-status"
                  style={{ color: STATUS_COLORS[app.status] || '#E5C158', borderColor: STATUS_COLORS[app.status] || '#E5C158' }}
                >
                  {app.status?.replace(/_/g, ' ').toUpperCase()}
                </div>
              </div>
              <div className="admin-app-name">{app.applicant_name || 'Unnamed'}</div>
              <div className="admin-app-course">{app.course_title || app.programme || '—'}</div>
              <div className="admin-app-meta">
                <span>{app.school_name || '—'}</span>
                <span>·</span>
                <span>{formatDate(app.created_at)}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="admin-app-detail-overlay" onClick={() => setSelected(null)}>
          <div className="admin-app-detail" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>

            <div className="admin-app-detail-header">
              <div className="admin-app-ref">{selected.reference}</div>
              <div
                className="admin-app-status"
                style={{ color: STATUS_COLORS[selected.status], borderColor: STATUS_COLORS[selected.status] }}
              >
                {selected.status?.replace(/_/g, ' ').toUpperCase()}
              </div>
            </div>

            <h2 className="admin-app-detail-title">{selected.course_title || selected.programme || 'Application'}</h2>

            <div className="admin-app-detail-section">
              <h4>Applicant</h4>
              <div className="admin-app-detail-row"><span>Name:</span><strong>{selected.applicant_name}</strong></div>
              <div className="admin-app-detail-row"><span>Email:</span><strong>{selected.applicant_email || '—'}</strong></div>
              <div className="admin-app-detail-row"><span>Phone:</span><strong>{selected.phone || '—'}</strong></div>
              <div className="admin-app-detail-row"><span>Gender:</span><strong>{selected.gender || '—'}</strong></div>
            </div>

            <div className="admin-app-detail-section">
              <h4>Programme</h4>
              <div className="admin-app-detail-row"><span>School:</span><strong>{selected.school_name || '—'}</strong></div>
              <div className="admin-app-detail-row"><span>Form Type:</span><strong>{selected.form_type || '—'}</strong></div>
              {selected.level && <div className="admin-app-detail-row"><span>Level:</span><strong>{selected.level}</strong></div>}
              {selected.class_level && <div className="admin-app-detail-row"><span>Class:</span><strong>{selected.class_level}</strong></div>}
              {selected.stream && <div className="admin-app-detail-row"><span>Stream:</span><strong>{selected.stream}</strong></div>}
              {selected.service_type && <div className="admin-app-detail-row"><span>Service:</span><strong>{selected.service_type}</strong></div>}
              {selected.department_name && <div className="admin-app-detail-row"><span>Department:</span><strong>{selected.department_name}</strong></div>}
              <div className="admin-app-detail-row"><span>Mode:</span><strong>{selected.preferred_mode || selected.contact_method || '—'}</strong></div>
            </div>

            {selected.motivation && (
              <div className="admin-app-detail-section">
                <h4>Motivation</h4>
                <p className="admin-app-motivation">{selected.motivation}</p>
              </div>
            )}

            <div className="admin-app-detail-section">
              <h4>Submitted</h4>
              <div className="admin-app-detail-row"><span>Date:</span><strong>{formatDate(selected.submitted_at || selected.created_at)}</strong></div>
            </div>

            <div className="admin-app-detail-actions">
              <h4>Update Status</h4>
              <div className="admin-app-status-buttons">
                <button
                  className="admin-app-status-btn approve"
                  onClick={() => handleStatusChange('approved')}
                  disabled={updating || selected.status === 'approved'}
                >
                  ✅ Approve
                </button>
                <button
                  className="admin-app-status-btn review"
                  onClick={() => handleStatusChange('under_review')}
                  disabled={updating || selected.status === 'under_review'}
                >
                  🔎 Under Review
                </button>
                <button
                  className="admin-app-status-btn reject"
                  onClick={() => handleStatusChange('unsuccessful')}
                  disabled={updating || selected.status === 'unsuccessful'}
                >
                  ❌ Unsuccessful
                </button>
                <button
                  className="admin-app-status-btn enrolled"
                  onClick={() => handleStatusChange('enrolled')}
                  disabled={updating || selected.status === 'enrolled'}
                >
                  🎓 Enrolled
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
