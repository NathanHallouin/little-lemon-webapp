export interface MetaConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogType: string;
  twitterCard: string;
  canonicalUrl?: string;
}

export const defaultMeta: MetaConfig = {
  title: "Little Lemon - Restaurant Méditerranéen à Orléans",
  description: "Restaurant méditerranéen authentique à Orléans. Découvrez nos plats frais, notre ambiance chaleureuse et notre cuisine traditionnelle.",
  keywords: ["restaurant", "méditerranéen", "orléans", "cuisine", "gastronomie", "little lemon", "plats frais"],
  ogImage: "/logo.jpg",
  ogType: "website",
  twitterCard: "summary_large_image"
};

export const pageMeta: Record<string, MetaConfig> = {
  home: {
    title: "Little Lemon - Restaurant Méditerranéen à Orléans",
    description: "Restaurant méditerranéen authentique à Orléans. Découvrez nos plats frais, notre ambiance chaleureuse et notre cuisine traditionnelle.",
    keywords: ["restaurant", "méditerranéen", "orléans", "cuisine", "gastronomie", "little lemon", "plats frais"],
    ogImage: "/logo.jpg",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  about: {
    title: "À propos - Little Lemon Restaurant",
    description: "Découvrez l'histoire de Little Lemon, notre passion pour la cuisine méditerranéenne et notre équipe dévouée à Orléans.",
    keywords: ["à propos", "histoire", "équipe", "little lemon", "orléans", "restaurant"],
    ogImage: "/logo.jpg",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  menu: {
    title: "Menu - Little Lemon Restaurant",
    description: "Explorez notre carte du jour avec des plats méditerranéens authentiques, des entrées fraîches et des desserts maison.",
    keywords: ["menu", "carte", "plats", "méditerranéen", "entrées", "desserts", "little lemon"],
    ogImage: "/logo.jpg",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  reservations: {
    title: "Réserver une table - Little Lemon Restaurant",
    description: "Réservez votre table au Little Lemon. Service en ligne simple et rapide pour votre expérience gastronomique à Orléans.",
    keywords: ["réservation", "table", "booking", "little lemon", "orléans", "restaurant"],
    ogImage: "/logo.jpg",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  order: {
    title: "Commander en ligne - Little Lemon Restaurant",
    description: "Commandez vos plats préférés en ligne. Livraison rapide et service de qualité pour vos repas méditerranéens.",
    keywords: ["commande", "livraison", "en ligne", "little lemon", "orléans", "restaurant"],
    ogImage: "/logo.jpg",
    ogType: "website",
    twitterCard: "summary_large_image"
  }
};

export function generateMetaTags(config: MetaConfig, pathname: string = "/") {
  const baseUrl = "https://littlelemon-orleans.com";
  const fullUrl = `${baseUrl}${pathname}`;
  
  return [
    // Métadonnées de base
    { title: config.title },
    { name: "description", content: config.description },
    { name: "keywords", content: config.keywords.join(", ") },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "fr" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "charset", content: "utf-8" },
    
    // Accessibilité et conformité W3C
    { name: "accessibility", content: "WCAG 2.1 AA compliant" },
    { name: "color-scheme", content: "light dark" },
    { name: "prefer-color-scheme", content: "light" },
    
    // Open Graph
    { property: "og:type", content: config.ogType },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:url", content: fullUrl },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "fr_FR" },
    { property: "og:image", content: `${baseUrl}${config.ogImage}` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Little Lemon Restaurant" },
    
    // Twitter Card
    { name: "twitter:card", content: config.twitterCard },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
    { name: "twitter:image", content: `${baseUrl}${config.ogImage}` },
    { name: "twitter:image:alt", content: "Little Lemon Restaurant" },
    
    // Métadonnées supplémentaires
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
    { name: "msapplication-TileImage", content: "/icons/icon-144x144.png" },
    { name: "msapplication-config", content: "/browserconfig.xml" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    
    // Canonical URL
    ...(config.canonicalUrl ? [{ rel: "canonical", href: config.canonicalUrl }] : [])
  ];
} 