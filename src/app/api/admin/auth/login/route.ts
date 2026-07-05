import { NextRequest, NextResponse } from 'next/server'
import { clientIp, isRateLimited, recordFailedAttempt, clearAttempts, LOCKOUT_MESSAGE } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers)

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: LOCKOUT_MESSAGE }, { status: 429 })
  }

  const { password } = await req.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    await recordFailedAttempt(ip)
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  await clearAttempts(ip)

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_session', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}
