import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getApplicationById, updateApplicationStatus } from '../lib/dataService.js'

const STATUSES = [
  { value: 'under_review', label: '🔍 Under Review' },
  { value: 'action_required', label: '⚡ Action Required' },
  { value: 'approved', label: '✅ Approved' },
  { value: 'waitlisted', label: '⏳ Waitlisted' },
  { value: 'unsuccessful', label: '❌ Unsuccessful' },
  { value: 'enrolled', label: '🎓 Enrolled' }
]

export default function AdminApplicationDetailPage({ id, onNavigate }) {
  const { user } = useAuth()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [notes, setNotes] = useState('')
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await getApplicationById(id)
      setApplication(res.data)
      if (res.data) {
        setNewStatus(res.data.status)
        setNotes(res.data.decision_notes || '')
      }
      setLoading(false)
    }
    load()
  }, [id])

  const handleSave = async () => {
    if (!newStatus) return
    setSaving(true)
    setSaveMsg('')

    const res = await updateApplicationStatus(id, newStatus, user?.id, notes)
    if (res.error) {
      setSaveMsg('Error: ' + (res.error.message || 'Could not save'))
    } else {
      setApplication(res.data)
      setSaveMsg('✓ Saved')
      setTimeout(() => setSaveMsg(''), 3000)
    }
    setSaving(false)
  }

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <main className="admin-apps-page">
        <div className="loading-state"><div className="loading-spinner" /><p>Loading...</p></div>
      </main>
    )
  }

  if (!application) {
    return (
      <main className="admin-apps-page">
        <div className="dashboard-empty">
          <p>Application not found.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('adminApplications')}>
            Back to Applications
          </button>
        </div>
      </main>
    )
  }

  const a = application

  return (
    <main className="admin-app-detail-page">
      <button className="back-button" onClick={() => onNavigate('adminApplications')}>
        ← Back to Applications
      </button>

      <div className="app-detail-header">
        <div className="app-detail-ref">{a.reference}</div>
        <h1 className="app-detail-title">{a.applicant_name || 'Unnamed Applicant'}</h1>
        <p className="app-detail-subtitle">{a.school_name || '—'}</p>
      </div>

      <div className="app-detail-grid">
        <div className="app-detail-section">
          <h3 className="app-detail-section-title">Applicant</h3>
          <div className="app-detail-rows">
            <div className="app-detail-row"><span>Name</span><strong>{a.applicant_name || '—'}</strong></div>
            <div className="app-detail-row"><span>Email</span><strong>{a.email || '—'}</strong></div>
            <div className="app-detail-row"><span>Phone</span><strong>{a.phone || '—'}</strong></div>
            <div className="app-detail-row"><span>Gender</span><strong>{a.gender || '—'}</strong></div>
          </div>
        </div>

        <div className="app-detail-section">
          <h3 className="app-detail-section-title">Programme Applied For</h3>
          <div className="app-detail-rows">
            <div className="app-detail-row"><span>School</span><strong>{a.school_name || '—'}</strong></div>
            {a.form_type === 'school-admission' && (
              <>
                <div className="app-detail-row"><span>Level</span><strong>{a.level || '—'}</strong></div>
                <div className="app-detail-row"><span>Class</span><strong>{a.class_level || '—'}</strong></div>
                <div className="app-detail-row"><span>Stream</span><strong>{a.stream || '—'}</strong></div>
              </>
            )}
            {a.department_name && (
              <div className="app-detail-row"><span>Department</span><strong>{a.department_name}</strong></div>
            )}
            {(a.course_title || a.course) && (
              <div className="app-detail-row"><span>Course</span><strong>{a.course_title || a.course}</strong></div>
            )}
            {(a.service_label || a.service_type) && (
              <div className="app-detail-row"><span>Service</span><strong>{a.service_label || a.service_type}</strong></div>
            )}
            <div className="app-detail-row"><span>Mode</span><strong>{a.preferred_mode || '—'}</strong></div>
          </div>
        </div>

        {(a.qualification || a.school_attended || a.graduation_year) && (
          <div className="app-detail-section">
            <h3 className="app-detail-section-title">Academic Background</h3>
            <div className="app-detail-rows">
              <div className="app-detail-row"><span>Qualification</span><strong>{a.qualification || '—'}</strong></div>
              <div className="app-detail-row"><span>School Attended</span><strong>{a.school_attended || '—'}</strong></div>
              <div className="app-detail-row"><span>Grad Year</span><strong>{a.graduation_year || '—'}</strong></div>
              {a.additional_answer && (
                <div className="app-detail-row"><span>Extra Info</span><strong>{a.additional_answer}</strong></div>
              )}
            </div>
          </div>
        )}

        {a.motivation && (
          <div className="app-detail-section">
            <h3 className="app-detail-section-title">Applicant's Note</h3>
            <p className="app-detail-motivation">"{a.motivation}"</p>
          </div>
        )}

        <div className="app-detail-section">
          <h3 className="app-detail-section-title">Timeline</h3>
          <div className="app-detail-rows">
            <div className="app-detail-row"><span>Submitted</span><strong>{formatDate(a.submitted_at || a.created_at)}</strong></div>
            <div className="app-detail-row"><span>Current Status</span><strong>{a.status}</strong></div>
            {a.reviewed_at && (
              <div className="app-detail-row"><span>Last Reviewed</span><strong>{formatDate(a.reviewed_at)}</strong></div>
            )}
          </div>
        </div>

        <div className="app-detail-section app-detail-actions">
          <h3 className="app-detail-section-title">Review This Application</h3>

          <label className="form-field">
            <span>Change Status</span>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="submitted">📥 Submitted</option>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Internal Notes</span>
            <textarea
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note about your decision..."
            />
          </label>

          {saveMsg && (
            <div className={saveMsg.startsWith('✓') ? 'auth-success-banner' : 'auth-error'}>
              {saveMsg}
            </div>
          )}

          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Decision →'}
          </button>

          <div className="app-detail-quick-actions">
            <a
              href={`https://wa.me/${(a.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${a.applicant_name || 'there'}, this is SAMPACE Educational Ltd regarding your application ${a.reference}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              💬 WhatsApp Applicant
            </a>
            {a.email && (
              <a
                href={`mailto:${a.email}?subject=${encodeURIComponent(`Regarding your SAMPACE application ${a.reference}`)}`}
                className="btn btn-outline"
              >
                ✉️ Email Applicant
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
