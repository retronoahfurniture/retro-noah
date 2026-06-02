import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1714] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/logo-round-transparent.png"
                alt="Retro Noah Furniture"
                width={180}
                height={180}
                className="h-44 w-44 object-contain brightness-0 invert opacity-90"
                style={{ transform: 'rotate(-15deg)', transformOrigin: 'center center' }}
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Handcrafted bespoke furniture made from reclaimed wood. Each piece tells a 70–100 year old story.
            </p>
            <p className="text-white/40 text-xs italic font-display text-lg">
              "Beautifully built to last"
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5 font-medium">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'Our Story' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/products', label: 'Products' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact Us' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5 font-medium">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/27795199747"
                className="flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors group"
              >
                <Phone size={14} className="mt-0.5 shrink-0 group-hover:text-[#25D366]" />
                <span>+27 79 280 8500</span>
              </a>
              <a
                href="mailto:retronoah@icloud.com"
                className="flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="mt-0.5 shrink-0" />
                <span>retronoah@icloud.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Randburg, Johannesburg<br />Gauteng, South Africa</span>
              </div>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <Clock size={14} className="mt-0.5 shrink-0" />
                <span>Mon–Fri: 08:00–16:00<br />Sat: 09:00–14:00</span>
              </div>
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5 font-medium">
              Follow Us
            </h4>
            <div className="flex gap-4 mb-8">
              <a
                href="https://www.instagram.com/retro_noah/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href="https://www.facebook.com/retronoahfurniture/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                aria-label="Facebook"
              >
                <IconFacebook />
              </a>
            </div>
            <a
              href="https://wa.me/27795199747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <Phone size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Retro Noah Furniture. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-white/20 text-xs">
              Crafted with care in Randburg, Johannesburg
            </p>
            <Link
              href="/admin"
              className="text-white/20 text-[10px] hover:text-white/50 transition-colors select-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              ·
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
