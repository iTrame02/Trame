"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Label, SplitHeading, ease } from "./motion";

/* Ce qu'on laisse aux autres → ce que tu as avec iTrame. */
const pairs = [
  ["Un modèle générique", "Un site pensé pour toi."],
  ["Des prix flous", "Des tarifs accessibles et clairs."],
  ["Un service anonyme", "Un contact humain et direct."],
  ["Livré, puis oublié", "Un suivi après la mise en ligne."],
  ["La même recette pour tous", "Une solution adaptée à ton activité."],
];

export default function Why() {
  const reduce = useReducedMotion();

  return (
    <section id="pourquoi" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <Label index="04">Pourquoi iTrame</Label>
      <SplitHeading
        text="Du sur-mesure. | *Sans prise de tête.*"
        className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
      />

      <ul className="mt-16 md:mt-24">
        {pairs.map(([before, after], i) => (
          <motion.li
            key={after}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.6 }}
            className="grid gap-2 border-t border-line py-7 last:border-b md:grid-cols-12 md:items-baseline md:gap-10 md:py-9"
          >
            <span className="font-display text-sm text-faint md:col-span-1">0{i + 1}</span>
            <span className="relative w-fit text-lg text-faint md:col-span-4 md:text-xl">
              {before}
              <motion.span
                aria-hidden="true"
                variants={{ hidden: { scaleX: reduce ? 1 : 0 }, shown: { scaleX: 1 } }}
                transition={{ duration: 0.6, ease }}
                className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-rose"
              />
              <span className="sr-only"> (barré)</span>
            </span>
            <span className="overflow-hidden md:col-span-7">
              <motion.span
                variants={{ hidden: reduce ? { y: 0 } : { y: "100%" }, shown: { y: 0 } }}
                transition={{ duration: 0.8, delay: 0.35, ease }}
                className="block font-display text-2xl font-medium tracking-[-0.02em] md:text-4xl"
              >
                {after}
              </motion.span>
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
