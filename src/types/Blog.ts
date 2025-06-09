export interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: string;
    author: string;
    image?: string;
    tags?: string[];
  };
} 