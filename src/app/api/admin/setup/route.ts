import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

const BASE = 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn'

const seedGallery = [
  { src: `${BASE}/dining-tables/dt-02.png`, alt: 'Reclaimed Wood Dining Table', category: 'dining-table', tall: false, sort_order: 1 },
  { src: `${BASE}/dining-tables/dt-03.png`, alt: 'Farmhouse Dining Table', category: 'dining-table', tall: true, sort_order: 2 },
  { src: `${BASE}/dining-tables/dt-04.png`, alt: 'Natural Finish Dining Table', category: 'dining-table', tall: false, sort_order: 3 },
  { src: `${BASE}/dining-tables/dt-05.png`, alt: 'Pedestal Base Dining Table', category: 'dining-table', tall: false, sort_order: 4 },
  { src: `${BASE}/dining-tables/dt-06.png`, alt: 'French Country Dining Table', category: 'dining-table', tall: true, sort_order: 5 },
  { src: `${BASE}/dining-tables/dt-07.jpg`, alt: 'Harvest Dining Table', category: 'dining-table', tall: false, sort_order: 6 },
  { src: `${BASE}/dining-tables/dt-08.png`, alt: 'Large Family Dining Table', category: 'dining-table', tall: false, sort_order: 7 },
  { src: `${BASE}/dining-tables/dt-09.png`, alt: 'Rustic Dining Table', category: 'dining-table', tall: true, sort_order: 8 },
  { src: `${BASE}/dining-tables/dt-10.png`, alt: 'Reclaimed Wood Table — Warm Finish', category: 'dining-table', tall: false, sort_order: 9 },
  { src: `${BASE}/dining-tables/dt-11.jpg`, alt: 'Custom Dining Table', category: 'dining-table', tall: false, sort_order: 10 },
  { src: `${BASE}/dining-tables/dt-12.png`, alt: 'Dining Table — Dark Wash', category: 'dining-table', tall: true, sort_order: 11 },
  { src: `${BASE}/dining-tables/dt-13.png`, alt: 'Handcrafted Dining Table', category: 'dining-table', tall: false, sort_order: 12 },
  { src: `${BASE}/dining-tables/dt-14.png`, alt: 'Dining Table — Antique Wash', category: 'dining-table', tall: false, sort_order: 13 },
  { src: `${BASE}/dining-tables/dt-15.png`, alt: 'Bespoke Dining Table', category: 'dining-table', tall: true, sort_order: 14 },
  { src: `${BASE}/dining-tables/dt-16.png`, alt: 'Family Dining Table', category: 'dining-table', tall: false, sort_order: 15 },
  { src: `${BASE}/dining-tables/dt-17.png`, alt: 'Dining Table — Grey Wash', category: 'dining-table', tall: false, sort_order: 16 },
  { src: `${BASE}/dining-tables/dt-18.png`, alt: 'Large Harvest Table', category: 'dining-table', tall: true, sort_order: 17 },
  { src: `${BASE}/dining-tables/dt-19.png`, alt: 'Dining Table — Natural Oak', category: 'dining-table', tall: false, sort_order: 18 },
  { src: `${BASE}/dining-tables/dt-20.png`, alt: 'Reclaimed Pine Dining Table', category: 'dining-table', tall: false, sort_order: 19 },
  { src: `${BASE}/dining-tables/dt-21.png`, alt: 'Dining Table — White Wash', category: 'dining-table', tall: false, sort_order: 20 },
  { src: `${BASE}/dining-tables/dt-22.png`, alt: 'Farmhouse Table — Delivered', category: 'dining-table', tall: true, sort_order: 21 },
  { src: `${BASE}/dining-tables/dt-23.jpg`, alt: 'Custom Dining Table', category: 'dining-table', tall: false, sort_order: 22 },
  { src: `${BASE}/dining-tables/dt-24.jpg`, alt: 'Dining Table — In Home', category: 'dining-table', tall: false, sort_order: 23 },
  { src: `${BASE}/dining-tables/dt-25.jpg`, alt: 'Harvest Table — Client Home', category: 'dining-table', tall: true, sort_order: 24 },
  { src: `${BASE}/dining-tables/dt-26.jpg`, alt: 'Reclaimed Wood Dining Table', category: 'dining-table', tall: false, sort_order: 25 },
  { src: `${BASE}/dining-tables/dt-27.jpg`, alt: 'Dining Table — Walnut Finish', category: 'dining-table', tall: false, sort_order: 26 },
  { src: `${BASE}/dining-tables/dt-28.jpg`, alt: 'Large Dining Table', category: 'dining-table', tall: false, sort_order: 27 },
  { src: `${BASE}/dining-tables/dt-29.jpg`, alt: 'Dining Table — Installed', category: 'dining-table', tall: true, sort_order: 28 },
  { src: `${BASE}/dining-tables/dt-30.jpg`, alt: 'Pedestal Dining Table', category: 'dining-table', tall: false, sort_order: 29 },
  { src: `${BASE}/dining-tables/dt-31.jpg`, alt: 'Custom Build — Dining Table', category: 'dining-table', tall: false, sort_order: 30 },
  { src: `${BASE}/dining-tables/dt-32.jpg`, alt: 'Dining Table — Workshop', category: 'dining-table', tall: true, sort_order: 31 },
  { src: `${BASE}/dining-tables/dt-33.jpg`, alt: 'Farmhouse Dining Table', category: 'dining-table', tall: false, sort_order: 32 },
  { src: `${BASE}/dining-tables/dt-34.jpg`, alt: 'Harvest Dining Table', category: 'dining-table', tall: false, sort_order: 33 },
  { src: `${BASE}/dining-tables/dt-35.jpg`, alt: 'Dining Table — French Oak', category: 'dining-table', tall: true, sort_order: 34 },
  { src: `${BASE}/side-tables/st-01.jpg`, alt: 'Reclaimed Wood Side Table', category: 'side-table', tall: false, sort_order: 35 },
  { src: `${BASE}/side-tables/st-02.jpg`, alt: 'Side Table — Natural Finish', category: 'side-table', tall: true, sort_order: 36 },
  { src: `${BASE}/side-tables/st-03.jpg`, alt: 'Rustic Side Table', category: 'side-table', tall: false, sort_order: 37 },
  { src: `${BASE}/side-tables/st-04.jpg`, alt: 'Console Side Table', category: 'side-table', tall: false, sort_order: 38 },
  { src: `${BASE}/side-tables/st-05.jpg`, alt: 'Bedside Table', category: 'side-table', tall: true, sort_order: 39 },
  { src: `${BASE}/side-tables/st-06.jpg`, alt: 'Side Table — Dark Finish', category: 'side-table', tall: false, sort_order: 40 },
  { src: `${BASE}/side-tables/st-07.jpg`, alt: 'Small Side Table', category: 'side-table', tall: false, sort_order: 41 },
  { src: `${BASE}/side-tables/st-08.jpg`, alt: 'Side Table — Installed', category: 'side-table', tall: true, sort_order: 42 },
  { src: `${BASE}/side-tables/st-09.jpg`, alt: 'Round Side Table', category: 'side-table', tall: false, sort_order: 43 },
  { src: `${BASE}/side-tables/st-10.jpg`, alt: 'Side Table — White Wash', category: 'side-table', tall: false, sort_order: 44 },
  { src: `${BASE}/side-tables/st-11.jpg`, alt: 'Custom Side Table', category: 'side-table', tall: false, sort_order: 45 },
  { src: `${BASE}/side-tables/st-12.jpg`, alt: 'Side Table — Client Home', category: 'side-table', tall: true, sort_order: 46 },
  { src: `${BASE}/side-tables/st-13.jpg`, alt: 'Timber Side Table', category: 'side-table', tall: false, sort_order: 47 },
  { src: `${BASE}/side-tables/st-14.jpg`, alt: 'Side Table — Natural Slab', category: 'side-table', tall: false, sort_order: 48 },
  { src: `${BASE}/side-tables/st-15.jpg`, alt: 'Reclaimed Side Table', category: 'side-table', tall: true, sort_order: 49 },
  { src: `${BASE}/side-tables/st-16.jpg`, alt: 'Side Table — Workshop Finish', category: 'side-table', tall: false, sort_order: 50 },
  { src: `${BASE}/sideboards/sb-01.png`, alt: 'Reclaimed Wood Sideboard', category: 'server-sideboard', tall: false, sort_order: 51 },
  { src: `${BASE}/sideboards/sb-02.jpg`, alt: 'Farmhouse Sideboard', category: 'server-sideboard', tall: true, sort_order: 52 },
  { src: `${BASE}/sideboards/sb-03.jpg`, alt: 'Sideboard — Natural Finish', category: 'server-sideboard', tall: false, sort_order: 53 },
  { src: `${BASE}/sideboards/sb-04.jpg`, alt: 'Sideboard with Drawers', category: 'server-sideboard', tall: false, sort_order: 54 },
  { src: `${BASE}/sideboards/sb-05.jpg`, alt: 'Large Sideboard', category: 'server-sideboard', tall: true, sort_order: 55 },
  { src: `${BASE}/sideboards/sb-06.jpg`, alt: 'Sideboard — Dark Finish', category: 'server-sideboard', tall: false, sort_order: 56 },
  { src: `${BASE}/sideboards/sb-07.jpg`, alt: 'Reclaimed Sideboard — Installed', category: 'server-sideboard', tall: false, sort_order: 57 },
  { src: `${BASE}/sideboards/sb-08.jpg`, alt: 'Custom Sideboard', category: 'server-sideboard', tall: true, sort_order: 58 },
  { src: `${BASE}/sideboards/sb-09.jpg`, alt: 'Sideboard — French Oak', category: 'server-sideboard', tall: false, sort_order: 59 },
  { src: `${BASE}/sideboards/sb-10.jpg`, alt: 'Timber Sideboard', category: 'server-sideboard', tall: false, sort_order: 60 },
  { src: `${BASE}/sideboards/sb-11.jpg`, alt: 'Sideboard — White Wash', category: 'server-sideboard', tall: false, sort_order: 61 },
  { src: `${BASE}/sideboards/sb-12.jpg`, alt: 'Server Unit', category: 'server-sideboard', tall: true, sort_order: 62 },
  { src: `${BASE}/sideboards/sb-13.jpg`, alt: 'Sideboard — Client Home', category: 'server-sideboard', tall: false, sort_order: 63 },
  { src: `${BASE}/sideboards/sb-14.jpg`, alt: 'Open Sideboard', category: 'server-sideboard', tall: false, sort_order: 64 },
  { src: `${BASE}/sideboards/sb-15.jpg`, alt: 'Reclaimed Server — Antique Wash', category: 'server-sideboard', tall: true, sort_order: 65 },
  { src: `${BASE}/sideboards/sb-16.jpg`, alt: 'Dining Room Server', category: 'server-sideboard', tall: false, sort_order: 66 },
  { src: `${BASE}/vanities/v-01.jpg`, alt: 'Bathroom Vanity', category: 'bathroom-vanity', tall: false, sort_order: 67 },
  { src: `${BASE}/vanities/v-02.png`, alt: 'Reclaimed Wood Vanity', category: 'bathroom-vanity', tall: true, sort_order: 68 },
  { src: `${BASE}/vanities/v-03.png`, alt: 'Vanity — Natural Finish', category: 'bathroom-vanity', tall: false, sort_order: 69 },
  { src: `${BASE}/vanities/v-04.png`, alt: 'Double Basin Vanity', category: 'bathroom-vanity', tall: false, sort_order: 70 },
  { src: `${BASE}/vanities/v-05.jpg`, alt: 'Farmhouse Bathroom Vanity', category: 'bathroom-vanity', tall: true, sort_order: 71 },
  { src: `${BASE}/vanities/v-06.png`, alt: 'Vanity — Dark Wash', category: 'bathroom-vanity', tall: false, sort_order: 72 },
  { src: `${BASE}/vanities/v-07.png`, alt: 'Vanity with Open Shelves', category: 'bathroom-vanity', tall: false, sort_order: 73 },
  { src: `${BASE}/vanities/v-08.png`, alt: 'Custom Bathroom Vanity', category: 'bathroom-vanity', tall: true, sort_order: 74 },
  { src: `${BASE}/vanities/v-09.png`, alt: 'Vanity — White Wash', category: 'bathroom-vanity', tall: false, sort_order: 75 },
  { src: `${BASE}/vanities/v-10.png`, alt: 'Single Basin Vanity', category: 'bathroom-vanity', tall: false, sort_order: 76 },
  { src: `${BASE}/vanities/v-11.png`, alt: 'Vanity — French Oak', category: 'bathroom-vanity', tall: false, sort_order: 77 },
  { src: `${BASE}/vanities/v-12.png`, alt: 'Rustic Bathroom Vanity', category: 'bathroom-vanity', tall: true, sort_order: 78 },
  { src: `${BASE}/vanities/v-13.jpg`, alt: 'Vanity — Installed', category: 'bathroom-vanity', tall: false, sort_order: 79 },
  { src: `${BASE}/vanities/v-14.jpg`, alt: 'Bathroom Vanity — Client Home', category: 'bathroom-vanity', tall: false, sort_order: 80 },
  { src: `${BASE}/vanities/v-15.jpg`, alt: 'Reclaimed Wood Vanity', category: 'bathroom-vanity', tall: true, sort_order: 81 },
  { src: `${BASE}/vanities/v-16.jpg`, alt: 'Vanity — Antique Wash', category: 'bathroom-vanity', tall: false, sort_order: 82 },
  { src: `${BASE}/vanities/v-17.jpg`, alt: 'Double Vanity', category: 'bathroom-vanity', tall: false, sort_order: 83 },
  { src: `${BASE}/vanities/v-18.jpg`, alt: 'Vanity with Basin', category: 'bathroom-vanity', tall: false, sort_order: 84 },
  { src: `${BASE}/vanities/v-19.jpg`, alt: 'Bathroom Vanity — Natural', category: 'bathroom-vanity', tall: true, sort_order: 85 },
  { src: `${BASE}/vanities/v-20.jpg`, alt: 'Vanity — Walnut Finish', category: 'bathroom-vanity', tall: false, sort_order: 86 },
  { src: `${BASE}/vanities/v-21.jpg`, alt: 'Custom Vanity Unit', category: 'bathroom-vanity', tall: false, sort_order: 87 },
  { src: `${BASE}/vanities/v-22.jpg`, alt: 'Vanity — In Situ', category: 'bathroom-vanity', tall: true, sort_order: 88 },
  { src: `${BASE}/vanities/v-23.jpg`, alt: 'Timber Bathroom Vanity', category: 'bathroom-vanity', tall: false, sort_order: 89 },
  { src: `${BASE}/vanities/v-24.jpg`, alt: 'Vanity with Storage', category: 'bathroom-vanity', tall: false, sort_order: 90 },
  { src: `${BASE}/vanities/v-25.jpg`, alt: 'Reclaimed Vanity — Grey Wash', category: 'bathroom-vanity', tall: false, sort_order: 91 },
  { src: `${BASE}/vanities/v-26.jpg`, alt: 'Bathroom Vanity — Workshop', category: 'bathroom-vanity', tall: true, sort_order: 92 },
  { src: `${BASE}/vanities/v-27.jpg`, alt: 'Custom Basin Vanity', category: 'bathroom-vanity', tall: false, sort_order: 93 },
  { src: `${BASE}/vanities/v-28.jpg`, alt: 'Vanity — Delivered', category: 'bathroom-vanity', tall: false, sort_order: 94 },
  { src: `${BASE}/benches/b-01.png`, alt: 'Reclaimed Wood Bench', category: 'bench', tall: true, sort_order: 95 },
  { src: `${BASE}/benches/b-02.png`, alt: 'Farmhouse Dining Bench', category: 'bench', tall: false, sort_order: 96 },
  { src: `${BASE}/benches/b-03.png`, alt: 'Custom Bench', category: 'bench', tall: false, sort_order: 97 },
  { src: `${BASE}/coffee-tables/ct-01.png`, alt: 'Reclaimed Wood Coffee Table', category: 'coffee-table', tall: false, sort_order: 98 },
  { src: `${BASE}/mudroom/mu-01.jpg`, alt: 'Mudroom Storage Unit', category: 'mudroom', tall: true, sort_order: 99 },
  { src: `${BASE}/mudroom/mu-02.jpg`, alt: 'Mudroom Unit — Installed', category: 'mudroom', tall: false, sort_order: 100 },
  { src: `${BASE}/mudroom/mu-03.jpg`, alt: 'Custom Mudroom Built-In', category: 'mudroom', tall: false, sort_order: 101 },
  { src: `${BASE}/mudroom/mu-04.jpg`, alt: 'Mudroom — Open Shelves', category: 'mudroom', tall: true, sort_order: 102 },
  { src: `${BASE}/mudroom/mu-05.jpg`, alt: 'Mudroom Storage Solution', category: 'mudroom', tall: false, sort_order: 103 },
  { src: `${BASE}/mudroom/mu-06.jpg`, alt: 'Mudroom Unit — Natural Finish', category: 'mudroom', tall: false, sort_order: 104 },
  { src: `${BASE}/mudroom/mu-07.jpg`, alt: 'Built-In Mudroom Shelving', category: 'mudroom', tall: true, sort_order: 105 },
  { src: `${BASE}/mudroom/mu-08.jpg`, alt: 'Mudroom — Client Home', category: 'mudroom', tall: false, sort_order: 106 },
  { src: `${BASE}/mudroom/mu-09.jpg`, alt: 'Custom Mudroom Unit', category: 'mudroom', tall: false, sort_order: 107 },
  { src: `${BASE}/outdoor/out-01.jpg`, alt: 'Outdoor Dining Table', category: 'outdoor', tall: false, sort_order: 108 },
  { src: `${BASE}/outdoor/out-02.jpg`, alt: 'Outdoor Table — Installed', category: 'outdoor', tall: true, sort_order: 109 },
  { src: `${BASE}/outdoor/out-03.jpg`, alt: 'Outdoor Set — Entertaining', category: 'outdoor', tall: false, sort_order: 110 },
  { src: `${BASE}/other/oth-01.jpg`, alt: 'Custom Built-In Shelving', category: 'other', tall: true, sort_order: 111 },
  { src: `${BASE}/other/oth-02.jpg`, alt: 'Reclaimed Wood Feature', category: 'other', tall: false, sort_order: 112 },
  { src: `${BASE}/other/oth-03.jpg`, alt: 'Kitchen Island', category: 'other', tall: false, sort_order: 113 },
  { src: `${BASE}/other/oth-04.jpg`, alt: 'Custom Shelving Unit', category: 'other', tall: true, sort_order: 114 },
  { src: `${BASE}/other/oth-05.jpg`, alt: 'Built-In Storage', category: 'other', tall: false, sort_order: 115 },
  { src: `${BASE}/other/oth-06.jpg`, alt: 'Reclaimed Wood Feature — Installed', category: 'other', tall: false, sort_order: 116 },
  { src: `${BASE}/other/oth-07.jpg`, alt: 'Custom Timber Build', category: 'other', tall: false, sort_order: 117 },
  { src: `${BASE}/other/oth-08.jpg`, alt: 'Bespoke Shelving', category: 'other', tall: true, sort_order: 118 },
  { src: `${BASE}/other/oth-09.jpg`, alt: 'Custom Woodwork', category: 'other', tall: false, sort_order: 119 },
]

const seedProducts = [
  { name: 'Harvest Dining Table', category: 'dining-table', range: 'harvest', range_label: 'Harvest Range', description: 'Classic French Country dining table crafted from reclaimed Oregon pine. Natural oak wash, turned or pedestal legs, available 4–16 seaters.', price_from: 6000, price_to: 18000, sizes: ['4-seater','6-seater','8-seater','10-seater','12-seater','14-seater','16-seater'], image_url: `${BASE}/dining-tables/dt-06.png`, images: [], featured: true, is_new: false },
  { name: 'Farmhouse Dining Table', category: 'dining-table', range: 'farmhouse', range_label: 'Farmhouse Range', description: 'Organic and rustic. Reclaimed Baltic fir with aged walnut or French oak wash finish. Available with matching bench set.', price_from: 6000, price_to: 16000, sizes: ['4-seater','6-seater','8-seater','10-seater'], image_url: `${BASE}/dining-tables/dt-23.jpg`, images: [], featured: true, is_new: false },
  { name: 'Reclaimed Wood Dining Table', category: 'dining-table', range: 'industrial', range_label: 'Industrial Range', description: 'Bold and architectural. Reclaimed wood top on a solid base — built for families who gather around the table.', price_from: 10000, price_to: 18000, sizes: ['6-seater','8-seater','10-seater','12-seater','14-seater','16-seater'], image_url: `${BASE}/dining-tables/dt-27.jpg`, images: [], featured: true, is_new: false },
  { name: 'Reclaimed Coffee Table', category: 'coffee-table', range: 'harvest', range_label: 'Harvest Range', description: 'Reclaimed Oregon pine coffee table with natural finish. The centrepiece your living room deserves.', price_from: 3000, price_to: 8000, sizes: ['Small','Medium','Large'], image_url: `${BASE}/coffee-tables/ct-01.png`, images: [], featured: false, is_new: false },
  { name: 'Reclaimed Side Table', category: 'side-table', range: 'harvest', range_label: 'Harvest Range', description: 'Solid reclaimed wood side table. Clean lines, natural warmth — perfect beside a sofa or bed. Priced per unit.', price_from: 3500, price_to: 5000, sizes: ['Standard'], image_url: `${BASE}/side-tables/st-01.jpg`, images: [], featured: false, is_new: false },
  { name: 'Farmhouse Dining Bench', category: 'bench', range: 'farmhouse', range_label: 'Farmhouse Range', description: 'Built to match your dining table. Same dimensions, same finish — a seamless addition to your set.', price_from: 3000, price_to: 5000, sizes: ['1.2m','1.5m','1.8m','2.0m'], image_url: `${BASE}/benches/b-02.png`, images: [], featured: false, is_new: false },
  { name: 'Reclaimed Wood Sideboard', category: 'server-sideboard', range: 'harvest', range_label: 'Harvest Range', description: 'A beautifully crafted sideboard for your dining room. French oak wash finish, ample storage and shelving.', price_from: 8000, price_to: 14000, sizes: ['1.2m','1.5m','1.8m'], image_url: `${BASE}/sideboards/sb-04.jpg`, images: [], featured: false, is_new: false },
  { name: 'Outdoor Dining Table', category: 'outdoor-table', range: 'harvest', range_label: 'Harvest Range', description: 'Built for the outdoors. UV-resistant sealant on solid reclaimed wood. Perfect for entertaining.', price_from: 7000, price_to: 14000, sizes: ['4-seater','6-seater','8-seater'], image_url: `${BASE}/outdoor/out-01.jpg`, images: [], featured: false, is_new: false },
  { name: 'Bathroom Vanity', category: 'bathroom-vanity', range: 'farmhouse', range_label: 'Farmhouse Range', description: 'Transform your bathroom. Reclaimed wood vanity — organic, earthy, and stunning in any bathroom setting.', price_from: 5000, price_to: 12000, sizes: ['600mm','800mm','1000mm','1200mm'], image_url: `${BASE}/vanities/v-13.jpg`, images: [], featured: true, is_new: false },
  { name: 'Mudroom Storage Unit', category: 'other', range: 'industrial', range_label: 'Industrial Range', description: 'A fully custom mudroom unit built to your exact space. Reclaimed wood shelving, hooks, and storage in one beautiful piece.', price_from: 8000, price_to: 16000, sizes: ['Custom'], image_url: `${BASE}/mudroom/mu-02.jpg`, images: [], featured: false, is_new: false },
]

export async function GET() {
  const supabase = createAdminClient()

  // Check if gallery is already seeded
  const { count: galleryCount } = await supabase
    .from('gallery_items')
    .select('*', { count: 'exact', head: true })

  let gallerySeeded = 0
  if (!galleryCount) {
    const { error: galleryError } = await supabase.from('gallery_items').insert(seedGallery)
    if (galleryError) {
      return NextResponse.json({ error: `Gallery seed failed: ${galleryError.message}` }, { status: 500 })
    }
    gallerySeeded = seedGallery.length
  }

  // Check if products are already seeded
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  let productsSeeded = 0
  if (!productCount) {
    const { error: productError } = await supabase.from('products').insert(seedProducts)
    if (productError) {
      return NextResponse.json({ error: `Products seed failed: ${productError.message}` }, { status: 500 })
    }
    productsSeeded = seedProducts.length
  }

  return NextResponse.json({
    success: true,
    gallery: galleryCount === 0 ? `Seeded ${gallerySeeded} items` : `Already had ${galleryCount} items`,
    products: productCount === 0 ? `Seeded ${productsSeeded} products` : `Already had ${productCount} products`,
  })
}
