# Published image provenance

One row per image served from `public/images/products/`. Keep this file in step with `src/data/portfolio.ts` whenever a published image is added, replaced or removed.

- **Source path** is the original location under `/Users/burq/Documents/Shoes/` (outside the repo). A copy with the same filename is kept locally in `catalogue-assets/<slug>/`, which is gitignored and never served.
- **Method:** the source file is a "Product Beautifier" background edit of a Pixel phone photograph. This is from the filename and your description (PhotoRoom); I did not verify it independently. The only processing on this side was a resize to 1600 px on the long edge and WebP encoding (quality 84, ICC profile kept) with Pillow. The shoe was not recoloured, regenerated or retouched.
- **Kind:** `photograph` = real physical sample. `ai-concept` = AI-generated digital preview, always shown with a "Digital preview" caption. One is published, for owner testing (Wingtip Zip Boot collage); other AI collages remain unpublished.
- Exported 2026-10-27.

## Full Brogue Wingtip: `public/images/products/full-brogue-wingtip/`

| Destination | Source path | Method | Kind |
|---|---|---|---|
| `brown-hero.webp` | `Patina Borgue/Photoroom/PXL_20261020_081229469 (Product Beautifier).jpg` | Background edit of phone photo (taken 2026-10-20); resized + WebP | photograph |
| `brown-top.webp` | `Patina Borgue/Photoroom/PXL_20261021_072752306 (Product Beautifier).jpg` | Background edit of phone photo (2026-10-21); resized + WebP | photograph |
| `brown-side.webp` | `Patina Borgue/Photoroom/PXL_20261021_072803700 (Product Beautifier).jpg` | Background edit of phone photo (2026-10-21); resized + WebP | photograph |

## Spectator Brogue: `public/images/products/spectator-brogue/`

| Destination | Source path | Colourway | Method | Kind |
|---|---|---|---|---|
| `white-black-hero.webp` | `White & Black Brogue/Photoroom/PXL_20261024_112823378 (Product Beautifier).jpg` | White / Black | Background edit of phone photo (2026-10-24); resized + WebP | photograph |
| `white-black-top.webp` | `White & Black Brogue/Photoroom/PXL_20261024_112850113 (Product Beautifier).jpg` | White / Black | as above | photograph |
| `white-black-sole.webp` | `White & Black Brogue/Photoroom/PXL_20261024_112934980 (Product Beautifier).jpg` | White / Black | as above | photograph |
| `white-brown-hero.webp` | `White & Brown Brogue/Photoroom/PXL_20261024_113449905 (Product Beautifier).jpg` | White / Brown | as above | photograph |
| `white-brown-top.webp` | `White & Brown Brogue/Photoroom/PXL_20261024_113415180 (Product Beautifier).jpg` | White / Brown | as above | photograph |

## Wingtip Zip Boot: `public/images/products/wingtip-zip-boot/`

Different pipeline from the two brogues: this image is **not** a PhotoRoom edit.

| Destination | Source path | Method | Kind |
|---|---|---|---|
| `brown-side-hero.webp` | `Brown LongShoes/Pasted 25-10-2026 at 13.23.42.png` | Restyled edit (floor, lighting, trousers) of the phone photo `WhatsApp Image 2026-10-11 at 8.38.41 PM (1).jpeg`; the edit tool is **unconfirmed**. Only WebP encoding (quality 84, no resize; 1448×1086) was done on this side | photograph (edited) |

| `brown-front.webp` | `Brown LongShoes/Pasted 25-10-2026 at 13.23.30.png` | Restyled edit of the phone photo `WhatsApp Image 2026-10-11 at 8.38.41 PM.jpeg`; edit tool **unconfirmed**; WebP only (1448×1086). Added at the owner's request; its toe looks narrower than the original, so check it against the real boot | photograph (edited) |

| `collage-digital-preview.jpg` | `Brown LongShoes/Gemini_Generated_Image_bl6548bl6548bl65.jpeg` | The whole brown-only AI collage (1195×896), copied unchanged, including its baked-in "Mahikaar / The Heritage Boot" text and captions. **Added for owner testing**; shown in the dialog with a "Digital preview" caption | **ai-concept** |

All files are copied to `catalogue-assets/wingtip-zip-boot/`. Not published: the three `WhatsApp Image 2026-10-22` photographs (worn pair, owner confirmed they were reference only) and the other, multi-colour AI collage.

## Woven Loafer: `public/images/products/woven-loafer/`

Files are copied as-is (no WebP encoder available here), so they are larger than the WebP images above. Copies are in `catalogue-assets/woven-loafer/`.

| Destination | Source path | Method | Kind |
|---|---|---|---|
| `burgundy-hero.png` | `Burgundy Loafers/Photos-1-001/Pasted 25-10-2026 at 13.14.20.png` | Beige studio-style image (1446×1088), same "Pasted 25-10-2026" pipeline as the Wingtip Zip Boot edits. Its original photograph and edit tool are **unconfirmed**; check its toe, welt and colour against the real loafer | photograph (edited) |
| `burgundy-top.jpg` | `Burgundy Loafers/Photos-1-001/image-0 (Product Beautifier).jpg` | PhotoRoom background edit (1792×2400); the original photograph is **not identified**. Its colour is darker and browner than the phone photographs | photograph |

Not published: the six `Loafers-*.jpg` and three `PXL_20261024_*` originals, the low-resolution (1142×862) PhotoRoom sole view (its toe looks squarer than the original), the two `Burgundy Woven Leather Loafers` PNGs, `shot_*` and the videos (uncertain provenance), and both AI collages (which include invented tan, olive and black colourways).

## Not published (kept out of `public/`)

Brown Brogue Wingtip: a separate design from the Shalimar Full Brogue (different last, tan welt). Three clean crops of the "Heritage Wingtip" AI collage are staged in `catalogue-assets/brown-wingtip/` but not served, pending a real lead photograph.

AI collages (`Gemini_Generated_Image_*`) other than the one listed above, all unedited `PXL_*` originals, the low-resolution `WhatsApp Image …` files, the `Black Brogue` shop photographs, and the other PhotoRoom edits not listed above. They stay in `~/Documents/Shoes/`.

## Open provenance points

- Whether the white/black and white/brown samples share the same last and construction is **unconfirmed**; the site wording does not claim they do.
- "Dark Brown" and "Textured Leather" on the Full Brogue Wingtip describe what is visible in the photographs. The leather type and any finish (including patina) are **unconfirmed** and are not stated on the site.
