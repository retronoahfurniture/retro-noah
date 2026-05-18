'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'dining-table', label: 'Dining Tables' },
  { id: 'coffee-table', label: 'Coffee Tables' },
  { id: 'bench', label: 'Benches' },
  { id: 'side-table', label: 'Side Tables' },
  { id: 'bathroom-vanity', label: 'Vanities' },
  { id: 'server-sideboard', label: 'Sideboards' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'other', label: 'Other' },
]

const BASE = 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images'

const galleryItems = [
  { id: 1,  category: 'dining-table',    range: 'Farmhouse Range',  title: 'Farmhouse 12-Seater',                      image: `${BASE}/dining-tables/farmhouse-12seater.jpg`,        tall: true },
  { id: 2,  category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest Table — Pedestal Base',            image: `${BASE}/dining-tables/harvest-pedestal-dark.jpg`,     tall: false },
  { id: 3,  category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest Table — Grey Wash Pedestal',       image: `${BASE}/dining-tables/harvest-pedestal-grey.jpg`,     tall: false },
  { id: 4,  category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest Table — Natural 8-Seater',         image: `${BASE}/dining-tables/harvest-natural-8seater.jpg`,   tall: true },
  { id: 5,  category: 'dining-table',    range: 'Industrial Range', title: 'Industrial Steel Base Dining Table',       image: `${BASE}/dining-tables/industrial-steel-base.jpg`,     tall: false },
  { id: 6,  category: 'dining-table',    range: 'Industrial Range', title: 'Industrial White Bench Set',               image: `${BASE}/dining-tables/industrial-white-bench-set.jpg`,tall: false },
  { id: 7,  category: 'dining-table',    range: 'Industrial Range', title: 'Industrial A-Frame Outdoor Table',         image: `${BASE}/dining-tables/industrial-outdoor-a-frame.jpg`,tall: true },
  { id: 8,  category: 'dining-table',    range: 'Farmhouse Range',  title: 'Farmhouse Turned-Leg Dining Table',        image: `${BASE}/dining-tables/farmhouse-turned-leg.jpg`,      tall: false },
  { id: 9,  category: 'dining-table',    range: 'Farmhouse Range',  title: 'Farmhouse Whitewash Table',                image: `${BASE}/dining-tables/farmhouse-whitewash.jpg`,       tall: false },
  { id: 10, category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest Dark Walnut Dining Table',         image: `${BASE}/dining-tables/harvest-dark-walnut.jpg`,       tall: true },
  { id: 11, category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest Antique Wash Table',               image: `${BASE}/dining-tables/harvest-antique-wash.jpg`,      tall: false },
  { id: 13, category: 'bench',           range: 'Industrial Range', title: 'Industrial Steel Bench',                   image: `${BASE}/benches/industrial-steel-bench.jpg`,          tall: false },
  { id: 14, category: 'bench',           range: 'Farmhouse Range',  title: 'Farmhouse Bench — Natural',                image: `${BASE}/benches/farmhouse-bench-natural.jpg`,         tall: true },
  { id: 15, category: 'bench',           range: 'Industrial Range', title: 'Workshop Bench Set',                       image: `${BASE}/benches/workshop-bench-set.jpg`,              tall: false },
  { id: 17, category: 'coffee-table',    range: 'Industrial Range', title: 'Industrial Glass-Top Coffee Table',        image: `${BASE}/coffee-tables/industrial-glass-coffee.jpg`,   tall: false },
  { id: 18, category: 'side-table',      range: 'Farmhouse Range',  title: 'Rustic Console Table',                     image: `${BASE}/side-tables/rustic-console-table.jpg`,        tall: true },
  { id: 19, category: 'side-table',      range: 'Harvest Range',    title: 'Whitewash Console Table',                  image: `${BASE}/side-tables/whitewash-console.jpg`,           tall: false },
  { id: 20, category: 'side-table',      range: 'Industrial Range', title: 'Industrial Side Table',                    image: `${BASE}/side-tables/industrial-side-table.jpg`,       tall: false },
  { id: 21, category: 'server-sideboard',range: 'Harvest Range',    title: 'Harvest Sideboard with Drawers',           image: `${BASE}/sideboards/harvest-sideboard-drawers.jpg`,    tall: false },
  { id: 22, category: 'server-sideboard',range: 'Industrial Range', title: 'Industrial Steel Sideboard',               image: `${BASE}/sideboards/industrial-steel-sideboard.jpg`,   tall: true },
  { id: 23, category: 'server-sideboard',range: 'Farmhouse Range',  title: 'Rustic Reclaimed Server',                  image: `${BASE}/sideboards/rustic-reclaimed-sideboard.jpg`,   tall: false },
  { id: 24, category: 'server-sideboard',range: 'Harvest Range',    title: 'Farmhouse Server',                         image: `${BASE}/sideboards/farmhouse-server.jpg`,             tall: false },
  { id: 25, category: 'bathroom-vanity', range: 'Farmhouse Range',  title: 'Double Basin Vanity',                      image: `${BASE}/vanities/double-basin-vanity.jpg`,            tall: true },
  { id: 26, category: 'bathroom-vanity', range: 'Farmhouse Range',  title: 'Farmhouse Vanity — Installed',             image: `${BASE}/vanities/farmhouse-vanity-installed.jpg`,     tall: false },
  { id: 27, category: 'bathroom-vanity', range: 'Farmhouse Range',  title: 'Harvest Vanity — Natural',                 image: `${BASE}/vanities/harvest-vanity-natural.jpg`,         tall: false },
  { id: 28, category: 'bathroom-vanity', range: 'Farmhouse Range',  title: 'Double Vanity — Chrome Fittings',          image: `${BASE}/vanities/double-vanity-chrome.jpg`,           tall: true },
  { id: 29, category: 'outdoor',         range: 'Harvest Range',    title: 'Outdoor Chevron Table & Bench Set',        image: `${BASE}/outdoor/outdoor-chevron-set.jpg`,             tall: false },
  { id: 30, category: 'outdoor',         range: 'Farmhouse Range',  title: 'Outdoor Farmhouse Bench Set',              image: `${BASE}/outdoor/outdoor-bench-set.jpg`,               tall: false },
  { id: 31, category: 'other',           range: 'Industrial Range', title: 'Mudroom Storage Unit',                     image: `${BASE}/mudroom/mudroom-unit-lifestyle.jpg`,           tall: true },
  { id: 32, category: 'other',           range: 'Farmhouse Range',  title: 'Floating Shelves',                         image: `${BASE}/other/floating-shelves.jpg`,                  tall: false },
  { id: 33, category: 'other',           range: 'Industrial Range', title: 'Custom Kitchen Island',                    image: `${BASE}/other/kitchen-island.jpg`,                    tall: false },
  { id: 34, category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest Table — Dining Room Lifestyle',    image: `${BASE}/dining-tables/dining-room-lifestyle.jpg`,     tall: false },
  { id: 35, category: 'dining-table',    range: 'Harvest Range',    title: 'Harvest 6-Seater — Natural Finish',        image: `${BASE}/dining-tables/harvest-6seater-natural.jpg`,   tall: true },
  { id: 37, category: 'bench',           range: 'Farmhouse Range',  title: 'Bench & Dining Set',                       image: `${BASE}/benches/bench-dining-set.jpg`,                tall: false },
  { id: 38, category: 'bench',           range: 'Harvest Range',    title: 'Harvest Bench — White Wash',               image: `${BASE}/benches/harvest-bench-white.jpg`,             tall: true },
  { id: 39, category: 'side-table',      range: 'Harvest Range',    title: 'Harvest Side Table',                       image: `${BASE}/side-tables/harvest-side-table.jpg`,          tall: false },
  { id: 40, category: 'side-table',      range: 'Farmhouse Range',  title: 'Natural Side Table',                       image: `${BASE}/side-tables/natural-side-table.jpg`,          tall: false },
  { id: 41, category: 'server-sideboard',range: 'Industrial Range', title: 'Industrial Oak Sideboard',                 image: `${BASE}/sideboards/industrial-sideboard-oak.jpg`,     tall: true },
  { id: 42, category: 'bathroom-vanity', range: 'Farmhouse Range',  title: 'Vanity — Lifestyle Shot',                  image: `${BASE}/vanities/vanity-lifestyle-modern.jpg`,         tall: false },
  { id: 43, category: 'bathroom-vanity', range: 'Farmhouse Range',  title: 'Single Basin Vanity',                      image: `${BASE}/vanities/vanity-single-basin.jpg`,            tall: false },
  { id: 44, category: 'outdoor',         range: 'Industrial Range', title: 'Industrial Outdoor Set',                   image: `${BASE}/outdoor/outdoor-industrial.jpg`,               tall: true },
  { id: 45, category: 'other',           range: 'Industrial Range', title: 'Mudroom Built-In Unit',                    image: `${BASE}/mudroom/mudroom-built-in.jpg`,                 tall: false },
  { id: 46, category: 'other',           range: 'Industrial Range', title: 'Mudroom Storage Solution',                 image: `${BASE}/mudroom/mudroom-storage.jpg`,                  tall: false },
  { id: 47, category: 'other',           range: 'Industrial Range', title: 'Workshop Shelving Unit',                   image: `${BASE}/other/workshop-shelving.jpg`,                  tall: true },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<null | (typeof galleryItems)[0]>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const filtered =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  // Staggered 3D scroll reveal — each card enters independently as it scrolls into view
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Reset state when filter changes
    const items = Array.from(grid.querySelectorAll<HTMLElement>('.masonry-item'))
    items.forEach((el) => {
      el.classList.remove('reveal-3d')
      el.style.opacity = '0'
    })

    if (observerRef.current) observerRef.current.disconnect()

    let staggerIndex = 0
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = (staggerIndex % 4) * 90  // 4-column stagger, 90ms apart
            staggerIndex++
            setTimeout(() => {
              el.style.opacity = ''
              el.classList.add('reveal-3d')
            }, delay)
            observerRef.current?.unobserve(el)
          }
        })
      },
      { threshold: 0.06 }
    )

    items.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [filtered])

  return (
    <>
      {/* HEADER */}
      <section className="pt-32 pb-12 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Our Portfolio</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">Gallery</h1>
          <p className="text-[#6B6660] text-sm mt-4 max-w-xl">
            Each piece is custom-built to order. Browse our work for inspiration, then reach out to discuss your vision.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-[#EEECE8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-6 py-4 overflow-x-auto hide-scrollbar">
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
        </div>
      </div>

      {/* MASONRY GRID */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="masonry" ref={gridRef}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className="masonry-item card-3d group cursor-pointer"
                onClick={() => setLightbox(item)}
              >
                <div className={`relative overflow-hidden img-hover-zoom ${item.tall ? 'aspect-[2/3]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <div>
                      <p className="text-white text-[10px] tracking-[0.15em] uppercase mb-0.5">{item.range}</p>
                      <p className="text-white font-display text-lg leading-snug">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#6B6660] font-display text-2xl italic">No pieces in this category yet.</p>
              <p className="text-[#6B6660] text-sm mt-2">Check back soon or contact us to discuss a custom order.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl lg:text-4xl mb-4">See something you love?</h2>
          <p className="text-[#6B6660] text-sm mb-8">
            Every piece is made to your specifications. Reach out on WhatsApp and let&apos;s talk about building yours.
          </p>
          <a
            href="https://wa.me/27792808500?text=Hi%20Retro%20Noah%2C%20I%20saw%20something%20in%20your%20gallery%20I%27d%20like%20to%20discuss."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1714] text-white text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#2D2926] transition-colors"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white text-3xl leading-none"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div className="relative max-w-4xl w-full max-h-[90vh] aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.image}
              alt={lightbox.title}
              fill
              className="object-contain"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">{lightbox.range}</p>
              <p className="font-display text-2xl">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
