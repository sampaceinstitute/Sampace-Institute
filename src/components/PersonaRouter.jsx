import React, { useState } from 'react'

const PERSONAS = [
  {
    id: 'student',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop', // African students studying
    label: 'FOR LEARNERS',
    title: 'I am a Student',
    description: 'Prepare for JAMB, WAEC, or master a new tech skill.',
    actionText: 'Start Learning'
  },
  {
    id: 'parent',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1200&auto=format&fit=crop', // Parent helping child
    label: 'FOR GUARDIANS',
    title: 'I am a Parent',
    description: 'Monitor your child\'s academic progress and fees.',
    actionText: 'View Portal'
  },
  {
    id: 'school',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop', // Professional school admin
    label: 'FOR INSTITUTIONS',
    title: 'I Own a School',
    description: 'Deploy an LMS, manage fees, and train your teachers.',
    actionText: 'Book a Demo'
  },
  {
    id: 'corporate',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop', // Corporate meeting
    label: 'FOR BUSINESSES',
    title: 'I Represent a Company',
    description: 'Upskill your staff or partner with SAMPACE.',
    actionText: 'Talk to Sales'
  }
]

export default function PersonaRouter({ onNavigate }) {
  const handleAction = (id) => {
    const routes = { 
      student: 'schools', 
      parent: 'contact', 
      school: 'forSchools', 
      corporate: 'contact' 
    }
    onNavigate(routes[id] || 'schools')
  }

  return (
    <section className="persona-section">
      <div className="persona-header">
        <span className="persona-eyebrow">PERSONALISE YOUR EXPERIENCE</span>
        <h2 className="persona-heading">Who are you?</h2>
        <p className="persona-subheading">
          Select your profile so we can direct you to the exact tools and resources you need.
        </p>
      </div>

      <div className="persona-grid-premium">
        {PERSONAS.map((p) => (
          <div 
            key={p.id} 
            className="persona-panel" 
            onClick={() => handleAction(p.id)}
          >
            {/* Background Image */}
            <div 
              className="persona-bg" 
              style={{ backgroundImage: `url(${p.image})` }}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="persona-overlay" />
            
            {/* Content */}
            <div className="persona-panel-content">
              <span className="persona-panel-label">{p.label}</span>
              <h3 className="persona-panel-title">{p.title}</h3>
              <p className="persona-panel-desc">{p.description}</p>
              
              <div className="persona-panel-cta">
                {p.actionText} 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
