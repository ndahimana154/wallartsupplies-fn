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
    img: '/hero2.jpg',
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
    <div className="min-h-screen bg-white py-20 px-4">
      {/* Minimal Header */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
          Recent Collection
        </h1>
        <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
      </motion.div>

      {/* Clean Grid - Like an Art Gallery */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {framesData.map((frame, index) => (
            <motion.div
              key={frame.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Image with subtle frame-like border */}
              <div className="relative mb-6 bg-gray-50 p-8 rounded-lg">
                <img
                  src={frame.img}
                  alt={frame.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Clean Content */}
              <div className="text-center">
                <h3 className="text-xl font-normal text-gray-900 mb-2">
                  {frame.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {frame.description}
                </p>

                <div className="flex justify-center items-center gap-6 mb-4 text-sm text-gray-500">
                  <span>{frame.material}</span>
                  <span>•</span>
                  <span>{frame.size}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-2xl font-light text-gray-900">
                      ${frame.price}
                    </p>
                    <p className="text-xs text-gray-500">MOQ: {frame.moq}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm"
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
