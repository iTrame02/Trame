import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import PageTransition from "@/components/site/PageTransition";
import { ProjectsShowcase } from "@/components/site/Projects";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Restaurants, photographes, bars, cabinets, boutiques : les sites créés par iTrame. en Suisse romande. Chaque site est pensé sur mesure, pour le téléphone d'abord.",
  alternates: { canonical: "/projets" },
};

export default function ProjetsPage() {
  return (
    <PageTransition>
      <PageHeader
        label="Projets"
        title="Des idées devenues *réalité.*"
        intro={
          <>
            Chaque site est construit autour d&apos;un métier, d&apos;une ambiance et de vrais besoins.{" "}
            <span className="hidden md:inline">Survole un écran pour parcourir le site.</span>
          </>
        }
      />
      <ProjectsShowcase />
    </PageTransition>
  );
}
