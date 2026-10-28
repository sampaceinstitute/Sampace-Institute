import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function AdminExamViewPage({ id, onNavigate }) {
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('exams').select('*').eq('id', id).single()
      setExam(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>
  if (!exam) return <main className="admin-apps-page"><p>Exam not found.</p></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('adminExams')}>← Back to Exams</button>
      
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Exam Details</div>
        <h1 className="page-title">{exam.title}</h1>
        <p className="page-subtitle">{exam.course_id} · {exam.exam_type?.toUpperCase()}</p>
      </div>

      <div className="admin-recent-grid">
        <div className="app-detail-section">
          <h3 className="app-detail-section-title">Schedule & Settings</h3>
          <div className="app-detail-rows">
            <div className="app-detail-row"><span>Status</span><strong>{exam.status.toUpperCase()}</strong></div>
            <div className="app-detail-row"><span>Duration</span><strong>{exam.duration_minutes} Minutes</strong></div>
            <div className="app-detail-row"><span>Start Time</span><strong>{exam.start_time ? new Date(exam.start_time).toLocaleString() : 'Not set'}</strong></div>
            <div className="app-detail-row"><span>End Time</span><strong>{exam.end_time ? new Date(exam.end_time).toLocaleString() : 'Not set'}</strong></div>
            <div className="app-detail-row"><span>Require Desktop</span><strong>{exam.desktop_only ? 'YES (Mobile Blocked)' : 'NO (Mobile Allowed)'}</strong></div>
          </div>
        </div>

        <div className="app-detail-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: 'var(--text-soft)', textAlign: 'center' }}>Need to change the questions or the schedule?</p>
          <button className="btn btn-primary" onClick={() => onNavigate({ route: 'adminExamEditor', id: exam.id })}>
            ✏️ Edit This Exam
          </button>
        </div>
      </div>
    </main>
  )
}
