import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products — Custom Reclaimed Wood Furniture Johannesburg',
  description:
    'Shop our range of bespoke reclaimed wood furniture. Harvest, Farmhouse and Industrial ranges. Custom dining tables from R6,000, benches, vanities, sideboards and more. Based in Randburg, delivering across Gauteng.',
  keywords: [
    'custom furniture prices Johannesburg',
    'reclaimed wood dining table price',
    'bespoke furniture Randburg',
    'dining tables for sale Johannesburg',
    'custom made furniture South Africa',
    'wood furniture prices Gauteng',
  ],
  alternates: { canonical: 'https://retronoah.co.za/products' },
  openGraph: {
    title: 'Products | Retro Noah Furniture — Custom Reclaimed Wood Furniture',
    description:
      'Custom dining tables from R6,000. Harvest, Farmhouse and Industrial ranges. Based in Randburg, delivering across Gauteng.',
    url: 'https://retronoah.co.za/products',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
