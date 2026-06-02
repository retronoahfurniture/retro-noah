import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery — Reclaimed Wood Furniture Portfolio',
  description:
    'Browse our gallery of handcrafted reclaimed wood furniture built in Randburg, Johannesburg. Dining tables, coffee tables, side tables, benches, bathroom vanities, sideboards and outdoor furniture — all custom-made to order.',
  keywords: [
    'reclaimed wood furniture gallery',
    'custom dining tables Johannesburg',
    'handcrafted furniture portfolio',
    'wood furniture Randburg',
    'bespoke furniture gallery',
  ],
  alternates: { canonical: 'https://retronoah.co.za/gallery' },
  openGraph: {
    title: 'Gallery | Retro Noah Furniture — Reclaimed Wood Portfolio',
    description:
      'Browse our portfolio of handcrafted reclaimed wood furniture. All pieces custom-built in Randburg, Johannesburg.',
    url: 'https://retronoah.co.za/gallery',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
