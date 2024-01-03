import { useSuspenseQuery } from '@tanstack/react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { AddProjectModal } from '@features/add-project/AddProjectModal';
import { Button } from '@components/button/Button';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { DashboardIcon } from '@components/icons/DashboardIcon';
import { ProjectsTable } from '@features/projectsTable/ProjectsTable';
import { ProjectsGrid } from '@src/features/projects/grid/ProjectsGrid';
import { useProjectsViewStore } from '@src/features/projects/useProjectsViewStore';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { LoadingPageSuspense } from '@src/components/queryBoundaries/LoadingView';
import { queryClient } from '@src/App';

function ProjectViewToggler({ view, toggle }: { view: 'list' | 'grid'; toggle: () => void }) {
  return (
    <span className="flex items-center gap-4">
      <span>{view === 'list' ? 'lista' : 'kafelki'}</span>
      <Button className="rounded px-1 py-1" onClick={toggle}>
        {view === 'list' ? (
          <ListBulletIcon className="h-6" data-testid="list-button" />
        ) : (
          <DashboardIcon className="h-6" data-testid="grid-button" />
        )}
      </Button>
    </span>
  );
}

function ProjectsPage() {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await getProjects();

      data.projects.forEach((project) => {
        queryClient.setQueryData(['project', project._id], project);
      });

      return data;
    },
  });

  const { view, toggleView } = useProjectsViewStore();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const onSuccessfulAdd = () => {
    setIsAddProjectModalOpen(false);
  };

  return (
    <Page title="Projekty">
      <AddProjectModal
        show={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSuccess={onSuccessfulAdd}
      />
      <div className="mt-8 flex flex-col">
        <div className="mb-6 flex items-center justify-end">
          <span className="flex items-center gap-12">
            <ProjectViewToggler view={view} toggle={toggleView} />
            <Button variant="primary" onClick={() => setIsAddProjectModalOpen(true)}>
              Dodaj projekt
            </Button>
          </span>
        </div>
        <div className="mb-24 w-0 min-w-full">
          {view === 'list' && <ProjectsTable projects={data.projects} refetch={refetch} />}
          {view === 'grid' && <ProjectsGrid projects={data.projects} refetch={refetch} />}
        </div>
      </div>
    </Page>
  );
}

export default function () {
  return (
    <ErrorBoundary fallback={<PageFallback title="Projekty" message="Nie udało się załadować listy projektów." />}>
      <LoadingPageSuspense>
        <ProjectsPage />
      </LoadingPageSuspense>
    </ErrorBoundary>
  );
}
