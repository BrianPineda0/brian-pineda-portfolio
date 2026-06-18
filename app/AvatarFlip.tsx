"use client";

import { RotateCw } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// AvatarFlip — the hero "name" tile, now a square that flips through faces.
// It auto-advances on a timer AND is interactive: click/tap the tile (or the
// dots) to flick through. Faces: BP monogram → Rutgers → 361 Firm internship.
//
// Mechanism: one card rotated by `rot` (always a multiple of 180°). Two physical
// faces (front at 0°, back at 180°, backface hidden). We keep whichever face is
// rotating INTO view loaded with the next slide, so any number of slides cycle
// with a simple two-sided flip and no flicker.
// ---------------------------------------------------------------------------

const FLIP_MS = 2200;
const HOLD_MS = 5800;
// Gentle accelerate/decelerate so the long flip reads silky, not mechanical.
const FLIP_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

// Picture-driven site recoloring (the accent-extraction code further down) is
// built and kept, but parked for now — only the tile's logo/face changes; the
// site palette stays put. Flip this to `true` to re-enable the whole-site theming.
const PICTURE_THEMING: boolean = false;

type Face = { caption: string; render: React.ReactNode };

// Rutgers tile. Uses the official logo if you drop one at public/rutgers.png
// (or .svg — just change the src); otherwise falls back to a styled block "R".
// The fallback shows until a real file actually loads, so there's no broken
// image while the asset is missing.
function RutgersFace() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="relative grid h-full w-full place-items-center"
      style={{ backgroundColor: "#cf1230" }}
    >
      <div className={`flex flex-col items-center ${loaded ? "invisible" : ""}`}>
        <span
          className="text-[5rem] font-black leading-none text-white"
          style={{ WebkitTextStroke: "5px #7a0020", paintOrder: "stroke" }}
        >
          R
        </span>
        <span className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-white/85">
          Rutgers
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rutgers.png"
        alt="Rutgers"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover p-2.5 transition-opacity ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="shimmer-sheen" aria-hidden="true" />
    </div>
  );
}

const FACES: Face[] = [
  {
    caption: "Brian Pineda",
    render: (
      <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-brand via-grape to-mint">
        <span className="text-7xl font-semibold tracking-tight text-white">
          BP
        </span>
        <span className="shimmer-sheen" aria-hidden="true" />
      </div>
    ),
  },
  {
    caption: "Student at Rutgers University",
    render: <RutgersFace />,
  },
  {
    caption: "Intern at 361 Firm",
    render: (
      // 16:9 GIF centered on black — the black fills the square (letterbox).
      <div className="relative h-full w-full bg-black">
        <Image
          src="/361firm.gif"
          alt="361 Firm"
          fill
          unoptimized
          sizes="176px"
          className="object-contain"
        />
      </div>
    ),
  },
];

// ---------------------------------------------------------------------------
// Picture-driven theming. We pull a representative (vibrant) color out of each
// face's artwork and recolor the site's accent tokens (--c-brand/grape/mint +
// grid tint) to match as the card flips. Canvas + ink stay light, so only the
// accents shift and the Apple/glass look holds. The BP face keeps the default
// palette. These indices align with FACES above.
// ---------------------------------------------------------------------------
const FACE_SRC: (string | null)[] = [null, "/rutgers.png", "/361firm.gif"];
const FACE_FALLBACK: ({ r: number; g: number; b: number } | null)[] = [
  null,
  { r: 207, g: 18, b: 48 }, // Rutgers scarlet
  { r: 59, g: 130, b: 196 }, // 361 Firm globe blue
];

type Accent = { brand: string; grape: string; mint: string; grid: string };

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const trip = (c: { r: number; g: number; b: number }) => `${c.r} ${c.g} ${c.b}`;

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const d = mx - mn;
  const l = (mx + mn) / 2;
  let h = 0;
  let s = 0;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((((h % 360) + 360) % 360) / 60);
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g] = [c, x];
  else if (hp < 2) [r, g] = [x, c];
  else if (hp < 3) [g, b] = [c, x];
  else if (hp < 4) [g, b] = [x, c];
  else if (hp < 5) [r, b] = [x, c];
  else [r, b] = [c, x];
  const m = l - c / 2;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Build a brand/grape/mint trio from one seed color so the gradient keeps depth.
function deriveAccent(seed: { r: number; g: number; b: number }): Accent {
  const { h, s, l } = rgbToHsl(seed.r, seed.g, seed.b);
  const S = Math.max(s, 0.45);
  const grape = hslToRgb(h - 22, clamp01(S * 0.95), clamp01(l * 0.82));
  const mint = hslToRgb(h + 26, clamp01(S * 0.8), clamp01(Math.min(0.62, l * 1.18 + 0.06)));
  return { brand: trip(seed), grape: trip(grape), mint: trip(mint), grid: trip(seed) };
}

// Average the vivid pixels of an image, ignoring near-black / near-white / greys
// so a mostly-black tile (the 361 GIF) still yields its accent color, not black.
function extractVibrant(img: HTMLImageElement) {
  const w = 48;
  const h = 48;
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, w, h);
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    return null;
  }
  let R = 0;
  let G = 0;
  let B = 0;
  let W = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (data[i + 3] < 128) continue;
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    if (mx < 40 || mn > 220) continue; // near-black / near-white
    const sat = (mx - mn) / mx;
    if (sat < 0.28) continue; // greys
    const wgt = sat * sat;
    R += r * wgt;
    G += g * wgt;
    B += b * wgt;
    W += wgt;
  }
  if (W < 1e-4) return null;
  return { r: Math.round(R / W), g: Math.round(G / W), b: Math.round(B / W) };
}

export default function AvatarFlip() {
  const N = FACES.length;
  // Two-sided flip. `front`/`back` hold the face index on each physical side and
  // `rot` (a multiple of 180°) picks which side faces the viewer. A side's
  // content only ever changes while it's HIDDEN (see the preload effect), so the
  // outgoing face never swaps on screen mid-flip.
  const [rot, setRot] = useState(0);
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1 % N);
  const [labelIdx, setLabelIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const accentsRef = useRef<Accent[] | null>(null);
  const applyRef = useRef<((a: Accent, dur: number) => void) | null>(null);
  const idxRef = useRef(0);
  const rafRef = useRef(0);
  const frontRef = useRef(0);
  const backRef = useRef(1 % N);
  const rotRef = useRef(0);

  const showingBack = (rot / 180) % 2 !== 0;
  const idx = showingBack ? back : front; // face currently facing the viewer
  const frontIdx = front;
  const backIdx = back;

  useEffect(() => {
    frontRef.current = front;
  }, [front]);
  useEffect(() => {
    backRef.current = back;
  }, [back]);
  useEffect(() => {
    rotRef.current = rot;
  }, [rot]);

  // Flip to a specific face with one 180° turn: load it onto the hidden side,
  // then rotate. (On a normal step the hidden side already holds it, so the
  // assignment is a harmless no-op.)
  const flipTo = useCallback((target: number) => {
    const sb = (rotRef.current / 180) % 2 !== 0;
    const visible = sb ? backRef.current : frontRef.current;
    if (target === visible) return;
    if (sb) {
      setFront(target);
      frontRef.current = target;
    } else {
      setBack(target);
      backRef.current = target;
    }
    rotRef.current += 180;
    setRot(rotRef.current);
  }, []);

  const advance = useCallback(() => {
    const sb = (rotRef.current / 180) % 2 !== 0;
    const visible = sb ? backRef.current : frontRef.current;
    flipTo((visible + 1) % N);
  }, [N, flipTo]);

  // Respect reduced motion: no auto-advance, instant face swaps.
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(m.matches);
    sync();
    m.addEventListener?.("change", sync);
    return () => m.removeEventListener?.("change", sync);
  }, []);

  // Auto-advance. Re-armed on every flip (incl. manual), so a click resets the
  // clock instead of triggering an immediate second flip.
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => {
      if (!pausedRef.current && !document.hidden) advance();
    }, HOLD_MS);
    return () => window.clearInterval(t);
  }, [reduced, advance, idx]);

  // Once a flip settles, preload the next face onto the now-hidden side so it's
  // ready for the following flip — and only ever changes while out of view.
  useEffect(() => {
    const sb = (rot / 180) % 2 !== 0;
    const visible = sb ? backRef.current : frontRef.current;
    const nextFace = (visible + 1) % N;
    const t = window.setTimeout(
      () => {
        if (sb) setFront(nextFace);
        else setBack(nextFace);
      },
      reduced ? 0 : FLIP_MS
    );
    return () => window.clearTimeout(t);
  }, [rot, reduced, N]);

  // Swap the caption + active dot at the flip's midpoint (card edge-on), so the
  // text changes while hidden rather than over the still-visible old face.
  useEffect(() => {
    const t = window.setTimeout(() => setLabelIdx(idx), reduced ? 0 : FLIP_MS / 2);
    return () => window.clearTimeout(t);
  }, [idx, reduced]);

  // Keep a live ref to idx for the async image-load callbacks below.
  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  // Extract each picture's accent color once on mount; store an Accent per face.
  // Recoloring is animated (rAF lerp of the rgb triplets) so the whole scheme
  // glides between palettes — custom properties can't CSS-transition on their own.
  useEffect(() => {
    if (!PICTURE_THEMING) return;
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    const KEYS = ["--c-brand", "--c-grape", "--c-mint", "--grid-line"] as const;
    const def: Accent = {
      brand: cs.getPropertyValue("--c-brand").trim() || "10 132 255",
      grape: cs.getPropertyValue("--c-grape").trim() || "109 91 208",
      mint: cs.getPropertyValue("--c-mint").trim() || "30 182 160",
      grid: cs.getPropertyValue("--grid-line").trim() || "74 86 112",
    };
    const toMap = (a: Accent): Record<string, string> => ({
      "--c-brand": a.brand,
      "--c-grape": a.grape,
      "--c-mint": a.mint,
      "--grid-line": a.grid,
    });
    const defMap = toMap(def);
    const parse = (s: string) => {
      const p = s.trim().split(/\s+/).map(Number);
      return [p[0] || 0, p[1] || 0, p[2] || 0] as [number, number, number];
    };
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    // Tween every accent token from its current value to the target over `dur`.
    const animateTo = (target: Accent, dur: number) => {
      cancelAnimationFrame(rafRef.current);
      const tgt = toMap(target);
      const from: Record<string, [number, number, number]> = {};
      const to: Record<string, [number, number, number]> = {};
      KEYS.forEach((k) => {
        from[k] = parse(root.style.getPropertyValue(k) || defMap[k]);
        to[k] = parse(tgt[k]);
      });
      if (dur <= 0) {
        KEYS.forEach((k) => root.style.setProperty(k, tgt[k]));
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const e = easeInOut(Math.min(1, (now - start) / dur));
        KEYS.forEach((k) => {
          const f = from[k];
          const g = to[k];
          root.style.setProperty(
            k,
            `${Math.round(f[0] + (g[0] - f[0]) * e)} ${Math.round(
              f[1] + (g[1] - f[1]) * e
            )} ${Math.round(f[2] + (g[2] - f[2]) * e)}`
          );
        });
        if ((now - start) / dur < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };
    applyRef.current = animateTo;

    const accents: Accent[] = FACES.map(() => def);
    accentsRef.current = accents;

    FACE_SRC.forEach((src, i) => {
      if (!src) return;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      const finish = (seed: { r: number; g: number; b: number } | null) => {
        if (!seed) return;
        accents[i] = deriveAccent(seed);
        if (idxRef.current === i) animateTo(accents[i], 500);
      };
      img.onload = () => finish(extractVibrant(img) || FACE_FALLBACK[i]);
      img.onerror = () => finish(FACE_FALLBACK[i]);
      img.src = src;
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      animateTo(def, 0); // restore the default palette if this ever unmounts
    };
  }, []);

  // Glide the site palette over the full flip, so color + face resolve together.
  useEffect(() => {
    if (!PICTURE_THEMING) return;
    const a = accentsRef.current?.[idx];
    if (a) applyRef.current?.(a, reduced ? 0 : FLIP_MS);
  }, [idx, reduced]);

  return (
    <div className="select-none">
      <button
        type="button"
        onClick={advance}
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onPointerLeave={() => {
          pausedRef.current = false;
        }}
        aria-label={`Brian Pineda — ${FACES[labelIdx].caption}. Click to flip.`}
        className="group relative mx-auto block h-44 w-44 animate-float cursor-pointer rounded-[2.4rem] shadow-glass-lg outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <div
          className="relative h-full w-full rounded-[2.4rem] [transform-style:preserve-3d]"
          style={{
            transform: `rotateY(${rot}deg)`,
            transition: reduced
              ? "none"
              : `transform ${FLIP_MS}ms ${FLIP_EASE}`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2.4rem] ring-1 ring-inset ring-black/10 [backface-visibility:hidden]">
            {FACES[frontIdx].render}
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-[2.4rem] ring-1 ring-inset ring-black/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {FACES[backIdx].render}
          </div>
        </div>

        {/* Hover cue that this tile flips. */}
        <span className="pointer-events-none absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/85 text-ink opacity-0 shadow-glass backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <RotateCw className="h-3.5 w-3.5" />
        </span>
      </button>

      {/* Caption + position dots (also clickable to jump). */}
      <div className="mt-4 flex flex-col items-center gap-2.5">
        <div
          key={labelIdx}
          className="animate-fade-up text-center font-mono text-[11px] uppercase tracking-[0.16em] text-slate"
        >
          {FACES[labelIdx].caption}
        </div>
        <div className="flex items-center gap-1.5">
          {FACES.map((face, i) => (
            <button
              key={face.caption}
              type="button"
              onClick={() => flipTo(i)}
              aria-label={`Show ${face.caption}`}
              aria-current={i === labelIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === labelIdx ? "w-5 bg-brand" : "w-1.5 bg-line hover:bg-slate"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
