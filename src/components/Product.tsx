import { FaWhatsapp, FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigation } from '../helpers/product';
import { adminPhone, frontendUrl } from '../utils/axiosInstance';
import type { ProductData } from '../types/product';

const Product = ({
  product,
  index,
}: {
  product: ProductData;
  index: number;
}) => {
  const { handleProductClick } = useNavigation();
  const handleWhatsAppClick = (frame: ProductData) => {
    const productLink = `${frontendUrl}/product-detail/${frame.slug}`;
    const message = `Hello, I want to know more information about ${frame.name}. Product link: ${productLink}`;
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
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => handleProductClick(product.slug)}
      >
        <img
          src={String(product.images?.[0] || '/placeholder-image.jpg')}
          alt={product.name}
          className="w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
          loading="lazy"
        />

        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full shadow-lg">
            <FaGift className="text-[10px] sm:text-sm" />
            <span className="text-[11px] sm:text-xs font-semibold">
              FREE Sample
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-2xl px-2.5 py-1.5 shadow-lg">
          <span className="text-[#F04E23] font-light text-sm sm:text-lg">
            ${product.price}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <h3
          className="text-base sm:text-xl font-light text-gray-900 mb-2 sm:mb-3 cursor-pointer hover:text-[#F04E23] transition-colors line-clamp-2"
          onClick={() => handleProductClick(product.slug)}
        >
          {product.name}
        </h3>

        {product.customAttr && product.customAttr.length > 0 && (
          <div className="mb-3 sm:mb-4 space-y-2">
            {product.customAttr.slice(0, 2).map((attr, attrIndex) => (
              <div
                key={attrIndex}
                className="flex justify-between text-xs sm:text-sm"
              >
                <span className="text-gray-600 font-light">{attr.key}:</span>
                <span className="text-gray-900 font-medium">{attr.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm text-gray-500 font-light">
              MOQ: {product.moq} units
            </div>
            <div className="flex items-center gap-1 mt-1">
              <FaGift className="text-green-500 text-xs" />
              <span className="text-[11px] sm:text-xs text-green-600 font-medium">
                Free sample available
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsAppClick(product);
            }}
            className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-3 py-2 rounded-full flex items-center gap-2 font-medium hover:shadow-lg transition-all text-sm shadow-md sm:px-5 sm:py-2.5"
          >
            <FaWhatsapp className="text-sm sm:text-base" />
            <span className="hidden sm:inline">Order</span>
            <span className="sm:hidden">Buy</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
