import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';

interface CalendarEvent {
  name: string;
  id: number;
}

interface CalendarDay {
  date: string;
  id: number;
  events: CalendarEvent[];
}

const events: CalendarDay[] = [
  {
    date: 'Dziś',
    id: 1,
    events: [
      {
        name: 'Przedstawienie BDO',
        id: 1,
      },
      {
        name: 'Przedstawienie BDO',
        id: 2,
      },
    ],
  },
  {
    date: 'Jutro',
    id: 2,
    events: [
      {
        name: 'Przedstawienie BDO',
        id: 1,
      },
      {
        name: 'Przedstawienie BDO',
        id: 2,
      },
    ],
  },
  {
    date: '14 kwietnia',
    id: 3,
    events: [
      {
        name: 'Przedstawienie BDO',
        id: 1,
      },
      {
        name: 'Przedstawienie BDO',
        id: 2,
      },
    ],
  },
];

export function CalendarEventsHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-sm uppercase tracking-widest text-gray-600">Terminy</p>
      <CalendarDaysIcon className="h-6 text-primary" />
    </div>
  );
}

export function CalendarDay({ day }: { day: CalendarDay }) {
  return (
    <div className="mb-6">
      <p className="mb-1 text-xl font-medium text-primary">{day.date}</p>
      <ul className="list-disc ml-4">
        {day.events.map((event) => (
          <li key={event.id}>
            <p className=" font-medium text-gray-600">{event.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CalendarEvents() {
  return (
    <div className="p-3 font-abhaya">
      <CalendarEventsHeader />
      <div>
        {events.map((day) => (
          <CalendarDay key={day.id} day={day} />
        ))}
      </div>
      <div className="mt-auto border-t-2 pt-2 text-center">
        <Button variant="light">Dodaj wydarzenie</Button>
      </div>
    </div>
  );
}
