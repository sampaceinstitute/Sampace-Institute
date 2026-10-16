import React, { useEffect, useState } from 'react'
import {
  getAdminOverview,
  getApplicationsByStatus,
  getApplicationsBySchool,
  getRevenueByDay,
  getTopCourses
} from '../lib/analyticsService.js'

export default function AdminAnalyticsPage({ onNavigate }) {
  const [overview, setOverview] = useState(null)
  const [statusData, setStatusData] = useState([])
  const [schoolData, setSchoolData] = useState([])
  const [revenueData, setRevenueData] = useState([])
  const [topCourses, setTopCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [o, s, sch, r, tc] = await Promise.all([
        getAdminOverview(),
        getApplicationsByStatus(),
        getApplicationsBySchool(),
        getRevenueByDay(14),
        getTopCourses(8)
      ])
      setOverview(o.data)
      setStatusData(s.data || [])
      setSchoolData(sch.data || [])
      setRevenueData(r.data || [])
      setTopCourses(tc.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const formatNaira = (n) => '₦' + Math.round(n).toLocaleString('en-NG')

  const statusColors = {
    submitted: '#E5C158',
    under_review: '#22d3ee',
    approved: '#4ade80',
    enrolled: '#22c55e',
    waitlisted: '#a78bfa',
    unsuccessful: '#f87171',
    action_required: '#fb923c',
    draft: '#a1a1aa',
    withdrawn: '#a1a1aa'
  }

  const maxRevenue = Math.max(...revenueData.map((d) => d.amount), 1)
  const maxSchoolCount = Math.max(...schoolData.map((s) => s.count), 1)

  if (loading) {
    return (
      <main className="admin-apps-page">
        <div className="loading-state"><div className="loading-spinner" /><p>Loading analytics...</p></div>
      </main>
    )
  }

  return (
    <main className="admin-analytics-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Admin · Analytics</div>
        <h1 className="page-title">Business Intelligence</h1>
        <p className="page-subtitle">Real-time metrics from your platform.</p>
      </div>

      {/* Top stats */}
      {overview && (
        <div className="admin-app-stats" style={{ marginBottom: '2.5rem' }}>
          <div className="admin-app-stat">
            <div className="admin-app-stat-num">{overview.totalUsers}</div>
            <div className="admin-app-stat-label">Total Users</div>
          </div>
          <div className="admin-app-stat">
            <div className="admin-app-stat-num" style={{ color: '#E5C158' }}>{overview.totalApplications}</div>
            <div className="admin-app-stat-label">Applications</div>
          </div>
          <div className="admin-app-stat">
            <div className="admin-app-stat-num" style={{ color: '#4ade80' }}>{overview.totalEnrollments}</div>
            <div className="admin-app-stat-label">Enrolled</div>
          </div>
          <div className="admin-app-stat">
            <div className="admin-app-stat-num" style={{ color: '#E5C158' }}>{formatNaira(overview.totalRevenue)}</div>
            <div className="admin-app-stat-label">Total Revenue</div>
          </div>
        </div>
      )}

      {/* Revenue Chart */}
      <section className="analytics-section">
        <h2 className="analytics-section-title">Revenue · Last 14 Days</h2>
        {revenueData.length === 0 || maxRevenue <= 1 ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">📊</div>
            <p>No revenue yet. Payments will appear here.</p>
          </div>
        ) : (
          <div className="revenue-chart">
            {revenueData.map((d) => {
              const height = (d.amount / maxRevenue) * 100
              return (
                <div key={d.date} className="revenue-bar-wrapper" title={`${d.date}: ${formatNaira(d.amount)}`}>
                  <div className="revenue-bar" style={{ height: `${height}%` }}>
                    <span className="revenue-bar-value">
                      {d.amount > 0 ? formatNaira(d.amount).replace('₦', '') : ''}
                    </span>
                  </div>
                  <div className="revenue-bar-label">
                    {new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).replace(' ', '\u00A0')}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Two-column: Status + Top Courses */}
      <div className="analytics-two-col">
        <section className="analytics-section">
          <h2 className="analytics-section-title">Applications by Status</h2>
          {statusData.length === 0 ? (
            <p className="analytics-empty-text">No applications yet.</p>
          ) : (
            <div className="analytics-list">
              {statusData.map((s) => (
                <div key={s.status} className="analytics-list-row">
                  <div className="analytics-list-label">
                    <span
                      className="analytics-dot"
                      style={{ background: statusColors[s.status] || '#a1a1aa' }}
                    />
                    {s.status.replace(/_/g, ' ')}
                  </div>
                  <div className="analytics-list-value">{s.count}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="analytics-section">
          <h2 className="analytics-section-title">Top Courses</h2>
          {topCourses.length === 0 ? (
            <p className="analytics-empty-text">No course data yet.</p>
          ) : (
            <div className="analytics-list">
              {topCourses.map((c) => (
                <div key={c.course} className="analytics-list-row">
                  <div className="analytics-list-label">{c.course}</div>
                  <div className="analytics-list-value">{c.count}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Applications by School */}
      <section className="analytics-section">
        <h2 className="analytics-section-title">Applications by School</h2>
        {schoolData.length === 0 ? (
          <p className="analytics-empty-text">No school data yet.</p>
        ) : (
          <div className="analytics-bars">
            {schoolData.map((s) => {
              const width = (s.count / maxSchoolCount) * 100
              return (
                <div key={s.school_name} className="analytics-bar-row">
                  <div className="analytics-bar-label">{s.school_name}</div>
                  <div className="analytics-bar-track">
                    <div className="analytics-bar-fill" style={{ width: `${width}%` }} />
                  </div>
                  <div className="analytics-bar-value">{s.count}</div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
