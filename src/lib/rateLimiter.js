// ============================================================
// LOGIN RATE LIMITER — client-side brute-force protection
// Not a replacement for server-side rate limiting, but a fast first layer.
// ============================================================

const STORAGE_KEY = 'sampace_login_attempts'
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function getAttempts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    const now = Date.now()
    return parsed.filter((a) => now - a.timestamp < WINDOW_MS)
  } catch {
    return []
  }
}

function setAttempts(attempts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
  } catch {}
}

export function checkRateLimit() {
  const attempts = getAttempts()
  const now = Date.now()
  const recent = attempts.filter((a) => now - a.timestamp < WINDOW_MS)

  if (recent.length >= MAX_ATTEMPTS) {
    const oldest = recent[0].timestamp
    const waitMs = WINDOW_MS - (now - oldest)
    const waitMin = Math.ceil(waitMs / 60000)
    return {
      allowed: false,
      message: `Too many login attempts. Please wait ${waitMin} minute${waitMin > 1 ? 's' : ''} before trying again.`
    }
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - recent.length }
}

export function recordFailedAttempt() {
  const attempts = getAttempts()
  attempts.push({ timestamp: Date.now() })
  setAttempts(attempts)
}

export function clearAttempts() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}
