import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp,
  FaRuler,
  FaPalette,
  FaShieldAlt,
  FaWeightHanging,
} from 'react-icons/fa';
import Header from '../components/Header';

const framesData = [
  {
    id: 1,
    name: 'Gallery Wall Frame',
    img: '/frames/gallery-wall.jpg',
    price: 89.99,
    moq: 5,
    description:
      'Crafted for discerning collectors and galleries, this museum-quality frame combines traditional craftsmanship with archival protection. The hand-finished solid ash wood and UV-protective glass ensure your artwork remains pristine for generations.',
    material: 'Solid Ash Wood',
    size: '24" x 36"',
    style: 'Modern Gallery',
    finish: 'Natural Wood',
    depth: '1.5"',
    glass: 'UV-Protective Museum Glass',
    weight: '4.2 lbs',
    origin: 'Handcrafted in Italy',
    features: [
      'UV-protective museum glass',
      'Archival acid-free backing',
      'Hand-finished wood surface',
      'Reinforced corners',
      'Easy mounting system',
      'Conservation-grade materials',
    ],
    images: ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'],
    customization: [
      'Custom sizes available',
      'Different wood finishes',
      'Mat board options',
      'Personalized engraving',
    ],
  },
];

const ProductGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(5);
  const [activeTab, setActiveTab] = useState('details');
  const [isZoomed, setIsZoomed] = useState(false);

  const frame = framesData.find((f) => f.id === parseInt(id || '1'));
  if (!frame)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="relative overflow-hidden py-20 md:py-28 text-center">
        <img
          src={frame.images[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
        />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold text-[#F04E23]"
          >
            {frame.name}
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-600 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {frame.style} • {frame.origin}
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            className="bg-gray-50 p-8 rounded-3xl shadow-lg cursor-zoom-in"
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsZoomed(true)}
          >
            <img
              src={frame.images[selectedImage]}
              alt={frame.name}
              className="w-full max-h-96 object-contain rounded-2xl"
            />
          </motion.div>

          {/* Zoom Modal */}
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
                onClick={() => setIsZoomed(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.img
                  src={frame.images[selectedImage]}
                  alt={frame.name}
                  className="max-w-full max-h-full object-contain rounded-xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            {frame.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === i
                    ? 'border-[#e67e22]'
                    : 'border-gray-200 hover:border-[#F04E23]'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            ${frame.price}{' '}
            <span className="text-sm font-light text-gray-500">per unit</span>
          </h2>
          <p className="text-gray-600 text-lg font-light mb-8">
            {frame.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8 text-gray-700">
            <div className="flex items-center gap-2">
              <FaRuler className="text-[#e67e22]" /> {frame.size}
            </div>
            <div className="flex items-center gap-2">
              <FaPalette className="text-[#e67e22]" /> {frame.finish}
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-[#e67e22]" /> {frame.glass}
            </div>
            <div className="flex items-center gap-2">
              <FaWeightHanging className="text-[#e67e22]" /> {frame.weight}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(frame.moq, q - 1))}
                className="px-4 py-2 hover:bg-gray-50"
              >
                –
              </button>
              <span className="px-6 py-2 text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <p className="text-gray-700 text-lg">
              Total: <b>${(frame.price * quantity).toFixed(2)}</b>
            </p>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#F04E23] hover:bg-[#e67e22] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <FaWhatsapp size={20} /> Chat for Custom Order
          </motion.button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="flex justify-center gap-8 mb-6">
          {['details', 'customization', 'shipping'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-lg transition-all ${
                activeTab === tab
                  ? 'text-[#F04E23] border-b-2 border-[#F04E23]'
                  : 'text-gray-500 hover:text-[#e67e22]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'details' && (
              <ul className="text-gray-700 space-y-2">
                {frame.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#e67e22] rounded-full"></div>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'customization' && (
              <div className="flex flex-wrap gap-3">
                {frame.customization.map((opt, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#e67e22]/10 text-[#e67e22] rounded-full text-sm border border-[#e67e22]/30"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            )}
            {activeTab === 'shipping' && (
              <p className="text-gray-600 leading-relaxed">
                Worldwide shipping is available. Custom orders may take 2–3
                weeks for production. We offer professional installation and
                white-glove delivery for special projects.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
