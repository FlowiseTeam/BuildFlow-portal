import { Table, TableColumn } from '@components/table/Table';
import { Employee } from '@services/api-types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  { type: 'input', title: 'Imię', key: 'first_name', sortable: true },
  { type: 'input', title: 'Nazwisko', key: 'last_name', sortable: true },
  { type: 'input', title: 'Rola', key: 'role', sortable: true },
  // { type: 'input', title: 'Projekt', key: 'assigned_project', sortable: true },

  { type: 'input', title: 'Status', key: 'status', sortable: true },
] satisfies TableColumn[];

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  console.log(employees);
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
