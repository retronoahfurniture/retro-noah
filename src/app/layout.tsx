import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://retronoah.co.za"),
  title: {
    default: "Retro Noah Furniture | Handcrafted Reclaimed Wood Furniture Randburg",
    template: "%s | Retro Noah Furniture",
  },
  description:
    "Bespoke furniture handcrafted from reclaimed wood in Randburg, Johannesburg. Custom dining tables, coffee tables, benches, vanities and more. Made to order, delivered across Gauteng.",
  keywords: [
    "Retro Noah",
    "Retro Noah Furniture",
    "furniture Randburg",
    "reclaimed wood furniture Johannesburg",
    "custom furniture Gauteng",
    "bespoke dining tables Randburg",
    "handcrafted furniture Johannesburg",
    "dining tables Randburg",
    "custom furniture South Africa",
    "reclaimed wood dining table",
    "bespoke furniture Johannesburg",
    "wood furniture Gauteng",
    "custom made furniture Johannesburg",
    "furniture maker Randburg",
  ],
  authors: [{ name: "Retro Noah Furniture", url: "https://retronoah.co.za" }],
  creator: "Retro Noah Furniture",
  publisher: "Retro Noah Furniture",
  icons: {
    icon: "/logo-round-transparent.png",
    shortcut: "/logo-round-transparent.png",
    apple: "/logo-round-transparent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://retronoah.co.za",
    siteName: "Retro Noah Furniture",
    title: "Retro Noah Furniture | Handcrafted Reclaimed Wood Furniture Randburg",
    description:
      "Bespoke furniture handcrafted from reclaimed wood in Randburg, Johannesburg. Custom dining tables, coffee tables, benches, vanities and more.",
    images: [
      {
        url: "/dining.png",
        width: 1200,
        height: 630,
        alt: "Retro Noah Furniture — handcrafted reclaimed wood dining table",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retro Noah Furniture | Handcrafted Reclaimed Wood Furniture",
    description:
      "Bespoke furniture handcrafted from reclaimed wood in Randburg, Johannesburg.",
    images: ["/dining.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://retronoah.co.za",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": "https://retronoah.co.za/#business",
  name: "Retro Noah Furniture",
  description:
    "Handcrafted bespoke furniture made from reclaimed wood. Based in Randburg, Johannesburg. Custom dining tables, coffee tables, benches, vanities and more.",
  url: "https://retronoah.co.za",
  logo: "https://retronoah.co.za/logo-round-transparent.png",
  image: "https://retronoah.co.za/dining.png",
  telephone: "+27795199747",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Randburg",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -26.0929,
    longitude: 27.9986,
  },
  areaServed: [
    { "@type": "City", name: "Randburg" },
    { "@type": "City", name: "Johannesburg" },
    { "@type": "State", name: "Gauteng" },
  ],
  priceRange: "R6,000 – R18,000",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27795199747",
    contactType: "customer service",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Handcrafted Reclaimed Wood Furniture",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Custom Dining Tables" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Coffee Tables" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Side Tables" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dining Benches" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bathroom Vanities" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sideboards" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Outdoor Furniture" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mudroom Units" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#1A1714] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
