import { useState } from 'react';

export function useImageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);

  const open = (images: { url: string }[], selectedIndex: number) => {
    setIsOpen(true);
    setCurrentIndex(selectedIndex);
    setImages(images);
  };

  const close = () => {
    setIsOpen(false);
    setCurrentIndex(null);
    setImages([]);
  };

  return { open, isOpen, images, currentIndex, close, setCurrentIndex };
}
