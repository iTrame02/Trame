/* Portfolio iTrame.
   Pour ajouter un projet : copie un bloc, mets la capture dans
   /public/projets/ (1200 × 717 px environ) et complète les champs.
   `concept: true` affiche la mention « Projet concept ». */

export type Project = {
  slug: string;
  name: string;
  category: string;
  place: string;
  description: string;
  image: string;
  url?: string;
  concept?: boolean;
};

export const projects: Project[] = [
  {
    slug: "restaurantdutennis",
    name: "Restaurant du Tennis",
    category: "Restaurant · Pizzeria",
    place: "Morges",
    description: "Le restaurant du Tennis Club de Morges : menu du moment, carte, pizzas au feu de bois, banquets et réservation.",
    image: "/projets/restaurantdutennis.jpg",
    url: "https://www.restaurantdutennis.ch",
  },
  {
    slug: "lheurebleu",
    name: "L'Heure Bleue",
    category: "Bar à cocktails",
    place: "Lausanne",
    description: "Une ambiance du Léman qui s'anime au crépuscule, une carte interactive et la réservation de table.",
    image: "/projets/lheurebleu.jpg",
    url: "https://lheurebleu.netlify.app",
    concept: true,
  },
  {
    slug: "nmluxury",
    name: "N&M Luxury",
    category: "Location automobile premium",
    place: "Suisse",
    description: "Un univers immersif pour la location et la vente de véhicules d'exception.",
    image: "/projets/nmluxury.jpg",
    url: "https://nmluxury.netlify.app",
  },
  {
    slug: "physiotherapeute",
    name: "Physio Pré-du-Château",
    category: "Cabinet de physiothérapie",
    place: "Yverdon-les-Bains",
    description: "Un site clair et rassurant : prestations, équipe, remboursement et rendez-vous en ligne.",
    image: "/projets/physiotherapeute.jpg",
    url: "https://physiotherapeute.netlify.app",
  },
  {
    slug: "braisecaf",
    name: "Braise",
    category: "E-commerce · Torréfacteur",
    place: "Neuchâtel",
    description: "Une boutique de cafés de spécialité avec abonnements et livraison dans toute la Suisse.",
    image: "/projets/braisecaf.jpg",
    url: "https://braisecaf.netlify.app",
    concept: true,
  },
  {
    slug: "sabrebarber",
    name: "Sabre",
    category: "Barbier · Réservation",
    place: "Carouge",
    description: "Choisir son barbier et son créneau en trente secondes, en français ou en anglais.",
    image: "/projets/sabrebarber.jpg",
    url: "https://sabrebarber.netlify.app",
    concept: true,
  },
  {
    slug: "cendreetgrs",
    name: "Grès & Cendre",
    category: "Atelier de céramique",
    place: "Vevey",
    description: "Des ateliers à réserver et une boutique de pièces en grès, dans une esthétique artisanale.",
    image: "/projets/cendreetgrs.jpg",
    url: "https://cendreetgrs.netlify.app",
  },
];
