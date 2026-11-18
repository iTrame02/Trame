import Hero from "@/components/site/Hero";
import PageTransition from "@/components/site/PageTransition";
import Process from "@/components/site/Process";
import { SelectedWork } from "@/components/site/Projects";
import Services from "@/components/site/Services";

/* Accueil : l'essentiel, vite. Le détail vit sur les autres pages. */
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <SelectedWork />
      <Services />
      <Process />
    </PageTransition>
  );
}
