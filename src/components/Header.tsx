import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
        <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-[#e67e22] transition">
            Home
          </Link>
          <Link to="/walls" className="hover:text-[#e67e22] transition">
            Walls
          </Link>
          <Link to="/interiors" className="hover:text-[#e67e22] transition">
            Interiors
          </Link>
          <Link to="/interior" className="hover:text-[#e67e22] transition">
            Interior
          </Link>
        </nav>

        <div className="flex-1 flex justify-center lg:justify-center">
          <Link to="/">
            <img
              src="/text-logo.svg"
              alt="Logo"
              className="h-15 w-auto hover:opacity-90 transition"
            />
          </Link>
        </div>

        {/* Right section */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Search bar */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 text-sm focus:outline-none w-40 focus:w-56 transition-all duration-300"
            />
            <button className="bg-[#F04E23] hover:bg-[#23c865] text-white p-2.5 transition">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Contact */}
          <Link
            to="/contact-us"
            className="text-gray-700 hover:text-[#e67e22] font-medium transition"
          >
            Contact Us
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/yourNumber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="h-7 w-7" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#e67e22] transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#e67e22]"
            >
              Home
            </Link>
            <Link
              to="/walls"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#e67e22]"
            >
              Walls
            </Link>
            <Link
              to="/interiors"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#e67e22]"
            >
              Interiors
            </Link>
            <Link
              to="/interior"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#e67e22]"
            >
              Interior
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#e67e22]"
            >
              Contact Us
            </Link>

            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 text-sm focus:outline-none flex-1"
              />
              <button className="bg-[#F04E23] hover:bg-[#23c865] text-white p-2 transition">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <a
              href="https://wa.me/yourNumber"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F04E23] hover:text-[#23c865]"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-6 w-6" />
              <span>Chat on WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
