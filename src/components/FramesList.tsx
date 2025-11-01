import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Frame {
  id: number;
  name: string;
  img: string;
  price: number;
  moq: number;
  description: string;
  material: string;
  size: string;
}

const framesData: Frame[] = [
  {
    id: 1,
    name: 'Gallery Wall Frame',
    img: '/hero1.jpg',
    price: 89.99,
    moq: 5,
    description: 'Museum-quality frame with archival materials',
    material: 'Solid Wood',
    size: '24" x 36"',
  },
  {
    id: 2,
    name: 'Modern Floating Frame',
    img: '/hero2.jpg',
    price: 125.5,
    moq: 3,
    description: 'Contemporary design for modern artwork',
    material: 'Metal & Acrylic',
    size: '18" x 24"',
  },
  {
    id: 3,
    name: 'Vintage Gold Leaf',
    img: '/hero3.jpg',
    price: 199.0,
    moq: 2,
    description: 'Handcrafted with genuine gold leaf finish',
    material: 'Wood with Gold Leaf',
    size: '16" x 20"',
  },
  {
    id: 4,
    name: 'Minimalist Black',
    img: '/frames/minimalist-black.jpg',
    price: 75.0,
    moq: 8,
    description: 'Sleek black frame for photography',
    material: 'Aluminum',
    size: '20" x 30"',
  },
  {
    id: 5,
    name: 'Rustic Barnwood',
    img: '/hero2.jpg',
    price: 145.0,
    moq: 4,
    description: 'Reclaimed wood with natural texture',
    material: 'Reclaimed Wood',
    size: '22" x 28"',
  },
  {
    id: 6,
    name: 'Ornate Classical',
    img: '/hero3.jpg',
    price: 225.0,
    moq: 2,
    description: 'Intricately carved classical frame',
    material: 'Composite Wood',
    size: '18" x 22"',
  },
  {
    id: 7,
    name: 'Slim Silver Metal',
    img: '/frames/slim-metal.jpg',
    price: 65.0,
    moq: 10,
    description: 'Ultra-slim profile with brushed finish',
    material: 'Brushed Aluminum',
    size: '16" x 20"',
  },
  {
    id: 8,
    name: 'Canvas Floater',
    img: '/hero1.jpg',
    price: 155.0,
    moq: 3,
    description: 'Designed for canvas paintings',
    material: 'Solid Wood',
    size: '24" x 36"',
  },
];

const FramesGallery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-24 px-6">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
          Recent Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Explore our latest handcrafted frames — designed to elevate your art,
          photography, and spaces with timeless craftsmanship.
        </p>
        <div className="w-24 h-[2px] bg-gray-300 mx-auto mt-8"></div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {framesData.map((frame, index) => (
            <motion.div
              key={frame.id}
              className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-700"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-3xl bg-gray-50">
                <motion.img
                  src={frame.img}
                  alt={frame.name}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  {frame.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light">
                  {frame.description}
                </p>

                <div className="flex justify-center items-center gap-3 mb-6 text-sm text-gray-500">
                  <span>{frame.material}</span>
                  <span>•</span>
                  <span>{frame.size}</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div className="text-left">
                    <p className="text-2xl font-light text-gray-900">
                      ${frame.price}
                    </p>
                    <p className="text-xs text-gray-500">MOQ: {frame.moq}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#F04E23] text-white px-6 py-3 rounded-full flex items-center gap-2 font-light hover:bg-[#e67e22] transition-all"
                  >
                    <FaWhatsapp />
                    Inquire
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FramesGallery;
