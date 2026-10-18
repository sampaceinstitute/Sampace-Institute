import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import LoadingButton from '../components/LoadingButton.jsx'

export default function StudentExamTakingPage({ id, onNavigate }) {
  const { user } = useAuth()
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Exam state
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionId: "answer text" }
  const [timeLeft, setTimeLeft] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null) // Stores score after submission

  useEffect(() => {
    const load = async () => {
      const { data: ex } = await supabase.from('exams').select('*').eq('id', id).single()
      const { data: qs } = await supabase.from('questions').select('*').eq('exam_id', id).order('created_at', { ascending: true })
      
      setExam(ex)
      setQuestions(qs || [])
      setTimeLeft(ex.duration_minutes * 60) // convert to seconds
      setLoading(false)
    }
    load()
  }, [id])

  // Countdown Timer
  useEffect(() => {
    if (timeLeft === null || result) return
    if (timeLeft <= 0) {
      handleSubmit(true) // Auto-submit when time runs out
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, result])

  const handleAnswer = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
  }

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit) {
      if (!window.confirm("Are you sure you want to submit your exam?")) return
    }

    setSubmitting(true)

    try {
      // 1. Generate ID and create Attempt Record
      const attemptId = crypto.randomUUID()
      
      const { error: attemptErr } = await supabase.from('exam_attempts').insert({
        id: attemptId,
        exam_id: id,
        user_id: user.id,
        status: 'completed',
        completed_at: new Date().toISOString(),
        score: 0 // Default
      })

      if (attemptErr) throw new Error("Attempt Error: " + attemptErr.message)

      // 2. Grade and Save Answers
      let autoScore = 0
      let pendingManualCount = 0
      let totalPossibleMarks = 0
      
      // THIS IS THE VARIABLE THAT WAS MISSING:
      const finalAnswers = [] 

      questions.forEach(q => {
        totalPossibleMarks += q.marks
        const studentAns = answers[q.id] || ''
        let isCorrect = null

        if (q.type === 'mcq' || q.type === 'gap') {
          isCorrect = studentAns.toLowerCase().trim() === (q.correct_answer || '').toLowerCase().trim()
          if (isCorrect) autoScore += q.marks
        } else {
          pendingManualCount++
        }

        finalAnswers.push({
          attempt_id: attemptId,
          question_id: q.id,
          answer_text: studentAns,
          is_correct: isCorrect
        })
      })

      // 3. Insert Answers
      const { error: ansErr } = await supabase.from('exam_answers').insert(finalAnswers)
      if (ansErr) throw new Error("Answers Error: " + ansErr.message)

      // 4. Update Attempt Score
      const { error: updateErr } = await supabase.from('exam_attempts').update({ score: autoScore }).eq('id', attemptId)
      if (updateErr) throw new Error("Update Score Error: " + updateErr.message)

      // 5. Show Result
      setResult({ 
        score: autoScore, 
        totalMarks: totalPossibleMarks,
        pending: pendingManualCount
      })

    } catch (err) {
      console.error("Submission Failed:", err)
      alert(err.message || "An error occurred while submitting.")
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  // RESULT SCREEN
  if (result) {
    return (
      <main className="apply-page">
        <div className="apply-success">
          <div className="success-icon">✓</div>
          <h1 className="page-title">Exam Completed!</h1>
          <p className="page-subtitle">Your auto-graded score:</p>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--gold-light)', margin: '1rem 0' }}>
            {result.score} / {result.totalMarks}
          </div>
          
          {result.pending > 0 && (
            <div className="auth-error" style={{ background: 'rgba(201, 162, 39, 0.1)', color: 'var(--gold-light)', borderColor: 'var(--gold)' }}>
              ⚠️ {result.pending} Theory question(s) are pending manual review by your instructor.
            </div>
          )}

          <button className="btn btn-primary" onClick={() => onNavigate('studentExams')} style={{ marginTop: '2rem' }}>
            Back to Exams
          </button>
        </div>
      </main>
    )
  }

  const q = questions[currentIdx]

  return (
    <main className="admin-apps-page">
      <div className="exam-header">
        <div>
          <h2 className="exam-title">{exam.title}</h2>
          <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem' }}>Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className={`exam-timer ${timeLeft < 300 ? 'timer-danger' : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="exam-body">
        {q.section && <div className="exam-section-badge">{q.section}</div>}
        <p className="exam-question">{q.question_text}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginBottom: '1.5rem' }}>[{q.marks} Mark(s)]</p>

        {q.type === 'mcq' && (
          <div className="exam-options">
            {q.options.map((opt, i) => (
              <label key={i} className={`exam-option ${answers[q.id] === opt ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name={q.id} 
                  value={opt} 
                  checked={answers[q.id] === opt}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}

        {(q.type === 'gap' || q.type === 'theory') && (
          <div className="form-field">
            <span>Your Answer:</span>
            {q.type === 'theory' ? (
              <textarea 
                rows="6" 
                value={answers[q.id] || ''} 
                onChange={(e) => handleAnswer(q.id, e.target.value)} 
                placeholder="Type your answer here..." 
              />
            ) : (
              <input 
                type="text" 
                value={answers[q.id] || ''} 
                onChange={(e) => handleAnswer(q.id, e.target.value)} 
                placeholder="Type the missing word..." 
              />
            )}
          </div>
        )}
      </div>

      <div className="exam-footer">
        <button 
          className="btn btn-outline" 
          disabled={currentIdx === 0} 
          onClick={() => setCurrentIdx(prev => prev - 1)}
        >
          ← Previous
        </button>
        
        {currentIdx < questions.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)}>
            Next →
          </button>
        ) : (
          <LoadingButton className="btn btn-primary" loading={submitting} onClick={() => handleSubmit(false)}>
            Submit Exam ✓
          </LoadingButton>
        )}
      </div>
    </main>
  )
}
