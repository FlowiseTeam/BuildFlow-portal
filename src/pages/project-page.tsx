import { DetailCard } from '@components/detailCard/DetailCard';
import { FallbackMap } from '@components/fallbackMap/FallbackMap';
import { ProjectChat } from '@features/projectChat/ProjectChat';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { ProjectResources } from '@features/projectResources/ProjectResources';
import { Page } from '@layouts/Page';
import { useParams } from 'react-router-dom';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';
import { useProjectQuery } from '@src/features/project/hooks/useProjectQuery';

export function ProjectPage() {
  const id = useParams<{ id: string }>().id;
  if (!id) {
    throw new Error('Project id is not defined');
  }

  const { project, onDelete, onUpdate } = useProjectQuery(Number(id));

  return (
    <Page
      header={
        <DetailsPageHeader
          title={project.name}
          backLink="/app/projects"
          onDelete={onDelete}
          deleteModalTitle="Czy chcesz usunąć projekt?"
        />
      }
    >
      <div className="mb-16 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <DetailCard className="p-2 md:col-span-2 xl:col-span-3">
          <ProjectForm project={project} handleFormSubmit={onUpdate} />
        </DetailCard>
        <DetailCard className="row-span-2 min-h-[14rem] md:row-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1">
          <ProjectChat />
        </DetailCard>
        <DetailCard className="min-h-[14rem] sm:col-span-2  xl:col-span-2">
          <ProjectResources categories={{ Pracownicy: project.workers, Pojazdy: [] }} />
        </DetailCard>
        <DetailCard className="sm:col-span-2 md:col-span-1">
          <FallbackMap />
        </DetailCard>
      </div>
    </Page>
  );
}
