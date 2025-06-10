import React from 'react';
import type { ImageMetadata } from 'astro';
import type { ProfileImageProps } from '@/types/components';
import type { BaseProps } from '@/types/common';

/**
 * ProfileImage component that displays a circular profile image with responsive sizing
 * and optimized image loading.
 * 
 * @example
 * ```tsx
 * <ProfileImage 
 *   imageUrl={profileImage} 
 *   altText="Profile picture" 
 *   className="hover:scale-105" 
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <ProfileImage 
 *   imageUrl="/images/profile.jpg" 
 *   altText="Profile picture" 
 * />
 * ```
 */
const ProfileImage = React.forwardRef<HTMLDivElement, ProfileImageProps>(({
  imageUrl,
  altText,
  className = '',
  ...props
}, ref) => {
  // Generate srcset for different sizes if the image is imported
  const srcSet = typeof imageUrl === 'string' ? undefined : `
    ${imageUrl.src.replace('.jpg', '-200.webp')} 200w,
    ${imageUrl.src.replace('.jpg', '-300.webp')} 300w,
    ${imageUrl.src.replace('.jpg', '-400.webp')} 400w
  `;

  return (
    <div 
      ref={ref}
      className={`flex justify-center items-center w-full h-full ${className}`}
      {...props}
    >
      <div 
        className="relative rounded-full overflow-hidden border-4 border-primary shadow-xl transition-all duration-300 w-full h-full"
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
});

ProfileImage.displayName = 'ProfileImage';

export { ProfileImage }; 