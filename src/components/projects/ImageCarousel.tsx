'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { ProjectImage } from '@/types/database';

interface ImageCarouselProps {
  images: ProjectImage[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const validImages = images && images.length > 0 ? images : [
    {
      id: 'fallback-1',
      project_id: 'default',
      storage_path: '/images/projects/portfolio-cms-cover.webp',
      alt_text: title,
      sort_order: 1,
      created_at: new Date().toISOString(),
    },
  ];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  }, [validImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  }, [validImages.length]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Threshold of 40px swipe
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const currentImage = validImages[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-[#F0F0FA] dark:bg-[#10111B] select-none border border-[#E6E7F0] dark:border-[#353449]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio Container */}
      <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden">
        {imageError[currentIndex] ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-[#85869B] dark:text-[#9A99B5]">
            <ImageIcon className="w-12 h-12 mb-2 stroke-1" />
            <p className="text-sm font-medium">{currentImage.alt_text || title}</p>
            <p className="text-xs opacity-75 mt-1">Pratinjau visual proyek</p>
          </div>
        ) : (
          <img
            src={currentImage.storage_path}
            alt={currentImage.alt_text || `${title} gambar ${currentIndex + 1}`}
            onError={() => setImageError((prev) => ({ ...prev, [currentIndex]: true }))}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        {/* Caption Overlay */}
        {currentImage.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-white text-xs">
            {currentImage.caption}
          </div>
        )}
      </div>

      {/* Navigation Arrows for desktop and tablet */}
      {validImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Gambar sebelumnya"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/70 text-white p-2 backdrop-blur-xs transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Gambar berikutnya"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/70 text-white p-2 backdrop-blur-xs transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators & Counter */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-medium text-white">
            <span>
              {currentIndex + 1} / {validImages.length}
            </span>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Pilih gambar ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
