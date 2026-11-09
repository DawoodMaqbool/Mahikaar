/** Central place for URLs so pages and navigation never hard-code them. */
export const routes = {
  home: "/",
  about: "/about",
  portfolio: "/portfolio",
  manufacturing: "/manufacturing",
  privateLabel: "/private-label",
  quote: "/request-a-quote",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "Footwear", href: routes.portfolio },
  { label: "Private Label", href: routes.privateLabel },
  { label: "Manufacturing", href: routes.manufacturing },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export const siteName = "Mahikaar • Made-to-Order Goodyear Welted Footwear";
