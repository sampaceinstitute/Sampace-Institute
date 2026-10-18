import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function AdminMessagesPage({ onNavigate }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      setMessages(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="admin-apps-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>← Back to Dashboard</button>
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Admin</div>
        <h1 className="page-title">Inbox</h1>
        <p className="page-subtitle">Messages from the contact form.</p>
      </div>
      
      {loading ? <div className="loading-state"><div className="loading-spinner" /></div> : (
        <div className="my-list">
          {messages.length === 0 ? (
            <p className="analytics-empty-text">No messages yet.</p>
          ) : messages.map(m => (
            <div key={m.id} className="my-card">
              <div className="my-card-header">
                <div className="my-card-reference">{m.email}</div>
                <div className="my-card-status" style={{ borderColor: '#E5C158', color: '#E5C158' }}>{m.status.toUpperCase()}</div>
              </div>
              <h3 className="my-card-title">{m.subject || 'No Subject'}</h3>
              <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{m.message}</p>
              <div className="my-card-meta" style={{ marginTop: '1rem' }}>
                <div>👤 From: {m.name}</div>
                <div>📅 {new Date(m.created_at).toLocaleString('en-GB')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
