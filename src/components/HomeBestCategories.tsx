import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Best in Walls',
    image: '/hero1.jpg',
    link: '/walls',
  },
  {
    title: 'Modern Interiors',
    image: '/hero2.jpg',
    link: '/interiors',
  },
  {
    title: 'Hotel Artworks',
    image: '/hero3.jpg',
    link: '/hotel-art',
  },
  {
    title: 'Corporate Spaces',
    image: '/hero1.jpg',
    link: '/corporate',
  },
  {
    title: 'Luxury Apartments',
    image: '/hero2.jpg',
    link: '/apartments',
  },
  {
    title: 'Creative Studios',
    image: '/hero3.jpg',
    link: '/studios',
  },
];

const HomeBestCategories = () => {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-[#e67e22]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Best Categories
        </motion.h1>
        <motion.p
          className="mt-3 text-gray-600 text-sm md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover our handpicked collection of artwork and interior design
          masterpieces.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-start px-6">
              <motion.h2
                className="text-2xl font-semibold text-[#e67e22] mb-3"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {cat.title}
              </motion.h2>

              <Link
                to={cat.link}
                className="inline-flex items-center gap-2 bg-[#F04E23] hover:bg-[#23c865] text-white px-5 py-2 rounded-full font-medium transition"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeBestCategories;
