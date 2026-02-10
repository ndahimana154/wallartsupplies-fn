import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import productRequests from '../utils/requests/productRequests';
import { useEffect, useState } from 'react';
import type { CategoryData } from '../types/product';
import { adminEmail, adminPhone, companyAddress } from '../utils/axiosInstance';

const Footer = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBestCategories = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await productRequests.getBestCategories();

      if (response.success === true) {
        const categoriesData = response.data?.data || response.data || [];
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
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
  };

  useEffect(() => {
    fetchBestCategories();
  }, []);

  const displayCategories = Array.isArray(categories) ? categories : [];

  return (
    <footer className="bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 border-b border-gray-700 pb-8 sm:pb-10 md:pb-12">
          {/* Logo & About Section */}
          <div className="flex flex-col items-center sm:items-start">
            <Link
              to={'/'}
              className="inline-flex flex-col items-center sm:items-start mb-4 hover:opacity-90 transition-opacity"
              aria-label="Go to home"
            >
              <img
                src="/main-logo1.jpg"
                alt="Jinhua Hanji Company LTD Logo"
                className="w-14 sm:w-16 md:w-20 h-auto object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const next = (e.currentTarget as HTMLImageElement)
                    .nextElementSibling;
                  if (next) next.classList.remove('hidden');
                }}
              />
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#F04E23] hidden mt-2">
                Jinhua Hanji Company LTD
              </h1>
            </Link>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs text-center sm:text-left">
              Discover creativity and beauty for your walls and interiors.
              Bringing artistic vibes to your home with passion and precision.
            </p>
          </div>

          {/* Explore Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-base sm:text-lg font-semibold text-[#e67e22] mb-4 relative after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#F04E23] sm:after:bottom-[-8px] after:hidden sm:after:block">
              Explore
            </h2>
            <nav className="flex flex-col gap-2.5 sm:gap-3 text-gray-300 text-xs sm:text-sm w-full">
              <Link
                to="/"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                Home
              </Link>
              {loading ? (
                [...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-4 bg-gray-700 rounded animate-pulse w-20"
                  ></div>
                ))
              ) : error ? (
                <span className="text-gray-500 text-xs">
                  Failed to load categories
                </span>
              ) : (
                displayCategories.slice(0, 5).map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all truncate"
                    title={category.name}
                  >
                    {category.name}
                  </Link>
                ))
              )}
              <Link
                to="/search"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                Collections
              </Link>
            </nav>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-base sm:text-lg font-semibold text-[#e67e22] mb-4 relative after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#F04E23] sm:after:bottom-[-8px] after:hidden sm:after:block">
              Company
            </h2>
            <nav className="flex flex-col gap-2.5 sm:gap-3 text-gray-300 text-xs sm:text-sm w-full">
              <Link
                to="/about-us"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                FAQ
              </Link>
              <Link
                to="/terms"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="hover:text-[#F04E23] transition-colors duration-200 hover:pl-1 sm:hover:pl-2 transition-all"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center sm:items-start w-full">
            <h2 className="text-base sm:text-lg font-semibold text-[#e67e22] mb-4 relative after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#F04E23] sm:after:bottom-[-8px] after:hidden sm:after:block">
              Contact
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300 w-full">
              {/* Email */}
              <a
                href={`mailto:${adminEmail}`}
                className="flex items-center gap-2 sm:gap-3 hover:text-[#F04E23] transition-colors duration-200 group break-all"
              >
                <Mail
                  size={16}
                  className="text-[#F04E23] flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="group-hover:pl-1 transition-all truncate">
                  {adminEmail}
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${adminPhone}`}
                className="flex items-center gap-2 sm:gap-3 hover:text-[#F04E23] transition-colors duration-200 group"
              >
                <Phone
                  size={16}
                  className="text-[#F04E23] flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="group-hover:pl-1 transition-all">
                  {adminPhone}
                </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin
                  size={16}
                  className="text-[#F04E23] flex-shrink-0 mt-0.5"
                />
                <span className="break-words text-xs sm:text-sm leading-relaxed">
                  {companyAddress}
                </span>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 sm:gap-5 mt-4 pt-4 border-t border-gray-700">
                <a
                  href="#"
                  className="hover:scale-110 transition-transform duration-300 hover:text-[#F04E23] text-gray-400"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform duration-300 hover:text-[#F04E23] text-gray-400"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform duration-300 hover:text-[#F04E23] text-gray-400"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <Twitter size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="flex flex-col gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 md:mt-10 py-4 sm:py-6">
          {/* Links Section */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6 text-center sm:text-left">
            <Link
              to="/privacy"
              className="hover:text-[#F04E23] transition-colors duration-200 whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              to="/terms"
              className="hover:text-[#F04E23] transition-colors duration-200 whitespace-nowrap"
            >
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              to="/contact-us"
              className="hover:text-[#F04E23] transition-colors duration-200 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-left border-t border-gray-700 pt-4 sm:pt-6">
            <p className="text-xs sm:text-sm">
              &copy; 2024-2026 Jinhua Hanji Company LTD. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Designed with <span className="text-[#F04E23]">❤</span> for
              quality and creativity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
