import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getStudentOverview, getMyEnrolledCourses } from '../lib/analyticsService.js'

export default function StudentDashboard({ onNavigate, isNewUser }) {
  const { user, profile } = useAuth()
  const [overview, setOverview] = useState(null)
  const [enrolled, setEnrolled] = useState([])

  useEffect(() => {
    if (!user?.id) return
    const load = async () => {
      const [o, e] = await Promise.all([
        getStudentOverview(user.id),
        getMyEnrolledCourses(user.id)
      ])
      setOverview(o.data)
      setEnrolled(e.data || [])
    }
    load()
  }, [user?.id])

  const getInitials = () => {
    const name = profile?.full_name || user?.email || ''
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name[0].toUpperCase()
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Friend'
  const formatNaira = (n) => '₦' + Math.round(n).toLocaleString('en-NG')

  const getProgrammeTitle = (app) => {
    if (app.form_type === 'school-admission') {
      return `${app.level || ''} · ${app.class_level || ''}${app.stream ? ' · ' + app.stream : ''}`.trim()
    }
    return app.course_title || app.service_label || app.course || 'Programme'
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div className="dashboard-avatar">{getInitials()}</div>
        <div className="dashboard-welcome-text">
          <div className="dashboard-role-badge">STUDENT</div>
          <h1 className="dashboard-title">Welcome back, {firstName} 👋</h1>
          <p className="dashboard-subtitle">
            {isNewUser
              ? 'Your learner journey starts here. Explore courses or take the free diagnostic test.'
              : 'Here is your SAMPACE overview.'}
          </p>
        </div>
      </div>

      {isNewUser && (
        <div className="dashboard-onboarding">
          <div className="dashboard-onboarding-icon">🎓</div>
          <div>
            <h3>Welcome to SAMPACE!</h3>
            <p>Start with these three steps to make the most of your account.</p>
          </div>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📚</div>
          <div className="dashboard-stat-number">{overview?.enrolledCourses ?? 0}</div>
          <div className="dashboard-stat-label">Enrolled Courses</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">🎯</div>
          <div className="dashboard-stat-number">{overview?.diagnosticsTaken ?? 0}</div>
          <div className="dashboard-stat-label">Diagnostics Taken</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">📝</div>
          <div className="dashboard-stat-number">{overview?.totalApplications ?? 0}</div>
          <div className="dashboard-stat-label">Applications</div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">💰</div>
          <div className="dashboard-stat-number" style={{ color: '#E5C148' }}>
            {overview ? formatNaira(overview.totalPaid) : '₦0'}
          </div>
          <div className="dashboard-stat-label">Total Paid</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-actions">
          <button className="dashboard-action-card" onClick={() => onNavigate('courses')}>
            <div className="dashboard-action-icon">🔍</div>
            <div className="dashboard-action-title">Browse Courses</div>
            <div className="dashboard-action-desc">Explore 400+ courses</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('home')}>
            <div className="dashboard-action-icon">🎯</div>
            <div className="dashboard-action-title">Diagnostic Test</div>
            <div className="dashboard-action-desc">Free readiness check</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('wallet')}>
            <div className="dashboard-action-icon">💳</div>
            <div className="dashboard-action-title">My Wallet</div>
            <div className="dashboard-action-desc">Payments & receipts</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('myApplications')}>
            <div className="dashboard-action-icon">📋</div>
            <div className="dashboard-action-title">My Applications</div>
            <div className="dashboard-action-desc">Track your activity</div>
          </button>
          <button className="dashboard-action-card" onClick={() => onNavigate('studentExams')}>
  <div className="dashboard-action-icon">📝</div>
  <div className="dashboard-action-title">CBT Exams</div>
  <div className="dashboard-action-desc">Take available tests</div>
</button>
          <button className="dashboard-action-card" onClick={() => onNavigate('studentResults')}>
  <div className="dashboard-action-icon">📊</div>
  <div className="dashboard-action-title">My Results</div>
  <div className="dashboard-action-desc">View past exam scores</div>
</button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">My Enrolled Courses</h2>
        {enrolled.length === 0 ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">📚</div>
            <p>You haven't enrolled in any courses yet.</p>
            <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
              Browse Courses →
            </button>
          </div>
        ) : (
          <div className="student-courses-list">
            {enrolled.map((app) => (
              <div key={app.id} className="student-course-card">
                <div className="student-course-info">
                  <div className="student-course-ref">{app.reference}</div>
                  <div className="student-course-title">{getProgrammeTitle(app)}</div>
                  <div className="student-course-school">{app.school_name}</div>
                </div>
                <div className="student-course-badge">ENROLLED</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
