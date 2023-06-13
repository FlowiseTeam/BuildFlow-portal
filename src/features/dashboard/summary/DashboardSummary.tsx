import { DetailCard } from '@components/detailCard/DetailCard';
import { SummaryCard } from './SummaryCard';
import { getEmployees, getProjects } from '@src/services/api';
import { useQuery } from 'react-query';

export function DashboardSummary() {
  const {
    data: projecsData,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    failureCount: failureCountProjects,
  } = useQuery('projects', () => getProjects());
  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
    failureCount: failureCountEmployees,
  } = useQuery('employees', () => getEmployees());

  const projectsCount = projecsData?.project_count;
  const employeesCount = employeesData?.employees_count;
  const unassignedEmployeesCount = employeesData?.employees.reduce((acc, curr) => {
    const isAssigned = curr.assigned_project !== null;
    return isAssigned ? acc : acc + 1;
  }, 0);

  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row">
      <DetailCard className="basis-1/3" border="">
        <SummaryCard
          isError={isErrorProjects}
          isSlowFetch={failureCountProjects > 0}
          name="Projekty"
          count={isLoadingProjects ? '' : projectsCount}
          imgSrc="projectsicon.svg"
        />
      </DetailCard>
      <DetailCard className="basis-1/3" border="">
        <SummaryCard
          isError={isErrorEmployees}
          isSlowFetch={failureCountEmployees > 0}
          name="Pracownicy"
          count={isLoadingEmployees ? '' : employeesCount}
          imgSrc="employeesicon.svg"
        />
      </DetailCard>
      <DetailCard className="basis-1/3" border="">
        <SummaryCard
          isError={isErrorEmployees}
          isSlowFetch={failureCountEmployees > 0}
          name="Nieprzypisani"
          count={isLoadingEmployees ? '' : unassignedEmployeesCount}
          imgSrc="marcIcon.svg"
        />
      </DetailCard>
    </div>
  );
}
