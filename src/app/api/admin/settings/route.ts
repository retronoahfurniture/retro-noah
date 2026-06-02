import { NextRequest, NextResponse } from 'next/server'
import { adminFetch } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const res = await adminFetch('/site_settings?select=*')
  const data = await res.json()
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status })
  const settings: Record<string, string> = {}
  for (const row of data as { key: string; value: string }[]) {
    settings[row.key] = row.value
  }
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const { key, value } = await req.json()
  const res = await adminFetch(`/site_settings?key=eq.${key}`, {
    method: 'PATCH',
    body: JSON.stringify({ value, updated_at: new Date().toISOString() }),
  })
  if (!res.ok) {
    const data = await res.json()
    return NextResponse.json({ error: data }, { status: res.status })
  }
  return NextResponse.json({ success: true })
}
