import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Package, Palette, FileText } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryData } from '../types/product';
import productRequests from '../utils/requests/productRequests';
import HeaderLoading from './header/HeaderLoading';
import HeaderError from './header/HeaderError';
import Chatbot from './Chatbot';
import { useNavigation } from '../helpers/product';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleMobileMenu, closeMobileMenu } from '../store/slices/appSlice';

const Header = () => {
  const { whatsAppClick } = useNavigation();
  const dispatch = useAppDispatch();
  const menuOpen = useAppSelector((s) => s.app.mobileMenuOpen);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const moreMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [currentMobileHeaderIndex, setCurrentMobileHeaderIndex] = useState(0);
  const mobileHeaders = [
    {
      icon: <Palette className="w-4 h-4" />,
      text: 'We manufacture Creative Designs',
    },
    {
      icon: <Package className="w-4 h-4" />,
      text: 'Trusted Logistic Partners',
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: 'We Handle All Paperwork',
    },
  ];

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
        error.message || 'Something went wrong while loading categories',
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
    dispatch(closeMobileMenu());
    setShowMoreMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(closeMobileMenu());
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeMobileMenu());
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobileHeaderIndex((prevIndex) =>
        prevIndex === mobileHeaders.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
    dispatch(closeMobileMenu());
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    whatsAppClick();
    dispatch(closeMobileMenu());
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
    }, 150);
  };

  const toggleMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
  };

  if (loading) {
    return <HeaderLoading />;
  }

  if (error) {
    return <HeaderError fetchBestCategories={fetchBestCategories} />;
  }

  return (
    <>
      {/* Top Promo Bar */}
      <div className="bg-gradient-to-r from-[#F04E23] to-[#e67e22] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-2 md:gap-4">
            <div className="hidden md:flex items-center justify-between w-full gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 flex-1">
                <Palette className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">
                  We manufacture Creative Designs
                </span>
              </div>

              <div className="flex items-center gap-2 flex-1">
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">Trusted Logistic Partners</span>
              </div>

              <div className="flex items-center gap-2 flex-1">
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">We Handle All Paperwork</span>
              </div>
            </div>

            <div className="md:hidden w-full text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMobileHeaderIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  {mobileHeaders[currentMobileHeaderIndex].icon}
                  <span className="text-xs sm:text-sm font-medium">
                    {mobileHeaders[currentMobileHeaderIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center mt-1 space-x-1">
                {mobileHeaders.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentMobileHeaderIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Improved Layout */}
      <header className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Logo - Left Side (Mobile & Desktop) */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                aria-label="Go to home"
              >
                <img
                  src="/main-logo1.jpg"
                  alt="Jinhua Hanji Company Logo"
                  className="h-10 sm:h-14 lg:h-16 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      'none';
                  }}
                />
              </Link>
            </div>

            {/* Navigation - Center (Desktop Only) */}
            <nav className="hidden lg:flex items-center justify-center gap-1 text-gray-700 font-medium flex-1 mx-8">
              <Link
                to="/"
                className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-3 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300 text-sm whitespace-nowrap"
              >
                Home
              </Link>

              <Link
                to="/search"
                className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-3 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300 text-sm whitespace-nowrap"
              >
                Collections
              </Link>

              {categories?.slice(0, 1).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-3 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300 text-sm whitespace-nowrap"
                  title={cat.name}
                >
                  {cat.name}
                </Link>
              ))}

              {categories.length > 1 && (
                <div
                  className="relative"
                  ref={moreMenuRef}
                  onMouseEnter={handleMoreMenuMouseEnter}
                  onMouseLeave={handleMoreMenuMouseLeave}
                >
                  <button
                    onClick={toggleMoreMenu}
                    className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-3 flex items-center gap-1 text-sm whitespace-nowrap"
                    aria-expanded={showMoreMenu}
                    aria-label="More categories"
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
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                        role="menu"
                      >
                        {categories.slice(1).map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/categories/${cat.slug}`}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F04E23] transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => setShowMoreMenu(false)}
                            role="menuitem"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <Link
                to="/about-us"
                className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-3 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300 text-sm whitespace-nowrap"
              >
                About Us
              </Link>

              <Link
                to="/contact-us"
                className="hover:text-[#F04E23] transition-colors duration-200 py-2 px-3 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F04E23] after:w-0 hover:after:w-full after:transition-all after:duration-300 text-sm whitespace-nowrap"
              >
                Contact Us
              </Link>
            </nav>

            {/* Search & Actions - Right Side (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden transition-all duration-300 focus-within:border-[#F04E23] focus-within:shadow-md hover:border-gray-400 bg-gray-50 hover:bg-white">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent px-4 py-2.5 focus:outline-none text-sm w-48"
                    aria-label="Search products"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-gray-600 hover:text-[#F04E23] transition-colors"
                    aria-label="Submit search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-[#1faa50] transition-colors font-medium text-sm whitespace-nowrap hover:shadow-lg"
                aria-label="Chat on WhatsApp"
              >
                <BsWhatsapp className="w-5 h-5" />
                Chat
              </button>
            </div>

            {/* Mobile Search & WhatsApp Icons */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  navigate('/search');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go to search"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#25D366]"
                aria-label="Chat on WhatsApp"
              >
                <BsWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-gray-200 bg-white"
              >
                <nav className="py-4 space-y-1">
                  <Link
                    to="/"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-[#F04E23] transition-colors font-medium"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    Home
                  </Link>

                  <Link
                    to="/search"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-[#F04E23] transition-colors font-medium"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    Collections
                  </Link>

                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/categories/${cat.slug}`}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-[#F04E23] transition-colors font-medium"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      {cat.name}
                    </Link>
                  ))}

                  <Link
                    to="/about-us"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-[#F04E23] transition-colors font-medium"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    About Us
                  </Link>

                  <Link
                    to="/contact-us"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-[#F04E23] transition-colors font-medium"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    Contact Us
                  </Link>

                  <form
                    onSubmit={handleSearch}
                    className="px-4 py-3 border-t border-gray-200 mt-2"
                  >
                    <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-[#F04E23]">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-3 py-2.5 focus:outline-none text-sm"
                        aria-label="Search products mobile"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2.5 text-gray-600 hover:text-[#F04E23] transition-colors"
                        aria-label="Submit search mobile"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <Chatbot />
    </>
  );
};

export default Header;
