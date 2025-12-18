import {
  FaWhatsapp,
  FaShare,
  FaHeart,
  FaExpand,
  FaTruck,
  FaShieldAlt,
  FaPalette,
  FaCheckCircle,
  FaTag,
  FaStar,
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
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(product);
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
          title: `${product.name} — Jinhua Hanji Company LTD`,
          description: String(product.description)
            .replace(/<[^>]+>/g, '')
            .slice(0, 160),
          image: String(product.images?.[0] ?? '/main-logo.png'),
          type: 'product',
          publishedAt: (product as any).createdAt ?? undefined,
        }}
        canonicalUrl={`${frontendUrl}/product-detail/${product.slug}`}
      />

      <div className="relative overflow-hidden py-12 md:py-16 text-center"></div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="relative">
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in aspect-square"
                whileHover={{ scale: 1.01 }}
                onClick={() => setIsZoomed(true)}
              >
                <motion.img
                  key={selectedImage}
                  src={String(product.images[selectedImage])}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(true);
                  }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <FaExpand className="text-gray-700" />
                </button>
                {product.customAttr?.find(
                  (attr) =>
                    attr.key.toLowerCase().includes('sale') ||
                    attr.key.toLowerCase().includes('discount')
                ) && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                )}
              </motion.div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                      selectedImage === index
                        ? 'border-[#F04E23] scale-105'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={String(image)}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-20 h-20 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <FaTruck className="text-[#F04E23] text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Better Shipping
                </p>
                <p className="text-xs text-gray-500">Around world</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <FaShieldAlt className="text-[#F04E23] text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  1 Year Warranty
                </p>
                <p className="text-xs text-gray-500">Quality Assured</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <FaPalette className="text-[#F04E23] text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Customizable
                </p>
                <p className="text-xs text-gray-500">Design & Size</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <FaCheckCircle className="text-[#F04E23] text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  MOQ {product.moq}
                </p>
                <p className="text-xs text-gray-500">Minimum Order</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                <FaTag className="text-xs" />
                {product.category.name}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <div>
                <p className="text-4xl font-bold text-[#F04E23]">
                  ${product.price}
                </p>
                <p className="text-gray-500 mt-1">per unit</p>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  MOQ: {product.moq} units
                </p>
                <p className="text-sm text-gray-500">Minimum order quantity</p>
              </div>
            </div>

            {product.customAttr && product.customAttr.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.customAttr.slice(0, 4).map((attr, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#F04E23] rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-600">{attr.key}</p>
                        <p className="font-medium text-gray-900">
                          {attr.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-3">
                    Select Quantity
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          setQuantity(Math.max(product.moq, quantity - 1))
                        }
                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-light"
                      >
                        −
                      </button>
                      <span className="w-16 text-center text-xl font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-light"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        MOQ: {product.moq} units
                      </p>
                      <p className="text-xs text-gray-500">
                        Minimum order required
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Price</p>
                  <p className="text-3xl font-bold text-[#F04E23]">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppClick}
                className="w-full cursor-pointer bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 px-8 rounded-xl flex items-center justify-center gap-3 font-semibold hover:shadow-lg transition-all text-lg"
              >
                <FaWhatsapp className="text-2xl" />
                Inquire on WhatsApp
                <span className="ml-auto text-sm opacity-90">→</span>
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex-1 border-2 border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:border-gray-400 transition-all bg-white"
                >
                  <FaShare />
                  Share
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 border-2 rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition-all ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 bg-white hover:border-gray-400'
                  }`}
                >
                  <FaHeart className={isFavorite ? 'fill-red-500' : ''} />
                  {isFavorite ? 'Saved' : 'Save'}
                </motion.button>
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
              className="max-w-4xl mx-auto space-y-12"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  Product Description
                </h2>
                <div
                  className="text-gray-700 leading-relaxed font-light text-lg space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: product.description || '',
                  }}
                />
              </div>

              {product.customAttr && product.customAttr.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Specifications
                  </h2>
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50/80 border-b border-gray-200">
                            <th className="text-left py-4 px-6 font-light text-gray-600 text-sm uppercase tracking-wider">
                              #
                            </th>
                            <th className="text-left py-4 px-6 font-light text-gray-600 text-sm uppercase tracking-wider">
                              Attribute
                            </th>
                            <th className="text-left py-4 px-6 font-light text-gray-600 text-sm uppercase tracking-wider">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {product.customAttr.map((attr, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50/50 transition-colors duration-200"
                            >
                              <td className="py-4 px-6 font-light text-gray-500">
                                {index + 1}
                              </td>
                              <td className="py-4 px-6">
                                <span className="font-light text-gray-700">
                                  {attr.key}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="font-medium text-gray-900">
                                  {attr.value}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative Grid Layout (Optional) */}
              {product.customAttr && product.customAttr.length > 0 && (
                <div className="hidden">
                  {' '}
                  {/* Hidden by default, can be shown if preferred */}
                  <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                    Technical Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.customAttr.map((attr, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow duration-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-2 h-2 bg-[#F04E23] rounded-full flex-shrink-0"></div>
                          <span className="font-light text-gray-600 text-sm uppercase tracking-wide">
                            {attr.key}
                          </span>
                        </div>
                        <p className="text-lg font-medium text-gray-900">
                          {attr.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setIsZoomed(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={String(product.images[selectedImage])}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
