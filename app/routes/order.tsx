import type { Route } from "./+types/order";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import Cart from "../components/cart/Cart";
import { menuItems, categories, filterMenuItems, type MenuItem } from "../data/menuData";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order Online - Little Lemon Restaurant" },
    { name: "description", content: "Order delicious meals online at Little Lemon. Fast delivery and pickup available. Fresh and authentic Mediterranean cuisine." },
    { name: "keywords", content: "order, delivery, pickup, restaurant, little lemon, orleans, mediterranean cuisine" },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en" },
    
    // Open Graph
    { property: "og:title", content: "Order Online - Little Lemon Restaurant" },
    { property: "og:description", content: "Order delicious meals online at Little Lemon. Fast delivery and pickup available. Fresh and authentic Mediterranean cuisine." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://littlelemon.com/order" },
    { property: "og:image", content: "https://littlelemon.com/logo.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Order Online - Little Lemon Restaurant" },
    { name: "twitter:description", content: "Order delicious meals online at Little Lemon. Fast delivery and pickup available. Fresh and authentic Mediterranean cuisine." },
    { name: "twitter:image", content: "https://littlelemon.com/logo.jpg" },
    
    // Additional Meta
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
  ];
}

export default function Order() {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useAppDispatch();

  // Utiliser les données centralisées
  const filteredItems = filterMenuItems(menuItems, selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart({
      id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#495e57] text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold mb-4">Order Online</h1>
          <p className="text-xl">Delicious meals delivered to your door or ready for pickup</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Order Type Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Choose your order type</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    orderType === 'delivery'
                      ? 'bg-[#495e57] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🚚 Delivery
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    orderType === 'pickup'
                      ? 'bg-[#495e57] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📦 Pickup
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Menu Categories</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#495e57] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-2xl font-bold text-[#495e57]">{item.priceFormatted}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-[#495e57] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#3d4f47] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
} 