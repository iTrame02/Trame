"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

const steps = [
  {
    title: "Comprendre.",
    subtitle: "Découvrir votre univers.",
    text: "Votre activité, votre histoire, vos besoins.",
  },
  {
    title: "Imaginer.",
    subtitle: "Donner une direction à vos idées.",
    text: "Construire ensemble une vision qui vous ressemble.",
  },
  {
    title: "Créer.",
    subtitle: "Donner vie à votre projet.",
    text: "Transformer cette vision en un site pensé pour vous.",
  },
  {
    title: "Évoluer.",
    subtitle: "Continuer à construire ensemble.",
    text: "Rester présent après la mise en ligne et faire évoluer votre projet.",
  },
];

const creations = [
  {
    number: "01",
    title: "Sites web.",
    subtitle: "Une présence qui vous ressemble.",
    text: "Des sites pensés autour de votre activité, de votre image et de vos besoins.",
  },
  {
    number: "02",
    title: "Fonctionnalités sur mesure.",
    subtitle: "Des outils adaptés à votre projet.",
    text: "Boutique, réservations, billetterie, paiements, formulaires et bien plus.",
  },
  {
    number: "03",
    title: "Image & contenu.",
    subtitle: "Montrer ce qui vous rend unique.",
    text: "Photographie, visuels et contenus pensés pour mettre votre activité en valeur.",
  },
  {
    number: "04",
    title: "Projets personnalisés.",
    subtitle: "Parce que chaque idée est différente.",
    text: "Votre projet sort du cadre classique ? Nous construisons autour de lui.",
  },
];

const formulas = [
  {
    number: "S",
    title: "Essentiel.",
    subtitle: "Pour commencer.",
    text: "Une présence en ligne claire et professionnelle pour présenter votre activité.",
    details: [
      "Site personnalisé",
      "Pages essentielles",
      "Présentation de votre activité",
      "Prise de contact",
    ],
  },
  {
    number: "M",
    title: "Sur mesure.",
    subtitle: "Pour aller plus loin.",
    text: "Un site construit autour de vos besoins avec davantage de possibilités.",
    details: [
      "Structure plus complète",
      "Fonctionnalités personnalisées",
      "Réservations ou événements",
      "Accompagnement renforcé",
    ],
  },
  {
    number: "L",
    title: "Signature.",
    subtitle: "Une vision complète.",
    text: "Une approche globale pour construire un univers cohérent autour de votre projet.",
    details: [
      "Création sur mesure",
      "Photographie & visuels",
      "Fonctionnalités avancées",
      "Accompagnement complet",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-medium tracking-tight"
          >
            iTrame<span className="text-[#9b7bff]">.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 text-2xl md:text-4xl font-light tracking-tight"
          >
            Vos idées. Votre histoire. Votre site.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-neutral-400 text-lg leading-relaxed"
          >
            Nous prenons le temps de comprendre votre projet afin de créer
            un site qui vous ressemble réellement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="#contact"
              className="px-7 py-3 rounded-full bg-[#9b7bff] text-black font-medium hover:opacity-90 transition"
            >
              Parlons de votre projet
            </a>

            <a
              href="#histoire"
              className="px-7 py-3 rounded-full border border-neutral-700 hover:border-neutral-400 transition"
            >
              Découvrir notre approche
            </a>
          </motion.div>
        </div>
      </section>

      {/* NOTRE APPROCHE */}
      <section
        id="histoire"
        className="min-h-screen flex items-center px-6 md:px-10 py-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
            className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14"
          >
            <p className="text-sm text-[#A9A5B0] mb-16">
              01 — Notre approche
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                Derrière chaque projet,
                <br />
                il y a une{" "}
                <span className="text-[#9b7bff]">histoire.</span>
              </h2>

              <div className="md:pt-2">
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                  Avant de créer, nous cherchons à comprendre ce qui rend
                  votre projet unique.
                </p>

                <p className="mt-6 text-[#A9A5B0] leading-relaxed max-w-lg">
                  Une idée, une activité, une vision. iTrame. transforme ce
                  point de départ en une présence pensée autour de vous,
                  plutôt qu&apos;autour d&apos;un modèle déjà fait.
                </p>

                <div className="mt-12 flex items-center gap-4 text-sm text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                  <span>Écouter avant de créer.</span>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-neutral-800">
              <a
                href="#accompagnement"
                className="inline-flex items-center gap-3 text-sm text-neutral-300 transition hover:text-[#9b7bff]"
              >
                Découvrir notre accompagnement →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ACCOMPAGNEMENT */}
      <section
        id="accompagnement"
        className="min-h-screen flex items-center px-6 md:px-10 py-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14"
          >
            <p className="text-sm text-[#A9A5B0] mb-8">
              02 — Accompagnement
            </p>

            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Un projet ne commence pas
              <br />
              par un site<span className="text-[#9b7bff]">.</span>
            </h2>

            <p className="mt-5 text-lg text-neutral-400">
              Il commence par une rencontre.
            </p>

            <div className="mt-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="border-t border-neutral-800 py-8 md:py-10"
                >
                  <div className="grid md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-10">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                      <span className="text-sm text-[#7E7A85]">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-light">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-neutral-400">{step.subtitle}</p>
                    </div>

                    <p className="text-[#A9A5B0] leading-relaxed md:max-w-sm">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}

              <div className="border-t border-neutral-800" />
            </div>

            <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-lg text-neutral-200">
                  Le premier échange est toujours gratuit.
                </p>
                <p className="mt-2 text-sm text-[#A9A5B0]">
                  Appel, visioconférence ou rendez-vous selon votre localisation.
                </p>
              </div>

              <a
                href="#contact"
                className="w-fit rounded-full border border-[#9b7bff]/40 px-6 py-3 text-sm transition hover:border-[#9b7bff]"
              >
                Parler de votre projet
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CREATIONS */}
      <section
        id="creations"
        className="min-h-screen flex items-center px-6 md:px-10 py-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14"
          >
            <p className="text-sm text-[#A9A5B0] mb-8">
              03 — Ce que nous créons
            </p>

            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Des créations pensées
              <br />
              pour votre projet<span className="text-[#9b7bff]">.</span>
            </h2>

            <p className="mt-6 text-[#A9A5B0] max-w-xl leading-relaxed">
              Chaque activité a ses propres besoins. Nous construisons autour
              de votre projet, pas autour d&apos;un modèle imposé.
            </p>

            <div className="mt-20 grid md:grid-cols-2">
              {creations.map((creation, index) => (
                <motion.div
                  key={creation.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className={`
                    py-10 md:p-10 border-neutral-800
                    ${index < 2 ? "border-b" : ""}
                    ${index % 2 === 0 ? "md:border-r" : ""}
                    ${index >= 2 ? "border-b md:border-b-0" : ""}
                  `}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                    <span className="text-sm text-[#7E7A85]">
                      {creation.number}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-light">
                    {creation.title}
                  </h3>

                  <p className="mt-3 text-neutral-300">
                    {creation.subtitle}
                  </p>

                  <p className="mt-6 text-[#A9A5B0] leading-relaxed max-w-md">
                    {creation.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-lg md:text-xl font-light">
                Votre projet n&apos;entre pas dans une case.{" "}
                <span className="text-[#9b7bff]">
                  Nous créons ce dont il a besoin.
                </span>
              </p>

              <a
                href="#contact"
                className="text-sm text-neutral-300 hover:text-[#9b7bff] transition"
              >
                Imaginer votre projet →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORMULES */}
      <section
        id="formules"
        className="min-h-screen flex items-center px-6 md:px-10 py-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14"
          >
            <p className="text-sm text-[#A9A5B0] mb-8">
              04 — Les formules
            </p>

            <h2 className="text-3xl md:text-5xl font-light tracking-tight">
              Une base pour commencer<span className="text-[#9b7bff]">.</span>
            </h2>

            <p className="mt-6 text-[#A9A5B0] max-w-2xl leading-relaxed">
              Aucune formule n&apos;est figée. Elles servent de point de départ
              pour construire quelque chose qui correspond réellement à votre projet.
            </p>

            <div className="mt-16 grid lg:grid-cols-3 gap-4">
              {formulas.map((formula, index) => (
                <motion.div
                  key={formula.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                  className={`rounded-[22px] border p-7 md:p-8 flex flex-col min-h-[430px] transition ${
                    index === 1
                      ? "border-[#9b7bff]/35"
                      : "border-neutral-800"
                  } hover:border-[#9b7bff]/45`}
                >
                  <div className="flex justify-between">
                    <span className="text-sm text-[#7E7A85]">
                      {formula.number}
                    </span>

                    <span
                      className={`w-2 h-2 rounded-full ${
                        index === 1
                          ? "bg-[#9b7bff]"
                          : "border border-[#9b7bff]/50"
                      }`}
                    />
                  </div>

                  <div className="mt-10">
                    <h3 className="text-2xl md:text-3xl font-light">
                      {formula.title}
                    </h3>
                    <p className="mt-3 text-neutral-300">{formula.subtitle}</p>
                    <p className="mt-6 text-sm text-[#A9A5B0] leading-relaxed">
                      {formula.text}
                    </p>
                  </div>

                  <div className="mt-10 pt-7 border-t border-neutral-800 space-y-4">
                    {formula.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-3 text-sm text-neutral-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9b7bff]/70" />
                        {detail}
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="mt-auto pt-10 text-sm text-neutral-300 hover:text-[#9b7bff] transition"
                  >
                    Demander un devis →
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section
        id="a-propos"
        className="min-h-screen flex items-center px-6 md:px-10 py-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14"
          >
            <p className="text-sm text-[#A9A5B0] mb-14">
              05 — Qui sommes-nous
            </p>

            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 md:gap-24">
              <div>
                <h2 className="text-3xl md:text-5xl font-light leading-tight">
                  Une approche humaine
                  <br />
                  de la création<span className="text-[#9b7bff]">.</span>
                </h2>

                <p className="mt-8 text-lg text-neutral-300 leading-relaxed">
                  Derrière iTrame. se trouve Mattias, médiamaticien passionné
                  par la création web et la communication visuelle.
                </p>

                <p className="mt-5 text-[#A9A5B0] leading-relaxed">
                  Formé au développement de sites web et à la création
                  numérique, il combine technique, design et compréhension
                  du projet pour construire des sites qui ont du sens.
                </p>
              </div>

              <div className="md:border-l md:border-neutral-800 md:pl-12 space-y-9">
                {[
                  ["Médiamaticien", "Création web, communication et contenus numériques."],
                  ["Développement web", "Plusieurs formations certifiées dans la création de sites."],
                  ["Photographie", "Une autre manière de raconter et mettre un projet en valeur."],
                  ["Expérience terrain", "Une expérience photographique ponctuelle dans l’univers sportif avec Keystone."],
                ].map(([title, text]) => (
                  <div key={title}>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#9b7bff]" />
                      <p>{title}</p>
                    </div>

                    <p className="mt-2 ml-5 text-sm text-[#A9A5B0]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-800 flex justify-between">
              <p className="text-sm text-neutral-400">
                Une petite structure pour une relation plus proche.
              </p>

              <a
                href="#contact"
                className="text-sm text-neutral-300 hover:text-[#9b7bff] transition"
              >
                Échanger avec iTrame. →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="min-h-screen flex items-center px-6 md:px-10 py-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[28px] border border-[#9b7bff]/25 px-7 py-10 md:px-14 md:py-14"
          >
            <p className="text-sm text-[#A9A5B0] mb-12">
              06 — Contact
            </p>

            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20">
              {/* GAUCHE */}
              <div>
                <h2 className="text-3xl md:text-5xl font-light leading-tight">
                  Une idée en tête<span className="text-[#9b7bff]">?</span>
                  <br />
                  Parlons-en.
                </h2>

                <p className="mt-7 text-lg text-neutral-400 leading-relaxed">
                  Votre projet n&apos;a pas besoin d&apos;être parfaitement défini.
                  Quelques mots suffisent pour commencer.
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
                  <p className="text-neutral-200">
                    Rencontre & devis gratuits<span className="text-[#9b7bff]">.</span>
                  </p>

                  <p className="mt-2 text-sm text-[#A9A5B0]">
                    Sans engagement.
                  </p>
                </div>
              </div>

              {/* FORMULAIRE */}
              <ContactForm />
          
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-10 pb-10 pt-8">
        <div className="max-w-6xl mx-auto border-t border-neutral-800 pt-8 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
          <p className="text-sm font-medium">
          iTrame<span className="text-[#9b7bff]">.</span>
          </p>

          <p className="text-xs text-[#7E7A85]">
            Vos idées. Votre histoire. Votre site.
          </p>

          <p className="text-xs text-[#7E7A85]">
            © {new Date().getFullYear()} iTrame.
          </p>
        </div>
      </footer>
    </main>
  );
}