"use client";

import { useEffect, useRef } from "react";

/* Anneau qui suit la souris (ordinateur uniquement).
   Il grossit sur les liens et affiche l'étiquette d'un élément
   marqué data-cursor="…" (ex. « Voir » sur les projets). */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;
    let seen = false;

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        cx = x;
        cy = y;
      }
      const t = e.target as Element | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        if (label.current) label.current.textContent = tagged.dataset.cursor || "";
        el.dataset.state = "label";
      } else if (t?.closest("a, button, summary, select, label")) {
        el.dataset.state = "link";
      } else if (t?.closest("input, textarea")) {
        el.dataset.state = "hidden";
      } else {
        el.dataset.state = "";
      }
    };
    const onLeave = () => (el.dataset.state = "hidden");

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-state="hidden" aria-hidden="true">
      <div className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </div>
    </div>
  );
}
