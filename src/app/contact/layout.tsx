import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Get a Custom Furniture Quote',
  description:
    'Get in touch with Retro Noah Furniture. WhatsApp us for a custom furniture quote. Based in Randburg, Johannesburg — delivering handcrafted reclaimed wood furniture across Gauteng.',
  keywords: [
    'contact Retro Noah',
    'furniture quote Randburg',
    'custom furniture quote Johannesburg',
    'WhatsApp furniture order',
    'bespoke furniture enquiry',
  ],
  alternates: { canonical: 'https://retronoah.co.za/contact' },
  openGraph: {
    title: 'Contact | Retro Noah Furniture — Get a Custom Quote',
    description:
      'WhatsApp us for a custom furniture quote. Based in Randburg, Johannesburg.',
    url: 'https://retronoah.co.za/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
