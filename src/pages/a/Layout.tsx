import {
  FaBox,
  FaHome,
  FaChartBar,
  FaTags,
  FaShoppingBag,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminHeader from '../../components/a/AdminHeader';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: <FaChartBar />, path: '/a/dashboard' },
    { name: 'Products', icon: <FaBox />, path: '/a/products' },
    { name: 'Categories', icon: <FaTags />, path: '/a/categories' },
    { name: 'Orders', icon: <FaShoppingBag />, path: '/a/orders' },
    { name: 'Home', icon: <FaHome />, path: '/' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50 text-gray-800">
      <AdminHeader />

      <div className="flex pt-16">
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-white border-r border-gray-100 shadow-md transition-all duration-300 h-[calc(100vh-4rem)] fixed top-16 left-0 flex flex-col`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <h2
              className={`text-[#e67e22] font-semibold text-lg transition-all duration-300 ${
                !isSidebarOpen && 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Admin Panel
            </h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-[#e67e22] p-2 rounded-md transition"
            >
              {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </div>

          <ul className="flex flex-col mt-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg mx-2 my-1 hover:bg-[#e67e22]/10 hover:text-[#e67e22] transition font-medium"
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-100">
            {isSidebarOpen && <p>© 2025 Wall Art Supplies</p>}
          </div>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 p-6 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
