import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { useLoading } from '../../providers/LoadingProvider';

interface NavLinksProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

const animateFrom = { opacity: 0, y: -40 };
const animateTo = { opacity: 1, y: 0 };

/**
 * Navigation links configuration with labels and accessibility attributes
 */
const links = [
  { to: '/', label: 'Home', ariaLabel: 'Go to home page' },
  { to: '/about', label: 'About', ariaLabel: 'Learn more about Little Lemon' },
  { to: '/menu', label: 'Menu', ariaLabel: 'View our menu' },
  { to: '/reservations', label: 'Reservations', ariaLabel: 'Book a table' },
  { to: '/order', label: 'Order Online', ariaLabel: 'Order online' },
  { to: '#', label: 'Login', ariaLabel: 'Sign in' },
  { to: '#', label: 'Donate', className: 'text-red-600 font-semibold', ariaLabel: 'Make a donation' },
];

/**
 * Navigation links component that renders the main navigation menu
 * @param isMobile - Whether the component is rendered in mobile mode
 * @param closeMobileMenu - Function to close the mobile menu
 * @returns Navigation links with proper accessibility and animations
 */
const NavLinks: React.FC<NavLinksProps> = ({ isMobile, closeMobileMenu }) => {
  // Use loading hook to avoid useContext error
  const { isLoading } = useLoading();
  const location = useLocation();
  const pathname = location?.pathname || '/';

  if (isLoading) {
    return null; // Return null during loading
  }

  // Choose class based on mobile or desktop mode
  const ulClass = isMobile
    ? 'flex flex-col space-y-4 text-right'
    : 'flex flex-row space-x-6 items-center h-full';

  return (
    <motion.ul
      initial={animateFrom}
      animate={animateTo}
      transition={{ delay: 0.05 }}
      className={ulClass}
      role={isMobile ? undefined : "menubar"}
    >
      {links.map((link, index) => {
        const isActive = pathname === link.to;
        const liClass = isMobile
          ? link.className
          : `${link.className ? link.className + ' ' : ''}h-full flex items-center`;
        return (
          <motion.li
            key={link.to + index}
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.05 + index * 0.05 }}
            onClick={() => isMobile && closeMobileMenu?.()}
            className={liClass}
            role={isMobile ? undefined : "menuitem"}
          >
            <Link
              to={link.to}
              className={`text-sm font-medium hover:text-[#495e57] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#495e57] focus:ring-offset-2 rounded ${
                isActive ? 'text-[#495e57]' : 'text-gray-800'
              }`}
              aria-label={link.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          </motion.li>
        );
      })}
      

    </motion.ul>
  );
};

export default NavLinks;
