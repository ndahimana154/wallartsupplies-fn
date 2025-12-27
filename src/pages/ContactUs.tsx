import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUpload,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { adminEmail, adminPhone, companyAddress } from '../utils/axiosInstance';
import { uploadImageToCloudinary } from '../helpers/cloudinay';
import toast, { Toaster } from 'react-hot-toast';
import inquiriesRequests from '../utils/requests/inquiriesRequests';
import SeoSetup from '../components/SeoSetup';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    referenceImages: [] as any[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        referenceImages: [...prev.referenceImages, ...newFiles].slice(0, 5), // Limit to 5 files
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Form data:', formData);

      let uploadedUrls: string[] = [];
      if (formData.referenceImages && formData.referenceImages.length > 0) {
        const uploadPromises = formData.referenceImages.map((file) =>
          uploadImageToCloudinary(file)
        );
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.map((r) => r.url);
      }

      const payload = {
        fullNames: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectDescription: formData.description,
        images: uploadedUrls,
      };

      const response = await inquiriesRequests.newCustomInquiry(payload);
      console.log('API response:', response);
      if (response.success == true) {
        toast.success(
          'Your custom order request has been submitted. We will contact you within 24 hours.'
        );
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          description: '',
          referenceImages: [],
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
      <div className="py-16  md:py-20"></div>{' '}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Custom Order <span className="text-[#e67e22]">Inquiry</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your custom framing project. Our master craftsmen will
            review your request and provide a personalized quote within 24
            hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e67e22]/10 rounded-xl">
                    <FaPhone className="text-[#e67e22] text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">{adminPhone}</p>
                    <p className="text-sm text-gray-500">Mon-Sun, 24H/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e67e22]/10 rounded-xl">
                    <FaEnvelope className="text-[#e67e22] text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">{adminEmail}</p>
                    <p className="text-sm text-gray-500">Response within 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e67e22]/10 rounded-xl">
                    <FaMapMarkerAlt className="text-[#e67e22] text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Studio</h3>
                    <p className="text-gray-600">{companyAddress}</p>
                    <p className="text-sm text-gray-500">By appointment only</p>
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
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Project Details
                </h2>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e67e22] focus:border-transparent transition-all"
                  placeholder="Please describe your project in detail. Include information about the artwork, any special requirements, mounting preferences, glass type, and the overall look you're trying to achieve..."
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Reference Images (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                  <FaUpload className="mx-auto text-3xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Upload photos of your artwork, inspiration images, or
                    similar frames you like
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-[#e67e22] text-white rounded-xl cursor-pointer hover:bg-[#d35400] transition-colors"
                  >
                    <FaUpload className="mr-2" />
                    Choose Files
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum 5 files • PNG, JPG, JPEG up to 10MB each
                  </p>
                </div>

                {formData.referenceImages.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Uploaded Images ({formData.referenceImages.length}/5)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.referenceImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Reference ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-[#e67e22] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#d35400] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Submit Custom Order Request'
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center"
                >
                  Thank you! Your custom order request has been submitted. We'll
                  contact you within 24 hours.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center"
                >
                  There was an error submitting your request. Please try again
                  or contact us directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
