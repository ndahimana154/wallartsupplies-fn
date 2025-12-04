import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import heroAdsRequests from '../utils/requests/heroAdsRequests';
import type { iHeroAds } from '../types/heroAd';
import { useNavigate } from 'react-router-dom';

interface HeroAdsResponse {
  success: boolean;
  data: {
    data: iHeroAds[];
  };
}

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<iHeroAds[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  const navigate = useNavigate();

  const SLIDER_CONFIG = {
    page: 1,
    limit: 6,
    sortBy: 'updatedAt' as const,
    order: 'DESC' as const,
    isActive: true,
    autoSlideInterval: 6000,
  };

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = (await heroAdsRequests.getCustomersHeroAdsRequest(
        { isActive: SLIDER_CONFIG.isActive },
        {
          page: SLIDER_CONFIG.page,
          limit: SLIDER_CONFIG.limit,
          sortBy: SLIDER_CONFIG.sortBy,
          order: SLIDER_CONFIG.order,
        }
      )) as HeroAdsResponse;

      if (response?.success === true && Array.isArray(response.data?.data)) {
        const validSlides = response.data.data.filter(
          (slide) => slide.image && slide.title && slide.link
        );

        if (validSlides.length === 0) {
          setError('No active hero ads available');
        }

        setSlides(validSlides);

        validSlides.forEach((slide, index) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = () => {
            setImageLoaded((prev) => ({ ...prev, [index]: true }));
          };
          img.onerror = () => {
            setImageErrors((prev) => ({ ...prev, [index]: true }));
          };
        });
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error fetching hero ads:', err);
      setError('Failed to load hero ads. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(nextSlide, SLIDER_CONFIG.autoSlideInterval);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  useEffect(() => {
    setImageLoaded({});
    setImageErrors({});
  }, [slides]);

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (loading) {
    return (
      <div className="relative h-[90vh] w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#F04E23]" />
          <p className="text-gray-600">Loading home contents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[90vh] w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h3 className="text-xl font-semibold text-gray-800">
            Unable to load content
          </h3>
          <p className="text-gray-600 max-w-md">{error}</p>
          <button
            onClick={fetchAds}
            className="mt-4 bg-[#F04E23] hover:bg-[#e65c1a] text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative h-[90vh] w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center text-gray-800 px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to Our Store
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Discover amazing products and offers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait" initial={false}>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={`${slide.id}-${index}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <div className="relative w-full h-full">
                  {!imageLoaded[index] && !imageErrors[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                  )}

                  {imageErrors[index] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center text-gray-600">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg">Image not available</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 max-w-full lg:max-w-4xl xl:max-w-5xl">
                  <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg leading-tight mb-4 md:mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div
                    className="mb-6 md:mb-8 max-w-full"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 drop-shadow-md leading-relaxed lg:leading-loose line-clamp-3 md:line-clamp-4">
                      {slide.description}
                    </p>
                  </motion.div>

                  {slide.buttonText && (
                    <motion.button
                      className="bg-[#F04E23] hover:bg-[#e65c1a] text-white px-6 sm:px-8 py-3 rounded-full font-medium shadow-lg transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => slide.link && navigate(slide.link)}
                      disabled={!slide.link}
                    >
                      {slide.buttonText}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-full text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-800/50 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-full text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-800/50 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg ${
                current === index
                  ? 'bg-[#F04E23] scale-110'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
