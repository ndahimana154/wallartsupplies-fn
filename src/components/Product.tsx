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
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage} `;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col">
        {/* Image Container with Aspect Ratio */}
        <div
          className="relative cursor-pointer overflow-hidden bg-gray-50"
          onClick={() => handleProductClick(product.slug)}
        >
          <div className="relative w-full pt-[100%]">
            <img
              src={String(product.images?.[0] || '/placeholder-image.jpg')}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
          </div>

          {/* Badge Overlay */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-0.5 shadow-md">
            <FaGift className="text-xs" />
            <span className="hidden sm:inline">FREE</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
        </div>

        {/* Content Section */}
        <div className="p-2 flex flex-col gap-1">
          <h3
            onClick={() => handleProductClick(product.slug)}
            className="text-xs md:text-xs font-medium text-gray-900 cursor-pointer hover:text-[#F04E23] line-clamp-2"
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-between gap-1">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#F04E23]">
                ${product.price}
              </span>

              <span className="text-xs text-gray-500 line-clamp-1">
                MOQ: {product.moq}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsAppClick(product);
            }}
            className="mt-0.5 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-1 rounded-md flex items-center justify-center gap-0.5 font-medium shadow-md hover:shadow-lg transition text-xs"
          >
            <FaWhatsapp />
            <span className="md:hidden">Chat</span>
            <span className="hidden md:inline">Chat on WhatsApp</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
