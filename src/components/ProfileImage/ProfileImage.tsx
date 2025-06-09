import React from 'react';

interface ProfileImageProps {
  imageUrl: string;
  altText: string;
  size?: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUrl,
  altText,
  size = '300px',
  className = ''
}) => {
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
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover object-[center_10%]"
        />
      </div>
    </div>
  );
};

export default ProfileImage; 