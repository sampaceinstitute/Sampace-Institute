import React, { useState } from 'react'
import { EVENTS, EVENT_TYPES } from '../data/events.js'
import { SITE } from '../constants.js'

export default function EventsPage() {
  const [type, setType] = useState('All')

  const filtered = type === 'All' ? EVENTS : EVENTS.filter((e) => e.type === type)

  const handleRegister = (evt) => {
    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n` +
      `I want to register for:\n\n` +
      `🎯 ${evt.title}\n` +
      `📅 ${evt.date} · ${evt.time}\n` +
      `📍 ${evt.location}\n` +
      `💰 ${evt.price}\n\n` +
      `Please send me the registration details.`
    )
    window.open(`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
  }

  return (
    <main className="events-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          {EVENTS.length} Upcoming Events
        </div>
        <h1 className="page-title">Events & Webinars</h1>
        <p className="page-subtitle">
          Bootcamps, workshops, hackathons, and open days — join us live.
        </p>
      </div>

      <div className="blog-categories" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
        {EVENT_TYPES.map((t) => (
          <button
            key={t}
            className={`category-pill ${type === t ? 'active' : ''}`}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filtered.map((evt) => (
          <div key={evt.id} className="event-card">
            <div className="event-card-header">
              <div className="event-type-badge">{evt.type}</div>
              <div className="event-date-badge">
                {new Date(evt.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </div>
            </div>

            <h3 className="event-title">{evt.title}</h3>
            <p className="event-description">{evt.description}</p>

            <ul className="event-highlights">
              {evt.highlights.map((h, i) => (
                <li key={i}>
                  <span className="course-dot" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="event-meta">
              <div className="event-meta-row">📅 {evt.date} · {evt.time}</div>
              <div className="event-meta-row">⏱ {evt.duration}</div>
              <div className="event-meta-row">📍 {evt.location}</div>
              <div className="event-meta-row">💰 {evt.price}</div>
            </div>

            <div className="event-seats">
              <div className="seats-bar">
                <div
                  className="seats-fill"
                  style={{ width: `${((evt.seats - evt.seatsLeft) / evt.seats) * 100}%` }}
                />
              </div>
              <span className="seats-label">
                <strong>{evt.seatsLeft}</strong> of {evt.seats} seats left
              </span>
            </div>

            <button className="btn btn-primary event-cta" onClick={() => handleRegister(evt)}>
              {evt.cta} →
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
