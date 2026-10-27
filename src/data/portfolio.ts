export type PortfolioCategory = "oxford" | "loafer" | "brogue" | "boots" | "bespoke";

export type PortfolioFilter = {
  value: PortfolioCategory | "all";
  label: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** Short caption for the view, e.g. "Pair, top view". */
  label: string;
  /** "photograph" is a real sample; "ai-concept" must never be shown as a sample. */
  kind: "photograph" | "ai-concept";
};

/** One physically photographed colour of a design. The first image is its lead view. */
export type Colourway = {
  name: string;
  images: ProductImage[];
};

export type PortfolioSpecimen = {
  number: string;
  /** Internal identifier; not shown to visitors. */
  slug?: string;
  category: PortfolioCategory;
  name: string;
  /** Omitted when the last has not been verified. */
  last?: string;
  /** Card image (and alt); keep in step with the first colourway's first image. */
  image: string;
  alt: string;
  construction: string;
  materials: string;
  description: string;
  specs: SpecRow[];
  /** Omitted until an article reference has been verified and approved. */
  reference?: string;
  leadTime: string;
  /** Optional detail view: photographs grouped by colour. */
  colourways?: Colourway[];
  /** Images have a near-white studio backdrop; blend it into the card background. */
  whiteBackdrop?: boolean;
};

export const portfolioFilters: PortfolioFilter[] = [
  { value: "all", label: "All Articles" },
  { value: "oxford", label: "Oxfords & Derbies" },
  { value: "loafer", label: "Loafers & Slip-Ons" },
  { value: "brogue", label: "Brogues & Wingtips" },
  { value: "boots", label: "Boots & Chelsea" },
  { value: "bespoke", label: "Custom Development" },
];

export const customizationNote =
  "Leather, colour, sole options, and branding can be tailored to your brief. Availability and any additional costs are confirmed before an order is finalised. Final specifications are agreed during sampling, and bulk production proceeds after sample approval.";

export const portfolioSpecimens: PortfolioSpecimen[] = [
  {
    number: "01",
    category: "oxford",
    name: "The Empress Cap-Toe Oxford",
    last: "Last No. 042 — Classic Almond",
    image: "/images/products/cap-toe-oxford.jpg",
    alt: "Cognac calf leather cap-toe oxford resting on a travertine plinth",
    construction: "Hand-Welted Goodyear 270°",
    materials: "Cognac Calf • Leather Sole",
    description:
      "A classic almond silhouette with tight arch support, hand-pitched heels, and neatly skived quarter seams. Finished by hand in Lahore.",
    specs: [
      { label: "Upper", value: "Calf leather, colour to specification" },
      { label: "Sole", value: "Leather sole" },
      { label: "Minimum Order", value: "12 Pairs per Style" },
    ],
    reference: "MKR-OX-042",
    leadTime: "4–8 Weeks",
  },
  {
    number: "02",
    category: "loafer",
    name: "The Gulberg Penny Loafer",
    last: "Last No. 104 — Round Curvature",
    image: "/images/products/penny-loafer.png",
    alt: "The Gulberg Penny Loafer in deep espresso calf leather with bevelled waist and brass flush toe plate",
    construction: "Hand-Welted 360° • Fiddleback",
    materials: "Deep Espresso Calf • Bevelled Waist",
    description:
      "Features an articulated hand-stitched apron (pie crust technique) and a sunk flush brass toe protection plate. Heel cup shaped for comfortable sockless wear or formal dress.",
    specs: [
      { label: "Upper", value: "Calf leather, colour to specification" },
      { label: "Sole", value: "Leather sole" },
      { label: "Hardware Accent", value: "Milled Solid Brass Toe Cleat" },
    ],
    reference: "MKR-LF-104",
    leadTime: "4–8 Weeks",
  },
  {
    number: "03",
    slug: "full-brogue-wingtip",
    category: "brogue",
    name: "The Shalimar Full Brogue",
    image: "/images/products/full-brogue-wingtip/brown-hero.webp",
    alt: "Pair of dark brown textured leather full brogue wingtip shoes, three-quarter view",
    construction: "Goodyear Welted",
    materials: "Dark Brown • Textured Leather",
    description:
      "A classic full brogue with a wing-shaped toe cap and decorative perforation, constructed by hand using the Goodyear welt method. Leather, colour, and finish are tailored to your brief.",
    specs: [
      { label: "Style", value: "Full brogue wingtip" },
      { label: "Upper", value: "Leather and colour to specification" },
      { label: "Sole", value: "Leather; colour and finish to specification" },
      { label: "Minimum Order", value: "12 Pairs per Style" },
    ],
    leadTime: "4–8 Weeks",
    whiteBackdrop: true,
    colourways: [
      {
        name: "Dark Brown",
        images: [
          {
            src: "/images/products/full-brogue-wingtip/brown-hero.webp",
            alt: "Pair of dark brown textured leather full brogue wingtip shoes, three-quarter view",
            label: "Pair, three-quarter view",
            kind: "photograph",
          },
          {
            src: "/images/products/full-brogue-wingtip/brown-top.webp",
            alt: "Dark brown textured leather full brogue wingtips seen from above, showing the wing and toe perforation",
            label: "Pair, top view",
            kind: "photograph",
          },
          {
            src: "/images/products/full-brogue-wingtip/brown-side.webp",
            alt: "Side profile of a pair of dark brown textured leather full brogue wingtips showing the welt and heel",
            label: "Pair, side profile",
            kind: "photograph",
          },
        ],
      },
    ],
  },
  {
    number: "04",
    category: "boots",
    name: "The Mall Road Chelsea Boot",
    last: "Last No. 119 — Tapered High-Instep",
    image: "/images/products/chelsea-boot.png",
    alt: "The Mall Road Chelsea Boot in dark chocolate suede on raw limestone pedestal",
    construction: "Hand-Blocked Wholecut • 270° Welt",
    materials: "Dark Chocolate Suede • Rubber or Leather Sole",
    description:
      "Single-piece upper blocked for a seamless wrap along the ankle, with elastic side gussets and hand-looped woven pull tabs.",
    specs: [
      { label: "Upper", value: "Suede, colour to specification" },
      { label: "Outsole Options", value: "Rubber or leather, per design" },
      { label: "Structure", value: "Single-piece blocked upper" },
    ],
    reference: "MKR-BT-119",
    leadTime: "4–8 Weeks",
  },
  {
    number: "05",
    category: "oxford",
    name: "The Diplomat Adelaide Oxford",
    last: "Last No. 073 — Sharp Chisel",
    image: "/images/products/adelaide-oxford.jpg",
    alt: "Antique chestnut Adelaide oxford with U-throat broguing on a vintage workbench",
    construction: "Hand-Welted Goodyear",
    materials: "Antique Chestnut Hand-Patina • Chiseled Toe",
    description:
      "Distinguished by its seamless U-throat brogue framing and a layered, hand-applied patina finish. Hand-chamfered fiddleback waist.",
    specs: [
      { label: "Upper", value: "Calf leather, patina to specification" },
      { label: "Waist Construction", value: "Concealed Fiddleback with Brass Pegs" },
      { label: "Finishing Method", value: "Hand-applied layered finish" },
    ],
    reference: "MKR-AD-073",
    leadTime: "4–8 Weeks",
  },
  {
    number: "06",
    category: "boots",
    name: "The Nomad Chukka Boot",
    last: "Last No. 095 — Anatomical Round",
    image: "/images/products/chukka-boot.jpg",
    alt: "Snuff suede two-eyelet chukka boot on a studded rubber sole",
    construction: "Hand-Welted Goodyear 360°",
    materials: "Snuff Suede • Studded Rubber Sole",
    description:
      "Designed for travel, with dual brass blind eyelets, a leather lining, and a studded rubber outsole option for varied conditions.",
    specs: [
      { label: "Upper", value: "Suede, colour to specification" },
      { label: "Sole", value: "Studded rubber sole option" },
      { label: "Heel Counter", value: "Form-Pressed Solid Leather Stiffener" },
    ],
    reference: "MKR-CK-095",
    leadTime: "4–8 Weeks",
  },
  {
    number: "07",
    slug: "spectator-brogue",
    category: "brogue",
    name: "The Gymkhana Spectator Brogue",
    image: "/images/products/spectator-brogue/white-black-hero.webp",
    alt: "Pair of white and black two-tone spectator brogue wingtip shoes, three-quarter view",
    construction: "Goodyear Welted",
    materials: "White / Black • White / Brown Examples",
    description:
      "A two-tone wingtip brogue with contrasting panels and decorative perforation, shown in two example colourways. Colour combinations, leathers, and finishes are discussed against your brief.",
    specs: [
      { label: "Style", value: "Two-tone wingtip brogue" },
      { label: "Colourways Shown", value: "White / Black, White / Brown" },
      { label: "Sole", value: "Leather; colour and finish to specification" },
      { label: "Minimum Order", value: "12 Pairs per Style" },
    ],
    leadTime: "4–8 Weeks",
    whiteBackdrop: true,
    colourways: [
      {
        name: "White / Black",
        images: [
          {
            src: "/images/products/spectator-brogue/white-black-hero.webp",
            alt: "Pair of white and black two-tone spectator brogue wingtip shoes, three-quarter view",
            label: "Pair, three-quarter view",
            kind: "photograph",
          },
          {
            src: "/images/products/spectator-brogue/white-black-top.webp",
            alt: "White and black spectator brogue wingtips seen from above, showing the contrasting panels",
            label: "Pair, top view",
            kind: "photograph",
          },
          {
            src: "/images/products/spectator-brogue/white-black-sole.webp",
            alt: "White and black spectator brogue with its pair turned to show the sole and welt",
            label: "Sole and profile view",
            kind: "photograph",
          },
        ],
      },
      {
        name: "White / Brown",
        images: [
          {
            src: "/images/products/spectator-brogue/white-brown-hero.webp",
            alt: "Pair of white and brown two-tone spectator brogue wingtip shoes, three-quarter view",
            label: "Pair, three-quarter view",
            kind: "photograph",
          },
          {
            src: "/images/products/spectator-brogue/white-brown-top.webp",
            alt: "White and brown spectator brogue wingtips seen from above, showing the contrasting panels",
            label: "Pair, top view",
            kind: "photograph",
          },
        ],
      },
    ],
  },
  {
    number: "08",
    slug: "wingtip-zip-boot",
    category: "boots",
    name: "The Lohari Wingtip Zip Boot",
    image: "/images/products/wingtip-zip-boot/brown-side-hero.webp",
    alt: "Dark brown grained leather side-zip ankle boot with a perforated wingtip toe, side view",
    construction: "Goodyear Welted",
    materials: "Dark Brown • Grained Leather",
    description:
      "A side-zip ankle boot with a wing-shaped toe cap and decorative perforation, shown in dark brown grained leather. Leather, colour, sole, and finish are tailored to your brief.",
    specs: [
      { label: "Style", value: "Side-zip wingtip ankle boot" },
      { label: "Upper", value: "Leather and colour to specification" },
      { label: "Sole", value: "Leather; colour and finish to specification" },
      { label: "Minimum Order", value: "12 Pairs per Style" },
    ],
    leadTime: "4–8 Weeks",
    colourways: [
      {
        name: "Dark Brown",
        images: [
          {
            src: "/images/products/wingtip-zip-boot/brown-side-hero.webp",
            alt: "Dark brown grained leather side-zip ankle boot with a perforated wingtip toe, side view",
            label: "Side view",
            kind: "photograph",
          },
          {
            src: "/images/products/wingtip-zip-boot/brown-front.webp",
            alt: "Dark brown grained leather side-zip wingtip boots seen from above, showing the perforated toe",
            label: "Pair, top view",
            kind: "photograph",
          },
          {
            src: "/images/products/wingtip-zip-boot/collage-digital-preview.jpg",
            alt: "Digital preview collage of dark brown side-zip wingtip ankle boots, with a pair, a side view and close-up details",
            label: "Collage, digital preview",
            kind: "ai-concept",
          },
        ],
      },
    ],
  },
  {
    number: "09",
    slug: "woven-loafer",
    category: "loafer",
    name: "The Liberty Woven Penny Loafer",
    image: "/images/products/woven-loafer/burgundy-hero.png",
    alt: "Pair of burgundy woven leather penny loafers, three-quarter view",
    construction: "Welted",
    materials: "Burgundy • Woven Leather",
    description:
      "A penny loafer with a woven leather vamp, a smooth leather strap and a rounded toe, shown in burgundy. Leather, colour, sole, and finish are tailored to your brief.",
    specs: [
      { label: "Style", value: "Woven penny loafer" },
      { label: "Upper", value: "Leather and colour to specification" },
      { label: "Sole", value: "Leather; colour and finish to specification" },
      { label: "Minimum Order", value: "12 Pairs per Style" },
    ],
    leadTime: "4–8 Weeks",
    colourways: [
      {
        name: "Burgundy",
        images: [
          {
            src: "/images/products/woven-loafer/burgundy-hero.png",
            alt: "Pair of burgundy woven leather penny loafers, three-quarter view",
            label: "Pair, three-quarter view",
            kind: "photograph",
          },
          {
            src: "/images/products/woven-loafer/burgundy-top.jpg",
            alt: "Burgundy woven leather penny loafers seen from above, showing the woven vamp and strap",
            label: "Pair, top view",
            kind: "photograph",
          },
        ],
      },
    ],
  },
];
