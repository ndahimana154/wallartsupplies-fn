import { useState } from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { RxDropdownMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/60 shadow-lg border-b border-white/10">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo & Title */}
        <Link
          to="/a/dashboard"
          className="flex items-center gap-3 group transition-all"
        >
          <motion.img
            src="/main-logo.svg"
            alt="Wall Art Supplies"
            className="h-9 drop-shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <h1 className="text-xl font-bold tracking-wide text-white group-hover:text-[#e67e22] transition">
            Dashboard
          </h1>
        </Link>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <FaUser className="text-[#e67e22]" />
            <RxDropdownMenu />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-48 bg-white/95 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <li>
                  <Link
                    to="/a/profile"
                    className="block px-4 py-2 hover:bg-[#e67e22]/10 transition text-gray-800"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/a/settings"
                    className="block px-4 py-2 hover:bg-[#e67e22]/10 transition text-gray-800"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/a/logout"
                    className="block px-4 py-2 text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
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
