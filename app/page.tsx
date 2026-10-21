import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Projects from "@/components/site/Projects";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import Why from "@/components/site/Why";
import Formulas from "@/components/site/Formulas";
import About from "@/components/site/About";
import Faq from "@/components/site/Faq";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import MobileCta from "@/components/site/MobileCta";

export default function Home() {
  return (
    <>
      {/* La trame : grille de 12 colonnes en filigrane */}
      <div className="trame-grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={i >= 4 ? "hidden md:block" : ""} />
        ))}
      </div>

      <a
        href="#contact"
        className="sr-only z-[80] bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au formulaire de contact
      </a>

      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Projects />
        <Services />
        <Process />
        <Why />
        <Formulas />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
