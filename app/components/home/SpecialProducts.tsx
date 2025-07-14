import React from 'react';
import ProductCard from '../ui/ProductCard';
import { getPopularItems } from '../../data/menuData';

const SpecialProducts: React.FC = () => {
  const popularItems = getPopularItems();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-24">
        <h2 className="text-gray-800">This Week's Specials</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularItems.map((item) => (
            <ProductCard
              key={item.id}
              image={item.image}
              title={item.name}
              price={item.priceFormatted || `${item.price}€`}
              description={item.description}
              order="Order a delivery"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialProducts;
