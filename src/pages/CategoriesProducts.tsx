import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import productRequests from '../utils/requests/productRequests';
import type { CategoryData, ProductData } from '../types/product';
import SeoSetup from '../components/SeoSetup';
import ProductItemRelatedSection from '../components/a/ProductItemRelatedSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGlobalLoading } from '../hooks/useGlobalLoading';
import { useAppSelector } from '../store/hooks';

const CategoriesProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [error, setError] = useState('');
  const { isLoading } = useGlobalLoading();
  const globalError = useAppSelector((s) => s.app.globalError);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const fetchCategoryProducts = async () => {
    try {
      setError('');
      const response = await productRequests.getCategoryProducts(String(slug));

      if (response.success === true) {
        setProducts(response.data.products.data || []);
        setCategory(response.data.category || null);
      } else {
        throw new Error(
          response.message || 'Failed to fetch category products',
        );
      }
    } catch (error: any) {
      console.error('Error fetching category products:', error);
      setError(error.message || 'Something went wrong while loading products');
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <LoadingSpinner text="Loading products..." />
      </div>
    );
  }

  if (globalError || error || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <SeoSetup mainData={{ title: 'Category Not Found' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-500">⚠️</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            {globalError || error
              ? 'Error Loading Category'
              : 'Category Not Found'}
          </h2>
          <p className="text-gray-600 mb-8">
            {globalError ||
              error ||
              'The category you are looking for does not exist.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-3 rounded-full font-light hover:bg-gray-600 transition-all"
            >
              Go Back
            </button>
            <button
              onClick={fetchCategoryProducts}
              className="bg-[#F04E23] text-white px-6 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <SeoSetup
        mainData={{
          title: `${category.name} - Products`,
          description: `Explore our collection of ${category.name} products.`,
        }}
      />

      <div className="relative overflow-hidden py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover opacity-5 blur-sm"
              loading="lazy"
            />
          )}
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8"></div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
              {category.name}
            </h1>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto font-light text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover our curated collection of {category.name.toLowerCase()}{' '}
              products
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-gray-400">📦</span>
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              There are currently no products available in this category. Check
              back later for new arrivals.
            </p>
            <button
              onClick={() => navigate('/categories')}
              className="bg-[#F04E23] text-white px-8 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
            >
              Browse All Categories
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
            >
              <p className="text-gray-600 font-light">
                Showing {products.length} product
                {products.length !== 1 ? 's' : ''} in {category.name}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {products.map((product, index) => (
                <ProductItemRelatedSection
                  key={product.id}
                  index={index}
                  product={product}
                />
              ))}
            </motion.div>

            {products.length >= 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <button className="bg-transparent border border-[#F04E23] text-[#F04E23] px-8 py-3 rounded-full font-light hover:bg-[#F04E23] hover:text-white transition-all duration-300">
                  Load More Products
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesProducts;
