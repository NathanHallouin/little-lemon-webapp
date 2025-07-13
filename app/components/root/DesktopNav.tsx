import React from 'react';
import NavLinks from './NavLinks';

const DesktopNav: React.FC = () => {
  return (
    <nav className="hidden lg:block w-full">
      <ul className="flex justify-end space-x-4">
        <NavLinks />
      </ul>
    </nav>
  );
};

export default DesktopNav;
