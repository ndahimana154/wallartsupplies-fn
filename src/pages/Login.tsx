import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import userRequests from '../utils/requests/userRequests';
import auth from '../utils/auth';
import { loginValidationSchema } from '../utils/formValidation';

const Login = () => {
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    setStatusMessage({ type: null, message: '' });

    try {
      const response = await userRequests.loginRequest(values);

      if (response.success === true) {
        auth.setAuth(response.data.session.token, 7200);
        setStatusMessage({
          type: 'success',
          message: 'Login successful! Redirecting...',
        });
        resetForm();
        setTimeout(() => {
          window.location.href = '/a/dashboard';
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          message: 'Invalid credentials. Please check your email or password.',
        });
      }
    } catch (error: any) {
      setStatusMessage({
        type: 'error',
        message: error.message || 'An error occurred. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <div
        className="hidden md:flex md:flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/hero1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-8 lg:px-20 text-white">
          <Link to={'/'} className="mb-8 inline-flex">
            <img
              src="/main-logo.jpg"
              className="w-32 lg:w-40 h-auto object-contain"
              alt="Jinhua Hanji Company Logo"
              loading="lazy"
            />
          </Link>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Welcome back, Boss!
          </h2>
          <p className="text-base lg:text-xl font-light max-w-md mb-6">
            A fresh day to manage your company with confidence.
          </p>
          <p className="text-sm lg:text-base">
            If you are here by mistake,{' '}
            <Link
              to="/"
              className="text-[#e67e22] underline hover:text-[#d35400] transition-colors"
            >
              go back home
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-20 py-12 md:py-20 bg-white">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, isValid, dirty }) => (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="md:hidden mb-8 text-center">
                <Link to={'/'} className="inline-flex">
                  <img
                    src="/main-logo.jpg"
                    className="w-24 h-auto object-contain"
                    alt="Jinhua Hanji Company Logo"
                    loading="lazy"
                  />
                </Link>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center">
                Login
              </h1>
              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Sign in to access your dashboard
              </p>

              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`w-full border rounded-lg px-4 py-3 text-base focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                        : touched.email && !errors.email
                        ? 'border-green-500 focus:ring-2 focus:ring-green-300'
                        : 'border-gray-300 focus:ring-2 focus:ring-[#e67e22]'
                    }`}
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs sm:text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className={`w-full border rounded-lg px-4 py-3 pr-12 text-base focus:outline-none transition-all ${
                        touched.password && errors.password
                          ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                          : touched.password && !errors.password
                          ? 'border-green-500 focus:ring-2 focus:ring-green-300'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#e67e22]'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs sm:text-sm mt-1"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: isSubmitting || !isValid ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || !isValid ? 1 : 0.98 }}
                  disabled={isSubmitting || !isValid || !dirty}
                  className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all ${
                    isSubmitting || !isValid || !dirty
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                      : 'bg-[#e67e22] hover:bg-[#d35400] text-white active:bg-[#c5470e]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </Form>

              {statusMessage.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg text-center font-medium text-sm ${
                    statusMessage.type === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}
                >
                  {statusMessage.message}
                </motion.div>
              )}

              <div className="mt-8 space-y-3 text-center text-sm">
                <p className="text-gray-600">
                  Forgot your password?{' '}
                  <Link
                    to="/a/forgot"
                    className="text-[#e67e22] font-semibold hover:text-[#d35400] transition-colors"
                  >
                    Reset it here
                  </Link>
                </p>
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-[#e67e22] font-semibold hover:text-[#d35400] transition-colors"
                  >
                    Contact us
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
