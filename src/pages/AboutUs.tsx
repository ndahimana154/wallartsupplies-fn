import { motion } from 'framer-motion';
import { FaPalette, FaAward, FaUsers, FaHeart, FaLeaf } from 'react-icons/fa';
import SeoSetup from '../components/SeoSetup';
import { BsAirplane } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      <SeoSetup
        mainData={{
          title: 'About Our Company',
          description:
            "Bring your creative idea to life. Whether it's original artwork, canvas art, or custom framing, our master craftsmen will review your project and send a tailored quote within 24 hours.",
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#e67e22]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              About <span className="text-[#e67e22]">Jinhua Hanji Co.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Bring your creative idea to life. Whether it's original artwork,
              canvas art, or custom framing, our master craftsmen will review
              your project and send a tailored quote within 24 hours.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/hero1.jpg"
                alt="Jinhua Hanji Co. Workshop - Master framers at work"
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Story & Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  Who We Are?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2015, Hanjji is a supplier of wall décor and
                  display solutions serving the global market. We specialize in
                  frames, canvas art, decorative wall pieces, and related décor
                  products designed for residential, commercial, and retail
                  environments.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Our Story
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    From the beginning, our focus has been on combining
                    thoughtful design, reliable craftsmanship, and consistent
                    quality to meet international market expectations.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Hanjji was established with the ambition to deliver
                    well-designed and dependable wall décor products to
                    customers worldwide. What began as a focused décor supply
                    business has gradually expanded into a diverse product
                    portfolio including frames, canvas paintings, and decorative
                    wall solutions.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Our Values
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    At Hanjji, we believe long-term success is built on quality,
                    integrity, and trust. We are committed to delivering
                    products that meet consistent standards while maintaining
                    transparent communication and dependable service.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Artistic Excellence
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Design is central to everything we create. Our collections
                    balance modern trends with timeless aesthetics, ensuring
                    versatility across different interior styles. From canvas
                    artwork to frames and wall décor, each product is designed
                    to enhance spaces with visual harmony and refined
                    simplicity.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Master Craftsmanship
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our products are made through a combination of skilled
                    craftsmanship and controlled production processes. Attention
                    is given to construction accuracy, finishing quality, and
                    durability. Each piece is carefully inspected to ensure it
                    meets our standards before reaching our customers.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Global Delivery
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hanjji supports customers worldwide with reliable global
                    delivery solutions. With experience in export packaging and
                    international logistics, we ensure products are securely
                    packed and shipped safely.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Wholesale & Custom Solutions
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We work closely with wholesalers, retailers, interior
                    designers, and project buyers. Hanjji provides competitive
                    pricing, stable supply, and customization options including
                    size, design, framing, and packaging. Our team is committed
                    to supporting scalable and long-term cooperation.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Our Commitment
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    As we continue to grow, Hanjji remains dedicated to
                    delivering quality wall décor solutions that inspire spaces
                    and support our partners' success across global markets.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div
                  variants={fadeInUp}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="/about/manufacturing1.JPG"
                    alt="Jinhua Hanji Co. workshop interior"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="/about/materials1.JPG"
                    alt="Premium framing materials"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6 pt-12"
              >
                <motion.div
                  variants={fadeInUp}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="/about/interior1.JPG"
                    alt="Framed art in gallery setting"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="/about/interior2.jpg"
                    alt="Master framer at work"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#e67e22] via-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center text-white"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex justify-center mb-4"
                >
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every frame we create and every client
              we serve.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="text-[#e67e22] mb-6 group-hover:scale-110 transition-transform duration-300">
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#e67e22] via-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Frame Your Masterpiece?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Let's work together to create the perfect framing solution for
              your art, photography, or special memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <motion.button
                onClick={() => navigate('/products')}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#e67e22] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                View Our Collection
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact-us')}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Get Custom Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
