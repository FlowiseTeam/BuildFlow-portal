import { DetailCard } from '@src/components/detailCard/DetailCard';
import { CalendarEvents } from '../calendar/CalendarEvents';
import { DashboardSummary } from './summary/DashboardSummary';
import { DashboardComments } from './chat/DashboardComments';

export function Dashboard() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      <div className="sm:col-span-2 xl:col-span-3">
        <DashboardSummary />
      </div>
      <div className="xl:col-span-3">
        <DashboardComments />
      </div>
      <DetailCard className="xl:col-start-4 xl:row-span-3 xl:row-start-1" border="">
        <CalendarEvents />
      </DetailCard>
    </div>
  );
}
