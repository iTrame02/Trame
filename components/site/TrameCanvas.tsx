"use client";

import { useEffect, useRef } from "react";

/* La trame : une grille de fils qui se tisse à l'arrivée et se
   déforme autour du curseur (ou du doigt). Sans interaction, un
   curseur « fantôme » la fait respirer doucement. */
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
    let gap = 40;
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, last: -1e9, s: 0, init: false };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      gap = w < 640 ? 32 : 44;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!pointer.init) {
        pointer.x = pointer.tx = w * 0.7;
        pointer.y = pointer.ty = h * 0.45;
        pointer.init = true;
      }
      if (reduce) draw(performance.now());
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      pointer.tx = e.clientX - r.left;
      pointer.ty = y;
      pointer.last = performance.now();
    };

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
    const R = 170;

    const displace = (x: number, y: number, t: number): [number, number] => {
      let dx = Math.sin(y * 0.01 + t * 0.5) * 2;
      let dy = Math.cos(x * 0.008 + t * 0.4) * 2;
      const ddx = x - pointer.x;
      const ddy = y - pointer.y;
      const d2 = ddx * ddx + ddy * ddy;
      if (d2 < R * R * 5) {
        const d = Math.sqrt(d2) || 1;
        const f = Math.exp(-d2 / (R * R)) * 38 * pointer.s;
        dx += (ddx / d) * f;
        dy += (ddy / d) * f;
      }
      return [dx, dy];
    };

    const strokeLines = (horizontal: boolean, t: number, delay: number) => {
      const count = Math.ceil((horizontal ? h : w) / gap) + 1;
      const span = horizontal ? w : h;
      const step = 12;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const p = reduce ? 1 : easeOut(clamp((t - delay - (i / count) * 0.6) / 1.1));
        if (p <= 0) continue;
        const c = i * gap + gap * 0.5;
        const forward = i % 2 === 0; // les fils alternent de sens, comme un tissage
        const len = span * p;
        for (let s = 0; s <= len + step; s += step) {
          const along = forward ? Math.min(s, len) : span - Math.min(s, len);
          const x0 = horizontal ? along : c;
          const y0 = horizontal ? c : along;
          const [dx, dy] = displace(x0, y0, t);
          if (s === 0) ctx.moveTo(x0 + dx, y0 + dy);
          else ctx.lineTo(x0 + dx, y0 + dy);
        }
      }
    };

    function draw(now: number) {
      const t = (now - start) / 1000;
      const idle = now - pointer.last > 2500;
      if (idle && !reduce) {
        pointer.tx = w * (0.62 + 0.25 * Math.sin(t * 0.3));
        pointer.ty = h * (0.45 + 0.22 * Math.sin(t * 0.43 + 1.2));
      }
      const k = idle ? 0.025 : 0.12;
      pointer.x += (pointer.tx - pointer.x) * k;
      pointer.y += (pointer.ty - pointer.y) * k;
      pointer.s += ((idle ? 0.55 : 1) - pointer.s) * 0.05;

      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 1;
      const big = Math.max(w, h);

      strokeLines(true, t, 0.2);
      const gh = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, big * 0.55);
      gh.addColorStop(0, "rgba(229,106,217,0.75)");
      gh.addColorStop(0.18, "rgba(133,91,255,0.45)");
      gh.addColorStop(1, "rgba(133,91,255,0.06)");
      ctx!.strokeStyle = gh;
      ctx!.stroke();

      strokeLines(false, t, 0.5);
      const gv = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, big * 0.45);
      gv.addColorStop(0, "rgba(247,246,250,0.35)");
      gv.addColorStop(0.25, "rgba(247,246,250,0.08)");
      gv.addColorStop(1, "rgba(247,246,250,0.025)");
      ctx!.strokeStyle = gv;
      ctx!.stroke();

      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    if (!reduce) raf = requestAnimationFrame(draw);

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
