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
  "Available in 18+ leathers, custom last widths (D to EE), brass toe taps, closed-channel leather soles or studded rubber. Custom private label branding available.";

export const portfolioSpecimens: PortfolioSpecimen[] = [
  {
    number: "01",
    category: "oxford",
    name: "The Empress Cap-Toe Oxford",
    last: "Last No. 042 — Classic Almond",
    image: "/images/products/cap-toe-oxford.jpg",
    alt: "Cognac museum calf cap-toe oxford resting on a travertine plinth",
    construction: "Hand-Welted Goodyear 270°",
    materials: "Cognac Museum Calf • Oak Bark Soles",
    description:
      "Sculpted on our definitive St. James silhouette with tight arch support, hand-pitched heels, and micro-skived quarter seams. Tanned in Tuscany; finished with botanical waxes in our Lahore workshops.",
    specs: [
      { label: "Upper Tannery", value: "Ilcea Tannery, Italy" },
      { label: "Sole Specification", value: "J. & F.J. Baker 9-Iron Oak Bark" },
      { label: "Minimum Order Tolerance", value: "12 Pairs / Last Gradient" },
    ],
    reference: "MKR-OX-042",
    leadTime: "5–7 Weeks",
  },
  {
    number: "02",
    category: "loafer",
    name: "The Gulberg Penny Loafer",
    last: "Last No. 104 — Round Curvature",
    image: "/images/products/penny-loafer.png",
    alt: "The Gulberg Penny Loafer in Deep Espresso Box Calf with Bevelled Waist and Brass Flush Toe Plate",
    construction: "Hand-Welted 360° • Fiddleback",
    materials: "Deep Espresso Box Calf • Bevelled Waist",
    description:
      "Features an articulated hand-stitched apron (pie crust technique) and a sunk flush brass toe protection plate. Zero-slip heel cup geometry engineered for unlined sockless comfort or formal dress.",
    specs: [
      { label: "Upper Tannery", value: "Tanneries du Puy, France" },
      { label: "Sole Specification", value: "Vegetable-Tanned Rendenbach Sole" },
      { label: "Hardware Accent", value: "Milled Solid Brass Toe Cleat" },
    ],
    reference: "MKR-LF-104",
    leadTime: "4–6 Weeks",
  },
  {
    number: "03",
    category: "brogue",
    name: "The Shalimar Full Brogue Wingtip",
    last: "Last No. 088 — Soft Chisel",
    image: "/images/products/full-brogue-wingtip.png",
    alt: "The Shalimar Full Brogue Wingtip in Burgundy Cordovan with intricate medallion punch work on stone workbench",
    construction: "Hand-Welted Goodyear 360°",
    materials: "Burgundy Cordovan • Medallion Punch",
    description:
      "Archival Lahori perforated gimping executed with hand-filed steel dies. Triple-layer water-resistant storm welting combined with high-sheen hand-glazed shell cordovan quarters.",
    specs: [
      { label: "Upper Shell", value: "Horween Genuine Shell Cordovan #8" },
      { label: "Welting Profile", value: "360° Reverse Storm Welt with Wheel" },
      { label: "Edge Finish", value: "Carnauba Iron-Burnished Chestnut" },
    ],
    reference: "MKR-BR-088",
    leadTime: "6–8 Weeks",
  },
  {
    number: "04",
    category: "boots",
    name: "The Mall Road Chelsea Boot",
    last: "Last No. 119 — Tapered High-Instep",
    image: "/images/products/chelsea-boot.png",
    alt: "The Mall Road Chelsea Boot in Dark Chocolate Reverse Suede on raw limestone pedestal",
    construction: "Hand-Blocked Wholecut • 270° Welt",
    materials: "Dark Chocolate Reverse Suede • Vibram or Leather",
    description:
      "Single-piece upper blocking over wet wooden lasts ensuring a seamless wrap along the ankles. Reinforced twin elastic webbing from Milan with hand-looped woven webbing pull-tabs.",
    specs: [
      { label: "Upper Suede", value: "C.F. Stead Waxy Commander, Leeds" },
      { label: "Outsole Options", value: "Vibram Commando or Baker Oak Bark" },
      { label: "Structure", value: "Artisan Wet-Crimped Single Piece" },
    ],
    reference: "MKR-BT-119",
    leadTime: "5–7 Weeks",
  },
  {
    number: "05",
    category: "oxford",
    name: "The Diplomat Adelaide Oxford",
    last: "Last No. 073 — Sharp Chisel",
    image: "/images/products/adelaide-oxford.jpg",
    alt: "Antique chestnut Adelaide oxford with U-throat broguing on a vintage workbench",
    construction: "Hand-Welted Rapid Stitch",
    materials: "Antique Chestnut Hand-Patina • Chiseled Toe",
    description:
      "Distinguished by its seamless U-throat brogue framing and layered alcohol-dye burnishing applied by master colourists in our walled city studio. Hand-chamfered fiddleback waist.",
    specs: [
      { label: "Upper Tannery", value: "Haas Crust Calf, Alsace" },
      { label: "Waist Construction", value: "Concealed Fiddleback with Brass Pegs" },
      { label: "Finishing Method", value: "Triple Glaze Bone Glacage" },
    ],
    reference: "MKR-AD-073",
    leadTime: "5–7 Weeks",
  },
  {
    number: "06",
    category: "boots",
    name: "The Nomad Chukka Boot",
    last: "Last No. 095 — Anatomical Round",
    image: "/images/products/chukka-boot.jpg",
    alt: "Snuff suede two-eyelet chukka boot on a Dainite rubber sole",
    construction: "Hand-Welted Goodyear 360°",
    materials: "Snuff Suede • Dainite Studded Sole",
    description:
      "Designed for trans-continental travel with dual brass blind eyelets, vegetable-tanned full-calf lining, and authentic British Dainite studded rubber outsoles for severe conditions.",
    specs: [
      { label: "Upper Suede", value: "C.F. Stead Repello Suede, England" },
      { label: "Sole Specification", value: "Authentic British Dainite Studded Rubber" },
      { label: "Heel Counter", value: "Form-Pressed Solid Leather Stiffener" },
    ],
    reference: "MKR-CK-095",
    leadTime: "4–6 Weeks",
  },
];
