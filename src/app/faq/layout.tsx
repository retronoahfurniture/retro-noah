import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Frequently asked questions about Retro Noah Furniture. Learn about our custom build process, wood types, pricing, lead times, delivery across Gauteng, and reclaimed wood materials.',
  keywords: [
    'furniture FAQ Johannesburg',
    'custom furniture questions',
    'reclaimed wood furniture process',
    'furniture lead time South Africa',
    'how to order custom furniture',
  ],
  alternates: { canonical: 'https://retronoah.co.za/faq' },
  openGraph: {
    title: 'FAQ | Retro Noah Furniture — Common Questions',
    description:
      'Everything you need to know about ordering custom reclaimed wood furniture from Retro Noah in Randburg.',
    url: 'https://retronoah.co.za/faq',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where are you based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are based in Randburg, Johannesburg. We deliver across Gauteng and can arrange delivery further afield depending on the size and weight of the piece.',
      },
    },
    {
      '@type': 'Question',
      name: 'What wood do you use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We primarily use reclaimed Oregon pine, reclaimed Baltic fir, French oak, and Brazilian hardwood. All wood is sourced from buildings being renovated or demolished across greater Gauteng — typically 70 to 100 years old.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to manufacture a piece?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Internally, a piece takes 1–2 weeks to build. However, we give a lead time of 4–6 weeks to allow for any necessary preparation and to ensure your piece gets the time and attention it deserves.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you have a catalogue or set pricing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have set price ranges as a guide, but every piece is custom and final pricing depends on exact size, finish, wood availability, and complexity. Contact us for a personalised quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I place an order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Step 1: Reach out to us via WhatsApp, Instagram, Facebook, or in person. Step 2: We discuss your requirements and send you a quote. Step 3: You pay a 60% deposit to secure your spot in our order list. Step 4: We build and deliver your piece.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your payment structure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We require a 60% deposit to start production. The remaining 40% is payable upon completion, before delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we have a designated driver who handles deliveries. Delivery fees are area-dependent — please ask us when getting a quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you build large tables for corporate or church spaces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We have built boardroom tables and workstations for companies, as well as large high tables for church lounges. No project is too large.',
      },
    },
  ],
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
