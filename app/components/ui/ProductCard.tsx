import React from 'react';
import { Link } from 'react-router';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  order: string;
}

/**
 * Product card component for displaying menu items with images and descriptions
 * @param image - Product image URL
 * @param title - Product title/name
 * @param price - Product price
 * @param description - Product description
 * @param order - Order button text
 * @returns Product card with image, details, and order link
 */
const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, description, order }) => {
  return (
    <article className="bg-gray-100 text-gray-800 rounded-2xl overflow-hidden flex flex-col h-full" role="article">
      {/* Image */}
      <div className="h-72 sm:h-60 overflow-hidden flex items-center">
        <img 
          src={image} 
          alt={`${title} - ${description}`} 
          className="w-full h-full object-cover"
          width="400"
          height="240"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-lg font-semibold text-peach-500" aria-label={`Price: ${price}`}>{price}</span>
        </header>

        <p className="text-base leading-relaxed mb-8">
          {description}
        </p>

        <footer className="mt-auto">
          <Link 
            to="#" 
            className="text-base font-medium flex items-center hover:text-peach-500 transition focus:outline-none focus:ring-2 focus:ring-peach-500 focus:ring-offset-2 rounded"
            aria-label={`Order ${title}`}
          >
            {order}
            <svg 
              className="ml-2 text-gray-800" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              aria-hidden="true"
              role="img"
            >
              <title>Order icon</title>
              <path d="M8 7V3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v4h5c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h5zM10 3v4h4V3h-4z"/>
              <path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
