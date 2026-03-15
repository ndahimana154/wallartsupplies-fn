import { FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import productRequests from '../utils/requests/productRequests';
import type { ProductData } from '../types/product';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import ProductsSkeleton from './skeletons/ProductsSkeleton';

const FramesGallery = () => {
  const [framesData, setFramesData] = useState<ProductData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecentFrames = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await productRequests.getRecentFrames(
        {},
        { page: 1, limit: 12 },
      );
      if (response.success === true) {
        setFramesData(response.data.data);
      } else {
        throw new Error(response.message || 'Failed to load products');
      }
    } catch (error: any) {
      console.error('Error fetching frames:', error);
      setError(
        error.message ||
          'An error occurred while loading products. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
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

      {loading && <ProductsSkeleton />}

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
              {framesData.map((product: ProductData, index) => (
                <Product product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FramesGallery;
