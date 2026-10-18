import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function StudentExamsPage({ onNavigate }) {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('exams')
        .select('*, questions(count)')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      
      setExams(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Student · CBT</div>
        <h1 className="page-title">Available Exams</h1>
        <p className="page-subtitle">Take your tests and track your progress.</p>
      </div>

      <div className="my-list">
        {exams.length === 0 ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">📝</div>
            <p>No published exams available yet.</p>
          </div>
        ) : (
          exams.map(exam => (
            <div key={exam.id} className="my-card">
              <div className="my-card-header">
                <div className="my-card-reference">{exam.course_id || 'General Exam'}</div>
                <div className="my-card-status" style={{ borderColor: '#4ade80', color: '#4ade80' }}>
                  {exam.duration_minutes} MINS
                </div>
              </div>
              <h3 className="my-card-title">{exam.title}</h3>
              <div className="my-card-meta">
                <div>📝 {exam.questions[0]?.count || 0} Questions</div>
                <div>💯 Total Marks: {exam.total_marks || '—'}</div>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '1rem', width: '100%' }}
                onClick={() => onNavigate({ route: 'studentExamTaking', id: exam.id })}
              >
                Start Exam →
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
