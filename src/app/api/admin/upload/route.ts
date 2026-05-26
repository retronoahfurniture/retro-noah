import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'uploads'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `rn/${folder}/${Date.now()}.${ext}`
  const arrayBuffer = await file.arrayBuffer()

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/product-images/${filename}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': file.type,
        'x-upsert': 'false',
      },
      body: arrayBuffer,
    }
  )

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: res.status })
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/product-images/${filename}`
  return NextResponse.json({ url: publicUrl })
}
