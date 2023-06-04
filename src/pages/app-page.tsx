import { Page } from '@layouts/Page';
import { DetailCard } from '@src/components/detailCard/DetailCard';
import { CalendarEvents } from '@src/features/calendar/calenderEvents/CalendarEvents';
import { DashboardHeader } from '@src/features/dashboard/DashboardHeader';
import { DashboardSummary } from '@src/features/dashboard/summary/DashboardSummary';
import { ChatMessage, Message } from '@src/features/projectChat/ChatMessage';
import { VehiclesTable } from '@src/features/vehicles/VehiclesTable';

const messages: Message[] = [
  {
    checked: true,
    date: new Date(),
    id: 1,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repellendus enim quidem, rerum ipsa excepturi!',
  },
  {
    checked: true,
    date: new Date(),
    id: 2,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repellendus enim quidem, rerum ipsa excepturi!',
  },
  {
    checked: true,
    date: new Date(),
    id: 3,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repellendus enim quidem, rerum ipsa excepturi!',
  },
  {
    checked: true,
    date: new Date(),
    id: 4,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat repellendus enim quidem, rerum ipsa excepturi!',
  },
];

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
      <div className="sm:col-span-2 xl:col-span-3">
        <DashboardSummary />
      </div>
      <div className="xl:col-span-3">
        <div className="grid gap-6 xl:grid-cols-2">
          {messages.map((msg) => (
            <DetailCard key={msg.id} className="basis-full p-4">
              <ChatMessage message={msg} />
            </DetailCard>
          ))}
        </div>
      </div>
      <DetailCard className="xl:col-start-4 xl:row-span-3 xl:row-start-1" border="">
        <CalendarEvents />
      </DetailCard>
      <div className=" sm:col-span-2 xl:col-span-3">
        <VehiclesTable />
      </div>
    </div>
  );
}
