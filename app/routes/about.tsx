import type { Route } from "./+types/about";
import AboutHero from "../components/about/AboutHero";
import OurStory from "../components/about/OurStory";
import TeamSection from "../components/about/TeamSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Little Lemon Restaurant" },
    { name: "description", content: "Discover the story of Little Lemon, our family Mediterranean restaurant in Orleans. Our passion for authentic cuisine and southern flavors." },
    { name: "keywords", content: "about, history, team, restaurant, mediterranean, orleans, little lemon" },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en" },
    
    // Open Graph
    { property: "og:title", content: "About - Little Lemon Restaurant" },
    { property: "og:description", content: "Discover the story of Little Lemon, our family Mediterranean restaurant in Orleans. Our passion for authentic cuisine and southern flavors." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://littlelemon.com/about" },
    { property: "og:image", content: "https://littlelemon.com/logo.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "About - Little Lemon Restaurant" },
    { name: "twitter:description", content: "Discover the story of Little Lemon, our family Mediterranean restaurant in Orleans. Our passion for authentic cuisine and southern flavors." },
    { name: "twitter:image", content: "https://littlelemon.com/logo.jpg" },
    
    // Additional Meta
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
  ];
}

export default function About() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <TeamSection />
    </>
  );
} 