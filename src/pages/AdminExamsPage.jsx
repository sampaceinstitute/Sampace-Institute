import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { ALL_DIVISIONS } from '../constants.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminExamsPage({ onNavigate }) {
  const { user } = useAuth()
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  
  const [form, setForm] = useState({ 
    title: '', description: '', duration_minutes: 60,
    schoolId: '', departmentId: '', courseId: '', examType: 'exam'
  })

  const selectedSchool = ALL_DIVISIONS.find(d => d.id === form.schoolId)
  const departments = selectedSchool?.departments || []
  const selectedDept = departments.find(d => d.id === form.departmentId)
  const courses = selectedDept?.courses || []

  const loadExams = async () => {
    const { data } = await supabase.from('exams').select('*').order('created_at', { ascending: false })
    setExams(data || [])
    setLoading(false)
  }

  useEffect(() => { loadExams() }, [])

  const handleCreateExam = async (e) => {
    e.preventDefault()
    if (!form.courseId) return alert("Please select a course.")
    setCreating(true)

    const { data, error } = await supabase
      .from('exams')
      .insert({
        title: form.title,
        description: form.description,
        duration_minutes: parseInt(form.duration_minutes),
        school_id: form.schoolId,
        department_id: form.departmentId,
        course_id: form.courseId,
        exam_type: form.examType,
        created_by: user.id,
        status: 'draft'
      }).select().single()

    if (!error && data) {
      onNavigate({ route: 'adminExamEditor', id: data.id })
    } else {
      alert('Error: ' + error.message)
    }
    setCreating(false)
  }

  const handleDeleteExam = async (id, title) => {
    if (!window.confirm(`Delete "${title}" permanently? All student submissions will be lost.`)) return
    await supabase.from('exams').delete().eq('id', id)
    loadExams()
  }

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Admin · CBT</div>
        <h1 className="page-title">Exam Manager</h1>
        <p className="page-subtitle">Create, link, and manage tests.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-form-container">
          <form className="auth-form" onSubmit={handleCreateExam}>
            <h3 className="apply-step-title">Create New Exam</h3>
            
            <label className="form-field"><span>School / Division *</span>
              <select required value={form.schoolId} onChange={e => setForm({...form, schoolId: e.target.value, departmentId: '', courseId: ''})}>
                <option value="">Select School</option>
                {ALL_DIVISIONS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </label>

            <label className="form-field"><span>Department *</span>
              <select required disabled={!form.schoolId} value={form.departmentId} onChange={e => setForm({...form, departmentId: e.target.value, courseId: ''})}>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </label>

            <label className="form-field"><span>Course *</span>
              <select required disabled={!form.departmentId} value={form.courseId} onChange={e => setForm({...form, courseId: e.target.value})}>
                <option value="">Select Course</option>
                {courses.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </label>

            <label className="form-field"><span>Assessment Type *</span>
              <select required value={form.examType} onChange={e => setForm({...form, examType: e.target.value})}>
                <option value="exam">Final Exam</option>
                <option value="test">Test</option>
                <option value="midterm">Mid-Term Test</option>
                <option value="assignment">Assignment</option>
                <option value="classwork">Classwork</option>
                <option value="project">Project</option>
              </select>
            </label>

            <label className="form-field"><span>Exam Title *</span>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Mid-Term Test" />
            </label>

            <label className="form-field"><span>Duration (Minutes) *</span>
              <input type="number" required value={form.duration_minutes} onChange={e => setForm({...form, duration_minutes: e.target.value})} />
            </label>

            <LoadingButton type="submit" loading={creating}>Create & Add Questions →</LoadingButton>
          </form>
        </div>

        <div className="admin-users-list-panel">
          <h3 className="panel-title">Your Exams</h3>
          {loading ? <div className="loading-state"><div className="loading-spinner" /></div> : exams.length === 0 ? (
            <p className="analytics-empty-text">No exams created yet.</p>
          ) : (
            <div className="admin-users-scroll">
              {exams.map(ex => (
                <div key={ex.id} className="admin-user-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <div className="admin-user-row-avatar">📝</div>
                    <div className="admin-user-row-info">
                      <div className="admin-user-row-name">{ex.title}</div>
                      <div className="admin-user-row-email">{ex.exam_type?.toUpperCase()} · {ex.status.toUpperCase()}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => onNavigate({ route: 'adminExamView', id: ex.id })} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', color: '#fff', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}>👁️ View</button>
                    <button onClick={() => handleDeleteExam(ex.id, ex.title)} style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid #f87171', color: '#f87171', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
