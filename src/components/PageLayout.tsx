import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import SeoSetup from './SeoSetup';
import Loading from './Loading';

interface PageLayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  showHeader?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
  loading = false,
  loadingText,
  className = '',
  showHeader = true,
}) => {
  if (loading) {
    return (
      <>
        {title && <SeoSetup mainData={{ title }} />}
        <div className="min-h-screen flex items-center justify-center">
          <Loading text={loadingText} />
        </div>
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${className}`}
    >
      {title && <SeoSetup mainData={{ title, description }} />}

      {showHeader && (
        <div className="relative overflow-hidden py-4 text-center">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {title && (
                <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
                  {title}
                </h1>
              )}
              {description && (
                <motion.p
                  className="text-gray-600 max-w-2xl mx-auto font-light text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {description}
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {children}
    </motion.div>
  );
};

export default PageLayout;
