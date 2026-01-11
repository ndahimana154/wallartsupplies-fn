import {
  FaExclamationTriangle,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import productRequests from '../utils/requests/productRequests';
import type { ProductData } from '../types/product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SeoSetup from '../components/SeoSetup';
import Product from '../components/Product';

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const Search = () => {
  const [framesData, setFramesData] = useState<ProductData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 33,
    totalPages: 1,
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const fetchRecentFrames = useCallback(
    async (page: number = currentPage) => {
      try {
        setLoading(true);
        setError('');

        const response = await productRequests.getRecentFrames(
          { search: searchText },
          { page, limit: pagination.limit }
        );

        if (response.success === true) {
          setFramesData(response.data.data || []);
          setPagination(
            response.data.pagination || {
              total: response.data.data?.length || 0,
              page,
              limit: pagination.limit,
              totalPages: 1,
            }
          );
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
    },
    [searchText, pagination.limit, currentPage]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());
      setSearchParams(newSearchParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = (formData.get('search') as string) || '';

    const newSearchParams = new URLSearchParams();
    if (searchValue) newSearchParams.set('search', searchValue);
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  const handleRetry = () => {
    fetchRecentFrames();
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const { page, totalPages } = pagination;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    buttons.push(
      <motion.button
        key="prev"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <FaChevronLeft className="text-sm mr-1" />
        Previous
      </motion.button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 border rounded-lg transition-all ${
            i === page
              ? 'bg-[#F04E23] text-white border-[#F04E23]'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </motion.button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <motion.button
        key="next"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next
        <FaChevronRight className="text-sm ml-1" />
      </motion.button>
    );

    return buttons;
  };

  useEffect(() => {
    fetchRecentFrames();
  }, [fetchRecentFrames]);

  useEffect(() => {
    const pageTitle = searchText
      ? `${searchText} - Search Results ${
          currentPage > 1 ? `(Page ${currentPage})` : ''
        }`
      : `Recent Collection ${currentPage > 1 ? `- Page ${currentPage}` : ''}`;

    document.title = `${pageTitle} | Jinhua Hanji Company LTD`;
  }, [searchText, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-8 lg:py-24 px-4 sm:px-6">
      <div className="py-16  md:py-20"></div>{' '}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-12 lg:mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <SeoSetup
          mainData={{
            title: searchText
              ? `${searchText} - Search Results `
              : 'Recent Collection',
            description: searchText
              ? `Browse our collection of products matching "${searchText}". Find the perfect frames and products for your needs.`
              : 'Explore our latest collection of premium frames and products. Discover handcrafted designs for your art and photography.',
          }}
        />

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
          {searchText
            ? `Search Results for "${searchText}"`
            : 'Recent Collection'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-8">
          {searchText
            ? `Explore our collection matching "${searchText}" — designed to elevate your art, photography, and spaces with timeless craftsmanship.`
            : 'Explore our latest handcrafted frames — designed to elevate your art, photography, and spaces with timeless craftsmanship.'}
        </p>

        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              defaultValue={searchText}
              className="w-full px-6 py-4 pl-14 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#F04E23]/20 focus:border-[#F04E23] transition-all bg-white shadow-sm"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#F04E23] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#e67e22] transition-colors"
            >
              Search
            </motion.button>
          </div>
        </form>

        <div className="w-24 h-[2px] bg-gray-300 mx-auto"></div>
      </motion.div>
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-gray-600">
            Showing {(currentPage - 1) * pagination.limit + 1} -{' '}
            {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
            {pagination.total} products
            {searchText && (
              <span>
                {' '}
                for "<strong>{searchText}</strong>"
              </span>
            )}
          </div>
        </div>
      </div>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#F04E23] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-light">
              {searchText ? 'Searching products...' : 'Loading products...'}
            </p>
          </div>
        </motion.div>
      )}
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
              <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  {searchText ? 'No Products Found' : 'No Products Available'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchText
                    ? `No products found matching "${searchText}". Try searching with different keywords.`
                    : 'There are no products in the collection at the moment.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRetry}
                    className="bg-[#F04E23] text-white px-6 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
                  >
                    Refresh
                  </motion.button>
                  {searchText && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/search')}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-light hover:bg-gray-50 transition-all"
                    >
                      View All Products
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
                <AnimatePresence>
                  {framesData.map((frame: ProductData, index) => (
                    <Product product={frame} index={index} />
                  ))}
                </AnimatePresence>
              </div>

              {pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-12"
                >
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {renderPaginationButtons()}
                  </div>

                  <div className="sm:hidden text-center mt-4 text-sm text-gray-600">
                    Page {currentPage} of {pagination.totalPages}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
