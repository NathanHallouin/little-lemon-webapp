import React from 'react';

const MenuHero: React.FC = () => {
  return (
    <section className="relative bg-forest-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our Menu
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Discover our authentic Mediterranean cuisine crafted with fresh ingredients and traditional recipes
        </p>
      </div>
    </section>
  );
};

export default MenuHero; 