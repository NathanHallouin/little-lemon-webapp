import { motion } from 'framer-motion';

const MenuHero = () => {
  return (
    <section className="relative bg-primary-900 text-white py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(244,206,20,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(232,120,74,0.06),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 px-4 py-2 rounded-full mb-6"
        >
          <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium uppercase tracking-wider">Fresh Daily</span>
        </motion.div>

        <motion.h1
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our Menu
        </motion.h1>
        <motion.p
          className="text-xl text-primary-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Authentic Mediterranean cuisine crafted with passion and the freshest seasonal ingredients
        </motion.p>
      </div>
    </section>
  );
};

export default MenuHero; 