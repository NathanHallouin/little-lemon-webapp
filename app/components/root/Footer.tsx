import React from 'react';

/**
 * Footer component containing restaurant information and contact details
 * @returns Footer with restaurant details, opening hours, and contact information
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white py-16" role="contentinfo">
      <div className="w-11/12 max-w-screen-xl mx-auto flex flex-col">
        <img 
          src="/logo_footer.png" 
          alt="Little Lemon - Restaurant logo" 
          className="w-20 mb-4"
          width="80"
          height="80"
        />
        <p className="w-3/5 mb-16 text-base md:w-11/12 md:text-sm">
          Little Lemon is a charming neighborhood bistro that serves simple cuisine and classic cocktails in a lively but relaxed environment. The restaurant offers a menu of local ingredients with daily specials.
        </p>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base mb-16" role="navigation" aria-label="Restaurant information">
          <section>
            <h5 className="mb-6 text-lg font-semibold md:mb-5 md:text-sm">OUR LOCATIONS</h5>
            <ul className="space-y-2 md:text-sm capitalize">
              <li>Orléans</li>
              <li>Tours</li>
            </ul>
          </section>

          <section>
            <h5 className="mb-6 text-lg font-semibold md:mb-5 md:text-sm">OPENING HOURS</h5>
            <ul className="space-y-2 md:text-sm">
              <li>Mon - Wed: 10:30 - 00:00</li>
              <li>Fri: 12:00 - 01:00</li>
              <li>Sat - Sun: 10:30 - 00:00</li>
            </ul>
          </section>

          <section>
            <h5 className="mb-6 text-lg font-semibold md:mb-5 md:text-sm">CONTACT US</h5>
            <address className="not-italic space-y-2 md:text-sm">
              <p>2 Rue Jeanne d'Arc, 45000 Orléans France</p>
              <p>Tel: <a href="tel:02079280678" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800 rounded">020 7928 0678</a></p>
              <p>Email: <a href="mailto:info@littlelemon.com" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800 rounded">info@littlelemon.com</a></p>
            </address>
          </section>
        </nav>

        <div className="text-center text-sm">
          <p>© 2025 Little Lemon Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
