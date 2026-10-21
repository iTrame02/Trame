import { Label, Reveal, SplitHeading } from "./motion";

const services = [
  {
    title: "Sites vitrines",
    text: "Présenter ton activité avec clarté et caractère. Le site que tu as envie de montrer.",
  },
  {
    title: "Boutiques en ligne",
    text: "Vendre tes produits en ligne, avec paiement intégré et une gestion simple des commandes.",
  },
  {
    title: "Réservations & sur mesure",
    text: "Réservations, agenda, formulaires, outils métier : les fonctionnalités dont ton activité a besoin.",
  },
  {
    title: "Identité visuelle & design",
    text: "Logo, couleurs, photos, visuels : une image cohérente, du site jusqu'aux réseaux.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Label index="02">Services</Label>
        </div>
        <SplitHeading
          text="Tout ce qu'il faut pour donner vie à tes *idées.*"
          className="font-display text-[clamp(1.85rem,4.8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] md:col-span-8"
        />
      </div>

      <ul className="mt-16 border-t border-line md:mt-24">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.06} className="border-b border-line">
            <a
              href="#contact"
              className="group relative grid gap-3 overflow-hidden py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-11"
            >
              {/* Fond qui se tisse au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-ink-2 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <span className="relative font-display text-sm text-faint md:col-span-1 md:pl-4">0{i + 1}</span>
              <span className="relative flex items-center md:col-span-6 md:gap-4">
                <span
                  aria-hidden="true"
                  className="hidden h-3 w-0 bg-rose transition-all duration-500 md:block ease-out-expo group-hover:w-3"
                />
                <span className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-5xl">{s.title}</span>
              </span>
              <span className="relative text-muted md:col-span-4">{s.text}</span>
              <span
                aria-hidden="true"
                className="relative hidden justify-self-end pr-4 font-display text-2xl text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-rose md:col-span-1 md:block"
              >
                →
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
