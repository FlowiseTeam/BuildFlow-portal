import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImageGallery } from './ImageGallery';

describe('ImageGallery Component', () => {
  const mockImages = [{ url: 'image1.jpg' }, { url: 'image2.jpg' }, { url: 'image3.jpg' }];

  it('renders correctly', () => {
    const { container } = render(
      <ImageGallery images={mockImages} selectedIndex={0} setSelectedIndex={() => {}} close={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('navigates between images using keyboard', () => {
    const setSelectedIndex = vitest.fn();
    render(<ImageGallery images={mockImages} selectedIndex={0} setSelectedIndex={setSelectedIndex} close={() => {}} />);

    fireEvent.keyDown(window, { code: 'ArrowRight' });
    expect(setSelectedIndex).toHaveBeenCalledWith(expect.any(Function));

    fireEvent.keyDown(window, { code: 'ArrowLeft' });
    expect(setSelectedIndex).toHaveBeenCalledWith(expect.any(Function));
  });

  it('closes the gallery on escape key press', () => {
    const close = vitest.fn();
    render(<ImageGallery images={mockImages} selectedIndex={0} setSelectedIndex={() => {}} close={close} />);

    fireEvent.keyDown(window, { code: 'Escape' });
    expect(close).toHaveBeenCalled();
  });

  it('selects image on thumbnail click', () => {
    const setSelectedIndex = vitest.fn();
    render(<ImageGallery images={mockImages} selectedIndex={0} setSelectedIndex={setSelectedIndex} close={() => {}} />);

    const secondThumbnail = screen.getAllByRole('img')[1];
    fireEvent.click(secondThumbnail);
    expect(setSelectedIndex).toHaveBeenCalledWith(0);
  });
});
