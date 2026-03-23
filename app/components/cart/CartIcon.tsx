import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';

export default function CartIcon() {
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/order" className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors">
      <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-0.5 -right-0.5 bg-secondary-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
} 