import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, Leaf, Ruler, Heart } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Retro Noah Furniture | Handcrafted Reclaimed Wood Furniture Randburg',
  description:
    'Bespoke furniture handcrafted from reclaimed wood in Randburg, Johannesburg. Custom dining tables, coffee tables, benches & vanities. Made to order, delivered across Gauteng. WhatsApp us for a quote.',
  alternates: { canonical: 'https://retronoah.co.za' },
  openGraph: {
    title: 'Retro Noah Furniture | Handcrafted Reclaimed Wood Furniture Randburg',
    description:
      'Bespoke furniture handcrafted from reclaimed wood in Randburg, Johannesburg. Custom dining tables, benches, vanities and more.',
    url: 'https://retronoah.co.za',
    images: [{ url: '/dining.png', width: 1200, height: 630, alt: 'Retro Noah Furniture' }],
  },
}

const BASE = 'https://kefrsmafzdbqszxadnik.supabase.co/storage/v1/object/public/product-images/rn'

const processSteps = [
  {
    step: '01',
    title: 'Reach Out',
    description:
      'Contact us on WhatsApp, Instagram, Facebook, or in person. We love hearing about your vision.',
  },
  {
    step: '02',
    title: 'We Quote',
    description:
      'We discuss your exact requirements — size, finish, wood type — and send you a detailed quote within 24–48 hours.',
  },
  {
    step: '03',
    title: 'Build & Deliver',
    description:
      'A 60% deposit secures your spot. We build in 1–2 weeks and deliver to your door across Gauteng.',
  },
]

const values = [
  {
    Icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Every piece uses reclaimed wood from Gauteng buildings — 70 to 100 years old.',
  },
  {
    Icon: Ruler,
    title: 'Custom Built',
    description: 'We build to your exact dimensions, finish, and style — no compromises.',
  },
  {
    Icon: Award,
    title: 'Built to Last',
    description: 'Solid joinery, water-based sealants, finishes that age beautifully over time.',
  },
  {
    Icon: Heart,
    title: 'Family Business',
    description: 'Father and son, driven by faith. Your piece is made with genuine care.',
  },
]

const fallbackFeatured = [
  { name: 'Harvest Dining Table',  category: 'Dining Table',    image: `${BASE}/dining-tables/dt-25.jpg`, range: 'Harvest Range'   },
  { name: 'Reclaimed Dining Table', category: 'Dining Table',   image: `${BASE}/dining-tables/dt-33.jpg`, range: 'Farmhouse Range' },
  { name: 'Bathroom Vanity',        category: 'Bathroom Vanity', image: `${BASE}/vanities/v-14.jpg`,       range: 'Farmhouse Range' },
  { name: 'Dining Bench',           category: 'Bench',           image: `${BASE}/benches/b-01.png`,        range: 'Farmhouse Range' },
]

const FALLBACK_SETTINGS = {
  hero_image:             `${BASE}/dining-tables/dt-02.png`,
  range_harvest_image:    `${BASE}/dining-tables/dt-09.png`,
  range_farmhouse_image:  `${BASE}/dining-tables/dt-03.png`,
  range_industrial_image: `${BASE}/dining-tables/dt-24.jpg`,
  cta_image:              `${BASE}/outdoor/out-02.jpg`,
}

async function getSiteSettings() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const res = await fetch(`${url}/rest/v1/site_settings?select=key,value`, {
      headers: { apikey: key!, Authorization: `Bearer ${key!}` },
      cache: 'no-store',
    })
    if (!res.ok) return FALLBACK_SETTINGS
    const rows = await res.json() as { key: string; value: string }[]
    const settings = { ...FALLBACK_SETTINGS }
    for (const row of rows) if (row.key in settings) (settings as Record<string, string>)[row.key] = row.value
    return settings
  } catch {
    return FALLBACK_SETTINGS
  }
}

async function getFeaturedProducts() {
  try {
    const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const res  = await fetch(
      `${url}/rest/v1/products?featured=eq.true&select=name,category,image_url,range_label&order=created_at.asc&limit=4`,
      { headers: { apikey: key!, Authorization: `Bearer ${key!}` }, cache: 'no-store' }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return null
    return data.map((p: { name: string; category: string; image_url: string; range_label: string }) => ({
      name:     p.name,
      category: p.category,
      image:    p.image_url,
      range:    p.range_label,
    }))
  } catch {
    return null
  }
}

export default async function Home() {
  const [siteSettings, featuredProducts] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(),
  ])
  const displayProducts = featuredProducts ?? fallbackFeatured

  const ranges = [
    {
      id: 'harvest',
      name: 'Harvest Range',
      subtitle: 'French Country',
      description: 'Classic French Country elegance — natural oak wash, turned or pedestal legs, timeless proportions. Our most beloved range for families who gather around the table.',
      image: siteSettings.range_harvest_image,
      href: '/products?range=harvest',
    },
    {
      id: 'farmhouse',
      name: 'Farmhouse Range',
      subtitle: 'Organic & Rustic',
      description: 'Organic, earthy, and beautifully imperfect. French oak wash and aged walnut finishes over reclaimed Baltic fir. Made for homes that breathe.',
      image: siteSettings.range_farmhouse_image,
      href: '/products?range=farmhouse',
    },
    {
      id: 'industrial',
      name: 'Industrial Range',
      subtitle: 'Wood & Steel',
      description: 'Steel cube bases and A-frames meet 70-year-old reclaimed wood. Bold, architectural, and unapologetically modern. For spaces that make a statement.',
      image: siteSettings.range_industrial_image,
      href: '/products?range=industrial',
    },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src={siteSettings.hero_image}
          alt="Retro Noah Furniture — handcrafted dining table"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/65" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase text-white/65 mb-6 fade-in-up fade-in-up-delay-1">
            Handcrafted in Randburg, Johannesburg
          </p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl mb-6 fade-in-up fade-in-up-delay-2">
            Retro Noah
          </h1>
          <p className="text-base sm:text-lg text-white/75 font-light max-w-lg mx-auto mb-10 fade-in-up fade-in-up-delay-3">
            Beautifully built to last. Bespoke furniture from reclaimed wood — made for the way you live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-3">
            <Link
              href="/gallery"
              className="px-8 py-4 bg-white text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#F8F7F4] transition-colors"
            >
              View Our Work
            </Link>
            <a
              href="https://wa.me/27795199747?text=Hi%20Retro%20Noah%2C%20I%27d%20like%20to%20discuss%20a%20piece%20of%20furniture."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/70 text-white text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-white hover:text-[#1A1714] transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#1A1714] overflow-hidden py-3.5">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-6 text-[10px] tracking-[0.22em] uppercase text-white/40">
              <span>Custom Handmade</span>
              <span className="text-white/20">◆</span>
              <span>Eco-Friendly Reclaimed Wood</span>
              <span className="text-white/20">◆</span>
              <span>Beautifully Built to Last</span>
              <span className="text-white/20">◆</span>
              <span>4–16 Seaters Available</span>
              <span className="text-white/20">◆</span>
              <span>Randburg, Johannesburg</span>
              <span className="text-white/20">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <section className="py-20 lg:py-28 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal animation="reveal-3d" threshold={0.1}>
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Why Retro Noah</p>
              <h2 className="font-display text-4xl lg:text-5xl">
                We make woodworking about{' '}
                <em>you</em>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map(({ Icon, title, description }, i) => (
              <ScrollReveal key={title} animation="reveal-3d" delay={i * 100} threshold={0.08}>
                <div className="text-center card-lift">
                  <div className="w-11 h-11 border border-[#EEECE8] flex items-center justify-center mx-auto mb-5 text-[#6B6660]">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display text-xl mb-3">{title}</h3>
                  <p className="text-[#6B6660] text-sm leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal animation="reveal-3d" threshold={0.1}>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Our Work</p>
                <h2 className="font-display text-4xl lg:text-5xl">Featured Pieces</h2>
              </div>
              <Link
                href="/gallery"
                className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-medium text-[#1A1714] hover:gap-4 transition-all"
              >
                View All <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayProducts.map((product, i) => (
              <ScrollReveal key={product.name} animation="reveal-3d" delay={i * 110} threshold={0.08}>
                <Link href="/gallery" className="group block lift-hover">
                  <div className="relative overflow-hidden aspect-[3/4] bg-[#EEECE8] mb-3 img-hover-zoom">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-1">{product.range}</p>
                  <h3 className="font-display text-lg">{product.name}</h3>
                  <p className="text-[#6B6660] text-xs mt-0.5">{product.category}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-medium">
              View All Pieces <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* RANGES */}
      <section className="py-20 lg:py-28 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal animation="reveal-3d" threshold={0.1}>
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Collections</p>
              <h2 className="font-display text-4xl lg:text-5xl">Three Distinct Ranges</h2>
            </div>
          </ScrollReveal>
          <div className="flex flex-col">
            {ranges.map((range, i) => (
              <div
                key={range.id}
                className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <ScrollReveal
                  animation={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}
                  threshold={0.08}
                  className={`relative aspect-[16/10] overflow-hidden img-hover-zoom ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}
                >
                  <Image
                    src={range.image}
                    alt={range.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ScrollReveal>
                <ScrollReveal
                  animation={i % 2 === 0 ? 'reveal-right' : 'reveal-left'}
                  threshold={0.08}
                  delay={80}
                  className={`flex items-center bg-white px-8 lg:px-16 py-12 lg:py-16 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">{range.subtitle}</p>
                    <h3 className="font-display text-4xl lg:text-5xl mb-5">{range.name}</h3>
                    <p className="text-[#6B6660] leading-relaxed mb-8 max-w-sm">{range.description}</p>
                    <Link
                      href={range.href}
                      className="inline-flex items-center gap-3 text-[12px] tracking-[0.1em] uppercase font-medium border-b border-[#1A1714] pb-0.5 hover:gap-5 transition-all"
                    >
                      Explore Range <ArrowRight size={12} />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal animation="reveal-scale" threshold={0.1}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-6">Our Story</p>
            <blockquote className="font-display text-3xl lg:text-5xl font-light italic leading-tight text-[#1A1714] mb-10">
              "We saw an opportunity to make beautiful furniture from reclaimed wood — and to be a blessing to the families we serve."
            </blockquote>
            <div className="w-10 h-px bg-[#C8C5BE] mx-auto mb-8" />
            <p className="text-[#6B6660] text-sm leading-relaxed max-w-2xl mx-auto mb-8">
              Werner Geyer founded Retro Noah on biblical principles — just as Noah had a God-given talent to build the Ark, we believe our craft is a gift to share. Every piece of reclaimed wood carries 70–100 years of history from Gauteng buildings, given new life in your home.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-medium border-b border-[#1A1714] pb-0.5 hover:gap-4 transition-all">
              Read Our Story <ArrowRight size={12} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28 bg-[#1A1714] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal animation="reveal-3d" threshold={0.1}>
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/35 mb-3">How It Works</p>
              <h2 className="font-display text-4xl lg:text-5xl">From Idea to Your Home</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {processSteps.map(({ step, title, description }, i) => (
              <ScrollReveal key={step} animation="reveal-3d" delay={i * 120} threshold={0.08}>
                <div className="px-8 py-10 text-center">
                  <p className="font-display text-6xl font-light text-white/10 mb-4">{step}</p>
                  <h3 className="font-display text-2xl mb-4">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal animation="reveal-3d" delay={360} threshold={0.08}>
            <div className="mt-12 text-center">
              <a
                href="https://wa.me/27795199747?text=Hi%20Retro%20Noah%2C%20I%20have%20a%20furniture%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#F8F7F4] transition-colors"
              >
                Start Your Order on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal animation="reveal-3d" threshold={0.1}>
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Pricing Guide</p>
              <h2 className="font-display text-4xl lg:text-5xl">Great quality, fair pricing</h2>
              <p className="text-[#6B6660] text-sm mt-4 max-w-md mx-auto">
                All pieces are custom-made. Final quote depends on size and finish. Contact us for a personalised price.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Dining Table (6-seater)', price: 'R6k–R10k' },
              { label: 'Dining Table (8–10 seater)', price: 'R10k–R18k' },
              { label: 'Dining Table (12+ seater)', price: 'R16k+' },
              { label: 'Dining Bench', price: 'R3,000' },
              { label: 'Coffee Table', price: 'R3k–R12k' },
              { label: 'Side Table', price: 'R3,500' },
            ].map(({ label, price }, i) => (
              <ScrollReveal key={label} animation="reveal-3d" delay={i * 60} threshold={0.08}>
                <div className="bg-white border border-[#EEECE8] p-5 text-center card-lift h-full">
                  <p className="font-display text-lg font-medium text-[#1A1714] mb-1.5">{price}</p>
                  <p className="text-[#6B6660] text-xs leading-snug">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal animation="reveal-3d" delay={400} threshold={0.08}>
            <div className="mt-10 text-center">
              <a
                href="https://wa.me/27795199747"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1714] text-white text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#2D2926] transition-colors"
              >
                Request a Custom Quote
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 lg:py-28">
        <ScrollReveal animation="reveal-scale" threshold={0.15}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="font-display text-3xl lg:text-4xl italic font-light text-[#1A1714] leading-snug mb-8">
              "We love our table — thank you very much."
            </p>
            <div className="w-8 h-px bg-[#C8C5BE] mx-auto mb-4" />
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#6B6660]">A Satisfied Client</p>
          </div>
        </ScrollReveal>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 lg:py-44 overflow-hidden">
        <Image
          src={siteSettings.cta_image}
          alt="Retro Noah outdoor furniture set"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
        <ScrollReveal animation="reveal-scale" threshold={0.1}>
          <div className="relative z-10 text-center text-white px-6">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-6">
              Ready to Build Your Piece?
            </h2>
            <p className="text-white/65 text-sm sm:text-base mb-10 max-w-md mx-auto">
              Reach out today. We respond quickly and love hearing about your vision.
            </p>
            <a
              href="https://wa.me/27795199747?text=Hi%20Retro%20Noah%2C%20I%27d%20like%20to%20enquire%20about%20a%20custom%20piece."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#F8F7F4] transition-colors"
            >
              WhatsApp Us Now
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
