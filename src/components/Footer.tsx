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
        error.message || 'Something went wrong while loading categories'
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
    <footer className="bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] text-white pt-12 pb-6 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-b border-gray-700 pb-10">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link
              to={'/'}
              className="inline-flex flex-col items-center sm:items-start mb-4"
              aria-label="Go to home"
            >
              <img
                src="/main-logo1.jpg"
                alt="Jinhua Hanji Company LTD Logo"
                className="w-16 sm:w-20 h-auto object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const next = (e.currentTarget as HTMLImageElement)
                    .nextElementSibling;
                  if (next) next.classList.remove('hidden');
                }}
              />
              <h1 className="text-xl sm:text-2xl font-semibold text-[#F04E23] hidden">
                Jinhua Hanji Company LTD
              </h1>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Discover creativity and beauty for your walls and interiors.
              Bringing artistic vibes to your home with passion and precision.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg font-semibold text-[#e67e22] mb-4">
              Explore
            </h2>
            <nav className="flex flex-col gap-3 text-gray-300 text-sm">
              <Link
                to="/"
                className="hover:text-[#F04E23] transition-colors duration-200"
              >
                Home
              </Link>
              {loading ? (
                [...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-4 bg-gray-700 rounded animate-pulse w-24"
                  ></div>
                ))
              ) : error ? (
                <span className="text-gray-500 text-xs">
                  Failed to load categories
                </span>
              ) : (
                displayCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="hover:text-[#F04E23] transition-colors duration-200"
                    title={category.name}
                  >
                    {category.name}
                  </Link>
                ))
              )}
              <Link
                to="/products"
                className="hover:text-[#F04E23] transition-colors duration-200"
              >
                Latest collections
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg font-semibold text-[#e67e22] mb-4">
              Company
            </h2>
            <nav className="flex flex-col gap-3 text-gray-300 text-sm">
              <Link
                to="/about-us"
                className="hover:text-[#F04E23] transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className="hover:text-[#F04E23] transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="hover:text-[#F04E23] transition-colors duration-200"
              >
                FAQ
              </Link>
              <Link
                to="/terms"
                className="hover:text-[#F04E23] transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-lg font-semibold text-[#e67e22] mb-4">
              Contact Us
            </h2>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail size={18} className="text-[#F04E23] flex-shrink-0" />
                <a
                  href={`mailto:${adminEmail}`}
                  className="hover:text-[#F04E23] transition-colors break-all"
                >
                  {adminEmail}
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone size={18} className="text-[#F04E23] flex-shrink-0" />
                <a
                  href={`tel:${adminPhone}`}
                  className="hover:text-[#F04E23] transition-colors"
                >
                  {adminPhone}
                </a>
              </div>
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin
                  size={18}
                  className="text-[#F04E23] flex-shrink-0 mt-0.5"
                />
                <span className="break-words">{companyAddress}</span>
              </div>

              <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                <a
                  href="#"
                  className="hover:scale-110 transition-transform duration-300"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook size={20} className="text-[#F04E23]" />
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform duration-300"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram size={20} className="text-[#F04E23]" />
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform duration-300"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <Twitter size={20} className="text-[#F04E23]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm mt-6 gap-4 py-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              to="/privacy"
              className="hover:text-[#F04E23] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-[#F04E23] transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-[#F04E23] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-center md:text-right">
            &copy; 2024 Jinhua Hanji Company LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
