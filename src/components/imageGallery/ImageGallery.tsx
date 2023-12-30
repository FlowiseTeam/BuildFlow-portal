import { createPortal } from 'react-dom';
import { Button } from '../button/Button';
import { useEffect } from 'react';

export function ImageGallery({
  images,
  selectedIndex = 0,
  setSelectedIndex,
  close,
}: {
  images: { url: string }[];
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  close: () => void;
}) {
  useEffect(() => {
    function handleKeyboardNavigation(e: KeyboardEvent) {
      switch (e.code) {
        case 'Escape': {
          close();
          break;
        }
        case 'ArrowLeft':
        case 'KeyA': {
          setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
          break;
        }
        case 'ArrowRight':
        case 'KeyD': {
          setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
          break;
        }
        default: {
          return;
        }
      }
    }

    window.addEventListener('keydown', handleKeyboardNavigation);

    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, []);

  const galleryContent = (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90">
      <div className="fixed inset-0" onClick={close}></div>
      <div className="z-10 mr-6 mt-6 self-end">
        <Button onClick={close}>Anuluj</Button>
      </div>
      <div className="z-10 max-h-[80%] bg-pink-300 object-cover">
        <img
          className="max-h-full max-w-full object-cover"
          src={import.meta.env.VITE_PROJECTS_URL.replace('/api', '') + images[selectedIndex || 0].url}
        />
      </div>
      <div className="z-10 flex h-[10%] w-screen justify-center overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={image.url}
            onClick={() => setSelectedIndex(index)}
            className={`h-full w-24 shrink-0 ${index === selectedIndex ? 'border-4 border-yellow-500' : ''}`}
          >
            <img className="h-full w-full" src={import.meta.env.VITE_PROJECTS_URL.replace('/api', '') + image.url} />
          </div>
        ))}
      </div>
    </div>
  );

  return createPortal(galleryContent, document.body);
}
