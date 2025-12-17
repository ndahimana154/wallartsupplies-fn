import { FaWhatsapp, FaHeadset, FaEnvelope } from 'react-icons/fa';
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
