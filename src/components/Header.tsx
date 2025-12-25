import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryData } from '../types/product';
import productRequests from '../utils/requests/productRequests';
import HeaderLoading from './header/HeaderLoading';
import HeaderError from './header/HeaderError';
import { whatsAppClick } from '../helpers/product';
import Chatbot from './Chatbot';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // FIXED: Changed NodeJS.Timeout to ReturnType<typeof setTimeout>
  const moreMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const fetchBestCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await productRequests.getBestCategories();

      if (response.success === true) {
        setCategories(response.data.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch categories');
      }
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      setError(
        error.message || 'Something went wrong while loading categories'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBestCategories();
  }, [fetchBestCategories]);

  useEffect(() => {
    return () => {
      if (moreMenuTimeoutRef.current) {
        clearTimeout(moreMenuTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setShowMoreMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
    setMenuOpen(false);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    whatsAppClick();
    setMenuOpen(false);
  };

  const handleMoreMenuMouseEnter = () => {
    if (moreMenuTimeoutRef.current) {
      clearTimeout(moreMenuTimeoutRef.current);
      moreMenuTimeoutRef.current = null;
    }
    setShowMoreMenu(true);
  };

  const handleMoreMenuMouseLeave = () => {
    if (moreMenuTimeoutRef.current) {
      clearTimeout(moreMenuTimeoutRef.current);
    }
    moreMenuTimeoutRef.current = setTimeout(() => {
      setShowMoreMenu(false);
    }, 150); // Reduced delay for better UX
  };

  const toggleMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
  };

  if (loading) {
    return <HeaderLoading />;
  }

  if (error) {
    return (
      <HeaderError
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        fetchBestCategories={fetchBestCategories}
      />
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </Link>

          <Link
            to="/search"
            className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Our collections
          </Link>

          {categories?.slice(0, 3).map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}

          {categories.length > 3 && (
            <div
              className="relative"
              ref={moreMenuRef}
              onMouseEnter={handleMoreMenuMouseEnter}
              onMouseLeave={handleMoreMenuMouseLeave}
            >
              <button
                onClick={toggleMoreMenu}
                className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-1 flex items-center gap-1"
              >
                More
                <span
                  className={`transform transition-transform duration-200 ${
                    showMoreMenu ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    {categories.slice(3).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/categories/${cat.slug}`}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F04E23] transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setShowMoreMenu(false);
                          if (moreMenuTimeoutRef.current) {
                            clearTimeout(moreMenuTimeoutRef.current);
                          }
                        }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="flex-1 flex justify-center lg:justify-center">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/main-logo.jpg"
              alt="Logo"
              className="h-12 w-auto hover:opacity-90 transition-opacity duration-200"
              loading="lazy"
              width={120}
              height={48}
            />
          </Link>
        </div>

        {/* Desktop Right Side Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden transition-all duration-300 focus-within:border-[#F04E23] focus-within:ring-2 focus-within:ring-[#F04E23]/20 hover:border-gray-400">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-5 py-2.5 text-sm focus:outline-none w-48 xl:w-56 bg-transparent placeholder-gray-500"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="bg-[#F04E23] hover:bg-[#e65c1a] text-white p-2.5 px-4 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <Link
            to="/contact-us"
            className="text-gray-700 hover:text-[#F04E23] font-medium transition-colors duration-200 whitespace-nowrap px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Contact Us
          </Link>
          <Link
            to="/about-us"
            className="text-gray-700 hover:text-[#F04E23] font-medium transition-colors duration-200 whitespace-nowrap px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            About Us
          </Link>

          <button
            onClick={handleWhatsAppClick}
            className="text-green-600 hover:text-green-700 transition-colors duration-200 p-1 hover:scale-110 active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <BsWhatsapp className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#F04E23] transition-colors duration-200 rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
              {/* Search Form - Top of mobile menu */}
              <form
                onSubmit={handleSearch}
                className="pb-4 border-b border-gray-200"
              >
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:border-[#F04E23] focus-within:ring-2 focus-within:ring-[#F04E23]/20">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-5 py-3 text-base focus:outline-none flex-1 bg-transparent placeholder-gray-500"
                    aria-label="Search products"
                  />
                  <button
                    type="submit"
                    className="bg-[#F04E23] hover:bg-[#e65c1a] text-white p-3 px-5 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:text-[#F04E23] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/search"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:text-[#F04E23] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Our collections
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:text-[#F04E23] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}

                <Link
                  to="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:text-[#F04E23] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Contact Us
                </Link>

                <Link
                  to="/about-us"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:text-[#F04E23] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  About Us
                </Link>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center gap-3 py-3 px-4 text-green-600 hover:text-green-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  <BsWhatsapp className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </nav>

              <div className="pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-medium text-gray-800">Need help?</p>
                  <p>Mon-Fri: 9AM - 6PM</p>
                  <p>Sat: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        body {
          padding-top: 80px;
        }
        @media (max-width: 1024px) {
          body {
            padding-top: 80px;
          }
        }
      `}</style>

      <Chatbot />
    </header>
  );
};

export default Header;
