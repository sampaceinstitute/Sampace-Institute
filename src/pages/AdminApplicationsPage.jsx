import React, { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getAllApplications } from '../lib/dataService.js'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'submitted', label: '📥 Submitted' },
  { value: 'under_review', label: '🔍 Under Review' },
  { value: 'action_required', label: '⚡ Action Required' },
  { value: 'approved', label: '✅ Approved' },
  { value: 'waitlisted', label: '⏳ Waitlisted' },
  { value: 'unsuccessful', label: '❌ Unsuccessful' },
  { value: 'enrolled', label: '🎓 Enrolled' }
]

const FORM_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'school-admission', label: '🎓 School Admission' },
  { value: 'exam-prep', label: '📝 Exam Prep' },
  { value: 'training', label: '💻 Training' },
  { value: 'service-request', label: '🛠️ Service Request' },
  { value: 'higher-ed', label: '🎓 Higher Ed' }
]

const statusColor = (status) => {
  const map = {
    submitted: '#E5C158',
    under_review: '#22d3ee',
    action_required: '#fb923c',
    approved: '#4ade80',
    waitlisted: '#a78bfa',
    unsuccessful: '#f87171',
    enrolled: '#22d3ee',
    draft: '#a1a1aa',
    withdrawn: '#a1a1aa'
  }
  return map[status] || '#E5C158'
}

export default function AdminApplicationsPage({ onNavigate }) {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await getAllApplications({})
      setApplications(res.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return applications.filter((a) => {
      if (filterStatus !== 'all' && a.status !== filterStatus) return false
      if (filterType !== 'all' && a.form_type !== filterType) return false
      if (q) {
        const hay = `${a.reference} ${a.applicant_name} ${a.email} ${a.phone} ${a.school_name} ${a.course_title || a.course}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [applications, filterStatus, filterType, search])

  const stats = useMemo(() => ({
    total: applications.length,
    submitted: applications.filter((a) => a.status === 'submitted').length,
    underReview: applications.filter((a) => a.status === 'under_review').length,
    approved: applications.filter((a) => a.status === 'approved').length
  }), [applications])

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
        <h1 className="page-title">Applications Review</h1>
        <p className="page-subtitle">
          View, filter, and process every application across the platform.
        </p>
      </div>

      {/* Stat chips */}
      <div className="admin-app-stats">
        <div className="admin-app-stat">
          <div className="admin-app-stat-num">{stats.total}</div>
          <div className="admin-app-stat-label">Total</div>
        </div>
        <div className="admin-app-stat">
          <div className="admin-app-stat-num" style={{ color: '#E5C158' }}>{stats.submitted}</div>
          <div className="admin-app-stat-label">Submitted</div>
        </div>
        <div className="admin-app-stat">
          <div className="admin-app-stat-num" style={{ color: '#22d3ee' }}>{stats.underReview}</div>
          <div className="admin-app-stat-label">Under Review</div>
        </div>
        <div className="admin-app-stat">
          <div className="admin-app-stat-num" style={{ color: '#4ade80' }}>{stats.approved}</div>
          <div className="admin-app-stat-label">Approved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-app-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search by reference, name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          {FORM_TYPE_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading applications...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📋</div>
          <p>No applications match your filters.</p>
        </div>
      ) : (
        <div className="admin-app-table">
          <div className="admin-app-table-head">
            <div>Reference</div>
            <div>Applicant</div>
            <div>Programme</div>
            <div>Status</div>
            <div>Date</div>
            <div></div>
          </div>
          {filtered.map((a) => (
            <div key={a.id} className="admin-app-row">
              <div className="admin-app-ref">{a.reference}</div>
              <div className="admin-app-applicant">
                <div className="admin-app-name">{a.applicant_name || '—'}</div>
                <div className="admin-app-contact">{a.phone || a.email}</div>
              </div>
              <div className="admin-app-programme">
                <div className="admin-app-school">{a.school_name || '—'}</div>
                <div className="admin-app-course">
                  {a.form_type === 'school-admission'
                    ? `${a.level || ''} · ${a.class_level || ''}${a.stream ? ' · ' + a.stream : ''}`
                    : (a.course_title || a.service_label || a.course || '—')}
                </div>
              </div>
              <div className="admin-app-status-cell">
                <span
                  className="my-card-status"
                  style={{ color: statusColor(a.status), borderColor: statusColor(a.status) }}
                >
                  {a.status?.replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>
              <div className="admin-app-date">{formatDate(a.submitted_at || a.created_at)}</div>
              <div>
                <button
                  className="btn-admin-view"
                  onClick={() => onNavigate({ route: 'adminApplicationDetail', id: a.id })}
                >
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
