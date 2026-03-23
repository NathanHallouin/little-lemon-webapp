import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Citrus } from 'lucide-react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { RouterGuard } from './RouterGuard';

const Navbar = () => {
  return (
    <motion.header
      className="w-full z-50 bg-surface-light/95 backdrop-blur-md border-b border-neutral-100 sticky top-0"
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between h-20 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Home - Little Lemon"
          className="flex items-center gap-3 group"
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center ring-2 ring-primary-500/20 group-hover:ring-accent-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Citrus className="w-6 h-6 text-primary-600" />
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-display text-xl font-semibold text-primary-700 group-hover:text-primary-600 transition-colors">
              Little Lemon
            </span>
            <span className="block text-xs text-neutral-500 tracking-wider uppercase">
              Mediterranean
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <RouterGuard>
            <DesktopNav />
          </RouterGuard>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center lg:hidden">
          <RouterGuard>
            <MobileNav />
          </RouterGuard>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
