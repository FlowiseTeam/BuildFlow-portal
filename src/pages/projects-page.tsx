import { useQuery } from 'react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { AddProjectModal } from '@features/add-project/AddProjectModal';
import { Table } from '@components/table/Table';
import { Button } from '@components/button/Button';
import { EditProjectModal } from '@features/edit-project/EditProjectModal';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { DashboardIcon } from '@components/icons/DashboardIcon';

const columns = [
  { title: 'Nazwa', key: 'name', sortable: true },
  { title: 'Adres', key: 'address', sortable: false },
  { title: 'Termin rozp.', key: 'start_date', sortable: true, sortbyOrder: 'desc', center: true },
  { title: 'Termin ukoń.', key: 'end_date', sortable: true, center: true },
  { title: 'Ilość prac', key: 'workers', sortable: true, center: true },
];

export function ProjectsPage() {
  const { data, refetch } = useQuery('projects', getProjects, { suspense: true });
  if (!data) throw Error('Something went wrong');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const activeProject = data.project.find((project) => project._id === activeProjectId);

  const toggleView = () => setView(view === 'list' ? 'grid' : 'list');

  if (!data) {
    return <div>Something went wrong</div>;
  }

  const handleEdit = (projectId: number) => {
    setActiveProjectId(projectId);
  };

  const onSuccessfulAdd = () => {
    refetch();
    setIsAddProjectModalOpen(false);
  };

  const tableData = data.project.map((project) => ({
    ...project,
    id: project._id,
    address: `${project.city}, ${project.street}`,
    workers: project.workers.length,
  }));

  return (
    <Page title="Projekty">
      <EditProjectModal activeProject={activeProject} setActiveProjectId={setActiveProjectId} />
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
          <Table
            columns={columns}
            data={tableData}
            defaultSort={{ direction: 'asc', key: 'endDate' }}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </Page>
  );
}
