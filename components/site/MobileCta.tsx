"use client";

import { useEffect, useState } from "react";
import { PHONE_TEL } from "@/lib/contact";

/* Barre d'action mobile : appeler en un geste, ou demander sa
   maquette gratuite. Masquée sur le hero, au formulaire et en pied de page. */
export default function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    if (!hero || !contact || !footer) return;
    let pastHero = false;
    const hidden = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        else if (e.isIntersecting) hidden.add(e.target);
        else hidden.delete(e.target);
      }
      setShow(pastHero && hidden.size === 0);
    });
    io.observe(hero);
    io.observe(contact);
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 flex gap-2 transition-all duration-500 ease-out-expo md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[150%] opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
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
      <a
        href="#contact"
        tabIndex={show ? 0 : -1}
        className="flex flex-1 items-center justify-between bg-violet px-5 py-4 font-semibold shadow-[0_10px_30px_-10px_rgb(133_91_255/0.7)]"
      >
        Maquette gratuite <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
