import Cursor from "@/components/site/Cursor";
import Footer from "@/components/site/Footer";
import Intro from "@/components/site/Intro";
import MobileCta from "@/components/site/MobileCta";
import Nav from "@/components/site/Nav";

/* Habillage commun à toutes les pages du site */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Intro />

      {/* La trame : grille de 12 colonnes en filigrane */}
      <div className="trame-grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={i >= 4 ? "hidden md:block" : ""} />
        ))}
      </div>

      <a
        href="#contenu"
        className="sr-only z-[80] bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>

      <Nav />
      <main id="contenu" className="relative z-10">
        {children}
      </main>
      <Footer />
      <MobileCta />
      <Cursor />
    </>
  );
}
