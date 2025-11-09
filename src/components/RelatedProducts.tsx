import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ProductData } from '../types/product';
import ProductItemRelatedSection from './a/ProductItemRelatedSection';

interface RelatedProductsProps {
  relatedProducts?: ProductData[];
  currentProductSlug?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts = [],
  currentProductSlug,
}) => {
  const navigate = useNavigate();

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Related Products
        </h2>
        <p className="text-gray-600 font-light max-w-2xl mx-auto">
          Discover more products that match your style and requirements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {relatedProducts
          .filter((product) => product.slug !== currentProductSlug)
          .slice(0, 6)
          .map((product, index) => (
            <ProductItemRelatedSection
              key={index}
              index={index}
              product={product}
            />
          ))}
      </div>

      {relatedProducts.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/products')}
            className="bg-transparent border border-[#F04E23] text-[#F04E23] px-8 py-3 rounded-full font-light hover:bg-[#F04E23] hover:text-white transition-all duration-300"
          >
            View All Products
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default RelatedProducts;
