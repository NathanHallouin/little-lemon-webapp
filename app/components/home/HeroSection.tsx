import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-primary-900 overflow-hidden" role="banner">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-accent-400 text-sm font-medium tracking-wide">Now Open in Orléans</span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Authentic
            <span className="block text-accent-400">Mediterranean</span>
            Cuisine
          </motion.h1>

          <motion.p
            className="text-lg text-primary-200 max-w-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience the warmth of Mediterranean hospitality with our family recipes, crafted from the freshest local ingredients.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/reservations">
              <motion.button
                className="px-8 py-4 bg-accent-500 text-primary-900 font-semibold rounded-full hover:bg-accent-400 transition-all shadow-lg shadow-accent-500/25"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Reserve a Table
              </motion.button>
            </Link>
            <Link to="/menu">
              <motion.button
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Menu
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { value: '20+', label: 'Years of Excellence' },
              { value: '50+', label: 'Signature Dishes' },
              { value: '4.9', label: 'Customer Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-accent-400">{stat.value}</p>
                <p className="text-sm text-primary-300">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <motion.img
              src="./gourmet.jpg"
              alt="Signature Mediterranean dish"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
          </div>

          {/* Floating Card */}
          <motion.div
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <p className="font-bold text-primary-900">Excellence Award</p>
                <p className="text-sm text-neutral-500">Best Mediterranean 2024</p>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-accent-500/30 rounded-full" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-accent-500/20 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
