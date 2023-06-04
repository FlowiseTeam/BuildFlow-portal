import { Page } from '@layouts/Page';
import { CalendarEvents } from '@src/features/calendar/calenderEvents/CalendarEvents';
import { DashboardHeader } from '@src/features/dashboard/DashboardHeader';

export function AppPage() {
  const data = { name: 'Hardcoded name' };
  return (
    <Page header={<DashboardHeader companyName={data.name} />}>
      <Dashboard />
    </Page>
  );
}

export function Dashboard() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      <div className="bg-pink-200 sm:col-span-2 xl:col-span-3">summary</div>
      <div className="bg-pink-200 xl:col-span-3">messages</div>
      <div className=" xl:col-start-4 xl:row-span-3 xl:row-start-1">
        <CalendarEvents />
      </div>
      <div className="bg-pink-200 sm:col-span-2 xl:col-span-3">vehicles</div>
    </div>
  );
}
