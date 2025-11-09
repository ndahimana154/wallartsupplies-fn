import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeaderLoading = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </nav>

          <div className="flex-1 flex justify-center lg:justify-center">
            <Link to="/">
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="lg:hidden h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-[#e67e22] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Please wait...</p>
        </motion.div>
      </div>
    </>
  );
};

export default HeaderLoading;
