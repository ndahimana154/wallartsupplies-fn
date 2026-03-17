import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import productRequests from '../utils/requests/productRequests';
import type { CategoryData, ProductData } from '../types/product';
import ProductsSkeleton from '../components/skeletons/ProductsSkeleton';
import Product from '../components/Product';
import { useApi } from '../hooks/useApi';
import PageLayout from '../components/PageLayout';
import { MdWarning } from 'react-icons/md';
import { Box } from 'lucide-react';

const CategoriesProducts = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useApi<{
    products: { data: ProductData[] };
    category: CategoryData;
  }>(() => productRequests.getCategoryProducts(String(slug)), [slug], {
    redirectOnError: '/categories',
  });

  const products = data?.products.data || [];
  const category = data?.category || null;

  if (loading) {
    return <ProductsSkeleton />;
  }

  if (error || !category) {
    return (
      <PageLayout className="bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-500">
              <MdWarning className="text-primary" />
            </span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            {error ? 'Error Loading Category' : 'Category Not Found'}
          </h2>
          <p className="text-gray-600 mb-8">
            {error || 'The category you are looking for does not exist.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-3 rounded-full font-light hover:bg-gray-600 transition-all"
            >
              Go Back
            </button>
            <button
              onClick={refetch}
              className="bg-[#F04E23] text-white px-6 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={category.name}
      description={`Explore our collection of ${category.name} products.`}
      className="bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div
              className="w-24 h-24 bg-gray-100 rounded-full flex items-center 
            justify-center mx-auto mb-6"
            >
              <span className="text-3xl text-gray-400">
                <Box className="text-primary" />
              </span>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
            >
              {products.map((product, index) => (
                <Product key={product.id} index={index} product={product} />
              ))}
            </motion.div>

            {products.length >= 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <button
                  className="bg-transparent border border-[#F04E23] text-[#F04E23] 
                px-8 py-3 rounded-full font-light hover:bg-[#F04E23] 
                hover:text-white transition-all duration-300"
                >
                  Load More Products
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default CategoriesProducts;
