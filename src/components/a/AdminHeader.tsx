import { useState } from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-[#e67e22] via-[#f39c12] to-[#d35400] border-b border-orange-400/20">
      <div className="flex justify-between items-center px-6 py-3">
        <Link
          to="/a/dashboard"
          className="flex items-center gap-2 group transition-all duration-300"
        >
          <motion.img
            src="/main-logo1.jpg"
            alt="Jinhua Hanji Company LTD"
            className="h-8"
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <div>
            <h1 className="text-sm font-bold tracking-wide text-white group-hover:text-white/90 transition">
              Admin
            </h1>
            <p className="text-xs text-orange-100 opacity-70">Panel</p>
          </div>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-300 border border-white/10 hover:border-white/30 group text-sm"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 transition">
              <FaUser className="text-xs text-white" />
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#e67e22] to-[#d35400] px-4 py-3">
                  <p className="text-white text-sm font-semibold">Admin Menu</p>
                </div>
                <li>
                  <Link
                    to="/a/profile"
                    className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <FaUser className="w-4 h-4 text-[#e67e22] group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>
                <li className="border-t border-gray-100">
                  <Link
                    to="/a/logout"
                    className="block px-5 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <FaSignOutAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Logout</span>
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
