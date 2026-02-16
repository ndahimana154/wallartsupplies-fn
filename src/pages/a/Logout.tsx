import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { clearAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      clearAuth();
    } catch (err) {
      try {
        localStorage.removeItem('userToken');
        sessionStorage.removeItem('token');
      } catch (e) {}
    }

    const t = setTimeout(() => {
      window.location.href = '/a/login';
    }, 4000);

    return () => {
      clearTimeout(t);
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md p-6 bg-white rounded-2xl border border-gray-100"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={isLoading ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={{ duration: 1.6, repeat: isLoading ? Infinity : 0 }}
            className="p-3 rounded-full bg-[#fff6ef] text-[#e67e22] text-4xl"
          >
            <FiLogOut />
          </motion.div>

          <h2 className="text-2xl font-semibold">Signing out</h2>
          <p className="text-sm text-gray-500 text-center">
            You have been signed out. Redirecting to login page...
          </p>

          <div className="flex gap-3 mt-4">
            <Link
              to="/a/login"
              className="px-4 py-2 bg-[#e67e22] hover:bg-[#f04e23] text-white rounded-lg"
            >
              Go to Login
            </Link>

            <Link
              to="/"
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700"
            >
              Return Home
            </Link>
          </div>

          <div className="w-full mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#e67e22]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;
