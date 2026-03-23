import type { Route } from "./+types/order";
import type { ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Package, UtensilsCrossed, Salad, Beef, Cake, GlassWater } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import Cart from "../components/cart/Cart";
import CheckoutModal from "../components/order/CheckoutModal";
import { menuItems, categories, filterMenuItems, type MenuItem } from "../data/menuData";
import PageTransition from "../components/ui/PageTransition";
import FadeInView from "../components/ui/FadeInView";
import ProtectedRoute from "../components/auth/ProtectedRoute";

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
  const [showCheckout, setShowCheckout] = useState(false);
  const dispatch = useAppDispatch();

  // Utiliser les données centralisées
  const filteredItems = filterMenuItems(menuItems, selectedCategory);

  const categoryIcons: Record<string, ReactNode> = {
    'all': <UtensilsCrossed className="w-4 h-4" />,
    'starters': <Salad className="w-4 h-4" />,
    'main-courses': <Beef className="w-4 h-4" />,
    'desserts': <Cake className="w-4 h-4" />,
    'drinks': <GlassWater className="w-4 h-4" />,
  };

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
    <ProtectedRoute message="Sign in to place an order and enjoy our delicious Mediterranean dishes">
      <PageTransition>
        <div className="min-h-screen bg-surface-light">
        {/* Hero Section */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 px-4 py-2 rounded-full mb-4"
            >
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium uppercase tracking-wider">Order Online</span>
            </motion.div>
            <motion.h1
              className="font-display text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Fresh to Your Door
            </motion.h1>
            <motion.p
              className="text-lg text-primary-200 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Enjoy our Mediterranean delights delivered fresh or ready for pickup
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Menu Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Type Selection */}
              <FadeInView direction="up" delay={0.1}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                  <h2 className="text-lg font-bold text-primary-800 mb-4">Order Type</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { type: 'delivery' as const, label: 'Delivery', icon: <Truck className="w-6 h-6" />, desc: '30-45 min' },
                      { type: 'pickup' as const, label: 'Pickup', icon: <Package className="w-6 h-6" />, desc: '15-20 min' },
                    ] as const).map((option) => (
                      <motion.button
                        key={option.type}
                        onClick={() => setOrderType(option.type)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          orderType === option.type
                            ? 'bg-primary-500 text-white shadow-lg'
                            : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="mb-2 block">{option.icon}</span>
                        <span className="font-semibold block">{option.label}</span>
                        <span className={`text-sm ${orderType === option.type ? 'text-primary-200' : 'text-neutral-500'}`}>
                          {option.desc}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </FadeInView>

              {/* Category Filter */}
              <FadeInView direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.03 }}
                    >
                      {categoryIcons[category.id]}
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </FadeInView>

              {/* Menu Items Grid */}
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex gap-4 p-4">
                        <motion.div
                          className="w-24 h-24 rounded-lg overflow-hidden shrink-0"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="font-semibold text-primary-800 truncate">{item.name}</h3>
                            <span className="text-sm font-bold text-secondary-500 whitespace-nowrap">
                              {item.priceFormatted}
                            </span>
                          </div>
                          <p className="text-neutral-500 text-sm line-clamp-2 mb-3">{item.description}</p>
                          <motion.button
                            onClick={() => handleAddToCart(item)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
                    <UtensilsCrossed className="w-8 h-8 text-neutral-400" />
                  </div>
                  <p className="text-neutral-600">No items found in this category</p>
                </motion.div>
              )}
            </div>

            {/* Cart Section */}
            <div className="lg:col-span-1">
              <FadeInView direction="right" delay={0.3}>
                <div className="sticky top-24">
                  <Cart onCheckout={() => setShowCheckout(true)} />
                </div>
              </FadeInView>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          orderType={orderType}
        />
      </div>
      </PageTransition>
    </ProtectedRoute>
  );
} 