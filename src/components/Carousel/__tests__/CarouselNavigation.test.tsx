import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarouselNavigation } from '../CarouselNavigation';

describe('CarouselNavigation', () => {
  const defaultProps = {
    totalSlides: 6,
    activeIndex: 0,
    isTransitioning: false,
    onPrevSlide: vi.fn(),
    onNextSlide: vi.fn(),
    onGoToSlide: vi.fn(),
    slidesToShow: 2,
    maxIndex: 4
  };

  it('renders navigation arrows', () => {
    render(<CarouselNavigation {...defaultProps} />);
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('renders correct number of indicators', () => {
    render(<CarouselNavigation {...defaultProps} />);
    const indicators = screen.getAllByRole('button', { name: /go to slide group/i });
    expect(indicators).toHaveLength(3); // Math.ceil(6/2) = 3
  });

  it('disables prev button when at start', () => {
    render(<CarouselNavigation {...defaultProps} activeIndex={0} />);
    expect(screen.getByLabelText('Previous slide')).toBeDisabled();
  });

  it('disables next button when at end', () => {
    render(<CarouselNavigation {...defaultProps} activeIndex={4} />);
    expect(screen.getByLabelText('Next slide')).toBeDisabled();
  });

  it('calls onPrevSlide when prev button is clicked', () => {
    render(<CarouselNavigation {...defaultProps} activeIndex={1} />);
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(defaultProps.onPrevSlide).toHaveBeenCalled();
  });

  it('calls onNextSlide when next button is clicked', () => {
    render(<CarouselNavigation {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(defaultProps.onNextSlide).toHaveBeenCalled();
  });

  it('calls onGoToSlide with correct index when indicator is clicked', () => {
    render(<CarouselNavigation {...defaultProps} />);
    const indicators = screen.getAllByRole('button', { name: /go to slide group/i });
    fireEvent.click(indicators[1]);
    expect(defaultProps.onGoToSlide).toHaveBeenCalledWith(2); // index * slidesToShow
  });

  it('disables all buttons during transition', () => {
    render(<CarouselNavigation {...defaultProps} isTransitioning={true} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('marks correct indicator as active', () => {
    render(<CarouselNavigation {...defaultProps} activeIndex={2} />);
    const indicators = screen.getAllByRole('button', { name: /go to slide group/i });
    expect(indicators[1]).toHaveAttribute('aria-current', 'true');
  });

  it('hides arrows when showArrows is false', () => {
    render(<CarouselNavigation {...defaultProps} showArrows={false} />);
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('hides indicators when showIndicators is false', () => {
    render(<CarouselNavigation {...defaultProps} showIndicators={false} />);
    expect(screen.queryByRole('button', { name: /go to slide group/i })).not.toBeInTheDocument();
  });
}); 