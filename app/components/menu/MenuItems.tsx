import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { Star } from 'lucide-react';
import { menuItems, filterMenuItems } from '../../data/menuData';

interface MenuItemsProps {
  selectedCategory?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const MenuItems = ({
  selectedCategory = 'all',
  searchTerm = '',
  onSearchChange,
}: MenuItemsProps) => {
  const filteredItems = filterMenuItems(menuItems, selectedCategory, searchTerm);

  return (
    <section className="py-16 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    {item.isPopular && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-500 text-primary-900 text-xs font-bold rounded-full">
                          <Star className="w-3 h-3" /> Popular
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary-700 font-bold text-sm rounded-full">
                        {item.priceFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-primary-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <Link
                      to="/order"
                      className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold hover:text-secondary-500 transition-colors"
                    >
                      <span>Add to Order</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="w-20 h-20 mx-auto bg-neutral-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-neutral-600 text-lg mb-4">
                  {searchTerm ? `No dishes found for "${searchTerm}"` : 'No dishes found in this category.'}
                </p>
                {searchTerm && (
                  <motion.button
                    onClick={() => onSearchChange?.('')}
                    className="px-6 py-2.5 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear search
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MenuItems; 