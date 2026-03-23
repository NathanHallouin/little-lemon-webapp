import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { useLoading } from '../../providers/LoadingProvider';
import { useAuth } from '../../providers/AuthProvider';
import CartIcon from '../cart/CartIcon';
import UserMenu from '../auth/UserMenu';
import AuthModal from '../auth/AuthModal';

interface NavLinksProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/order', label: 'Order' },
];

const NavLinks = ({ isMobile, closeMobileMenu }: NavLinksProps) => {
  const { isLoading } = useLoading();
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location?.pathname || '/';
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isLoading) return null;

  if (isMobile) {
    return (
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-2"
      >
        {links.map((link, index) => {
          const isActive = pathname === link.to;
          return (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={link.to}
                onClick={closeMobileMenu}
                className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: links.length * 0.05 }}
          className="pt-4 border-t border-neutral-200 mt-2 space-y-3"
        >
          <Link
            to="/reservations"
            onClick={closeMobileMenu}
            className="block w-full py-3 px-6 bg-accent-500 text-primary-900 rounded-xl text-center font-semibold hover:bg-accent-400 transition-colors"
          >
            Book a Table
          </Link>
          {!user && (
            <button
              onClick={() => {
                closeMobileMenu?.();
                setShowAuthModal(true);
              }}
              className="block w-full py-3 px-6 bg-primary-500 text-white rounded-xl text-center font-semibold hover:bg-primary-600 transition-colors"
            >
              Sign In
            </button>
          )}
        </motion.div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </motion.nav>
    );
  }

  return (
    <nav className="flex items-center gap-1" role="navigation">
      {links.map((link) => {
        const isActive = pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? 'text-primary-700'
                : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}

      <div className="w-px h-6 bg-neutral-200 mx-3" />

      <CartIcon />

      <Link
        to="/reservations"
        className="ml-2 px-5 py-2.5 bg-accent-500 text-primary-900 text-sm font-semibold rounded-full hover:bg-accent-400 transition-colors shadow-sm hover:shadow-md"
      >
        Book a Table
      </Link>

      <UserMenu onLoginClick={() => setShowAuthModal(true)} />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default NavLinks;
