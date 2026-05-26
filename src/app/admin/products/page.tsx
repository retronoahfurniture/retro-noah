import { adminFetch } from '@/lib/supabase-admin'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  let initialProducts = []
  try {
    const res = await adminFetch('/products?select=*&order=created_at.asc')
    if (res.ok) initialProducts = await res.json()
  } catch {
    // client will show empty state with seed option
  }

  return <ProductsClient initialProducts={initialProducts} />
}
