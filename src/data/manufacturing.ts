/**
 * What a piece of stage media actually is. "illustration" is shown with an "Illustration"
 * label so it is never mistaken for a photograph of real production; mark media
 * "workshop" only when it is a genuine Mahikaar workshop photograph or clip.
 */
export type MediaKind = "workshop" | "illustration";

/**
 * An image or short clip shown beside a manufacturing stage. The caption should say what
 * the stage involves. A stage with no `media` renders as text only; no placeholder is
 * shown. See catalogue-review/process-media-guide.md for the folder layout, naming and
 * file-format recommendations.
 */
export type StageMedia =
  | { type: "image"; kind: MediaKind; src: string; alt: string; caption?: string }
  | {
      type: "video";
      kind: MediaKind;
      src: string;
      poster: string;
      alt: string;
      caption?: string;
    };

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
    subtitle: "Material Selection & Matching",
    text: "Leather is selected according to the design, intended use, desired appearance and agreed specifications. Different leather types, textures, colours and finishes can be discussed depending on material availability and order requirements.",
    tags: ["Material Selection", "Matching"],
    media: [
      {
        type: "image",
        kind: "illustration",
        src: "/images/process/leather-selection.png",
        alt: "Full-grain rolled leather hides, pattern shears, and swatch samples spread over a timber worktable",
        caption: "Choosing leather against the design and the agreed specifications.",
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
        kind: "illustration",
        src: "/images/process/stage-03-skiving.jpg",
        alt: "Hands thinning the margin of calf leather with a skiving knife",
        caption: "Thinning (skiving) leather edges as part of preparing the upper.",
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
        kind: "illustration",
        src: "/images/process/stage-04-lasting.jpg",
        alt: "Leather upper being drafted over a wooden last with lasting pincers",
        caption: "Shaping the upper over the last.",
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
        kind: "illustration",
        src: "/images/process/welt-hand-stitching.png",
        alt: "Hands hand-stitching the leather welt onto a dress shoe with a hand awl and waxed thread",
        caption: "Stitching the leather welt by hand as part of Goodyear welted construction.",
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
        kind: "illustration",
        src: "/images/process/stage-07-waist.jpg",
        alt: "Leather outsole being shaped along the waist with an edge tool",
        caption: "Shaping the leather outsole along the waist.",
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
        kind: "illustration",
        src: "/images/process/stage-08-burnishing.jpg",
        alt: "Wax being applied to the toe cap of an oxford to build a polished finish",
        caption: "Applying wax to the toe cap to build a polished finish.",
      },
    ],
  },
];

export type MaterialOption = {
  name: string;
  /** A plain-language explanation of the term, for buyers who are not leather specialists. */
  note?: string;
};

export type MaterialGroup = {
  /** Which kind of characteristic this group describes. They are deliberately kept apart. */
  category: string;
  title: string;
  text: string;
  options: MaterialOption[];
};

/**
 * Leather and material options, grouped by what each term actually describes. Grain
 * classification, hide type, texture, tanning, finish and colour are different things,
 * so they are not listed as one flat set. Options are examples that can be discussed, not
 * a permanent stock list: availability is confirmed for each order.
 */
export const materialGroups: MaterialGroup[] = [
  {
    category: "Grain & Classification",
    title: "Leather Quality",
    text: "How much of the hide's natural surface is kept.",
    options: [
      {
        name: "Full-grain leather",
        note: "The natural grain is left intact, so the surface shows the character of the hide.",
      },
      {
        name: "Top-grain leather",
        note: "The surface is lightly buffed for a more even appearance.",
      },
    ],
  },
  {
    category: "Hide Type",
    title: "Cow & Goat",
    text: "The animal the hide comes from, selected to suit the design.",
    options: [{ name: "Cow leather" }, { name: "Goat leather" }],
  },
  {
    category: "Texture",
    title: "Surface Texture",
    text: "The feel and appearance of the leather surface.",
    options: [
      { name: "Suede", note: "A soft, napped surface." },
      {
        name: "Milled leather",
        note: "Tumbled to soften the grain, giving a gentle, natural texture.",
      },
    ],
  },
  {
    category: "Tanning & Base Leather",
    title: "Tanning Methods",
    text: "How the leather is tanned, and the base leather it is supplied as before finishing.",
    options: [
      {
        name: "Vegetable-tanned leather",
        note: "Tanned using plant-based tannins.",
      },
      {
        name: "Crust leather",
        note: "Tanned but not yet surface-finished, so it can be finished to your specification.",
      },
    ],
  },
  {
    category: "Finish Character",
    title: "Finishes",
    text: "Surface treatments that shape how the leather looks and feels.",
    options: [
      {
        name: "Aniline leather",
        note: "Coloured with a transparent dye, so the natural grain stays visible.",
      },
      {
        name: "Pull-up leather",
        note: "The colour lightens where the leather is flexed or stretched.",
      },
      {
        name: "Patina finishes",
        note: "A tonal, burnished colour effect that adds depth to the surface.",
      },
    ],
  },
  {
    category: "Colour & Other Options",
    title: "Colours & Additional Options",
    text: "Additional leather options can be discussed, subject to confirming the exact material, sourcing and specifications.",
    options: [
      { name: "Leather colours" },
      { name: "Additional textures" },
      { name: "Specialty finishes" },
    ],
  },
];
