import React from 'react';

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  height?: string;
  overlay?: boolean;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({
  imageUrl,
  altText,
  height = '400px',
  overlay = true,
  className = ''
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{ height }}
    >
      <img 
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      )}
    </div>
  );
};

export default HeroImage; 