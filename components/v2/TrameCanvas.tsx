"use client";

import { useEffect, useRef } from "react";

/* Grille de fils (la « trame ») qui se tisse à l'arrivée
   et se déforme autour du curseur / du doigt. */
export default function TrameCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let w = 0;
    let h = 0;
    let gap = 36;
    let raf = 0;
    let visible = true;

    const pointer = { x: -9999, y: -9999, tx: 0, ty: 0, last: -9999, s: 0 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      gap = w < 640 ? 28 : 36;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (pointer.x < -9000) {
        pointer.x = pointer.tx = w * 0.5;
        pointer.y = pointer.ty = h * 0.5;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < -100 || y > r.height + 100) return;
      pointer.tx = x;
      pointer.ty = y;
      pointer.last = performance.now();
    };

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

    const R = 190;
    const displace = (x: number, y: number, t: number): [number, number] => {
      let dx = Math.sin(y * 0.011 + t * 0.55) * 2.5;
      let dy = Math.cos(x * 0.009 + t * 0.45) * 2.5;
      const ddx = x - pointer.x;
      const ddy = y - pointer.y;
      const d2 = ddx * ddx + ddy * ddy;
      if (d2 < R * R * 5) {
        const d = Math.sqrt(d2) || 1;
        const f = Math.exp(-d2 / (R * R)) * 44 * pointer.s;
        dx += (ddx / d) * f;
        dy += (ddy / d) * f;
      }
      return [dx, dy];
    };

    const glow = (alphaCenter: number, alphaMid: number, alphaFar: number) => {
      const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, Math.max(w, h) * 0.6);
      g.addColorStop(0, `rgba(196,178,255,${alphaCenter})`);
      g.addColorStop(0.22, `rgba(155,123,255,${alphaMid})`);
      g.addColorStop(1, `rgba(155,123,255,${alphaFar})`);
      return g;
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;

      // Sans interaction, un « curseur fantôme » se balade doucement
      const idle = now - pointer.last > 2500;
      if (idle) {
        pointer.tx = w * (0.5 + 0.32 * Math.sin(t * 0.32));
        pointer.ty = h * (0.5 + 0.22 * Math.sin(t * 0.47 + 1.2));
      }
      const k = idle ? 0.03 : 0.12;
      pointer.x += (pointer.tx - pointer.x) * k;
      pointer.y += (pointer.ty - pointer.y) * k;
      pointer.s += ((idle ? 0.6 : 1) - pointer.s) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const step = 12;

      // Fils horizontaux (alternent gauche → droite / droite → gauche)
      const rows = Math.ceil(h / gap) + 1;
      ctx.beginPath();
      for (let i = 0; i < rows; i++) {
        const p = reduce ? 1 : easeOut(clamp((t - 0.15 - (i / rows) * 0.7) / 1.1));
        if (p <= 0) continue;
        const y0 = i * gap + gap * 0.5;
        const fromLeft = i % 2 === 0;
        const len = w * p;
        for (let s = 0; s <= len + step; s += step) {
          const x0 = fromLeft ? Math.min(s, len) : w - Math.min(s, len);
          const [dx, dy] = displace(x0, y0, t);
          if (s === 0) ctx.moveTo(x0 + dx, y0 + dy);
          else ctx.lineTo(x0 + dx, y0 + dy);
        }
      }
      ctx.strokeStyle = glow(0.95, 0.38, 0.07);
      ctx.stroke();

      // Fils verticaux, plus discrets (couleur crème)
      const cols = Math.ceil(w / gap) + 1;
      ctx.beginPath();
      for (let j = 0; j < cols; j++) {
        const p = reduce ? 1 : easeOut(clamp((t - 0.55 - (j / cols) * 0.7) / 1.1));
        if (p <= 0) continue;
        const x0 = j * gap + gap * 0.5;
        const fromTop = j % 2 === 0;
        const len = h * p;
        for (let s = 0; s <= len + step; s += step) {
          const y0 = fromTop ? Math.min(s, len) : h - Math.min(s, len);
          const [dx, dy] = displace(x0, y0, t);
          if (s === 0) ctx.moveTo(x0 + dx, y0 + dy);
          else ctx.lineTo(x0 + dx, y0 + dy);
        }
      }
      const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, Math.max(w, h) * 0.5);
      g.addColorStop(0, "rgba(245,243,239,0.4)");
      g.addColorStop(0.25, "rgba(245,243,239,0.1)");
      g.addColorStop(1, "rgba(245,243,239,0.03)");
      ctx.strokeStyle = g;
      ctx.stroke();

      if (visible && !(reduce && t > 0.1)) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
