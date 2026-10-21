const links = [
  { href: "#projets", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-[88rem] overflow-hidden px-5 pt-16 pb-28 md:px-10 md:pb-12">
      <div className="grid gap-10 border-t border-line pt-10 text-sm md:grid-cols-12">
        <p className="text-muted md:col-span-4">
          Studio web suisse.
          <br />
          Des sites uniques pour les indépendants, restaurants, commerces et petites entreprises.
        </p>
        <nav aria-label="Liens du pied de page" className="md:col-span-3 md:col-start-7">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <a href="mailto:contact@itrame.ch" className="text-paper underline decoration-paper/20 underline-offset-4 transition hover:decoration-rose">
            contact@itrame.ch
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-16 select-none whitespace-nowrap font-display text-[min(calc((100vw_-_2.5rem)/3.05),27rem)] font-bold leading-[0.8] tracking-[-0.07em] md:mt-24 md:text-[min(calc((100vw_-_5rem)/3.05),27rem)]"
      >
        iTrame<span className="text-violet">.</span>
      </p>

      <div className="mt-8 flex flex-col gap-2 text-xs text-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} iTrame. Tous droits réservés.</p>
        <p>Tes idées. Ton histoire. Ton site.</p>
      </div>
    </footer>
  );
}
