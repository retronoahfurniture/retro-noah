'use client'

import { useState } from 'react'
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

const galleryItems = [
  {
    id: 1,
    category: 'dining-table',
    range: 'Harvest Range',
    title: 'Harvest Dining Table — 8 Seater',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    tall: true,
  },
  {
    id: 2,
    category: 'dining-table',
    range: 'Industrial Range',
    title: 'Industrial Boardroom Table',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80',
    tall: false,
  },
  {
    id: 3,
    category: 'bathroom-vanity',
    range: 'Farmhouse Range',
    title: 'Rattan Bathroom Vanity',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    tall: true,
  },
  {
    id: 4,
    category: 'coffee-table',
    range: 'Farmhouse Range',
    title: 'Reclaimed Wood Coffee Table',
    image: 'https://images.unsplash.com/photo-1532372320978-9b4f0a1e3e1c?w=800&q=80',
    tall: false,
  },
  {
    id: 5,
    category: 'dining-table',
    range: 'Farmhouse Range',
    title: 'Farmhouse Oval Dining Table',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    tall: false,
  },
  {
    id: 6,
    category: 'side-table',
    range: 'Industrial Range',
    title: 'Steel & Wood Side Table',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    tall: true,
  },
  {
    id: 7,
    category: 'server-sideboard',
    range: 'Harvest Range',
    title: 'French Country Sideboard',
    image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&q=80',
    tall: false,
  },
  {
    id: 8,
    category: 'outdoor',
    range: 'Harvest Range',
    title: 'Outdoor Harvest Dining Table',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    tall: true,
  },
  {
    id: 9,
    category: 'dining-table',
    range: 'Industrial Range',
    title: 'Industrial Square Dining Table',
    image: 'https://images.unsplash.com/photo-1596079890701-dd30e0855fe4?w=800&q=80',
    tall: false,
  },
  {
    id: 10,
    category: 'bench',
    range: 'Farmhouse Range',
    title: 'Farmhouse Bench Set',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    tall: false,
  },
  {
    id: 11,
    category: 'other',
    range: 'Farmhouse Range',
    title: 'Floating Shelves',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
    tall: true,
  },
  {
    id: 12,
    category: 'coffee-table',
    range: 'Industrial Range',
    title: 'Industrial Coffee Table',
    image: 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80',
    tall: false,
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<null | (typeof galleryItems)[0]>(null)

  const filtered =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

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
          <div className="masonry">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="masonry-item group cursor-pointer"
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
