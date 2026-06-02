'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Images, Package, LogOut, Home, LayoutTemplate } from 'lucide-react'

const navItems = [
  { href: '/admin/homepage', label: 'Homepage',  icon: LayoutTemplate },
  { href: '/admin/gallery',  label: 'Gallery',   icon: Images          },
  { href: '/admin/products', label: 'Products',  icon: Package         },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  async function handleHome() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <aside className="w-56 shrink-0 bg-[#1A1714] text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div className="p-6 border-b border-white/10">
        <Image
          src="/logo-round-transparent.png"
          alt="Retro Noah"
          width={40}
          height={40}
          className="brightness-0 invert opacity-80 mb-3"
        />
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Admin Panel</p>
        <p className="font-display text-lg text-white/90">Retro Noah</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button
          onClick={handleHome}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <Home size={15} />
          Home
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
