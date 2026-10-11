import React, { useState, useEffect } from 'react'

const PERSONAS = [
  {
    id: 'student',
    icon: '🎓',
    title: 'I am a Student',
    description: 'I want to pass JAMB, WAEC, or learn a new skill',
    cta: 'Start Free Test'
  },
  {
    id: 'parent',
    icon: '👨‍👩‍👧',
    title: 'I am a Parent',
    description: 'I want to track my child\'s progress and fees',
    cta: 'View Child Portal'
  },
  {
    id: 'school',
    icon: '🏫',
    title: 'I own a School',
    description: 'I want LMS, teacher training, or consulting',
    cta: 'Book a Demo'
  },
  {
    id: 'corporate',
    icon: '🏢',
    title: 'I represent a Company',
    description: 'I want to train staff or partner with SAMPACE',
    cta: 'Talk to Sales'
  }
]

export default function PersonaRouter({ onNavigate }) {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sampace_persona')
    if (saved) setSelected(saved)

    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSelect = (persona) => {
    setSelected(persona.id)
    localStorage.setItem('sampace_persona', persona.id)
  }

  const handleContinue = () => {
    if (!selected) return
    const routes = {
      student: 'schools',
      parent: 'contact',
      school: 'contact',
      corporate: 'contact'
    }
    onNavigate(routes[selected] || 'schools')
  }

  return (
    <section className={`persona-router ${visible ? 'visible' : ''}`}>
      <div className="persona-header">
        <div className="badge">
          <span className="badge-dot" />
          Personalise your experience
        </div>
        <h2 className="section-title">Who are you?</h2>
        <p className="section-subtitle">
          Tell us who you are so we can show you exactly what matters.
        </p>
      </div>

      <div className="persona-grid">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            className={`persona-card ${selected === p.id ? 'selected' : ''}`}
            onClick={() => handleSelect(p)}
          >
            <div className="persona-icon">{p.icon}</div>
            <h3 className="persona-title">{p.title}</h3>
            <p className="persona-description">{p.description}</p>
            <div className="persona-cta">
              {selected === p.id ? '✓ Selected' : p.cta}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="persona-continue">
          <button className="btn btn-primary" onClick={handleContinue}>
            Continue as {
              PERSONAS.find((p) => p.id === selected)?.title.replace('I am ', '')
              .replace('I own ', '').replace('I represent ', '')
            }
            <span className="btn-arrow">→</span>
          </button>
        </div>
      )}
    </section>
  )
}
