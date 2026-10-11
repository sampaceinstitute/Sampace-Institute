import React, { useState } from 'react'
import { SUCCESS_STORIES } from '../data/successStories.js'

export default function SuccessStoriesPage({ onNavigate }) {
  const [open, setOpen] = useState(null)

  return (
    <main className="stories-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Real Learners · Real Results
        </div>
        <h1 className="page-title">Success Stories</h1>
        <p className="page-subtitle">
          From JAMB scores to tech careers to school transformations — real SAMPACE stories.
        </p>
      </div>

      <div className="stories-grid">
        {SUCCESS_STORIES.map((s) => (
          <div key={s.id} className={`story-card ${open === s.id ? 'open' : ''}`}>
            <div className="story-header">
              <div className="story-avatar">{s.avatar}</div>
              <div>
                <div className="story-name">{s.name}</div>
                <div className="story-role">{s.role} · {s.location}</div>
              </div>
            </div>

            <div className="story-highlight">
              <div className="story-stat">
                <div className="story-stat-label">Before</div>
                <div className="story-stat-value dim">{s.previousScore}</div>
              </div>
              <div className="story-arrow">→</div>
              <div className="story-stat">
                <div className="story-stat-label">After</div>
                <div className="story-stat-value gold">{s.score}</div>
              </div>
            </div>

            <p className="story-quote">"{s.quote}"</p>

            {open === s.id && (
              <div className="story-full">
                <p>{s.story}</p>
              </div>
            )}

            <button
              className="story-toggle"
              onClick={() => setOpen(open === s.id ? null : s.id)}
            >
              {open === s.id ? 'Show Less ↑' : 'Read Full Story →'}
            </button>
          </div>
        ))}
      </div>

      <div className="stories-cta">
        <h3>Your success story starts here.</h3>
        <p>Take the free diagnostic test or apply to any course.</p>
        <div className="stories-cta-buttons">
          <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
            Browse Courses →
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('apply')}>
            Apply Now
          </button>
        </div>
      </div>
    </main>
  )
}
