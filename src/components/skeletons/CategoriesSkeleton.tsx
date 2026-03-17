import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../Skeleton';

const CategoriesSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Skeleton className="h-8 w-56 mx-auto mb-3" />
          <Skeleton className="h-4 w-80 mx-auto mb-2" />
        </motion.div>

        {/* Grid Skeleton */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden bg-gray-200 h-32 md:h-40"
            >
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
