'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { Metadata } from 'next'

const faqs = [
  {
    question: 'Where are you based?',
    answer:
      'We are based in Randburg, Johannesburg. We deliver across Gauteng and can arrange delivery further afield depending on the size and weight of the piece.',
  },
  {
    question: 'What wood do you use?',
    answer:
      'We primarily use reclaimed Oregon pine, reclaimed Baltic fir, French oak, and Brazilian hardwood. All wood is sourced from buildings being renovated or demolished across greater Gauteng — typically 70 to 100 years old.',
  },
  {
    question: 'How long does it take to manufacture a piece?',
    answer:
      'Internally, a piece takes 1–2 weeks to build. However, we give a lead time of 4–6 weeks to allow for any necessary preparation and to ensure your piece gets the time and attention it deserves.',
  },
  {
    question: 'Do you have a catalogue or set pricing?',
    answer:
      'We have set price ranges as a guide (see our Products page), but every piece is custom and final pricing depends on exact size, finish, wood availability, and complexity. Contact us for a personalised quote.',
  },
  {
    question: 'Where can I see your products in person?',
    answer:
      'Currently, viewing is by appointment at our workshop in Randburg. One of our future goals is to open a dedicated showroom — watch this space. In the meantime, our gallery and social media show a wide range of completed work.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Step 1: Reach out to us via WhatsApp, Instagram, Facebook, or in person. Step 2: We discuss your requirements and send you a quote. Step 3: You pay a 60% deposit to secure your spot in our order list. Step 4: We build and deliver your piece.',
  },
  {
    question: 'What is your payment structure?',
    answer:
      'We require a 60% deposit to start production and add you to our order list. The remaining 40% is payable upon completion, before delivery. Please note there are no refunds on deposited amounts once production has begun.',
  },
  {
    question: 'What finishes are available?',
    answer:
      'Our standard finishes are: Natural, French Oak Wash, Antique Wash, White or Grey Wash, and Aged Walnut Wash. We also work with client-supplied ideas — our finishes use a water-based grip seal sealant that is VOC-free, mixed with tinters and colours to create custom results.',
  },
  {
    question: 'Do you offer matching bench sets?',
    answer:
      'Yes! Any dining table in our range can be paired with a matching bench set. Benches are built to the same dimensions and finish as the table for a seamless look.',
  },
  {
    question: 'Do you deliver?',
    answer:
      'Yes, we have a designated driver who handles deliveries. Delivery fees are area-dependent — please ask us when getting a quote.',
  },
  {
    question: 'Do you offer a guarantee?',
    answer:
      'We look at each query on a case-by-case basis. We stand by the quality of our work and will always recommend the best course of action for any issue that may arise. We also provide aftercare guidance when your piece is delivered.',
  },
  {
    question: 'Can you build large tables for corporate or church spaces?',
    answer:
      'Absolutely. We have built boardroom tables and workstations for companies, as well as large high tables for church lounges. We also serve the Jewish community with large tables of 12+ seaters. No project is too large.',
  },
  {
    question: 'Are your products eco-friendly?',
    answer:
      'Yes — by using reclaimed wood from buildings being renovated across Gauteng, we give a second life to timber that would otherwise go to waste. Our sealants are water-based with no harmful solvents. We are proud of our eco-conscious approach.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#EEECE8]">
      <button
        className="w-full text-left flex items-start justify-between gap-6 py-6"
        onClick={() => setOpen(!open)}
      >
        <span className="font-display text-xl pr-4">{question}</span>
        <span className="shrink-0 mt-1 text-[#6B6660]">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[400px] pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-[#6B6660] text-sm leading-relaxed pr-10">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      {/* HEADER */}
      <section className="pt-32 pb-12 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Answers</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">
            Frequently Asked Questions
          </h1>
          <p className="text-[#6B6660] text-sm mt-4 max-w-xl">
            Everything you need to know about ordering a custom piece from Retro Noah.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl lg:text-4xl mb-4">Still have a question?</h2>
          <p className="text-[#6B6660] text-sm mb-8">
            Reach out on WhatsApp or email — we&apos;re always happy to chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/27792808500"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#1A1714] text-white text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#2D2926] transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:retronoah@icloud.com"
              className="px-8 py-4 border border-[#1A1714] text-[#1A1714] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#1A1714] hover:text-white transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
