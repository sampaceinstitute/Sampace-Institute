import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import LoadingButton from '../components/LoadingButton.jsx'

export default function StudentExamTakingPage({ id, onNavigate }) {
  const { user } = useAuth()
  
  // Exam Data
  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [scheduleError, setScheduleError] = useState('')
  
  // Attempt Data
  const [attemptId, setAttemptId] = useState(null)
  const [answers, setAnswers] = useState({}) // { qId: 'answer' }
  const [flags, setFlags] = useState({}) // { qId: true/false }
  const [currentIdx, setCurrentIdx] = useState(0)
  
  // Timer & UI
  const [timeLeft, setTimeLeft] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const [calcValue, setCalcValue] = useState('')

  // Proctoring
  const videoRef = useRef(null)
  const [cameraError, setCameraError] = useState(false)
  const strikes = useRef(0)
  const [showWarning, setShowWarning] = useState(false)
  const [snapshots, setSnapshots] = useState([])

  // 1. INITIALIZATION & RESUME LOGIC
  useEffect(() => {
    const initExam = async () => {
      const now = new Date().getTime()

      // Fetch Exam
      const { data: ex, error: exError } = await supabase.from('exams').select('*').eq('id', id).single()
      if (exError || !ex) { setScheduleError('Exam not found.'); setLoading(false); return }
      
      // Schedule Check
      if (ex.start_time && now < new Date(ex.start_time).getTime()) {
        setScheduleError(`Exam opens at ${new Date(ex.start_time).toLocaleString()}.`)
        setLoading(false); return
      }
      if (ex.end_time && now > new Date(ex.end_time).getTime()) {
        setScheduleError('This exam has closed.')
        setLoading(false); return
      }
      
      setExam(ex)

      // Fetch or Create Attempt
      let { data: existingAttempt } = await supabase
        .from('exam_attempts')
        .select('*')
        .eq('exam_id', id)
        .eq('user_id', user.id)
        .eq('status', 'in_progress')
        .maybeSingle()

      let currentAttempt = existingAttempt

      if (!currentAttempt) {
        // Create new attempt if none exists
        const newId = crypto.randomUUID()
        const expectedEnd = new Date(now + ex.duration_minutes * 60000).toISOString()
        
        const { data: newAttempt, error: createErr } = await supabase.from('exam_attempts').insert({
          id: newId,
          exam_id: id,
          user_id: user.id,
          status: 'in_progress',
          started_at: new Date().toISOString(),
          expected_end_time: expectedEnd,
          metadata: { tab_switches: 0, snapshots: [] }
        }).select().single()

        if (createErr) { alert("Error starting exam: " + createErr.message); return }
        currentAttempt = newAttempt
      }

      setAttemptId(currentAttempt.id)

      // Fetch existing answers (if resuming)
      const { data: savedAnswers } = await supabase
        .from('exam_answers')
        .select('*')
        .eq('attempt_id', currentAttempt.id)

      const loadedAnswers = {}
      const loadedFlags = {}
      savedAnswers?.forEach(ans => {
        loadedAnswers[ans.question_id] = ans.answer_text
        if (ans.is_flagged) loadedFlags[ans.question_id] = true
      })
      setAnswers(loadedAnswers)
      setFlags(loadedFlags)

      // Fetch Questions
      const { data: qs } = await supabase.from('questions').select('*').eq('exam_id', id).order('created_at', { ascending: true })
      
      // Only shuffle for new attempts
      const finalQs = existingAttempt ? qs : (qs || []).sort(() => Math.random() - 0.5)
      setQuestions(finalQs)

      // Calculate Time Left
      const expectedEnd = new Date(currentAttempt.expected_end_time).getTime()
      const nowTime = new Date().getTime()
      let remainingSeconds = Math.floor((expectedEnd - nowTime) / 1000)

      // If exam end time is sooner than expectedEnd, cap the timer
      if (ex.end_time) {
        const globalEnd = new Date(ex.end_time).getTime()
        const timeUntilGlobalEnd = Math.floor((globalEnd - nowTime) / 1000)
        if (timeUntilGlobalEnd < remainingSeconds) remainingSeconds = timeUntilGlobalEnd
      }

      if (remainingSeconds <= 0) {
        handleSubmit(true) // Time already ran out while they were offline
      } else {
        setTimeLeft(remainingSeconds)
      }
      
      setLoading(false)
    }
    initExam()

    // Proctoring & Anti-Cheat
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream })
        .catch(() => setCameraError(true))
    }
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    
    const preventCopy = (e) => e.preventDefault();
    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventCopy);
    document.addEventListener('contextmenu', preventCopy);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventCopy);
      document.removeEventListener('contextmenu', preventCopy);
    }
  }, [id, user.id])

  // 2. TAB SWITCH DETECTION
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !result && !submitting && attemptId) {
        strikes.current += 1
        
        const canvas = document.createElement('canvas')
        if (videoRef.current) {
          canvas.width = videoRef.current.videoWidth
          canvas.height = videoRef.current.videoHeight
          canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
          const imgData = canvas.toDataURL('image/jpeg', 0.5)
          setSnapshots(prev => [...prev, imgData])
        }

        if (strikes.current >= 3) {
          alert("You have left the exam tab 3 times. Your exam is being submitted.")
          handleSubmit(true)
        } else {
          setShowWarning(true)
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [result, submitting, attemptId])

  // 3. TIMER
  useEffect(() => {
    if (timeLeft === null || result || scheduleError) return
    if (timeLeft <= 0) { handleSubmit(true); return }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, result, scheduleError])

  // 4. AUTO-SAVE LOGIC
  const handleAnswer = async (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
    
    // Save to DB immediately (Upsert)
    await supabase.from('exam_answers').upsert({
      attempt_id: attemptId,
      question_id: qId,
      answer_text: val,
      is_flagged: flags[qId] || false
    }, { onConflict: 'attempt_id,question_id' })
  }

  const handleFlag = async () => {
    const qId = questions[currentIdx].id
    const newFlagState = !flags[qId]
    setFlags(prev => ({ ...prev, [qId]: newFlagState }))
    
    await supabase.from('exam_answers').upsert({
      attempt_id: attemptId,
      question_id: qId,
      answer_text: answers[qId] || '',
      is_flagged: newFlagState
    }, { onConflict: 'attempt_id,question_id' })
  }

  // 5. SUBMIT EXAM
  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit) {
      if (!window.confirm("Are you sure you want to submit?")) return
    }
    setSubmitting(true)

    try {
      let uploadedSnapshotUrls = []
      for (const imgData of snapshots) {
        const blob = await (await fetch(imgData)).blob()
        const fileName = `${attemptId}/${Date.now()}.jpg`
        const { data } = await supabase.storage.from('proctoring_snapshots').upload(fileName, blob)
        if (data) {
          const { data: urlData } = supabase.storage.from('proctoring_snapshots').getPublicUrl(fileName)
          uploadedSnapshotUrls.push(urlData.publicUrl)
        }
      }

      let autoScore = 0; let pendingManualCount = 0; let totalPossibleMarks = 0
      
      questions.forEach(q => {
        totalPossibleMarks += q.marks
        const studentAns = answers[q.id] || ''
        let isCorrect = null
        if (q.type === 'mcq' || q.type === 'gap') {
          isCorrect = studentAns.toLowerCase().trim() === (q.correct_answer || '').toLowerCase().trim()
          if (isCorrect) autoScore += q.marks
        } else if (studentAns.trim() !== '') {
          pendingManualCount++
        }
      })

      // Update Attempt Record
      await supabase.from('exam_attempts').update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
        score: autoScore,
        metadata: { tab_switches: strikes.current, snapshots: uploadedSnapshotUrls }
      }).eq('id', attemptId)

      // Update Auto-graded answers
      for (const q of questions) {
         if (q.type === 'mcq' || q.type === 'gap') {
            const isCorrect = (answers[q.id] || '').toLowerCase().trim() === (q.correct_answer || '').toLowerCase().trim()
            await supabase.from('exam_answers').update({ is_correct: isCorrect }).eq('attempt_id', attemptId).eq('question_id', q.id)
         }
      }

      setResult({ score: autoScore, totalMarks: totalPossibleMarks, pending: pendingManualCount })

    } catch (err) {
      alert(err.message || "An error occurred while submitting.")
    } finally { setSubmitting(false) }
  }

  // CALCULATOR LOGIC
  const calculate = () => {
    try { setCalcValue(String(eval(calcValue))) } catch { setCalcValue('Error') }
  }

  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`

  if (loading) return <main className="loading-state"><div className="loading-spinner" /></main>
  if (scheduleError) return <main className="apply-page"><div className="apply-success"><h1>Access Denied</h1><p>{scheduleError}</p><button className="btn btn-primary" onClick={() => onNavigate('studentExams')}>Back</button></div></main>
  if (result) return <main className="apply-page"><div className="apply-success"><h1>Exam Completed!</h1><p>Auto-graded score:</p><div style={{ fontSize: '3rem', color: 'var(--gold)' }}>{result.score} / {result.totalMarks}</div><button className="btn btn-primary" onClick={() => onNavigate('studentExams')}>Back to Exams</button></div></main>

  const q = questions[currentIdx]

  return (
    <main className="admin-apps-page">
      {showWarning && (
        <div className="modal-overlay"><div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}><h2 className="modal-title" style={{ color: '#f87171' }}>Warning {strikes.current} of 3</h2><p className="modal-subtitle">You navigated away. A snapshot was logged. On the 3rd attempt, your exam auto-submits.</p><button className="btn btn-primary" onClick={() => setShowWarning(false)}>Return to Exam</button></div></div>
      )}

      {/* HEADER */}
      <div className="exam-header" style={{ position: 'relative' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><span className="badge" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>{exam.exam_type?.toUpperCase()}</span></div>
          <h2 className="exam-title">{exam.title}</h2>
          <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem' }}>Question {currentIdx + 1} of {questions.length}</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '80px', height: '60px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '2px solid #4ade80' }}>
             {!cameraError && <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />}
          </div>
          <div className={`exam-timer ${timeLeft < 300 ? 'timer-danger' : ''}`}>⏱ {formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* MAIN BODY: 2 Columns */}
      <div className="exam-layout">
        {/* LEFT: Question Area */}
        <div className="exam-main-area">
          <div className="exam-body" style={{ userSelect: 'none' }}>
            {q.section && <div className="exam-section-badge">{q.section}</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="exam-question">{q.question_text}</p>
              <button onClick={handleFlag} style={{ background: 'none', border: 'none', color: flags[q.id] ? 'var(--gold)' : 'var(--text-soft)', cursor: 'pointer', fontSize: '1.2rem' }}>
                {flags[q.id] ? '🚩' : '🏳️'} Flag
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginBottom: '1.5rem' }}>[{q.marks} Mark(s)]</p>

            {q.type === 'mcq' && (
              <div className="exam-options">
                {q.options.map((opt, i) => (
                  <label key={i} className={`exam-option ${answers[q.id] === opt ? 'selected' : ''}`}>
                    <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={(e) => handleAnswer(q.id, e.target.value)} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {(q.type === 'gap' || q.type === 'theory') && (
              <div className="form-field">
                <span>Your Answer:</span>
                {q.type === 'theory' ? (
                  <textarea rows="6" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)} placeholder="Type your answer here..." />
                ) : (
                  <input type="text" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)} placeholder="Type the missing word..." />
                )}
              </div>
            )}
          </div>

          <div className="exam-footer">
            <button className="btn btn-outline" disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>← Previous</button>
            {currentIdx < questions.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)}>Next →</button>
            ) : (
              <LoadingButton className="btn btn-primary" loading={submitting} onClick={() => handleSubmit(false)}>Submit Exam ✓</LoadingButton>
            )}
          </div>
        </div>

        {/* RIGHT: Question Grid & Tools */}
        <div className="exam-sidebar">
          {showCalculator && (
            <div className="calculator">
              <div className="calc-screen">{calcValue || '0'}</div>
              <div className="calc-buttons">
                {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
                  <button key={btn} onClick={() => {
                    if (btn === '=') calculate();
                    else setCalcValue(prev => prev + btn);
                  }} className="calc-btn">{btn}</button>
                ))}
                <button onClick={() => setCalcValue('')} style={{ gridColumn: 'span 4', background: '#f87171', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem', cursor: 'pointer' }}>Clear</button>
              </div>
            </div>
          )}

          <div className="exam-tools">
             <button className="btn btn-outline" onClick={() => setShowCalculator(!showCalculator)}>🧮 Calculator</button>
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1rem', color: 'var(--gold-light)' }}>Question Grid</h3>
          <div className="question-grid">
            {questions.map((qq, i) => {
              let status = 'unanswered'
              if (answers[qq.id]) status = 'answered'
              if (flags[qq.id]) status = 'flagged'
              
              return (
                <button 
                  key={qq.id} 
                  className={`grid-btn ${status} ${i === currentIdx ? 'current' : ''}`}
                  onClick={() => setCurrentIdx(i)}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.7rem', color: 'var(--text-soft)' }}>
             <div>⬛ Answered</div>
             <div>⬜ Unanswered</div>
             <div>🚩 Flagged</div>
          </div>
        </div>
      </div>
    </main>
  )
}
