import type { Metadata } from "next";
import { routes } from "./site";

export const siteUrl = "https://www.mahikaar.com";

export const pageSeo = {
  home: {
    title: "Goodyear Welted Footwear Manufacturer",
    description: "Mahikaar makes Goodyear welted leather footwear in Lahore, Pakistan, for international brands, boutiques and retailers. Explore made-to-order production.",
  },
  portfolio: {
    title: "Made-to-Order Footwear Portfolio",
    description: "Explore Oxford, loafer, brogue, spectator and boot reference styles for your footwear range. Discuss leather, colour and customisation with Mahikaar.",
  },
  privateLabel: {
    title: "Private Label Leather Shoes for Brands",
    description: "Develop private label Goodyear welted leather shoes with Mahikaar. Explore client branding, materials, sampling and ordering for brands and retailers.",
  },
  manufacturing: {
    title: "Goodyear Welted Shoe Manufacturing",
    description: "See how Mahikaar makes Goodyear welted leather footwear by hand, from lasting and welting to finishing, production supervision and quality inspection.",
  },
  about: {
    title: "About Our Footwear Workshop",
    description: "Meet Mahikaar, a made-to-order footwear business in Lahore, Pakistan, with its own shoemaking team serving international brands, boutiques and retailers.",
  },
  contact: {
    title: "Contact Our Footwear Team",
    description: "Contact Mahikaar in Lahore to discuss B2B leather footwear manufacturing, private label requirements, materials and customisation for your next range.",
  },
  quote: {
    title: "Request a Footwear Manufacturing Quote",
    description: "Share your footwear brief with Mahikaar for a made-to-order or private label quote. Discuss quantities, materials, branding, feasibility and timelines.",
  },
} as const;

export function pageMetadata(page: keyof typeof pageSeo): Metadata {
  const { title, description } = pageSeo[page];
  const url = new URL(routes[page], siteUrl).href;
  const socialTitle = `${title} | Mahikaar`;
  const images = [{
    url: `${siteUrl}/images/products/full-brogue-wingtip/brown-hero.webp`,
    alt: "Mahikaar dark brown leather full brogue wingtip reference shoes",
  }];
  return {
    title: { absolute: socialTitle }, description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Mahikaar", locale: "en_US", url, title: socialTitle, description, images },
    twitter: { card: "summary_large_image", title: socialTitle, description, images },
  };
}

// Business facts match visible site content. No retail offers, ratings or invented credentials.
export const businessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Mahikaar",
      url: `${siteUrl}/`,
      description: "Made-to-order Goodyear welted leather footwear for international brands, boutiques and retailers.",
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      contactPoint: {
        "@type": "ContactPoint", contactType: "B2B and private label enquiries",
        email: "b2b@mahikaratelier.com", telephone: "+924235789840",
        url: `${siteUrl}/contact`,
      },
    },
    {
      "@type": "WebSite", "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`, name: "Mahikaar", inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
