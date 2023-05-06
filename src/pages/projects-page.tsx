import { useQuery } from 'react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { Project } from '@data/types';
import { useState } from 'react';
import { Modal } from '@components/modal/Modal';
import { AddProject } from '@features/add-project/AddProject';
import { Table } from '@components/table/Table';

const columns = [
  { title: 'Nazwa', key: 'title', sortable: true },
  { title: 'Adres', key: 'address', sortable: false },
  { title: 'Termin rozp.', key: 'startDate', sortable: true, sortbyOrder: 'desc', center: true },
  { title: 'Termin ukoń.', key: 'endDate', sortable: true, center: true },
  { title: 'Ilość prac', key: 'tasks', sortable: true, center: true },
];

export function ProjectsPage() {
  const { data } = useQuery<Project[]>('projects', getProjects, { suspense: true });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const activeProject = data?.find((project) => project.id === activeProjectId);

  if (!data) {
    return <div>Something went wrong</div>;
  }

  const handleEdit = (projectId: string) => {
    setActiveProjectId(projectId);
  };

  return (
    <Page title="Projekty">
      <Modal title={activeProject?.title} show={!!activeProject} onClose={() => setActiveProjectId(null)}>
        <div>xd</div>
      </Modal>
      <AddProject show={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} />
      <div className="flex flex-col mt-8">
        <div className="flex justify-between">
          <button>szukaj</button>
          <button onClick={() => setIsAddProjectModalOpen(true)}>dodaj projekt</button>
        </div>
        <div className="ml-auto">lista / kafelki</div>
        <div>
          <Table columns={columns} data={data} defaultSort={{ direction: 'asc', key: 'endDate' }} onEdit={handleEdit} />
        </div>
      </div>
    </Page>
  );
}
