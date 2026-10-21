"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import NavV2 from "@/components/v2/NavV2";
import TrameCanvas from "@/components/v2/TrameCanvas";
import ContactForm from "@/components/ContactForm";

/* ── Helpers ─────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, delay, ease },
});

/* Titre dont chaque mot monte depuis un masque */
function SplitTitle({
  lines,
  className = "",
  delay = 0,
  animateOnMount = false,
}: {
  lines: React.ReactNode[][];
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  let n = 0;
  return (
    <h2 ref={ref} className={className}>
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((word, wi) => {
            const i = n++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                {animateOnMount ? (
                  <span className="rise-word" style={{ animationDelay: `${delay + i * 0.06}s` }}>
                    {word}
                    {wi < words.length - 1 ? " " : ""}
                  </span>
                ) : (
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: delay + i * 0.06, ease }}
                  >
                    {word}
                    {wi < words.length - 1 ? " " : ""}
                  </motion.span>
                )}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A9A5B0]">
      <span className="h-px w-8 bg-[#9b7bff]" />
      {children}
    </p>
  );
}

/* ── Data ─────────────────────────────────────────────── */
const projects = [
  { slug: "lheurebleu", title: "L'Heure Bleue", tag: "Bar à cocktails", place: "Lausanne", url: "https://lheurebleu.netlify.app" },
  { slug: "nmluxury", title: "N&M Luxury", tag: "Location automobile", place: "Suisse", url: "https://nmluxury.netlify.app" },
  { slug: "physiotherapeute", title: "Physio Pré-du-Château", tag: "Cabinet de physiothérapie", place: "Yverdon-les-Bains", url: "https://physiotherapeute.netlify.app" },
  { slug: "braisecaf", title: "Braise", tag: "E-commerce café", place: "Neuchâtel", url: "https://braisecaf.netlify.app" },
  { slug: "sabrebarber", title: "Sabre", tag: "Barbier", place: "Carouge", url: "https://sabrebarber.netlify.app" },
  { slug: "cendreetgrs", title: "Grès & Cendre", tag: "Atelier de céramique", place: "Vevey", url: "https://cendreetgrs.netlify.app" },
];

const sectors = ["Restaurants", "Barbiers", "Artisans", "Cabinets", "Boutiques", "Indépendants", "Bars", "Ateliers", "Commerces"];

const steps = [
  { title: "On se rencontre.", text: "Un premier échange gratuit pour comprendre votre activité, vos clients et ce que vous attendez du site." },
  { title: "On imagine.", text: "Une direction claire et un devis précis. Pas de surprise, pas de jargon." },
  { title: "On crée.", text: "Je construis votre site sur mesure. Vous validez à chaque étape." },
  { title: "On fait évoluer.", text: "Mise en ligne, puis suivi : je reste là pour faire grandir votre site avec vous." },
];

const formulas = [
  { letter: "S", title: "Essentiel", subtitle: "Pour être visible, vite et bien.", details: ["Site personnalisé", "Pages essentielles", "Présentation de votre activité", "Prise de contact"] },
  { letter: "M", title: "Sur mesure", subtitle: "Pour aller plus loin.", details: ["Structure plus complète", "Fonctionnalités personnalisées", "Réservations ou événements", "Accompagnement renforcé"], featured: true },
  { letter: "L", title: "Signature", subtitle: "Un univers complet.", details: ["Création sur mesure", "Photographie & visuels", "Fonctionnalités avancées", "Accompagnement complet"] },
];

const trust = ["Devis gratuit", "Réponse en 24/48h", "Basé en Suisse"];

/* ── Sections ─────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16">
      <TrameCanvas className="trame-mask absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_48%,rgba(13,13,15,0.85),transparent)]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p
          style={{ animationDelay: "0.3s" }}
          className="rise-fade mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-[#A9A5B0] backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#9b7bff] opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#9b7bff]" />
          </span>
          Création de sites web sur mesure — Suisse
        </p>

        <SplitTitle
          animateOnMount
          delay={0.45}
          className="text-[clamp(2.9rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          lines={[
            ["Votre", "site,"],
            [<span key="t" className="font-serif-it text-[#b39bff]">tissé</span>, "sur", "mesure."],
          ]}
        />

        <p
          style={{ animationDelay: "1.05s" }}
          className="rise-fade mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#A9A5B0] md:text-lg"
        >
          Restaurants, artisans, indépendants : je crée des sites beaux, rapides et pensés pour
          vous amener des clients. Simplement.
        </p>

        <div
          style={{ animationDelay: "1.2s" }}
          className="rise-fade mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#9b7bff] px-8 py-4 font-medium text-black shadow-[0_0_40px_-8px_rgba(155,123,255,0.7)] transition hover:shadow-[0_0_60px_-6px_rgba(155,123,255,0.9)] sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Demander un devis gratuit</span>
            <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#realisations"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-neutral-200 backdrop-blur transition hover:border-white/40 sm:w-auto"
          >
            Voir les réalisations
          </a>
        </div>

        <ul
          style={{ animationDelay: "1.4s" }}
          className="rise-fade mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#7E7A85]"
        >
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-[#9b7bff]">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...sectors, ...sectors];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d0f] to-transparent" />
      <div className="marquee">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-2xl tracking-tight text-neutral-500 md:text-3xl">
            {i % 2 === 0 ? s : <span className="font-serif-it text-neutral-300">{s}</span>}
            <span className="h-1.5 w-1.5 rounded-full bg-[#9b7bff]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const domain = p.url.replace(/^https?:\/\//, "");

  return (
    <motion.a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      {...reveal((index % 2) * 0.1)}
      className={`group block ${index % 2 === 1 ? "md:mt-24" : ""}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141417] transition-colors duration-500 group-hover:border-[#9b7bff]/50">
        {/* Barre de navigateur */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-1 text-xs text-[#7E7A85]">{domain}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
            <Image
              src={`/projets/${p.slug}.jpg`}
              alt={`Site ${p.title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#0d0d0f]/0 transition-colors duration-500 group-hover:bg-[#0d0d0f]/35" />
          <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 scale-90 items-center gap-2 rounded-full bg-[#9b7bff] px-5 py-2.5 text-sm font-medium text-black opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            Visiter le site ↗
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{p.title}</h3>
          <p className="mt-1 text-sm text-[#7E7A85]">{p.tag}</p>
        </div>
        <span className="mt-2 shrink-0 text-sm text-[#7E7A85]">{p.place}</span>
      </div>
    </motion.a>
  );
}

function Realisations() {
  return (
    <section id="realisations" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Réalisations</Eyebrow>
            <SplitTitle
              className="text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em]"
              lines={[
                ["Des", "sites", "qui"],
                ["donnent", <span key="e" className="font-serif-it text-[#b39bff]">envie.</span>],
              ]}
            />
          </div>
          <motion.p {...reveal(0.2)} className="max-w-xs text-[#A9A5B0] md:text-right">
            Six métiers, six univers. Chaque site est pensé pour son secteur. Cliquez pour les visiter en vrai.
          </motion.p>
        </div>

        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Methode() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="methode" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <div className="md:sticky md:top-32 md:self-start">
          <Eyebrow>Méthode</Eyebrow>
          <SplitTitle
            className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]"
            lines={[
              ["Un", "site", "ne", "commence"],
              ["pas", "par", "un", "site."],
            ]}
          />
          <motion.p {...reveal(0.2)} className="mt-6 max-w-sm text-lg text-[#A9A5B0]">
            Il commence par <span className="font-serif-it text-xl text-neutral-100">une rencontre.</span>
          </motion.p>
        </div>

        <div ref={ref} className="relative pl-10">
          {/* Le fil qui se tisse au scroll */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
          <motion.div
            style={{ scaleY: line }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[#9b7bff] to-[#b39bff] shadow-[0_0_12px_rgba(155,123,255,0.8)]"
          />
          {steps.map((s, i) => (
            <motion.div key={s.title} {...reveal(0.05)} className="relative pb-16 last:pb-0">
              <span className="absolute -left-10 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#9b7bff]/60 bg-[#0d0d0f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9b7bff]" />
              </span>
              <p className="text-sm text-[#7E7A85]">0{i + 1}</p>
              <h3 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#A9A5B0]">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Formules() {
  return (
    <section id="formules" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <Eyebrow>Formules</Eyebrow>
          <SplitTitle
            className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]"
            lines={[["Une", "base", "pour"], [<span key="c" className="font-serif-it text-[#b39bff]">commencer.</span>]]}
          />
          <motion.p {...reveal(0.2)} className="mt-6 text-[#A9A5B0]">
            Aucune formule n&apos;est figée : elles servent de point de départ, on ajuste ensemble selon votre projet.
          </motion.p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {formulas.map((f, i) => (
            <motion.div
              key={f.title}
              {...reveal(i * 0.1)}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-colors duration-500 ${
                f.featured
                  ? "border-[#9b7bff]/50 bg-gradient-to-b from-[#9b7bff]/[0.12] to-transparent"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              {f.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-[#9b7bff] px-3 py-1 text-xs font-medium text-black">
                  Le plus choisi
                </span>
              )}
              <span className="font-serif-it text-6xl text-[#9b7bff]">{f.letter}</span>
              <h3 className="mt-6 text-3xl font-medium tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[#A9A5B0]">{f.subtitle}</p>
              <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
                {f.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="text-[#9b7bff]">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition ${
                  f.featured ? "bg-[#9b7bff] text-black hover:bg-[#b39bff]" : "border border-white/15 hover:border-white/40"
                }`}
              >
                Demander un devis →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function APropos() {
  return (
    <section id="a-propos" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow>À propos</Eyebrow>
        <motion.p
          {...reveal()}
          className="text-[clamp(1.7rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em]"
        >
          Derrière iTrame., il y a <span className="font-serif-it text-[#b39bff]">Mattias</span>, médiamaticien passionné
          de web et de photo. <span className="text-neutral-500">Une petite structure, donc un seul interlocuteur qui
          connaît votre projet par cœur.</span>
        </motion.p>
        <motion.div {...reveal(0.15)} className="mt-14 flex flex-wrap justify-center gap-3">
          {["Médiamaticien", "Développement web", "Photographie", "Expérience avec Keystone"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-5 py-2 text-sm text-[#A9A5B0]">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-5 py-28 md:px-10 md:py-40">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#121215] px-6 py-14 md:px-16 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-[#9b7bff]/25 blur-[100px]" />
        <div className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <SplitTitle
              className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]"
              lines={[["Une", "idée", "en", "tête ?"], [<span key="p" className="font-serif-it text-[#b39bff]">Parlons-en.</span>]]}
            />
            <motion.p {...reveal(0.2)} className="mt-6 max-w-sm text-lg text-[#A9A5B0]">
              Pas besoin d&apos;un projet parfaitement défini. Quelques mots suffisent pour commencer.
            </motion.p>
            <motion.ul {...reveal(0.3)} className="mt-10 space-y-3">
              {["Premier échange gratuit et sans engagement", "Réponse en 24/48h", "Appel, visio ou rendez-vous"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-neutral-300">
                  <span className="text-[#9b7bff]">✓</span>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>
          <div className="-mt-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden px-5 pt-10 pb-28 md:px-10 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <p className="outline-text select-none text-center text-[22vw] font-semibold leading-none tracking-[-0.06em] md:text-[17vw]">
          iTrame
          <span className="ml-[0.02em] inline-block h-[0.13em] w-[0.13em] rounded-full bg-[#9b7bff] shadow-[0_0_40px_rgba(155,123,255,0.8)]" />
        </p>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[#7E7A85] sm:flex-row sm:justify-between">
          <p>Vos idées. Votre histoire. Votre site.</p>
          <p>© {new Date().getFullYear()} iTrame.</p>
        </div>
      </div>
    </footer>
  );
}

/* Bouton fixe sur mobile, pratique pour le trafic venant des pubs */
function MobileCta() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [500, 700], [0, 1]);
  const y = useTransform(scrollY, [500, 700], [40, 0]);
  const pointerEvents = useTransform(scrollY, (v) => (v > 600 ? "auto" : "none"));
  return (
    <motion.a
      href="#contact"
      style={{ opacity, y, pointerEvents }}
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-[#9b7bff] py-4 font-medium text-black shadow-[0_10px_40px_-10px_rgba(155,123,255,0.8)] md:hidden"
    >
      Demander un devis gratuit →
    </motion.a>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function V2() {
  return (
    <main className="grain relative">
      <NavV2 />
      <Hero />
      <Marquee />
      <Realisations />
      <Methode />
      <Formules />
      <APropos />
      <Contact />
      <Footer />
      <MobileCta />
    </main>
  );
}
