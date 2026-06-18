"use client";

import { useEffect } from "react";

// Client island that progressively enhances the server-rendered page. With JS
// off, the page is fully visible/static; everything here is additive.
//
//   [data-spotlight]   cursor-following glow on cards
//   [data-tilt]        subtle 3D tilt toward the pointer
//   [data-reveal]      fade/slide sections in as they enter the viewport
//   [data-magnetic]    buttons drift slightly toward the pointer
//   [data-parallax]    layer drifts opposite the pointer (the aurora)
//   [data-count]       number counts up from 0 when it enters view
//   #scroll-progress   top progress bar tracking scroll depth
//   nav highlight      active section's nav link gets .nav-active
//   Konami code        toggles "Player Mode" — toasts, particles, accent shift
export default function Interactive() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(
      t: Window | Document,
      type: K,
      fn: (e: WindowEventMap[K]) => void,
      opts?: AddEventListenerOptions
    ) => {
      (t as Window).addEventListener(type, fn as EventListener, opts);
      cleanups.push(() =>
        (t as Window).removeEventListener(type, fn as EventListener, opts)
      );
    };

    // Spotlight + tilt now live in LiquidGlass.tsx (the liquid-glass layer),
    // which owns the cursor glint (--mx/--my) and 3D tilt so they don't fight.

    // --- Magnetic buttons --------------------------------------------------
    if (!reduce) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.3;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          el.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => (el.style.transform = "");
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // --- Pointer parallax (aurora) ----------------------------------------
    if (!reduce) {
      const layers = document.querySelectorAll<HTMLElement>("[data-parallax]");
      if (layers.length) {
        const move = (e: PointerEvent) => {
          const px = e.clientX / window.innerWidth - 0.5;
          const py = e.clientY / window.innerHeight - 0.5;
          layers.forEach((el) => {
            el.style.transform = `translate3d(${px * -16}px, ${py * -16}px, 0)`;
          });
        };
        on(window, "pointermove", move);
      }
    }

    // --- Cursor glow -------------------------------------------------------
    // A soft blue light that always trails the pointer. It eases toward the
    // cursor each frame (lerp) so the motion feels weighted, not glued.
    if (!reduce) {
      const glow = document.createElement("div");
      glow.id = "cursor-glow";
      document.body.appendChild(glow);
      let tx = window.innerWidth / 2;
      let ty = window.innerHeight / 2;
      let cx = tx;
      let cy = ty;
      const moveGlow = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        glow.classList.add("is-on");
      };
      const hideGlow = () => glow.classList.remove("is-on");
      let glowRaf = 0;
      const glowLoop = () => {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        glowRaf = requestAnimationFrame(glowLoop);
      };
      glowLoop();
      on(window, "pointermove", moveGlow);
      on(document, "pointerleave", hideGlow);
      cleanups.push(() => {
        cancelAnimationFrame(glowRaf);
        glow.remove();
      });
    }

    // --- Scroll reveal -----------------------------------------------------
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (reduce) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      reveals.forEach((el) => el.classList.add("js-reveal"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // --- Staggered child reveal -------------------------------------------
    // Each [data-stagger] container slides its direct children into place one
    // after another when it scrolls into view. We add is-visible on a timer
    // (not transition-delay) and strip the classes afterward, so the cards'
    // own hover transitions stay snappy once they've landed.
    if (!reduce) {
      const groups = Array.from(
        document.querySelectorAll<HTMLElement>("[data-stagger]")
      );
      groups.forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[];
        items.forEach((el) => el.classList.add("js-reveal"));
        const sio = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              items.forEach((el, i) => {
                window.setTimeout(() => {
                  el.classList.add("is-visible");
                  window.setTimeout(
                    () => el.classList.remove("js-reveal", "is-visible"),
                    800
                  );
                }, i * 90);
              });
              sio.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        sio.observe(group);
        cleanups.push(() => sio.disconnect());
      });
    }

    // --- Scaled site embeds ------------------------------------------------
    // Each [data-embed] iframe renders at a fixed desktop width (data-embed-w)
    // and is scaled down to fit its frame, so it reads like a real screenshot
    // of the desktop site rather than a cramped mobile layout.
    const embeds = Array.from(
      document.querySelectorAll<HTMLIFrameElement>("[data-embed]")
    );
    embeds.forEach((frame) => {
      const base = parseFloat(frame.dataset.embedW || "1280");
      const parent = frame.parentElement;
      if (!parent) return;
      const scaleEmbed = () => {
        const s = parent.clientWidth / base;
        frame.style.transform = `scale(${s})`;
      };
      scaleEmbed();
      on(window, "resize", scaleEmbed);
      frame.addEventListener("load", scaleEmbed);
      cleanups.push(() => frame.removeEventListener("load", scaleEmbed));
    });

    // --- Count-up numbers --------------------------------------------------
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );
    if (counters.length) {
      const runCount = (el: HTMLElement) => {
        const target = parseFloat(el.dataset.count || "0");
        const dec = parseInt(el.dataset.dec || "0", 10);
        if (reduce) {
          el.textContent = target.toFixed(dec);
          return;
        }
        const dur = 900;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (target * eased).toFixed(dec);
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target as HTMLElement);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio.observe(el));
      cleanups.push(() => cio.disconnect());
    }

    // --- Scroll progress bar ----------------------------------------------
    const bar = document.createElement("div");
    bar.id = "scroll-progress";
    document.body.appendChild(bar);
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    onScroll();
    on(window, "scroll", onScroll, { passive: true } as AddEventListenerOptions);
    cleanups.push(() => bar.remove());

    // --- Active-section nav highlight --------------------------------------
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("header nav a[data-navlink]")
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const indicator = document.querySelector<HTMLElement>("[data-nav-indicator]");
    if (navLinks.length && sections.length) {
      const ratios = new Map<string, number>();
      let activeId = "";
      const moveIndicator = () => {
        if (!indicator) return;
        const active = navLinks.find(
          (a) => a.getAttribute("href") === `#${activeId}`
        );
        if (!active) {
          indicator.style.opacity = "0";
          return;
        }
        indicator.style.width = `${active.offsetWidth}px`;
        indicator.style.transform = `translate(${active.offsetLeft}px, -50%)`;
        indicator.style.opacity = "1";
      };
      const setActive = (id: string) => {
        activeId = id;
        navLinks.forEach((a) =>
          a.classList.toggle("nav-active", a.getAttribute("href") === `#${id}`)
        );
        moveIndicator();
      };
      const nio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) =>
            ratios.set((e.target as HTMLElement).id, e.isIntersecting ? e.intersectionRatio : 0)
          );
          let best = "";
          let bestR = 0;
          ratios.forEach((r, id) => {
            if (r > bestR) {
              bestR = r;
              best = id;
            }
          });
          if (best) setActive(best);
        },
        { threshold: [0.15, 0.4, 0.7], rootMargin: "-20% 0px -40% 0px" }
      );
      sections.forEach((s) => nio.observe(s));
      on(window, "resize", moveIndicator);
      cleanups.push(() => nio.disconnect());
    }

    // --- Player Mode (Konami) ---------------------------------------------
    const ensureToastHost = () => {
      let host = document.getElementById("toast-host");
      if (!host) {
        host = document.createElement("div");
        host.id = "toast-host";
        document.body.appendChild(host);
      }
      return host;
    };
    const toast = (title: string, sub: string) => {
      const host = ensureToastHost();
      const card = document.createElement("div");
      card.className = "toast";
      const t = document.createElement("div");
      t.className = "toast-title";
      t.textContent = title;
      card.appendChild(t);
      if (sub) {
        const s = document.createElement("div");
        s.className = "toast-sub";
        s.textContent = sub;
        card.appendChild(s);
      }
      host.appendChild(card);
      requestAnimationFrame(() => card.classList.add("show"));
      window.setTimeout(() => {
        card.classList.remove("show");
        window.setTimeout(() => card.remove(), 400);
      }, 3200);
    };

    let stopParticles: (() => void) | null = null;
    const startParticles = () => {
      if (reduce) return () => {};
      const canvas = document.createElement("canvas");
      canvas.id = "particle-canvas";
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (!ctx) return () => canvas.remove();
      const brand = getComputedStyle(document.documentElement)
        .getPropertyValue("--c-brand")
        .trim()
        .split(/\s+/);
      const [r, g, b] = brand.length === 3 ? brand : ["120", "150", "255"];
      let w = 0;
      let h = 0;
      const N = 44;
      const parts: { x: number; y: number; r: number; vy: number; a: number }[] = [];
      const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      for (let i = 0; i < N; i++)
        parts.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 2 + 0.6,
          vy: -(Math.random() * 0.4 + 0.12),
          a: Math.random() * 0.5 + 0.15,
        });
      let raf = 0;
      const tick = () => {
        ctx.clearRect(0, 0, w, h);
        for (const p of parts) {
          p.y += p.vy;
          if (p.y < -5) {
            p.y = h + 5;
            p.x = Math.random() * w;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${p.a})`;
          ctx.fill();
        }
        raf = requestAnimationFrame(tick);
      };
      tick();
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        canvas.remove();
      };
    };

    let player = false;
    const fired = new Set<string>();
    const togglePlayer = () => {
      player = !player;
      if (player) {
        document.documentElement.dataset.mode = "player";
        toast("Player Mode unlocked", "↑↑↓↓←→←→ B A");
        stopParticles = startParticles();
      } else {
        delete document.documentElement.dataset.mode;
        stopParticles?.();
        stopParticles = null;
        toast("Player Mode off", "");
      }
    };

    // Achievement toasts as you scroll past sections in player mode.
    const achievers = document.querySelectorAll<HTMLElement>("[data-achievement]");
    if (achievers.length) {
      const aio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const name = (e.target as HTMLElement).dataset.achievement || "";
            if (e.isIntersecting && player && name && !fired.has(name)) {
              fired.add(name);
              toast("Advancement made!", `Reached ${name}`);
            }
          });
        },
        { threshold: 0.5 }
      );
      achievers.forEach((el) => aio.observe(el));
      cleanups.push(() => aio.disconnect());
    }

    const KONAMI = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let pos = 0;
    const onKonami = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      )
        return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          pos = 0;
          togglePlayer();
        }
      } else {
        pos = key === KONAMI[0] ? 1 : 0;
      }
    };
    on(document, "keydown", onKonami);
    cleanups.push(() => stopParticles?.());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
