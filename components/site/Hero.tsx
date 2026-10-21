import ProjectPreview from "./ProjectPreview";
import TrameCanvas from "./TrameCanvas";

/* Mots du titre. « m » = retour à la ligne sur mobile seulement,
   « d » = retour à la ligne à partir de la tablette. */
const words = ["Ton", "activité", "m", "mérite", "d", "un", "m", "site", "qui"];

const audience = ["Indépendants", "Restaurants", "Commerces", "Petites entreprises"];

/* Le hero est rendu côté serveur et animé en CSS :
   le titre s'affiche immédiatement, même avant le JS. */
export default function Hero() {
  let n = 0;
  const wordDelay = () => `${0.25 + n++ * 0.07}s`;

  return (
    <section id="accueil" className="relative overflow-hidden">
      <TrameCanvas className="trame-mask absolute inset-0 h-full w-full" />

      <div className="relative mx-auto max-w-[88rem] px-5 pt-24 pb-8 md:px-10 md:pt-32 md:pb-12">
        <div
          className="anim-fade-up mb-8 flex items-center justify-between font-display text-sm text-muted md:mb-10"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="flex items-center gap-3">
            <span className="h-2 w-2 bg-rose" aria-hidden="true" />
            Studio web suisse
          </p>
          <p className="hidden md:block">{audience.join(" · ")}</p>
        </div>

        <h1
          className="font-display text-[clamp(2.75rem,7.4vw,7.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          aria-label="Ton activité mérite un site qui se démarque."
        >
          <span aria-hidden="true">
            {words.map((w, i) =>
              w === "m" ? (
                <br key={i} className="sm:hidden" />
              ) : w === "d" ? (
                <br key={i} className="hidden sm:inline" />
              ) : (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                  <span className="anim-rise" style={{ animationDelay: wordDelay() }}>
                    {w}
                    {" "}
                  </span>
                </span>
              )
            )}
          </span>
          {/* « se démarque. » sort littéralement de l'alignement */}
          <span
            aria-hidden="true"
            className="anim-stand-out block w-fit [--offset:1.25rem] sm:[--offset:12vw] lg:[--offset:22vw]"
            style={{ animationDelay: "1.05s" }}
          >
            <span className="relative inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
              <span className="anim-rise text-violet-soft" style={{ animationDelay: wordDelay() }}>
                se&nbsp;démarque.
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-14 md:mt-8 md:grid-cols-12 md:gap-10">
          <div className="min-w-0 md:col-span-5 md:pt-16">
            <p
              className="anim-fade-up max-w-md text-lg leading-relaxed text-muted md:text-xl"
              style={{ animationDelay: "1.1s" }}
            >
              Des sites web uniques, modernes et pensés pour faire grandir ton activité.{" "}
              <span className="text-paper">Sans complication, sans mauvaise surprise.</span>
            </p>

            <div className="anim-fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "1.25s" }}>
              <a
                href="#contact"
                className="group inline-flex items-center justify-between gap-6 bg-violet px-6 py-4 font-semibold transition-colors hover:bg-paper hover:text-ink"
              >
                Parlons de ton projet
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
              <a
                href="#projets"
                className="group inline-flex items-center justify-between gap-6 border border-paper/25 bg-ink/40 px-6 py-4 font-semibold backdrop-blur-sm transition-colors hover:border-paper"
              >
                Découvrir nos projets
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>

            <ul className="anim-fade-up mt-10 space-y-2 text-sm text-muted" style={{ animationDelay: "1.4s" }}>
              <li className="flex items-center gap-3"><span className="text-rose">—</span> Premier échange gratuit et sans engagement</li>
              <li className="flex items-center gap-3"><span className="text-rose">—</span> Réponse sous 24 à 48 heures</li>
              <li className="flex items-center gap-3"><span className="text-rose">—</span> Un seul interlocuteur, du début à la fin</li>
            </ul>
          </div>

          <div className="anim-fade-up min-w-0 md:col-span-7" style={{ animationDelay: "0.9s" }}>
            <ProjectPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
