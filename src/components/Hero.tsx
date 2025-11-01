import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/hero1.jpg',
    title: 'Selected Hotel & Commercial Artwork Projects',
    text: 'Explore our curated collection of bespoke artwork designed for luxury hotels and commercial spaces across the world.',
  },
  {
    image: '/hero2.jpg',
    title: 'Transforming Spaces Through Art',
    text: 'We create art installations that inspire emotions and elevate interiors into timeless visual experiences.',
  },
  {
    image: '/hero3.jpg',
    title: 'Custom Art Solutions for Every Project',
    text: 'From conceptual sketches to final installation, our team delivers tailored art concepts that reflect your brand identity.',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-white px-6 md:px-20 lg:px-32 max-w-[90%] lg:max-w-4xl xl:max-w-5xl">
                  <motion.h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#e67e22] drop-shadow-md leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    className="mt-4 text-sm md:text-lg lg:text-xl text-gray-200 leading-relaxed lg:leading-loose"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {slide.text}
                  </motion.p>

                  <motion.button
                    className="mt-8 bg-[#F04E23] hover:bg-[#F04E23] text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all text-sm md:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Inquiry
                  </motion.button>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? 'bg-[#e67e22]' : 'bg-gray-400/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
