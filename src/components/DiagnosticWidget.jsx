import React, { useState } from 'react'
import { SITE } from '../constants.js'

const QUESTIONS = [
  {
    id: 1,
    subject: 'Mathematics',
    question: 'If 2x + 5 = 15, what is the value of x?',
    options: ['3', '5', '7', '10'],
    correct: 1
  },
  {
    id: 2,
    subject: 'English',
    question: 'Choose the word that is most nearly OPPOSITE in meaning to "BENEVOLENT":',
    options: ['Kind', 'Generous', 'Malevolent', 'Friendly'],
    correct: 2
  },
  {
    id: 3,
    subject: 'Physics',
    question: 'What is the SI unit of electric current?',
    options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
    correct: 1
  }
]

export default function DiagnosticWidget() {
  const [step, setStep] = useState('intro') // intro | questions | result | captured
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const start = () => {
    setStep('questions')
    setCurrentQ(0)
    setAnswers([])
  }

  const answer = (index) => {
    const newAnswers = [...answers, { questionId: QUESTIONS[currentQ].id, answer: index }]
    setAnswers(newAnswers)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setStep('result')
    }
  }

  const score = answers.reduce((sum, a) => {
    const q = QUESTIONS.find((x) => x.id === a.questionId)
    return sum + (q && q.correct === a.answer ? 1 : 0)
  }, 0)

  const readinessLevel = score === 3 ? 'Excellent' : score === 2 ? 'Good' : score === 1 ? 'Fair' : 'Needs Work'
  const readinessColor = score === 3 ? '#4ade80' : score === 2 ? '#E5C158' : score === 1 ? '#fb923c' : '#f87171'

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    if (!phone || phone.length < 10) return

    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n` +
      `Name: ${name || 'Not provided'}\n` +
      `Phone: ${phone}\n` +
      `Diagnostic Score: ${score}/3 (${readinessLevel})\n\n` +
      `I just took the free JAMB readiness test on your website. Please send me my full readiness report and study plan.`
    )

    window.open(`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
    setStep('captured')
  }

  return (
    <section className="diagnostic-widget">
      <div className="diagnostic-inner">
        {step === 'intro' && (
          <div className="diagnostic-intro">
            <div className="badge">
              <span className="badge-dot" />
              Free · 60 Seconds · No Login
            </div>
            <h2 className="section-title">
              Test your <span className="gradient-text">JAMB readiness</span> in 60 seconds
            </h2>
            <p className="section-subtitle">
              3 questions. Instant feedback. Find out if you're ready for JAMB — and what to fix.
            </p>
            <button className="btn btn-primary" onClick={start}>
              Start Free Test
              <span className="btn-arrow">→</span>
            </button>
            <p className="diagnostic-note">
              👥 Joined by 12,000+ Nigerian students
            </p>
          </div>
        )}

        {step === 'questions' && (
          <div className="diagnostic-question">
            <div className="diagnostic-progress">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <span className="progress-label">
                Question {currentQ + 1} of {QUESTIONS.length}
              </span>
            </div>

            <div className="question-subject">{QUESTIONS[currentQ].subject}</div>
            <h3 className="question-text">{QUESTIONS[currentQ].question}</h3>

            <div className="options-list">
              {QUESTIONS[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  className="option-button"
                  onClick={() => answer(i)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="diagnostic-result">
            <div className="result-score">
              <div className="score-ring" style={{ '--score-color': readinessColor }}>
                <span className="score-number">{score}/{QUESTIONS.length}</span>
              </div>
              <div className="score-level" style={{ color: readinessColor }}>
                {readinessLevel}
              </div>
            </div>

            <h2 className="section-title">Your readiness: {readinessLevel}</h2>
            <p className="section-subtitle">
              Want your <strong>full report</strong> with weak topics, personalised study plan,
              and free mock CBT access?
            </p>

            <form className="capture-form" onSubmit={handleWhatsAppSubmit}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="capture-input"
              />
              <input
                type="tel"
                placeholder="WhatsApp number (e.g. 08012345678)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="capture-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Get My Full Report on WhatsApp
                <span className="btn-arrow">→</span>
              </button>
              <p className="diagnostic-note">
                🔒 We'll only use your number to send your report. No spam.
              </p>
            </form>
          </div>
        )}

        {step === 'captured' && (
          <div className="diagnostic-success">
            <div className="success-icon">✓</div>
            <h2 className="section-title">Report Sent to WhatsApp!</h2>
            <p className="section-subtitle">
              Check your WhatsApp now. If it doesn't open, tap the button below.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open WhatsApp
            </a>
            <button
              className="btn btn-outline"
              onClick={() => { setStep('intro'); setAnswers([]); setPhone(''); setName('') }}
              style={{ marginTop: '1rem' }}
            >
              Take Another Test
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
