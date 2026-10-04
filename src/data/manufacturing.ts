export type BenchStage = {
  number: string;
  phase: string;
  title: string;
  text: string;
  tags: string[];
  image: string;
  alt: string;
  caption: string;
};

/** Stages 01–08 except 05, which has its own feature layout on the page. */
export const benchStages: BenchStage[] = [
  {
    number: "01",
    phase: "Foundation",
    title: "Carved Last Development & Grading",
    text: "The soul of the shoe resides in the wooden form. We carve initial master forms in hornbeam and beechwood, verifying arch pitch, instep girth, and toe box rake against client anthropometrics before digital grade-nesting into production sizing runs.",
    tags: ["Hornbeam Blanks", "Lateral Arch Support", "Custom Pitch Angles"],
    image: "/images/process/stage-01-lasts.jpg",
    alt: "Hand-carved hornbeam and beechwood shoe lasts arranged on a workbench beside brass calipers",
    caption: "Stage 01 Specimen • Last AT-092 Chiselled Almond",
  },
  {
    number: "02",
    phase: "Material Sorting",
    title: "Full-Grain Leather Selection & Hand Clicking",
    text: "Every hide exhibits directional stretch and natural tension lines. Our master clickers orient brass-weighted paper templates across the tightest center spine of the calfskin, discarding flank weaknesses to ensure left and right quarters mirror each other identically.",
    tags: ["Spine-Aligned Cutting", "Zero Flank Compromise", "Full Grain Caliber"],
    image: "/images/process/leather-selection.png",
    alt: "Full-grain rolled leather hides, pattern shears, and swatch samples spread over a rustic timber worktable in Māhikar Atelier",
    caption: "Stage 02 Specimen • Hand Clicking Table",
  },
  {
    number: "03",
    phase: "Prep & Joinery",
    title: "Upper Skiving, Folding & Precision Stitching",
    text: "Perimeters are hand-skived to a razor edge of 0.4mm, eliminating bulk where panels overlap. Edges are French-bound or carefully rolled with vegetable paste before dual-needle closing at 12 stitches per inch with bonded nylon thread.",
    tags: ["0.4mm Feather Skiving", "12 SPI Closing", "French Binding"],
    image: "/images/process/stage-03-skiving.jpg",
    alt: "Artisan hands thinning the margin of French box calf with a skiving knife on marble",
    caption: "Stage 03 Specimen • Margin Bevel & Needle Tension",
  },
  {
    number: "04",
    phase: "Sculpting",
    title: "Hand-Lasting & Upper Conditioning",
    text: "The stitched upper is conditioned in steam chambers to activate the leather's natural pliability, then drafted over the last using lasting pincers. Pulled taut in eight micro-passes and tacked, the lasted upper rests for a minimum of 72 hours so memory locks permanently.",
    tags: ["72-Hour Last Rest", "Pincer Drafting", "Grain Moisture Retention"],
    image: "/images/process/stage-04-lasting.jpg",
    alt: "Leather upper being drafted over a wooden last with lasting pincers and brass tacks",
    caption: "Stage 04 Specimen • Drafting & Last Resting (72h)",
  },
  {
    number: "06",
    phase: "Internal Architecture",
    title: "Natural Cork Filling & Spring Steel Shank",
    text: "The internal cavity between insole rib and outer welt is hot-filled with granulated natural Portuguese cork blended with pine pitch. A tempered Swedish spring steel shank is embedded to guarantee longitudinal arch support for the lifetime of the wearer.",
    tags: ["Granulated Cork Bed", "Tempered Steel Shank", "Thermoreactive Cushion"],
    image: "/images/process/stage-06-cork-shank.jpg",
    alt: "Granulated cork being pressed into the cavity of a welted sole with a steel shank at the arch",
    caption: "Stage 06 Specimen • Cork Matrix Infill & Arch Anchor",
  },
  {
    number: "07",
    phase: "Sole Finishing",
    title: "Outsole Stitching & Sculpted Bevelled Waist",
    text: "The oak-bark sole is laminated under brass hydraulic press, then stitched with a concealed lockstitch through a closed cut flap. The waist is trimmed narrow and hand-sculpted into a fiddleback or round bevelled profile before heel block stacking.",
    tags: ["Concealed Lockstitch", "Bevelled Fiddleback", "Stacked Leather Heel"],
    image: "/images/process/stage-07-waist.jpg",
    alt: "Oak-bark outsole being bevelled along the waist with an edge shaping tool",
    caption: "Stage 07 Specimen • Fiddleback Waist Sculpting",
  },
  {
    number: "08",
    phase: "Final Touch",
    title: "Hand Burnishing, Edge Ironing & Inspection",
    text: "Heel blocks and sole edges receive heated brass iron dressings with carnauba waxes. The uppers undergo multi-layer aniline glazing and hand-bone burnishing to achieve a deep mirror-like depth, followed by an exhaustive 42-point dimensional inspection.",
    tags: ["Carnauba Hot Ironing", "Mirror Glacé", "42-Point QC Gate"],
    image: "/images/process/stage-08-burnishing.jpg",
    alt: "Polisher applying wax to the toe cap of an espresso oxford to a mirror shine",
    caption: "Stage 08 Specimen • Mirror Glacé & Archival Packing",
  },
];

export type Tannery = {
  country: string;
  leather: string;
  name: string;
  text: string;
  caliber: string;
};

export const tanneries: Tannery[] = [
  {
    country: "France",
    leather: "Vocalou Box Calf",
    name: "Tanneries d'Annonay & Haas",
    text: "Full-grain French calfskin tanned using pure chromium salts and Alpine water. Delivers an extremely tight break, subtle oily temper, and resilience under repeated flexing.",
    caliber: "1.2mm – 1.4mm Full Grain",
  },
  {
    country: "Italy",
    leather: "Radica Museum Calf",
    name: "Ilcea Tannery (Tuscany)",
    text: "Hand-sponged marbled patina created with natural vegetable tannins. No two skins are identical, giving each pair an archival, museum-grade mottled depth.",
    caliber: "1.3mm Marbled Grain",
  },
  {
    country: "England",
    leather: "Janus & Superbuck",
    name: "Charles F. Stead (Leeds)",
    text: "World-renowned calf suedes treated with Scottish Scotchgard protection. Ultra-fine nap that does not mat, combined with exceptional tensile strength for unlined loafers.",
    caliber: "1.4mm Heavy Nap Suede",
  },
  {
    country: "England",
    leather: "14-Month Oak Bark",
    name: "J&FJ Baker Tannery (Colyton)",
    text: "The oldest traditional oak bark tannery in the world. Hides pit-tanned for 14 continuous months in river water and English oak bark. Imparts legendary abrasion resistance.",
    caliber: "5.5mm Heavy Insole/Outsole",
  },
];
