import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import Logo from "./Logo";
import TrameCanvas from "./TrameCanvas";

const links = [
  { href: "#projets", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#formules", label: "Formules" },
  { href: "#faq", label: "Questions" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pb-28 md:pb-10">
      {/* La trame revient pour fermer la page, comme elle l'a ouverte */}
      <TrameCanvas className="trame-mask absolute inset-0 h-full w-full opacity-60" />

      <div className="relative mx-auto max-w-[88rem] px-5 pt-20 md:px-10 md:pt-28">
        <p className="max-w-4xl font-display text-[clamp(2rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Ton site mérite mieux qu&apos;un modèle. <span className="whitespace-nowrap text-violet-soft">Parlons-en.</span>
        </p>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
          <a
            href={`tel:${PHONE_TEL}`}
            className="group flex items-center justify-between border border-line bg-ink/70 px-6 py-6 backdrop-blur-sm transition-colors hover:border-violet md:px-8 md:py-8"
          >
            <span>
              <span className="block font-display text-sm text-faint">Appelle-moi</span>
              <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.02em] md:text-4xl">{PHONE_DISPLAY}</span>
            </span>
            <span aria-hidden="true" className="font-display text-2xl text-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-rose">↑</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center justify-between border border-line bg-ink/70 px-6 py-6 backdrop-blur-sm transition-colors hover:border-violet md:px-8 md:py-8"
          >
            <span className="min-w-0">
              <span className="block font-display text-sm text-faint">Écris-moi</span>
              <span className="mt-1 block truncate font-display text-2xl font-semibold tracking-[-0.02em] md:text-4xl">{EMAIL}</span>
            </span>
            <span aria-hidden="true" className="font-display text-2xl text-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-rose">↑</span>
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 text-sm md:mt-28 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#accueil" className="font-display text-3xl font-bold tracking-tight" aria-label="iTrame., retour en haut">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-muted">
              Studio web suisse. Des sites uniques pour les indépendants, restaurants, commerces et petites entreprises.
            </p>
          </div>
          <nav aria-label="Liens du pied de page" className="md:col-span-3 md:col-start-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted transition hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-2 text-muted md:col-span-3">
            <p className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-rose" aria-hidden="true" />Maquette gratuite</p>
            <p className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-rose" aria-hidden="true" />Livré en 5 à 7 jours</p>
            <p className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-rose" aria-hidden="true" />Réponse sous 24 à 48 h</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-xs text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} iTrame. Tous droits réservés.</p>
          <p>Tes idées. Ton histoire. Ton site.</p>
        </div>
      </div>
    </footer>
  );
}
