export type PortfolioCategory = "oxford" | "loafer" | "brogue" | "boots" | "bespoke";

export type PortfolioFilter = {
  value: PortfolioCategory | "all";
  label: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type PortfolioSpecimen = {
  number: string;
  category: PortfolioCategory;
  name: string;
  last: string;
  image: string;
  alt: string;
  construction: string;
  materials: string;
  description: string;
  specs: SpecRow[];
  reference: string;
  leadTime: string;
};

export const portfolioFilters: PortfolioFilter[] = [
  { value: "all", label: "All Articles (06)" },
  { value: "oxford", label: "Oxfords & Derbies" },
  { value: "loafer", label: "Loafers & Slip-Ons" },
  { value: "brogue", label: "Brogues & Wingtips" },
  { value: "boots", label: "Boots & Chelsea" },
  { value: "bespoke", label: "Custom Development" },
];

export const customizationNote =
  "Leather, colour, sole options, and branding can be tailored to your brief. Availability and any additional costs are confirmed before an order is finalised.";

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
    category: "brogue",
    name: "The Shalimar Full Brogue Wingtip",
    last: "Last No. 088 — Soft Chisel",
    image: "/images/products/full-brogue-wingtip.png",
    alt: "The Shalimar Full Brogue Wingtip in burgundy leather with intricate medallion punch work on stone workbench",
    construction: "Hand-Welted Goodyear 360°",
    materials: "Burgundy Leather • Medallion Punch",
    description:
      "Traditional perforated gimping and medallion toe punching, paired with storm welt construction and a hand-burnished burgundy finish.",
    specs: [
      { label: "Upper", value: "Burgundy leather, finish to specification" },
      { label: "Welting Profile", value: "360° Reverse Storm Welt with Wheel" },
      { label: "Edge Finish", value: "Burnished edge, colour to specification" },
    ],
    reference: "MKR-BR-088",
    leadTime: "4–8 Weeks",
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
];
