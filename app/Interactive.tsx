"use client";

import { useEffect } from "react";

// Small client island that progressively enhances the (server-rendered) page:
//  - [data-spotlight]  cursor-following glow on cards
//  - [data-tilt]       subtle 3D tilt toward the pointer
//  - [data-reveal]     fade/slide sections in as they enter the viewport
// Everything degrades gracefully: with JS off, the page is fully visible/static.
export default function Interactive() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Spotlight ---------------------------------------------------------
    const spotlights = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]")
    );
    const onSpot = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    spotlights.forEach((el) => el.addEventListener("pointermove", onSpot));

    // --- Tilt --------------------------------------------------------------
    const tilts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]")
    );
    const onTilt = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
    };
    const offTilt = (e: PointerEvent) => {
      (e.currentTarget as HTMLElement).style.transform = "";
    };
    if (!reduce) {
      tilts.forEach((el) => {
        el.addEventListener("pointermove", onTilt);
        el.addEventListener("pointerleave", offTilt);
      });
    }

    // --- Scroll reveal -----------------------------------------------------
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    let io: IntersectionObserver | undefined;
    if (reduce) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      reveals.forEach((el) => el.classList.add("js-reveal"));
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io!.observe(el));
    }

    return () => {
      spotlights.forEach((el) => el.removeEventListener("pointermove", onSpot));
      tilts.forEach((el) => {
        el.removeEventListener("pointermove", onTilt);
        el.removeEventListener("pointerleave", offTilt);
      });
      io?.disconnect();
    };
  }, []);

  return null;
}
