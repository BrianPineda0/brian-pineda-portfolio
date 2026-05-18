# CLAUDE.md

Context file for Claude Code / Codex / Cursor when working in this repo.

## What this is

Personal portfolio site for **Brian Pineda** (CS + EE @ Rutgers). Single-page Next.js 14 App Router site. Dark theme. Asymmetric layout. Built to feel like a senior engineer wrote it, not generic AI-portfolio slop.

## Architecture (intentionally tiny)

This is a one-page site, scaffolded as flat as possible on purpose:

```
app/
  layout.tsx     — fonts, metadata, html shell, noise overlay
  page.tsx       — every section + every piece of content
  globals.css    — base styles, scrollbar, dot-grid, noise grain, animations
tailwind.config.ts — color tokens, font families, custom keyframes
```

There are **no separate component files**. Sections live inside `app/page.tsx` as plain functions (`Hero`, `Work`, `About`, `Stack`, `Contact`, `Footer`). This is a deliberate choice — for a single-page portfolio, splitting into `components/sections/*.tsx` adds friction without payoff. Don't refactor unless the site grows beyond one page.

## Where content lives

All copy and project data is in **constants at the top of `app/page.tsx`** (above the `// PRIMITIVES` comment):

- `PROFILE` — bio, contact, school details
- `PROJECTS` — four cards; one has `featured: true` and renders as the large hero card
- `STACK_CATEGORIES` — six skill buckets
- `COURSEWORK`, `QUICK_STATS`, `NAV_LINKS`

To add a new project: append to `PROJECTS`. To change which one is featured: move `featured: true` between entries.

## Design tokens

Colors (defined in `tailwind.config.ts`, used as `bg-ink`, `text-accent`, etc.):

| Token   | Hex      | Role                                                |
| ------- | -------- | --------------------------------------------------- |
| ink     | #0a0a0a  | page background                                     |
| panel   | #111111  | card surfaces                                       |
| line    | #1f1f1f  | borders, dividers                                   |
| fg      | #e5e5e5  | primary text                                        |
| mute    | #737373  | secondary text, monospace meta lines                |
| accent  | #5eead4  | teal — primary accent, hover state, focus           |
| amber   | #fbbf24  | secondary accent, tiny moments only (dot indicator) |

Fonts:

- **Geist Sans** — body, headings, UI (`font-sans`)
- **JetBrains Mono** — section labels in `[01] BRACKET` notation, stack pills, meta lines (`font-mono`)
- **Instrument Serif** — one italic moment per section: hero last name, "shipped" in Work, "engineer" in About, "build" in Contact (`font-serif italic`)

## Visual conventions

- **Section labels** use mono caps with a teal bracket prefix: `[01] SELECTED WORK`
- **Hover on cards**: `border-line` → `border-accent`, `-translate-y-1`, 300ms transition
- **Hero background**: subtle teal dot-grid (`dot-grid` utility), masked to fade toward edges
- **Site-wide noise overlay**: fixed `noise-grain` div in `layout.tsx`, mix-blend overlay, opacity 0.06
- **Reveal animation**: `animate-fade-up` + `stagger-{1..6}` delay utilities on hero elements
- **Pulsing dot** (`<PulseDot />`): teal disc with `animate-ping` halo, used in availability badge and footer status

## What NOT to do

- Don't add a separate `/components` directory unless the site grows past one page.
- Don't introduce shadcn / Radix until there's an actual interactive component that needs them.
- Don't add light-mode support — the brand IS dark.
- Don't replace the fonts with Inter / system defaults — the typography is the brand.
- Don't sprinkle teal everywhere. It earns attention by being scarce.

## Deploy

Vercel, zero config. Push to `main`, import on [vercel.com/new](https://vercel.com/new), accept defaults. Next.js is auto-detected.

## Updating the resume PDF

Replace `public/resume.pdf`. The hero "Resume" button links to that path with the `download` attribute.
