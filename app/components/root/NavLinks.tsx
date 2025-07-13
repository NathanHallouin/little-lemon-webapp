import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';

interface NavLinksProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

const animateFrom = { opacity: 0, y: -40 };
const animateTo = { opacity: 1, y: 0 };

const links = [
  { to: '/', label: 'Home' },
  { to: '#', label: 'About' },
  { to: '#', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '#', label: 'Order Online' },
  { to: '#', label: 'Login' },
  { to: '#', label: 'Donate', className: 'text-red-600 font-semibold' },
];

const NavLinks: React.FC<NavLinksProps> = ({ isMobile, closeMobileMenu }) => {
  const { pathname } = useLocation();

  // Choix de la classe selon le mode mobile ou desktop
  const ulClass = isMobile
    ? 'flex flex-col space-y-4 text-right'
    : 'flex flex-row space-x-6 items-center';

  return (
    <motion.ul
      initial={animateFrom}
      animate={animateTo}
      transition={{ delay: 0.05 }}
      className={ulClass}
    >
      {links.map((link, index) => {
        const isActive = pathname === link.to;
        return (
          <motion.li
            key={link.to + index}
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.05 + index * 0.05 }}
            onClick={() => isMobile && closeMobileMenu?.()}
            className={link.className}
          >
            <Link
              to={link.to}
              className={`text-sm font-medium hover:text-[#495e57] transition-colors duration-200 ${
                isActive ? 'text-[#495e57]' : 'text-gray-800'
              }`}
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
