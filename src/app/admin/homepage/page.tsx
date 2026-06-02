import { adminFetch } from '@/lib/supabase-admin'
import HomepageClient from './HomepageClient'

export const dynamic = 'force-dynamic'

const DEFAULTS: Record<string, string> = {
  hero_image:             'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-02.png',
  range_harvest_image:    'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-09.png',
  range_farmhouse_image:  'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-03.png',
  range_industrial_image: 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-24.jpg',
  cta_image:              'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/outdoor/out-02.jpg',
}

export default async function AdminHomepagePage() {
  let settings = { ...DEFAULTS }
  try {
    const res = await adminFetch('/site_settings?select=*')
    if (res.ok) {
      const rows = await res.json() as { key: string; value: string }[]
      for (const row of rows) settings[row.key] = row.value
    }
  } catch {}
  return <HomepageClient initialSettings={settings} />
}
