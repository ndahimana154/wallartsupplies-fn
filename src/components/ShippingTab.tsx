import {
  FaWhatsapp,
  FaShippingFast,
  FaAward,
  FaClock,
  FaCheck,
  FaTruck,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaBoxOpen,
  FaPhoneAlt,
  FaHeadset,
  FaEnvelope,
  FaShieldAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { adminEmail, adminPhone, frontendUrl } from '../utils/axiosInstance';

const ShippingTab = ({ product, quantity }: any) => {
  const handleWhatsAppClick = () => {
    if (!product) return;

    const totalPrice = (product.price * quantity).toFixed(2);

    const message = `Hello, I'm interested in the ${product.name}:

• Product: ${product.name}
• Quantity: ${quantity} units
• Unit Price: $${product.price}
• Total Amount: $${totalPrice}
• MOQ: ${product.moq} units

${product.description}

I'd like to know more about customization options and shipping.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSupport = () => {
    if (!product) return;

    const subject = `Inquiry about ${product.name}`;
    const body = `Hello, I'm interested in ${product.name} and have questions about shipping. Product link: ${frontendUrl}/product-detail/${product.slug}`;

    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const emailWindow = window.open(
      mailtoLink,
      '_blank',
      'noopener,noreferrer'
    );

    setTimeout(() => {
      if (
        !emailWindow ||
        emailWindow.closed ||
        typeof emailWindow.closed === 'undefined'
      ) {
        navigator.clipboard
          .writeText(adminEmail)
          .then(() => {
            alert(
              `Email client not available. Email address ${adminEmail} copied to clipboard.`
            );
          })
          .catch(() => {
            alert(
              `Email client not available. Please contact us at: ${adminEmail}`
            );
          });
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 text-center group hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
            <FaShippingFast className="text-green-600 text-xl" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
          <p className="text-sm text-gray-600 mb-3">On orders over $100</p>
          <div className="text-xs text-green-600 font-medium">
            Worldwide Available
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 text-center group hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
            <FaShieldAlt className="text-blue-600 text-xl" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
          <p className="text-sm text-gray-600 mb-3">
            100% protected transactions
          </p>
          <div className="text-xs text-blue-600 font-medium">SSL Encrypted</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 text-center group hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
            <FaAward className="text-orange-600 text-xl" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Quality Guarantee
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            1-year comprehensive warranty
          </p>
          <div className="text-xs text-orange-600 font-medium">
            Premium Quality
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
          <FaClock className="text-[#F04E23]" />
          Production & Shipping Timeline
        </h3>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 transform translate-x-2"></div>

          <div className="space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 bg-[#F04E23] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaCheck className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Order Processing
                </h4>
                <p className="text-gray-600 text-sm">1-2 business days</p>
                <p className="text-gray-500 text-xs mt-1">
                  Order confirmation and preparation
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 bg-[#F04E23] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Production</h4>
                <p className="text-gray-600 text-sm">0-6 days</p>
                <p className="text-gray-500 text-xs mt-1">
                  Handcrafted manufacturing with quality checks
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 bg-[#F04E23] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Quality Control
                </h4>
                <p className="text-gray-600 text-sm">2-3 days</p>
                <p className="text-gray-500 text-xs mt-1">
                  Final inspection and packaging
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 bg-[#F04E23] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaShippingFast className="text-white text-sm" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Shipping & Delivery
                </h4>
                <p className="text-gray-600 text-sm">1-2 weeks</p>
                <p className="text-gray-500 text-xs mt-1">
                  Professional packaging and worldwide delivery
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
        >
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaTruck className="text-[#F04E23]" />
            Shipping Methods
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700 font-medium">
                Standard Shipping
              </span>
              <span className="text-[#F04E23] font-semibold">$15</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700 font-medium">
                Express Shipping
              </span>
              <span className="text-[#F04E23] font-semibold">$35</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700 font-medium">Free Shipping</span>
              <span className="text-green-600 font-semibold">
                Orders over $100
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
        >
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#F04E23]" />
            Delivery Information
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <FaGlobeAmericas className="text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700">
                  Worldwide Delivery
                </span>
                <p className="text-gray-500">Available to most countries</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaBoxOpen className="text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700">
                  Professional Packaging
                </span>
                <p className="text-gray-500">Custom crating for protection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-700">
                  Delivery Updates
                </span>
                <p className="text-gray-500">Real-time tracking provided</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaHeadset className="text-2xl text-[#F04E23]" />
          <h3 className="text-xl font-semibold text-gray-900">
            Need Help with Shipping?
          </h3>
        </div>
        <p className="text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
          Our team is here to assist you with any shipping questions, custom
          requirements, or special delivery arrangements. Contact us for
          personalized support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:bg-[#128C7E] transition-all"
          >
            <FaWhatsapp className="text-lg" />
            Chat on WhatsApp
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[#F04E23] text-[#F04E23] px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:bg-[#F04E23] hover:text-white transition-all"
            onClick={handleEmailSupport}
          >
            <FaEnvelope className="text-lg" />
            Email Support
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
      >
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#F04E23] mb-1">150+</div>
          <div className="text-xs text-gray-600">Countries Served</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#F04E23] mb-1">99%</div>
          <div className="text-xs text-gray-600">On-Time Delivery</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#F04E23] mb-1">24/7</div>
          <div className="text-xs text-gray-600">Customer Support</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#F04E23] mb-1">5★</div>
          <div className="text-xs text-gray-600">Service Rating</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShippingTab;
