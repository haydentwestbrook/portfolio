import type { BaseProps, WithChildren, WithLoading, WithDisabled, WithOnClick, WithHref, WithAlt, WithTitle, WithDescription, WithImage, WithTechnologies, WithLinks, WithDate, WithAuthor, WithTags, WithEmail, WithLocation, WithSocial, WithForm } from '../common';
import type { Size, Variant, Shape } from '../common';

// Button Component Types
export interface ButtonProps extends BaseProps, WithChildren, WithLoading, WithDisabled, WithOnClick {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  icon?: React.ReactNode;
}

// Icon Component Types
export type IconName = 
  | 'chevron-left'
  | 'chevron-right'
  | 'loading'
  | 'download'
  | 'github'
  | 'linkedin'
  | 'email'
  | 'external-link';

export interface IconProps extends BaseProps {
  name: IconName;
  size?: Size;
}

// ProfileImage Component Types
export interface ProfileImageProps extends BaseProps, WithAlt {
  imageUrl: string | ImageMetadata;
  size?: Size;
}

// ProjectCard Component Types
export interface ProjectCardProps extends BaseProps, WithTitle, WithDescription, WithImage, WithTechnologies, WithLinks, WithDate {
  // Additional project-specific props can be added here
}

// ProjectList Component Types
export interface ProjectListProps extends BaseProps {
  projects: ProjectCardProps[];
}

// BlogPost Component Types
export interface BlogPostProps extends BaseProps, WithTitle, WithDescription, WithDate, WithAuthor, WithTags, WithImage {
  slug: string;
}

// BlogList Component Types
export interface BlogListProps extends BaseProps {
  posts: BlogPostProps[];
}

// Contact Component Types
export interface ContactProps extends BaseProps, WithTitle, WithEmail, WithLocation, WithSocial, WithForm {
  // Additional contact-specific props can be added here
}

// Carousel Component Types
export interface CarouselProps extends BaseProps {
  items: React.ReactNode[];
  slidesToShow?: number;
  autoPlay?: boolean;
  interval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
}

export interface CarouselSlideProps extends BaseProps, WithChildren {
  index: number;
  slidesToShow: number;
  totalSlides: number;
  isActive?: boolean;
}

export interface CarouselNavigationProps extends BaseProps {
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

// Toggle Component Types
export interface ToggleProps extends BaseProps, WithOnChange<boolean> {
  initialValue?: boolean;
}

// Hero Component Types
export interface HeroProps extends BaseProps {
  imageUrl: ImageMetadata;
  name: string;
  title: string;
} 