import React, { useState, useCallback, useEffect } from 'react';
import CarouselSlide from './CarouselSlide';
import CarouselNavigation from './CarouselNavigation';

interface CarouselProps {
  children: React.ReactNode[];
  showIndicators?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  gap?: number;
  transitionDuration?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  showIndicators = true,
  showArrows = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  gap = 16,
  transitionDuration = 300
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const maxIndex = Math.max(0, children.length - slidesToShow);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((current) => Math.min(current + slidesToScroll, maxIndex));
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, slidesToScroll, maxIndex, transitionDuration]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((current) => Math.max(current - slidesToScroll, 0));
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, slidesToScroll, transitionDuration]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(Math.min(Math.max(index, 0), maxIndex));
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [activeIndex, isTransitioning, maxIndex, transitionDuration]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case 'Home':
          goToSlide(0);
          break;
        case 'End':
          goToSlide(maxIndex);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, goToSlide, maxIndex, isTransitioning]);

  // Calculate slide width based on number of slides to show
  const slideWidth = `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`;

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Carousel">
      <div 
        className="relative overflow-hidden"
        style={{ 
          height: '400px',
          padding: `0 ${gap / 2}px`
        }}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ 
            transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
            gap: `${gap}px`,
            transitionDuration: `${transitionDuration}ms`
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div style={{ width: slideWidth, flexShrink: 0 }}>
              <CarouselSlide
                isActive={index >= activeIndex && index < activeIndex + slidesToShow}
                index={index}
                totalSlides={children.length}
              >
                {child}
              </CarouselSlide>
            </div>
          ))}
        </div>
      </div>

      <CarouselNavigation
        totalSlides={children.length}
        activeIndex={activeIndex}
        isTransitioning={isTransitioning}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onGoToSlide={goToSlide}
        showArrows={showArrows}
        showIndicators={showIndicators}
        slidesToShow={slidesToShow}
        maxIndex={maxIndex}
      />
    </div>
  );
};

export default Carousel; 