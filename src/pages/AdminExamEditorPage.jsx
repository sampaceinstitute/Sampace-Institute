import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminExamEditorPage({ id, onNavigate }) {
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Question form state
  const [editingId, setEditingId] = useState(null)
  const [qType, setQType] = useState('mcq')
  const [qSection, setQSection] = useState('')
  const [qText, setQText] = useState('')
  const [qMarks, setQMarks] = useState(1)
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [saving, setSaving] = useState(false)

  // Exam settings state
  const [examTitle, setExamTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [savingExam, setSavingExam] = useState(false)

  const loadExam = async () => {
    const { data: examData } = await supabase.from('exams').select('*').eq('id', id).single()
    const { data: qData } = await supabase.from('questions').select('*').eq('exam_id', id).order('created_at', { ascending: true })
    
    setExam(examData)
    setExamTitle(examData.title)
    
    // Format dates for datetime-local input (YYYY-MM-DDThh:mm)
    if (examData.start_time) setStartTime(new Date(examData.start_time).toISOString().slice(0, 16))
    if (examData.end_time) setEndTime(new Date(examData.end_time).toISOString().slice(0, 16))
    
    setQuestions(qData || [])
    setLoading(false)
  }

  useEffect(() => { loadExam() }, [id])

  const resetForm = () => {
    setEditingId(null)
    setQType('mcq')
    setQText('')
    setQSection('')
    setQMarks(1)
    setOptions(['', '', '', ''])
    setCorrectAnswer('')
  }

  const handleEditClick = (q) => {
    setEditingId(q.id)
    setQType(q.type)
    setQText(q.question_text)
    setQSection(q.section || '')
    setQMarks(q.marks)
    setCorrectAnswer(q.correct_answer || '')
    
    if (q.type === 'mcq' && q.options) {
      setOptions([...q.options, '', '', '', ''].slice(0, 4)) // fill up to 4 options
    } else {
      setOptions(['', '', '', ''])
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaveExamSettings = async () => {
    setSavingExam(true)
    await supabase.from('exams').update({
      title: examTitle,
      start_time: startTime ? new Date(startTime).toISOString() : null,
      end_time: endTime ? new Date(endTime).toISOString() : null
    }).eq('id', id)
    alert('Exam settings saved!')
    loadExam()
    setSavingExam(false)
  }

  const handleAddQuestion = async (e) => {
    e.preventDefault()
    setSaving(true)

    let finalAnswer = correctAnswer
    let finalOptions = null

    if (qType === 'mcq') {
      finalOptions = options.filter(o => o.trim() !== '')
      finalAnswer = options[parseInt(correctAnswer)]
    }

    const payload = {
      exam_id: id,
      type: qType,
      section: qSection,
      question_text: qText,
      options: finalOptions,
      correct_answer: finalAnswer,
      marks: parseInt(qMarks)
    }

    let error
    if (editingId) {
      const res = await supabase.from('questions').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('questions').insert(payload)
      error = res.error
    }

    if (!error) {
      resetForm()
      loadExam()
    } else {
      alert('Error: ' + error.message)
    }
    setSaving(false)
  }

  // BULK CSV UPLOAD (Updated for Sections)
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSaving(true)
    const reader = new FileReader()
    
    reader.onload = async (event) => {
      const csvText = event.target.result
      const lines = csvText.split('\n').filter(line => line.trim() !== '')
      const newQuestions = []
      
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',')
        if (cols.length >= 9) {
          const section = cols[0].trim()
          const type = cols[1].trim()
          const qText = cols[2].trim()
          const optA = cols[3].trim()
          const optB = cols[4].trim()
          const optC = cols[5].trim()
          const optD = cols[6].trim()
          const correct = cols[7].trim()
          const marks = parseInt(cols[8].trim()) || 1

          const payload = {
            exam_id: id,
            section: section,
            type: type,
            question_text: qText,
            correct_answer: correct,
            marks: marks
          }

          if (type === 'mcq') {
            payload.options = [optA, optB, optC, optD]
          }

          newQuestions.push(payload)
        }
      }

      if (newQuestions.length > 0) {
        const { error } = await supabase.from('questions').insert(newQuestions)
        if (error) alert('Bulk upload error: ' + error.message)
        else alert(`Successfully added ${newQuestions.length} questions!`)
      } else {
        alert('No valid questions found. Ensure you have 9 columns (Section, Type, Question, A, B, C, D, Answer, Marks).')
      }
      
      loadExam()
      setSaving(false)
      e.target.value = null
    }
    reader.readAsText(file)
  }

  const handlePublish = async () => {
    if (questions.length === 0) return alert('Add at least one question first.')
    await supabase.from('exams').update({ status: 'published' }).eq('id', id)
    alert('Exam published! Students can now take it.')
    loadExam()
  }

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>

  // Group questions by section for display
  const groupedQuestions = questions.reduce((acc, q) => {
    const sec = q.section || 'General'
    if (!acc[sec]) acc[sec] = []
    acc[sec].push(q)
    return acc
  }, {})

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('adminExams')}>← Back to Exams</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />{exam?.status.toUpperCase()}</div>
        <h1 className="page-title">{exam?.title}</h1>
        <p className="page-subtitle">{exam?.course_id} · {exam?.duration_minutes} mins · {questions.length} Questions</p>
        
        {/* EXAM SCHEDULING PANEL */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--gold-light)' }}>Exam Schedule & Access</h4>
          <div className="form-grid">
            <label className="form-field">
              <span>Exam Title</span>
              <input type="text" value={examTitle} onChange={e => setExamTitle(e.target.value)} />
            </label>
            <label className="form-field">
              <span>Start Time (Optional)</span>
              <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </label>
            <label className="form-field">
              <span>End Time (Optional)</span>
              <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
            </label>
          </div>
          <button className="btn btn-outline" onClick={handleSaveExamSettings} disabled={savingExam} style={{ marginTop: '1rem', width: '100%' }}>
            {savingExam ? 'Saving...' : 'Save Schedule & Details'}
          </button>
        </div>

        {exam?.status === 'draft' && (
          <button className="btn btn-primary" onClick={handlePublish} style={{ marginTop: '1rem' }}>
            🚀 Publish Exam
          </button>
        )}
      </div>

      <div className="contact-layout">
        <div className="contact-form-container">
          <form className="auth-form" onSubmit={handleAddQuestion}>
            <h3 className="apply-step-title">{editingId ? 'Edit Question' : 'Add Single Question'}</h3>
            
            <label className="form-field">
              <span>Section / Sub-topic (Optional)</span>
              <input type="text" value={qSection} onChange={e => setQSection(e.target.value)} placeholder="e.g. Section A: Comprehension" />
            </label>

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

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <LoadingButton type="submit" loading={saving} className="btn btn-primary" style={{ flex: 1 }}>
                {editingId ? 'Update Question →' : 'Save Question →'}
              </LoadingButton>
              {editingId && (
                <button type="button" className="btn btn-outline" onClick={resetForm} style={{ flex: 1 }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {!editingId && (
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="apply-step-title">Bulk Upload (CSV)</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginBottom: '1rem' }}>
                Format: <code>Section, type, question, optA, optB, optC, optD, correct_answer, marks</code>
              </p>
              <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ display: 'block', width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border)', borderRadius: '8px', color: '#fff', cursor: 'pointer' }} />
            </div>
          )}
        </div>

        <div className="admin-users-list-panel">
          <h3 className="panel-title">Questions ({questions.length})</h3>
          <div className="admin-users-scroll">
            {Object.entries(groupedQuestions).map(([sectionName, qs]) => (
              <div key={sectionName} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--gold-light)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {sectionName}
                </h4>
                {qs.map((q, i) => (
                  <div key={q.id} className="my-card" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                    <div className="my-card-header">
                      <div className="my-card-reference">Q{i + 1} · {q.type.toUpperCase()} · {q.marks} mark(s)</div>
                      <button type="button" onClick={() => handleEditClick(q)} style={{ background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer', fontSize: '0.8rem' }}>
                        ✏️ Edit
                      </button>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{q.question_text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
