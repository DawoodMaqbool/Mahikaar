/** Central place for URLs so pages and navigation never hard-code them. */
export const routes = {
  home: "/",
  about: "/about",
  portfolio: "/portfolio",
  manufacturing: "/manufacturing",
  privateLabel: "/private-label",
  quote: "/request-a-quote",
  contact: "/contact",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "About Atelier", href: routes.about },
  { label: "Footwear Portfolio", href: routes.portfolio },
  { label: "Manufacturing & Craft", href: routes.manufacturing },
  { label: "Private Label", href: routes.privateLabel },
  { label: "Contact", href: routes.contact },
];

export const siteName = "Mahikaar • Made-to-Order Leather Footwear • Lahore";
