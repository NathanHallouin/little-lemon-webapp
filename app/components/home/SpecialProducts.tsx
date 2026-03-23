import { Link } from 'react-router';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { getPopularItems } from '../../data/menuData';
import FadeInView from '../ui/FadeInView';
import StaggerContainer, { StaggerItem } from '../ui/StaggerContainer';

const SpecialProducts = () => {
  const popularItems = getPopularItems();

  return (
    <section className="bg-surface-warm py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <FadeInView direction="up">
            <span className="inline-block text-secondary-500 text-sm font-semibold uppercase tracking-wider mb-2">
              Chef's Selection
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
              This Week's Specials
            </h2>
            <p className="text-neutral-600 max-w-xl text-lg">
              Hand-picked dishes crafted with seasonal ingredients and Mediterranean passion.
            </p>
          </FadeInView>

          <FadeInView direction="up" delay={0.2}>
            <Link to="/menu">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Menu
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </Link>
          </FadeInView>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {popularItems.map((item) => (
            <StaggerItem key={item.id}>
              <ProductCard
                image={item.image}
                title={item.name}
                price={item.priceFormatted || `${item.price}€`}
                description={item.description}
                order="Order Now"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default SpecialProducts;
