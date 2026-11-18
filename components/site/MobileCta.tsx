"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PHONE_TEL } from "@/lib/contact";

/* Barre d'action mobile : appeler en un geste, ou demander sa
   maquette gratuite. Apparaît après le premier écran, se retire
   au-dessus du pied de page et sur la page contact. */
export default function MobileCta() {
  const pathname = usePathname();
  const [pastFold, setPastFold] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    const io = footer ? new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting)) : null;
    if (footer && io) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [pathname]);

  const show = pastFold && !atFooter && pathname !== "/contact";

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 flex gap-2 transition-[transform,opacity] duration-500 ease-out-expo md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[150%] opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)", viewTransitionName: "mobile-cta" }}
    >
      <a
        href={`tel:${PHONE_TEL}`}
        tabIndex={show ? 0 : -1}
        aria-label="Appeler iTrame."
        className="flex items-center justify-center gap-2 border border-paper/20 bg-ink-2/95 px-5 py-4 font-semibold backdrop-blur-md"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
        Appeler
      </a>
      <Link
        href="/contact"
        tabIndex={show ? 0 : -1}
        className="flex flex-1 items-center justify-between bg-violet px-5 py-4 font-semibold"
      >
        Maquette gratuite <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
