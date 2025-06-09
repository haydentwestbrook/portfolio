import React from 'react';

interface CarouselSlideProps {
  children: React.ReactNode;
  index: number;
  slidesToShow: number;
  totalSlides: number;
  isActive?: boolean;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  children,
  index,
  slidesToShow,
  totalSlides,
  isActive = false,
}) => {
  return (
    <div
      className={`flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} h-full w-full transition-opacity duration-300 p-2`}
      style={{
        width: `${100 / slidesToShow}%`,
      }}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${totalSlides}`}
    >
      {children}
    </div>
  );
};