import { DetailCard } from '@components/detailCard/DetailCard';
import { Page } from '@layouts/Page';
import { EditEmployee } from '@features/employees/editEmployee/EditEmployee';
import { getFullName } from '@src/features/employees/utils';
import { EmployeeQualifications } from '@src/features/employees/employeeQualifications/EmployeeQualifications';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';
import { useState } from 'react';
import { EmployeeProjectsList } from '@src/features/employees/employeeProjectsList/EmployeeProjectsList';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { useIdParam } from '@src/hooks/useParams';
import { useEmployeeDeleteMutation, useSuspenseEmployeeQuery } from '@src/services/api/hooks/employees';
import { useNavigate } from 'react-router-dom';

function PageEmployee() {
  const id = useIdParam();
  const navigate = useNavigate();
  const { data: employee } = useSuspenseEmployeeQuery(Number(id));
  const { mutateAsync: deleteEmployee } = useEmployeeDeleteMutation(Number(id));

  const onDelete = () => {
    deleteEmployee();
    navigate('/app/employes');
  };

  const [isEdited, setIsEdited] = useState(false);
  const toggleIsEdited = () => setIsEdited((prev) => !prev);

  return (
    <Page
      header={
        <DetailsPageHeader
          title={getFullName(employee.first_name, employee.last_name)}
          backLink="/app/employees"
          onDelete={onDelete}
          deleteModalTitle="Czy chcesz usunać pracownika?"
          toggleEdit={toggleIsEdited}
          isEdited={isEdited}
        />
      }
    >
      <div className="mb-16 mt-8 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
        <DetailCard className="p-2 md:col-span-1">
          <EditEmployee isEdited={isEdited} employee={employee} />
        </DetailCard>
        <DetailCard>
          <EmployeeQualifications employee={employee} isEdited={isEdited} />
        </DetailCard>
        <DetailCard>
          <EmployeeProjectsList employee={employee} isEdited={isEdited} />
        </DetailCard>
      </div>
    </Page>
  );
}

export function EmployeePage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="Pracownik" message="Nie udało się pobrać pracownika" />}>
      <PageEmployee />
    </ErrorBoundary>
  );
}
