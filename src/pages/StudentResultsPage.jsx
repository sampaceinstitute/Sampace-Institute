import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function StudentResultsPage({ onNavigate }) {
  const { user } = useAuth()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('exam_attempts')
        .select(`
          id, score, completed_at,
          exams (title, total_marks)
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
      
      setResults(data || [])
      setLoading(false)
    }
    load()
  }, [user.id])

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Student · Results</div>
        <h1 className="page-title">My Exam History</h1>
        <p className="page-subtitle">Track your past test scores and pending grades.</p>
      </div>

      <div className="my-list">
        {results.length === 0 ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">📊</div>
            <p>You haven't taken any exams yet.</p>
            <button className="btn btn-primary" onClick={() => onNavigate('studentExams')}>
              Take an Exam →
            </button>
          </div>
        ) : (
          results.map(res => (
            <div 
              key={res.id} 
              className="my-card" 
              onClick={() => onNavigate({ route: 'studentResultDetail', id: res.id })} 
              style={{ cursor: 'pointer' }}
            >
              <div className="my-card-header">
                <div className="my-card-reference">
                  {new Date(res.completed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="my-card-status" style={{ borderColor: '#4ade80', color: '#4ade80' }}>
                  SCORE: {res.score} / {res.exams?.total_marks || '—'}
                </div>
              </div>
              <span className="badge" style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
  {res.exams?.exam_type?.toUpperCase() || 'EXAM'}
</span>
              <h3 className="my-card-title">{res.exams?.title}</h3>
              
              {res.score === 0 && (
                <p style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginTop: '0.5rem' }}>
                  ⚠️ Some theory questions may still be pending manual review by your instructor.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  )
}
