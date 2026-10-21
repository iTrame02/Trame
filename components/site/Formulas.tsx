import { Label, Reveal, SplitHeading } from "./motion";

const formulas = [
  {
    letter: "S",
    title: "Essentiel",
    pitch: "Pour être visible, vite et bien.",
    details: ["Site personnalisé", "Pages essentielles", "Présentation de ton activité", "Prise de contact"],
  },
  {
    letter: "M",
    title: "Sur mesure",
    pitch: "Pour aller plus loin.",
    details: ["Structure plus complète", "Fonctionnalités personnalisées", "Réservations ou événements", "Accompagnement renforcé"],
    featured: true,
  },
  {
    letter: "L",
    title: "Signature",
    pitch: "Un univers complet.",
    details: ["Création sur mesure", "Photographie & visuels", "Fonctionnalités avancées", "Accompagnement complet"],
  },
];

export default function Formulas() {
  return (
    <section id="formules" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label index="05">Formules</Label>
          <SplitHeading
            text="Une base pour *commencer.*"
            className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
        </div>
        <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
          <p className="text-muted">
            Aucune formule n&apos;est figée : c&apos;est un point de départ. On ajuste ensemble, et tu reçois un devis clair avant
            de t&apos;engager.
          </p>
        </Reveal>
      </div>

      {/* Trois colonnes séparées par des filets, pas des cartes */}
      <div className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-3">
        {formulas.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 0.08}
            className={`group relative flex flex-col border-b border-line py-10 md:border-b-0 md:px-8 md:py-12 ${
              i > 0 ? "md:border-l" : ""
            } ${i === 0 ? "md:pl-0" : ""}`}
          >
            {f.featured && (
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-[3px] bg-violet md:inset-x-8" />
            )}
            <div className="flex items-baseline justify-between">
              <span className="font-display text-7xl font-bold tracking-[-0.06em] text-violet-soft md:text-8xl">{f.letter}</span>
              {f.featured && <span className="font-display text-xs text-rose">Le bon équilibre</span>}
            </div>
            <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">{f.title}</h3>
            <p className="mt-2 text-muted">{f.pitch}</p>
            <ul className="mt-8 space-y-3 md:mb-10">
              {f.details.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 bg-rose" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`group/btn mt-10 inline-flex items-center justify-between gap-6 px-6 py-4 font-semibold transition-colors md:mt-auto ${
                f.featured ? "bg-violet hover:bg-paper hover:text-ink" : "border border-paper/25 hover:border-paper"
              }`}
            >
              Demander un devis gratuit
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
