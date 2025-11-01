import { motion } from 'framer-motion';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  role?: string;
  rating?: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Max Weston',
    text: 'There are very good frames, I highly recommend their services. The quality exceeded my expectations!',
    role: 'Interior Designer',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Lynn',
    text: 'Amazing quality and fast delivery. My walls look stunning! Will definitely order again.',
    role: 'Home Owner',
    rating: 5,
  },
  {
    id: 3,
    name: 'James Parker',
    text: 'Great customer support and beautiful frames. Five stars! The team was incredibly helpful.',
    role: 'Art Collector',
    rating: 5,
  },
  {
    id: 4,
    name: 'Anna Smith',
    text: 'The frames exceeded my expectations. Highly satisfied with the craftsmanship!',
    role: 'Gallery Owner',
    rating: 5,
  },
  {
    id: 5,
    name: 'Mike Johnson',
    text: 'Perfect frames for my photography exhibition. Excellent quality and timely delivery.',
    role: 'Photographer',
    rating: 5,
  },
  {
    id: 6,
    name: 'Emily Chen',
    text: 'Outstanding service from start to finish. The frames transformed my artwork completely!',
    role: 'Artist',
    rating: 5,
  },
];

const TestimonialsGrid = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto ">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-[#e67e22] mb-4">
          Our Clients Are Happy
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers
          have to say about their experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setHoveredCard(testimonial.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Background glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            />

            <div className="relative bg-white rounded-2xl shadow-xl border border-orange-100 p-8 h-full flex flex-col">
              {/* Rating stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.1 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Testimonial text */}
              <motion.p
                className="text-gray-700 text-lg mb-6 flex-grow leading-relaxed"
                animate={{
                  color: hoveredCard === testimonial.id ? '#374151' : '#6B7280',
                }}
              >
                "{testimonial.text}"
              </motion.p>

              {/* Client info */}
              <div className="border-t border-gray-100 pt-4">
                <motion.h3
                  className="font-semibold text-gray-900 text-lg"
                  animate={{
                    color:
                      hoveredCard === testimonial.id ? '#EA580C' : '#111827',
                  }}
                >
                  {testimonial.name}
                </motion.h3>
                <p className="text-orange-500 text-sm">{testimonial.role}</p>
              </div>

              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-orange-200 text-6xl opacity-60">
                "
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-gray-600 mb-6">Ready to join our happy customers?</p>
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          Get Started Today
        </button>
      </motion.div>
    </div>
  );
};

export default TestimonialsGrid;
