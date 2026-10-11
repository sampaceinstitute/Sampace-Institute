import React, { useState, useEffect } from 'react'

const TESTIMONIALS = [
  {
    name: 'Chidinma O.',
    role: 'JAMB Candidate, Lagos',
    avatar: '👩🏾‍🎓',
    quote: 'I jumped from 187 to 274 in JAMB after using the SAMPACE diagnostic test. The personalised study plan showed me exactly what to fix.',
    highlight: '274 in JAMB'
  },
  {
    name: 'Mr. Adebayo K.',
    role: 'Parent, Abuja',
    avatar: '👨🏿',
    quote: 'The parent portal lets me see my daughter\'s progress weekly. I know exactly what she\'s studying and where she needs help. Worth every naira.',
    highlight: 'Weekly reports'
  },
  {
    name: 'Fatima B.',
    role: 'School Owner, Kano',
    avatar: '👩🏾‍💼',
    quote: 'We deployed the SAMPACE LMS across our 3 campuses. Our teachers save 10 hours a week. Our parents are happier than ever.',
    highlight: '3 campuses live'
  },
  {
    name: 'Emeka N.',
    role: 'Tech Student, Enugu',
    avatar: '👨🏿‍💻',
    quote: 'I learned AI and Data Analysis at SAMPACE. Within 4 months I landed a remote job paying $1,200/month. Life-changing.',
    highlight: '$1,200/month remote'
  }
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    )
    const el = document.getElementById('testimonials-section')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = TESTIMONIALS[index]

  return (
    <section id="testimonials-section" className={`testimonials ${visible ? 'visible' : ''}`}>
      <div className="section-header">
        <div className="badge">
          <span className="badge-dot" />
          Real Success Stories
        </div>
        <h2 className="section-title">What Our Learners Say</h2>
        <p className="section-subtitle">
          Thousands of students, parents, and schools trust SAMPACE.
        </p>
      </div>

      <div className="testimonial-card">
        <div className="testimonial-quote">"</div>
        <p className="testimonial-text">{current.quote}</p>

        <div className="testimonial-highlight">
          ⭐ {current.highlight}
        </div>

        <div className="testimonial-author">
          <div className="testimonial-avatar">{current.avatar}</div>
          <div>
            <div className="testimonial-name">{current.name}</div>
            <div className="testimonial-role">{current.role}</div>
          </div>
        </div>

        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
