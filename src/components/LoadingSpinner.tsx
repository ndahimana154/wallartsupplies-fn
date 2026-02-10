import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = 'medium',
  text = 'Loading...',
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-3',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-5',
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50'
    : 'flex items-center justify-center py-12';

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Spinner */}
        <motion.div
          className={`${sizeClasses[size]} border-[#F04E23] border-t-transparent rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* Optional pulsing dots */}
        <motion.div className="mt-4 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#F04E23] rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Text */}
        {text && (
          <motion.p
            className="text-gray-600 font-light mt-4 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
