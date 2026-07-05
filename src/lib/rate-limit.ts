import { adminFetch } from './supabase-admin'
import { MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MIN, LOCKOUT_MESSAGE } from './rate-limit-config'

// Brute-force protection for the admin login, backed by Supabase so it works
// across Vercel's stateless serverless instances. Fails OPEN on any infra
// error so a DB hiccup can never lock out the real admin.

export { MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MIN, LOCKOUT_MESSAGE }

export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return fwd || headers.get('x-real-ip')?.trim() || 'unknown'
}

async function countRecentAttempts(ip: string): Promise<number | null> {
  const since = new Date(Date.now() - LOGIN_WINDOW_MIN * 60_000).toISOString()
  const res = await adminFetch(
    `/login_attempts?ip=eq.${encodeURIComponent(ip)}&created_at=gte.${since}&select=id`,
    { headers: { Prefer: 'count=exact' } }
  )
  if (!res.ok) return null // table missing / infra error → fail open
  return parseInt(res.headers.get('content-range')?.split('/')[1] ?? '0', 10)
}

/** Returns true if this IP has exceeded the allowed failed attempts. */
export async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const count = await countRecentAttempts(ip)
    return count !== null && count >= MAX_LOGIN_ATTEMPTS
  } catch {
    return false
  }
}

/**
 * Record a failed attempt and prune expired rows.
 * Returns how many attempts this IP has made within the current window
 * (so callers can tell the user how many remain), or null on infra error.
 */
export async function recordFailedAttempt(ip: string): Promise<number | null> {
  try {
    await adminFetch('/login_attempts', {
      method: 'POST',
      body: JSON.stringify({ ip }),
      headers: { Prefer: 'return=minimal' },
    })
    const cutoff = new Date(Date.now() - LOGIN_WINDOW_MIN * 60_000).toISOString()
    await adminFetch(`/login_attempts?created_at=lt.${cutoff}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    })
    return await countRecentAttempts(ip)
  } catch {
    return null
  }
}

/** Clear an IP's attempts after a successful login. */
export async function clearAttempts(ip: string): Promise<void> {
  try {
    await adminFetch(`/login_attempts?ip=eq.${encodeURIComponent(ip)}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    })
  } catch {
    /* best-effort */
  }
}

/** Build a "wrong password, N tries left" message (or the lockout message). */
export function attemptsLeftMessage(attemptCount: number | null): string {
  if (attemptCount === null) return 'Incorrect password.'
  const remaining = Math.max(0, MAX_LOGIN_ATTEMPTS - attemptCount)
  if (remaining === 0) return LOCKOUT_MESSAGE
  const noun = remaining === 1 ? 'attempt' : 'attempts'
  return `Incorrect password — ${remaining} ${noun} left before a ${LOGIN_WINDOW_MIN}-minute lockout.`
}
