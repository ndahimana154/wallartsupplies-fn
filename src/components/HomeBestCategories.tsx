import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CategoryData } from '../types/product';
import productRequests from '../utils/requests/productRequests';

const HomeBestCategories = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBestCategories = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await productRequests.getBestCategories();

      if (response.success === true) {
        setCategories(response.data.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch categories');
      }
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      setError(
        error.message || 'Something went wrong while loading categories'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-10 lg:px-20">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-[#e67e22]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Best Categories
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 text-sm md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover our handpicked collection of artwork and interior design
            masterpieces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse"
            >
              <div className="w-full h-64 bg-gray-300"></div>
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-6">
                <div className="h-6 bg-gray-400 rounded w-3/4 mb-3"></div>
                <div className="h-10 bg-gray-400 rounded-full w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-10 lg:px-20">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-[#e67e22]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Best Categories
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 text-sm md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover our handpicked collection of artwork and interior design
            masterpieces.
          </motion.p>
        </div>

        <motion.div
          className="text-center py-12 bg-red-50 rounded-2xl border border-red-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Failed to Load Categories
          </h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={fetchBestCategories}
            className="bg-[#e67e22] text-white px-6 py-2 rounded-full font-medium hover:bg-[#cf711f] transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </section>
    );
  }

  if (categories.length === 0 && !loading) {
    return (
      <section className="py-16 px-4 md:px-10 lg:px-20">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-[#e67e22]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Best Categories
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 text-sm md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover our handpicked collection of artwork and interior design
            masterpieces.
          </motion.p>
        </div>

        <motion.div
          className="text-center py-12 bg-gray-50 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Categories Available
          </h3>
          <p className="text-gray-500">Check back later for new categories.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-[#e67e22]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Best Categories
        </motion.h1>
        <motion.p
          className="mt-3 text-gray-600 text-sm md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover our handpicked collection of artwork and interior design
          masterpieces.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.length > 0 &&
          categories.map((cat, i) => (
            <motion.div
              key={cat.id || i}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback image if the category image fails to load
                  e.currentTarget.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTIwTDE2MCAxMjBNMTIwIDE2MEgxMjBNMjAwIDE2MEgyMDAiIHN0cm9rZT0iIzhDOTNBQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end items-start p-6">
                <motion.h2
                  className="text-2xl font-semibold text-white mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.name}
                </motion.h2>

                <Link
                  to={`/categories/${cat.slug || cat.id}`} // Added proper link
                  className="inline-flex items-center gap-2 bg-[#F04E23] hover:bg-[#e67e22] text-white px-5 py-2 rounded-full font-medium transition-colors duration-300"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default HomeBestCategories;
