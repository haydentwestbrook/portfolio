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
  items = [],
  slidesToShow = 1,
  autoPlay = false,
  interval = 5000,
  showNavigation = true,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const totalSlides = items.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && totalSlides > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, totalSlides, interval]);

  const handlePrevious = useCallback(() => {
    if (isTransitioning || totalSlides === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalSlides]);

  const handleNext = useCallback(() => {
    if (isTransitioning || totalSlides === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalSlides]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  }, [handlePrevious, handleNext]);

  if (totalSlides === 0) {
    return null;
  }

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
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
          width: `${(totalSlides * 100) / slidesToShow}%`,
        }}
      >
        {items.map((item, index) => (
          <CarouselSlide
            key={index}
            index={index}
            slidesToShow={slidesToShow}
            totalSlides={totalSlides}
          >
            {item}
          </CarouselSlide>
        ))}
      </div>

      {showNavigation && (
        <CarouselNavigation
          totalSlides={totalSlides}
          activeIndex={currentIndex}
          isTransitioning={isTransitioning}
          onPrevSlide={handlePrevious}
          onNextSlide={handleNext}
          onGoToSlide={setCurrentIndex}
          showArrows={showNavigation}
          showIndicators={showIndicators}
          slidesToShow={slidesToShow}
          maxIndex={maxIndex}
        />
      )}
    </div>
  );
}; 