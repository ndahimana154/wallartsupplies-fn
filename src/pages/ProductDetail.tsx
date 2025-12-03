import {
  FaWhatsapp,
  FaArrowLeft,
  FaShare,
  FaHeart,
  FaWeightHanging,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productRequests from '../utils/requests/productRequests';
import type { ProductData } from '../types/product';
import { adminPhone, frontendUrl } from '../utils/axiosInstance';
import ShippingTab from '../components/ShippingTab';
import RelatedProducts from '../components/RelatedProducts';
import SeoSetup from '../components/SeoSetup';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const fetchProductDetail = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      const response = await productRequests.getProductBySlug(slug);

      if (response.success === true) {
        setProduct(response.data);
        setQuantity(response.data.moq || 1);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (!product) return;

    const totalPrice = (product.price * quantity).toFixed(2);
    const productLink = `${window.location.origin}/product-detail/${product.slug}`;

    const message = `Hello, I'm interested in the ${product.name}:

• Product: ${product.name}
• Quantity: ${quantity} units
• Unit Price: $${product.price}
• Total Amount: $${totalPrice}
• MOQ: ${product.moq} units
• Link: ${productLink}

I'd like to know more about customization options and shipping.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (!product) return;

    const productLink = `${frontendUrl}/product-detail/${product.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: productLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(productLink);
      alert('Product link copied to clipboard!');
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProductDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#F04E23] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <SeoSetup
          mainData={{
            title: '404 Product not found',
            description: 'The product you requested could not be found.',
            image: '/main-logo.png',
            type: 'website',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#F04E23] text-white px-6 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <SeoSetup
        mainData={{
          title: `${product.name} — Wall Art Supplies`,
          description: String(product.description)
            .replace(/<[^>]+>/g, '')
            .slice(0, 160),
          image: String(product.images?.[0] ?? '/main-logo.png'),
          type: 'product',
          publishedAt: (product as any).createdAt ?? undefined,
        }}
        canonicalUrl={`${frontendUrl}/product-detail/${product.slug}`}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 py-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-light"
        >
          <FaArrowLeft />
          Back to Collection
        </button>
      </motion.div>

      <div className="relative overflow-hidden py-12 md:py-16 text-center">
        <img
          src={String(product.images[0])}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 blur-sm"
        />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
          >
            {product.name}
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto font-light text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {product.customAttr?.[0]?.value || 'Premium Quality'} • Crafted with
            Care
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              className="rounded-3xl overflow-hidden bg-gray-50 cursor-zoom-in"
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsZoomed(true)}
            >
              <motion.img
                key={selectedImage}
                src={String(product.images[selectedImage])}
                alt={product.name}
                className="w-full h-96 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <AnimatePresence>
              {isZoomed && (
                <motion.div
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8 cursor-zoom-out"
                  onClick={() => setIsZoomed(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.img
                    src={String(product.images[selectedImage])}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain rounded-xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? 'ring-2 ring-[#F04E23] scale-105'
                        : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-gray-300'
                    }`}
                  >
                    <img
                      src={String(image)}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <p className="text-4xl font-light text-[#F04E23] mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-500 font-light">
                  MOQ: {product.moq} units
                </p>
              </div>

              {product.customAttr && product.customAttr.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  {product.customAttr.slice(0, 4).map((attr, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {index === 0 && (
                        <FaWeightHanging className="text-[#F04E23] flex-shrink-0" />
                      )}
                      <span className="font-light">
                        {attr.key}:{' '}
                        <span className="font-medium">{attr.value}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-light text-lg">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(product.moq, quantity - 1))
                      }
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors font-light text-lg"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-light text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors font-light text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 font-light">Total:</p>
                  <p className="text-2xl font-light text-[#F04E23]">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-[#25D366] text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 font-light hover:bg-[#128C7E] transition-all text-lg shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
                  Inquire on WhatsApp
                </motion.button>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-all bg-white"
                  >
                    <FaShare className="text-gray-600" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-all bg-white"
                  >
                    <FaHeart className="text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 border-t border-gray-100 pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-gray-700 space-y-4">
                <p
                  className="text-lg leading-relaxed font-light"
                  dangerouslySetInnerHTML={{
                    __html: product.description || '',
                  }}
                ></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">
                      Premium Features
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F04E23] rounded-full"></div>
                        Handcrafted quality
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F04E23] rounded-full"></div>
                        Premium materials
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F04E23] rounded-full"></div>
                        Custom sizing available
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">
                      Quality Assurance
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F04E23] rounded-full"></div>
                        1-year warranty
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F04E23] rounded-full"></div>
                        Quality inspection
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F04E23] rounded-full"></div>
                        Professional packaging
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.customAttr.map((attr, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-100"
                    >
                      <span className="text-gray-600 font-light">
                        {attr.key}
                      </span>
                      <span className="text-gray-900 font-medium">
                        {attr.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <ShippingTab
                product={product}
                quantity={quantity}
                frontendUrl={frontendUrl}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <RelatedProducts
          relatedProducts={product.relatedProducts}
          currentProductSlug={product.slug}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
