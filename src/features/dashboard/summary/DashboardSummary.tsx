import { DetailCard } from '@components/detailCard/DetailCard';
import { SummaryCard } from './SummaryCard';
import { useProjectsQuery } from '@src/services/api/hooks/projects';
import { useEmployeesQuery } from '@src/services/api/hooks/employees';

export function DashboardSummary() {
  const {
    data: projecsData,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    failureCount: failureCountProjects,
  } = useProjectsQuery();
  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
    failureCount: failureCountEmployees,
  } = useEmployeesQuery();

  const projectsCount = projecsData?.project_count;
  const employeesCount = employeesData?.employees_count;
  const unassignedEmployeesCount = employeesData?.employees.reduce((acc, curr) => {
    const isAssigned = curr.assigned_project.length > 0;
    return isAssigned ? acc : acc + 1;
  }, 0);

  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row">
      <DetailCard className="basis-1/3" border="">
        <SummaryCard
          isError={isErrorProjects}
          isSlowFetch={failureCountProjects > 0}
          name="Projekty"
          count={projectsCount}
          isLoading={isLoadingProjects}
          imgSrc="projectsicon.svg"
        />
      </DetailCard>
      <DetailCard className="basis-1/3" border="">
        <SummaryCard
          isError={isErrorEmployees}
          isSlowFetch={failureCountEmployees > 0}
          name="Pracownicy"
          count={employeesCount}
          isLoading={isLoadingEmployees}
          imgSrc="employeesicon.svg"
        />
      </DetailCard>
      <DetailCard className="basis-1/3" border="">
        <SummaryCard
          isError={isErrorEmployees}
          isSlowFetch={failureCountEmployees > 0}
          name="Nieprzypisani"
          count={unassignedEmployeesCount}
          isLoading={isLoadingEmployees}
          imgSrc="marcIcon.svg"
        />
      </DetailCard>
    </div>
  );
}
