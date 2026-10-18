import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminGradingPage({ onNavigate }) {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadAttempts = async () => {
    const { data } = await supabase
      .from('exam_attempts')
      .select(`
        id, score, completed_at, status,
        exams (title, total_marks),
        profiles:user_id (full_name, email)
      `)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
    
    setAttempts(data || [])
    setLoading(false)
  }

  useEffect(() => { loadAttempts() }, [])

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Admin · Grading</div>
        <h1 className="page-title">Exam Submissions</h1>
        <p className="page-subtitle">Review student results and grade theory questions.</p>
      </div>

      {loading ? (
        <div className="loading-state"><div className="loading-spinner" /></div>
      ) : attempts.length === 0 ? (
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">📝</div>
          <p>No exam submissions yet.</p>
        </div>
      ) : (
        <div className="my-list">
          {attempts.map(att => (
            <div key={att.id} className="my-card">
              <div className="my-card-header">
                <div className="my-card-reference">{att.profiles?.full_name || 'Student'}</div>
                <div className="my-card-status" style={{ borderColor: '#4ade80', color: '#4ade80' }}>
                  SCORE: {att.score} / {att.exams?.total_marks || '—'}
                </div>
              </div>
              <h3 className="my-card-title">{att.exams?.title}</h3>
              <div className="my-card-meta">
                <div>✉️ {att.profiles?.email}</div>
                <div>📅 {new Date(att.completed_at).toLocaleString('en-GB')}</div>
              </div>
              <button 
                className="btn btn-outline" 
                style={{ marginTop: '1rem', width: '100%' }}
                onClick={() => onNavigate({ route: 'adminGradingDetail', id: att.id })}
              >
                Review Answers →
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
