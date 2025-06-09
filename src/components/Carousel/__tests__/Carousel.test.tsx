import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Carousel } from '../Carousel';

const mockItems = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

describe('Carousel', () => {
  it('renders all slides', () => {
    render(<Carousel items={mockItems} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });
  it('navigates to next slide when next button is clicked', () => {
    render(<Carousel items={mockItems} />);
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);
    expect(screen.getByText('Slide 2')).toBeVisible();
  });

  it('navigates to previous slide when prev button is clicked', () => {
    render(<Carousel items={mockItems} />);
    const nextButton = screen.getByLabelText('Next slide');
    const prevButton = screen.getByLabelText('Previous slide');
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  it('disables navigation buttons during transition', () => {
    render(<Carousel items={mockItems} />);
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
  });

  it('handles keyboard navigation', () => {
    render(<Carousel items={mockItems} />);
    const carousel = screen.getByRole('region', { name: 'Carousel' });
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(screen.getByText('Slide 2')).toBeVisible();
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(screen.getByText('Slide 1')).toBeVisible();
  });
}); 