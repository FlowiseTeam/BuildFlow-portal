import { Table, TableColumn } from '@components/table/Table';
import { EditProjectModal } from '@features/edit-project/EditProjectModal';
import { Project } from '@services/api-types';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const columns = [
  { type: 'text', title: 'Nazwa', key: 'name', sortable: true },
  { type: 'text', title: 'Adres', key: 'address', sortable: false },
  { type: 'date', title: 'Termin rozp.', key: 'start_date', sortable: true, sortbyOrder: 'desc', center: true },
  { type: 'date', title: 'Termin ukoń.', key: 'end_date', sortable: true, center: true },
  { type: 'number', title: 'Ilość pracowników', key: 'employees', sortable: true, center: true },
  {
    type: 'select',
    title: 'Status',
    key: 'status',
    sortable: true,
    center: true,
    options: [
      { value: 'W trakcie', className: 'bg-yellow-300 hover:bg-yellow-400' },
      { value: 'Zawieszony', className: 'bg-red-400 hover:bg-red-500' },
      { value: 'Zakończony', className: 'bg-green-400 hover:bg-green-500' },
    ],
  },
] satisfies TableColumn[];

export function ProjectsTable({ projects, refetch }: { projects: Project[]; refetch: () => void }) {
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
      <EditProjectModal onClose={() => setActiveProjectId(null)} activeProject={activeProject} refetch={refetch} />
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
