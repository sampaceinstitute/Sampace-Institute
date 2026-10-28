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
        <p className="page-subtitle">Review the rules below before starting your test.</p>
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
              
              <div className="my-card-meta" style={{ marginBottom: '1rem' }}>
                <div>📝 {exam.questions[0]?.count || 0} Questions</div>
                {exam.start_time && <div>📅 Starts: {new Date(exam.start_time).toLocaleString()}</div>}
                {exam.end_time && <div>⏳ Ends: {new Date(exam.end_time).toLocaleString()}</div>}
              </div>

              <div style={{ background: 'rgba(201, 162, 39, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--gold)', marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--gold-light)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>⚠️ EXAM RULES:</h4>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-soft)', paddingLeft: '1.25rem', lineHeight: '1.6' }}>
                  <li>Your webcam will be active. Snapshots are taken on tab switch.</li>
                  <li>Do not leave the exam tab. <strong>3 strikes = auto-submit.</strong></li>
                  <li>Your progress is saved automatically if you lose connection.</li>
                  {exam.desktop_only && <li style={{ color: '#f87171', fontWeight: 'bold' }}>This exam requires a Desktop/Laptop.</li>}
                </ul>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
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
