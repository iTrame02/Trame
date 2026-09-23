"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

/* ── Helpers ─────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, delay, ease },
});

function AccentWord({ children }: { children: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.38, ease }}
      className="text-[#9b7bff]"
    >
      {children}
    </motion.span>
  );
}

function DrawLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <div ref={ref} className="relative h-px w-full bg-neutral-800 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 origin-left bg-[#9b7bff]/60"
      />
    </div>
  );
}

function CtaLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`group inline-flex items-center gap-2 transition ${className}`}>
      {children}
      <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  );
}

/* ── Data ─────────────────────────────────────────────── */
const steps = [
  { title: "Comprendre.", subtitle: "Découvrir votre univers.", text: "Votre activité, votre histoire, vos besoins." },
  { title: "Imaginer.", subtitle: "Donner une direction à vos idées.", text: "Construire ensemble une vision qui vous ressemble." },
  { title: "Créer.", subtitle: "Donner vie à votre projet.", text: "Transformer cette vision en un site pensé pour vous." },
  { title: "Évoluer.", subtitle: "Continuer à construire ensemble.", text: "Rester présent après la mise en ligne et faire évoluer votre projet." },
];

const creations = [
  { number: "01", title: "Sites web.", keywords: "Vitrine · Réservation · Boutique · Sur mesure.", subtitle: "Un site conçu autour de votre activité." },
  { number: "02", title: "Fonctionnalités.", keywords: "Paiements · Calendrier · Formulaires · Catalogue.", subtitle: "Des outils qui correspondent à votre métier." },
  { number: "03", title: "Image & contenu.", keywords: "Photo · Visuels · Identité · Narration.", subtitle: "Montrer ce qui vous rend unique." },
  { number: "04", title: "Projets sur mesure.", keywords: "Application · Automatisation · Outils internes.", subtitle: "Votre idée sort du cadre ? On s'adapte." },
];

const formulas = [
  {
    number: "S", title: "Essentiel.", subtitle: "Pour commencer.",
    text: "Une présence en ligne claire et professionnelle pour présenter votre activité.",
    details: ["Site personnalisé", "Pages essentielles", "Présentation de votre activité", "Prise de contact"],
  },
  {
    number: "M", title: "Sur mesure.", subtitle: "Pour aller plus loin.",
    text: "Un site construit autour de vos besoins avec davantage de possibilités.",
    details: ["Structure plus complète", "Fonctionnalités personnalisées", "Réservations ou événements", "Accompagnement renforcé"],
  },
  {
    number: "L", title: "Signature.", subtitle: "Une vision complète.",
    text: "Une approche globale pour construire un univers cohérent autour de votre projet.",
    details: ["Création sur mesure", "Photographie & visuels", "Fonctionnalités avancées", "Accompagnement complet"],
  },
];

const portfolio = [
  { number: "01", title: "N&M Luxury", tag: "Location automobile premium", desc: "Design immersif, réservation en ligne, gestion de flotte.", url: "https://netmluxury.netlify.app/", accent: "#8f3cff" },
  { number: "02", title: "Chez MLD", tag: "Restauration & commande", desc: "Application mobile-first, panier, paiement TWINT, livraison.", url: "https://chezmld.netlify.app/", accent: "#C9A227" },
  { number: "03", title: "Braise", tag: "E-commerce torréfacteur", desc: "Boutique, abonnements café, packaging génératif.", url: "https://cafelebleu.netlify.app/", accent: "#C2462B" },
  { number: "04", title: "Sabre", tag: "Réservation barbershop bilingue", desc: "Wizard 4 étapes, agenda dynamique, FR/EN.", url: "https://barbershop203.netlify.app/", accent: "#2d7a5f" },
  { number: "05", title: "L'Heure Bleue", tag: "Bar & cocktails animé", desc: "Canvas lac Léman, menu interactif, réservation.", url: "https://labrasse.netlify.app/", accent: "#E9A45B" },
];

const heroLines = ["Vos idées.", "Votre histoire.", "Votre site."];

const stats = [
  { value: "24 / 48h", label: "Première réponse" },
  { value: "100%", label: "Sur mesure" },
  { value: "Suivi inclus", label: "Après mise en ligne" },
  { value: "Devis gratuit", label: "Sans engagement" },
];

const heroWords = ["restaurants", "artisans", "commerçants", "indépendants", "créateurs"];

/* ── Page ─────────────────────────────────────────────── */
export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % heroWords.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative">
      <div className="bg-halo" aria-hidden="true" />

      <Navbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-0">
        <div className="text-center max-w-4xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-sm text-[#A9A5B0] tracking-widest uppercase mb-8"
          >
            Agence digitale — Suisse
          </motion.p>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
            {heroLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.14, ease }}
                className="block"
              >
                {i === heroLines.length - 1 ? (
                  <>Votre <AccentWord>site.</AccentWord></>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease }}
            className="mt-8 max-w-xl mx-auto text-[#A9A5B0] text-lg leading-relaxed"
          >
            Nous prenons le temps de comprendre votre projet afin de créer
            un site qui vous ressemble réellement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.85, ease }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 justify-center px-7 py-3 rounded-full bg-[#9b7bff] text-black font-medium hover:opacity-90 transition"
            >
              Parlons de votre projet
              <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 justify-center px-7 py-3 rounded-full border border-neutral-700 hover:border-[#9b7bff]/60 transition"
            >
              Voir nos réalisations
              <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.1, ease }}
          className="w-full max-w-4xl mt-20 grid grid-cols-2 md:grid-cols-4 border border-neutral-800 rounded-[20px] overflow-hidden"
        >
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`px-6 py-6 md:py-7 ${i < stats.length - 1 ? "border-r border-neutral-800" : ""} ${i < 2 ? "border-b border-neutral-800 md:border-b-0" : ""}`}
            >
              <p className="text-xl md:text-2xl font-light text-white">{s.value}</p>
              <p className="mt-1 text-xs text-[#7E7A85]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 flex justify-center"
        >
          <a href="#histoire" className="flex flex-col items-center gap-2 text-neutral-600 hover:text-neutral-400 transition">
            <span className="text-xs tracking-widest uppercase">Découvrir</span>
            <span className="block w-px h-8 bg-neutral-700 mx-auto" />
          </a>
        </motion.div>
      </section>

      {/* ── NOTRE APPROCHE ───────────────────────────── */}
      <section id="histoire" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14">
            <p className="text-sm text-[#A9A5B0] mb-16">01 — Notre approche</p>
            <div className="grid md:grid-cols-2 gap-12 md:gap-24">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                Derrière chaque projet,
                <br />
                il y a une <AccentWord>histoire.</AccentWord>
              </h2>
              <div className="md:pt-2">
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                  Avant de créer, nous cherchons à comprendre ce qui rend votre projet unique.
                </p>
                <p className="mt-6 text-[#A9A5B0] leading-relaxed max-w-lg">
                  Une idée, une activité, une vision. iTrame. transforme ce point de départ en une présence pensée autour de vous, plutôt qu&apos;autour d&apos;un modèle déjà fait.
                </p>
                <div className="mt-12 flex items-center gap-4 text-sm text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                  <span>Écouter avant de créer.</span>
                </div>
              </div>
            </div>
            <div className="mt-14 pt-8">
              <DrawLine />
              <div className="mt-6">
                <CtaLink href="#accompagnement" className="text-sm text-neutral-300 hover:text-[#9b7bff]">
                  Découvrir notre accompagnement
                </CtaLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACCOMPAGNEMENT ───────────────────────────── */}
      <section id="accompagnement" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp(0.05)} className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14">
            <p className="text-sm text-[#A9A5B0] mb-8">02 — Accompagnement</p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Un projet ne commence pas
              <br />
              par un <AccentWord>site.</AccentWord>
            </h2>
            <p className="mt-5 text-lg text-neutral-400">Il commence par une rencontre.</p>
            <div className="mt-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  {...fadeUp(index * 0.09)}
                  className="border-t border-neutral-800 py-8 md:py-10"
                >
                  <div className="grid md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-10">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                      <span className="text-sm text-[#7E7A85]">0{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light">{step.title}</h3>
                      <p className="mt-2 text-neutral-400">{step.subtitle}</p>
                    </div>
                    <p className="text-[#A9A5B0] leading-relaxed md:max-w-sm">{step.text}</p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-neutral-800" />
            </div>
            <div className="mt-14">
              <DrawLine />
              <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-lg text-neutral-200">Le premier échange est toujours gratuit.</p>
                  <p className="mt-2 text-sm text-[#A9A5B0]">Appel, visio ou rendez-vous selon votre localisation.</p>
                </div>
                <a href="#contact" className="group w-fit inline-flex items-center gap-2 rounded-full border border-[#9b7bff]/40 px-6 py-3 text-sm transition hover:border-[#9b7bff]">
                  Parler de votre projet
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CRÉATIONS ────────────────────────────────── */}
      <section id="creations" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14">
            <p className="text-sm text-[#A9A5B0] mb-8">03 — Ce que nous créons</p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Des créations pensées
              <br />
              pour votre <AccentWord>projet.</AccentWord>
            </h2>
            <p className="mt-6 text-[#A9A5B0] max-w-xl leading-relaxed">
              Chaque activité a ses propres besoins. Nous construisons autour de votre projet, pas autour d&apos;un modèle imposé.
            </p>
            <div className="mt-20 grid md:grid-cols-2">
              {creations.map((c, index) => (
                <motion.div
                  key={c.title}
                  {...fadeUp(index * 0.09)}
                  className={`py-10 md:p-10 border-neutral-800 ${index < 2 ? "border-b" : ""} ${index % 2 === 0 ? "md:border-r" : ""} ${index >= 2 ? "border-b md:border-b-0" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                    <span className="text-sm text-[#7E7A85]">{c.number}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light">{c.title}</h3>
                  <p className="mt-3 text-[#9b7bff]/80 text-sm tracking-wide">{c.keywords}</p>
                  <p className="mt-4 text-[#A9A5B0] text-sm leading-relaxed">{c.subtitle}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-14 pt-2">
              <DrawLine />
              <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <p className="text-lg md:text-xl font-light">
                  Votre projet n&apos;entre pas dans une case.{" "}
                  <span className="text-[#9b7bff]">Nous créons ce dont il a besoin.</span>
                </p>
                <CtaLink href="#contact" className="text-sm text-neutral-300 hover:text-[#9b7bff]">
                  Imaginer votre projet
                </CtaLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────── */}
      <section id="portfolio" className="py-24 px-6 md:px-10">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp()}>
            <p className="text-sm text-[#A9A5B0] mb-8">05 — Réalisations</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                Des projets construits
                <br />
                autour de chaque <AccentWord>métier.</AccentWord>
              </h2>
              <p className="text-[#A9A5B0] max-w-xs leading-relaxed md:text-right">
                Chaque site a été pensé pour le secteur et les besoins spécifiques du client.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.map((p, index) => (
                <motion.a
                  key={p.number}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp(index * 0.07)}
                  className="group relative rounded-[20px] border border-neutral-800 overflow-hidden flex flex-col min-h-[220px] hover:border-[#9b7bff]/40 transition-all duration-400 cursor-pointer p-7"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${p.accent}22 0%, transparent 70%)` }}
                  />
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-[#7E7A85]">{p.number}</span>
                      <span
                        className="w-2 h-2 rounded-full mt-1 transition-all duration-300 group-hover:scale-150"
                        style={{ backgroundColor: p.accent }}
                      />
                    </div>
                    <div className="mt-auto pt-10">
                      <span className="inline-block text-xs px-3 py-1 rounded-full border border-neutral-700 text-[#A9A5B0] mb-4">
                        {p.tag}
                      </span>
                      <h3 className="text-xl md:text-2xl font-light group-hover:text-white transition">{p.title}</h3>
                      <p className="mt-2 text-sm text-[#7E7A85] leading-relaxed">{p.desc}</p>
                      <div className="mt-5 flex items-center gap-2 text-sm text-neutral-600 group-hover:text-[#9b7bff] transition">
                        Voir le projet
                        <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-12 pt-2">
              <DrawLine />
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-[#A9A5B0]">Chaque projet est une collaboration unique.</p>
                <CtaLink href="#contact" className="text-sm text-neutral-300 hover:text-[#9b7bff]">
                  Construire le vôtre
                </CtaLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORMULES ─────────────────────────────────── */}
      <section id="formules" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14">
            <p className="text-sm text-[#A9A5B0] mb-8">04 — Les formules</p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">
              Une base pour <AccentWord>commencer.</AccentWord>
            </h2>
            <p className="mt-6 text-[#A9A5B0] max-w-2xl leading-relaxed">
              Aucune formule n&apos;est figée. Elles servent de point de départ pour construire quelque chose qui correspond réellement à votre projet.
            </p>
            <div className="mt-16 grid lg:grid-cols-3 gap-4">
              {formulas.map((formula, index) => (
                <motion.div
                  key={formula.title}
                  {...fadeUp(index * 0.1)}
                  className={`rounded-[22px] border p-7 md:p-8 flex flex-col min-h-[430px] transition ${index === 1 ? "border-[#9b7bff]/35" : "border-neutral-800"} hover:border-[#9b7bff]/45`}
                >
                  <div className="flex justify-between">
                    <span className="text-sm text-[#7E7A85]">{formula.number}</span>
                    <span className={`w-2 h-2 rounded-full ${index === 1 ? "bg-[#9b7bff]" : "border border-[#9b7bff]/50"}`} />
                  </div>
                  <div className="mt-10">
                    <h3 className="text-2xl md:text-3xl font-light">{formula.title}</h3>
                    <p className="mt-3 text-neutral-300">{formula.subtitle}</p>
                    <p className="mt-6 text-sm text-[#A9A5B0] leading-relaxed">{formula.text}</p>
                  </div>
                  <div className="mt-10 pt-7 border-t border-neutral-800 space-y-4">
                    {formula.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3 text-sm text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9b7bff]/70" />
                        {detail}
                      </div>
                    ))}
                  </div>
                  <CtaLink href="#contact" className="mt-auto pt-10 text-sm text-neutral-300 hover:text-[#9b7bff]">
                    Demander un devis
                  </CtaLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── À PROPOS ─────────────────────────────────── */}
      <section id="a-propos" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14">
            <p className="text-sm text-[#A9A5B0] mb-14">06 — Qui sommes-nous</p>
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 md:gap-24">
              <div>
                <h2 className="text-3xl md:text-5xl font-light leading-tight">
                  Une approche humaine
                  <br />
                  de la <AccentWord>création.</AccentWord>
                </h2>
                <p className="mt-8 text-lg text-neutral-300 leading-relaxed">
                  Derrière iTrame. se trouve Mattias, médiamaticien passionné par la création web et la communication visuelle.
                </p>
                <p className="mt-5 text-[#A9A5B0] leading-relaxed">
                  Formé au développement de sites web et à la création numérique, il combine technique, design et compréhension du projet pour construire des sites qui ont du sens.
                </p>
              </div>
              <div className="md:border-l md:border-neutral-800 md:pl-12 space-y-9">
                {[
                  ["Médiamaticien", "Création web, communication et contenus numériques."],
                  ["Développement web", "Plusieurs formations certifiées dans la création de sites."],
                  ["Photographie", "Une autre manière de raconter et mettre un projet en valeur."],
                  ["Expérience terrain", "Une expérience photographique ponctuelle dans l'univers sportif avec Keystone."],
                ].map(([title, text]) => (
                  <div key={title}>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                      <p>{title}</p>
                    </div>
                    <p className="mt-2 ml-5 text-sm text-[#A9A5B0]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 pt-2">
              <DrawLine />
              <div className="mt-6 flex justify-between">
                <p className="text-sm text-neutral-400">Une petite structure pour une relation plus proche.</p>
                <CtaLink href="#contact" className="text-sm text-neutral-300 hover:text-[#9b7bff]">
                  Échanger avec iTrame.
                </CtaLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14">
            <p className="text-sm text-[#A9A5B0] mb-12">07 — Contact</p>
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20">
              <div>
                <h2 className="text-3xl md:text-5xl font-light leading-tight">
                  Une idée en tête<span className="text-[#9b7bff]">?</span>
                  <br />
                  Parlons-en.
                </h2>
                <p className="mt-7 text-lg text-neutral-400 leading-relaxed">
                  Votre projet n&apos;a pas besoin d&apos;être parfaitement défini. Quelques mots suffisent pour commencer.
                </p>
                <div className="mt-12 space-y-6">
                  {[
                    ["Appel téléphonique", "Échange simple autour de votre projet."],
                    ["Visioconférence", "Où que vous soyez."],
                    ["Rendez-vous", "En personne selon votre localisation."],
                  ].map(([title, text]) => (
                    <div key={title} className="flex gap-4">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[#9b7bff]" />
                      <div>
                        <p className="text-neutral-200">{title}</p>
                        <p className="mt-1 text-sm text-[#A9A5B0]">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-neutral-800">
                  <p className="text-neutral-200">Rencontre & devis gratuits<span className="text-[#9b7bff]">.</span></p>
                  <p className="mt-2 text-sm text-[#A9A5B0]">Sans engagement.</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="px-6 md:px-10 pb-10 pt-8">
        <div className="max-w-6xl mx-auto border-t border-neutral-800 pt-8 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
          <p className="text-sm font-medium">iTrame<span className="text-[#9b7bff]">.</span></p>
          <p className="text-xs text-[#7E7A85]">Vos idées. Votre histoire. Votre site.</p>
          <p className="text-xs text-[#7E7A85]">© {new Date().getFullYear()} iTrame.</p>
        </div>
      </footer>
    </main>
  );
}
