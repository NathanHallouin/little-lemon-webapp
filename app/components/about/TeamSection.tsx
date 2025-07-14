import React from 'react';

/**
 * Team section component displaying restaurant staff and company values
 * @returns Team section with staff profiles and company values
 */
const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Mario Rossi",
      role: "Owner Chef",
      description: "Expert in Mediterranean cuisine with over 25 years of experience",
      image: "./gourmet.jpg"
    },
    {
      name: "Adrian Rossi",
      role: "Pastry Chef",
      description: "Specialist in traditional desserts and modern creations",
      image: "./bruschetta1.jpg"
    },
    {
      name: "Sophie Martin",
      role: "Service Manager",
      description: "Ensures exceptional customer experience for 15 years",
      image: "./salad.jpg"
    }
  ];

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="w-11/12 max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-forest-500 mb-4">Our Team</h2>
          <div className="w-24 h-1 bg-sunshine-500 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Meet the passionate people who make Little Lemon a unique culinary experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-forest-500 mb-2">{member.name}</h3>
                <p className="text-sunshine-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-sunshine-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-forest-500 mb-2">Passion</h3>
            <p className="text-gray-600">Our love for cooking is reflected in every dish</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-sunshine-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-forest-500 mb-2">Quality</h3>
            <p className="text-gray-600">We select only the finest ingredients</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-sunshine-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-forest-500 mb-2">Family</h3>
            <p className="text-gray-600">Our team is like a family, united by passion</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 