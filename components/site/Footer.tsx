import Link from "next/link";
import FooterCta from "./FooterCta";
import Logo from "./Logo";
import TrameCanvas from "./TrameCanvas";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/tarifs", label: "Tarifs & questions" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pb-28 md:pb-10">
      {/* La trame revient pour fermer la page, comme elle l'a ouverte */}
      <TrameCanvas className="trame-mask absolute inset-0 h-full w-full opacity-60" />

      <div className="relative mx-auto max-w-[88rem] px-5 pt-20 md:px-10 md:pt-28">
        <FooterCta />

        <div className="grid gap-10 border-t border-line pt-10 text-sm md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-3xl font-semibold tracking-tight" aria-label="iTrame., accueil">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-muted">
              Studio web suisse. Des sites uniques pour les indépendants, restaurants, commerces et petites entreprises.
            </p>
          </div>
          <nav aria-label="Liens du pied de page" className="md:col-span-3 md:col-start-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition hover:text-paper">
                    {l.label}
                  </Link>
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
