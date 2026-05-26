import { NextRequest, NextResponse } from 'next/server'
import { adminFetch } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const res = await adminFetch(`/gallery_items?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status })
  return NextResponse.json(Array.isArray(data) ? data[0] : data)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const res = await adminFetch(`/gallery_items?id=eq.${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const data = await res.json()
    return NextResponse.json({ error: data }, { status: res.status })
  }
  return NextResponse.json({ success: true })
}
