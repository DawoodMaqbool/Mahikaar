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
    title: "Last Selection & Sizing",
    text: "The shape of the shoe begins with the wooden last. Last shape, arch, instep, and toe profile are reviewed against your design and fit requirements, with sizing prepared across a standard size run or tailored to your custom sizing.",
    tags: ["Wooden Lasts", "Arch & Instep Fit", "Custom Sizing"],
    image: "/images/process/stage-01-lasts.jpg",
    alt: "Hand-carved hornbeam and beechwood shoe lasts arranged on a workbench beside brass calipers",
    caption: "Stage 01 • Last Selection",
  },
  {
    number: "02",
    phase: "Material Sorting",
    title: "Leather Selection & Hand Clicking",
    text: "Every hide has its own directional stretch and natural tension lines. Each upper piece is cut by hand from the strongest areas of the leather, so that left and right shoes match and the finished pair wears evenly.",
    tags: ["Hand-Cut Uppers", "Careful Hide Selection", "Matched Pairs"],
    image: "/images/process/leather-selection.png",
    alt: "Full-grain rolled leather hides, pattern shears, and swatch samples spread over a rustic timber worktable in the Lahore atelier",
    caption: "Stage 02 • Hand Clicking",
  },
  {
    number: "03",
    phase: "Prep & Joinery",
    title: "Upper Skiving, Folding & Stitching",
    text: "Edges are hand-skived to remove bulk where panels overlap, then folded or bound before the upper is stitched together. Careful preparation here gives the finished shoe a clean, refined line.",
    tags: ["Hand Skiving", "Edge Finishing", "Upper Closing"],
    image: "/images/process/stage-03-skiving.jpg",
    alt: "Artisan hands thinning the margin of calf leather with a skiving knife on marble",
    caption: "Stage 03 • Skiving & Stitching",
  },
  {
    number: "04",
    phase: "Sculpting",
    title: "Hand-Lasting & Upper Conditioning",
    text: "The stitched upper is conditioned to make the leather pliable, then drafted over the last by hand using lasting pincers. Once pulled taut and tacked, the lasted upper is left to rest so that it settles into its shape.",
    tags: ["Hand Lasting", "Pincer Drafting", "Shape Retention"],
    image: "/images/process/stage-04-lasting.jpg",
    alt: "Leather upper being drafted over a wooden last with lasting pincers and brass tacks",
    caption: "Stage 04 • Hand Lasting",
  },
  {
    number: "06",
    phase: "Internal Architecture",
    title: "Cork Filling & Shank",
    text: "The cavity between the insole and the outsole is filled with natural cork, which gradually moulds to the wearer's footprint. A steel shank supports the arch of the shoe.",
    tags: ["Cork Filling", "Steel Shank", "Arch Support"],
    image: "/images/process/stage-06-cork-shank.jpg",
    alt: "Granulated cork being pressed into the cavity of a welted sole with a steel shank at the arch",
    caption: "Stage 06 • Cork Filling & Shank",
  },
  {
    number: "07",
    phase: "Sole Finishing",
    title: "Outsole Stitching & Sculpted Bevelled Waist",
    text: "The outsole is attached and stitched to the welt. The waist is trimmed and hand-sculpted into a fiddleback or round bevelled profile before the heel is built up.",
    tags: ["Outsole Stitching", "Bevelled Waist", "Stacked Heel"],
    image: "/images/process/stage-07-waist.jpg",
    alt: "Leather outsole being bevelled along the waist with an edge shaping tool",
    caption: "Stage 07 • Waist Sculpting",
  },
  {
    number: "08",
    phase: "Final Touch",
    title: "Hand Burnishing, Edge Finishing & Inspection",
    text: "Heels and sole edges are dressed and finished with wax. The uppers are hand-burnished to build depth of colour and a refined shine, followed by a final inspection before the pair is packed.",
    tags: ["Edge Finishing", "Hand Burnishing", "Final Inspection"],
    image: "/images/process/stage-08-burnishing.jpg",
    alt: "Polisher applying wax to the toe cap of an espresso oxford to a mirror shine",
    caption: "Stage 08 • Finishing & Packing",
  },
];

export type Tannery = {
  country: string;
  leather: string;
  name: string;
  text: string;
  caliber: string;
  /** Optional close-up photo of the material; the card simply omits the image when unset. */
  image?: string;
  alt?: string;
};

export const tanneries: Tannery[] = [
  {
    country: "Leather & Materials",
    leather: "Classic Calf & Smooth Leather",
    name: "Timeless by Design",
    text: "Selected for refined footwear, from classic Oxfords and brogues to understated everyday elegance. Smooth surfaces, natural grain, and polished finishes offer a versatile foundation for distinctive collections. Leather grade, colour, finish, and thickness are confirmed according to each design's requirements.",
    caliber: "Grade, finish & thickness specified per order",
  },
  {
    country: "Leather & Materials",
    leather: "Suede & Nubuck",
    name: "Texture with Character",
    text: "Soft, tactile surfaces bring depth and character to loafers, casual footwear, and selected boot styles. Explore a range of colours and textures, with material suitability and specifications assessed against the intended design.",
    caliber: "Texture, colour & thickness subject to availability",
  },
  {
    country: "Leather & Materials",
    leather: "Patent & High-Gloss Finishes",
    name: "A Refined Statement",
    text: "A distinctive high-shine appearance for formal footwear, evening styles, and statement designs. Finish options are selected to complement the silhouette and desired aesthetic, with material specifications confirmed before production.",
    caliber: "Finish & material specification confirmed per order",
  },
  {
    country: "Leather & Materials",
    leather: "Embossed & Patterned Leather",
    name: "Distinctive by Nature",
    text: "Crocodile-patterned, ostrich-patterned, and other textured finishes offer distinctive surface character for fashion-led and statement collections. Available materials and finishes are confirmed individually, with patterned leather distinguished clearly from genuine exotic leather.",
    caliber: "Pattern, material & finish subject to availability",
  },
  {
    country: "Leather & Materials",
    leather: "Specialty Leathers & Custom Finishes",
    name: "Beyond the Standard",
    text: "For collections with a particular vision, additional leather types, colours, textures, and specialty finishes can be explored through our sourcing network. Share your reference, sample, or design brief, and we will assess material availability, suitability, and any additional costs before confirming the specification.",
    caliber: "Sourced and specified around project requirements",
  },
];
