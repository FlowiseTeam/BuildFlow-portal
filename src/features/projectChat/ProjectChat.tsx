import { ChatComment } from './ChatComment';
import { useEffect, useRef } from 'react';
import { useImageGallery } from '@src/components/imageGallery/useImageGallery';
import { ImageGallery } from '@src/components/imageGallery/ImageGallery';
import { ChatCommentFallback } from './ChatCommentFallback';
import { ProjectChatForm } from './ProjectChatForm';
import { useProjectComments } from '@src/services/api/hooks/projects';

export function ProjectChat({ projectId }: { projectId: number }) {
  const { data, isError } = useProjectComments(projectId);
  const commentsDivRef = useRef<HTMLDivElement>(null);
  const { close, currentIndex, images, isOpen, open, setCurrentIndex } = useImageGallery();

  useEffect(() => {
    if (commentsDivRef.current) {
      commentsDivRef.current.scrollTop = commentsDivRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <>
      {isOpen && (
        <ImageGallery images={images} selectedIndex={currentIndex} close={close} setSelectedIndex={setCurrentIndex} />
      )}
      <div className="relative flex h-full min-h-0 flex-col justify-between overflow-auto p-2 pt-4">
        <div className="h-min overflow-y-auto" ref={commentsDivRef}>
          {!isError && !data && <ChatCommentFallback />}
          {data?.comments.map((message) => (
            <ChatComment key={message._id} message={message} openImageGallery={open} />
          ))}
        </div>

        <ProjectChatForm projectId={projectId} />
      </div>
    </>
  );
}
