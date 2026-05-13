import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  category: string
  range: string
  description: string
  sizes: string[]
  price_from: number
  price_to: number
  image_url: string
  images: string[]
  featured: boolean
  created_at: string
}

export type ProductCategory =
  | 'dining-table'
  | 'coffee-table'
  | 'side-table'
  | 'bench'
  | 'desk'
  | 'server-sideboard'
  | 'shelving'
  | 'outdoor-table'
  | 'bathroom-vanity'
  | 'bedside-pedestal'
  | 'kitchen-island'
  | 'other'

export type ProductRange = 'harvest' | 'farmhouse' | 'industrial' | 'custom'
