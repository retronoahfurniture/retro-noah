'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

async function logout() {
  try {
    await fetch('/api/admin/auth/logout', { method: 'POST', keepalive: true })
  } catch {
    // best-effort
  }
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const prevPathRef = useRef(pathname)

  // Auto-logout when navigating from any admin route to a public route
  useEffect(() => {
    const wasAdmin = prevPathRef.current.startsWith('/admin')
    const nowAdmin = pathname.startsWith('/admin')
    if (wasAdmin && !nowAdmin) {
      logout()
    }
    prevPathRef.current = pathname
  }, [pathname])

  // Auto-logout when the tab is closed or the user navigates away from the site
  useEffect(() => {
    if (!isAdmin) return
    window.addEventListener('beforeunload', logout)
    return () => window.removeEventListener('beforeunload', logout)
  }, [isAdmin])

  return (
    <>
      {!isAdmin && <Navigation />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  )
}
