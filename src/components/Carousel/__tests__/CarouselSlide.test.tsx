import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarouselSlide } from '../CarouselSlide';

describe('CarouselSlide', () => {
  it('renders children content', () => {
    render(
      <CarouselSlide isActive={true} index={0} totalSlides={3}>
        <div>Test Content</div>
      </CarouselSlide>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct ARIA attributes', () => {
    render(
      <CarouselSlide isActive={true} index={1} totalSlides={3}>
        <div>Test Content</div>
      </CarouselSlide>
    );
    
    const slide = screen.getByRole('group');
    expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    expect(slide).toHaveAttribute('aria-label', 'Slide 2 of 3');
  });

  it('applies active styles when isActive is true', () => {
    render(
      <CarouselSlide isActive={true} index={0} totalSlides={3}>
        <div>Test Content</div>
      </CarouselSlide>
    );
    
    const slide = screen.getByRole('group');
    expect(slide).toHaveClass('opacity-100');
    expect(slide).not.toHaveClass('opacity-0');
  });

  it('applies inactive styles when isActive is false', () => {
    render(
      <CarouselSlide isActive={false} index={0} totalSlides={3}>
        <div>Test Content</div>
      </CarouselSlide>
    );
    
    const slide = screen.getByRole('group');
    expect(slide).toHaveClass('opacity-0');
    expect(slide).toHaveClass('pointer-events-none');
    expect(slide).not.toHaveClass('opacity-100');
  });

  it('maintains full width and height', () => {
    render(
      <CarouselSlide isActive={true} index={0} totalSlides={3}>
        <div>Test Content</div>
      </CarouselSlide>
    );
    
    const slide = screen.getByRole('group');
    expect(slide).toHaveClass('h-full');
    expect(slide).toHaveClass('w-full');
  });

  it('applies transition classes', () => {
    render(
      <CarouselSlide isActive={true} index={0} totalSlides={3}>
        <div>Test Content</div>
      </CarouselSlide>
    );
    
    const slide = screen.getByRole('group');
    expect(slide).toHaveClass('transition-opacity');
    expect(slide).toHaveClass('duration-300');
  });
}); 