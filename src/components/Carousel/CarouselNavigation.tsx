import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

interface CarouselNavigationProps {
  totalSlides: number;
  activeIndex: number;
  isTransitioning: boolean;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
  showArrows?: boolean;
  showIndicators?: boolean;
  slidesToShow: number;
  maxIndex: number;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  totalSlides,
  activeIndex,
  isTransitioning,
  onPrevSlide,
  onNextSlide,
  onGoToSlide,
  showArrows = true,
  showIndicators = true,
  slidesToShow,
  maxIndex
}) => {
  // Calculate number of indicators needed
  const indicatorCount = Math.ceil(totalSlides / slidesToShow);
  const currentGroup = Math.floor(activeIndex / slidesToShow);

  return (
    <div className="flex items-center justify-between mt-4">
      {showArrows && (
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevSlide}
            disabled={isTransitioning || activeIndex <= 0}
            aria-label="Previous slide"
          >
            <Icon name="chevron-left" size="lg" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNextSlide}
            disabled={isTransitioning || activeIndex >= maxIndex}
            aria-label="Next slide"
          >
            <Icon name="chevron-right" size="lg" />
          </Button>
        </div>
      )}

      {showIndicators && (
        <div className="flex items-center gap-3">
          {Array.from({ length: indicatorCount }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => onGoToSlide(index * slidesToShow)}
              disabled={isTransitioning}
              aria-label={`Go to slide group ${index + 1}`}
              aria-current={index === currentGroup ? 'true' : undefined}
              className={`
                w-4 h-4 rounded-full p-0
                ${index === currentGroup 
                  ? 'bg-primary scale-125 ring-4 ring-primary/20' 
                  : 'bg-gray-500 hover:bg-gray-600'
                }
                transition-all duration-200
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { CarouselNavigation }; 