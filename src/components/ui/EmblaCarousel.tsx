import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EmblaCarouselProps {
  children: React.ReactNode[];
  className?: string;
  slideClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  /** On desktop (lg+), switch to grid instead of carousel */
  desktopGrid?: boolean;
  desktopCols?: number;
}

export default function EmblaCarousel({
  children,
  className = "",
  slideClassName = "",
  showDots = true,
  showArrows = true,
  desktopGrid = true,
  desktopCols = 4,
}: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const gridColsClass =
    desktopCols === 4 ? 'lg:grid-cols-4' :
    desktopCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

  if (desktopGrid) {
    return (
      <div className={className}>
        {/* Desktop: grid */}
        <div className={`hidden lg:grid ${gridColsClass} gap-6`}>
          {children.map((child, i) => (
            <div key={i}>{child}</div>
          ))}
        </div>

        {/* Mobile/Tablet: Embla carousel */}
        <div className="lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {children.map((child, i) => (
                <div key={i} className={`flex-[0_0_80%] min-w-0 sm:flex-[0_0_45%] ${slideClassName}`}>
                  {child}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {showArrows && (
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="w-10 h-10 flex items-center justify-center bg-[#FFD600] border-2 border-[#0F172A] text-[#0F172A] disabled:opacity-30 transition-opacity"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {showDots && (
              <div className="flex gap-2">
                {children.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === selectedIndex
                        ? 'bg-[#FFD600] scale-125'
                        : 'bg-white/30'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {showArrows && (
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="w-10 h-10 flex items-center justify-center bg-[#FFD600] border-2 border-[#0F172A] text-[#0F172A] disabled:opacity-30 transition-opacity"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pure carousel mode (no desktop grid)
  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children.map((child, i) => (
            <div key={i} className={`flex-[0_0_80%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] ${slideClassName}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        {showArrows && (
          <>
            <button onClick={scrollPrev} disabled={!canScrollPrev} className="w-10 h-10 flex items-center justify-center bg-[#FFD600] border-2 border-[#0F172A] text-[#0F172A] disabled:opacity-30" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}
        {showDots && (
          <div className="flex gap-2">
            {children.map((_, i) => (
              <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === selectedIndex ? 'bg-[#FFD600] scale-125' : 'bg-white/30'}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        )}
        {showArrows && (
          <button onClick={scrollNext} disabled={!canScrollNext} className="w-10 h-10 flex items-center justify-center bg-[#FFD600] border-2 border-[#0F172A] text-[#0F172A] disabled:opacity-30" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
