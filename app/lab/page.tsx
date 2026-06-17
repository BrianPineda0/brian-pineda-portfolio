"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

// ---------------------------------------------------------------------------
// PREVIEW LAB — visual mockups of the ideas in CREATIVE-FLAIR.md.
// Nothing here ships to the live site; it's a showroom to react to.
// ---------------------------------------------------------------------------

type Theme = {
  key: string;
  name: string;
  tag: string;
  bg: string;
  panel: string;
  line: string;
  text: string;
  sub: string;
  accent: string;
};

const THEMES: Theme[] = [
  {
    key: "overworld",
    name: "Overworld",
    tag: "default · live now",
    bg: "#f4f4f6",
    panel: "rgba(255,255,255,0.7)",
    line: "#d9d9e0",
    text: "#1d1d1f",
    sub: "#6e6e73",
    accent: "#0a84ff",
  },
  {
    key: "abyss",
    name: "Abyss",
    tag: "hollow-knight vibe · dark mode",
    bg: "#0b1020",
    panel: "#141a2e",
    line: "#232a40",
    text: "#e8ecf8",
    sub: "#97a0c0",
    accent: "#7fd6e6",
  },
  {
    key: "erdtree",
    name: "Erdtree",
    tag: "elden-ring vibe · gold",
    bg: "#15120b",
    panel: "#221c10",
    line: "#3a3120",
    text: "#f3e7c9",
    sub: "#b9a87f",
    accent: "#d8b46a",
  },
];

function ThemeMock({ t }: { t: Theme }) {
  return (
    <div
      className="rounded-3xl border p-6"
      style={{ background: t.bg, color: t.text, borderColor: t.line }}
    >
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ background: t.panel, color: t.sub, border: `1px solid ${t.line}` }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: t.accent, boxShadow: `0 0 8px ${t.accent}` }}
        />
        About
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">Brian Pineda</div>
      <p className="mt-2 text-sm" style={{ color: t.sub }}>
        CS + EE @ Rutgers — builds full-stack products and LLM systems.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span
          className="rounded-full px-4 py-2 text-sm font-medium"
          style={{ background: t.accent, color: t.bg }}
        >
          See my work
        </span>
        <span
          className="rounded-full px-4 py-2 text-sm"
          style={{ border: `1px solid ${t.line}`, color: t.text }}
        >
          Résumé
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Next.js", "FastAPI", "Python", "Claude"].map((s) => (
          <span
            key={s}
            className="rounded-full px-3 py-1 font-mono text-[11px]"
            style={{ background: t.panel, color: t.sub, border: `1px solid ${t.line}` }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Panel({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-1 text-[13px] text-white/55">{sub}</div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function LabPage() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  const spores = [
    { left: "12%", top: "70%", delay: "0s" },
    { left: "30%", top: "85%", delay: "1.2s" },
    { left: "52%", top: "60%", delay: "0.5s" },
    { left: "68%", top: "80%", delay: "2s" },
    { left: "84%", top: "65%", delay: "1.6s" },
  ];

  return (
    <div className="min-h-screen bg-[#0e0f14] text-white">
      {/* Achievement toast (Minecraft-advancement style) */}
      <div
        className={`fixed right-5 top-5 z-50 transition-all duration-500 ${
          toast ? "translate-x-0 opacity-100" : "translate-x-[130%] opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#1f2733] px-4 py-3 shadow-2xl">
          <div className="grid h-9 w-9 place-items-center rounded bg-gradient-to-br from-[#0a84ff] via-[#6d5bd0] to-[#1eb6a0] text-lg">
            ★
          </div>
          <div>
            <div className="text-[13px] font-semibold" style={{ color: "#f6c945" }}>
              Advancement made!
            </div>
            <div className="text-[13px] text-white/80">Reached Projects</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            Preview Lab · not part of the live site
          </span>
        </div>

        <div className="mt-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "#7fd6e6" }} />
            Creative flair — mockups
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            See it before we build it.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            Visual previews of the game-inspired ideas from{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">CREATIVE-FLAIR.md</code>.
            These are <span className="text-white">not</span> on your live site — they&apos;re
            here so you can point at what you like. Tell me which to ship.
          </p>
        </div>

        {/* THEMES */}
        <h2 className="mt-14 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          01 · Themes (selectable; default stays light)
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {THEMES.map((t) => (
            <div key={t.key}>
              <ThemeMock t={t} />
              <div className="mt-3 px-1">
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {t.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EFFECTS */}
        <h2 className="mt-16 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          02 · Effects &amp; components
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Panel
            title="Achievement toast"
            sub="Minecraft-style advancement — fires once per section, or on the Konami code."
          >
            <button
              onClick={() => {
                setToast(false);
                requestAnimationFrame(() => setToast(true));
              }}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
            >
              ▶ Trigger achievement (top-right)
            </button>
          </Panel>

          <Panel
            title="Grace guidance"
            sub="Elden Ring 'grace' glow — replaces the eyebrow dot with a golden wisp."
          >
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ background: "#1a160c", color: "#d8b46a", border: "1px solid #3a3120" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full"
                  style={{ background: "#e7c873" }}
                />
                <span
                  className="relative h-2.5 w-2.5 rounded-full"
                  style={{ background: "#e7c873", boxShadow: "0 0 10px 2px rgba(231,200,115,0.85)" }}
                />
              </span>
              Grace guides you onward
            </div>
          </Panel>

          <Panel
            title="Felled banner"
            sub="Elden Ring victory message, reworded — flashes briefly on a shipped project."
          >
            <div className="relative overflow-hidden rounded-xl bg-[#0c0a07] py-8 text-center">
              <div
                className="font-serif text-2xl tracking-[0.3em]"
                style={{ color: "#d8b46a", textShadow: "0 0 18px rgba(216,180,106,0.4)" }}
              >
                PROJECT SHIPPED
              </div>
              <div
                className="mx-auto mt-3 h-px w-44"
                style={{ background: "linear-gradient(90deg,transparent,#d8b46a,transparent)" }}
              />
            </div>
          </Panel>

          <Panel
            title="Inventory hotbar skills"
            sub="Minecraft hotbar — Skills render as numbered slots in 'Player Mode'."
          >
            <div className="flex gap-1.5">
              {["TS", "Py", "Rct", "Nxt", "SQL", "AWS"].map((s, i) => (
                <div
                  key={s}
                  className="relative grid h-12 w-12 place-items-center rounded bg-[#2b2b2b] text-[11px] font-bold text-white"
                  style={{ boxShadow: "inset 0 0 0 2px #555, 0 0 0 2px #1a1a1a" }}
                >
                  <span className="absolute left-1 top-0 text-[8px] text-white/50">{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Drifting spores"
            sub="Hollow Knight ambiance — slow upward dust in the 'Abyss' dark theme."
          >
            <div className="relative h-36 overflow-hidden rounded-xl bg-[#0b1020]">
              {spores.map((s, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 animate-float rounded-full"
                  style={{
                    left: s.left,
                    top: s.top,
                    background: "rgba(180,230,245,0.8)",
                    boxShadow: "0 0 6px rgba(127,214,230,0.8)",
                    animationDelay: s.delay,
                    animationDuration: "5s",
                  }}
                />
              ))}
              <div className="absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                Abyss · ambient particles
              </div>
            </div>
          </Panel>

          <Panel
            title="Pixel monogram"
            sub="Minecraft 8-bit take on the BP mark — appears only in Player Mode."
          >
            <div className="flex items-center gap-4">
              <div
                className="grid h-16 w-16 place-items-center text-2xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#5a8f3a,#3f6b2a)",
                  boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.15), 0 0 0 3px #2c4a1d",
                  imageRendering: "pixelated",
                }}
              >
                BP
              </div>
              <div className="text-[13px] text-white/55">
                Blocky, grass-block palette. Swaps in only when the easter egg is active.
              </div>
            </div>
          </Panel>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-[15px] leading-relaxed text-white/70">
          <span className="text-white">What now?</span> Tell me which theme(s) and which
          effects you want, and which phase from{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">CREATIVE-FLAIR.md</code>{" "}
          to start with. My pick: ship <span className="text-white">Player Mode</span> (the
          toast + a hidden trigger) and the <span className="text-white">Abyss</span> dark theme
          first.
        </div>

        <div className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
          mockups only · nothing here is on the live site
        </div>
      </div>
    </div>
  );
}
