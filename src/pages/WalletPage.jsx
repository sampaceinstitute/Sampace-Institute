import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getUserApplications } from '../lib/dataService.js'
import { getUserPayments, createPaymentRecord, markPaymentSuccess, markPaymentFailed, generatePaymentReference, openPaystackPopup, isPaystackConfigured } from '../lib/paymentService.js'
import { getPrice, formatNaira } from '../data/prices.js'

export default function WalletPage({ onNavigate }) {
  const { user, profile } = useAuth()
  const [applications, setApplications] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(null)
  const [message, setMessage] = useState(null)

  const loadData = async () => {
    if (!user?.id) return
    const [appsRes, paysRes] = await Promise.all([
      getUserApplications(user.id),
      getUserPayments(user.id)
    ])
    setApplications(appsRes.data || [])
    setPayments(paysRes.data || [])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [user?.id])

  const getApplicationPrice = (app) => {
    // Determine price based on form type and content
    if (app.form_type === 'school-admission') {
      return getPrice(app.class_level)
    }
    if (app.form_type === 'service-request' || app.form_type === 'consulting-request') {
      return getPrice(app.service_label)
    }
    return getPrice(app.course_title || app.course)
  }

  const isPaid = (app) => {
    return payments.some((p) =>
      p.application_id === app.id && p.status === 'success'
    )
  }

  const hasPendingPayment = (app) => {
    return payments.some((p) =>
      p.application_id === app.id && p.status === 'pending'
    )
  }

  const handlePay = async (app) => {
    setMessage(null)
    setPaying(app.id)

    const price = getApplicationPrice(app)
    if (price <= 0) {
      setMessage({ type: 'error', text: 'This item is free or requires custom pricing — our team will contact you.' })
      setPaying(null)
      return
    }

    if (!isPaystackConfigured()) {
      setMessage({ type: 'error', text: 'Paystack is not configured. Contact support.' })
      setPaying(null)
      return
    }

    const reference = generatePaymentReference()

    // 1. Create pending payment record
    const recordRes = await createPaymentRecord({
      userId: user.id,
      applicationId: app.id,
      reference,
      amount: price,
      purpose: app.form_type === 'school-admission' ? 'school_fee' : 'course_fee',
      description: `${app.school_name} — ${app.course_title || app.service_label || app.class_level || 'Programme'}`
    })

    if (recordRes.error) {
      setMessage({ type: 'error', text: 'Could not initiate payment. Please try again.' })
      setPaying(null)
      return
    }

    // 2. Open Paystack popup
    try {
      await openPaystackPopup({
        email: user.email,
        amount: price,
        reference,
        metadata: {
          applicationId: app.id,
          applicantName: profile?.full_name || '',
          school: app.school_name,
          programme: app.course_title || app.service_label || app.class_level
        },
        onSuccess: async (response) => {
          // Mark payment success
          await markPaymentSuccess(reference, response.reference, response)
          setMessage({ type: 'success', text: `Payment successful! Reference: ${reference}` })
          setPaying(null)
          loadData()
        },
        onClose: async () => {
          // User closed without paying
          await markPaymentFailed(reference)
          setMessage({ type: 'error', text: 'Payment cancelled.' })
          setPaying(null)
        }
      })
    } catch (err) {
      console.warn('[Paystack] error:', err)
      setMessage({ type: 'error', text: 'Could not open Paystack. Check your connection.' })
      setPaying(null)
    }
  }

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <main className="wallet-page">
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />My Wallet</div>
        <h1 className="page-title">Wallet & Payments</h1>
        <p className="page-subtitle">Pay for courses, schools, and services. Track every transaction.</p>
      </div>

      {message && (
        <div className={message.type === 'success' ? 'auth-success-banner' : 'auth-error'} style={{ marginBottom: '1.5rem' }}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="loading-state"><div className="loading-spinner" /><p>Loading...</p></div>
      ) : (
        <>
          {/* Pending Payments */}
          <section className="wallet-section">
            <h2 className="wallet-section-title">Outstanding Payments</h2>
            {applications.filter((a) => !isPaid(a)).length === 0 ? (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">✅</div>
                <p>You have no outstanding payments. Everything is settled.</p>
                <button className="btn btn-primary" onClick={() => onNavigate('courses')}>Browse Courses →</button>
              </div>
            ) : (
              <div className="wallet-list">
                {applications.filter((a) => !isPaid(a)).map((app) => {
                  const price = getApplicationPrice(app)
                  const pending = hasPendingPayment(app)
                  return (
                    <div key={app.id} className="wallet-card">
                      <div className="wallet-card-info">
                        <div className="wallet-card-ref">{app.reference}</div>
                        <div className="wallet-card-title">{app.school_name}</div>
                        <div className="wallet-card-desc">
                          {app.course_title || app.service_label || `${app.level || ''} · ${app.class_level || ''}`.trim() || app.course || '—'}
                        </div>
                      </div>
                      <div className="wallet-card-price">
                        <div className="wallet-price-value">{formatNaira(price)}</div>
                        {price > 0 && (
                          <button
                            className="btn btn-primary wallet-pay-btn"
                            onClick={() => handlePay(app)}
                            disabled={paying === app.id}
                          >
                            {paying === app.id ? 'Opening...' : pending ? 'Complete Payment' : 'Pay Now →'}
                          </button>
                        )}
                        {price === -1 && <div className="wallet-contact-us">Contact us</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Payment History */}
          <section className="wallet-section">
            <h2 className="wallet-section-title">Payment History</h2>
            {payments.length === 0 ? (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">💳</div>
                <p>No transactions yet. Pay for a course to see it here.</p>
              </div>
            ) : (
              <div className="wallet-history">
                {payments.map((p) => (
                  <div key={p.id} className="wallet-history-row">
                    <div className="wallet-history-left">
                      <div className="wallet-history-ref">{p.reference}</div>
                      <div className="wallet-history-desc">{p.description || p.purpose || '—'}</div>
                      <div className="wallet-history-date">{formatDate(p.created_at)}</div>
                    </div>
                    <div className="wallet-history-right">
                      <div className="wallet-history-amount">₦{(p.amount / 100).toLocaleString('en-NG')}</div>
                      <div className={`wallet-status wallet-status-${p.status}`}>
                        {p.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}
