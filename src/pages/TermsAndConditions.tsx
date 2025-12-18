import SeoSetup from '../components/SeoSetup';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SeoSetup
        mainData={{
          title: 'Terms & Conditions - Jinhua Hanji Company LTD',
          description:
            'Terms of use for Jinhua Hanji Company LTD website and services.',
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 mb-6">
              These terms govern your use of the Jinhua Hanji Company LTD
              website and services. By using our site, you agree to these terms.
            </p>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Use of the Site</h3>
                <p>
                  You may use the site for lawful purposes only. You agree not
                  to misrepresent yourself or misuse the site.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Orders & Payments</h3>
                <p>
                  All orders are subject to availability and confirmation of the
                  order price. Payment methods accepted are displayed at
                  checkout.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Returns & Refunds</h3>
                <p>
                  Our returns and refunds policy is available on the product
                  pages and at checkout. Please contact support for assistance.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                <p>
                  To the extent permitted by law, we will not be liable for
                  indirect, incidental, or consequential damages arising from
                  the use of the site.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
