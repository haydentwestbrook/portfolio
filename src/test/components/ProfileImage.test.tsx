import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';

describe('ProfileImage', () => {
  const defaultProps = {
    imageUrl: '/test-image.jpg',
    altText: 'Test profile image'
  };

  it('renders with default props', () => {
    render(<ProfileImage {...defaultProps} />);
    const image = screen.getByAltText('Test profile image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<ProfileImage {...defaultProps} className={customClass} />);
    const container = screen.getByAltText('Test profile image').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('has responsive container styles', () => {
    render(<ProfileImage {...defaultProps} />);
    const container = screen.getByAltText('Test profile image').parentElement;
    
    // Check for responsive container classes
    expect(container).toHaveClass('relative', 'rounded-full', 'overflow-hidden', 'border-4', 'border-primary', 'shadow-xl', 'transition-all', 'duration-300');
  });

  it('has responsive padding classes', () => {
    render(<ProfileImage {...defaultProps} />);
    const wrapper = screen.getByAltText('Test profile image').parentElement?.parentElement;
    
    // Check for responsive padding classes
    expect(wrapper).toHaveClass('py-4', 'sm:py-6', 'md:py-8');
  });

  it('has responsive image styles', () => {
    render(<ProfileImage {...defaultProps} />);
    const image = screen.getByAltText('Test profile image');
    
    // Check for responsive image classes
    expect(image).toHaveClass('w-full', 'h-full', 'object-cover', 'object-[center_10%]');
  });

  it('applies clamp function for responsive sizing', () => {
    render(<ProfileImage {...defaultProps} />);
    const container = screen.getByAltText('Test profile image').parentElement;
    
    // Check for clamp function in style
    expect(container).toHaveStyle({
      width: 'clamp(200px, 50vw, 400px)',
      height: 'clamp(200px, 50vw, 400px)'
    });
  });

  it('maintains aspect ratio', () => {
    render(<ProfileImage {...defaultProps} />);
    const container = screen.getByAltText('Test profile image').parentElement;
    
    // Ensure container exists before checking styles
    expect(container).not.toBeNull();
    
    // Check that width and height are equal (maintaining aspect ratio)
    const style = window.getComputedStyle(container!);
    expect(style.width).toBe(style.height);
  });
}); 