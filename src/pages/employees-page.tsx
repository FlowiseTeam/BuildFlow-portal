import { Page } from '@layouts/Page';
import { useState, useEffect } from 'react';
import { Button } from '@components/button/Button';
import { EmployeesTable } from '@features/employees/EmployeesTable';
import { AddEmployeeModal } from '@features/employees/addEmployeeModal/AddEmployeeModal';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { SearchInput } from '@src/components/Input/SearchInput';
import { useSuspenseEmployeesQuery } from '@src/services/api/hooks/employees';

function EmployeesPageWithoutFallback() {
  const { data, refetch } = useSuspenseEmployeesQuery();
  const [filteredData, setFilteredData] = useState(data.employees);

  useEffect(() => {
    setFilteredData(data.employees);
  }, [data.employees]);

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
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => setIsAddEmployeeModalOpen(true)}>
            Dodaj pracownika
          </Button>
        </div>
        <div className="mt-8 w-0 min-w-full">
          <EmployeesTable employees={filteredData} />
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
