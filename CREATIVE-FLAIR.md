# Creative Flair — Proposal (not yet built)

> A menu of game-inspired ideas for the site. **Nothing here is implemented.**
> Read it, cross out what you hate, star what you like, and tell me which tier to build.

## The guiding principle

A recruiter who lands here should see a **clean, professional engineer's site** — full
stop. The game stuff lives *underneath* that, as **opt-in easter eggs and optional themes**,
so it rewards the curious and shows personality without ever getting in the way of the
people deciding whether to interview you.

Think: _"professional by default, playful when you look closer."_ That contrast is itself
the flex — it says "I can ship polished product **and** I have taste and personality."

**Two hard rules:**
1. **Default stays professional.** Flair is behind a toggle / hidden trigger, never forced.
2. **No copyrighted assets.** No game logos, fonts, screenshots, or trademarked names. We
   evoke the *vibe* with original art and neutral theme names (e.g. "Abyss", "Erdtree",
   "Overworld"). Cleaner, safer, and frankly classier.

---

## How it maps to the current code

The site is already set up to make this easy:

| Want | Mechanism | Effort |
| --- | --- | --- |
| Multiple themes | Move the hardcoded colors in `tailwind.config.ts` to **CSS variables** keyed off `data-theme` on `<html>`. Each theme = one block of vars. | Medium |
| Hidden "game mode" | Add a key listener (Konami code) to the existing `app/Interactive.tsx` island → set `data-mode="player"` on `<html>`, CSS reacts. | Low |
| Achievement pop-ups | Small client `Toast` component + a queue, triggered by the scroll-reveal observer we already have. | Low–Med |
| Particles / cursor trail | Lightweight canvas in `Interactive.tsx`, lazy + `prefers-reduced-motion` aware, **off by default**. | Med |

---

## Ideas by game (each tiered: 🟢 subtle → 🔴 bold)

### Minecraft — "Overworld"
- 🟢 **Achievement toasts.** Reuse the game's *advancement* pattern with your own art: a
  little slide-in card "**Advancement made!** — Reached Projects". Fires once per section.
- 🟢 **Pixel monogram.** A blocky 8-bit version of the `BP` mark that appears only in game mode.
- 🟡 **Inventory hotbar skills.** In game mode, the Skills pills render as numbered hotbar slots.
- 🔴 **Block-break cursor trail** + optional click sound (audio strictly opt-in, default muted).

### Elden Ring — "Erdtree"
- 🟢 **Grace glow.** The teal dot in section eyebrows becomes a soft golden "guidance" wisp —
  the gentle light that points you onward. Subtle and genuinely elegant.
- 🟡 **Felled banners.** Hovering a shipped project briefly shows a centered banner in the
  game's victory-message style, reworded: "**PROJECT SHIPPED**". Parody, not asset copy.
- 🟡 **"Erdtree" gold theme.** Warm gold-on-charcoal palette as a selectable theme.
- 🔴 **Ember cursor trail** — faint gold particles following the pointer.

### Hollow Knight — "Abyss"  ← _the sleeper pick_
- 🟢 **A genuinely beautiful dark theme.** HK's ink-and-bone look (deep blue-black, pale
  bone-white text, soft cyan glow) is basically a *professional* dark mode. This is the one
  that could ship as a real, always-available theme — not just an easter egg.
- 🟡 **Drifting spores.** Slow upward dust/spore particles, like Dirtmouth at night. Very
  atmospheric, low-key, reduced-motion aware.
- 🟡 **Charm-notch skills** and a **"Geo" counter** styled stat (e.g. commits or projects count).

---

## Recommended rollout

**Phase 1 — Hidden "Player Mode" (low risk, high delight).**
One easter egg: type the Konami code (or click a tiny pixel heart in the footer) → an
achievement toast fires, subtle particles turn on, accent shifts. Fully reversible, hidden,
professional default. This is the best bang-for-buck and I'd start here.

**Phase 2 — A real theme switcher in the footer.**
Three themes: **Default (light)**, **Abyss (HK-style dark)**, **Erdtree (ER-style gold)**.
Requires the token→CSS-variable refactor. "Abyss" doubles as a proper dark mode, which is
a legit professional feature on its own.

**Phase 3 — The deep cuts.**
Achievement system wired to every section, hotbar skills, ember/spore cursor, opt-in SFX.

---

## Guardrails (so it stays "authentic yet professional")
- **Opt-in everything.** Default load = clean light site. No surprise motion or sound.
- **Accessibility:** respect `prefers-reduced-motion`, keep text contrast, never signal with
  color alone, no autoplay audio.
- **Performance:** particles are lazy + capped + paused off-screen; themes are pure CSS vars.
- **Legal/taste:** original art + neutral names only. Evoke, don't copy.

---

### My take
Build **Phase 1** first (one afternoon, huge personality payoff, zero professional risk),
and ship **"Abyss" dark mode** from Phase 2 because a great dark theme is valuable on its own
merits. Hold the rest until you've seen those land.

**Tell me: which phase, and which of the 🟢/🟡/🔴 items above are in or out?**
