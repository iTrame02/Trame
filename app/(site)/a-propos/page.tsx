import type { Metadata } from "next";
import About from "@/components/site/About";
import PageTransition from "@/components/site/PageTransition";
import Why from "@/components/site/Why";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Mattias, fondateur d'iTrame. : un seul interlocuteur, du premier échange à la mise en ligne. Des sites sur mesure pour les indépendants et commerces de Suisse romande.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <PageTransition>
      <About />
      <Why />
    </PageTransition>
  );
}
