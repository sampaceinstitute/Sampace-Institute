import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function StudentInboxPage({ onNavigate }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('student_messages').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setMessages(data || [])
      setLoading(false)
    }
    load()
  }, [user.id])

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Student · Inbox</div>
        <h1 className="page-title">My Messages</h1>
        <p className="page-subtitle">Announcements and messages from your instructors.</p>
      </div>

      <div className="my-list">
        {loading ? <div className="loading-state"><div className="loading-spinner" /></div> : messages.length === 0 ? (
          <div className="dashboard-empty"><div className="dashboard-empty-icon">📩</div><p>Your inbox is empty.</p></div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="my-card">
              <div className="my-card-header">
                <div className="my-card-reference">From: {msg.sender_name}</div>
                <div className="my-card-status" style={{ borderColor: msg.is_read ? 'var(--border)' : 'var(--gold)', color: msg.is_read ? 'var(--text-soft)' : 'var(--gold)' }}>
                  {msg.is_read ? 'READ' : 'NEW'}
                </div>
              </div>
              <h3 className="my-card-title">{msg.subject}</h3>
              <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{msg.body}</p>
              <div className="my-card-meta" style={{ marginTop: '1rem' }}><div>📅 {new Date(msg.created_at).toLocaleString('en-GB')}</div></div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
