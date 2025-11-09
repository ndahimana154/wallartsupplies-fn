import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { ProductData } from '../types/product';
import { adminPhone } from '../utils/axiosInstance';

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

  const handleProductClick = (slug: string) => {
    navigate(`/product-detail/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleWhatsAppClick = (product: ProductData) => {
    const message = `Hello, I'm interested in the ${product.name}:

• Product: ${product.name}
• Unit Price: $${product.price}
• MOQ: ${product.moq} units

${product.description}

I'd like to know more about this product.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

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
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              {/* Product Image */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product.slug)}
              >
                <img
                  src={String(product.images[0])}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                  <span className="text-[#F04E23] font-light text-lg">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3
                  className="text-xl font-light text-gray-900 mb-2 cursor-pointer hover:text-[#F04E23] transition-colors line-clamp-2"
                  onClick={() => handleProductClick(product.slug)}
                >
                  {product.name}
                </h3>

                <p className="text-gray-500 font-light text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Custom Attributes */}
                {product.customAttr && product.customAttr.length > 0 && (
                  <div className="mb-4">
                    {product.customAttr.slice(0, 2).map((attr, attrIndex) => (
                      <div
                        key={attrIndex}
                        className="flex justify-between text-sm mb-1"
                      >
                        <span className="text-gray-600 font-light">
                          {attr.key}:
                        </span>
                        <span className="text-gray-900 font-medium">
                          {attr.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 font-light">
                    MOQ: {product.moq} units
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppClick(product);
                    }}
                    className="bg-[#25D366] text-white px-4 py-2 rounded-full flex items-center gap-2 font-light hover:bg-[#128C7E] transition-all text-sm"
                  >
                    <FaWhatsapp className="text-base" />
                    Inquire
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* View More CTA */}
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
