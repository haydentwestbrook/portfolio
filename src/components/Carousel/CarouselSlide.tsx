import React from 'react';

interface CarouselSlideProps {
  children: React.ReactNode;
  isActive: boolean;
  index: number;
  totalSlides: number;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  children,
  isActive,
  index,
  totalSlides
}) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${totalSlides}`}
      className={`
        h-full w-full
        transition-opacity duration-300
        ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {children}
    </div>
  );
};

export default CarouselSlide;