'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { clientIp, isRateLimited, recordFailedAttempt, clearAttempts, attemptsLeftMessage, LOCKOUT_MESSAGE } from '@/lib/rate-limit'

export async function loginAction(_prev: string | null, formData: FormData): Promise<string | null> {
  const ip = clientIp(await headers())

  if (await isRateLimited(ip)) {
    return LOCKOUT_MESSAGE
  }

  const password = formData.get('password') as string

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    const attemptCount = await recordFailedAttempt(ip)
    return attemptsLeftMessage(attemptCount)
  }

  await clearAttempts(ip)

  const cookieStore = await cookies()
  cookieStore.set('admin_session', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/admin/homepage')
}
