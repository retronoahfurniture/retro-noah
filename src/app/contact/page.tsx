'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const waText = encodeURIComponent(
      `Hi Retro Noah! I'm ${formData.name}.\n\nProduct Interest: ${formData.productType || 'General enquiry'}\n\nMessage: ${formData.message}\n\nContact: ${formData.email}${formData.phone ? ` / ${formData.phone}` : ''}`
    )
    window.open(`https://wa.me/27792808500?text=${waText}`, '_blank')
    setSubmitted(true)
  }

  return (
    <>
      {/* HEADER */}
      <section className="pt-32 pb-12 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-3">Reach Out</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">Contact Us</h1>
          <p className="text-[#6B6660] text-sm mt-4 max-w-xl">
            We respond quickly and love talking through ideas. Don&apos;t hesitate — reach out today.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* CONTACT INFO */}
          <div>
            <h2 className="font-display text-3xl lg:text-4xl mb-8">Let&apos;s build something together.</h2>
            <p className="text-[#6B6660] text-sm leading-relaxed mb-10">
              Whether you have a clear vision or just a vague idea — get in touch. We help you figure out exactly what you want, quote honestly, and build beautifully.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              <a
                href="https://wa.me/27792808500"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 bg-[#25D366] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-0.5">WhatsApp (Preferred)</p>
                  <p className="font-medium text-[#1A1714] group-hover:text-[#25D366] transition-colors">+27 79 280 8500</p>
                </div>
              </a>

              <a href="mailto:retronoah@icloud.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#F8F7F4] border border-[#EEECE8] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#6B6660]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-0.5">Email</p>
                  <p className="font-medium text-[#1A1714] group-hover:underline">retronoah@icloud.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F7F4] border border-[#EEECE8] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#6B6660]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-0.5">Workshop Location</p>
                  <p className="font-medium text-[#1A1714]">Randburg, Johannesburg<br />Gauteng, South Africa</p>
                  <p className="text-[#6B6660] text-xs mt-1">Viewings by appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F7F4] border border-[#EEECE8] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#6B6660]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-0.5">Working Hours</p>
                  <p className="font-medium text-[#1A1714]">Monday – Friday: 08:00 – 16:00</p>
                  <p className="font-medium text-[#1A1714]">Saturday: 09:00 – 14:00</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-4">Follow Our Work</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/retro_noah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#EEECE8] text-[#6B6660] text-[11px] tracking-[0.1em] uppercase hover:border-[#1A1714] hover:text-[#1A1714] transition-all"
                >
                  <IconInstagram />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/retronoahfurniture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-[#EEECE8] text-[#6B6660] text-[11px] tracking-[0.1em] uppercase hover:border-[#1A1714] hover:text-[#1A1714] transition-all"
                >
                  <IconFacebook />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div>
            <div className="bg-[#F8F7F4] p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center mx-auto mb-5">
                    <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl mb-2">Opening WhatsApp…</h3>
                  <p className="text-[#6B6660] text-sm">Your message has been prepared. Complete it in WhatsApp to send to us.</p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl mb-6">Send an Enquiry</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-2">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#EEECE8] px-4 py-3 text-sm text-[#1A1714] placeholder-[#C8C5BE] focus:outline-none focus:border-[#1A1714] transition-colors"
                        placeholder="Werner Geyer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-2">
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#EEECE8] px-4 py-3 text-sm text-[#1A1714] placeholder-[#C8C5BE] focus:outline-none focus:border-[#1A1714] transition-colors"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-2">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#EEECE8] px-4 py-3 text-sm text-[#1A1714] placeholder-[#C8C5BE] focus:outline-none focus:border-[#1A1714] transition-colors"
                          placeholder="0XX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-2">
                        Product Interest
                      </label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#EEECE8] px-4 py-3 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors"
                      >
                        <option value="">Select a product type…</option>
                        <option>Dining Table</option>
                        <option>Coffee Table</option>
                        <option>Side Table</option>
                        <option>Bench</option>
                        <option>Server / Sideboard</option>
                        <option>Outdoor Table</option>
                        <option>Bathroom Vanity</option>
                        <option>Kitchen Island</option>
                        <option>Desk</option>
                        <option>Shelving</option>
                        <option>Other / Not Sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-white border border-[#EEECE8] px-4 py-3 text-sm text-[#1A1714] placeholder-[#C8C5BE] focus:outline-none focus:border-[#1A1714] transition-colors resize-none"
                        placeholder="Tell us about your space, size requirements, finish ideas, and any questions you have…"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1A1714] text-white text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#2D2926] transition-colors"
                    >
                      Send via WhatsApp
                    </button>
                    <p className="text-[#6B6660] text-xs text-center">
                      Submitting will open WhatsApp with your message pre-filled.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 lg:py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B6660] mb-4">Delivery Areas</p>
          <h2 className="font-display text-3xl lg:text-4xl mb-6">We deliver across Gauteng</h2>
          <p className="text-[#6B6660] text-sm mb-8 max-w-lg mx-auto">
            Our typical customer areas include Glenhazel, Parkhurst, Parkview, Parktown, Linden, Fourways, Midrand, Centurion, Waterkloof, Silver Lakes and surrounding areas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Glenhazel', 'Parkhurst', 'Parkview', 'Parktown', 'Linden',
              'Fourways', 'Midrand', 'Centurion', 'Waterkloof', 'Silver Lakes',
              'Johannesburg CBD', 'Randburg', 'Sandton',
            ].map((area) => (
              <span
                key={area}
                className="text-[10px] tracking-[0.1em] uppercase border border-[#EEECE8] bg-white px-3 py-1.5 text-[#6B6660]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
