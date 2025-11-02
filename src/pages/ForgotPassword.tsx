import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here (API call)
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Hero Panel */}
      <div
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/hero1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 text-white">
          <img src="/text-logo.svg" className="w-40 mb-8" alt="Logo" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Forgot Password?
          </h2>
          <p className="text-lg md:text-xl font-light max-w-md mb-4">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <p className="text-sm md:text-base">
            If you remember your password,{' '}
            <Link to="/login" className="text-[#e67e22] underline">
              go back to login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-20 py-20 bg-white">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Reset Your Password
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
                placeholder="you@example.com"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#e67e22] hover:bg-[#F04E23] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md transition-all"
            >
              Send Reset Link
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Remembered your password?{' '}
            <Link to="/login" className="text-[#e67e22] underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
