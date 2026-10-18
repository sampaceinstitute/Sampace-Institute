import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminExamEditorPage({ id, onNavigate }) {
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Single question state
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
      loadExam()
    } else {
      alert('Error: ' + error.message)
    }
    setSaving(false)
  }

  // BULK CSV UPLOAD HANDLER
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSaving(true)
    const reader = new FileReader()
    
    reader.onload = async (event) => {
      const csvText = event.target.result
      const lines = csvText.split('\n').filter(line => line.trim() !== '')
      
      // Skip header row (assuming row 0 is headers)
      const newQuestions = []
      
      for (let i = 1; i < lines.length; i++) {
        // Very simple CSV parser (handles basic comma separation)
        // Format: type,question_text,option_a,option_b,option_c,option_d,correct_answer,marks
        const cols = lines[i].split(',')
        if (cols.length >= 8) {
          const type = cols[0].trim()
          const qText = cols[1].trim()
          const optA = cols[2].trim()
          const optB = cols[3].trim()
          const optC = cols[4].trim()
          const optD = cols[5].trim()
          const correct = cols[6].trim()
          const marks = parseInt(cols[7].trim()) || 1

          if (type === 'mcq') {
            newQuestions.push({
              exam_id: id,
              type: 'mcq',
              question_text: qText,
              options: [optA, optB, optC, optD],
              correct_answer: correct, // Should match one of the options exactly
              marks: marks
            })
          } else {
             // Theory or Gap
             newQuestions.push({
              exam_id: id,
              type: type,
              question_text: qText,
              correct_answer: correct,
              marks: marks
            })
          }
        }
      }

      if (newQuestions.length > 0) {
        const { error } = await supabase.from('questions').insert(newQuestions)
        if (error) alert('Bulk upload error: ' + error.message)
        else alert(`Successfully added ${newQuestions.length} questions!`)
      } else {
        alert('No valid questions found. Please check the CSV format.')
      }
      
      loadExam()
      setSaving(false)
      e.target.value = null // reset file input
    }
    
    reader.readAsText(file)
  }

  const handlePublish = async () => {
    if (questions.length === 0) return alert('Add at least one question first.')
    await supabase.from('exams').update({ status: 'published' }).eq('id', id)
    alert('Exam published!')
    loadExam()
  }

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('adminExams')}>← Back to Exams</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />{exam?.status.toUpperCase()}</div>
        <h1 className="page-title">{exam?.title}</h1>
        <p className="page-subtitle">{exam?.course_id} · {exam?.duration_minutes} mins · {questions.length} Questions</p>
        {exam?.status === 'draft' && (
          <button className="btn btn-primary" onClick={handlePublish} style={{ marginTop: '1rem' }}>
            🚀 Publish Exam
          </button>
        )}
      </div>

      <div className="contact-layout">
        <div className="contact-form-container">
          <form className="auth-form" onSubmit={handleAddQuestion}>
            <h3 className="apply-step-title">Add Single Question</h3>
            
            <div style={{ padding: '0.75rem', background: 'rgba(201,162,39,0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--gold-light)', marginBottom: '1rem' }}>
              💡 <strong>Scientific Symbols:</strong> You can type equations like <code>\(x^2 + y^2 = z^2\)</code> using LaTeX formatting. They will render beautifully for students.
            </div>

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

          {/* BULK UPLOAD SECTION */}
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="apply-step-title">Bulk Upload (CSV)</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>
              Format: <code>type, question, optA, optB, optC, optD, correct_answer, marks</code>
            </p>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleCSVUpload}
              style={{ display: 'block', width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border)', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
            />
          </div>
        </div>

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
