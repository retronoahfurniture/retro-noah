'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  animation?: 'reveal-3d' | 'reveal-left' | 'reveal-right' | 'reveal-scale'
  delay?: number      // ms before animation starts after element enters viewport
  threshold?: number  // 0–1: how much of element must be visible to trigger
}

/**
 * Wraps children in a div that plays a 3D entrance animation once the
 * element scrolls into view. Uses IntersectionObserver — no layout thrash.
 * Automatically disables animation when prefers-reduced-motion is set.
 */
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

    // Respect user motion preferences (skill UX guideline: reduced-motion)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hide element until it enters the viewport
    el.style.opacity = '0'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (!el) return
            el.style.opacity = ''      // let the animation's keyframe control opacity
            el.classList.add(animation)
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animation, delay, threshold])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
