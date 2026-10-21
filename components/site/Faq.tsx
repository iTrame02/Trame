import { Label, Reveal, SplitHeading } from "./motion";

/* Les questions qu'un client se pose avant d'écrire.
   Réponses volontairement honnêtes et sans chiffres inventés. */
const faq = [
  {
    q: "Combien coûte un site ?",
    a: "Ça dépend de ce dont ton activité a besoin : un site vitrine simple et une boutique en ligne ne demandent pas le même travail. Après un premier échange gratuit, tu reçois un devis clair et détaillé, sans engagement.",
  },
  {
    q: "Combien de temps faut-il ?",
    a: "On fixe ensemble un planning réaliste dès le départ, selon la taille du projet et tes disponibilités pour valider les étapes. Tu sais toujours où on en est.",
  },
  {
    q: "Je n'ai ni textes, ni photos, ni logo. C'est un problème ?",
    a: "Pas du tout. Je t'aide à rédiger les contenus et je peux m'occuper des visuels et de la photographie. Tu n'as besoin que de parler de ton activité.",
  },
  {
    q: "Mon site sera-t-il adapté aux téléphones ?",
    a: "Oui, toujours. La majorité des visiteurs arrivent depuis un téléphone : chaque site est pensé pour le mobile d'abord, puis pour l'ordinateur.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: "Je ne disparais pas. Je reste disponible pour les modifications, les ajouts et les conseils, pour que ton site évolue avec ton activité.",
  },
  {
    q: "On peut se rencontrer ?",
    a: "Bien sûr. Le premier échange peut se faire par téléphone, en visio ou en rendez-vous selon où tu te trouves.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Label index="07">Questions</Label>
          <SplitHeading
            text="Tu te demandes *peut-être…*"
            className="mt-6 font-display text-[clamp(2.25rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-muted">
              Une autre question ?{" "}
              <a href="#contact" className="text-paper underline decoration-paper/25 underline-offset-4 hover:decoration-rose">
                Écris-moi
              </a>
              , je réponds sous 24 à 48 heures.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <div className="border-t border-line">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-medium tracking-[-0.01em] transition-colors hover:text-violet-soft md:py-7 md:text-2xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-[1.5px] before:w-4 before:-translate-y-1/2 before:bg-rose after:absolute after:left-1/2 after:top-0 after:h-4 after:w-[1.5px] after:-translate-x-1/2 after:bg-rose after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-2xl pb-7 text-lg leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
