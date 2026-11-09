import { privacyFeaturesEnabled } from "@/lib/privacy-features";
import type { MetadataRoute } from "next";
import { routes } from "@/lib/site";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Portfolio parameters are UI states, canonicalised to /portfolio.
  // Omit artificial lastModified dates: builds do not imply editorial changes.
  return Object.values(routes).filter((path) => privacyFeaturesEnabled || path !== routes.privacyPolicy).map((path) => ({ url: new URL(path, siteUrl).href }));
}
