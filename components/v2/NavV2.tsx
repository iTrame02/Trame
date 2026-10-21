"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#realisations", label: "Réalisations" },
  { href: "#methode", label: "Méthode" },
  { href: "#formules", label: "Formules" },
  { href: "#a-propos", label: "À propos" },
];

export default function NavV2() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <header
        style={{ animationDelay: "0.2s" }}
        className="rise-fade fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "max-w-4xl border border-white/10 bg-[#0d0d0f]/70 px-3 py-2 pl-6 backdrop-blur-xl"
              : "max-w-6xl border border-transparent px-2 py-3"
          }`}
        >
          <a href="#" className="text-xl font-semibold tracking-tight">
            iTrame<span className="text-[#9b7bff]">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-[#9b7bff] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#b39bff] sm:inline-flex"
            >
              Devis gratuit
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-[#0d0d0f]/97 px-6 pb-12 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/10 py-4 text-4xl font-medium tracking-tight"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 rounded-full bg-[#9b7bff] py-4 text-center font-medium text-black"
            >
              Demander un devis gratuit →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
