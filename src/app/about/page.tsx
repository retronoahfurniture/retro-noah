import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

const BASE = 'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images'

export const metadata: Metadata = {
  title: 'Our Story | Retro Noah Furniture',
  description:
    'The story behind Retro Noah Furniture — founded by Werner Geyer in Randburg, Johannesburg. Handcrafted bespoke furniture rooted in faith, family and reclaimed wood.',
}

const milestones = [
  {
    year: 'The Beginning',
    title: 'Opportunity in Reclaimed Wood',
    description:
      'Werner saw an opportunity to make beautiful furniture from reclaimed wood at a time when it was a profitable and growing sector. What started as a business opportunity quickly became a calling.',
  },
  {
    year: 'The Name',
    title: "Why 'Retro Noah'",
    description:
      "The name is rooted in biblical principles. Just as God gave Noah a talent to build an incredible ark in a time of need, Werner believes he has been given a talent to build furniture that serves families. 'Retro' speaks to the reclaimed, vintage nature of the wood — and together it became 'Retro Noah'.",
  },
  {
    year: 'The Drive',
    title: 'Family and Faith',
    description:
      'Werner is driven by his family and his faith in Jesus. He believes that by God\'s grace, this business is able to be a blessing to other families. "I want people to be able to say \'wow\' — only God could have done this."',
  },
  {
    year: 'Today',
    title: 'Father & Son',
    description:
      "Werner's son Aiden is now part of the business, helping across all areas. The vision is for the whole family to benefit from Retro Noah — and for the business to eventually be something Aiden runs as his own.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <Image
          src={`${BASE}/dining-tables/harvest-pedestal-dark.jpg`}
          alt="Retro Noah handcrafted reclaimed wood dining table"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-3">About Us</p>
          <h1 className="font-display text-5xl lg:text-7xl text-white">Our Story</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-5">Werner Geyer — Founder</p>
            <h2 className="font-display text-4xl lg:text-5xl mb-6 leading-tight">
              A craft born from faith,<br /> wood, and family.
            </h2>
            <p className="text-[#6B6660] leading-relaxed mb-5">
              Before furniture, Werner was a professional golfer — but furniture has always been in the family. When the opportunity arose to build something meaningful from reclaimed wood, Werner answered the call.
            </p>
            <p className="text-[#6B6660] leading-relaxed mb-5">
              His background is in the family, his drive is in his faith, and his purpose is in the people he serves. Every table, every bench, every vanity leaves the workshop with a piece of that story in it.
            </p>
            <p className="text-[#6B6660] leading-relaxed">
              Today, Werner's son Aiden works alongside him — the beginning of what Werner hopes will become a true family legacy.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden img-hover-zoom">
            <Image
              src={`${BASE}/dining-tables/harvest-natural-8seater.jpg`}
              alt="Craftsman working on a reclaimed wood table"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* TAGLINE */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="font-display text-4xl lg:text-6xl italic font-light text-[#1A1714] leading-tight">
            "Beautifully built to last."
          </blockquote>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">The Journey</p>
            <h2 className="font-display text-4xl lg:text-5xl">How It All Began</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {milestones.map(({ year, title, description }) => (
              <div key={title} className="border border-[#EEECE8] p-8 lg:p-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B6660] mb-3">{year}</p>
                <h3 className="font-display text-2xl lg:text-3xl mb-4">{title}</h3>
                <p className="text-[#6B6660] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE WOOD */}
      <section className="py-20 lg:py-28 bg-[#1A1714] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden img-hover-zoom">
            <Image
              src={`${BASE}/sideboards/rustic-reclaimed-sideboard.jpg`}
              alt="Reclaimed wood planks — Oregon pine and Baltic fir"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-5">The Material</p>
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              Wood that carries 70–100 years of history.
            </h2>
            <p className="text-white/60 leading-relaxed mb-5">
              We source reclaimed Oregon pine, Baltic fir, French oak, and Brazilian hardwood from buildings being renovated or demolished across greater Gauteng. Our runners collect from houses, apartments, and offices — places with stories.
            </p>
            <p className="text-white/60 leading-relaxed mb-5">
              This wood is then brought to our workshop in Randburg, cleaned, and transformed into bespoke pieces sealed with our water-based grip seal sealant — no harmful solvents, just beautiful, lasting finishes.
            </p>
            <p className="text-white/60 leading-relaxed">
              Available finishes: Natural, French Oak Wash, Antique Wash, White or Grey Wash, and Aged Walnut Wash. We always work with your ideas too.
            </p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-20 lg:py-28 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-5">Our Vision</p>
          <h2 className="font-display text-4xl lg:text-5xl max-w-3xl mx-auto leading-tight mb-6">
            A new workshop, a showroom, a team of ten.
          </h2>
          <p className="text-[#6B6660] text-sm leading-relaxed max-w-2xl mx-auto mb-10">
            Werner's dream is to keep growing — with a proper showroom so clients can see and feel the work before they order, a larger team that can serve more families, and a business that thrives for the next generation. One consistent order at a time.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1714] text-white text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#2D2926] transition-colors"
          >
            Get in Touch <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </>
  )
}
