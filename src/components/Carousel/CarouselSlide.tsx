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
      className="flex-shrink-0 h-full w-full p-2"
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