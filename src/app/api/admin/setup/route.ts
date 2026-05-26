import { NextResponse } from 'next/server'
import { adminFetch } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

const BASE = 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn'

const seedGallery = [
  { src: `${BASE}/dining-tables/dt-02.png`, alt: 'Reclaimed Wood Dining Table', category: 'dining-table', tall: false, sort_order: 1 },
  { src: `${BASE}/dining-tables/dt-03.png`, alt: 'Farmhouse Dining Table', category: 'dining-table', tall: true, sort_order: 2 },
  { src: `${BASE}/dining-tables/dt-06.png`, alt: 'French Country Dining Table', category: 'dining-table', tall: true, sort_order: 5 },
  { src: `${BASE}/side-tables/st-01.jpg`, alt: 'Reclaimed Wood Side Table', category: 'side-table', tall: false, sort_order: 35 },
  { src: `${BASE}/sideboards/sb-01.png`, alt: 'Reclaimed Wood Sideboard', category: 'server-sideboard', tall: false, sort_order: 51 },
  { src: `${BASE}/vanities/v-01.jpg`, alt: 'Bathroom Vanity', category: 'bathroom-vanity', tall: false, sort_order: 67 },
  { src: `${BASE}/benches/b-01.png`, alt: 'Reclaimed Wood Bench', category: 'bench', tall: true, sort_order: 95 },
  { src: `${BASE}/coffee-tables/ct-01.png`, alt: 'Reclaimed Wood Coffee Table', category: 'coffee-table', tall: false, sort_order: 98 },
  { src: `${BASE}/outdoor/out-01.jpg`, alt: 'Outdoor Dining Table', category: 'outdoor', tall: false, sort_order: 108 },
  { src: `${BASE}/mudroom/mu-01.jpg`, alt: 'Mudroom Storage Unit', category: 'mudroom', tall: true, sort_order: 99 },
]

const seedProducts = [
  { name: 'Harvest Dining Table', category: 'dining-table', range: 'harvest', range_label: 'Harvest Range', description: 'Classic French Country dining table crafted from reclaimed Oregon pine.', price_from: 6000, price_to: 18000, sizes: ['4-seater', '6-seater', '8-seater'], image_url: `${BASE}/dining-tables/dt-06.png`, images: [], featured: true, is_new: false },
]

export async function GET() {
  const countRes = await adminFetch('/gallery_items?select=count', {
    headers: { Prefer: 'count=exact' },
  })
  const galleryCount = parseInt(countRes.headers.get('content-range')?.split('/')[1] ?? '0', 10)

  let galleryMsg = `Already has ${galleryCount} items`
  if (galleryCount === 0) {
    const ins = await adminFetch('/gallery_items', {
      method: 'POST',
      body: JSON.stringify(seedGallery),
    })
    galleryMsg = ins.ok ? `Seeded ${seedGallery.length} items` : `Seed failed: ${await ins.text()}`
  }

  const prodCountRes = await adminFetch('/products?select=count', {
    headers: { Prefer: 'count=exact' },
  })
  const productCount = parseInt(prodCountRes.headers.get('content-range')?.split('/')[1] ?? '0', 10)

  let productMsg = `Already has ${productCount} products`
  if (productCount === 0) {
    const ins = await adminFetch('/products', {
      method: 'POST',
      body: JSON.stringify(seedProducts),
    })
    productMsg = ins.ok ? `Seeded ${seedProducts.length} products` : `Seed failed: ${await ins.text()}`
  }

  return NextResponse.json({ success: true, gallery: galleryMsg, products: productMsg })
}
