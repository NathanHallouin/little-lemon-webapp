import React, { useState } from 'react';
import NavLinks from './NavLinks';

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(prev => !prev);
  const closeMobileMenuOnClick = () => setOpen(false);

  return (
    <nav className="lg:hidden flex items-center z-[3]">
      <button
        onClick={toggleMenu}
        className="z-[4] p-2 rounded-md bg-white border"
        aria-label="Toggle menu"
      >
        {open ? (
          // Croix de fermeture SVG
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="4" x2="16" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          // Menu burger SVG
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4" width="20" height="2" rx="1" fill="#333" />
            <rect y="9" width="20" height="2" rx="1" fill="#333" />
            <rect y="14" width="20" height="2" rx="1" fill="#333" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed top-0 right-0 w-full bg-white text-right p-[60px_30px_30px] border-b-[10px] border-[#495e57] z-[2]">
          <NavLinks isMobile={true} closeMobileMenu={closeMobileMenuOnClick} />
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
