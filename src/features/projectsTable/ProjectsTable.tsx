import { Table, TableColumn } from '@components/table/Table';
import { EditProjectModal } from '@features/edit-project/EditProjectModal';
import { Project } from '@services/api-types';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  { type: 'input', title: 'Nazwa', key: 'name', sortable: true },
  { type: 'input', title: 'Adres', key: 'address', sortable: false },
  { type: 'input', title: 'Termin rozp.', key: 'start_date', sortable: true, sortbyOrder: 'desc', center: true },
  { type: 'input', title: 'Termin ukoń.', key: 'end_date', sortable: true, center: true },
  { type: 'input', title: 'Ilość prac', key: 'employees', sortable: true, center: true },
  {
    title: 'Status',
    key: 'status',
    sortable: true,
    center: true,
    type: 'select',
    options: ['W trakcie', 'Zakończone'],
  },
] satisfies TableColumn[];

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const activeProject = projects.find((project) => project._id === activeProjectId);
  const handleEdit = (projectId: number) => {
    setActiveProjectId(projectId);
  };
  const navigate = useNavigate();

  const tableData = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        id: project._id,
        address: `${project.city}, ${project.street}`,
        employees: project.employees.length,
      })),
    [projects],
  );

  const handleRowClick = (id: number) => {
    navigate(`/app/projects/${id}`);
  };

  return (
    <>
      <EditProjectModal activeProject={activeProject} setActiveProjectId={setActiveProjectId} />
      <Table
        onRowClick={handleRowClick}
        columns={columns}
        data={tableData}
        defaultSort={{ direction: 'asc', key: 'endDate' }}
        onEdit={handleEdit}
      />
    </>
  );
}
