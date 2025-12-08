import SeoSetup from '../components/SeoSetup';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SeoSetup
        mainData={{
          title: 'Privacy Policy - Wall Art Supplies',
          description: 'How we collect, use and protect your information.',
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
              Privacy Policy
            </h1>
            <p className="text-gray-600 mb-6">
              Your privacy is important to us. This policy explains what
              information we collect, how we use it, and the choices you have
              regarding your data.
            </p>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Information We Collect</h3>
                <p>
                  We collect information you provide directly when you place
                  orders, contact support, or sign up for updates. We also
                  collect technical data such as browser type and IP address for
                  security and analytics.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How We Use Your Data</h3>
                <p>
                  We use data to process orders, communicate about your
                  purchases, improve our service, and prevent fraud. We never
                  sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Security</h3>
                <p>
                  We take reasonable measures to protect your information. If
                  you have any questions about security, contact us via the
                  contact page.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Changes to this Policy</h3>
                <p>
                  We may update this policy occasionally. When we do, we will
                  post the updated date on this page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
