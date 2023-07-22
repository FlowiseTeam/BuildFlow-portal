import { useQuery } from 'react-query';
import { getEmployees } from '@services/api';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { Button } from '@components/button/Button';
import { EmployeesTable } from '@features/employees/EmployeesTable';
import { AddEmployeeModal } from '@features/employees/addEmployeeModal/AddEmployeeModal';
import { queryClient } from '@src/App';

export function EmployeesPage() {
  const { data, refetch } = useQuery('employees', getEmployees, {
    suspense: true,
    onSuccess: (queryData) => {
      queryData.employees.forEach((employee) => {
        queryClient.setQueryData(['employee', employee._id], employee);
      });
    },
  });
  if (!data) throw Error('Something went wrong');

  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const onSuccessfulAdd = () => {
    refetch();
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <Page title="Pracownicy">
      <AddEmployeeModal
        show={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSuccess={onSuccessfulAdd}
      />
      <div className="mt-8 flex flex-col">
        <div className="flex justify-between">
          <button>Szukaj</button>
          <Button variant="primary" onClick={() => setIsAddEmployeeModalOpen(true)}>
            Dodaj pracownika
          </Button>
        </div>
        <div className="mt-8 w-0 min-w-full">
          <EmployeesTable employees={data.employees} />
        </div>
      </div>
    </Page>
  );
}
