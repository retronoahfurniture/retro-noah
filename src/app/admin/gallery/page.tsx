import { adminFetch } from '@/lib/supabase-admin'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  let initialItems = []
  try {
    const res = await adminFetch('/gallery_items?select=*&order=sort_order.asc,created_at.asc')
    if (res.ok) initialItems = await res.json()
  } catch {
    // client will show empty state with seed option
  }

  return <GalleryClient initialItems={initialItems} />
}
