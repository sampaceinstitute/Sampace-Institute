import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminExamsPage({ onNavigate }) {
  const { user } = useAuth()
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  
  // New exam form state
  const [form, setForm] = useState({ title: '', description: '', duration_minutes: 60 })

  const loadExams = async () => {
    const { data } = await supabase.from('exams').select('*').order('created_at', { ascending: false })
    setExams(data || [])
    setLoading(false)
  }

  useEffect(() => { loadExams() }, [])

  const handleCreateExam = async (e) => {
    e.preventDefault()
    setCreating(true)

    const { data, error } = await supabase
      .from('exams')
      .insert({
        title: form.title,
        description: form.description,
        duration_minutes: parseInt(form.duration_minutes),
        created_by: user.id,
        status: 'draft'
      })
      .select()
      .single()

    if (!error && data) {
      // Redirect straight to the editor for this exam
      onNavigate({ route: 'adminExamEditor', id: data.id })
    } else {
      alert('Error creating exam: ' + error.message)
    }
    setCreating(false)
  }

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Admin · CBT</div>
        <h1 className="page-title">Exam Manager</h1>
        <p className="page-subtitle">Create and manage tests for your students.</p>
      </div>

      <div className="contact-layout">
        {/* Create Exam Form */}
        <div className="contact-form-container">
          <form className="auth-form" onSubmit={handleCreateExam}>
            <h3 className="apply-step-title">Create New Exam</h3>
            <label className="form-field">
              <span>Exam Title *</span>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. JAMB Physics Mock 1" />
            </label>
            <label className="form-field">
              <span>Duration (Minutes) *</span>
              <input type="number" required value={form.duration_minutes} onChange={e => setForm({...form, duration_minutes: e.target.value})} />
            </label>
            <label className="form-field">
              <span>Description</span>
              <textarea rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Optional instructions..." />
            </label>
            <LoadingButton type="submit" loading={creating}>Create & Add Questions →</LoadingButton>
          </form>
        </div>

        {/* List of Exams */}
        <div className="admin-users-list-panel">
          <h3 className="panel-title">Your Exams</h3>
          {loading ? (
             <div className="loading-state"><div className="loading-spinner" /></div>
          ) : exams.length === 0 ? (
            <p className="analytics-empty-text">No exams created yet.</p>
          ) : (
            <div className="admin-users-scroll">
              {exams.map(ex => (
                <button key={ex.id} className="admin-user-row" onClick={() => onNavigate({ route: 'adminExamEditor', id: ex.id })}>
                  <div className="admin-user-row-avatar">📝</div>
                  <div className="admin-user-row-info">
                    <div className="admin-user-row-name">{ex.title}</div>
                    <div className="admin-user-row-email">{ex.duration_minutes} mins · {ex.status.toUpperCase()}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
