# Manufacturing media: where real workshop photos and videos go

Only genuine Mahikaar workshop media is published in the manufacturing section.
Nothing is generated, stocked or placeholder. A stage with no `media` entry renders text-only.

## Folder layout

One folder per stage, named by the stage `slug` in `src/data/manufacturing.ts`:

```
public/images/process/<slug>/<descriptive-name>.jpg
public/videos/process/<slug>/<descriptive-name>.mp4
public/videos/process/<slug>/<descriptive-name>-poster.jpg
```

Slugs: `design-and-preparation`, `leather-selection`, `cutting-and-upper-construction`,
`lasting`, `goodyear-welted-construction`, `sole-and-heel-finishing`,
`final-finishing-and-inspection`.

Close-ups (stitching, welt, sole attachment, leather preparation, finishing) and shots of
craftsmen at work go in the folder of the stage they show, e.g.
`goodyear-welted-construction/welt-stitching-closeup.jpg`.

## Recommended formats

- Photos: JPEG or WebP, long edge about 2000 px, landscape 3:2 or 4:3. The frame crops to
  about 16:9 on desktop, so keep the subject central. Next.js resizes them automatically.
- Videos: MP4 (H.264), 5-20 seconds, 1280x720, muted and without audio, under about 8 MB each.
  Short clips of one action (a stitch, a lasting pull, a burnish) work better than long edits.
  Always supply a poster frame as a JPEG.
- Name files by what they show, not by camera numbering. Remove location metadata before upload.

## Adding media to a stage

Edit the stage's `media` array in `src/data/manufacturing.ts`. The first item is the lead;
any further items show as a smaller row beneath it. Every item needs a `kind`: use
`"workshop"` only for genuine Mahikaar workshop photographs or clips. `"illustration"` shows an
"Illustration" label, so it is never presented as real production. Captions should say what the
stage involves.

```ts
media: [
  { type: "image", kind: "workshop", src: "/images/process/lasting/hand-lasting.jpg", alt: "Craftsman drawing an upper over the last with lasting pincers", caption: "Hand Lasting" },
  { type: "video", kind: "workshop", src: "/videos/process/lasting/pull-over.mp4", poster: "/videos/process/lasting/pull-over-poster.jpg", alt: "Short clip of an upper being lasted by hand" },
]
```

## Existing process images (retained)

These illustrative images from the first revision are kept, with their paths unchanged, and remain
referenced by the stages until real workshop photographs replace them one by one:

| Image | Stage |
| --- | --- |
| `public/images/process/leather-selection.png` | 02 Leather Selection |
| `public/images/process/stage-03-skiving.jpg` | 03 Cutting & Upper Construction |
| `public/images/process/stage-04-lasting.jpg` | 04 Lasting |
| `public/images/process/welt-hand-stitching.png` | 05 Goodyear Welted Construction (also the homepage) |
| `public/images/process/stage-07-waist.jpg` | 06 Sole & Heel Finishing |
| `public/images/process/stage-08-burnishing.jpg` | 07 Final Finishing & Inspection |

`stage-01-lasts.jpg` and `stage-06-cork-shank.jpg` are also still in the folder, untouched but not
currently referenced. Stage 01 has no media, so it renders text-only until real material exists.
When a real photograph is ready, put it in the stage folder and replace the entry in the stage's
`media` array; do not delete the old file until the new one is live.
