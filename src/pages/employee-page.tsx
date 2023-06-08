import { DetailCard } from '@components/detailCard/DetailCard';
import { Page } from '@layouts/Page';
import { useParams } from 'react-router-dom';
import { EditEmployee } from '@features/employees/editEmployee/EditEmployee';
import { getFullName } from '@src/features/employees/utils';
import { EmployeeQualifications } from '@src/features/employees/employeeQualifications/EmployeeQualifications';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';
import { useEmployeeQuery } from '@src/features/employees/hooks/useEmployeeQuery';
import { useState } from 'react';

export function EmployeePage() {
  const id = useParams<{ id: string }>().id;
  if (!id) {
    throw new Error('Employee id is not defined');
  }

  const [isEdited, setIsEdited] = useState(false);

  const toggleIsEdited = () => setIsEdited((prev) => !prev);

  const { employee, onDelete } = useEmployeeQuery(Number(id));

  return (
    <Page
      header={
        <DetailsPageHeader
          title={getFullName(employee.first_name, employee.last_name)}
          backLink="/app/employees"
          onDelete={onDelete}
          deleteModalTitle="Czy chcesz usunać pracownika?"
          toggleEdit={toggleIsEdited}
        />
      }
    >
      <div className="mb-16 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DetailCard className="p-2 md:col-span-1">
          <EditEmployee isEdited={isEdited} employee={employee} />
        </DetailCard>
        <DetailCard>
          <EmployeeQualifications qualifications={employee.qualifications} />
        </DetailCard>
      </div>
    </Page>
  );
}
