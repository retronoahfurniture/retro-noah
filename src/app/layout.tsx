import type { Metadata } from "next";
import { Pacifico, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
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
    <html lang="en" className={`scroll-smooth ${pacifico.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#1A1714] antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
