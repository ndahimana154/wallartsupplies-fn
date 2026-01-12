import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import userRequests from '../utils/requests/userRequests';
import SeoSetup from '../components/SeoSetup';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('New password is required'),
  retype: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Please confirm your password'),
});

const VerifyResetLink = () => {
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyForgotPasswordToken();
  }, [token]);

  const verifyForgotPasswordToken = async () => {
    try {
      const response = await userRequests.verifyForgotPasswordToken({
        token: String(token),
        userId: Number(userId),
      });

      setIsValid(response.success === true);
    } catch (error) {
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (values: {
    password: string;
    retype: string;
  }) => {
    try {
      const response = await userRequests.resetPasswordRequest({
        userId: Number(userId),
        token: String(token),
        password: String(values.password),
      });

      if (response.success === true) {
        setStatusMessage({
          type: 'success',
          message: 'Password updated successfully!',
        });
        setTimeout(() => navigate('/a/login'), 2000);
      } else {
        setStatusMessage({
          type: 'error',
          message: response.message || 'Failed to update password',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
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
    <>
      <SeoSetup mainData={{ title: 'Reset your password' }} />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div
          className="flex-1 relative bg-cover bg-center"
          style={{ backgroundImage: "url('/hero1.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 text-white">
            <img
              src="/main-logo1.jpg"
              className="w-40 mb-8"
              alt="Logo"
              loading="lazy"
            />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Reset Your Password
            </h2>
            <p className="text-lg md:text-xl font-light max-w-md">
              Enter a new password below to secure your account.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 md:px-20 py-20 bg-white">
          <Formik
            initialValues={{ password: '', retype: '' }}
            validationSchema={validationSchema}
            onSubmit={handlePasswordUpdate}
          >
            {({ errors, touched, isSubmitting }) => (
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      New Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                          : touched.password && !errors.password
                          ? 'border-green-500 focus:ring-2 focus:ring-green-400'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#e67e22]'
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="retype"
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                        errors.retype && touched.retype
                          ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                          : touched.retype && !errors.retype
                          ? 'border-green-500 focus:ring-2 focus:ring-green-400'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#e67e22]'
                      }`}
                    />
                    <ErrorMessage
                      name="retype"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#e67e22] hover:bg-[#F04E23]'
                    } text-white py-3 rounded-xl font-medium flex items-center justify-center shadow-md transition-all`}
                  >
                    {isSubmitting ? 'Updating password...' : 'Update Password'}
                  </motion.button>
                </Form>

                {statusMessage.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 text-center font-medium ${
                      statusMessage.type === 'error'
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {statusMessage.message}
                  </motion.div>
                )}

                <p className="text-sm text-gray-500 mt-6 text-center">
                  Remembered your password?{' '}
                  <Link to="/a/login" className="text-[#e67e22] underline">
                    Login
                  </Link>
                </p>
              </motion.div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default VerifyResetLink;
