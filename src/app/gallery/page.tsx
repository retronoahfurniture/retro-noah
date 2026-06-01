'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const categories = [
  { id: 'all',              label: 'All' },
  { id: 'dining-table',     label: 'Dining Tables' },
  { id: 'side-table',       label: 'Side Tables' },
  { id: 'bench',            label: 'Benches' },
  { id: 'server-sideboard', label: 'Sideboards' },
  { id: 'bathroom-vanity',  label: 'Vanities' },
  { id: 'outdoor',          label: 'Outdoor' },
  { id: 'mudroom',          label: 'Mudroom' },
  { id: 'coffee-table',     label: 'Coffee Tables' },
  { id: 'other',            label: 'Other' },
]

type GalleryItem = {
  id: string | number
  category: string
  title?: string
  alt?: string
  image?: string
  src?: string
  tall: boolean
  range?: string
}

const BASE = 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn'

const galleryItems = [
  // ── DINING TABLES ──────────────────────────────────────────────────
  { id: 1,  category: 'dining-table',     range: 'Dining Tables', title: 'Reclaimed Wood Dining Table',          image: `${BASE}/dining-tables/dt-02.png`,  tall: false },
  { id: 2,  category: 'dining-table',     range: 'Dining Tables', title: 'Farmhouse Dining Table',               image: `${BASE}/dining-tables/dt-03.png`,  tall: true  },
  { id: 3,  category: 'dining-table',     range: 'Dining Tables', title: 'Natural Finish Dining Table',          image: `${BASE}/dining-tables/dt-04.png`,  tall: false },
  { id: 4,  category: 'dining-table',     range: 'Dining Tables', title: 'Pedestal Base Dining Table',           image: `${BASE}/dining-tables/dt-05.png`,  tall: false },
  { id: 5,  category: 'dining-table',     range: 'Dining Tables', title: 'French Country Dining Table',          image: `${BASE}/dining-tables/dt-06.png`,  tall: true  },
  { id: 6,  category: 'dining-table',     range: 'Dining Tables', title: 'Harvest Dining Table',                 image: `${BASE}/dining-tables/dt-07.jpg`,  tall: false },
  { id: 7,  category: 'dining-table',     range: 'Dining Tables', title: 'Large Family Dining Table',            image: `${BASE}/dining-tables/dt-08.png`,  tall: false },
  { id: 8,  category: 'dining-table',     range: 'Dining Tables', title: 'Rustic Dining Table',                  image: `${BASE}/dining-tables/dt-09.png`,  tall: true  },
  { id: 9,  category: 'dining-table',     range: 'Dining Tables', title: 'Reclaimed Wood Table — Warm Finish',   image: `${BASE}/dining-tables/dt-10.png`,  tall: false },
  { id: 10, category: 'dining-table',     range: 'Dining Tables', title: 'Custom Dining Table',                  image: `${BASE}/dining-tables/dt-11.jpg`,  tall: false },
  { id: 11, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Dark Wash',             image: `${BASE}/dining-tables/dt-12.png`,  tall: true  },
  { id: 12, category: 'dining-table',     range: 'Dining Tables', title: 'Handcrafted Dining Table',             image: `${BASE}/dining-tables/dt-13.png`,  tall: false },
  { id: 13, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Antique Wash',          image: `${BASE}/dining-tables/dt-14.png`,  tall: false },
  { id: 14, category: 'dining-table',     range: 'Dining Tables', title: 'Bespoke Dining Table',                 image: `${BASE}/dining-tables/dt-15.png`,  tall: true  },
  { id: 15, category: 'dining-table',     range: 'Dining Tables', title: 'Family Dining Table',                  image: `${BASE}/dining-tables/dt-16.png`,  tall: false },
  { id: 16, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Grey Wash',             image: `${BASE}/dining-tables/dt-17.png`,  tall: false },
  { id: 17, category: 'dining-table',     range: 'Dining Tables', title: 'Large Harvest Table',                  image: `${BASE}/dining-tables/dt-18.png`,  tall: true  },
  { id: 18, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Natural Oak',           image: `${BASE}/dining-tables/dt-19.png`,  tall: false },
  { id: 19, category: 'dining-table',     range: 'Dining Tables', title: 'Reclaimed Pine Dining Table',          image: `${BASE}/dining-tables/dt-20.png`,  tall: false },
  { id: 20, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — White Wash',            image: `${BASE}/dining-tables/dt-21.png`,  tall: false },
  { id: 21, category: 'dining-table',     range: 'Dining Tables', title: 'Farmhouse Table — Delivered',          image: `${BASE}/dining-tables/dt-22.png`,  tall: true  },
  { id: 22, category: 'dining-table',     range: 'Dining Tables', title: 'Custom Dining Table',                  image: `${BASE}/dining-tables/dt-23.jpg`,  tall: false },
  { id: 23, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — In Home',               image: `${BASE}/dining-tables/dt-24.jpg`,  tall: false },
  { id: 24, category: 'dining-table',     range: 'Dining Tables', title: 'Harvest Table — Client Home',          image: `${BASE}/dining-tables/dt-25.jpg`,  tall: true  },
  { id: 25, category: 'dining-table',     range: 'Dining Tables', title: 'Reclaimed Wood Dining Table',          image: `${BASE}/dining-tables/dt-26.jpg`,  tall: false },
  { id: 26, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Walnut Finish',         image: `${BASE}/dining-tables/dt-27.jpg`,  tall: false },
  { id: 27, category: 'dining-table',     range: 'Dining Tables', title: 'Large Dining Table',                   image: `${BASE}/dining-tables/dt-28.jpg`,  tall: false },
  { id: 28, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Installed',             image: `${BASE}/dining-tables/dt-29.jpg`,  tall: true  },
  { id: 29, category: 'dining-table',     range: 'Dining Tables', title: 'Pedestal Dining Table',                image: `${BASE}/dining-tables/dt-30.jpg`,  tall: false },
  { id: 30, category: 'dining-table',     range: 'Dining Tables', title: 'Custom Build — Dining Table',          image: `${BASE}/dining-tables/dt-31.jpg`,  tall: false },
  { id: 31, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — Workshop',              image: `${BASE}/dining-tables/dt-32.jpg`,  tall: true  },
  { id: 32, category: 'dining-table',     range: 'Dining Tables', title: 'Farmhouse Dining Table',               image: `${BASE}/dining-tables/dt-33.jpg`,  tall: false },
  { id: 33, category: 'dining-table',     range: 'Dining Tables', title: 'Harvest Dining Table',                 image: `${BASE}/dining-tables/dt-34.jpg`,  tall: false },
  { id: 34, category: 'dining-table',     range: 'Dining Tables', title: 'Dining Table — French Oak',            image: `${BASE}/dining-tables/dt-35.jpg`,  tall: true  },

  // ── SIDE TABLES ────────────────────────────────────────────────────
  { id: 35, category: 'side-table',       range: 'Side Tables',   title: 'Reclaimed Wood Side Table',            image: `${BASE}/side-tables/st-01.jpg`,    tall: false },
  { id: 36, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — Natural Finish',          image: `${BASE}/side-tables/st-02.jpg`,    tall: true  },
  { id: 37, category: 'side-table',       range: 'Side Tables',   title: 'Rustic Side Table',                    image: `${BASE}/side-tables/st-03.jpg`,    tall: false },
  { id: 38, category: 'side-table',       range: 'Side Tables',   title: 'Console Side Table',                   image: `${BASE}/side-tables/st-04.jpg`,    tall: false },
  { id: 39, category: 'side-table',       range: 'Side Tables',   title: 'Bedside Table',                        image: `${BASE}/side-tables/st-05.jpg`,    tall: true  },
  { id: 40, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — Dark Finish',             image: `${BASE}/side-tables/st-06.jpg`,    tall: false },
  { id: 41, category: 'side-table',       range: 'Side Tables',   title: 'Small Side Table',                     image: `${BASE}/side-tables/st-07.jpg`,    tall: false },
  { id: 42, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — Installed',               image: `${BASE}/side-tables/st-08.jpg`,    tall: true  },
  { id: 43, category: 'side-table',       range: 'Side Tables',   title: 'Round Side Table',                     image: `${BASE}/side-tables/st-09.jpg`,    tall: false },
  { id: 44, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — White Wash',              image: `${BASE}/side-tables/st-10.jpg`,    tall: false },
  { id: 45, category: 'side-table',       range: 'Side Tables',   title: 'Custom Side Table',                    image: `${BASE}/side-tables/st-11.jpg`,    tall: false },
  { id: 46, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — Client Home',             image: `${BASE}/side-tables/st-12.jpg`,    tall: true  },
  { id: 47, category: 'side-table',       range: 'Side Tables',   title: 'Timber Side Table',                    image: `${BASE}/side-tables/st-13.jpg`,    tall: false },
  { id: 48, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — Natural Slab',            image: `${BASE}/side-tables/st-14.jpg`,    tall: false },
  { id: 49, category: 'side-table',       range: 'Side Tables',   title: 'Reclaimed Side Table',                 image: `${BASE}/side-tables/st-15.jpg`,    tall: true  },
  { id: 50, category: 'side-table',       range: 'Side Tables',   title: 'Side Table — Workshop Finish',         image: `${BASE}/side-tables/st-16.jpg`,    tall: false },

  // ── SIDEBOARDS ─────────────────────────────────────────────────────
  { id: 51, category: 'server-sideboard', range: 'Sideboards',    title: 'Reclaimed Wood Sideboard',             image: `${BASE}/sideboards/sb-01.png`,     tall: false },
  { id: 52, category: 'server-sideboard', range: 'Sideboards',    title: 'Farmhouse Sideboard',                  image: `${BASE}/sideboards/sb-02.jpg`,     tall: true  },
  { id: 53, category: 'server-sideboard', range: 'Sideboards',    title: 'Sideboard — Natural Finish',           image: `${BASE}/sideboards/sb-03.jpg`,     tall: false },
  { id: 54, category: 'server-sideboard', range: 'Sideboards',    title: 'Sideboard with Drawers',               image: `${BASE}/sideboards/sb-04.jpg`,     tall: false },
  { id: 55, category: 'server-sideboard', range: 'Sideboards',    title: 'Large Sideboard',                      image: `${BASE}/sideboards/sb-05.jpg`,     tall: true  },
  { id: 56, category: 'server-sideboard', range: 'Sideboards',    title: 'Sideboard — Dark Finish',              image: `${BASE}/sideboards/sb-06.jpg`,     tall: false },
  { id: 57, category: 'server-sideboard', range: 'Sideboards',    title: 'Reclaimed Sideboard — Installed',      image: `${BASE}/sideboards/sb-07.jpg`,     tall: false },
  { id: 58, category: 'server-sideboard', range: 'Sideboards',    title: 'Custom Sideboard',                     image: `${BASE}/sideboards/sb-08.jpg`,     tall: true  },
  { id: 59, category: 'server-sideboard', range: 'Sideboards',    title: 'Sideboard — French Oak',               image: `${BASE}/sideboards/sb-09.jpg`,     tall: false },
  { id: 60, category: 'server-sideboard', range: 'Sideboards',    title: 'Timber Sideboard',                     image: `${BASE}/sideboards/sb-10.jpg`,     tall: false },
  { id: 61, category: 'server-sideboard', range: 'Sideboards',    title: 'Sideboard — White Wash',               image: `${BASE}/sideboards/sb-11.jpg`,     tall: false },
  { id: 62, category: 'server-sideboard', range: 'Sideboards',    title: 'Server Unit',                          image: `${BASE}/sideboards/sb-12.jpg`,     tall: true  },
  { id: 63, category: 'server-sideboard', range: 'Sideboards',    title: 'Sideboard — Client Home',              image: `${BASE}/sideboards/sb-13.jpg`,     tall: false },
  { id: 64, category: 'server-sideboard', range: 'Sideboards',    title: 'Open Sideboard',                       image: `${BASE}/sideboards/sb-14.jpg`,     tall: false },
  { id: 65, category: 'server-sideboard', range: 'Sideboards',    title: 'Reclaimed Server — Antique Wash',      image: `${BASE}/sideboards/sb-15.jpg`,     tall: true  },
  { id: 66, category: 'server-sideboard', range: 'Sideboards',    title: 'Dining Room Server',                   image: `${BASE}/sideboards/sb-16.jpg`,     tall: false },

  // ── VANITIES ───────────────────────────────────────────────────────
  { id: 67, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Bathroom Vanity',                      image: `${BASE}/vanities/v-01.jpg`,        tall: false },
  { id: 68, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Reclaimed Wood Vanity',                image: `${BASE}/vanities/v-02.png`,        tall: true  },
  { id: 69, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — Natural Finish',              image: `${BASE}/vanities/v-03.png`,        tall: false },
  { id: 70, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Double Basin Vanity',                  image: `${BASE}/vanities/v-04.png`,        tall: false },
  { id: 71, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Farmhouse Bathroom Vanity',            image: `${BASE}/vanities/v-05.jpg`,        tall: true  },
  { id: 72, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — Dark Wash',                   image: `${BASE}/vanities/v-06.png`,        tall: false },
  { id: 73, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity with Open Shelves',             image: `${BASE}/vanities/v-07.png`,        tall: false },
  { id: 74, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Custom Bathroom Vanity',               image: `${BASE}/vanities/v-08.png`,        tall: true  },
  { id: 75, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — White Wash',                  image: `${BASE}/vanities/v-09.png`,        tall: false },
  { id: 76, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Single Basin Vanity',                  image: `${BASE}/vanities/v-10.png`,        tall: false },
  { id: 77, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — French Oak',                  image: `${BASE}/vanities/v-11.png`,        tall: false },
  { id: 78, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Rustic Bathroom Vanity',               image: `${BASE}/vanities/v-12.png`,        tall: true  },
  { id: 79, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — Installed',                   image: `${BASE}/vanities/v-13.jpg`,        tall: false },
  { id: 80, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Bathroom Vanity — Client Home',        image: `${BASE}/vanities/v-14.jpg`,        tall: false },
  { id: 81, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Reclaimed Wood Vanity',                image: `${BASE}/vanities/v-15.jpg`,        tall: true  },
  { id: 82, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — Antique Wash',                image: `${BASE}/vanities/v-16.jpg`,        tall: false },
  { id: 83, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Double Vanity',                        image: `${BASE}/vanities/v-17.jpg`,        tall: false },
  { id: 84, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity with Basin',                    image: `${BASE}/vanities/v-18.jpg`,        tall: false },
  { id: 85, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Bathroom Vanity — Natural',            image: `${BASE}/vanities/v-19.jpg`,        tall: true  },
  { id: 86, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — Walnut Finish',               image: `${BASE}/vanities/v-20.jpg`,        tall: false },
  { id: 87, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Custom Vanity Unit',                   image: `${BASE}/vanities/v-21.jpg`,        tall: false },
  { id: 88, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — In Situ',                     image: `${BASE}/vanities/v-22.jpg`,        tall: true  },
  { id: 89, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Timber Bathroom Vanity',               image: `${BASE}/vanities/v-23.jpg`,        tall: false },
  { id: 90, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity with Storage',                  image: `${BASE}/vanities/v-24.jpg`,        tall: false },
  { id: 91, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Reclaimed Vanity — Grey Wash',         image: `${BASE}/vanities/v-25.jpg`,        tall: false },
  { id: 92, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Bathroom Vanity — Workshop',           image: `${BASE}/vanities/v-26.jpg`,        tall: true  },
  { id: 93, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Custom Basin Vanity',                  image: `${BASE}/vanities/v-27.jpg`,        tall: false },
  { id: 94, category: 'bathroom-vanity',  range: 'Vanities',      title: 'Vanity — Delivered',                   image: `${BASE}/vanities/v-28.jpg`,        tall: false },

  // ── BENCHES ────────────────────────────────────────────────────────
  { id: 95, category: 'bench',            range: 'Benches',       title: 'Reclaimed Wood Bench',                 image: `${BASE}/benches/b-01.png`,         tall: true  },
  { id: 96, category: 'bench',            range: 'Benches',       title: 'Farmhouse Dining Bench',               image: `${BASE}/benches/b-02.png`,         tall: false },
  { id: 97, category: 'bench',            range: 'Benches',       title: 'Custom Bench',                         image: `${BASE}/benches/b-03.png`,         tall: false },

  // ── COFFEE TABLES ──────────────────────────────────────────────────
  { id: 98, category: 'coffee-table',     range: 'Coffee Tables', title: 'Reclaimed Wood Coffee Table',          image: `${BASE}/coffee-tables/ct-01.png`,  tall: false },

  // ── MUDROOM ────────────────────────────────────────────────────────
  { id: 99,  category: 'mudroom',         range: 'Mudroom Units', title: 'Mudroom Storage Unit',                 image: `${BASE}/mudroom/mu-01.jpg`,        tall: true  },
  { id: 100, category: 'mudroom',         range: 'Mudroom Units', title: 'Mudroom Unit — Installed',             image: `${BASE}/mudroom/mu-02.jpg`,        tall: false },
  { id: 101, category: 'mudroom',         range: 'Mudroom Units', title: 'Custom Mudroom Built-In',              image: `${BASE}/mudroom/mu-03.jpg`,        tall: false },
  { id: 102, category: 'mudroom',         range: 'Mudroom Units', title: 'Mudroom — Open Shelves',               image: `${BASE}/mudroom/mu-04.jpg`,        tall: true  },
  { id: 103, category: 'mudroom',         range: 'Mudroom Units', title: 'Mudroom Storage Solution',             image: `${BASE}/mudroom/mu-05.jpg`,        tall: false },
  { id: 104, category: 'mudroom',         range: 'Mudroom Units', title: 'Mudroom Unit — Natural Finish',        image: `${BASE}/mudroom/mu-06.jpg`,        tall: false },
  { id: 105, category: 'mudroom',         range: 'Mudroom Units', title: 'Built-In Mudroom Shelving',            image: `${BASE}/mudroom/mu-07.jpg`,        tall: true  },
  { id: 106, category: 'mudroom',         range: 'Mudroom Units', title: 'Mudroom — Client Home',                image: `${BASE}/mudroom/mu-08.jpg`,        tall: false },
  { id: 107, category: 'mudroom',         range: 'Mudroom Units', title: 'Custom Mudroom Unit',                  image: `${BASE}/mudroom/mu-09.jpg`,        tall: false },

  // ── OUTDOOR ────────────────────────────────────────────────────────
  { id: 108, category: 'outdoor',         range: 'Outdoor',       title: 'Outdoor Dining Table',                 image: `${BASE}/outdoor/out-01.jpg`,       tall: false },
  { id: 109, category: 'outdoor',         range: 'Outdoor',       title: 'Outdoor Table — Installed',            image: `${BASE}/outdoor/out-02.jpg`,       tall: true  },
  { id: 110, category: 'outdoor',         range: 'Outdoor',       title: 'Outdoor Set — Entertaining',           image: `${BASE}/outdoor/out-03.jpg`,       tall: false },

  // ── OTHER ──────────────────────────────────────────────────────────
  { id: 111, category: 'other',           range: 'Other',         title: 'Custom Built-In Shelving',             image: `${BASE}/other/oth-01.jpg`,         tall: true  },
  { id: 112, category: 'other',           range: 'Other',         title: 'Reclaimed Wood Feature',               image: `${BASE}/other/oth-02.jpg`,         tall: false },
  { id: 113, category: 'other',           range: 'Other',         title: 'Kitchen Island',                       image: `${BASE}/other/oth-03.jpg`,         tall: false },
  { id: 114, category: 'other',           range: 'Other',         title: 'Custom Shelving Unit',                 image: `${BASE}/other/oth-04.jpg`,         tall: true  },
  { id: 115, category: 'other',           range: 'Other',         title: 'Built-In Storage',                     image: `${BASE}/other/oth-05.jpg`,         tall: false },
  { id: 116, category: 'other',           range: 'Other',         title: 'Reclaimed Wood Feature — Installed',   image: `${BASE}/other/oth-06.jpg`,         tall: false },
  { id: 117, category: 'other',           range: 'Other',         title: 'Custom Timber Build',                  image: `${BASE}/other/oth-07.jpg`,         tall: false },
  { id: 118, category: 'other',           range: 'Other',         title: 'Bespoke Shelving',                     image: `${BASE}/other/oth-08.jpg`,         tall: true  },
  { id: 119, category: 'other',           range: 'Other',         title: 'Custom Woodwork',                      image: `${BASE}/other/oth-09.jpg`,         tall: false },
]

function normalise(item: GalleryItem) {
  return {
    id: item.id,
    category: item.category,
    title: item.alt ?? item.title ?? '',
    image: item.src ?? item.image ?? '',
    tall: item.tall,
    range: item.range ?? item.category,
  }
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [items, setItems] = useState(galleryItems.map(normalise))
  const [lightbox, setLightbox] = useState<ReturnType<typeof normalise> | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data.map(normalise))
      })
      .catch(() => {})
  }, [])

  const filtered =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.masonry-item'))
    cards.forEach((el) => {
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
            const delay = (staggerIndex % 4) * 90
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

    cards.forEach((el) => observerRef.current?.observe(el))
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
              sizes="(max-width: 768px) 100vw, 90vw"
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
