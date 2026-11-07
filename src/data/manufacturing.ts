/**
 * A photograph or short clip shown beside a manufacturing stage.
 *
 * Only genuine Mahikaar workshop media belongs here. A stage with no `media` renders
 * as text only; no placeholder is shown. See catalogue-review/process-media-guide.md
 * for the folder layout, naming and file-format recommendations.
 */
export type StageMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; poster: string; alt: string; caption?: string };

export type BenchStage = {
  number: string;
  /** Short slug, also used as the media folder name: public/{images,videos}/process/<slug>/ */
  slug: string;
  phase: string;
  title: string;
  /** Short descriptor shown under the title. */
  subtitle: string;
  text: string;
  tags: string[];
  /** First item is the lead; any further items appear as a smaller row beneath it. */
  media?: StageMedia[];
};

export const benchStages: BenchStage[] = [
  {
    number: "01",
    slug: "design-and-preparation",
    phase: "Foundation",
    title: "Design & Preparation",
    subtitle: "Last Selection & Fit Development",
    text: "Each design begins with the selection of an appropriate shoe last and the preparation of the required patterns and specifications. Existing lasts can be used for established styles, while new last development can be discussed for specific design requirements.",
    tags: ["Last Selection", "Fit Development", "Patterns & Specifications"],
  },
  {
    number: "02",
    slug: "leather-selection",
    phase: "Material Selection",
    title: "Leather Selection",
    subtitle: "Material Sourcing & Matching",
    text: "Leather is selected according to the design, intended use, desired appearance and agreed specifications. Different leather types, textures, colours and finishes can be discussed depending on sourcing availability and order requirements.",
    tags: ["Material Sourcing", "Matching"],
    media: [
      {
        type: "image",
        src: "/images/process/leather-selection.png",
        alt: "Full-grain rolled leather hides, pattern shears, and swatch samples spread over a timber worktable",
        caption: "Leather Selection",
      },
    ],
  },
  {
    number: "03",
    slug: "cutting-and-upper-construction",
    phase: "Prep & Joinery",
    title: "Cutting & Upper Construction",
    subtitle: "Leather Cutting & Upper Preparation",
    text: "Leather components are prepared and cut according to the shoe pattern. Individual panels are aligned, prepared and assembled to form the shoe upper.",
    tags: ["Pattern Cutting", "Upper Preparation"],
    media: [
      {
        type: "image",
        src: "/images/process/stage-03-skiving.jpg",
        alt: "Hands thinning the margin of calf leather with a skiving knife",
        caption: "Upper Preparation",
      },
    ],
  },
  {
    number: "04",
    slug: "lasting",
    phase: "Shaping",
    title: "Lasting",
    subtitle: "Shaping the Upper by Hand",
    text: "The prepared upper is shaped over the selected last to establish the shoe's form, proportions and structure.",
    tags: ["Hand Lasting"],
    media: [
      {
        type: "image",
        src: "/images/process/stage-04-lasting.jpg",
        alt: "Leather upper being drafted over a wooden last with lasting pincers",
        caption: "Lasting",
      },
    ],
  },
  {
    number: "05",
    slug: "goodyear-welted-construction",
    phase: "Construction",
    title: "Goodyear Welted Construction",
    subtitle: "Hand-Executed Welted Shoemaking",
    text: "The footwear is constructed using the Goodyear welted method, with the construction work carried out by hand. This construction is an important part of Mahikaar's shoemaking identity.",
    tags: ["Goodyear Welted", "Hand-Stitched Welt"],
    media: [
      {
        type: "image",
        src: "/images/process/welt-hand-stitching.png",
        alt: "Hands hand-stitching the leather welt onto a dress shoe with a hand awl and waxed thread",
        caption: "Hand Welting",
      },
    ],
  },
  {
    number: "06",
    slug: "sole-and-heel-finishing",
    phase: "Sole Finishing",
    title: "Sole & Heel Finishing",
    subtitle: "Assembly, Shaping & Finishing",
    text: "Sole and heel components are assembled and finished according to the selected design and agreed specifications.",
    tags: ["Sole Attachment", "Heel Finishing"],
    media: [
      {
        type: "image",
        src: "/images/process/stage-07-waist.jpg",
        alt: "Leather outsole being shaped along the waist with an edge tool",
        caption: "Sole Finishing",
      },
    ],
  },
  {
    number: "07",
    slug: "final-finishing-and-inspection",
    phase: "Final Touch",
    title: "Final Finishing & Inspection",
    subtitle: "Finishing and Quality Review",
    text: "The completed footwear undergoes a final review by our team and workshop against the approved sample and agreed specifications before dispatch.",
    tags: ["Final Finishing", "Quality Review"],
    media: [
      {
        type: "image",
        src: "/images/process/stage-08-burnishing.jpg",
        alt: "Wax being applied to the toe cap of an oxford to build a polished finish",
        caption: "Final Finishing",
      },
    ],
  },
];

export type MaterialGroup = {
  /** Which kind of characteristic this group describes. They are deliberately kept apart. */
  category: string;
  title: string;
  text: string;
  options: string[];
};

/**
 * Leather and material options, grouped by what each term actually describes. Grain
 * classification, hide type, texture, tanning, finish and colour are different things,
 * so they are not listed as one flat set.
 */
export const materialGroups: MaterialGroup[] = [
  {
    category: "Grain & Classification",
    title: "Surface Quality",
    text: "Classifications describing the leather's grain and surface, selected for the design and its intended use.",
    options: ["Full-grain leather", "Top-grain leather"],
  },
  {
    category: "Hide Type",
    title: "Cow & Goat",
    text: "The animal the hide comes from, selected to suit the design.",
    options: ["Cow leather", "Goat leather"],
  },
  {
    category: "Texture",
    title: "Surface Texture",
    text: "The surface texture of the leather, from soft, tactile suede to milled grain.",
    options: ["Suede", "Milled leather"],
  },
  {
    category: "Tanning & Base Leather",
    title: "Tanning Methods",
    text: "How the leather is tanned, and the base leather it is supplied as before finishing.",
    options: ["Vegetable-tanned leather", "Crust leather"],
  },
  {
    category: "Finish Character",
    title: "Finishes",
    text: "Surface treatments that shape how the leather looks and develops, such as aniline, pull-up and patina.",
    options: ["Cow aniline leather", "Pull-up leather", "Patina finishes"],
  },
  {
    category: "Colour & Specialty",
    title: "Colours & Specialty Finishes",
    text: "Further colours, textures and specialty finishes, and other leather options according to sourcing requirements.",
    options: ["Leather colours", "Additional textures", "Specialty finishes"],
  },
];
