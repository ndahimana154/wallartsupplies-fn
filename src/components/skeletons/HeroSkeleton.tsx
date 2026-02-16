import React from 'react';
import { motion } from 'framer-motion';

const HeroSkeleton: React.FC = () => {
  return (
    <motion.div
      className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden bg-gray-300"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 text-white max-w-6xl">
        <div className="space-y-6">
          <div className="h-16 bg-gray-400 rounded w-3/4 animate-pulse" />
          <div className="h-8 bg-gray-400 rounded w-full animate-pulse" />
          <div className="h-8 bg-gray-400 rounded w-5/6 animate-pulse" />

          <div className="pt-4 w-[220px]">
            <div className="h-14 bg-gray-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSkeleton;
