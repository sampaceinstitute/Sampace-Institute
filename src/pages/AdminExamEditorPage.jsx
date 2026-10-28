import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import LoadingButton from '../components/LoadingButton.jsx'

export default function AdminExamEditorPage({ id, onNavigate }) {
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [editingId, setEditingId] = useState(null)
  const [qType, setQType] = useState('mcq')
  const [qSection, setQSection] = useState('')
  const [qText, setQText] = useState('')
  const [qMarks, setQMarks] = useState(1)
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [saving, setSaving] = useState(false)

  // Exam Settings State
  const [examTitle, setExamTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [desktopOnly, setDesktopOnly] = useState(false)
  const [savingExam, setSavingExam] = useState(false)

  const loadExam = async () => {
    const { data: examData } = await supabase.from('exams').select('*').eq('id', id).single()
    const { data: qData } = await supabase.from('questions').select('*').eq('exam_id', id).order('created_at', { ascending: true })
    
    setExam(examData)
    setExamTitle(examData.title)
    setDesktopOnly(examData.desktop_only || false)
    
    // Format dates properly for datetime-local input
    if (examData.start_time) {
      const d = new Date(examData.start_time)
      setStartTime(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16))
    }
    if (examData.end_time) {
      const d = new Date(examData.end_time)
      setEndTime(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16))
    }
    
    setQuestions(qData || [])
    setLoading(false)
  }

  useEffect(() => { loadExam() }, [id])

    const handleSaveExamSettings = async () => {
    setSavingExam(true)
    
    const payload = {
      title: examTitle,
      start_time: startTime ? new Date(startTime).toISOString() : null,
      end_time: endTime ? new Date(endTime).toISOString() : null,
      desktop_only: desktopOnly
    }

    const { error } = await supabase.from('exams').update(payload).eq('id', id)
    
    if (error) {
      alert("Error saving schedule: " + error.message)
    } else {
      alert('Exam settings saved successfully!')
      loadExam()
    }
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
      exam_id: id, type: qType, section: qSection,
      question_text: qText, options: finalOptions,
      correct_answer: finalAnswer, marks: parseInt(qMarks)
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
      setEditingId(null); setQType('mcq'); setQText(''); setQSection(''); setQMarks(1); setOptions(['', '', '', '']); setCorrectAnswer('')
      loadExam()
    } else {
      alert('Error: ' + error.message)
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
        <p className="page-subtitle">{exam?.course_id} · {exam?.duration_minutes} mins · {questions.length} Questions</p>
        
        {exam?.status === 'draft' && (
          <button className="btn btn-primary" onClick={handlePublish} style={{ marginTop: '1rem' }}>🚀 Publish Exam</button>
        )}
      </div>

      {/* 🛑 EXAM SETTINGS & TOGGLE */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--gold-light)' }}>Schedule & Access Control</h4>
        
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

        {/* THE TOGGLE BUTTON */}
        <label className="auth-checkbox" style={{ marginTop: '1.5rem', background: 'rgba(201, 162, 39, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--gold)' }}>
          <input type="checkbox" checked={desktopOnly} onChange={(e) => setDesktopOnly(e.target.checked)} style={{ width: '20px', height: '20px' }} />
          <span style={{ fontSize: '0.95rem' }}>💻 <strong>Require Desktop/Laptop</strong> <br/><span style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>Block mobile and tablet users. Only check this for high-stakes exams.</span></span>
        </label>

        <button className="btn btn-outline" onClick={handleSaveExamSettings} disabled={savingExam} style={{ marginTop: '1.5rem', width: '100%' }}>
          {savingExam ? 'Saving...' : 'Save Schedule & Access Settings'}
        </button>
      </div>

      {/* QUESTION BUILDER */}
      <div className="contact-layout">
        <div className="contact-form-container">
          <form className="auth-form" onSubmit={handleAddQuestion}>
            <h3 className="apply-step-title">{editingId ? 'Edit Question' : 'Add Single Question'}</h3>
            <label className="form-field"><span>Section / Sub-topic</span><input type="text" value={qSection} onChange={e => setQSection(e.target.value)} placeholder="e.g. Section A" /></label>
            <label className="form-field"><span>Question Type *</span>
              <select value={qType} onChange={e => setQType(e.target.value)}>
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="gap">Fill in the Gap</option>
                <option value="theory">Theory / Essay</option>
              </select>
            </label>
            <label className="form-field"><span>Question Text *</span><textarea required rows="3" value={qText} onChange={e => setQText(e.target.value)} placeholder="Type your question here..." /></label>
            <label className="form-field"><span>Marks *</span><input type="number" required min="1" value={qMarks} onChange={e => setQMarks(e.target.value)} /></label>

            {qType === 'mcq' && (
              <div className="form-field"><span>Options *</span>
                {options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    <input type="radio" name="correctOpt" required value={i} checked={correctAnswer === String(i)} onChange={e => setCorrectAnswer(e.target.value)} />
                    <input type="text" placeholder={`Option ${String.fromCharCode(65 + i)}`} value={opt} onChange={e => { const newOpts = [...options]; newOpts[i] = e.target.value; setOptions(newOpts); }} style={{ flex: 1 }} />
                  </div>
                ))}
              </div>
            )}

            {(qType === 'gap' || qType === 'theory') && (
              <label className="form-field"><span>Correct Answer / Guide *</span><input type="text" required value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} /></label>
            )}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <LoadingButton type="submit" loading={saving} className="btn btn-primary" style={{ flex: 1 }}>{editingId ? 'Update Question' : 'Save Question'}</LoadingButton>
              {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setQText(''); setCorrectAnswer(''); setOptions(['','','','']); }} style={{ flex: 1 }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="admin-users-list-panel">
          <h3 className="panel-title">Questions ({questions.length})</h3>
          <div className="admin-users-scroll">
            {questions.map((q, i) => (
              <div key={q.id} className="my-card" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                <div className="my-card-header">
                  <div className="my-card-reference">Q{i + 1} · {q.type.toUpperCase()} · {q.marks} mark(s)</div>
                  <button type="button" onClick={() => { 
                    setEditingId(q.id); setQType(q.type); setQText(q.question_text); setQSection(q.section || ''); setQMarks(q.marks); setCorrectAnswer(q.correct_answer || '');
                    if (q.type === 'mcq' && q.options) setOptions([...q.options, '', '', '', ''].slice(0, 4));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} style={{ background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer', fontSize: '0.8rem' }}>✏️ Edit</button>
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{q.question_text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
