import { FaWhatsapp, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import productRequests from '../utils/requests/productRequests';
import type { ProductData } from '../types/product';
import { useNavigate } from 'react-router-dom';
import { adminPhone, frontendUrl } from '../utils/axiosInstance';

const FramesGallery = () => {
  const [framesData, setFramesData] = useState<ProductData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecentFrames = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await productRequests.getRecentFrames();
      if (response.success === true) {
        setFramesData(response.data.data);
      } else {
        throw new Error(response.message || 'Failed to load products');
      }
    } catch (error: any) {
      console.error('Error fetching frames:', error);
      setError(
        error.message ||
          'An error occurred while loading products. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

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

  const handleRetry = () => {
    fetchRecentFrames();
  };

  useEffect(() => {
    fetchRecentFrames();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-24 px-6">
      <motion.div
        className="max-w-7xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
          Recent Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Explore our latest handcrafted frames — designed to elevate your art,
          photography, and spaces with timeless craftsmanship.
        </p>
        <div className="w-24 h-[2px] bg-gray-300 mx-auto mt-8"></div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#F04E23] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-light">Loading products...</p>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Unable to Load Products
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-all"
              >
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-all"
              >
                Go Home
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {!loading && !error && (
        <div className="max-w-7xl mx-auto">
          {framesData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  No Products Available
                </h3>
                <p className="text-gray-600 mb-6">
                  There are no products in the collection at the moment.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="bg-[#F04E23] text-white px-6 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
                >
                  Refresh
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
              {framesData.map((frame: ProductData, index) => (
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
                      src={String(frame.images[0])}
                      alt={frame.name}
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
                      {frame.name}
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
                          ${frame.price}
                        </p>
                        <p className="text-xs text-gray-500">
                          MOQ: {frame.moq}
                        </p>
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FramesGallery;
