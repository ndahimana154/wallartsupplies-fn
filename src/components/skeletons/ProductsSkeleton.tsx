import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../Skeleton';

const ProductsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-3" />
          <Skeleton className="h-4 w-80 mx-auto" />
          <div className="w-24 h-[2px] bg-gray-300 mx-auto mt-4" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.05,
              }}
            >
              <div className="bg-gray-200 h-24 sm:h-28 md:h-32 w-full mb-2 rounded-lg animate-pulse" />
              <div className="space-y-2 px-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsSkeleton;
