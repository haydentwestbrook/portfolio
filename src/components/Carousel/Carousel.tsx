import React, { useState, useEffect, useCallback } from 'react';
import { CarouselNavigation } from './CarouselNavigation';
import { CarouselSlide } from './CarouselSlide';

interface CarouselProps {
  items: React.ReactNode[];
  slidesToShow?: number;
  autoPlay?: boolean;
  interval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  slidesToShow = 1,
  autoPlay = false,
  interval = 5000,
  showNavigation = true,
  showIndicators = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = items.length;
  const maxIndex = totalSlides - slidesToShow;

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index > maxIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [maxIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  }, [prevSlide, nextSlide]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      if (activeIndex === maxIndex) {
        goToSlide(0);
      } else {
        nextSlide();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, autoPlay, interval, maxIndex, goToSlide, nextSlide]);

  return (
    <div 
      className="relative w-full overflow-hidden"
      role="region"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
          width: `${(totalSlides * 100) / slidesToShow}%`
        }}
        role="list"
        aria-label="Slides"
      >
        {items.map((item, index) => (
          <CarouselSlide
            key={index}
            index={index}
            slidesToShow={slidesToShow}
            totalSlides={totalSlides}
            isActive={true}
          >
            {item}
          </CarouselSlide>
        ))}
      </div>
      {(showNavigation || showIndicators) && (
        <CarouselNavigation
          totalSlides={totalSlides}
          activeIndex={activeIndex}
          isTransitioning={isTransitioning}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
          onGoToSlide={goToSlide}
          showArrows={showNavigation}
          showIndicators={showIndicators}
          slidesToShow={slidesToShow}
          maxIndex={maxIndex}
        />
      )}
    </div>
  );
}; 