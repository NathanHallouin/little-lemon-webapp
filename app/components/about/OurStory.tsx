import React from 'react';

/**
 * Our Story section component that tells the restaurant's history and philosophy
 * @returns Story section with restaurant background and values
 */
const OurStory: React.FC = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="w-11/12 max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-forest-500 mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-sunshine-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-forest-500">A Family Passion</h3>
              <p className="text-gray-700 leading-relaxed">
                Little Lemon was born from a family's passion for authentic Mediterranean cuisine. 
                In 2003, brothers Mario and Adrian decided to share their culinary heritage with the city of Orléans.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-forest-500">Our Philosophy</h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in the importance of fresh ingredients, traditional recipes, and warm hospitality. 
                Every dish tells a story, that of our family and our love for the Mediterranean.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-forest-500">Daily Excellence</h3>
              <p className="text-gray-700 leading-relaxed">
                For over 20 years, we have strived to maintain the highest quality standards, 
                carefully selecting our suppliers and training our team in traditional culinary techniques.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative w-full h-96 overflow-hidden rounded-lg">
              <img src="./creme.jpg" alt="Our traditional cuisine" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-sunshine-500 text-white p-6 rounded-lg">
              <p className="text-2xl font-bold">20+</p>
              <p className="text-sm">Years of experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory; 