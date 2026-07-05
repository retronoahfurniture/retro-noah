import { adminFetch } from './supabase-admin'

// Brute-force protection for the admin login, backed by Supabase so it works
// across Vercel's stateless serverless instances. Fails OPEN on any infra
// error so a DB hiccup can never lock out the real admin.

const WINDOW_MIN = 15      // sliding window length
const MAX_ATTEMPTS = 6     // failed attempts per IP within the window before lockout

export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return fwd || headers.get('x-real-ip')?.trim() || 'unknown'
}

/** Returns true if this IP has exceeded the allowed failed attempts. */
export async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const since = new Date(Date.now() - WINDOW_MIN * 60_000).toISOString()
    const res = await adminFetch(
      `/login_attempts?ip=eq.${encodeURIComponent(ip)}&created_at=gte.${since}&select=id`,
      { headers: { Prefer: 'count=exact' } }
    )
    if (!res.ok) return false // table missing / infra error → fail open
    const total = parseInt(res.headers.get('content-range')?.split('/')[1] ?? '0', 10)
    return total >= MAX_ATTEMPTS
  } catch {
    return false
  }
}

/** Record a failed attempt and prune expired rows so the table stays small. */
export async function recordFailedAttempt(ip: string): Promise<void> {
  try {
    await adminFetch('/login_attempts', {
      method: 'POST',
      body: JSON.stringify({ ip }),
      headers: { Prefer: 'return=minimal' },
    })
    const cutoff = new Date(Date.now() - WINDOW_MIN * 60_000).toISOString()
    await adminFetch(`/login_attempts?created_at=lt.${cutoff}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    })
  } catch {
    /* best-effort */
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

export const LOCKOUT_MESSAGE =
  `Too many failed attempts. Please wait ${WINDOW_MIN} minutes and try again.`
