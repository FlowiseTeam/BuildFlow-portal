import { TrashIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { LoadingIcon } from '@src/components/loadings/Loading';
import { useDeleteComment } from '@src/services/api/hooks/projects';
import { Comment } from '@src/services/api/index';

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
  const { mutate, isPending } = useDeleteComment(message.project_id, message._id);

  return (
    <div className="peer:border-b-2 group mt-2 pb-2 text-sm">
      <div className="relative mb-1 flex justify-between text-xs text-gray-500">
        <span>{new Date(message.created_at).toLocaleDateString('pl')}</span>
        {variant === 'dashboard' && <span>{message.project_id}</span>}
        <Button
          onClick={() => mutate()}
          className="right-0 ml-4 mr-2 mt-2 hidden p-1 group-hover:absolute group-hover:inline"
          size="custom"
        >
          <TrashIcon className=" h-4 w-4 cursor-pointer text-neutral-500" />
        </Button>
      </div>
      {isPending ? (
        <div className="flex justify-center">
          <LoadingIcon className="h-6" />
        </div>
      ) : (
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
                  src={import.meta.env.VITE_PROJECTS_URL.replace('/api', '') + url}
                  loading="lazy"
                  alt=""
                  className="h-20 w-full object-cover hover:cursor-pointer"
                />
              </div>
            ))}
          </div>
          <p>{message.message}</p>
        </div>
      )}
    </div>
  );
}
