import React, { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getAllPayments } from '../lib/paymentService.js'

const statusColor = (status) => {
  const map = { pending: '#E5C158', success: '#4ade80', failed: '#f87171', abandoned: '#a1a1aa' }
  return map[status] || '#E5C158'
}

export default function AdminPaymentsPage({ onNavigate }) {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await getAllPayments()
      setPayments(res.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return payments.filter((p) => {
      if (filterStatus !== 'all' && p.status !== filterStatus) return false
      if (q) {
        const hay = `${p.reference} ${p.paystack_reference} ${p.description}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [payments, filterStatus, search])

  const stats = useMemo(() => {
    const success = payments.filter((p) => p.status === 'success')
    const pending = payments.filter((p) => p.status === 'pending')
    const totalRevenue = success.reduce((s, p) => s + p.amount, 0) / 100
    return {
      total: payments.length,
      success: success.length,
      pending: pending.length,
      revenue: totalRevenue
    }
  }, [payments])

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>

      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Admin · Payments</div>
        <h1 className="page-title">Payments</h1>
        <p className="page-subtitle">Every transaction on the platform.</p>
      </div>

      <div className="admin-app-stats">
        <div className="admin-app-stat">
          <div className="admin-app-stat-num">{stats.total}</div>
          <div className="admin-app-stat-label">Total Transactions</div>
        </div>
        <div className="admin-app-stat">
          <div className="admin-app-stat-num" style={{ color: '#4ade80' }}>{stats.success}</div>
          <div className="admin-app-stat-label">Successful</div>
        </div>
        <div className="admin-app-stat">
          <div className="admin-app-stat-num" style={{ color: '#E5C158' }}>{stats.pending}</div>
          <div className="admin-app-stat-label">Pending</div>
        </div>
        <div className="admin-app-stat">
          <div className="admin-app-stat-num" style={{ color: '#E5C158' }}>₦{stats.revenue.toLocaleString('en-NG')}</div>
          <div className="admin-app-stat-label">Revenue</div>
        </div>
      </div>

      <div className="admin-app-filters">
        <input type="text" className="search-input" placeholder="Search by reference..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="abandoned">Abandoned</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state"><div className="loading-spinner" /><p>Loading...</p></div>
      ) : filtered.length === 0 ? (
        <div className="dashboard-empty">
          <div className="dashboard-empty-icon">💳</div>
          <p>No payments match your filters.</p>
        </div>
      ) : (
        <div className="admin-app-table">
          <div className="admin-app-table-head" style={{ gridTemplateColumns: '1.2fr 2fr 1fr 1fr 1.2fr' }}>
            <div>Reference</div>
            <div>Description</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Date</div>
          </div>
          {filtered.map((p) => (
            <div key={p.id} className="admin-app-row" style={{ gridTemplateColumns: '1.2fr 2fr 1fr 1fr 1.2fr' }}>
              <div className="admin-app-ref">{p.reference}</div>
              <div className="admin-app-school">{p.description || p.purpose || '—'}</div>
              <div className="admin-app-ref">₦{(p.amount / 100).toLocaleString('en-NG')}</div>
              <div className="admin-app-status-cell">
                <span className="my-card-status" style={{ color: statusColor(p.status), borderColor: statusColor(p.status) }}>
                  {p.status.toUpperCase()}
                </span>
              </div>
              <div className="admin-app-date">{formatDate(p.created_at)}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
