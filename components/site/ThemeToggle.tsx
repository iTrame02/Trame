"use client";

import { useEffect, useId, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

/* Bascule clair / sombre. Le nouveau thème s'ouvre en cercle
   depuis le bouton (View Transitions), sinon il s'applique d'un coup. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const maskId = `moon-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("itrame-theme", next);
      } catch {}
      setTheme(next);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const vt = document.startViewTransition(() => flushSync(apply));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const light = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Passer en mode sombre" : "Passer en mode clair"}
      title={light ? "Mode sombre" : "Mode clair"}
      className={`group relative flex h-10 w-10 items-center justify-center border border-line text-paper transition-colors hover:border-paper/50 ${className}`}
    >
      {/* Soleil / lune : le même cercle, que la lune vient « croquer » */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] overflow-visible">
        <mask id={maskId}>
          <rect x="-4" y="-4" width="32" height="32" fill="#fff" />
          <circle
            cx={light ? 17 : 30}
            cy={light ? 7 : -6}
            r="6.5"
            fill="#000"
            style={{ transition: "cx 0.5s cubic-bezier(0.22,1,0.36,1), cy 0.5s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r={light ? 8 : 4.5}
          fill="currentColor"
          mask={`url(#${maskId})`}
          style={{ transition: "r 0.5s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{
            transformOrigin: "12px 12px",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.3s",
            transform: light ? "rotate(-45deg) scale(0.4)" : "rotate(0) scale(1)",
            opacity: light ? 0 : 1,
          }}
        >
          <path d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7" />
        </g>
      </svg>
    </button>
  );
}
