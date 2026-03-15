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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      {/* IMAGE */}
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={() => handleProductClick(product.slug)}
      >
        <img
          src={String(product.images?.[0] || '/placeholder-image.jpg')}
          alt={product.name}
          className="w-full h-52 sm:h-60 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />

        {/* FREE SAMPLE BADGE */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
          <FaGift />
          FREE Sample
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3
          onClick={() => handleProductClick(product.slug)}
          className="text-lg md:text-md font-medium text-gray-900 cursor-pointer hover:text-[#F04E23] line-clamp-4"
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-semibold text-[#F04E23]">
              ${product.price}
            </span>

            <span className="text-xs text-gray-500">
              MOQ: {product.moq} units
            </span>
          </div>
        </div>

        {product.customAttr && product.customAttr.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.customAttr.slice(0, 4).map((attr, i) => (
              <div
                key={i}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700"
              >
                <span className="font-medium">{attr.key}:</span> {attr.value}
              </div>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            handleWhatsAppClick(product);
          }}
          className="mt-2 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transition"
        >
          <FaWhatsapp />
          <span className="md:hidden">Order</span>
          <span className="hidden md:inline">Order via WhatsApp</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Product;
