import React from 'react';
import { Link } from 'react-router';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { RouterGuard } from './RouterGuard';

/**
 * Main navigation bar component that contains the logo and navigation links
 * @returns Navigation bar with logo and navigation components
 */
const Navbar: React.FC = () => {
  return (
    <header className="w-full z-[3] bg-white h-24" role="banner">
      <div className="flex items-center justify-between h-full mx-auto max-w-7xl px-8">
        {/* Logo + Name */}
        <div className="flex items-center h-24 max-w-[200px]">
          <Link to="/" aria-label="Home - Little Lemon">
            <img
              className="h-full w-auto object-contain"
              src="/logo.jpg"
              alt="Little Lemon - Return to home"
              width="200"
              height="96"
            />
          </Link>
        </div>
        {/* Centered Desktop Navigation */}
        <div className="ml-auto flex items-center h-24">
          <RouterGuard>
            <DesktopNav />
          </RouterGuard>
        </div>
        {/* Mobile menu on the right, only on mobile */}
        <div className="flex items-center lg:hidden">
          <RouterGuard>
            <MobileNav />
          </RouterGuard>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
