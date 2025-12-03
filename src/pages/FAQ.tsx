import SeoSetup from '../components/SeoSetup';
import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    q: 'How do I place a custom framing order?',
    a: 'Use our contact form or the Create Order flow on the product page. Provide dimensions and images where relevant, and we will respond with a quote.',
  },
  {
    q: 'What materials do you use?',
    a: 'We use sustainably sourced woods, archival mattes, and UV-protective glazing to ensure longevity of your artwork.',
  },
  {
    q: 'What is the delivery time?',
    a: 'Delivery varies by location and product. Typical lead times are 7-21 business days for custom framing.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — we ship globally. Shipping costs and duties may vary depending on destination.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SeoSetup
        mainData={{
          title: 'FAQ - Wall Art Supplies',
          description:
            'Frequently asked questions about orders, shipping, and materials.',
        }}
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">FAQ</h1>
            <p className="text-gray-600 mb-6">Answers to common questions.</p>

            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full text-left px-4 py-3 bg-white flex items-center justify-between"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <span className="font-medium text-gray-900">{item.q}</span>
                    <span className="text-gray-500">
                      {openIndex === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === idx && (
                    <div className="px-4 py-3 text-gray-700 bg-gray-50">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
