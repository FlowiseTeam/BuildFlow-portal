import { DetailCard } from '@components/detailCard/DetailCard';
import { Page } from '@layouts/Page';
import { deleteEmployee, getEmployee } from '@services/api';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { EditEmployee } from '@features/employees/editEmployee/EditEmployee';
import { getFullName } from '@src/features/employees/utils';
import { EmployeeQualifications } from '@src/features/employees/employeeQualifications/EmployeeQualifications';
import { queryClient } from '@src/main';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';

export function EmployeePage() {
  const navigate = useNavigate();
  const id = useParams<{ id: string }>().id;
  if (!id) {
    throw new Error('Employee id is not defined');
  }

  const { data: employee } = useQuery(['Employee', id], () => getEmployee(id), {
    suspense: true,
  });

  const { mutateAsync } = useMutation(['Employee', id], () => deleteEmployee(Number(id)), {
    onSuccess: () => {
      queryClient.resetQueries(['employees', id]);
      navigate('/app/employees');
    },
  });

  if (!employee) {
    throw new Error('Something went wrong');
  }

  return (
    <Page
      header={<DetailsPageHeader title={getFullName(employee.first_name, employee.last_name)} backLink='/app/employees' onDelete={mutateAsync} />}
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