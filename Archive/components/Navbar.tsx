"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-10"
    >
      <a href="#" className="text-xl md:text-2xl font-medium tracking-tight">
      iTrame<span className="text-[#9b7bff]">.</span>
      </a>

      <div className="hidden items-center gap-7 text-sm text-neutral-400 md:flex">
        <a
          href="#histoire"
          className="transition hover:text-white"
        >
          Notre approche
        </a>

        <a
          href="#accompagnement"
          className="transition hover:text-white"
        >
          Accompagnement
        </a>

        <a
          href="#formules"
          className="transition hover:text-white"
        >
          Formules
        </a>

        <a
          href="#a-propos"
          className="transition hover:text-white"
        >
          Qui sommes-nous
        </a>
      </div>

      <a
        href="#contact"
        className="rounded-full border border-neutral-700 px-5 py-2 text-sm transition hover:border-neutral-400"
      >
        Contact
      </a>
    </motion.nav>
  );
}