import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryData } from '../types/product';
import productRequests from '../utils/requests/productRequests';
import HeaderLoading from './header/HeaderLoading';
import HeaderError from './header/HeaderError';
import { whatsAppClick } from '../helpers/product';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchBestCategories = async () => {
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
  };

  useEffect(() => {
    fetchBestCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (searchQuery.trim()) {
      navigate(`/search?search=${searchQuery}`);
      setSearchQuery('');
    }
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
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
        <nav className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-[#e67e22] transition-colors duration-200 py-2"
          >
            Home
          </Link>

          <Link
            to="/search"
            className="hover:text-[#e67e22] transition-colors duration-200 py-2"
          >
            Our collections
          </Link>

          {categories?.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="hover:text-[#e67e22] transition-colors duration-200 py-2 whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          {categories.length > 4 && (
            <div className="relative group">
              <button className="hover:text-[#e67e22] transition-colors duration-200 py-2">
                More ▼
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.slice(4).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#e67e22] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="flex-1 flex justify-center lg:justify-center">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/text-logo.svg"
              alt="Logo"
              className="h-12 w-auto hover:opacity-90 transition-opacity duration-200"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden transition-all duration-300 focus-within:border-[#e67e22] focus-within:ring-2 focus-within:ring-[#e67e22]/20">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 text-sm focus:outline-none w-40 lg:w-48 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-[#F04E23] hover:bg-[#e67e22] text-white p-2.5 transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <Link
            to="/contact-us"
            className="text-gray-700 hover:text-[#e67e22] font-medium transition-colors duration-200 whitespace-nowrap"
          >
            Contact Us
          </Link>
          <Link
            to="/about-us"
            className="text-gray-700 hover:text-[#e67e22] font-medium transition-colors duration-200 whitespace-nowrap"
          >
            About Us
          </Link>

          <button
            onClick={() => whatsAppClick()}
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 transition-colors duration-200"
          >
            <BsWhatsapp className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#e67e22] transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-3 text-gray-700 font-medium">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-[#e67e22] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/search"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-[#e67e22] transition-colors"
              >
                Our collections
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 hover:text-[#e67e22] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}

              <form onSubmit={handleSearch} className="pt-2">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 text-sm focus:outline-none flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#F04E23] hover:bg-[#e67e22] text-white p-2 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <Link
                to="/contact-us"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-[#e67e22] transition-colors"
              >
                Contact Us
              </Link>

              <button
                onClick={() => whatsAppClick()}
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors duration-200"
              >
                <BsWhatsapp className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
