import { DetailCard } from '@src/components/detailCard/DetailCard';
import { ImageGallery } from '@src/components/imageGallery/ImageGallery';
import { useImageGallery } from '@src/components/imageGallery/useImageGallery';
import { getProject, getProjectComments } from '@src/services/api';
import { useQuery } from 'react-query';
import { DashboardChatMessage } from './DashboardChatMessage';
import { DashboardChatMessageFallback } from './DashboardChatMessageFallback';

export function DashboardChat() {
  const { close, currentIndex, images, isOpen, open, setCurrentIndex } = useImageGallery();
  const { data, isError, failureCount } = useQuery(['project-messages', 6], () => getProjectComments(6));
  const { data: project } = useQuery(['project', 6], () => getProject(6));

  const messages = data?.comments.slice(-4).map((msg) => ({ ...msg, projectName: project?.name || '' }));

  return (
    <>
      {isOpen && (
        <ImageGallery images={images} selectedIndex={currentIndex} close={close} setSelectedIndex={setCurrentIndex} />
      )}
      {isError && <p className="text-xs text-red-600">Nie można pobrać danych...</p>}
      {!isError && failureCount > 0 && <p className="text-xs text-yellow-600">Pobieranie trwa dłużej niż zwykle...</p>}
      <div className="grid gap-6 xl:grid-cols-2">
        {!messages && (
          <>
            <DetailCard className="basis-full p-4">
              <DashboardChatMessageFallback />
            </DetailCard>
            <DetailCard className="basis-full p-4">
              <DashboardChatMessageFallback />
            </DetailCard>
            <DetailCard className="basis-full p-4">
              <DashboardChatMessageFallback />
            </DetailCard>
            <DetailCard className="basis-full p-4">
              <DashboardChatMessageFallback />
            </DetailCard>
          </>
        )}
        {messages &&
          messages.map((msg) => (
            <DetailCard key={msg._id} className="basis-full p-4">
              <DashboardChatMessage message={msg} openImageGallery={open} />
            </DetailCard>
          ))}
      </div>
    </>
  );
}
