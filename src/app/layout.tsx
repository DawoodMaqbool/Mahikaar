import type { Metadata } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteName } from "@/lib/site";
import "./globals.css";

// next/font downloads these at build time and serves them from our own domain.
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s • Māhikar Atelier`,
  },
  description:
    "Handcrafted, made-to-order Goodyear welted leather footwear for international brands, heritage boutiques and private labels. Made by master artisans in Lahore, Pakistan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${ebGaramond.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <head>
        {/*
          Icon font: next/font can't handle ligature icon fonts, so it stays a stylesheet.
          display=block avoids flashing raw names like "arrow_forward" while it loads, and the
          root layout already applies to every page, so both lint rules can be skipped here.
        */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface font-sans-body text-on-surface antialiased selection:bg-secondary selection:text-on-secondary">
        <SiteHeader />
        <main className="flex flex-col w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
