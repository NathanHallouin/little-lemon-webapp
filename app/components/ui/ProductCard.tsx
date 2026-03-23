import { motion } from 'framer-motion';
import { Link } from 'react-router';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  order: string;
}

const ProductCard = ({ image, title, price, description, order }: ProductCardProps) => {
  return (
    <motion.article
      className="group bg-white rounded-2xl overflow-hidden flex flex-col h-full shadow-sm border border-neutral-100 hover:shadow-xl transition-shadow duration-500"
      role="article"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary-700 font-bold text-sm rounded-full shadow-sm">
            {price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {description}
        </p>

        <Link
          to="/order"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary-50 text-primary-700 font-semibold rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 group/btn"
        >
          <span>{order}</span>
          <motion.svg
            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </Link>
      </div>
    </motion.article>
  );
};

export default ProductCard;
