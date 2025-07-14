import type { Route } from "./+types/home";
import HeroSection from "../components/home/HeroSection"
import SpecialProducts from "../components/home/SpecialProducts"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Little Lemon - Mediterranean Restaurant in Orléans" },
    { name: "description", content: "Discover Little Lemon, an authentic Mediterranean restaurant in Orléans. Fresh cuisine, authentic flavors and warm atmosphere." },
    { name: "keywords", content: "restaurant, mediterranean, orleans, cuisine, gastronomy, little lemon" },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    
    // Open Graph
    { property: "og:title", content: "Little Lemon - Mediterranean Restaurant in Orléans" },
    { property: "og:description", content: "Discover Little Lemon, an authentic Mediterranean restaurant in Orléans. Fresh cuisine, authentic flavors and warm atmosphere." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://littlelemon.com" },
    { property: "og:image", content: "https://littlelemon.com/logo.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Little Lemon - Mediterranean Restaurant in Orléans" },
    { name: "twitter:description", content: "Discover Little Lemon, an authentic Mediterranean restaurant in Orléans. Fresh cuisine, authentic flavors and warm atmosphere." },
    { name: "twitter:image", content: "https://littlelemon.com/logo.jpg" },
    
    // Additional Meta
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ];
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <SpecialProducts />
    </>
  );
}
