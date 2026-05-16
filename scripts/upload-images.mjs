/**
 * Retro Noah — Supabase Storage image uploader
 * Reads credentials from .env.local, compresses images via sips,
 * uploads to a public "images" bucket, and prints the final URL map.
 */

import { createClient } from '@supabase/supabase-js'
import ws from 'ws'
import { execSync } from 'child_process'
import { readFileSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import { join, extname, basename } from 'path'
import { tmpdir } from 'os'

// ── Read .env.local ───────────────────────────────────────────────────────────
const env = {}
readFileSync(join(process.cwd(), '.env.local'), 'utf8')
  .split('\n')
  .filter(l => l.includes('=') && !l.startsWith('#'))
  .forEach(l => {
    const [k, ...v] = l.split('=')
    env[k.trim()] = v.join('=').trim()
  })

const SUPABASE_URL      = env['NEXT_PUBLIC_SUPABASE_URL']
const SUPABASE_KEY      = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
const SERVICE_ROLE_KEY  = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.includes('your_')) {
  console.error('❌  Fill in your Supabase credentials in .env.local first.')
  process.exit(1)
}
if (!SERVICE_ROLE_KEY) {
  console.error('❌  Add SUPABASE_SERVICE_ROLE_KEY to .env.local first.')
  process.exit(1)
}

// Use service role key so uploads bypass RLS
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  realtime: { transport: ws },
  auth: { persistSession: false },
})
const BUCKET = 'product-images'
const BASE = join(process.cwd(), 'Retro Noah')
const TMP  = join(tmpdir(), 'retro-noah-upload')
mkdirSync(TMP, { recursive: true })

// ── Curated image selection ───────────────────────────────────────────────────
// Format: [storagePath, localRelativePath]
const IMAGES = [
  // ── DINING TABLES ──────────────────────────────────────────────────────────
  ['dining-tables/harvest-farmhouse-10seater.jpg',    'Dining Tables/IMG_4601.jpg'],
  ['dining-tables/harvest-natural-8seater.jpg',       'Dining Tables/IMG_0739.jpg'],
  ['dining-tables/harvest-pedestal-grey.jpg',         'Dining Tables/IMG_6570.JPG'],
  ['dining-tables/harvest-pedestal-dark.jpg',         'Dining Tables/IMG_4559.jpg'],
  ['dining-tables/industrial-steel-base.jpg',         'Dining Tables/IMG_9220.jpg'],
  ['dining-tables/industrial-white-bench-set.jpg',    'Dining Tables/IMG_8221.JPG'],
  ['dining-tables/farmhouse-turned-leg.jpg',          'Dining Tables/IMG_5695.JPG'],
  ['dining-tables/farmhouse-whitewash.jpg',           'Dining Tables/IMG_3056.jpg'],
  ['dining-tables/industrial-outdoor-a-frame.jpg',    'Dining Tables/IMG_0729.jpg'],
  ['dining-tables/harvest-dark-walnut.jpg',           'Dining Tables/IMG_7628.jpg'],
  ['dining-tables/dining-room-lifestyle.jpg',         'Dining Tables/IMG_4175.JPG'],
  ['dining-tables/harvest-6seater-natural.jpg',       'Dining Tables/IMG_2013.jpg'],
  ['dining-tables/farmhouse-12seater.jpg',            'Dining Tables/IMG_5249.JPG'],
  ['dining-tables/industrial-square.jpg',             'Dining Tables/IMG_5452.JPG'],
  ['dining-tables/harvest-antique-wash.jpg',          'Dining Tables/IMG_6263.JPG'],

  // ── BENCHES ────────────────────────────────────────────────────────────────
  ['benches/industrial-steel-bench.jpg',              'Benches/IMG_9222.jpg'],
  ['benches/workshop-bench-set.jpg',                  'Benches/IMG_4916.jpg'],
  ['benches/farmhouse-bench-natural.jpg',             'Benches/IMG_9853.JPG'],
  ['benches/harvest-bench-white.jpg',                 'Benches/IMG_8505.JPG'],
  ['benches/bench-dining-set.jpg',                    'Benches/IMG_8009.JPG'],

  // ── COFFEE TABLES ──────────────────────────────────────────────────────────
  ['coffee-tables/industrial-glass-coffee.jpg',       'Coffee Tables/IMG_6471.JPG'],
  ['coffee-tables/farmhouse-coffee-natural.jpg',      'Coffee Tables/B1C35C07-C1F9-4077-90F7-4F63E7768281.PNG'],

  // ── SIDE TABLES ────────────────────────────────────────────────────────────
  ['side-tables/rustic-console-table.jpg',            'Side Tables/IMG_5979.JPG'],
  ['side-tables/whitewash-console.jpg',               'Side Tables/IMG_3444.JPG'],
  ['side-tables/industrial-side-table.jpg',           'Side Tables/IMG_5173.JPG'],
  ['side-tables/natural-side-table.jpg',              'Side Tables/IMG_7720.JPG'],
  ['side-tables/harvest-side-table.jpg',              'Side Tables/IMG_0409.jpg'],

  // ── SIDEBOARDS ─────────────────────────────────────────────────────────────
  ['sideboards/industrial-steel-sideboard.jpg',       'Sideboards/IMG_2801.jpg'],
  ['sideboards/rustic-reclaimed-sideboard.jpg',       'Sideboards/IMG_4493.jpg'],
  ['sideboards/farmhouse-server.jpg',                 'Sideboards/IMG_4132.jpg'],
  ['sideboards/harvest-sideboard-drawers.jpg',        'Sideboards/IMG_2322.JPG'],
  ['sideboards/industrial-sideboard-oak.jpg',         'Sideboards/IMG_8594.JPG'],

  // ── VANITIES ───────────────────────────────────────────────────────────────
  ['vanities/double-basin-vanity.jpg',                'Vanities/IMG_7358.jpg'],
  ['vanities/farmhouse-vanity-installed.jpg',         'Vanities/IMG_1711.jpg'],
  ['vanities/vanity-lifestyle-modern.jpg',            'Vanities/IMG_9570.JPG'],
  ['vanities/harvest-vanity-natural.jpg',             'Vanities/IMG_0942.jpg'],
  ['vanities/vanity-single-basin.jpg',                'Vanities/IMG_3211.jpg'],
  ['vanities/double-vanity-chrome.jpg',               'Vanities/IMG_9572.JPG'],

  // ── OUTDOOR ────────────────────────────────────────────────────────────────
  ['outdoor/outdoor-chevron-set.jpg',                 'Outdoor/IMG_7974.jpg'],
  ['outdoor/outdoor-bench-set.jpg',                   'Outdoor/IMG_8137.jpg'],
  ['outdoor/outdoor-industrial.jpg',                  'Outdoor/IMG_5770.jpg'],

  // ── MUDROOM ────────────────────────────────────────────────────────────────
  ['mudroom/mudroom-unit-lifestyle.jpg',              'Mudroom Unit/IMG_0161.JPG'],
  ['mudroom/mudroom-built-in.jpg',                    'Mudroom Unit/IMG_0162.JPG'],
  ['mudroom/mudroom-storage.jpg',                     'Mudroom Unit/IMG_9142.JPG'],

  // ── OTHER ──────────────────────────────────────────────────────────────────
  ['other/workshop-shelving.jpg',                     'Other/IMG_3535.JPG'],
  ['other/kitchen-island.jpg',                        'Other/IMG_5942.JPG'],
  ['other/floating-shelves.jpg',                      'Other/IMG_3620.jpg'],
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function compress(srcPath, destPath) {
  // Ensure destination directory exists
  mkdirSync(destPath.replace(/\/[^/]+$/, ''), { recursive: true })
  // Resize to max 1600px on longest side, 85% quality using macOS sips
  const ext = extname(srcPath).toLowerCase()
  const isPng = ext === '.png'
  execSync(
    `sips --resampleLongSide 1600 "${srcPath}" --out "${destPath}"`,
    { stdio: 'pipe' }
  )
  if (isPng) {
    // sips keeps it PNG — convert to jpg for smaller size
    const jpgPath = destPath.replace(/\.png$/i, '.jpg')
    execSync(`sips -s format jpeg -s formatOptions 85 "${destPath}" --out "${jpgPath}" 2>/dev/null`, { stdio: 'pipe' })
    return jpgPath
  }
  // For jpg: re-compress at 85%
  execSync(`sips -s formatOptions 85 "${destPath}" 2>/dev/null`, { stdio: 'pipe' })
  return destPath
}

function mimeType(filePath) {
  return filePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔗  Connecting to Supabase:', SUPABASE_URL)

  console.log(`✅  Using bucket: ${BUCKET}`)

  const urlMap = {}
  let ok = 0, fail = 0

  for (const [storagePath, relPath] of IMAGES) {
    const src = join(BASE, relPath)
    if (!existsSync(src)) {
      console.warn(`⚠️   Not found, skipping: ${relPath}`)
      fail++
      continue
    }

    // Compress to tmp
    const tmpFile = join(TMP, basename(storagePath))
    let uploadPath = storagePath
    let compressedFile
    try {
      compressedFile = compress(src, tmpFile)
      // If PNG was converted to jpg, update storage path
      if (compressedFile.endsWith('.jpg') && storagePath.endsWith('.png')) {
        uploadPath = storagePath.replace(/\.png$/i, '.jpg')
      }
    } catch (e) {
      console.warn(`⚠️   Compress failed for ${relPath}: ${e.message}`)
      compressedFile = src
    }

    const fileBuffer = readFileSync(compressedFile)
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(uploadPath, fileBuffer, {
        contentType: mimeType(compressedFile),
        upsert: true,
      })

    if (error) {
      console.error(`❌  Upload failed: ${uploadPath} — ${error.message}`)
      fail++
      continue
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(uploadPath)

    urlMap[storagePath] = publicUrl
    console.log(`✅  ${uploadPath}`)
    ok++
  }

  console.log(`\n📊  Done: ${ok} uploaded, ${fail} skipped/failed`)
  console.log('\n📋  URL MAP (paste into your code):\n')
  console.log(JSON.stringify(urlMap, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
