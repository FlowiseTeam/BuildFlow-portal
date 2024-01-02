import { DetailCard } from '@components/detailCard/DetailCard';
import { FallbackMap } from '@components/fallbackMap/FallbackMap';
import { ProjectChat } from '@features/projectChat/ProjectChat';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { ProjectResources } from '@features/projectResources/ProjectResources';
import { Page } from '@layouts/Page';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';
import { useState } from 'react';
import { useIdParam } from '@src/hooks/useParams';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { LoadingPageSuspense } from '@src/components/queryBoundaries/LoadingView';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import {
  useProjectDeleteMutation,
  useProjectMutation,
  useProjectSuspenseQuery,
} from '@src/services/api/hooks/projects';
import { useNavigate } from 'react-router-dom';

function ProjectPage() {
  const id = useIdParam();
  const navigate = useNavigate();

  const [isEdited, setIsEdited] = useState(false);
  const toggleIsEdited = () => setIsEdited((prev) => !prev);

  const { data: project } = useProjectSuspenseQuery(Number(id));

  const { mutateAsync: deleteVehicle } = useProjectDeleteMutation(+id);
  const { mutateAsync: onUpdate, isPending } = useProjectMutation(+id);

  const onDelete = () => {
    deleteVehicle();
    navigate('/app/vehicles');
  };

  return (
    <Page
      header={
        <DetailsPageHeader
          title={project.name}
          backLink="/app/projects"
          onDelete={onDelete}
          deleteModalTitle="Czy chcesz usunąć projekt?"
          toggleEdit={toggleIsEdited}
          isEdited={isEdited}
        />
      }
    >
      <div className="mb-16 mt-8 grid min-h-0 grid-cols-1 grid-rows-[700px,400px,400px,400px] gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:grid-rows-[400px,400px]">
        <DetailCard className="p-2 md:col-span-2 xl:col-span-3">
          <ProjectForm
            project={project}
            disabled={!isEdited}
            handleFormSubmit={(data) => {
              onUpdate(data);
              setIsEdited(false);
            }}
            isPending={isPending}
          />
        </DetailCard>
        <DetailCard className="md:row-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1">
          <ProjectChat projectId={Number(id)} />
        </DetailCard>
        <DetailCard className="min-h-[14rem] overflow-hidden  sm:col-span-2 xl:col-span-2">
          <ProjectResources project={project} isEdited={isEdited} onUpdate={onUpdate} isDeleting={isPending} />
        </DetailCard>
        <DetailCard className="overflow-hidden sm:col-span-2 md:col-span-1">
          <FallbackMap />
        </DetailCard>
      </div>
    </Page>
  );
}

export default function () {
  return (
    <ErrorBoundary fallback={<PageFallback title="Projekt" message="Nie udało się załadować projektu." />}>
      <LoadingPageSuspense>
        <ProjectPage />
      </LoadingPageSuspense>
    </ErrorBoundary>
  );
}
