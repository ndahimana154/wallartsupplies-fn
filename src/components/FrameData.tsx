import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { ProductData } from '../types/product';
import { useNavigate } from 'react-router-dom';
import { adminPhone, frontendUrl } from '../utils/axiosInstance';

const FrameData = ({ frame, index }: { frame: ProductData; index: number }) => {
  const navigate = useNavigate();

  const handleWhatsAppClick = (frame: ProductData) => {
    const productLink = `${frontendUrl}/product-detail/${frame.slug}`;
    const message = `Hello, I want to know more information about ${frame.name}. Product link: ${productLink}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleProductClick = (frame: ProductData) => {
    navigate(`/product-detail/${frame.slug}`);
  };
  return (
    <motion.div
      key={frame.id}
      className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-700 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div
        className="relative overflow-hidden rounded-t-3xl bg-gray-50"
        onClick={() => handleProductClick(frame)}
      >
        <motion.img
          src={
            frame.images && frame.images[0]
              ? String(frame.images[0])
              : '/api/placeholder/400/320'
          }
          alt={frame.name || 'Product image'}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/api/placeholder/400/320';
            e.currentTarget.alt = 'Image not available';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>

      <div className="p-8 text-center">
        <h3
          className="text-2xl font-light text-gray-900 mb-3 cursor-pointer hover:text-gray-700 transition-colors"
          onClick={() => handleProductClick(frame)}
        >
          {frame.name || 'Unnamed Product'}
        </h3>

        {frame.customAttr &&
          frame.customAttr.length > 0 &&
          frame.customAttr.slice(0, 2).map((attr, attrIndex) => (
            <div
              key={attrIndex}
              className="flex justify-center items-center gap-3 mb-6 text-sm text-gray-500"
            >
              <span>{attr.key}</span>
              <span>•</span>
              <span>{attr.value}</span>
            </div>
          ))}

        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <div
            className="text-left cursor-pointer"
            onClick={() => handleProductClick(frame)}
          >
            <p className="text-2xl font-light text-gray-900">
              ${frame.price || '0.00'}
            </p>
            {frame.moq && (
              <p className="text-xs text-gray-500">MOQ: {frame.moq}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#25D366] text-white px-6 py-3 rounded-full flex items-center gap-2 font-light hover:bg-[#128C7E] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsAppClick(frame);
            }}
          >
            <FaWhatsapp />
            Inquire
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FrameData;
