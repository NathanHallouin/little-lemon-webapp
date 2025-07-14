import React from 'react';
import NavLinks from './NavLinks';

const DesktopNav: React.FC = () => {
  return (
    <nav className="hidden lg:block w-full" role="navigation" aria-label="Navigation principale">
      <div className="flex items-center h-24 w-full justify-end">
        <NavLinks />
      </div>
    </nav>
  );
};

export default DesktopNav;
