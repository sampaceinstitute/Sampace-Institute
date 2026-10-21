import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function StudentResultDetailPage({ id, onNavigate }) {
  const [attempt, setAttempt] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: att } = await supabase
        .from('exam_attempts')
        .select('*, exams(title, total_marks)')
        .eq('id', id)
        .single()

      const { data: ans } = await supabase
        .from('exam_answers')
        .select('*, questions(*)')
        .eq('attempt_id', id)

      setAttempt(att)
      setAnswers(ans || [])
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('studentResults')}>← Back to Results</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Result Breakdown</div>
        <span className="badge" style={{ fontSize: '0.7rem', background: 'var(--gold)', color: 'var(--navy)', marginBottom: '0.5rem' }}>
  {attempt?.exams?.exam_type?.toUpperCase() || 'EXAM'}
</span>
        <h1 className="page-title">{attempt?.exams?.title}</h1>
        <p className="page-subtitle">
          Final Score: <strong style={{ color: 'var(--gold-light)', fontSize: '1.2rem' }}>{attempt?.score} / {attempt?.exams?.total_marks}</strong>
        </p>
      </div>

      <div className="my-list">
        {answers.map((ans, i) => {
          const q = ans.questions
          const isPending = q.type === 'theory' && ans.is_correct === null

          return (
            <div key={ans.id} className="my-card" style={{ borderLeft: `4px solid ${ans.is_correct === true ? '#4ade80' : ans.is_correct === false ? '#f87171' : '#E5C158'}` }}>
              <div className="my-card-reference">Question {i + 1} · {q.type.toUpperCase()} · {q.marks} mark(s)</div>
              <h4 style={{ margin: '0.5rem 0', color: '#fff' }}>{q.question_text}</h4>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                <strong>Your Answer:</strong>
                <p style={{ color: 'var(--gold-light)', marginTop: '0.5rem' }}>{ans.answer_text || '(Blank)'}</p>
              </div>

              {/* Show Correct Answer for MCQ/Gap */}
              {!isPending && q.type !== 'theory' && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <strong>Correct Answer:</strong> <span style={{ color: '#4ade80' }}>{q.correct_answer}</span>
                </div>
              )}

              {/* Status Badge */}
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                {ans.is_correct === true && <span style={{ color: '#4ade80', fontWeight: 'bold' }}>✓ Correct (+{q.marks})</span>}
                {ans.is_correct === false && <span style={{ color: '#f87171', fontWeight: 'bold' }}>✗ Incorrect (0)</span>}
                {isPending && <span style={{ color: '#E5C158', fontWeight: 'bold' }}>⏳ Pending Teacher Review</span>}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
