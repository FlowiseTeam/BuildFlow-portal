import { useQuery } from 'react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { AddProjectModal } from '@features/add-project/AddProjectModal';
import { Button } from '@components/button/Button';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { DashboardIcon } from '@components/icons/DashboardIcon';
import { ProjectsTable } from '@features/projectsTable/ProjectsTable';

export function ProjectsPage() {
  const { data, refetch } = useQuery('projects', getProjects, { suspense: true });
  const [view, setView] = useState<'list' | 'tiles'>('list');
  // if (!data) throw Error('Something went wrong');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  if (!data) {
    return <div>Something went wrong</div>;
  }

  console.log(data);

  const toggleView = () => setView(view === 'list' ? 'tiles' : 'list');

  const onSuccessfulAdd = () => {
    refetch();
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
        <div className="flex justify-between">
          <button>szukaj</button>
          <Button onClick={() => setIsAddProjectModalOpen(true)}>dodaj projekt</Button>
        </div>
        <div className="my-4 ml-auto flex items-center gap-4">
          {view === 'list' ? (
            <>
              <p>lista</p>
              <Button className="rounded px-1 py-1" onClick={toggleView}>
                <ListBulletIcon className="h-6" />
              </Button>
            </>
          ) : (
            <>
              <p>kafelki</p>
              <Button className="rounded px-1 py-1" onClick={toggleView}>
                <DashboardIcon className="h-6" />
              </Button>
            </>
          )}
        </div>
        <div className="w-0 min-w-full">
          <ProjectsTable projects={data.projects} />
        </div>
      </div>
    </Page>
  );
}
