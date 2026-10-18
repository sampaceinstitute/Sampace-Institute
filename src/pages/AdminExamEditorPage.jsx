import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminExamEditorPage({ id, onNavigate }) {
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // New question state
  const [qType, setQType] = useState('mcq')
  const [qText, setQText] = useState('')
  const [qMarks, setQMarks] = useState(1)
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [saving, setSaving] = useState(false)

  const loadExam = async () => {
    const { data: examData } = await supabase.from('exams').select('*').eq('id', id).single()
    const { data: qData } = await supabase.from('questions').select('*').eq('exam_id', id).order('created_at', { ascending: true })
    setExam(examData)
    setQuestions(qData || [])
    setLoading(false)
  }

  useEffect(() => { loadExam() }, [id])

  const handleAddQuestion = async (e) => {
    e.preventDefault()
    setSaving(true)

    let finalAnswer = correctAnswer
    let finalOptions = null

    if (qType === 'mcq') {
      finalOptions = options.filter(o => o.trim() !== '')
      // The correct answer is the actual text of the correct option
      finalAnswer = options[parseInt(correctAnswer)]
    }

    const { error } = await supabase.from('questions').insert({
      exam_id: id,
      type: qType,
      question_text: qText,
      options: finalOptions,
      correct_answer: finalAnswer,
      marks: parseInt(qMarks)
    })

    if (!error) {
      setQText('')
      setOptions(['', '', '', ''])
      setCorrectAnswer('')
      loadExam() // reload questions
    } else {
      alert('Error adding question: ' + error.message)
    }
    setSaving(false)
  }

  const handlePublish = async () => {
    if (questions.length === 0) return alert('Add at least one question first.')
    await supabase.from('exams').update({ status: 'published' }).eq('id', id)
    alert('Exam published! Students can now take it.')
    loadExam()
  }

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('adminExams')}>← Back to Exams</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />{exam?.status.toUpperCase()}</div>
        <h1 className="page-title">{exam?.title}</h1>
        <p className="page-subtitle">Duration: {exam?.duration_minutes} minutes · {questions.length} Questions</p>
        {exam?.status === 'draft' && (
          <button className="btn btn-primary" onClick={handlePublish} style={{ marginTop: '1rem' }}>
            🚀 Publish Exam
          </button>
        )}
      </div>

      <div className="contact-layout">
        {/* Add Question Form */}
        <div className="contact-form-container">
          <form className="auth-form" onSubmit={handleAddQuestion}>
            <h3 className="apply-step-title">Add a Question</h3>
            
            <label className="form-field">
              <span>Question Type *</span>
              <select value={qType} onChange={e => setQType(e.target.value)}>
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="gap">Fill in the Gap</option>
                <option value="theory">Theory / Essay</option>
              </select>
            </label>

            <label className="form-field">
              <span>Question Text *</span>
              <textarea required rows="3" value={qText} onChange={e => setQText(e.target.value)} placeholder="Type your question here..." />
            </label>

            <label className="form-field">
              <span>Marks *</span>
              <input type="number" required min="1" value={qMarks} onChange={e => setQMarks(e.target.value)} />
            </label>

            {qType === 'mcq' && (
              <div className="form-field">
                <span>Options *</span>
                {options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    <input type="radio" name="correctOpt" required value={i} checked={correctAnswer === String(i)} onChange={e => setCorrectAnswer(e.target.value)} />
                    <input type="text" placeholder={`Option ${String.fromCharCode(65 + i)}`} value={opt} onChange={e => { const newOpts = [...options]; newOpts[i] = e.target.value; setOptions(newOpts); }} style={{ flex: 1 }} />
                  </div>
                ))}
                <p style={{ fontSize: '0.7rem', color: 'var(--text-soft)', marginTop: '0.5rem' }}>Select the radio button next to the correct answer.</p>
              </div>
            )}

            {(qType === 'gap' || qType === 'theory') && (
              <label className="form-field">
                <span>Correct Answer / Grading Guide *</span>
                <input type="text" required value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} placeholder={qType === 'gap' ? "The exact missing word" : "Key points to look for"} />
              </label>
            )}

            <LoadingButton type="submit" loading={saving}>Save Question →</LoadingButton>
          </form>
        </div>

        {/* List of Questions */}
        <div className="admin-users-list-panel">
          <h3 className="panel-title">Questions ({questions.length})</h3>
          <div className="admin-users-scroll">
            {questions.map((q, i) => (
              <div key={q.id} className="my-card" style={{ padding: '1rem' }}>
                <div className="my-card-reference">Q{i + 1} · {q.type.toUpperCase()} · {q.marks} mark(s)</div>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{q.question_text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
