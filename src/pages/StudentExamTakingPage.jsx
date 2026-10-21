import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import LoadingButton from '../components/LoadingButton.jsx'

export default function StudentExamTakingPage({ id, onNavigate }) {
  const { user } = useAuth()
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [scheduleError, setScheduleError] = useState('')

  // Proctoring State
  const videoRef = useRef(null)
  const [cameraError, setCameraError] = useState(false)
  const strikes = useRef(0)
  const [showWarning, setShowWarning] = useState(false)
  const [snapshots, setSnapshots] = useState([])

  useEffect(() => {
    const load = async () => {
      const { data: ex } = await supabase.from('exams').select('*').eq('id', id).single()
      
      // 🛑 ENFORCE EXAM SCHEDULE
      const now = new Date().getTime()
      if (ex.start_time && now < new Date(ex.start_time).getTime()) {
        setScheduleError(`This exam has not started yet. It opens at ${new Date(ex.start_time).toLocaleString()}.`)
        setLoading(false)
        return
      }
      if (ex.end_time && now > new Date(ex.end_time).getTime()) {
        setScheduleError('This exam has closed. You can no longer take it.')
        setLoading(false)
        return
      }

      const { data: qs } = await supabase.from('questions').select('*').eq('exam_id', id).order('created_at', { ascending: true })
      const shuffledQs = (qs || []).sort(() => Math.random() - 0.5)
      
      setExam(ex)
      setQuestions(shuffledQs)
      
      // If joining late, recalculate time left so they don't get full time
      let calculatedTime = ex.duration_minutes * 60
      if (ex.end_time) {
        const endTime = new Date(ex.end_time).getTime()
        const timeUntilEnd = Math.floor((endTime - now) / 1000)
        if (timeUntilEnd < calculatedTime) calculatedTime = timeUntilEnd
      }
      setTimeLeft(calculatedTime)
      setLoading(false)
    }
    load()

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream })
        .catch(err => setCameraError(true))
    }

    // Anti-Cheat
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
    const preventCopy = (e) => e.preventDefault();
    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventCopy);
    document.addEventListener('contextmenu', preventCopy);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventCopy);
      document.removeEventListener('contextmenu', preventCopy);
    }
  }, [id])

  // 📸 SNAPSHOT FUNCTION
  const takeSnapshot = () => {
    if (!videoRef.current) return null
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.5)
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !result && !submitting) {
        strikes.current += 1
        
        // Take Snapshot Evidence
        const imgData = takeSnapshot()
        if (imgData) setSnapshots(prev => [...prev, imgData])

        if (strikes.current >= 3) {
          alert("You have left the exam tab 3 times. Your exam is being submitted automatically for malpractice.")
          handleSubmit(true)
        } else {
          setShowWarning(true)
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [result, submitting])

  useEffect(() => {
    if (timeLeft === null || result || scheduleError) return
    if (timeLeft <= 0) { handleSubmit(true); return }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, result, scheduleError])

  const handleAnswer = (qId, val) => setAnswers(prev => ({ ...prev, [qId]: val }))

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit) {
      if (!window.confirm("Are you sure you want to submit?")) return
    }
    setSubmitting(true)

    try {
      const attemptId = crypto.randomUUID()
      let uploadedSnapshotUrls = []

      // Upload snapshots to Supabase Storage
      for (const imgData of snapshots) {
        const base64Data = imgData.split(',')[1]
        const blob = await (await fetch(imgData)).blob()
        const fileName = `${attemptId}/${Date.now()}.jpg`
        const { data } = await supabase.storage.from('proctoring_snapshots').upload(fileName, blob)
        if (data) {
          const { data: urlData } = supabase.storage.from('proctoring_snapshots').getPublicUrl(fileName)
          uploadedSnapshotUrls.push(urlData.publicUrl)
        }
      }
      
      const { error: attemptErr } = await supabase.from('exam_attempts').insert({
        id: attemptId,
        exam_id: id,
        user_id: user.id,
        status: 'completed',
        completed_at: new Date().toISOString(),
        score: 0,
        metadata: { tab_switches: strikes.current, snapshots: uploadedSnapshotUrls }
      })
      if (attemptErr) throw new Error("Attempt Error: " + attemptErr.message)

      let autoScore = 0; let pendingManualCount = 0; let totalPossibleMarks = 0
      const finalAnswers = []

      questions.forEach(q => {
        totalPossibleMarks += q.marks
        const studentAns = answers[q.id] || ''
        let isCorrect = null
        if (q.type === 'mcq' || q.type === 'gap') {
          isCorrect = studentAns.toLowerCase().trim() === (q.correct_answer || '').toLowerCase().trim()
          if (isCorrect) autoScore += q.marks
        } else { pendingManualCount++ }
        finalAnswers.push({ attempt_id: attemptId, question_id: q.id, answer_text: studentAns, is_correct: isCorrect })
      })

      await supabase.from('exam_answers').insert(finalAnswers)
      await supabase.from('exam_attempts').update({ score: autoScore }).eq('id', attemptId)
      setResult({ score: autoScore, totalMarks: totalPossibleMarks, pending: pendingManualCount })

    } catch (err) {
      alert(err.message || "An error occurred while submitting.")
    } finally { setSubmitting(false) }
  }

  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>
  if (scheduleError) return (
    <main className="apply-page"><div className="apply-success"><div className="success-icon" style={{background:'rgba(248,113,113,0.1)', color:'#f87171', borderColor:'#f87171'}}>!</div><h1 className="page-title">Access Denied</h1><p className="page-subtitle">{scheduleError}</p><button className="btn btn-primary" onClick={() => onNavigate('studentExams')} style={{ marginTop: '2rem' }}>Back to Exams</button></div></main>
  )
  if (result) return (
    <main className="apply-page"><div className="apply-success"><div className="success-icon">✓</div><h1 className="page-title">Exam Completed!</h1><p className="page-subtitle">Your auto-graded score:</p><div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--gold-light)', margin: '1rem 0' }}>{result.score} / {result.totalMarks}</div>{result.pending > 0 && (<div className="auth-error" style={{ background: 'rgba(201, 162, 39, 0.1)', color: 'var(--gold-light)', borderColor: 'var(--gold)' }}>⚠️ {result.pending} Theory question(s) are pending manual review.</div>)}<button className="btn btn-primary" onClick={() => onNavigate('studentExams')} style={{ marginTop: '2rem' }}>Back to Exams</button></div></main>
  )

  const q = questions[currentIdx]

  return (
    <main className="admin-apps-page">
      {showWarning && (
        <div className="modal-overlay"><div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}><div className="success-icon" style={{ background: 'rgba(248, 113, 113, 0.15)', color: '#f87171', borderColor: '#f87171' }}>!</div><h2 className="modal-title" style={{ color: '#f87171' }}>Warning {strikes.current} of 3</h2><p className="modal-subtitle">You navigated away. A snapshot was taken and logged. On the 3rd attempt, your exam auto-submits.</p><button className="btn btn-primary" onClick={() => setShowWarning(false)}>Return to Exam</button></div></div>
      )}

      <div className="exam-header">
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><span className="badge" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>{exam.exam_type?.toUpperCase() || 'EXAM'}</span></div>
          <h2 className="exam-title">{exam.title}</h2>
          <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem' }}>Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '100px', height: '75px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '2px solid #4ade80' }}>
             {cameraError ? (<div style={{ color: '#f87171', fontSize: '0.6rem', padding: '0.5rem', textAlign: 'center' }}>Cam Blocked</div>) : (<video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />)}
          </div>
          <div className={`exam-timer ${timeLeft < 300 ? 'timer-danger' : ''}`}>⏱ {formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="exam-body" style={{ userSelect: 'none' }}>
        {q.section && <div className="exam-section-badge">{q.section}</div>}
        <p className="exam-question">{q.question_text}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginBottom: '1.5rem' }}>[{q.marks} Mark(s)]</p>
        {q.type === 'mcq' && (<div className="exam-options">{q.options.map((opt, i) => (<label key={i} className={`exam-option ${answers[q.id] === opt ? 'selected' : ''}`}><input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={(e) => handleAnswer(q.id, e.target.value)} /><span>{opt}</span></label>))}</div>)}
        {(q.type === 'gap' || q.type === 'theory') && (<div className="form-field"><span>Your Answer:</span>{q.type === 'theory' ? (<textarea rows="6" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)} placeholder="Type your answer here..." />) : (<input type="text" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)} placeholder="Type the missing word..." />)}</div>)}
      </div>

      <div className="exam-footer">
        <button className="btn btn-outline" disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>← Previous</button>
        {currentIdx < questions.length - 1 ? (<button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)}>Next →</button>) : (<LoadingButton className="btn btn-primary" loading={submitting} onClick={() => handleSubmit(false)}>Submit {exam.exam_type?.toUpperCase() || 'EXAM'} ✓</LoadingButton>)}
      </div>
    </main>
  )
}
