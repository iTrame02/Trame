import type { Metadata } from "next";
import Contact from "@/components/site/Contact";
import PageTransition from "@/components/site/PageTransition";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parle-moi de ton projet : réponse sous 24 à 48 heures, maquette gratuite et sans engagement. Par téléphone, e-mail ou formulaire.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Contact />
    </PageTransition>
  );
}
