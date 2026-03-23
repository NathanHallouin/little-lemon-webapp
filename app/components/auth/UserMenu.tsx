import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ShoppingBag, Calendar, ChevronDown } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';

interface UserMenuProps {
  onLoginClick: () => void;
}

export default function UserMenu({ onLoginClick }: UserMenuProps) {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-neutral-100 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <motion.button
        onClick={onLoginClick}
        className="px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Sign In
      </motion.button>
    );
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 bg-neutral-50 hover:bg-neutral-100 rounded-full transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm">
          {userInitial}
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden sm:block max-w-24 truncate">
          {userName}
        </span>
        <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-neutral-100">
              <p className="font-semibold text-primary-800 truncate">{userName}</p>
              <p className="text-sm text-neutral-500 truncate">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                to="/order"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 text-neutral-700 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm font-medium">My Orders</span>
              </Link>
              <Link
                to="/reservations"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 text-neutral-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">My Reservations</span>
              </Link>
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-neutral-100">
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
