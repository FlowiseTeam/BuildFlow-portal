import { DetailCard } from '@components/detailCard/DetailCard';
import { SummaryCard } from './SummaryCard';

export function DashboardSummary() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <DetailCard className="basis-1/3" border="">
        <SummaryCard name="Projekty" num={10} imgSrc="projectsicon.svg" />
      </DetailCard>
      <DetailCard className="basis-1/3" border="">
        <SummaryCard name="Pracownicy" num={40} imgSrc="employeesicon.svg" />
      </DetailCard>
      <DetailCard className="basis-1/3" border="">
        <SummaryCard name="Nieprzypisani" num={8} imgSrc="marcIcon.svg" />
      </DetailCard>
    </div>
  );
}
