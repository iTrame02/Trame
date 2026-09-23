"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#histoire", label: "Notre approche" },
    { href: "#accompagnement", label: "Accompagnement" },
    { href: "#portfolio", label: "Réalisations" },
    { href: "#formules", label: "Formules" },
    { href: "#a-propos", label: "À propos" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-10"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "rgba(13,13,15,0.7)" }}
      >
        <a href="#" className="text-xl md:text-2xl font-medium tracking-tight">
          iTrame<span className="text-[#9b7bff]">.</span>
        </a>

        <div className="hidden items-center gap-7 text-sm text-neutral-400 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:block rounded-full border border-neutral-700 px-5 py-2 text-sm transition hover:border-neutral-400"
          >
            Contact
          </a>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 md:hidden"
            style={{ background: "rgba(13,13,15,0.97)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex flex-col gap-1 mt-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="py-4 text-2xl font-light border-b border-neutral-800 text-neutral-300 hover:text-white transition"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.06 }}
                className="mt-8 w-fit rounded-full bg-[#9b7bff] text-black font-medium px-7 py-3 text-sm"
              >
                Parlons de votre projet
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
