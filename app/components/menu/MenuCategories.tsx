import { motion } from 'framer-motion';
import { categories } from '../../data/menuData';
import FadeInView from '../ui/FadeInView';

interface MenuCategoriesProps {
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const MenuCategories = ({
  onCategoryChange,
  selectedCategory = 'all',
  searchTerm = '',
  onSearchChange,
}: MenuCategoriesProps) => {
  return (
    <section className="py-8 border-b border-neutral-100 sticky top-20 z-40 backdrop-blur-md bg-surface-warm/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Search bar */}
          <FadeInView direction="left" delay={0.1}>
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full px-5 py-3 pl-12 text-sm bg-white border border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </FadeInView>

          {/* Category filters */}
          <FadeInView direction="right" delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => onCategoryChange?.(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  {category.icon && <span>{category.icon}</span>}
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

export default MenuCategories; 