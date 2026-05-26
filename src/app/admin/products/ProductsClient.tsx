'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Plus, X, Upload, RefreshCw, Star, Sparkles } from 'lucide-react'

type Product = {
  id: string
  name: string
  category: string
  range: string
  range_label: string
  description: string
  sizes: string[]
  price_from: number
  price_to: number
  image_url: string
  images: string[]
  featured: boolean
  is_new: boolean
  created_at: string
}

const CATEGORIES = [
  { id: 'dining-table', label: 'Dining Tables' },
  { id: 'coffee-table', label: 'Coffee Tables' },
  { id: 'side-table', label: 'Side Tables' },
  { id: 'bench', label: 'Benches' },
  { id: 'server-sideboard', label: 'Sideboards' },
  { id: 'outdoor-table', label: 'Outdoor' },
  { id: 'bathroom-vanity', label: 'Bathroom' },
  { id: 'other', label: 'Other' },
]

const RANGES = [
  { id: 'harvest', label: 'Harvest Range' },
  { id: 'farmhouse', label: 'Farmhouse Range' },
  { id: 'industrial', label: 'Industrial Range' },
  { id: 'custom', label: 'Custom' },
]

const EMPTY_PRODUCT = {
  name: '',
  category: 'dining-table',
  range: 'harvest',
  range_label: 'Harvest Range',
  description: '',
  sizes: [''],
  price_from: 0,
  price_to: 0,
  image_url: '',
  images: [],
  featured: false,
  is_new: false,
}

type FormState = Omit<Product, 'id' | 'created_at'> & { id?: string }

function ProductForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: FormState
  onSave: (data: FormState) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function set(key: keyof FormState, value: unknown) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  async function handleImageUpload(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'products')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error)
      const { url } = await res.json()
      set('image_url', url)
    } catch (e) {
      alert(String(e))
    } finally {
      setUploading(false)
    }
  }

  function handleRangeChange(rangeId: string) {
    const found = RANGES.find((r) => r.id === rangeId)
    setForm((p) => ({ ...p, range: rangeId, range_label: found?.label ?? rangeId }))
  }

  const sizesStr = form.sizes.join(', ')

  return (
    <div className="bg-white border border-[#EEECE8] p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl">{form.id ? 'Edit Product' : 'Add New Product'}</h2>
        <button onClick={onCancel} className="text-[#6B6660] hover:text-[#1A1714]"><X size={18} /></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-2">Product Image</label>
          <div
            className="relative border-2 border-dashed border-[#EEECE8] aspect-[4/3] flex items-center justify-center cursor-pointer hover:border-[#1A1714] transition-colors overflow-hidden"
            onClick={() => fileRef.current?.click()}
          >
            {form.image_url ? (
              <Image src={form.image_url} alt="Product" fill className="object-cover" unoptimized />
            ) : uploading ? (
              <div className="text-center">
                <RefreshCw size={24} className="animate-spin text-[#6B6660] mx-auto mb-2" />
                <p className="text-xs text-[#6B6660]">Uploading...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload size={24} className="text-[#6B6660] mx-auto mb-2" />
                <p className="text-xs text-[#6B6660]">Click to upload</p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }}
          />
          <input
            type="text"
            value={form.image_url}
            onChange={(e) => set('image_url', e.target.value)}
            placeholder="Or paste image URL"
            className="mt-2 w-full border border-[#EEECE8] px-3 py-2 text-xs focus:outline-none focus:border-[#1A1714]"
          />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Product Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714]"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full border border-[#EEECE8] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#1A1714]"
              >
                {CATEGORIES.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Range</label>
              <select
                value={form.range}
                onChange={(e) => handleRangeChange(e.target.value)}
                className="w-full border border-[#EEECE8] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#1A1714]"
              >
                {RANGES.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Sizes (comma separated)</label>
              <input
                type="text"
                value={sizesStr}
                onChange={(e) => set('sizes', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                placeholder="4-seater, 6-seater, 8-seater"
                className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Price From (R)</label>
              <input
                type="number"
                value={form.price_from}
                onChange={(e) => set('price_from', Number(e.target.value))}
                className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714]"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Price To (R)</label>
              <input
                type="number"
                value={form.price_to}
                onChange={(e) => set('price_to', Number(e.target.value))}
                className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className="w-full border border-[#EEECE8] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1714] resize-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="w-4 h-4 accent-[#1A1714]"
              />
              <Star size={14} className="text-[#6B6660]" />
              <span className="text-sm text-[#6B6660]">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_new}
                onChange={(e) => set('is_new', e.target.checked)}
                className="w-4 h-4 accent-[#1A1714]"
              />
              <Sparkles size={14} className="text-[#6B6660]" />
              <span className="text-sm text-[#6B6660]">Mark as New (badge shown on site)</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSave(form)}
              disabled={saving || !form.name}
              className="px-6 py-2.5 bg-[#1A1714] text-white text-[12px] tracking-[0.1em] uppercase hover:bg-[#2D2926] transition-colors disabled:opacity-40"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-2.5 border border-[#EEECE8] text-[12px] tracking-[0.1em] uppercase text-[#6B6660] hover:text-[#1A1714] hover:border-[#1A1714] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function fmt(n: number) {
  return n >= 1000 ? `R${(n / 1000).toFixed(0)}k` : `R${n.toLocaleString()}`
}

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      if (!res.ok) throw new Error(await res.text())
      setProducts(await res.json())
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(form: FormState) {
    setSaving(true)
    try {
      const isEdit = !!form.id
      const url = isEdit ? `/api/admin/products/${form.id}` : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'
      const body = { ...form }
      delete (body as { id?: string }).id

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      const saved = await res.json()
      if (isEdit) {
        setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)))
        setEditingId(null)
      } else {
        setProducts((prev) => [...prev, saved])
        setAdding(false)
      }
      showToast(isEdit ? 'Product updated' : 'Product added')
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      showToast('Product deleted')
    } catch (e) {
      showToast(String(e), false)
    } finally {
      setDeleting(null)
    }
  }

  async function quickToggle(product: Product, field: 'is_new' | 'featured') {
    const updated = { ...product, [field]: !product[field] }
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: updated[field] }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      const saved = await res.json()
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)))
      showToast(
        field === 'is_new'
          ? (updated.is_new ? 'Marked as New' : 'New badge removed')
          : (updated.featured ? 'Marked as Featured' : 'Removed from Featured')
      )
    } catch (e) {
      showToast(String(e), false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-[#1A1714]">Products</h1>
          <p className="text-[#6B6660] text-sm mt-1">{products.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="p-2 border border-[#EEECE8] text-[#6B6660] hover:text-[#1A1714]"
            title="Refresh"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => { setAdding(true); setEditingId(null) }}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1714] text-white text-[12px] tracking-[0.1em] uppercase hover:bg-[#2D2926] transition-colors"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {products.length === 0 && !loading && (
        <div className="bg-amber-50 border border-amber-200 p-5 mb-6 text-sm">
          <p className="font-medium text-amber-800 mb-2">Products table may not be set up yet</p>
          <p className="text-amber-700 mb-3">Run the SQL in <code className="bg-amber-100 px-1">migration.sql</code> in your Supabase SQL Editor, then seed.</p>
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

      {adding && (
        <ProductForm
          initial={EMPTY_PRODUCT as FormState}
          onSave={handleSave}
          onCancel={() => setAdding(false)}
          saving={saving}
        />
      )}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-[#EEECE8] animate-pulse" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id}>
              {editingId === product.id ? (
                <ProductForm
                  initial={{ ...product }}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                />
              ) : (
                <div className="bg-white border border-[#EEECE8] p-4 flex items-center gap-4 hover:border-[#C8C5BE] transition-colors">
                  <div className="relative w-20 h-16 shrink-0 bg-[#F8F7F4] overflow-hidden">
                    {product.image_url && (
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" unoptimized />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-display text-lg text-[#1A1714] truncate">{product.name}</p>
                      {product.is_new && (
                        <span className="text-[9px] tracking-[0.15em] uppercase bg-[#1A1714] text-white px-2 py-0.5">New</span>
                      )}
                      {product.featured && (
                        <span className="text-[9px] tracking-[0.15em] uppercase bg-[#8B7355] text-white px-2 py-0.5">Featured</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B6660] mt-0.5">
                      {product.range_label} · {CATEGORIES.find((c) => c.id === product.category)?.label ?? product.category} · {fmt(product.price_from)} – {fmt(product.price_to)}
                    </p>
                    <p className="text-xs text-[#6B6660] mt-0.5 line-clamp-1">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => quickToggle(product, 'is_new')}
                      title={product.is_new ? 'Remove New badge' : 'Mark as New'}
                      className={`p-2 border transition-colors ${product.is_new ? 'border-[#1A1714] bg-[#1A1714] text-white' : 'border-[#EEECE8] text-[#6B6660] hover:border-[#1A1714] hover:text-[#1A1714]'}`}
                    >
                      <Sparkles size={13} />
                    </button>
                    <button
                      onClick={() => quickToggle(product, 'featured')}
                      title={product.featured ? 'Remove Featured' : 'Mark as Featured'}
                      className={`p-2 border transition-colors ${product.featured ? 'border-[#8B7355] bg-[#8B7355] text-white' : 'border-[#EEECE8] text-[#6B6660] hover:border-[#8B7355] hover:text-[#8B7355]'}`}
                    >
                      <Star size={13} />
                    </button>
                    <button
                      onClick={() => { setEditingId(product.id); setAdding(false) }}
                      className="p-2 border border-[#EEECE8] text-[#6B6660] hover:border-[#1A1714] hover:text-[#1A1714] transition-colors"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="p-2 border border-[#EEECE8] text-[#6B6660] hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 text-sm text-white shadow-lg z-50 ${toast.ok ? 'bg-[#1A1714]' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
