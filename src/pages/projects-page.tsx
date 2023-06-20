import { useQuery } from 'react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { AddProjectModal } from '@features/add-project/AddProjectModal';
import { Button } from '@components/button/Button';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { DashboardIcon } from '@components/icons/DashboardIcon';
import { ProjectsTable } from '@features/projectsTable/ProjectsTable';
import { queryClient } from '@src/main';

export function ProjectsPage() {
  const { data } = useQuery('projects', getProjects, {
    suspense: true,
    onSuccess: (queryData) => {
      queryData.projects.forEach((project) => {
        queryClient.setQueryData(['project', project._id], project);
      });
    },
  });
  if (!data) throw Error('Something went wrong');
  const [view, setView] = useState<'list' | 'tiles'>('list');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const toggleView = () => setView(view === 'list' ? 'tiles' : 'list');

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
        <div className="flex justify-between items-end">
          <input
            name="filter"
            placeholder="Wyszukaj"
            className="rounded-full shadow-lg px-2 text-xs py-1 outline-gray-400 outline-[1px]"
          />
          <Button variant="primary" onClick={() => setIsAddProjectModalOpen(true)}>
            dodaj projekt
          </Button>
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
        <div className="mb-24 w-0 min-w-full">
          <ProjectsTable projects={data.projects} />
        </div>
      </div>
    </Page>
  );
}
