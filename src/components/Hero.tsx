import { useEffect, useRef, useState } from 'react';
import heroAdsRequests from '../utils/requests/heroAdsRequests';
import type { iHeroAds } from '../types/heroAd';
import HeroSkeleton from './skeletons/HeroSkeleton';

const optimize = (url: string, width: number) => {
  // Handle empty or invalid URLs
  if (!url || typeof url !== 'string') return '';

  if (!url.includes('cloudinary.com')) return url;

  // Split and rebuild with optimization parameters
  const [base, rest] = url.split('/upload/');
  if (!base || !rest) return url; // Return original if split fails

  return `${base}/upload/w_${width},h_${Math.round(
    width * 0.56,
  )},c_fill,q_auto,f_auto/${rest}`;
};

const Hero = () => {
  const [slides, setSlides] = useState<iHeroAds[]>([]);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true); // Initialize as true for initial display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    heroAdsRequests
      .getCustomersHeroAdsRequest({ isActive: true }, { page: 1, limit: 6 })
      .then((res: any) => {
        const data = res?.data?.data || res?.data || res || [];
        const slidesArray = Array.isArray(data) ? data : [];

        if (slidesArray.length === 0) {
          setError('No hero ads available');
        } else {
          setSlides(slidesArray);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading hero ads:', err);
        setError('Failed to load hero section');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || slides.length <= 1) return;

    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      6000,
    );

    return () => clearInterval(id);
  }, [slides.length, visible]);

  useEffect(() => {
    if (!visible || !slides[current]) return;

    const next = (current + 1) % slides.length;
    const img = new Image();
    img.src = optimize(slides[next].image, 1920);
  }, [current, slides, visible]);

  const slide = slides[current];

  if (loading) {
    return <HeroSkeleton />;
  }

  if (error || slides.length === 0) {
    return (
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white">
          <p className="text-base md:text-lg font-light text-gray-300">
            {error || 'No hero section available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden bg-black"
    >
      {slide && (
        <>
          <img
            key={slide.id}
            src={optimize(slide.image, 1920)}
            srcSet={`
              ${optimize(slide.image, 640)} 640w,
              ${optimize(slide.image, 1024)} 1024w,
              ${optimize(slide.image, 1920)} 1920w
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            alt={slide.title || 'Hero slide'}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover hero-fade"
            onError={(e) => {
              console.error('Image failed to load:', e);
              (e.target as HTMLImageElement).src = '/placeholder-hero.jpg';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

          <div className="relative z-10 h-full w-full flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight">
                  {slide.title || 'Welcome'}
                </h1>

                {slide.description && (
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-100 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>
                )}

                {slide.link && (
                  <button
                    onClick={() => (window.location.href = slide.link)}
                    className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#F04E23] hover:bg-[#e67e22] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    {slide.buttonText || 'Learn More'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center pb-6 sm:pb-8 md:pb-10 pointer-events-auto">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 flex justify-center">
                <div className="flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === current
                          ? 'w-3 h-3 sm:w-4 sm:h-4 bg-[#F04E23] shadow-lg'
                          : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === current}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
