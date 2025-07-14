export interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  price: number;
  priceFormatted?: string;
  image: string;
  category: string;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

/**
 * Menu categories configuration with icons and display names
 */
export const categories: Category[] = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'main-courses', name: 'Main Courses', icon: '🍖' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
];

/**
 * Centralized menu items data with pricing and categorization
 */
export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Greek Salad',
    description: 'Fresh lettuce, tomatoes, cucumbers, olives, and feta cheese with our signature dressing.',
    price: 12.99,
    priceFormatted: '12.99€',
    image: '/salad.jpg',
    category: 'starters',
    isPopular: true
  },
  {
    id: '2',
    name: 'Bruschetta',
    description: 'Toasted bread topped with tomatoes, garlic, and fresh basil.',
    price: 8.99,
    priceFormatted: '8.99€',
    image: '/bruschetta1.jpg',
    category: 'starters'
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon.',
    price: 24.99,
    priceFormatted: '24.99€',
    image: '/gourmet.jpg',
    category: 'main-courses',
    isPopular: true
  },
  {
    id: '4',
    name: 'Lemon Chicken',
    description: 'Tender chicken breast with lemon sauce and Mediterranean herbs.',
    price: 19.99,
    priceFormatted: '19.99€',
    image: '/creme.jpg',
    category: 'main-courses'
  },
  {
    id: '5',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
    price: 9.99,
    priceFormatted: '9.99€',
    image: '/gourmet.jpg',
    category: 'desserts'
  },
  {
    id: '6',
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh lemons and a hint of mint.',
    price: 4.99,
    priceFormatted: '4.99€',
    image: '/salad.jpg',
    category: 'drinks'
  },
  {
    id: '7',
    name: 'Lemon Cheesecake',
    description: 'Creamy cheesecake with lemon zest and berries.',
    price: 9.99,
    priceFormatted: '9.99€',
    image: '/creme.jpg',
    category: 'desserts'
  }
];

/**
 * Utility function to filter menu items by category and search term
 * @param items - Array of menu items to filter
 * @param selectedCategory - Category to filter by (default: 'all')
 * @param searchTerm - Search term to filter by (default: '')
 * @returns Filtered array of menu items
 */
export const filterMenuItems = (
  items: MenuItem[],
  selectedCategory: string = 'all',
  searchTerm: string = ''
): MenuItem[] => {
  let filtered = items;

  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(item => item.category === selectedCategory);
  }

  // Filter by search term
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

/**
 * Function to get popular menu items
 * @returns Array of menu items marked as popular
 */
export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isPopular);
}; 