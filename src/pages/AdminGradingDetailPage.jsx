import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminGradingDetailPage({ id, onNavigate }) {
  const [attempt, setAttempt] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)

  // Track manual marks input
  const [manualMarks, setManualMarks] = useState({})

  const loadData = async () => {
    const { data: att } = await supabase
      .from('exam_attempts')
      .select('*, exams(title), profiles(full_name)')
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

  useEffect(() => { loadData() }, [id])

  const handleGrade = async (answerId, questionId, isCorrect, marks) => {
    setSavingId(answerId)

    // 1. Update the answer record in the database
    await supabase
      .from('exam_answers')
      .update({ is_correct: isCorrect })
      .eq('id', answerId)

    // 2. Add the new marks to the total score
    const currentScore = attempt.score || 0
    const newScore = isCorrect ? currentScore + marks : currentScore

    await supabase
      .from('exam_attempts')
      .update({ score: newScore })
      .eq('id', id)

    // 3. Update the LOCAL state so the buttons disappear immediately
    setAnswers(prevAnswers => 
      prevAnswers.map(ans => 
        ans.id === answerId ? { ...ans, is_correct: isCorrect } : ans
      )
    )
    
    // 4. Update the local attempt score
    setAttempt({ ...attempt, score: newScore })
    setSavingId(null)
  }
  
  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('adminGrading')}>← Back to Submissions</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Grading</div>
        <h1 className="page-title">{attempt?.profiles?.full_name}</h1>
        <p className="page-subtitle">{attempt?.exams?.title} · Current Score: {attempt?.score}</p>
      </div>

      <div className="my-list">
        {answers.map((ans, i) => {
          const q = ans.questions
          const isTheory = q.type === 'theory'

          return (
            <div key={ans.id} className="my-card" style={{ borderLeft: isTheory ? '4px solid var(--gold)' : 'none' }}>
              <div className="my-card-reference">Question {i + 1} · {q.type.toUpperCase()} · {q.marks} mark(s)</div>
              <h4 style={{ margin: '0.5rem 0', color: '#fff' }}>{q.question_text}</h4>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                <strong>Student's Answer:</strong>
                <p style={{ color: 'var(--gold-light)', marginTop: '0.5rem' }}>{ans.answer_text || '(Blank)'}</p>
              </div>

              {/* Show correct answer only for auto-graded questions */}
              {!isTheory && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: ans.is_correct ? '#4ade80' : '#f87171' }}>
                  {ans.is_correct ? '✓ Auto-graded: Correct' : `✗ Auto-graded: Incorrect (Correct: ${q.correct_answer})`}
                </p>
              )}

              {/* Theory Grading Interface */}
              {isTheory && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>
                    <strong>Grading Guide:</strong> {q.correct_answer}
                  </p>
                  
                  {ans.is_correct === null ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <LoadingButton 
                        className="btn btn-primary" 
                        loading={savingId === ans.id}
                        onClick={() => handleGrade(ans.id, q.id, true, q.marks)}
                      >
                        Give {q.marks} Mark(s) & Save
                      </LoadingButton>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => handleGrade(ans.id, q.id, false, q.marks)}
                        disabled={savingId === ans.id}
                      >
                        Score 0
                      </button>
                    </div>
                  ) : (
                    <p style={{ color: '#4ade80', fontWeight: 700 }}>
                      Graded: {ans.is_correct ? `Awarded ${q.marks} marks` : 'Score 0'}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
