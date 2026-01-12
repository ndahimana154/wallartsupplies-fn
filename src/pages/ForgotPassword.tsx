import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import userRequests from '../utils/requests/userRequests';
import SeoSetup from '../components/SeoSetup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (
    values: { email: string },
    { setSubmitting, resetForm }: any
  ) => {
    setStatusMessage({ type: null, message: '' });

    try {
      const response = await userRequests.forgotPasswordRequest(values);

      if (response.success === true) {
        setStatusMessage({
          type: 'success',
          message: `Password reset link sent to ${values.email}`,
        });
        resetForm();
      } else if (response.status === 404 || response.status === 400) {
        setStatusMessage({
          type: 'error',
          message: 'User account not found. Please check and try again.',
        });
      } else if (response.status === 500) {
        setStatusMessage({
          type: 'error',
          message: `There has been a technical issue — don’t worry, we’re on it.`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          message: 'Something went wrong. Please try again later.',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoSetup
        mainData={{
          title: 'Forgot Password',
        }}
      />
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
              Forgot Password?
            </h2>
            <p className="text-lg md:text-xl font-light max-w-md mb-4">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <p className="text-sm md:text-base">
              If you remember your password,{' '}
              <Link to="/a/login" className="text-[#e67e22] underline">
                go back to login
              </Link>
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 md:px-20 py-20 bg-white">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                  Reset Your Password
                </h1>

                <Form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                          : touched.email && !errors.email
                          ? 'border-green-500 focus:ring-2 focus:ring-green-400'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#e67e22]'
                      }`}
                    />
                    <ErrorMessage
                      name="email"
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
                    {isSubmitting ? 'Sending link...' : 'Send Reset Link'}
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

export default ForgotPassword;
