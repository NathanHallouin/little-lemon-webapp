import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartProps {
  onCheckout?: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const { items, total } = useAppSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-primary-900 text-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Your Order</h2>
          <span className="bg-accent-500 text-primary-900 text-xs font-bold px-2.5 py-1 rounded-full">
            {items?.length || 0} items
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {!items || items.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="font-semibold text-primary-800 mb-1">Your cart is empty</p>
            <p className="text-sm text-neutral-500">Add some delicious dishes</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {items.map((item: CartItem) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary-800 text-sm truncate">{item.name}</p>
                      <p className="text-secondary-500 font-semibold text-sm">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 bg-white border border-neutral-200 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 bg-white border border-neutral-200 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="border-t border-neutral-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Delivery</span>
                <span className="font-medium text-primary-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-100">
                <span className="text-primary-800">Total</span>
                <span className="text-secondary-500">{total.toFixed(2)}€</span>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              onClick={onCheckout}
              className="w-full mt-5 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
} 