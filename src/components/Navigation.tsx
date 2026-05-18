'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/products', label: 'Products' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isTransparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm border-b border-[#EEECE8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-text.png"
            alt="Retro Noah Furniture"
            width={110}
            height={55}
            priority
            className={`h-10 lg:h-12 w-auto object-contain transition-all duration-300 ${
              isTransparent ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200 ${
                isTransparent
                  ? pathname === href
                    ? 'text-white'
                    : 'text-white/75 hover:text-white'
                  : pathname === href
                  ? 'text-[#1A1714]'
                  : 'text-[#6B6660] hover:text-[#1A1714]'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://wa.me/27792808500"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2.5 bg-[#1A1714] text-white text-[12px] tracking-[0.1em] uppercase font-medium hover:bg-[#2D2926] transition-colors"
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-1 transition-colors ${
            isTransparent ? 'text-white' : 'text-[#1A1714]'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-white border-t border-[#EEECE8] transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[13px] tracking-[0.08em] uppercase font-medium ${
                pathname === href ? 'text-[#1A1714]' : 'text-[#6B6660]'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://wa.me/27792808500"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-5 py-3 bg-[#1A1714] text-white text-[12px] tracking-[0.1em] uppercase font-medium text-center"
          >
            Get a Quote
          </a>
        </nav>
      </div>
    </header>
  )
}
