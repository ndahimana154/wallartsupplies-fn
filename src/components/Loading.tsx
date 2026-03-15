import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = 'Loading...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-[#F04E23] ${sizeClasses[size]} mb-4`}
      />
      {text && <p className="text-gray-600 font-light text-center">{text}</p>}
    </motion.div>
  );
};

export default Loading;
