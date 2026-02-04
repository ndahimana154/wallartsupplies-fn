import { motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleMobileMenu } from '../../store/slices/appSlice';

interface HeaderErrorProps {
  fetchBestCategories: () => void;
}

const HeaderError = ({ fetchBestCategories }: HeaderErrorProps) => {
  const dispatch = useAppDispatch();
  const menuOpen = useAppSelector((s) => s.app.mobileMenuOpen);
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-[#e67e22] transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-[#e67e22] transition">
              All Products
            </Link>
            <Link to="/contact-us" className="hover:text-[#e67e22] transition">
              Contact Us
            </Link>
          </nav>

          <div className="flex-1 flex justify-center lg:justify-center">
            <Link to="/">
              <img
                src="/main-logo1.jpg"
                alt="Logo"
                className="h-12 w-auto hover:opacity-90 transition"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/contact-us"
              className="text-gray-700 hover:text-[#e67e22] font-medium transition"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/yourNumber"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <BsWhatsapp className="w-5 h-5" />
            </a>
          </div>

          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="lg:hidden p-2 text-gray-700 hover:text-[#e67e22] transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Technical Error
          </h3>
          <p className="text-gray-600 mb-6">
            We're experiencing some technical issues. Please try again later.
          </p>
          <button
            onClick={fetchBestCategories}
            className="bg-[#e67e22] text-white px-6 py-2 rounded-full font-medium hover:bg-[#cf711f] transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default HeaderError;
