/* Portfolio iTrame.
   Pour ajouter un projet : copie un bloc et place dans /public/projets/
   trois captures nommées d'après le slug :
   - {slug}-desktop.jpg : écran d'accueil, 1440 × 900 en ×2 (format 16:10)
   - {slug}-mobile.jpg  : écran d'accueil sur téléphone, 390 × 844 en ×2 ou ×3
   - {slug}-full.jpg    : page complète (1200 px de large), défile au survol
   `concept: true` affiche la mention « Projet concept ». */

export type Project = {
  slug: string;
  name: string;
  category: string;
  place: string;
  description: string;
  url?: string;
  concept?: boolean;
};

export const img = (slug: string, kind: "desktop" | "mobile" | "full") => `/projets/${slug}-${kind}.jpg`;

/* Le projet phare, mis en avant dans sa propre section */
export const featured = {
  slug: "restaurantdutennis",
  name: "Restaurant du Tennis",
  place: "Morges",
  url: "https://www.restaurantdutennis.ch",
  category: "Restaurant · Pizzeria",
  intro: "Le restaurant du Tennis Club de Morges, au bord des courts et à deux pas du lac.",
  highlight: "Une adresse incontournable, un site à sa hauteur.",
  built: [
    "Menu du moment mis en avant",
    "Carte et pizzas au feu de bois",
    "Banquets et événements",
    "Galerie photo",
    "Réservation de table en un geste",
    "Pensé d'abord pour le téléphone",
  ],
  shots: [
    { src: "/projets/restaurantdutennis-menu.jpg", alt: "Le menu du moment sur le site du Restaurant du Tennis" },
    { src: "/projets/restaurantdutennis-cuisine.jpg", alt: "La section cuisine du site du Restaurant du Tennis" },
    { src: "/projets/restaurantdutennis-restaurant.jpg", alt: "La présentation du restaurant sur le site du Restaurant du Tennis" },
  ],
};

export const projects: Project[] = [
  {
    slug: "lheurebleu",
    name: "L'Heure Bleue",
    category: "Bar à cocktails",
    place: "Lausanne",
    description: "Une ambiance du Léman qui s'anime au crépuscule, une carte interactive et la réservation de table.",
    url: "https://lheurebleu.netlify.app",
    concept: true,
  },
  {
    slug: "nmluxury",
    name: "N&M Luxury",
    category: "Location automobile premium",
    place: "Suisse",
    description: "Un univers immersif pour la location et la vente de véhicules d'exception.",
    url: "https://nmluxury.netlify.app",
  },
  {
    slug: "physiotherapeute",
    name: "Physio Pré-du-Château",
    category: "Cabinet de physiothérapie",
    place: "Yverdon-les-Bains",
    description: "Un site clair et rassurant : prestations, équipe, remboursement et rendez-vous en ligne.",
    url: "https://physiotherapeute.netlify.app",
  },
  {
    slug: "braisecaf",
    name: "Braise",
    category: "E-commerce · Torréfacteur",
    place: "Neuchâtel",
    description: "Une boutique de cafés de spécialité avec abonnements et livraison dans toute la Suisse.",
    url: "https://braisecaf.netlify.app",
    concept: true,
  },
  {
    slug: "sabrebarber",
    name: "Sabre",
    category: "Barbier · Réservation",
    place: "Carouge",
    description: "Choisir son barbier et son créneau en trente secondes, en français ou en anglais.",
    url: "https://sabrebarber.netlify.app",
    concept: true,
  },
  {
    slug: "cendreetgrs",
    name: "Grès & Cendre",
    category: "Atelier de céramique",
    place: "Vevey",
    description: "Des ateliers à réserver et une boutique de pièces en grès, dans une esthétique artisanale.",
    url: "https://cendreetgrs.netlify.app",
  },
];

/* Pour l'aperçu animé du hero : le projet phare d'abord */
export const previewProjects = [
  { slug: featured.slug, name: featured.name, place: featured.place, category: featured.category, url: featured.url },
  ...projects,
];
