import React from 'react';
import type { ImageMetadata } from 'astro';

interface ProfileImageProps {
  imageUrl: string | ImageMetadata;
  altText: string;
  size?: string;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUrl,
  altText,
  className = ''
}) => {
  // Generate srcset for different sizes if the image is imported
  const srcSet = typeof imageUrl === 'string' ? undefined : `
    ${imageUrl.src.replace('.jpg', '-200.webp')} 200w,
    ${imageUrl.src.replace('.jpg', '-300.webp')} 300w,
    ${imageUrl.src.replace('.jpg', '-400.webp')} 400w
  `;

  return (
    <div className="flex justify-center items-center w-full py-4 sm:py-6 md:py-8">
      <div 
        className={`relative rounded-full overflow-hidden border-4 border-primary shadow-xl transition-all duration-300 ${className}`}
        style={{ 
          width: 'clamp(200px, 50vw, 400px)',
          height: 'clamp(200px, 50vw, 400px)'
        }}
      >
        <img 
          src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src}
          srcSet={srcSet}
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
          alt={altText}
          decoding="async"
          className="w-full h-full object-cover object-[center_10%]"
        />
      </div>
    </div>
  );
}; 