import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="w-full bg-forest-500 text-white pt-10 lg:pt-0">
      <div className="w-11/12 max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center py-16 px-4 gap-8">
        
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-sunshine-300 text-5xl lg:text-6xl font-bold leading-tight mb-2">About</h1>
          <h2 className="text-3xl lg:text-4xl leading-tight mb-6">Little Lemon</h2>
          <p className="max-w-md mb-6 text-base sm:text-sm">
            Discover our passion for Mediterranean cuisine and our commitment to culinary excellence for over 20 years.
          </p>
        </div>

        {/* Right Section */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="relative w-full h-64 sm:h-72 md:h-96 overflow-hidden rounded-lg flex justify-center items-center">
            <img src="./salad.jpg" alt="Our team in the kitchen" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero; 