# CLAUDE.md

Context file for Claude Code / Codex / Cursor when working in this repo.

## What this is

Personal portfolio site for **Brian Pineda** (CS + EE @ Rutgers). Single-page Next.js 14 App Router site. **Light "Apple" aesthetic** — soft `#f4f4f6` canvas, floating frosted-glass nav, aurora gradient blobs, large rounded glass cards, soft shadows. Warm, first-person "student" voice; professional but personable, not generic AI-portfolio slop.

## Architecture (intentionally tiny)

This is a one-page site, scaffolded as flat as possible on purpose:

```
app/
  layout.tsx            — fonts, metadata, html shell (light bg-canvas body)
  page.tsx              — every section + every piece of content
  globals.css           — base styles, scrollbar, .glass utilities, aurora, animations
  icon.tsx              — generated favicon (gradient "B", edge runtime)
  opengraph-image.tsx   — generated 1200x630 social card (edge runtime)
  robots.ts / sitemap.ts — SEO
tailwind.config.ts      — color tokens, fonts, shadows, aurora/float keyframes
```

There are **no separate component files**. Sections live inside `app/page.tsx` as plain functions (`Hero`, `About`, `Experience`, `Work`, `Stack`, `Contact`, `Footer`), plus shared primitives (`Aurora`, `Nav`, `Section`, `Eyebrow`, `Chip`). This is a deliberate choice — for a single-page portfolio, splitting into `components/sections/*.tsx` adds friction without payoff. Don't refactor unless the site grows beyond one page.

## Where content lives

All copy and project data is in **constants at the top of `app/page.tsx`** (above the `// PRIMITIVES` comment):

- `PROFILE` — greeting, first-person `intro` (pieces marked `{ strong }` render in solid ink), contact, handles, `currently`, availability
- `HERO_STATS` — four chips in the hero avatar card
- `EXPERIENCE` — timeline items (`kind: "Leadership" | "Education"`, with `period` + `points[]`)
- `PROJECTS` — four cards; one has `featured: true` and spans two columns. Each may set an optional `link` — only then does the card become clickable (no dead link affordances)
- `STACK_CATEGORIES` — six skill buckets
- `NAV_LINKS`

To add a new project: append to `PROJECTS`. To change which one is featured: move `featured: true` between entries. To add a job/role: append to `EXPERIENCE`.

## Design tokens

Colors (defined in `tailwind.config.ts`, used as `bg-canvas`, `text-ink`, `text-brand`, etc.):

| Token   | Hex      | Role                                                |
| ------- | -------- | --------------------------------------------------- |
| canvas  | #f4f4f6  | page background                                     |
| surface | #ffffff  | solid card surface                                  |
| ink     | #1d1d1f  | primary text (Apple near-black)                     |
| slate   | #6e6e73  | secondary text, mono meta lines                     |
| line    | #d9d9e0  | hairline borders, dividers                          |
| brand   | #0a84ff  | primary blue accent                                 |
| grape   | #6d5bd0  | secondary purple (gradients)                        |
| mint    | #1eb6a0  | teal pop (availability dot, gradient end)           |
| amber   | #f5a623  | warm accent, sparing use                            |

Glass surfaces come from CSS utilities, not color tokens: `.glass` (cards) and `.glass-bar` (nav) in `globals.css` — translucent white + `backdrop-filter: blur` + hairline + soft shadow. The brand gradient (`brand → grape → mint`) drives the monogram, avatar, and `.text-gradient` headings.

Fonts:

- **Geist Sans** — everything: body, headings, name, monograms (`font-sans`)
- **JetBrains Mono** — eyebrow labels, chips, meta lines (`font-mono`)
- Typography is deliberately **one consistent sans**. Do NOT reintroduce a serif/italic accent (e.g. sans first-name + serif-italic last-name, or an italic accent word in headings) — that sans→serif switch is a recognizable AI-portfolio tell and was intentionally removed. Instrument Serif is no longer loaded.

## Visual conventions

- **Section headers** use the `<Section>` wrapper: an `<Eyebrow>` glass pill (mono caps + brand dot) above a plain semibold sans title.
- **Glass everywhere**: nav, cards, chips use `.glass` / `.glass-bar`. Hover on cards = `-translate-y-1` lift (no border-color swap).
- **Aurora background**: fixed `<Aurora />` renders 4 blurred gradient blobs behind a faint masked grid (`.grid-faint`); they drift via `animate-aurora-{1,2,3}`.
- **Reveal animation**: `animate-fade-up` + `stagger-{1..6}` delay utilities on hero elements; avatar uses `animate-float`.
- **Accents are scarce**: brand blue + the gradient carry the color; most surfaces are white glass on gray.

## What NOT to do

- Don't add a separate `/components` directory unless the site grows past one page.
- Don't introduce shadcn / Radix until there's an actual interactive component that needs them.
- Don't go back to a dark theme — the redesign is intentionally a light Apple/glass aesthetic.
- Don't replace the fonts with Inter / system defaults — the typography is the brand.
- Don't add dead link affordances — only show "View project" / make a card clickable when `link` is set.
- In `next/og` images (`icon.tsx`, `opengraph-image.tsx`): Satori only supports **simple linear gradients** — no `radial-gradient(... at ...)` size syntax, no `filter: blur`. Keep them on `runtime = "edge"`.

## Deploy

Vercel, zero config. Push to `main`, import on [vercel.com/new](https://vercel.com/new), accept defaults. Next.js is auto-detected.

## Updating the resume

Two files back the résumé and **both** must be updated together:

1. Replace `public/resume.pdf` (the downloadable/openable file — hero "Resume" button + Open/Download links use it).
2. Regenerate `public/resume.png` — this is what's **displayed inline** in the Résumé section. We render an image instead of embedding the PDF because browsers set to "download PDFs" never show an inline `<iframe>`/`<object>` (which is what made the embed look blank). The image always renders, everywhere.

Regenerate the PNG from the PDF with PyMuPDF:

```bash
python -c "import fitz; d=fitz.open('public/resume.pdf'); d[0].get_pixmap(matrix=fitz.Matrix(2.5,2.5)).save('public/resume.png')"
```

The displayed `<Image>` in `app/page.tsx` is hardcoded to `width={1530} height={1980}` (a portrait one-pager at 2.5× zoom). If the new PDF's aspect ratio differs, update those dims to match the printed pixmap size.
