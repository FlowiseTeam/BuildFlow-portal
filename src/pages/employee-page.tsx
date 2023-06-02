import { DetailCard } from '@components/detailCard/DetailCard';
import { Page } from '@layouts/Page';
import { getEmployee } from '@services/api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { EditEmployee } from '@features/employees/editEmployee/EditEmployee';
import { EmployeeHeader } from '@src/features/employees/employeeHeader/EmployeeHeader';
import { getFullName } from '@src/features/employees/utils';
import { EmployeeQualifications } from '@src/features/employees/employeeQualifications/EmployeeQualifications';

export function EmployeePage() {
  const id = useParams<{ id: string }>().id;
  if (!id) {
    throw new Error('Employee id is not defined');
  }

  const { data: employee } = useQuery(['Employee', id], () => getEmployee(id), {
    suspense: true,
  });

  if (!employee) {
    throw new Error('Something went wrong');
  }

  return (
    <Page
      header={<EmployeeHeader title={getFullName(employee.first_name, employee.last_name)} employeeId={employee._id} />}
    >
      <div className="mb-16 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DetailCard className="p-2 md:col-span-1">
          <EditEmployee employee={employee} />
        </DetailCard>
        <DetailCard>
          <EmployeeQualifications qualifications={employee.qualifications} />
        </DetailCard>
      </div>
    </Page>
  );
}
