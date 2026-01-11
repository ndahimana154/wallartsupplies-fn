import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Search } from 'lucide-react';
import { adminEmail, adminPhone, companyAddress } from '../utils/axiosInstance';
import { uploadImageToCloudinary } from '../helpers/cloudinay';
import toast, { Toaster } from 'react-hot-toast';
import inquiriesRequests from '../utils/requests/inquiriesRequests';
import SeoSetup from '../components/SeoSetup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  contactUsValidationSchema,
  COUNTRY_CODES,
} from '../utils/formValidation';

const ContactUs = () => {
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRY_CODES.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.dial.includes(countrySearch)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      let uploadedUrls: string[] = [];

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput?.files && fileInput.files.length > 0) {
        const uploadPromises = Array.from(fileInput.files).map((file) =>
          uploadImageToCloudinary(file)
        );
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.map((r) => r.url);
      }

      const selectedCountry = COUNTRY_CODES.find(
        (c) => c.code === values.countryCode
      );
      const formattedPhone = `${selectedCountry?.dial} ${values.phone}`;

      const payload = {
        fullNames: values.name,
        email: values.email,
        phone: formattedPhone,
        projectDescription: values.description,
        images: uploadedUrls,
      };

      const response = await inquiriesRequests.newCustomInquiry(payload);

      if (response.success === true) {
        toast.success(
          'Your custom order request has been submitted. We will contact you within 24 hours.'
        );
        resetForm();
      } else {
        throw new Error(response.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(
        'There was an error submitting your request. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <SeoSetup
        mainData={{
          title: 'Contact Us - Jinhua Hanji Company LTD',
          description:
            "Get in touch for custom framing quotes, orders, and general inquiries. We're happy to help with product info, shipping and custom projects.",
          image: '/main-logo.jpg',
          type: 'website',
        }}
      />
      <div className="py-12 md:py-16"></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Custom Order <span className="text-[#e67e22]">Inquiry</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your custom framing project. Our master craftsmen will
            review your request and provide a personalized quote within 24
            hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 sticky top-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e67e22]/10 rounded-xl flex-shrink-0">
                    <FaPhone className="text-[#e67e22] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600 break-all">{adminPhone}</p>
                    <p className="text-sm text-gray-500">Mon-Sun, 24H/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e67e22]/10 rounded-xl flex-shrink-0">
                    <FaEnvelope className="text-[#e67e22] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 break-all">{adminEmail}</p>
                    <p className="text-sm text-gray-500">Response within 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e67e22]/10 rounded-xl flex-shrink-0">
                    <FaMapMarkerAlt className="text-[#e67e22] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600 break-words">
                      {companyAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2">
                  What We'll Need
                </h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Clear project description</li>
                  <li>• Artwork dimensions</li>
                  <li>• Preferred style references</li>
                  <li>• Budget range</li>
                  <li>• Timeline requirements</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Formik
              initialValues={{
                name: '',
                email: '',
                countryCode: 'US',
                phone: '',
                description: '',
              }}
              validationSchema={contactUsValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                isSubmitting: formSubmitting,
                values,
                setFieldValue,
              }) => (
                <Form className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                  <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all ${
                            touched.name && errors.name
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder="John Smith"
                          autoComplete="name"
                        />
                        <ErrorMessage
                          name="name"
                          className="mt-1 text-sm text-red-500"
                          component="div"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all ${
                            touched.email && errors.email
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder="john@example.com"
                          autoComplete="email"
                        />
                        <ErrorMessage
                          name="email"
                          className="mt-1 text-sm text-red-500"
                          component="div"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-3">
                          <div
                            className="w-40 flex-shrink-0 relative"
                            ref={countryDropdownRef}
                          >
                            <div
                              onClick={() =>
                                setShowCountryDropdown(!showCountryDropdown)
                              }
                              className={`w-full h-12 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all text-sm cursor-pointer flex items-center justify-between bg-white ${
                                touched.countryCode && errors.countryCode
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              <span className="text-gray-700">
                                {(() => {
                                  const selected = COUNTRY_CODES.find(
                                    (c) => c.code === values.countryCode
                                  );
                                  return selected
                                    ? `${selected.dial} ${selected.code}`
                                    : 'Select...';
                                })()}
                              </span>
                              <span
                                className={`transition-transform duration-200 ${
                                  showCountryDropdown ? 'rotate-180' : ''
                                }`}
                              >
                                ▼
                              </span>
                            </div>

                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-64 overflow-hidden flex flex-col">
                                <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                                  <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                      type="text"
                                      placeholder="Search country..."
                                      value={countrySearch}
                                      onChange={(e) =>
                                        setCountrySearch(e.target.value)
                                      }
                                      autoFocus
                                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
                                    />
                                  </div>
                                </div>

                                <div className="overflow-y-auto">
                                  {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                      <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => {
                                          setFieldValue(
                                            'countryCode',
                                            country.code
                                          );
                                          setShowCountryDropdown(false);
                                          setCountrySearch('');
                                        }}
                                        className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                                          values.countryCode === country.code
                                            ? 'bg-[#e67e22]/10 text-[#e67e22] font-semibold'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span>{country.name}</span>
                                          <span className="text-xs text-gray-500 font-mono">
                                            {country.dial}
                                          </span>
                                        </div>
                                      </button>
                                    ))
                                  ) : (
                                    <div className="px-3 py-4 text-center text-sm text-gray-500">
                                      No countries found
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <Field
                              type="tel"
                              name="phone"
                              className={`w-full h-12 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all ${
                                touched.phone && errors.phone
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                              placeholder="555 123 4567"
                              autoComplete="tel"
                            />
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-start gap-4">
                          {errors.countryCode || errors.phone ? (
                            <div className="text-sm text-red-500">
                              {errors.countryCode && (
                                <p>{errors.countryCode}</p>
                              )}
                              {errors.phone && <p>{errors.phone}</p>}
                            </div>
                          ) : null}
                          <div className="text-xs text-gray-500 ml-auto flex-shrink-0">
                            {(() => {
                              const selected = COUNTRY_CODES.find(
                                (c) => c.code === values.countryCode
                              );
                              return selected ? `${selected.name}` : '';
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                      Project Details
                    </h2>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all resize-none ${
                        touched.description && errors.description
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="Please describe your project in detail. Include information about the artwork, any special requirements, mounting preferences, glass type, and the overall look you're trying to achieve..."
                    />
                    <div className="mt-1 flex justify-between">
                      <ErrorMessage
                        name="description"
                        className="text-sm text-red-500"
                        component="div"
                      />
                      <span className="text-xs text-gray-500">
                        {values.description.length}/2000
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formSubmitting}
                    whileHover={{ scale: formSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: formSubmitting ? 1 : 0.98 }}
                    className="w-full bg-[#e67e22] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:bg-[#d35400] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {formSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Submit Custom Order Request'
                    )}
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
