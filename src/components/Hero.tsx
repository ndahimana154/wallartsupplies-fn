import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        // Handle different response structures
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
      <div className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white">
          <p className="text-xl md:text-2xl font-light text-gray-300">
            {error || 'No hero section available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden bg-black"
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

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 text-white max-w-6xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              {slide.title || 'Welcome'}
            </h1>

            {slide.description && (
              <p className="mt-6 text-lg sm:text-xl max-w-3xl">
                {slide.description}
              </p>
            )}

            {slide.link && (
              <button
                onClick={() => (window.location.href = slide.link)}
                className="mt-8 w-[220px] h-[56px] flex items-center justify-center bg-[#F04E23] rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300"
              >
                {slide.buttonText || 'Learn More'}
              </button>
            )}
          </div>
        </>
      )}

      {slides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
            }
            className="nav-btn left-6"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="nav-btn right-6"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
