import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Star } from 'lucide-react';
import FadeInView from '../ui/FadeInView';

const OurStory = () => {
  const storyItems: { title: string; text: string; icon: ReactNode }[] = [
    {
      title: "A Family Passion",
      text: "Little Lemon was born from a family's passion for authentic Mediterranean cuisine. In 2003, brothers Mario and Adrian decided to share their culinary heritage with the city of Orléans.",
      icon: <Heart className="w-6 h-6 text-secondary-500" />,
    },
    {
      title: "Our Philosophy",
      text: "We believe in the importance of fresh ingredients, traditional recipes, and warm hospitality. Every dish tells a story, that of our family and our love for the Mediterranean.",
      icon: <Leaf className="w-6 h-6 text-primary-600" />,
    },
    {
      title: "Daily Excellence",
      text: "For over 20 years, we have strived to maintain the highest quality standards, carefully selecting our suppliers and training our team in traditional culinary techniques.",
      icon: <Star className="w-6 h-6 text-accent-500" />,
    },
  ];

  return (
    <section className="py-24 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <FadeInView direction="left" delay={0.1}>
            <div className="relative">
              <motion.div
                className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src="./creme.jpg" alt="Our traditional cuisine" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-primary-900/40 to-transparent" />
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-accent-500 text-primary-900 p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-4xl font-bold">20+</p>
                <p className="text-sm font-semibold">Years of Excellence</p>
              </motion.div>

              {/* Decorative */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary-200 rounded-3xl -z-10" />
            </div>
          </FadeInView>

          {/* Content Column */}
          <div>
            <FadeInView direction="right" delay={0.2}>
              <span className="inline-block text-secondary-500 text-sm font-semibold uppercase tracking-wider mb-3">
                Since 2003
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
                Our Story
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                What started as a small family dream has grown into a beloved dining destination, where every meal is prepared with love and tradition.
              </p>
            </FadeInView>

            <div className="space-y-6">
              {storyItems.map((item, index) => (
                <FadeInView key={item.title} direction="right" delay={0.3 + index * 0.1}>
                  <motion.div
                    className="flex gap-5 p-5 bg-white rounded-2xl border border-neutral-100 hover:shadow-md transition-shadow"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-800 mb-1">{item.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory; 