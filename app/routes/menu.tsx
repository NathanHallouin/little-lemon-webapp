import React, { useState } from 'react';
import MenuHero from "../components/menu/MenuHero";
import MenuCategories from "../components/menu/MenuCategories";
import MenuItems from "../components/menu/MenuItems";

interface MetaArgs {
  // Add any meta arguments if needed
}

export function meta({}: MetaArgs) {
  return [
    { title: "Menu - Little Lemon Restaurant" },
    { name: "description", content: "Explore our delicious Mediterranean cuisine menu. Fresh dishes, quality ingredients and authentic flavors at Little Lemon Restaurant." },
    { name: "keywords", content: "menu, cuisine, mediterranean, dishes, restaurant, little lemon, orleans" },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en" },
    
    // Open Graph
    { property: "og:title", content: "Menu - Little Lemon Restaurant" },
    { property: "og:description", content: "Explore our delicious Mediterranean cuisine menu. Fresh dishes, quality ingredients and authentic flavors at Little Lemon Restaurant." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://littlelemon.com/menu" },
    { property: "og:image", content: "https://littlelemon.com/logo.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Menu - Little Lemon Restaurant" },
    { name: "twitter:description", content: "Explore our delicious Mediterranean cuisine menu. Fresh dishes, quality ingredients and authentic flavors at Little Lemon Restaurant." },
    { name: "twitter:image", content: "https://littlelemon.com/logo.jpg" },
    
    // Additional Meta
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
  ];
}

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-white">
      <MenuHero />
      <MenuCategories 
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <MenuItems 
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
} 