import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F04E23]/5 via-transparent to-white"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          className="text-[9rem] font-light text-gray-200 tracking-wider select-none"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
          Lost in the Gallery
        </h2>

        <p className="text-gray-600 max-w-md mx-auto mb-10 font-light leading-relaxed">
          The artwork section you’re looking for might have been moved, or never
          existed. Let’s guide you back to the main featured collection.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-[#F04E23] hover:bg-[#e67e22] text-white px-8 py-4 rounded-xl shadow-md transition-all font-medium"
          >
            <FaHome size={18} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 w-24 h-[2px] bg-[#F04E23]/30 rounded-full"></div>
    </div>
  );
};

export default NotFound;
