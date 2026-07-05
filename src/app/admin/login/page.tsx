'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { Suspense } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { loginAction } from './actions'

function LoginForm() {
  const [error, formAction, isPending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)

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
            priority
          />
        </div>
        <h1 className="font-display text-3xl text-white text-center mb-2">Admin</h1>
        <p className="text-white/40 text-xs text-center tracking-[0.15em] uppercase mb-10">Retro Noah</p>

        <form action={formAction} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              autoFocus
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 pl-4 pr-11 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-white/40 hover:text-white/80 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-white text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#F8F7F4] transition-colors disabled:opacity-50"
          >
            {isPending ? 'Signing in…' : 'Sign In'}
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
