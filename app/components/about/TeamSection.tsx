import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Handshake } from 'lucide-react';
import FadeInView from '../ui/FadeInView';
import StaggerContainer, { StaggerItem } from '../ui/StaggerContainer';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mario Rossi",
      role: "Executive Chef & Owner",
      description: "Expert in Mediterranean cuisine with over 25 years of experience",
      image: "./gourmet.jpg",
    },
    {
      name: "Adrian Rossi",
      role: "Pastry Chef",
      description: "Specialist in traditional desserts and modern creations",
      image: "./bruschetta1.jpg",
    },
    {
      name: "Sophie Martin",
      role: "Service Manager",
      description: "Ensures exceptional customer experience for 15 years",
      image: "./salad.jpg",
    },
  ];

  const values: { title: string; description: string; icon: ReactNode }[] = [
    { title: "Passion", description: "Our love for cooking is reflected in every dish", icon: <Heart className="w-8 h-8 text-secondary-500" /> },
    { title: "Quality", description: "We select only the finest ingredients", icon: <Sparkles className="w-8 h-8 text-accent-400" /> },
    { title: "Family", description: "Our team is like a family, united by passion", icon: <Handshake className="w-8 h-8 text-primary-300" /> },
  ];

  return (
    <section className="py-24 bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInView direction="up" className="text-center mb-16">
          <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Meet the Team
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">The People Behind Little Lemon</h2>
          <p className="text-primary-200 max-w-2xl mx-auto text-lg">
            Meet the passionate people who make every meal a memorable experience
          </p>
        </FadeInView>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" staggerDelay={0.1}>
          {teamMembers.map((member) => (
            <StaggerItem key={member.name}>
              <motion.div
                className="group relative bg-primary-800 rounded-2xl overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary-900 via-primary-900/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-accent-500 text-primary-900 text-xs font-bold rounded-full mb-3">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-primary-300 text-sm">{member.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Values */}
        <div className="border-t border-primary-700 pt-16">
          <FadeInView direction="up" className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold">Our Core Values</h3>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <FadeInView key={value.title} direction="up" delay={index * 0.1}>
                <motion.div
                  className="text-center p-8 bg-primary-800/50 rounded-2xl border border-primary-700 hover:border-accent-500/30 transition-colors"
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                  <p className="text-primary-300">{value.description}</p>
                </motion.div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 