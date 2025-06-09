import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogList } from '../BlogList';

// Mock the date formatting to ensure consistent test results
const mockDate = new Date('2024-03-20');
const mockDate2 = new Date('2024-03-21');

type ToLocaleDateStringFn = (this: Date, ...args: Parameters<Date['toLocaleDateString']>) => string;

vi.spyOn(Date.prototype, 'toLocaleDateString').mockImplementation(function(this: Date) {
  if (this.getTime() === mockDate.getTime()) {
    return 'March 20, 2024';
  }
  if (this.getTime() === mockDate2.getTime()) {
    return 'March 21, 2024';
  }
  return this.toLocaleDateString();
} as ToLocaleDateStringFn);

const mockPosts = [
  {
      title: 'Test Post 1',
      description: 'This is a test post',
    date: '2024-03-20',
    slug: 'test-post-1'
  },
  {
      title: 'Test Post 2',
      description: 'Another test post',
    date: '2024-03-21',
    slug: 'test-post-2'
  }
];

describe('BlogList', () => {
  it('renders the section title and description', () => {
    render(<BlogList posts={mockPosts} />);
    
    expect(screen.getByText('Latest Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('Thoughts, tutorials, and insights on software development')).toBeInTheDocument();
  });

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

  it('renders formatted dates', () => {
    render(<BlogList posts={mockPosts} />);
    
    // Check if dates are rendered in the correct format
    const dateElements = screen.getAllByText(/March \d{1,2}, 2024/);
    expect(dateElements).toHaveLength(2);
    expect(dateElements[0]).toHaveTextContent('March 20, 2024');
    expect(dateElements[1]).toHaveTextContent('March 21, 2024');
  });

  it('renders "Read More" buttons for each post', () => {
    render(<BlogList posts={mockPosts} />);
    
    const buttons = screen.getAllByText('Read More');
    expect(buttons).toHaveLength(2);
  });

  it('navigates to the correct URL when clicking "Read More"', () => {
    // Mock window.location
    const mockLocation = { href: '' };
    const originalLocation = window.location;
    
    // @ts-ignore - Mocking window.location for testing
    window.location = mockLocation;

    render(<BlogList posts={mockPosts} />);
    
    const buttons = screen.getAllByText('Read More');
    fireEvent.click(buttons[0]);
    
    expect(window.location.href).toBe('/blog/test-post-1');

    // Restore window.location
    // @ts-ignore - Restoring original window.location
    window.location = originalLocation;
  });

  it('renders empty grid when no posts are provided', () => {
    render(<BlogList posts={[]} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toBeEmptyDOMElement();
  });

  it('applies hover effects to post cards', () => {
    render(<BlogList posts={mockPosts} />);
    
    const cards = screen.getAllByRole('article');
    cards.forEach(card => {
      expect(card).toHaveClass('hover:scale-105');
    });
  });
}); 