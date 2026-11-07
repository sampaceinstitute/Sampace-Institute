import React, { useState, useEffect } from 'react'

const PERSONAS = [
  {
    id: 'student',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
    title: 'I am a Student',
    description: 'I want to pass JAMB, WAEC, or learn a new tech skill.',
    cta: 'Start Free Test'
  },
  {
    id: 'parent',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=600&auto=format&fit=crop',
    title: 'I am a Parent',
    description: 'I want to track my child\'s academic progress and fees.',
    cta: 'View Child Portal'
  },
  {
    id: 'school',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    title: 'I own a School',
    description: 'I need a management system, LMS, or teacher training.',
    cta: 'Book a Demo'
  },
  {
    id: 'corporate',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
    title: 'I represent a Company',
    description: 'I want to train staff or partner with SAMPACE.',
    cta: 'Talk to Sales'
  }
]

export default function PersonaRouter({ onNavigate }) {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSelect = (persona) => {
    setSelected(persona.id)
  }

  const handleContinue = () => {
    if (!selected) return
    const routes = { student: 'schools', parent: 'contact', school: 'forSchools', corporate: 'contact' }
    onNavigate(routes[selected] || 'schools')
  }

  return (
    <section style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge" style={{ background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
          <span className="badge-dot" style={{ background: '#10B981' }} />
          Personalise your experience
        </div>
        <h2 className="section-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#064E3B', marginTop: '1rem' }}>
          Who are you?
        </h2>
        <p className="section-subtitle" style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
          Tell us who you are so we can show you exactly what matters to you.
        </p>
      </div>

      <div className="persona-grid">
        {PERSONAS.map((p) => (
          <div
            key={p.id}
            className="persona-card"
            onClick={() => handleSelect(p)}
            style={{ borderColor: selected === p.id ? '#10B981' : '#E2E8F0', boxShadow: selected === p.id ? '0 0 0 2px #10B981' : 'none' }}
          >
            <img src={p.image} alt={p.title} className="persona-image" />
            <div className="persona-content">
              <h3 className="persona-title">{p.title}</h3>
              <p className="persona-desc">{p.description}</p>
              <div className="persona-cta">
                {selected === p.id ? '✓ Selected' : p.cta}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', animation: 'fadeInUp 0.5s ease' }}>
          <button className="btn-premium btn-premium-primary" onClick={handleContinue}>
            Continue →
          </button>
        </div>
      )}
    </section>
  )
}
