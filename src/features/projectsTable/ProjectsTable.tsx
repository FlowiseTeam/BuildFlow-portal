import { Table } from '@components/table/Table';
import { EditProjectModal } from '@features/edit-project/EditProjectModal';
import { Project } from '@services/api-types';
import { useMemo, useState } from 'react';

const columns = [
  { title: 'Nazwa', key: 'name', sortable: true },
  { title: 'Adres', key: 'address', sortable: false },
  { title: 'Termin rozp.', key: 'start_date', sortable: true, sortbyOrder: 'desc', center: true },
  { title: 'Termin ukoń.', key: 'end_date', sortable: true, center: true },
  { title: 'Ilość prac', key: 'workers', sortable: true, center: true },
];

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const activeProject = projects.find((project) => project._id === activeProjectId);
  const handleEdit = (projectId: number) => {
    setActiveProjectId(projectId);
  };

  const tableData = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        id: project._id,
        address: `${project.city}, ${project.street}`,
        workers: project.workers.length,
      })),
    [projects],
  );

  return (
    <>
      <EditProjectModal activeProject={activeProject} setActiveProjectId={setActiveProjectId} />
      <Table
        columns={columns}
        data={tableData}
        defaultSort={{ direction: 'asc', key: 'endDate' }}
        onEdit={handleEdit}
      />
    </>
  );
}
