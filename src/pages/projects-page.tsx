import { useQuery } from 'react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { AddProjectModal } from '@features/add-project/AddProjectModal';
import { Table } from '@components/table/Table';
import { Button } from '@components/button/Button';
import { EditProjectModal } from '@features/edit-project/EditProjectModal';
import { Project } from '@services/api-types';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { DashboardIcon } from '@components/icons/DashboardIcon';

const columns = [
  { title: 'Nazwa', key: 'name', sortable: true },
  { title: 'Adres', key: 'address', sortable: false },
  { title: 'Termin rozp.', key: 'startDate', sortable: true, sortbyOrder: 'desc', center: true },
  { title: 'Termin ukoń.', key: 'endDate', sortable: true, center: true },
  { title: 'Ilość prac', key: 'tasks', sortable: true, center: true },
];

export function ProjectsPage() {
  const { data } = useQuery<Project[]>('projects', getProjects, { suspense: true });
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const activeProject = data?.find((project) => project.id.$oid === activeProjectId);

  const toggleView = () => setView(view === 'list' ? 'grid' : 'list');

  if (!data) {
    return <div>Something went wrong</div>;
  }

  const handleEdit = (projectId: string) => {
    setActiveProjectId(projectId);
  };

  const flatData = data.map((project) => ({
    ...project,
    id: project.id.$oid,
    address: `${project.address.street}, ${project.address.city}`,
  }));

  console.log(flatData);

  return (
    <Page title="Projekty">
      <EditProjectModal activeProject={activeProject} setActiveProjectId={setActiveProjectId} />
      <AddProjectModal show={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} />
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
          <Table
            columns={columns}
            data={flatData}
            defaultSort={{ direction: 'asc', key: 'endDate' }}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </Page>
  );
}
