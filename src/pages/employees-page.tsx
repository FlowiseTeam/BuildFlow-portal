import { useQuery } from 'react-query';
import { getEmployees } from '@services/api/index';
import { Page } from '@layouts/Page';
import { useState } from 'react';
import { Button } from '@components/button/Button';
import { EmployeesTable } from '@features/employees/EmployeesTable';
import { AddEmployeeModal } from '@features/employees/addEmployeeModal/AddEmployeeModal';
import { queryClient } from '@src/App';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { useNotifications } from '@src/layouts/notifications/NotificationProvider';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';

function EmployeesPageWithoutFallback() {
  const { notify } = useNotifications();
  const { data, refetch } = useQuery('employees', getEmployees, {
    suspense: true,
    onSuccess: (queryData) => {
      queryData.employees.forEach((employee) => {
        queryClient.setQueryData(['employee', employee._id], employee);
      });
    },
    onError: () => notify('Nie udało się pobrać listy pracowników.', 'error'),
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

export function EmployeesPage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="Pracownicy" message="Nie udało się pobrać listy pracowników." />}>
      <EmployeesPageWithoutFallback />
    </ErrorBoundary>
  );
}
