'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  animation?: 'reveal-3d' | 'reveal-left' | 'reveal-right' | 'reveal-scale'
  delay?: number
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'reveal-3d',
  delay = 0,
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Don't hide elements that are already visible in the viewport on mount —
    // hiding then relying on IntersectionObserver can cause a flash if the
    // observer fires slightly late.
    const rect = el.getBoundingClientRect()
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0

    if (!inViewport) {
      el.style.opacity = '0'
    }

    function reveal() {
      if (!el) return
      el.style.opacity = ''
      el.classList.add(animation)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(reveal, delay)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)

    // Safety net: if the observer never fires within 3 s (e.g. unusual scroll
    // position on load, layout quirk), force-reveal the element so content is
    // never permanently hidden.
    const fallback = setTimeout(() => {
      if (el.style.opacity === '0') reveal()
      observer.disconnect()
    }, 3000)

    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [animation, delay, threshold])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
