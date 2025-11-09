import { motion } from 'framer-motion';
import type { ProductData } from '../../types/product';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { adminPhone } from '../../utils/axiosInstance';

interface ProductItemRelatedSectionProps {
  product: ProductData;
  index: number;
}

const ProductItemRelatedSection = ({
  product,
  index,
}: ProductItemRelatedSectionProps) => {
  const navigate = useNavigate();

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
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => handleProductClick(product.slug)}
      >
        <img
          src={String(product.images?.[0] || '/placeholder-image.jpg')}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
          <span className="text-[#F04E23] font-light text-lg">
            ${product.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3
          className="text-xl font-light text-gray-900 mb-2 cursor-pointer hover:text-[#F04E23] transition-colors line-clamp-2"
          onClick={() => handleProductClick(product.slug)}
        >
          {product.name}
        </h3>

        {product.customAttr && product.customAttr.length > 0 && (
          <div className="mb-4">
            {product.customAttr.slice(0, 2).map((attr, attrIndex) => (
              <div
                key={attrIndex}
                className="flex justify-between text-sm mb-1"
              >
                <span className="text-gray-600 font-light">{attr.key}:</span>
                <span className="text-gray-900 font-medium">{attr.value}</span>
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
  );
};

export default ProductItemRelatedSection;
