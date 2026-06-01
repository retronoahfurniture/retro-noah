'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const from = searchParams.get('from') || '/admin/gallery'
      router.replace(from)
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1714] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-round-transparent.png"
            alt="Retro Noah"
            width={80}
            height={80}
            className="opacity-80 brightness-0 invert"
          />
        </div>
        <h1 className="font-display text-3xl text-white text-center mb-2">Admin</h1>
        <p className="text-white/40 text-xs text-center tracking-[0.15em] uppercase mb-10">Retro Noah</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#F8F7F4] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
