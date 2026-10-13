// ============================================================
// SAMPACE EMAIL SERVICE
// Sends emails via Cloudflare Pages Function → Resend
// ============================================================

const API_ENDPOINT = '/api/send-email'

export async function sendWelcomeEmail({ to, name }) {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'welcome', to, name })
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.warn('[Email] Welcome email failed:', err)
      return { error: err }
    }
    const data = await res.json()
    return { data }
  } catch (err) {
    console.warn('[Email] Network error:', err)
    return { error: err }
  }
}

export async function sendCustomEmail({ to, subject, html }) {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html })
    })
    const data = await res.json()
    return { data }
  } catch (err) {
    return { error: err }
  }
}
