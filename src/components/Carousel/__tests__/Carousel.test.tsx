import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../Carousel';

describe('Carousel', () => {
  const mockChildren = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>
  ];

  // Helper function to wait for transition
  const waitForTransition = async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
  };

  const renderCarousel = (props = {}) => {
    return render(
      <Carousel transitionDuration={0} {...props}>
        {mockChildren}
      </Carousel>
    );
  };

  it('renders all slides', () => {
    renderCarousel();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('shows correct number of indicators based on slidesToShow', () => {
    renderCarousel({ slidesToShow: 2 });
    const indicators = screen.getAllByRole('button', { name: /go to slide group/i });
    expect(indicators).toHaveLength(2); // Math.ceil(3/2) = 2
  });

  it('navigates to next slide when next button is clicked', async () => {
    renderCarousel();
    const nextButton = screen.getByLabelText('Next slide');
    
    fireEvent.click(nextButton);
    await waitForTransition();
    
    expect(screen.getByText('Slide 2')).toBeVisible();
  });

  it('navigates to previous slide when prev button is clicked', async () => {
    renderCarousel();
    const nextButton = screen.getByLabelText('Next slide');
    const prevButton = screen.getByLabelText('Previous slide');
    
    fireEvent.click(nextButton);
    await waitForTransition();
    fireEvent.click(prevButton);
    await waitForTransition();
    
    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  it('disables navigation buttons during transition', async () => {
    renderCarousel();
    const prevButton = screen.getByLabelText('Previous slide');
    const nextButton = screen.getByLabelText('Next slide');

    // Initial state
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // During transition
    fireEvent.click(nextButton);
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();

    // After transition
    await waitForTransition();
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // During second transition
    fireEvent.click(nextButton);
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();

    // After second transition
    await waitForTransition();
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('handles keyboard navigation', async () => {
    renderCarousel();
    
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    await waitForTransition();
    expect(screen.getByText('Slide 2')).toBeVisible();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    await waitForTransition();
    expect(screen.getByText('Slide 1')).toBeVisible();

    fireEvent.keyDown(document, { key: 'Home' });
    await waitForTransition();
    expect(screen.getByText('Slide 1')).toBeVisible();

    fireEvent.keyDown(document, { key: 'End' });
    await waitForTransition();
    expect(screen.getByText('Slide 3')).toBeVisible();
  });
}); 