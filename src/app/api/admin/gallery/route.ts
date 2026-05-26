import { NextRequest, NextResponse } from 'next/server'
import { adminFetch } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const res = await adminFetch('/gallery_items?select=*&order=sort_order.asc,created_at.asc')
  const data = await res.json()
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await adminFetch('/gallery_items', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status })
  return NextResponse.json(Array.isArray(data) ? data[0] : data)
}
