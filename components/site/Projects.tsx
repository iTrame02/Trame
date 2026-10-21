"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { featured, img, projects, type Project } from "@/lib/projects";
import { BrowserFrame, Phone, ScrollShot } from "./Devices";
import { Label, Reveal, SplitHeading, ease } from "./motion";

/* Révélation par rideau au scroll. La détection se fait sur le parent :
   un élément masqué par clip-path n'est jamais « visible » pour le navigateur. */
function Curtain({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={inView || reduce ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Le téléphone qui glisse par-dessus l'écran */
function FloatingPhone({ slug, name, className }: { slug: string; name: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, delay: 0.45, ease }}
      className={`absolute z-10 ${className}`}
    >
      <Phone
        src={img(slug, "mobile")}
        alt={`Le site ${name} sur téléphone`}
        className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-3 group-hover:rotate-[-2deg]"
      />
    </motion.div>
  );
}

/* ── Projet phare ─────────────────────────────────────── */
function Featured() {
  return (
    <article className="mt-16 md:mt-24" aria-labelledby="projet-phare">
      <Reveal className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-sm">
        <span className="flex items-center gap-3 text-paper">
          <span className="h-2 w-2 bg-rose" aria-hidden="true" />
          Projet phare
        </span>
        <span className="text-faint">{featured.category}</span>
        <span className="flex items-center gap-2 text-faint">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80] opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          </span>
          En ligne
        </span>
      </Reveal>

      <SplitHeading
        as="h3"
        text={`${featured.name} | *— ${featured.place}*`}
        className="mt-6 font-display text-[clamp(2.15rem,8.5vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
      />
      <span id="projet-phare" className="sr-only">{featured.name}, {featured.place}</span>

      {/* Composition : écran + téléphone */}
      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-12 block md:mt-16 md:pr-[9%]"
        aria-label={`Voir le site ${featured.name} (nouvel onglet)`}
      >
        <Curtain>
          <BrowserFrame url={featured.url}>
            <ScrollShot
              desktop={img(featured.slug, "desktop")}
              full={img(featured.slug, "full")}
              alt={`Le site du ${featured.name}, ${featured.place}`}
              sizes="(min-width: 1400px) 1200px, 92vw"
            />
          </BrowserFrame>
        </Curtain>
        <FloatingPhone slug={featured.slug} name={featured.name} className="-bottom-10 right-0 w-[26%] md:-bottom-16 md:w-[19%]" />
        <span className="pointer-events-none absolute bottom-6 left-4 z-20 hidden items-center gap-2 bg-ink/85 px-3 py-1.5 font-display text-xs text-muted backdrop-blur transition-opacity duration-500 group-hover:opacity-0 md:inline-flex">
          Survole pour parcourir le site <span aria-hidden="true">↓</span>
        </span>
      </a>

      <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="font-display text-3xl font-medium leading-tight tracking-[-0.02em] md:text-4xl">
              {featured.highlight}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{featured.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-12 font-display text-sm text-faint">Ce qu&apos;on a construit</p>
            <ul className="mt-4 border-t border-line">
              {featured.built.map((b) => (
                <li key={b} className="flex items-center gap-4 border-b border-line py-3.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-rose" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-6 bg-paper px-6 py-4 font-semibold text-ink transition-colors hover:bg-violet hover:text-paper"
            >
              Voir le site en ligne
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-between gap-6 border border-paper/25 px-6 py-4 font-semibold transition-colors hover:border-paper"
            >
              Je veux un site comme ça
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        {/* Deux vues de l'intérieur du site */}
        <div className="grid gap-6 md:col-span-6 md:col-start-7">
          {featured.shots.slice(0, 2).map((s, i) => (
            <Curtain key={s.src} delay={i * 0.1} className={i === 1 ? "md:ml-[18%]" : "md:mr-[10%]"}>
              <div className="relative aspect-[16/10] overflow-hidden border border-line bg-ink-3">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 45vw, 92vw" className="object-cover object-top" />
              </div>
            </Curtain>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ── Autres réalisations ──────────────────────────────── */
const layout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-40",
  "md:col-span-5",
  "md:col-span-7 md:mt-40",
  "md:col-span-7",
  "md:col-span-5 md:mt-40",
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const number = String(index + 2).padStart(2, "0");
  const content = (
    <>
      <div className="relative pr-[8%]">
        <Curtain>
          <BrowserFrame url={p.url}>
            <ScrollShot
              desktop={img(p.slug, "desktop")}
              full={img(p.slug, "full")}
              alt={`Le site ${p.name}`}
              sizes="(min-width: 768px) 55vw, 92vw"
            />
          </BrowserFrame>
        </Curtain>
        <FloatingPhone slug={p.slug} name={p.name} className="-bottom-8 right-0 w-[24%]" />
      </div>
      <div className="mt-14 pr-[8%]">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-sm text-faint">
          <span className="text-rose">{number}</span>
          {p.category}
          <span aria-hidden="true">·</span>
          {p.place}
          {p.concept && <span className="border border-line px-2 py-0.5 text-xs">Projet concept</span>}
        </p>
        <h4 className="mt-2 flex items-baseline justify-between gap-4 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{p.name}</span>
          {p.url && (
            <span aria-hidden="true" className="text-xl text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-rose">
              ↑
            </span>
          )}
        </h4>
        <p className="mt-2 max-w-md text-muted">{p.description}</p>
      </div>
    </>
  );

  return p.url ? (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block ${layout[index % layout.length]}`}
      aria-label={`${p.name} — ${p.category}, ${p.place} (ouvre le site dans un nouvel onglet)`}
    >
      {content}
    </a>
  ) : (
    <div className={`group ${layout[index % layout.length]}`}>{content}</div>
  );
}

export default function Projects() {
  return (
    <section id="projets" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Label index="01">Projets</Label>
          <SplitHeading
            text="Des idées devenues *réalité.*"
            className="mt-6 font-display text-[clamp(2rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
        </div>
        <Reveal delay={0.2} className="md:col-span-3 md:col-start-10">
          <p className="text-muted">
            Chaque site est construit autour d&apos;un métier, d&apos;une ambiance et de vrais besoins. Survole un projet pour le
            parcourir, clique pour le visiter.
          </p>
        </Reveal>
      </div>

      <Featured />

      <div className="mt-32 border-t border-line pt-10 md:mt-48">
        <Reveal>
          <p className="font-display text-2xl tracking-tight md:text-3xl">Autres réalisations</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-x-12 gap-y-24 md:mt-20 md:grid-cols-12 md:gap-y-32">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-28 flex flex-col gap-6 border-t border-line pt-10 md:mt-40 md:flex-row md:items-center md:justify-between">
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
