import type { Metadata } from "next";
import { Geist, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

// Stand-in for the footer wordmark's "ATTACK Semi Bold", which is a paid
// Sensatype face. Outfit is the closest geometric sans that ships licence-free.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Gary Platt Seating — Luxury Casino & Hospitality Seating",
  description:
    "Premium gaming and hospitality seating designed with unmatched craftsmanship, innovative engineering, and timeless comfort.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfairDisplay.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
