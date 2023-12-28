import { Table, TableColumn } from '@components/table/Table';
import { SearchInput } from '@src/components/Input/SearchInput';
import { Employee } from '@src/services/api/index';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const columns = [
  { type: 'text', title: 'Imię', key: 'first_name', sortable: true },
  { type: 'text', title: 'Nazwisko', key: 'last_name', sortable: true },
  { type: 'text', title: 'Rola', key: 'role', sortable: true },
  { type: 'text-array', title: 'Projekty', key: 'assigned_project' },
  {
    type: 'select',
    title: 'Status',
    key: 'status',
    sortable: true,
    center: true,
    options: [
      { value: 'Przypisany', className: 'bg-green-400 hover:bg-green-500' },
      { value: 'Nieprzypisany', className: 'bg-orange-400 hover:bg-orange-500' },
      { value: 'Urlop', className: 'bg-yellow-300 hover:bg-yellow-400' },
    ],
  },
] satisfies TableColumn[];

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const navigate = useNavigate();

  const tableData = useMemo(() => {
    const unfiltered = employees.map((employee) => ({
      ...employee,
      id: employee._id,
      assigned_project: employee.assigned_project?.map((project) => project.project_name),
    }));

    if (!searchQuery) {
      return unfiltered;
    }

    return unfiltered.filter(
      (employee) =>
        employee.first_name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        employee.last_name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }, [employees, searchQuery]);

  const handleRowClick = (id: number) => {
    navigate(`/app/employees/${id}`);
  };

  return (
    <>
      <div className="mb-4">
        <SearchInput value={searchQuery} onChange={handleQueryChange} />
      </div>
      <Table
        onRowClick={handleRowClick}
        columns={columns}
        data={tableData}
        defaultSort={{ direction: 'asc', key: 'endDate' }}
        editable={false}
      />
    </>
  );
}
