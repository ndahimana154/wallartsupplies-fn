import { motion } from 'framer-motion';
import { FaPalette, FaAward, FaUsers, FaHeart, FaLeaf } from 'react-icons/fa';
import SeoSetup from '../components/SeoSetup';
import { BsAirplane } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  const stats = [
    { number: '500+', label: 'Artworks Framed', icon: <FaPalette /> },
    { number: '50+', label: 'Expert Craftsmen', icon: <FaUsers /> },
    { number: '10+', label: 'Years Experience', icon: <FaAward /> },
    { number: '2K+', label: 'Happy Customers', icon: <FaHeart /> },
  ];

  const values = [
    {
      icon: <FaLeaf className="text-3xl" />,
      title: 'Sustainable Materials',
      description:
        'We source eco-friendly materials and practice sustainable framing techniques to protect both art and environment.',
    },
    {
      icon: <FaPalette className="text-3xl" />,
      title: 'Artistic Excellence',
      description:
        'Every frame is crafted with artistic vision, enhancing your artwork while preserving its integrity and beauty.',
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: 'Master Craftsmanship',
      description:
        'Generations of framing expertise combined with innovative techniques for unparalleled quality.',
    },
    {
      icon: <BsAirplane className="text-3xl" />,
      title: 'Global Delivery',
      description:
        'Careful packaging and reliable shipping to ensure your framed art arrives in perfect condition.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SeoSetup
        mainData={{
          title: 'About Our Company',
          description:
            'Founded in a small studio in 2015, Wall Art Supllies began   with a simple mission: to provide artists, photographers, andart lovers with framing solutions that truly honor their work.  ',
        }}
      />{' '}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#e67e22]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              About <span className="text-[#e67e22]">Wall Art Supllies</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Preserving memories, enhancing art, and telling stories through
              exceptional framing since 2015. Where craftsmanship meets
              creativity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src="/hero1.jpg"
                alt="Wall Art Supllies Workshop - Master framers at work"
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in a small studio in 2015, Wall Art Supllies began
                  with a simple mission: to provide artists, photographers, and
                  art lovers with framing solutions that truly honor their work.
                </p>
                <p>
                  What started as a passion project between two art school
                  graduates has grown into a trusted name in custom framing,
                  serving clients nationwide while maintaining our commitment to
                  handcrafted quality.
                </p>
                <p>
                  Today, we continue to blend traditional framing techniques
                  with innovative approaches, ensuring every piece we frame
                  tells its story beautifully for generations to come.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/about/manufacturing1.JPG"
                    alt="Wall Art Supllies workshop interior"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/about/materials1.JPG"
                    alt="Premium framing materials"
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/about/interior1.JPG"
                    alt="Framed art in gallery setting"
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/about/interior2.jpg"
                    alt="Master framer at work"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-[#e67e22] to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white/20 rounded-2xl">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every frame we create and every client
              we serve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-[#e67e22] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-[#e67e22] to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Frame Your Masterpiece?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's work together to create the perfect framing solution for
              your art, photography, or special memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/products')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#e67e22] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                View Our Collection
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact-us')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Get Custom Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
