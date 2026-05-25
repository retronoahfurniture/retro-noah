'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Plus, X, Check, Upload, RefreshCw } from 'lucide-react'

type GalleryItem = {
  id: string
  src: string
  alt: string
  category: string
  tall: boolean
  sort_order: number
}

const CATEGORIES = [
  { id: 'dining-table', label: 'Dining Tables' },
  { id: 'side-table', label: 'Side Tables' },
  { id: 'bench', label: 'Benches' },
  { id: 'server-sideboard', label: 'Sideboards' },
  { id: 'bathroom-vanity', label: 'Vanities' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'mudroom', label: 'Mudroom' },
  { id: 'coffee-table', label: 'Coffee Tables' },
  { id: 'other', label: 'Other' },
]

type EditState = { id: string; alt: string; category: string; tall: boolean } | null
type AddState = { src: string; alt: string; category: string; tall: boolean; uploading: boolean } | null

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('all')
  const [editing, setEditing] = useState<EditState>(null)
  const [adding, setAdding] = useState<AddState>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addFileInputRef = useRef<HTMLInputElement>(null)

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/gallery')
      if (!res.ok) throw new Error(await res.text())
      setItems(await res.json())
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleSaveEdit() {
    if (!editing) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/gallery/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt: editing.alt, category: editing.category, tall: editing.tall }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      const updated = await res.json()
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
      setEditing(null)
      showToast('Saved successfully')
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this image from the gallery?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setItems((prev) => prev.filter((i) => i.id !== id))
      showToast('Deleted')
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setDeleting(null)
    }
  }

  async function handleUploadForAdd(file: File) {
    if (!adding) return
    setAdding((prev) => prev ? { ...prev, uploading: true } : null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'gallery')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error)
      const { url } = await res.json()
      setAdding((prev) => prev ? { ...prev, src: url, uploading: false } : null)
    } catch (e) {
      showToast(String(e), false)
      setAdding((prev) => prev ? { ...prev, uploading: false } : null)
    }
  }

  async function handleSaveAdd() {
    if (!adding || !adding.src || !adding.alt) return
    setSaving(true)
    try {
      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.sort_order)) : 0
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          src: adding.src,
          alt: adding.alt,
          category: adding.category,
          tall: adding.tall,
          sort_order: maxOrder + 1,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      const created = await res.json()
      setItems((prev) => [...prev, created])
      setAdding(null)
      showToast('Image added to gallery')
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setSaving(false)
    }
  }

  const filtered = filterCategory === 'all' ? items : items.filter((i) => i.category === filterCategory)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-[#1A1714]">Gallery</h1>
          <p className="text-[#6B6660] text-sm mt-1">{items.length} images</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="p-2 border border-[#EEECE8] text-[#6B6660] hover:text-[#1A1714] transition-colors"
            title="Refresh"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setAdding({ src: '', alt: '', category: 'dining-table', tall: false, uploading: false })}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1714] text-white text-[12px] tracking-[0.1em] uppercase hover:bg-[#2D2926] transition-colors"
          >
            <Plus size={14} /> Add Image
          </button>
        </div>
      </div>

      {/* DB not ready notice */}
      {!loading && items.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded p-5 mb-6 text-sm">
          <p className="font-medium text-amber-800 mb-2">Gallery table not set up yet</p>
          <p className="text-amber-700 mb-3">Run the SQL in <code className="bg-amber-100 px-1">migration.sql</code> in your Supabase SQL Editor, then hit the button below to seed all 119 existing photos.</p>
          <button
            onClick={async () => {
              const res = await fetch('/api/admin/setup')
              const data = await res.json()
              if (data.error) showToast(data.error, false)
              else { showToast('Seeded successfully!'); load() }
            }}
            className="px-4 py-2 bg-amber-600 text-white text-xs tracking-wide uppercase hover:bg-amber-700 transition-colors"
          >
            Seed Gallery &amp; Products
          </button>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 mb-6">
        {[{ id: 'all', label: 'All' }, ...CATEGORIES].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilterCategory(id)}
            className={`shrink-0 text-[11px] tracking-[0.1em] uppercase font-medium pb-1 border-b transition-all ${
              filterCategory === id ? 'border-[#1A1714] text-[#1A1714]' : 'border-transparent text-[#6B6660] hover:text-[#1A1714]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Add form */}
      {adding && (
        <div className="bg-white border border-[#EEECE8] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Add New Image</h2>
            <button onClick={() => setAdding(null)} className="text-[#6B6660] hover:text-[#1A1714]">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload area */}
            <div>
              <div
                className="relative border-2 border-dashed border-[#EEECE8] aspect-[4/3] flex items-center justify-center cursor-pointer hover:border-[#1A1714] transition-colors"
                onClick={() => addFileInputRef.current?.click()}
              >
                {adding.src ? (
                  <Image src={adding.src} alt="Preview" fill className="object-cover" unoptimized />
                ) : adding.uploading ? (
                  <div className="text-center">
                    <RefreshCw size={24} className="animate-spin text-[#6B6660] mx-auto mb-2" />
                    <p className="text-xs text-[#6B6660]">Uploading...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="text-[#6B6660] mx-auto mb-2" />
                    <p className="text-xs text-[#6B6660]">Click to upload image</p>
                  </div>
                )}
              </div>
              <input
                ref={addFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadForAdd(f) }}
              />
            </div>
            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Label / Alt Text</label>
                <input
                  type="text"
                  value={adding.alt}
                  onChange={(e) => setAdding((p) => p ? { ...p, alt: e.target.value } : null)}
                  placeholder="e.g. Harvest Dining Table"
                  className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Category</label>
                <select
                  value={adding.category}
                  onChange={(e) => setAdding((p) => p ? { ...p, category: e.target.value } : null)}
                  className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714] bg-white"
                >
                  {CATEGORIES.map(({ id, label }) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="add-tall"
                  checked={adding.tall}
                  onChange={(e) => setAdding((p) => p ? { ...p, tall: e.target.checked } : null)}
                  className="w-4 h-4 accent-[#1A1714]"
                />
                <label htmlFor="add-tall" className="text-sm text-[#6B6660]">Tall format (portrait crop)</label>
              </div>
              <button
                onClick={handleSaveAdd}
                disabled={saving || !adding.src || !adding.alt}
                className="w-full py-2.5 bg-[#1A1714] text-white text-[12px] tracking-[0.1em] uppercase hover:bg-[#2D2926] transition-colors disabled:opacity-40"
              >
                {saving ? 'Adding...' : 'Add to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-[#EEECE8] animate-pulse" />
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative">
              <div className={`relative overflow-hidden bg-[#F8F7F4] ${item.tall ? 'aspect-[2/3]' : 'aspect-[4/3]'}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setEditing({ id: item.id, alt: item.alt, category: item.category, tall: item.tall })}
                    className="p-2 bg-white text-[#1A1714] hover:bg-[#F8F7F4] transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="p-2 bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="mt-2">
                {editing?.id === item.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editing.alt}
                      onChange={(e) => setEditing((p) => p ? { ...p, alt: e.target.value } : null)}
                      className="w-full border border-[#EEECE8] px-2 py-1.5 text-xs focus:outline-none focus:border-[#1A1714]"
                    />
                    <select
                      value={editing.category}
                      onChange={(e) => setEditing((p) => p ? { ...p, category: e.target.value } : null)}
                      className="w-full border border-[#EEECE8] px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-[#1A1714]"
                    >
                      {CATEGORIES.map(({ id, label }) => (
                        <option key={id} value={id}>{label}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`tall-${item.id}`}
                        checked={editing.tall}
                        onChange={(e) => setEditing((p) => p ? { ...p, tall: e.target.checked } : null)}
                        className="accent-[#1A1714]"
                      />
                      <label htmlFor={`tall-${item.id}`} className="text-xs text-[#6B6660]">Tall</label>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#1A1714] text-white text-xs hover:bg-[#2D2926] transition-colors disabled:opacity-50"
                      >
                        <Check size={12} /> Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="px-3 py-1.5 border border-[#EEECE8] text-xs text-[#6B6660] hover:text-[#1A1714] transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-[#1A1714] font-medium truncate">{item.alt}</p>
                    <p className="text-[10px] text-[#6B6660] uppercase tracking-wide">
                      {CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category}
                      {item.tall ? ' · Tall' : ''}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file input for bulk actions */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 text-sm text-white shadow-lg z-50 ${toast.ok ? 'bg-[#1A1714]' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
