import { Comment } from '@src/services/api-types';

export function ChatComment({
  message,
  openImageGallery,
  variant = 'default',
}: {
  message: Comment;
  openImageGallery: (
    images: {
      url: string;
    }[],
    selectedIndex: number,
  ) => void;
  variant?: 'default' | 'dashboard';
}) {
  return (
    <div className="peer:border-b-2 mt-2 pb-2 text-sm">
      <div className="mb-1 flex justify-between text-xs text-gray-500">
        <span>{new Date(message.created_at).toLocaleDateString('pl')}</span>
        {variant === 'dashboard' && <span>{message.project_id}</span>}
      </div>
      <div>
        <div className="mb-1 flex w-full">
          {message.images.slice(0, 3).map(({ url }, index) => (
            <div key={url} className="relative h-20 basis-1/3 ">
              {index === 2 && message.images.length > 3 && (
                <div className="pointer-events-none absolute flex h-20 w-full items-center justify-center bg-black/50 object-contain text-white">{`+${
                  message.images.length - 3
                }`}</div>
              )}
              <img
                onClick={() => openImageGallery(message.images, index)}
                src={'http://localhost:3000' + url}
                loading="lazy"
                alt=""
                className="h-20 w-full object-cover hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
        <p>{message.message}</p>
      </div>
    </div>
  );
}
