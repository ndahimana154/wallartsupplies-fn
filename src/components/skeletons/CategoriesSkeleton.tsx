import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../Skeleton';

const CategoriesSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-4" />
        </motion.div>

        {/* Grid Skeleton */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-gray-200 h-64"
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
