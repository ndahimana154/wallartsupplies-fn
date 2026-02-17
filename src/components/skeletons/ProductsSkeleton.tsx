import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../Skeleton';

const ProductsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-24 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* Header Skeleton */}
        <div className="text-center mb-20">
          <Skeleton className="h-14 w-72 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto" />
          <div className="w-24 h-[2px] bg-gray-300 mx-auto mt-8" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-14 px-2 md:px-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.05,
              }}
            >
              <div className="bg-gray-200 h-64 md:h-72 w-full mb-4 rounded-2xl animate-pulse" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-1/2 mt-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsSkeleton;
