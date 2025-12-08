import { motion } from 'framer-motion';
import { XIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
const GalleryOpenModal = ({
  onClose,
  galleryImages,
  galleryOpen,
  gidx,
}: any) => {
  const [galleryIndex, setGalleryIndex] = useState(gidx || 0);
  const prevGallery = useCallback(() => {
    setGalleryIndex(
      (i: any) => (i - 1 + galleryImages.length) % (galleryImages.length || 1)
    );
  }, [galleryImages.length]);

  const nextGallery = useCallback(() => {
    setGalleryIndex((i: any) => (i + 1) % (galleryImages.length || 1));
  }, [galleryImages.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!galleryOpen) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevGallery();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextGallery();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (typeof onClose === 'function') onClose();
      }
    };

    if (galleryOpen) window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [galleryOpen, prevGallery, nextGallery, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 backgrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-md bg-white bg-opacity-90 hover:bg-opacity-100"
            aria-label="Close gallery"
          >
            <XIcon className="w-5 h-5 text-gray-700" />
          </button>

          <div className="w-full bg-black rounded-md overflow-hidden">
            <img
              src={galleryImages[galleryIndex]}
              alt={`Gallery ${galleryIndex + 1}`}
              className="w-full h-[70vh] object-contain bg-black"
              loading="lazy"
            />
          </div>

          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <button
              onClick={prevGallery}
              className="p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <button
              onClick={nextGallery}
              className="p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GalleryOpenModal;
