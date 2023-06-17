import { Table, TableColumn } from '@components/table/Table';
import { Employee } from '@services/api-types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  { type: 'text', title: 'Imię', key: 'first_name', sortable: true },
  { type: 'text', title: 'Nazwisko', key: 'last_name', sortable: true },
  { type: 'text', title: 'Rola', key: 'role', sortable: true },
  // { type: 'text', title: 'Status', key: 'status', sortable: true },
  {
    type: 'select',
    title: 'Status',
    key: 'status',
    sortable: true,
    center: true,
    options: [
      { value: 'Przypisany', className: 'bg-green-400 hover:bg-green-500' },
      { value: 'Nieprzypisany', className: 'bg-orange-400 hover:bg-orange-500' },
    ],
  },
] satisfies TableColumn[];

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  const navigate = useNavigate();

  const tableData = useMemo(
    () =>
      employees.map((employee) => ({
        ...employee,
        id: employee._id,
      })),
    [employees],
  );

  const handleRowClick = (id: number) => {
    navigate(`/app/employees/${id}`);
  };

  return (
    <>
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
