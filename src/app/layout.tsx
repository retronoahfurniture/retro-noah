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
  title: "Retro Noah Furniture | Beautifully Built to Last",
  description:
    "Handcrafted bespoke furniture made from reclaimed wood. Based in Randburg, Johannesburg. Dining tables, coffee tables, benches, vanities and more.",
  keywords:
    "bespoke furniture, reclaimed wood, dining tables, Johannesburg, Randburg, custom furniture, handcrafted",
  icons: {
    icon: "/logo-round-transparent.png",
    shortcut: "/logo-round-transparent.png",
    apple: "/logo-round-transparent.png",
  },
  openGraph: {
    title: "Retro Noah Furniture",
    description: "We take woodworking and make it about YOU.",
    type: "website",
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
