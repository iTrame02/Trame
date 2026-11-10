"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Label, Reveal, SplitHeading } from "./motion";

const steps = [
  {
    title: "On se rencontre.",
    text: "Un premier échange gratuit, par téléphone, en visio ou autour d'un café, pour comprendre ton activité et tes besoins.",
  },
  {
    title: "On imagine.",
    text: "Je te prépare une maquette gratuite de ton futur site, avec un devis clair. Tu vois le résultat avant de t'engager.",
  },
  {
    title: "On crée.",
    text: "Je construis ton site sur mesure et tu valides à chaque étape. Sauf très gros projet, il est prêt en 5 à 7 jours.",
  },
  {
    title: "On fait évoluer.",
    text: "Mise en ligne, puis suivi : je reste là pour ajuster et faire grandir ton site avec toi.",
  },
];

/* Les étapes, reliées par un fil qui se tisse au scroll */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="methode" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:sticky md:top-32 md:col-span-5 md:self-start">
          <Label index="03">Méthode</Label>
          <SplitHeading
            text="Un site ne commence pas | par un *site.*"
            className="mt-6 font-display text-[clamp(1.85rem,4.8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-sm text-lg text-muted">Il commence par une rencontre. Voilà comment ça se passe, simplement.</p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative pl-12 md:col-span-6 md:col-start-7 md:pl-16">
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: line }}
            className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-violet"
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="relative pb-16 last:pb-0 md:pb-20">
              <span aria-hidden="true" className="absolute -left-12 top-3 h-[11px] w-[11px] border border-violet bg-ink md:-left-16" />
              <p className="font-display text-sm text-rose">Étape 0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] md:text-5xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
