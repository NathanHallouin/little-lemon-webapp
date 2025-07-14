import React from 'react';
import { Link } from 'react-router';

/**
 * Hero section component for the home page
 * @returns Hero section with restaurant introduction and call-to-action
 */
const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-forest-500 text-white pt-10 lg:pt-0" role="banner" aria-labelledby="hero-title">
      <div className="w-11/12 max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center py-16 px-4 gap-8">
        
        {/* Left Section */}
        <div className="flex-1">
          <h1 id="hero-title" className="text-sunshine-300 text-5xl lg:text-6xl font-bold leading-tight mb-2">Little Lemon</h1>
          <h2 className="text-3xl lg:text-4xl leading-tight mb-6">Orléans</h2>
          <p className="max-w-md mb-6 text-base sm:text-sm">
            We are a family Mediterranean restaurant, specializing in traditional recipes served with a modern touch.
          </p>
          <Link to="/reservations">
            <button 
              className="px-6 py-3 text-base font-semibold rounded-full bg-sunshine-500 text-gray-800 hover:bg-zinc-800 hover:text-sunshine-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sunshine-300 focus:ring-offset-2"
              aria-label="Book a table at Little Lemon restaurant"
            >
              Book a table
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="relative w-full h-64 sm:h-72 md:h-96 overflow-hidden rounded-lg flex justify-center items-center">
            <img 
              src="./gourmet.jpg" 
              alt="Gourmet Mediterranean dish served at our Little Lemon restaurant in Orléans" 
              className="w-full h-full object-cover"
              width="400"
              height="384"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
