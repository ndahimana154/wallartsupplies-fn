import {
  FaBox,
  FaChartBar,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminHeader from '../../components/a/AdminHeader';
import { MdAdsClick } from 'react-icons/md';
import { BsInfoSquareFill } from 'react-icons/bs';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: <FaChartBar />, path: '/a/dashboard' },
    { name: 'Products', icon: <FaBox />, path: '/a/products' },
    { name: 'Categories', icon: <FaTags />, path: '/a/categories' },
    { name: 'Hero Ads', icon: <MdAdsClick />, path: '/a/hero-ads' },
    { name: 'Inquiries', icon: <BsInfoSquareFill />, path: '/a/inquiries' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50 text-gray-800">
      <AdminHeader />

      <div className="flex pt-14">
        <aside
          className={`${
            isSidebarOpen ? 'w-56' : 'w-16'
          } mt-5 bg-white border-r border-gray-100 transition-all duration-300 h-[calc(100vh-3.5rem)] fixed top-14 left-0 flex flex-col z-11 overflow-y-auto`}
        >
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100">
            <h2
              className={`text-[#e67e22] font-semibold text-sm transition-all duration-300 ${
                !isSidebarOpen && 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Menu
            </h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-[#e67e22] p-1.5 rounded-md transition text-sm"
            >
              {isSidebarOpen ? (
                <FaChevronLeft className="w-4 h-4" />
              ) : (
                <FaChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          <ul className="flex flex-col mt-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 px-3 py-2 rounded-md mx-1 my-0.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:text-[#e67e22] transition font-medium text-sm"
                >
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="text-xs md:text-sm">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-3 text-xs text-gray-400 border-t border-gray-100">
            {isSidebarOpen && <p className="text-xs">© 2025 Jinhua Hanji</p>}
          </div>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 p-4 md:p-5 ${
            isSidebarOpen ? 'ml-56' : 'ml-16'
          }`}
        >
          <div className="bg-white rounded-xl p-4 md:p-5 min-h-[calc(100vh-6rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
