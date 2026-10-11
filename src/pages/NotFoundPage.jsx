import React from 'react'

export default function NotFoundPage({ onNavigate }) {
  return (
    <main className="not-found-page">
      <div className="not-found-inner">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-subtitle">
          The page you're looking for doesn't exist — or it may have moved.
        </p>
        <div className="not-found-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('home')}>
            Go Home
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('courses')}>
            Browse Courses
          </button>
        </div>
      </div>
    </main>
  )
}
