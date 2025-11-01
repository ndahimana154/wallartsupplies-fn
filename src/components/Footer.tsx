import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] text-white pt-12 pb-6 px-6 md:px-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 border-b border-gray-700 pb-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
          <Link to={'/'}>
            <img
              src="/main-logo.svg"
              alt="Wall Art Supplies"
              className="w-40 mb-3"
            />
            <h1 className="text-2xl font-semibold text-[#F04E23] mb-3">
              Wall Art Supplies
            </h1>
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            Discover creativity and beauty for your walls and interiors.
            Bringing artistic vibes to your home with passion and precision.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-lg font-semibold text-[#e67e22] mb-2">Explore</h2>
          <nav className="flex flex-col gap-2 text-gray-300 text-sm">
            <Link to="/" className="hover:text-[#F04E23] transition">
              Home
            </Link>
            <Link to="/walls" className="hover:text-[#F04E23] transition">
              Walls
            </Link>
            <Link to="/interiors" className="hover:text-[#F04E23] transition">
              Interiors
            </Link>
            <Link to="/interior" className="hover:text-[#F04E23] transition">
              Interior
            </Link>
          </nav>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col items-center md:items-start gap-3 text-sm text-gray-300">
          <h2 className="text-lg font-semibold text-[#e67e22] mb-2">
            Contact Us
          </h2>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#F04E23]" />
            <span>support@wallartsupplies.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#F04E23]" />
            <span>+1 (555) 555-555</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#F04E23]" />
            <span>Kigali, Rwanda</span>
          </div>

          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
            >
              <Facebook size={20} className="text-[#F04E23]" />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
            >
              <Instagram size={20} className="text-[#F04E23]" />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition-transform duration-300"
            >
              <Twitter size={20} className="text-[#F04E23]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs mt-6 gap-3">
        <div className="flex gap-4">
          <Link to="/terms" className="hover:text-[#e67e22] transition">
            Terms & Conditions
          </Link>
          <Link to="/faq" className="hover:text-[#e67e22] transition">
            FAQ
          </Link>
          <Link to="/about" className="hover:text-[#e67e22] transition">
            Our Company
          </Link>
        </div>
        <p className="text-center">
          © {new Date().getFullYear()} – {new Date().getFullYear() + 1} Wall Art
          Supplies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
