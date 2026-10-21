"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import Logo from "./Logo";
import { ease } from "./motion";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#projets", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#formules", label: "Formules" },
  { href: "#a-propos", label: "À propos" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`anim-fade-up fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || open ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent"
        }`}
        style={{ animationDelay: "0.1s" }}
      >
        <nav className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-10" aria-label="Navigation principale">
          <a href="#accueil" className="font-display text-2xl font-bold tracking-tight" onClick={() => setOpen(false)} aria-label="iTrame., retour à l'accueil">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative py-2 text-sm text-muted transition-colors hover:text-paper">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-rose transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 bg-violet px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink sm:inline-flex"
            >
              Parlons de ton projet
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="relative flex h-11 w-11 items-center justify-center md:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <span className={`absolute h-[1.5px] w-6 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-6 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pt-24 pb-8 md:hidden"
          >
            <ul className="flex-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
                    className="flex items-baseline justify-between py-5 font-display text-4xl font-semibold tracking-tight"
                  >
                    {l.label}
                    <span className="text-sm font-normal text-faint">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between bg-violet px-6 py-5 font-semibold"
              >
                Parlons de ton projet <span>↗</span>
              </a>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={`tel:${PHONE_TEL}`} className="border border-line px-4 py-4">
                  <span className="block text-xs text-faint">Appeler</span>
                  <span className="mt-1 block font-semibold">{PHONE_DISPLAY}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="border border-line px-4 py-4">
                  <span className="block text-xs text-faint">Écrire</span>
                  <span className="mt-1 block truncate font-semibold">{EMAIL}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
