"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { ease } from "./motion";

export const pages = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/tarifs", label: "Tarifs" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Le menu se ferme à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`anim-fade-up fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || open ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent"
        }`}
        style={{ animationDelay: "0.1s", viewTransitionName: "site-header" }}
      >
        <nav className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-10" aria-label="Navigation principale">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight" aria-label="iTrame., accueil">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {pages.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 text-sm transition-colors hover:text-paper ${active ? "text-paper" : "text-muted"}`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-rose transition-transform duration-300 group-hover:scale-x-100 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="group hidden items-center gap-2 bg-violet px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink sm:inline-flex"
            >
              Parlons de ton projet
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <span className={`absolute h-[1.5px] w-6 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-6 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </nav>

        {/* Fil de lecture : avance avec le défilement */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-rose"
        />
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
              {[...pages, { href: "/contact", label: "Contact" }].map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`flex items-baseline justify-between py-5 font-display text-4xl font-semibold tracking-tight ${
                        isActive(l.href) ? "text-violet-soft" : ""
                      }`}
                    >
                      {l.label}
                      <span className="text-sm font-normal text-faint">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
            >
              <div className="grid grid-cols-2 gap-3">
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
