import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative bg-primary-900 text-white py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_50%,rgba(244,206,20,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium uppercase tracking-wider">Our Story</span>
            </motion.div>

            <motion.h1
              className="font-display text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              A Passion for
              <span className="block text-accent-400">Mediterranean</span>
              Flavors
            </motion.h1>

            <motion.p
              className="text-lg text-primary-200 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              For over two decades, we've been sharing our family's culinary heritage with the heart of Orléans, bringing the warmth of the Mediterranean to every table.
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src="./salad.jpg"
                alt="Our culinary team"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-accent-500/30 rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero; 