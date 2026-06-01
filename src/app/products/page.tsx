'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type ProductData = {
  id: string | number
  name: string
  category: string
  range: string
  range_label?: string
  rangeLabel?: string
  description: string
  sizes: string[]
  price_from?: number
  price_to?: number
  priceFrom?: number
  priceTo?: number
  image_url?: string
  image?: string
  featured: boolean
  is_new?: boolean
}

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'dining-table', label: 'Dining Tables' },
  { id: 'coffee-table', label: 'Coffee Tables' },
  { id: 'side-table', label: 'Side Tables' },
  { id: 'bench', label: 'Benches' },
  { id: 'server-sideboard', label: 'Sideboards' },
  { id: 'outdoor-table', label: 'Outdoor' },
  { id: 'bathroom-vanity', label: 'Bathroom' },
  { id: 'other', label: 'Other' },
]

const ranges = [
  { id: 'all', label: 'All Ranges' },
  { id: 'harvest', label: 'Harvest Range' },
  { id: 'farmhouse', label: 'Farmhouse Range' },
  { id: 'industrial', label: 'Industrial Range' },
]

const BASE = 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn'

const products = [
  {
    id: 1,
    name: 'Harvest Dining Table',
    category: 'dining-table',
    range: 'harvest',
    rangeLabel: 'Harvest Range',
    description:
      'Classic French Country dining table crafted from reclaimed Oregon pine. Natural oak wash, turned or pedestal legs, available 4–16 seaters.',
    priceFrom: 6000,
    priceTo: 18000,
    sizes: ['4-seater', '6-seater', '8-seater', '10-seater', '12-seater', '14-seater', '16-seater'],
    image: `${BASE}/dining-tables/dt-06.png`,
    featured: true,
  },
  {
    id: 2,
    name: 'Farmhouse Dining Table',
    category: 'dining-table',
    range: 'farmhouse',
    rangeLabel: 'Farmhouse Range',
    description:
      'Organic and rustic. Reclaimed Baltic fir with aged walnut or French oak wash finish. Available with matching bench set.',
    priceFrom: 6000,
    priceTo: 16000,
    sizes: ['4-seater', '6-seater', '8-seater', '10-seater'],
    image: `${BASE}/dining-tables/dt-23.jpg`,
    featured: true,
  },
  {
    id: 3,
    name: 'Reclaimed Wood Dining Table',
    category: 'dining-table',
    range: 'industrial',
    rangeLabel: 'Industrial Range',
    description:
      'Bold and architectural. Reclaimed wood top on a solid base — built for families who gather around the table.',
    priceFrom: 10000,
    priceTo: 18000,
    sizes: ['6-seater', '8-seater', '10-seater', '12-seater', '14-seater', '16-seater'],
    image: `${BASE}/dining-tables/dt-27.jpg`,
    featured: true,
  },
  {
    id: 4,
    name: 'Reclaimed Coffee Table',
    category: 'coffee-table',
    range: 'harvest',
    rangeLabel: 'Harvest Range',
    description:
      'Reclaimed Oregon pine coffee table with natural finish. The centrepiece your living room deserves.',
    priceFrom: 3000,
    priceTo: 8000,
    sizes: ['Small', 'Medium', 'Large'],
    image: `${BASE}/coffee-tables/ct-01.png`,
    featured: false,
  },
  {
    id: 5,
    name: 'Reclaimed Side Table',
    category: 'side-table',
    range: 'harvest',
    rangeLabel: 'Harvest Range',
    description:
      'Solid reclaimed wood side table. Clean lines, natural warmth — perfect beside a sofa or bed. Priced per unit.',
    priceFrom: 3500,
    priceTo: 5000,
    sizes: ['Standard'],
    image: `${BASE}/side-tables/st-01.jpg`,
    featured: false,
  },
  {
    id: 6,
    name: 'Farmhouse Dining Bench',
    category: 'bench',
    range: 'farmhouse',
    rangeLabel: 'Farmhouse Range',
    description:
      'Built to match your dining table. Same dimensions, same finish — a seamless addition to your set.',
    priceFrom: 3000,
    priceTo: 5000,
    sizes: ['1.2m', '1.5m', '1.8m', '2.0m'],
    image: `${BASE}/benches/b-02.png`,
    featured: false,
  },
  {
    id: 7,
    name: 'Reclaimed Wood Sideboard',
    category: 'server-sideboard',
    range: 'harvest',
    rangeLabel: 'Harvest Range',
    description:
      'A beautifully crafted sideboard for your dining room. French oak wash finish, ample storage and shelving.',
    priceFrom: 8000,
    priceTo: 14000,
    sizes: ['1.2m', '1.5m', '1.8m'],
    image: `${BASE}/sideboards/sb-04.jpg`,
    featured: false,
  },
  {
    id: 8,
    name: 'Outdoor Dining Table',
    category: 'outdoor-table',
    range: 'harvest',
    rangeLabel: 'Harvest Range',
    description:
      'Built for the outdoors. UV-resistant sealant on solid reclaimed wood. Perfect for entertaining.',
    priceFrom: 7000,
    priceTo: 14000,
    sizes: ['4-seater', '6-seater', '8-seater'],
    image: `${BASE}/outdoor/out-01.jpg`,
    featured: false,
  },
  {
    id: 9,
    name: 'Bathroom Vanity',
    category: 'bathroom-vanity',
    range: 'farmhouse',
    rangeLabel: 'Farmhouse Range',
    description:
      'Transform your bathroom. Reclaimed wood vanity — organic, earthy, and stunning in any bathroom setting.',
    priceFrom: 5000,
    priceTo: 12000,
    sizes: ['600mm', '800mm', '1000mm', '1200mm'],
    image: `${BASE}/vanities/v-13.jpg`,
    featured: true,
  },
  {
    id: 10,
    name: 'Mudroom Storage Unit',
    category: 'other',
    range: 'industrial',
    rangeLabel: 'Industrial Range',
    description:
      'A fully custom mudroom unit built to your exact space. Reclaimed wood shelving, hooks, and storage in one beautiful piece.',
    priceFrom: 8000,
    priceTo: 16000,
    sizes: ['Custom'],
    image: `${BASE}/mudroom/mu-02.jpg`,
    featured: false,
  },
]

function formatPrice(from: number, to: number) {
  const fmt = (n: number) =>
    n >= 1000 ? `R${(n / 1000).toFixed(0)}k` : `R${n.toLocaleString()}`
  if (from === to) return fmt(from)
  return `${fmt(from)} – ${fmt(to)}`
}

function normalise(p: ProductData) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    range: p.range,
    rangeLabel: p.range_label ?? p.rangeLabel ?? p.range,
    description: p.description,
    sizes: p.sizes,
    priceFrom: p.price_from ?? p.priceFrom ?? 0,
    priceTo: p.price_to ?? p.priceTo ?? 0,
    image: p.image_url ?? p.image ?? '',
    featured: p.featured,
    is_new: p.is_new ?? false,
  }
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeRange, setActiveRange] = useState('all')
  const [productList, setProductList] = useState(products.map(normalise))
  const gridRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProductList(data.map(normalise))
      })
      .catch(() => {})
  }, [])

  const filtered = productList.filter((p) => {
    const catMatch = activeCategory === 'all' || p.category === activeCategory
    const rangeMatch = activeRange === 'all' || p.range === activeRange
    return catMatch && rangeMatch
  })

  // Staggered scroll reveal for product cards
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.product-card'))
    cards.forEach((el) => {
      el.classList.remove('reveal-3d')
      el.style.opacity = '0'
    })

    if (observerRef.current) observerRef.current.disconnect()

    let idx = 0
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = (idx % 3) * 100
            idx++
            setTimeout(() => {
              el.style.opacity = ''
              el.classList.add('reveal-3d')
            }, delay)
            observerRef.current?.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )

    cards.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [filtered, productList])

  return (
    <>
      {/* HEADER */}
      <section className="pt-32 pb-12 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">What We Make</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">Products</h1>
          <p className="text-[#6B6660] text-sm mt-4 max-w-xl">
            Every piece is handcrafted to order. Browse our offering and contact us to begin building yours.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-[#EEECE8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          {/* Category filter */}
          <div className="flex gap-5 overflow-x-auto hide-scrollbar mb-3">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`shrink-0 text-[11px] tracking-[0.12em] uppercase font-medium pb-1 border-b transition-all ${
                  activeCategory === id
                    ? 'border-[#1A1714] text-[#1A1714]'
                    : 'border-transparent text-[#6B6660] hover:text-[#1A1714]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Range filter */}
          <div className="flex gap-3 flex-wrap">
            {ranges.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveRange(id)}
                className={`text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 border transition-all ${
                  activeRange === id
                    ? 'bg-[#1A1714] border-[#1A1714] text-white'
                    : 'border-[#EEECE8] text-[#6B6660] hover:border-[#1A1714] hover:text-[#1A1714]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl italic text-[#6B6660]">No products match that filter.</p>
              <p className="text-[#6B6660] text-sm mt-2">Try a different combination or contact us for a custom order.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <div key={product.id} className="product-card lift-hover group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F7F4] mb-5 img-hover-zoom">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {product.is_new && (
                        <span className="bg-[#8B7355] text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">
                          New
                        </span>
                      )}
                      {product.featured && (
                        <span className="bg-[#1A1714] text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-1.5">{product.rangeLabel}</p>
                    <h3 className="font-display text-2xl mb-2">{product.name}</h3>
                    <p className="text-[#6B6660] text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.sizes.slice(0, 4).map((size) => (
                        <span
                          key={size}
                          className="text-[9px] tracking-[0.1em] uppercase border border-[#EEECE8] px-2 py-1 text-[#6B6660]"
                        >
                          {size}
                        </span>
                      ))}
                      {product.sizes.length > 4 && (
                        <span className="text-[9px] tracking-[0.1em] uppercase border border-[#EEECE8] px-2 py-1 text-[#6B6660]">
                          +{product.sizes.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xl text-[#1A1714]">
                        {formatPrice(product.priceFrom, product.priceTo)}
                      </p>
                      <a
                        href={`https://wa.me/27792808500?text=Hi%20Retro%20Noah%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(product.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] tracking-[0.1em] uppercase font-medium text-[#1A1714] flex items-center gap-1.5 hover:gap-3 transition-all border-b border-[#1A1714] pb-0.5"
                      >
                        Enquire <ArrowRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="py-16 lg:py-20 bg-[#1A1714] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-4">Custom Orders</p>
          <h2 className="font-display text-3xl lg:text-4xl mb-4">
            Don&apos;t see exactly what you want?
          </h2>
          <p className="text-white/55 text-sm mb-8">
            Every piece is custom built. Send us your dimensions, style ideas, and desired finish — we&apos;ll quote within 24 hours.
          </p>
          <a
            href="https://wa.me/27792808500?text=Hi%20Retro%20Noah%2C%20I%27d%20like%20to%20discuss%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#F8F7F4] transition-colors"
          >
            Start a Custom Order
          </a>
        </div>
      </section>
    </>
  )
}
