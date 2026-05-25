import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'uploads'

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `rn/${folder}/${Date.now()}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: urlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(filename)

  return NextResponse.json({ url: urlData.publicUrl })
}
