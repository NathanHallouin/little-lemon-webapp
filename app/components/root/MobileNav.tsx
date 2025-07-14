import React, { useState } from 'react';
import NavLinks from './NavLinks';

/**
 * Mobile navigation component with hamburger menu functionality
 * @returns Mobile navigation with animated menu toggle
 */
const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(prev => !prev);
  const closeMobileMenuOnClick = () => setOpen(false);

  return (
    <nav className="lg:hidden flex items-center z-[3]" role="navigation" aria-label="Mobile menu">
      <button
        onClick={toggleMenu}
        className="z-[4] p-2 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-[#495e57] focus:ring-offset-2"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="true"
      >
        {open ? (
          // Close cross SVG
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <title>Close menu</title>
            <line x1="4" y1="4" x2="16" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          // Hamburger menu SVG
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <title>Open menu</title>
            <rect y="4" width="20" height="2" rx="1" fill="#333" />
            <rect y="9" width="20" height="2" rx="1" fill="#333" />
            <rect y="14" width="20" height="2" rx="1" fill="#333" />
          </svg>
        )}
      </button>

      {open && (
        <div 
          id="mobile-menu"
          className="fixed top-0 right-0 w-full bg-white text-right p-[60px_30px_30px] border-b-[10px] border-[#495e57] z-[2]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <NavLinks isMobile={true} closeMobileMenu={closeMobileMenuOnClick} />
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
