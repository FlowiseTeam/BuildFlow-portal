import { DetailCard } from '@src/components/detailCard/DetailCard';
import { ImageGallery } from '@src/components/imageGallery/ImageGallery';
import { useImageGallery } from '@src/components/imageGallery/useImageGallery';
import { useLatestProjectComments } from '@src/services/api/hooks/projects';
import { DashboardChatMessage } from './DashboardChatMessage';
import { DashboardChatMessageFallback } from './DashboardChatMessageFallback';
import { queryClient } from '@src/App';

export function DashboardComments() {
  const { close, currentIndex, images, isOpen, open, setCurrentIndex } = useImageGallery();
  const { data: comments, isError, failureCount } = useLatestProjectComments(); //TODO: add missing projectName
  // TODO: use ensureQueryData?

  const mappedComments = comments?.map((comment) => ({
    ...comment,
    projectName: queryClient.getQueryData(['project', comment.project_id])?.name,
  }));

  return (
    <>
      {isOpen && (
        <ImageGallery images={images} selectedIndex={currentIndex} close={close} setSelectedIndex={setCurrentIndex} />
      )}
      {isError && <p className="text-xs text-red-600">Nie można pobrać danych...</p>}
      {!isError && failureCount > 0 && <p className="text-xs text-yellow-600">Pobieranie trwa dłużej niż zwykle...</p>}
      <div className="grid gap-6 xl:grid-cols-2">
        {!mappedComments ||
          (!mappedComments.length && (
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
          ))}
        {mappedComments &&
          mappedComments.map((msg) => (
            <DetailCard key={msg._id} className="basis-full p-4">
              <DashboardChatMessage message={msg} openImageGallery={open} />
            </DetailCard>
          ))}
      </div>
    </>
  );
}
