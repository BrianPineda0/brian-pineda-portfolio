"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Liquid-glass interaction layer. Builds a per-element SVG displacement map for
// every .refract surface (real edge lensing of the backdrop — Chromium only;
// elsewhere it falls back to the plain clear tint + rim + glint + shine), wires
// the cursor-tracked blue glint (--mx/--my) and 3D tilt ([data-tilt]) across
// every glass surface, and injects one staggered shine sweep into each.
// ---------------------------------------------------------------------------

const GLASS_SEL = ".glass, .glass-bar, .glass-clear";
const SVGNS = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";

declare global {
  interface Window {
    __lgCleanup?: () => void;
  }
}

function initLiquidGlass(): () => void {
  const clamp = (t: number, a: number, b: number) => Math.max(a, Math.min(b, t));
  const smoothstep = (a: number, b: number, t: number) => {
    t = clamp((t - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const roundedRectSDF = (x: number, y: number, w: number, h: number, r: number) => {
    const qx = Math.abs(x) - w + r;
    const qy = Math.abs(y) - h + r;
    return (
      Math.min(Math.max(qx, qy), 0) +
      Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
      r
    );
  };

  const defs = document.querySelector("#lensdefs defs");
  let uid = 0;

  // Build (or refresh) the displacement map + filter for one .refract element.
  const buildLens = (el: HTMLElement) => {
    if (!defs) return;
    const rect = el.getBoundingClientRect();
    const W = Math.round(rect.width);
    const H = Math.round(rect.height);
    if (!W || !H) return;
    const bevel = parseFloat(el.dataset.bevel || "0.25");
    const intensity = parseFloat(el.dataset.intensity || "0.6");
    const cap = 460;
    const s = Math.min(1, cap / Math.max(W, H));
    const w = Math.max(2, Math.round(W * s));
    const h = Math.max(2, Math.round(H * s));
    const aspect = w / h;
    const cssR = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    const rNorm = clamp(cssR / Math.min(W, H), 0, 0.5);

    const cnv = document.createElement("canvas");
    cnv.width = w;
    cnv.height = h;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;
    const raw = new Float32Array(w * h * 2);
    let maxAbs = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ux = x / w;
        const uy = y / h;
        const cx = ux - 0.5;
        const cy = uy - 0.5;
        const d = roundedRectSDF(cx * aspect, cy, 0.5 * aspect - rNorm, 0.5 - rNorm, rNorm);
        const t = smoothstep(0, -bevel, d);
        const k = t * intensity;
        const sx = ux - (ux - 0.5) * k;
        const sy = uy - (uy - 0.5) * k;
        const dx = (sx - ux) * w;
        const dy = (sy - uy) * h;
        const i = (y * w + x) * 2;
        raw[i] = dx;
        raw[i + 1] = dy;
        maxAbs = Math.max(maxAbs, Math.abs(dx), Math.abs(dy));
      }
    }
    maxAbs = maxAbs || 1;
    for (let i = 0, p = 0; i < data.length; i += 4, p += 2) {
      data[i] = (raw[p] / maxAbs * 0.5 + 0.5) * 255;
      data[i + 1] = (raw[p + 1] / maxAbs * 0.5 + 0.5) * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    const url = cnv.toDataURL();

    let id = el.dataset.lensId;
    if (!id) {
      id = "lens" + uid++;
      el.dataset.lensId = id;
      const f = document.createElementNS(SVGNS, "filter");
      f.setAttribute("id", id);
      f.setAttribute("filterUnits", "userSpaceOnUse");
      f.setAttribute("color-interpolation-filters", "sRGB");
      const im = document.createElementNS(SVGNS, "feImage");
      im.setAttribute("id", id + "_img");
      const dm = document.createElementNS(SVGNS, "feDisplacementMap");
      dm.setAttribute("id", id + "_dm");
      dm.setAttribute("in", "SourceGraphic");
      dm.setAttribute("in2", id + "_img");
      dm.setAttribute("xChannelSelector", "R");
      dm.setAttribute("yChannelSelector", "G");
      f.appendChild(im);
      f.appendChild(dm);
      defs.appendChild(f);
    }
    const f = document.getElementById(id) as Element;
    f.setAttribute("x", "0");
    f.setAttribute("y", "0");
    f.setAttribute("width", String(W));
    f.setAttribute("height", String(H));
    const im = document.getElementById(id + "_img") as Element;
    im.setAttribute("width", String(W));
    im.setAttribute("height", String(H));
    im.setAttribute("href", url);
    im.setAttributeNS(XLINK, "href", url);
    (document.getElementById(id + "_dm") as Element).setAttribute(
      "scale",
      (maxAbs / s).toFixed(2)
    );
    const fx = `blur(2px) saturate(1.5) brightness(1) contrast(1.05) url(#${id})`;
    (el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = fx;
    el.style.backdropFilter = fx;
  };

  // Inject one shine sweep into every glass element (staggered so they don't
  // all fire at once).
  document.querySelectorAll<HTMLElement>(GLASS_SEL).forEach((el, i) => {
    if (el.querySelector(":scope > .glass-shine")) return;
    const span = document.createElement("span");
    span.className = "glass-shine";
    span.style.setProperty("--shine-delay", (i % 6) * 1.1 + "s");
    el.prepend(span);
  });

  const refractors = Array.from(document.querySelectorAll<HTMLElement>(".refract"));
  const buildAll = () => refractors.forEach(buildLens);
  requestAnimationFrame(() => requestAnimationFrame(buildAll));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildAll);

  // Rebuild a single element's lens when its size changes.
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const t = e.target as HTMLElement;
      if (t.classList.contains("refract")) buildLens(t);
    }
  });
  refractors.forEach((el) => ro.observe(el));
  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = window.setTimeout(buildAll, 150);
  };
  window.addEventListener("resize", onResize);

  // Cursor-tracked blue glint + 3D tilt (skipped on touch / reduced-motion).
  const isTouch = matchMedia("(hover: none)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const glass = Array.from(document.querySelectorAll<HTMLElement>(GLASS_SEL));
  const tilters = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
  let px = window.innerWidth / 2;
  let py = window.innerHeight / 2;
  let frame = 0;
  const paint = () => {
    frame = 0;
    // Batch DOM reads, then writes, so we don't thrash layout each frame.
    const grects = glass.map((el) => el.getBoundingClientRect());
    for (let i = 0; i < glass.length; i++) {
      const r = grects[i];
      if (!r.width || !r.height) continue;
      glass[i].style.setProperty("--mx", ((px - r.left) / r.width) * 100 + "%");
      glass[i].style.setProperty("--my", ((py - r.top) / r.height) * 100 + "%");
    }
    if (!isTouch && !reduce) {
      const trects = tilters.map((el) => el.getBoundingClientRect());
      for (let i = 0; i < tilters.length; i++) {
        const r = trects[i];
        const max = +(tilters[i].dataset.tilt || 0);
        const ry = ((px - (r.left + r.width / 2)) / r.width) * max;
        const rx = -((py - (r.top + r.height / 2)) / r.height) * max;
        const near =
          px > r.left - 60 && px < r.right + 60 && py > r.top - 60 && py < r.bottom + 60;
        // Clear (not flatten) when far so reveal/hover transforms still apply.
        tilters[i].style.transform = near
          ? `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
          : "";
      }
    }
  };
  const onMove = (e: PointerEvent) => {
    px = e.clientX;
    py = e.clientY;
    if (!frame) frame = requestAnimationFrame(paint);
  };
  if (!isTouch) window.addEventListener("pointermove", onMove);

  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onMove);
    ro.disconnect();
    if (frame) cancelAnimationFrame(frame);
  };
}

export default function LiquidGlass() {
  useEffect(() => {
    // Wait a frame so the DOM is laid out before measuring.
    const raf = requestAnimationFrame(() => {
      window.__lgCleanup = initLiquidGlass();
    });
    return () => {
      cancelAnimationFrame(raf);
      window.__lgCleanup?.();
      window.__lgCleanup = undefined;
    };
  }, []);

  // One empty SVG defs node the per-element lens filters get appended into.
  return (
    <svg
      id="lensdefs"
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: "absolute" }}
    >
      <defs />
    </svg>
  );
}
