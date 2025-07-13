import React from 'react';
import { Link } from 'react-router';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar: React.FC = () => {
  return (
    <div className="w-full z-[3] bg-white border-b-4 border-[#495e57] h-24">
      <div className="flex items-center justify-between h-full mx-auto max-w-7xl px-8">
        {/* Logo + Nom */}
        <div className="flex items-center h-24 max-w-[200px]">
          <Link to="/">
            <img
              className="h-full w-auto object-contain"
              src="/logo.jpg"
              alt="Little Lemon logo"
            />
          </Link>
        </div>
        {/* Navigation Desktop centrée */}
        <div className="ml-auto">
          <DesktopNav />
        </div>
        {/* Menu mobile à droite uniquement sur mobile */}
        <div className="flex items-center lg:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
