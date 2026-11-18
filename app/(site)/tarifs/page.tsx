import type { Metadata } from "next";
import Faq from "@/components/site/Faq";
import Formulas from "@/components/site/Formulas";
import PageTransition from "@/components/site/PageTransition";

export const metadata: Metadata = {
  title: "Tarifs & questions",
  description:
    "Trois formules pour démarrer : Essentiel, Sur mesure, Signature. Maquette gratuite et devis clair avant de t'engager. Toutes les réponses sur les prix, les délais et le suivi.",
  alternates: { canonical: "/tarifs" },
};

export default function TarifsPage() {
  return (
    <PageTransition>
      <Formulas />
      <Faq />
    </PageTransition>
  );
}
