import React from 'react';
import { categories, type Category } from '../../data/menuData';

interface MenuCategoriesProps {
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

/**
 * Menu categories component with search functionality and category filters
 * @param onCategoryChange - Callback function when category changes
 * @param selectedCategory - Currently selected category
 * @param searchTerm - Current search term
 * @param onSearchChange - Callback function when search term changes
 * @returns Menu categories with search and filter functionality
 */
const MenuCategories: React.FC<MenuCategoriesProps> = ({ 
  onCategoryChange, 
  selectedCategory = 'all',
  searchTerm = '',
  onSearchChange
}) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange?.(categoryId);
  };

  return (
    <section className="py-12 bg-peach-yellow-100">
      <div className="container mx-auto px-4">
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a dish..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none transition-colors"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category filters */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
                }`}
              >
                {category.icon && <span className="text-lg">{category.icon}</span>}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCategories; 