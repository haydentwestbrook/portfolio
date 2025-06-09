import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogList from '../BlogList';
import type { BlogPost } from '../../../types/Blog';

const mockPosts: BlogPost[] = [
  {
    slug: 'test-post-1',
    data: {
      title: 'Test Post 1',
      description: 'This is a test post',
      pubDate: '2024-03-20',
      author: 'Test Author',
      image: 'https://example.com/image.jpg',
      tags: ['test', 'blog']
    }
  },
  {
    slug: 'test-post-2',
    data: {
      title: 'Test Post 2',
      description: 'Another test post',
      pubDate: '2024-03-21',
      author: 'Test Author',
      tags: ['test']
    }
  }
];

describe('BlogList', () => {
  it('renders a list of blog posts', () => {
    render(<BlogList posts={mockPosts} />);
    
    // Check if both post titles are rendered
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('renders post descriptions', () => {
    render(<BlogList posts={mockPosts} />);
    
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
    expect(screen.getByText('Another test post')).toBeInTheDocument();
  });

  it('renders post metadata', () => {
    render(<BlogList posts={mockPosts} />);
    
    // Check if dates and authors are rendered
    expect(screen.getByText('2024-03-20 by Test Author')).toBeInTheDocument();
    expect(screen.getByText('2024-03-21 by Test Author')).toBeInTheDocument();
  });

  it('creates correct links for each post', () => {
    render(<BlogList posts={mockPosts} />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/blog/test-post-1/');
    expect(links[1]).toHaveAttribute('href', '/blog/test-post-2/');
  });

  it('renders empty list when no posts are provided', () => {
    render(<BlogList posts={[]} />);
    
    const list = screen.getByRole('list');
    expect(list).toBeEmptyDOMElement();
  });
}); 