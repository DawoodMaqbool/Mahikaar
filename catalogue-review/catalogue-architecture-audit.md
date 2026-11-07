# Mahikaar — Catalogue Architecture Audit and Image Organisation Plan

Status: **audit only.** No application code, product data or images were modified, moved or created (apart from this report). Contact sheets used for visual review were written to the session scratchpad, outside the repo.

Scope: Spectator Brogue and Woven Loafer.

---

## 1. Current portfolio architecture

### Stack
- Next.js **16.3.6**, React 19.2.8, Tailwind 4, TypeScript ([package.json](../package.json)). **App Router** (`src/app/…`); there is no `pages/` directory.
- [next.config.ts](../next.config.ts) is empty: no `images` config. All product images are local files in `public/`, so none is needed.
- Next 16 notes checked in `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`: `priority` is **deprecated in favour of `preload`**, default `quality` is 75, and `images.qualities` can restrict allowed values.

### Flow

```
src/app/portfolio/page.tsx            (server component, metadata)
 └─ <InquiryModalProvider>            src/components/portfolio/InquiryModal.tsx  (client, context + <dialog>)
     ├─ <PortfolioIntro/>
     ├─ <PortfolioCatalog/>           src/components/portfolio/PortfolioCatalog.tsx  (client)
     │    ├─ filter ribbon            useState<PortfolioFilter["value"]>  ← portfolioFilters
     │    └─ grid of <SpecimenCard/>  ← portfolioSpecimens.filter(category)
     │          ├─ next/image (fill, object-contain, 4:3 box) ← specimen.image
     │          └─ button → openInquiry({ title: name, subtitle: last })
     ├─ <BenchmarksSection/>
     └─ <CustomDevelopmentBanner/> → <CustomDevelopmentButton/> → openInquiry({ title: "Custom Footwear Development", … })

src/data/portfolio.ts                 types + portfolioFilters + customizationNote + portfolioSpecimens[6]
```

### Answers to the seven questions

1. **Which file controls the portfolio page?** [src/app/portfolio/page.tsx](../src/app/portfolio/page.tsx) (`PortfolioPage`). It only composes sections. The catalogue itself is [PortfolioCatalog.tsx](../src/components/portfolio/PortfolioCatalog.tsx).
2. **Where is product information defined?** [src/data/portfolio.ts](../src/data/portfolio.ts): type `PortfolioSpecimen`, array `portfolioSpecimens` (6 entries), `portfolioFilters`, `customizationNote`. The products are **data-driven from a reusable array**, not hardcoded in JSX. The one exception is described below.
3. **Which component renders each card?** `SpecimenCard` (a local function in `PortfolioCatalog.tsx`, not exported).
4. **Where are images stored?** `public/images/products/` for catalogue shots (flat, one file per product), plus `public/images/atelier/` and `public/images/process/`. Referenced as root-relative strings, e.g. `"/images/products/penny-loafer.png"`.
5. **How does a card select its image?** It uses `specimen.image` (a single string) and `specimen.alt`. It is rendered with `next/image` using `fill`, `sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"`, and `object-contain` inside a `relative aspect-[4/3] … p-6` box on `bg-surface-container-low` (#f5f3ef). The first paint has no `preload`.
6. **What happens on card/button click?** Only the button is interactive. It calls `openInquiry({ title, subtitle })` from `useInquiryModal()`, which stores the target in provider state and opens one shared native `<dialog>` with `showModal()`. The target is used **only for the dialog heading**. Submitting runs `handleSubmit` → `setSubmitted(true)` → a "received" message and auto-close after 2.6 s. **No network request is made; nothing is sent anywhere.** The same applies to [QuoteForm.tsx](../src/components/quote/QuoteForm.tsx) (`handleSubmit` generates a random `MK-####` reference client-side; the code comment says "There is no backend yet"). There is no product detail page, drawer or gallery.
7. **What must change to support several images per product?** See §5. In short: add optional `gallery` and `colourways` to the type, and add a place to *show* them. Today there is no UI for that, so a decision is needed (§7, Q4).

### Other findings that affect this work
- **No slug.** Cards are keyed by `number` ("01"–"06"). There is no route per product.
- **Reference IDs** follow `MKR-<2-letter category>-<last no.>` (`MKR-OX-042`, `MKR-LF-104`, `MKR-BR-088`). These are fixed strings in the data; I could not verify what they correspond to commercially.
- **Alt text** is a per-product sentence, written descriptively. Gallery images would each need their own.
- **Filter label is hardcoded:** `{ value: "all", label: "All Articles (06)" }`. Adding two products makes it wrong unless updated (or derived from the array length).
- **Categories** are a closed union: `"oxford" | "loafer" | "brogue" | "boots" | "bespoke"`. Spectator Brogue fits `brogue`; Woven Loafer fits `loafer`. No new category is needed.
- **Duplicate, divergent data on the home page.** [SpecimensSection.tsx](../src/components/home/SpecimensSection.tsx) has its own hardcoded `specimens[]` that does *not* read `portfolioSpecimens`. Names and last numbers disagree with the portfolio (e.g. "The Belgrave Oxford / AT-084" vs "The Empress Cap-Toe Oxford / Last 042"; "Anarkali Full Brogue" vs "Shalimar Full Brogue Wingtip"). This is pre-existing and out of scope, but any new product shown on the home page needs a separate decision, and the mismatch is worth fixing eventually.
- **Existing image quality is uneven.** Three portfolio images (`cap-toe-oxford.jpg`, `adelaide-oxford.jpg`, `chukka-boot.jpg`) are only **512×279**. The other three are 1200×896 PNGs of ~1.1–1.5 MB. New 2400-px images will look noticeably sharper next to them.
- **No `catalogue-assets/` or `catalogue-review/` convention existed** in the repo. `.gitignore` is the stock Next.js one.

---

## 2. Image inventory

### Where the real material lives
The repo contains **none** of the new photos. They are in:

- `/Users/burq/Documents/Shoes/` (81 files, organised by colour/style folders)
- `/Users/burq/Projects/mahikaar-studio/` (a local Python cut-out/compose tool and its outputs: `data/originals`, `data/work`, `data/exports`)

The folder `/Users/burq/LinuxTransfer/untitled folder/stitch_bespoke_welt_footwear_manufacturer/*/screen.png` are Stitch design screens, not product assets.

### Provenance method and limits
I classified each file by **(a)** the filename pattern, **(b)** the file's timestamp and dimensions, **(c)** the contents of contact sheets I viewed, and **(d)** for the studio export only, its `manifest.json`. These are *inferences*, not proof. Your own knowledge of where each file came from overrides mine. I did not inspect EXIF/C2PA, and the macOS metadata fields (`kMDItemCreator`, `kMDItemSoftware`) were empty for the files I checked.

| Label | Basis |
|---|---|
| **Original** | `PXL_YYYYMMDD_…` (Pixel camera naming), 4080×3072 or 3072×4080, 1.5–4 MB |
| **PhotoRoom edit** | `… (Product Beautifier).jpg`, in a `Photoroom/` folder or next to its original, 1792×2400 / 2400×1792; clean white backgrounds. You told me these are PhotoRoom edits |
| **AI (Gemini)** | `Gemini_Generated_Image_*.jpeg`, ~900–1400 px, 650–740 KB |
| **Processed by own tooling** | `mahikaar-studio` export |
| **Uncertain** | anything else |

### 2a. Spectator Brogue

Two real physical samples are visible (white/black and white/brown wingtip brogues). Both were photographed on 2026-10-24.

**White & black — real photographs (originals)** in `~/Documents/Shoes/White & Black Brogue/`

| File | Size | Notes |
|---|---|---|
| `PXL_20261024_112823378.jpg` | 4080×3072 | Pair, high 3/4, on lilac board |
| `PXL_20261024_112850113.jpg` | 3072×4080 | Top-down pair |
| `PXL_20261024_112921556.jpg` | 4080×3072 | Side profile, room visible; black leather reads grey (lighting) |
| `PXL_20261024_112934980.jpg` | 4080×3072 | One shoe showing sole, one upright |

**White & black — PhotoRoom edits** in `White & Black Brogue/Photoroom/`

| File | Size | From original |
|---|---|---|
| `PXL_20261024_112823378 (Product Beautifier).jpg` | 2400×1792 | …112823378 |
| `PXL_20261024_112850113 (Product Beautifier).jpg` | 1792×2400 | …112850113 |
| `PXL_20261024_112934980 (Product Beautifier).jpg` | 2400×1792 | …112934980 |

There is no edit of `…112921556`.

**White & black — AI collages (Gemini)** in `White & Black Brogue/`

| File | Size | Content (as viewed) |
|---|---|---|
| `Gemini_Generated_Image_e7sioee7sioee7si.jpeg` | 1200×895 | "MAHIKAAR — The Spectator Collection" collage; includes brown-and-black/white combinations and generated text ("Timeless Design", "Fine Details") |
| `Gemini_Generated_Image_qdssvxqdssvxqdss.jpeg` | 1200×895 | "MAHIKAAR — The Resort Spectator" collage; navy/white and **olive/white** variations plus detail crops. These are colourways that, as far as I can tell, **do not exist as physical samples** |

**White & brown — real photographs (originals)** in `White & Brown Brogue/`

| File | Size |
|---|---|
| `PXL_20261024_113205499.jpg` | 4080×3072 (pair, high angle) |
| `PXL_20261024_113214141.jpg` | 4080×3072 (top-down; interior visible) |
| `PXL_20261024_113223461.jpg` | 4080×3072 (side profile) |
| `PXL_20261024_113327447.jpg` | 4080×3072 (sole + upright shoe) |
| `PXL_20261024_113415180.jpg` | 3072×4080 (top-down pair, portrait) |
| `PXL_20261024_113449905.jpg` | 4080×3072 (pair, 3/4) |

**White & brown — PhotoRoom edits** in `White & Brown Brogue/Photoroom/`: `…113223461`, `…113327447`, `…113449905` (all 2400×1792) and `…113415180` (1792×2400), each with the suffix ` (Product Beautifier).jpg`. There are no edits of `…113205499` or `…113214141`.

**"AI-colour variations"** you mentioned: I only found them *inside* the Gemini collage above (navy, olive). I found **no** standalone recoloured Spectator photographs. If you have some, they are not in the folders I searched.

**Close but a different design (do not mix in):**
- `~/Documents/Shoes/Semi Brogue/Gemini_Generated_Image_ltb3frltb3frltb3.jpeg` (896×1192): "The Spectator Collection" collage, but the shoes are **cap-toe** spectators in black/white/brown, not wingtips. This is not the Spectator Brogue.
- `Black Brogue/`, `Brown Brogue Wingtip/` (including `Mahikaar Goodyear-Welted Brogue Lookbook.png`), `Semi Brogue/`, `Brown LongShoes/`, `Oxford Shoes/`, `Monkstrap/`: other designs.

### 2b. Woven Loafer

Only **burgundy** is visible in real photographs.

**Original phone photographs** in `~/Documents/Shoes/Burgundy Loafers/`

| File | Size | Notes |
|---|---|---|
| `Loafers-1.jpg` | 3072×4080 | Pair on pinkish paving. **Byte-identical** (md5) to `Photos-1-001/Loafers-1.jpg` |
| `Loafers-2.jpg` | 4080×3072 | Side/3-4 view |
| `Loafers-3.jpg` | 4080×3072 | Heel view |
| `Loafers-4.jpg` | 4080×3072 | 3/4 view. **Byte-identical** to `Photos-1-001/Loafers-4.jpg` |
| `Loafers-5.jpg` | 3072×4080 | Top-down pair |
| `Loafers-6.jpg` | 3072×4080 | Hand-held, feet in frame; not publishable as is |
| `Photos-1-001/PXL_20261024_111813918.jpg` | 4080×3072 | Side view on white board |
| `Photos-1-001/PXL_20261024_111914606.jpg` | 4080×3072 | 3/4 view, white board |
| `Photos-1-001/PXL_20261024_112205852.jpg` | 4080×3072 | Upright + sole view, white board |

**PhotoRoom edits** (suffix "Product Beautifier") in `Photos-1-001/`

| File | Size | Notes |
|---|---|---|
| `image-0 (Product Beautifier).jpg` | 1792×2400 | Top-down pair on white; the original is not identified by its name |
| `PXL_20261024_112205852 (Product Beautifier).jpg` | **1142×862**, 125 KB | Edit of `…112205852`, but **much smaller** than the other edits |

**Processed by own tooling** (`~/Projects/mahikaar-studio/data/exports/Loafers-1_0088e061/`)
- `…__warm-beige__master.png` (2400×2400) and `…__warm-beige__web.jpg` (1600×1600).
- Derived from `Loafers-1.jpg` (sha256 `0088e061…` matches the manifest). The manifest records a BiRefNet cut-out ("RGB identical where alpha>0", i.e. the shoe pixels are unchanged) composited on a warm-beige gradient. `review_status` for the cut-out is **"NOT REVIEWED"**.

**AI-generated or uncertain provenance**

| File | Size | Assessment |
|---|---|---|
| `Gemini_Generated_Image_cs365ycs365ycs36.jpeg` | 896×1192 | AI collage, "The Woven Loafer", burgundy, with generated text. Evident from filename and content |
| `Gemini_Generated_Image_ird2fsird2fsird2.jpeg` | 896×1192 | AI collage, "The Woven Series"; shows **tan, olive and black** woven loafers that are AI colourways, not confirmed products |
| `Photos-1-001/Burgundy Woven Leather Loafers.png` and `… (1).png` | 1445×1088 | Beige studio-style background. Different files (distinct md5). **Uncertain** (likely an AI/edited render, but I cannot tell) |
| `Photos-1-001/Pasted 25-10-2026 at 13.14.20.png` | 1446×1088 | Same look as the two above. **Uncertain** |
| `shot_0.jpg`, `shot_3.jpg`, `shot_3.webp` | 1024×1024 | White-background and **lifestyle scene with a person's legs**. `videoroom-*.mp4` sit beside them. They look generated/composited. **Uncertain**; treat as AI until you confirm |
| `videoroom-16x9-720p.mp4`, `videoroom-9x16-720p.mp4` | video | Not images; 720p |

### 2c. Observations that matter for decisions
- The white backgrounds in the PhotoRoom files are **pure white** (or near). The card background is `#f5f3ef`, so they will show as a faint white rectangle inside the card, unlike the existing stone-plinth images. It looks fine on `bg-surface-container-lowest` (#ffffff). Decide on a visual treatment (§7, Q6).
- The landscape PhotoRoom outputs (2400×1792 = 1.34:1) match the card's `aspect-[4/3]` almost exactly. Portrait ones (1792×2400) will be letterboxed by `object-contain`, which is acceptable for gallery use but weak as a card hero.
- The Gemini collages **bake in text and the Mahikaar name** and show shoes that I cannot confirm match the physical samples (e.g. toe shape, welt, colours). They are therefore concept visuals, and "do not assume images are interchangeable" applies strongly.
- Two original photographs (the white/black side view `…112921556` and the low-res PhotoRoom loafer) have specific quality problems noted in the tables.

---

## 3. Recommended folder structure

### Principle
Your proposal separates **source** (internal) from **approved** (served). I agree. I recommend two modifications: **(1)** do not nest approved files by *role* (`gallery/`, `colourways/`, `editorial/`), because the data structure (§4) already records each image's role, and folders for single-file roles are the "empty/unnecessary folders" you wanted to avoid; **(2)** keep the heavy source files out of git.

### Source (internal, never under `public/`)
Source files are 2–4 MB each. The two designs alone are ~60 files and ~100 MB; committing them would bloat the repo. Options:

- **Recommended:** `catalogue-assets/` at the repo root, **added to `.gitignore`**, only for the files you *intend* to publish (copied, not moved), plus one small **tracked** provenance note per product. For example:

```
catalogue-assets/                      (gitignored, local only)
  spectator-brogue/
    originals/       PXL_… (copied from ~/Documents/Shoes)
    background-edits/ … (Product Beautifier).jpg
    ai/              Gemini collages
  woven-loafer/
    originals/ background-edits/ ai/
catalogue-review/
  catalogue-architecture-audit.md      (this file)
  provenance/                          (tracked, tiny)
    spectator-brogue.md                (published file ← source file, kind, approved by/when)
    woven-loafer.md
```

- Simpler alternative: leave the sources where they are in `~/Documents/Shoes` and track only the provenance notes. It is less tidy but less to maintain. Either way, **sources are never copied into `public/`**.

### Approved (served)
Follows the existing flat `public/images/products/` convention, one folder per product, files named by colourway + view:

```
public/images/products/
  spectator-brogue/
    white-black-hero.webp
    white-black-top.webp
    white-black-sole.webp
    white-brown-hero.webp
    white-brown-top.webp
    …
    concept-collage.webp       ← only if approved, and labelled as concept
  woven-loafer/
    burgundy-hero.webp
    burgundy-top.webp
    …
```

- Only create files that are actually approved. No empty `gallery/`, `colourways/`, `editorial/` directories.
- Existing six products stay where they are. No migration is needed now.
- Format and size: WebP (or JPEG), long edge about **1600–2000 px**, ~150–300 KB. `next/image` will resize and re-encode per request, so the source for the optimiser should be good but not a 4080-px original. Keep alt text in data, not in filenames.

### How paths are referenced
Same as today: root-relative strings in `src/data/portfolio.ts`, for example `image: "/images/products/spectator-brogue/white-black-hero.webp"`. No code change to `next/image` usage is needed, and `next.config.ts` needs no change for local files.

---

## 4. Recommended data structure

Reuse `PortfolioSpecimen` in [src/data/portfolio.ts](../src/data/portfolio.ts). **Additive and backward compatible**: the six existing entries remain valid with no edits.

```ts
export type ProductImage = {
  src: string;
  alt: string;
  /** "photograph" = real sample photo (original or background-edited);
      "ai-concept" = AI visualisation, must be labelled as such on the page. */
  kind: "photograph" | "ai-concept";
  caption?: string;
};

export type Colourway = {
  name: string;               // e.g. "White / Black"
  image: ProductImage;
  availability: "sampled" | "concept"; // "sampled" only if a physical sample exists
};

export type PortfolioSpecimen = {
  // existing fields unchanged: number, category, name, last, image, alt, construction, materials, description, specs, reference, leadTime
  slug?: string;              // for a future /portfolio/[slug] or deep link
  gallery?: ProductImage[];   // additional views, same colourway as `image`
  colourways?: Colourway[];   // one product, several colours (not one product per colour)
};
```

Notes:
- **One entry per design.** `image`/`alt` remain the card hero; `gallery` supplies extra views; `colourways` lists the other colours. This keeps `SpecimenCard` working unmodified.
- **AI visualisations** are distinguished with `kind: "ai-concept"` / `availability: "concept"`, so the UI can show a "Concept visual" badge and so the data itself never claims a real sample exists.
- Keep `reference` in the existing `MKR-XX-NNN` form. The numeric part for the existing items is the "Last No."; **I can't verify what last numbers the two new designs use** (§7, Q2).
- Do **not** add colour selection or recolouring now (as requested).
- `portfolioFilters[0].label` ("All Articles (06)") should be derived from the array length, or at least updated.

---

## 5. Plan for the first two products

Both fit the current catalogue, in the **brogue** and **loafer** categories, using the existing card, grid, filters, modal and "Made to Order • Non-Retail" framing. No product text below is confirmed. Items marked **needs input** are listed in §7.

### 5.1 Spectator Brogue (category `brogue`)

| Role | Recommended candidate | Why |
|---|---|---|
| **Card hero** | `White & Black Brogue/Photoroom/PXL_20261024_112823378 (Product Beautifier).jpg` (2400×1792) | Real photograph of the actual shoe; clean pair view; 4:3 so it fills the card. White/brown (`…113223461` or `…113449905` edit) is an equally valid choice, so which colourway is primary is **your decision** |
| **Gallery (same colourway)** | `…112850113 (Product Beautifier)` (top-down); `…112934980 (Product Beautifier)` (sole + profile) | Real, edited; give the buyer the top view and the sole/welt |
| **Second colourway (real)** | White/brown: `…113223461`, `…113449905`, `…113415180` (top), `…113327447` (sole) edits | A genuine second sampled colourway of what looks like the same design (to confirm) |
| **Collage** | Optionally `Gemini_…e7sioee7sioee7si.jpeg` ("Spectator Collection") | Useful as an editorial/mood image at the bottom of a detail view, **labelled as concept**. Not on the card |
| **Internal reference only** | All 10 raw originals; `Gemini_…qdssvxqdssvxqdss.jpeg` (navy/olive, which don't exist physically); `Semi Brogue/…ltb3frltb3frltb3.jpeg` (different design) | The originals show a cluttered room and the lilac board; the navy/olive visuals could be mistaken for available colours |
| **Needs from you** | Confirmation that white/black and white/brown share the same last/pattern; materials; sole; lead time; last number; a higher-quality edit of `…112921556` if you want that view | |

Enquiry: the existing card button already works. Prefer to also pass the reference and (when relevant) the colourway into the dialog (see §5.3).

### 5.2 Woven Loafer (category `loafer`)

| Role | Recommended candidate | Why |
|---|---|---|
| **Card hero** | **Undecided, no ideal candidate.** Best options: (a) `studio export …warm-beige__web.jpg` (1600×1600, real shoe pixels, beige backdrop; square, so it letterboxes slightly in a 4:3 card); (b) `image-0 (Product Beautifier).jpg` (1792×2400 portrait; PhotoRoom); (c) a **re-export** of the `…112205852` edit at full resolution (the current one is only 1142×862) | There is no clean landscape, full-resolution, real-photograph hero in the set |
| **Gallery** | `image-0 (Product Beautifier)` (top-down); `…112205852 (Product Beautifier)` after a higher-res re-export; real originals `Loafers-2/-4`, `…111813918`, `…111914606` only if edited first | The originals have paving/white-board backgrounds that don't match the premium look |
| **Collage** | Optionally `Gemini_…cs365ycs365ycs36.jpeg` (burgundy "Woven Loafer") | Editorial only, labelled as concept |
| **Internal reference only** | `Gemini_…ird2fsird2fsird2.jpeg` (tan/olive/black are AI colourways); `shot_0/3`, `videoroom-*.mp4`, the `Burgundy Woven Leather Loafers*.png` and `Pasted …png` files **until you confirm how they were made**; `Loafers-6.jpg` (hand and feet); duplicate `Loafers-1/-4` copies | Provenance unclear or not publishable |
| **Needs from you** | Whether other real colours exist; construction (it is a woven, Goodyear-welted penny loafer per the collage text; **unverified**); lining/sole; last number; lead time; approval of the processed studio image | |

### 5.3 Enquiry connection

The existing path is sufficient to start: `SpecimenCard` → `openInquiry({ title, subtitle })`. Because nothing is transmitted, I recommend (later, with approval):
1. Extend `InquiryTarget` with optional `reference` and `colourway`, and show them in the dialog header. This is small and additive.
2. Decide how enquiries actually reach you. At the moment **neither the modal nor the quote form sends data anywhere**, so product-linked enquiries would be lost. This is the most important issue for a lead-generation site, and I'd raise it before polishing the catalogue.

### 5.4 Showing multiple images (decision needed)

There is no gallery UI at present. Options, from smallest to largest:
- **A. Thumbnail strip on the card** (hero swaps on click). The smallest change; fine for 3–4 images, cramped for more. Keeps everything on one page.
- **B. "View details" dialog** reusing the native `<dialog>` pattern from `InquiryModal.tsx`. A moderate change; no new routes; no deep links.
- **C. Route `/portfolio/[slug]`.** Linkable and indexable, best for B2B buyers sharing a style. It is the largest change (new route, `generateStaticParams`, and I'd read the Next 16 dynamic-route docs first because `params` handling differs from older versions).

My recommendation is **B for these two products**, with `slug` added to the data now so C remains possible. This is not a rebuild.

---

## 6. Risks and cautions
- **Do not publish AI collages as product photography.** They contain generated text and shoes that don't necessarily match your samples; the navy/olive/tan/green/black variants aren't real products.
- **Pure-white backgrounds vs. card background** (see §2c).
- **Resolution mismatch** with the three 512×279 existing images.
- **Duplicated home-page data** may show different names for the same products.
- **Hardcoded count** "All Articles (06)".
- **Studio cut-out** is flagged "NOT REVIEWED" in its own manifest; edges should be checked before use.

---

## 7. Questions and decisions for you

1. **Primary colourway for Spectator Brogue:** white/black or white/brown on the card?
2. **Design facts:** are the white/black and white/brown samples the same last/pattern? What last number, reference code (`MKR-BR-???`), construction, upper/sole materials, and lead time should each product show? I will not invent them.
3. **Woven Loafer hero:** can you re-export the `…112205852` PhotoRoom edit at full size (2400 px), or should I use the studio warm-beige image or the top-down edit?
4. **Gallery presentation:** thumbnail strip (A), detail dialog (B, recommended) or product route (C)?
5. **AI images:** may collages appear publicly at all, and if so with a visible "Concept visual" label? Are the navy/olive/tan colourways meant to be offered, or are they just visuals?
6. **Background treatment:** keep pure white PhotoRoom backgrounds (and make the card background white for these) or tint/standardise them?
7. **Provenance confirmations:** `shot_0/3`, `Burgundy Woven Leather Loafers*.png`, `Pasted … .png`: how were they produced?
8. **Source storage:** gitignored `catalogue-assets/` (recommended) or leave in `~/Documents/Shoes`?
9. **Enquiries:** where should submissions go (email, CRM, form service)? Out of scope here, but it determines how product context is passed.
10. **Home page:** should the two new products also appear in `SpecimensSection`, and should that section be unified with `portfolioSpecimens`?

---

## 8. Recommended implementation sequence

1. You answer §7 (especially 1–5 and 8) and supply missing product facts.
2. Create the folder structure **only** for the two products (gitignored `catalogue-assets/`, tracked provenance notes, `public/images/products/<slug>/`).
3. Copy (never move) the chosen sources, review the studio cut-out, and export approved web versions (WebP, ~1600–2000 px, ≤300 KB).
4. Extend the types in `src/data/portfolio.ts` (additive: `slug`, `gallery`, `colourways`, `ProductImage`).
5. Add the two entries to `portfolioSpecimens` with the confirmed facts, correct alt text, and `kind` labels. Make the "All Articles" count derive from the array.
6. Add the chosen gallery presentation (A/B/C) with a "Concept visual" badge for `ai-concept` images.
7. Extend `InquiryTarget` with `reference`/`colourway`; confirm the enquiry destination.
8. Verify visually in the browser (`next dev`): filters, 4:3 card fit, white-background treatment, responsive `sizes`; then `tsc`/`eslint`/`next build`.
9. Optionally reconcile the home `SpecimensSection` data.
10. Review and deploy (you do this).

*I'm waiting for your approval and answers before changing anything.*
