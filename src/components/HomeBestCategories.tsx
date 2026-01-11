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

  const SectionHeader = () => (
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
  );

  const CategoryCard = ({
    cat,
    index,
  }: {
    cat: CategoryData;
    index: number;
  }) => (
    <motion.div
      key={cat.id || index}
      className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={cat.image}
        alt={cat.name}
        className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTIwTDE2MCAxMjBNMTIwIDE2MEgxMjBNMjAwIDE2MEgyMDAiIHN0cm9rZT0iIzhDOTNBQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==';
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-start p-4 md:p-6">
        <motion.h2
          className="text-lg md:text-2xl font-semibold text-white mb-2 md:mb-3 line-clamp-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        >
          {cat.name}
        </motion.h2>

        <Link
          to={`/categories/${cat.slug || cat.id}`}
          className="inline-flex items-center gap-1 md:gap-2 bg-[#F04E23] hover:bg-[#e67e22] text-white px-3 md:px-5 py-1.5 md:py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base hover:scale-105 active:scale-95"
          onClick={(e) => e.stopPropagation()}
        >
          Explore <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </Link>
      </div>

      <Link
        to={`/categories/${cat.slug || cat.id}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${cat.name} category`}
      />
    </motion.div>
  );

  const LoadingSkeleton = () => (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <SectionHeader />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse"
          >
            <div className="w-full h-56 md:h-64 bg-gray-300"></div>
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end items-start p-4 md:p-6">
              <div className="h-5 md:h-6 bg-gray-400 rounded w-3/4 mb-2 md:mb-3"></div>
              <div className="h-8 md:h-10 bg-gray-400 rounded-full w-24 md:w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const ErrorState = () => (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <SectionHeader />
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

  const EmptyState = () => (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <SectionHeader />
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

  const CategoriesGrid = () => (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <SectionHeader />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id || i} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (categories.length === 0) {
    return <EmptyState />;
  }

  return <CategoriesGrid />;
};

export default HomeBestCategories;
