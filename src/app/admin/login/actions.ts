'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = formData.get('password') as string

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return 'Incorrect password.'
  }

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
