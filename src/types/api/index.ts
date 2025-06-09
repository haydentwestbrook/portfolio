// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// Content Types
export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  date: Date;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  modifiedDate?: Date;
  author: string;
  image?: string;
  tags?: string[];
  draft?: boolean;
}

export interface About {
  title: string;
  description: string;
  image?: string;
}

export interface Contact {
  title: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  formTitle: string;
  formDescription: string;
}

// Collection Types
export interface Collection<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
  };
} 