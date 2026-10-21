"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, type Project } from "@/lib/projects";
import { Label, Reveal, SplitHeading, ease } from "./motion";

function ProjectImage({ p, sizes, aspect }: { p: Project; sizes: string; aspect: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // La détection se fait sur le parent : un élément masqué par clip-path
  // n'est jamais considéré « visible » par le navigateur.
  return (
    <div ref={ref}>
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={inView || reduce ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 1.1, ease }}
        className={`relative overflow-hidden bg-ink-2 ${aspect}`}
      >
        <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
          <Image
            src={p.image}
            alt={`Capture du site ${p.name}`}
            fill
            sizes={sizes}
            className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035]"
          />
        </motion.div>
        {p.url && (
          <span className="absolute bottom-0 left-0 flex translate-y-full items-center gap-3 bg-paper px-5 py-3 font-display text-sm font-semibold text-ink transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
            Voir le site <span aria-hidden="true">↗</span>
          </span>
        )}
      </motion.div>
    </div>
  );
}

function ProjectMeta({ p, number, large = false }: { p: Project; number: string; large?: boolean }) {
  return (
    <div className={`mt-5 ${large ? "grid gap-4 md:grid-cols-12 md:gap-10" : ""}`}>
      <div className={large ? "md:col-span-6" : ""}>
        <p className="flex items-center gap-3 font-display text-sm text-faint">
          <span className="text-rose">{number}</span>
          {p.category}
          <span aria-hidden="true">·</span>
          {p.place}
        </p>
        <h3
          className={`mt-2 font-display font-semibold tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 ${
            large ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
          }`}
        >
          {p.name}
        </h3>
      </div>
      <div className={large ? "md:col-span-5 md:col-start-8 md:pt-8" : ""}>
        <p className={`text-muted ${large ? "text-lg" : "mt-2 max-w-md"}`}>{p.description}</p>
        {p.concept && (
          <p className="mt-3 inline-block border border-line px-2.5 py-1 text-xs text-faint">Projet concept</p>
        )}
      </div>
    </div>
  );
}

function ProjectLink({ p, children, className = "" }: { p: Project; children: React.ReactNode; className?: string }) {
  if (!p.url) return <div className={className}>{children}</div>;
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block focus-visible:outline-offset-8 ${className}`}
      aria-label={`${p.name} — ${p.category}, ${p.place} (ouvre le site dans un nouvel onglet)`}
    >
      {children}
    </a>
  );
}

/* Disposition asymétrique des projets secondaires (par paires) */
const layout = [
  "md:col-span-7",
  "md:col-span-4 md:col-start-9 md:mt-40",
  "md:col-span-5 md:col-start-2",
  "md:col-span-6 md:col-start-7 md:mt-24",
  "md:col-span-4 md:col-start-1",
  "md:col-span-6 md:col-start-6 md:mt-40",
];

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projets" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Label index="01">Projets</Label>
          <SplitHeading
            text="Des idées devenues *réalité.*"
            className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
        </div>
        <Reveal delay={0.2} className="md:col-span-3 md:col-start-10">
          <p className="text-muted">
            Chaque site est construit autour d&apos;un métier, d&apos;une ambiance et de vrais besoins. Clique pour les visiter.
          </p>
        </Reveal>
      </div>

      <ProjectLink p={featured} className="mt-16 md:mt-24">
        <ProjectImage p={featured} sizes="(min-width: 1400px) 1300px, 100vw" aspect="aspect-[4/3] md:aspect-[16/8]" />
        <ProjectMeta p={featured} number="01" large />
      </ProjectLink>

      <div className="mt-24 grid gap-x-10 gap-y-20 md:mt-36 md:grid-cols-12 md:gap-y-28">
        {rest.map((p, i) => (
          <ProjectLink key={p.slug} p={p} className={layout[i % layout.length]}>
            <ProjectImage
              p={p}
              sizes="(min-width: 768px) 50vw, 100vw"
              aspect={i % 3 === 1 ? "aspect-[4/5] md:aspect-[4/5]" : "aspect-[16/11]"}
            />
            <ProjectMeta p={p} number={String(i + 2).padStart(2, "0")} />
          </ProjectLink>
        ))}
      </div>

      <Reveal className="mt-24 flex flex-col gap-6 border-t border-line pt-10 md:mt-36 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-2xl tracking-tight md:text-3xl">
          Le prochain, <span className="text-violet-soft">c&apos;est peut-être le tien.</span>
        </p>
        <a
          href="#contact"
          className="group inline-flex w-fit items-center gap-6 bg-violet px-6 py-4 font-semibold transition-colors hover:bg-paper hover:text-ink"
        >
          Parlons de ton projet
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
