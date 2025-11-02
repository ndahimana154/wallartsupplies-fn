import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const VerifyResetLink = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (token === 'valid-token') {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      setLoading(false);
    }, 1000);
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Here call API to update password
    alert('Password updated successfully!');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Verifying link...
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#e67e22] mb-4">
          Invalid or Expired Link
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, the password reset link is not valid. Please request a new
          link.
        </p>
        <Link
          to="/a/forgot"
          className="bg-[#e67e22] hover:bg-[#F04E23] text-white px-6 py-3 rounded-xl shadow-md transition-all"
        >
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/hero1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 text-white">
          <img src="/text-logo.svg" className="w-40 mb-8" alt="Logo" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Reset Your Password
          </h2>
          <p className="text-lg md:text-xl font-light max-w-md">
            Enter a new password below to secure your account.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 md:px-20 py-20 bg-white">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
                placeholder="Retype new password"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#e67e22] hover:bg-[#F04E23] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md transition-all"
            >
              Update Password
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Remembered your password?{' '}
            <Link to="/a/login" className="text-[#e67e22] underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyResetLink;
