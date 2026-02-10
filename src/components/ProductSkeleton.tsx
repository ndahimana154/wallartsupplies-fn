import { motion } from 'framer-motion';

interface ProductSkeletonProps {
  count?: number;
}

const ProductSkeleton = ({ count = 3 }: ProductSkeletonProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-14 px-2 md:px-0">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="flex flex-col"
        >
          {/* Image skeleton */}
          <div className="relative w-full bg-gray-200 rounded-xl overflow-hidden mb-4 aspect-square" />

          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />

          {/* Description skeleton */}
          <div className="h-3 bg-gray-100 rounded w-full mb-2" />
          <div className="h-3 bg-gray-100 rounded w-5/6 mb-4" />

          {/* Price skeleton */}
          <div className="flex justify-between items-end">
            <div className="h-5 bg-gray-300 rounded w-1/3" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
