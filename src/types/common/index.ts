// Common type definitions used across the application

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'ghost';
export type Shape = 'default' | 'circle';

export interface BaseProps {
  className?: string;
  id?: string;
}

export interface WithChildren {
  children?: React.ReactNode;
}

export interface WithLoading {
  isLoading?: boolean;
}

export interface WithDisabled {
  disabled?: boolean;
}

export interface WithOnClick {
  onClick?: (event: React.MouseEvent) => void;
}

export interface WithOnChange<T = any> {
  onChange?: (value: T) => void;
}

export interface WithHref {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export interface WithAlt {
  altText: string;
}

export interface WithTitle {
  title: string;
}

export interface WithDescription {
  description: string;
}

export interface WithDate {
  date: Date;
}

export interface WithImage {
  image: string;
}

export interface WithTags {
  tags: string[];
}

export interface WithTechnologies {
  technologies: string[];
}

export interface WithLinks {
  liveUrl?: string;
  githubUrl?: string;
}

export interface WithAuthor {
  author: string;
}

export interface WithEmail {
  email: string;
}

export interface WithLocation {
  location: string;
}

export interface WithSocial {
  github: string;
  linkedin: string;
}

export interface WithForm {
  formTitle: string;
  formDescription: string;
} 