'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, RefreshCw, Check } from 'lucide-react'

type Settings = Record<string, string>

const SLOTS = [
  {
    key: 'hero_image',
    label: 'Hero Image',
    description: 'Full-screen background on the homepage',
    aspect: 'aspect-[16/9]',
  },
  {
    key: 'range_harvest_image',
    label: 'Harvest Range Image',
    description: 'Shown in the "Three Distinct Ranges" section',
    aspect: 'aspect-[16/10]',
  },
  {
    key: 'range_farmhouse_image',
    label: 'Farmhouse Range Image',
    description: 'Shown in the "Three Distinct Ranges" section',
    aspect: 'aspect-[16/10]',
  },
  {
    key: 'range_industrial_image',
    label: 'Industrial Range Image',
    description: 'Shown in the "Three Distinct Ranges" section',
    aspect: 'aspect-[16/10]',
  },
  {
    key: 'cta_image',
    label: 'Call-to-Action Background',
    description: 'Full-width background at the bottom of the homepage',
    aspect: 'aspect-[16/9]',
  },
]

async function compressImage(file: File): Promise<File> {
  const MAX_WIDTH = 1920
  const QUALITY = 0.85
  return new Promise((resolve) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > MAX_WIDTH) { height = Math.round((height * MAX_WIDTH) / width); width = MAX_WIDTH }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => {
        if (!blob) { resolve(file); return }
        const out = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })
        resolve(out.size < file.size ? out : file)
      }, 'image/jpeg', QUALITY)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
}

export default function HomepageClient({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleUpload(key: string, rawFile: File) {
    setUploading(key)
    try {
      const file = await compressImage(rawFile)
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'homepage')
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!uploadRes.ok) throw new Error((await uploadRes.json()).error)
      const { url } = await uploadRes.json()

      setSaving(key)
      const saveRes = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: url }),
      })
      if (!saveRes.ok) throw new Error('Failed to save setting')

      setSettings((prev) => ({ ...prev, [key]: url }))
      showToast('Image updated — changes are live on the homepage')
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setUploading(null)
      setSaving(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-[#1A1714]">Homepage</h1>
        <p className="text-[#6B6660] text-sm mt-1">
          Edit the images shown on the homepage. Changes go live immediately.
        </p>
        <p className="text-[#6B6660] text-xs mt-1">
          ★ Featured products are managed from the <strong>Products</strong> page — star up to 4 products to show them in the Featured Pieces section.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SLOTS.map((slot) => {
          const isUploading = uploading === slot.key
          const isSaving = saving === slot.key
          const busy = isUploading || isSaving
          const currentImage = settings[slot.key]

          return (
            <div key={slot.key} className="bg-white border border-[#EEECE8] p-5">
              <div className="mb-3">
                <p className="text-sm font-medium text-[#1A1714]">{slot.label}</p>
                <p className="text-xs text-[#6B6660] mt-0.5">{slot.description}</p>
              </div>

              <div
                className={`relative ${slot.aspect} overflow-hidden bg-[#F8F7F4] border border-[#EEECE8] cursor-pointer group mb-3`}
                onClick={() => !busy && fileRefs.current[slot.key]?.click()}
              >
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={slot.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Upload size={24} className="text-[#C8C5BE]" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  {busy ? (
                    <div className="text-center text-white">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-1" />
                      <p className="text-xs">{isUploading ? 'Uploading…' : 'Saving…'}</p>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <Upload size={20} className="mx-auto mb-1" />
                      <p className="text-xs">Click to replace</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => !busy && fileRefs.current[slot.key]?.click()}
                disabled={busy}
                className="w-full flex items-center justify-center gap-2 py-2 border border-[#EEECE8] text-xs tracking-[0.08em] uppercase text-[#6B6660] hover:border-[#1A1714] hover:text-[#1A1714] transition-colors disabled:opacity-40"
              >
                {busy ? (
                  <><RefreshCw size={12} className="animate-spin" /> {isUploading ? 'Uploading…' : 'Saving…'}</>
                ) : (
                  <><Upload size={12} /> Replace Image</>
                )}
              </button>

              <input
                ref={(el) => { fileRefs.current[slot.key] = el }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(slot.key, f) }}
              />
            </div>
          )
        })}
      </div>

      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 text-sm text-white shadow-lg z-50 flex items-center gap-2 ${toast.ok ? 'bg-[#1A1714]' : 'bg-red-600'}`}>
          {toast.ok && <Check size={14} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}
