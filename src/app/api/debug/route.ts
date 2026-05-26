import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'MISSING'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'MISSING'

  const result: Record<string, unknown> = {
    url_present: url !== 'MISSING',
    key_present: key !== 'MISSING',
    url_prefix: url.slice(0, 30),
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/products?select=count&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
    )
    result.fetch_status = res.status
    result.fetch_ok = res.ok
    result.body = await res.text()
  } catch (e: unknown) {
    result.fetch_error = String(e)
    result.fetch_cause = e instanceof Error && e.cause ? String((e.cause as Error).message ?? e.cause) : undefined
  }

  return NextResponse.json(result)
}
