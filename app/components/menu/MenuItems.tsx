import React from 'react';
import { menuItems, filterMenuItems, type MenuItem } from '../../data/menuData';

interface MenuItemsProps {
  selectedCategory?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

/**
 * Menu items component that displays filtered menu items
 * @param selectedCategory - Currently selected category for filtering
 * @param searchTerm - Current search term for filtering
 * @param onSearchChange - Callback function when search term changes
 * @returns Menu items display with filtering and search functionality
 */
const MenuItems: React.FC<MenuItemsProps> = ({ 
  selectedCategory = 'all', 
  searchTerm = '', 
  onSearchChange 
}) => {
  // Use centralized filtering function
  const filteredItems = filterMenuItems(menuItems, selectedCategory, searchTerm);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Menu Items */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Menu
          </h2>
          <div className="max-w-4xl mx-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 p-6 mb-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-orange-200">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        {item.isPopular && (
                          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                            <span className="mr-1">⭐</span>Popular
                          </span>
                        )}
                      </div>
                      <span className="text-lg font-bold text-orange-600">{item.priceFormatted}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.description}</p>
                    <button className="inline-flex items-center text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
                      Order Now
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg className="mx-auto w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  {searchTerm ? `No dishes found for "${searchTerm}"` : 'No dishes found in this category.'}
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => onSearchChange?.('')}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuItems; 