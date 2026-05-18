# Brian Pineda — Portfolio

Personal portfolio site for Brian Pineda. Dark, asymmetric, engineered. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

Live tagline: **CS + EE @ Rutgers · AI-Native Builder**

---

## Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 3.4 + custom design tokens
- **Icons:** lucide-react
- **Fonts:** Geist Sans · JetBrains Mono · Instrument Serif (all via `next/font/google`)
- **Hosting:** Vercel (zero-config)

---

## Local setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # next lint
npm run type-check  # tsc --noEmit
```

---

## Where to edit content

All copy and project data lives in **`app/page.tsx`**, in the constants at the top of the file:

| Constant            | What it controls                              |
| ------------------- | --------------------------------------------- |
| `PROFILE`           | Name, tagline, email, socials, bio, resume    |
| `PROJECTS`          | Work section cards (set `featured: true` for one) |
| `STACK_CATEGORIES`  | Stack section grid                            |
| `COURSEWORK`        | "Relevant Coursework" card                    |
| `QUICK_STATS`       | "Quick Stats" card                            |
| `NAV_LINKS`         | Top nav links                                 |

Design tokens (colors, fonts, animations) live in `tailwind.config.ts`. Global styles (selection color, scrollbar, dot-grid, noise grain, fade-up animation) live in `app/globals.css`.

---

## Resume PDF

Drop your latest resume at **`public/resume.pdf`** — the "Resume" link in the hero CTA row downloads from that path. A placeholder is shipped so the link doesn't 404 on a fresh clone.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Visit [vercel.com/new](https://vercel.com/new), import the repo, accept defaults — Vercel detects Next.js automatically.
3. Done. Subsequent pushes to `main` redeploy automatically.

No environment variables, no build command tweaks, no special framework presets needed.

If you want a custom domain, add it in **Project → Settings → Domains** after the first deploy.

---

## Project layout

```
.
├── app/
│   ├── globals.css      # base styles, scrollbar, dot-grid, noise, animations
│   ├── layout.tsx       # next/font wiring, metadata, html shell
│   └── page.tsx         # all content + all sections (single-file homepage)
├── public/
│   └── resume.pdf       # placeholder — replace with your real resume
├── CLAUDE.md            # context for Claude Code / Codex / Cursor
├── tailwind.config.ts   # design tokens + animation keyframes
├── next.config.mjs
├── postcss.config.mjs
└── tsconfig.json
```

---

## License

Personal portfolio — content is © Brian Pineda. The scaffolding and design system are free to learn from; please don't clone the site 1:1 with your name on it.
