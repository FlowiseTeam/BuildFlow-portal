import { Comment } from '@src/services/api/index';
import { useNavigate } from 'react-router-dom';

type DashboardMessage = Comment & { projectName: string };

export function DashboardChatMessage({
  message,
  openImageGallery,
}: {
  message: DashboardMessage;
  openImageGallery: (
    images: {
      url: string;
    }[],
    selectedIndex: number,
  ) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between">
        <p
          className="text-xs uppercase text-primary hover:cursor-pointer"
          onClick={() => navigate(`/app/projects/${message.project_id}`)}
        >
          {message.projectName}
        </p>
        {/* <p className="text-sm font-light text-gray-400">{message.status}</p> */}

        <p className="text-sm font-light text-gray-400">{''}</p>
      </div>
      <div className="flex justify-between">
        <p className="flex-grow">{message.message}</p>
        <div className="overflow-hidden rounded">
          {message.images.slice(0, 1).map(({ url }, index) => (
            <div key={url} className="relative h-12 w-12 ">
              {index === 0 && message.images.length > 1 && (
                <div className="pointer-events-none absolute flex h-12 w-full items-center justify-center bg-black/50 object-contain text-white">{`+${
                  message.images.length - 3
                }`}</div>
              )}
              <img
                onClick={() => openImageGallery(message.images, index)}
                src={import.meta.env.VITE_PROJECTS_URL + url}
                loading="lazy"
                alt=""
                className="h-12 w-full object-cover hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <span className="text-sm text-gray-400">{new Date(message.created_at).toLocaleDateString('pl')}</span>
      </div>
    </div>
  );
}
